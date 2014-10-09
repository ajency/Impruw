<?php
/**
 * Template Name: Impruw Home Page
 */
get_header();
?>

<div class="aj-imp-homepage">
    
    <div class="home-1">
    	<h1><?php _e('Grow Your Online Hotel Business<br> With <span>Impruw</span>','impruwmain')?></h1>
        <?php if( !is_user_logged_in() ) { ?>
        	<a href="<?php echo site_url(); ?>/register/" class="btn btn-hg big-sign"><span class="icon icon-pen"></span> <?php _e('Sign up for a free trial','impruwmain')?></a>
        <?php } ?>
        <img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/HOME_banner.png" title="<?php _e('Impruw Themes','impruwmain'); ?>" alt="<?php _e('Impruw Themes','impruwmain'); ?>" class="img-responsive" />
    </div>

    <div class="home-2">
    	<div class="row">
    		<div class="col-sm-4">
    			<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/video-2.jpg" title="<?php _e('Impruw Themes','impruwmain'); ?>" alt="<?php _e('Impruw Themes','impruwmain'); ?>" class="img-responsive" />
    		</div>
    		<div class="col-sm-8">
    			<h2><?php _e('Impruw is the low-cost online hosting solution for accommodation providers of any size.','impruwmain')?></h2>
    			<p>
    				<?php _e('Whether your property is grand hotel, country cottage, boutique seaside B&B or ultra-sleek city apartment, your website is the first thing every guest will see. That\'s why Impruw allows you to get the most out of marketing your hospitality business online. It\'s the fast, inexpensive, no-hassle way to build and manage a complete online presence for your property - and because it\'s so easy no third parties are needed, so you\'re in control of your business at every step. With Impruw you can set up a website to showcase your hotel in less than an hour and give your local business the coverage it deserves!','impruwmain')?>
    			</p>
    		</div>
    	</div>
    	<div class="info-blocks clearfix">
    		<div class="block">
    			<?php _e('A Well Crafted Website that works across mobile, tablets and desktop.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('Room Bookings and Availability Calendar.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('Professional email service and other tools to manage your online presence.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('Support for Multiple Languages.','impruwmain')?>
    		</div>
    		<div class="block">
    			<?php _e('And truly Do It Yourself. Updating your website has never been this easy.','impruwmain')?>
    		</div>
    	</div>
    </div>

    <div class="home-3">
    	<h2><?php _e('Do it yourself - Really!','impruwmain')?></h2>
    	<p><?php _e('Our simple drag and drop interface makes building beautiful free websites quick and simple.','impruwmain')?></p>
    	<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/HOME_gif.gif" title="<?php _e('Impruw Site Builder','impruwmain'); ?>" alt="<?php _e('Impruw Site Builder','impruwmain'); ?>" class="img-responsive" style="margin: auto;" />
    </div>

    <div class="home-4">
    	<h2><?php _e('Why choose Impruw?','impruwmain')?></h2>
    	<p><?php _e('Impruw is your low cost, user friendly, complete hotel management system.','impruwmain')?></p>
    	<div class="info-blocks clearfix">
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-paper-plane"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('Fast website creation','impruwmain')?></h4>
    				<p><?php _e('With our dynamic website builder you can create an elegant and welcoming web presence for your property in just a few clicks - no software downloads required. Choose from an ever-expanding range of templates and design features, add widgets and easily update any element of your website at any time.','impruwmain')?></p>
    			</div>
    		</div>
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-chat"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('Multi-Language Support','impruwmain')?></h4>
    				<p><?php _e('In a hotel business your guest could come from any part of the world, and you need to have a website that caters to all. Impruw provides support for five widely spoke European languages to help your content reach online visitors around the world. Add your custom translations while maintaining the aesthetic feel and look of the website.','impruwmain')?></p>
    			</div>
    		</div>
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-smiley"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('No technical experience needed','impruwmain')?></h4>
    				<p><?php _e('We understand that you have a business to run - that\'s why we\'ve made it our mission to take the time and hassle out of managing your website, eliminating the need for any specialist knowledge of coding, software or digital marketing. With Impruw anyone can successfully create and manage an attractive website with minimal resources or know-how.','impruwmain')?></p>
    			</div>
    		</div>
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-tools"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('Continuous development','impruwmain')?></h4>
    				<p><?php _e('The internet is a fast moving place - our team of developers and digital marketing experts come from a solid understanding of the web and how search engines work, which means we\'re committed to never stop devising new ways of saving your time and money, while keeping your website\'s visibility the highest priority.','impruwmain')?></p>
    			</div>
    		</div>
    	</div>
    </div>

    <div class="home-5">
    	<h2><?php _e('Fully functional across mobile devices','impruwmain')?></h2>
    	<p><?php _e('Mobile web is here to stay. All websites created with Impruw are designed to be fully compatible with all new and future mobile and tablet devices, and adjust dynamically to screen sizes for the best possible user experience.','impruwmain')?></p>
    	<img src="<?php echo get_template_directory_uri(); ?>/<?php echo get_language_based_image_path(); ?>/HOME_devices.png" title="<?php _e('Impruw Site Builder','impruwmain'); ?>" alt="<?php _e('Impruw Site Builder','impruwmain'); ?>" class="img-responsive" />
    </div>
    
    <?php if( !is_user_logged_in() ) { ?>
    <div class="home-6">
    	<div class="row">
    		<div class="col-sm-6">
    			<h4><?php _e('Ready to get Started?','impruwmain')?></h4>
    		</div>
    		<div class="col-sm-6">
                <a href="<?php echo site_url(); ?>/register/" class="btn btn-hg big-sign"><span class="icon icon-pen"></span> <?php _e('Sign up for a free trial','impruwmain')?></a>
    		</div>
    	</div>
    </div>
    <?php } ?>

</div>

<?php get_footer();