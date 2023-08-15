document.addEventListener("DOMContentLoaded", function() {
    
/* 
 *
 *   ANIMATING PANNING IMAGES IN HEALTH ORB 
 *
 */
    // Horizontal Images
    const images = document.querySelectorAll('.panning-image');
    let speed = 1; // Adjust this value to change the speed

    // Initialize positions for horizontal images
    images.forEach((img, index) => {
        img.style.left = (img.width * index) + "px";
    });

    // Vertical Images
    const verticalImages = document.querySelectorAll('.panning-image-2');
    let verticalSpeed = 1; // Adjust this value to change the speed

    // Initialize positions for vertical images
    verticalImages.forEach((img, index) => {
        img.style.top = (img.height * index) + "px";
    });

    let framesToSkip = 3; // Adjust to skip more or fewer frames
    let currentFrame = 0;

    function animateAll() {
        if (currentFrame % framesToSkip === 0) {
            // Animate Horizontal Images
            for (let img of images) {
                img.style.left = (parseInt(img.style.left || 0) - speed) + "px";
                if (parseInt(img.style.left) <= -img.width) {
                    img.style.left = img.width * (images.length - 1) + "px";
                }
            }
    
            // Animate Vertical Images
            for (let img of verticalImages) {
                img.style.top = (parseInt(img.style.top || 0) - verticalSpeed) + "px";
                if (parseInt(img.style.top) <= -img.height) {
                    img.style.top = img.height * (verticalImages.length - 1) + "px";
                }
            }
        }
    
        currentFrame++;
        requestAnimationFrame(animateAll);
    }

    animateAll();
/* 
 *
 *   END OF - ANIMATING PANNING IMAGES IN HEALTH ORB 
 *
 */
const circles = document.querySelectorAll('.circle');
    
    circles.forEach(circle => {
        /* circle.style.clipPath = 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)'; */
    });

});
