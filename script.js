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
    const key = event.key; // La touche pressée
    const ignoredKeys = ['Shift', 'CapsLock', 'Control', 'Alt', 'Tab', 'Meta']; // Liste des touches à ignorer

    if (ignoredKeys.includes(key)) {
        return; // Ignore les touches spécifiées
    }

    event.preventDefault(); // Empêche le comportement par défaut pour toutes les touches gérées

    // Cartographie des touches du clavier aux actions de la calculatrice
    const keyMap = {
        '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
        '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
        '8': 'eight', '9': 'nine', '+': 'plus', '-': 'minus',
        '*': 'multiply', '/': 'divide', '=': 'equals', '.': 'dot'
    };

    // Gère spécifiquement les touches "Enter", "Backspace" et "Espace"
    if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        remove();
    } else if (key === ' ') {
        reset();
    } else {
        // Pour les chiffres et les opérateurs, trouve le bouton correspondant et simule un clic
        const actionKey = keyMap[key] || key; // Utilise la touche directement si elle n'est pas dans keyMap
        const button = document.querySelector(`button[data-key="${actionKey}"]`);
        if (button) {
            button.click(); // Simule un clic sur le bouton correspondant
            button.classList.add('button-pressed'); // Ajoute visuellement l'effet "pressed"
            setTimeout(() => button.classList.remove('button-pressed'), 150); // Enlève l'effet "pressed" après un court délai
        }
    }
});
