import React, { useState } from 'react';
import { SENA_MODULES } from '../data/senaData';
import { CheckCircle2, ChevronRight, Clock, Award, Building2, BookMarked, Briefcase, ShieldCheck, Scale } from 'lucide-react';
import { InductionModule } from '../types/induction';

interface ModulesViewProps {
  completedModules: string[];
  onToggleCompleteModule: (moduleId: string) => void;
  onGoToQuiz: () => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  completedModules,
  onToggleCompleteModule,
  onGoToQuiz,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(SENA_MODULES[0].id);

  const activeModule: InductionModule =
    SENA_MODULES.find((m) => m.id === selectedModuleId) || SENA_MODULES[0];

  const isCompleted = completedModules.includes(activeModule.id);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'BookMarked':
        return <BookMarked className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      default:
        return <BookMarked className="w-5 h-5" />;
    }
  };

  const handleNextModule = () => {
    onToggleCompleteModule(activeModule.id);
    const currentIndex = SENA_MODULES.findIndex((m) => m.id === activeModule.id);
    if (currentIndex < SENA_MODULES.length - 1) {
      setSelectedModuleId(SENA_MODULES[currentIndex + 1].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-300">
        <div>
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wide uppercase">
            Ruta Formativa
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Módulos del Nuevo Reglamento del Aprendiz
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Revisión pedagógica exhaustiva del Acuerdo 009 de 2024 expedido por el Consejo Directivo Nacional del SENA.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Progreso Global</span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              {completedModules.length} de {SENA_MODULES.length} módulos
            </span>
          </div>
          {completedModules.length === SENA_MODULES.length && (
            <button
              onClick={onGoToQuiz}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Ir al Reto Evaluativo</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout: Module Nav & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Module Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
            Contenido Temático
          </h3>
          <div className="space-y-2">
            {SENA_MODULES.map((mod, index) => {
              const active = mod.id === selectedModuleId;
              const done = completedModules.includes(mod.id);

              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModuleId(mod.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 ring-1 ring-emerald-300 dark:ring-emerald-700 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      active
                        ? 'bg-emerald-600 text-white'
                        : done
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {getModuleIcon(mod.iconName)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                        Módulo 0{index + 1}
                      </span>
                      {done && (
                        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Leído
                        </span>
                      )}
                    </div>
                    <h4
                      className={`text-sm font-semibold truncate ${
                        active
                          ? 'text-emerald-950 dark:text-emerald-200 font-bold'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {mod.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{mod.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{mod.articlesReference}</span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-100/70 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-slate-200 block">¿Sabías que?</span>
            <p>
              El Acuerdo 009 de 2024 rige para todas las modalidades de formación del SENA: presencial, virtual, a distancia y formación combinada en todo el territorio colombiano.
            </p>
          </div>
        </div>

        {/* Right Side: Module Reader Content */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-8 transition-colors duration-300">
          {/* Header of Active Module */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">
              <span>{activeModule.articlesReference}</span>
              <span aria-hidden="true">·</span>
              <span>Lectura Estimada: {activeModule.duration}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeModule.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {activeModule.subtitle}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 pt-1 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-slate-100 dark:border-slate-750">
              {activeModule.summary}
            </p>
          </div>

          {/* Module Sections */}
          <div className="space-y-8">
            {activeModule.sections.map((sec, secIdx) => (
              <article key={secIdx} className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {secIdx + 1}. {sec.title}
                </h4>

                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wide block">
                      Puntos Clave del Reglamento:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {sec.bulletPoints.map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sec.keyTakeaway && (
                  <div className="p-3.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-300 font-medium">
                    <strong className="text-emerald-950 dark:text-emerald-200 font-semibold">Principio rector:</strong> {sec.keyTakeaway}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => onToggleCompleteModule(activeModule.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isCompleted
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900'
                  : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Módulo Marcado como Leído' : 'Marcar Módulo como Completado'}</span>
            </button>

            <button
              onClick={handleNextModule}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-colors"
            >
              <span>Siguiente Módulo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
