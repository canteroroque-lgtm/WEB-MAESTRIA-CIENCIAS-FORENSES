// ============================================================
// Maestría Interdisciplinaria en Ciencias Forenses · UBA
// CRONOGRAMA OFICIAL 2026–2027  (fuente: cronograma_MCF_2026_2027)
// Todas las clases se dictan JUEVES y VIERNES.
// ============================================================

const DIAS = "Jueves y Viernes";

// --- Paquetes de materias específicas (se cursa UNA por paquete) ---
// Las 3 materias de un paquete se dictan en simultáneo, en las MISMAS fechas.
const PAQUETES = [
  { id:"1", color:"#ff3df0", mes:"Junio 2026",      fechas:"4, 5, 11 y 12 de junio de 2026",          dates:["2026-06-04","2026-06-05","2026-06-11","2026-06-12"] },
  { id:"2", color:"#c8ff3d", mes:"Junio 2026",      fechas:"18, 19, 25 y 26 de junio de 2026",        dates:["2026-06-18","2026-06-19","2026-06-25","2026-06-26"] },
  { id:"7", color:"#ffd23d", mes:"Julio 2026",      fechas:"2, 3, 16 y 17 de julio de 2026",          dates:["2026-07-02","2026-07-03","2026-07-16","2026-07-17"] },
  { id:"4", color:"#3d9bff", mes:"Septiembre 2026", fechas:"17, 18, 24 y 25 de septiembre de 2026",    dates:["2026-09-17","2026-09-18","2026-09-24","2026-09-25"] },
  { id:"6", color:"#ff5d8f", mes:"Julio 2027",      fechas:"1, 2, 15 y 16 de julio de 2027",          dates:["2027-07-01","2027-07-02","2027-07-15","2027-07-16"] },
  { id:"3", color:"#ff9d3d", mes:"Octubre 2027",    fechas:"7, 8, 14 y 15 de octubre de 2027",        dates:["2027-10-07","2027-10-08","2027-10-14","2027-10-15"] },
  { id:"5", color:"#2ce8c4", mes:"Octubre 2027",    fechas:"21, 22, 28 y 29 de octubre de 2027",      dates:["2027-10-21","2027-10-22","2027-10-28","2027-10-29"] },
  { id:"8", color:"#b388ff", mes:"Noviembre 2027",  fechas:"4, 5, 11 y 12 de noviembre de 2027",       dates:["2027-11-04","2027-11-05","2027-11-11","2027-11-12"] },
  { id:"9", color:"#5ad1ff", mes:"Noviembre 2027",  segunda:true, nota:"2ª oferta (Paquetes 1 y 6)",   fechas:"18, 19, 25 y 26 de noviembre de 2027", dates:["2027-11-18","2027-11-19","2027-11-25","2027-11-26"] }
];

