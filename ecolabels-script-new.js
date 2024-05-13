document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("image-container");
    const descriptionBox = document.getElementById("description-box");

    // Fetch the JSON data from labelsdata.json
    fetch('labelsdata.json')
        .then(response => response.json())
        .then(data => {
            // Sort the ecolabels alphabetically by their names
            const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));

            sortedData.forEach((item, index) => {
                const imageDiv = document.createElement("div");
                imageDiv.classList.add("image");
                const img = document.createElement("img");
                img.src = item.image;
                const title = document.createElement("div");
                title.textContent = item.title;
                descriptionBox.textContent = "Hover over or click on an ecolabel to learn more!";

                img.addEventListener("click", () => {
                    // Redirect to the respective link when the image is clicked
                    //window.location.href = item.link;
                    window.open(item.link, '_blank');
                });

                img.addEventListener("mouseover", () => {
                    // Display the description when hovering over the image
                    descriptionBox.style.display = "block";
                    descriptionBox.textContent = item.description;
                    descriptionBox.style.top = `${img.offsetTop + img.clientHeight}px`;
                    descriptionBox.style.left = `${img.offsetLeft}px`;
                });

                img.addEventListener("mouseout", () => {
                    // Hide the description when moving the mouse away from the image
                    descriptionBox.style.display = "block";
                    descriptionBox.textContent = "Hover over or click on an ecolabel to learn more!";
                });

                imageDiv.appendChild(img);
                imageDiv.appendChild(title);
                container.appendChild(imageDiv);
            });
        })
        .catch(error => {
            console.error("Error while fetching JSON data:", error);
        });
});
