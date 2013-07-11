var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.math = (function () {

    var getRandomTower, // functions
        getTower,
        randomInt;

    /*--------------------------------------*
     */ randomInt = function (low, high) { /*
     *--------------------------------------*/
	    var diff = high - low;
	    return Math.round(low + Math.random() * diff);
    };

    /*-----------------------------*
     */ getTower = function (n) { /*
     *-----------------------------*/
        var tower = [],
            i;

        tower.push(n);
        for (i = 2; i <= 9; i += 1) {
            n *= i;
            tower.push(n);
        }

        for (i = 2; i <= 9; i += 1) {
            n /= i;
            tower.push(n);
        }
        
        return tower;
    };

    /*----------------------------------------*
     */ getRandomTower = function (digits) { /*
     *----------------------------------------*/
     
        return getTower(randomInt(Math.pow(10,digits-1), Math.pow(10,digits)-1));
     
    };

    return {
        getRandomTower: getRandomTower
    };

} ());