// --- 13 Materias Obligatorias (ciclo común) ---
const OBLIGATORIAS = [
  { n:1, title:"Introducción a las Ciencias Forenses", area:"Troncal",
    dates:["2026-04-09","2026-04-10"],
    resp:["García, Ariana","Rodríguez, Flabia"],
    equipo:["Eric García López","Pablo Lamounan","Mario Herrera","Glorio, Roberto"],
    desc:"Definición y alcance de las Ciencias Forenses. Historia y evolución. Principales áreas de aplicación. Importancia en el sistema de justicia. Métodos y técnicas para la recolección, análisis e interpretación de la evidencia. Interdisciplinariedad. Desafíos y avances recientes. Casos históricos relevantes. Tendencias emergentes e inteligencia artificial. Ética y responsabilidad profesional.", examen:"2026-05-09", oficial:true },
  { n:2, title:"Introducción al Derecho. Derecho Constitucional. Derechos Humanos", area:"Derecho",
    dates:["2026-04-16","2026-04-17","2026-04-23","2026-04-24","2026-04-30","2026-05-07"],
    resp:["Cao, Christian Alberto"], equipo:["Albertus, Viviana","Firpo, Silvia"],
    desc:"La Constitución Nacional y los tratados de derechos humanos en el ámbito de actuación del perito. Protocolos de Minnesota y Estambul. Derechos constitucionales como reglas de actuación profesional. Garantías de las partes y labor actuarial del perito. Límites de la intervención del experto. Honorarios profesionales. El perito como auxiliar del sistema de justicia.", examen:"2026-07-11", recup:"2026-08-15", oficial:true },
  { n:3, title:"Criminalística", area:"Criminalística",
    dates:["2026-05-08","2026-05-14","2026-05-15","2026-05-21","2026-05-22","2026-05-28"],
    resp:["Torre, Raúl"], equipo:[],
    desc:"Introducción a la investigación criminal. La escena del crimen. Identidad humana. Balística y Química Forense. Documentología. Huellas indiciarias. El ADN en la investigación. Conservación de escenas. Biometría. Aplicación de medios electrónicos a la investigación criminal.", examen:"2026-08-01", recup:"2026-09-05", oficial:true },
  { n:4, title:"Derecho Penal y Procesal Penal", area:"Derecho",
    dates:["2026-08-06","2026-08-07","2026-08-13","2026-08-14","2026-08-20","2026-08-21"],
    resp:["De la Fuente, Javier"], equipo:["Salduna, Mariana"],
    desc:"Principios del derecho penal: legalidad, culpabilidad. Teoría jurídica del delito. Dolo y error. Causas de justificación e inculpabilidad. Consecuencias jurídicas del delito. Parte especial: homicidios, lesiones, delitos contra la integridad sexual y la libertad. El proceso penal: garantías, investigación, juicio oral. Intervención de peritos.", examen:"2026-10-24", recup:"2026-11-21", oficial:true },
  { n:5, title:"Ética, Bioética Forense", area:"Troncal",
    dates:["2026-09-03","2026-09-04"],
    resp:["Fariña, Jorge Michel"], equipo:[],
    desc:"Ética y Bioética en la práctica forense: principios, dilemas y códigos de conducta. Comités de bioética. Responsabilidad profesional y legal. Consentimiento informado y confidencialidad. Temas especiales: manipulación genética, eutanasia, trasplantes. Análisis de casos reales.", examen:"2026-11-07", recup:"2026-12-05", oficial:true },
  { n:6, title:"Laboratorios Forenses. Bioseguridad e Higiene", area:"Laboratorio",
    dates:["2026-10-01","2026-10-02","2026-10-08","2026-10-09","2026-10-15","2026-10-16"],
    resp:["Azcurra, Marcela"], equipo:["Schreier, Laura","Martínez González, María Antonia"],
    desc:"Organización y funcionamiento de los laboratorios forenses. Genética, Bioquímica, Toxicología y Antropología forense. Histopatología aplicada. Diagnóstico por imágenes. Protocolos y POE. Bioseguridad e higiene frente al riesgo biológico.", examen:"2026-12-19", recup:"2027-02-06", oficial:true },
  { n:7, title:"Introducción a la Medicina Legal", area:"Medicina Legal",
    dates:["2026-11-05","2026-11-06","2026-11-12","2026-11-13","2026-11-26","2026-11-27"],
    resp:["Glorio, Roberto"], equipo:[],
    desc:"Medicina Legal y Derecho. Ejercicio legal de la medicina (Ley 17.132). Secreto profesional: doctrina Tarasoff y Plenario Frías. Responsabilidad profesional. Certificados e historia clínica. Lesionología médico-legal. Delitos contra la integridad sexual. Ley de trasplantes.", examen:"2027-02-13", recup:"2027-03-06", oficial:true },
  { n:8, title:"Introducción a la Tanatología General", area:"Medicina Legal",
    dates:["2026-12-03","2026-12-04","2026-12-10","2026-12-11","2026-12-17","2026-12-18"],
    resp:["Losetti, Oscar"], equipo:["Vega, Alejandro","Tinto, Gabriela"],
    desc:"Tanatología, Lesionología y Patología Forense. Morfología y clasificación de lesiones. Evaluación de la muerte: diagnóstico y transformaciones cadavéricas. Autopsia: tipos, metodología e instrumental. Tiempo de muerte. Putrefacción y esqueletización. Patología forense gestacional y perinatal.", examen:"2027-02-20", recup:"2027-03-20", oficial:true },
  { n:9, title:"Introducción a la Psiquiatría Forense", area:"Psiquiatría",
    dates:["2027-04-08","2027-04-09","2027-04-15","2027-04-16","2027-04-22","2027-04-23"],
    resp:["Silva, Daniel"], equipo:["Mazzoglio y Nabar, Martín","Muñiz, Milagros","Brusco, Ignacio"],
    desc:"Valoración psiquiátrica en ámbitos judicial, policial y de seguridad. Semiología y síndromes psicopatológicos. Capacidad penal e inimputabilidad. Emoción violenta y Trastorno Mental Transitorio. Simulación y disimulación. Perfilación criminal. Autopsia psicológica.", examen:"2027-06-26" },
  { n:10, title:"Derecho Civil y Procesal Civil. Prueba Pericial", area:"Derecho",
    dates:["2027-05-06","2027-05-07","2027-05-13","2027-05-14","2027-05-20","2027-05-21"],
    resp:["Rebaudi Basavilbaso, Ignacio Martín"], equipo:["Mpolás Andreadis, Alejandra"],
    desc:"Responsabilidad Civil y Responsabilidad Civil Profesional. Funciones preventiva, punitiva y resarcitoria. Mala praxis. Confidencialidad e historia clínica. Prueba Pericial: designación de peritos, función, obligaciones, recusaciones. Valoración e impugnación. Reparación integral del daño.", examen:"2027-07-24" },
  { n:11, title:"Introducción a la Psicología Jurídica y Forense", area:"Psicología",
    dates:["2027-06-03","2027-06-04","2027-06-10","2027-06-11","2027-06-17","2027-06-18"],
    resp:["García, Ariana Gabriela"], equipo:["Muñoz, J.M.","Echauri, Josean","Puente, Olga","Salinas, M.I.","Scaff, Elias","Azcarate, Juana"],
    desc:"Psicología Jurídica: aspectos legales del ejercicio profesional (Ley 23.277). Entrecruzamiento entre psicología y derecho. Testigo vs. perito. Imputabilidad (Art. 34 CP). Daño moral y psíquico. TEPT. Baremos de incapacidad. Violencia familiar y de género. Ley de Salud Mental.", examen:"2027-08-21" },
  { n:12, title:"Victimología", area:"Criminología",
    dates:["2027-08-05","2027-08-06","2027-08-12","2027-08-13","2027-08-19","2027-08-20"],
    resp:["Rodríguez, Flabia"], equipo:["Taibo, Lorena","Maffioletti, Francisco"],
    desc:"Definición y evolución de la Victimología. Tipos de víctimas. Teorías de la victimización. Impacto psicológico, social y económico. Ciclo de la victimización. Respuestas institucionales y comunitarias. Victimización en violencia de género, infantil y en contextos de conflicto.", examen:"2027-10-23" },
  { n:13, title:"Criminología", area:"Criminología",
    dates:["2027-09-02","2027-09-03","2027-09-09","2027-09-10","2027-09-16","2027-09-17"],
    resp:["Foyo, Roberto"], equipo:[],
    desc:"Escuelas y teorías criminológicas. El delito y la Criminología. Estudio y evaluación del delincuente. Modalidades delictivas y organizaciones delincuenciales. Control social. Prevención y tratamiento. Violencia de género y doméstica desde una perspectiva criminológica.", examen:"2027-11-20" }
];

