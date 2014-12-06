<?php
/**
 * Template Name: Impruw FAQ Page
 */
get_header();

if (have_posts()) : while (have_posts()) : the_post();
?>

<div class="aj-imp-faqpage">
    
    <?php
    // Get Post Content
    the_content();
    ?>

</div>

<?php 
endwhile;
endif;

get_footer();