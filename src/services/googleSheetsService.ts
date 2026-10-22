import { ApprenticeProfile, UserProgress } from '../types/induction';

export interface SheetApprenticeRecord {
  timestamp: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  fichaNumber: string;
  programName: string;
  centerName: string;
  regional: string;
  modulesCompleted: string;
  examPassed: string;
  score: string;
  percentage: string;
  certificateCode: string;
  certificateDate: string;
  status: string;
}

export const SPREADSHEET_TITLE = 'SENA - Registro Oficial de Aprendices e Inducción';
export const SHEET_NAME = 'Aprendices_Inducción';

export const SHEET_HEADERS = [
  'Fecha Registro',
  'Nombre Aprendiz',
  'Tipo Doc',
  'Documento',
  'Ficha',
  'Programa de Formación',
  'Centro de Formación',
  'Regional',
  'Módulos Leídos',
  'Evaluación Aprobada',
  'Calificación',
  'Porcentaje',
  'Código Certificado',
  'Fecha Certificación',
  'Estado General'
];

/**
 * Searches for existing SENA Induction spreadsheet in user's Google Drive.
 * If not found, creates a new formatted spreadsheet with headers.
 */
export async function getOrCreateSpreadsheet(accessToken: string): Promise<{
  id: string;
  title: string;
  url: string;
  isNew: boolean;
}> {
  // 1. Search for existing file
  const query = encodeURIComponent(
    `name = '${SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
  );
  
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,webViewLink)`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!searchRes.ok) {
    const err = await searchRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al buscar en Google Drive');
  }

  const searchData = await searchRes.json();

  if (searchData.files && searchData.files.length > 0) {
    const file = searchData.files[0];
    return {
      id: file.id,
      title: file.name,
      url: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}`,
      isNew: false,
    };
  }

  // 2. Create new spreadsheet if none found
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: SHEET_NAME,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al crear la hoja de cálculo');
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;

  // 3. Write Headers with SENA green styling
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A1:O1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [SHEET_HEADERS],
      }),
    }
  );

  // 4. Format header row with emerald styling and auto-resize
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: createdData.sheets[0].properties.sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.22, green: 0.66, blue: 0.0 }, // SENA Green #39A900
                  textFormat: {
                    bold: true,
                    foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 },
                    fontSize: 10,
                  },
                  horizontalAlignment: 'CENTER',
                },
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
            },
          },
        ],
      }),
    });
  } catch (styleErr) {
    console.warn('Could not apply advanced formatting, but data was saved', styleErr);
  }

  return {
    id: spreadsheetId,
    title: SPREADSHEET_TITLE,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    isNew: true,
  };
}

/**
 * Reads all rows from the spreadsheet to show synced data.
 */
export async function getSpreadsheetRecords(
  accessToken: string,
  spreadsheetId: string
): Promise<SheetApprenticeRecord[]> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A2:O100`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const rows = data.values || [];

  return rows.map((row: string[]) => ({
    timestamp: row[0] || '',
    fullName: row[1] || '',
    documentType: row[2] || '',
    documentNumber: row[3] || '',
    fichaNumber: row[4] || '',
    programName: row[5] || '',
    centerName: row[6] || '',
    regional: row[7] || '',
    modulesCompleted: row[8] || '',
    examPassed: row[9] || '',
    score: row[10] || '',
    percentage: row[11] || '',
    certificateCode: row[12] || '',
    certificateDate: row[13] || '',
    status: row[14] || '',
  }));
}

/**
 * Appends or updates the current apprentice's record in Google Sheets.
 */
export async function syncApprenticeRecord(
  accessToken: string,
  spreadsheetId: string,
  profile: ApprenticeProfile,
  progress: UserProgress
): Promise<{ action: 'updated' | 'created'; rowIndex: number }> {
  // First, fetch existing rows to see if apprentice already exists (by Document Number)
  const existingRecordsRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!D2:D100`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  let existingRowIndex = -1;
  if (existingRecordsRes.ok) {
    const data = await existingRecordsRes.json();
    const docNumbers: string[][] = data.values || [];
    const normalizedDoc = profile.documentNumber.trim().replace(/\D/g, '');

    for (let i = 0; i < docNumbers.length; i++) {
      const raw = (docNumbers[i][0] || '').trim().replace(/\D/g, '');
      if (raw && raw === normalizedDoc) {
        existingRowIndex = i + 2; // +2 because 1-indexed and header is row 1
        break;
      }
    }
  }

  const now = new Date().toLocaleString('es-CO');
  const percentScore = progress.totalQuestions > 0 ? Math.round((progress.quizScore / progress.totalQuestions) * 100) : 0;
  const statusStr = progress.quizCompleted ? 'CERTIFICADO' : `${progress.completedModules.length}/5 MÓDULOS`;

  const recordValues = [
    now,
    profile.fullName,
    profile.documentType,
    profile.documentNumber,
    profile.fichaNumber,
    profile.programName,
    profile.centerName,
    profile.regional,
    `${progress.completedModules.length} de 5`,
    progress.quizCompleted ? 'SÍ (Aprobado)' : 'PENDIENTE',
    `${progress.quizScore}/${progress.totalQuestions}`,
    `${percentScore}%`,
    progress.certificateCode || 'Pendiente de aprobación',
    progress.certificateIssuedAt || 'N/A',
    statusStr,
  ];

  if (existingRowIndex > 0) {
    // Update existing row
    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A${existingRowIndex}:O${existingRowIndex}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [recordValues],
        }),
      }
    );

    if (!updateRes.ok) {
      const err = await updateRes.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Error al actualizar el registro en Google Sheets');
    }

    return { action: 'updated', rowIndex: existingRowIndex };
  } else {
    // Append new row
    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_NAME}!A:O:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [recordValues],
        }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Error al agregar el registro en Google Sheets');
    }

    return { action: 'created', rowIndex: 999 };
  }
}
