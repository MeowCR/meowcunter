// Initialisation des variables globales
let operationEnCours = ''; // Stocke l'opération mathématique en cours
let nouvelleOperation = true; // Indique si une nouvelle opération commence

// Fonction appelée lorsqu'un bouton de chiffre ou d'opérateur est pressé
function press(symbole) {
    if (nouvelleOperation) { // Si c'est le début d'une nouvelle opération
        document.getElementById("ecran").textContent = ''; // Réinitialise l'affichage
        operationEnCours = ''; // Réinitialise l'opération en cours
        nouvelleOperation = false; // Indique que l'opération a commencé
    }
    operationEnCours += symbole; // Ajoute le symbole au string de l'opération
    document.getElementById("ecran").textContent = operationEnCours; // Met à jour l'affichage
}

// Fonction pour calculer le résultat de l'opération en cours
function calculate() {
    if (operationEnCours.includes('/0')) { // Vérifie si la division par zéro est tentée
        document.getElementById("ecran").textContent = "Division par zéro impossible!";
        operationEnCours = ''; // Réinitialise l'opération
        nouvelleOperation = true; // Prépare pour une nouvelle opération
        return; // Quitte la fonction pour ne pas continuer
    }
    try {
        const resultat = eval(operationEnCours); // Calcule le résultat de l'opération
        // Affiche l'opération et le résultat séparément
        document.getElementById("ecran").innerHTML = operationEnCours + "<br><span id='result'>" + resultat + "</span>";
        operationEnCours = ''; // Réinitialise l'opération en cours
        nouvelleOperation = true; // Prépare pour une nouvelle opération
    } catch (e) {
        document.getElementById("ecran").textContent = "Erreur"; // En cas d'erreur dans l'opération
        operationEnCours = '';
        nouvelleOperation = true;
    }
}

// Fonction pour réinitialiser la calculatrice
function reset() {
    operationEnCours = ''; // Efface l'opération en cours
    document.getElementById("ecran").textContent = '0'; // Réinitialise l'affichage à 0
    nouvelleOperation = true; // Prépare pour commencer une nouvelle opération
}

// Fonction pour supprimer le dernier caractère entré
function remove() {
    if (operationEnCours.length > 0) { // Si l'opération n'est pas vide
        operationEnCours = operationEnCours.slice(0, -1); // Supprime le dernier caractère
        // Met à jour l'affichage, ou affiche 0 si l'opération est vide
        document.getElementById("ecran").textContent = operationEnCours.length > 0 ? operationEnCours : '0';
    }
}

// Gestionnaire d'événements pour les touches du clavier
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const ignoredKeys = ['Shift', 'CapsLock', 'Control', 'Alt', 'Tab', 'Meta'];

    if (ignoredKeys.includes(key)) {
        return; // Ignore les touches spécifiées
    }

    event.preventDefault(); // Empêche le comportement par défaut pour toutes les touches gérées

    // Cartographie des touches du clavier aux actions de la calculatrice et à leur effet visuel
    const keyMap = {
        '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
        '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
        '8': 'eight', '9': 'nine', '+': 'plus', '-': 'minus',
        '*': 'multiply', '/': 'divide', 'Enter': 'equals', 'Backspace': 'back', ' ': 'reset',
        '=': 'equals', '.': 'dot'
    };

    // Exécution des actions spécifiques
    if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        remove();
    } else if (key === ' ') {
        reset();
    }

    // Applique l'effet "pressed" pour toutes les touches, y compris "Enter", "Backspace" et "Espace"
    const actionKey = keyMap[key];
    const button = document.querySelector(`button[data-key="${actionKey}"]`);
    if (button) {
        button.click(); // Simule un clic sur le bouton correspondant
        button.classList.add('button-pressed');
        setTimeout(() => button.classList.remove('button-pressed'), 150);
    }
});
