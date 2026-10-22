import React from 'react';
import { ArrowRight, BookOpen, Award, CheckCircle2, Shield, Scale, Users, FileCheck } from 'lucide-react';
import { ApprenticeProfile, UserProgress } from '../types/induction';

interface HeroSectionProps {
  onStartModules: () => void;
  onStartQuiz: () => void;
  onExploreRights: () => void;
  profile: ApprenticeProfile;
  progress: UserProgress;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartModules,
  onStartQuiz,
  onExploreRights,
  profile,
  progress,
}) => {
  const completedCount = progress.completedModules.length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Split Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                <span>Proceso Oficial de Inducción SENA</span>
                <span aria-hidden="true">·</span>
                <span>Acuerdo 009 de 2024</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Bienvenido al SENA: Conoce tu Nuevo Reglamento de Aprendiz
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Estimado(a) <strong className="text-slate-900 dark:text-white">{profile.fullName}</strong>, tu formación profesional integral comienza aquí. Domina tus <span className="font-semibold text-emerald-700 dark:text-emerald-400">24 derechos</span>, compromisos éticos, alternativas de etapa productiva y obtén tu <span className="font-semibold text-emerald-700 dark:text-emerald-400">Certificación Oficial de Inducción</span>.
              </p>

              {/* Progress Summary Box */}
              <div className="pt-2">
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <span>Avance de Ruta de Inducción</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{progressPercent}% completado</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 dark:bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{completedCount} de 5 módulos normativos leídos</span>
                    <span>{progress.quizCompleted ? 'Evaluación Aprobada' : 'Evaluación Pendiente'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onStartModules}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Módulos Normativos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartQuiz}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl transition-colors"
              >
                <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Presentar Reto Evaluativo</span>
              </button>

              <button
                onClick={onExploreRights}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>Ver los 24 Derechos</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image with Fallback */}
          <div className="lg:col-span-5 relative bg-slate-100 dark:bg-slate-800 min-h-[320px] lg:min-h-full">
            <img
              src="/src/assets/images/bucaramanga_sena_updated_1792611559027.jpg"
              alt="Aprendices SENA en Centro de Servicios Empresariales y Turísticos - Bucaramanga"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-6">
              <div className="text-white">
                <p className="text-lg font-semibold tracking-wide text-white drop-shadow-sm">
                  Centro de Servicios Empresariales y Turísticos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI / Structural Summary Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors duration-300">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">24</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Derechos Consagrados</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Capítulo II · Acuerdo 009/2024</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors duration-300">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">6</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Vías de Etapa Productiva</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Incluye Economía Campesina</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors duration-300">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">100%</div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Tolerancia Cero al Acoso</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Protocolo Ley 2365 de 2024</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors duration-300">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {progress.quizCompleted ? '100%' : 'Pendiente'}
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Certificado Oficial</div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Descargable con Hash QR</div>
          </div>
        </div>
      </section>

      {/* 5-Step Induction Journey Feature */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors duration-300">
        <div className="max-w-3xl mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ruta Metodológica de Inducción
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Diseñada bajo los principios de la formación profesional integral para garantizar el dominio del nuevo régimen del aprendiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">01. MARCO LEGAL</span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Acuerdo 009 de 2024</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Transición normativa y principios de formación del SENA.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Módulo 1</span>
              {progress.completedModules.includes('mod-1') ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <span className="text-slate-400 dark:text-slate-500">15 min</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">02. DERECHOS</span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">24 Derechos Clave</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Garantías formativas, bienestar, salud y representación.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Módulo 2</span>
              {progress.completedModules.includes('mod-2') ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <span className="text-slate-400 dark:text-slate-500">20 min</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">03. ÉTICA</span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Deberes y Convivencia</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Prohibición de proselitismo, fraude y cuidado institucional.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Módulo 3</span>
              {progress.completedModules.includes('mod-3') ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <span className="text-slate-400 dark:text-slate-500">20 min</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">04. PRODUCTIVA</span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Etapa Práctica</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">6 alternativas formativas y trámite de novedades.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Módulo 4</span>
              {progress.completedModules.includes('mod-4') ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <span className="text-slate-400 dark:text-slate-500">15 min</span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">05. CERTIFICACIÓN</span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Evaluación y Título</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Comité, Ley 2365 de acoso y constancia oficial de inducción.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Módulo 5</span>
              {progress.completedModules.includes('mod-5') ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <span className="text-slate-400 dark:text-slate-500">20 min</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
