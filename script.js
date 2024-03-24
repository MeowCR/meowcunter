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
        document.getElementById("ecran").textContent = `${operationEnCours} = ${resultat}`;
        nouvelleOperation = true;
    } catch (e) {
        document.getElementById("ecran").textContent = "Erreur";
        operationEnCours = '';
    }
}

function reset() {
    operationEnCours = '';
    document.getElementById("ecran").textContent = '0';
    nouvelleOperation = true;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= 0 && key <= 9) || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
        press(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        reset();
    }
});
