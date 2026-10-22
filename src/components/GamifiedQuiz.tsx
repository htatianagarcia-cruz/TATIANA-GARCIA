import React, { useState } from 'react';
import { SENA_QUIZ_QUESTIONS } from '../data/senaData';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, FileCheck } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface GamifiedQuizProps {
  onQuizComplete: (score: number, total: number) => void;
  onGoToCertificate: () => void;
  profile: ApprenticeProfile;
  alreadyCompleted: boolean;
  savedScore: number;
}

export const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({
  onQuizComplete,
  onGoToCertificate,
  alreadyCompleted,
  savedScore,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(alreadyCompleted);

  const currentQ = SENA_QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = SENA_QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const option = currentQ.options.find((o) => o.id === optionId);
    const correct = !!option?.isCorrect;

    if (correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onQuizComplete(score, totalQuestions);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  const finalScore = isFinished && alreadyCompleted && score === 0 ? savedScore : score;
  const passed = finalScore >= Math.ceil(totalQuestions * 0.7);
  const scorePercent = Math.round((finalScore / totalQuestions) * 100);

  // If Finished, display the celebratory results screen
  if (isFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xs text-center space-y-6 max-w-2xl mx-auto transition-colors duration-300">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-xs">
          {passed ? <Award className="w-9 h-9" /> : <XCircle className="w-9 h-9 text-rose-600 dark:text-rose-400" />}
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
            {passed ? 'Evaluación de Inducción Superada' : 'Requiere Refuerzo Pedagógico'}
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {passed ? '¡Felicitaciones, Aprendiz SENA!' : 'Aún no alcanzas el puntaje aprobatorio'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {passed
              ? `Has demostrado un dominio sólido del Reglamento del Aprendiz (Acuerdo 009 de 2024). Tu constancia oficial de inducción ha sido emitida.`
              : `Has obtenido ${finalScore} de ${totalQuestions} respuestas correctas. Para certificarte en la inducción requieres al menos el 70% de aciertos.`}
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-6 grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Calificación</span>
            <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {scorePercent}%
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Aciertos</span>
            <span className="text-3xl font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
              {finalScore}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {passed ? (
            <button
              onClick={onGoToCertificate}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              <span>Ver y Descargar Certificado Oficial</span>
            </button>
          ) : (
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Intentar Evaluación Nuevamente</span>
            </button>
          )}

          <button
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <span>Repasar preguntas</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Score Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
              Evaluación Oficial de Inducción
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Reto Evaluativo: Reglamento del Aprendiz SENA
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Puntaje: {score} pts</span>
            </div>
            {streak > 1 && (
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1.5 rounded-lg font-bold text-amber-800 dark:text-amber-400 font-mono">
                Racha: {streak} seguidas!
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</span>
            <span className="font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-300">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-mono">
            <span>{currentQ.category}</span>
            <span aria-hidden="true">·</span>
            <span>{currentQ.legalReference}</span>
          </div>

          {currentQ.scenario && (
            <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-750 italic">
              <strong>Contexto del caso:</strong> {currentQ.scenario}
            </p>
          )}

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const showFeedback = isAnswered;

            let buttonStyle = 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

            if (showFeedback) {
              if (opt.isCorrect) {
                buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500';
              } else if (isSelected && !opt.isCorrect) {
                buttonStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200 ring-1 ring-rose-400';
              } else {
                buttonStyle = 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-slate-100 dark:bg-slate-800 border-slate-400 dark:border-slate-600 text-slate-900 dark:text-white';
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3.5 ${buttonStyle}`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold font-mono text-slate-600 dark:text-slate-300 shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div className="flex-1">
                  <span>{opt.text}</span>
                  {showFeedback && (
                    <p className="text-xs mt-1.5 opacity-90 font-normal">
                      {opt.explanation}
                    </p>
                  )}
                </div>
                {showFeedback && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                )}
                {showFeedback && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Question Control */}
        {isAnswered && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
            <button
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <span>{currentQuestionIndex === totalQuestions - 1 ? 'Ver Resultado Final' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
