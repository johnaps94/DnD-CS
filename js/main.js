document.addEventListener("DOMContentLoaded", function() {

//function that will stay in main.js and be called in spellbook.js
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
 *   SPELLBOOK FUNCTIONS
 *
 */
transitionDelayOnSpells(0.065);
function transitionDelayOnSpells(delayIncrement) {
    let spells = document.querySelectorAll('.spell-lvl-slots .spell'); // Grab all the .title elements inside .spell
    let delay = 0; // Set a base delay

    spells.forEach(spell => {
        let title = spell.querySelector('.title'); // Fetch the title inside the current spell
        title.style.transform = `translateY(-${title.offsetHeight}px)`; // Dynamically set translateY value based on the title's height
        title.style.animationDelay = `${delay}s`; // Set the animation delay
        delay += delayIncrement; // increment delay by delayIncrement seconds for each title
    });
}

let openedDescription = null;  // Maintain a reference to the currently opened description.
class ClickHandler {
    constructor(elementSelector, singleClickFunc, doubleClickElementType, cssClass, doubleClickHelperFunc, clickOutsideCallback) {
        this.elements = document.querySelectorAll(elementSelector);
        this.clickTimeout = null;
        this.singleClickFunc = singleClickFunc;
        this.doubleClickElementType = doubleClickElementType;
        this.cssClass = cssClass;
        this.doubleClickHelperFunc = doubleClickHelperFunc;
        this.clickOutsideCallback = clickOutsideCallback;  // Initialize clickOutsideCallback

        this.elements.forEach(ele => {
            ele.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the document click event from triggering when clicking on the title/description
                this.handleClick(e, ele);
            });
        });

        // Add an event listener to the document to handle outside clicks
        document.addEventListener('click', (e) => {
            const isClickInside = Array.from(this.elements).some(ele => ele.contains(e.target));
            if (!isClickInside && this.clickOutsideCallback) {
                this.clickOutsideCallback();
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
        const inputValue = ele.innerText.trim();
        const inputElem = document.createElement(this.doubleClickElementType);

        inputElem.classList.add(this.cssClass);
        inputElem.value = inputValue || 'Add your text...';

        const revertToTitle = () => {
            ele.innerText = inputElem.value || 'Add your text...';;
            if (inputElem.parentNode) {
                inputElem.parentNode.replaceChild(ele, inputElem);
            }
        }

        inputElem.addEventListener('blur', revertToTitle);
        inputElem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                revertToTitle();
            }
        });

        ele.parentNode.replaceChild(inputElem, ele);
        inputElem.focus();

        this.doubleClickHelperFunc && this.doubleClickHelperFunc(inputElem);
    }
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

function adjustTextareaHeight(textarea) {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    textarea.style.height = textarea.scrollHeight + 'px'; // This line ensures it adjusts on creation too
}

new ClickHandler('.spell-lvl-slots .spell .title', toggleDescription, 'input', 'ta-title', null, () => {
    if (openedDescription) {
        openedDescription.style.display = 'none';
        openedDescription = null;
    }
});
new ClickHandler('.spell-lvl-slots .spell .description span', null, 'textarea', 'ta-description', adjustTextareaHeight);





});
