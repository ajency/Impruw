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
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width">
        <title><?php wp_title('|', true, 'right'); ?></title>
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
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
        <link href="<?php echo get_theme_style_sheet_file_path(); ?> " rel="stylesheet" media="screen"/>
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
        <div id="initial-loader"></div>

        <script type="text/javascript">
            var THEMEURL = '<?php echo get_parent_template_directory_uri(); ?>';
            var SITEURL = '<?php echo site_url(); ?>';
            var AJAXURL = '<?php echo admin_url('admin-ajax.php'); ?>';
            var UPLOADURL = '<?php echo admin_url('async-upload.php'); ?>';
            var _WPNONCE = '<?php echo wp_create_nonce('media-form'); ?>';
            var JSVERSION = '<?php echo JSVERSION; ?>';
            var ROOMS = <?php echo json_encode(get_rooms()); ?>;
            var ISTHEMESELECTED = <?php echo is_theme_choosed() ?>;
            var LOGOUTURL = '<?php echo wp_logout_url(site_url()); ?>';
            var DASHBOARDURL = '<?php echo site_url('dashboard'); ?>';
            var BUILDERURL = '<?php echo site_url('site-builder'); ?>';
            var CURRENTTHEME = '<?php echo wp_get_theme()->get_stylesheet() ?>';
            var AUTOSAVEINTERVAL = 55 * 1000;
        </script>
        <!-- <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script> -->
        <script src="<?php echo get_parent_template_directory_uri() ?>/app/dev/js/plugins/pace.js"></script>
        <!-- Unused Elements Box -->
        <div id="fl_menu" class="aj-imp-trash-elements"></div>
        <!-- Unused Elements Box -->

        <!-- Color Picker Modal -->
        <div class="modal medium-modal fade" id="theme-color-pop" tabindex="-1" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Choose Colors for Your Theme</h4>
              </div>
              <div class="modal-body">
                <ul class="color-set-list">
                    <li>
                        <div class="thumbnail">
                          <div class="colors">
                            <span style="background: #FF5F5F;" data-toggle="tooltip" title="Primary Color for Theme">&nbsp;</span>
                            <span style="background: #2A3B66;">&nbsp;</span>
                            <span style="background: #16A2F5;">&nbsp;</span>
                            <span style="background: #CCCCCC;">&nbsp;</span>
                            <span style="background: #333333;">&nbsp;</span>
                          </div> 
                          <div class="caption">
                            <h3>Color Set 1</h3>
                            <p>
                                <a href="#" class="btn btn-xs btn-primary" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> 
                                <a href="#" class="btn btn-xs btn-default" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a>
                            </p>
                          </div>
                        </div>
                    </li>
                    <li>
                        <div class="thumbnail">
                          <div class="colors">
                            <span style="background: #FF5F5F;">&nbsp;</span>
                            <span style="background: #2A3B66;">&nbsp;</span>
                            <span style="background: #16A2F5;">&nbsp;</span>
                            <span style="background: #CCCCCC;">&nbsp;</span>
                            <span style="background: #333333;">&nbsp;</span>
                          </div> 
                          <div class="caption">
                            <h3>Color Set 2</h3>
                            <p>
                                <a href="#" class="btn btn-xs btn-primary" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> 
                                <a href="#" class="btn btn-xs btn-default" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a>
                            </p>
                          </div>
                        </div>
                    </li>
                    <li>
                        <div class="thumbnail">
                          <div class="colors">
                            <span style="background: #FF5F5F;">&nbsp;</span>
                            <span style="background: #2A3B66;">&nbsp;</span>
                            <span style="background: #16A2F5;">&nbsp;</span>
                            <span style="background: #CCCCCC;">&nbsp;</span>
                            <span style="background: #333333;">&nbsp;</span>
                          </div> 
                          <div class="caption">
                            <h3>Color Set 3</h3>
                            <p>
                                <a href="#" class="btn btn-xs btn-primary" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> 
                                <a href="#" class="btn btn-xs btn-default" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a>
                            </p>
                          </div>
                        </div>
                    </li>
                    <li>
                        <div class="thumbnail selected">
                          <div class="colors">
                            <span style="background: #FF5F5F;">&nbsp;</span>
                            <span style="background: #2A3B66;">&nbsp;</span>
                            <span style="background: #16A2F5;">&nbsp;</span>
                            <span style="background: #CCCCCC;">&nbsp;</span>
                            <span style="background: #333333;">&nbsp;</span>
                          </div> 
                          <div class="caption">
                            <h3>Custom Color Set</h3>
                            <p>
                                <a href="#" class="btn btn-xs btn-primary" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> 
                                <a href="#" class="btn btn-xs btn-default" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a>
                            </p>
                          </div>
                        </div>
                    </li>
                </ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Color Picker Modal -->

        <?php if (ENV === 'production'): ?>
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
