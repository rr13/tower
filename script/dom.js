var rru = rru || {};
rru.tower = rru.tower || {};

rru.tower.dom = (function ($) {

    var DIGITS = 15,

        // DOM Elements

        displayRowElement,  // towerPage
        inputRowElement,

        historyListElement, // historyPage

        // public functions

        init,

        setDisplay,
        setInput,
        setInputCellActive,
        setInputCellError,
        setInputCellsInactive,
        setInputCellValue,

        getMaxDigits,
        getConfigDigits,

        createHistory,

        // private Functions

        createDisplay,
        createLIfromUnit,
        doubleDigit,
        setLine;

/*---------------------------------*            
 */ createDisplay = function () { /*
 *---------------------------------*/

        var displayElement = $("#display"),
            table = $("<table>").addClass("display"),
            i;

        displayRowElement = $("<tr>");
        inputRowElement = $("<tr>");

        for (i = 0; i < DIGITS; i += 1) {
            displayRowElement.append($("<td>").addClass("display"));
            inputRowElement.append($("<td>").addClass("input"));
        }

        table.append(displayRowElement);
        table.append(inputRowElement);

        displayElement.append(table);

    };

/*--------------------------------*
 */ getMaxDigits = function () { /*
 *--------------------------------*/

        return DIGITS;
    };

/*-----------------------------------*
 */ getConfigDigits = function () { /*
 *-----------------------------------*/

        // slider element cannot be assigned to a variable
        // will not return actual value
        // element re-created on every page display?

        return $("#digitSlider").val();
    };

/*-------------------------------------------*    
 */ setLine = function (anElement, aValue) { /*
 *-------------------------------------------*/

        var padding = DIGITS - aValue.length,
            pos = 0,
            i = 0;

        for (i = 0; i < padding; i += 1) {
            $(anElement.children().get(pos)).html(" ");
            pos += 1;
        }

        for (i = 0; i < aValue.length; i += 1) {
            $(anElement.children().get(pos)).html(aValue.charAt(i));
            pos += 1;
        }

    };

/*------------------------------------*
 */ setDisplay = function (aValue) { /*
 *------------------------------------*/

        setLine(displayRowElement, aValue);
    };

/*------------------------------------*
 */ setInput = function (aValue) { /*
 *------------------------------------*/

        setLine(inputRowElement, aValue);
    };

/*---------------------------------------*
 */ setInputCellError = function (n) { /*
 *---------------------------------------*/

        if ((n < 0) || (n >= DIGITS)) {
            return;
        }

        $(".active").removeClass("active");
        $(".error").removeClass("error");
        $(inputRowElement.children().get(n)).addClass("error");
    };

/*---------------------------------------*
 */ setInputCellActive = function (n) { /*
 *---------------------------------------*/

        if ((n < 0) || (n >= DIGITS)) {
            return;
        }

        $(".active").removeClass("active");
        $(".error").removeClass("error");
        $(inputRowElement.children().get(n)).addClass("active");
    };

/*-----------------------------------------*
 */ setInputCellsInactive = function () { /*
 *-----------------------------------------*/

        $(".active").removeClass("active");
        $(".error").removeClass("error");
    };

/*---------------------------------------------*
 */ setInputCellValue = function (n, digit) { /*
 *---------------------------------------------*/

        if ((n < 0) || (n >= DIGITS)) {
            return;
        }

        $(inputRowElement.children().get(n)).html(digit);
    };

/*---------------------------------------*
 */ doubleDigit = function (timeValue) { /*
 *---------------------------------------*/

        return timeValue < 10 ? "0" + timeValue : timeValue;
    };

/*----------------------------------------*
 */ createLIfromUnit = function (unit) { /*
 *----------------------------------------*/

        var li = $("<li>"),
            date = new Date(unit.time),
            content = "";

        content = doubleDigit(date.getDate()) + ".";
        content += doubleDigit(date.getMonth()) + ".";
        content += date.getFullYear();

        content += " ";
        content += "<< " + unit.number + " >>";
        content += " (" + unit.errors + " Errors)";

        li.html(content);
        return li;

    };

/*------------------------------------------*
 */ createHistory = function (aUnitList) { /*
 *------------------------------------------*/

        historyListElement.empty();

        aUnitList.forEach(function (unit) {
            historyListElement.append(createLIfromUnit(unit));
        });

        historyListElement.listview('refresh');
    };

/*------------------------*
 */ init = function () { /*
 *------------------------*/

        //console.log("DOM Module initializing"); 

        createDisplay();

        historyListElement = $("#historyList");
    };

    return {
        init: init,
        setDisplay: setDisplay,
        setInput: setInput,
        setInputCellError: setInputCellError,
        setInputCellActive: setInputCellActive,
        setInputCellsInactive: setInputCellsInactive,
        setInputCellValue: setInputCellValue,
        getMaxDigits: getMaxDigits,
        createHistory: createHistory,
        getConfigDigits: getConfigDigits
    };

}($));
