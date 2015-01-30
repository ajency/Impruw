<?php

/*
 * Subscription active email
 */

function getvars_plan_active($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $language   = $aj_comm->get_communication_meta($comm_data['id'],'user_language');
    $new_plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');
    $plan_change_date   = $aj_comm->get_communication_meta($comm_data['id'],'plan_change_date');
    $plan_currency   = $aj_comm->get_communication_meta($comm_data['id'],'plan_currency');
    $plan_amount   = $aj_comm->get_communication_meta($comm_data['id'],'plan_amount');
    $domain_name   = $aj_comm->get_communication_meta($comm_data['id'],'domain_name');
    $plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    
    $plan_features = $aj_comm->get_communication_meta($comm_data['id'],'plan_features');
    $additional_features = "<ul>";

    foreach ($plan_features as $plan_feature) {
        if (!$plan_feature['is_count_type']) {
            $additional_features .= "<li> ".$plan_feature['name']."</li>";
        }else{
             $additional_features .= "<li> ".$plan_feature['name']." : ".$plan_feature['count_display_label']."</li>";
        }
    }
    $additional_features .= "</ul>";

    $site_details = get_blog_details( $site_id );

    // Define all url variables
    $site_url = $site_details->siteurl;
    $view_plans_link = $site_url.'/dashboard/#/billing/pricing-plans';
    $account_summary_link = $site_url.'/dashboard/#/billing';
    $site_profile_link = $site_url.'/dashboard/#/site-profile';

    $display_price = $plan_currency." ".$plan_amount;

    // Language based content
    switch ($language) {
        case 'nb':
            $subject = 'Impruw - planendring til '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-plan-changed-nb'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;
        
        default:
            $subject = 'Impruw - Plan Change for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-plan-changed'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;
    }
    
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'info@impruw.com';
    $template_data['from_name']     = 'Impruw';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_NAME','content' => $plan_name);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_CHANGE_DATE','content' => $plan_change_date);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'DISPLAY_PLAN_PRICE','content' => $display_price);
    $template_data['global_merge_vars'][] = array('name' => 'ADDITIONAL_FEATURES','content' => $additional_features);
    $template_data['global_merge_vars'][] = array('name' => 'VIEW_PLANS_LINK','content' => $view_plans_link);
    $template_data['global_merge_vars'][] = array('name' => 'ACCOUNT_SUMMARY_LINK','content' => $account_summary_link);
    $template_data['global_merge_vars'][] = array('name' => 'SITE_PROFILE_LINK','content' => $site_profile_link);


    return $template_data;
}

/*
 * Subscription active email
 */

function getvars_subscription_charged($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $language   = $aj_comm->get_communication_meta($comm_data['id'],'user_language');
    $plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');
    $plan_currency   = $aj_comm->get_communication_meta($comm_data['id'],'plan_currency');
    $plan_amount   = $aj_comm->get_communication_meta($comm_data['id'],'plan_amount');
    $domain_name   = $aj_comm->get_communication_meta($comm_data['id'],'domain_name');
    $plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $subscription_start_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_start_date');
    $subscription_end_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_end_date');

    $site_details = get_blog_details( $site_id );

    // Define all url variables
    $site_url = $site_details->siteurl;
    $transaction_link = $site_url.'/dashboard/#/billing/transaction-history';
    $account_summary_link = $site_url.'/dashboard/#/billing';

    $display_plan_price = $plan_currency." ".$plan_amount;

    // Language based content
    switch ($language) {
        case 'nb':
            $subject = 'Impruw - Betaling Suksess for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-charged-nb'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;

        default:
            $subject = 'Impruw -  Payment Success for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-charged'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;
    }

    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'info@impruw.com';
    $template_data['from_name']     = 'Impruw';

    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_NAME','content' => $plan_name);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_START_DATE','content' => $subscription_start_date);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_END_DATE','content' => $subscription_end_date);
    $template_data['global_merge_vars'][] = array('name' => 'DISPLAY_PLAN_PRICE','content' => $display_plan_price);
    $template_data['global_merge_vars'][] = array('name' => 'TRANSACTION_LINK','content' => $transaction_link);
    $template_data['global_merge_vars'][] = array('name' => 'ACCOUNT_SUMMARY_LINK','content' => $account_summary_link);


    return $template_data;
}

/*
 * Subscription uncharged email
 */

