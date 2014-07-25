<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>CopperPlank</title>
</head>
<body>
<?php
require 'class.phpmailer.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();
$mail->IsHTML(true);
//$mail->isSendmail();
//Set who the message is to be sent from
$mail->setFrom($_REQUEST['email'], $_REQUEST['email']);
//Set who the message is to be sent to
$mail->addAddress('deben3@gmail.com', 'Copper Plank');
$mail->addAddress($_REQUEST['email'], $_REQUEST['name']);
//Set the subject line
$mail->Subject = 'Copper Plank Wood Color';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$message =  '<h1>Copper Plank Message</h1>'.
            '<p>Your unique wood color is: </p>'.
            '<a href="http://doppl3r.com/copperplank/'.$_REQUEST['name'].'">'.$_REQUEST['name'].'</a>';
$mail->msgHTML($message);
//$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
//Replace the plain text body with one created manually
$mail->AltBody = 'Your unique wood color is: '+$_REQUEST['name'];
//Attach an image file
$mail->AddAttachment($_FILES['uploaded_file']['tmp_name'],$_FILES['uploaded_file']['name']);
//$mail->AddStringAttachment($_REQUEST['name']);
;

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    //header('Location:contactus-thankyou.php');
    //header('Location: /index.html');
    //echo '<script>window.location = "../success.html";</script>';
}
?>
</body>
</html>
