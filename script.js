// ============================================================
// IDIOMA: español (es) y euskera (eu). Se recuerda entre visitas.
// ============================================================
const SUPPORTED_LANGS = ["es", "eu"];
let currentLang = "es";
try {
  const savedLang = localStorage.getItem("nuvozLang");
  if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
    currentLang = savedLang;
  }
} catch (e) {
  // Almacenamiento no disponible: seguimos con español por defecto.
}

// Textos fijos de la interfaz (títulos, botones, avisos...).
const uiText = {
  messageTitle: { es: "Mi mensaje", eu: "Nire mezua" },
  messagePlaceholder: {
    es: "Selecciona palabras para construir tu mensaje...",
    eu: "Aukeratu hitzak zure mezua osatzeko...",
  },
  clearMessageBtn: { es: "Borrar mensaje", eu: "Mezua ezabatu" },
  speakMessageBtn: { es: "Reproducir voz", eu: "Ahotsa erreproduzitu" },
  categoriesTitle: { es: "Categorías", eu: "Kategoriak" },
  categoryPrefix: { es: "Categoría", eu: "Kategoria" },
  backBtn: { es: "Volver", eu: "Itzuli" },
  messageHint: {
    es: "Selecciona categorías para construir una frase.",
    eu: "Aukeratu kategoriak esaldi bat osatzeko.",
  },
  splashTagline: {
    es: "comunicación que te conecta",
    eu: "zurekin konektatzen duen komunikazioa",
  },
  needWordsAlert: {
    es: "Primero crea un mensaje seleccionando palabras.",
    eu: "Aurrena mezu bat sortu hitzak aukeratuz.",
  },
  noSpeechAlert: {
    es: "Tu navegador no soporta síntesis de voz.",
    eu: "Zure nabigatzaileak ez du ahots sintesirik onartzen.",
  },
  alphabetButton: { es: "Abecedario", eu: "Alfabetoa" },
  alphabetTitle: { es: "Alfabeto dactilológico", eu: "Eskuzko alfabetoa" },
  alphabetBack: { es: "← Volver", eu: "← Itzuli" },
  alphabetSpaceBtn: { es: "Espacio", eu: "Tartea" },
  alphabetDeleteBtn: { es: "⌫ Borrar letra", eu: "⌫ Letra ezabatu" },
};

// Devuelve el texto fijo traducido para el idioma activo.
function t(key) {
  const entry = uiText[key];
  if (!entry) return key;
  return entry[currentLang] || entry.es || key;
}

// Devuelve la etiqueta traducida de una entrada (categoría o palabra) según el idioma activo.
// Si no hay traducción disponible, se usa la propia clave (que siempre está en español).
function getLabel(table, key) {
  const entry = table[key];
  if (!entry) return key;
  return entry[currentLang] || entry.es || key;
}

// Palabras por categoría de la demo SAAC. Estas claves en español son los
// identificadores internos estables: no cambian aunque cambie el idioma mostrado.
const categoryData = {
  Personas: ["Yo", "Mamá", "Papá", "Amigo", "Profesora", "Cuidador"],
  Comida: ["Agua", "Pan", "Galletas", "Fruta", "Leche", "Arroz"],
  Lugares: ["Casa", "Colegio", "Parque", "Baño", "Hospital", "Tienda"],
  Actividades: ["Jugar", "Comer", "Beber", "Leer", "Caminar", "Dormir"],
  Sentimientos: ["Contento", "Triste", "Cansado", "Enfadado", "Asustado", "Calma"],
  Frases: ["Quiero agua", "Necesito ayuda", "Vamos al baño", "Tengo hambre", "Gracias", "Hola"],
};

// Nombres de categorías traducidos.
const categoryLabels = {
  Personas: { es: "Personas", eu: "Pertsonak" },
  Comida: { es: "Comida", eu: "Janaria" },
  Lugares: { es: "Lugares", eu: "Lekuak" },
  Actividades: { es: "Actividades", eu: "Jarduerak" },
  Sentimientos: { es: "Sentimientos", eu: "Sentimenduak" },
  Frases: { es: "Frases", eu: "Esaldiak" },
};

