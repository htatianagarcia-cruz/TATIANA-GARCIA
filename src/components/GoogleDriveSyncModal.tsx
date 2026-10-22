import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  googleSignIn,
  getAccessToken,
  logoutGoogle,
  initAuth,
} from '../services/googleAuth';
import {
  getOrCreateSpreadsheet,
  syncApprenticeRecord,
  getSpreadsheetRecords,
  SheetApprenticeRecord,
  SPREADSHEET_TITLE,
} from '../services/googleSheetsService';
import { ApprenticeProfile, UserProgress } from '../types/induction';
import {
  X,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  Database,
  Check,
} from 'lucide-react';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  progress: UserProgress;
  autoSyncEnabled?: boolean;
  onToggleAutoSync?: (enabled: boolean) => void;
  lastSyncedAt?: Date | null;
}

export const GoogleDriveSyncModal: React.FC<GoogleDriveSyncModalProps> = ({
  isOpen,
  onClose,
  profile,
  progress,
  autoSyncEnabled = true,
  onToggleAutoSync,
  lastSyncedAt,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [spreadsheetInfo, setSpreadsheetInfo] = useState<{
    id: string;
    title: string;
    url: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('sena_google_sheet_info');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [records, setRecords] = useState<SheetApprenticeRecord[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Confirmation dialog state for data mutation
  const [showConfirmSync, setShowConfirmSync] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // When token is available, check or load spreadsheet records
  useEffect(() => {
    if (accessToken && spreadsheetInfo?.id) {
      loadRecords(accessToken, spreadsheetInfo.id);
    }
  }, [accessToken, spreadsheetInfo?.id]);

  const loadRecords = async (token: string, sheetId: string) => {
    setIsLoadingRecords(true);
    try {
      const rows = await getSpreadsheetRecords(token, sheetId);
      setRecords(rows);
    } catch (err) {
      console.error('Error al cargar registros de la hoja', err);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        setStatusMessage({
          type: 'success',
          text: `Conectado exitosamente como ${res.user.displayName || res.user.email}`,
        });

        // Automatically connect or create spreadsheet
        const sheet = await getOrCreateSpreadsheet(res.accessToken);
        setSpreadsheetInfo(sheet);
        localStorage.setItem('sena_google_sheet_info', JSON.stringify(sheet));
        await loadRecords(res.accessToken, sheet.id);
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Error al iniciar sesión con Google',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setCurrentUser(null);
    setAccessToken(null);
    setStatusMessage({
      type: 'info',
      text: 'Sesión de Google cerrada',
    });
  };

  const executeSync = async () => {
    setShowConfirmSync(false);
    if (!accessToken) {
      setStatusMessage({
        type: 'error',
        text: 'Debes iniciar sesión con Google para sincronizar',
      });
      return;
    }

    setIsSyncing(true);
    setStatusMessage(null);
    try {
      // 1. Ensure spreadsheet exists
      let currentSheet = spreadsheetInfo;
      if (!currentSheet) {
        currentSheet = await getOrCreateSpreadsheet(accessToken);
        setSpreadsheetInfo(currentSheet);
        localStorage.setItem('sena_google_sheet_info', JSON.stringify(currentSheet));
      }

      // 2. Sync apprentice record
      const result = await syncApprenticeRecord(
        accessToken,
        currentSheet.id,
        profile,
        progress
      );

      setStatusMessage({
        type: 'success',
        text:
          result.action === 'updated'
            ? `Registro de "${profile.fullName}" actualizado correctamente en Google Sheets`
            : `Registro de "${profile.fullName}" insertado exitosamente en Google Sheets`,
      });

      // Reload rows
      await loadRecords(accessToken, currentSheet.id);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Error al sincronizar con Google Sheets',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[92vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sincronización con Google Drive & Google Sheets
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Almacena los datos y avance de inducción de los aprendices en una hoja de cálculo oficial
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
          {/* Status Alert if any */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : statusMessage.type === 'error'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{statusMessage.text}</span>
            </div>
          )}

          {/* User Auth Section */}
          {!currentUser ? (
            <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Conecta tu cuenta de Google
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  La plataforma creará una hoja de cálculo titulada <strong className="text-slate-700 dark:text-slate-300">"{SPREADSHEET_TITLE}"</strong> en tu Google Drive y registrará la información personal y académica del aprendiz.
                </p>
              </div>

              {/* If spreadsheet was previously generated */}
              {spreadsheetInfo?.url ? (
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-left space-y-2">
                  <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Enlace de tu hoja de cálculo:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={spreadsheetInfo.url}
                      className="flex-1 px-3 py-1.5 text-[11px] font-mono bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-lg text-slate-800 dark:text-slate-200 select-all"
                    />
                    <a
                      href={spreadsheetInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
                    >
                      <span>Abrir</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-left space-y-2 text-slate-600 dark:text-slate-400">
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                    Enlaces de acceso rápido a tu Google Drive / Google Sheets:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://drive.google.com/drive/u/0/search?q=SENA%20-%20Registro%20Oficial%20de%20Aprendices%20e%20Inducci%C3%B3n"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Buscar hoja en Google Drive</span>
                    </a>
                    <a
                      href="https://sheets.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Abrir Google Sheets</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Official Google Sign-In button styling compliant with Google Workspace Skill */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-xl shadow-xs font-semibold text-xs transition-all disabled:opacity-50"
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-4 h-4"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>
                    {isLoggingIn ? 'Conectando con Google...' : 'Iniciar sesión con Google'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Connected User Bar */}
              <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'Google User'}
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center">
                      {(currentUser.displayName || currentUser.email || 'G')[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {currentUser.displayName || 'Usuario de Google'}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      {currentUser.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors font-medium"
                  >
                    Desconectar
                  </button>
                </div>
              </div>

              {/* Connected Sheet Card */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Hoja de Cálculo en Google Drive:
                  </span>
                  {spreadsheetInfo?.url && (
                    <a
                      href={spreadsheetInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      <span>Abrir en Google Drive</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {spreadsheetInfo?.title || SPREADSHEET_TITLE}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                    ID: {spreadsheetInfo?.id || 'Generando en Drive...'}
                  </p>
                </div>

                {/* Direct Link Box with 1-click Copy */}
                {spreadsheetInfo?.url && (
                  <div className="p-3 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-2">
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Enlace directo a tu hoja de cálculo:
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={spreadsheetInfo.url}
                        className="flex-1 px-3 py-1.5 text-[11px] font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 select-all focus:outline-hidden"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(spreadsheetInfo.url);
                          setStatusMessage({
                            type: 'success',
                            text: '¡Enlace de Google Sheets copiado al portapapeles!',
                          });
                        }}
                        className="px-3 py-1.5 text-[11px] font-semibold bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 shrink-0"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Copiar enlace</span>
                      </button>
                      <a
                        href={spreadsheetInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors shrink-0"
                        title="Abrir en pestaña nueva"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Apprentice Info to Sync */}
                <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Aprendiz a sincronizar: </span>
                    <strong className="text-slate-900 dark:text-white">{profile.fullName}</strong> ({profile.documentType} {profile.documentNumber})
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Progreso: </span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {progress.completedModules.length}/5 módulos · {progress.quizCompleted ? 'Certificado' : 'En proceso'}
                    </span>
                  </div>
                </div>

                {/* Auto-Sync Status & Toggle Card */}
                <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40">
                  <div className="p-3 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                        Sincronización Automática Continua
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Guarda en segundo plano al completar módulos, evaluar o editar perfil sin pedir confirmación.
                      </p>
                      {lastSyncedAt && (
                        <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
                          Última sincronización: {lastSyncedAt.toLocaleTimeString('es-CO')}
                        </p>
                      )}
                    </div>
                    {onToggleAutoSync && (
                      <button
                        onClick={() => onToggleAutoSync(!autoSyncEnabled)}
                        type="button"
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                          autoSyncEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                        role="switch"
                        aria-checked={autoSyncEnabled}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            autoSyncEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Sync Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowConfirmSync(true)}
                    disabled={isSyncing}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-xs transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>
                      {isSyncing ? 'Sincronizando con Google Drive...' : 'Sincronizar Datos a Google Sheets'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Records Preview Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Registros Almacenados en la Hoja ({records.length})
                  </span>
                  <button
                    onClick={() => accessToken && spreadsheetInfo?.id && loadRecords(accessToken, spreadsheetInfo.id)}
                    disabled={isLoadingRecords}
                    className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingRecords ? 'animate-spin' : ''}`} />
                    <span>Actualizar tabla</span>
                  </button>
                </div>

                {records.length > 0 ? (
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto max-h-48">
                    <table className="w-full text-left text-[11px] divide-y divide-slate-200 dark:divide-slate-800">
                      <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold sticky top-0">
                        <tr>
                          <th className="px-3 py-2">Aprendiz</th>
                          <th className="px-3 py-2">Documento</th>
                          <th className="px-3 py-2">Ficha</th>
                          <th className="px-3 py-2">Módulos</th>
                          <th className="px-3 py-2">Evaluación</th>
                          <th className="px-3 py-2">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {records.map((r, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-3 py-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                              {r.fullName}
                            </td>
                            <td className="px-3 py-2 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {r.documentType} {r.documentNumber}
                            </td>
                            <td className="px-3 py-2 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {r.fichaNumber}
                            </td>
                            <td className="px-3 py-2 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {r.modulesCompleted}
                            </td>
                            <td className="px-3 py-2 font-mono text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                              {r.score} ({r.percentage})
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  r.status === 'CERTIFICADO'
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                }`}
                              >
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center text-slate-500 dark:text-slate-400">
                    Aún no hay registros en la hoja. Haz clic en "Sincronizar Datos a Google Sheets" para registrar los datos del aprendiz actual.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            API v4 de Google Sheets & Google Drive
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white rounded-lg font-semibold text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Modal for Destructive/Mutating operations */}
      {showConfirmSync && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  ¿Confirmar sincronización con Google Sheets?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Esta acción guardará o actualizará la información del aprendiz en tu Google Drive.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <p>
                <strong>Aprendiz:</strong> {profile.fullName}
              </p>
              <p>
                <strong>Documento:</strong> {profile.documentType} {profile.documentNumber}
              </p>
              <p>
                <strong>Destino:</strong> Hoja "{SPREADSHEET_TITLE}" en Google Drive
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmSync(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={executeSync}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
              >
                Confirmar y Sincronizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
