import { InductionModule, RightOrDuty, CaseSimulation } from '../types/induction';

export const SENA_MODULES: InductionModule[] = [
  {
    id: 'mod-1',
    title: 'Identidad SENA y Nuevo Marco Normativo',
    subtitle: 'Acuerdo 009 de 2024: Transformación, Inclusión y Convivencia',
    duration: '15 min',
    iconName: 'Building2',
    articlesReference: 'Capítulo I - Marco Institucional',
    summary: 'Conoce los principios que orientan la formación profesional integral en el SENA y la trascendencia del nuevo Acuerdo 009 de 2024.',
    sections: [
      {
        title: 'Misión y Rol del SENA en Colombia',
        content: [
          'El Servicio Nacional de Aprendizaje (SENA) es la entidad pública encargada de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la Formación Profesional Integral para la incorporación de las personas en actividades productivas.',
          'Nuestra formación se fundamenta en el aprender haciendo, vinculando la teoría rigurosa con la práctica real en ambientes tecnológicos de vanguardia.'
        ],
        keyTakeaway: 'Ser aprendiz SENA significa transformarse como persona, ciudadano ético y profesional técnico o tecnólogo de alto impacto.',
        bulletPoints: [
          'Valores institucionales: Integridad, respeto, compromiso, solidaridad y justicia.',
          'Enfoque por competencias laborales orientado a la empleabilidad y emprendimiento.',
          'Presencia en las 33 regionales de Colombia y más de 117 centros de formación.'
        ]
      },
      {
        title: '¿Por qué un Nuevo Reglamento en 2024? (Acuerdo 009)',
        content: [
          'El 22 de noviembre de 2024, el Consejo Directivo Nacional del SENA expidió el histórico Acuerdo 009 de 2024, derogando el Acuerdo 07 de 2012 y sus reformas previas.',
          'Este nuevo marco moderniza las normas formativas incorporando la digitalización (plataformas SofiaPlus y Zajuna), el enfoque de género, la inclusión de comunidades campesinas y la ampliación garantista de derechos.'
        ],
        keyTakeaway: 'El Acuerdo 009 de 2024 no es solo punitivo: es formativo, restaurativo y centrado en la dignidad del aprendiz.',
        bulletPoints: [
          'Ampliación a 24 derechos fundamentales del aprendiz explícitamente consagrados.',
          'Incorporación de la ruta de atención integral contra el acoso sexual y violencias de género (Ley 2365 de 2024).',
          'Nuevas alternativas para la etapa productiva en la economía popular y campesina.',
          'Debido proceso robusto en el Comité de Evaluación y Seguimiento.'
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Los 24 Derechos del Aprendiz SENA',
    subtitle: 'Capítulo II: Garantías académicas, bienestar e inclusión',
    duration: '20 min',
    iconName: 'ShieldCheck',
    articlesReference: 'Capítulo II - Derechos del Aprendiz',
    summary: 'Descubre los 24 derechos que te amparan desde el primer día de inducción hasta tu graduación y etapa productiva.',
    sections: [
      {
        title: 'Derechos Académicos y Formativos',
        content: [
          'Como aprendiz tienes derecho a recibir una formación profesional integral de calidad acorde al diseño curricular del programa matriculado.',
          'Tienes derecho a contar con instructores idóneos, ambientes de formación equipados, insumos necesarios y soporte tecnológico permanente a través de los ecosistemas virtuales de aprendizaje.'
        ],
        keyTakeaway: 'Tienes derecho a conocer oportunamente tus resultados de aprendizaje y concertar planes de mejoramiento antes de cualquier medida sancionatoria.',
        bulletPoints: [
          'Derecho a la inducción completa institucional al ingresar a la entidad.',
          'Derecho a la concertación y revisión de evaluaciones académicas en un plazo no mayor a 8 días hábiles.',
          'Acceso libre a bibliotecas físicas, bases de datos digitales (Zajuna / SENA Digital) e infraestructura de cómputo.',
          'Derecho al carné estudiantil institucional que te acredita ante la sociedad y la comunidad académica.'
        ]
      },
      {
        title: 'Derechos de Bienestar, Salud y Participación Democrática',
        content: [
          'El bienestar al aprendiz es un eje central: tienes derecho a participar en los programas de salud preventiva, deporte, cultura, apoyos de sostenimiento (según convocatorias) y orientación psicosocial.',
          'Asimismo, tienes derecho a elegir y ser elegido de forma democrática como vocero de ficha o representante estudiantil del Centro de Formación.'
        ],
        keyTakeaway: 'La representatividad estudiantil en el SENA es plural, transparente y goza de respaldo institucional para la concertación.',
        bulletPoints: [
          'Acceso a orientación vocacional, psicológica y acompañamiento del equipo de Bienestar al Aprendiz.',
          'Garantía de libre expresión respetuosa, culto e identidad cultural sin ninguna discriminación.',
          'Debido proceso: ser escuchado en descargos y contar con el acompañamiento en comités disciplinarios.'
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Deberes y Prohibiciones Expresas',
    subtitle: 'Capítulo III: Convivencia ética y responsabilidad institucional',
    duration: '20 min',
    iconName: 'BookMarked',
    articlesReference: 'Capítulo III - Deberes y Prohibiciones',
    summary: 'Aprende los compromisos éticos que asumes con tu comunidad educativa y las conductas terminantemente prohibidas en el SENA.',
    sections: [
      {
        title: 'Deberes Esenciales del Aprendiz',
        content: [
          'El aprendizaje es una responsabilidad activa. El aprendiz asume el deber de cumplir con las actividades curriculares, asistir puntualmente a las sesiones y presentar evidencias de aprendizaje auténticas.',
          'El respeto mutuo es inviolable: tratar con consideración a compañeros, instructores, personal administrativo y de servicios en todo momento.'
        ],
        keyTakeaway: 'El porte correcto del uniforme institucional y del carné en lugar visible es un deber que enorgullece y protege a nuestra comunidad.',
        bulletPoints: [
          'Cuidar y hacer uso exclusivo educativo de las instalaciones, maquinaria, herramientas y plataformas digitales.',
          'Actualizar permanentemente los datos personales en el aplicativo del SENA (Zajuna / SofiaPlus).',
          'Notificar oportunamente novedades de inasistencia dentro de los 3 días hábiles siguientes con soporte justificado.'
        ]
      },
      {
        title: 'Prohibiciones Expresas del Acuerdo 009 de 2024',
        content: [
          'Para salvaguardar la integridad de la comunidad educativa, el reglamento enumera prohibiciones taxativas.',
          'Queda expresamente prohibido cometer fraude académico (plagio, suplantación o compra de evidencias), portar o consumir sustancias psicoactivas o alcohol en el centro, y portar cualquier clase de arma.'
        ],
        keyTakeaway: 'Se prohíbe el proselitismo político o religioso en las instalaciones del SENA para preservar la neutralidad e inclusión formativa.',
        bulletPoints: [
          'Prohibida cualquier forma de discriminación por etnia, género, religión, discapacidad u orientación sexual.',
          'Prohibido el proselitismo político o electoral dentro de las sedes y canales del SENA.',
          'Prohibido el uso no autorizado o daño deliberado de bienes institucionales o propiedad de terceros.',
          'Prohibida la agresión verbal, física o psicológica, acoso escolar (bullying) o ciberacoso.'
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Etapas de Formación, Productiva y Novedades',
    subtitle: 'Capítulo IV: Ruta de aprendizaje, alternativas y permanencia',
    duration: '15 min',
    iconName: 'Briefcase',
    articlesReference: 'Capítulo IV - Ingreso, Permanencia y Certificación',
    summary: 'Conoce las 6 alternativas oficiales de etapa productiva y cómo gestionar adecuadamente tus novedades académicas.',
    sections: [
      {
        title: 'Alternativas Oficiales de Etapa Productiva',
        content: [
          'La formación en el SENA consta de dos etapas inseparables: la Etapa Lectiva (apropiación de conocimientos) y la Etapa Productiva (aplicación en el mundo laboral real por 6 meses o el tiempo establecido).',
          'El nuevo Acuerdo 009 de 2024 amplía y flexibiliza las alternativas para adaptarse a la realidad productiva del país.'
        ],
        keyTakeaway: 'La etapa productiva no se limita al contrato de aprendizaje: tienes 6 caminos reconocidos formalmente.',
        bulletPoints: [
          '1. Contrato de Aprendizaje (apoyo de sostenimiento y vinculación empresarial formal).',
          '2. Vínculo Formativo o Laboral con empresa afín al programa curricular.',
          '3. Proyecto Productivo SENA (investigación aplicada o formulación de emprendimiento propio).',
          '4. Monitorías académicas o técnicas dentro del SENA.',
          '5. Pasantía en el sector productivo, público o social.',
          '6. Pasantía en Economía Popular y Campesina (reconocimiento al trabajo rural y comunitario).'
        ]
      },
      {
        title: 'Trámite de Novedades Académicas',
        content: [
          'Durante tu formación pueden surgir imprevistos de fuerza mayor. El reglamento define el procedimiento formal para registrar novedades en el sistema sin perder tu cupo.',
          'Las novedades deben tramitarse antes de incurrir en inasistencias prolongadas o deserción.'
        ],
        keyTakeaway: 'El aplazamiento puede solicitarse por causas justificadas (médicas, laborales o familiares) hasta por el tiempo regulado por el Centro.',
        bulletPoints: [
          'Aplazamiento: Solicitud formal de suspensión temporal de la matrícula.',
          'Traslado: Cambio de jornada, centro o regional previa disponibilidad de cupo y pertinencia académica.',
          'Retiro Voluntario: Solicitud formal y fundamentada para renunciar a la matrícula.',
          'Reingreso: Trámite para reactivar la formación tras el vencimiento de un aplazamiento autorizado.'
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    title: 'Régimen Disciplinario, Medidas y Protección Integral',
    subtitle: 'Capítulo V: Faltas, Comités de Evaluación y Ley 2365 de 2024',
    duration: '20 min',
    iconName: 'Scale',
    articlesReference: 'Capítulo V - Faltas, Medidas Formativas y Sanciones',
    summary: 'Comprende el procedimiento del Comité de Evaluación y Seguimiento, la gradación de faltas y la ruta contra el acoso.',
    sections: [
      {
        title: 'Clasificación de Faltas y Medidas Formativas',
        content: [
          'Las faltas en el SENA se catalogan como académicas o disciplinarias, y su gravedad se tipifica en Leves, Graves o Gravísimas según el daño, dolo o reincidencia.',
          'El SENA prioriza las medidas pedagógicas formativas para transformar conductas antes de recurrir a sanciones formales.'
        ],
        keyTakeaway: 'Una medida formativa no es una sanción: busca propiciar cambios pedagógicos sin manchar la hoja de vida.',
        bulletPoints: [
          'Medida Formativa 1: Llamado de atención verbal reflexivo por parte del instructor o coordinador.',
          'Medida Formativa 2: Plan de Mejoramiento Académico o Disciplinario concertado (hasta 3 meses de duración).',
          'Sanción 1: Llamado de atención por escrito con copia formal a la hoja de vida.',
          'Sanción 2: Condicionamiento de matrícula (compromiso de no reincidencia).',
          'Sanción 3: Cancelación de matrícula (con inhabilidad de 6 a 12 meses para matricularse en el SENA).'
        ]
      },
      {
        title: 'Ruta de Prevención del Acoso Sexual y Violencias de Género',
        content: [
          'En estricto cumplimiento de la Ley 2365 de 2024, el Acuerdo 009 de 2024 establece mecanismos de tolerancia cero frente al acoso sexual, acoso laboral o violencias basadas en género.',
          'Cualquier aprendiz víctima o testigo cuenta con canales confidenciales, acompañamiento psicológico inmediato y medidas de protección que evitan la revictimización.'
        ],
        keyTakeaway: 'Ningún aprendiz puede ser sancionado o presionado por denunciar conductas de acoso o violencia.',
        bulletPoints: [
          'Activación inmediata de la Ruta de Atención Integral del Centro.',
          'Medidas cautelares de separación de ambientes para salvaguardar a la víctima.',
          'Remisión prioritaria a entidades de justicia (Fiscalía, Comisaría de Familia) y Bienestar.',
          'Debido proceso integral garantizado tanto para el denunciante como en las investigaciones.'
        ]
      }
    ]
  }
];

export const SENA_RIGHTS_DUTIES: RightOrDuty[] = [
  // DERECHOS SELECCIONADOS DE LOS 24 DEL ACUERDO 009 DE 2024
  {
    id: 'rd-1',
    type: 'derecho',
    category: 'Academico',
    number: 1,
    title: 'Inducción Integral y Oportuna',
    description: 'Recibir una inducción completa al ingresar al SENA que incluya el Reglamento del Aprendiz, bienestar, uso de ambientes y ruta de formación.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Derechos del Aprendiz',
    example: 'Durante tus primeras semanas, el Centro debe realizar jornadas pedagógicas y entregarte herramientas para conocer tus derechos y deberes.'
  },
  {
    id: 'rd-2',
    type: 'derecho',
    category: 'Academico',
    number: 2,
    title: 'Formación Profesional Integral de Calidad',
    description: 'Acceder a una formación guiada por instructores competentes, con metodologías activas y proyectos formativos pertinentes.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Derechos - Formación de Calidad',
    example: 'Tu instructor debe preparar sesiones con guías de aprendizaje claras y asesorarte en la resolución de problemas técnicos.'
  },
  {
    id: 'rd-3',
    type: 'derecho',
    category: 'Tecnologico',
    number: 3,
    title: 'Uso de Ambientes, Equipos e Infraestructura',
    description: 'Hacer uso de maquinaria, software, laboratorios, bibliotecas físicas y digitales (Zajuna) requeridas para tu programa.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Ambientes de Aprendizaje',
    example: 'Poder acceder a la sala de cómputo especializada o taller de soldadura/automatización con las medidas de bioseguridad necesarias.'
  },
  {
    id: 'rd-4',
    type: 'derecho',
    category: 'Bienestar',
    number: 4,
    title: 'Programas de Bienestar al Aprendiz',
    description: 'Disfrutar de las actividades de salud, arte, cultura, deporte, acompañamiento psicosocial y convocatorias de apoyos de sostenimiento.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Bienestar Integral',
    example: 'Inscribirte al torneo deportivo del Centro o solicitar orientación psicológica en la oficina de Bienestar si enfrentas dificultades.'
  },
  {
    id: 'rd-5',
    type: 'derecho',
    category: 'Academico',
    number: 5,
    title: 'Retroalimentación y Planes de Mejoramiento',
    description: 'Conocer las evaluaciones de evidencias dentro de los 8 días hábiles y concertar un plan de mejoramiento antes de reprobar un resultado.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Evaluación y Planes de Mejora',
    example: 'Si no alcanzas el puntaje aprobatorio en una evidencia de desarrollo web, el instructor debe darte observaciones y pactar una fecha de entrega correctiva.'
  },
  {
    id: 'rd-6',
    type: 'derecho',
    category: 'Convivencia',
    number: 6,
    title: 'Trato Digno y No Discriminación',
    description: 'Ser tratado con dignidad, consideración y equidad, sin distinción de género, orientación, etnia, creencias religiosas o discapacidad.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Inclusión y Dignidad Humana',
    example: 'Ambientes libres de comentarios despectivos, burlas o prejuicios tanto en clases presenciales como en canales de Teams/WhatsApp de la ficha.'
  },
  {
    id: 'rd-7',
    type: 'derecho',
    category: 'Disciplinario',
    number: 7,
    title: 'Garantía del Debido Proceso',
    description: 'Ser notificado formalmente ante cualquier investigación, presentar descargos, aportar pruebas y apelar decisiones del Comité de Evaluación.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Debido Proceso y Contradicción',
    example: 'Antes de que el Subdirector de Centro emita una resolución de sanción, tienes derecho a ser citado al Comité y exponer tus argumentos con pruebas.'
  },
  {
    id: 'rd-8',
    type: 'derecho',
    category: 'Bienestar',
    number: 8,
    title: 'Carné Estudiantil Institucional',
    description: 'Recibir oportunamente el documento de identificación que te acredita legalmente como Aprendiz SENA durante tu proceso formativo.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Identificación Institucional',
    example: 'Portar el carné físico o digital para ingresar a cualquier sede SENA del país y acceder a descuentos en transporte o bibliotecas públicas.'
  },
  {
    id: 'rd-9',
    type: 'derecho',
    category: 'Convivencia',
    number: 9,
    title: 'Representación Democrática y Participación',
    description: 'Postularte libremente y votar para elegir Vocero de tu Ficha y Representante de los Aprendices del Centro de Formación.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Representatividad Democrática',
    example: 'Ser la voz de tu grupo en las mesas de diálogo con la coordinación académica para resolver inquietudes del horario o talleres.'
  },
  {
    id: 'rd-10',
    type: 'derecho',
    category: 'Academico',
    number: 10,
    title: 'Alternativas Múltiples de Etapa Productiva',
    description: 'Elegir la modalidad de etapa productiva que mejor se ajuste a tus competencias y contexto: contrato, proyecto, monitoría o economía campesina.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Alternativas de Etapa Productiva',
    example: 'Desarrollar un proyecto de innovación agrícola o software para una asociación campesina comunitaria y que sea avalado como etapa práctica.'
  },

  // DEBERES CLAVE
  {
    id: 'rd-11',
    type: 'deber',
    category: 'Academico',
    title: 'Cumplimiento Riguroso de la Ruta de Aprendizaje',
    description: 'Asistir puntualmente a los ambientes de aprendizaje, realizar las evidencias solicitadas y participar activamente en el trabajo colaborativo.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Deberes del Aprendiz',
    example: 'Entregar tus evidencias en la plataforma Zajuna dentro de los plazos establecidos por el equipo pedagógico.'
  },
  {
    id: 'rd-12',
    type: 'deber',
    category: 'Disciplinario',
    title: 'Porte Adecuado de Uniforme y Carné',
    description: 'Portar el carné en lugar visible y vestir el uniforme o ropa reglamentaria de seguridad según los requerimientos técnicos del ambiente.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Presentación y Seguridad',
    example: 'Ingresar al taller mecánico o laboratorio de alimentos con botas punta de acero, cofia, gafas de seguridad y carné colgado al pecho.'
  },
  {
    id: 'rd-13',
    type: 'deber',
    category: 'Convivencia',
    title: 'Respeto Mutuo y Convivencia Pacífica',
    description: 'Mantener relaciones cordiales basadas en la empatía, el lenguaje respetuoso y la resolución pacífica de diferencias.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Convivencia Ciudadana',
    example: 'Debatir con argumentos técnicos sin descalificar u ofender la opinión de un compañero durante una exposición o foro virtual.'
  },
  {
    id: 'rd-14',
    type: 'deber',
    category: 'Tecnologico',
    title: 'Cuidado y Custodia de Bienes e Instalaciones',
    description: 'Utilizar responsablemente los equipos informáticos, herramientas, maquinaria e instalaciones físicas y virtuales del SENA.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Bienes Institucionales',
    example: 'Apagar correctamente los computadores al terminar la clase y dejar ordenadas y limpias las mesas de trabajo en el laboratorio.'
  },
  {
    id: 'rd-15',
    type: 'deber',
    category: 'Disciplinario',
    title: 'Notificación Justificada de Inasistencias',
    description: 'Informar al instructor y coordinador académico novedades de inasistencia dentro de los 3 días hábiles siguientes con certificado médico o soporte legal.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Inasistencias y Justificaciones',
    example: 'Si tienes incapacidad médica de tu EPS, radicarla formalmente por escrito o correo institucional dentro del término legal estipulado.'
  },

  // PROHIBICIONES EXPRESAS
  {
    id: 'rd-16',
    type: 'prohibicion',
    category: 'Academico',
    title: 'Fraude y Plagio Académico',
    description: 'Copiar evidencias de terceros, suplantar la identidad en evaluaciones, adulterar firmas o presentar como propios trabajos ajenos sin debida citación.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Prohibiciones Expresas',
    example: 'Comprar una evidencia por internet o copiar el código de un compañero para entregarlo como proyecto propio en Zajuna.'
  },
  {
    id: 'rd-17',
    type: 'prohibicion',
    category: 'Convivencia',
    title: 'Proselitismo Político o Religioso',
    description: 'Efectuar actividades de proselitismo político electoral o religioso dentro de las instalaciones físicas o medios virtuales del SENA.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Neutralidad Institucional',
    example: 'Repartir volantes de candidatos al concejo municipal o hacer campaña partidista dentro de las aulas o grupos de WhatsApp institucionales.'
  },
  {
    id: 'rd-18',
    type: 'prohibicion',
    category: 'Disciplinario',
    title: 'Porte de Armas y Sustancias Prohibidas',
    description: 'Ingresar o consumir bebidas embriagantes, sustancias psicoactivas o ingresar armas de fuego, cortopunzantes o elementos contundentes a los centros.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Seguridad Institucional',
    example: 'Está terminantemente prohibido fumar cigarrillo electrónico o consumir licor en las zonas comunes o alrededores inmediatos de la sede.'
  },
  {
    id: 'rd-19',
    type: 'prohibicion',
    category: 'Convivencia',
    title: 'Acoso Sexual y Discriminación',
    description: 'Cometer cualquier conducta de acoso sexual, acoso escolar, hostigamiento o discriminación verbal, física o digital contra cualquier miembro.',
    legalBasis: 'Acuerdo 009 de 2024 & Ley 2365 de 2024',
    example: 'Enviar mensajes de índole sexual no consentidos o chantajear a un compañero con contenido privado en redes sociales.'
  },

  // MEDIDAS FORMATIVAS Y SANCIONES
  {
    id: 'rd-20',
    type: 'medida',
    category: 'Disciplinario',
    title: 'Plan de Mejoramiento Disciplinario o Académico',
    description: 'Medida pedagógica concertada entre instructor y aprendiz para superar deficiencias en el logro de resultados o convivencia (máximo 3 meses).',
    legalBasis: 'Acuerdo 009 de 2024, Art. Medidas Formativas',
    example: 'Un plan con fechas de entrega extraordinarias y tutoría para recuperar una competencia formativa pendiente.'
  },
  {
    id: 'rd-21',
    type: 'medida',
    category: 'Disciplinario',
    title: 'Cancelación de Matrícula e Inhabilidad',
    description: 'Máxima sanción disciplinaria por faltas graves o gravísimas, que implica la pérdida total del cupo e inhabilidad para matricularse de 6 a 12 meses.',
    legalBasis: 'Acuerdo 009 de 2024, Art. Sanciones Disciplinarias',
    example: 'Se impone tras debido proceso en caso de agresión física comprobada o fraude institucional deliberado y reincidente.'
  }
];

export const SENA_CASE_SIMULATIONS: CaseSimulation[] = [
  {
    id: 'case-1',
    title: 'El Informe con Plagio en la Entrega Final',
    context: 'Ficha de Tecnólogo en Gestión de Redes. Semana de cierre de fase de ejecución.',
    initialSituation: 'Mateo y Sofía deben entregar el informe final de topología de red. Por falta de tiempo, Mateo descargó una monografía de internet y reemplazó los nombres de los autores, enviándolo a Zajuna sin avisarle a Sofía. El instructor detectó un 94% de coincidencia textual.',
    choices: [
      {
        id: 'c1-opt1',
        text: 'El instructor debe expulsar inmediatamente a Mateo y Sofía del SENA sin escucharlos.',
        outcomeTitle: 'Violación al Debido Proceso',
        outcomeDescription: 'Incorrecto. Según el Acuerdo 009 de 2024, todo aprendiz tiene derecho fundamental al debido proceso, a ser escuchado en descargos y a que se determine la responsabilidad individual antes de cualquier decisión.',
        isOptimal: false,
        legalArticle: 'Art. Debido Proceso y Comité de Evaluación',
        points: 0
      },
      {
        id: 'c1-opt2',
        text: 'Reportar la falta ante el Comité de Evaluación y Seguimiento, citar a descargos individuales para individualizar la falta y acordar medidas según el reglamento.',
        outcomeTitle: 'Procedimiento Legal Óptimo',
        outcomeDescription: 'Excelente decisión. El instructor emite el reporte de novedad, la Coordinación cita a descargos individuales donde Sofía puede demostrar su buena fe y Mateo asume su responsabilidad bajo la tipificación de falta académica y plan correctivo o sanción proporcional.',
        isOptimal: true,
        legalArticle: 'Capítulo V, Art. Trámite ante Comité y Valoración de Responsabilidad',
        points: 25
      },
      {
        id: 'c1-opt3',
        text: 'Ignorar el plagio y pedirles que entreguen cualquier otra cosa al día siguiente sin reporte.',
        outcomeTitle: 'Permisividad Antipedagógica',
        outcomeDescription: 'Incorrecto. El instructor tiene el deber de formar en ética profesional y no tolerar el fraude. El plagio es una prohibición expresa que atenta contra los principios de la formación profesional integral.',
        isOptimal: false,
        legalArticle: 'Capítulo III, Art. Prohibiciones Expresas',
        points: 5
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Inasistencia Inesperada por Calamidad Doméstica',
    context: 'Centro Agroempresarial. Formación presencial técnica.',
    initialSituation: 'Camila sufrió un accidente de tránsito menor y debió guardar reposo médico durante 4 días hábiles consecutivos. No pudo avisar el primer día porque no tenía señal telefónica en su vereda.',
    choices: [
      {
        id: 'c2-opt1',
        text: 'Despreocuparse y regresar a clases dos semanas después sin llevar ningún documento.',
        outcomeTitle: 'Riesgo de Deserción Automática',
        outcomeDescription: 'Incorrecto. La ausencia no justificada por más de 3 días consecutivos sin reporte puede ser tipificada como deserción del programa según el Acuerdo 009 de 2024.',
        isOptimal: false,
        legalArticle: 'Art. Declaratoria de Deserción y Plazos',
        points: 0
      },
      {
        id: 'c2-opt2',
        text: 'Radicar la incapacidad médica formal dentro de los 3 días hábiles siguientes al restablecimiento de salud ante la Coordinación Académica e instructores.',
        outcomeTitle: 'Actuación Conforme a Derecho',
        outcomeDescription: 'Muy bien. El reglamento confiere el derecho a justificar inasistencias por fuerza mayor o salud aportando el certificado médico oficial dentro de los 3 días hábiles posteriores.',
        isOptimal: true,
        legalArticle: 'Capítulo III, Art. Justificación de Inasistencias',
        points: 25
      },
      {
        id: 'c2-opt3',
        text: 'Pedirle a un compañero que firme la lista de asistencia por ella para que no se den cuenta.',
        outcomeTitle: 'Suplantación: Falta Gravísima',
        outcomeDescription: 'Grave error. La falsificación de firmas o alteración de registros de asistencia constituye una falta disciplinaria gravísima sancionable con cancelación de matrícula.',
        isOptimal: false,
        legalArticle: 'Capítulo V, Art. Faltas Gravísimas y Sanciones',
        points: 0
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Elección de Etapa Productiva en Zona Rural',
    context: 'Centro de Biotecnología. Aprendiz de Tecnología en Gestión Agropecuaria.',
    initialSituation: 'Carlos vive en una comunidad campesina y no desea trasladarse a una gran ciudad para firmar un contrato de aprendizaje industrial. Su cooperativa comunitaria local necesita asesoría técnica en proyectos de cultivo sostenible.',
    choices: [
      {
        id: 'c3-opt1',
        text: 'Renunciar a la formación porque cree que la única alternativa válida es el contrato de aprendizaje de empresa multinacional.',
        outcomeTitle: 'Desconocimiento de Alternativas',
        outcomeDescription: 'Incorrecto. El Acuerdo 009 de 2024 reconoce 6 alternativas legítimas de etapa productiva, impulsando especialmente la economía popular y campesina.',
        isOptimal: false,
        legalArticle: 'Capítulo IV, Art. Alternativas de Etapa Productiva',
        points: 0
      },
      {
        id: 'c3-opt2',
        text: 'Presentar una propuesta de pasantía formativa o proyecto productivo en la economía popular y campesina avalada por el Centro de Formación.',
        outcomeTitle: 'Innovación y Pertinencia Social',
        outcomeDescription: 'Excelente decisión. Carlos tiene el pleno derecho de postular su práctica en la economía comunitaria campesina, contando con seguimiento de un instructor y cumpliendo los objetivos de certificación.',
        isOptimal: true,
        legalArticle: 'Capítulo IV, Art. Alternativas - Economía Popular y Comunitaria',
        points: 25
      },
      {
        id: 'c3-opt3',
        text: 'Hacer el trabajo en la cooperativa sin avisar al SENA y esperar a que le entreguen el diploma.',
        outcomeTitle: 'Falta de Registro y Validez',
        outcomeDescription: 'Incorrecto. Toda alternativa de etapa productiva debe ser concertada, registrada y avalada formalmente por el Coordinador de Etapa Productiva del Centro para tener validez académica.',
        isOptimal: false,
        legalArticle: 'Capítulo IV, Art. Registro y Seguimiento de Etapa Productiva',
        points: 10
      }
    ]
  },
  {
    id: 'case-4',
    title: 'Activación del Protocolo frente a Violencias de Género',
    context: 'Ambiente virtual y presencial. Aprendiz de primer trimestre.',
    initialSituation: 'Laura ha recibido constantes mensajes intimidatorios con contenido sugerente y amenazas de perjudicar sus calificaciones por parte de un miembro de la comunidad educativa a través de canales institucionales.',
    choices: [
      {
        id: 'c4-opt1',
        text: 'Guardar silencio por temor a que le cancelen la matrícula o que nadie le crea.',
        outcomeTitle: 'Vulneración de Protección',
        outcomeDescription: 'Incorrecto. La Ley 2365 de 2024 y el Acuerdo 009 garantizan confidencialidad, no revictimización y protección absoluta para el aprendiz denunciante.',
        isOptimal: false,
        legalArticle: 'Ley 2365 de 2024 & Acuerdo 009 de 2024',
        points: 0
      },
      {
        id: 'c4-opt2',
        text: 'Activar inmediatamente la Ruta de Atención Integral contra el Acoso Sexual ante Bienestar, Coordinación o canales seguros del SENA.',
        outcomeTitle: 'Ruta Institucional Protegida',
        outcomeDescription: 'Respuesta fundamental. La activación de la ruta desencadena medidas cautelares inmediatas (protección física y psicológica, no contacto con el denunciado) y trámite administrativo prioritario.',
        isOptimal: true,
        legalArticle: 'Capítulo V, Art. Protocolo de Prevención del Acoso Sexual (Ley 2365)',
        points: 25
      },
      {
        id: 'c4-opt3',
        text: 'Retirarse voluntariamente del SENA para evitar el problema.',
        outcomeTitle: 'Abandono Injustificado',
        outcomeDescription: 'Incorrecto. El SENA es un espacio seguro con tolerancia cero al acoso. El aprendiz cuenta con todo el respaldo legal e institucional para continuar su formación con plenas garantías.',
        isOptimal: false,
        legalArticle: 'Art. Deber Institucional de Prevención y Erradicación de Violencias',
        points: 0
      }
    ]
  }
];

export const SENA_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    scenario: 'Un nuevo aprendiz ingresa al SENA y desea conocer qué norma regula actualmente sus derechos y deberes.',
    question: '¿Cuál es el acto administrativo vigente que contiene el nuevo Reglamento del Aprendiz SENA?',
    options: [
      {
        id: 'q1-a',
        text: 'El Acuerdo 007 de 2012 sin ninguna modificación.',
        isCorrect: false,
        explanation: 'El Acuerdo 007 de 2012 fue formalmente derogado.'
      },
      {
        id: 'q1-b',
        text: 'El Acuerdo 009 de 2024, adoptado el 22 de noviembre de 2024.',
        isCorrect: true,
        explanation: 'Correcto. El Acuerdo 009 de 2024 es el nuevo reglamento integral vigente que actualiza derechos, deberes y debido proceso.'
      },
      {
        id: 'q1-c',
        text: 'La Ley 119 de 1994 únicamente.',
        isCorrect: false,
        explanation: 'La Ley 119 es la ley de creación institucional, pero el reglamento interno del aprendiz es el Acuerdo 009 de 2024.'
      },
      {
        id: 'q1-d',
        text: 'Una circular informativa emitida anualmente por cada Centro.',
        isCorrect: false,
        explanation: 'El reglamento es de carácter nacional y vinculante para todos los centros del país.'
      }
    ],
    legalReference: 'Acuerdo 009 de 2024 - Adopción de Nuevo Reglamento',
    category: 'Marco Normativo'
  },
  {
    id: 'q2',
    scenario: 'Un aprendiz solicita asesoría porque no pudo alcanzar el resultado de aprendizaje en una evidencia evaluativa.',
    question: '¿Qué garantía formativa le confiere el reglamento antes de que se adopten medidas disciplinarias?',
    options: [
      {
        id: 'q2-a',
        text: 'Expulsión inmediata del programa de formación.',
        isCorrect: false,
        explanation: 'El SENA no expulsa sin agotar las etapas pedagógicas y el debido proceso.'
      },
      {
        id: 'q2-b',
        text: 'Derecho a concertar un Plan de Mejoramiento Académico con el instructor.',
        isCorrect: true,
        explanation: 'Correcto. El aprendiz tiene derecho a concertar un plan pedagógico que le permita subsanar las falencias de aprendizaje identificadas.'
      },
      {
        id: 'q2-c',
        text: 'Pagar una sanción económica al Centro de Formación.',
        isCorrect: false,
        explanation: 'En el SENA la educación es 100% gratuita y no existen sanciones monetarias a los aprendices.'
      },
      {
        id: 'q2-d',
        text: 'Repetir todo el año lectivo desde el primer día.',
        isCorrect: false,
        explanation: 'La formación por competencias permite superar resultados específicos mediante planes de mejora focalizados.'
      }
    ],
    legalReference: 'Acuerdo 009 de 2024 - Medidas Formativas Pedagógicas',
    category: 'Derechos y Evaluación'
  },
  {
    id: 'q3',
    scenario: 'Durante las elecciones locales, un aprendiz lleva camisetas y propaganda política de un candidato para repartir en los talleres.',
    question: '¿Cómo califica el Reglamento del Aprendiz esta conducta?',
    options: [
      {
        id: 'q3-a',
        text: 'Es un derecho fundamental de libre expresión dentro de las aulas.',
        isCorrect: false,
        explanation: 'La libertad de expresión no ampara el proselitismo partidista electoral dentro de la entidad pública.'
      },
      {
        id: 'q3-b',
        text: 'Una prohibición expresa de realizar proselitismo político dentro de las instalaciones del SENA.',
        isCorrect: true,
        explanation: 'Correcto. El Acuerdo 009 prohíbe expresamente el proselitismo político o religioso en sedes físicas o virtuales de la institución para mantener la neutralidad.'
      },
      {
        id: 'q3-c',
        text: 'Una actividad avalada si el candidato apoya al SENA.',
        isCorrect: false,
        explanation: 'Está terminantemente prohibida sin excepción alguna.'
      },
      {
        id: 'q3-d',
        text: 'Una conducta irrelevante que no tiene ninguna implicación.',
        isCorrect: false,
        explanation: 'Constituye una infracción disciplinaria sujeta a reporte ante el Comité de Evaluación.'
      }
    ],
    legalReference: 'Acuerdo 009 de 2024 - Prohibiciones Expresas',
    category: 'Deberes y Convivencia'
  },
  {
    id: 'q4',
    scenario: '¿Cuántos derechos fundamentales del aprendiz están explícitamente consagrados en el Acuerdo 009 de 2024?',
    question: 'Selecciona la cantidad exacta de derechos formalizados en el nuevo reglamento:',
    options: [
      {
        id: 'q4-a',
        text: '10 derechos genéricos.',
        isCorrect: false,
        explanation: 'El anterior reglamento tenía menos, pero el nuevo acuerdo los amplió considerablemente.'
      },
      {
        id: 'q4-b',
        text: '24 derechos del aprendiz ampliados y garantistas.',
        isCorrect: true,
        explanation: 'Correcto. El Acuerdo 009 de 2024 elevó a 24 los derechos, integrando garantías digitales, de género, bienestar e inclusión diferencial.'
      },
      {
        id: 'q4-c',
        text: '50 derechos ilimitados.',
        isCorrect: false,
        explanation: 'La codificación taxativa oficial enumera 24 derechos fundamentales en el Capítulo II.'
      },
      {
        id: 'q4-d',
        text: '12 derechos únicamente para la etapa lectiva.',
        isCorrect: false,
        explanation: 'Los derechos cobijan tanto la etapa lectiva como la etapa productiva.'
      }
    ],
    legalReference: 'Acuerdo 009 de 2024, Capítulo II - Derechos del Aprendiz SENA',
    category: 'Derechos del Aprendiz'
  },
  {
    id: 'q5',
    scenario: 'Un aprendiz debe realizar su etapa productiva y desea saber qué opciones reconoce la institución.',
    question: '¿Cuál de las siguientes es una de las alternativas oficiales reconocidas por el SENA?',
    options: [
      {
        id: 'q5-a',
        text: 'Trabajar en cualquier empleo informal sin ninguna relación con su programa ni seguimiento de instructor.',
        isCorrect: false,
        explanation: 'La etapa productiva exige vinculación afín a las competencias y concertación formal con el SENA.'
      },
      {
        id: 'q5-b',
        text: 'Pasantía en Economía Popular y Campesina, Contrato de Aprendizaje, Proyecto Productivo o Monitoría.',
        isCorrect: true,
        explanation: 'Correcto. El nuevo acuerdo reconoce 6 alternativas que incluyen la economía popular/campesina, proyectos de innovación y contrato formativo.'
      },
      {
        id: 'q5-c',
        text: 'Pagar un curso de diplomado en una universidad privada para homologar.',
        isCorrect: false,
        explanation: 'No está contemplada la homologación por cursos pagos externos no avalados por convenios SENA.'
      },
      {
        id: 'q5-d',
        text: 'Descansar 6 meses en casa.',
        isCorrect: false,
        explanation: 'La etapa productiva es un requisito obligatorio de aplicación práctica para poder titularse.'
      }
    ],
    legalReference: 'Acuerdo 009 de 2024, Capítulo IV - Alternativas de Etapa Productiva',
    category: 'Etapa Productiva'
  },
  {
    id: 'q6',
    scenario: 'Una aprendiz es víctima de insinuaciones sexuales indebidas o acoso por medios digitales dentro del entorno formativo.',
    question: 'En virtud de la Ley 2365 de 2024 y el Acuerdo 009 de 2024, ¿cuál es la orden de actuación institucional?',
    options: [
      {
        id: 'q6-a',
        text: 'Decirle a la aprendiz que cambie su número de celular y no hacer nada más.',
        isCorrect: false,
        explanation: 'La entidad tiene el deber ineludible de actuar y brindar garantías inmediatas.'
      },
      {
        id: 'q6-b',
        text: 'Activar de manera inmediata la ruta de atención integral con enfoque de género, garantizando protección, confidencialidad y medidas cautelares.',
        isCorrect: true,
        explanation: 'Correcto. La Ley 2365 de 2024 y el Acuerdo 009 imponen tolerancia cero y activación inmediata de la ruta de protección integral y sancionatoria.'
      },
      {
        id: 'q6-c',
        text: 'Confrontar a la víctima y al victimario en público sin acompañamiento profesional.',
        isCorrect: false,
        explanation: 'La revictimización está expresamente prohibida por la ley y los protocolos del SENA.'
      },
      {
        id: 'q6-d',
        text: 'Esperar a que termine el año lectivo para revisar el caso.',
        isCorrect: false,
        explanation: 'La ruta debe activarse de forma célere y prioritaria con medidas cautelares.'
      }
    ],
    legalReference: 'Ley 2365 de 2024 & Acuerdo 009 de 2024 - Ruta Contra Violencias de Género',
    category: 'Protección y Género'
  },
  {
    id: 'q7',
    scenario: 'Un aprendiz requiere ausentarse de las clases por motivos de salud de urgencia comprobada.',
    question: '¿Qué plazo concede el reglamento para radicar los soportes e incapacidad médica?',
    options: [
      {
        id: 'q7-a',
        text: 'Máximo 3 días hábiles siguientes al hecho o expedición de la novedad.',
        isCorrect: true,
        explanation: 'Correcto. El aprendiz dispone de hasta 3 días hábiles para allegar la incapacidad y justificar su ausencia ante los instructores y coordinación.'
      },
      {
        id: 'q7-b',
        text: '30 días calendario.',
        isCorrect: false,
        explanation: '30 días excede los plazos legales y provocaría reporte de deserción en SofiaPlus.'
      },
      {
        id: 'q7-c',
        text: 'No es necesario entregar ninguna excusa médica.',
        isCorrect: false,
        explanation: 'Las inasistencias injustificadas generan alertas y procesos de deserción.'
      },
      {
        id: 'q7-d',
        text: 'Solo hasta el día de la graduación.',
        isCorrect: false,
        explanation: 'Las evidencias y asistencias se controlan en tiempo real en los ambientes formativos.'
      }
    ],
    legalReference: 'Acuerdo 009 de 2024 - Justificación de Inasistencias',
    category: 'Deberes y Asistencia'
  },
  {
    id: 'q8',
    scenario: 'Cuando el Comité de Evaluación y Seguimiento recomienda la sanción de Cancelación de Matrícula por falta gravísima:',
    question: '¿Qué consecuencia jurídica adicional acarrea esta decisión para el infractor?',
    options: [
      {
        id: 'q8-a',
        text: 'Ninguna consecuencia; puede inscribirse al día siguiente en otro centro.',
        isCorrect: false,
        explanation: 'La sanción genera una inhabilidad en el sistema nacional SofiaPlus.'
      },
      {
        id: 'q8-b',
        text: 'Inhabilidad para matricularse en el SENA por un periodo de 6 a 12 meses.',
        isCorrect: true,
        explanation: 'Correcto. La cancelación de matrícula conlleva una inhabilidad de 6 a 12 meses para reingresar a cualquier programa del SENA.'
      },
      {
        id: 'q8-c',
        text: 'Inhabilidad permanente de por vida.',
        isCorrect: false,
        explanation: 'El derecho formativo colombiano no contempla inhabilidades perpetuas de estudio.'
      },
      {
        id: 'q8-d',
        text: 'Pérdida de la ciudadanía colombiana.',
        isCorrect: false,
        explanation: 'Una sanción académica institucional no afecta los derechos de ciudadanía civil.'
      }
    ],
    legalReference: 'Acuerdo 009 de 2024, Capítulo V - Sanciones Disciplinarias e Inhabilidades',
    category: 'Régimen Sancionatorio'
  }
];
