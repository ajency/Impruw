<?php


function read_user_ajax(){
	
	if(is_user_logged_in())
        {
            
           $user_ID = get_current_user_id();
           $data = (array) get_userdata( $user_ID );
           $data['new_feature_alert'] = get_user_meta($user_ID,'new_feature_alert',TRUE); 
           wp_send_json(array('code' => 'OK', 'data' => $data));
	    //wp_send_json(array('code' => 'OK', 'data' => wp_get_current_user()));
        }
	else{
            wp_send_json(array('code' => 'ERROR', 'message' => 'User not logged in'));
        }
}
add_action('wp_ajax_read-user','read_user_ajax');

function update_user_ajax(){
        
        $display_name= $_POST['display_name'];
        $user_id =$_POST['ID'];
        $feature_alert = $_POST['new_feature_alert'];
        
        $user_id_return = wp_update_user(array( 
                            'ID' => $user_id,
                            'display_name' => $display_name )
                          );
        $option=update_user_meta($user_id, 'new_feature_alert',$feature_alert);
        if(is_wp_error($user_id_return))
        {
            wp_send_json(array('code' => 'not updated'));
        }
        
        else{
            wp_send_json(array(
                'code' => 'OK', 
                'ID' =>$user_id_return,
                'new_feature_alert'=>$option 
                ));
        }
}
add_action('wp_ajax_create-user','update_user_ajax');

function update_password() {
    $formdata= $_POST;
    unset($formdata['action']);
    $new_password = $formdata['json']['newpass1'];
    wp_set_password( $new_password, get_current_user_id() ) ;
    wp_send_json(array('code' => 'OK','data'=>get_current_user_id()));
}
add_action('wp_ajax_update-password','update_password');

function check_password() {
    $formdata= $_POST;
    unset($formdata['action']);
    
    $user_ID = get_current_user_id();
    $data = (array) get_userdata( $user_ID );
  
    $user_password = $data['data']->user_pass;
 
    if(wp_check_password( $formdata['json'], $user_password, $user_ID))
            $val = 1;
    else
            $val =0;
    
    wp_send_json(array('data'=>$val));
}
add_action('wp_ajax_check-password','check_password');