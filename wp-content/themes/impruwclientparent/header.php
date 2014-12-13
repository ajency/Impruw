<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Impruw Client Parent
 * @since Impruw Client Parent 1.0
 */
?><!DOCTYPE html> 
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <title><?php wp_title( '|', true, 'right' ); ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <link rel="shortcut icon" href="<?php echo get_parent_template_directory_uri(); ?>/images/favicon.png" type="image/x-icon" />
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    
    <div class="site-style-container">
        <header class="site-header">

            <?php
            if(!isset($_GET['no_header'])){
                echo generate_markup( 'header' );
            }
            elseif( isset($_GET['no_header']) && isset($_GET['revision']) ){
                
                $revision_id = (int) $_GET['revision'];
                $revision = get_post( $revision_id );

                if ( strpos($revision->post_name, 'revision') == false )
                    return new WP_Error( 'error', __("This is not a revision") );

                $page_id = $revision->post_parent;

                $page = get_post( $page_id );

                // check if post is a page
                if ( $page->post_type != 'page' )
                    return new WP_Error( 'error', __("Revision is not for a page") );

                $page_id = icl_object_id( $page_id, 'page', true, 'en' );
            
                if(!impruw_is_front_page($page_id))
                    show_revision_header_placeholder();
                else
                    echo generate_markup( 'header' );
            }
            else{
                if(!is_front_page())
                    show_revision_header_placeholder();
                else
                    echo generate_markup( 'header' );
            }
            ?>
        </header>
        <!-- .site-header -->