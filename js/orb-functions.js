document.addEventListener("DOMContentLoaded", function() {
    
    /* 
     *
     *   ANIMATING PANNING IMAGES IN HEALTH ORB 
     *
     */
    function animatePanningImages(parentId, direction) {
        const parentElement = document.getElementById(parentId);
        if (parentElement.classList.contains('deactivate')) {
            return;
        }
        else {
            // Horizontal Images Set 1
            const images = parentElement.querySelectorAll('.panning-image');
            let speed = 2; // Adjust this value to change the speed
    
            // Initialize positions for horizontal images set 1
            images.forEach((img, index) => {
                img.style[direction] = (img.width * index) + "px";
            });
    
            // Horizontal Images Set 2
            const secondSetImages = parentElement.querySelectorAll('.panning-image-2');
            let secondSetSpeed = 1; // Adjust this value to change the speed
    
            // Initialize positions for Horizontal Images Set 2
            secondSetImages.forEach((img, index) => {
                img.style[direction] = (img.width * index) + "px";
            });
            
            let framesToSkip = 3; // Adjust to skip more or fewer frames
            let currentFrame = 0;
            
            function animateAll() {
                if (currentFrame % framesToSkip === 0) {
                    // Animate Horizontal Images
                    for (let img of images) {
                        img.style[direction] = (parseInt(img.style[direction] || 0) - speed) + "px";
                        if (parseInt(img.style[direction]) <= -img.width) {
                            img.style[direction] = img.width * (images.length - 1) + "px";
                        }
                    }
            
                    // Animate Horizontal Images Set 2
                    for (let img of secondSetImages) {
                        img.style[direction] = (parseInt(img.style[direction] || 0) - secondSetSpeed) + "px";
                        if (parseInt(img.style[direction]) <= -img.height) {
                            img.style[direction] = img.height * (secondSetImages.length - 1) + "px";
                        }
                    }
                }
                currentFrame++;
                
                requestAnimationFrame(animateAll);
            }
    
            // Event listeners to change speed on hover, focus, and active states
            parentElement.addEventListener('mouseenter', () => framesToSkip = 1);
            parentElement.addEventListener('mouseleave', () => framesToSkip = 3);
            parentElement.addEventListener('focusin', () => framesToSkip = 1);
            parentElement.addEventListener('focusout', () => framesToSkip = 3);
            parentElement.addEventListener('mousedown', () => {
                if (parentId == 'mana') {
                    if (parentElement.classList.contains('deactivate')) {
                        parentElement.classList.remove('deactivate');
                    } else {
                        parentElement.classList.add('deactivate');
                    }
                }
                framesToSkip = 0;
            });
            parentElement.addEventListener('mouseup', () => framesToSkip = 3);
    
            animateAll();
        }
    }
    animatePanningImages('health', 'right', true);
    animatePanningImages('mana', 'left', true);
    
    /* 
     *
     *   END OF - ANIMATING PANNING IMAGES IN HEALTH ORB 
     *
     */
    
    
    /* 
     *
     *   ADJUST HEALTH FILL CLIPPING
     *
     */
        function adjustClipBasedOnDamage(percentage) {
                const healthClipElements = document.querySelectorAll('#health .orb-clip');
                const clipStart = percentage;
                healthClipElements.forEach(healthClipEle => {
                    healthClipEle.style.clipPath = `polygon(0% ${clipStart}%, 100% ${clipStart}%, 100% 100%, 0% 100%)`;
                });
            if (percentage !== 0) {
                const healthFillTop = document.querySelector('#health .orb-fill-top');
                healthFillTop.style.display = 'block';
                
                // Calculate width based on the radius of the cicle -> 220 / 2 = 110
                const r = 110; 
                const h = r - (clipStart / 100 * 2 * r); 
                const x = Math.sqrt(r * r - h * h);
                const adjustedWidth = 2 * x;
                healthFillTop.style.setProperty('--adjusted-width', `${adjustedWidth}px`);
                //adjust left property for the top to be centered in the parent div
                const leftAdjustment = (220 - adjustedWidth) / 2;
                healthFillTop.style.left = `${leftAdjustment}px`;
    
                //adjust height around 50% position
                const adjustedHeight = getAdjustedHeight(clipStart);
                healthFillTop.style.height = `${adjustedHeight}px`;
    
                //adjust top position correctly based on the dyanmic height change of the element
                let newHeightDiff = 15 - adjustedHeight; //elements height minus newheight / 2, to center it
                const adjustedTop = -220 * (1 - clipStart / 100) - 9;
                healthFillTop.style.setProperty('--adjusted-top', `${adjustedTop + newHeightDiff / 2}px`);
            }
            else {
                healthFillTop.style.display = 'none';
            }
        }
        function getAdjustedHeight(clipStart) {
            if (clipStart <= 50) {
                // Interpolate between 1% -> 50%
                return 15 * (clipStart - 1) / 49;
            } else {
                // Interpolate between 50% -> 99%
                return 15 * (99 - clipStart) / 49;
            }
        }
        adjustClipBasedOnDamage(50); //test call, delete after u create damage function
    /* 
     *
     *   END OF - ADJUST HEALTH FILL CLIPPING
     *
     */
});