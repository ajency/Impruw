<?php
/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 30/06/14
 * Time: 1:24 PM
 */

namespace framework\themes;


class ThemeDatabaseImporter implements ThemeImporterInterface {

    /**
     * @param $ID        int
     * @param $page_json array
     *
     * @return mixed
     */
    public function import( $ID, array $page_json ) {
        if ( is_numeric( $ID ) )
            $this->import_page( $ID, $page_json );
        else
            $this->import_section( $ID, $page_json );
    }

    /**
     * @param $ID
     * @param $page_json
     */
    private function update_page_meta( $ID, $page_json ) {

        update_post_meta( $ID, 'page-json', $page_json );
    }

    /**
     * @param $ID
     * @param $page_json
     *
     * @return bool
     */
    private function update_page_autosave_meta( $ID, $page_json ) {

        $autosave_page = wp_get_post_autosave( $ID );

        if ( !$autosave_page )
            return FALSE;

        update_autosave_page_json( $autosave_page->ID, $page_json );

    }

    /**
     * @param       $ID
     * @param array $page_json
     *
     * @return \InvalidArgumentException
     */
    private function import_page( $ID, array $page_json ) {

        if ( get_post( $ID ) === null )
            return new \InvalidArgumentException( 'No such page found' );

        $this->update_page_meta( $ID, $page_json );
        $this->update_page_autosave_meta( $ID, $page_json );
    }

    private function import_section( $ID, array $page_json ) {

        if ( $ID === 'theme-header' )
            $this->import_theme_header( $page_json );
        else if ( $ID === 'theme-footer' )
            $this->import_theme_footer( $page_json );

    }

    private function import_theme_header( $page_json ) {

        update_option( 'theme-header', $page_json );
        update_option( 'theme-header-autosave', $page_json );
    }

    private function import_theme_footer( $page_json ) {

        update_option( 'theme-footer', $page_json );
        update_option( 'theme-footer-autosave', $page_json );
    }

}
