<?php

function get_slides( $sliderID ) {

    if ( !slider_exists( $sliderID ) )
        return array();

    $slider = new RevSlider();
    $slider->initByID( $sliderID );


    $slides     = $slider->getSlides( FALSE );
    $slides_arr = array();
    foreach ( $slides as $order => $slide ) {

        $slides_arr[ ] = array(
            'id'          => $slide->getID(),
            'link'        => '',
            'slide_title' => '',
            'thumb_url'   => $slide->getThumbUrl(),
            'image_id'    => $slide->getImageID(),
            'full_url'    => $slide->getImageUrl(),
            'file_name'   => $slide->getImageFilename(),
            'order'       => $slide->getOrder(),
            'slider_id'   => $slide->getSliderId(),
            'layers'      => $slide->getLayers()
        );
    }

    return $slides_arr;
}

function slider_exists( $slider_id ) {

    global $wpdb;

    $table = GlobalsRevSlider::$table_sliders;

    $id = $wpdb->get_var( $wpdb->prepare( "SELECT id FROM $table WHERE id=%d", $slider_id ) );

    return $id != null;
}

function get_slider_by_id($slider_id){
    global $wpdb;

    $table = GlobalsRevSlider::$table_sliders;

    $data = $wpdb->get_row( $wpdb->prepare( "SELECT title , alias FROM $table WHERE id=%d", $slider_id ) , ARRAY_A);

    return $data;
}

/**
 *
 * @global type $wpdb
 * @return type
 */
function get_all_sliders() {

    global $wpdb;
    $table      = GlobalsRevSlider::$table_sliders;
    $sql        = $wpdb->prepare( "SELECT id FROM %s", $table );
    $slider_ids = $wpdb->get_col( $sql );

    $sliders_data = array();
    if ( !empty( $slider_ids ) ) {

        foreach ( $slider_ids as $id ) {
            $sli = new RevSlider();
            $sli->initByID( $id );
            $slider                   = array(); // (array)$sli->getParams();
            $slider[ 'id' ]           = $id;
            $slider[ 'title' ]        = $sli->getTitle();
            $slider[ 'alias' ]        = $sli->getAlias();
            $slider[ 'no_of_slides' ] = $sli->getNumSlides();
            $slides                   = $sli->getSlides( FALSE );

            if ( empty( $slides ) ) {
                $slider[ 'thumb_url' ] = get_parent_template_directory_uri() . '/app/dev/js/plugins/holder.js/100%x200/text:No Slides';
            } else {
                $slide                 = reset( $slides ); // get first slide
                $slider[ 'thumb_url' ] = $slide->getThumbUrl();
            }
            $sliders_data[ ] = $slider;
        }
    }

    return $sliders_data;
}

function create_new_slider( $data, $sliderID = 0 ) {

    global $wpdb;

    $arrData            = array();
    $arrData[ "title" ] = $data[ 'title' ];
    $arrData[ "alias" ] = $data[ 'alias' ] . '-' . rand(000, 99999);
    $params             = wp_parse_args( $data, slider_defaults() );

    //change params to json
    $arrData[ "params" ] = json_encode( $params );

    if ( $sliderID === 0 ) { //create slider
        $sliderID = $wpdb->insert( GlobalsRevSlider::$table_sliders, $arrData );

        return ( $wpdb->insert_id );
    } else { //update slider
        $this->initByID( $sliderID );
        $sliderID = $wpdb->update( GlobalsRevSlider::$table_sliders, $arrData, array( "id" => $sliderID ) );
    }

    return $sliderID;
}

