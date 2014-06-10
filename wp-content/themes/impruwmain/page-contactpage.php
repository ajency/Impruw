<?php
/**
 * Template Name: Impruw Contact Page
 */
get_header();
?>

<div class="aj-imp-contactpage">
    
    <h1 class="main-title"><?php _e('You can find us at the following locations.','impruwmain')?></h1>

    <div class="contact london">
        <h2><?php _e('London','impruwmain')?></h2>
        <div class="c-address">
            <?php _e('<b>Impruw Pvt. Ltd.</b><br>Leilighet 425<br>Trondheim<br>Norway<br>NO-7321<br>Call Us: ','impruwmain')?>
            <a href="tel:+4712345678"><?php _e('+47 - 12 34 56 78', 'impruwmain'); ?></a>
        </div>
        <div class="c-map">
            <div class='embed-container'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4966.857788292924!2d-0.021108749999961787!3d51.505347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487602ba7a12992f%3A0x4d821857a5e4a41!2sCanary+Wharf%2C+London+E14!5e0!3m2!1sen!2s!4v1400839601100" width="800" height="600" frameborder="0" style="border:0"></iframe></div>
        </div>
    </div>

    <div class="contact norway">
        <h2><?php _e('Norway','impruwmain')?></h2>
        <div class="c-address">
            <?php _e('<b>Impruw Pvt. Ltd.</b><br>Leilighet 425<br>Trondheim<br>Norway<br>NO-7321<br>Call Us: ','impruwmain')?>
            <a href="tel:+4712345678"><?php _e('+47 - 12 34 56 78', 'impruwmain'); ?></a>
        </div>
        <div class="c-map">
            <div class='embed-container'><iframe src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1784.5915336701821!2d10.400091!3d63.430284!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d319bd5506741%3A0xc19dc194656d7c78!2sVitensenteret+i+Trondheim!5e0!3m2!1sen!2s!4v1400835543532' width='800' height='600' frameborder='0' style='border:0'></iframe></div>
        </div>
    </div>
    
    <div class="clearfix"></div>
    
    <div class="contact-form-container">
        <h3><?php _e('Send us a Message','impruwmain')?></h3>
        <?php echo do_shortcode('[contact subject="Contact Form"]');?>
    </div>

</div>

<?php get_footer();