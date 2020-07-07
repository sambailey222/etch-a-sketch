const container = document.querySelector("#container");

// create one div
// create loop to create rows x 16
// create loop within that to create colunns x 16
// 

// let square = document.createElement("div");
// square.innerHTML = "1";
// console.log(square);



function createRow (size) {
    // create size number of rows
    for (let i = 0; i < size; i++) 
    {
        // create a div for each row and append to container
        let row = document.createElement("div");
        container.appendChild(row).id = `row${i}`;
            // fill the newly created row with size number of inline divs
            for (let j = 0; j < size; j++) 
            {
            let column = document.createElement("div");
            // cell class has inline display property (means cells stay on same line)
            column.className = "cell"
            let innerRow = document.getElementById(`row${i}`);
            innerRow.appendChild(column);
            }
    }
};

createRow (16);


// create 16 divs (rows)
// loop over each row and append a child div within it (column)
// do this 16 times (to create 16 columns)

// has to be this was as it processes each row left to right, not each column top to bottom