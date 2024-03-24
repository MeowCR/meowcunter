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
        document.getElementById("ecran").innerHTML = operationEnCours + "<br><span id = 'result'>" + resultat + "</span>";
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
    const keyMap = {
        '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
        '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
        '8': 'eight', '9': 'nine', '+': 'plus', '-': 'minus',
        '*': 'multiply', '/': 'divide', 'Enter': 'equals', 'Backspace': 'back'
    };

    // Trouver le bouton correspondant
    const button = document.querySelector(`button[data-key="${keyMap[key]}"]`);
    if (button) {
        button.classList.add('button-pressed');
        // Supprimer la classe après un court délai pour simuler le relâchement du bouton
        setTimeout(() => button.classList.remove('button-pressed'), 100);

        // Appeler la fonction correspondante
        if (key === 'Enter') {
            event.preventDefault();
            calculate();
        } else if (key === 'Backspace') {
            event.preventDefault();
            remove();
        } else {
            press(key);
        }
    }
});
