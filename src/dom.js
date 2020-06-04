let algSelect;
let hSelect;
let hSelectLabel;
let speedSelect;
let mazeButton;
let startButton;
let helpButton;
let clearButton;
let resetButton;
let modal;
let modalCloseButton;
let modalContentText;
let starttime;

function initDOM() {
    algSelect = document.getElementById("alg-select");
    hSelect = document.getElementById('heuristic-select');
    hSelectLabel = document.getElementById('heuristic-select-label');
    speedSelect = document.getElementById('speed-select');
    algSelect.onchange = function() {
        snackbarAlert(`${algSelect.value} selected`, snackbarTimeoutShort);
        currAlg = Algorithms[algSelect.value];

        if (currAlg !== Algorithms["A*"]) {
            hSelect.style.display = 'none';
            hSelectLabel.style.display = 'none';
        } else {
            hSelect.style.display = 'block';
            hSelectLabel.style.display = 'flex';
        }
    };

    hSelect.onchange = function() {
        snackbarAlert(`${hSelect.value} selected`, snackbarTimeoutShort);
        currHeuristic = Heuristic[hSelect.value];
    };

    speedSelect.onchange = () => {
        snackbarAlert(`${speedSelect.value} selected`, snackbarTimeoutShort);
        currSpeed = Speed[speedSelect.value];
    };

    mazeButton = document.getElementById("maze-button");
    resetButton = document.getElementById("reset-button");
    clearButton = document.getElementById("clear-button");
    startButton = document.getElementById("start-button");

    mazeButton.onclick = function() {
        snackbarAlert('Maze generated', snackbarTimeoutShort);
        generateMaze();
    };

    resetButton.onclick = function() {
        snackbarAlert('Everything removed', snackbarTimeoutShort);
        reset();
    };

    clearButton.onclick = function() {
        snackbarAlert('Clear path finding', snackbarTimeoutShort);
        clearPath();
    };

    startButton.onclick = function() {
        clearPath();
        starttime = millis();
        currSpeed = Speed['Fast'];
        startPathFinding(currAlg, currHeuristic);
    };






    document.addEventListener('contextmenu', e => e.preventDefault());
}

function snackbarAlert(msg, time) {
    let snackbar = document.getElementById('snackbar');

    snackbar.className = 'show';
    snackbar.innerText = msg;

    setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
    }, time);
}