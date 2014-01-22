<?php
/*
File Name: functions.php
Description: This file has a list of the following functions used in the theme

1)  impruw_register_email_init - function to create a new post type called emails
2)  create_email_taxonomies_and_add_terms - function to create taxonomies under post type emails and also creates immediate, batch and marketing terms under email_type
3)  change_administrator_role_name - Function to rename the Administrator role to Site Owner.
4) impruw_add_user_roles_post_box - Function to add the user roles meta box to post type imruv_email.
5) impruw_set_email_user_role - Function to display user roles in side the meta box for User Roles.
6) impruw_add_user_role_to_email - Function to add user role's to a an email.
7) wp_impruw_get_user_roles - Function to return all roles used in impruw site.
 */


/* ============================================================= */

require_once 'Communication_module/user_shortcodes.php';//file containing all shortcodes to fetch user information
require_once 'Communication_module/site_shortcodes.php';//file containing all shortcodes to fetch site information
require_once 'User/user_management.php';//file containing all shortcodes to fetch site information

//add theme support
add_theme_support( 'post-thumbnails' );
show_admin_bar(false);
/*--------------------------------------------------------------------------------------
*
* impruw_register_email_init
*function to create a new post type called emails
*
*-------------------------------------------------------------------------------------*/
/* * **Register Email Taxonomy & Post Type*** */

function impruw_register_email_init() {
    
    $url = get_template_directory_uri();

    $labels = array(
        'name' => 'Emails',
        'singular_name' => 'Email',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Email',
        'edit_item' => 'Edit Email',
        'new_item' => 'New Email',
        'all_items' => 'All Emails',
        'view_item' => 'View Email',
        'search_items' => 'Search Emails',
        'not_found' => 'No Emails found',
        'not_found_in_trash' => 'No Emails found in Trash',
        'parent_item_colon' => '',
        'menu_name' => 'Emails'
    );

    $args = array(
        'labels' => $labels,
        'label' => __( 'email' ),
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'email' ),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'menu_icon' => '' . $url . '/images/email.png',
        'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'custom-fields' )
    );

    register_post_type( 'impruw_email', $args );
}

add_action( 'init', 'impruw_register_email_init' );




/*--------------------------------------------------------------------------------------
*
* create_email_taxonomies_and_add_terms
*function to create taxonomies under post type emails
*also creates immediate, batvh and marketing terms under email_type
*
*-------------------------------------------------------------------------------------*/

