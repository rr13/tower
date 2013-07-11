var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.ui = (function ($, math, dom) {

    var ACTIVE = 1,     // states: active - allow inputs
        INACTIVE = 0,
        state = INACTIVE,
    
        inputPos,       // index of display cell for next input 
        inputDirection, // -1 ... right to left, +1 ... left to right
        inputDigits,    // nr of digits input 
        theTower,
        round,          // 1 .. 8 -> *2 .. *9, 9 .. 16 -> /2 .. /9

        initDomAndEvents, // private functions
        initTower,
        prepareRound,
        isCorrectDigit,
        isLastDigitInRound;
        

    /*----------------------------------*
     */ isCorrectDigit = function (key) { /*
     *----------------------------------*/
     
        var solutionStr = theTower[round].toString(),
            ctrlPos;

        if ((round >= 1) && (round <= 8)) {
            ctrlPos = solutionStr.length - 1 - inputDigits;
        } else {
            ctrlPos = inputDigits;
        }

        return key == solutionStr.charAt(ctrlPos);
    };    

    /*--------------------------------------*
     */ isLastDigitInRound = function () { /*
     *--------------------------------------*/

        return inputDigits == (theTower[round].toString()).length;
    };

    /*-----------------------------*
     */ initTower = function () { /*
     *-----------------------------*/

        theTower = math.getRandomTower(4);

        round = 1;
        prepareRound();

    };

    /*---------------------------------*
     */ prepareRound = function () { /*
     *---------------------------------*/

        var display = theTower[round-1];

        if ((round >= 1) && (round <= 8)) {
            display += "*";
            display += round+1;

            inputPos = dom.getMaxDigits()-3;
            inputDirection = -1;
        } else {
            display += "/";
            display += round-7;

            //console.log(theTower[round]);
            inputPos = dom.getMaxDigits()-(theTower[round].toString()).length-2;
            inputDirection = 1;
        }

        dom.setDisplay(display);
        dom.setInputCellActive(inputPos);        
        
        inputDigits = 0;
        state = ACTIVE;
    
     };

    /*------------------------------------*
     */ initDomAndEvents = function () { /*
     *------------------------------------*/

        //console.log("UI Module initializing");

        dom.init();

        
        initTower();


        $(".nrKey").tap(function () {
            
            if (state == INACTIVE) return;

            var key = $(this).text();
            dom.setInputCellValue(inputPos, key) ;
            
            if (isCorrectDigit(key)) {
                inputDigits += 1;

                if (! isLastDigitInRound()) {
                    inputPos += inputDirection;
                    dom.setInputCellActive(inputPos);
                } else {
                    round += 1;

                    if (round == 17) {
                        alert ("Solved!");
                        initTower();
                    } else {

                        dom.setInputCellsInactive();
                        state = INACTIVE;
                        setTimeout('rru.tower.ui.prepareRound()',1000);
                    }
                }
            } else {
                dom.setInputCellError(inputPos);
            }
        });

    };

    $(document).on('pageinit','#towerPage', initDomAndEvents);

    return {
        prepareRound: prepareRound
    };

}($, rru.tower.math, rru.tower.dom));
