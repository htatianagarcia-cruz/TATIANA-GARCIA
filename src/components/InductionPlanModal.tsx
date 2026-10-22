import React from 'react';
import { X, FileText } from 'lucide-react';

interface InductionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InductionPlanModal: React.FC<InductionPlanModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-colors">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Plan Estructurado de Inducción SENA 2024
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Estrategia integral de apropiación del nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with 5 Phases */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 space-y-1.5">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">Objetivo General del Plan</h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Transformar la tradicional inducción de lectura pasiva en un ecosistema interactivo, gamificado y centrado en la resolución de casos, garantizando que el 100% de los nuevos aprendices interioricen sus derechos, responsabilidades y alternativas productivas antes de ingresar a los ambientes de formación.
            </p>
          </div>

          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-850">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">FASE 1: DIAGNÓSTICO JURÍDICO Y TRANSICIÓN NORMATIVA</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Completado</span>
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Investigación y Adopción del Acuerdo 009 de 2024</h5>
              <p className="text-slate-600 dark:text-slate-300">
                Se investigaron las resoluciones y acuerdos vigentes del SENA. El Consejo Directivo Nacional expidió el 22 de noviembre de 2024 el Acuerdo 009, derogando el Acuerdo 07 de 2012 y reformas previas. Se incorporaron los 24 derechos fundamentales, la inclusión digital y la Ley 2365 de 2024 (prevención del acoso sexual).
              </p>
            </div>

            {/* Phase 2 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-850">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">FASE 2: CURADURÍA TEMÁTICA DE 5 MÓDULOS NORMATIVOS</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Completado</span>
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Segmentación Pedagógica del Contenido</h5>
              <ul className="space-y-1 list-disc pl-4 text-slate-600 dark:text-slate-300">
                <li>Módulo 1: Identidad Institucional, Misión y Novedades del Acuerdo 009.</li>
                <li>Módulo 2: Los 24 Derechos del Aprendiz (académicos, bienestar y garantías).</li>
                <li>Módulo 3: Deberes, Prohibiciones Expresas y Convivencia Pacífica.</li>
                <li>Módulo 4: Etapas Formativas (6 alternativas productivas, economía campesina y novedades).</li>
                <li>Módulo 5: Régimen Disciplinario, Medidas Formativas, Comité y Ley 2365.</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-850">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">FASE 3: SIMULADOR DE DILEMAS Y CASOS PRÁCTICOS</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Completado</span>
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Entrenamiento de Criterio Formativo</h5>
              <p className="text-slate-600 dark:text-slate-300">
                Desarrollo del simulador interactivo donde el aprendiz enfrenta escenarios reales de la vida en el SENA (plagio digital, justificación de inasistencias por salud, elección de práctica en cooperativas rurales y activación de la ruta confidencial de acoso) con retroalimentación inmediata sobre la norma legal aplicable.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-850">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">FASE 4: EVALUACIÓN GAMIFICADA DE COMPETENCIAS</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Completado</span>
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Reto Evaluativo con Racha y Retroalimentación Justificada</h5>
              <p className="text-slate-600 dark:text-slate-300">
                Cuestionario adaptativo de 8 preguntas situacionales con puntuación, racha de aciertos y explicaciones jurídicas. Se establece un umbral del 70% de aprobación para simular el rigor del estándar de competencias laborales SENA.
              </p>
            </div>

            {/* Phase 5 */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-850">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">FASE 5: ACREDITACIÓN Y CERTIFICACIÓN OFICIAL</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Completado</span>
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Generador de Constancia con Verificación Digital</h5>
              <p className="text-slate-600 dark:text-slate-300">
                Emisión automatizada del diploma oficial con sello institucional de conformidad, datos personalizados del aprendiz (nombre, cédula, ficha de caracterización, programa y regional), fecha de aprobación y código criptográfico de autenticidad imprimible en PDF.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg font-semibold text-xs transition-colors"
          >
            Entendido, Explorar Prototipo
          </button>
        </div>
      </div>
    </div>
  );
};
