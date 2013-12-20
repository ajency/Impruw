<?php
/**
 * Template Name: useractivation
 */
//echo ABSPATH;
//include(ABSPATH."wp-content\\themes\impruwmain\User\user_management.php");
//include("/User/user_management.php");
?>
<!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	
	
	<!-- Bootstrap -->
  <!--   <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="css/flat-ui.css" rel="stylesheet" media="screen">
    <link href="css/main.min.css" rel="stylesheet" media="screen">
	<link href="../css/dashboard.css" rel="stylesheet" media="screen">
	-->
	
	
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
        <?php //getThemeCSS(); ?>
	<?php wp_head(); ?>
</head>

<body <?php //body_class(); ?>>



<?php




global $wpdb;
/*if(isset($_REQUEST['action']))
	$pd_action = $_REQUEST['action'];
else
	invalid_newuserverification_key();
*/
if(isset($_REQUEST['key']))
	$pd_key = $_REQUEST['key'];

if(isset($_REQUEST['email']))
	$pd_email = $_REQUEST['email'];

if(isset($_REQUEST['lang']))
	$pd_language = $_REQUEST['lang'];







?>


<div class="aj-imp-container container">
<div class="aj-imp-register-form">
<div class="row">
<div class="col-sm-12 aj-imp-register-header">
<h1><?php echo __('Welcome to','impruwmain');?> <span><?php echo __('Impruw','impruwmain');?></span></h1>
<p class="desc">
<?php echo __('User Activation','impruwmain');?>
</p>
</div>
</div>
<div class="row">
<div class="col-md-12">
<!-- <div class="alert alert-success">
<h2>Congratulations!</h2>
<p>You have successfully registered on Impruw. You will be redirected to your site in a few seconds...</p>
</div>
-->
<?php 
if(!user_activation($pd_email,$pd_key))
{
	$Path=site_url().$_SERVER['REQUEST_URI'];
//	echo $Path."url"; 
	?>



<div class="alert alert-error">
<h2><?php echo __("Seems like your account hasn't been activated.",'impruwmain'); ?></h2>
  						<p><?php echo __("Activate your account using the activation link sent to your email address.  If you don't see it in your inbox check your spam folder.",'impruwmain'); ?></p>
  						<p><?php echo __("Still don't see it? <a href='".$Path."'>Click here to resend  activation mail</a>",'impruwmain');?></p>
  						</div>
  						
  						
 <?php 
}
 ?> 						
  						</div>
  						</div>
  						</div>
  						</div>
		
 

 
  </body>
</html>