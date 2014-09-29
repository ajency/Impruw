<?php

function impruw_api_init() {

    global $impruw_api_email;

    include(dirname(__FILE__).'/class-impruw-api-email.php');


    $impruw_api_email = new Impruw_API_Email();
    add_filter( 'json_endpoints', array( $impruw_api_email, 'register_routes' ) );
}
add_action( 'wp_json_server_before_serve', 'impruw_api_init' );


class Impruw_API_Email {
    public function register_routes( $routes ) {
        $routes['/email'] = array(
            array( array( $this, 'impruw_register_email'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            //array( array( $this, 'get_domain_accounts'), WP_JSON_Server::READABLE ),
        );

        $routes['/email/domain/(?P<domain_name>\S+)'] = array(
            array( array( $this, 'impruw_domain_accounts'), WP_JSON_Server::READABLE ),

        );

        $routes['/email/(?P<email_id>\S+)'] = array(
            array( array( $this, 'impruw_update_email'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            array( array( $this, 'impruw_user_details'), WP_JSON_Server::READABLE ),
            array( array( $this, 'impruw_disable_email'), WP_JSON_Server::EDITABLE ),
        );



        return $routes;
    }


    /*
     * List accounts for a specific domain
     */
    public function impruw_domain_accounts($domain_name){

        $args = array(

            'domain_name'       	=> $domain_name

        );

        get_domain_accounts($args);
    }


    /*
     * Fetching registered user emails
     */
    public function impruw_user_details($email_id){

        $args = array(

            'email_id'       	=> $email_id

        );

        get_user_account($args);
    }

    /*
     * Registering user email
     */
    public function impruw_register_email(){

         if(isset($_POST["email_id"])){

            $new_email = $_POST["email_id"];

            $args = array(

                'email_id'       	=> $new_email

            );

            register_email($args);
        }
    }

    /*
     * Updating registered user email
     */

    public function impruw_update_email($email_id){

        $new_password = $_POST['password'];

        $args = array(

            'email_id'       	=> $email_id,

            'password'    	 => $new_password
        );

        update_email($args);

    }

    /*
     * Disabling registered user email
     */
    public function impruw_disable_email($email_id){

        $args = array(

            'email_id'       	=> $email_id
        );

        disable_user_email($args);

    }

}

//Register email account
function register_email($args){

    //Check if useremail already exists
    $domain = impruw_email_accounts::get_domain($args['email_id']);
    $account = $domain->get_account($args['email_id']);

    if(is_null($account)){

        //Generating a random password
        $new_pass = wp_generate_password();

        // creating account with given email and password
        $response = impruw_email_accounts::create_account($args['email_id'], $new_pass);
    }
    else{
        $response = 'user exists';
    }

    //$response = array('status'=>$status,'response' => $new_account);

    wp_send_json($response);

    exit;
}


//Fetching domain accounts
function get_domain_accounts($args){

    // loading domain name to list accounts for
    $domain = impruw_email_accounts::get_domain($args['domain_name']);

    if(!is_null($domain)){
        // return an array of imp_email objects
        $accounts = $domain->get_accounts();
    }
    else{
        $accounts = 'no accounts';
    }

    $response = json_encode( $accounts );

    header( "Content-Type: application/json" );

    echo $response;

    exit;
}

//Updating email account
function update_email($args){

    $domain = impruw_email_accounts::get_domain($args['email_id']);
    $account = $domain->get_account($args['email_id']);

    $was_updated = false;

    if ($account) {
        // updating password
        $was_updated = $account->update_password($args['password']);
    }

    $response = array('updated' => $was_updated== 1? true:false);

    wp_send_json($response);

    exit;

}

//Fetching user details
function get_user_account($args){

    // Getting all the accounts with a domain name
    $domain = impruw_email_accounts::get_domain($args['email_id']);

    //Getting individual user details
    $account = impruw_email_accounts::get_account($args['email_id']);

    wp_send_json($account);

    exit;
}

//Disable user email
function disable_user_email($args){

    $domain = impruw_email_accounts::get_domain($args['email_id']);
    $account = $domain->get_account($args['email_id']);

    $was_disabled = false;
    if($account){

        //Disabling account
        $was_disabled = $account->disable();
    }

    $response = array('disabled' => $was_disabled);

    wp_send_json($response);

    exit;
}

