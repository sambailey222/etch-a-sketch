const container = document.querySelector("#container");

function createGrid (size) {
    
    // FIRST GENERATE THE GRID, THEN POPULATE WITH SQUARE DIVS
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;
    // The above generates size amount of columns columns of automatic width (based on how many columns there are)
    // e.g. if you wrote repeat(20, 25px) you'd get 20 columns of width 25px.
    container.style.gridTemplateRows = `repeat(${size}, auto)`;
    // the above generates size amount of rows with automatic height (to fill space).
    // note if you don't put auto above, the grid will rely on the "for" loop to know how high to make the squares. try changing the multiplier in the for loop to see how this works. 
    for (let i = 0; i < size * size; i++) {
        // loop through the entire grid creating divs
        let createCell = document.createElement('div');
        // add class giving them 100% width/height (otherwise they won't show. likewise if you write 50% they will only show half)
        createCell.className = 'cell';
        // append each div to the grid 
        createCell.id = `${i}`;
        container.appendChild(createCell);
    }

};

// ---- RESET GRID ---- //
const reset = document.getElementById("reset");
reset.addEventListener('click', () => resetGrid());

function resetGrid () {
    // delete old grid
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    //prompt user for new grid size and make a grid that size
    createGrid(promptGrid());
    bgBlack();
}

// get grid size from user, reprompt if necessary
function promptGrid() {
    let input = prompt('How many squares per side should the new grid be? Please enter a value between 2 and 64.')
    if (input < 2 || input > 64) {
        alert('The value must be between 2 and 64.');
        promptGrid();
    } else {
        return input;
    }
}

// ---- RANDOM COLOUR ---- //
const random = document.getElementById("random");
random.addEventListener('click', () => bgRandom());

// random colour generator
function randomColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let randomBgColor = `rgb(${x},${y},${z})`;
    return randomBgColor;
}

// set background colour to random on mouseenter
function randomListener () {
    this.style.opacity = 1;
    this.style.backgroundColor = randomColor();
    this.classList.add("noshade");
}

// apply to all cells, wipe all other listeners
function bgRandom () 
{
    let gridCell = document.querySelectorAll(".cell");
    gridCell.forEach((cell) => 
    {
        cell.removeEventListener ('mouseenter', shadeListener);
        cell.removeEventListener ('mouseenter', bgBlackListener);
        cell.removeEventListener ('mouseenter', randomListener);
        cell.addEventListener ('mouseenter', randomListener);
    })
};

// ---- BLACK ---- //
const black = document.getElementById("black");
black.addEventListener('click', () => bgBlack());

// make cells black on mouseover
function bgBlackListener() {
    this.style.opacity = 1;
    this.style.backgroundColor = "black";
    this.classList.add("noshade");
}

// apply to all cells, wipe all other listeners
function bgBlack() {
    let gridCell = document.querySelectorAll(".cell");
    
    gridCell.forEach((cell) => {
        cell.removeEventListener ('mouseenter', shadeListener);
        cell.removeEventListener ('mouseenter', bgBlackListener);
        cell.removeEventListener ('mouseenter', randomListener);
        cell.addEventListener ('mouseenter', bgBlackListener);
   
    });
}

// ---- SHADING ---- //
const shade = document.getElementById("shade");
shade.addEventListener('click', () => shadeGrid());

function shadeListener () {
// shade cells by increasing opacity by 1 on mouseenter
    let oldOp = this.style.opacity;
    oldOp = Number.parseFloat(oldOp);
    newOp = oldOp + 0.1;
    this.style.opacity = newOp; 
    // add class to stop previously shaded cells getting wiped by for loop
    this.classList.add("noshade");
    // add class to allow previously shaded cells to be reshaded
    this.classList.add("shadeAgain");
}

function shadeGrid () {
    let emptyCell = document.querySelectorAll(".cell:not(.noshade)");
    // set opacity of "untouched" cells to 0.
    for (let i = 0; i < emptyCell.length; i++) 
    {
        emptyCell[i].style.backgroundColor = "black";
        emptyCell[i].style.opacity = "0";
      
    }
    // shade untouched cells only
    emptyCell.forEach((cell) => {
        cell.removeEventListener ('mouseenter', shadeListener);
        cell.removeEventListener ('mouseenter', bgBlackListener);
        cell.removeEventListener ('mouseenter', randomListener);
        cell.addEventListener ('mouseenter', shadeListener);
    });
    // remove listeners on ALL cells already touched
    let shadedGrid = document.querySelectorAll(".noshade");
    shadedGrid.forEach((cell) => {
        cell.removeEventListener ('mouseenter', shadeListener);
        cell.removeEventListener ('mouseenter', bgBlackListener);
        cell.removeEventListener ('mouseenter', randomListener);
    });
    // add new listener to continue shading previously shaded cells
    let reShade = document.querySelectorAll(".shadeAgain");
    reShade.forEach((cell) => {
        cell.addEventListener ('mouseenter', shadeListener);
    });
}

// ---- PROGRAM START ---- //
// generate starting grid
createGrid (16);
// give black etch as default
bgBlack();

// https://stackoverflow.com/questions/36805322/store-change-and-update-opacity-using-javascript
