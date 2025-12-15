document.addEventListener('DOMContentLoaded', () => {
    // Only on desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';

    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';

    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Initial position to avoid flying in from top-left
    let hasMoved = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!hasMoved) {
            posX = mouseX;
            posY = mouseY;
            hasMoved = true;
        }

        // Instant update for the dot
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follower movement
    function render() {
        // Lerp factor (lower = smoother/slower lag)
        const dt = 1.0 - Math.pow(1.0 - 0.15, 1);

        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;

        follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;

        requestAnimationFrame(render);
    }

    if (!window.matchMedia("(pointer: coarse)").matches) {
        render();
    }

    // Hover effects
    const clickables = document.querySelectorAll('a, button, .project-card, .blog-post');

    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
});
