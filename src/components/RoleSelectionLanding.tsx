import React, { useState, useEffect } from 'react';
import {
  Shield,
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  BookOpen,
  Award,
  Users,
  Sun,
  Moon,
  Sparkles,
  Info,
  PlayCircle,
} from 'lucide-react';
import { ApprenticeProfile, UserRole } from '../types/induction';
import { VideoTutorialModal } from './VideoTutorialModal';

interface RoleSelectionLandingProps {
  onSelectInstructor: () => void;
  onSelectAprendiz: (profile: ApprenticeProfile) => void;
  currentProfile: ApprenticeProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  defaultRoleHint?: UserRole | null;
}

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  onSelectInstructor,
  onSelectAprendiz,
  currentProfile,
  darkMode,
  onToggleDarkMode,
  defaultRoleHint = null,
}) => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  // Read URL query parameter if present: ?rol=instructor or ?rol=aprendiz
  const [selectedRoleTab, setSelectedRoleTab] = useState<'instructor' | 'aprendiz'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryRole = params.get('rol');
      if (queryRole === 'instructor') return 'instructor';
      if (queryRole === 'aprendiz') return 'aprendiz';
    }
    return defaultRoleHint || 'aprendiz';
  });

  // Instructor Password State
  const [instructorPassword, setInstructorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [instructorIsSubmitting, setInstructorIsSubmitting] = useState(false);

  // Aprendiz Characterization Form State
  const [learnerForm, setLearnerForm] = useState<ApprenticeProfile>({
    fullName: currentProfile?.fullName || '',
    documentType: currentProfile?.documentType || 'CC',
    documentNumber: currentProfile?.documentNumber || '',
    fichaNumber: currentProfile?.fichaNumber || '',
    programName: currentProfile?.programName || '',
    centerName: currentProfile?.centerName || 'Centro de Servicios Empresariales y Turísticos',
    regional: currentProfile?.regional || 'Regional Santander',
  });
  const [learnerFormError, setLearnerFormError] = useState<string | null>(null);

  // Handle URL change detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryRole = params.get('rol');
      if (queryRole === 'instructor') {
        setSelectedRoleTab('instructor');
      } else if (queryRole === 'aprendiz') {
        setSelectedRoleTab('aprendiz');
      }
    }
  }, []);

  // Handle Instructor Submission
  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (!instructorPassword.trim()) {
      setPasswordError('Por favor ingrese la clave de instructor.');
      return;
    }

    // Fixed requested password: Sena1234
    if (instructorPassword.trim() === 'Sena1234') {
      setInstructorIsSubmitting(true);
      setTimeout(() => {
        onSelectInstructor();
      }, 250);
    } else {
      setPasswordError('Clave incorrecta. La clave institucional para instructores es Sena1234.');
    }
  };

  // Handle Aprendiz Submission (NO password required)
  const handleLearnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLearnerFormError(null);

    if (!learnerForm.fullName.trim()) {
      setLearnerFormError('Por favor ingrese sus nombres y apellidos completos.');
      return;
    }
    if (!learnerForm.documentNumber.trim()) {
      setLearnerFormError('Por favor ingrese su número de documento de identidad.');
      return;
    }
    if (!learnerForm.fichaNumber.trim()) {
      setLearnerFormError('Por favor ingrese el número de su ficha de formación.');
      return;
    }
    if (!learnerForm.programName.trim()) {
      setLearnerFormError('Por favor ingrese el nombre del programa en el que está matriculado.');
      return;
    }

    onSelectAprendiz(learnerForm);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-500/10 dark:bg-teal-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-600/10 dark:bg-emerald-700/15 rounded-full blur-3xl" />
      </div>

      {/* Top Bar with Logo & Dark Mode Toggle */}
      <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <img
                src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e"
                alt="Logo SENA"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase block">
                Servicio Nacional de Aprendizaje SENA
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block">
                Sistema Integral de Inducción · Acuerdo 009 de 2024
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsTutorialOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver Tutorial</span>
          </button>
          <button
            onClick={onToggleDarkMode}
            type="button"
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800/80 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Plataforma Institucional de Inducción
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Bienvenido al Portal de Inducción SENA
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Selecciona tu rol para acceder. El perfil de <strong>Instructor</strong> cuenta con privilegios administrativos protegidos por clave, mientras que el <strong>Aprendiz</strong> accede directamente completando su caracterización formativa.
          </p>

          {/* Quick Tab Switcher on mobile/tablet */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 sm:hidden">
            <button
              onClick={() => setSelectedRoleTab('aprendiz')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedRoleTab === 'aprendiz'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Soy Aprendiz
            </button>
            <button
              onClick={() => setSelectedRoleTab('instructor')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedRoleTab === 'instructor'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Soy Instructor (Clave)
            </button>
          </div>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ========================================================
              CARD 1: APRENDIZ SENA (No clave, requiere caracterización)
              ======================================================== */}
          <div
            className={`bg-white dark:bg-slate-900 rounded-3xl border-2 transition-all duration-300 shadow-xl overflow-hidden flex flex-col ${
              selectedRoleTab === 'aprendiz'
                ? 'border-emerald-600 dark:border-emerald-500 ring-4 ring-emerald-500/10'
                : 'border-slate-200 dark:border-slate-800 opacity-95 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {/* Header Pill */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/25 text-white border border-white/30">
                  Sin Contraseña
                </span>
              </div>
              <h2 className="text-xl font-bold mt-4">Ingreso de Aprendices</h2>
              <p className="text-xs text-emerald-100 mt-1">
                Inducción Integral: 6 módulos normativos, 24 derechos y deberes, simulador de casos y certificación oficial.
              </p>
            </div>

            {/* Body: Characterization Form */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 mb-5 text-xs text-emerald-900 dark:text-emerald-200">
                  <Info className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <span>
                    <strong>Registro de Caracterización:</strong> Ingresa tus datos para registrar tus avances, sincronizar con la planilla de tu ficha y generar tu Certificado de Inducción.
                  </span>
                </div>

                {learnerFormError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{learnerFormError}</span>
                  </div>
                )}

                <form id="learner-form" onSubmit={handleLearnerSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nombres y Apellidos Completos *
                    </label>
                    <input
                      type="text"
                      required
                      value={learnerForm.fullName}
                      onChange={(e) => setLearnerForm({ ...learnerForm, fullName: e.target.value })}
                      placeholder="Ej. Tatiana García Morales"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Tipo Doc. *
                      </label>
                      <select
                        value={learnerForm.documentType}
                        onChange={(e) =>
                          setLearnerForm({
                            ...learnerForm,
                            documentType: e.target.value as 'CC' | 'TI' | 'CE' | 'PEP',
                          })
                        }
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      >
                        <option value="CC">CC</option>
                        <option value="TI">TI</option>
                        <option value="CE">CE</option>
                        <option value="PEP">PEP</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Número de Documento *
                      </label>
                      <input
                        type="text"
                        required
                        value={learnerForm.documentNumber}
                        onChange={(e) => setLearnerForm({ ...learnerForm, documentNumber: e.target.value })}
                        placeholder="Ej. 1.098.765.432"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        N° Ficha *
                      </label>
                      <input
                        type="text"
                        required
                        value={learnerForm.fichaNumber}
                        onChange={(e) => setLearnerForm({ ...learnerForm, fichaNumber: e.target.value })}
                        placeholder="Ej. 2874195"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Programa de Formación *
                      </label>
                      <input
                        type="text"
                        required
                        value={learnerForm.programName}
                        onChange={(e) => setLearnerForm({ ...learnerForm, programName: e.target.value })}
                        placeholder="Ej. Análisis y Desarrollo de Software"
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Centro de Formación SENA
                    </label>
                    <input
                      type="text"
                      value={learnerForm.centerName}
                      onChange={(e) => setLearnerForm({ ...learnerForm, centerName: e.target.value })}
                      placeholder="Ej. Centro de Gestión de Mercados / CTIC"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Regional SENA
                    </label>
                    <input
                      type="text"
                      value={learnerForm.regional}
                      onChange={(e) => setLearnerForm({ ...learnerForm, regional: e.target.value })}
                      placeholder="Ej. Regional Distrito Capital"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                </form>
              </div>

              {/* Submit button for learner */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  form="learner-form"
                  className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Comenzar Mi Inducción</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                  No requiere contraseña · Tus respuestas se guardan de forma segura
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              CARD 2: INSTRUCTOR / COORDINADOR (Requiere clave: Sena1234)
              ======================================================== */}
          <div
            className={`bg-white dark:bg-slate-900 rounded-3xl border-2 transition-all duration-300 shadow-xl overflow-hidden flex flex-col ${
              selectedRoleTab === 'instructor'
                ? 'border-emerald-600 dark:border-emerald-500 ring-4 ring-emerald-500/10'
                : 'border-slate-200 dark:border-slate-800 opacity-95 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {/* Header Pill */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 backdrop-blur-md flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-inner">
                  <Shield className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Requiere Clave
                </span>
              </div>
              <h2 className="text-xl font-bold mt-4">Panel del Instructor</h2>
              <p className="text-xs text-slate-300 mt-1">
                Monitoreo y administración exclusiva para instructores y coordinadores de ficha.
              </p>
            </div>

            {/* Body: Privileges & Security Form */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                {/* Privileges Highlights */}
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Privilegios del Rol Instructor:
                </h3>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Sincronización con Google Sheets & Drive:</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Control total sobre la hoja de cálculo institucional con actualización automática y manual.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Seguimiento por Fichas y Aprendices:</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Filtros de búsqueda, métricas de aprobación, y revisión detallada de porcentajes de inducción.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Distribución del Enlace de Inducción:</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Genera y copia el enlace directo con rol de aprendiz para compartir a tus grupos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Password Form */}
                <form id="instructor-form" onSubmit={handleInstructorSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-900 dark:text-white">
                        Contraseña de Acceso Institucional *
                      </label>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={instructorPassword}
                        onChange={(e) => {
                          setInstructorPassword(e.target.value);
                          if (passwordError) setPasswordError(null);
                        }}
                        placeholder="Ingrese la clave (Sena1234)"
                        required
                        className={`w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 ${
                          passwordError
                            ? 'border-rose-400 dark:border-rose-600 focus:ring-rose-500/20'
                            : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-600'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {passwordError && (
                      <p className="mt-2 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 animate-in fade-in duration-200">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{passwordError}</span>
                      </p>
                    )}
                  </div>
                </form>
              </div>

              {/* Submit button for instructor */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="submit"
                  form="instructor-form"
                  disabled={instructorIsSubmitting}
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50"
                >
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>
                    {instructorIsSubmitting ? 'Verificando credenciales...' : 'Ingresar al Panel de Instructor'}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                  Acceso restringido a instructores y personal administrativo SENA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informative Security Footer */}
        <div className="mt-10 max-w-3xl mx-auto p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2 mb-1 text-slate-700 dark:text-slate-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Separación estricta de privilegios de usuario</span>
          </div>
          <p>
            Los aprendices no tienen acceso a la configuración ni a las hojas de cálculo de Google Drive. Los instructores pueden compartir directamente el enlace oficial y monitorear el progreso de toda la ficha.
          </p>
        </div>
      </main>

      {/* Institutional Bottom Banner */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <span>Servicio Nacional de Aprendizaje SENA · Dirección de Formación Profesional Integral · Colombia</span>
      </footer>
      <VideoTutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </div>
  );
};
