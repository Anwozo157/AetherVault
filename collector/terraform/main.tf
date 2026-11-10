# AetherVault replication-status collector, deployed in the CUSTOMER's AWS account.
#
# Every minute a Lambda calls drs:DescribeSourceServers (read-only) and pushes replication
# status (state, lag, backlog bytes, error codes) to AetherVault. It cannot start, stop or
# change anything: its only AWS permissions are the AWS managed policies
# AWSElasticDisasterRecoveryReadOnlyAccess and AWSLambdaBasicExecutionRole (logs).
#
# Cost: ~43,200 invocations/month of a ~1 s, 128 MB function. That fits the Lambda free
# tier; logs are kept 14 days. Build the zip first: `npm run collector:package`.

terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "drs_region" {
  description = "Region Elastic Disaster Recovery replicates into (e.g. us-west-2)."
  type        = string
}

variable "aethervault_url" {
  description = "AetherVault API URL (Supabase project URL)."
  type        = string
}

variable "aethervault_anon_key" {
  description = "AetherVault public anon key."
  type        = string
}

variable "ingest_token" {
  description = "Ingest token from the AetherVault console (Replication → Connect). Shown once."
  type        = string
  sensitive   = true
  validation {
    condition     = can(regex("^avi_[0-9a-f]{48}$", var.ingest_token))
    error_message = "ingest_token must be an AetherVault ingest token (avi_ + 48 hex characters)."
  }
}

variable "lambda_zip" {
  description = "Path to dist-collector/lambda/lambda.zip."
  type        = string
  default     = "../../dist-collector/lambda/lambda.zip"
}

variable "schedule" {
  description = "How often to collect."
  type        = string
  default     = "rate(1 minute)"
}

variable "tags" {
  type    = map(string)
  default = { ManagedBy = "AetherVault", Purpose = "dr-replication-status" }
}

data "aws_iam_policy_document" "assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "collector" {
  name               = "aethervault-drs-collector"
  assume_role_policy = data.aws_iam_policy_document.assume.json
  tags               = var.tags
}

resource "aws_iam_role_policy_attachment" "drs_read_only" {
  role       = aws_iam_role.collector.name
  policy_arn = "arn:aws:iam::aws:policy/AWSElasticDisasterRecoveryReadOnlyAccess"
}

resource "aws_iam_role_policy_attachment" "logs" {
  role       = aws_iam_role.collector.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_cloudwatch_log_group" "collector" {
  name              = "/aws/lambda/aethervault-drs-collector"
  retention_in_days = 14
  tags              = var.tags
}

resource "aws_lambda_function" "collector" {
  function_name    = "aethervault-drs-collector"
  role             = aws_iam_role.collector.arn
  runtime          = "nodejs22.x"
  handler          = "lambda.handler"
  filename         = var.lambda_zip
  source_code_hash = filebase64sha256(var.lambda_zip)
  memory_size      = 128
  timeout          = 30
  # Never more than one run at a time.
  reserved_concurrent_executions = 1

  environment {
    variables = {
      DRS_REGION               = var.drs_region
      AETHERVAULT_URL          = var.aethervault_url
      AETHERVAULT_ANON_KEY     = var.aethervault_anon_key
      AETHERVAULT_INGEST_TOKEN = var.ingest_token
    }
  }

  depends_on = [aws_cloudwatch_log_group.collector, aws_iam_role_policy_attachment.logs]
  tags       = var.tags
}

resource "aws_cloudwatch_event_rule" "every_minute" {
  name                = "aethervault-drs-collector"
  schedule_expression = var.schedule
  tags                = var.tags
}

resource "aws_cloudwatch_event_target" "collector" {
  rule = aws_cloudwatch_event_rule.every_minute.name
  arn  = aws_lambda_function.collector.arn
}

resource "aws_lambda_permission" "events" {
  statement_id  = "AllowEventBridgeInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.collector.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.every_minute.arn
}

output "function_name" {
  value = aws_lambda_function.collector.function_name
}
