var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
rotor = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "AJDKSIRUXBLHWTMCQGZNPYFVOE", "BDFHJLCPRTXVZNYEIWGAKMUSQO"]

fast_rotor = ['A', 'B', 'C'];
medium_rotor = ['A', 'B', 'C'];
slow_rotor = ['A', 'B', 'C'];

function encrypt() {
    parse = input.value();
    permutation = rotor[0];
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
