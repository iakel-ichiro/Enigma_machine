// Code Simulating The Enigma Machine


function setup() {
    // Sets the screen to be 720 pixels wide and 400 pixels high
    createCanvas(720, 800);
    background(255);
    user_input(); // creates box to type, string = input.value();
    ring_pos(0 , 0, 0);
}

function draw() {
    background(255);
    render(); // initiates rendering functions
}
