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
    
    // $subscription_active_email_details   = get_subscription_email_data($new_subscription_id);

    $domain_name = "domain.com";
    $name = "Hermione Granger";
    $old_plan = "Pro Plan";
    $new_plan = "Standard Plan";
    $amount = "$ 40";
    $plan_features = "$ 40";

    // $domain_name = $subscription_active_email_details['domain_name'];
    // $new_plan = $subscription_active_email_details['new_plan'];
    // $amount = $subscription_active_email_details['amount'];
    // $plan_features = $subscription_active_email_details['plan_features'];

    $subject    = 'Impruw - Plan Change for '.$domain_name; //New Plan selected for <Domain Name>

    $template_data['name']          = 'plan-activated'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'nutan@ajency.in';
    $template_data['from_name']     = 'Impruw';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);


    return $template_data;
}

/*
 * Subscription active email
 */

function getvars_subscription_charged($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_subscription_id   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_id');
    
    $subscription_active_email_details   = get_subscription_email_data($new_subscription_id);

    $domain_name = $subscription_active_email_details['domain_name'];
    $new_plan = $subscription_active_email_details['new_plan'];
    $amount = $subscription_active_email_details['amount'];
    $plan_features = $subscription_active_email_details['plan_features'];
    $bill_start = $subscription_active_email_details['bill_start'];
    $bill_end = $subscription_active_email_details['bill_end'];

    $subject    = 'ChatCat.io - Payment Success for '.$domain_name; //New Plan selected for <Domain Name>

    $template_data['name']          = 'subscription-charged'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'chatcatio@outlook.com';
    $template_data['from_name']     = 'Chatcat.io';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);
    $template_data['global_merge_vars'][] = array('name' => 'BILL_START','content' => $bill_start);
    $template_data['global_merge_vars'][] = array('name' => 'BILL_END','content' => $bill_end);    



    return $template_data;
}

/*
 * Subscription uncharged email
 */

function getvars_subscription_uncharged($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_subscription_id   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_id');
    
    $subscription_active_email_details   = get_subscription_email_data($new_subscription_id);

    $domain_name = $subscription_active_email_details['domain_name'];
    $new_plan = $subscription_active_email_details['new_plan'];
    $amount = $subscription_active_email_details['amount'];
    $plan_features = $subscription_active_email_details['plan_features'];
    $bill_start = $subscription_active_email_details['bill_start'];
    $bill_end = $subscription_active_email_details['bill_end'];

    $subject    = 'ChatCat.io - Payment Failed for '.$domain_name; //New Plan selected for <Domain Name>

    $template_data['name']          = 'subscription-uncharged'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'chatcatio@outlook.com';
    $template_data['from_name']     = 'Chatcat.io';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);
    $template_data['global_merge_vars'][] = array('name' => 'BILL_START','content' => $bill_start);
    $template_data['global_merge_vars'][] = array('name' => 'BILL_END','content' => $bill_end);    


    return $template_data;
}

/*
 * Subscription went past due email
 */

function getvars_subscription_went_past_due($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $new_subscription_id   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_id');
    
    $subscription_active_email_details   = get_subscription_email_data($new_subscription_id);

    $domain_name = $subscription_active_email_details['domain_name'];
    $new_plan = $subscription_active_email_details['new_plan'];
    $amount = $subscription_active_email_details['amount'];
    $plan_features = $subscription_active_email_details['plan_features'];
    
    $bill_start = $subscription_active_email_details['bill_start'];
    $bill_end = $subscription_active_email_details['bill_end'];

    $subject    = 'ChatCat.io - Plan Changed due to Payment Failure for '.$domain_name; //New Plan selected for <Domain Name>

    $template_data['name']          = 'subscription-past-due'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'chatcatio@outlook.com';
    $template_data['from_name']     = 'Chatcat.io';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'NEW_PLAN','content' => $new_plan);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);
    $template_data['global_merge_vars'][] = array('name' => 'AMOUNT','content' => $amount);
    $template_data['global_merge_vars'][] = array('name' => 'PLAN_FEATURES','content' => $plan_features);
    $template_data['global_merge_vars'][] = array('name' => 'BILL_START','content' => $bill_start);
    $template_data['global_merge_vars'][] = array('name' => 'BILL_END','content' => $bill_end);


    return $template_data;
}

function getvars_subscription_canceled($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $canceled_subscription_id   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_id');
    
    $subscription_active_email_details   = get_subscription_email_data($canceled_subscription_id);

    $domain_name = $subscription_active_email_details['domain_name'];
    $cancelled_plan = $subscription_active_email_details['new_plan'];

    $subject    = 'ChatCat.io - Plan Cancelled for '.$domain_name; //New Plan selected for <Domain Name>

    $template_data['name']          = 'subscription-canceled'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'chatcatio@outlook.com';
    $template_data['from_name']     = 'Chatcat.io';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'CANCELED_PLAN','content' => $cancelled_plan);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);


    return $template_data;
}

function getvars_pending_subscription_canceled($recipients_email,$comm_data){

    global $aj_comm;

    $email_id   = $aj_comm->get_communication_meta($comm_data['id'],'email_id');
    $name   = $aj_comm->get_communication_meta($comm_data['id'],'user_name');
    $canceled_subscription_id   = $aj_comm->get_communication_meta($comm_data['id'],'subscription_id');
    $domain_id   = $aj_comm->get_communication_meta($comm_data['id'],'domain_id');
    
    $subscription_active_email_details   = get_subscription_email_data($canceled_subscription_id,$domain_id);

    $domain_name = $subscription_active_email_details['domain_name'];
    $cancelled_plan = $subscription_active_email_details['new_plan'];

    $subject    = 'ChatCat.io - Plan Cancelled for '.$domain_name; //New Plan selected for <Domain Name>

    $template_data['name']          = 'subscription-canceled'; // [slug] name or slug of a template that exists in the user's mandrill account
    $template_data['subject']       = $subject;
    $template_data['from_email']    = 'chatcatio@outlook.com';
    $template_data['from_name']     = 'Chatcat.io';


    $template_data['merge'] = true;
    $template_data['global_merge_vars'] = array();
    $template_data['global_merge_vars'][] = array('name' => 'USERNAME','content' => $name);
    $template_data['global_merge_vars'][] = array('name' => 'CANCELED_PLAN','content' => $cancelled_plan);
    $template_data['global_merge_vars'][] = array('name' => 'DOMAIN_NAME','content' => $domain_name);


    return $template_data;
}