import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { APP_VERSION, BUILD_DATE, shareUrl } from '../config/build';

/**
 * QR code generated in the browser (no third-party QR service: nothing about the
 * visitor leaves the page, and it keeps working under a strict Content-Security-Policy).
 * The library loads only when the modal opens.
 */
async function qrSvgDataUrl(text: string): Promise<string> {
  const { toString } = await import('qrcode');
  const svg = await toString(text, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: '#05070bff', light: '#ffffffff' },
  });
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const url = shareUrl();
  const [qr, setQr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    void qrSvgDataUrl(url).then((src) => {
      if (!cancelled) setQr(src);
    });
    return () => {
      cancelled = true;
    };
  }, [open, url]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-aether-panel border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center"
          >
            <h3 id="share-title" className="text-xl font-bold text-white mb-2">
              Share With Shareholders
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Scan with any phone camera to open the live demo: the 3D failover command center and
              the investor deck. All data in the demo is simulated.
            </p>

            <div className="w-52 h-52 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center mb-3 shadow-xl">
              {qr ? (
                <img
                  src={qr}
                  alt={`QR code for ${url}`}
                  className="w-44 h-44 object-contain"
                  data-testid="share-qr"
                />
              ) : (
                <span className="text-[11px] font-mono text-zinc-500">Generating QR…</span>
              )}
            </div>

            <p className="text-[11px] font-mono text-zinc-500 mb-3">
              Build {APP_VERSION} · {BUILD_DATE}
            </p>

            <div className="mb-5 flex items-center justify-center gap-2 min-w-0">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-aether-cyan underline hover:text-white break-all"
              >
                {url}
              </a>
              <button
                type="button"
                onClick={() => void copy()}
                aria-label={copied ? 'Link copied' : 'Copy link'}
                className="shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-aether-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-300 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
