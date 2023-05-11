let boxesPerSide = 16;
let boxSide = `${800 / boxesPerSide}px`;
let painting = false;
let selectedColor = '';
let allowPainting = false;

//take the value from the slider for grid size and creates it
const rangeInput = document.querySelector('.box-number');
rangeInput.addEventListener('input', () => {
    boxesPerSide = rangeInput.value;
    boxSide = `${800 / boxesPerSide}px`;
    grid.innerHTML = ''; // clean the current grid
    createGrid(boxesPerSide); // create a new grid with the new value
});

//select color option
const colorRadioButtons = document.querySelectorAll('input[name="color"]');
function handleColorChange() {
    allowPainting = false;
    painting = false;
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
const grid = document.querySelector('.grid');
function createGrid(boxesPerSide) {
    resetRadioButtons() //black is selected by default   
    //show boxes number per side selected
    let textInput = document.querySelector('.input-text');
    textInput.textContent = `${boxesPerSide} x ${boxesPerSide}`;

    for (let i = 0; i < boxesPerSide * boxesPerSide; i++) {
        const box = document.createElement('div');
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
            };
            painting = !painting;
            allowPainting = true;
        });

        //paint each box when hover (depending on color choice)
        box.addEventListener('mouseover', () => {
            paint(box);
        });
    }
};
createGrid(boxesPerSide);

function paint(box) {
    if (allowPainting && painting) {
        if (selectedColor === "black") {
            box.style.backgroundColor = "black";
        } else if (selectedColor === "colors") {
            box.style.backgroundColor = getRandomColor();
        } else if (selectedColor === "darken") {

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
};

function resetRadioButtons() {
    colorRadioButtons.forEach((radioButton) => {
        if (radioButton.value === "black") {
            radioButton.checked = true;
            selectedColor = "black";
        }
    });
};

//reset grid to default size and painting status
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', resetGrid);
function resetGrid() {
    painting = false;
    rangeInput.value = 16;
    rangeInput.dispatchEvent(new Event('input')); // Triggers the 'input' event manually
};