    //User Profile Object
    const characterState = {
        'name': characherName,
        'health': currentHealth,
        'skills': skillsObj,
        'spells': spellsObj
    }

    function renderCharacterUI() {
        //const healthElement = document.getElementById('characterHealth');
        //healthElement.textContent = `Health: ${characterState.health}`;
        // Similarly, render other parts of the UI based on the state
    }

    /* class Spell {
        constructor() {
            this.spellName = this.querySelector(); 
        }
    } */

    //class for elements that we want left click = open description, double left click = edit, right click copy element
    class ClickHandler {
        constructor(elementSelector, singleClickFunc, doubleClickElementType, cssClass, doubleClickHelperFunc, clickOutsideCallback) {
            this.elementSelector = elementSelector;
            this.elements = document.querySelectorAll(elementSelector);
            this.clickTimeout = null;
            this.singleClickFunc = singleClickFunc;
            this.doubleClickElementType = doubleClickElementType;
            this.cssClass = cssClass;
            this.doubleClickHelperFunc = doubleClickHelperFunc;
            this.clickOutsideCallback = clickOutsideCallback;
        }
    }