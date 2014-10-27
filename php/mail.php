<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Infinity Color System</title>
</head>
<body>
<?php
require 'class.phpmailer.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();
$mail->IsHTML(true);
//Set who the message is to be sent from
$mail->setFrom('matt@copperplank.com','Infinity Color System Team');
//Set who the message is to be sent to
//$mail->addAddress('deben3@gmail.com', 'Copper Plank');
$mail->addAddress($_REQUEST['email'], $_REQUEST['index']);
$mail->addAddress('matt@copperplank.com');
//Set the subject line
$mail->Subject = 'Infinity Color System Wood Color';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$message =  '<div style="border: 1px dashed #4e381a; border-radius: 5px; padding: 0px 24px 24px;">'.
            '<p style="color: #4e381a;">'.'Congratulations '.$_REQUEST['name'].'! You have created a custom color '.
            'for the '.$_REQUEST['project'].'. I am sure you and the '.$_REQUEST['firm'].' firm '.
            'will be impressed with the samples we created for you. We will store this and '.
            'the other colors you create for this project and one of our team will be in '.
            'touch to discuss the samples we make for you.'.'</p>'.
            '<h3 style="color: #4e381a; border-top: 1px dashed #4e381a; padding-top: 12px;">Infinity Color System Receipt</h3>'.
            '<p style="color: #4e381a;"><strong>Customer:</strong> '.$_REQUEST['name'].'</p>'.
            '<p style="color: #4e381a;"><strong>Firm Name:</strong> '.$_REQUEST['firm'].'</p>'.
            '<p style="color: #4e381a;"><strong>Project Name:</strong> '.$_REQUEST['project'].'</p>'.
            '<p style="color: #4e381a;"><strong>Phone Number:</strong> '.$_REQUEST['phone'].'</p>'.
            '<p style="color: #4e381a;"><strong>Unique Wood Code:</strong> </p>'.
            '<a style="display: inline-block; margin-top: 12px; color: #FFF; text-decoration: none; background-color: #4e381a; padding: 12px;" href="http://doppl3r.com/copperplank/'.$_REQUEST['index'].'#section3">'.$_REQUEST['index'].'</a>'.
            '</div>';
$mail->msgHTML($message);
$mail->AltBody = 'Unique wood color code: '+$_REQUEST['index'];

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo '<script>
            window.location = "../'.$_REQUEST['index'].'#section3";
            alert("Your unique color was successfully delivered! Check your email for additional details!");
        </script>';
}
?>
</body>
</html>
