<?php
/**Functions for sending subscription related emails**/

/*  
* Send email when a new plan is activated
*/
function plan_active_email($site_id, $plan_id){

    global $aj_comm;

    $site_mail = get_blog_option($site_id, 'admin_email');
    $user_from_email = get_user_by('email', $site_mail);
    $user_id = $user_from_email->ID;
    $user_name = $user_from_email->display_name;

    // Get user details


    $meta_data = array(
        'email_id' => $site_mail,
        'user_name' => $user_name,
        'plan_id' => $plan_id,
        'site_id' => $site_id
    );

    $comm_data = array(
        'component' => 'impruw_billing',
        'communication_type' => 'plan_active'
    );

    $recipient_emails =  array(
                            array(
                                'user_id' => $user_id,
                                'type' => 'email',
                                'value' => $site_mail,
                                'status' => 'linedup'
                            )
                        );

    $aj_comm->create_communication($comm_data,$meta_data,$recipient_emails);

}

add_action( 'ajbilling_update_payment_plan', 'plan_active_email', 10, 2 );

