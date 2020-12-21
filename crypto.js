var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet for initial encryption reference
var prev_len = 0;
// rotor dictionary contains three rotors:
rotors = { // Three Rotors: Fast, med, slow. [scramble, rotation index, turnover start, end, notched?]
    "1": ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0, 'Q', 'R', false],
    "2": ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0, 'E', 'F', false],
    "3": ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0, 'V', 'W', false]
}
//       L, M, R
order = [1, 2, 3]; // Chosen Rotors and order in machine, left to right
// Encryption function
function rotor_encryptor(c_in, r_n, arr) {
    permutation = rotors[r_n][0]; // Access the scramble from specified rotor
    print(permutation);
    let c_out;
    if (c_in == ' ') { // do not encrypt spaces leave them as is
        return c_in;
    } else {
        for (var k = 0; k < arr.length; k++) { // cycle through the reference array either alph or the previous rotor's scramble
            if (c_in.toUpperCase() == arr.charAt(k)) {
                // if input character == to letter in the array take the index number in that array and find its associate character from the current dials scramble and add to console.
                return permutation.charAt(k);
            }
        }
    }
}
// This function performs the encryption for all dials sequentially, subbing in the previous dial as the reference array after the first dial.
//There is the possibility that it is not necassary to sub in reference arrays and leave them all as alphabet, but i think this is right.
function encrypt() {
    let c_in = input.value().charAt(input.value().length - 1);
    let x = rotor_encryptor(c_in, order[2], alph);
    let y = rotor_encryptor(x, order[1], rotors[order[2]][0]);
    return rotor_encryptor(y, order[0], rotors[order[1]][0]);
}

function rotate_dial(l) {
    rotors[order[2]][1] = scroll_compute(rotors[order[2]][1], l);
    // if (alph[rotors[order[2]][1]] == rotors[order[2]][3]) { // if rotor index = turnover end
    //     if (rotors[order[2]][4]) { // check to see if it has been notched by turnover start
    //         rotors[order[1]][1] = scroll_compute(rotors[order[1]][1], 1);
    //
    //     }
    // }

}
