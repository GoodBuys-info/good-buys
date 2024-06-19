// Pop Up for the ecolabels page
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopup');

    // Function for the popup with slide-in effect
    function showPopup() {
        popup.style.display = 'block';
        setTimeout(function() {
            popup.classList.add('show');
        }, 100); // Delay to trigger the transition
    }

    // Function for the po up to hide with slide-out effect 
        function hidePopup() {
        popup.classList.remove('show');
        setTimeout(function() {
            popup.style.display = 'none';
        }, 500); // Wait for the transition to complete before hiding
    }

    // Show the popup when the page loads for the first time
    showPopup();

    // Hide the popup after 7 seconds if not closed by the user
    setTimeout(function() {
        hidePopup();
    }, 7000);

    // Close the popup when the close button is clicked
    closePopupBtn.addEventListener('click', function () {
        hidePopup();
    });

    // Close the popup when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === popup) {
            hidePopup();
        }
    });
});
