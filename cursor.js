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

    // Velocity tracking for distortion
    let velX = 0;
    let velY = 0;

    // Smooth factor
    const ease = 0.15;

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

    // Click effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
        follower.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
        follower.classList.remove('clicking');
    });

    // Smooth follower movement with Jelly Effect
    function render() {
        if (!hasMoved) {
            requestAnimationFrame(render);
            return;
        }

        // Calculate smooth movement
        const targetX = mouseX;
        const targetY = mouseY;

        // Current velocity
        const dx = targetX - posX;
        const dy = targetY - posY;

        posX += dx * ease;
        posY += dy * ease;

        velX = dx * ease;
        velY = dy * ease;

        // Calculate stretch/squeeze based on velocity
        const speed = Math.sqrt(velX * velX + velY * velY);
        const maxSkew = 50; // max velocity clamp
        const scale = Math.min(speed / 200, 0.4); // max scale distortion

        const angle = Math.atan2(velY, velX) * 180 / Math.PI;

        // default scale is 1, stretch x, squeeze y
        const scaleX = 1 + scale;
        const scaleY = 1 - scale;

        // Only apply transform if we are moving significantly
        const transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

        follower.style.transform = transform;

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
