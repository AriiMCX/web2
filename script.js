const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const shareButton = document.getElementById('shareButton');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const videoLink = document.getElementById('videoLink');

let uploadedVideoURL = null;

uploadButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadedVideoURL = URL.createObjectURL(file);
    shareButton.hidden = false;
  }
});

shareButton.addEventListener('click', () => {
  if (uploadedVideoURL) {
    // Show progress bar and disable the share button
    progressContainer.hidden = false;
    shareButton.disabled = true;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${progress}%`;

      if (progress === 100) {
        clearInterval(interval);
        videoLink.href = uploadedVideoURL;
        videoLink.style.display = 'block'; // Show the link after progress is 100%
      }
    }, 200); // Progress increments every 200ms, so 1% per 2 seconds
  }
});