// Palabras traducidas (misma clave española = mismo concepto en ambos idiomas).
const wordLabels = {
  Yo: { es: "Yo", eu: "Ni" },
  Mamá: { es: "Mamá", eu: "Ama" },
  Papá: { es: "Papá", eu: "Aita" },
  Amigo: { es: "Amigo", eu: "Laguna" },
  Profesora: { es: "Profesora", eu: "Irakaslea" },
  Cuidador: { es: "Cuidador", eu: "Zaintzailea" },
  Agua: { es: "Agua", eu: "Ura" },
  Pan: { es: "Pan", eu: "Ogia" },
  Galletas: { es: "Galletas", eu: "Galetak" },
  Fruta: { es: "Fruta", eu: "Fruta" },
  Leche: { es: "Leche", eu: "Esnea" },
  Arroz: { es: "Arroz", eu: "Arroza" },
  Casa: { es: "Casa", eu: "Etxea" },
  Colegio: { es: "Colegio", eu: "Eskola" },
  Parque: { es: "Parque", eu: "Parkea" },
  Baño: { es: "Baño", eu: "Komuna" },
  Hospital: { es: "Hospital", eu: "Ospitalea" },
  Tienda: { es: "Tienda", eu: "Denda" },
  Jugar: { es: "Jugar", eu: "Jolastu" },
  Comer: { es: "Comer", eu: "Jan" },
  Beber: { es: "Beber", eu: "Edan" },
  Leer: { es: "Leer", eu: "Irakurri" },
  Caminar: { es: "Caminar", eu: "Ibili" },
  Dormir: { es: "Dormir", eu: "Lo egin" },
  Contento: { es: "Contento", eu: "Pozik" },
  Triste: { es: "Triste", eu: "Triste" },
  Cansado: { es: "Cansado", eu: "Nekatuta" },
  Enfadado: { es: "Enfadado", eu: "Haserre" },
  Asustado: { es: "Asustado", eu: "Beldurtuta" },
  Calma: { es: "Calma", eu: "Lasai" },
  "Quiero agua": { es: "Quiero agua", eu: "Ura nahi dut" },
  "Necesito ayuda": { es: "Necesito ayuda", eu: "Laguntza behar dut" },
  "Vamos al baño": { es: "Vamos al baño", eu: "Goazen komunera" },
  "Tengo hambre": { es: "Tengo hambre", eu: "Gose naiz" },
  Gracias: { es: "Gracias", eu: "Eskerrik asko" },
  Hola: { es: "Hola", eu: "Kaixo" },
};

// Carpeta donde vive cada set de pictogramas por categoría (no depende del idioma).
const imageFolderByCategory = {
  Personas: "personas",
  Comida: "comida",
  Lugares: "lugares",
  Actividades: "actividades",
  Sentimientos: "sentimientos",
  Frases: "frases",
};

// Pictogramas ya disponibles por palabra (se añaden a medida que llegan los archivos).
// Si una palabra no tiene imagen aquí, la casilla se queda solo con el texto.
const wordImages = {
  Personas: {
    Yo: "yo.png",
    // Los nombres de archivo de Mamá y Papá se guardan en el disco en forma NFD
    // (con la tilde como marca combinable "́"), así que se escriben aquí
    // igual, letra a letra, para que coincidan byte a byte y la imagen cargue.
    Mamá: "Mamá_.png",
    Papá: "Papá_.png",
    Amigo: "Amigo.png",
    Profesora: "Profesora.png",
    Cuidador: "Cuidador.png",
  },
  Comida: {
    Agua: "Agua.png",
    Pan: "Pan.png",
    Galletas: "Galletas.png",
    Fruta: "Fruta.png",
    Leche: "Leche.png",
    Arroz: "Arroz.png",
  },
  Lugares: {
    Casa: "Casa.png",
    Colegio: "Colegio.png",
    Parque: "Parque.png",
    Baño: "Baño.png",
    Hospital: "Hospital.png",
    Tienda: "Tienda.png",
  },
  Actividades: {
    Jugar: "Jugar.png",
    Comer: "Comer.png",
    Beber: "Beber.png",
    Leer: "Leer.png",
    Caminar: "Caminar.png",
    Dormir: "Dormir.png",
  },
  Sentimientos: {
    Contento: "Contento.png",
    Triste: "Triste.png",
    Cansado: "Cansado_.png",
    Enfadado: "Enfadado.png",
    Asustado: "Asustado.png",
    Calma: "Calma.png",
  },
  Frases: {
    "Quiero agua": "Quiero_agua.png",
    "Necesito ayuda": "Necesito_ayuda.png",
    "Vamos al baño": "Vamos_al_baño.png",
    "Tengo hambre": "Tengo_hambre.png",
    Gracias: "Gracias.png",
    Hola: "Hola.png",
  },
};

// Devuelve el HTML del icono de una palabra: su pictograma si ya existe, o nada.
// Algunos nombres de archivo con tilde quedan guardados en el disco con
// normalización Unicode NFD en vez de NFC (o al revés), por eso probamos
// primero una forma y, si el navegador no encuentra la imagen, reintentamos
// automáticamente con la otra antes de rendirnos.
function buildWordIconHtml(category, word) {
  const filename = wordImages[category] && wordImages[category][word];
  if (!filename) return "";

  const folder = imageFolderByCategory[category] || category.toLowerCase();
  const primarySrc = `img/${folder}/${encodeURIComponent(filename.normalize("NFC"))}`;
  const altSrc = `img/${folder}/${encodeURIComponent(filename.normalize("NFD"))}`;
  return `<img src="${primarySrc}" data-alt-src="${altSrc}" alt="" class="word-icon" onerror="if(this.dataset.altSrc){this.src=this.dataset.altSrc;delete this.dataset.altSrc;}" />`;
}

