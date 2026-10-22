import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Users,
  Award,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Shield,
  BookOpen,
  Share2,
  AlertCircle,
  Database,
} from 'lucide-react';
import {
  getSpreadsheetRecords,
  SheetApprenticeRecord,
  SPREADSHEET_TITLE,
} from '../services/googleSheetsService';
import { ApprenticeProfile, UserProgress } from '../types/induction';

interface InstructorDashboardProps {
  accessToken: string | null;
  spreadsheetUrl: string | null;
  onOpenGoogleDriveModal: () => void;
  lastSyncedAt: Date | null;
  currentApprenticeProfile: ApprenticeProfile;
  currentApprenticeProgress: UserProgress;
  onSwitchToLearnerView: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  accessToken,
  spreadsheetUrl,
  onOpenGoogleDriveModal,
  lastSyncedAt,
  currentApprenticeProfile,
  currentApprenticeProgress,
  onSwitchToLearnerView,
}) => {
  const [records, setRecords] = useState<SheetApprenticeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'certified' | 'in_progress'>('all');
  const [fichaFilter, setFichaFilter] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SheetApprenticeRecord | null>(null);

  // Resilient spreadsheet URL resolution with storage fallback
  const effectiveSpreadsheetUrl = spreadsheetUrl || (() => {
    try {
      const saved = localStorage.getItem('sena_google_sheet_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url) return parsed.url;
      }
      return localStorage.getItem('sena_google_sheet_url') || localStorage.getItem('sena_sheet_url') || null;
    } catch {
      return null;
    }
  })();

  const isSheetConnected = Boolean(effectiveSpreadsheetUrl);
  const isLiveConnected = Boolean(accessToken);

  // Derive learner shareable link
  const learnerShareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?rol=aprendiz`
    : '';

  const loadData = async (token: string, sheetUrlStr: string) => {
    setIsLoading(true);
    try {
      // Extract sheet ID from URL or stored info
      let sheetId = '';
      const match = sheetUrlStr.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        sheetId = match[1];
      } else {
        const saved = localStorage.getItem('sena_google_sheet_info');
        if (saved) {
          const parsed = JSON.parse(saved);
          sheetId = parsed.id;
        }
      }

      if (sheetId) {
        const rows = await getSpreadsheetRecords(token, sheetId);
        setRecords(rows);
      }
    } catch (err) {
      console.error('Error al cargar registros para el instructor:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && effectiveSpreadsheetUrl) {
      loadData(accessToken, effectiveSpreadsheetUrl);
    } else {
      // If offline or not yet connected, synthesize with local apprentice profile if present
      const initialRows: SheetApprenticeRecord[] = [
        {
          timestamp: new Date().toLocaleDateString('es-CO'),
          fullName: currentApprenticeProfile.fullName,
          documentType: currentApprenticeProfile.documentType,
          documentNumber: currentApprenticeProfile.documentNumber,
          fichaNumber: currentApprenticeProfile.fichaNumber,
          programName: currentApprenticeProfile.programName,
          centerName: currentApprenticeProfile.centerName,
          regional: currentApprenticeProfile.regional,
          modulesCompleted: `${currentApprenticeProgress.completedModules.length} de 5`,
          examPassed: currentApprenticeProgress.quizCompleted ? 'SÍ' : 'PENDIENTE',
          score: `${currentApprenticeProgress.quizScore}/${currentApprenticeProgress.totalQuestions}`,
          percentage: `${
            currentApprenticeProgress.totalQuestions > 0
              ? Math.round((currentApprenticeProgress.quizScore / currentApprenticeProgress.totalQuestions) * 100)
              : 0
          }%`,
          certificateCode: currentApprenticeProgress.certificateCode || 'Pendiente',
          certificateDate: currentApprenticeProgress.certificateIssuedAt || 'N/A',
          status: currentApprenticeProgress.quizCompleted ? 'CERTIFICADO' : 'EN PROCESO',
        },
      ];
      setRecords(initialRows);
    }
  }, [accessToken, effectiveSpreadsheetUrl, currentApprenticeProfile, currentApprenticeProgress]);

  const handleCopyLearnerLink = () => {
    if (!learnerShareUrl) return;
    navigator.clipboard.writeText(learnerShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Unique fichas for filter
  const uniqueFichas = Array.from(new Set(records.map((r) => r.fichaNumber).filter(Boolean)));

  // Filtered records
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.documentNumber.includes(searchTerm) ||
      r.fichaNumber.includes(searchTerm) ||
      r.programName.toLowerCase().includes(searchTerm.toLowerCase());

    const isCert = r.status.toUpperCase().includes('CERTIFICADO');
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'certified'
        ? isCert
        : !isCert;

    const matchesFicha = fichaFilter === 'all' ? true : r.fichaNumber === fichaFilter;

    return matchesSearch && matchesStatus && matchesFicha;
  });

  // Calculate KPIs
  const totalLearners = records.length;
  const certifiedCount = records.filter((r) => r.status.toUpperCase().includes('CERTIFICADO')).length;
  const certifiedPercent = totalLearners > 0 ? Math.round((certifiedCount / totalLearners) * 100) : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Instructor Identity and Shareable Link */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 rounded-lg">
                Portal del Instructor
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Acuerdo 009 de 2024
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Seguimiento y Control de Inducción
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Supervisa en tiempo real el cumplimiento del reglamento, evalúa el progreso de tus fichas y administra la sincronización con la hoja oficial de Google Drive.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {effectiveSpreadsheetUrl ? (
              <a
                href={effectiveSpreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Abrir Hoja en Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={onOpenGoogleDriveModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <Database className="w-4 h-4" />
                <span>Conectar Google Sheets</span>
              </button>
            )}

            <button
              onClick={onOpenGoogleDriveModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Shield className="w-4 h-4 text-slate-500" />
              <span>Configuración Drive</span>
            </button>

            <button
              onClick={onSwitchToLearnerView}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors border border-dashed border-slate-300 dark:border-slate-700"
              title="Ver el prototipo tal como lo ven los aprendices"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Vista de Aprendiz</span>
            </button>
          </div>
        </div>

        {/* Shareable Link Box for Apprentices */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/70 dark:bg-slate-850/50 p-4 rounded-2xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              Enlace de inducción para compartir a tus aprendices:
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Al ingresar por este enlace, los aprendices solo verán sus módulos y evaluaciones; no tendrán acceso a la gestión de Google Drive.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={learnerShareUrl}
              className="px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 w-56 sm:w-72 select-all focus:outline-hidden truncate"
            />
            <button
              onClick={handleCopyLearnerLink}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white rounded-lg text-xs font-semibold transition-colors shrink-0 shadow-xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Total Aprendices</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {totalLearners}
          </p>
          <span className="text-[11px] text-slate-400 block">Registrados en la hoja</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Certificados Emitidos</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
            {certifiedCount}
          </p>
          <span className="text-[11px] text-slate-400 block">
            {certifiedPercent}% de aprobación general
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Fichas Activas</span>
            <BookOpen className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
            {uniqueFichas.length || 1}
          </p>
          <span className="text-[11px] text-slate-400 block">Grupos formativos</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">Estado de Conexión</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-1">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  isLiveConnected || isSheetConnected
                    ? 'bg-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-amber-400'
                }`}
              />
              <span>
                {isLiveConnected
                  ? 'Hoja y Drive Conectados'
                  : isSheetConnected
                  ? 'Hoja Vinculada en Drive'
                  : 'Sin Conexión Google'}
              </span>
            </p>

            <div className="flex items-center justify-between gap-2 pt-0.5">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                {lastSyncedAt
                  ? `Sincronizado: ${lastSyncedAt.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}`
                  : isSheetConnected
                  ? 'Planilla oficial vinculada'
                  : SPREADSHEET_TITLE}
              </span>

              {isSheetConnected ? (
                <a
                  href={effectiveSpreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
                  title="Abrir hoja de cálculo oficial en Google Drive"
                >
                  <span>Ver Hoja</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <button
                  onClick={onOpenGoogleDriveModal}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0 cursor-pointer"
                >
                  <span>Conectar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Apprentice Tracker Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Table Filters Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Planilla Oficial de Aprendices en Inducción
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Datos sincronizados directamente desde la hoja de cálculo "{SPREADSHEET_TITLE}"
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por aprendiz, documento o ficha..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden w-60 sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden"
            >
              <option value="all">Todos los estados</option>
              <option value="certified">Solo Certificados</option>
              <option value="in_progress">Solo En Proceso</option>
            </select>

            {/* Ficha Filter */}
            {uniqueFichas.length > 1 && (
              <select
                value={fichaFilter}
                onChange={(e) => setFichaFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="all">Todas las fichas</option>
                {uniqueFichas.map((f) => (
                  <option key={f} value={f}>
                    Ficha {f}
                  </option>
                ))}
              </select>
            )}

            {/* Refresh Table Button */}
            <button
              onClick={() => {
                if (accessToken && spreadsheetUrl) {
                  loadData(accessToken, spreadsheetUrl);
                }
              }}
              disabled={isLoading}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
              title="Refrescar datos desde Google Sheets"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Table Body */}
        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-100 dark:divide-slate-800">
              <thead className="bg-slate-50/75 dark:bg-slate-850 text-slate-600 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Aprendiz</th>
                  <th className="px-5 py-3.5">Documento</th>
                  <th className="px-5 py-3.5">Ficha</th>
                  <th className="px-5 py-3.5">Programa</th>
                  <th className="px-5 py-3.5">Avance Módulos</th>
                  <th className="px-5 py-3.5">Calificación</th>
                  <th className="px-5 py-3.5">Estado</th>
                  <th className="px-5 py-3.5">Certificado</th>
                  <th className="px-5 py-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {filteredRecords.map((r, idx) => {
                  const isCertified = r.status.toUpperCase().includes('CERTIFICADO');
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-850/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedRecord(r)}
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {r.fullName}
                      </td>
                      <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {r.documentType} {r.documentNumber}
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {r.fichaNumber}
                      </td>
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300 max-w-[200px] truncate" title={r.programName}>
                        {r.programName}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {r.modulesCompleted}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono whitespace-nowrap">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          {r.score}
                        </span>{' '}
                        <span className="text-[11px] text-slate-400">({r.percentage})</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            isCertified
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {r.certificateCode || 'Pendiente'}
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(r);
                          }}
                          className="px-2.5 py-1 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors font-semibold"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3 text-slate-500 dark:text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-400" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No se encontraron registros de aprendices con el filtro actual
            </p>
            <p className="text-xs">
              Los aprendices que ingresen con el enlace realizarán la inducción y aparecerán automáticamente aquí.
            </p>
          </div>
        )}

        {/* Footer of Table */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Mostrando {filteredRecords.length} de {records.length} aprendices
          </span>
          {spreadsheetUrl && (
            <a
              href={spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <span>Ver todos en Google Sheets</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Selected Apprentice Detail Modal for Instructor */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                  Ficha de Aprendiz
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedRecord.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl space-y-1">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Documento</span>
                <strong className="text-slate-900 dark:text-white font-mono">
                  {selectedRecord.documentType} {selectedRecord.documentNumber}
                </strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl space-y-1">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Ficha Formativa</span>
                <strong className="text-slate-900 dark:text-white font-mono">
                  {selectedRecord.fichaNumber}
                </strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl space-y-1 col-span-2">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Programa de Formación</span>
                <strong className="text-slate-900 dark:text-white">
                  {selectedRecord.programName}
                </strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl space-y-1">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Avance Módulos</span>
                <strong className="text-slate-900 dark:text-white">
                  {selectedRecord.modulesCompleted}
                </strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl space-y-1">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Reto Evaluativo</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono">
                  {selectedRecord.score} ({selectedRecord.percentage})
                </strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl space-y-1 col-span-2">
                <span className="text-slate-500 dark:text-slate-400 block font-medium">Código Único de Certificación</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 block text-[11px]">
                  {selectedRecord.certificateCode || 'No generado aún'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">
                Registrado: {selectedRecord.timestamp || 'Fecha desconocida'}
              </span>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
