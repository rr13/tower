var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.model = (function () {

    var LOCALSTORAGE_KEY = "rruTower.model",
        CURRENT_VERSION = "1.0",

        theModel,

        // private functions

        Model,
        initModel,
        storeModel,
        loadModel,
        deleteModel,

        // public functions

        getAllUnits,
        removeAllUnits,
        storeUnit;

/*-------------------------*
 */ Model = function () { /*
 *-------------------------*/

    this.version = CURRENT_VERSION;
    this.history = [];
    this.state = {};
}

/*------------------------------*
 */ storeModel = function () { /*
 *------------------------------*/

        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(theModel));
    };

/*-----------------------------*
 */ loadModel = function () { /*
 *-----------------------------*/

        theModel = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
    };
/*-------------------------------*
 */ deleteModel = function () { /*
 *-------------------------------*/

        window.localStorage.removeItem(LOCALSTORAGE_KEY);
    };

/*-----------------------------*
 */ initModel = function () { /*
 *-----------------------------*/

        var oldModel;

        if (!window.localStorage.getItem(LOCALSTORAGE_KEY)) {
            theModel = new Model();
            storeModel();
        } else {
            loadModel();
            if (! 'version' in theModel) { // model version update
                oldModel = theModel;
                theModel = new Model();
                theModel.history = oldModel;
                storeModel();
            }
        }
    };

/*-------------------------------*
 */ getAllUnits = function () { /*
 *-------------------------------*/

        return theModel;
    };

/*----------------------------------*
 */ removeAllUnits = function () { /*
 *----------------------------------*/

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

        theModel.push(unit);
        storeModel();
    };

    initModel();

    return {
        storeUnit: storeUnit,
        getAllUnits: getAllUnits,
        removeAllUnits: removeAllUnits
    };

}());
