import { adjustTextareaHeight, transitionDelayOnSpells } from '/js/spellbook.js';

document.addEventListener("DOMContentLoaded", function() {

    //function that will stay in main.js and be called in spellbook.js
    //incorporate this inside the clickhandler class as the first click action of heading element
    function toggleActiveClass(toggleElement, activeElement) {
        const toggles = document.querySelectorAll(toggleElement);
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                this.closest(activeElement).classList.toggle('active');
            });
        });
    }
    toggleActiveClass('.spell-lvl-heading', '.spell-lvl-slots');

    /* 
     *
     *   User Profile
     *
     */
    /* const userProfile = {
        'name': characherName,
        'health': currentHealth,
        'skills': skillsObj,
        'spells': spellsObj
    }
    class Spell {
        constructor() {
            this.spellName = this.querySelector(); 
        }
    } */


    /* 
     *
     *   SPELLBOOK FUNCTIONS
     *
     */
    transitionDelayOnSpells(0.065);
    
    let openedDescription = null;  // Maintain a reference to the currently opened description.

    class ClickHandler {
        constructor(elementSelector, singleClickFunc, doubleClickElementType, cssClass, doubleClickHelperFunc, clickOutsideCallback) {
            this.elements = document.querySelectorAll(elementSelector);
            this.clickTimeout = null;
            this.singleClickFunc = singleClickFunc;
            this.doubleClickElementType = doubleClickElementType;
            this.cssClass = cssClass;
            this.doubleClickHelperFunc = doubleClickHelperFunc;
            this.clickOutsideCallback = clickOutsideCallback;

            this.elements.forEach(ele => {
                ele.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent the document click event from triggering when clicking on the title/description
                    this.handleClick(e, ele);
                });
            });

            // Add an event listener to the document to handle outside clicks
            // maybe make a logical check to check if the following will be run
            document.addEventListener('click', (e) => {
                const isClickInside = Array.from(this.elements).some(ele => ele.contains(e.target));
                if (!isClickInside && this.clickOutsideCallback) {
                    this.clickOutsideCallback(e);
                }
            });
        }

        handleClick(e, ele) {
            if (!this.clickTimeout) {
                this.clickTimeout = setTimeout(() => {
                    this.clickTimeout = null;
                    this.singleClickFunc && this.singleClickFunc(ele);
                }, 300);
            } else {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = null;
                this.handleDoubleClick(ele);
            }
        }

        handleDoubleClick(ele) {
            if (this.clickOutsideCallback) {
                this.clickOutsideCallback();// check this in the ai conv
            } 
            const inputValue = ele.innerText.trim();
            const inputElem = document.createElement(this.doubleClickElementType);

            inputElem.classList.add(this.cssClass);
            inputElem.value = inputValue || 'Add your text...';

            const revertToOriginal = () => {
                ele.innerText = inputElem.value || 'Add your text...';;
                if (inputElem.parentNode) {
                    inputElem.parentNode.replaceChild(ele, inputElem);
                }
            }

            inputElem.addEventListener('blur', revertToOriginal);
            inputElem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    revertToOriginal();
                }
            });

            ele.parentNode.replaceChild(inputElem, ele);
            inputElem.focus();

            this.doubleClickHelperFunc && this.doubleClickHelperFunc(inputElem);
        }
    }
    new ClickHandler('.spell-lvl-slots .spell .title', toggleDescription, 'input', 'spell-edit-title', null, (e) => {
        // Check if the event target is not inside the openedDescription
        if (openedDescription && !openedDescription.contains(e.target)) {
            openedDescription.style.display = 'none';
            openedDescription = null;
        }
    });
    new ClickHandler('.spell-lvl-slots .spell .description span', null, 'textarea', 'spell-edit-description', adjustTextareaHeight);
    new ClickHandler('.spell-lvl-slots .spell-lvl-heading h2 span', null, 'input', 'spell-edit-heading', spellLevelInputWidthAdjust, null);

    function spellLevelInputWidthAdjust(inputElem) {
        console.log("Function called!");
        console.log(inputElem);
        const adjustWidth = () => {
            inputElem.style.width = `${inputElem.scrollWidth}px`;
        };
    
        // Adjust width when the function is called
        adjustWidth();
    
        // Adjust width on input changes
        inputElem.addEventListener('input', adjustWidth);
    }
    function toggleDescription(ele) {
        const description = ele.nextElementSibling;
        // Close the previously opened description
        if (openedDescription && openedDescription !== description) {
            openedDescription.style.display = 'none';
        }

        description.style.display = (description.style.display === 'inline-block') ? 'none' : 'inline-block';
        // Update the openedDescription reference
        openedDescription = (description.style.display === 'inline-block') ? description : null;
    }


});
