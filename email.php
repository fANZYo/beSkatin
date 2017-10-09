<?php
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];
$class = $_POST['class'];
$slide = $_POST['slide'];
$workshop = $_POST['workshop'];

//Validate first
if(empty($name)||empty($visitor_email)) 
{
    echo "Name and email are mandatory!";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

if($class != 'slide'){
	$slide = '';
}

$email_from = 'contact@beskatin.co.uk';//<== update the email address
$email_subject = "New Form submission";
$email_body = "You have received a new message from the user $name about $class $slide.\n".
    "Here is the message:\n $message \n".
    
$to = "www.iehl@gmail.com";//<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
//done. redirect to thank-you page.

$amount = '0';
$dest = '';
$item_name = '';

if($class == 'group'){
	$amount = '40';
	$dest = 'http://beskatin.co.uk/thankg.html';
	$item_name = 'Group class';
}
if($class == 'slide'){
	$amount = '35';
	$dest = 'http://beskatin.co.uk/thankp.html';
	$item_name = 'Private lesson';
}
if($class == 'workshop'){
	$amount = '40';
	$dest = 'http://beskatin.co.uk/thankp.html';
	$item_name = 'Forward Stride Workshop';
}

$query_data = array(
	'item_name' => $item_name,
	'amount' => $amount,
	'business' => 'www.iehl@gmail.com',
	'cmd' => '_xclick',
	'currency_code' => 'GBP',
	'return' => $dest,
);

header('Location: https://www.paypal.com/?' . http_build_query($query_data));


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 