function create_email_taxonomies_and_add_terms() {
    // Add new taxonomy, Types
    $type_labels = array(
        'name' => _x( 'Types', 'taxonomy general name' ),
        'singular_name' => _x( 'Type', 'taxonomy singular name' ),
        'search_items' => __( 'Search Types' ),
        'all_items' => __( 'All Types' ),
        'parent_item' => __( 'Parent Type' ),
        'parent_item_colon' => __( 'Parent Type:' ),
        'edit_item' => __( 'Edit Type' ),
        'update_item' => __( 'Update Type' ),
        'add_new_item' => __( 'Add New Type' ),
        'new_item_name' => __( 'New Type' ),
        'menu_name' => __( 'Type' )
    );

    $tag_args = array(
        'hierarchical' => true,
        'labels' => $type_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'type' )
    );

    register_taxonomy( 'impruw_email_type', array( 'impruw_email' ), $tag_args );

    // Add new taxonomy, Tags
    $tag_labels = array(
        'name' => _x( 'Tags', 'taxonomy general name' ),
        'singular_name' => _x( 'Tag', 'taxonomy singular name' ),
        'search_items' => __( 'Search Tags' ),
        'all_items' => __( 'All Tags' ),
        'parent_item' => __( 'Parent Tag' ),
        'parent_item_colon' => __( 'Parent Tag:' ),
        'edit_item' => __( 'Edit Tag' ),
        'update_item' => __( 'Update Tag' ),
        'add_new_item' => __( 'Add New Tag' ),
        'new_item_name' => __( 'New Tag' ),
        'menu_name' => __( 'Tag' )
    );

    $tag_args = array(
        'hierarchical' => true,
        'labels' => $tag_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'tag' )
    );

    register_taxonomy( 'impruw_email_tag', array( 'impruw_email' ), $tag_args );

    //add term Snippet under taxonomy Type
    $slug = sanitize_title( 'snippet' );

    $term_id = wp_insert_term( 'snippet', 'impruw_email_type', array(
            'description' => 'Snippet Type',
            'slug' => $slug,
            'parent' => 0,
        ) );

    //add term Email Type under taxonomy Type
    $slug = sanitize_title( 'email_type' );
    $term_id = wp_insert_term( 'email_type', 'impruw_email_type', array(
            'description' => 'Email Type',
            'slug' => $slug,
            'parent' => 0,
        ) );


    $email_type_term = get_term_by( 'slug', 'email_type', 'impruw_email_type' );
    $email_type_term_id = $email_type_term->term_id;//getting the id of term email_type

    //add term Immediate under term  Email type
    $slug = sanitize_title( 'immediate' );
    $term_id = wp_insert_term( 'immediate', 'impruw_email_type', array(
            'description' => 'Immediate',
            'slug' => $slug,
            'parent' => $email_type_term_id,
        ) );

    //add term Batch under term  Email type
    $slug = sanitize_title( 'batch' );
    $term_id = wp_insert_term( 'batch', 'impruw_email_type', array(
            'description' => 'Batch',
            'slug' => $slug,
            'parent' => $email_type_term_id,
        ) );

    //add term Marketing under term  Email type
    $slug = sanitize_title( 'marketing' );
    $term_id = wp_insert_term( 'marketing', 'impruw_email_type', array(
            'description' => 'Marketing',
            'slug' => $slug,
            'parent' => $email_type_term_id,
        ) );
}

add_action( 'init', 'create_email_taxonomies_and_add_terms', 0 );


/**
 * change_administrator_role_name
 * Function to rename the Administrator role to Site Owner
 */
function change_administrator_role_name() {

    global $wp_roles;
    if ( ! isset( $wp_roles ) )
        $wp_roles = new WP_Roles();

    $wp_roles->roles['administrator']['name'] = 'Site Owner';
    $wp_roles->role_names['administrator'] = 'Site Owner';
    //  echo  $wp_roles->roles['administrator']['name'];exit;
}
add_action( 'init', 'change_administrator_role_name' );
//wpmu_create_blog($domain, $path, $title, $user_id);

load_theme_textdomain( 'impruwmain' );


/**
 * impruw_add_user_roles_post_box
 * Function to add the user roles meta box to post type imruv_email.
 */
function impruw_add_user_roles_post_box() {

    add_meta_box( 'impruw-set-email-user-role', "User Roles", 'impruw_set_email_user_role', 'impruw_email', 'normal', 'low' );
}
add_action( 'add_meta_boxes', 'impruw_add_user_roles_post_box' );

/**
 * impruw_set_email_user_role
 * Function to display user roles in side the meta box for User Roles.
 *
 * @global type $wp_roles
 * @global type $post
 */
function impruw_set_email_user_role() {

    $roles=wp_impruw_get_user_roles();
    global $post;
    $email_user_roles = get_post_meta( $post->ID, 'user_roles', true );
?>
    <ul class="faq_list" ><?php
    foreach ( $roles as $key => $value ) {
        if ( !empty( $email_user_roles ) ) {
?>
                <li>
                    <input type="checkbox" name="impruw_set_user_role_post[]" value="<?php echo $key?>" <?php echo ( in_array( $key, $email_user_roles ) ) ? 'checked="checked"' : ''; ?>>&nbsp;<?php echo $value?><br>
                </li>
                <?php
            wp_nonce_field( 'impruw_set_user_role_post_nounce', 'impruw_set_user_role_post_nounce' );
        }
        else {
?>
                <li>
                   <input type="checkbox" name="impruw_set_user_role_post[]" value="<?php echo $key?>" >&nbsp;<?php echo $value?><br>
                </li>
                <?php
            wp_nonce_field( 'impruw_set_user_role_post_nounce', 'impruw_set_user_role_post_nounce' );
        }

    }
?>
        <div style="clear:both"></div></ul><?php
}

