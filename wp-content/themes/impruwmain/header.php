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

        <?php //getThemeCSS(); ?>
        <script>
            var ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
            var siteurl = '<?php echo site_url(); ?>';
        </script>

        <?php wp_head(); ?>
    </head>

    <body <?php //body_class();  ?>>

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
                <div class="col-md-6 logo">
                    <a href="<?php echo get_bloginfo('url'); ?>/"><img src="<?php echo get_template_directory_uri(); ?>/images/impruw-logo-blue.png" title="Impruw" alt="Impruw" /></a>
                </div>
                <div class="col-md-6 lang-actions">
                    <a href="<?php echo get_bloginfo('url'); ?>/login/" class="btn btn-sm login-btn"><span class="glyphicon glyphicon-lock"></span> Sign In</a>
                    <div class="lang-sel">
                        <?php do_action('icl_language_selector'); ?>
                    </div>

                </div>
            </div>
        </header>
        <div class="aj-imp-container container">