function update_slider( $data, $slider_id = 0 ) {

    global $wpdb;

    $arrData            = array();
    $arrData[ "title" ] = $data[ 'title' ];
    $arrData[ "alias" ] = $data[ 'alias' ];
    $arrData[ "height"] = $data[ 'height' ];
    // print_r($data);exit;
    $params             = wp_parse_args( $data, slider_defaults() );
    unset( $arrData[ "height"] );

    //change params to json
    $arrData[ "params" ] = json_encode( $params );
    // print_r($arrData['params']);exit;

    if ( $slider_id === 0 ) { //create slider
        $slider_id = $wpdb->insert( GlobalsRevSlider::$table_sliders, $arrData );

        // return ( $wpdb->insert_id );
    } else { //update slider
        $wpdb->update( GlobalsRevSlider::$table_sliders, $arrData, array( "id" => $slider_id ) );
    }

    // set slide-transition for each slide of the slider on update of slider
    if (isset($data['reset_transitions'])){
        $tabs = GlobalsRevSlider::$table_slides;

        $slides = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$tabs} WHERE slider_id = %d",$slider_id),ARRAY_A);
        // print_r($slides);exit;
        foreach ($slides as $slide) {
            $slide_params = json_decode($slide['params']);
            $slide_params->slide_transition = $data['reset_transitions'];
            $slide_data = array( 'params' => json_encode($slide_params));
            $wpdb->update( GlobalsRevSlider::$table_slides, $slide_data, array("id" => $slide['id'] ) );
        }

        // $slide_data = array('slide_transition'=>$data['reset_transitions']) ;

        // $wpdb->update( GlobalsRevSlider::$table_slides, $slide_data, array("slider_id" => $slider_id ) );
    }

    return $slider_id;
}

/**
 * This is default configuration for the new slider
 * @return array the default config
 */
function slider_defaults() {

    return array(
        'title'                        => '',
        'alias'                        => '',
        'shortcode'                    => '[rev_slider ]',
        'source_type'                  => 'gallery',
        'post_types'                   => 'post',
        'post_category'                => 'category_1',
        'post_sortby'                  => 'ID',
        'posts_sort_direction'         => 'DESC',
        'max_slider_posts'             => '30',
        'excerpt_limit'                => '55',
        'slider_template_id'           => '',
        'posts_list'                   => '',
        'slider_type'                  => 'fullwidth',
        'fullscreen_offset_container'  => '',
        'fullscreen_min_height'        => '',
        'full_screen_align_force'      => 'off',
        'auto_height'                  => 'on',
        'force_full_width'             => 'off',
        'width'                        => '960',
        'height'                       => '350',
        'responsitive_w1'              => '940',
        'responsitive_sw1'             => '770',
        'responsitive_w2'              => '780',
        'responsitive_sw2'             => '500',
        'responsitive_w3'              => '510',
        'responsitive_sw3'             => '310',
        'responsitive_w4'              => '0',
        'responsitive_sw4'             => '0',
        'responsitive_w5'              => '0',
        'responsitive_sw5'             => '0',
        'responsitive_w6'              => '0',
        'responsitive_sw6'             => '0',
        'delay'                        => '9000',
        'shuffle'                      => 'off',
        'lazy_load'                    => 'off',
        'use_wpml'                     => 'on',
        'stop_slider'                  => 'off',
        'stop_after_loops'             => 0,
        'stop_at_slide'                => 2,
        'load_googlefont'              => 'false',
        'google_font'                  =>
            array(
                0 => '<link href=\'http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700\' rel=\'stylesheet\' type=\'text/css\'>',
            ),
        'position'                     => 'center',
        'margin_top'                   => 0,
        'margin_bottom'                => 0,
        'margin_left'                  => 0,
        'margin_right'                 => 0,
        'shadow_type'                  => 0,
        'show_timerbar'                => 'top',
        'padding'                      => 0,
        'background_color'             => '#E9E9E9',
        'background_dotted_overlay'    => 'none',
        'show_background_image'        => 'false',
        'background_image'             => '',
        'bg_fit'                       => 'contain',
        'bg_repeat'                    => 'no-repeat',
        'bg_position'                  => 'center center',
        'use_spinner'                  => '0',
        'spinner_color'                => '#FFFFFF',
        'touchenabled'                 => 'on',
        'stop_on_hover'                => 'on',
        'navigaion_type'               => 'bullet',
        'navigation_arrows'            => 'solo',
        'navigation_style'             => 'round',
        'navigaion_always_on'          => 'false',
        'hide_thumbs'                  => 200,
        'navigaion_align_hor'          => 'center',
        'navigaion_align_vert'         => 'bottom',
        'navigaion_offset_hor'         => '0',
        'navigaion_offset_vert'        => 20,
        'leftarrow_align_hor'          => 'left',
        'leftarrow_align_vert'         => 'center',
        'leftarrow_offset_hor'         => 20,
        'leftarrow_offset_vert'        => 0,
        'rightarrow_align_hor'         => 'right',
        'rightarrow_align_vert'        => 'center',
        'rightarrow_offset_hor'        => 20,
        'rightarrow_offset_vert'       => 0,
        'thumb_width'                  => 100,
        'thumb_height'                 => 50,
        'thumb_amount'                 => 5,
        'hide_slider_under'            => 0,
        'hide_defined_layers_under'    => 0,
        'hide_all_layers_under'        => 0,
        'hide_thumbs_under_resolution' => 0,
        'loop_slide'                   => 'loop',
        'start_with_slide'             => '1',
        'first_transition_type'        => 'fade',
        'first_transition_duration'    => 300,
        'first_transition_slot_amount' => 7,
        'reset_transitions'            => 'fade',
        'reset_transition_duration'    => 0,
        0                              => 'Execute settings on all slides',
        'jquery_noconflict'            => 'on',
        'js_to_body'                   => 'false',
        'output_type'                  => 'none',
        'template'                     => 'false',
    );
}

