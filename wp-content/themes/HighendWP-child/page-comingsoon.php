<?php
/**
 * Template Name: Coming Soon
 */
get_header();
?>

<div class="aj-imp-comingsoon">
    <img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/comingsoon.png" title="<?php _e('Impruw','impruwmain'); ?>" alt="<?php _e('Impruw is Coming Soon!','impruwmain'); ?>" class="img-responsive" />
</div>

<?php get_footer();