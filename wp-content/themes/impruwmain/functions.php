<?php
/*
File Name: functions.php
Description: This file has a list of the following functions used in the theme

1)  impruv_register_email_init - function to create a new post type called emails
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

/*--------------------------------------------------------------------------------------
*
* impruv_register_email_init
*function to create a new post type called emails
*
*-------------------------------------------------------------------------------------*/
/* * **Register Email Taxonomy & Post Type*** */

function impruv_register_email_init() {
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
        'label' => __('email'),
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'email'),
        'capability_type' => 'post',
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'menu_icon' => '' . $url . '/images/email.png',
        'supports' => array('title', 'editor', 'author', 'thumbnail', 'custom-fields')
    );

    register_post_type('impruv_email', $args);
}

add_action('init', 'impruv_register_email_init');




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
        'name' => _x('Types', 'taxonomy general name'),
        'singular_name' => _x('Type', 'taxonomy singular name'),
        'search_items' => __('Search Types'),
        'all_items' => __('All Types'),
        'parent_item' => __('Parent Type'),
        'parent_item_colon' => __('Parent Type:'),
        'edit_item' => __('Edit Type'),
        'update_item' => __('Update Type'),
        'add_new_item' => __('Add New Type'),
        'new_item_name' => __('New Type'),
        'menu_name' => __('Type')
    );

    $tag_args = array(
        'hierarchical' => true,
        'labels' => $type_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'type')
    );

    register_taxonomy('impruv_email_type', array('impruv_email'), $tag_args);

    // Add new taxonomy, Tags
    $tag_labels = array(
        'name' => _x('Tags', 'taxonomy general name'),
        'singular_name' => _x('Tag', 'taxonomy singular name'),
        'search_items' => __('Search Tags'),
        'all_items' => __('All Tags'),
        'parent_item' => __('Parent Tag'),
        'parent_item_colon' => __('Parent Tag:'),
        'edit_item' => __('Edit Tag'),
        'update_item' => __('Update Tag'),
        'add_new_item' => __('Add New Tag'),
        'new_item_name' => __('New Tag'),
        'menu_name' => __('Tag')
    );

    $tag_args = array(
        'hierarchical' => true,
        'labels' => $tag_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'tag')
    );

    register_taxonomy('impruv_email_tag', array('impruv_email'), $tag_args);

    //add term Snippet under taxonomy Type
    $slug = sanitize_title('snippet');

    $term_id = wp_insert_term('snippet', 'impruv_email_type', array(
        'description' => 'Snippet Type',
        'slug' => $slug,
        'parent' => 0,
            ));
    
    //add term Email Type under taxonomy Type
    $slug = sanitize_title('email_type');
    $term_id = wp_insert_term('email_type', 'impruv_email_type', array(
        'description' => 'Email Type',
        'slug' => $slug,
        'parent' => 0,
            ));


    $email_type_term = get_term_by('slug', 'email_type', 'impruv_email_type');
    $email_type_term_id = $email_type_term->term_id;//getting the id of term email_type
    
     //add term Immediate under term  Email type
    $slug = sanitize_title('immediate');
    $term_id = wp_insert_term('immediate', 'impruv_email_type', array(
        'description' => 'Immediate',
        'slug' => $slug,
        'parent' => $email_type_term_id,
            ));
    
     //add term Batch under term  Email type
    $slug = sanitize_title('batch');
    $term_id = wp_insert_term('batch', 'impruv_email_type', array(
        'description' => 'Batch',
        'slug' => $slug,
        'parent' => $email_type_term_id,
            ));
    
     //add term Marketing under term  Email type
    $slug = sanitize_title('marketing');
    $term_id = wp_insert_term('marketing', 'impruv_email_type', array(
        'description' => 'Marketing',
        'slug' => $slug,
        'parent' => $email_type_term_id,
            ));
}

add_action('init', 'create_email_taxonomies_and_add_terms', 0);


/**
 * change_administrator_role_name
 * Function to rename the Administrator role to Site Owner
 */
function change_administrator_role_name() 
{  
   
    global $wp_roles;
    if ( ! isset( $wp_roles ) )
        $wp_roles = new WP_Roles();
    
    $wp_roles->roles['administrator']['name'] = 'Site Owner';
    $wp_roles->role_names['administrator'] = 'Site Owner';      
  //  echo  $wp_roles->roles['administrator']['name'];exit;
}
add_action('init', 'change_administrator_role_name');
//wpmu_create_blog($domain, $path, $title, $user_id);

/**
 * impruw_add_user_roles_post_box
 * Function to add the user roles meta box to post type imruv_email.
 */
function impruw_add_user_roles_post_box() {

    add_meta_box('impruw-set-email-user-role', "User Roles", 'impruw_set_email_user_role', 'impruv_email', 'normal', 'low');
}
add_action('add_meta_boxes', 'impruw_add_user_roles_post_box');

/**
 * impruw_set_email_user_role
 * Function to display user roles in side the meta box for User Roles.
 * @global type $wp_roles
 * @global type $post
 */
function impruw_set_email_user_role() 
{
     
     $roles=wp_impruw_get_user_roles();
     global $post;
     $email_user_roles = get_post_meta($post->ID, 'user_roles', true);
     ?>
    <ul class="faq_list" ><?php
    foreach ($roles as $key => $value) 
        {
        if (!empty($email_user_roles)) 
            {
                ?>
                <li>
                    <input type="checkbox" name="impruw_set_user_role_post[]" value="<?php echo $key ?>" <?php echo (in_array($key, $email_user_roles)) ? 'checked="checked"' : ''; ?>>&nbsp;<?php echo $value; ?><br>
                </li>      
                <?php
                wp_nonce_field('impruw_set_user_role_post_nounce', 'impruw_set_user_role_post_nounce');
            } 
            else 
            {
                ?>
                <li>
                    <input type="checkbox" name="impruw_set_user_role_post[]" value="<?php echo $key ?>" >&nbsp;<?php echo $value; ?><br>
                </li> 
                <?php
                wp_nonce_field('impruw_set_user_role_post_nounce', 'impruw_set_user_role_post_nounce');
            }
            
        }
        ?>
        <div style="clear:both"></div></ul><?php
}

    /**
     * impruw_add_user_role_to_email
     * Function to add user role's to a an email.
     */
function impruw_add_user_role_to_email($post_id) 
{
      global $post;
     if ($_SERVER['REQUEST_METHOD'] !== 'POST')
            return;

     if (!current_user_can('edit_page', $post_id))
            return;
     if (!isset($_POST['impruw_set_user_role_post_nounce']) || !wp_verify_nonce($_POST['impruw_set_user_role_post_nounce'], 'impruw_set_user_role_post_nounce'))
            return;
         
     if ($_POST['post_type'] == "impruv_email") 
         {
            $user_roles_array = array();
            foreach ($_POST['impruw_set_user_role_post'] as $checkbox) 
                {
                    $user_roles_array[] = $checkbox;
                }
            update_post_meta($post_id, 'user_roles', $user_roles_array);
         }
}
add_action('save_post', 'impruw_add_user_role_to_email');


/**
 * 
 * wp_impruw_get_user_roles
 * Function to return all roles used in impruw site.
 * @global type $wp_roles
 * @return array $roles
 */
function wp_impruw_get_user_roles()
{
    global $wp_roles;
    $roles = $wp_roles->get_names(); 
    $roles['self']="Self";
    $roles['Super_admin']="Super Admin";
    return $roles;
}