document.addEventListener("DOMContentLoaded", function () {
    fetch('labelsdata.json')
        .then(response => response.json())
        .then(data => {
            const footerImages = data;
            const rotatingImagesContainer = document.querySelector('.image-rotator');

            function rotateImages() {
                rotatingImagesContainer.innerHTML = ''; // Clear previous images

                for (let i = 0; i < 3; i++) {
                    const currentIndex = (i + Date.now()) % footerImages.length; // Use Date.now() for randomness
                    const currentImage = footerImages[currentIndex];

                    const imgElement = document.createElement('img');
                    imgElement.src = currentImage.image;
                    imgElement.alt = currentImage.title;
                    rotatingImagesContainer.appendChild(imgElement);
                }
            }

            // Call rotateImages immediately to display the first set of images
            rotateImages();

            // Rotate the images every 3 seconds (adjust the interval as needed)
            setInterval(rotateImages, 3000);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
