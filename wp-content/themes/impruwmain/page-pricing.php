<?php
/**
 * Template Name: Impruw Pricing Plans
 */
get_header();

if (have_posts()) : while (have_posts()) : the_post();
?>

<div class="aj-imp-pricing">
    
    <?php
    // Get Post Content
    the_content();
    ?>

    <div class="row price-plans">
        <div class="col-sm-4">
            <div id="free-plan" class="panel panel-default text-center">
                <div class="panel-heading">
                    <h3>Free</h3>
                </div>
                <div class="panel-body">
                    <h3 class="panel-title price">£0</h3>
                    <span></span>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Mobile &amp; Tablet Ready Site</li>
                    <li class="list-group-item">Unlimited Pages</li>
                    <li class="list-group-item">5 Languages</li>
                    <li class="list-group-item">Flexible, easy-to-use Site builder</li>
                    <li class="list-group-item">24/7 security monitoring</li>
                    <li class="list-group-item">24/7 technical support</li>
                    <li class="list-group-item"><span class="ribbon">
                <a class="btn btn-block activate-link" href="http://impruw.com/register/">Choose Plan</a></span></li>
                </ul>
            </div>
        </div>

        <div class="col-sm-4">
        	<div class="panel panel-default text-center"> 
        		<div class="panel-heading"> 
        			<h3>Monthly Plan</h3> 
        		</div> 
        		<div class="panel-body"> 
        			<h3 class="panel-title price">£ 50</h3> 
        		</div> 
        		<ul class="list-group"> 
        			<li class="list-group-item">Mobile &amp; Tablet Ready Site</li> 
        			<li class="list-group-item">Unlimited Pages</li> 
        			<li class="list-group-item">5 Languages</li> 
        			<li class="list-group-item">Flexible, easy-to-use Site builder</li> 
        			<li class="list-group-item">24/7 security monitoring</li> 
        			<li class="list-group-item">24/7 technical support</li> 
        			<li class="list-group-item"><span class="ribbon"> <a class="btn btn-block activate-link" href="http://impruw.com/register/">Choose Plan</a></span></li> 
        		</ul> 
        	</div>
    	</div>

        <div class="col-sm-4">
        	<div class="panel panel-default text-center"> 
        		<div class="panel-heading"> 
        			<h3>Yearly Plan</h3> 
        		</div> 
        		<div class="panel-body"> 
        			<h3 class="panel-title price">£ 500</h3> 
        		</div> 
        		<ul class="list-group"> 
        			<li class="list-group-item">Mobile &amp; Tablet Ready Site</li> 
        			<li class="list-group-item">Unlimited Pages</li> 
        			<li class="list-group-item">5 Languages</li> 
        			<li class="list-group-item">Flexible, easy-to-use Site builder</li> 
        			<li class="list-group-item">24/7 security monitoring</li> 
        			<li class="list-group-item">24/7 technical support</li> 
        			<li class="list-group-item"><span class="ribbon"> <a class="btn btn-block activate-link" href="http://impruw.com/register/">Choose Plan</a></span></li> </ul> 
        	</div>
        </div>
    </div>
    
</div>

<?php 
endwhile;
endif;

get_footer();