// Projet speedflag
// Constantes
const url_premiere_partie = "https://flagcdn.com/w640/";
const url_extentinon_jpg= ".jpg";
const drapeauImg = document.getElementById("drapeau_a_deviner");
const reponseFausse = document.getElementById("faux");
const champTexte = document.getElementById("guess");
const listeReponses = document.getElementById("listeReponses");
const settings_logo = document.getElementById("settings-logo");
const fermer_parametre = document.getElementById("fermerParametre");
const nbDrapeau = document.getElementById("nbDrapeau");
const nbDrapeauFin = document.getElementById("nbDrapeauFin");
const finJeu = document.getElementById("findujeu");
// Continents
const europeCheckbox = document.getElementById("eu");
const afriqueCheckbox = document.getElementById("af");
const oceanieCheckbox = document.getElementById("oc");
const ameriqueSudCheckbox = document.getElementById("ams");
const ameriqueNordCheckbox = document.getElementById("amn");
const asieCheckbox = document.getElementById("as");
// Commander le jeu
const commencerJeu = document.getElementById("commencerLejeu");
// const rejouer = document.getElementById("recommencer");
const tmpsJeu = document.getElementById("tmpsJeu");
const tmpsAct = document.getElementById("tmpsAct");

// Toutes les données
let pays_a_deviner = "";
let score = 0;
// Dictionnaire des pays par continent avec comme clé le nom du pays et comme valeur le code osi.
let pays_europe = {
    "allemagne": "de",
    "albanie": "al",
    "andorre": "ad",
    "autriche": "at",
    "belgique": "be",
    "bielorussie": "by",
    "bosnie-herzegovine": "ba",
    "bulgarie": "bg",
    "croatie": "hr",
    "danemark": "dk",
    "espagne": "es",
    "estonie": "ee",
    "finlande": "fi",
    "france": "fr",
    "grece": "gr",
    "hongrie": "hu",
    "irlande": "ie",
    "islande": "is",
    "italie": "it",
    "lettonie": "lv",
    "liechtenstein": "li",
    "lituanie": "lt",
    "luxembourg": "lu",
    "macedoine du nord": "mk",
    "malte": "mt",
    "moldavie": "md",
    "monaco": "mc",
    "montenegro": "me",
    "norvege": "no",
    "pays-bas": "nl",
    "pologne": "pl",
    "portugal": "pt",
    "republique tcheque": "cz",
    "roumanie": "ro",
    "royaume-uni": "gb",
    "russie": "ru",
    "saint-marin": "sm",
    "serbie": "rs",
    "slovaquie": "sk",
    "slovenie": "si",
    "suede": "se",
    "suisse": "ch",
    "ukraine": "ua",
    "vatican": "va"
};
let pays_afrique = {
    "algerie": "dz",
    "angola": "ao",
    "benin": "bj",
    "botswana": "bw",
    "burkina faso": "bf",
    "burundi": "bi",
    "cap vert": "cv",
    "cameroun": "cm",
    "republique centrafricaine": "cf",
    "tchad": "td",
    "comores": "km",
    "congo": "cg",
    "republique democratique du congo": "cd",
    "djibouti": "dj",
    "egypte": "eg",
    "guinee equatoriale": "gq",
    "erythree": "er",
    "ethiopie": "et",
    "gabon": "ga",
    "gambie": "gm",
    "ghana": "gh",
    "guinee": "gn",
    "guinee-bissau": "gw",
    "cote d'ivoire": "ci",
    "kenya": "ke",
    "lesotho": "ls",
    "liberia": "lr",
    "libye": "ly",
    "madagascar": "mg",
    "malawi": "mw",
    "mali": "ml",
    "mauritanie": "mr",
    "maurice": "mu",
    "maroc": "ma",
    "mozambique": "mz",
    "namibie": "na",
    "niger": "ne",
    "nigeria": "ng",
    "rwanda": "rw",
    "sao tome-et-principe": "st",
    "senegal": "sn",
    "seychelles": "sc",
    "sierra leone": "sl",
    "somalie": "so",
    "afrique du sud": "za",
    "soudan du sud": "ss",
    "soudan": "sd",
    "eswatini": "sz",
    "tanzanie": "tz",
    "togo": "tg",
    "tunisie": "tn",
    "ouganda": "ug",
    "zambie": "zm",
    "zimbabwe": "zw"
};
let pays_asie = {
    "afghanistan": "af",
    "armenie": "am",
    "azerbaidjan": "az",
    "bahrein": "bh",
    "bangladesh": "bd",
    "bhoutan": "bt",
    "brunei": "bn",
    "cambodge": "kh",
    "chine": "cn",
    "chypre": "cy",
    "georgie": "ge",
    "inde": "in",
    "indonesie": "id",
    "iran": "ir",
    "irak": "iq",
    "israel": "il",
    "japon": "jp",
    "jordanie": "jo",
    "kazakhstan": "kz",
    "koweit": "kw",
    "kirghizistan": "kg",
    "laos": "la",
    "liban": "lb",
    "malaisie": "my",
    "maldives": "mv",
    "mongolie": "mn",
    "birmanie": "mm",
    "nepal": "np",
    "oman": "om",
    "pakistan": "pk",
    "palestine": "ps",
    "philippines": "ph",
    "qatar": "qa",
    "arabie saoudite": "sa",
    "singapour": "sg",
    "coree du sud": "kr",
    "sri lanka": "lk",
    "syrie": "sy",
    "tadjikistan": "tj",
    "thailande": "th",
    "timor oriental": "tl",
    "turkmenistan": "tm",
    "emirats arabes unis": "ae",
    "ouzbekistan": "uz",
    "viet nam": "vn",
    "yemen": "ye"
};
let pays_oceanie = {
    "australie": "au",
    "fidji": "fj",
    "kiribati": "ki",
    "iles marshall": "mh",
    "micronesie": "fm",
    "nauru": "nr",
    "nouvelle-zelande": "nz",
    "palaos": "pw",
    "papouasie-nouvelle-guinee": "pg",
    "samoa": "ws",
    "iles salomon": "sb",
    "tonga": "to",
    "tuvalu": "tv",
    "vanuatu": "vu"
};
let pays_amerique_sud = {
    "argentine": "ar",
    "bolivie": "bo",
    "bresil": "br",
    "chili": "cl",
    "colombie": "co",
    "equateur": "ec",
    "guyana": "gy",
    "paraguay": "py",
    "perou": "pe",
    "suriname": "sr",
    "uruguay": "uy",
    "venezuela": "ve"
};
let pays_amerique_nord = {
    "antigua-et-barbuda": "ag",
    "bahamas": "bs",
    "barbade": "bb",
    "belize": "bz",
    "canada": "ca",
    "costa rica": "cr",
    "cuba": "cu",
    "dominique": "dm",
    "republique dominicaine": "do",
    "el salvador": "sv",
    "grenade": "gd",
    "guatemala": "gt",
    "haiti": "ht",
    "honduras": "hn",
    "jamaique": "jm",
    "mexique": "mx",
    "nicaragua": "ni",
    "panama": "pa",
    "saint-christophe-et-nieves": "kn",
    "sainte-lucie": "lc",
    "saint-vincent-et-les-grenadines": "vc",
    "trinite-et-tobago": "tt",
    "etats-unis": "us"
};
let liste_pays = {};



