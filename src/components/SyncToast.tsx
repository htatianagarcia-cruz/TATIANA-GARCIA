import React, { useEffect } from 'react';
import { ToastPayload } from '../services/useAutoSync';
import { CheckCircle2, ExternalLink, X, FileSpreadsheet } from 'lucide-react';

interface SyncToastProps {
  toast: ToastPayload | null;
  onDismiss: () => void;
}

export const SyncToast: React.FC<SyncToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/80 rounded-2xl shadow-xl p-4 flex items-start gap-3 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
              {toast.title}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
              {toast.timestamp}
            </span>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
            {toast.subtitle}
          </p>

          {toast.sheetUrl && (
            <div className="pt-1.5 flex items-center gap-3">
              <a
                href={toast.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <FileSpreadsheet className="w-3 h-3" />
                <span>Abrir hoja de cálculo</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          )}
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors shrink-0"
          aria-label="Cerrar notificación"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
