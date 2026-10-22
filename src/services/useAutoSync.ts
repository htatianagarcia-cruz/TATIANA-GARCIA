import { useState, useEffect, useRef, useCallback } from 'react';
import { User } from 'firebase/auth';
import { ApprenticeProfile, UserProgress } from '../types/induction';
import { initAuth, getAccessToken } from './googleAuth';
import {
  getOrCreateSpreadsheet,
  syncApprenticeRecord,
  SPREADSHEET_TITLE,
} from './googleSheetsService';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'disconnected';

export interface ToastPayload {
  id: string;
  title: string;
  subtitle: string;
  sheetUrl?: string;
  type: 'success' | 'error' | 'info';
  timestamp: string;
}

export function useAutoSync(profile: ApprenticeProfile, progress: UserProgress) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('sena_google_access_token') || localStorage.getItem('sena_google_access_token');
    } catch {
      return null;
    }
  });
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('sena_google_sheet_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url) return parsed.url;
      }
      const direct = localStorage.getItem('sena_google_sheet_url') || localStorage.getItem('sena_sheet_url');
      if (direct) return direct;
    } catch {
      // ignore
    }
    return null;
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => {
    try {
      const saved = localStorage.getItem('sena_google_sheet_info') || localStorage.getItem('sena_google_sheet_url');
      if (saved) return 'synced';
    } catch {}
    return 'disconnected';
  });

  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(() => {
    try {
      const saved = localStorage.getItem('sena_last_synced_at');
      if (saved) return new Date(saved);
    } catch {}
    return null;
  });

  const [toast, setToast] = useState<ToastPayload | null>(null);

  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sena_auto_sync_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const previousStateSnapshot = useRef<string>('');

  // Save autoSyncEnabled setting
  useEffect(() => {
    try {
      localStorage.setItem('sena_auto_sync_enabled', String(autoSyncEnabled));
    } catch {
      // ignore
    }
  }, [autoSyncEnabled]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
        setSyncStatus('idle');
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
        setSyncStatus('disconnected');
      }
    );
    return () => unsubscribe();
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Core background sync executor
  const performSync = useCallback(
    async (token: string, silentToast = false) => {
      try {
        setSyncStatus('syncing');

        // 1. Get or create spreadsheet
        const sheet = await getOrCreateSpreadsheet(token);
        setSpreadsheetUrl(sheet.url);
        localStorage.setItem('sena_google_sheet_info', JSON.stringify(sheet));

        // 2. Sync apprentice record
        const result = await syncApprenticeRecord(token, sheet.id, profile, progress);

        setSyncStatus('synced');
        const now = new Date();
        setLastSyncedAt(now);
        try {
          localStorage.setItem('sena_last_synced_at', now.toISOString());
        } catch {}

        if (!silentToast) {
          const detail = `${profile.fullName} · ${progress.completedModules.length}/5 módulos${
            progress.quizCompleted ? ' · Certificado' : ''
          }`;
          setToast({
            id: String(Date.now()),
            title:
              result.action === 'updated'
                ? 'Actualizado automáticamente en Google Sheets'
                : 'Guardado automáticamente en Google Sheets',
            subtitle: detail,
            sheetUrl: sheet.url,
            type: 'success',
            timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
          });
        }
      } catch (err: any) {
        console.error('Error durante sincronización automática con Google Sheets:', err);
        setSyncStatus('error');
      }
    },
    [profile, progress]
  );

  // Manual trigger if user wants to force immediate sync
  const triggerManualSync = useCallback(async () => {
    const token = accessToken || (await getAccessToken());
    if (!token) {
      setSyncStatus('disconnected');
      return;
    }
    await performSync(token, false);
  }, [accessToken, performSync]);

  // Auto-sync watcher on profile or progress changes
  useEffect(() => {
    const currentSnapshot = JSON.stringify({
      fullName: profile.fullName,
      documentNumber: profile.documentNumber,
      fichaNumber: profile.fichaNumber,
      programName: profile.programName,
      completedModules: progress.completedModules,
      quizCompleted: progress.quizCompleted,
      quizScore: progress.quizScore,
    });

    // Skip initial mount if unchanged
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousStateSnapshot.current = currentSnapshot;
      return;
    }

    if (previousStateSnapshot.current === currentSnapshot) {
      return;
    }

    previousStateSnapshot.current = currentSnapshot;

    if (!autoSyncEnabled) {
      return;
    }

    if (!accessToken) {
      // Disconnected: data is preserved locally in localStorage
      setSyncStatus('disconnected');
      return;
    }

    // Debounce to prevent multiple API requests when user rapidly interacts
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setSyncStatus('syncing');

    debounceTimerRef.current = setTimeout(() => {
      performSync(accessToken, false);
    }, 700);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [profile, progress, accessToken, autoSyncEnabled, performSync]);

  return {
    currentUser,
    accessToken,
    syncStatus,
    lastSyncedAt,
    toast,
    dismissToast,
    spreadsheetUrl,
    triggerManualSync,
    autoSyncEnabled,
    setAutoSyncEnabled,
  };
}