/**
 * impruw_add_user_role_to_email
 * Function to add user role's to a an email.
 */
function impruw_add_user_role_to_email( $post_id ) {
    global $post;
    if ( $_SERVER['REQUEST_METHOD'] !== 'POST' )
        return;

    if ( !current_user_can( 'edit_page', $post_id ) )
        return;
    if ( !isset( $_POST['impruw_set_user_role_post_nounce'] ) || !wp_verify_nonce( $_POST['impruw_set_user_role_post_nounce'], 'impruw_set_user_role_post_nounce' ) )
        return;

    if ( $_POST['post_type'] == "impruw_email" ) {
        $user_roles_array = array();
        foreach ( $_POST['impruw_set_user_role_post'] as $checkbox ) {
            $user_roles_array[] = $checkbox;
        }
        update_post_meta( $post_id, 'user_roles', $user_roles_array );
    }
}
add_action( 'save_post', 'impruw_add_user_role_to_email' );


/**
 * wp_impruw_get_user_roles
 * Function to return all roles used in impruw site.
 *
 * @global type $wp_roles
 * @return array $roles
 */
function wp_impruw_get_user_roles() {
    global $wp_roles;
    $roles = $wp_roles->get_names();
    $roles['self']="Self";
    $roles['Super_admin']="Super Admin";
    return $roles;
}


/**
 * Functino to add required stylecheet file
 *
 */

function add_csstopage() {

    wp_enqueue_style( 'bootstrap',  get_template_directory_uri() . '/css/bootstrap.min.css' );
    wp_enqueue_style( 'flat-ui',  get_template_directory_uri() . '/css/flat-ui.css' );
    wp_enqueue_style( 'main.min',  get_template_directory_uri() . '/css/main.min.css' );
    wp_enqueue_style( 'dashboard',  get_template_directory_uri() . '/css/dashboard.css' );

}
add_action( 'wp_enqueue_scripts', 'add_csstopage' );



/**
 * Function to add required js files
 *
 */
function register_required_scripts() {

    wp_enqueue_script( 'jquery' );


    //define ajaxurl for user_management.js
    //$translation_array = array( 'ajaxurl' =>admin_url( 'admin-ajax.php' )  );
    //wp_enqueue_script('pw-script', get_template_directory_uri() . '/js/user_management.js');

    /*$translation_array = array( 'valuereqd' =>"other message for reqd"  );
    wp_enqueue_script('pw-script2', get_template_directory_uri() . '/js/parsley/parsley.js');
    wp_localize_script('pw-script2', 'myobject', $translation_array );
    */

    wp_enqueue_script( "bootstrap",  get_template_directory_uri().'/js/bootstrap.min.js', array( 'jquery' ) , false, true );
    wp_enqueue_script( "flatui-checkbox",  get_template_directory_uri().'/js/flatui-checkbox.js', array( 'jquery' ) , false, true );
    wp_enqueue_script( "bootstrap-select",  get_template_directory_uri().'/js/bootstrap-select.js', array( 'jquery' ) , false, true );
    wp_enqueue_script( "flatui-radio",  get_template_directory_uri().'/js/flatui-radio.js', array( 'jquery' ) , false, true );


    if ( is_page_template('page-register.php') || is_page_template('page-login.php') ) {
        //wp_deregister_script( 'jquery' );
        if ( isset( $_GET['lang'] ) && $_GET['lang'] == 'nb' )
            wp_enqueue_script( 'parsley-lang', get_template_directory_uri().'/js/parsley/i18n/messages.no.js', array(), false, true );
            wp_enqueue_script( 'parsley', get_template_directory_uri().'/js/parsley/parsley.js', array( 'jquery' ), '1.2.1', true );
            wp_enqueue_script( "user_management",  get_template_directory_uri().'/js/user_management.js', array( ) , false, true );
            //wp_enqueue_script( 'garlic', get_template_directory_uri().'/js/garlic.js', array('jquery'), '1.2.2',true);
    }

    wp_localize_script( 'jquery', 'ajaxurl', admin_url( 'admin-ajax.php' ) );
    wp_localize_script( 'jquery', 'template_path', get_template_directory() );

    wp_localize_script( 'jquery', 'RESPONSE', array(
            'CODE' => array(
                'OK'    => 'OK',
                'ERROR' => 'ERROR'
            )
        ) );


}
add_action( 'wp_enqueue_scripts', 'register_required_scripts', 1 );


