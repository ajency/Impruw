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
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <link rel="shortcut icon" href="wp-content/themes/impruwclientparent/images/favicon.png" type="image/x-icon" />
    <?php //getThemeCSS(); ?>
    <script>
        var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
        var siteurl = '<?php echo site_url(); ?>';
    </script>

    <?php wp_head(); ?>
</head>

<body <?php //body_class();   ?>>

<?php
    //var_dump($_REQUEST);
    global $norwegian_sel;
    $norwegian_sel = false;
    if (isset($_REQUEST['lang'])) {
        if ($_REQUEST['lang'] == 'nb') {
            $norwegian_sel = true;
        }
    }
?>
<header class="aj-imp-lo-header">
    <div class="row">
        <div class="col-md-3 logo">
            <a href="<?php echo site_url(); ?>"><img
                    src="<?php echo get_template_directory_uri(); ?>/images/impruw-logo-blue.png" title="Impruw"
                    alt="Impruw"/></a>
        </div>
        <div class="col-md-9 lang-actions">

            <?php

                $defaults = array(
                    'theme_location'  => '',
                    'menu'            => 'home',
                    'container'       => 'div',
                    'container_class' => 'main-menu',
                    'container_id'    => '',
                    'menu_class'      => 'menu',
                    'menu_id'         => '',
                    'echo'            => true,
                    'fallback_cb'     => 'wp_page_menu',
                    'before'          => '',
                    'after'           => '',
                    'link_before'     => '',
                    'link_after'      => '',
                    'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                    'depth'           => 0,
                    'walker'          => ''
                );

                wp_nav_menu( $defaults );

            ?>
            <?php if( ! is_user_logged_in() ): ?>
            <a href="#" class="login-btn" data-toggle="popover">
                <span class="glyphicon glyphicon-lock"></span> <?php _e('Sign In') ?>
            </a>
            <?php endif; ?>

            <div class="lang-sel">
                <?php do_action('icl_language_selector'); ?>
            </div>

        </div>
    </div>
</header>
<div class="aj-imp-container container">