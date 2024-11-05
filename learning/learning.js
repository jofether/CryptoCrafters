let currentBoxIndex = 0; // Track the current box index
const boxes = [document.getElementById("box1"), document.getElementById("box2"), document.getElementById("box3"), document.getElementById("box4"), 
    document.getElementById("box5"), document.getElementById("box6"), document.getElementById("box7"), document.getElementById("box8"), document.getElementById("box9"),  document.getElementById("box10"), document.getElementById("box11"), document.getElementById("box12"), document.getElementById("box13")

];

function toggleFlexbox(direction) {
    // Hide the currently visible box
    boxes[currentBoxIndex].classList.add("hidden");
    boxes[currentBoxIndex].classList.remove("visible");

    // Update the current box index based on the direction
    if (direction === "down") {
        currentBoxIndex = (currentBoxIndex + 1) % boxes.length; // Loop back to the first box
    } else if (direction === "up") {
        currentBoxIndex = (currentBoxIndex - 1 + boxes.length) % boxes.length; // Loop back to the last box
    }

    // Show the next box
    boxes[currentBoxIndex].classList.add("visible");
    boxes[currentBoxIndex].classList.remove("hidden");
}

// Initialize by showing the first box
boxes[currentBoxIndex].classList.add("visible");

// Add event listener for keydown events
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown") {
        toggleFlexbox("down");
    } else if (event.key === "ArrowUp") {
        toggleFlexbox("up");
    }
});
