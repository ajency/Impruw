<?php
/**
 * Template Name: Contact
 */
get_header();
?>

<div class="aj-imp-register-form">
    <div class="row">
        <div class="col-sm-12 aj-imp-register-header">
            <h1><?php echo __('Contact Us', 'impruwmain'); ?> <span><?php echo __('Impruw', 'impruwmain'); ?></span></h1>
            <p class="desc">
                <?php echo __('Got a query? Get in touch!', 'impruwmain');
                ?>  
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-7 aj-imp-register-left">
            <?php
            // Get Post Content
            if (have_posts())
                ;
            while (have_posts()) : the_post();

                the_content();

            endwhile;
            ?>
        </div>
        <div class="col-md-5 aj-imp-register-right contact-details">
            <div class="aj-imp-register-steps">
                <span class="number"><span class="glyphicon glyphicon-home"></span></span>
                <?php echo __('Registered Address', 'impruwmain'); ?>
            </div>
            <div class="clearfix"></div>
            <div class="aj-imp-reg-step">
                <h5><?php echo __('Impruw Pvt. Ltd.', 'impruwmain'); ?></h5>
                <p>
                    <?php echo __('Leilighet 425', 'impruwmain'); ?><br>
                    <?php echo __('Trondheim', 'impruwmain'); ?><br>
                    <?php echo __('Norway', 'impruwmain'); ?><br>
                    <?php echo __('NO-7321', 'impruwmain'); ?>
                </p>
            </div>
            <div class="aj-imp-register-steps">
                <span class="number"><span class="glyphicon glyphicon-phone-alt"></span></span>
                <?php echo __('Phone', 'impruwmain'); ?>
            </div>
            <div class="clearfix"></div>
            <div class="aj-imp-reg-step">
                <h5><a href="tel:+4712345678"><?php echo __('+47 - 12 34 56 78', 'impruwmain'); ?></a></h5>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>    