/**
 * Create new slides for the slider
 * $data array conatins the image path and image url
 *
 */
function create_new_slide( $data, $slider_id ) {

    global $wpdb;
    $slide = new RevSlide();

    //create slide
    $slide_id_ret = $slide->createSlide( $slider_id, $data );

    $params = wp_parse_args( $data, slide_defaults() );

    //change params to json
    $params2             = json_encode( $params );
    $arrData[ "params" ] = $params2;

    //table name
    $tab = GlobalsRevSlider::$table_slides;

    $wpdb->update( $tab, $arrData, array( "id" => $slide_id_ret ) );

    $slide_arr = slide_details_array( $slide_id_ret );

    return $slide_arr;
}

/**
 * Returns an array containing the slider defaults
 * for the slide ID passed
 */
function slide_details_array( $slide_id ) {

    $slide = new RevSlide();

    $slide->initByID( $slide_id );

    $slide_arr = array(
        'id'          => $slide->getID(),
        'link'        => '',
        'slide_title' => '',
        'thumb_url'   => $slide->getThumbUrl(),
        'image_id'    => $slide->getImageID(),
        'full_url'    => $slide->getImageUrl(),
        'file_name'   => $slide->getImageFilename(),
        'order'       => $slide->getOrder(),
        'slider_id'   => $slide->getSliderId(),
        'layers'      => $slide->getLayers()
    );

    return $slide_arr;
}

/**
 * This is default configuration for the new slide
 * @return array the default config
 */
function slide_defaults() {

    return array(
        "background_type"     => "image",
        "image"               => "imagepath",
        "state"               => "published",
        "date_from"           => "",
        "date_to"             => "",
        "slide_transition"    => "fade",
        "0"                   => "Remove",
        "slot_amount"         => 7,
        "transition_rotation" => 0,
        "transition_duration" => 300,
        "delay"               => 9000,
        "enable_link"         => "false",
        "link_type"           => "regular",
        "link"                => "",
        "link_open_in"        => "same",
        "slide_link"          => "nothing",
        "link_pos"            => "front",
        "slide_thumb"         => "",
        "slide_bg_color"      => "#E7E7E7",
        "slide_bg_external"   => "",
        "bg_fit"              => "contain",
        "bg_fit_x"            => "100",
        "bg_fit_y"            => "100",
        "bg_repeat"           => "no-repeat",
        "bg_position "        => "center center",
        "bg_position_x"       => "0",
        "bg_position_y"       => "0",
        "kenburn_effect"      => "off",
        "kb_start_fit"        => "100",
        "kb_end_fit"          => "100",
        "bg_end_position"     => "center center",
        "kb_duration"         => "9000",
        "kb_easing"           => "Linear.easeNone"
    );
}


