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

//spell title element -> swap to input when clicked
/* document.querySelectorAll('.title').forEach(title => {
    title.addEventListener('click', function() {
        const inputValue = this.innerText;
        const inputElem = document.createElement('input');
        inputElem.value = inputValue;

        // Function to revert input back to the title
        const revertToTitle = () => {
            title.innerText = inputElem.value;
            if(inputElem.parentNode) {  // Check to ensure that inputElem is still in the DOM
                inputElem.parentNode.replaceChild(title, inputElem);  
            }
        }

        // Event Listener for the blur event on the input
        inputElem.addEventListener('blur', revertToTitle);

        // Event Listener for the Enter key on the input
        inputElem.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // prevent any default actions associated with the Enter key
                revertToTitle();
            }
        });

        // Replace the title with the input element
        this.parentNode.replaceChild(inputElem, title);
        inputElem.focus();
    });
});


document.querySelectorAll('.title').forEach(title => {
    title.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Prevent the default right-click menu from showing up

        const description = this.nextElementSibling;

        if (description.style.display === 'inline-block') {
            description.style.display = 'none';
        } else {
            // Hide all other descriptions
            document.querySelectorAll('.description').forEach(desc => desc.style.display = 'none');

            // Show this description
            description.style.display = 'inline-block';
        }
    });
}); */



function transitionDelayOnSpells(delayIncrement) {
    // Grab all the .title elements inside .spell
    let spells = document.querySelectorAll('.spell-lvl-slots .spell');

    // Set a base delay
    let delay = 0; 

    spells.forEach(spell => {
        // Fetch the title inside the current spell
        let title = spell.querySelector('.title');

        // Dynamically set translateY value based on the title's height
        title.style.transform = `translateY(-${title.offsetHeight}px)`;

        // Set the animation delay
        title.style.animationDelay = `${delay}s`;

        delay += delayIncrement; // increment delay by delayIncrement seconds for each title
    });
}
transitionDelayOnSpells(0.065);

function SingleAndDoubleClick(element, helperFunc, htmltypeinput, cssClass) {
    let allElementsAlike = document.querySelectorAll(element);
    let clickTimeout = null;  // This will store the setTimeout reference

    allElementsAlike.forEach(ele => {
        ele.addEventListener('click', function(e) {
            if (clickTimeout === null) {
                // First click
                clickTimeout = setTimeout(() => {
                    // Single click action
                    clickTimeout = null;
                    // TODO: Insert your single click logic here
                    helperFunc(this);
                }, 300); // 300ms to wait for a potential second click
            } else {
                // Second click detected before timeout completed
                clearTimeout(clickTimeout); // clear the timeout
                clickTimeout = null;
                
                // Logic for edit functionality
                const inputValue = this.innerText;
                const inputElem = document.createElement(htmltypeinput);

                inputElem.classList.add(cssClass);
                inputElem.value = inputValue;

                // Function to revert input back to the title
                const revertToTitle = () => {
                    ele.innerText = inputElem.value;
                    if (inputElem.parentNode) {
                        inputElem.parentNode.replaceChild(ele, inputElem);
                    }
                }
                const x = ele.scrollHeight;
                inputElem.addEventListener('blur', revertToTitle);
                inputElem.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        revertToTitle();
                    }
                });

                this.parentNode.replaceChild(inputElem, ele);
                inputElem.focus();

                descriptionTextAreaDynamicHeight(inputElem);
            }
        });
    });
}
function descriptionTextAreaDynamicHeight(ele) {
    let descTextareaEle = document.querySelector('.spell-lvl-slots .spell .description textarea');
    if (!(ele === descTextareaEle)) {return;}
    else {
        descTextareaEle.addEventListener('input', function() {
            this.style.height = 'auto';  // Reset the height
            this.style.height = this.scrollHeight + 'px';  // Set it to its scroll height
        });

        // Initial adjust if there's default text
        inputElem.style.height = `${x-1}px`;
    }
}
// Event listener to handle hiding the description when clicking elsewhere
document.addEventListener('click', function(e) {
    // If the clicked element is not a title and not a description, hide all descriptions
    // if (!e.target.classList.contains('title') && !e.target.classList.contains('description')) {
    if (!e.target.classList.contains('description')) {
        document.querySelectorAll('.description').forEach(desc => desc.style.display = 'none');
    }
}); 
SingleAndDoubleClick('.spell-lvl-slots .spell .title', FirstClickShowDescriptionHelper, 'input', 'ta-title');
SingleAndDoubleClick('.spell-lvl-slots .spell .description span', blank, 'textarea', 'ta-description');


function blank(thiS) {
    return;
}

let activeSpellOneClick;
function FirstClickShowDescriptionHelper(thiS) {

    if (activeSpellOneClick && thiS !== activeSpellOneClick) {
        activeSpellOneClick.closest('.description').style.display = 'none';
    }
    const description = thiS.nextElementSibling;
    activeSpellOneClick = thiS;
    if (description.style.display === 'inline-block') {
        description.style.display = 'none';
    } else {
        // Hide all other descriptions
        document.querySelectorAll('.description').forEach(desc => desc.style.display = 'none');

        // Show this description
        description.style.display = 'inline-block';
    }
}



});
