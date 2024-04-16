// speedflag



// Dict de tout les pays
let pays = {
    "france": "fr",
    "ukraine": "ua",
    "allemagne": "de",
    "albanie": "al",
    "russie": "ru",
    "bolivie": "bo"
};

// Choisir un drapeau au hasard et l'afficher
function newDrapeau() {
    let nomsDesPays = Object.keys(pays);
    let paysAleatoire = nomsDesPays[Math.floor(Math.random() * nomsDesPays.length)];
    return paysAleatoire;
}

// Choisir et afficher le nouveau drapeau
function afficherDrapeau() {
    let temp = newDrapeau();
    let url = "https://flagcdn.com/w640/" + pays[temp] + ".jpg"

    // Afficher drapeau
    let img = document.getElementById("drapeauImg");
    img.src = url;
    return temp
}





// Savoir si la reponse est bonne
function estBon(pays, valeur) {

    let mys = document.getElementById("drapeauImg").src.split('/').pop().split('.').shift().toUpperCase();


    valeur = pays[valeur];
    mys = mys.toLowerCase();

    if (valeur == mys) {
        // Creer la div du pays deviner
        let nouvelleReponse = document.createElement("div");
        nouvelleReponse.classList.add("reponse");
        let paysDeviner = document.createElement("p");
        maDiv.style.display = "none"
        valeur = valeur.charAt(0).toUpperCase() + valeur.substring(1);
        paysDeviner.textContent = valeur;
        nouvelleReponse.appendChild(paysDeviner);

        // Affiche un nouveau drapeau
        let mys = afficherDrapeau()

        // Ajoute l'élément <div> contenant le paragraphe à la liste des réponses
        if (listeReponses.firstChild) {
            listeReponses.insertBefore(nouvelleReponse, listeReponses.firstChild);
        } else {
            listeReponses.appendChild(nouvelleReponse);
        }
    } else {
        maDiv.style.display = "";
    }
}






let maDiv = document.getElementById("faux");
let champTexte = document.getElementById("guess");

// Quand le texte est validé (entrée)
champTexte.addEventListener("keydown", function(event) {
    // Vérifie si la touche pressée est la touche "Entrée"
    if (event.key === "Enter") {
        //Empeche le reload
        event.preventDefault();
        // Récupère la valeur dans le champ de texte
        let valeur = champTexte.value;
        
        
        // Tester le pays
        estBon(pays, valeur)

        newDrapeau();

        //Efface le contenu du champ après validation
        champTexte.value = "";
        }
});




// Choisir un drapeau quand la page est chargé
document.addEventListener("DOMContentLoaded", afficherDrapeau);