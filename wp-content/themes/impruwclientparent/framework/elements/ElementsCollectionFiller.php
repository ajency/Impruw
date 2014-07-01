<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 11:06 PM
 */

namespace framework\elements;


class ElementsCollectionFiller {

    private $skeleton_json;

    private $elements = array();

    /**
     * @param ElementsRecursiveIterator $elements_collection_iterator
     */
    function __construct( array $skeleton_json ) {

        $this->skeleton_json = $skeleton_json;

        $this->create_elements_tree();
    }

    /**
     *
     */
    private function create_elements_tree() {

        foreach ( $this->skeleton_json as &$element ) {
            if ( $element[ 'element' ] === 'Row' ) {
                $element[ 'columncount' ] = count( $element[ 'elements' ] );
                $this->elements[ ] = $this->get_row_elements( $element );
            } else {
                $meta = $this->get_meta_values( $element );
                if ( $meta !== FALSE )
                    $this->elements[ ] = $meta;
            }
        }
    }

    private function get_row_elements( &$element ) {

        foreach ( $element[ 'elements' ] as &$column ) {
            foreach ( $column[ 'elements' ] as &$ele ) {
                if ( $ele[ 'element' ] === 'Row' ) {
                    $ele[ 'columncount' ] = count( $ele[ 'elements' ] );
                    $ele                  = $this->get_row_elements( $ele );
                } else {
                    $meta = $this->get_meta_values( $ele );
                    if ( $meta !== FALSE )
                        $ele = wp_parse_args( $meta, $ele );
                }
            }
        }

        return $element;
    }

    private function get_meta_values( $element, $create = FALSE ) {

        $meta = get_metadata_by_mid( 'post', $element[ 'meta_id' ] );

        if ( !$meta )
            return FALSE;

        $ele              = maybe_unserialize( $meta->meta_value );
        $this->validate_element( $ele );

        return $ele;
    }

    private function validate_element( &$element ) {

        $numeric_keys = array( 'id', 'meta_id', 'menu_id', 'ID', 'image_id' );
        $bool_keys = array( 'draggable', 'justified' );

        if ( !is_array( $element ) && !is_object( $element ) )
            return $element;

        foreach ( $element as $key => $val ) {
            if ( in_array( $key, $numeric_keys ) )
                $element[ $key ] = (int) $val;
            if ( in_array( $key, $bool_keys ) )
                $element[ $key ] = $val === "true";
        }

        return $element;
    }

    public function get_elements() {
        return $this->elements;
    }

    /**
     * this function will set the fetched json data from on site to another
     */
    private function set_json_to_site( $elements ) {

        foreach ( $elements as &$element ) {
            if ( $element[ 'element' ] === 'Row' ) {
                $element[ 'columncount' ] = count( $element[ 'elements' ] );
                $this->set_row_elements( $element );
            } else
                $element = $this->create_new_element( $element );
        }

        return $elements;
    }

    private function set_row_elements( &$element ) {

        foreach ( $element[ 'elements' ] as &$column ) {
            foreach ( $column[ 'elements' ] as &$ele ) {
                if ( $ele[ 'element' ] === 'Row' ) {
                    $ele[ 'columncount' ] = count( $ele[ 'elements' ] );
                    $this->set_row_elements( $ele );
                } else {
                    $ele = $this->create_new_element( $ele );
                }
            }
        }
    }

    // TODO: Remove if else statements
    private function create_new_element( &$ele ) {

        global $wpdb;

        //unset the existing meta_id
        unset( $ele[ 'meta_id' ] );

       // remove / update if menu or logo
        if ( $ele[ 'element' ] === 'Logo' ) {
            $ele[ 'logo_id' ] = get_option( 'logo_id', 0 );
        }

        if ( $ele[ 'element' ] === 'Menu' ) {
            $ele[ 'menu_id' ] = get_primary_menu_id();
        }

        if ( ( $ele[ 'element' ] === 'Image' || $ele[ 'element' ] === 'ImageWithText' ) && isset( $ele[ 'image_id' ] ) ) {
            $ele[ 'image_id' ] = 0;
        }

        if ( $ele[ 'element' ] === 'Slider' && isset( $ele[ 'slider_id' ] ) ) {
            $ele[ 'slider_id' ] = 0;
        }

        if ( $ele[ 'element' ] === 'RoomSummary' && isset( $ele[ 'room_id' ] ) ) {
            $ele[ 'room_id' ] = 0;
        }

        $serialized_element = maybe_serialize( $ele );

        $wpdb->insert( $wpdb->postmeta, array( 'post_id'  => 0, 'meta_value' => $serialized_element,
                                               'meta_key' => $ele[ 'element' ] ) );

        return array( 'meta_id' => $wpdb->insert_id, 'element' => $ele[ 'element' ] );
    }

}