/**
 * Register theme post type
 * Each theme will be a custom post type.
 * This would make it wasy to search, filter, tag, categorise etc.
 */
function register_themes_post_type() {

    $labels = array(
        'name'               => 'Themes',
        'singular_name'      => 'Theme',
        'add_new'            => 'Add New',
        'add_new_item'       => 'Add New Theme',
        'edit_item'          => 'Edit Theme',
        'new_item'           => 'New Theme',
        'all_items'          => 'All Themes',
        'view_item'          => 'View Theme',
        'search_items'       => 'Search Themes',
        'not_found'          => 'No themes found',
        'not_found_in_trash' => 'No themes found in Trash',
        'parent_item_colon'  => '',
        'menu_name'          => 'Themes'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'themes' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => null,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt' )
    );

    register_post_type( 'theme', $args );

}
add_action( 'init', 'register_themes_post_type' );

/**
 * [get_parent_template_directory_uri description]
 * @return [type]
 */
function get_parent_template_directory_uri(){
    return site_url('wp-content/themes/impruwclientparent');
}


function get_theme_stylesheet(){
    $theme_id = isset($_COOKIE["current_theme"]) ? $_COOKIE['current_theme'] : 1;
}


/**
 * Get all menu pages for the site
 * @return [type] [description]
 */
function get_all_menu_pages(){
        
    $args = array('post_type' => 'page','posts_per_page' => -1);
    $pages  = new WP_query($args);
     
    $p = array();

    if($pages->have_posts()){
        
        $skip = array('Site Builder','Dashboard');

        foreach($pages->posts as $page){

            if(!in_array($page->post_title, $skip))
                $p[] = $page;
        }
    }
    
    return $p;

}

/****SHORTCODE for CONTACT PAGE****/
function impruwcontact_get_the_ip() {
    if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
        return $_SERVER["HTTP_X_FORWARDED_FOR"];
    }
    elseif (isset($_SERVER["HTTP_CLIENT_IP"])) {
        return $_SERVER["HTTP_CLIENT_IP"];
    }
    else {
        return $_SERVER["REMOTE_ADDR"];
    }
}

