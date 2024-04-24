// Projet speedflag
// faire un bouton pour passer le drapeau

// Constantes
const url_premiere_partie = "https://flagcdn.com/w640/";
const url_extentinon_jpg= ".jpg";
const drapeauImg = document.getElementById("drapeau_a_deviner");
const reponseFausse = document.getElementById("faux");
const champTexte = document.getElementById("guess");
const listeReponses = document.getElementById("listeReponses");
const passerBtn = document.getElementById("passer");


// Toutes les données
let pays_a_deviner = "";
// Dictionnaire des pays européens avec comme clé le nom du pays et comme valeur le code osi.
let liste_pays = {
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
}


// Dès que la page est chargé
document.addEventListener("DOMContentLoaded", newDrapeauADeviner);

/**
 * Choisit aléatoirement un pays parmi ceux de la liste et affiche son drapeau.
 * @returns {string} Le nom du pays choisi.
 */
function newDrapeauADeviner() {
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

/**
 * Affiche ou masque un élément HTML représentant une réponse incorrecte.
 * @param {boolean} Afficher - Indique si l'élément doit être affiché (true) ou masqué (false).
 * @returns {void}
 */
function afficherReponseIncorrecte(Afficher) {
    if (Afficher) {
        reponseFausse.style.display = "";
    } else {
        reponseFausse.style.display = "none";
    }
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
function afficherReponseCorrecte() {
    // Créer une nouvelle div pour afficher la réponse
    let nouvelleReponse = document.createElement("div");
    nouvelleReponse.classList.add("reponse"); // Ajouter une classe à la div réponse

    // Créer et afficher le nom du pays avec la premiere lettre en maj
    let nomPays = creerContenueDansDiv("p", "pays_reponses", pays_a_deviner.charAt(0).toUpperCase() + pays_a_deviner.substring(1), "nom");
    nouvelleReponse.appendChild(nomPays);

    // Créer et afficher le drapeau du pays deviné
    let drapeauPays = creerContenueDansDiv("img", "drapeau_reponse", url_premiere_partie + liste_pays[pays_a_deviner] + url_extentinon_jpg,"drapeau");
    nouvelleReponse.appendChild(drapeauPays);

    afficherReponseIncorrecte(false);
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
        afficherReponseIncorrecte(true);
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


// Boutons
passerBtn.addEventListener("click", newDrapeauADeviner)