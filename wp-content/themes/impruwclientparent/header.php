<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div class="mainContainer1">
 *
 * @package    WordPress
 * @subpackage Twenty_Thirteen
 * @since      Twenty Thirteen 1.0
 */
?><!DOCTYPE html>
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
    <title><?php wp_title(); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>" />
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <?php get_theme_CSS(); ?>
    <link href="<?php echo site_url(); ?>/wp-content/themes/impruwclientparent/js/jquery.bxslider.css"
          rel="stylesheet"/>
    <link rel="shortcut icon" href="wp-content/themes/impruwclientparent/images/favicon.png" type="image/x-icon" />

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

<div class="site-style-container">
    <header class="site-header">
        <?php //do_action('icl_language_selector');?>
        <?php echo generate_markup( 'header' ); ?>
    </header>
    <!-- .site-header -->