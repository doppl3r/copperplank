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
//Set who the message is to be sent from
$mail->setFrom('matt@copperplank.com','CopperPlank');
//Set who the message is to be sent to
//$mail->addAddress('deben3@gmail.com', 'Copper Plank');
$mail->addAddress($_REQUEST['email'], $_REQUEST['index']);
//Set the subject line
$mail->Subject = 'Copper Plank Wood Color';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$message =  '<h1>Copper Plank Message</h1>'.
            '<h2>Customer: '.$_REQUEST['name'].'</h2>'.
            '<p>Your unique wood color is: </p>'.
            '<a href="http://doppl3r.com/copperplank/'.$_REQUEST['index'].'">'.$_REQUEST['index'].'</a>';
$mail->msgHTML($message);
$mail->AltBody = 'Your unique wood color is: '+$_REQUEST['index'];

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo '<script>window.location = "../'.$_REQUEST['index'].'";</script>';
}
?>
</body>
</html>
