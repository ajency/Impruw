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
    $user_language = get_user_meta($user_id,'user_lang',true);
    
    $plan_change_date = date("F j, Y"); //current date

    // Get current subscriptions amount 
    $braintree_customer_id = get_option( 'braintree-customer-id','');
    $domain_name = get_option( 'domain-name', get_option( 'blogname' ) . '.impruw.com' );
    $current_subscription_id = aj_braintree_get_customer_subscription($braintree_customer_id);
    $current_subscription = aj_braintree_get_subscription($current_subscription_id );
    $plan_amount = $current_subscription['price'];
    $plan_currency = get_country_based_site_currency();

    // Plan details
    $feature_plan_details = ajbilling_get_feature_plan_by_id($plan_id);
    $feature_plan_name = $feature_plan_details['plan_title'];  //add translation for plan names in wpml
    $feature_plan_features = $feature_plan_details['plan_features'];  //plan features


    $meta_data = array(
        'email_id' => $site_mail,
        'user_name' => $user_name,
        'user_language' => $user_language,
        'plan_id' => $plan_id,
        'site_id' => $site_id,
        'plan_change_date' => $plan_change_date,
        'plan_currency' => $plan_currency,
        'plan_amount' => $plan_amount,
        'domain_name' => $domain_name,
        'plan_name' => $feature_plan_name,
        'plan_features' => $feature_plan_features,
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

