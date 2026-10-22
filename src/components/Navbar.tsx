import React from 'react';
import { User, Award, BookOpen, Search, HelpCircle, FileText, Sun, Moon, FileSpreadsheet, RefreshCw, Check, Shield, Users, LogOut } from 'lucide-react';
import { ApprenticeProfile, UserRole } from '../types/induction';
import { SyncStatus } from '../services/useAutoSync';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: ApprenticeProfile;
  onOpenProfile: () => void;
  onOpenPlan: () => void;
  onOpenGoogleDrive: () => void;
  quizScore: number;
  quizCompleted: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  syncStatus?: SyncStatus;
  role: UserRole;
  onToggleRole: (role: UserRole) => void;
  onLogoutToLanding?: () => void;
  onRequestInstructorAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenProfile,
  onOpenPlan,
  onOpenGoogleDrive,
  quizCompleted,
  darkMode,
  onToggleDarkMode,
  syncStatus = 'disconnected',
  role = 'aprendiz',
  onToggleRole,
  onLogoutToLanding,
  onRequestInstructorAuth,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand Wordmark with Official SENA Vector Logo */}
          <button
            onClick={() => setActiveTab(role === 'instructor' ? 'panel-instructor' : 'inicio')}
            className="flex items-center gap-2.5 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
          >
            <div className="w-[58px] h-[58px] flex items-center justify-center shrink-0">
              <img
                src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e"
                alt="Logo SENA"
                className="w-[58px] h-[58px] object-contain"
              />
            </div>
            <div className="leading-tight">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
                SENA Inducción
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block">
                {role === 'instructor' ? 'Portal del Instructor' : 'Inducción de Aprendices'}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {role === 'instructor' && (
              <button
                onClick={() => setActiveTab('panel-instructor')}
                className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                  activeTab === 'panel-instructor' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : ''
                }`}
              >
                <Users className="w-4 h-4" />
                Seguimiento de Aprendices
              </button>
            )}

            <button
              onClick={() => setActiveTab('inicio')}
              className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'inicio' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab('modulos')}
              className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                activeTab === 'modulos' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Módulos Normativos
            </button>
            <button
              onClick={() => setActiveTab('derechos')}
              className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                activeTab === 'derechos' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              <Search className="w-4 h-4" />
              24 Derechos
            </button>
            <button
              onClick={() => setActiveTab('casos')}
              className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                activeTab === 'casos' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Simulador
            </button>
            <button
              onClick={() => setActiveTab('evaluacion')}
              className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                activeTab === 'evaluacion' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              <Award className="w-4 h-4" />
              Evaluación
            </button>
            <button
              onClick={() => setActiveTab('certificado')}
              className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5 ${
                activeTab === 'certificado' ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600' : ''
              }`}
            >
              <FileText className="w-4 h-4" />
              Certificado
              {quizCompleted && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Actions + Dark Mode Toggle + Role Selector */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Google Drive / Sheets Sync Button - INSTRUCTOR ONLY */}
            {role === 'instructor' && (
              <button
                onClick={onOpenGoogleDrive}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-xs border ${
                  syncStatus === 'syncing'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : syncStatus === 'synced'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 dark:hover:bg-emerald-900/60'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
                title={
                  syncStatus === 'syncing'
                    ? 'Guardando automáticamente en Google Sheets...'
                    : syncStatus === 'synced'
                    ? 'Datos sincronizados automáticamente en Google Sheets'
                    : 'Sincronizar datos con Google Sheets en Google Drive'
                }
              >
                {syncStatus === 'syncing' ? (
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-spin" />
                ) : syncStatus === 'synced' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                )}
                <span className="hidden sm:inline">
                  {syncStatus === 'syncing'
                    ? 'Guardando...'
                    : syncStatus === 'synced'
                    ? 'Sincronizado'
                    : 'Google Drive'}
                </span>
              </button>
            )}

            {/* Role Switcher Pill */}
            {role === 'instructor' ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onToggleRole('aprendiz')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  title="Cambiar a vista previa de aprendiz"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Vista Aprendiz</span>
                </button>
                {onLogoutToLanding && (
                  <button
                    onClick={onLogoutToLanding}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Cerrar sesión y volver a la selección de rol"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Salir</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onRequestInstructorAuth || (() => onToggleRole('instructor'))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200"
                  title="Ingresar como Instructor (Requiere clave Sena1234)"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Soy Instructor</span>
                </button>
                {onLogoutToLanding && (
                  <button
                    onClick={onLogoutToLanding}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Volver a la pantalla de selección de rol"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Cambiar Rol</span>
                  </button>
                )}
              </div>
            )}

            {/* Dark Mode Icon Toggle */}
            <button
              onClick={onToggleDarkMode}
              type="button"
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-xs"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-300" />
              )}
            </button>

            <button
              onClick={onOpenPlan}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
              title="Ver Plan Estructurado de Inducción"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Plan
            </button>

            <button
              onClick={onOpenProfile}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span className="max-w-[110px] truncate">{profile.fullName.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs">
        {role === 'instructor' && (
          <button
            onClick={() => setActiveTab('panel-instructor')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'panel-instructor' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Panel
          </button>
        )}
        <button
          onClick={() => setActiveTab('inicio')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'inicio' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => setActiveTab('modulos')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'modulos' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Módulos
        </button>
        <button
          onClick={() => setActiveTab('derechos')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'derechos' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Derechos
        </button>
        <button
          onClick={() => setActiveTab('casos')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'casos' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Simulador
        </button>
        <button
          onClick={() => setActiveTab('evaluacion')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'evaluacion' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Evaluación
        </button>
        <button
          onClick={() => setActiveTab('certificado')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'certificado' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Certificado
        </button>

        {/* Mobile Role Switcher */}
        {role === 'instructor' ? (
          <>
            <button
              onClick={() => onToggleRole('aprendiz')}
              className="px-2.5 py-1 rounded-md whitespace-nowrap bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium text-[11px]"
            >
              Vista Aprendiz
            </button>
            {onLogoutToLanding && (
              <button
                onClick={onLogoutToLanding}
                className="px-2 py-1 rounded-md whitespace-nowrap text-slate-500 font-medium text-[11px]"
              >
                Salir
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={onRequestInstructorAuth || (() => onToggleRole('instructor'))}
              className="px-2.5 py-1 rounded-md whitespace-nowrap text-slate-500 font-medium text-[11px]"
            >
              Instructor (Clave)
            </button>
            {onLogoutToLanding && (
              <button
                onClick={onLogoutToLanding}
                className="px-2 py-1 rounded-md whitespace-nowrap text-slate-500 font-medium text-[11px]"
              >
                Cambiar Rol
              </button>
            )}
          </>
        )}

        {/* Mobile Google Drive Button ONLY for Instructor */}
        {role === 'instructor' && (
          <button
            onClick={onOpenGoogleDrive}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium flex items-center gap-1 ${
              syncStatus === 'syncing'
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                : syncStatus === 'synced'
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {syncStatus === 'syncing' ? (
              <RefreshCw className="w-3 h-3 animate-spin text-amber-600" />
            ) : syncStatus === 'synced' ? (
              <Check className="w-3 h-3 text-emerald-600" />
            ) : (
              <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
            )}
            <span>
              {syncStatus === 'syncing' ? 'Guardando' : syncStatus === 'synced' ? 'Drive ✓' : 'Drive'}
            </span>
          </button>
        )}
      </div>
    </header>
  );
};
