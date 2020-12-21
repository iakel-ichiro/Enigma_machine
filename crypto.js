var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
rotors = { // Three Rotors: Fast, med, slow. [scramble, index, position (0-left, 1 - middle, 2 - right)]
    "2": ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0, 0],
    "1": ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0, 1],
    "0": ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0, 2]
}

rotor_order = [2, 1, 0];
fast_rotor = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0];
medium_rotor = ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0];
slow_rotor = ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0];

function rotor_encryptor(parse, r_n) {
    permutation = rotors[r_n][0];
    encryption = "";
    for (var i = 0; i < parse.length; i++) {
        if (parse.charAt(i) == ' ') {
            encryption = concat(encryption, parse.charAt(i));
        }
        for (var k = 0; k < alph.length; k++) {
            if (parse.charAt(i).toUpperCase() == alph.charAt(k)) {
                encryption = concat(encryption, permutation.charAt(k));
            }
        }
    }
    return encryption;
}

function encrypt() {
    var x = rotor_encryptor(input.value(), 0);
    var y = rotor_encryptor(x, 1);
    return rotor_encryptor(y, 2);
}
