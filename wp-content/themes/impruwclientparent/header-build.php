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
    <title><?php wp_title( '|', TRUE, 'right' ); ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet"
          media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/main.css" rel="stylesheet"
          media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/builder.css" rel="stylesheet"
          media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/custom.css" rel="stylesheet"
          media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/style.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_template_directory_uri(); ?>/css/style.css" rel="stylesheet" media="screen"/>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
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
            <div class="aj-imp-page-layout col-sm-8 clearfix navbar-text">
                Page: <select id="aj-imp-page-sel" name="current_page_id">
                    <?php foreach ( get_all_menu_pages() as $page ): ?>
                        <?php $selected = ( isset( $_COOKIE[ "current_page_id" ] ) && $_COOKIE[ "current_page_id" ] == $page->ID ) ? 'selected' : ''; ?>
                        <option
                            value="<?php echo $page->ID; ?>" <?php echo $selected; ?>><?php echo $page->post_title; ?></option>
                    <?php endforeach; ?>
                </select>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="aj-imp-builder-top-options col-sm-1">
                <!-- <form class="navbar-search">
                          <div id="aj-imp-color-sel" class="dropdown"> 
                               <a class="btn bt-default" data-toggle="dropdown" href="#"><span class="pull-left">Change Color</span><span class="caret"></span></a>
                               <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
                                   <li role="presentation">
                                       <div class="aj-imp-color-box">
                                           <h6>Choose Color</h6>
                                           <ul class="clearfix">
                                               <li><a href="#" class="selected"><img src="<?php echo get_parent_template_directory_uri(); ?>/builder/images/color-blue.png" /></a></li>
                                               <li><a href="#"><img src="<?php echo get_parent_template_directory_uri(); ?>/builder/images/color-red.png" /></a></li>
                                               <li><a href="#"><img src="<?php echo get_parent_template_directory_uri(); ?>/builder/images/color-green.png" /></a></li>
                                           </ul>
                                       </div>
                                   </li>
                               </ul>
                           </div> 
                           <div id="aj-imp-settings-sel" class="dropdown"> 
                               <a class="aj-imp-settings-toggle btn btn-default" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></a>
                               <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
                                   <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Settings</a></li>
                                   <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Logout</a></li>
                               </ul>
                           </div>
                       </form>-->
            </div>
        </nav>
    </div>