// Dial box dimensions and positions
var dial1_x;
var dial2_x;
var dial3_x;
var output = "";

function render() {
    render_dials();
    render_console();
}

// Function calls the encryption functiona nd prints results
function render_console() {
    textSize(16);
    textStyle(NORMAL);
    let l = input.value().length - prev_len;
    if (l > 0) {
        rotate_dial(l)
        output = concat(output, encrypt());
    } else if (l < 0) {
        rotate_dial(l)
        output = output.slice(0, -1);
    }
    prev_len = input.value().length;

    text("Console: " + output, 25, 190); // type out encryption into Console:
    text("Rotor A: " + alph, 25, 220);
    text("Rotor 3: " + rotors[order[2]][0], 25, 240);
    text("Rotor 2: " + rotors[order[1]][0], 25, 260); // type out encryption into Console:
    text("Rotor 1: " + rotors[order[0]][0], 25, 280); // type out encryption into Console:
    text("Refle A: " + reflectors['A'], 25, 300); // type out encryption into Console:
    noFill();
    stroke(50);
    rect(width / 2, 240, width * 0.95, 150);
}

// Function to create user input text box
function user_input() {
    input = createInput();
    input.position(20, 550);
}

// Function to interact with dial indexing
function mouseWheel(event) {
    if ((mouseX > dial1_x - 20) && (mouseX < dial1_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        rotors[order[0]][1] = scroll_compute(rotors[order[0]][1], event.delta, 0);
    } else if ((mouseX > dial2_x - 20) && (mouseX < dial2_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        rotors[order[1]][1] = scroll_compute(rotors[order[1]][1], event.delta, 1);
    } else if ((mouseX > dial3_x - 20) && (mouseX < dial3_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        rotors[order[2]][1] = scroll_compute(rotors[order[2]][1], event.delta, 2);
    } else if ((mouseX > 100 - 20) && (mouseX < 100 + 20) && (mouseY > dial_y - 20) && (mouseY < dial_y + 20)) {
        refl_n += event.delta/100;
        if (refl_n > 4) {
            refl_n = 0;
        } else if( refl_n < 0) {
            refl_n = 4;
        }
    }

}

function scroll_compute(index, increment, r_n) {
    //move the square according to the vertical scroll amount
    if (abs(increment) == 100) {
        increment = increment / 100;
    }
    index += increment;
    if (increment > 0){
        rotors[order[r_n]][0] = rotors[order[r_n]][0].charAt(25) + rotors[order[r_n]][0];
        rotors[order[r_n]][0] = rotors[order[r_n]][0].slice(0, -1);
    } else if (increment < 0){
        rotors[order[r_n]][0] =  rotors[order[r_n]][0] + rotors[order[r_n]][0].charAt(0);
        rotors[order[r_n]][0] = rotors[order[r_n]][0].slice(1);
    }
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
    //Rotor Index Dials
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
    //Rotor Order
    textSize(20);
    text(order[0], dial1_x - 5, dial_y + 60);
    text(order[1], dial2_x - 5, dial_y + 60);
    text(order[2], dial3_x - 5, dial_y + 60);
    //Reflector Type Dial
    stroke(50);
    strokeWeight(2);
    noFill();
    ellipseMode(CENTER)
    ellipse(100, dial_y, 40, 40);
    text(Object.keys(reflectors)[refl_n], 100 - 6, dial_y + 7);

}
