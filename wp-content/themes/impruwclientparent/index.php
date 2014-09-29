<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme and one of the
 * two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * For example, it puts together the home page when no home.php file exists.
 *
 * @link       http://codex.wordpress.org/Template_Hierarchy
 *
 * @package    Impruw
 * @subpackage Impruw Site
 * @since      Impruw Site 1.0
 */
define( 'SITE_VIEW', TRUE );

if ( isset( $_GET[ 'sim' ] ) ) {

	$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	// print_r($actual_link);
	$sim = $_GET['sim'];
	// $url =  substr($actual_link, 0,-9);
	$url = str_replace("&sim=full", "", $actual_link);
	$url = str_replace("?sim=full", "", $url);
	$url = str_replace("&sim=tab", "", $url);
	$url = str_replace("?sim=tab", "", $url);
	$url = str_replace("&sim=mob", "", $url);
	$url = str_replace("?sim=mob", "", $url);

	// print_r($url);
	?>
	<!DOCTYPE html>
	<!--[if IE 7]>
	<html class="ie ie7" <?php language_attributes(); ?>>
	<![endif]-->
	<!--[if IE 8]>
	<html class="ie ie8" <?php language_attributes(); ?>>
	<![endif]-->
	<!--[if !(IE 7) | !(IE 8)  ]><!-->
	<html <?php language_attributes(); ?> style="height:100%">
	<!--<![endif]-->
	<head>
	    <meta charset="<?php bloginfo( 'charset' ); ?>">
	    <meta name="viewport" content="width=device-width">
	    <script type="text/javascript" src="<?php echo site_url(); ?>/wp-includes/js/jquery/jquery.js?ver=1.11.0"></script>
	    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/jquery.tabSlideOut.v1.3.js"></script>
	   
	    <script type="text/javascript" src="<?php echo site_url(); ?>/wp-content/themes/impruwclientparent/js/preview-init.js"></script>
	   
	    <style type="text/css">
		    li{
		    	display: inline;
		    }
		    .options-div {

	            background: #333;
	            width: 200px;
	            padding: 0.5em;
	            color: #fff;
	            z-index: 9999;
	            border-radius: 0 0 2px 0;
	            height: auto !important;
	        }
	        .options-div .handle {
	            background: #333;
	            padding: 0.4em 0.5em 0.5em;
	            color: #fff;
	            font-size: 1.5em;
	            border-radius: 0 2px 2px 0;
	            /*right: 95px*/
	        }
	        .options-div.open .handle {
	            right: -42px !important;
	        }
	        .options-div .handle:hover {
	            color: #FF7E00
	        }
	        .options-div h5 {
	            font-size: 1.2em;
	            text-transform: uppercase;
	        }
	    </style>

	</head>
	<body style="height:97%; margin:0px">

		<div class="options-div">
        	<a class="handle" href="#"><span class="glyphicon glyphicon-cog"></span></a>
		    <ul class="nav size" id="nav">
		    	
		        <li <?php if($sim == 'full') echo "class='active'"; ?> >
		        	<a href="<?php echo $url ?>&sim=full" id="size-full" >Full</a>
		        </li>
		        <li <?php if($sim == 'tab') echo "class='active'"; ?> >
		        	<a href="<?php echo $url ?>&sim=tab" id="size-tab">Tablet</a>
		        </li>
		        <li <?php if($sim == 'mob') echo "class='active'"; ?> >
		        	<a href="<?php echo $url ?>&sim=mob" id="size-mobile">Mobile</a>
		        </li>
		    </ul>
		</div>
		<?php
		if($sim == 'full')
			echo '<div id="viewport" style="margin-left:auto; margin-right:auto; height:100%; width:100%; "> ';
		elseif ($sim == 'tab')
			echo '<div id="viewport" style="margin-left:auto; margin-right:auto; height:1024px; width:768px;">';
		elseif ($sim == 'mob')
			echo '<div id="viewport" style="margin-left:auto; margin-right:auto; height:480px; width:320px;">';		
		?>
			<iframe  src="<?php echo $url; ?>" style="height:100%; width:100%"></iframe>
		</div>
	</body>
	</html>
	<?php
}
else{
	get_header();
	?>

	    <div class="site-page">
	        <?php echo generate_markup( 'page' ); ?>
	    </div><!-- .site-page -->

	<?php
	get_footer();
}