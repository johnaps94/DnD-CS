document.addEventListener("DOMContentLoaded", function() {
/* 
 *
 *   SPELLBOOK FUNCTIONS
 *
 */

//spell title element -> swap to input when clicked
document.querySelectorAll('.title').forEach(title => {
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
});

// Event listener to handle hiding the description when clicking elsewhere
document.addEventListener('click', function(e) {
    // If the clicked element is not a title and not a description, hide all descriptions
    if (!e.target.classList.contains('title') && !e.target.classList.contains('description')) {
        document.querySelectorAll('.description').forEach(desc => desc.style.display = 'none');
    }
});






function toggleActiveClass(toggleElement, activeElement) {
    const toggles = document.querySelectorAll(toggleElement);
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.closest(activeElement).classList.toggle('active');
        });
    });
}
toggleActiveClass('.spell-lvl-heading', '.spell-lvl-slots');



function transitionDelayOnSpells() {
    // Grab all the .title elements inside .spell
    let spells = document.querySelectorAll('.spell-lvl-slots .spell');

    // Set a base delay
    let delay = 0; 

    spells.forEach(spell => {
        // Fetch the title inside the current spell
        let title = spell.querySelector('.title');

        // Dynamically set translateY value based on the title's height
        title.style.transform = `translateY(-${title.offsetHeight}px)`;

        /* // Increment delay for the transition effect
        title.style.transitionDelay = `${delay}s`; */

        // Set the animation delay
        title.style.animationDelay = `${delay}s`;

        delay += 0.065; // increment delay by 0.2s for each title
    });
}
transitionDelayOnSpells();

});
