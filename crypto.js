var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
rotor_index = ['A', 'B', 'C'];
fast_rotor = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", 0];
medium_rotor = ["AJDKSIRUXBLHWTMCQGZNPYFVOE", 0];
slow_rotor = ["BDFHJLCPRTXVZNYEIWGAKMUSQO", 0];

function encrypt() {
    parse = input.value();
    permutation = fast_rotor[fast_rotor[1]];
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