// ============================================================
// GRAMÁTICA para construir frases, por idioma.
// El español usa sujeto+verbo+resto; el euskera coloca el verbo al final
// (orden SOV) y no distingue género en el verbo.
// ============================================================
const subjectDataByLang = {
  es: {
    Yo: { be: "estoy", want: "quiero", gender: "m" },
    Mamá: { be: "está", want: "quiere", gender: "f" },
    Papá: { be: "está", want: "quiere", gender: "m" },
    Amigo: { be: "está", want: "quiere", gender: "m" },
    Profesora: { be: "está", want: "quiere", gender: "f" },
    Cuidador: { be: "está", want: "quiere", gender: "m" },
  },
  eu: {
    // "egon" (nago/dago) para estados y ubicación, no "izan" (naiz/da).
    Yo: { be: "nago", want: "nahi dut", gender: "m" },
    Mamá: { be: "dago", want: "nahi du", gender: "f" },
    Papá: { be: "dago", want: "nahi du", gender: "m" },
    Amigo: { be: "dago", want: "nahi du", gender: "m" },
    Profesora: { be: "dago", want: "nahi du", gender: "f" },
    Cuidador: { be: "dago", want: "nahi du", gender: "m" },
  },
};

const placePhrasesByLang = {
  es: {
    // "en el/la X": el sujeto ESTÁ en ese lugar (no "al X", que sería ir hacia allí).
    Casa: "en casa",
    Colegio: "en el colegio",
    Parque: "en el parque",
    Baño: "en el baño",
    Hospital: "en el hospital",
    Tienda: "en la tienda",
  },
  eu: {
    Casa: "etxean",
    Colegio: "eskolan",
    Parque: "parkean",
    Baño: "komunean",
    Hospital: "ospitalean",
    Tienda: "dendan",
  },
};

const sentimentByGenderLang = {
  es: {
    Contento: { m: "contento", f: "contenta" },
    Triste: { m: "triste", f: "triste" },
    Cansado: { m: "cansado", f: "cansada" },
    Enfadado: { m: "enfadado", f: "enfadada" },
    Asustado: { m: "asustado", f: "asustada" },
    Calma: { m: "en calma", f: "en calma" },
  },
  eu: {
    // El euskera no distingue género gramatical.
    Contento: { m: "pozik", f: "pozik" },
    Triste: { m: "triste", f: "triste" },
    Cansado: { m: "nekatuta", f: "nekatuta" },
    Enfadado: { m: "haserre", f: "haserre" },
    Asustado: { m: "beldurtuta", f: "beldurtuta" },
    Calma: { m: "lasai", f: "lasai" },
  },
};

// Imágenes del alfabeto dactilológico LSE (una por letra, más los dígrafos CH/LL/RR).
const dactyloImages = {
  A: "A.png",
  B: "B.png",
  C: "C.png",
  CH: "Ch.png",
  D: "D.png",
  E: "E.png",
  F: "F.png",
  G: "G.png",
  H: "H.png",
  I: "I.png",
  J: "J.png",
  K: "K.png",
  L: "L.png",
  LL: "LL.png",
  M: "M.png",
  N: "N.png",
  Ñ: "Ñ.png",
  O: "O.png",
  P: "P.png",
  Q: "Q.png",
  R: "R.png",
  RR: "RR.png",
  S: "S.png",
  T: "T.png",
  U: "U.png",
  V: "V.png",
  W: "W.png",
  X: "X.png",
  Y: "Y.png",
  Z: "Z.png",
};

// Pasa el texto a mayúsculas sin acentos (salvo la Ñ, que se conserva) para poder
// buscar cada letra en el banco de imágenes del dactilológico.
function normalizeForSigning(text) {
  return text
    .toUpperCase()
    .replace(/Á/g, "A")
    .replace(/É/g, "E")
    .replace(/Í/g, "I")
    .replace(/Ó/g, "O")
    .replace(/Ú/g, "U")
    .replace(/Ü/g, "U");
}