/**
 * Update the slides based on the slide ID
 *
 */
function update_slide( $data, $slide_id, $language='all', $parent_slide=0) {

    global $wpdb;
    //$slide_id= 21;
    $arrData = array();

    
    //Get previous caption
    $old_slider_caption = get_slide_captionhtml($slide_id);

    if ($old_slider_caption==="") {
        $old_caption_title = "";
        $old_caption_desc = "";
    }
    else{
        $old_caption_details = get_slide_caption_details($old_slider_caption);
        $old_caption_title = $old_caption_details['caption_title'];
        $old_caption_desc = $old_caption_details['caption_description'];   
    }

    //New caption details
    if(isset($data['layers'])){

        $new_caption_details = get_slide_caption_details($data['layers'][0]['text']);
        $new_caption_title = $new_caption_details['caption_title'];
        $new_caption_title_class = $new_caption_details['caption_title_class'];
        $new_caption_desc = $new_caption_details['caption_description'];

        if ($new_caption_details['caption_title_link']!="") {
            $new_caption_title_link =$new_caption_details['caption_title_link'];
        }
        if ($new_caption_details['caption_title_link_target']!="") {
            $new_caption_title_link_target = $new_caption_details['caption_title_link_target'];
        }
        
        $default_language = wpml_get_default_language();

        //Modify caption only for default language, for other languages keep the previous caption
        if (($language==='all')||($language===$default_language)) {
            // $new_caption =  "<h3 class='".$new_caption_title_class."' data-title='".$new_caption_title."'>".$new_caption_title."</h3><div class='text' data-capdesc='".$new_caption_desc."'>".$new_caption_desc."</div>";

            $new_caption = "<h3 class='".$new_caption_title_class."' id='revslide-caption-title'>";
            if(isset($new_caption_title_link)){
                $new_caption .=  "<a href='".$new_caption_title_link."' target='".$new_caption_title_link_target."'>";
            }
                
                
            $new_caption .=  $new_caption_title;

            if(isset($new_caption_title_link)){
                $new_caption .=  "</a>" ;
            }
            $new_caption .=  "</h3><div class='text' id='revslide-caption-desc'>".$new_caption_desc."</div>";

        }
        else{
            // $new_caption =  "<h3 class='".$new_caption_title_class."' data-title='".$old_caption_title."'>".$old_caption_title."</h3><div class='text' data-capdesc='".$old_caption_desc."'>".$old_caption_desc."</div>";
            $new_caption = "<h3 class='".$new_caption_title_class."' id='revslide-caption-title'>";
            if(isset($new_caption_title_link)){
                $new_caption .=  "<a href='".$new_caption_title_link."' target='".$new_caption_title_link_target."'>";
            }
                
                
            $new_caption .=  $old_caption_title;

            if(isset($new_caption_title_link)){
                $new_caption .=  "</a>" ;
            }
            $new_caption .=  "</h3><div class='text' id='revslide-caption-desc'>".$old_caption_desc."</div>";
        }

        $data['layers'][0]['text'] = $new_caption;

    }

    $arrData[ "layers" ] = json_encode( $data['layers'] );
    unset($data['layers']);

    $data['lang'] = $language;

    if ($parent_slide!=0) {
        $data['parentid'] = $parent_slide;
    }

    $params  = wp_parse_args( $data, slide_defaults() );
    
    //change params to json
    $params2             = json_encode( $params );
    $arrData[ "params" ] = $params2;


    $tab = GlobalsRevSlider::$table_slides;

    $slide_id_ret = $wpdb->update( $tab, $arrData, array( "id" => $slide_id ) );

    if ( $slide_id_ret != 0 ) {

        // $slide_arr = slide_details_array( $slide_id_ret );

        return $slide_id;
    } else {
        return 0;
    }
}

