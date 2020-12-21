// Dial box dimensions and positions
var dial1_x;
var dial2_x;
var dial3_x;

function render() {
    render_dials();
    render_console();
}

// Function calls the encryption functiona nd prints results
function render_console() {
    textSize(16);
    textStyle(NORMAL);
    let x = "";
    rotate_dial()
    if (input.value() !== "") { // only perform encryption if text is entered
        x = encrypt();
    }

    text("Console: " + x, 25, 190); // type out encryption into Console:
    text("Tests: " +  input.value().length, 25, 220); // type out encryption into Console:
    noFill();
    stroke(50);
    rect(width / 2, 220, width * 0.95, 100);
}

// Function to create user input text box
function user_input() {
    input = createInput();
    input.position(20, 550);
}

// Function to interact with dial indexing
function mouseWheel(event) {
    if ((mouseX > dial1_x - 20) && (mouseX < dial1_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        rotors[order[0]][1] = scroll_compute(rotors[order[0]][1], event.delta);
        update_i_pos();
    } else if ((mouseX > dial2_x - 20) && (mouseX < dial2_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        rotors[order[1]][1] = scroll_compute(rotors[order[1]][1], event.delta);
        update_i_pos();
    } else if ((mouseX > dial3_x - 20) && (mouseX < dial3_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        rotors[order[2]][1] = scroll_compute(rotors[order[2]][1], event.delta);
        update_i_pos();
    }
}

function scroll_compute(index, increment) {
    //move the square according to the vertical scroll amount
    print(increment)
    if (abs(increment) == 100) {
        increment = increment / 100;
    }
    index += increment;
    // increments can be large due to length of input, how to convert them into the 0-25 rotation index.
    if (index > 25) {
        index = 0;
    }
    if (index < 0) {
        index = 25;
    }
    return index;
}

// Render Dias and print rotor rotation index number and position in bold below
function render_dials() {
    dial1_x = width / 3;
    dial2_x = width / 2;
    dial3_x = (2 * width / 3);
    dial_y = height / 8;
    textSize(32);
    fill(50);
    text('Enigma Machine', 10, 30);
    stroke(50);
    strokeWeight(2);
    noFill();
    rectMode(CENTER)
    rect(dial1_x, dial_y, 40, 80);
    text(alph[rotors[order[0]][1]], dial1_x - 10, dial_y + 10);
    rect(dial2_x, dial_y, 40, 75);
    text(alph[rotors[order[1]][1]], dial2_x - 10, dial_y + 10);
    rect(dial3_x, dial_y, 40, 75);
    text(alph[rotors[order[2]][1]], dial3_x - 10, dial_y + 10);
    textSize(20);
    text(order[0], dial1_x - 5, dial_y + 60);
    text(order[1], dial2_x - 5, dial_y + 60);
    text(order[2], dial3_x - 5, dial_y + 60);

}
