
var digits = 0,
    number = 9,
    i, n;


while (digits <= 20) {
    n= number;
    for (i=2; i<=9; ++i) {
        n= n*i;
    }

    digits= n.toString().length;
    console.log(number+"("+number.toString().length+"): "+n+"("+digits+")");

    number *= 10;
    number += 9;
}
