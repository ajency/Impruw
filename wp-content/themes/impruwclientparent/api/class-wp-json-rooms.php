<?php 

class WP_JSON_Rooms extends WP_JSON_CustomPostType{

	/**
	 * Base route
	 *
	 * @var string
	 */
	protected $base = '/rooms';

	/**
	 * Post type
	 *
	 * @var string
	 */
	protected $type = 'impruw_room';


	/**
	 * Register the page-related routes
	 *
	 * @param array $routes Existing routes
	 * @return array Modified routes
	 */
	public function register_routes( $routes ) {
		$routes = parent::register_routes( $routes );

		// Add post-by-path routes
		$routes[ $this->base . '/(?P<path>.+)'] = array(
			array( array( $this, 'get_post_by_path' ),    WP_JSON_Server::READABLE ),
			array( array( $this, 'edit_post_by_path' ),   WP_JSON_Server::EDITABLE | WP_JSON_Server::ACCEPT_JSON ),
			array( array( $this, 'delete_post_by_path' ), WP_JSON_Server::DELETABLE ),
		);

		return $routes;
	}

	/**
	 * Retrieve a page by path name
	 *
	 * @param string $path
	 */
	public function get_post_by_path( $path, $context = 'view' ) {
		$post = get_page_by_path( $path, ARRAY_A );

		if ( empty( $post ) ) {
			return new WP_Error( 'json_post_invalid_id', __( 'Invalid post ID.' ), array( 'status' => 404 ) );
		}

		return $this->get_post( $post['ID'], $context );
	}

	/**
	 * Edit a page by path name
	 *
	 * @param string $path
	 */
	public function edit_post_by_path( $path, $data, $_headers = array() ) {
		$post = get_page_by_path( $path, ARRAY_A );

		if ( empty( $post ) ) {
			return new WP_Error( 'json_post_invalid_id', __( 'Invalid post ID.' ), array( 'status' => 404 ) );
		}

		return $this->edit_post( $post['ID'], $data, $_headers );
	}

	/**
	 * Delete a page by path name
	 *
	 * @param string $path
	 */
	public function delete_post_by_path( $path, $force = false ) {
		$post = get_page_by_path( $path, ARRAY_A );

		if ( empty( $post ) ) {
			return new WP_Error( 'json_post_invalid_id', __( 'Invalid post ID.' ), array( 'status' => 404 ) );
		}

		return $this->delete_post( $post['ID'], $force );
	}

	/**
	 * Prepare post data
	 *
	 * @param array $post The unprepared post data
	 * @param array $fields The subset of post type fields to return
	 * @return array The prepared post data
	 */
	protected function prepare_post( $post, $context = 'view' ) {
		$_post = parent::prepare_post( $post, $context );

		// Override entity meta keys with the correct links
		$_post['meta']['links']['self'] = json_url( $this->base . '/' . get_page_uri( $post['ID'] ) );

		if ( ! empty( $post['post_parent'] ) ) {
			$_post['meta']['links']['up'] = json_url( $this->base . '/' . get_page_uri( (int) $post['post_parent'] ) );
		}

		return apply_filters( 'json_prepare_page', $_post, $post, $context );
	}
}

function im_json_api_default_filters( $server ) {
	global $wp_json_posts, $wp_json_pages, $wp_json_media, $wp_json_taxonomies;

	// Pages
	$wp_json_pages = new WP_JSON_Rooms( $server );
	$wp_json_pages->register_filters();

}
add_action( 'wp_json_server_before_serve', 'im_json_api_default_filters', 12, 1 );

function change_api_url_root($api_prefix){
	return 'api';
}
add_filter('json_url_prefix', 'change_api_url_root',100, 1);
