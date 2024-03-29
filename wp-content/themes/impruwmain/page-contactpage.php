<?php
/**
 * Template Name: Impruw Contact Page
 */
get_header();
?>

<div class="aj-imp-register-form">
    <div class="row">
        <div class="col-sm-12 aj-imp-register-header">
            <h1><?php echo __('Request a', 'impruwmain'); ?> <span><?php echo __('Demo', 'impruwmain'); ?></span></h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-7 aj-imp-register-left aj-imp-request-demo">
            <?php echo do_shortcode('[formidable id=3]');?>
        </div>
        <div class="col-md-5 aj-imp-register-right">
            <!--<div class="aj-imp-reg-step">
                <p>
            <?php echo __('Once you sign up along with your new Impruw account your website will also be created. Take the next step and activate your account using the activation link sent to your email address.', 'impruwmain'); ?>
                </p>
                <p>
            <?php echo __('If you don\'t see it in your inbox check your spam folder. ', 'impruwmain'); ?>
                </p>
                <p>
            <?php echo __('Still don\'t see it?', 'impruwmain'); ?>
                    <br>
                    <a href="#"><?php echo __('Click here to resend activation mail', 'impruwmain'); ?></a>
                </p>
            </div>-->
            <div class="aj-imp-reg-step">
                <h5><?php echo __('What happens next?', 'impruwmain'); ?></h5>
                <p>
                    <?php echo __('We\'ll contact you shortly to discuss your website needs and what Impruw can do for you.', 'impruwmain'); ?>
                </p>
                <p>
                    <?php echo __('Our business hours are Monday to Friday, 9:30 - 17:30.', 'impruwmain'); ?>
                </p>
                <p>
                    <?php echo __('We look forward to helping your business unlock its web potential.', 'impruwmain'); ?>
                </p>
            </div>
        </div>
    </div>
</div>

<?php get_footer();