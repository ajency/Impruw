<?php
/*
Template Name: Custom Language switcher
*/

get_header(); ?>
<div id="content" class="widecolumn">
    <?php 
    echo "<br/>";
    echo "<br/>";
    echo "<b><h4>Language Switcher Migration script</h4></b><br/>";
    echo "<br/>";

    if(!function_exists('norwegian_bokmal_for_old_sites')){

        /**
        * Retrieves all multisite blogs
        *
        * @return array Blog IDs as keys and blog names as values.
        */
        function norwegian_bokmal_for_old_sites() {

            global $wpdb;
            $multisite = array();
            // Query all blogs from multi-site install
            $blogs = $wpdb->get_results("SELECT blog_id,domain,path FROM wp_blogs WHERE blog_id ORDER BY blog_id");

            // Get primary blog
            $blogname = $wpdb->get_row("SELECT option_value FROM wp_options WHERE option_name='blogname' ");
            $multisite[1] = $blogname->option_value;

            // echo "<pre>";
            // print_r($multisite);
            // echo "</pre>";

            foreach ($blogs as $blog) {
                $blog_id = $blog->blog_id;

                switch_to_blog($blog_id);

                $table_name = $wpdb->prefix.'icl_languages_translations';

                $table_exists = $wpdb->get_var("SHOW TABLES LIKE '$table_name'");

                if($table_exists != $table_name) {
                    echo "Sorry! Language could not be updated for site ".$blog->path." as ".$table_name." does not exist";
                    echo "<br/>";
                    echo "<br/>";
                }
                else{

                    $translation_codes = array('en','fr','nb','es', 'de', 'it' );

                    foreach ($translation_codes as $translation_code) {

                        impruw_update_language_name_switcher($translation_code);

                    }

                    echo "Language has been successfully updated for site ".$blog->path;
                    echo "<br/>";
                    echo "<br/>";
                }

                restore_current_blog();

            }

        }

        norwegian_bokmal_for_old_sites();
    }
?>    
</div>
<?php get_footer(); ?>