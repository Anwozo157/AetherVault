import { AnimatePresence, motion } from 'framer-motion';

const LIVE_URL = 'https://anwozo157.github.io/AetherVault/';

export default function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#0D121F] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center"
          >
            <h3 id="share-title" className="text-xl font-bold text-white mb-2">
              Share With Shareholders
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              AetherVault is fully mobile-optimized. Scan this QR code with any smartphone camera to
              launch the live 3D failover command center and executive pitch deck.
            </p>

            <div className="w-52 h-52 mx-auto bg-white p-3 rounded-2xl flex flex-col items-center justify-center mb-4 shadow-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${LIVE_URL}`}
                alt="AetherVault Live Mobile QR Code"
                className="w-44 h-44 object-contain"
              />
            </div>

            <div className="mb-5 text-center">
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-aether-cyan underline hover:text-white"
              >
                {LIVE_URL}
              </a>
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
