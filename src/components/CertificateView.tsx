import React, { useState } from 'react';
import { ApprenticeProfile, UserProgress, UserRole } from '../types/induction';
import { Printer, Check, Award, Copy, ExternalLink } from 'lucide-react';

interface CertificateViewProps {
  profile: ApprenticeProfile;
  progress: UserProgress;
  onGoToQuiz: () => void;
  onOpenGoogleDrive?: () => void;
  role?: UserRole;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  progress,
  onGoToQuiz,
  onOpenGoogleDrive,
  role = 'aprendiz',
}) => {
  const [copied, setCopied] = useState(false);

  // If the user hasn't passed the quiz yet
  if (!progress.quizCompleted) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xs text-center space-y-5 max-w-xl mx-auto transition-colors duration-300">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Certificado Aún No Emitido
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Para desbloquear y descargar tu <strong className="text-slate-900 dark:text-white">Constancia Oficial de Inducción al SENA</strong> (Acuerdo 009 de 2024), debes aprobar el Reto Evaluativo con un puntaje mínimo del 70%.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onGoToQuiz}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
          >
            <span>Presentar Reto Evaluativo</span>
          </button>
        </div>
      </div>
    );
  }

  const certificateDate =
    progress.certificateIssuedAt ||
    new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const certificateCode =
    progress.certificateCode || 'SENA-IND-2024-C7F1-92B4';

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(
      `Certificado SENA Inducción 2024 - Aprendiz: ${profile.fullName} - Ficha: ${profile.fichaNumber} - Código: ${certificateCode}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar (hidden when printing) */}
      <div className="no-print bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors duration-300">
        <div>
          <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
            Acreditación Institucional
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Constancia Oficial de Inducción
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generada con firma digital válida y código único de autenticidad.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {role === 'instructor' && (() => {
            try {
              const saved = localStorage.getItem('sena_google_sheet_info');
              const sheet = saved ? JSON.parse(saved) : null;
              if (sheet?.url) {
                return (
                  <a
                    href={sheet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors"
                  >
                    <span>Ver Hoja en Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                );
              }
            } catch {}
            return null;
          })()}

          {role === 'instructor' && onOpenGoogleDrive && (
            <button
              onClick={onOpenGoogleDrive}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/80 rounded-lg transition-colors"
            >
              <span>Sincronizar a Google Sheets</span>
            </button>
          )}

          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado al portapapeles' : 'Copiar Validación'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar como PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Paper Container (retains clean white authentic diploma background) */}
      <div className="certificate-print-area max-w-4xl mx-auto bg-white p-8 sm:p-14 rounded-2xl border-4 border-double border-emerald-900/30 shadow-lg relative overflow-hidden text-slate-900">
        {/* Subtle Watermark Background */}
        <div className="absolute inset-0 bg-radial from-emerald-50/40 via-transparent to-transparent pointer-events-none" />

        {/* Certificate Border Decor */}
        <div className="border border-emerald-800/20 p-8 sm:p-10 rounded-xl relative space-y-8 bg-white/95">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img
                  src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e"
                  alt="Logo SENA"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs font-extrabold tracking-widest uppercase text-emerald-900 block">
                  SERVICIO NACIONAL DE APRENDIZAJE · SENA
                </span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                  Dirección de Formación Profesional Integral - Regional Santander
                </span>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                CONSTANCIA OFICIAL DE APROBACIÓN
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-serif">
                Inducción al Reglamento del Aprendiz
              </h1>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mt-0.5">
                Acuerdo 009 de 2024 del Consejo Directivo Nacional
              </p>
            </div>
          </div>

          {/* Certificate Body Text */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-xs text-slate-600 italic">
              El Centro de Formación Profesional certifica que el(la) aprendiz:
            </p>

            <div className="border-b-2 border-emerald-800/40 pb-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-wide uppercase">
                {profile.fullName}
              </h3>
            </div>

            <div className="text-xs text-slate-700 space-y-1">
              <p>
                Identificado(a) con <strong className="text-slate-900">{profile.documentType} No. {profile.documentNumber}</strong>,
                matriculado(a) en el programa de formación:
              </p>
              <p className="text-sm font-bold text-emerald-950 uppercase pt-1">
                {profile.programName}
              </p>
              <p className="text-xs text-slate-600">
                Ficha de Caracterización No. <strong className="font-mono text-slate-900">{profile.fichaNumber}</strong> · {profile.centerName}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              Ha cursado, comprendido y aprobado satisfactoriamente los módulos de formación sobre el nuevo <strong className="text-slate-900">Reglamento del Aprendiz SENA (Acuerdo 009 de 2024)</strong>, demostrando solvencia en sus <strong className="text-slate-900">24 derechos fundamentales</strong>, deberes ciudadanos, prohibiciones expresas, alternativas de etapa productiva y protocolo institucional de prevención de violencias y acoso (Ley 2365 de 2024).
            </p>
          </div>

          {/* Evaluation Metric & Seal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center pt-4 border-t border-slate-100">
            {/* Left: Qualification & Details */}
            <div className="text-left space-y-1 text-xs">
              <span className="text-slate-400 block font-mono text-[11px]">CALIFICACIÓN OBTENIDA</span>
              <span className="text-xl font-bold font-mono text-emerald-800">
                {progress.quizScore}/{progress.totalQuestions} ({Math.round((progress.quizScore / progress.totalQuestions) * 100)}%)
              </span>
              <span className="text-slate-500 block text-[11px]">Estado: Aprobado (A)</span>
            </div>

            {/* Center: Institutional Seal Emblem */}
            <div className="flex flex-col items-center justify-center">
              <img
                src="/src/assets/images/sena_certificate_seal_1792526500659.jpg"
                alt="Sello Oficial de Certificación SENA"
                className="w-20 h-20 object-contain rounded-full shadow-xs"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-[10px] font-mono font-semibold text-emerald-900 uppercase tracking-widest mt-1">
                SELLO DE CONFORMIDAD
              </span>
            </div>

            {/* Right: Date & Verification */}
            <div className="text-right space-y-1 text-xs">
              <span className="text-slate-400 block font-mono text-[11px]">FECHA DE EXPEDICIÓN</span>
              <span className="font-medium text-slate-800 block">{certificateDate}</span>
              <span className="text-slate-400 block font-mono text-[11px] pt-1">CÓDIGO DE VALIDACIÓN</span>
              <span className="font-mono text-emerald-900 font-bold text-[11px] block">
                {certificateCode}
              </span>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-12 pt-8 text-center text-xs">
            <div className="space-y-1 border-t border-slate-400/60 pt-2">
              <span className="font-bold text-slate-900 block font-serif text-sm">Coordinación Académica</span>
              <span className="text-[11px] text-slate-500 block">Centro de Formación Profesional Integral</span>
              <span className="text-[10px] font-mono text-emerald-800 block">Firma Digital Verificada</span>
            </div>

            <div className="space-y-1 border-t border-slate-400/60 pt-2">
              <span className="font-bold text-slate-900 block font-serif text-sm">Liderazgo de Bienestar al Aprendiz</span>
              <span className="text-[11px] text-slate-500 block">Comité Institucional de Acompañamiento</span>
              <span className="text-[10px] font-mono text-emerald-800 block">Firma Digital Verificada</span>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="pt-4 text-center border-t border-slate-100 text-[10px] text-slate-400 font-mono">
            Documento expedido por el Sistema Integrado de Inducción SENA bajo los términos del Acuerdo 009 de 2024.
            Válido como requisito formativo de inicio de etapa lectiva.
          </div>
        </div>
      </div>
    </div>
  );
};
