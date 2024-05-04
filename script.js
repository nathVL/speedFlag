// Projet speedflag
// Constantes
const url_premiere_partie = "https://flagcdn.com/w640/";
const url_extentinon_jpg= ".jpg";
const drapeauImg = document.getElementById("drapeau_a_deviner");
const reponseFausse = document.getElementById("faux");
const champTexte = document.getElementById("guess");
const listeReponses = document.getElementById("listeReponses");
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
// Commencer le jeu
const tmpsJeu = document.getElementById("tmpsJeu");
const tmpsAct = document.getElementById("tmpsAct");
// Timer
const countdown = document.getElementById("minuteur");

// Toutes les données
let pays_a_deviner = "";
let score = 0;
let time;
let intervalId;
// Dictionnaire des pays par continent avec comme clé le nom du pays et comme valeur le code osi.
let liste_pays = {};



// JS DRAPEAU
/**
 * Choisit aléatoirement un pays parmi ceux de la liste et affiche son drapeau.
 * @returns {string} Le nom du pays choisi.
 */
function newDrapeauADeviner() {
    majDrapeau();
    let nomsDesPays = Object.keys(liste_pays);
    let paysAleatoire = nomsDesPays[Math.floor(Math.random() * nomsDesPays.length)];
    while (paysAleatoire == pays_a_deviner) {
        paysAleatoire = nomsDesPays[Math.floor(Math.random() * nomsDesPays.length)];
    }
    pays_a_deviner = paysAleatoire;
    let iso = liste_pays[paysAleatoire];
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
 * Affiche une réponse (encadré en rouge si elle est passé)
 * @param {boolean} passer - Indique si la réponse a été passée.
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
    nbDrapeau.innerHTML = nbDrapeau.innerHTML.slice(0,-1)+score;
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

// Fonctions bouton
function afficherParametre() {
    let parametre = document.getElementById("settingsPanel");
    let flou = document.getElementById("panneau_flou");
    let body = document.querySelector('body');
    if (parametre.className == "cacher") {
        parametre.classList.remove("cacher");
        flou.classList.remove("cacher");
        body.style.overflow = "hidden";
    } else {
        parametre.classList.add("cacher");
        flou.classList.add("cacher");
        newDrapeauADeviner();
        body.style.overflow = "";
    }
}

function commencerLeJeu() {
    if (tmpsAct.checked) {
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

// Gestionnaire d'événement pour le champ de texte
champTexte.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        estBon(champTexte.value);
        champTexte.value = "";
    }
});

// Boutons
document.getElementById("settings-logo").addEventListener("click", afficherParametre);
document.getElementById("fermerParametre").addEventListener("click", afficherParametre);
document.getElementById("commencerLejeu").addEventListener("click", commencerLeJeu);
document.getElementById("passer").addEventListener("click", () => afficherReponseCorrecte(true));
document.getElementById("recommencer").addEventListener("click", recommencerJeu);
document.getElementById("abandonner").addEventListener("click", finirLejeu);

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
    nbDrapeau.innerHTML = nbDrapeau.innerHTML.slice(0,-1) + "0";
    jeu.classList.remove("flex");
    jeu.classList.add("cacher");
    nbDrapeauFin.innerHTML = nbDrapeauFin.innerHTML.slice(0,-1)+score;
    finJeu.classList.remove("cacher");
    finJeu.classList.add("flex");
    reponseFausse.classList.add("cacher");
}


// TIMER

/**
 * Met à jour le compte à rebours en affichant les secondes et les dixièmes de seconde.
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

function StartTimer(timeSeconds) {
    time = timeSeconds * 10;
    intervalId = setInterval(updateCountDown, 100);
}