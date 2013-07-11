var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.dom = (function ($) {

    var DIGITS = 15,
    
        displayRow,  // towerPage
        inputRow,

        init,  // public functions
        setDisplay,
        setInputCellActive,
        setInputCellError,
        setInputCellsInactive,
        setInputCellValue,
        getMaxDigits,
        
        createDisplay; // private functions
      
    /*---------------------------------*   
     */ createDisplay = function () { /*
     *---------------------------------*/
    
        var displayElement= $("#display"),
            table = $("<table>").addClass("display"),
            i;

        displayRow = $("<tr>");
        inputRow = $("<tr>");

        for (i = 0; i < DIGITS; i += 1) {
            displayRow.append($("<td>").addClass("display").html(i%10));
            inputRow.append($("<td>").addClass("input"));
        }
       
        table.append(displayRow);
        table.append(inputRow);

        displayElement.append(table);

    };

    /*--------------------------------*
     */ getMaxDigits = function () { /*
     *--------------------------------*/
        return DIGITS;
    };

    /*------------------------------------*    
     */ setDisplay = function (aValue) { /*
     *------------------------------------*/

        var padding = DIGITS - aValue.length,
            pos = 0,
            i = 0;

        for (i = 0; i < padding; i += 1) {
            $(displayRow.children().get(pos)).html(" ");
            pos += 1;
        }

        for (i = 0; i < aValue.length; i += 1) {
            $(displayRow.children().get(pos)).html(aValue.charAt(i));
            pos += 1;
        }

        for (i = 0; i < DIGITS; i += 1) {
            $(inputRow.children().get(i)).html(" ");
        }
        
    };

    /*---------------------------------------*
     */ setInputCellError = function (n) { /*
     *---------------------------------------*/
    
        if ((n < 0) || (n >= DIGITS)) return;

        $(".active").removeClass("active");
        $(".error").removeClass("error");
        $(inputRow.children().get(n)).addClass("error");
    };

    /*---------------------------------------*
     */ setInputCellActive = function (n) { /*
     *---------------------------------------*/
    
        if ((n < 0) || (n >= DIGITS)) return;

        $(".active").removeClass("active");
        $(".error").removeClass("error");
        $(inputRow.children().get(n)).addClass("active");
    };

    /*-----------------------------------------*
     */ setInputCellsInactive = function () { /*
     *-----------------------------------------*/

        $(".active").removeClass("active");
        $(".error").removeClass("error");
     }
    
    /*---------------------------------------------*
     */ setInputCellValue = function (n, digit) { /*
     *---------------------------------------------*/

        if ((n < 0) || (n >= DIGITS)) return;
        
        $(inputRow.children().get(n)).html(digit);
    };

    /*------------------------*
     */ init = function () { /*
     *------------------------*/

        console.log("DOM Module initializing"); 
        
        createDisplay();        
        setDisplay("14041970*2");
    };

    return {
        init: init,
        setDisplay: setDisplay,
        setInputCellError: setInputCellError,
        setInputCellActive: setInputCellActive,
        setInputCellsInactive: setInputCellsInactive,
        setInputCellValue: setInputCellValue,
        getMaxDigits: getMaxDigits
    };

} ($));
