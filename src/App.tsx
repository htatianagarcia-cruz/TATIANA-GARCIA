import React, { useState, useEffect } from 'react';
import { ApprenticeProfile, UserProgress, UserRole } from './types/induction';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModulesView } from './components/ModulesView';
import { RightsDutiesExplorer } from './components/RightsDutiesExplorer';
import { CaseSimulator } from './components/CaseSimulator';
import { GamifiedQuiz } from './components/GamifiedQuiz';
import { CertificateView } from './components/CertificateView';
import { ApprenticeProfileModal } from './components/ApprenticeProfileModal';
import { InductionPlanModal } from './components/InductionPlanModal';
import { GoogleDriveSyncModal } from './components/GoogleDriveSyncModal';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { SyncToast } from './components/SyncToast';
import { InstructorDashboard } from './components/InstructorDashboard';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { InstructorAuthModal } from './components/InstructorAuthModal';
import { useAutoSync } from './services/useAutoSync';

const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'Tatiana García Morales',
  documentType: 'CC',
  documentNumber: '1.098.765.432',
  fichaNumber: '2874195',
  programName: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  centerName: 'Centro de Servicios Empresariales y Turísticos',
  regional: 'Regional Santander',
};

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: ['mod-1'],
  quizCompleted: false,
  quizScore: 0,
  totalQuestions: 8,
  unlockedBadges: ['bienvenida-sena'],
  simulationScore: 0,
  completedCases: [],
};

