var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet for initial encryption reference
var prev_len = 0;
// rotor dictionary contains three rotors:
rotors = { // Three Rotors: Fast, med, slow. [scramble, rotation index, turnover start, end, notched?]
    "1": ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0, 'Q', 'R', false],
    "2": ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0, 'E', 'F', false],
    "3": ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0, 'B', 'D', false]
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
// This function performs the encryption for all dials sequentially
function encrypt() {
    let c_in = input.value().charAt(input.value().length - 1);
    let x = rotor_encryptor(c_in, order[2], alph);
    let y = rotor_encryptor(x, order[1], alph);
    return rotor_encryptor(y, order[0], alph);
}

function rotate_dial(l) {
    // Right dial rotation (order index 2)
    rotors[order[2]][1] = scroll_compute(rotors[order[2]][1], l, 2);
    // if the notch letter is hit make notch boolean true
    if (alph[rotors[order[2]][1]] == rotors[order[2]][2]) {
        rotors[order[2]][4] = true;
        // if notched true && dial has reached turnover end point then turn the next dial
    } else if ((alph[rotors[order[2]][1]] == rotors[order[2]][3]) && (rotors[order[2]][4])) {
        rotors[order[1]][1] = scroll_compute(rotors[order[1]][1], l, 1); // spins 2nd dial
        if (alph[rotors[order[1]][1]] == rotors[order[1]][2]) {
            rotors[order[1]][4] = true;
        } else if ((alph[rotors[order[1]][1]] == rotors[order[1]][3]) && (rotors[order[1]][4])) {
            rotors[order[0]][1] = scroll_compute(rotors[order[0]][1], l, 1); // spins third dial
        }
    }
}
