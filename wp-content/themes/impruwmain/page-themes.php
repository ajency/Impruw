<?php
/**
 * Template Name: Impruw Themes Showcase
 */
get_header();

if (have_posts()) : while (have_posts()) : the_post();
?>

<div class="aj-imp-themes">
    
    <?php
    // Get Post Content
    the_content();
    ?>
    <div class="aj-imp-block-list">
		<ul>
			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/07/MinimalTheme-244x300.png" class="img-responsive"> 
				<h6 class="desc">Minimal Theme</h6> 
				<div class="aj-imp-choose-btn">  
					<a class="btn" target="_blank" href="http://minimal.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/01/template3-225x300.jpg" class="img-responsive"> 
				<h6 class="desc">Blue Bold</h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_blank" href="http://bluebold.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/01/template1-225x300.jpg" class="img-responsive"> 
				<h6 class="desc">Classic Green</h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_newtab303" href="http://classicgreen.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/03/template2-225x300.jpg" class="img-responsive"> 
				<h6 class="desc">Pink Theme</h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_newtab302" href="http://pinktheme.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/06/template4-225x300.jpg" class="img-responsive"> 
				<h6 class="desc">Neon</h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_newtab301" href="http://neon.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a> 
				</div> 
			</li>

			<li class="block">
				<img src="http://minimal.impruw.com/wp-content/uploads/2014/05/screenshot-225x300.png" class="img-responsive"> 
				<h6 class="desc">Diamond Theme</h6> 
				<div class="aj-imp-choose-btn"> 
					<a class="btn" target="_newtab180" href="http://diamond.impruw.com"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;Preview</a> 
				</div> 
			</li>
		</ul>
	</div>
</div>

<?php 
endwhile;
endif;

get_footer();