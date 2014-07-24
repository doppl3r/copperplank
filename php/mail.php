<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>PHPMailer - mail() test</title>
</head>
<body>
<?php
require 'class.phpmailer.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();
//$mail->isSendmail();
//Set who the message is to be sent from
$mail->setFrom($_REQUEST['email'], $_REQUEST['email']);
//Set who the message is to be sent to
$mail->addAddress('deben3@gmail.com', 'Climatec');
$mail->addAddress($_REQUEST['email'], $_REQUEST['name']);
//Set the subject line
$mail->Subject = 'Join Climatec';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
//Replace the plain text body with one created manually
$mail->AltBody = 'Contact Information';
//Attach an image file
//if (isset($_FILES['uploaded_file']) &&  $_FILES['uploaded_file']['error'] == UPLOAD_ERR_OK) {
//    if ($_FILES['uploaded_file']['type'] == 'application/msword' ||
//        $_FILES['uploaded_file']['type'] == 'application/pdf'){
        $mail->AddAttachment(canvas.toDataURL("image/png"));
        //$mail->AddAttachment($_FILES['uploaded_file']['tmp_name'],$_FILES['uploaded_file']['name']);
//    }
//}

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    //header('Location:contactus-thankyou.php');
    //header('Location: /index.html');
    echo '<script>window.location = "../success.html";</script>';
}
?>
</body>
</html>
