var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.fx = (function (dom) {
    var timeoutTime,
        theNumber,
        theContinueFunction,
    
        blinkAnimation,
        blink,
        blinkTimes,
        upDown,

        floatUpAnimation,
        floatUp,
        floatLen,
        
        marqueeAnimation,
        marquee,
        firstPos,
        solveText,

        solveDisplay,
        theErrors,

        changeRound,
        towerSolved;

/*---------------------------*
 */ marquee = function () { /*
 *---------------------------*/

        var display = "",
            i = 0;
            
        if (firstPos == 0) {
            dom.setInput("");
        }

        if (firstPos <= solveText.length) {
            for (i = 0; i < dom.getMaxDigits; i += 1) {
                display += " ";
            }

            display += solveText.substr(0, firstPos);
            dom.setDisplay(display);
            
            firstPos += 1;
            window.setTimeout('rru.tower.fx.marquee()', 60);


        } else {
            dom.setInput("Errors: " + theErrors);
        }

    };

/*------------------------------------*
 */ marqueeAnimation = function () { /*
 *------------------------------------*/
 
        firstPos = 0;
        window.setTimeout('rru.tower.fx.marquee()',500);
    };    

/*--------------------------------------*
 */ solveDisplay = function () { /*
 *--------------------------------------*/
        dom.setDisplay(solveText);
        dom.setInput("Errors: " + theErrors);
    };

/*-------------------------*
 */ blink = function () { /*
 *-------------------------*/

        if (upDown) {
            dom.setDisplay(theNumber + "  ");
            dom.setInput("");
        } else {
            dom.setInput(theNumber + "  ");
            dom.setDisplay("");
        }

        upDown = !upDown;
        blinkTimes -= 1;
        // timeoutTime -= 30;
        if (blinkTimes > 0) {
            window.setTimeout('rru.tower.fx.blink()', timeoutTime);
        } else {
            theContinueFunction();
        }
    };

/*----------------------------------*
 */ blinkAnimation = function () { /*
 *----------------------------------*/

        timeoutTime = 200;
        blinkTimes = 5;
        upDown = true;  // true .. show in display, false .. show in input

        window.setTimeout('rru.tower.fx.blink()', timeoutTime);
    };

/*---------------------------*
 */ floatUp = function () { /*
 *---------------------------*/
        var display = "",
            input = "",
            nStr= theNumber.toString(),
            i = 0;

        if (floatLen <= nStr.length) {

            display = nStr.substr(0, floatLen);
            for (i = 0; i < nStr.length - floatLen; i += 1) {
                display += " ";
            }
            display += "  ";

            for (i = 0; i < floatLen; i += 1) {
                input += " ";
            }
            input += nStr.substr(floatLen);
            input += "  ";

            floatLen += 1;

            dom.setDisplay(display);
            dom.setInput(input);

            window.setTimeout('rru.tower.fx.floatUp()', 60);

        } else {
            theContinueFunction();
        }
    };

/*------------------------------------*
 */ floatUpAnimation = function () { /*
 *------------------------------------*/
        
        floatLen = 0;

        window.setTimeout('rru.tower.fx.floatUp()', 500);
    };

/*-------------------------------------------------*
 */ changeRound = function (aNumber, aFunction) { /*
 *-------------------------------------------------*/

        theNumber = aNumber;
        theContinueFunction = aFunction;

        //blinkAnimation();
        floatUpAnimation();
    };

/*-------------------------------------*
 */ towerSolved = function (errors) { /*
 *-------------------------------------*/

        theErrors = errors;
        solveText = "CONGRATULATIONS";

        marqueeAnimation();
        //window.setTimeout("rru.tower.fx.marqueeAnimation()", 500);
    };

    return {

        changeRound: changeRound,
        towerSolved: towerSolved,

        blink: blink,
        floatUp: floatUp,

        marquee: marquee,
        marqueeAnimation: marqueeAnimation,
        solveDisplay: solveDisplay
    };

}(rru.tower.dom));
