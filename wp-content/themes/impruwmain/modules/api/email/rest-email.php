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
            array( array( $this, 'register_email'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            //array( array( $this, 'get_domain_accounts'), WP_JSON_Server::READABLE ),
        );

        $routes['/email/domain/(?P<domain_name>\S+)'] = array(
            array( array( $this, 'get_domain_accounts'), WP_JSON_Server::READABLE ),

        );

        $routes['/email/(?P<email_id>\S+)'] = array(
            array( array( $this, 'update_registered_email'), WP_JSON_Server::CREATABLE | WP_JSON_Server::ACCEPT_JSON ),
            array( array( $this, 'get_user_account'), WP_JSON_Server::READABLE ),
            array( array( $this, 'disable_registered_email'), WP_JSON_Server::DELETABLE ),
        );



        return $routes;
    }


    /*
     * List accounts for a specific domain
     */
    public function get_domain_accounts($domain_name){

        // loading domain name to list accounts for
        $domain = impruw_email_accounts::get_domain($domain_name);

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


    /*
     * Fetching registered user emails
     */
    public function get_user_account($email_id){

        // Getting all the accounts with a domain name
        $domain = impruw_email_accounts::get_domain($email_id);

        //Getting individual user details
        $account = impruw_email_accounts::get_account($email_id);

        $response = json_encode( $account );

        header( "Content-Type: application/json" );

        echo $response;

        exit;
    }

    /*
     * Registering user email
     */
    public function register_email(){

        global $user_ID;

        if(isset($_POST["email_id"])){

            $new_email = $_POST["email_id"];
        }

        //Check if useremail already exists
        $domain = impruw_email_accounts::get_domain($new_email);
        $account = $domain->get_account($new_email);

        if(is_null($account)){

            //Generating a random password
            $new_pass = wp_generate_password();

            // creating account with given email and password
            $response = impruw_email_accounts::create_account($new_email, $new_pass);
        }
        else{
            $response = 'user exists';
        }

        //$response = array('status'=>$status,'response' => $new_account);

        $response = json_encode( $response );

        header( "Content-Type: application/json" );

        echo $response;

        exit;

    }

    /*
     * Updating registered user email
     */
    public function update_registered_email($email_id){

        $new_password = $_POST['password'];

        $domain = impruw_email_accounts::get_domain($email_id);
        $account = $domain->get_account($email_id);

        $was_updated = false;

        if ($account) {
            // updating password
            $was_updated = $account->update_password($new_password);
        }

        $response = array('updated' => $was_updated== 1? true:false);

        $response = json_encode( $response );

        header( "Content-Type: application/json" );

        echo $response;

        exit;
    }

    /*
     * Disabling registered user email
     */
    public function disable_registered_email($email_id){

        $domain = impruw_email_accounts::get_domain($email_id);
        $account = $domain->get_account($email_id);

        $was_disabled = false;
        if($account){

            //Disabling account
            $was_disabled = $account->disable();
        }

        $response = array('deleted' => $was_disabled);

        $response = json_encode( $response );

        header( "Content-Type: application/json" );

        echo $response;

        exit;
    }

}