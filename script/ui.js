var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.ui = (function ($, math, model, dom) {

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

        blinkAnimation,
        blink,
        timeoutTime,
        blinkTimes,
        upDown,

        solveDisplay,

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

/*--------------------------------*
 */ solveDisplay = function () { /*
 *--------------------------------*/
        dom.setDisplay("CONGRATULATIONS");
        dom.setInput("Errors: " + errors);
    };

/*-------------------------*
 */ blink = function () { /*
 *-------------------------*/

        if (upDown) {
            dom.setDisplay(theTower[round - 1] + "  ");
            dom.setInput("");
        } else {
            dom.setInput(theTower[round - 1] + "  ");
            dom.setDisplay("");
        }

        upDown = !upDown;
        blinkTimes -= 1;
        timeoutTime -= 70;
        if (blinkTimes > 0) {
            window.setTimeout('rru.tower.ui.blink()', timeoutTime);
        } else {
            prepareRound();
        }
    };

/*----------------------------------*
 */ blinkAnimation = function () { /*
 *----------------------------------*/

        timeoutTime = 350;
        blinkTimes = 5;
        upDown = true;  // true .. show in display, false .. show in input

        window.setTimeout('rru.tower.ui.blink()', timeoutTime);
    };

/*-----------------------------*
 */ initTower = function () { /*
 *-----------------------------*/

        theTower = math.getRandomTower(dom.getConfigDigits());

        round = 1;
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
                    window.setTimeout("rru.tower.ui.solveDisplay()", 500);

                } else {

                    dom.setInputCellsInactive();
                    state = INACTIVE;
                    blinkAnimation();
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

    return {
        blink: blink,
        solveDisplay: solveDisplay
    };

}($, rru.tower.math, rru.tower.model, rru.tower.dom));
