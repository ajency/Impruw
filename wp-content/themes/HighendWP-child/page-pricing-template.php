<?php
/**
 * Template Name: Impruw Pricing Plans
 */
get_header();
$register_page = get_page_by_title( 'Register' );
$register_page_id = $register_page->ID;

if (have_posts()) : while (have_posts()) : the_post();
?>

<div class="aj-imp-pricing">
    
    <h1 class="main-title">
        <?php the_title(); ?>
    </h1>
    <div class="pg-content">
        <?php
        // Get Post Content
        the_content();
        ?>
        <a class="btn btn-hg register-link" class="btn btn-default btn-block" data-toggle="modal" data-target="#quote-pop"><?php _e('Request a Quote', 'impruwmain')?></a>
    </div>

    <div class="row price-plans">
        <div class="col-sm-4">
            <div id="free-plan" class="panel panel-default text-center">
                <div class="panel-heading">
                    <h3><?php echo __('Essential', 'impruwmain'); ?></h3>
                </div>
                <ul class="list-group">
                    <li class="list-group-item"><?php echo __('Assisted Set-Up', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Unlimited Pages', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Easy to use Content Management System (CMS)', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Mobile and Tablet Ready Site', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('1 x Email Account', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Facebook/Twitter Widgets', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Search Engine Optimisation (SEO)', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Online Support', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Continuous Development', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Full Range of Usage Statistics', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('+1 Add-on', 'impruwmain'); ?></li>
                </ul>
            </div>
        </div>

        <div class="col-sm-4">
        	<div class="panel panel-default text-center"> 
        		<div class="panel-heading"> 
        			<h3><?php echo __('Plus', 'impruwmain'); ?></h3> 
        		</div> 
        		<ul class="list-group"> 
        			<li class="list-group-item"><?php echo __('Assisted Set-Up', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Unlimited Pages', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Easy to use Content Management System (CMS)', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Mobile and Tablet Ready Site', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('5 x Email Account', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Facebook/Twitter Widgets', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Search Engine Optimisation (SEO)', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Online Support', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Continuous Development', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Full Range of Usage Statistics', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('+3 Add-ons', 'impruwmain'); ?></li>
        		</ul> 
        	</div>
    	</div>

        <div class="col-sm-4">
        	<div class="panel panel-default text-center"> 
        		<div class="panel-heading"> 
        			<h3><?php echo __('Premium', 'impruwmain'); ?></h3> 
        		</div> 
        		<ul class="list-group"> 
        			<li class="list-group-item"><?php echo __('Assisted Set-Up', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Unlimited Pages', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Easy to use Content Management System (CMS)', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Mobile and Tablet Ready Site', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('10 x Email Account', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Facebook/Twitter Widgets', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Search Engine Optimisation (SEO)', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Online Support', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Continuous Development', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Full Range of Usage Statistics', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Unlimited Add-ons', 'impruwmain'); ?></li>
                </ul>
        	</div>
        </div>
    </div>

    <div class="add-ons">
        <h5><?php echo __('Available Add-ons', 'impruwmain'); ?></h5>
        <ol>
            <li><?php echo __('Food/Drink menu', 'impruwmain'); ?></li>
            <li><?php echo __('Display rooms', 'impruwmain'); ?></li>
            <li><?php echo __('Availability Calendar for rooms', 'impruwmain'); ?></li>
            <li><?php echo __('Language translation', 'impruwmain'); ?></li>
        </ol>
    </div>

    <div class="modal fade" id="quote-pop" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="myModalLabel"><?php echo __('Request a Quote', 'impruwmain'); ?></h4>
          </div>
          <div class="modal-body">
            <?php echo do_shortcode('[formidable id=2]');?>
          </div>
        </div>
      </div>
    </div>
    
</div>

<?php 
endwhile;
endif;

get_footer();