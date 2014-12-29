<?php
/**
 * Template Name: New Dashboard
 */
?>
<!DOCTYPE html>
<html>
<head>
    <title>Impruw Dashboard</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <!-- <link rel="shortcut icon" href="<?php echo get_parent_template_directory_uri(); ?>/images/favicon.png" type="image/x-icon" /> -->
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
</head>
<body>
<div class="aj-imp-container container-fluid">
    <div class="row aj-upper-content">
        <div class="aj-imp-left col-md-3 col-sm-4" id="aj-imp-left">
        </div>
        <!-- /aj-imp-left -->
        <div id="aj-imp-right" class="aj-imp-right col-md-9 col-sm-8"></div>
        <!-- /aj-imp-right -->
    </div>
    <div class="row hidden" id="footer-section">
        <div class="aj-imp-foot-left col-md-3 col-sm-4">
            &nbsp;
        </div>
        <div class="aj-imp-foot-right aj-imp-dash-footer col-md-9 col-sm-8">
            &copy;2014 <a href="#">Impruw.com</a>
        </div>
    </div>
</div>
<!-- Dialog region code -->
<div id="dialog-region" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>
<div id="login-region" class="modal" tabindex="-1" role="dialog" aria-hidden="true"></div>
<div id="initial-loader"></div>
<script>
    var USER = <?php echo json_encode(get_user_model()); ?>;
    var ROOMS = <?php echo json_encode(get_roomss()); ?>;
    var FACILITIES = <?php echo json_encode(get_terms( 'impruw_room_facility', 
                                                        array('hide_empty' => 0))) ?>;
    var LANGUAGES = <?php echo json_encode(get_all_languages()); ?>;
    var BLOGID = <?php echo get_current_blog_id(); ?>;

    var THEMEURL = '<?php echo get_parent_template_directory_uri(); ?>';
    var SITEURL = '<?php echo site_url(); ?>';
    var DOMAIN_NAME = '<?php echo get_site_domain_name(); ?>';
    var IS_EMAIL_ALLOWED = '<?php echo is_feature_allowed("email_account"); ?>';
    var IS_SITEADDON_ALLOWED = '<?php echo is_feature_allowed("site_add_ons"); ?>';
    var PAYMENT_PLAN_ID =  <?php echo get_site_plan() ?>;
    var PLAN_FEATURE_COUNT = { "email_account": [ {"current_count": <?php echo site_feature_current_count('email_account'); ?>,"allowed_count": <?php echo site_feature_allowed_count('email_account'); ?>}], "site_add_ons": [ { "current_count": <?php echo site_feature_current_count('site_add_ons'); ?>, "allowed_count": <?php echo site_feature_allowed_count('site_add_ons'); ?> }] };
    var SELECTED_SITE_ADDONS = <?php echo json_encode(site_feature_current_count_array('site_add_ons')); ?>;
    var COUNTRY_BASED_CURRENCY = '<?php echo get_country_based_site_currency();?>';
    var AJAXURL = ajaxurl = '<?php echo admin_url('admin-ajax.php'); ?>';
    var USERDATA = <?php $impruwUserModel = new ImpruwUser(get_current_user_id());
                        echo json_encode($impruwUserModel->get_user_basic_info());
                    ?>;
    var SITEID = {'id':<?php echo get_current_blog_id(); ?>}
    var UPLOADURL = '<?php echo admin_url('async-upload.php'); ?>';
    var _WPNONCE = '<?php echo wp_create_nonce('media-form'); ?>';
    var _RVNONCE = '<?php echo wp_create_nonce("revslider_actions"); ?>';
    var APPSTATE = <?php echo impruw_app_model() ?>;
    var STATISTICS = '<?php echo get_option('statistics_enabled', 'false'); ?>';
    var UNDELETABLE_PAGES = <?php echo json_encode(get_dashboard_uneditable_pages()); ?>

    /************************* Bootstrap Data *************************/
    var PLANS = <?php echo json_encode(get_plans()); ?>;
    var DATERANGE = <?php echo json_encode(get_date_range()); ?>;

    /*************************Language Phrases************************/
    var PHRASES = <?php echo json_encode(load_language_phrases());?>;
    var WPML_DEFAULT_LANG  = '<?php echo wpml_get_default_language(); ?>';
    var WPML_DEFAULT_LANGUAGE_NAME  = '<?php echo get_native_language_name(wpml_get_default_language());?>';
</script>
<script src="<?php echo get_parent_template_directory_uri() ?>/bower_components/pace/pace.js"></script>
<script src="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/plugins/ckeditor/ckeditor.js"></script>
<?php if ( ENV === 'production' ): ?>
    <script src="<?php echo get_parent_template_directory_uri(); ?>/app/production/dashboard-main.js?ver=<?php echo JSVERSION ?>"></script>
<?php else: ?>
    <script data-main="<?php echo get_parent_template_directory_uri(); ?>/app/dev/js/dashboard-main"
            src="<?php echo get_parent_template_directory_uri(); ?>/bower_components/requirejs/require.js"></script>
<?php endif; ?>
<!-- JS Error Tracking -->
<script>
    (function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a);
    c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0];
    c.src="//beacon.errorception.com/"+s+".js";c.async=!0;b.parentNode.insertBefore(c,b)};
    _.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)})
    (window,document,"script","5440a65769c1935122000238");
</script>
<?php
if(is_impruw_com()) : 
    $user = get_userdata(get_current_user_id() ); ?>
    <script>
      window.intercomSettings = {
        // TODO: The current logged in user's full name
        name: "<?php echo $user->data->display_name ?>",
        // TODO: The current logged in user's email address.
        email: "<?php echo $user->data->user_email  ?>",
        // TODO: The current logged in user's sign-up date as a Unix timestamp.
        // console.
        user_hash: "<?php echo
            hash_hmac('sha256', $user->data->user_email, 'sTPoSE_yby5DEHscTDGt1fLckImt4zI1s1p8yBHQ');
          ?>",
          
        created_at: <?php echo strtotime($user->data->user_registered) ?>,
        app_id: "zy2m5a0t"
      };
    </script>
    <script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/o0cfsl2l';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()</script>
<?php endif; ?>
</body>
</html>
