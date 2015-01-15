<?php

/*
 * Subscription active email
 */

function getvars_plan_active($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');
    $plan_change_date   = $aj_comm->get_communication_meta($comm_data['id'],'plan_change_date');
    $plan_currency   = $aj_comm->get_communication_meta($comm_data['id'],'plan_currency');
    $plan_amount   = $aj_comm->get_communication_meta($comm_data['id'],'plan_amount');
    $domain_name   = $aj_comm->get_communication_meta($comm_data['id'],'domain_name');
    $plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $site_details = get_blog_details( $site_id );
    $additional_features = "Features enabled";

    // Define all url variables
    $site_url = $site_details->siteurl;
    $view_plans_link = $site_url.'/dashboard/#/billing/pricing-plans';
    $account_summary_link = $site_url.'/dashboard/#/billing';

    $subject    = 'Impruw - Plan Change for '.$domain_name; //New Plan selected for <Domain Name>

    $display_price = $plan_currency." ".$plan_amount;

    $template_data['name']          = 'impruw-plan-changed'; // [slug] name or slug of a template that exists in the user's mandrill account
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


    return $template_data;
}

/*
 * Subscription active email
 */

function getvars_subscription_charged($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $new_plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');

    $subject    = 'Impruw - Subscription payment success'; //New Plan selected for <Domain Name>

    $template_data['name']          = 'impruw-subscription-charged'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'nutan@ajency.in';
    $template_data['from_name']     = 'Impruw';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    // $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    // $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    // $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    // $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);


    return $template_data;
}

/*
 * Subscription uncharged email
 */

function getvars_subscription_uncharged($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $new_plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');

    $subject    = 'Impruw - Subscription payment failure'; //New Plan selected for <Domain Name>

    $template_data['name']          = 'impruw-subscription-uncharged'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'nutan@ajency.in';
    $template_data['from_name']     = 'Impruw';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    // $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    // $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    // $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    // $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);


    return $template_data;
}

/*
 * Subscription went past due email
 */

function getvars_subscription_went_past_due($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $new_plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');

    $subject    = 'Impruw - Subscription payment past due'; //New Plan selected for <Domain Name>

    $template_data['name']          = 'impruw-subscription-pastdue'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'nutan@ajency.in';
    $template_data['from_name']     = 'Impruw';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    // $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    // $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    // $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    // $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);


    return $template_data;
}

function getvars_subscription_canceled($recipients_email,$comm_data){

     global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_plan_id   = $aj_comm->get_communication_meta($comm_data['id'],'plan_id');
    $new_plan_name   = $aj_comm->get_communication_meta($comm_data['id'],'plan_name');
    $site_id   = $aj_comm->get_communication_meta($comm_data['id'],'site_id');

    $subject    = 'Impruw - Subscription canceled'; //New Plan selected for <Domain Name>

    $template_data['name']          = 'impruw-subscription-canceled'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'nutan@ajency.in';
    $template_data['from_name']     = 'Impruw';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    // $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    // $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    // $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    // $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);


    return $template_data;
}

