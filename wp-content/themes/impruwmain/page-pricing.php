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
        <a class="btn btn-hg register-link" href="<?php echo get_permalink(icl_object_id($register_page_id, 'page', TRUE)); ?>"><?php _e('Register Now!', 'impruwmain')?></a>
    </div>

    <div class="row price-plans">
        <div class="col-sm-4">
            <div id="free-plan" class="panel panel-default text-center">
                <div class="panel-heading">
                    <h3><?php echo __('Essential', 'impruwmain'); ?></h3>
                </div>
                <div class="panel-body">
                    <h3 class="panel-title price"><?php echo __('£9.99/month', 'impruwmain'); ?><small class="price-cents"><?php echo __('(+ vat)', 'impruwmain'); ?></small></h3>
                    <h4 class="panel-title price"><?php echo __('£399.99 Set-up fee', 'impruwmain'); ?><small class="price-cents"><?php echo __('(+ vat)', 'impruwmain'); ?></small></h4>
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
        		<div class="panel-body"> 
        			<h3 class="panel-title price"><?php echo __('£14.99/month', 'impruwmain'); ?><small class="price-cents"><?php echo __('(+ vat)', 'impruwmain'); ?></small></h3>
                    <h4 class="panel-title price"><?php echo __('£399.99 Set-up fee', 'impruwmain'); ?><small class="price-cents"><?php echo __('(+ vat)', 'impruwmain'); ?></small></h4>
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
        		<div class="panel-body"> 
        			<h3 class="panel-title price"><?php echo __('£19.99/month', 'impruwmain'); ?><small class="price-cents"><?php echo __('(+ vat)', 'impruwmain'); ?></small></h3>
                    <h4 class="panel-title price"><?php echo __('£399.99 Set-up fee', 'impruwmain'); ?><small class="price-cents"><?php echo __('(+ vat)', 'impruwmain'); ?></small></h4>
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
            <li><?php echo __('Food / drink menu styles', 'impruwmain'); ?></li>
            <li><?php echo __('Add room categories', 'impruwmain'); ?></li>
            <li><?php echo __('Display room availability through availability calendar', 'impruwmain'); ?></li>
            <li><?php echo __('Add upto 5 language translations', 'impruwmain'); ?></li>
            <li><?php echo __('Create slide shows', 'impruwmain'); ?></li>
            <li><?php echo __('Create custom emails', 'impruwmain'); ?></li>
        </ol>
    </div>
    
</div>

<?php 
endwhile;
endif;

get_footer();