// Divide una palabra en las unidades que se deletrean por separado,
// agrupando los dígrafos tradicionales CH, LL y RR en un único signo.
function tokenizeForSigning(word) {
  const normalized = normalizeForSigning(word);
  const tokens = [];
  let i = 0;

  while (i < normalized.length) {
    const char = normalized[i];

    if (char === " ") {
      tokens.push(" ");
      i += 1;
      continue;
    }

    const pair = normalized.substring(i, i + 2);
    if (pair === "CH" || pair === "LL" || pair === "RR") {
      tokens.push(pair);
      i += 2;
    } else {
      tokens.push(char);
      i += 1;
    }
  }

  return tokens;
}

// Genera el HTML con la fila de imágenes del deletreo dactilológico para una palabra o frase.
function buildDactyloRowHtml(word) {
  const tokens = tokenizeForSigning(word);

  return tokens
    .map((token) => {
      if (token === " ") {
        return `<span class="dactylo-space" aria-hidden="true"></span>`;
      }

      const filename = dactyloImages[token];
      if (!filename) return "";

      // Igual que con los pictogramas: probamos una normalización Unicode y,
      // si falla, reintentamos con la otra (p. ej. la Ñ en el disco).
      const primarySrc = `img/dactilologico/${encodeURIComponent(filename.normalize("NFC"))}`;
      const altSrc = `img/dactilologico/${encodeURIComponent(filename.normalize("NFD"))}`;
      return `<img src="${primarySrc}" data-alt-src="${altSrc}" alt="${escapeHtml(token)}" class="dactylo-letter" loading="lazy" onerror="if(this.dataset.altSrc){this.src=this.dataset.altSrc;delete this.dataset.altSrc;}" />`;
    })
    .join("");
}

// Límite de palabras por mensaje (es un prototipo): al superarlo se borra solo.
const MAX_MESSAGE_WORDS = 5;

// Estado actual de la frase construida (siempre guarda los identificadores en español).
const messageState = {
  phrase: "",
  subject: "",
  activity: "",
  // Comida, lugar y sentimiento se guardan por separado (en vez de un único
  // "complemento") para poder combinarlos todos en la misma frase con "y"
  // en lugar de que el último elegido borre a los anteriores.
  food: "",
  place: "",
  feeling: "",
  // Palabra que se va formando letra a letra desde el abecedario dactilológico.
  spelledWord: "",
  // Historial visual para mostrar feedback inmediato al pulsar cualquier palabra.
  selectedWords: [],
};

// Qué vista de la cuadrícula está activa ahora mismo (para poder re-renderizarla si cambia el idioma).
let currentView = { type: "categories", category: "" };

// Guarda una referencia a la última reproducción para evitar cortes inesperados.
let activeUtterance = null;

// Instancia global para evitar bloqueos de voz en algunos navegadores (ej. Chrome).
const globalUtterance = new SpeechSynthesisUtterance();

// Referencias del DOM.
const splashScreen = document.getElementById("splashScreen");
const splashTaglineEl = document.getElementById("splashTagline");
const appGrid = document.getElementById("appGrid");
const messageBox = document.getElementById("messageBox");
const clearButton = document.getElementById("clearMessage");
const speakButton = document.getElementById("speakMessage");
const gridTitle = document.getElementById("gridTitle");
const backButton = document.getElementById("backToCategories");
const mascotImg = document.getElementById("mascotImg");
const messageTitleEl = document.getElementById("messageTitle");
const messageHintEl = document.getElementById("messageHint");
const langToggleButton = document.getElementById("langToggle");
const openAlphabetButton = document.getElementById("openAlphabet");
const alphabetButtonLabelEl = document.getElementById("alphabetButtonLabel");
const alphabetScreen = document.getElementById("alphabetScreen");
const alphabetTitleEl = document.getElementById("alphabetTitle");
const closeAlphabetButton = document.getElementById("closeAlphabet");
const alphabetGrid = document.getElementById("alphabetGrid");
const alphabetPreviewEl = document.getElementById("alphabetPreview");
const alphabetSpaceButton = document.getElementById("alphabetSpace");
const alphabetDeleteButton = document.getElementById("alphabetDelete");

// Aplica las traducciones a los textos fijos de la interfaz.
function applyStaticTranslations() {
  if (messageTitleEl) messageTitleEl.textContent = t("messageTitle");
  if (clearButton) clearButton.textContent = t("clearMessageBtn");
  if (speakButton) speakButton.textContent = t("speakMessageBtn");
  if (backButton) backButton.textContent = t("backBtn");
  if (messageHintEl) messageHintEl.textContent = t("messageHint");
  if (splashTaglineEl) splashTaglineEl.textContent = t("splashTagline");
  if (alphabetButtonLabelEl) alphabetButtonLabelEl.textContent = t("alphabetButton");
  if (alphabetTitleEl) alphabetTitleEl.textContent = t("alphabetTitle");
  if (closeAlphabetButton) closeAlphabetButton.textContent = t("alphabetBack");
  if (alphabetSpaceButton) alphabetSpaceButton.textContent = t("alphabetSpaceBtn");
  if (alphabetDeleteButton) alphabetDeleteButton.textContent = t("alphabetDeleteBtn");
  document.documentElement.lang = currentLang;
}