const TESIS = {
  title:"Taller de Tesis", area:"Investigación",
  dates:["2026-10-22","2026-10-23","2027-04-29","2027-04-30","2027-06-24","2027-06-25","2027-08-26","2027-08-27","2027-09-30","2027-10-01"],
  fechas:"22–23 oct 2026 · 29–30 abr 2027 · 24–25 jun 2027 · 26–27 ago 2027 · 30 sep – 1 oct 2027",
  resp:["Jaume, Luis","Roca, Marcelo"], equipo:[],
  desc:"Espacio transversal para la elaboración, seguimiento y orientación del trabajo final: formulación del problema, objetivos, hipótesis, metodología y marco teórico, con tutorías personalizadas a lo largo de toda la maestría hasta el proyecto de tesis avalado por el director." };

// --- 24 Materias Específicas (electivas) ---  paq = paquete; paq2 = 2ª oferta
const ESPECIFICAS = [
  // Paquete 1
  { title:"Evaluación del Daño Psíquico", area:"Psicología", paq:"1", paq2:"9",
    resp:["Muñoz Vicente, José Manuel"], equipo:["Rodríguez, Flabia","García, Ariana"],
    desc:"Concepto de daño psíquico y daño moral. Criterios de diagnóstico y cuantificación del daño. Escalas y protocolos de evaluación. Elaboración de informes periciales.", examen:"2026-08-15", recup:"2026-09-12", oficial:true },
  { title:"Delitos contra la Integridad Sexual", area:"Derecho", paq:"1", paq2:"9",
    resp:["Kiss, Silvina"], equipo:["Esteban, Bettina","Vidal, Flavia"],
    desc:"Aspectos psicológicos, médicos y legales. Evaluación de víctimas y victimarios. Consentimiento, vulnerabilidad y trauma. Marco normativo nacional e internacional.", examen:"2026-08-15", recup:"2026-09-12", oficial:true },
  { title:"Toxicología Forense", area:"Laboratorio", paq:"1",
    resp:["Bardoni, Natalia"], equipo:["Damin, Carlos"],
    desc:"Detección de sustancias tóxicas, drogas y venenos en el cuerpo humano. Protocolos de análisis. Interpretación de resultados en casos judiciales.", examen:"2026-08-15", recup:"2026-09-12", oficial:true },
  // Paquete 2
  { title:"Autopsia Psicológica", area:"Psicología", paq:"2",
    resp:["Chilo, Javier Francisco"], equipo:["Musumeci, Sandra","Ceballos Espinoza, Francisco"],
    desc:"Metodología de reconstrucción del estado mental de una persona fallecida. Fuentes: entrevistas, documentos, pericias previas. Aplicaciones en suicidios, homicidios y muertes dudosas.", examen:"2026-08-29", recup:"2026-09-26", oficial:true },
  { title:"Genética Forense", area:"Laboratorio", paq:"2",
    resp:["Colussi, Andrea"], equipo:["Lisandro Laborde"],
    desc:"Identificación humana mediante ADN. Marcadores genéticos. Análisis de filiación, muestras biológicas y rastros en la escena del crimen.", examen:"2026-08-29", recup:"2026-09-26", oficial:true },
  { title:"Documentología (Caligráficos e Informáticos)", area:"Criminalística", paq:"2",
    resp:["González, Domingo Antonio"], equipo:["Bendinelli, Maximiliano"],
    desc:"Análisis de documentos y escrituras. Detección de falsificaciones y adulteraciones. Firma digital y pericia informática.", examen:"2026-08-29", recup:"2026-09-26", oficial:true },
  // Paquete 7
  { title:"Perfilación Forense y Serialidad Criminal", area:"Criminología", paq:"7",
    resp:["Monros Llistar, Salvador"], equipo:["Garrido, Vicente"],
    desc:"Análisis de patrones conductuales y modus operandi. Clasificación de delincuentes seriales. Perfilación inductiva y deductiva. Aplicaciones en investigación judicial.", examen:"2026-09-26", recup:"2026-10-24", oficial:true },
  { title:"Antropología Forense", area:"Medicina Legal", paq:"7",
    resp:["Selva, Mariana"], equipo:["Segura, Mariana"],
    desc:"Identificación humana a partir de restos óseos. Determinación de edad, sexo y causa de muerte. Excavaciones y cadena de custodia.", examen:"2026-09-26", recup:"2026-10-24", oficial:true },
  { title:"Neuropsiquiatría Forense", area:"Psiquiatría", paq:"7",
    resp:["Mazzoglio y Nabar, Martín"], equipo:["Rubén Daniel Algieri","Agustín Algieri"],
    desc:"Relación entre alteraciones neuropsiquiátricas y conducta criminal. Evaluación de la imputabilidad. Peritajes complejos e interdisciplinarios.", examen:"2026-09-26", recup:"2026-10-24", oficial:true },
  // Paquete 4
  { title:"Técnicas de Evaluación Psicológicas en el Campo Forense", area:"Psicología", paq:"4",
    resp:["Castro Solano, Alejandro"], equipo:["De la Iglesia, Guadalupe","Guzmán, Leandro","Colaberardino, Valeria"],
    desc:"Instrumentos psicométricos y proyectivos aplicados al contexto judicial. Adaptación de técnicas a la evaluación pericial. Protocolos y estándares. Validación de resultados. Informes psicológicos para la justicia.", examen:"2026-11-21", recup:"2026-12-19", oficial:true },
  { title:"Histopatología Forense", area:"Laboratorio", paq:"4",
    resp:["Matoso, Miriam"], equipo:["María Laura Aon Bertolino"],
    desc:"Estudio microscópico de tejidos en el contexto judicial. Lesiones, enfermedades y causas de muerte. Técnicas histológicas aplicadas a la medicina legal.", examen:"2026-11-21", recup:"2026-12-19", oficial:true },
  { title:"Derecho de Ejecución Penal y Justicia Restaurativa", area:"Derecho", paq:"4",
    resp:["Peluzzi, Marcelo"], equipo:["Fuentes, Gabriela"],
    desc:"Régimen de ejecución de la pena privativa de libertad. Derechos de los internos. Programas de reinserción y justicia restaurativa. Alternativas a la prisión.", examen:"2026-11-21", recup:"2026-12-19", oficial:true },
  // Paquete 6
  { title:"Psicología del Testimonio", area:"Psicología", paq:"6",
    resp:["Rey Cattani, Romina"], equipo:["Manzanero, Antonio"],
    desc:"Procesos de memoria, percepción y sugestión en la declaración de testigos y víctimas. Factores que influyen en la credibilidad. Entrevista cognitiva. Reconocimiento de personas.", examen:"2027-09-18" },
  { title:"Tanatología Forense", area:"Medicina Legal", paq:"6", paq2:"9",
    resp:["Maffia, Santiago"], equipo:["Vega, Alejandro"],
    desc:"Estudio médico-legal de la muerte. Autopsia judicial, diagnóstico de muerte violenta y causas de fallecimiento. Determinación del tiempo de muerte.", examen:"2027-09-18" },
  { title:"Bioquímica Forense", area:"Laboratorio", paq:"6",
    resp:["Azcurra, Marcela"], equipo:["Caputo, Mariela"],
    desc:"Análisis químico de muestras en contextos judiciales. Contaminación ambiental, intoxicaciones y residuos peligrosos. Marco legal y protocolos de actuación.", examen:"2027-09-18" },
  // Paquete 3
  { title:"Psiquiatría Forense", area:"Psiquiatría", paq:"3",
    resp:["Ghioldi, Leonardo"], equipo:["Toro Martínez, Esteban","Luna, Maximiliano","Coronel, Pablo"],
    desc:"Diagnóstico psiquiátrico y responsabilidad penal. Trastornos mentales graves y su impacto en la imputabilidad. Peritaciones psiquiátricas en los distintos fueros.", examen:"2027-12-18" },
  { title:"Odontología Legal", area:"Medicina Legal", paq:"3",
    resp:["Maldonado, Marta"], equipo:["Aguirre, Raúl Alejandro"],
    desc:"Identificación de personas por dentición. Lesiones bucodentales y valoración médico-legal. Documentación odontológica forense.", examen:"2027-12-18" },
  { title:"Problemáticas de Familia en el Campo Forense", area:"Psicología", paq:"3",
    resp:["Medina, Mirta"], equipo:["García, Mariela","David Ramírez Acuña"],
    desc:"Conflictos familiares, abuso, violencia y tutela judicial. Intervención pericial en causas de familia. Aspectos psicológicos y legales.", examen:"2027-12-18" },
  // Paquete 5
  { title:"Psicopatología Forense", area:"Psiquiatría", paq:"5",
    resp:["Rezzoagli, Adrián"], equipo:[],
    desc:"Clasificación de los trastornos mentales y su relevancia penal. Evaluación de la imputabilidad y la peligrosidad. Relación entre psicopatología y criminalidad. Análisis de casos.", examen:"2028-01-01" },
  { title:"Biología Forense", area:"Laboratorio", paq:"5",
    resp:["Povilauskas, Leticia"], equipo:["Peralta, Luciano"],
    desc:"Uso de insectos y pólenes (entomología y palinología) para determinar tiempo y lugar de muerte. Identificación de restos biológicos. Aplicaciones en investigación criminal.", examen:"2028-01-01" },
  { title:"Imágenes Forenses", area:"Medicina Legal", paq:"5",
    resp:["Pereyra, Jorge"], equipo:["Aparici, Inés"],
    desc:"Aplicación de técnicas de diagnóstico por imágenes (radiografía, TAC, RMN) a la investigación judicial. Identificación de lesiones y restos humanos.", examen:"2028-01-01" },
  // Paquete 8
  { title:"Psicología Jurídica y Forense", area:"Psicología", paq:"8",
    resp:["Puhl, Stella Maris"], equipo:[],
    desc:"Fundamentos psicológicos del comportamiento delictivo y de la responsabilidad penal. Imputabilidad, daño psíquico, credibilidad del testimonio y peligrosidad. Intervención en los distintos fueros.", examen:"2028-01-15" },
  { title:"Neuropsicología Forense", area:"Psiquiatría", paq:"8",
    resp:["Diletto, Graciela","Sánchez Negrete, Gabriela"], equipo:["Pafundi, Víctor","Galicia, Olga","María Sarasa"],
    desc:"Bases neurológicas del comportamiento criminal. Lesiones cerebrales, funciones ejecutivas y control de impulsos. Evaluación neuropsicológica en el ámbito judicial.", examen:"2028-01-15" },
  { title:"Gestión de Riesgos en la Práctica Forense", area:"Criminalística", paq:"8",
    resp:["Miguel, Sergio"], equipo:["Silvana González Capria","Susana Corral"],
    desc:"Protocolos de seguridad, prevención de riesgos biológicos y químicos. Gestión de crisis, emergencias y catástrofes. Ética profesional.", examen:"2028-01-15" }
];