/**
 * Delete the slides based on the slide ID
 *
 */
function delete_slide_ajax( $data ) {

    $slide = new RevSlide();

    $slide->deleteSlideFromData( $data );
}

/**
 * Created translated slides for a given slider
 */
function create_translated_slide($slider_id,$parent_slide_id,$language,$operation){

    $data = array(
                'sliderid' => $slider_id, 
                'slideid' => $parent_slide_id, 
                'lang' => $language, 
                'operation' => $operation
                );
    $slide = new RevSlide();

    $slide_response = $slide->doSlideLangOperation($data);

    $slide_id_ret = get_translated_slide_id($slide_response);

    return $slide_id_ret;

}

/**
 * Function to get newly translated slide id from the response of revslider's doSlideLangOperation($data) function
 */
function get_translated_slide_id($translated_resp){

    $lang_html = $translated_resp['html'];

    $d = new DOMDocument();
    $d->loadHTML($lang_html);
    $searchNode = $d->getElementsByTagName( "img" ); 


    foreach( $searchNode as $searchNode ) 
    { 
        $data_slideid = $searchNode->getAttribute('data-slideid');

    }

    return $data_slideid;

}

/**
 * Get translated child slides for a parent slide by slider id
 */

function get_language_child_slides($slider_id, $return_parent_slide=TRUE){
    $slider = new RevSlider();

    $slides = $slider->initByID( $slider_id );
    $slides     = $slider->getSlides( FALSE );
    $childslides = array();

    foreach ( $slides as $slide ) {

        $parentSlide = $slide->getParentSlide();
        $childslides[] = $parentSlide->getArrChildrenLangs($return_parent_slide);

    }

    return $childslides;


}

function update_translated_slides($data, $slider_id,$parent_id){
    //Update slide for other enabled languages as well
    //For default language caption should be same
    //For other languages captions should be same as previous or blank

    //Get default language
    
    //Get array of translated slide ids
    $child_slide_id_ret = array();
   
    $translated_slides = get_childslides_of_slide($parent_id);

    foreach ($translated_slides as $language_child_slide) {
        $translated_child_slide_id = $language_child_slide['slideid'];
        $translated_child_slide_lang = $language_child_slide['lang'];
        $child_slide_id_ret[] = update_slide( $data, $translated_child_slide_id, $translated_child_slide_lang,$parent_id );
    }

    return $child_slide_id_ret;
}

function get_slide_captionhtml($slide_id){
    $slide_data = slide_details_array($slide_id);

    $caption_html = isset($slide_data['layers'][0]) ? $slide_data['layers'][0]['text'] : "" ;
    return $caption_html;
}


