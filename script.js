const container = document.querySelector("#container");

function createGrid (size) {

    // THIS SOLUTION WORKED, BUT DIDN'T ALWAYS CHANGE THE COLOUR ON 1ST MOUSEOVER (PRESUMABLY BECAUSE IT WAS TOO DEMANDING ON THE BROWSER)
    // // create size number of rows
    // for (let i = 0; i < size; i++) 
    // {
    //     // create a div for each row and append to container
    //     let row = document.createElement("div");
    //     row.style.height = `${(500/size)}px`;
    //     container.appendChild(row).id = `row${i}`;
    //         // fill the newly created row with size number of inline divs
    //         for (let j = 0; j < size; j++) 
    //         {
    //         let column = document.createElement("div");
    //         // cell class has inline display property (means cells stay on same line)
    //         column.className = "cell"
    //         column.style.width = `${(500/size)}px`;
    //         column.style.height = `${(500/size)}px`;
    //         let innerRow = document.getElementById(`row${i}`);
    //         innerRow.appendChild(column);
    //         }
    // }

    // // https://aholdrick.github.io/etch-a-sketch/

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
        container.appendChild(createCell);
    }

    let gridCell = document.querySelectorAll(".cell");

    gridCell.forEach((cell) => {cell.addEventListener ('mouseenter', () => 
    { cell.style.backgroundColor = "black";})
    });

};

createGrid (16);


const reset = document.getElementById("reset");
reset.addEventListener('click', () => resetGrid());

function resetGrid () {
    // delete old grid
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    //prompt user for new grid size and make a grid that size
    createGrid(prompt('How many squares per side should the new grid be?'));
}




