let grid = document.querySelector('.grid')
let boxesPerGrid = 16;
let boxSide = `${80 / boxesPerGrid}rem`;
let painting = false;
let selectedColor = '';

//take the value from the slider
let rangeInput = document.querySelector('.box-number');
rangeInput.addEventListener('input', () => {
    boxesPerGrid = rangeInput.value;
    boxSide = `${80 / boxesPerGrid}rem`;
    grid.innerHTML = ''; // clean the current grid
    createGrid(boxesPerGrid); // create a new grid with the new value
});

//select color option
let colorRadioButtons = document.querySelectorAll('input[name="color"]');
function handleColorChange() {
    colorRadioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            selectedColor = radioButton.value;
        }
    });
}
colorRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', handleColorChange);
});


// Create the grid and let user draw
function createGrid(boxesPerGrid) {
    //show boxes number per side selected
    let textInput = document.querySelector('.input-text');
    textInput.textContent = `${boxesPerGrid} x ${boxesPerGrid}`

    grid.style.display = 'flex';
    grid.style.flexWrap = 'wrap';
    for (let i = 0; i < boxesPerGrid * boxesPerGrid; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.style.width = boxSide;
        box.style.height = boxSide;
        grid.appendChild(box);

        //paint box when click (depending on color choice)
        box.addEventListener('click', () => {
            if (selectedColor === "black") {
                box.style.backgroundColor = "black";
            } else if (selectedColor === "colors") {
                box.style.backgroundColor = getRandomColor();
            } else if (selectedColor === "erase") {
                box.style.backgroundColor = "rgb(190, 214, 219)";
            }
            painting = !painting;
        });

        //paint each box when hover (depending on color choice)
        box.addEventListener('mouseover', () => {
            paint(box);
        });
    }
};
createGrid(boxesPerGrid);

//reset grid to start fresh without reloading de whole page
let resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetGrid);

function resetGrid() {
    let boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.backgroundColor = "rgb(190, 214, 219)";
    });
}

function paint(box) {
    if (painting) {
        if (selectedColor === "black") {
            box.style.backgroundColor = "black";
        } else if (selectedColor === "colors") {
            box.style.backgroundColor = getRandomColor();
        } else if (selectedColor === "erase") {
            box.style.backgroundColor = "rgb(190, 214, 219)";
        }
    }
};

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}