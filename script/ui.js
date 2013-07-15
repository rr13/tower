var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.ui = (function ($, math, model, dom, fx) {

    var ACTIVE = 1,     // states: active - allow inputs
        INACTIVE = 0,
        state = INACTIVE,

        inputPos,       // index of display cell for next input 
        inputDirection, // -1 ... right to left, +1 ... left to right
        inputDigits,    // nr of digits input 

        theTower,
        round,          // 1 .. 8 -> *2 .. *9, 9 .. 16 -> /2 .. /9
        errors,

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

        var solutionStr = theTower[round].toString(),
            ctrlPos;

        if ((round >= 1) && (round <= 8)) {
            ctrlPos = solutionStr.length - 1 - inputDigits;
        } else {
            ctrlPos = inputDigits;
        }

        return key === solutionStr.charAt(ctrlPos);
    };

/*--------------------------------------*
 */ isLastDigitInRound = function () { /*
 *--------------------------------------*/

        return inputDigits === (theTower[round].toString()).length;
    };

/*-----------------------------*
 */ initTower = function () { /*
 *-----------------------------*/

        theTower = math.getRandomTower(dom.getConfigDigits());

        round = 16;
        errors = 0;
        prepareRound();

    };

/*--------------------------------*
 */ prepareRound = function () { /*
 *--------------------------------*/

        var display = theTower[round - 1];

        if ((round >= 1) && (round <= 8)) {
            display += "*";
            display += round + 1;

            inputPos = dom.getMaxDigits() - 3;
            inputDirection = -1;
        } else {
            display += "/";
            display += round - 7;

            //console.log(theTower[round]);
            inputPos = dom.getMaxDigits() - (theTower[round].toString()).length - 2;
            inputDirection = 1;
        }

        dom.setDisplay(display);
        dom.setInput("");
        dom.setInputCellActive(inputPos);

        inputDigits = 0;
        state = ACTIVE;

    };

/*------------------------------------*
 */ nrKeyEventHandler = function () { /*
 *------------------------------------*/

        if (state === INACTIVE) {
            return;
        }

        var key = $(this).text();
        dom.setInputCellValue(inputPos, key);

        if (isCorrectDigit(key)) {
            inputDigits += 1;

            if (!isLastDigitInRound()) {

                inputPos += inputDirection;
                dom.setInputCellActive(inputPos);

            } else {

                round += 1;

                if (round === 17) {

                    dom.setInputCellsInactive();
                    model.storeUnit(theTower[0], errors);
                    fx.towerSolved(errors);

                } else {

                    dom.setInputCellsInactive();
                    state = INACTIVE;
                    fx.changeRound(theTower[round - 1],prepareRound);
                }
            }
        } else {
            dom.setInputCellError(inputPos);
            errors += 1;
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
