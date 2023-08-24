/* export function toggleDescription(ele, openedDescription) {
    const description = ele.nextElementSibling;
    // Close the previously opened description
    if (openedDescription && openedDescription !== description) {
        openedDescription.style.display = 'none';
    }

    description.style.display = (description.style.display === 'inline-block') ? 'none' : 'inline-block';
    // Update the openedDescription reference
    openedDescription = (description.style.display === 'inline-block') ? description : null;
 } */
 
 export function adjustTextareaHeight(textarea) {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    textarea.style.height = textarea.scrollHeight + 'px'; // This line ensures it adjusts on creation too
 }
 
 export function transitionDelayOnSpells(delayIncrement) {
    let spells = document.querySelectorAll('.spell-lvl-slots .spell'); // Grab all the .title elements inside .spell
    let delay = 0; // Set a base delay

    spells.forEach(spell => {
        let title = spell.querySelector('.title'); // Fetch the title inside the current spell
        title.style.transform = `translateY(-${title.offsetHeight}px)`; // Dynamically set translateY value based on the title's height
        title.style.animationDelay = `${delay}s`; // Set the animation delay
        delay += delayIncrement; // increment delay by delayIncrement seconds for each title
    });
}