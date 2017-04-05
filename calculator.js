"use strict";

//Model
var model = {
    displayCurrent: [],
    displayHistory: [],

    addInput: function (input) {
        this.displayCurrent.push(input);
        render.displayInput();
    },

    calc: function () {
        var i;
        //computes exponents and roots
        for (i = 0; i < this.displayCurrent.length; i++) {
            switch (this.displayCurrent[i]) {
                case "xToTheNegativeOne":
                    this.displayCurrent.splice(i - 1, 2, Math.pow(parseFloat(this.displayCurrent[i - 1]), -1));
                    i--;
                    break;
                case "xsquared":
                    this.displayCurrent.splice(i - 1, 2, Math.pow(parseFloat(this.displayCurrent[i - 1]), 2 ));
                    i--;
                    break;
            }
        }
        //computes multiplication and division
        for (i = 0; i < this.displayCurrent.length; i++) {
            switch (this.displayCurrent[i]) {
                case "divide":
                    this.displayCurrent.splice(i - 1, 3, parseFloat(this.displayCurrent[i - 1]) / parseInt(this.displayCurrent[i + 1]));
                    i--;
                    break;
                case "times":
                    this.displayCurrent.splice(i - 1, 3, parseFloat(this.displayCurrent[i - 1]) * parseFloat(this.displayCurrent[i + 1]));
                    i--;
                    break;
            }
        }

        //computes addition and subtraction
        for (i = 0; i < this.displayCurrent.length; i++) {
            switch (this.displayCurrent[i]) {
                case "plus":
                    this.displayCurrent.splice(i - 1, 3, parseFloat(this.displayCurrent[i - 1]) + parseFloat(this.displayCurrent[i + 1]));
                    i--;
                    break;
                case "minus":
                    this.displayCurrent.splice(i - 1, 3, parseFloat(this.displayCurrent[i - 1]) - parseFloat(this.displayCurrent[i + 1]));
                    i--;
                    break;
            }
        }
        render.displayInput();
    },

    clear: function() {
       this.displayCurrent = [];
       render.displayInput();
    }
}



//View
var render = {
    displayInput: function () {
        var displayLine1 = document.getElementById("displayLine1");
        displayLine1.innerHTML = "";
        model.displayCurrent.forEach(function (input) {
            if (render.translateOperator(input) === input) {
                displayLine1.innerHTML += render.translateOperator(input);
            }  else if(render.translateOperator(input).search("sup") !== -1) {
                displayLine1.innerHTML += " " + render.translateOperator(input) + " ";
            } else {
                displayLine1.innerHTML += " <h3>" + render.translateOperator(input) + "</h3> ";
            }
        });
        this.dynamicFontSize();
        console.log(model.displayCurrent);
    },

    translateOperator: function (input) {
        switch (input.toString()) {
            case 'divide':
                return "&divide;";
            case 'times':
                return "x";
            case 'minus':
                return "-";
            case 'plus':
                return "+";
            case 'xToTheNegativeOne':
                return "<sup>-1</sup>";
            case 'xsquared':
                return "<sup>2</sup>";
            default:
                return input;
        }
    },

    dynamicFontSize: function () {
        //reduces font-size so that the input always fits inside the display's width
        while (document.getElementById("displayLine1").clientWidth > 390) {
            var displayLine1 = document.getElementById("displayLine1");
            var currentFontSize = parseFloat(window.getComputedStyle(displayLine1, null).getPropertyValue("font-size"));
            displayLine1.style.fontSize = (currentFontSize - 1).toString() + "px";

        }
    }
}

//Controller
var handlers = {
    findId: function (e) {
        if (!e.target.id) {
            if (e.target.parentNode.id === "enter") {
                model.calc();
            } else if (e.target.parentNode.id === "clear") {
               model.clear();
            } else {
                model.addInput(e.target.parentNode.id);
            }
        } else if (e.target.id === "enter") {
            model.calc();
        } else if(e.target.id === "clear") {
            model.clear();
        } else {
            model.addInput(e.target.id);
        }
    },

    findKey: function (e) {
        if (e.keyCode === 49 || e.keyCode === 97) {
            model.addInput(1);
        }
        if (e.keyCode === 50 || e.keyCode === 98) {
            model.addInput(2);
        }
        if (e.keyCode === 51 || e.keyCode === 99) {
            model.addInput(3);
        }
        if (e.keyCode === 52 || e.keyCode === 100) {
            model.addInput(4);
        }
        if (e.keyCode === 53 || e.keyCode === 101) {
            model.addInput(5);
        }
        if (e.keyCode === 54 || e.keyCode === 102) {
            model.addInput(6);
        }
        if (e.keyCode === 55 || e.keyCode === 103) {
            model.addInput(7);
        }
        if (e.keyCode === 56 || e.keyCode === 104) {
            model.addInput(8);
        }
        if (e.keyCode === 57 || e.keyCode === 105) {
            model.addInput(9);
        }
        if (e.keyCode === 107) {
            model.addInput("plus");
        }
        if (e.keyCode === 109) {
            model.addInput("minus");
        }
        if (e.keyCode === 186 || e.keyCode === 106) {
            model.addInput("times");
        }
        if (e.keyCode === 191 || e.keyCode === 111) {
            model.addInput("divide");
        }
    }
};