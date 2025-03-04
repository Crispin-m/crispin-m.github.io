// Show loader on page load
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 500); // Match transition duration
    }, 1000); // Show for 1 second (adjust if needed)
});

// Update the existing form submission to show/hide loader
document.getElementById('add-mix-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Show loader
    loader.classList.remove('hidden');

    // Get form values
    const title = document.getElementById('mix-title').value;
    const file = document.getElementById('mix-file').value;
    const cover = document.getElementById('mix-cover').value || 'default-cover.jpg'; // Default if no cover

    // Clone the mix template
    const mixTemplate = document.getElementById('mix-template');
    const newMix = mixTemplate.cloneNode(true);
    newMix.id = ''; // Remove ID to avoid duplicates
    newMix.style.display = 'block'; // Show the clone

    // Update mix content
    newMix.querySelector('.mix-title').textContent = title;
    newMix.querySelector('source').src = file;
    newMix.querySelector('.mix-cover').src = cover;
    newMix.querySelector('.mix-cover').alt = `${title} Cover`;
    newMix.querySelector('.download-btn').onclick = function() { window.location.href = file; };

    // Add to the mixes list
    document.getElementById('mixes-list').appendChild(newMix);

    // Show instructions with file name and generated code
    document.getElementById('file-name').textContent = file;
    const mixCode = `
<div class="mix">
    <img src="${cover}" alt="${title} Cover" class="mix-cover">
    <h3>${title}</h3>
    <audio controls>
        <source src="${file}" type="audio/mp3">
        Your browser doesn’t support audio.
    </audio>
    <button class="download-btn" onclick="window.location.href='${file}'">Download</button>
</div>
    `;
    document.getElementById('mix-code').textContent = mixCode;
    document.getElementById('instructions').style.display = 'block';

    // Hide loader after a short delay (simulating content load)
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 500); // Match transition duration
    }, 1000); // Show loader for 1 second (adjust if needed)

    // Clear form
    this.reset();
});