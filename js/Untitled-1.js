document.addEventListener("DOMContentLoaded", function() {
    
    let openedDescription = null;  // Maintain a reference to the currently opened description.

    // Centralized registry of elements to check clicks against
    const activeElements = new Set();

    // Standalone handler for document-level clicks
    document.addEventListener('click', (e) => {
        activeElements.forEach((elementData) => {
            const isClickInside = elementData.element.contains(e.target);
            if (!isClickInside && elementData.callback) {
                elementData.callback(e);
            }
        });
    });

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

            this.elements.forEach(ele => {

                // Bind the handleClick function to the current instance of ClickHandler
                const boundHandleClick = this.handleClick.bind(this);

                // Define the click event handler function
                const clickHandlerFunction = (e) => {
                    boundHandleClick(e, ele);
                };

                // When an instance is created, register its element with the centralized handler
                const activeElem = {
                    element: ele,
                    eleClickEvent: () => {
                        ele.addEventListener('click', clickHandlerFunction);
                    },
                    eleDeregisterClickEvent: () => {
                        ele.removeEventListener('click', clickHandlerFunction);
                    },
                    /* documentClickEvent: () => {

                    }, */
                    callback: clickOutsideCallback
                };
                // Add the object to the activeElements Set
                activeElements.add(activeElem);

                // Immediately call the eleClickEvent method for the object
                activeElem.eleClickEvent();
            });

        }

        cleanup() {
            const elementsArray = Array.from(document.querySelectorAll(this.elementSelector));
            elementsArray.forEach(ele => {
                activeElements.forEach(activeElementData => {
                    if (activeElementData.element === ele) {
                        activeElementData.eleDeregisterClickEvent();
                        activeElements.delete(activeElementData);
                    }
                });
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
                this.handleDoubleClick(e, ele);
            }
        }

        handleDoubleClick(e, ele) {
            // Manually call clickOutsideCallback
            e.stopPropagation();
            if (this.clickOutsideCallback) {
                this.clickOutsideCallback(e);
            }

            const inputValue = ele.innerText.trim();
            const inputElem = document.createElement(this.doubleClickElementType);

            inputElem.classList.add(this.cssClass);
            inputElem.value = inputValue || 'Add your text...';

            let allowRevertToOriginal = true;

            const revertToOriginal = (eventType) => {
                if (allowRevertToOriginal || eventType == 'keydown') { // we are making this check because on keydown this func was called twice cause of blur event listener and caused a js error
                    ele.innerText = inputElem.value || 'Add your text...';;
                    if (inputElem.parentNode) {
                        inputElem.parentNode.replaceChild(ele, inputElem);
                    }
                }
            }

            inputElem.addEventListener('blur', () => {
                revertToOriginal('blur');
            });
            inputElem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    allowRevertToOriginal = false;
                    revertToOriginal('keydown');   
                }
            });

            ele.parentNode.replaceChild(inputElem, ele);
            inputElem.focus();

            this.doubleClickHelperFunc && this.doubleClickHelperFunc(inputElem);
        }
    }
    const clickHandlerInstanceSpellTitle = new ClickHandler('.spell-lvl-slots .spell .title', toggleDescription, 'input', 'spell-edit-title', null, (e) => {
        // Check if the event target is not inside the openedDescription
        if (openedDescription && !openedDescription.contains(e.target)) {
            openedDescription.style.display = 'none';
            openedDescription = null;
        }
    });
    const clickHandlerInstanceSpellDescription = new ClickHandler('.spell-lvl-slots .spell .description span', null, 'textarea', 'spell-edit-description', adjustTextareaHeight);
    const clickHandlerInstanceSpellHeadingLevel = new ClickHandler('.spell-lvl-slots .spell-lvl-heading h2 span.level', null, 'input', 'spell-edit-heading', spellLevelInputWidthAdjust, null);
    // Later, when you're done with the instance:
    clickHandlerInstanceSpellTitle.cleanup();
    clickHandlerInstanceSpellDescription.cleanup();
    clickHandlerInstanceSpellHeadingLevel.cleanup();


    function spellLevelInputWidthAdjust(inputElem) {
        const adjustWidth = () => {
            inputElem.style.width = `${inputElem.scrollWidth - 6.5}px`;
            inputElem.style.marginLeft = '-1px';
            inputElem.style.marginRight = '-1px';
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
