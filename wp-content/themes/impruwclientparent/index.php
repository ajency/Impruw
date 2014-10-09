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
	$url = str_replace("&sim=tabl", "", $url);
	$url = str_replace("?sim=tabl", "", $url);
	$url = str_replace("&sim=tabp", "", $url);
	$url = str_replace("?sim=tabp", "", $url);
	$url = str_replace("&sim=mobl", "", $url);
	$url = str_replace("?sim=mobl", "", $url);
	$url = str_replace("&sim=mobp", "", $url);
	$url = str_replace("?sim=mobp", "", $url);

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
	<html <?php language_attributes(); ?> >
	<!--<![endif]-->
	<head>
	    <meta charset="<?php bloginfo( 'charset' ); ?>">
	    <meta name="viewport" content="width=device-width">
	    <script type="text/javascript" src="<?php echo site_url(); ?>/wp-includes/js/jquery/jquery.js?ver=1.11.0"></script>
	    <script type="text/javascript" src="<?php echo network_site_url(); ?>wp-content/themes/impruwclientparent/js/bootstrap.min.js"></script>
	    <link rel="stylesheet" type="text/css" href="<?php echo network_site_url(); ?>wp-content/themes/impruwclientparent/css/bootstrap.min.css" /> <link rel="stylesheet" type="text/css" href="<?php echo network_site_url(); ?>wp-content/themes/impruwclientparent/dashboard/css/icon-fonts.css" /> 
	    <link rel="stylesheet" type="text/css" href="<?php echo network_site_url(); ?>wp-content/themes/impruwclientparent/builder/css/builder.css" />
	  <!-- 
	    <script type="text/javascript" src="<?php echo site_url(); ?>/wp-content/themes/impruwclientparent/js/preview-init.js"></script>
	   --> 
	    <script type="text/javascript">
	    	jQuery(document).ready(function($) {
	    		//init tooltips
	    		jQuery('.size li').tooltip();

	    		function setHeight(){
	    			jQuery('#viewport').height( jQuery('.preview-body').height() - jQuery('.preview-selector').height() - 16);
	    		}

	    		jQuery(window).resize(function(){
	    			setHeight();
	    		});

	    		setHeight();

	    	});
	    </script>

	</head>
	<body class="preview-body">

		<div class="preview-selector">
		    <ul class="size" id="nav">
		        <li <?php if($sim == 'full') echo "class='active'"; ?> data-toggle="tooltip" title="Full Width" data-placement="bottom">
		        	<a href="<?php echo $url ?>&sim=full" id="size-full" ><span class="icon icon-monitor"></span></a>
		        </li>
		        <li <?php if($sim == 'tabl') echo "class='active'"; ?> data-toggle="tooltip" title="Landscape Tab - 1024px" data-placement="bottom">
		        	<a class="landscape" href="<?php echo $url ?>&sim=tabl" id="size-tabl"><span class="icon icon-tablet"></span></a>
		        </li>
		        <li <?php if($sim == 'tabp') echo "class='active'"; ?> data-toggle="tooltip" title="Portrait Tab - 768px" data-placement="bottom">
		        	<a href="<?php echo $url ?>&sim=tabp" id="size-tabp"><span class="icon icon-tablet"></span></a>
		        </li>
		        <li <?php if($sim == 'mobl') echo "class='active'"; ?> data-toggle="tooltip" title="Landscape Mobile - 480px" data-placement="bottom">
		        	<a class="landscape" href="<?php echo $url ?>&sim=mobl" id="size-mobilel"><span class="icon icon-phone"></span></a>
		        </li>
		        <li <?php if($sim == 'mobp') echo "class='active'"; ?> data-toggle="tooltip" title="Portrait Phone - 320px" data-placement="bottom">
		        	<a href="<?php echo $url ?>&sim=mobp" id="size-mobilep"><span class="icon icon-phone"></span></a>
		        </li>
		    </ul>

		    <div class="preview-header">
		    	<h1>You are currently viewing preview version</h1>
		    </div>
		    <div class="preview-close">
		    	<a href="<?php echo site_url(); ?>"><span class="icon icon-cancel3"></span>&nbsp;Close Preview</a>
		    </div>
		</div>
		<?php
		if($sim == 'full')
			echo '<div id="viewport" style="  width:100%; "> ';
		elseif ($sim == 'tabl')
			echo '<div id="viewport" style=" width:1024px;">';
		elseif ($sim == 'tabp')
			echo '<div id="viewport" style=" width:768px;">';
		elseif ($sim == 'mobl')
			echo '<div id="viewport" style=" width:480px;">';
		elseif ($sim == 'mobp')
			echo '<div id="viewport" style=" width:320px;">';		
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