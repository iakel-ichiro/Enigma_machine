var alph ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet for initial encryption reference
// rotor dictionary contains three rotors:
rotors = { // Three Rotors: Fast, med, slow. [scramble, rotation index]
    "2": ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0], //fast
    "1": ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0], //med
    "0": ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0] // slow
}
order = [0, 1, 2]; // order that the rotors are placed in the machine

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
    var x = rotor_encryptor(input.value(), 2);
    var y = rotor_encryptor(x, 1, rotors[2][0]);
    return rotor_encryptor(y, 0, rotors[1][0]);
}