function getvars_subscription_uncharged($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $language   = $aj_comm->get_communication_meta($comm_data['id'],'user_language');
    $plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');
    $plan_currency   = $aj_comm->get_communication_meta($comm_data['id'],'plan_currency');
    $plan_amount   = $aj_comm->get_communication_meta($comm_data['id'],'plan_amount');
    $domain_name   = $aj_comm->get_communication_meta($comm_data['id'],'domain_name');
    $plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $subscription_start_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_start_date');
    $subscription_end_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_end_date');

    $site_details = get_blog_details( $site_id );

    // Define all url variables
    $site_url = $site_details->siteurl;
    $credit_cards_link = $site_url.'/dashboard/#/billing/credit-cards';

    $display_plan_price = $plan_currency." ".$plan_amount;

    // Language based content
    switch ($language) {
        case 'nb':
            $subject = 'Impruw - betaling mislyktes for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-uncharged-nb'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;

        default:
            $subject = 'Impruw - Payment Failed for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-uncharged'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;
    }

    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'info@impruw.com';
    $template_data['from_name']     = 'Impruw';

    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_NAME','content' => $plan_name);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_START_DATE','content' => $subscription_start_date);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_END_DATE','content' => $subscription_end_date);
    $template_data['global_merge_vars'][] = array('name' => 'DISPLAY_PLAN_PRICE','content' => $display_plan_price);
    $template_data['global_merge_vars'][] = array('name' => 'CREDIT_CARDS_LINK','content' => $credit_cards_link);


    return $template_data;
}

/*
 * Subscription went past due email
 */

function getvars_subscription_went_past_due($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $language   = $aj_comm->get_communication_meta($comm_data['id'],'user_language');
    $plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');
    $plan_currency   = $aj_comm->get_communication_meta($comm_data['id'],'plan_currency');
    $plan_amount   = $aj_comm->get_communication_meta($comm_data['id'],'plan_amount');
    $pending_amount   = $aj_comm->get_communication_meta($comm_data['id'],'pending_amount');
    $domain_name   = $aj_comm->get_communication_meta($comm_data['id'],'domain_name');
    $plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $subscription_start_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_start_date');
    $subscription_end_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_end_date');

    $site_details = get_blog_details( $site_id );

    // Define all url variables
    $site_url = $site_details->siteurl;
    $credit_cards_link = $site_url.'/dashboard/#/billing/credit-cards';

    $display_pending_price = $plan_currency." ".$pending_amount;

    // Language based content
    switch ($language) {
        case 'nb':
            $subject = 'Impruw - betaling mislyktes for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-pastdue-nb'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;

        default:
            $subject = 'Impruw - Payment Failed for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-pastdue'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;
    }

    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'info@impruw.com';
    $template_data['from_name']     = 'Impruw';

    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_NAME','content' => $plan_name);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_START_DATE','content' => $subscription_start_date);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_END_DATE','content' => $subscription_end_date);
    $template_data['global_merge_vars'][] = array('name' => 'DISPLAY_PENDING_PRICE','content' => $display_pending_price);
    $template_data['global_merge_vars'][] = array('name' => 'CREDIT_CARDS_LINK','content' => $credit_cards_link);


    return $template_data;
}

function getvars_subscription_canceled($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $language   = $aj_comm->get_communication_meta($comm_data['id'],'user_language');
    $plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');
    $plan_currency   = $aj_comm->get_communication_meta($comm_data['id'],'plan_currency');
    $plan_amount   = $aj_comm->get_communication_meta($comm_data['id'],'plan_amount');
    $pending_amount   = $aj_comm->get_communication_meta($comm_data['id'],'pending_amount');
    $domain_name   = $aj_comm->get_communication_meta($comm_data['id'],'domain_name');
    $plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $subscription_start_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_start_date');
    $subscription_end_date   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_end_date');

    $site_details = get_blog_details( $site_id );

    // Define all url variables
    $site_url = $site_details->siteurl;
    $view_plans_link = $site_url.'/dashboard/#/billing/pricing-plans';

    $display_plan_price = $plan_currency." ".$plan_amount;

    // Language based content
    switch ($language) {
        case 'nb':
            $subject = 'Impruw - Plan Avlyst for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-canceled-nb'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;

        default:
            $subject = 'Impruw - Plan Cancelled for '.$domain_name; //New Plan selected for <Domain Name>
            $template_data['name'] = 'impruw-subscription-canceled'; // [slug] name or slug of a template that exists in the user's mandrill account
            break;
    }

    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'info@impruw.com';
    $template_data['from_name']     = 'Impruw';

    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_NAME','content' => $plan_name);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_START_DATE','content' => $subscription_start_date);
    $template_data['global_merge_vars'][] = array('name' => 'SUBSCRIPTION_END_DATE','content' => $subscription_end_date);
    $template_data['global_merge_vars'][] = array('name' => 'DISPLAY_PLAN_PRICE','content' => $display_plan_price);
    $template_data['global_merge_vars'][] = array('name' => 'VIEW_PLANS_LINK','content' => $view_plans_link);


    return $template_data;
}

