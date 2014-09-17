<?php
/**
 * Template Name: Impruw Pricing Plans
 */
get_header();

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
        <a class="btn btn-hg register-link" href="http://impruw.com/register/"><?php echo __('Register Now!', 'impruwmain'); ?></a>
    </div>

    <div class="row price-plans">
        <div class="col-sm-4">
            <div id="free-plan" class="panel panel-default text-center">
                <div class="panel-heading">
                    <h3><?php echo __('Free', 'impruwmain'); ?></h3>
                </div>
                <div class="panel-body">
                    <h3 class="panel-title price"><?php echo __('£ 0', 'impruwmain'); ?></h3>
                    <span></span>
                </div>
                <ul class="list-group">
                    <li class="list-group-item"><?php echo __('Mobile &amp; Tablet Ready Site', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Unlimited Pages', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('5 Languages', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Flexible, easy-to-use Site builder', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('24/7 security monitoring', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('24/7 technical support', 'impruwmain'); ?></li>
                    <li class="list-group-item"><?php echo __('Free subdomain on impruw.com', 'impruwmain'); ?></li>
                </ul>
            </div>
        </div>

        <div class="col-sm-4">
        	<div class="panel panel-default text-center"> 
        		<div class="panel-heading"> 
        			<h3><?php echo __('Monthly Plan', 'impruwmain'); ?></h3> 
        		</div> 
        		<div class="panel-body"> 
        			<h3 class="panel-title price"><?php echo __('£ 50', 'impruwmain'); ?></h3> 
        		</div> 
        		<ul class="list-group"> 
        			<li class="list-group-item"><?php echo __('Mobile &amp; Tablet Ready Site', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('Unlimited Pages', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('5 Languages', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('Flexible, easy-to-use Site builder', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('24/7 security monitoring', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('24/7 technical support', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('Custom domain', 'impruwmain'); ?></li>
        		</ul> 
        	</div>
    	</div>

        <div class="col-sm-4">
        	<div class="panel panel-default text-center"> 
        		<div class="panel-heading"> 
        			<h3><?php echo __('Yearly Plan', 'impruwmain'); ?></h3> 
        		</div> 
        		<div class="panel-body"> 
        			<h3 class="panel-title price"><?php echo __('£ 500', 'impruwmain'); ?></h3> 
        		</div> 
        		<ul class="list-group"> 
        			<li class="list-group-item"><?php echo __('Mobile &amp; Tablet Ready Site', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('Unlimited Pages', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('5 Languages', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('Flexible, easy-to-use Site builder', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('24/7 security monitoring', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('24/7 technical support', 'impruwmain'); ?></li> 
        			<li class="list-group-item"><?php echo __('Custom domain', 'impruwmain'); ?></li>
        	</div>
        </div>
    </div>
    
</div>

<?php 
endwhile;
endif;

get_footer();