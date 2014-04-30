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
    
    <link href="<?php echo get_template_directory_uri(); ?>/css/slimmenu.min.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_template_directory_uri(); ?>/css/theme-style.css" rel="stylesheet" media="screen"/>
    <link href="<?php echo get_parent_template_directory_uri(); ?>/css/pace.css" rel="stylesheet" media="screen"/>
</head>
<body <?php body_class(); ?>>
     <div id="choose-theme-region"></div>
    <div class="aj-imp-builder container">
        <div id="header-region"></div>
        <div id="builder-region"></div>
        <div id="elements-box-region"></div>
    </div>
    
    
    <div id="login-region"></div>
   
    <div id="settings-region"></div>
    <div id="dialog-region" class="modal "></div><!-- /.modal -->
    <div id="initial-loader">
       
    </div>
    
    <script type="text/javascript">
    	var THEMEURL    = '<?php echo get_parent_template_directory_uri(); ?>';
        var SITEURL     = '<?php echo site_url(); ?>';
        var AJAXURL     = '<?php echo admin_url('admin-ajax.php'); ?>';
        var UPLOADURL   = '<?php echo admin_url('async-upload.php'); ?>';
        var _WPNONCE    = '<?php echo wp_create_nonce('media-form');?>';
        var JSVERSION   = '<?php echo JSVERSION; ?>';
       	var ROOMS       = <?php echo json_encode(get_rooms()); ?>;
        var ISTHEMESELECTED = <?php echo is_theme_choosed() ?>;
        var LOGOUTURL = '<?php echo wp_logout_url(site_url()); ?>';
        var DASHBOARDURL = '<?php echo site_url('dashboard'); ?>';
        var BUILDERURL = '<?php echo site_url('site-builder'); ?>';
        var CURRENTTHEME = '<?php echo wp_get_theme()->get_stylesheet() ?>';
        var AUTOSAVEINTERVAL = 55 * 1000;
    </script>
    <!-- <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script> -->
    <script src="<?php echo get_parent_template_directory_uri() ?>/app/dev/js/plugins/pace.js"></script>
    <!--<script type="text/javascript">
        Pace.on('done', function(){
            Pace.options = {
                ajax: false
            };
            $('body').addClass('pace-min-theme');
            $('#initial-loader').fadeOut('fast', function(){
                $('#initial-loader').remove();
            });
        });
    </script> -->
    
    <!-- Unused Elements Box -->
    <div id="fl_menu" class="aj-imp-trash-elements">
        <div class="label trash-label clearfix"><span><span class="glyphicon glyphicon-trash"></span> Unused Elements</span></div>
        <div class="menu aj-imp-drag-menu">
            <p class="desc">
              These are your unused or deleted elements, you can drag them back into your site, or clear them all.
            </p>
            <a href="#" class="trash-elem-link"><span class="bicon icon-uniF16F"></span> Clear Elements</a>
            <ul class="trash-list">
                <li class="trash-elem">
                    <a href="#">
                        <div class="trash-elem-header">
                            <span class="bicon icon-uniF111"></span> Text
                        </div>
                        <div class="trash-elem-content">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...
                        </div>
                    </a>
                </li>
                <li class="trash-elem">
                    <a href="#">
                        <div class="trash-elem-header">
                            <span class="bicon icon-uniF11C"></span> Title
                        </div>
                        <div class="trash-elem-content">
                            This is a Title!
                        </div>
                    </a>
                </li>
                <li class="trash-elem">
                    <a href="#">
                        <div class="trash-elem-header">
                            <span class="bicon icon-uniF10E"></span> Image
                        </div>
                        <div class="trash-elem-content">
                            <img src="http://blueboldclone.unpruwen.com/wp-content/uploads/sites/73/2014/04/theme-3-logo2.jpg">
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!-- Unused Elements Box -->
    
    <?php if(ENV === 'production'): ?>
        <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor.js"></script> 
        <script src="<?php echo get_parent_template_directory_uri(); ?>/app/production/builder-main.js?ver=<?php echo JSVERSION ?>"></script> 
    <?php else: ?>
    <!--  <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script> -->
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor.js"></script> 
    <script data-main="http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/builder-main" 
    		src="<?php echo get_parent_template_directory_uri(); ?>/js/require.js"></script>
    <?php endif; ?>
</body>
</html>
