import React, { useState } from 'react';
import { SENA_CASE_SIMULATIONS } from '../data/senaData';
import { CaseSimulation } from '../types/induction';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Scale } from 'lucide-react';

interface CaseSimulatorProps {
  onAddScore: (points: number, caseId: string) => void;
  completedCases: string[];
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  onAddScore,
  completedCases,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const currentCase: CaseSimulation = SENA_CASE_SIMULATIONS[activeCaseIndex];
  const selectedChoice = currentCase.choices.find((c) => c.id === selectedChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    const choice = currentCase.choices.find((c) => c.id === choiceId);
    if (choice && !completedCases.includes(currentCase.id)) {
      onAddScore(choice.points, currentCase.id);
    }
  };

  const handleNextCase = () => {
    setSelectedChoiceId(null);
    if (activeCaseIndex < SENA_CASE_SIMULATIONS.length - 1) {
      setActiveCaseIndex((prev) => prev + 1);
    } else {
      setActiveCaseIndex(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-300">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wide uppercase">
            Simulador de Decisiones
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Dilemas Reales del Comité de Evaluación y Seguimiento
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Ponte en los zapatos de un aprendiz y del Comité. Analiza situaciones cotidianas sobre plagio, inasistencias justificadas, etapa productiva y denuncias de acoso conforme al Acuerdo 009 de 2024.
          </p>
        </div>

        {/* Case Navigation Tabs */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {SENA_CASE_SIMULATIONS.map((c, index) => {
            const isDone = completedCases.includes(c.id);
            const isCurrent = index === activeCaseIndex;

            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseIndex(index);
                  setSelectedChoiceId(null);
                }}
                className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                    : isDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>Caso 0{index + 1}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Stage Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-300">
        {/* Case Metadata */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Scale className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span className="font-semibold text-slate-900 dark:text-white">Caso Práctico {activeCaseIndex + 1} de {SENA_CASE_SIMULATIONS.length}</span>
            <span aria-hidden="true">·</span>
            <span>{currentCase.context}</span>
          </div>

          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800/60">
            Hasta +25 pts
          </span>
        </div>

        {/* Problem Statement */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {currentCase.title}
          </h3>
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
            <span className="font-semibold text-slate-900 dark:text-white block mb-1">Situación planteada:</span>
            {currentCase.initialSituation}
          </div>
        </div>

        {/* Choices */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            ¿Cómo debe procederse conforme al Reglamento del Aprendiz (Acuerdo 009 de 2024)?
          </span>

          <div className="grid grid-cols-1 gap-3">
            {currentCase.choices.map((choice, idx) => {
              const isSelected = selectedChoiceId === choice.id;

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice.id)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${
                    isSelected
                      ? choice.isOptimal
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 ring-2 ring-rose-300/20 text-rose-950 dark:text-rose-200'
                      : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold font-mono text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-snug">{choice.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Section (reveals on choice) */}
        {selectedChoice && (
          <div
            className={`p-5 rounded-xl border space-y-3 transition-all ${
              selectedChoice.isOptimal
                ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700'
                : 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {selectedChoice.isOptimal ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              )}
              <h4
                className={`text-sm font-bold ${
                  selectedChoice.isOptimal
                    ? 'text-emerald-950 dark:text-emerald-200'
                    : 'text-amber-950 dark:text-amber-200'
                }`}
              >
                {selectedChoice.outcomeTitle}
              </h4>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedChoice.outcomeDescription}
            </p>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
              <span className="font-mono text-slate-500 dark:text-slate-400">
                Fundamento Jurídico: {selectedChoice.legalArticle}
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                +{selectedChoice.points} Puntos obtenidos
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setSelectedChoiceId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar intento
          </button>

          <button
            onClick={handleNextCase}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg transition-colors"
          >
            <span>Siguiente Caso</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
