<?php
/**
 * Template Name: Impruw Team Page
 */
get_header();

if (have_posts()) : while (have_posts()) : the_post();
?>

<div class="aj-imp-teampage">
    
    <?php
    // Get Post Content
    the_content();
    ?>

</div>

<?php 
endwhile;
endif;

get_footer();