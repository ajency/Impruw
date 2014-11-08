<?php
/**
 * Template Name: Impruw Home Page
 */
get_header();
$register_page = get_page_by_title( 'Register' );
$register_page_id = $register_page->ID;
?>

<div class="aj-imp-homepage">
    
    <div class="home-1">
    	<h1><?php _e('Grow Your Business Online<br> With <span>Impruw</span>','impruwmain')?></h1>
        <?php if( !is_user_logged_in() ) { ?>
            <a class="btn btn-hg big-sign" href="<?php echo get_permalink(icl_object_id($register_page_id, 'page', TRUE)); ?>"><span class="icon icon-pen"></span><?php _e('Request A Demo','impruwmain')?></a>
        <?php } ?>
        <img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/HOME_banner.png" title="<?php _e('Impruw Themes','impruwmain'); ?>" alt="<?php _e('Impruw Themes','impruwmain'); ?>" class="img-responsive" />
    </div>

    <div class="home-3">
        <h2><?php _e('Do it yourself - Really!','impruwmain')?></h2>
        <p><?php _e('A simple drag & drop interface makes managing your website quick and simple.','impruwmain')?></p>
        <img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/HOME_gif.gif" title="<?php _e('Impruw Site Builder','impruwmain'); ?>" alt="<?php _e('Impruw Site Builder','impruwmain'); ?>" class="img-responsive" style="margin:auto;" />
    </div>

    <div class="home-5">
        <h2><?php _e('Fully functional across mobile devices','impruwmain')?></h2>
        <p><?php _e('Mobile web is here to stay. All websites created with Impruw are designed to be fully compatible with all new and future mobile and tablet devices, and adjust dynamically to screen sizes for the best possible user experience.','impruwmain')?></p>
        <img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/HOME_devices.png" title="<?php _e('Impruw Site Builder','impruwmain'); ?>" alt="<?php _e('Impruw Site Builder','impruwmain'); ?>" class="img-responsive" />
    </div>
 
    <div class="home-4">
        <h2><?php _e('Why choose Impruw?','impruwmain')?></h2>
        <p><?php _e('Impruw is a user friendly, complete hotel management system.','impruwmain')?></p>
        <div class="info-blocks clearfix">
            <div class="block row">
                <div class="col-md-2 icon-holder">
                    <span class="icon icon-paper-plane"></span>
                </div>
                <div class="col-md-10">
                    <h4><?php _e('Fast website creation','impruwmain')?></h4>
                    <p><?php _e('We can create an elegant and professional web presence for your business in just a few days. Choose from an ever-expanding selection of designs and features to suit your business and further personalise your website.','impruwmain')?></p>
                </div>
            </div>
            <div class="block row">
                <div class="col-md-2 icon-holder">
                    <span class="icon icon-wallet"></span>
                </div>
                <div class="col-md-10">
                    <h4><?php _e('Wallet friendly','impruwmain')?></h4>
                    <p><?php _e('Our fast development times and the scale of our business allows us to spread our costs, keeping them low and passing the saving on to you, the user.','impruwmain')?></p>
                </div>
            </div>
            <div class="block row">
                <div class="col-md-2 icon-holder">
                    <span class="icon icon-smiley"></span>
                </div>
                <div class="col-md-10">
                    <h4><?php _e('No technical experience needed','impruwmain')?></h4>
                    <p><?php _e('We know you have better things to do than spend hours updating your website. Thanks to our content management system, anyone can manage an attractive website without the need for technical know-how.','impruwmain')?></p>
                </div>
            </div>
            <div class="block row">
                <div class="col-md-2 icon-holder">
                    <span class="icon icon-tools"></span>
                </div>
                <div class="col-md-10">
                    <h4><?php _e('Continuous development','impruwmain')?></h4>
                    <p><?php _e('Website design trends change all the time, and your viewers may judge your business negatively in the future as even minute changes in design start to become outdated. Our developers are constantly working to keep your sites looking fresh and modern.','impruwmain')?></p>
                </div>
            </div>
        </div>
    </div>
   
    <div class="home-2">
    	<div class="row">
    		<div class="col-md-4">
    			<img src="<?php echo get_template_directory_uri(); ?>/images/video-2.jpg" title="<?php _e('Impruw Themes','impruwmain'); ?>" alt="<?php _e('Impruw Themes','impruwmain'); ?>" class="img-responsive" />
    		</div>
    		<div class="col-md-8">
    			<h2><?php _e('Impruw is the low-cost solution for small and medium size businesses looking to grow their online presence.','impruwmain')?></h2>
    			<p>
    				<?php _e('Whether you’re a hotel, restaurant, pub or tradesman your website is the first thing every guest will see. Impruw helps you market your business online and reach new customers. It’s the quick, inexpensive, no-hassle way to build and manage a complete online presence for your company. We can arrange to visit your business to discuss your needs and deliver a finished website complete with built-in management tool for easy updating.','impruwmain')?>
    			</p>
    		</div>
    	</div>
    	<div class="info-blocks clearfix">
    		<div class="block">
    			<?php _e('Ready for Mobile, Tablets and Desktops.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('SEO and Statistics - Be found, and know who’s looking.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('Professional email service and other tools to manage your online presence.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('Stay Connected with E-mail.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('Frustration-free content updates.','impruwmain')?>
    		</div>
    	</div>
    </div>

    <?php if( !is_user_logged_in() ) { ?>
    <div class="home-6">
    	<div class="row">
    		<div class="col-md-6">
    			<h4><?php _e('Ready to get Started?','impruwmain')?></h4>
    		</div>
    		<div class="col-md-6">
                <a class="btn btn-hg big-sign" href="<?php echo get_permalink(icl_object_id($register_page_id, 'page', TRUE)); ?>"><span class="icon icon-pen"></span><?php _e('Sign up for a free trial','impruwmain')?></a>
    		</div>
    	</div>
    </div>
    <?php } ?>

</div>

<?php get_footer();