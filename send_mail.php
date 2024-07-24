<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "contact@goodbuys.info";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Email successfully sent!";
    } else {
        echo "Failed to send the email, please try again.";
    }
}
<<<<<<< HEAD
?>
=======
?>
>>>>>>> new-merge
