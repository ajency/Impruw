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

if ( isset( $_GET[ 'sim' ] ) && $_GET[ 'sim' ] == 'true' ) {

	$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	// print_r($actual_link);
	$url =  substr($actual_link, 0,-9);
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
	    <script type="text/javascript" src="<?php echo site_url(); ?>/wp-content/themes/impruwclientparent/js/preview-init.js"></script>


	</head>
	<body style="height:97%; margin:0px">
		<div id="tools" style="display:flex">
		    <h1>Responsive Preview</h1>
		    <p>Select a size range to preview your page at.</p>
		    <ul class="nav size" id="nav">
		        <li class="active"><a href="#" id="size-full" >Full</a></li>
		        <li><a href="#" id="size-tab">Tablet</a></li>
		        <li><a href="#" id="size-mobile">Mobile</a></li>
		    </ul>
		</div>
		<div id="viewport" style="margin-left:auto; margin-right:auto;">
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