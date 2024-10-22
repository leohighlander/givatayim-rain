function animateRain(canvas) {
    const ctx = canvas.getContext('2d');

    // Example: Animate raindrops on the canvas
    const raindrops = [];

    function addRaindrop() {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: 0,
            speed: Math.random() * 5 + 2,
        });
    }

    function drawRaindrops() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        raindrops.forEach((raindrop, index) => {
            raindrop.y += raindrop.speed;
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(raindrop.x, raindrop.y, 2, 0, Math.PI * 2);
            ctx.fill();

            // Remove raindrop if it's out of view
            if (raindrop.y > canvas.height) {
                raindrops.splice(index, 1);
            }
        });
    }

    function update() {
        drawRaindrops();
        requestAnimationFrame(update);
    }

    // Create new raindrops periodically
    setInterval(addRaindrop, 100);
    update();
}
