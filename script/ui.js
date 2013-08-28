var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.ui = (function ($, math, model, dom, fx) {

    var ACTIVE = 1,     // inputStates: active - allow inputs
        INACTIVE = 0,
        inputState = INACTIVE,
        
        state = {
            tower: [],
            round: 0,   // 1 .. 8 -> *2 .. *9, 9 .. 16 -> /2 .. /9
            errors: 0,
            input: ""
        },

        inputPos,       // index of display cell for next input 
        inputDirection, // -1 ... right to left, +1 ... left to right
        inputDigits,    // nr of digits input 

        initDomAndEvents, // private functions
        initTower,
        prepareRound,
        isCorrectDigit,
        isLastDigitInRound,


        nrKeyEventHandler,
        clearHistoryButtonEventHandler;

/*-------------------------------------*
 */ isCorrectDigit = function (key) { /*
 *-------------------------------------*/

        var solutionStr = state.tower[state.round].toString(),
            ctrlPos;

        if ((state.round >= 1) && (state.round <= 8)) {
            ctrlPos = solutionStr.length - 1 - inputDigits;
        } else {
            ctrlPos = inputDigits;
        }

        return key === solutionStr.charAt(ctrlPos);
    };

/*--------------------------------------*
 */ isLastDigitInRound = function () { /*
 *--------------------------------------*/

        return inputDigits === (state.tower[state.round].toString()).length;
    };

/*-----------------------------*
 */ initTower = function () { /*
 *-----------------------------*/

        state.round = 1;
        state.errors = 0;
        prepareRound();

    };

/*--------------------------------*
 */ prepareRound = function () { /*
 *--------------------------------*/

        var display = state.tower[state.round - 1];

        if ((state.round >= 1) && (state.round <= 8)) {
            display += "*";
            display += state.round + 1;

            inputPos = dom.getMaxDigits() - 3;
            inputDirection = -1;
        } else {
            display += "/";
            display += state.round - 7;

            //console.log(state.tower[state.round]);
            inputPos = dom.getMaxDigits() - (state.tower[state.round].toString()).length - 2;
            inputDirection = 1;
        }

        dom.setDisplay(display);
        dom.setInput("");
        dom.setInputCellActive(inputPos);

        inputDigits = 0;
        inputState = ACTIVE;

    };

/*------------------------------------*
 */ nrKeyEventHandler = function (e) { /*
 *------------------------------------*/

        e.stopImmediatePropagation();

        if (inputState === INACTIVE) {
            return;
        }

        var key = $(this).text();
        dom.setInputCellValue(inputPos, key);
        
        if (inputDirection > 0) {
            state.input = state.input + key;
        } else {
            state.input = key + state.input;
        }

        if (isCorrectDigit(key)) {
            inputDigits += 1;

            if (!isLastDigitInRound()) {

                inputPos += inputDirection;
                dom.setInputCellActive(inputPos);

            } else {

                state.round += 1;

                if (state.round === 17) {

                    dom.setInputCellsInactive();
                    model.storeUnit(state.tower[0], state.errors);
                    fx.towerSolved(state.errors);

                } else {

                    dom.setInputCellsInactive();
                    inputState = INACTIVE;
                    fx.changeRound(state.tower[state.round - 1],prepareRound);
                }
            }
        } else {
            dom.setInputCellError(inputPos);
            state.errors += 1;
        }
    };

/*--------------------------------------------------*
 */ clearHistoryButtonEventHandler = function () { /*
 *--------------------------------------------------*/

        model.removeAllUnits();
        dom.createHistory(model.getAllUnits());
    };

/*------------------------------------*
 */ initDomAndEvents = function () { /*
 *------------------------------------*/

        dom.init();

        dom.setDisplay("Press Go!   ");
        dom.setInput("to start    ");

        $(".nrKey").tap(nrKeyEventHandler);
        $("#goButton").tap(initTower);
        $("#clearHistoryButton").tap(clearHistoryButtonEventHandler);

    };

    $(document).on('pageinit', '#towerPage', initDomAndEvents);
    $(document).on('pageshow', '#historyPage', function () {
        dom.createHistory(model.getAllUnits());
    });

}($, rru.tower.math, rru.tower.model, rru.tower.dom, rru.tower.fx));
