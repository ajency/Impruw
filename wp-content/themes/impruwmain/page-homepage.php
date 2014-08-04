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
        <img src="<?php echo get_template_directory_uri(); ?>/images/HOME_banner.png" title="Impruw Themes" alt="Impruw Themes" class="img-responsive" />
    </div>

    <div class="home-2">
    	<div class="row">
    		<div class="col-sm-4">
    			<img src="<?php echo get_template_directory_uri(); ?>/images/video.png" title="Impruw Themes" alt="Impruw Themes" class="img-responsive" />
    		</div>
    		<div class="col-sm-8">
    			<h2><?php _e('Our Cloud Software Provides','impruwmain')?></h2>
    			<p>
    				<?php _e('Businesses run succesfully on Impruw across the world. You can set up a website to showcase your hotel in less than an hour and give your local business the coverage it deserves!','impruwmain')?>
    			</p>
    			<p>
    				<?php _e('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Praesent id metus massa, ut blandit odio. Proin quis tortor orci.','impruwmain')?> 
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
    	<img src="<?php echo get_template_directory_uri(); ?>/images/HOME_gif.png" title="Impruw Site Builder" alt="Impruw Site Builder" class="img-responsive" />
    </div>

    <div class="home-4">
    	<h2><?php _e('Lorem Ipsum Dolor Sit Amet!','impruwmain')?></h2>
    	<p><?php _e('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','impruwmain')?></p>
    	<div class="info-blocks clearfix">
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-magnifier"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('Search Engine Friendly','impruwmain')?></h4>
    				<p><?php _e('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s','impruwmain')?></p>
    			</div>
    		</div>
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-tools"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('Norway and London Based Support Team','impruwmain')?></h4>
    				<p><?php _e('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s','impruwmain')?></p>
    			</div>
    		</div>
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-wallet"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('Friendly to your Pocket','impruwmain')?></h4>
    				<p><?php _e('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s','impruwmain')?></p>
    			</div>
    		</div>
    		<div class="block row">
    			<div class="col-sm-2 icon-holder">
    				<span class="icon icon-box"></span>
    			</div>
    			<div class="col-sm-10">
    				<h4><?php _e('Works out of the box','impruwmain')?></h4>
    				<p><?php _e('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s','impruwmain')?></p>
    			</div>
    		</div>
    	</div>
    </div>

    <div class="home-5">
    	<h2><?php _e('Lorem Ipsum Dolor Sit Amet!','impruwmain')?></h2>
    	<p><?php _e('Lorem Ipsum is simply dummy text of the printing and typesetting industry.','impruwmain')?></p>
    	<img src="<?php echo get_template_directory_uri(); ?>/images/HOME_devices.png" title="Impruw Site Builder" alt="Impruw Site Builder" class="img-responsive" />
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