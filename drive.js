// Materiales de Drive · Maestría Interdisciplinaria en Ciencias Forenses UBA
// Actualizado: 14/06/2026 — Fuente: Drive roquecantero26@gmail.com
// kind: pdf | doc | folder | zip

const F  = id => "https://drive.google.com/drive/folders/" + id;
const FL = id => "https://drive.google.com/file/d/" + id + "/view";
const DC = id => "https://docs.google.com/document/d/" + id + "/edit";

const MCF_DRIVE = {

  // ─── DERECHO PENAL Y PROCESAL PENAL ─────────────────────────────────────
  "Derecho Penal y Procesal Penal": {
    folder: F("1vzqFo59AY0zSxue8i3gZ9a21bP4K9GCn"),
    files: []
  },


  // ─── 1. INTRODUCCIÓN A LAS CIENCIAS FORENSES ────────────────────────────
  "Introducción a las Ciencias Forenses": {
    folder: F("1NtXMPb-6XBdGkL6cxeM45qNRiqgZcFLq"),
    files: [
      { t: "Estrategia de estudio", u: DC("1I-qCUugMFd4BUc1RKGz1Zz9x3GQYd4bG7BessCTKab0"), k: "doc" },
      { t: "Guía de Estudio · Fases I–II", u: DC("1V7kIOBzD16Gz-VTUQrCxq3MX01VjRb_5B382XV2A4PY"), k: "doc" },
      { t: "Guía de Estudio · Fases III–IV–V", u: DC("17m9UDIAATJFDh-qqQqev_w0FqOY0jejJL1ipKbVrxCg"), k: "doc" },
      { t: "Góngora · Introducción a las Ciencias Forenses", u: FL("11gUnvwaQpEgHykLCJ2Dn0rDgr2XcM8KH"), k: "pdf" },
      { t: "García Rodríguez · Ficha de Cátedra", u: FL("1940J0hE0FxGuctQWz9f21pNnQhQUyPTn"), k: "pdf" },
      { t: "Eric García López · Psicopatología Forense", u: FL("16L1VP7AjR0VgHJYX3dAjwQADY1pEaxf6"), k: "pdf" },
      { t: "Dror · Factores cognitivos en la toma de decisiones", u: FL("1Bp9MKen6-apq2OpjDHNYzalw3oOugEhX"), k: "pdf" },
      { t: "Lombroso · L'Uomo Delinquente", u: FL("1rvlYceYgEqw4YL6O7CgfPe81HFWlXv5N"), k: "pdf" },
      { t: "Neuroética", u: FL("1lwTMJHd4XYKl4dYVtgRcI1lk34m-djXH"), k: "pdf" },
      { t: "NAS 2009 · Strengthening Forensic Science", u: FL("1gF5rQ32OSggx4PFtPMBFELw62jwKqLkc"), k: "pdf" },
      { t: "Manual de razonamiento probatorio", u: FL("1EAT7mzBSSuxpqNQBJgLCCMvW3JClxbEL"), k: "pdf" },
      { t: "Manual de prueba pericial (digital)", u: FL("1v73Et5VdFBLqQfqrp4msgCRmMc4Ngh_Z"), k: "pdf" },
      { t: "Manual para juzgar con perspectiva de género", u: FL("1psZ4VKih2Ia0ndpdfSnw6Ai-ikueYljo"), k: "pdf" },
      { t: "Prueba · violencia por razones de género", u: FL("1VLwnR3ApSB_goqzHEa7OiMNfX9my46mf"), k: "pdf" }
    ]
  },

  // ─── 2. INTRO AL DERECHO / DERECHO CONSTITUCIONAL / DDHH ────────────────
  "Introducción al Derecho. Derecho Constitucional. Derechos Humanos": {
    folder: F("1xbawNF3aRNZid31rSrslIV3XmyBRF648"),
    files: [
      { t: "MF1602 · Documento de Estudio Mejorado", u: DC("19ctn9wcZB81wLc4bz3WPFSWZdaeB1QtE9vVJUIQJQls"), k: "doc" },
      { t: "MF1602 · Guía de Estudio 15 días", u: FL("1UT3OfLbczT1vFuaa82b-18PSwHcVBnMO"), k: "pdf" },
      { t: "Grabaciones de las clases", u: F("1IbfGr_7e2Y8u9OC6VCYz8AD7jlq0SRXs"), k: "folder" },
      { t: "Clase 30/4 · Derechos Colectivos · Pericia Civil", u: DC("1pWptNl_9cv0LIKXwzEYmXk8RuIEX1FahWrEqHEUUB7A"), k: "doc" },
      { t: "Notas última clase · MF1602", u: DC("1L5MwEoJA3gA40vOdBU7DzMTTJxeORxtVVoezz9b--fU"), k: "doc" },
      { t: "Resumen · Fuentes del Derecho", u: FL("19__yUFFTa4aAgyqOfp4kDZ2eHEalAClR"), k: "doc" },
      { t: "Clase 2 · Derechos Civiles y Políticos", u: FL("1p5eqLoyDMYzoCxOg6RZ01U6gTZZ01Lu0"), k: "doc" },
      { t: "📘 Guía de Estudio para Examen", u: DC("1FEwgCs673yRETteGa6harhmGAe59BSP9"), k: "doc" }
    ]
  },

  // ─── 3. CRIMINALÍSTICA ──────────────────────────────────────────────────
  "Criminalística": {
    folder: F("1TKFLQvSDwNZWkLyV0PDsrFNmxoBu9MV-"),
    files: [
      { t: "Programa MF1603 · Criminalística", u: FL("1wVeaJhPBVnyInGHpuGil1uEYPzGP37Ve"), k: "pdf" },
      { t: "Clase 1", u: F("1etnhz0kstfEStCEMt8qmMHCLD39DaI6h"), k: "folder" },
      { t: "Clase 2", u: F("1bZxwdwRpTSZlXLsSrN-qq6-Q-iZCRWeU"), k: "folder" },
      { t: "Clase 3", u: F("1qjeNta4kXb8Yd2Qr4rBt1CRBMhje_r47"), k: "folder" },
      { t: "Clase 4", u: F("1VqnRmJOTc5XFEfH1zQJYm24EzuZZ6iSS"), k: "folder" },
      { t: "Clase 5", u: F("1sGnaNARqoTslpO2cDR3idHUSIxwutQSC"), k: "folder" },
      { t: "Clase 6", u: F("1SHXQAHVJ4oCv9jjla7i3757Qsw7Y94lp"), k: "folder" },
      { t: "Manual de Procesamiento de la Escena del Delito", u: FL("1_PmvbRAZqUS7MoDBXynbGQORqWwmui3Y"), k: "pdf" },
      { t: "Manual de Criminalística de Campo", u: FL("1OUspxjougZX4DqI9xZf_K9JPj3vAIeyn"), k: "pdf" },
      { t: "Metodología de la investigación criminal", u: FL("1wET0GBRSdXpCt3p6wjwe5NHNYn-flnIQ"), k: "pdf" },
      { t: "Guía para el levantamiento de la evidencia", u: FL("1oKmep7qH2CdScxEZWuzlld9jn_-Yl7V8"), k: "pdf" },
      { t: "Interpol · Balística Forense", u: FL("1WsRkP0gsFqdq5RiR2I7b9nNM-VE7SbVy"), k: "pdf" },
      { t: "Protocolo · Cadena de Custodia (MPF)", u: FL("1DVIipRVmw6GJSUC5_-ORXHl0mn1xem49"), k: "pdf" },
      { t: "Protocolo Latinoamericano de Investigación", u: FL("1BgNk1lHbMS4obAg0PhPk4E7SN0-jnJWC"), k: "pdf" },
      { t: "MINSEG–MPFN · Protocolo de evidencia digital", u: FL("1QpTHzppPClF9gbRM95uDNs-MDsbkTsKu"), k: "pdf" },
      { t: "Protocolo · Informe de Criptoactivos", u: FL("18Mm-cBV4mr5y-aqm1IUjdsaQiHyAGAnC"), k: "pdf" },
      { t: "Programa Nacional de Criminalística", u: FL("1FQ5v6b2AIqoV2rSIUsAxkqI5p_4rBPl6"), k: "pdf" },
      { t: "Protocolo · Investigación de femicidios", u: FL("1coR97i7YsRWIQCZVR6dizTe6HyfSVBOJ"), k: "pdf" },
      { t: "Guía Forense · recuperación y análisis de restos óseos", u: FL("1zWsfbZGMoVGvFlOID7t4sANtuwehB0zt"), k: "pdf" },
      { t: "La Muerte Violenta", u: FL("1A8jq7sx7nCMx59hTtQavjMTQ_k_4yBYB"), k: "pdf" },
      { t: "Perspectivas Multidisciplinarias para Investigadores", u: FL("1q332Fhn3JJyJIOYoAlBv5-4WF-VBJAJK"), k: "pdf" },
      { t: "Ciberdelitos e Inteligencia Artificial", u: FL("1jksw0Lch8-nr3IdVRlhUUlfqvRfInc6M"), k: "pdf" },
      { t: "Protocolo · consumos problemáticos", u: FL("1HwgoOgkAQp3t9XA9H9NFJAExqXwM2Wom"), k: "pdf" },
      { t: "Psicología Criminal", u: FL("1YePky8FMSBF2TaZQMhsS5Gg9Ri1F7Mu5"), k: "pdf" },
      { t: "Cuadernos de Medicina Forense · vol. 67 (2019)", u: FL("197zcFd09xAtwQs6TOaa6SbgOa_YaSWzP"), k: "pdf" },
      { t: "Torre & Silva · Perfiles criminales", u: FL("1_XB-jWvGTH4_XoqI1LOXwUXx3HiYb0B8"), k: "pdf" },
      { t: "Silva & Torre · Homicidios seriales", u: FL("1sP_d0gKtKyuzX29ZHtJy1fJz6mIpa0jJ"), k: "pdf" },
      { t: "Al Filo de la Locura", u: FL("11s5EppLE1k87wnLL5ysa-yBLgOfInjJg"), k: "pdf" },
      { t: "Cayetano Santos Godino · El Petiso Orejudo", u: FL("1HzQ0seryq5sa73XqMzsXLX7v1jhgb6ig"), k: "pdf" },
      { t: "Jack el Destripador", u: FL("1IQ9ynxb1r6AbUzKhsp7S0T5NLTdXmhZ-"), k: "pdf" }
    ]
  },

  // ─── 4. EVALUACIÓN DEL DAÑO PSÍQUICO ────────────────────────────────────
  // Carpeta principal actualizada: 1DYU9fz4eMdGF_1kFYFx02XDgy6n6Wtjl
  "Evaluación del Daño Psíquico": {
    folder: F("1DYU9fz4eMdGF_1kFYFx02XDgy6n6Wtjl"),
    files: [
      // Programa
      { t: "📋 PROGRAMA MF1604 · Evaluación del Daño Psíquico", u: FL("1ScqAzcVRp3wXSUa59csfALX5OwdT0Y0k"), k: "pdf" },

      // CLASE 1 — Jue 4/6/26
      { t: "📁 Clase 1 · Jue 4/6 — Carpeta completa", u: F("18I_OtVJBEy_vSZ882mI6grPnI4gba6kP"), k: "folder" },
      { t: "🎙️ Clase 1 · 1ª parte Muñoz — Audio", u: FL("1YqYw5lr4k311mNxLGFOm3fuDkSFz3DS3"), k: "doc" },
      { t: "📄 Clase 1 · 1ª parte Muñoz — Transcript", u: FL("1cuZzSxS7BsYIphpjld7dYnLj_6o5kviH"), k: "pdf" },
      { t: "📝 Clase 1 · 1ª parte Muñoz — Resumen", u: FL("1teg2NX6V3fQ0n9Gc6a1eQjCaIhIpATmk"), k: "pdf" },
      { t: "🎙️ Clase 1 · 2ª parte Flabia — Audio", u: FL("1dyiZMhKCV4gkqydgk_6x235utf2inEgK"), k: "doc" },
      { t: "📄 Clase 1 · 2ª parte Flabia — Transcript", u: FL("1lYT-N3BHpTc9rKIrfUbuniTkzlJVf82t"), k: "pdf" },
      { t: "📝 Clase 1 · 2ª parte Flabia — Resumen", u: FL("1zOOUC0FKqXRdM29aqODB4vW3zT3NiPOS"), k: "pdf" },

      // CLASE 2 — Vie 5/6/26
      { t: "📁 Clase 2 · Vie 5/6 — Carpeta completa", u: F("1ktCWb718kCPAGIio0ecZ4MVjCS3hegx3"), k: "folder" },
      { t: "📄 Clase 2 · Apuntes MF1604 (DOCX)", u: FL("1bwu5nGxgUXOKCevgDDsfB4TnUfKc4Up6"), k: "doc" },
      { t: "📊 Clase 2 · Forensic Psychological Damage Protocol (PPTX)", u: FL("141VkSdmgV8m6z4yDjOg2Iwx42QNqx2u4"), k: "doc" },
      { t: "🎙️ Clase 2 · 1ª parte Muñoz — Audio", u: FL("12Jc_b7-GH0_8fF-IjNCXTcWM_mlPjxbh"), k: "doc" },
      { t: "📄 Clase 2 · 1ª parte Muñoz — Transcript", u: FL("1C8ZPUF37lSPAp9gMxMDxVCq-_CTO5oqV"), k: "pdf" },
      { t: "📝 Clase 2 · 1ª parte Muñoz — Resumen", u: FL("1Oce8WMJSABRw23Pz9DuYdARE0bGXtnwg"), k: "pdf" },
      { t: "🎙️ Clase 2 · 2ª parte Ariana — Audio", u: FL("1eM0AevFTp3Lzv4Jwn8o8BYogWUYDyAth"), k: "doc" },
      { t: "📄 Clase 2 · 2ª parte Ariana — Transcript", u: FL("1Sq2fBuR2EE-qR0zeVUfJ0QvOsBAIH1GO"), k: "pdf" },
      { t: "📝 Clase 2 · 2ª parte Ariana — Resumen", u: FL("10n0v8DnjxmC3bVSEOQFeFg0VSniNmMzo"), k: "pdf" },

      // CLASE 3 — Jue 11/6/26
      { t: "📁 Clase 3 · Jue 11/6 — Carpeta completa", u: F("1UGcP933NWMF0_ZUNNE69KtmGAPHiDkuu"), k: "folder" },
      { t: "📄 Clase 3 · Apuntes Claude (DOCX)", u: FL("14smBkY4vKY9HzZSArjXhpfaAuSftfVsE"), k: "doc" },
      { t: "🎙️ Clase 3 · 1ª parte Muñoz — Audio", u: FL("1DdGkzhdNziSvjQLWdGsqv5veiKhfoKXS"), k: "doc" },
      { t: "📄 Clase 3 · 1ª parte Muñoz — Transcript", u: FL("147xMHRB6bYqf0-TLO-vAsoWUNa5YHZmt"), k: "pdf" },
      { t: "📝 Clase 3 · 1ª parte Muñoz — Resumen", u: FL("1QPDIc9L8EmeAcytWODW3Vey0apSbSEMB"), k: "pdf" },
      { t: "🎙️ Clase 3 · 2ª parte Flabia — Audio", u: FL("1JVBMEui-qCeJoEYxPRsIXXT8ChYPICN3"), k: "doc" },
      { t: "📄 Clase 3 · 2ª parte Flabia — Transcript", u: FL("1EHZws2pdbMdE8XhGtAlCy7lwR8FQNJVH"), k: "pdf" },
      { t: "📝 Clase 3 · 2ª parte Flabia — Resumen", u: FL("1M0KAJAbPM8U6BCReoWI8M7cURPFR86WN"), k: "pdf" },

      // CLASE 4 — Vie 12/6/26
      { t: "📁 Clase 4 · Vie 12/6 — Carpeta completa", u: F("1f-0BFtdDwsok-P7eazj4GC-vpv-p6fFp"), k: "folder" },
      { t: "📄 Clase 4 · Apuntes Claude (DOCX)", u: FL("1FZrhoROxiNUCz5nvQej-1s5ge2_fYBHj"), k: "doc" },
      { t: "🎙️ Clase 4 · 1ª parte Muñoz — Audio", u: FL("1s58obZ4h4wIECEVKZqTNUs3hgEAYidW6"), k: "doc" },
      { t: "📄 Clase 4 · 1ª parte Muñoz — Transcript", u: FL("1Af3leBnP8YCDFC3Aw75835YOhooopdA7"), k: "pdf" },
      { t: "📝 Clase 4 · 1ª parte Muñoz — Resumen", u: FL("15IY8qpswfC5m2Gr4HwfZW7MsyITWRjip"), k: "pdf" },
      { t: "🎙️ Clase 4 · 2ª parte Ariana — Audio", u: FL("1O9WLOznyPpmgFrycp65wzeFZwe2VlQaL"), k: "doc" },
      { t: "📄 Clase 4 · 2ª parte Ariana — Transcript", u: FL("1V9vUwH9znbadfIDdW_HE1xoP_gytOVFb"), k: "pdf" },
      { t: "📝 Clase 4 · 2ª parte Ariana — Resumen", u: FL("1TPDqZUwuIybmm_gWiBdtOQUelXLlnQSw"), k: "pdf" },

      // DESCARGA COMPLETA
      { t: "📦 Descarga completa · Daño Psíquico (ZIP — 16/6/26)", u: FL("1trW4jYLRcDo8f5JbVT5m2MxbneaLmhqU"), k: "zip" },
      // BIBLIOGRAFÍA
      { t: "📁 Bibliografía — Carpeta completa", u: F("1M2SpXGCpSMeC5_QyWsw0qQ8Ezj6m6xJ4"), k: "folder" },
      { t: "📖 1 · McLearen, Pietz & Denney", u: FL("1cznrm2VJUyXT9zae9MuJqwCVdI87VfeU"), k: "pdf" },
      { t: "📖 2 · Brand, Schielke, Brams et al.", u: FL("1HFX5xDgJdO6FcqEDQ3eKV1aHNk-62Ewh"), k: "pdf" },
      { t: "📖 3 · Bryant (2019)", u: FL("13L9bYJjjpLmNCoh-4ZXQIvIthtri2IaH"), k: "pdf" },
      { t: "📖 4 · Fairfax-Columbo, Wiltsie, Pursel & Grisamore", u: FL("1HoCgGphJQloKsjq9W_MQarKlzYzfPOCf"), k: "pdf" },
      { t: "📖 5 · Young, Bailey, Giromini, Soble, Rogers, Levitt", u: FL("1_7FbI-silsFKFHvypCEU3gABdshT_913"), k: "pdf" },
      { t: "📖 6 · Foote, Goodman-Delahunty & Young", u: FL("1s451KzjVDvDyqXWR5ognwOa4SwBSLg7u"), k: "pdf" },
      { t: "📖 7 · Goldenson & Josefowitz", u: FL("1UlqHJzaDqqtnWtDLwObtOwFjzKQOQf9q"), k: "pdf" },
      { t: "📖 8 · Galatzer-Levy, Huang & Bonanno", u: FL("1FRv991CFvaLxq7oSM2hsP0IkLg43yAnL"), k: "pdf" },
      { t: "📖 9 · Kerig, Mozley & Mendez", u: FL("1yj9TmW51ZbNjifxHg9xAXc6Yghn2emKV"), k: "pdf" },
      { t: "📖 10 · Milchman (2016)", u: FL("1dgj-doEj0SteVGX3Rw2Kc4vQKnOHUQCL"), k: "pdf" },
      { t: "📖 11 · Rocchio", u: FL("1YqCBhdKPhEkbOhQeo4FwKaPuIexHlSA2"), k: "pdf" },
      { t: "📖 12 · Vallano", u: FL("18pUSj8Z1JmvZjS22sG3g70Fv9iAEfcsX"), k: "pdf" },
      { t: "📖 13 · Weiner, Otto & Piechowski", u: FL("1Iz1TPoCCSNTKN0xqR2qYBSnOegjBLseb"), k: "pdf" },
      { t: "📖 14 · Young, Giromini, Erdodi et al.", u: FL("1vmFQeHOP6i8rc2oF6aB71__ujFt6qwhx"), k: "pdf" },
      { t: "📖 15 · Young, Foote, Kerig et al.", u: FL("1l6Cyd5LGtvek6NA2eXKeI8XFBs5C8pha"), k: "pdf" }
    ]
  },

  // ─── 5. DELITOS CONTRA LA INTEGRIDAD SEXUAL ─────────────────────────────
  "Delitos contra la Integridad Sexual": {
    folder: F("1B6Zska4gbnX2jb-UBllVf9C0Hqc7g-_b"),
    files: [
      // Clases
      { t: "📁 Clase 1 — Carpeta completa", u: F("1mVdRRd-LOcNWOn8-_n_vscL6CWR-Er_7"), k: "folder" },
      { t: "📁 Clase 2 — Carpeta completa", u: F("1wzgr_gMHLBHPanJX2V749s843IXW0YB7"), k: "folder" },
      { t: "📁 Clase 3 — Carpeta completa", u: F("1mALPODfCWJSkSVdmdMtLG7PI3cpbNnOA"), k: "folder" },
      { t: "🎬 Clase 3 · Video de clase (MP4)", u: FL("1I05eiq3nrLhXlpVvHEJkMUyw2BcUa26X"), k: "doc" },
      { t: "📊 Clase 3 · Presentación (PPTX)", u: FL("1PV8WebEE4yJcc-IQ06bSSQP4GkCS1kG9"), k: "doc" },
      { t: "📄 Clase 3 · Guía de Estudio (DOCX)", u: FL("13fX0InRjog-Cb-hRQJccYwII3a2oprjl"), k: "doc" },
      { t: "📝 Clase 3 · Guía de Estudio Claude MF1605 (DOCX)", u: FL("1HVMyFFlgEprS5B2DvbMXxME6Zb4FJb7w"), k: "doc" },
      { t: "📁 Clase 4 — Carpeta completa", u: F("1MN8JJDS2-BIMa4cV_2zzdIWGbR7J0cfc"), k: "folder" },
      { t: "🎬 Clase 4 · Video de clase (MP4)", u: FL("13_j7dy4qAGuGfJHH8qRf_YQNdUU55gFG"), k: "doc" },
      // Bibliografía
      { t: "📦 Bibliografía · Dra. Silvina Kiss (ZIP)", u: FL("1Io29hSugeNy6-caqmLCUgO1k8V1moZo-"), k: "zip" },
      { t: "📦 Bibliografía · Lic. Bettina Esteban (ZIP)", u: FL("1QEm4qdgU1PaRoMK9iBbOnZsZYOmvRbEm"), k: "zip" },
      { t: "📦 Bonus Track (ZIP)", u: FL("1xR_Bh0nUo3thWP_yp7AL54qMV4Njtpmx"), k: "zip" }
    ]
  },

  // ─── 6. TOXICOLOGÍA FORENSE ─────────────────────────────────────────────
  "Toxicología Forense": {
    folder: F("1Hg17jvurHpMdtUjiSGXfAGIxAvN4_SEH"),
    files: [
      // Clase 1
      { t: "📁 Clase 1 — Carpeta completa", u: F("1ug9WbyJfye-U9sbTq1o3De425xm5D3GD"), k: "folder" },
      { t: "📊 Clase 1 · Presentación PDF", u: FL("1_aOJ-fTNBuOpsGx2ZFIMuECATsWjjWBL"), k: "pdf" },
      { t: "📄 Clase 1 · Transcripción PDF", u: FL("1wHDVWzW5AeivQyAd0nv2ElPOqsyqS6Ut"), k: "pdf" },
      { t: "📝 Clase 1 · Apuntes Claude (DOCX)", u: FL("13jj0dRbrC-ephixYewV4yK9jsaIr-v0Y"), k: "doc" },
      { t: "🖼️ Clase 1 · Toxicología forense — mecanismos y cinética", u: FL("1A3X3q_skAcoE0KvNvQl3ym7HAE2jreAi"), k: "doc" },
      // Clase 2
      { t: "📁 Clase 2 — Carpeta completa", u: F("1bLxRq84L7RoH0rnZstN4QxCAO8zkdyik"), k: "folder" },
      { t: "📊 Clase 2 · Presentación PDF", u: FL("1F9xF2t4URAjkejCkO1DpOwUcz3eEmImq"), k: "pdf" },
      { t: "📄 Clase 2 · Apuntes Toxicología (DOCX)", u: FL("11MlljwbgIBtnrhqkHOA5diterJhLqF_e"), k: "doc" },
      { t: "📝 Clase 2 · Apuntes Claude (DOCX)", u: FL("1s6tPWbYDd99zuOar_RmQ8FiMQf9-a5b0"), k: "doc" },
      { t: "🖼️ Clase 2 · Proceso de toxicología forense", u: FL("1-11FRxjj-I_mckKMh9UW74EZ8Zep6Wq6"), k: "doc" },
      // Clase 3
      { t: "📁 Clase 3 — Carpeta completa", u: F("1qs4CXCMyU_6h4E6oLw_41ndqYofj7pRY"), k: "folder" },
      { t: "📄 Clase 3 · Apuntes Toxicología Forense (PDF)", u: FL("11_ImaoiiqTWfLgnlgx_SJG00aAuU4h8W"), k: "pdf" },
      // Clase 4
      { t: "📁 Clase 4 — Carpeta completa", u: F("1UnSUVWkK_yibzYQ7Dtv8xjm8miQwaye_"), k: "folder" },
      { t: "📄 Clase 4 · Apuntes Toxicología Forense (PDF)", u: FL("1ABZjgATHoMuNvNCjzsmKbJ9Wb6MWzsHY"), k: "pdf" },
      // Bibliografía
      { t: "📁 Bibliografía — Carpeta completa", u: F("1g_IojZ3X3-hf6_me_9Z8J17Yg4tEbUiT"), k: "folder" },
      { t: "📖 Libros recomendados", u: FL("1vZCuObHlqPLqjoDYZ9XdtEZNgQDe5X8B"), k: "pdf" },
      { t: "📖 SWGTOX · Standard practices method validation", u: FL("1ItGeQS1Le0R2yyuJg2Lr1qq3aUa4GC6H"), k: "pdf" },
      { t: "📖 TIAFT · Laboratory guidelines", u: FL("1d5Zrvg1rp8uqV8p8nZeJjb9ac4Hruv-p"), k: "pdf" },
      { t: "📖 TIAFT · Recommendations on sample collection", u: FL("175t2PMB3AWqu3HOoSiFeeRB-q80qiQZR"), k: "pdf" },
      { t: "📖 Koski · Interpretation of postmortem toxicology results", u: FL("1MA3xCMf9b3AdsDohNkJ8UiYHU7PMdthM"), k: "pdf" },
      { t: "📖 Chatterton · Interpretative aspects (2013)", u: FL("1AmzkypF06ZjFXJ_K8fy_LAA7fjU4Sthb"), k: "pdf" },
      { t: "📖 Dinis-Oliveira · Abuse of licit and illicit psychoactive substances", u: FL("10xn48_3YPCOv7k9aUWw87ccsbPjCHlCc"), k: "pdf" },
      { t: "📖 CONICET · Propóleos adulterados", u: FL("1RFEYfPPNJGu5jSZ6bJFjrbIc3tYBirt3"), k: "pdf" },
      { t: "📖 Environmental Health Criteria 237 (WHO)", u: FL("1dVXSEYf7VWF9xkQ4vHlQJUnii8PNjyBr"), k: "pdf" },
      { t: "📖 ANSV · Observatorio informe alcoholemia", u: FL("1PDMnNw44uj4y17hngRuexFr-nN8PXwB4"), k: "pdf" },
      { t: "📖 Forensic Examination of Glass and Paint", u: FL("1_3S7FafjfjyLQdoelWZHj_-3l0vx0wzs"), k: "pdf" }
    ]
  },

  // ─── 8. DOCUMENTOLOGÍA ──────────────────────────────────────────────────
  "Documentología (Caligráficos e Informáticos)": {
    folder: F("1YK4bfaGi7f7E6dJVP29DQrFApR8A3a6G"),
    files: [
      { t: "📁 Caligrafía — Carpeta completa", u: F("1Iz_4QvffP-BihGlrZdmyH5oEZVon4IGt"), k: "folder" },
      { t: "📁 Informática — Carpeta completa", u: F("1X4CsAg0hmSEBK3YhdaBDK-fa2YrolZTZ"), k: "folder" },
      { t: "📁 Clase 3 — Carpeta completa", u: F("1IOxUdbWdsMaI0UbKdCQzXByHDuKfDMIP"), k: "folder" },
      { t: "📄 Clase 3 · Apuntes (DOCX)", u: FL("1qprd8PWundSs0Uj9qDrhAARXuThpi4LC"), k: "doc" },
      { t: "🎬 Clase 3 · Video — Carpeta", u: F("1y6lIybG81m9w-KoUr4CJupYym7s29fIK"), k: "folder" },
      { t: "📁 Clase 4 — Carpeta completa", u: F("16bxQcOrcMJf0IiXvYIR1bGrfko00gRh_"), k: "folder" },
      { t: "📄 Clase 4 · Apuntes (DOCX)", u: FL("16RIFs2_0LBVh4oIPEopVU2-a_F6vYaUN"), k: "doc" },
      { t: "🎬 Clase 4 · Video — Carpeta", u: F("1zwvmXgNuVRxoqphlXLKAQ4Q4bVQaauRe"), k: "folder" }
    ]
  },

  // ─── 9. AUTOPSIA PSICOLÓGICA ────────────────────────────────────────────
  "Autopsia Psicológica": {
    folder: F("1I6dn5sFKtTttsUQ1jYBYiaLghtTXUcSr"),
    files: [
      // CLASE 1
      { t: "📁 Clase 1 — Carpeta completa", u: F("1Ac3ERhg8x-wHX2fKgAAIxFewOXD7qTlw"), k: "folder" },
      { t: "📊 Clase 1 · Autopsia Psicológica Forense (PPTX)", u: FL("1_tYKMkzRSfLe_3tUL-mT1Gtxl-hdL661"), k: "doc" },
      { t: "📄 Clase 1 · Apuntes Claude MF1607 (DOCX)", u: FL("1pbwXa_mdMxnISuKSjb35BLd7kQkfpxfV"), k: "doc" },
      { t: "📄 Clase 1 · Transcripción (DOCX)", u: FL("1f1zxT9gCbcpiXNOfKZrWeOWL_JjRZKge"), k: "doc" },
      // CLASE 2
      { t: "📁 Clase 2 — Carpeta completa", u: F("1gXpMGlY52Zg177IAjeyv5SEjyRUIjVPX"), k: "folder" },
      { t: "📊 Clase 2 · MAPI Forensic Suicidiology (PPTX)", u: FL("17SW4pw91USD_1kjGMb9M4FqMOtNGaYcE"), k: "doc" },
      { t: "📄 Clase 2 · Apuntes Claude MF1607 (DOCX)", u: FL("1dJC8br50VG52xg0oV2gR0YzRA0BYrQly"), k: "doc" },
      { t: "📝 Clase 2 · Guía de Estudio (DOCX)", u: FL("1nBLd5f8vDY39EDFp1VyTdWPooUrwDOEN"), k: "doc" },
      // CLASE 3
      { t: "📁 Clase 3 — Carpeta completa", u: F("1yc1poOY442UeOu_VgYcbbPya__rnq8DS"), k: "folder" },
      { t: "📊 Clase 3 · Digital Behavioral & Femicide Forensics (PPTX)", u: FL("1oKS5lnAdbau_4B2bXtXjye4AmLt3KoZi"), k: "doc" },
      { t: "📄 Clase 3 · Apuntes Claude MF1607 (DOCX)", u: FL("1Ety5-_RT7ROCxvEfbDuLvx3jCDZZyLKp"), k: "doc" },
      { t: "📝 Clase 3 · 1ª parte — Aplicaciones Forenses Comportamiento Digital (Resumen)", u: FL("1qcFyWfpYVQBYIHE8dFe5h0QsN0d7JSIo"), k: "pdf" },
      { t: "📝 Clase 3 · 2ª parte — Femicidio e Identidad Digital (Resumen)", u: FL("1tm2SuuNZSzoJmhqFfrqf2Y-kOfdoixfq"), k: "pdf" },
      // CLASE 4
      { t: "📁 Clase 4 — Carpeta completa", u: F("1JqAsOMnu0axBohyI0UE_2eOAkAb5gbBJ"), k: "folder" },
      { t: "📊 Clase 4 · Objective Psychological Autopsy (PPTX)", u: FL("1jujIPa1adxYProlBms6EHygGoDZjwZix"), k: "doc" },
      { t: "📄 Clase 4 · Apuntes Claude MF1607 (DOCX)", u: FL("1eVpNks9j5IksVmtLlFDlAg98ZXvf0ZMV"), k: "doc" },
      { t: "📝 Clase 4 · 1ª parte — Análisis Psicocriminológico Dr. Ceballos Espinosa (Resumen)", u: FL("1IpLhEVSlgNoSkX75V7eLs8Ntm5gjTZ4w"), k: "pdf" },
      { t: "📄 Clase 4 · 1ª parte — Análisis Psicocriminológico Dr. Ceballos Espinosa (Transcript)", u: FL("1xEcKuN5aHr8O6XMpHjrJYsZlJhd5Ae9M"), k: "pdf" },
      { t: "📄 Clase 4 · 2ª parte — Notas Suicidas y Funcionamiento Suicida (Transcript)", u: FL("1t70WIh1CH7iPbZu9NsIUGE6JOm-HshFR"), k: "pdf" },
      // BIBLIOGRAFÍA
      { t: "📚 Bibliografía — Carpeta completa", u: F("10mOThElTB1o9B8NbxTqBxgsM_ms69ECS"), k: "folder" },
      { t: "📋 Programa MF1607 · Autopsia Psicológica (PDF)", u: FL("1chPmrob2Sq4w05X20I20Zih0GZkdpNLy"), k: "pdf" },
      { t: "📖 Manual de Evidencia Científica II", u: FL("1QQN2fkCE4oH09_naxcKygBxov_aPZbiK"), k: "pdf" },
      { t: "📖 Ceballos Espinoza · La Evaluación Psicológica Reconstructiva (EPR)", u: FL("1oVPZ8QDwc-aYmaNN0MYeWk6cILUQ51XJ"), k: "pdf" },
      { t: "📖 Ceballos Espinoza · AP en muertes de alta complejidad", u: FL("1km1VBiKjAQElXqhVudvXCv1Z1T-aVI23"), k: "pdf" },
      { t: "📖 Centro Núñez · Aplicación de la AP", u: FL("1X5wCHcZG4kuFsd6FVMigTxrLQ4W-nvov"), k: "pdf" },
      { t: "📖 Centro Núñez · Abordaje interdisciplinario cartas suicidas", u: FL("1mH-3Fo-gb1_DL_lrARnlexQhz-qV0gaZ"), k: "pdf" },
      { t: "📖 Terán Villagra · AP Laboal", u: FL("11NjvfIKADZQzlIGEZSrBPAcy0N2WVyUl"), k: "pdf" },
      { t: "📖 Musumeci & Chilo · AP Argentina — Manual de Evidencia Científica II", u: FL("1AUAWAnkTwbJH3J20keN7oaPqpf6_lmVv"), k: "pdf" },
      { t: "📖 Leonor Walker · El ciclo de la violencia", u: FL("10Vumlq5lHNMvvL_0qoUzcpgbkGOJQ-sg"), k: "pdf" },
      { t: "📖 Montero Gómez · Síndrome de acomodación — violencia de género", u: FL("13z3qSyINxYzNz0Iesxu-BRvombCP-PwR"), k: "pdf" },
      { t: "📖 Mala Junta · Violentómetro y ciclo de la violencia", u: FL("1APicXK9efvVc-iHsnbzTxyCfGe3K3-X_"), k: "pdf" },
      { t: "📖 Protocolo ONU · Femicidio", u: FL("1mjcU8QSjt1WVPMFOdItje11-k8YR1vRF"), k: "pdf" }
    ]
  },

  // ─── 10. GENÉTICA FORENSE ───────────────────────────────────────────────
  "Genética Forense": {
    folder: F("1hIt2ishc7ENro1-4a5Iex0JSa-j9scxv"),
    files: [
      { t: "📄 Clase 1 · Apuntes Genética Forense (PDF)", u: FL("1skatL0l58Kz00xL1rmzK5JWJpOGpjfwp"), k: "pdf" },
      { t: "📄 Clase 2 · Apuntes Genética Forense (PDF)", u: FL("1BAJ6PLfZqSf8LGM5XOLMPjomX7yYDOTi"), k: "pdf" },
      { t: "📄 Clase 3 · Apuntes Genética Forense (PDF)", u: FL("1zULnO5jnpSJgAbnAh5mANyhircUGQr23"), k: "pdf" },
      { t: "📄 Clase 4 · Apuntes Genética Forense (PDF)", u: FL("1mDQgNK2MBwWOV1yCr3aDRbwlaWY9gfGn"), k: "pdf" }
    ]
  },

  // ─── 11. NEUROPSIQUIATRÍA FORENSE ───────────────────────────────────────
  "Neuropsiquiatría Forense": {
    folder: F("1MPJVN1QwIyYj8ARP2GFirrganRHcW7DJ"),
    files: [
      { t: "📄 Clase 1 · Introducción Neuropsiquiatría Forense", u: FL("1EZvFr5YXK17hGAjNqqsb_G_RvpxjSqLE"), k: "pdf" },
      { t: "📄 Clase 1 · Documento de Estudio", u: FL("1-04xKLYLasVNaNXEpdaI3hyBg6P9P_o0"), k: "pdf" },
      { t: "📄 Clase 1 · Cortes de Encéfalo", u: FL("130EVOvdtvWT10yLBIV-hIMPa6-xmMMGW"), k: "pdf" },
      { t: "📄 Clase 2 · Guía de Estudio", u: FL("14XngnvZz1dp_JqqIhtiez6qi_ryOl6uD"), k: "pdf" },
      { t: "📄 Clase 3 · Guía de Estudio", u: FL("1QcEELSIqGKG2Wo6ovX_ff40yLhSYxGfo"), k: "pdf" }
    ]
  },

  // ─── 12. PERFILACIÓN FORENSE Y SERIALIDAD CRIMINAL ──────────────────────
  "Perfilación Forense y Serialidad Criminal": {
    folder: F("1DaxcufBnkR0ZdpcPHHOeSm72cdlvzWQg"),
    files: [
      { t: "📋 Programa MF1609", u: FL("1PX7Rc9pVKumfSh91DLecuXju0Xo_M8RY"), k: "pdf" },
      { t: "📋 Sesiones · Cronograma", u: FL("19eq4KsD_QMK7_cyfuwzrUKsXZTUhol4V"), k: "pdf" },
      { t: "📁 Clase 1 — Carpeta completa", u: F("1fKJzBgT3O97XU6P4J-AJQLZshid8yxQo"), k: "folder" },
      { t: "📁 Clase 2 — Carpeta completa", u: F("11542MlxyZqGQt2kRAeoDhcRdL-TVTZqu"), k: "folder" },
      { t: "📁 Clase 3 — Carpeta completa", u: F("1dlXcK1cB2-xhjSwF3rjx2qOpkgwGqWTH"), k: "folder" },
      { t: "📁 Clase 4 — Carpeta completa", u: F("1QA2QwU3sggkTNsqWzqGJkHDiHXNSLM5A"), k: "folder" },
      { t: "📚 Bibliografía (adicional) — Carpeta completa", u: F("1aQIobgm8SR4q-N-5CGVx5AWw10BlAZ4W"), k: "folder" },
      { t: "📄 Clase 1 · Resumen", u: FL("1maWK-8WP4FbLBxPaLFthG5MJzQ8NnVur"), k: "pdf" },
      { t: "📄 Clase 1 · Sesión 2 Julio", u: FL("1DovQ2W0brkzM4BCy5Ma4qDpXm5MQRqEA"), k: "pdf" },
      { t: "📄 Clase 2 · Resumen", u: FL("1WGpJWBr3gJ-4NB8hVw7sMJxm2MMKs_kF"), k: "pdf" },
      { t: "📄 Clase 2 · Sesión 3 Julio", u: FL("13dmzBmt5Rp45TbnWFdutKlx0LQopg0N7"), k: "pdf" },
      { t: "📄 Clase 3 · Sesión 16 Julio", u: FL("1_gGji3rLQoD2Ns39-6zFIvJBRXMM03sl"), k: "pdf" },
      { t: "📄 Clase 4 · Documento de Estudio", u: DC("1plVN52-EroXoWvoGTHc1ukrGHQ-XEmOp"), k: "doc" }
    ]
  },

  // ─── 13. ANTROPOLOGÍA FORENSE ───────────────────────────────────────────
  "Antropología Forense": {
    folder: F("1CmA8LVPWNkWuv_gvGDZ3agem6wM_2zIz"),
    files: [
      { t: "📄 Clase 1 · Introducción e Historia de la AF", u: FL("1x0scYiGNnjWyveUMVyEfRzEyDXjfdJg1"), k: "pdf" },
      { t: "📄 Clase 1 · Guía de Estudio", u: FL("1lYqmcrHfDY674NUyIc_RyLiaMuUKjrHy"), k: "pdf" },
      { t: "📚 Manual de Antropología Forense (EPAF 2015)", u: FL("1YIzryMzQf5WpC28NofeRa8jnDqoUi-V6"), k: "pdf" },
      { t: "📚 Guía práctica de recuperación y análisis de restos humanos", u: FL("1FSMwz3XNUDmJl_8SKEQaKPc-_T_yPawv"), k: "pdf" },
      { t: "📚 EAAF · Guía Nuevas Tecnologías en Búsqueda Forense (2021)", u: FL("1-VKehcV76RQDCAFZyhKOL3CxbL-2Ax-T"), k: "pdf" },
      { t: "📚 Proceso de identificación · CICR", u: FL("1797G-lZAYYBTba_-iVVirp9TAWaLl72n"), k: "pdf" },
      { t: "📚 Fondebrider (2004) · The Forensic Sciences in Human Rights", u: FL("1OepjKbV_ATDNKPjlMW3epgjbBA3UbzLY"), k: "pdf" },
      { t: "📚 Salado y Fondebrider (2009)", u: FL("1qzizGyK68Pk_IUcSbVY6mzQ20b5sh4fY"), k: "pdf" },
      { t: "📚 Menez (2005) · The place of the forensic Archaeology", u: FL("14zWMiA-mJ07MwFcXDPMiLwko0OLxQfi1"), k: "pdf" },
      { t: "📚 Selva y Turner (2020) · Revista Publicar XVIII/XXIX", u: FL("1qQ07ZGz4RBy1iD-W2KZvv0EZgV9zNmFI"), k: "pdf" }
    ]
  }

};

window.MCF_DRIVE = MCF_DRIVE;
