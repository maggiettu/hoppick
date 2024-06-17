const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

// Adjust canvas size based on window size and offsets
canvas.width = window.innerWidth - canvasOffsetX - 70;
canvas.height = window.innerHeight - canvasOffsetY - 90;

let isPainting = false;
let lineW = 5;
let startX;
let startY;
let roundCount = 0;

// Set initial line width and color
ctx.lineWidth = lineW;
ctx.strokeStyle = '#000000'; // Initial stroke color

// Event listener for input range to change line width
document.getElementById("ageInputId").addEventListener('input', function() {
    lineW = this.value;
    document.getElementById("ageOutputId").innerHTML = lineW;
    ctx.lineWidth = lineW;
});

// Event listener for toolbar buttons and inputs
toolbar.addEventListener('click', function(e) {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (e.target.id === 'erase') {
        ctx.strokeStyle = '#f2ede1';
    }

    if (e.target.id === 'paint') {
        ctx.strokeStyle = '#000000';
    } 
});

toolbar.addEventListener('input', function(e) {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineW = e.target.value;
        ctx.lineWidth = lineW;
    }
});

// Function to draw on canvas
const draw = (e) => {
    if (!isPainting) {
        return;
    }

    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
};

// Event listeners for mouse interactions
canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX - canvasOffsetX;
    startY = e.clientY - canvasOffsetY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
});

canvas.addEventListener('mouseup', (e) => {
    isPainting = false;
    ctx.closePath();
});

canvas.addEventListener('mousemove', draw);


document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('timer');
    const popupMenu = document.getElementById('popupMenu');
    const okayButton = document.getElementById('okayButton');
    
    let timeLeft = 60;
    let countdown; // Variable to hold the countdown interval
    
    function startTimer() {
      clearInterval(countdown); // Clear any existing interval
      timeLeft = 60;
      timerDisplay.textContent = timeLeft;
      
      countdown = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (roundCount == 9) {
            popupMenu.style.display = 'none';
            endMenu.style.display = 'block';
        } 
        if (timeLeft <= 0) {
          clearInterval(countdown);
          popupMenu.style.display = 'block';
        }

      }, 1000);
    }
    
    okayButton.addEventListener('click', function() {
      popupMenu.style.display = 'none'; 
      startTimer();
      roundCount = roundCount +1;
      
    });

    startButton.addEventListener('click', function() {
        popupMenu.style.display = 'none'; 
        startMenu.style.display = 'none'; 
        startTimer(); 
    });

    saveButton.addEventListener('click', function() {
        let data = canvas.toDataURL("imag/png");
        let a = document.createElement("a");
        a.href = data;
        a.download = "masterpiece.png";
        a.click();
    });
    
    // initial page 
    startMenu.style.display = 'block';
    // Start the initial timer
    if (popupMenu.style.display != 'block') {
        startTimer();
    }

    

    
  });