// Actualiza el texto del botón de idioma para que muestre el idioma AL QUE se puede cambiar.
function updateLangToggleLabel() {
  if (!langToggleButton) return;
  const nextLang = currentLang === "es" ? "eu" : "es";
  langToggleButton.textContent = nextLang.toUpperCase();
  langToggleButton.setAttribute(
    "aria-label",
    nextLang === "eu" ? "Euskarara aldatu" : "Cambiar a español"
  );
}

// Cambia el idioma activo, lo recuerda y vuelve a pintar todo lo visible.
function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  currentLang = lang;

  try {
    localStorage.setItem("nuvozLang", lang);
  } catch (e) {
    // Almacenamiento no disponible: el idioma no se recordará entre visitas.
  }

  applyStaticTranslations();
  updateLangToggleLabel();

  if (appGrid) {
    if (currentView.type === "words") {
      renderWordGrid(currentView.category);
    } else {
      renderCategoryGrid();
    }
    updateMessageBox();
  }
}

// Aplicar traducciones desde el primer instante (incluye la pantalla de bienvenida).
applyStaticTranslations();
updateLangToggleLabel();

// Pantalla de bienvenida: se oculta sola a los pocos segundos.
if (splashScreen) {
  setTimeout(() => {
    splashScreen.classList.add("splash-hidden");
  }, 2200);
}

// Hace saltar a la mascota como reacción a una acción del usuario.
function bounceMascot() {
  if (!mascotImg) return;
  mascotImg.classList.remove("mascot-active");
  // Forzar reflow para poder relanzar la animación aunque ya estuviera activa.
  void mascotImg.offsetWidth;
  mascotImg.classList.add("mascot-active");
}

// Cambiar idioma al pulsar el botón junto al logo.
if (langToggleButton) {
  langToggleButton.addEventListener("click", () => {
    setLanguage(currentLang === "es" ? "eu" : "es");
    bounceMascot();
  });
}

// ============================================================
// ABECEDARIO DACTILOLÓGICO: pantalla independiente, no toca las 6 categorías.
// ============================================================
const ALPHABET_LETTERS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

// Pinta las 26 tarjetas A-Z con su imagen de signo (misma lógica de
// reintento NFC/NFD que el resto de imágenes de la app).
function renderAlphabetGrid() {
  if (!alphabetGrid) return;

  const cardsHtml = ALPHABET_LETTERS.map((letter) => {
    const filename = dactyloImages[letter];
    let imgHtml = "";
    if (filename) {
      const primarySrc = `img/dactilologico/${encodeURIComponent(filename.normalize("NFC"))}`;
      const altSrc = `img/dactilologico/${encodeURIComponent(filename.normalize("NFD"))}`;
      imgHtml = `<img src="${primarySrc}" data-alt-src="${altSrc}" alt="" class="alphabet-letter-img" loading="lazy" onerror="if(this.dataset.altSrc){this.src=this.dataset.altSrc;delete this.dataset.altSrc;}" />`;
    }
    return `
      <button type="button" class="alphabet-letter-btn" data-letter="${letter}">
        ${imgHtml}
        <span class="alphabet-letter-label">${letter}</span>
      </button>
    `;
  }).join("");

  alphabetGrid.innerHTML = cardsHtml;
}

// Abre/cierra la pantalla del abecedario sin tocar el resto de la app.
function openAlphabetScreen() {
  if (!alphabetScreen) return;
  alphabetScreen.hidden = false;
  updateAlphabetPreview();
}

function closeAlphabetScreen() {
  if (!alphabetScreen) return;
  alphabetScreen.hidden = true;
}

if (openAlphabetButton) {
  openAlphabetButton.addEventListener("click", () => {
    openAlphabetScreen();
    bounceMascot();
  });
}

if (closeAlphabetButton) {
  closeAlphabetButton.addEventListener("click", closeAlphabetScreen);
}

if (alphabetGrid) {
  renderAlphabetGrid();

  alphabetGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-letter]");
    if (!button) return;
    handleLetterSelection(button.dataset.letter);
    bounceMascot();
  });
}

// Botón "Espacio": añade un espacio, igual que una letra más.
if (alphabetSpaceButton) {
  alphabetSpaceButton.addEventListener("click", () => {
    handleLetterSelection(" ");
    bounceMascot();
  });
}

// Botón "Borrar letra": quita la última letra escrita, como en un teclado normal.
if (alphabetDeleteButton) {
  alphabetDeleteButton.addEventListener("click", () => {
    handleAlphabetBackspace();
    bounceMascot();
  });
}

