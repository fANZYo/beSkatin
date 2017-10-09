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

$email_from = 'request@beskatin.co.uk';//<== update the email address
$email_subject = "New Form submission";

$email_body = "You have received a new message from the user $name about $class $slide.\n".
    "Here is the message:\n $message \n".
    
$to = "contact@beskatin.co.uk";//<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
//done. redirect to thank-you page.

$amount = '0';

if($class == 'group' || $class == 'workshop'){
	$amount = '40';
}
if($class == 'private'){
	$amount = '35';
}

$query_data = array(
	'amount' => $amount,
	'business' => 'contact@beskatin.co.uk',
	'cmd' => '_xclick',
	'currency_code' => 'GBP',
	'item_name' => $_POST['class'] . ' class'
);

if($class != 'other'){
	header('Location: https://www.paypal.com/?' . http_build_query($query_data));
}else {
	header('Location: thank.html');
}


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
