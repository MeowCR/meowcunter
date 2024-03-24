let operationEnCours = '';
let nouvelleOperation = true;

function press(symbole) {
    if (nouvelleOperation) {
        document.getElementById("ecran").textContent = '';
        nouvelleOperation = false;
    }
    operationEnCours += symbole;
    document.getElementById("ecran").textContent = operationEnCours;
}

function calculate() {
    if (operationEnCours.includes('/0')) {
        alert("Division par zéro impossible!");
        reset();
        return;
    }
    try {
        const resultat = eval(operationEnCours);
        // Utiliser innerHTML pour inclure un saut de ligne <br> entre l'opération et le résultat
        document.getElementById("ecran").innerHTML = operationEnCours + "<br>" + resultat;
        operationEnCours = ''; // Optionnel : Réinitialiser l'opération en cours
        nouvelleOperation = true; // Préparer pour une nouvelle opération après l'affichage du résultat
    } catch (e) {
        document.getElementById("ecran").textContent = "Erreur";
        operationEnCours = '';
        nouvelleOperation = true;
    }
}

function press(symbole) {
    if (nouvelleOperation) {
        document.getElementById("ecran").textContent = ''; // Réinitialiser complètement l'écran pour une nouvelle opération
        operationEnCours = ''; // Assurez-vous que l'opération en cours est également réinitialisée
        nouvelleOperation = false;
    }
    operationEnCours += symbole;
    document.getElementById("ecran").textContent = operationEnCours;
}

function reset() {
    operationEnCours = '';
    document.getElementById("ecran").textContent = '0';
    nouvelleOperation = true;
}

function remove() {
    if (operationEnCours.length > 0) {
        operationEnCours = operationEnCours.slice(0, -1); // Supprimer le dernier caractère
        document.getElementById("ecran").textContent = operationEnCours.length > 0 ? operationEnCours : '0';
    }
}


document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
        press(key);
    } else if (key === 'Escape') {
        reset();
    } else if (key === 'Backspace') {
        event.preventDefault(); // Empêcher le comportement par défaut du navigateur
        remove(); // Appeler la fonction remove() pour supprimer le dernier caractère
    }
});
