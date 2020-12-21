var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet for initial encryption reference
var prev_len = 0;
// Plugboard Dictionary:
plugboard = {
    // "A": 'M',
    // "F": 'I',
    // "N": 'V',
    // "P": 'S',
    // "T": 'U',
    // "W": 'Z',
    // "G": 'V',
    // "H": 'Y',
    // "I": 'X',
    // "J": 'Y',
    // "K": 'Z',
}
// Reflector dictionary
reflectors = {
    "A": "EJMZALYXVBWFCRQUONTSPIKHGD",
    "B": "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    "C": "FVPJIAOYEDRZXWGCTKUQSBNMHL",
    "B*": "ENKQAUYWJICOPBLMDXZVFTHRGS",
    "C*": "RDOBJNTKVEHMLFCWZAXGYIPSUQ"
}
refl_n = 0;
// rotor dictionary contains three rotors:
rotors = { //[scramble, rotation index, turnover start, end, notched?]
    "0": ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0, 'Q', 'R', false, 'I'],
    "1": ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0, 'E', 'F', false, 'II'],
    "2": ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0, 'V', 'W', false, 'III'],
    "3": ["ESOVPZJAYQUIRHXLNFTGKDCMWB", 0, 'J', 'K', false, 'IV'],
    "4": ["VZBRGITYUPSDNHLXAWMJQOFECK", 0, 'Z', 'A', false, 'V'],
    "5": ["JPGVOUMFYQBENHZRDKASXLICTW", 0, 'ZM', 'AN', false, 'VI'],
    "6": ["NZJHGRCXMYSWBOUFAIVLPEKQDT", 0, 'ZM', 'AN', false, 'VII'],
    "7": ["FKQHTLXOCBJSPDZRAMEWNIUYGV", 0, 'ZM', 'AN', false, 'VIII'],
    "8": ["LEYJVCNIXWPBQMDRTAKZGFUHOS", 0, '', '', false, 'Beta'],
    "9": ["FSOKANUERHMBTIYCWLQPZXVGJD", 0, '', '', false, 'Gamma']
}
//       L,     M,    R
order = [0, 1, 2]; // Chosen Rotors and order in machine, left to right
// Encryption function
function rotor_encryptor(c_in, permutation) {
    print(permutation);
    let c_out;
    if (c_in == ' ') { // do not encrypt spaces leave them as is
        return c_in;
    } else {
        for (var k = 0; k < alph.length; k++) { // cycle through the reference array either alph or the previous rotor's scramble
            if (c_in.toUpperCase() == alph.charAt(k)) {
                // if input character == to letter in the array take the index number in that array and find its associate character from the current dials scramble and add to console.
                return permutation.charAt(k);
            }
        }
    }
}
// This function performs the encryption for all dials sequentially
function encrypt() {
    let c_in = input.value().charAt(input.value().length - 1); // input new character
    c_in = plug_switch(c_in);
    print(c_in);
    // pass through the right hand rotor
    let x = rotor_encryptor(c_in, rotors[order[2]][0]);
    print(x);
    // pass middle rotor
    let y = rotor_encryptor(x, rotors[order[1]][0]);
    print(y);
    // passes left rotor
    x = rotor_encryptor(y, rotors[order[0]][0]);
    print(x);
    // passes through reflector and is sent back
    y = rotor_encryptor(x, reflectors[Object.keys(reflectors)[refl_n]]);
    print(y);
    // passes back left rotor
    x = rotor_encryptor(y, invert(rotors[order[0]][0]));
    print(x);
    // pass back through middle rotor
    y = rotor_encryptor(x, invert(rotors[order[1]][0]));
    print(y);
    // pass back through the right hand rotor
    let c_out = rotor_encryptor(y, invert(rotors[order[2]][0]));
    print(c_out);
    return plug_switch(c_out);
}

function rotate_dial(l) {
    // Right dial rotation (order index 2)
    rotors[order[2]][1] = scroll_compute(rotors[order[2]][1], l, 2);
    // if rotation lands on notched point dial has reached turnover end point then turn the next dial
    if (alph[rotors[order[2]][1]] == rotors[order[2]][3]) {
        rotors[order[1]][1] = scroll_compute(rotors[order[1]][1], l, 1); // spins 2nd dial
    } else if (alph[rotors[order[1]][1]] == rotors[order[1]][3]) {
        rotors[order[0]][1] = scroll_compute(rotors[order[0]][1], l, 1); // spins third dial
    }
}


function plug_switch(char_in) {
    let char_out = char_in;
    for (let [key, value] of Object.entries(plugboard)) {
        if (char_in.toUpperCase() == key) {
            char_out = value;
        } else if (char_in.toUpperCase() == value) {
            char_out = key;
        }
    }
    return char_out;
}

function ring_pos(x, y, z) {
    for (var i = 1; i < x; i++) {
        scroll_compute(rotors[order[0]][1], -1, 0);
    }
    for (var k = 1; k < y; k++) {
        scroll_compute(rotors[order[1]][1], -1, 1);
    }
    for (var m = 1; m < z; m++) {
        scroll_compute(rotors[order[2]][1], -1, 2);
    }
}

function invert(permutation) {
    var new_perm = "";
    for (var i = 0; i < alph.length; i++) {
        for (var k = 0; k < alph.length; k++) {
            if (alph.charAt(i) == permutation.charAt(k)) {
                new_perm = concat(new_perm, alph.charAt(k));
            }
        }
    }
    return new_perm;
}
