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
     * @param       $ID
     * @param array $page_json
     *
     * @return \InvalidArgumentException
     */
    private function import_page( $ID, array $page_json ) {

        if ( get_post( $ID ) === null )
            return new \InvalidArgumentException( 'No such page found' );

        $data = set_json_to_site( $page_json, 'en', true );
        add_page_json( $ID, $data );

        delete_all_revisions( $ID );
        update_page_autosave( $ID, $data );
    }

    private function import_section( $ID, array $page_json ) {

        if ( $ID === 'theme-header' )
            $this->import_theme_header( $page_json );
        else if ( $ID === 'theme-footer' )
            $this->import_theme_footer( $page_json );

    }

    private function import_theme_header( $page_json ) {
        $data = set_json_to_site( $page_json );
        update_option( 'theme-header', $data );
        update_option( 'theme-header-autosave', $data );
    }

    private function import_theme_footer( $page_json ) {
        $data = set_json_to_site( $page_json );
        update_option( 'theme-footer', $data );
        update_option( 'theme-footer-autosave', $data );
    }

}