// Añade una letra (o un espacio) a la palabra que se está deletreando en "Mi mensaje".
// Si había una estructura de categorías o una frase a medias, se descarta:
// el abecedario y las categorías son dos formas independientes de escribir.
function handleLetterSelection(letter) {
  if (
    messageState.subject ||
    messageState.activity ||
    messageState.food ||
    messageState.place ||
    messageState.feeling ||
    messageState.phrase
  ) {
    messageState.subject = "";
    messageState.activity = "";
    messageState.food = "";
    messageState.place = "";
    messageState.feeling = "";
    messageState.phrase = "";
    messageState.selectedWords = [];
  }

  messageState.spelledWord += letter;
  updateMessageBox();
}

// Borra la última letra escrita con el abecedario, una a una.
function handleAlphabetBackspace() {
  if (!messageState.spelledWord) return;
  messageState.spelledWord = messageState.spelledWord.slice(0, -1);
  updateMessageBox();
}

// Mantiene sincronizado el recuadro de texto de la pantalla del abecedario
// con lo que haya en "Mi mensaje" (por si se abre con algo ya escrito).
function updateAlphabetPreview() {
  if (!alphabetPreviewEl) return;
  const text = getFinalMessage();
  alphabetPreviewEl.textContent = text || t("messagePlaceholder");
}

// No ejecutar lógica si no estamos en demo.html.
if (appGrid && messageBox && clearButton && speakButton && gridTitle && backButton) {
  renderCategoryGrid();
  updateMessageBox();

  // Delegación de eventos para categorías y palabras.
  appGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const category = button.dataset.category;
    if (category) {
      renderWordGrid(category);
      return;
    }

    const word = button.dataset.word;
    if (word) {
      handleWordSelection(word, button.dataset.categoryType);
      bounceMascot();
    }
  });

  // Volver a la cuadrícula principal de categorías.
  backButton.addEventListener("click", () => {
    renderCategoryGrid();
  });

  // Borrar mensaje completo.
  clearButton.addEventListener("click", () => {
    resetMessageState();
    updateMessageBox();
    if (mascotImg) mascotImg.classList.remove("mascot-active");
  });

  // Reproducir el texto del mensaje con voz.
  speakButton.addEventListener("click", () => {
    // 1) Obtener siempre el texto actual.
    const text = getCurrentSpeakText();

    if (!text) {
      alert(t("needWordsAlert"));
      return;
    }

    bounceMascot();

    // 2) Verificar soporte de síntesis de voz.
    if (!("speechSynthesis" in window)) {
      alert(t("noSpeechAlert"));
      return;
    }

    // Log de depuración para comprobar qué intenta reproducirse.
    console.log("Reproducir voz:", text);

    // 3) Cancelar cualquier reproducción anterior.
    window.speechSynthesis.cancel();

    // 4) Reusar instancia global de utterance.
    globalUtterance.text = text;

    // 5) Configuración solicitada (idioma según el modo activo).
    globalUtterance.lang = currentLang === "eu" ? "eu-ES" : "es-ES";
    globalUtterance.rate = 0.9;
    globalUtterance.pitch = 1;
    globalUtterance.volume = 1;

    activeUtterance = globalUtterance;

    // 6) Ejecutar reproducción.
    window.speechSynthesis.speak(globalUtterance);

    // Fallback corto por si el motor no arranca al primer intento tras cancel().
    setTimeout(() => {
      if (!window.speechSynthesis.speaking && activeUtterance === globalUtterance) {
        window.speechSynthesis.speak(globalUtterance);
      }
    }, 120);

    // Evita ejecutar la ruta antigua.
    return;

    speakText(text);
  });
}

// Muestra las 6 categorías principales.
function renderCategoryGrid() {
  const categoryButtons = Object.keys(categoryData)
    .map(
      (category) => `
        <button type="button" class="tile-btn category" data-category="${category}">
          <span>${getLabel(categoryLabels, category)}</span>
        </button>
      `
    )
    .join("");

  appGrid.innerHTML = categoryButtons;
  appGrid.classList.remove("app-grid--words");
  gridTitle.textContent = t("categoriesTitle");
  backButton.hidden = true;
  currentView = { type: "categories", category: "" };
}

// Muestra palabras/pictogramas de la categoría elegida.
function renderWordGrid(category) {
  const words = categoryData[category] || [];

  const wordButtons = words
    .map((word) => {
      const iconHtml = buildWordIconHtml(category, word);
      const label = getLabel(wordLabels, word);
      return `
        <button type="button" class="tile-btn word" data-word="${word}" data-category-type="${category}">
          ${iconHtml}
          <span>${label}</span>
          <div class="dactylo-row">${buildDactyloRowHtml(label)}</div>
        </button>
      `;
    })
    .join("");

  appGrid.innerHTML = wordButtons;
  appGrid.classList.add("app-grid--words");
  gridTitle.textContent = `${t("categoryPrefix")}: ${getLabel(categoryLabels, category)}`;
  backButton.hidden = false;
  currentView = { type: "words", category };
}

