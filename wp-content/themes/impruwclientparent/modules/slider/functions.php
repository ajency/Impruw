<?php

function get_slides($sliderID){
    $slider = new RevSlider();
    $slider->initByID($sliderID);

    $slides = $slider->getSlides(false);
    $slides_arr = array();
    foreach($slides as $order => $slide){

        $slides_arr[] = array(
                            'id'        => $slide->getID(),
                            'thumb_url' => $slide->getThumbUrl(),
                            'image_id'  => $slide->getImageID(),
                            'full_image'=> $slide->getImageFilepath(),
                            'order'     => $slide->getOrder()
                        );
    }

    return $slides_arr;
}

/**
 * 
 * @global type $wpdb
 * @return type
 */
function get_all_sliders(){
  
    global $wpdb;
    $table = GlobalsRevSlider::$table_sliders;    
    $sql = $wpdb->prepare("SELECT id FROM $table", null);
    $slider_ids = $wpdb->get_col($sql);
        
    $sliders_data = array();
    if(!empty($slider_ids)){
        
        foreach($slider_ids as $id){
            $sli = new RevSlider();
            $sli->initByID($id);
            $slider = array();// (array)$sli->getParams();
            $slider['id'] = $id;
            $slider['title'] = $sli->getTitle();
            $slider['alias'] = $sli->getAlias();
            $slider['no_of_slides'] = $sli->getNumSlides();
            $slides = $sli->getSlides(false);
            
            if(empty($slides)){
                $slider['thumb_url'] = get_parent_template_directory_uri(). '/app/dev/js/plugins/holder.js/100%x200/text:No Slides';
            }
            else{
                $slide = reset($slides);// get first slide
                $slider['thumb_url'] = $slide->getThumbUrl();
            }
            $sliders_data[] = $slider;
        }   
    }
    
    return $sliders_data;
}

function create_new_slider($data, $sliderID = 0){
    
    global $wpdb;
    
    $arrData = array();
    $arrData["title"]   = $data['title'];
    $arrData["alias"]   = $data['alias'];
    $params  = wp_parse_args($data, slider_defaults());
    
    //change params to json
    $arrData["params"] = json_encode($params);

    if($sliderID === 0){	//create slider	
       $sliderID = $wpdb->insert(GlobalsRevSlider::$table_sliders,$arrData);
       return($wpdb->insert_id);
    }else{	//update slider
       $this->initByID($sliderID);
       $sliderID = $wpdb->update(GlobalsRevSlider::$table_sliders,$arrData,array("id"=>$sliderID));				
    }
    
    return $sliderID;
}

function update_slider($data, $slider_id = 0){
    global $wpdb;
    
    $arrData = array();
    $arrData["title"]   = $data['title'];
    $arrData["alias"]   = $data['alias'];
    $params  = wp_parse_args($data, slider_defaults());
    
    //change params to json
    $arrData["params"] = json_encode($params);

    if($slider_id === 0){	//create slider	
       $wpdb->insert(GlobalsRevSlider::$table_sliders,$arrData);
       return($wpdb->insert_id);
    }else{	//update slider
        
       $slider_id = $wpdb->update(GlobalsRevSlider::$table_sliders,$arrData,array("id"=>$slider_id));				
    }
    
    return $slider_id;
}

/**
 * This is default configuration for the new slider
 * @return array the default config
 */
function slider_defaults(){
    
 return array (
            'title' => '',
            'alias' => '',
            'shortcode' => '[rev_slider ]',
            'source_type' => 'gallery',
            'post_types' => 'post',
            'post_category' => 'category_1',
            'post_sortby' => 'ID',
            'posts_sort_direction' => 'DESC',
            'max_slider_posts' => '30',
            'excerpt_limit' => '55',
            'slider_template_id' => '',
            'posts_list' => '',
            'slider_type' => 'fullwidth',
            'fullscreen_offset_container' => '',
            'fullscreen_min_height' => '',
            'full_screen_align_force' => 'off',
            'auto_height' => 'off',
            'force_full_width' => 'off',
            'width' => '960',
            'height' => '350',
            'responsitive_w1' => '940',
            'responsitive_sw1' => '770',
            'responsitive_w2' => '780',
            'responsitive_sw2' => '500',
            'responsitive_w3' => '510',
            'responsitive_sw3' => '310',
            'responsitive_w4' => '0',
            'responsitive_sw4' => '0',
            'responsitive_w5' => '0',
            'responsitive_sw5' => '0',
            'responsitive_w6' => '0',
            'responsitive_sw6' => '0',
            'delay' => '9000',
            'shuffle' => 'off',
            'lazy_load' => 'off',
            'use_wpml' => 'off',
            'stop_slider' => 'off',
            'stop_after_loops' => 0,
            'stop_at_slide' => 2,
            'load_googlefont' => 'false',
            'google_font' => 
            array (
              0 => '<link href=\'http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700\' rel=\'stylesheet\' type=\'text/css\'>',
            ),
            'position' => 'center',
            'margin_top' => 0,
            'margin_bottom' => 0,
            'margin_left' => 0,
            'margin_right' => 0,
            'shadow_type' => '2',
            'show_timerbar' => 'top',
            'padding' => 0,
            'background_color' => '#E9E9E9',
            'background_dotted_overlay' => 'none',
            'show_background_image' => 'false',
            'background_image' => '',
            'bg_fit' => 'cover',
            'bg_repeat' => 'no-repeat',
            'bg_position' => 'center top',
            'use_spinner' => '0',
            'spinner_color' => '#FFFFFF',
            'touchenabled' => 'on',
            'stop_on_hover' => 'on',
            'navigaion_type' => 'bullet',
            'navigation_arrows' => 'solo',
            'navigation_style' => 'round',
            'navigaion_always_on' => 'false',
            'hide_thumbs' => 200,
            'navigaion_align_hor' => 'center',
            'navigaion_align_vert' => 'bottom',
            'navigaion_offset_hor' => '0',
            'navigaion_offset_vert' => 20,
            'leftarrow_align_hor' => 'left',
            'leftarrow_align_vert' => 'center',
            'leftarrow_offset_hor' => 20,
            'leftarrow_offset_vert' => 0,
            'rightarrow_align_hor' => 'right',
            'rightarrow_align_vert' => 'center',
            'rightarrow_offset_hor' => 20,
            'rightarrow_offset_vert' => 0,
            'thumb_width' => 100,
            'thumb_height' => 50,
            'thumb_amount' => 5,
            'hide_slider_under' => 0,
            'hide_defined_layers_under' => 0,
            'hide_all_layers_under' => 0,
            'hide_thumbs_under_resolution' => 0,
            'loop_slide' => 'loop',
            'start_with_slide' => '1',
            'first_transition_type' => 'fade',
            'first_transition_duration' => 300,
            'first_transition_slot_amount' => 7,
            'reset_transitions' => '',
            'reset_transition_duration' => 0,
            0 => 'Execute settings on all slides',
            'jquery_noconflict' => 'on',
            'js_to_body' => 'false',
            'output_type' => 'none',
            'template' => 'false',
          );
}