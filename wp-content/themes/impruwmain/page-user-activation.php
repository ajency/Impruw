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





if(!user_activation('kalpesh@mailinator.com','aaaaadfg45b4t54ynfhj78midbdfg','en'))
		echo "Invalid user key .... ";
//$user = user_activation($pd_email,$pd_key,$pd_language);

/*
if($pd_action=="ver")
{
	//echo"teset";
	$user_table = $wpdb->base_prefix.'users';
	//$res_verify_user =    $wpdb->get_results($wpdb->prepare("SELECT count(*) as user_count FROM $user_table WHERE user_email = %s AND user_status=%f and user_activation_key = '%s'", $pd_email, 2,$pd_key),OBJECT);
	$res_verify_user =    $wpdb->get_results($wpdb->prepare("SELECT ID  FROM $user_table WHERE user_email = %s  ", 'parag@ajency.in'),OBJECT);
	
//	var_dump($res_verify_user);
	

	if(count($res_verify_user)>0)
	{
		//echo"test2";
		foreach($res_verify_user as $res_verify_usr)
		{	
			//echo "test3";
			if($res_verify_usr->ID>0)
			{
				//echo "test4";
				//activate the user
				$wpdb->update($wpdb->users, array('user_activation_key' => ""), array('user_email' =>$pd_email));
				$wpdb->update($wpdb->users, array('user_status' => 0), array('user_email' => $pd_email));
				
				echo "
				<div class='container'>
					<div class='main-content '>
					<div class='alert alert-info ' style='width:70%;margin:auto;border: 10px solid rgba(204, 204, 204, 0.57);margin-top:10%;margin-bottom:10%'>
							<h4 style='text-align:center'>Your account is successfully verified.</h4>
							<hr>
							<img src='".get_template_directory_uri()."/images/big-minyawns.png'/ style='margin:auto;display:block;'><br>
							<b style='text-align:center;' >your email is successfully verified please <a href='#mylogin' data-toggle='modal' id='btn__login'>login</a> here </b>
							</div>
					</div>
				</div>
				
				";
				
				
				$subject = "Your registration is approved on Impruw";
				$message="Hi, <br/><br/>Your registration is approved on Impruw.<br/><br/> You can visit <a href='".site_url()."' >Impruw</a> to log in";
				add_filter('wp_mail_content_type',create_function('', 'return "text/html";'));
				$headers = 'From: Impruw <support@minyawns.com>' . "\r\n";
				wp_mail($pd_email, $subject,email_header().$message.email_signature(),$headers);
				
			}
			else
			{
				invalid_newuserverification_key();
			}
		}
	}
}
*/
?>

<?php /*


    <div class="aj-imp-container container">
		<div class="aj-imp-login-form">
			<div class="row">
				<div class="col-sm-12 aj-imp-login-header">
					<h1><?php echo __('Login','impruwmain'); ?> <span><?php echo __('Impruw','impruwmain');?></span></h1>
					<p class="desc">
						<?php echo __('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','impruwmain'); ?>
					</p>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12 aj-imp-login">
					<form class="form-horizontal clearfix"  parsley-validate  >
						<div class="row">
							<label for="inputEmail" class="col-sm-3 control-label"><?php echo __('Email','impruwmain'); ?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="email" class="form-control" id="inputEmail" placeholder="Email"  required   parsley-trigger="blur" parsley-validation-minlength="0"    parsley-required-message="Please Enter Email">
								</div>
							</div>
						</div>
						<div class="row">
							<label for="inputPass" class="col-sm-3 control-label"><?php echo __('Password','impruwmain'); ?></label>
							<div class="col-sm-7">
								<div class="form-group">
									<input type="password" class="form-control" id="inputPass" placeholder="Password"   required   parsley-trigger="blur" parsley-validation-minlength="0"    parsley-required-message="Please Enter Password">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<button type="submit" class="btn btn-wide aj-imp-submit"><?php echo __('Login','impruwmain'); ?></button>
									<a href="#" class="aj-imp-log-forgot"><?php echo __('Forgot your password?','impruwmain'); ?></a>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-offset-3 col-sm-7">
								<div class="form-group">
									<?php echo __('Dont have an account','impruwmain?'); ?> <a href="register.html"><?php echo __('Sign Up','impruwmain'); ?></a>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery-2.0.3.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/flatui-checkbox.js"></script>
    <script src="js/bootstrap-select.js"></script>
    <script src="js/flatui-radio.js"></script>
	<script>
		jQuery("select").selectpicker();
	</script>
	
	*/ ?>
  </body>
</html>