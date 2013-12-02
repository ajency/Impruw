<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div class="mainContainer1">
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
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
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
        <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/bootstrap.min.css"  rel="stylesheet" media="screen"/>
        <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/css/flat-ui.css"        rel="stylesheet" media="screen"/>
        <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/builder/css/main.css"           rel="stylesheet" media="screen"/>
        <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/builder/css/builder.css"        rel="stylesheet" media="screen"/>
        <link href="<?php echo get_parent_tempalte_directory_uri(); ?>/builder/css/custom.css"         rel="stylesheet" media="screen"/>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="aj-imp-builder container">
            <div class="navbar navbar-default">
                <nav class="aj-imp-builder-top-nav row" role="navigation">
                    <div class="aj-imp-builder-back col-sm-2">
                        <p class="navbar-text">
                            <a href="#"><span class="glyphicon glyphicon-arrow-left"></span> Back to Dashboard</a>
                        </p>
                    </div>
                    <div class="aj-imp-page-layout col-sm-4 clearfix navbar-text">
                        <div id="aj-imp-page-sel" class="dropdown">
                            <a class="aj-imp-page-toggle" data-toggle="dropdown" href="#">Home Page <span class="glyphicon glyphicon-chevron-down"></span></a>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">About Page</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Gallery Page</a></li>
                                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Contact Us Page</a></li>
                                <li role="presentation" class="aj-imp-add-page"><a role="menuitem" tabindex="-1" href="#"><span class="glyphicon glyphicon-plus-sign"></span> Add Page</a></li>
                            </ul>
                        </div>
                        <div class="aj-imp-sub-bar-head">For Businesses that need to build their online presence</div>
                    </div>
                    <div class="aj-imp-builder-top-title col-sm-2">
                        <p class="navbar-text">
                            Editing the Home Page...
                        </p>
                    </div>
                    <div class="aj-imp-builder-top-options col-sm-4">
                        <form class="navbar-search">
                            <select id="aj-imp-theme-sel">
                                <option value="0">Business Theme</option>
                                <option value="1">Travel Theme</option>
                                <option value="2">Holiday Theme</option>
                            </select>
                            <div id="aj-imp-color-sel" class="dropdown"> 
                                <a class="btn bt-default" data-toggle="dropdown" href="#"><span class="pull-left">Change Color</span><span class="caret"></span></a>
                                <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
                                    <li role="presentation">
                                        <div class="aj-imp-color-box">
                                            <h6>Choose Color</h6>
                                            <ul class="clearfix">
                                                <li><a href="#" class="selected"><img src="images/color-blue.png" /></a></li>
                                                <li><a href="#"><img src="images/color-red.png" /></a></li>
                                                <li><a href="#"><img src="images/color-green.png" /></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div id="aj-imp-settings-sel" class="dropdown"> 
                                <a class="aj-imp-settings-toggle btn btn-default" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></a>
                                <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
                                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>