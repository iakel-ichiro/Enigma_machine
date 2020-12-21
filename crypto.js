var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet for initial encryption reference
var i_pos = [0, 0, 0]; // boolean to make sure only updates it once during a blank input
// rotor dictionary contains three rotors:
rotors = { // Three Rotors: Fast, med, slow. [scramble, rotation index, turnover start, end, notched?]
    "1": ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0, 'Q', 'R', false], //fast
    "2": ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0, 'E', 'F', false], //med
    "3": ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0, 'V', 'W', false] // slow
}
//       L, M, R
order = [1, 2, 3]; // Chosen Rotors and order in machine, left to right
// Encryption function
function rotor_encryptor(parse, r_n, arr = alph) {
    permutation = rotors[r_n][0]; // Access the scramble from specified rotor
    encryption = "";
    for (var i = 0; i < parse.length; i++) { // cycle through each letter of input text
        if (parse.charAt(i) == ' ') { // do not encrypt spaces leave them as is
            encryption = concat(encryption, parse.charAt(i));
        }
        for (var k = 0; k < arr.length; k++) { // cycle through the reference array either alph or the previous rotor's scramble
            if (parse.charAt(i).toUpperCase() == arr.charAt(k)) {
                // if input character == to letter in the array take the index number in that array and find its associate character from the current dials scramble and add to console.
                encryption = concat(encryption, permutation.charAt(k));
            }
        }
    }
    return encryption;
}
// This function performs the encryption for all dials sequentially, subbing in the previous dial as the reference array after the first dial.
//There is the possibility that it is not necassary to sub in reference arrays and leave them all as alphabet, but i think this is right.
function encrypt() {

    var x = rotor_encryptor(input.value(), order[2]);
    var y = rotor_encryptor(x, order[1], rotors[2][0]);
    return rotor_encryptor(y, order[0], rotors[1][0]);
}

function rotate_dial() {
    let l = input.value().length;
    for (var i = 0; i <= l; i++) {
        rotors[order[2]][1] = scroll_compute(i_pos[2], i);
        // if (alph[rotors[order[2]][1]] == rotors[order[2]][3]) { // if rotor index = turnover end
        //     if (rotors[order[2]][4]) { // check to see if it has been notched by turnover start
        //         rotors[order[1]][1] = scroll_compute(rotors[order[1]][1], 1);
        //
        //     }
        // }
    }

}

function update_i_pos() {
    i_pos[2] = rotors[order[2]][1];
    i_pos[1] = rotors[order[1]][1];
    i_pos[0] = rotors[order[0]][1];
}