// Detecta qué rol tiene cada palabra y actualiza el estado.
function handleWordSelection(word, categoryType) {
  // Las categorías y el abecedario son formas independientes de escribir:
  // elegir una palabra de categoría descarta lo que se estuviera deletreando.
  messageState.spelledWord = "";

  if (categoryType === "Frases") {
    // Una frase completa reemplaza la selección anterior.
    messageState.selectedWords = [word];
    messageState.phrase = word;
    messageState.subject = "";
    messageState.activity = "";
    messageState.food = "";
    messageState.place = "";
    messageState.feeling = "";
    updateMessageBox();
    return;
  }

  // Si el usuario elige una estructura nueva, quitamos la frase completa anterior.
  if (messageState.phrase) {
    messageState.selectedWords = [];
  }
  messageState.phrase = "";

  // Prototipo: como máximo 5 palabras por mensaje. Al llegar al límite,
  // el mensaje se borra solo para empezar uno nuevo con la palabra actual.
  if (messageState.selectedWords.length >= MAX_MESSAGE_WORDS) {
    resetMessageState();
  }

  // Siempre guardamos feedback inmediato, sea cual sea la categoría.
  messageState.selectedWords.push(word);

  if (categoryType === "Personas") {
    messageState.subject = word;
    updateMessageBox();
    return;
  }

  if (categoryType === "Actividades") {
    messageState.activity = word;
    updateMessageBox();
    return;
  }

  if (categoryType === "Comida") {
    messageState.food = word;
    updateMessageBox();
    return;
  }

  if (categoryType === "Lugares") {
    messageState.place = word;
    updateMessageBox();
    return;
  }

  if (categoryType === "Sentimientos") {
    messageState.feeling = word;
    updateMessageBox();
  }
}

// Da formato a la comida elegida ("agua" / "ura").
function formatFoodPhrase(foodWord) {
  return getLabel(wordLabels, foodWord).toLowerCase();
}

// Da formato al lugar elegido con su preposición ("en casa" / "etxean").
function formatPlacePhrase(placeWord) {
  const table = placePhrasesByLang[currentLang];
  return (table && table[placeWord]) || getLabel(wordLabels, placeWord).toLowerCase();
}

// Da formato al sentimiento elegido, con la concordancia de género en español.
function formatFeelingPhrase(feelingWord, gender) {
  const table = sentimentByGenderLang[currentLang];
  const entry = table[feelingWord];
  return entry ? entry[gender] : getLabel(wordLabels, feelingWord).toLowerCase();
}

// Genera la frase final con reglas simples y naturales, en el idioma activo.
// Comida, lugar y sentimiento pueden elegirse a la vez: en vez de que el
// último pisar a los anteriores, cada uno forma su propia frase corta y se
// unen con "y" ("eta" en euskera) para no perder ninguna selección.
function getFinalMessage() {
  // La palabra deletreada letra a letra con el abecedario tiene prioridad:
  // es un modo de escritura independiente del de categorías.
  if (messageState.spelledWord) {
    return messageState.spelledWord;
  }

  if (messageState.phrase) {
    return getLabel(wordLabels, messageState.phrase);
  }

  if (!messageState.subject) {
    return "";
  }

  const subject = messageState.subject;
  const grammar = subjectDataByLang[currentLang][subject] || subjectDataByLang[currentLang].Yo;
  const subjectLabel = getLabel(wordLabels, subject);
  // Cada "predicado" es la frase sin el sujeto (verbo + complemento), para no
  // repetir "Mamá... Mamá..." en cada tramo unido con "y".
  const predicates = [];

  // La actividad absorbe como mucho un complemento (lugar si lo hay, si no comida)
  // para mantener frases naturales como "quiero jugar en casa" en un solo bloque.
  let remainingPlace = messageState.place;
  let remainingFood = messageState.food;

  if (messageState.activity) {
    const activityLabel = getLabel(wordLabels, messageState.activity).toLowerCase();
    let complementText = "";
    if (remainingPlace) {
      complementText = formatPlacePhrase(remainingPlace);
      remainingPlace = "";
    } else if (remainingFood) {
      complementText = formatFoodPhrase(remainingFood);
      remainingFood = "";
    }

    if (currentLang === "eu") {
      predicates.push(`${complementText} ${activityLabel} ${grammar.want}`.replace(/\s+/g, " ").trim());
    } else {
      predicates.push(`${grammar.want} ${activityLabel} ${complementText}`.replace(/\s+/g, " ").trim());
    }
  }

  if (remainingFood) {
    const foodText = formatFoodPhrase(remainingFood);
    predicates.push(currentLang === "eu" ? `${foodText} ${grammar.want}` : `${grammar.want} ${foodText}`);
  }

  if (remainingPlace) {
    const placeText = formatPlacePhrase(remainingPlace);
    predicates.push(currentLang === "eu" ? `${placeText} ${grammar.be}` : `${grammar.be} ${placeText}`);
  }

  if (messageState.feeling) {
    const feelingText = formatFeelingPhrase(messageState.feeling, grammar.gender || "m");
    predicates.push(currentLang === "eu" ? `${feelingText} ${grammar.be}` : `${grammar.be} ${feelingText}`);
  }

  if (predicates.length === 0) {
    return subjectLabel;
  }

  const joiner = currentLang === "eu" ? " eta " : " y ";
  return `${subjectLabel} ${predicates.join(joiner)}`.replace(/\s+/g, " ").trim();
}