// JS DRAPEAU
/**
 * Choisit aléatoirement un pays parmi ceux de la liste et affiche son drapeau.
 * @returns {string} Le nom du pays choisi.
 */
function newDrapeauADeviner() {
    majDrapeau();
    let nomsDesPays = Object.keys(liste_pays);
    paysAleatoire = nomsDesPays[Math.floor(Math.random() * nomsDesPays.length)];
    while (paysAleatoire == pays_a_deviner) {
        paysAleatoire = nomsDesPays[Math.floor(Math.random() * nomsDesPays.length)];
    }
    pays_a_deviner = paysAleatoire;
    iso = liste_pays[paysAleatoire];
    let url = url_premiere_partie + iso + url_extentinon_jpg;
    drapeauImg.src = url;
}

function ajouterPaysSiCoche(checkbox, paysContinent, lst) {
    if (checkbox.checked) {
        Object.assign(lst, paysContinent);
    }
}

function majDrapeau() {
    liste_pays = {};
    ajouterPaysSiCoche(europeCheckbox, pays_europe, liste_pays);
    ajouterPaysSiCoche(afriqueCheckbox, pays_afrique, liste_pays);
    ajouterPaysSiCoche(oceanieCheckbox, pays_oceanie, liste_pays);
    ajouterPaysSiCoche(ameriqueSudCheckbox, pays_amerique_sud, liste_pays);
    ajouterPaysSiCoche(ameriqueNordCheckbox, pays_amerique_nord, liste_pays);
    ajouterPaysSiCoche(asieCheckbox, pays_asie, liste_pays);
}

/**
 * Ajoute un élément HTML en premier dans un conteneur.
 * @param {HTMLElement} div - Le conteneur où ajouter l'élément.
 * @param {HTMLElement} elmt - L'élément à ajouter.
 * @returns {void}
 */
function ajouterElementEnPremier(div, elmt) {
    if (div.firstChild) {
        div.insertBefore(elmt, div.firstChild);
    } else {
        div.appendChild(elmt);
    } 
}

/**
 * Crée un élément HTML avec du contenu et l'ajoute à une div parente.
 * @param {string} type - Le type d'élément HTML à créer (par exemple : "img", "p").
 * @param {string} className - La classe à ajouter à l'élément HTML.
 * @param {string} content - Le contenu de l'élément HTML (src pour les images, textContent pour les paragraphes).
 * @param {string} idDiv - L'identifiant de la div parente où ajouter l'élément.
 * @returns {HTMLElement} - La div contenant l'élément créé.
 */
function creerContenueDansDiv(type, className, content, idDiv) {
    let elmt = document.createElement(type);
    elmt.classList.add(className);
    if (type == "img") {
        elmt.src = content;
        elmt.alt = "Drapeau de " + pays_a_deviner;
    }
    else if (type == "p") {
        elmt.textContent = content;
    }
    let madiv = document.createElement("div");
    madiv.id = idDiv;
    madiv.appendChild(elmt);
    return madiv
}