// --- Información de trámites (para el letrero móvil) ---
const TICKER = [
  { tag:"CURSADA",     txt:"Todas las clases se dictan JUEVES y VIERNES." },
  { tag:"ESPECÍFICAS", txt:"Se cursa UNA materia por paquete — las tres del paquete se dictan en simultáneo." },
  { tag:"INSCRIPCIÓN", txt:"Si recibió el correo confirmando su vacante, ingrese al Sistema de Posgrado con su usuario y clave." },
  { tag:"PAGOS",       txt:"Abonar cursos online: Sistema de Posgrado → «Abonar cursos online» → seleccione el curso → ABONAR (redirige a PayU)." },
  { tag:"PAGOS",       txt:"Formas de pago vía PayU: tarjeta de crédito, tarjeta de débito o efectivo." },
  { tag:"HOME BANKING",txt:"Pago Mis Cuentas: «Reimprimir Orden de Cobro» → buscar «UBA-Fac De Psicología» → ingresar el código de la orden." },
  { tag:"PLAZO",       txt:"Pago Mis Cuentas demora hasta 48 hs hábiles desde la confirmación de la inscripción." },
  { tag:"ATENCIÓN",    txt:"Si el cupón está vencido no puede abonarse por Pago Mis Cuentas: hágalo por «Abonar cursos online»." },
  { tag:"CONTACTO",    txt:"Altas: altasposgrado@psi.uba.ar · Tesorería: tesoreriaposgrado@psi.uba.ar · Contable: consultascontable@psi.uba.ar" },
  { tag:"SEDE",        txt:"Facultad de Psicología · Universidad de Buenos Aires · maestriacienciasforensesuba.ar" }
];

window.MCF = { DIAS, PAQUETES, OBLIGATORIAS, TESIS, ESPECIFICAS, TICKER };
