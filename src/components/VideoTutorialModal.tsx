import React from 'react';
import { X, PlayCircle } from 'lucide-react';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 w-full max-w-4xl shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="rounded-2xl overflow-hidden bg-black">
          <video
            src="/assets/aistudio/2026__4_35_p.m._64441b4b.mp4"
            controls
            className="w-full aspect-video"
            autoPlay
          >
            Tu navegador no soporta el formato de video.
          </video>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5 text-emerald-600" />
            Guía Visual: Ruta hacia el Éxito en el SENA
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Video tutorial paso a paso para completar tu inducción oficial.
          </p>
        </div>
      </div>
    </div>
  );
};
