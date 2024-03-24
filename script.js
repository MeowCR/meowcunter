let operationEnCours = ''; // Pour garder la trace de l'opération en cours
let nouvelleOperation = true; // Pour savoir si on commence une nouvelle opération

function press(symbole) {
    if (nouvelleOperation) {
        document.getElementById("ecran").textContent = '';
        nouvelleOperation = false;
    }
    operationEnCours += symbole;
    document.getElementById("ecran").textContent = operationEnCours;
}

function calculate() {
    try {
        if (operationEnCours.includes('/0')) {
            throw new Error("Division par zéro impossible");
        }
        const resultat = eval(operationEnCours);
        document.getElementById("ecran").textContent = `${operationEnCours} = ${resultat}`;
        nouvelleOperation = true;
    } catch (e) {
        document.getElementById("ecran").textContent = e.message; // Afficher le message d'erreur
        nouvelleOperation = true; // Réinitialiser pour une nouvelle opération
    }
}

function reset() {
    operationEnCours = '';
    document.getElementById("ecran").textContent = '0';
    nouvelleOperation = true;
}