// Limpia el estado actual.
function resetMessageState() {
  messageState.phrase = "";
  messageState.subject = "";
  messageState.activity = "";
  messageState.food = "";
  messageState.place = "";
  messageState.feeling = "";
  messageState.spelledWord = "";
  messageState.selectedWords = [];
}

// Devuelve el mejor texto para síntesis de voz (frase final o selección actual).
function getCurrentSpeakText() {
  const finalMessage = getFinalMessage();
  if (finalMessage) return finalMessage;

  if (messageState.selectedWords.length > 0) {
    return messageState.selectedWords
      .map((word) => getLabel(wordLabels, word))
      .join(" ")
      .trim();
  }

  return "";
}

// Reproduce texto de forma robusta en distintos navegadores.
function speakText(text) {
  const synth = window.speechSynthesis;

  // Ejecuta una reproducción real usando las voces disponibles en ese momento.
  const runSpeak = () => {
    // Evita solapamientos y reanuda si el motor quedó en pausa.
    synth.cancel();
    if (typeof synth.resume === "function") {
      synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === "eu" ? "eu-ES" : "es-ES";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Intenta elegir una voz del idioma activo si está disponible.
    const voices = synth.getVoices();
    const langPrefix = currentLang === "eu" ? "eu" : "es";
    const matchingVoice = voices.find((voice) => new RegExp(`^${langPrefix}(-|_)`, "i").test(voice.lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
      utterance.lang = matchingVoice.lang;
    }

    activeUtterance = utterance;
    synth.speak(utterance);
  };

  // En algunos navegadores las voces llegan de forma asíncrona en el primer uso.
  const initialVoices = synth.getVoices();
  if (initialVoices.length > 0) {
    runSpeak();
    return;
  }

  let hasSpoken = false;
  const speakOnce = () => {
    if (hasSpoken) return;
    hasSpoken = true;
    runSpeak();
  };

  // Intento cuando se carguen voces.
  const onVoicesChanged = () => {
    speakOnce();
  };
  synth.addEventListener("voiceschanged", onVoicesChanged, { once: true });

  // Fallback si voiceschanged no se dispara.
  setTimeout(() => {
    speakOnce();
  }, 250);
}

// Escapa texto para insertar chips de forma segura en innerHTML.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Actualiza la zona "Mi mensaje".
function updateMessageBox() {
  // La pantalla del abecedario tiene su propio recuadro de vista previa;
  // se mantiene sincronizado cada vez que cambia el mensaje.
  updateAlphabetPreview();

  const finalMessage = getFinalMessage();
  const hasSelections = messageState.selectedWords.length > 0;

  if (!hasSelections && !finalMessage) {
    messageBox.textContent = t("messagePlaceholder");
    return;
  }

  // 1) Feedback inmediato: chips por cada palabra pulsada.
  const chipsHtml = messageState.selectedWords
    .map(
      (word) =>
        `<span style="display:inline-block;margin:4px 6px 0 0;padding:6px 10px;border-radius:999px;background:#dfeeff;color:#2b4f83;font-weight:700;font-size:0.82rem;">${escapeHtml(getLabel(wordLabels, word))}</span>`
    )
    .join("");

  // 2) Si ya hay frase inteligente, la mostramos debajo.
  let phraseHtml = "";
  if (finalMessage) {
    phraseHtml = `<div style="margin-top:10px;padding:8px 10px;border-radius:12px;background:#edf4ff;color:#294a79;font-weight:700;">${escapeHtml(finalMessage)}</div>`;
  }

  messageBox.innerHTML = `${chipsHtml}${phraseHtml}`;
}
