<?php

    /*
     * File name:communication_functions.php
     * Contains a list of functions needed to send emails as follows:
     * 1) send_email- Function that iniates the process of sending emails based on the action triggerred.
     * 2) fetch_email_types- Function to fetch all the email_types when an action is called
     * 3) fetch_user_roles_by_type - Function to fetch all the user roles for an email type.
     * 4) fetch_user_ids_by_role - Function to fetch all the user_id's based on a role.
     * 5) check_for_email_type - Function to check the logic for each type of email and add the email to the email queue table.
     * 6) add_to_email_queue - Function to add the email data into the email queue table which is proccessed basedon priority.
     * 7) process_email_queue - Function to start processing the emails from the queue.
     * 8) convert_post_content_to_email_content - Function to convert the post content to email content.
     * 9) send_email_through_mandrill - Function to send the email through mandrill.
     * 10) add_to_email_log - Function to add to email log once an email is sent.
     *
     */


    //including the mandrill api file
    require_once 'mandrill-api-php/src/Mandrill.php';
    $mandrill = new Mandrill('AA_CwcF5NKqJnphK9ehgRg');

    /**
     * send_email
     * Function that iniates the process of sending emails based on the action triggerred.
     *
     * @param int   $initiator_id - id of the user who initiated the action.
     * @param text  $action       - the name of the action initiated.
     * @param array $data         - an array of data related to the action triggerred.
     */
    function send_email($initiator_id, $action, $data)
    { //echo $initiator_id;print_r($data);exit;
        $email_type_ids = fetch_email_types($action);
        foreach ($email_type_ids as $email_type_id) {
            check_for_email_type($initiator_id, $email_type_id, $data);
        }
    }

    /**
     * fetch_email_types
     * Function to fetch all the email_types when an action is called
     *
     * @global type $wpdb
     *
     * @param text  $action -action that is triggered to send the email
     *
     * @return array $email_types_array-array containing all the email_type_ids for associated action
     *
     */
    function fetch_email_types($action)
    {
        global $wpdb;
        $email_types_array       = array();
        $fetch_email_types_query = ("SELECT email_types from {$wpdb->prefix}email_actions where email_action_name='" . $action . "'");

        $email_types = $wpdb->get_row($fetch_email_types_query);
        if (!is_null($email_types))
            $email_types_array = maybe_unserialize($email_types->email_types);

        return $email_types_array;
    }

    /**
     * fetch_user_roles_by_type
     * Function to fetch all the user roles for an email type.
     *
     * @global type $wpdb
     *
     * @param int   $email_type_id - id of email type
     *
     * @return array $user_roles-array containing all the user roles associated with a particular email type
     *
     */
    function fetch_user_roles_by_type($email_type_id)
    {
        $user_roles = get_post_meta($email_type_id, 'user_roles', TRUE);

        return $user_roles;
    }

    /**
     * fetch_user_ids_by_role
     * Function to fetch all the user_id's based on a role.
     *
     * @global type $wpdb
     *
     * @param array $user_roles   -array of user_roles
     * @param int   $initiator_id -id  of user who initiated the action
     *
     * @return array $user_ids_array-array of user_ids associated with a role
     *
     */
    function fetch_user_ids_by_role($user_roles, $initiator_id = '')
    {

        global $wpdb;
        $user_ids_array = array();
        foreach ($user_roles as $user_role) {
            if ($user_role == 'self') {
                $user_ids_array[] = $initiator_id;

                return "self";
            } else {
                $blog_id  = get_current_blog_id();
                $user_ids = get_users('blog_id=' . $blog_id . '&role=' . $user_role);

                foreach ($user_ids as $user_id) {
                    $user_ids_array[] = $user_id->ID;
                }
            }
        }

        return $user_ids_array;
    }

    /**
     * check_foremail_type
     * Function to check the logic for each type of email and add the email to the email queue table
     *
     * @param int   $initiator_id  - the is of the user who initiated the action.
     * @param int   $email_type_id - the id of the email type.
     * @param array $data          - an array of data passed when the send_email function call is made.
     */
    function check_for_email_type($initiator_id, $email_type_id, $data)
    {
        $post_object    = get_post($email_type_id);
        $email_type     = $post_object->post_title;
        $user_ids_array = array();

        switch ($email_type) {
            case "User signup welcome email":
                $user_roles = fetch_user_roles_by_type($email_type_id);
                foreach ($user_roles as $user_role) {
                    if ($user_role == "self") {
                        if ($initiator_id == $data['user_id']) {
                            $user_ids_array[]      = $initiator_id;
                            $user_default_language = get_user_meta($data['user_id'], 'user_default_language', TRUE);
                            $email_id              = icl_object_id($email_type_id, 'impruw_email', TRUE, $user_default_language);
                            add_to_email_queue($email_id, $user_ids_array, $initiator_id, $data);
                        }
                    }
                }
                break;
            case "User Registered by Admin Welcome email":
                $user_roles = fetch_user_roles_by_type($email_type_id);
                foreach ($user_roles as $user_role) {
                    if ($user_role == "self") {
                        if ($initiator_id != $data['user_id']) {
                            $user_ids_array[] = $data['user_id'];
                            add_to_email_queue($email_type_id, $user_ids_array, $initiator_id, $data);
                        }
                    }
                }
                break;
            case "User Registered Notification email":
                $user_roles     = fetch_user_roles_by_type($email_type_id);
                $user_ids_array = fetch_user_ids_by_role($user_roles, $initiator_id);
                add_to_email_queue($email_type_id, $user_ids_array, $initiator_id, $data);
                break;
            case "New Site created user":
                $user_roles = fetch_user_roles_by_type($email_type_id);
                foreach ($user_roles as $user_role) {
                    if ($user_role == "self") {
                        if ($initiator_id == $data['user_id']) {
                            $user_ids_array[]      = $initiator_id;
                            $user_default_language = get_user_meta($data['user_id'], 'user_default_language', TRUE);
                            $email_id              = icl_object_id($email_type_id, 'impruw_email', TRUE, $user_default_language);
                            add_to_email_queue($email_id, $user_ids_array, $initiator_id, $data);
                        }
                    }
                }
                break;
            case "New Site created admin":
                $user_roles     = fetch_user_roles_by_type($email_type_id);
                $user_ids_array = fetch_user_ids_by_role($user_roles, $initiator_id);
                add_to_email_queue($email_type_id, $user_ids_array, $initiator_id, $data);
                break;
            //...
            default:
                // code to be executed if n is different from all labels;
        }
    }

    /**
     * add_to_email_queue
     * Function to add the email data into the email queue table which is proccessed basedon priority.
     *
     * @global type $wpdb
     *
     * @param int   $email_type_id  - id of the email type.
     * @param int   $initiator_id   - id of the intiator of the action.
     * @param array $user_ids_array - array of user ids to which the email needs to be sent.
     */
    function add_to_email_queue($email_type_id, $user_ids_array, $initiator_id, $data)
    {
        global $wpdb;
        $types_array = wp_get_post_terms($email_type_id, 'impruw_email_type');
        foreach ($types_array as $type) {
            if ($type->name == 'immediate')
                $email_type = 'immediate';
            if ($type->name == 'batch')
                $email_type = 'batch';
            if ($type->name == 'marketing')
                $email_type = 'marketing';
        }

        $user_ids_array = maybe_serialize($user_ids_array);
        $data           = maybe_serialize($data);
        $priority       = 0; //get_post_meta($email_type_id,'priority',true);

        $insert_into_queue_query = ("INSERT into {$wpdb->prefix}email_processing_queue (post_id,email_category,user_id,priority,status,initiator_id,data_info)
                               VALUES (" . $email_type_id . ",'" . $email_type . "','" . $user_ids_array . "','" . $priority . "','pending'," . $initiator_id . ",'" . $data . "')");

        /*  $insert_into_queue_query = $wpdb->prepare( "INSERT into {$wpdb->prefix}email_processing_queue (post_id,email_category,user_id,priority,status,initiator_id,data_info)
          VALUES ( %d ,%s,%s,%d,%s,%d,%s)",$email_type_id,$email_type,$user_ids_array,$priority,'pending',$initiator_id,$data );
         */
        // echo '===='.$insert_into_queue_query;
        $wpdb->query($insert_into_queue_query);
    }

    /**
     * process_email_queue
     * Function to start processing the emails from the queue.
     *
     * @global type $wpdb
     */
    function process_email_queue()
    {
        global $wpdb;
        $retrieve_email_from_queue_query = ("SELECT * from {$wpdb->prefix}email_processing_queue WHERE status = 'pending' ORDER BY priority ASC,id DESC");
        $email_array                     = $wpdb->get_results($retrieve_email_from_queue_query);
        foreach ($email_array as $email) {
            $user_ids     = $email->user_id;
            $initiator_id = $email->initiator_id;
            $user_ids     = maybe_unserialize($user_ids);
            $data         = maybe_unserialize($email->data_info);
            foreach ($user_ids as $user_id) {
                $email_content    = convert_post_content_to_email_content($email->post_id, $user_id, $initiator_id, $data);
                $post_object      = get_post($email->post_id);
                $subject          = $post_object->post_title;
                $admin_email      = bloginfo('admin_email');
                $email_template   = '<body style="margin: 0; background: #F2F2F2; padding: 20px;">
                                            <style type="text/css">
                                            a:hover { color: #3f78c6 !important; }
                                            .page h1 {font-weight: normal; padding-top: 2px; min-height: 64px; font: bold 30px/30px HelveticaNeue-Light, "Helvetica Neue Light", sans-serif; text-align: center; color: #616161;}
                                            .page p {text-align: center; color: #616161;}
                                            .page .big-link {font-size: 20px;}
                                            .page .big-link a {color: #6FB5D7; text-decoration: underline;}
                                            .page .button {font-size: 15px; color: white; text-decoration: none; display: block; padding: 10px 16px; background: #F76D3E; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; margin: 20px auto; max-width: 160px; text-align: center;}
                                            .page .button:hover {color: white !important; background: #6FB5D7;}
                                            @media only screen and (max-device-width: 480px) {
                                                    .page {
                                                            padding: 0px 10px 5px 10px !important;
                                                    }
                                                    body {
                                                            padding: 10px !important;
                                                    }
                                                    #airmail-line {
                                                            margin: 0 -10px !important;
                                                    }
                                                    .header {
                                                            font-size: 16px !important;
                                                    }
                                                    .headline {
                                                            font-size: 20px !important;
                                                    }
                                            }
                                            </style>
                                                    <div style="margin: 0; height: 0; display: none;"></div>
                                                    <div style="max-width: 600px; margin: auto;">
                                                    <div class="header" style="text-align: center; margin: 0; margin-top: 20px; margin-bottom: 50px; color: #b8b8b8;"><img src="http://ajency.in/impruw-demo/images/impruw-logo.png" alt="Impruw" /></div>

                                                    <!-- The Page -->
                                                    <div class="page" style="border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px; clear: both; margin: 0px; background: white; border: 0px; font: 14px/19px Helvetica, sans-serif; padding: 20px 40px 25px; border: 1px solid #ddd">

                                                            ' . $email_content . '

                                                    </div> <!-- End The Page -->

                                                    <!-- Unsubscribe -->
                                                    <div style="text-shadow: white 0 1px 0px; background-repeat: no-repeat; margin: 10px 0; margin-top: 25px; padding-top: 1px; color: #777777; font: 12px/18px Helvetica, sans-serif; text-align: center;">
                                                            You received this email because you\'re a registered Impruw user. We occasionally send system alerts with account information, planned outages, system improvements, and important customer-service updates. We\'ll keep them brief and useful. Promise.
                                                    </div>

                                                    <div style="text-shadow: white 0 1px 0px; background-repeat: no-repeat; margin: 10px 0; padding-top: 1px; color: #777777; font: bold 12px/18px Helvetica, sans-serif; text-align: center;">
                                                            &copy;2013 Impruw. All Rights Reserved.
                                                    </div>

                                                    <div style="text-shadow: white 0 1px 0px; background-repeat: no-repeat; margin: 10px 0; padding-top: 1px; color: #777777; font: 12px/18px Helvetica, sans-serif; text-align: center;">
                                                            512 Means St. &middot; Suite 404 &middot; Atlanta, GA 30318 USA
                                                    </div>

                                                    <div style="text-shadow: white 0 1px 0px; background-repeat: no-repeat; margin: 10px 0; padding-top: 1px; color: #777777; font: 12px/18px Helvetica, sans-serif; text-align: center;">
                                                            <a href="#" style="color: #777777; text-decoration: underline;">Terms of Use</a> &nbsp;&middot;&nbsp;
                                                            <a href="#" style="color: #777777; text-decoration: underline;">View in browser</a> &nbsp;&middot;&nbsp;
                                                            <a href="#" style="color: #777777; text-decoration: underline;">Log In to Impruw</a> &nbsp;&middot;&nbsp;
                                                            <a href="#" style="color: #777777; text-decoration: underline;">Unsubscribe</a>
                                                    </div>

                                                    <div style="text-shadow: white 0 1px 0px; background-repeat: no-repeat; margin: 30px 0 10px; padding-top: 1px; color: #777777; font: 12px/18px Helvetica, sans-serif; text-align: center;">
                                                            <img src="http://ajency.in/impruw-demo/images/impruw-hand.png" alt="Impruw" />
                                                    </div>

                                                    <!-- End -->
                                                    </div>


                                    </body>';
                $send_email_array = send_email_through_mandrill($email_template, $subject, $admin_email, $user_id);
                add_to_email_log($user_id, $email->id, $send_email_array[0]['status'], $send_email_array[0]['reject_reason']);
            }
            $wpdb->update($wpdb->prefix . 'email_processing_queue', array('status' => 'processed'), array('id' => $email->id));
        }
    }

    /**
     * convert_post_content_to_email_content
     * Function to convert the post content to email content.
     *
     * @param int $email_type_id
     */
    function convert_post_content_to_email_content($email_type_id, $user_id, $initiator_id, $data)
    {
        $data         = maybe_serialize($data); //echo $data;exit;
        $post_object  = get_post($email_type_id);
        $post_content = $post_object->post_content;
        //echo $post_content;exit;
        $search_user_info        = "user_info";
        $replace_user_info       = "user_info user_id=" . $user_id;
        $post_content            = str_replace($search_user_info, $replace_user_info, $post_content);
        $search_initiator_info   = "initiator_info";
        $replace_initiator_info  = "initiator_info user_id=" . $initiator_id;
        $post_content            = str_replace($search_initiator_info, $replace_initiator_info, $post_content);
        $search_data_array_info  = "data_array_info";
        $replace_data_array_info = "data_array_info data='" . $data . "'";
        $post_content            = str_replace($search_data_array_info, $replace_data_array_info, $post_content);
        $search_site_info        = "site_info";
        $replace_site_info       = "site_info blog_id='" . $data . "'";
        $post_content            = str_replace($search_site_info, $replace_site_info, $post_content);
        $email_content           = do_shortcode($post_content);

        return $email_content;
    }

    /**
     * send_email_through_mandrill
     * Function to send the email through mandrill.
     *
     * @param text $email_content - content in the email.
     * @param text $subject       - subject of the email.
     * @param text $admin_email   - senders email.
     * @param int  $user_id       - receiver's email.
     *
     */
    function send_email_through_mandrill($email_content, $subject, $admin_email, $user_id)
    {
        //echo $admin_email;exit;
        $mandrill = new Mandrill('AA_CwcF5NKqJnphK9ehgRg');
        $template = $email_content;
        $subject  = $subject;


        $user_data = get_userdata($user_id);
        try {

            $message = array('html' => $email_content, 'text' => '', 'subject' => $subject, 'from_email' => "arajanaik@gmail.com", 'from_name' => "site", 'to' => array(array('email' => $user_data->user_email, 'name' => $user_data->first_name . " " . $user_data->last_name, 'type' => 'to')), 'headers' => array(), 'important' => FALSE, 'track_opens' => null, 'track_clicks' => null, 'auto_text' => null, 'auto_html' => null, 'inline_css' => null, 'url_strip_qs' => null, 'preserve_recipients' => null, 'view_content_link' => null, 'bcc_address' => '', 'tracking_domain' => null, 'signing_domain' => null, 'return_path_domain' => null, 'merge' => TRUE, 'global_merge_vars' => array(array('name' => 'merge1', 'content' => 'merge1 content')), 'merge_vars' => array(array('rcpt' => 'araja@ajency.in', 'vars' => array(array('name' => 'merge2', 'content' => 'merge2 content')))), 'tags' => array(''), 'subaccount' => 'test_mandrill', 'google_analytics_domains' => array(''), 'google_analytics_campaign' => '', 'metadata' => array('website' => ''), 'recipient_metadata' => array(array('rcpt' => '', 'values' => array())), 'attachments' => array(), 'images' => array());
            $async   = FALSE;
            $ip_pool = 'Main Pool';
            $send_at = '';
            $result  = $mandrill->messages->send($message, $async, $ip_pool, $send_at);

            return $result;
        } catch (Mandrill_Error $e) {
            // Mandrill errors are thrown as exceptions
            echo 'A mandrill error occurred:' . get_class($e) . ' - ' . $e->getMessage();
            // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            throw $e;
        }
    }

    /**
     * add_to_email_log
     * Function to add to email log once an email is sent.
     *
     * @global type $wpdb
     *
     * @param int   $user_id          - id of the email recipient.
     * @param int   $process_queue_id - id in the process queue table associated for the email.
     * @param text  $email_status     - Stauts of the email either sent or rejected.
     * @param text  $reject_reason    = if email rejected then reason for reject.
     */
    function add_to_email_log($user_id, $process_queue_id, $email_status, $reject_reason)
    {

        global $wpdb;
        $wpdb->insert($wpdb->prefix . 'email_log', array('user_id' => $user_id, 'process_queue_id' => $process_queue_id, 'email_status' => $email_status, 'reject_reason' => $reject_reason));
    }
