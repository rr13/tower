var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.model = (function () {

    var LOCALSTORAGE_KEY = "rruTower.model",

        model = [],

        // private functions

        initModel,
        storeModel,
        loadModel,
        deleteModel,

        // public functions

        getAllUnits,
        removeAllUnits,
        storeUnit;

/*------------------------------*
 */ storeModel = function () { /*
 *------------------------------*/

        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(model));
    };

/*-----------------------------*
 */ loadModel = function () { /*
 *-----------------------------*/

        model = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
    };
/*-------------------------------*
 */ deleteModel = function () { /*
 *-------------------------------*/

        window.localStorage.removeItem(LOCALSTORAGE_KEY);
    };

/*-----------------------------*
 */ initModel = function () { /*
 *-----------------------------*/

        if (!window.localStorage.getItem(LOCALSTORAGE_KEY)) {
            storeModel();
        } else {
            loadModel();
        }
    };

/*-------------------------------*
 */ getAllUnits = function () { /*
 *-------------------------------*/

        return model;
    };

/*----------------------------------*
 */ removeAllUnits = function () { /*
 *----------------------------------*/

        model = [];
        deleteModel();
        initModel();
    };

/*-------------------------------------------*
 */ storeUnit = function (number, errors) { /*
 *-------------------------------------------*/

        var unit = {
                time: new Date().getTime(),
                number: number,
                errors: errors
            };

        model.push(unit);
        storeModel();
    };

    initModel();

    return {
        storeUnit: storeUnit,
        getAllUnits: getAllUnits,
        removeAllUnits: removeAllUnits
    };

}());
