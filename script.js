let operationEnCours = '';
let nouvelleOperation = true;

function press(symbole) {
    if (nouvelleOperation) {
        document.getElementById("ecran").textContent = '';
        operationEnCours = ''; // Assurez-vous que l'opération en cours est également réinitialisée
        nouvelleOperation = false;
    }
    operationEnCours += symbole;
    document.getElementById("ecran").textContent = operationEnCours;
}

function calculate() {
    if (operationEnCours.includes('/0')) {
        document.getElementById("ecran").textContent = "Division par zéro impossible!";
        operationEnCours = ''; // Réinitialiser l'opération en cours
        nouvelleOperation = true;
        return;
    }
    try {
        const resultat = eval(operationEnCours);
        document.getElementById("ecran").innerHTML = operationEnCours + "<br><span id='result'>" + resultat + "</span>";
        operationEnCours = resultat.toString(); // Gardez le résultat pour des opérations futures
        nouvelleOperation = true; // Préparer pour une nouvelle opération après l'affichage du résultat
    } catch (e) {
        document.getElementById("ecran").textContent = "Erreur";
        operationEnCours = '';
        nouvelleOperation = true;
    }
}

function reset() {
    operationEnCours = '';
    document.getElementById("ecran").textContent = '0';
    nouvelleOperation = true;
}

function remove() {
    if (operationEnCours.length > 0) {
        operationEnCours = operationEnCours.slice(0, -1);
        document.getElementById("ecran").textContent = operationEnCours.length > 0 ? operationEnCours : '0';
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const ignoredKeys = ['Shift', 'CapsLock', 'Control', 'Alt', 'Tab', 'Meta'];

    // Empêcher le comportement par défaut pour certaines touches pour éviter des effets indésirables dans le navigateur
    if (['Enter', 'Backspace', ' '].includes(key)) {
        event.preventDefault();
    }

    // Ignorer les touches spécifiques
    if (ignoredKeys.includes(key)) {
        return; // Ne fait rien si la touche pressée est dans la liste des touches ignorées
    }

    const keyMap = {
        '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
        '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
        '8': 'eight', '9': 'nine', '+': 'plus', '-': 'minus',
        '*': 'multiply', '/': 'divide', 'Enter': 'equals', 'Backspace': 'back', ' ': 'reset',
        '=': 'equals', '.': 'dot'
    };

    // Traitement spécifique pour les touches 'Enter', 'Backspace', et ' '
    if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        remove();
    } else if (key === ' ') {
        reset();
    } else {
        // Pour les autres touches, trouver le bouton correspondant et simuler un clic
        const buttonKey = keyMap[key];
        const button = document.querySelector(`button[data-key="${buttonKey}"]`);
        if (button) {
            button.click();
        }
    }
});
