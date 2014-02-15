<?php
/**
 * Template Name: New Builder
 */

?><!DOCTYPE html>
<!--[if IE 7]>sdasdas
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
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/jqueryui.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css"   rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css"         rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/main.css"    rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/builder.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/custom.css"  rel="stylesheet" media="screen"/>
    <link href="<?php echo get_template_directory_uri(); ?>/css/style.css" rel="stylesheet" media="screen"/>
</head>
<body <?php body_class(); ?>>
    <div id="dialog-region" class="modal  wide-modal"></div><!-- /.modal -->
    <div class="aj-imp-builder container">
        <div id="header-region"></div>
        <div id="builder-region"></div>
        <div id="elements-box-region"></div>
    </div>
    
    
    <div id="login-region"></div>
    <div id="settings-region"></div>

    <script type="text/javascript">
    	var THEMEURL    = '<?php echo get_parent_template_directory_uri(); ?>';
        var SITEURL     = '<?php echo site_url(); ?>';
        var AJAXURL     = '<?php echo admin_url('admin-ajax.php'); ?>';
        var UPLOADURL   = '<?php echo admin_url('async-upload.php'); ?>';
        var _WPNONCE    = '<?php echo wp_create_nonce('media-form');?>';
        var JSVERSION   = '<?php echo JSVERSION; ?>';
       	var ROOMS       = <?php echo json_encode(get_rooms()); ?>;
        <?php if(is_single_room_edit()): ?>
        var ISSINGLEROOM = true;   
        <?php endif; ?>
    </script>
    <script data-main="http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/builder-main" 
    		src="<?php echo get_parent_template_directory_uri(); ?>/js/require.js"></script>
</body>
</html>
