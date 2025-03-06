// Show loader on page load
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const mixes = [
        { title: "Mix 1", file: "trap.mp3" },
        { title: "Mix 2", file: "Rise-Mix.mp3" },
        { title: "Mix 3", file: "dancehall.mp3" },
        { title: "Mix 4", file: "afro1.mp3" }
    ];

    // Initialize mixes
    const mixStack = document.getElementById('mix-stack');
    let currentIndex = 0;

    function renderMixes() {
        mixStack.innerHTML = '';
        mixes.forEach((mix, index) => {
            const mixDiv = document.createElement('div');
            mixDiv.className = 'mix' + (index === currentIndex ? ' active' : '');
            mixDiv.innerHTML = `
                <h3>${mix.title}</h3>
                <audio controls>
                    <source src="${mix.file}" type="audio/mp3">
                    Your browser doesn’t support audio.
                </audio>
                <button class="download-btn" onclick="window.location.href='${mix.file}'">Download</button>
            `;
            mixStack.appendChild(mixDiv);
        });
    }

    // Handle swiping
    let touchStartX = 0;
    let touchEndX = 0;

    mixStack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    mixStack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 50) { // Threshold for swipe
            if (deltaX > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (deltaX < 0 && currentIndex < mixes.length - 1) {
                currentIndex++;
            }
            renderMixes();
        }
    }

    // Handle navigation buttons
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderMixes();
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentIndex < mixes.length - 1) {
            currentIndex++;
            renderMixes();
        }
    });

    // Hide loader after rendering
    renderMixes();
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);
});