/**
 * Affiche une réponse correcte avec le nom du pays et son drapeau.
 * @returns {void}
 */
function afficherReponseCorrecte(passer = false) {
    // Créer une nouvelle div pour afficher la réponse
    let nouvelleReponse = document.createElement("div");
    nouvelleReponse.classList.add("reponse");
    // Si la reponse est passe
    if (passer) {
        nouvelleReponse.classList.add("passer");
        champTexte.focus();
    } else {
        score++;
    }
    nbDrapeau.innerHTML = `Nb drapeau : ${score}`;
    // Créer et afficher le nom du pays avec la premiere lettre en maj
    let nomPays = creerContenueDansDiv("p", "pays_reponses", pays_a_deviner.charAt(0).toUpperCase() + pays_a_deviner.substring(1), "nom");
    nouvelleReponse.appendChild(nomPays);
    // Créer et afficher le drapeau du pays deviné
    let drapeauPays = creerContenueDansDiv("img", "drapeau_reponse", url_premiere_partie + liste_pays[pays_a_deviner] + url_extentinon_jpg,"drapeau");
    nouvelleReponse.appendChild(drapeauPays);

    reponseFausse.classList.add("cacher");
    ajouterElementEnPremier(listeReponses, nouvelleReponse);
    // Afficher un nouveau drapeau pour la prochaine réponse
    newDrapeauADeviner();
}

/**
 * Normalise une chaîne de caractères en la mettant en minuscules et en supprimant les accents.
 * @param {string} saisie - La chaîne de caractères à normaliser.
 * @returns {string} La chaîne normalisée.
 */
function normaliserSaisie(saisie) {
    saisie = saisie.toLowerCase();
    saisie = saisie.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return saisie;
}

/**
 * Vérifie si la réponse devinée par l'utilisateur est correcte et affiche la réponse correspondante.
 * @param {string} valeur_devine - La réponse devinée par l'utilisateur.
 * @returns {void}
 */
function estBon(valeur_devine) {
    valeur_devine = normaliserSaisie(valeur_devine);
    if (valeur_devine == pays_a_deviner) {
        afficherReponseCorrecte();        
    } else {
        reponseFausse.classList.remove("cacher")
    }
}

// Gestionnaire d'événement pour le champ de texte
champTexte.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        estBon(champTexte.value);
        champTexte.value = "";
    }
});


// Fonctions bouton
function afficherParametre() {
    let parametre = document.getElementById("settingsPanel");
    if (parametre.className == "cacher") {
        parametre.classList.remove("cacher");
    } else {
        parametre.classList.add("cacher");
        newDrapeauADeviner();
    }
    
}


// Boutons
settings_logo.addEventListener("click", afficherParametre);
fermer_parametre.addEventListener("click", afficherParametre);

// Comande jeu
commencerJeu.addEventListener("click", commencerLeJeu);

function commencerLeJeu() {
    if (tmpsAct.checked) {
        // Commencer le timer
        StartTimer(tmpsJeu.value);
    } else {
        minuteur.classList.add("cacher")
    }    
    // Cacher le premier panneau
    const prejeu = document.getElementById("prejeu");
    prejeu.classList.remove("flex")
    prejeu.classList.add("cacher")
    // Monter le jeu
    const jeu = document.getElementById("jeu")
    jeu.classList.remove("cacher");
    jeu.classList.add("flex");
    // Ecrire direct
    champTexte.focus();
    // Lancer le jeu
    newDrapeauADeviner();
}

function recommencerJeu() {
    finJeu.classList.add("cacher")
    finJeu.classList.remove("flex")   
    listeReponses.innerHTML = "";
    champTexte.value = "";
    score = 0;
    commencerLeJeu();
}

function finirLejeu() {
    time = 0;
    nbDrapeau.innerHTML = `Drapeau deviné : 0`;
    jeu.classList.remove("flex");
    jeu.classList.add("cacher");
    nbDrapeauFin.innerHTML = `Drapeau deviné : ${score}`;
    finJeu.classList.remove("cacher");
    finJeu.classList.add("flex");
    reponseFausse.classList.add("cacher");
}


// TIMER
const countdown = document.getElementById("minuteur");
let time;

/**
 * Met à jour le compte à rebours en affichant les minutes, les secondes et les dixièmes de seconde.
 */
function updateCountDown() {
    const seconds = Math.floor((time % 600) / 10);
    const dsec = time % 10;
    let secAfficher = seconds;
    secAfficher = secAfficher < 10 ? '0' + secAfficher : secAfficher;
    countdown.innerHTML = `${secAfficher}:${dsec}`;
    if (time <= 0) {
        clearInterval(intervalId);
        finirLejeu();
    } else {
        time--;
    }
} 

/**
 * Démarre le timer avec les secondes spécifiées
 * @param {number} timeSeconds - Les secondes pour démarrer le timer.
 */
function StartTimer(timeSeconds) {
    estArrete = false;
    time = timeSeconds * 10;
    intervalId = setInterval(updateCountDown, 100);
}