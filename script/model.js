var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.model = (function () {

    var LOCALSTORAGE_KEY = "rruTower.model",

        model = [],

        // functions
        initModel,
        storeModel,
        loadModel,
        deleteModel,
        getAllUnits,
        removeAllUnits,
        createUnit,
        updateUnit; 

    storeModel = function () {
        window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(model));
    };

    loadModel = function () {
        model = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
    };

    deleteModel = function () {
        window.localStorage.removeItem(LOCALSTORAGE_KEY);
    }

    initModel = function () {
        if (!window.localStorage.getItem(LOCALSTORAGE_KEY)) {
            storeModel();
        } else {
            loadModel();
        }
    };

    getAllUnits = function () {
        return model;
    };

    removeAllUnits = function () {
        model = [];
        deleteModel();
        initModel();
    };

    createUnit = function (aConfiguration) {
        var unit = {
            time: new Date().getTime(),
            streak: 0,
            correct: 0,
            types: aConfiguration
        }
        model.push(unit);
        storeModel();
    };

    updateUnit = function (streak, correct) {
        var lastIndex = model.length-1;
        if (model[lastIndex].streak < streak) {
            model[lastIndex].streak = streak;
        }
        model[lastIndex].correct = correct;
        storeModel();
    }


    initModel();

    return {
        createUnit: createUnit,
        updateUnit: updateUnit,
        getAllUnits: getAllUnits,
        removeAllUnits: removeAllUnits
    };

} ());
