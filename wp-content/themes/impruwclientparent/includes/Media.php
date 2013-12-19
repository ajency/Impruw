<?php

/**
 * 
 */
function get_site_media($args){

	$defaults = array(
					'offset'  		=> 0,
					'order'	  		=> 'DESC',
					'orderby' 		=> 'date',
					'posts_per_page'=>	30,
					'post_type'		=> 'attachment',
					'post_status'	=>'publish'
				);

	$args = wp_parse_args($args, $defaults);



	$wp_query = new WP_Query();

	return;	
}