function impruw_contact_form_sc( $atts ) {
 
	$result='';
	$info='';
	$form_data =array();
    extract( shortcode_atts( array(
        // if you don't provide an e-mail address, the shortcode will pick the e-mail address of the admin:
        "email" => get_bloginfo( 'admin_email' ),
        "subject" => "",
        "label_name" => "Your Name",
        "label_email" => "Your E-mail Address",
        "label_subject" => "Subject",
        "label_message" => "Your Message",
        "label_submit" => "Submit",
        // the error message when at least one of the required fields are empty:
        "error_empty" => "<div class='alert alert-error'>Please fill in all the required fields.</div>",
        // the error message when the e-mail address is not valid:
        "error_noemail" => "<div class='alert alert-error'>Please enter a valid e-mail address.</div>",
        // and the success message when the e-mail is sent:
        "success" => "<div class='alert alert-success'>Thanks for your e-mail! We'll get back to you as soon as we can.</div>"
    ), $atts ) );

    // if the <form> element is POSTed, run the following code
    if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
        $error = false;
        // set the "required fields" to check
        $required_fields = array( "your_name", "email", "message", "subject" );
     
        // this part fetches everything that has been POSTed, sanitizes them and lets us use them as $form_data['subject']
        foreach ( $_POST as $field => $value ) {
            if ( get_magic_quotes_gpc() ) {
                $value = stripslashes( $value );
            }
            $form_data[$field] = strip_tags( $value );
        }
     
        // if the required fields are empty, switch $error to TRUE and set the result text to the shortcode attribute named 'error_empty'
        foreach ( $required_fields as $required_field ) {
            $value = trim( $form_data[$required_field] );
            if ( empty( $value ) ) {
                $error = true;
                $result = $error_empty;
            }
        }
     
        // and if the e-mail is not valid, switch $error to TRUE and set the result text to the shortcode attribute named 'error_noemail'
        if ( ! is_email( $form_data['email'] ) ) {
            $error = true;
            $result = $error_noemail;
        }
     
        if ( $error == false ) {
            $email_subject = "[" . get_bloginfo( 'name' ) . "] " . $form_data['subject'];
            $email_message = $form_data['message'] . "\n\nIP: " . impruwcontact_get_the_ip();
            $headers  = "From: " . $form_data['name'] . " <" . $form_data['email'] . ">\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\n";
            $headers .= "Content-Transfer-Encoding: 8bit\n";
            wp_mail( $email, $email_subject, $email_message, $headers );
            $result = $success;
            $sent = true;
        }
        // but if $error is still FALSE, put together the POSTed variables and send the e-mail!
        if ( $error == false ) {
            // get the website's name and puts it in front of the subject
            $email_subject = "[" . get_bloginfo( 'name' ) . "] " . $form_data['subject'];
            // get the message from the form and add the IP address of the user below it
            $email_message = $form_data['message'] . "\n\nIP: " . impruwcontact_get_the_ip();
            // set the e-mail headers with the user's name, e-mail address and character encoding
            $headers  = "From: " . $form_data['your_name'] . " <" . $form_data['email'] . ">\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\n";
            $headers .= "Content-Transfer-Encoding: 8bit\n";
            // send the e-mail with the shortcode attribute named 'email' and the POSTed data
            wp_mail( $email, $email_subject, $email_message, $headers );
            // and set the result text to the shortcode attribute named 'success'
            $result = $success;
            // ...and switch the $sent variable to TRUE
            $sent = true;
        }
    }

    // if there's no $result text (meaning there's no error or success, meaning the user just opened the page and did nothing) there's no need to show the $info variable
    if ( $result != "" ) {
        $info = '<div class="info">' . $result . '</div>';
    }
    // anyways, let's build the form! (remember that we're using shortcode attributes as variables with their names)
    $email_form = '<form class="contact-form form-horizontal clearfix" method="post" action="' . get_permalink() . '">
        <div class="form-group">
            <label for="cf_name" class="col-sm-3 control-label">' . $label_name . '</label>
            <div class="col-sm-7 col-sm-offset-3">
                <input type="text" name="your_name" id="cf_name" class="form-control" placeholder="Your Full Name" value="' . (isset($form_data['your_name'])?$form_data['your_name']:'') . '" />
            </div>
        </div>
        <div class="form-group">
            <label for="cf_email" class="col-sm-3 control-label">' . $label_email . '</label>
            <div class="col-sm-7 col-sm-offset-3">
                <input type="text" name="email" id="cf_email" class="form-control" placeholder="Your Email Address" value="' . (isset($form_data['email'])?$form_data['email']:'') . '" />
            </div>
        </div>
        <div class="form-group">
            <label for="cf_subject" class="col-sm-3 control-label">' . $label_subject . '</label>
            <div class="col-sm-7 col-sm-offset-3">
                <input type="text" name="subject" id="cf_subject" class="form-control" placeholder="The Subject of your enquiry" value="' . (isset($subject)?$subject:'') . (isset($form_data['subject'])?$form_data['subject']:'') . '" />
            </div>
        </div>
        <div class="form-group">
            <label for="cf_message" class="col-sm-3 control-label">' . $label_message . '</label>
            <div class="col-sm-7 col-sm-offset-3">
                <textarea name="message" id="cf_message" class="form-control" placeholder="Your Message" rows="3">' . (isset($form_data['message'])?$form_data['message']:'') . '</textarea>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-7 col-sm-offset-3">
                <button type="submit" name="send" id="cf_send" class="btn aj-imp-submit">' . $label_submit . '</button>
            </div>
        </div>
    </form>';

    return __($info . $email_form,'impruwmain');
 
}
add_shortcode( 'contact', 'impruw_contact_form_sc' );