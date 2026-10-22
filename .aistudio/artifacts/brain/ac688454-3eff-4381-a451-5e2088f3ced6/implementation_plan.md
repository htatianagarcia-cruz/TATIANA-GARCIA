# Sincronización Automática con Google Drive y Google Sheets (Inducción SENA)

Automatización integral del almacenamiento y actualización de registros de aprendices en Google Sheets en segundo plano, sin requerir intervención manual continua ni aperturas reiteradas de modales, notificando al usuario mediante confirmaciones discretas tipo toast.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas por el usuario:**
> - **Momento de sincronización:** Automático al completar módulos normativos, al aprobar el reto evaluativo y emitir certificado, o al actualizar información en el perfil del aprendiz.
> - **Estilo de retroalimentación:** Notificación flotante discreta tipo toast en la esquina inferior, visible durante 3 segundos sin bloquear la pantalla ni interrumpir la interacción del aprendiz.
> - **Persistencia y reconexión:** Mantenimiento de sesión de Google en segundo plano con reconexión silenciosa y cola de sincronización con *debounce* (600ms) para proteger las cuotas de API de Google Sheets.

---

### 1. Overview & Core Concept

- **Qué hace:** Elimina la necesidad de abrir manualmente el modal de Google Drive y pulsar "Sincronizar" tras cada acción. En cuanto el aprendiz avanza en la inducción (completa un módulo del Acuerdo 009 de 2024, aprueba el cuestionario o actualiza su ficha/documento), el sistema detecta el cambio y actualiza su fila correspondiente en la hoja de cálculo `"SENA - Registro Oficial de Aprendices e Inducción"` en Google Drive de forma transparente.
- **Público objetivo:** Aprendices SENA que realizan su inducción institucional e instructores/coordinadores que monitorean la planilla en tiempo real desde Google Drive o Google Sheets.
- **Valor clave:** Cero fricción operativa; la información siempre está respaldada en la nube oficial sin pasos repetitivos por parte del usuario.

---

### 2. User Experience & Visual Design

#### A. Flujo de Usuario Autónomo
1. **Conexión Inicial Única:** El usuario inicia sesión con Google una sola vez. A partir de ese momento, la vinculación queda memorizada de forma segura.
2. **Navegación Fluida:** El aprendiz lee los módulos normativos, practica en el simulador de casos y presenta su reto evaluativo.
3. **Disparo en Segundo Plano:** Al marcar un módulo como completado o finalizar el cuestionario, el motor de sincronización automática se activa automáticamente sin interrumpir la lectura ni pausar la interfaz.
4. **Toast Discreto de Confirmación:** En la esquina inferior derecha aparece una tarjeta compacta y elegante:
   - Icono de confirmación en verde institucional SENA.
   - Texto claro: `"Datos sincronizados en Google Sheets"` con detalle del aprendiz y enlace directo para abrir la hoja si lo desea.
   - Desaparición suave automática tras 3.5 segundos o descarte manual con un clic.
5. **Indicador de Estado en el Top Bar:** Junto al botón de Google Drive en el encabezado, un pequeño indicador sutil muestra el estado actual (`En la nube` / `Guardando...` / `Sincronizado`).

#### B. Identidad Visual y Ergonomía
- **Paleta Institucional SENA:** Acento esmeralda `#39A900` para confirmación de éxito y tonalidades neutras (`slate-50` a `slate-900`) compatibles con el Modo Claro y Modo Oscuro existente (con efecto de desenfoque de pantalla conservado).
- **Tipografía y Legibilidad:** Jerarquía clara con `Plus Jakarta Sans` y cifras numéricas tabulares (`tabular-nums`) para puntajes y fechas.
- **Regla Anti-Slop:** Cero píldoras decorativas innecesarias; el toast es una tarjeta de notificación funcional con radio compensado, sombra suave y tipografía directa.

---

### 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Sincronización Desencadenada por Eventos con Debounce**
  - *Enfoque elegido:* En lugar de un temporizador ciego cada X segundos, se sincroniza ante cambios reales de estado con un amortiguador de 600ms (*debounce*).
  - *Por qué:* Evita llamadas excesivas a la API de Google Sheets v4 si el usuario hace varios clics rápidos, reduciendo la latencia de red y respetando las cuotas de Google Cloud.
  - *Alternativa descartada:* Sincronización por polling periódico cada 30 segundos (descartada por consumo innecesario de batería y peticiones vacías a la API).

- **Decisión 2: Notificación Toast No Intrusiva vs. Modal de Confirmación**
  - *Enfoque elegido:* Reemplazar la exigencia del modal de confirmación manual en las acciones cotidianas por un Toast flotante no bloqueante.
  - *Por qué:* El usuario solicitó expresamente no tener que intervenir en el prototipo continuamente; el toast valida visualmente el guardado sin requerir clics adicionales.
  - *Alternativa descartada:* Mantener el modal emergente para cada guardado (bloqueaba el flujo del estudiante).

- **Decisión 3: Modo Híbrido (Offline-First / Auto-Sync)**
  - *Enfoque elegido:* El prototipo siempre mantiene sincronizado el estado local en `localStorage` inmediatamente y, en paralelo, transfiere los datos a Google Sheets si hay sesión activa. Si la sesión expira o no hay internet, encola la última versión y la sincroniza apenas se restablezca.
  - *Por qué:* Garantiza que ningún avance del aprendiz se pierda jamás, incluso si la red presenta fluctuaciones.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROTOTIPO INDUCCIÓN SENA                       │
└────────────────────────────────────────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
[Módulos Normativos]      [Reto Evaluativo Quiz]       [Perfil Aprendiz]
  (Módulo completado)      (Certificado generado)      (Datos editados)
       │                            │                            │
       └────────────────────────────┬────────────────────────────┘
                                    ▼
                     ┌─────────────────────────────┐
                     │   Auto-Sync Event Hook      │
                     │  (Debounce buffer: 600ms)   │
                     └─────────────────────────────┘
                                    │
              ┌─────────────────────┴─────────────────────┐
              ▼                                           ▼
   [Sesión Google Activa?]                      [Actualizar LocalStorage]
              │
       ┌──────┴──────┐
   SÍ  ▼             ▼  NO / Sesión pendiente
┌──────────────┐   ┌──────────────────────────────┐
│ GoogleSheets │   │ Encolar última versión local │
│  API v4 Call │   │  para auto-sync al conectar  │
└──────────────┘   └──────────────────────────────┘
       │
       ▼ (Respuesta Exitosa 200 OK)
┌─────────────────────────────────────────────────────────┐
│              Disparar Toast Notification                │
│    "Sincronizado automáticamente en Google Sheets"      │
│          + Botón de acceso directo a la hoja            │
└─────────────────────────────────────────────────────────┘
```

#### Componentes Clave:
1. **`useAutoSync` / `AutoSyncManager`:** Hook central que monitorea cambios en `profile` y `progress`, gestiona el debounce y ejecuta la llamada a `syncApprenticeRecord`.
2. **`SyncToast` Component:** Componente visual flotante accesible en la esquina inferior derecha con animación fluida, temporizador de cierre y enlace directo al archivo de Google Drive.
3. **Indicador de barra superior (`Navbar`):** Pequeño indicador de estado sincronizado sin sobrecargar el contrato de 3 zonas del header.
4. **Modal de Configuración Avanzada:** Se preserva el modal existente para consultas manuales, revisión de tabla histórica o cambio de cuenta de Google, pero ya no es un requisito para el guardado continuo.
