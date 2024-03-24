let operationEnCours = '';
let nouvelleOperation = true;

function press(symbole) {
    if (nouvelleOperation) {
        document.getElementById("ecran").textContent = '';
        operationEnCours = '';
        nouvelleOperation = false;
    }
    operationEnCours += symbole;
    document.getElementById("ecran").textContent = operationEnCours;
}

function calculate() {
    if (operationEnCours.includes('/0')) {
        document.getElementById("ecran").textContent = "Division par zéro impossible!";
        operationEnCours = '';
        nouvelleOperation = true;
        return;
    }
    try {
        const resultat = eval(operationEnCours);
        document.getElementById("ecran").innerHTML = operationEnCours + "<br><span id='result'>" + resultat + "</span>";
        operationEnCours = '';
        nouvelleOperation = true;
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

    if (ignoredKeys.includes(key)) {
        return;
    }

    if (['Enter', 'Backspace', ' '].includes(key)) {
        event.preventDefault();
    }

    const keyMap = {
        '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
        '4': 'four', '5': 'five', '6': 'six', '7': 'seven',
        '8': 'eight', '9': 'nine', '+': 'plus', '-': 'minus',
        '*': 'multiply', '/': 'divide', 'Enter': 'equals', 'Backspace': 'back', ' ': 'reset',
        '=': 'equals', '.': 'dot'
    };

    const buttonKey = keyMap[key];
    const button = document.querySelector(`button[data-key="${buttonKey}"]`);

    if (button) {
        button.classList.add('button-pressed');
        setTimeout(() => button.classList.remove('button-pressed'), 150);

        switch (key) {
            case 'Enter':
                calculate();
                break;
            case 'Backspace':
                remove();
                break;
            case ' ':
                reset();
                break;
            default:
                press(key);
                break;
        }
    }
});
