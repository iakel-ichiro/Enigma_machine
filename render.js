
var i = 1;
var j = 1;
var k = 1;
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
    let test = encrypt();
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
        i = scroll_compute(i)
    } else if ((mouseX > dial2_x - 20) && (mouseX < dial2_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        j = scroll_compute(j)
    } else if ((mouseX > dial3_x - 20) && (mouseX < dial3_x + 20) && (mouseY > dial_y - 40) && (mouseY < dial_y + 40)) {
        k = scroll_compute(k)
    }
}

function scroll_compute(index) {
    print(event.delta);
    //move the square according to the vertical scroll amount
    index += event.delta / 100;
    if (index > 2) {
        index = 0;
    }
    if (index < 0) {
        index = 2;
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
    text(fast_rotor[i], dial1_x - 10, dial_y + 10);
    rect(dial2_x, dial_y, 40, 75);
    text(medium_rotor[j], dial2_x - 10, dial_y + 10);
    rect(dial3_x, dial_y, 40, 75);
    text(slow_rotor[k], dial3_x - 10, dial_y + 10);
}
