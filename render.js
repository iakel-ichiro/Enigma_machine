var dial1_x;
var dial2_x;
var dial3_x;

function render() {

    render_dials();
    render_console();
}

function render_console() {
    textSize(16);
    textStyle(NORMAL);
    let test = "";
    if (input.value() !== "") {
        test = encrypt();
    }
    text("Console: " + test, 25, 190);
    noFill();
    stroke(50);
    rect(width / 2, 220, width * 0.95, 100);
}

function user_input() {
    input = createInput();
    input.position(20, 550);
}

function mouseWheel(event) {
    if ((mouseX > dial1_x - 20) && (mouseX < dial1_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        fast_rotor[1] = scroll_compute(fast_rotor[1]);
    } else if ((mouseX > dial2_x - 20) && (mouseX < dial2_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        medium_rotor[1] = scroll_compute(medium_rotor[1]);
    } else if ((mouseX > dial3_x - 20) && (mouseX < dial3_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        slow_rotor[1] = scroll_compute(slow_rotor[1]);
    }
}

function scroll_compute(index) {
    print(event.delta);
    //move the square according to the vertical scroll amount
    index += event.delta / 100;
    if (index > 25) {
        index = 0;
    }
    if (index < 0) {
        index = 25;
    }
    return index;
}

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
    text(fast_rotor[1]+1, dial1_x - 17.5, dial_y + 10);
    rect(dial2_x, dial_y, 40, 75);
    text(medium_rotor[1]+1, dial2_x - 17.5, dial_y + 10);
    rect(dial3_x, dial_y, 40, 75);
    text(slow_rotor[1]+1, dial3_x - 17.5, dial_y + 10);
    textSize(20);
    text(rotor_order[0], dial3_x - 5, dial_y + 60);
    text(rotor_order[1], dial2_x - 5, dial_y + 60);
    text(rotor_order[2], dial1_x - 5, dial_y + 60);
}