function get_slide_caption_details($slide_caption_html){
    $dom = new DOMDocument();
    // $slide_caption_html ='<h3 class="title sub-title" data-title="fr title">fr title</h3><div class="text" data-capdesc="dis is descccc" id="text">dis is descccc</div>';

    $dom->loadHTML(stripslashes($slide_caption_html));

    $caption_details = array();

    $searchNode = $dom->getElementsByTagName( "h3" ); 


    foreach( $searchNode as $searchNode ) 
    { 
        // $title = $searchNode->getAttribute('data-title');
        $dom->preserveWhiteSpace = false;
        $dom->validateOnParse = true;
        $title = $dom->getElementById('revslide-caption-title')->nodeValue;
        $title_class = $searchNode->getAttribute('class');

    }

    $caption_details['caption_title'] = isset($title) ? $title : '' ;
    $caption_details['caption_title_class'] =  isset($title_class) ? $title_class : '' ;


    $searchNode = $dom->getElementsByTagName( "a" ); 
    foreach( $searchNode as $searchNode ) 
    { 
        $title_href = $searchNode->getAttribute('href');
        $title_href_target = $searchNode->getAttribute('target');

    }
    $caption_details['caption_title_link'] =  isset($title_href) ? $title_href : '' ;
    $caption_details['caption_title_link_target'] =  isset($title_href_target) ? $title_href_target : '' ;

    $searchNode = $dom->getElementsByTagName( "div" ); 


    foreach( $searchNode as $searchNode ) 
    { 
        // $description = $searchNode->getAttribute('data-capdesc');
        $dom->preserveWhiteSpace = false;
        $dom->validateOnParse = true;

        $description = $dom->getElementById('revslide-caption-desc')->nodeValue;

    }
    $caption_details['caption_description'] = isset($description) ? $description : '' ;

    return $caption_details;
}


function get_multilingual_slides($sliderID){

    if ( !slider_exists( $sliderID ) )
        return array();

    $slider = new RevSlider();
    $slider->initByID( $sliderID );


    $slides     = $slider->getSlides( FALSE );
    $slides_arr = array();
    foreach ( $slides as $order => $slide ) {

        $all_array = array('id'          => $slide->getID(),
                        'link'        => '',
                        'slide_title' => '',
                        'thumb_url'   => $slide->getThumbUrl(),
                        'image_id'    => $slide->getImageID(),
                        'full_url'    => $slide->getImageUrl(),
                        'file_name'   => $slide->getImageFilename(),
                        'order'       => $slide->getOrder(),
                        'slider_id'   => $slide->getSliderId(),
                        'layers'      => $slide->getLayers()
                        );


        $parentSlide = $slide->getParentSlide();
        $childslides_arr=$parentSlide->getArrChildrenLangs(FALSE);

        $lang_slide_array = array();

        foreach ($childslides_arr as $childslide) {
            $slide_lang = $childslide['lang'];
            $slide_id = $childslide['slideid'];
            $lang_slide_array[$slide_lang] = slide_details_array( $slide_id );
        }

        $lang_slide_array['all'] = $all_array;
        $slides_arr[ ] = $lang_slide_array;
    }
    return $slides_arr;
}


//function to get the languages in which a slide is available
function get_languages_of_slide($slide_id){
    $slide = new RevSlide();

    $slide->initByID( $slide_id );
    $available_slide_lang = $slide->getArrChildLangCodes();

    return $available_slide_lang;
}

//function to get child slides of a slide
function get_childslides_of_slide($slide_id, $return_parent_slide=FALSE){
    $slide = new RevSlide();

    $slide->initByID( $slide_id );
    $child_slides = $slide->getArrChildrenLangs($return_parent_slide);

    return $child_slides;
}

//check if slide exists in given language
function slide_exists_in_lang($slide_id, $language){
    $slide_language_array = get_languages_of_slide($slide_id);
    if (in_array($language, $slide_language_array)) {
        return true;
    }
    else{
        return false;
    }
}

function update_slide_by_language( $data , $slide_language, $parent_slide_id ){

    global $wpdb;
    $arrData = array();

    $data['lang'] = $slide_language;
    $data['parentid'] = $parent_slide_id;

    $slide_id = $data['id'];

    $arrData[ "layers" ] = json_encode( $data['layers'] );
    unset($data['layers']);

    $params  = wp_parse_args( $data, slide_defaults() );
    
    //change params to json
    $params2             = json_encode( $params );
    $arrData[ "params" ] = $params2;


    $tab = GlobalsRevSlider::$table_slides;

    $slide_id_ret = $wpdb->update( $tab, $arrData, array( "id" => $slide_id ) );

    if ( $slide_id_ret != 0 ) {

        return $slide_id;
    } else {
        return 0;
    }

}