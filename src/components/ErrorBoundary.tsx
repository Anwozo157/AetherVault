import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  /** Shown instead of the children after an error. */
  fallback: ReactNode;
  children: ReactNode;
}

/** Contains rendering failures (e.g. no WebGL) so one panel can't blank the page. */
export default class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('AetherVault panel failed to render', error, info.componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