export default function App() {
  // Session State: 'landing' (Role Selection Landing Page) vs 'active' (Inside the App)
  const [sessionState, setSessionState] = useState<'landing' | 'active'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const queryRole = urlParams.get('rol');
        if (queryRole === 'select' || queryRole === 'landing') {
          return 'landing';
        }
        const savedSession = localStorage.getItem('sena_session_active');
        if (savedSession === 'active') {
          return 'active';
        }
      }
    } catch {}
    return 'landing';
  });

  // User Role State: 'instructor' (administrative controls) vs 'aprendiz' (clean learner induction)
  const [role, setRole] = useState<UserRole>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const queryRole = urlParams.get('rol');
        if (queryRole === 'aprendiz' || queryRole === 'instructor') {
          return queryRole;
        }
        const saved = localStorage.getItem('sena_user_role');
        if (saved === 'aprendiz' || saved === 'instructor') {
          return saved;
        }
      }
    } catch {}
    return 'instructor';
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const queryRole = urlParams.get('rol');
        if (queryRole === 'aprendiz') return 'inicio';
        if (queryRole === 'instructor') return 'panel-instructor';
      }
      const saved = localStorage.getItem('sena_user_role');
      if (saved === 'aprendiz') return 'inicio';
    } catch {}
    return 'panel-instructor';
  });

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [googleDriveModalOpen, setGoogleDriveModalOpen] = useState(false);
  const [instructorAuthModalOpen, setInstructorAuthModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isScreenBlurring, setIsScreenBlurring] = useState(false);

  // Sync role to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_user_role', role);
    } catch (e) {
      console.warn('Error saving role', e);
    }
  }, [role]);

  const handleToggleRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'instructor') {
      setActiveTab('panel-instructor');
    } else {
      setActiveTab('inicio');
    }
  };

  // Dark Mode State with localStorage persistence and system preference fallback
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('sena_theme_mode');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply .dark class to root html element
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('sena_theme_mode', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('sena_theme_mode', 'light');
      }
    } catch (e) {
      console.warn('Error saving theme', e);
    }
  }, [darkMode]);

  // Load saved profile or default
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Load saved progress or default
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('sena_induction_progress');
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  // Automated background sync engine with Google Sheets
  const {
    accessToken,
    spreadsheetUrl,
    syncStatus,
    lastSyncedAt,
    toast,
    dismissToast,
    autoSyncEnabled,
    setAutoSyncEnabled,
  } = useAutoSync(profile, progress);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Error saving profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_induction_progress', JSON.stringify(progress));
    } catch (e) {
      console.warn('Error saving progress', e);
    }
  }, [progress]);

  // Handler for Dark Mode toggle with blur effect on screen
  const handleToggleDarkMode = () => {
    setIsScreenBlurring(true);
    setDarkMode((prev) => !prev);
    setTimeout(() => {
      setIsScreenBlurring(false);
    }, 650);
  };

  const handleToggleCompleteModule = (moduleId: string) => {
    setProgress((prev) => {
      const exists = prev.completedModules.includes(moduleId);
      const nextModules = exists
        ? prev.completedModules.filter((id) => id !== moduleId)
        : [...prev.completedModules, moduleId];

      return {
        ...prev,
        completedModules: nextModules,
      };
    });
  };

  const handleAddCaseScore = (points: number, caseId: string) => {
    setProgress((prev) => ({
      ...prev,
      simulationScore: prev.simulationScore + points,
      completedCases: prev.completedCases.includes(caseId)
        ? prev.completedCases
        : [...prev.completedCases, caseId],
    }));
  };

  const handleQuizComplete = (score: number, total: number) => {
    const isPassing = score >= Math.ceil(total * 0.7);
    const uniqueCode = `SENA-IND-2024-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const dateStr = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setProgress((prev) => ({
      ...prev,
      quizCompleted: isPassing,
      quizScore: score,
      totalQuestions: total,
      certificateIssuedAt: isPassing ? dateStr : prev.certificateIssuedAt,
      certificateCode: isPassing ? (prev.certificateCode || uniqueCode) : prev.certificateCode,
    }));

    if (isPassing) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // If session is in gateway mode, show the institutional Role Selection Landing Page
  if (sessionState === 'landing') {
    return (
      <RoleSelectionLanding
        onSelectInstructor={() => {
          setRole('instructor');
          setActiveTab('panel-instructor');
          setSessionState('active');
          try {
            localStorage.setItem('sena_session_active', 'active');
            localStorage.setItem('sena_user_role', 'instructor');
          } catch {}
        }}
        onSelectAprendiz={(updatedProfile) => {
          setProfile(updatedProfile);
          setRole('aprendiz');
          setActiveTab('inicio');
          setSessionState('active');
          try {
            localStorage.setItem('sena_session_active', 'active');
            localStorage.setItem('sena_user_role', 'aprendiz');
            localStorage.setItem('sena_apprentice_profile', JSON.stringify(updatedProfile));
          } catch {}
        }}
        currentProfile={profile}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        defaultRoleHint={role}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300 relative overflow-x-hidden">
      {/* Dynamic Screen Blur Overlay Triggered on Mode Switch */}
      {isScreenBlurring && (
        <div
          className="fixed inset-0 z-50 pointer-events-none screen-blur-active bg-slate-900/10 dark:bg-slate-950/20 backdrop-blur-md"
          aria-hidden="true"
        />
      )}

      {/* Atmospheric Ambient Glows for Dark Mode */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-opacity duration-500 opacity-0 dark:opacity-100">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-teal-800/10 rounded-full blur-3xl" />
      </div>

      <ConfettiCanvas active={showConfetti} />

      {/* Top Navbar with Theme Toggle Icon and Google Drive Button */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenPlan={() => setPlanModalOpen(true)}
        onOpenGoogleDrive={() => setGoogleDriveModalOpen(true)}
        quizScore={progress.quizScore}
        quizCompleted={progress.quizCompleted}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        syncStatus={syncStatus}
        role={role}
        onToggleRole={(newRole) => {
          if (newRole === 'instructor' && role === 'aprendiz') {
            setInstructorAuthModalOpen(true);
          } else {
            handleToggleRole(newRole);
          }
        }}
        onLogoutToLanding={() => {
          setSessionState('landing');
          try {
            localStorage.removeItem('sena_session_active');
          } catch {}
        }}
        onRequestInstructorAuth={() => setInstructorAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'panel-instructor' && (
          <InstructorDashboard
            accessToken={accessToken}
            spreadsheetUrl={spreadsheetUrl}
            onOpenGoogleDriveModal={() => setGoogleDriveModalOpen(true)}
            lastSyncedAt={lastSyncedAt}
            currentApprenticeProfile={profile}
            currentApprenticeProgress={progress}
            onSwitchToLearnerView={() => handleToggleRole('aprendiz')}
          />
        )}

        {activeTab === 'inicio' && (
          <HeroSection
            onStartModules={() => setActiveTab('modulos')}
            onStartQuiz={() => setActiveTab('evaluacion')}
            onExploreRights={() => setActiveTab('derechos')}
            profile={profile}
            progress={progress}
          />
        )}

        {activeTab === 'modulos' && (
          <ModulesView
            completedModules={progress.completedModules}
            onToggleCompleteModule={handleToggleCompleteModule}
            onGoToQuiz={() => setActiveTab('evaluacion')}
          />
        )}

        {activeTab === 'derechos' && <RightsDutiesExplorer />}

        {activeTab === 'casos' && (
          <CaseSimulator
            onAddScore={handleAddCaseScore}
            completedCases={progress.completedCases}
          />
        )}

        {activeTab === 'evaluacion' && (
          <GamifiedQuiz
            onQuizComplete={handleQuizComplete}
            onGoToCertificate={() => setActiveTab('certificado')}
            profile={profile}
            alreadyCompleted={progress.quizCompleted}
            savedScore={progress.quizScore}
          />
        )}

        {activeTab === 'certificado' && (
          <CertificateView
            profile={profile}
            progress={progress}
            onGoToQuiz={() => setActiveTab('evaluacion')}
            onOpenGoogleDrive={() => setGoogleDriveModalOpen(true)}
            role={role}
          />
        )}
      </main>

      {/* Modals */}
      <ApprenticeProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => setProfile(updated)}
      />

      <InductionPlanModal
        isOpen={planModalOpen}
        onClose={() => setPlanModalOpen(false)}
      />

      <GoogleDriveSyncModal
        isOpen={googleDriveModalOpen}
        onClose={() => setGoogleDriveModalOpen(false)}
        profile={profile}
        progress={progress}
        autoSyncEnabled={autoSyncEnabled}
        onToggleAutoSync={setAutoSyncEnabled}
        lastSyncedAt={lastSyncedAt}
      />

      <InstructorAuthModal
        isOpen={instructorAuthModalOpen}
        onClose={() => setInstructorAuthModalOpen(false)}
        onSuccess={() => {
          handleToggleRole('instructor');
        }}
      />

      {/* Quiet Footer adhering to anti-slop rules */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">SENA</span>
            <span aria-hidden="true">·</span>
            <span>Servicio Nacional de Aprendizaje</span>
            <span aria-hidden="true">·</span>
            <span>Acuerdo 009 de 2024</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {role === 'instructor' ? (
              <>
                <button
                  onClick={() => setGoogleDriveModalOpen(true)}
                  className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Google Drive & Sheets
                </button>
                <button
                  onClick={() => handleToggleRole('aprendiz')}
                  className="text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  Vista Aprendiz
                </button>
              </>
            ) : (
              <button
                onClick={() => setInstructorAuthModalOpen(true)}
                className="text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium"
              >
                Portal Instructor (Clave)
              </button>
            )}
            <button
              onClick={() => {
                setSessionState('landing');
                try {
                  localStorage.removeItem('sena_session_active');
                } catch {}
              }}
              className="text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-semibold"
            >
              Cambiar Rol / Salir
            </button>
            <button
              onClick={() => setPlanModalOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              Plan de Inducción
            </button>
            <button
              onClick={() => setActiveTab('derechos')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              24 Derechos
            </button>
            <button
              onClick={() => setActiveTab('certificado')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              Verificar Certificado
            </button>
            <button
              onClick={() => setProfileModalOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              Ajustes de Perfil
            </button>
          </div>
        </div>
      </footer>

      {/* Discrete Auto-Sync Toast Notification */}
      <SyncToast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
