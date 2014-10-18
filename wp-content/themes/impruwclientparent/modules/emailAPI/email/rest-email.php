<?php

function impruw_api_init() {

    global $impruw_api_email;

    include('class-impruw-api-email.php');


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
            array( array( $this, 'impruw_delete_email'), WP_JSON_Server::DELETABLE ),
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
    public function impruw_register_email($data){

        if(isset($data["email_id"])&&isset($data["password"])){

            $new_email       = $data["email_id"];
            $new_password    = $data["password"];
            $new_fname       = $data["firstName"];
            $new_lname       = $data["lastName"];

            $new_name = $new_fname.' '.$new_lname;


            $args = array(

                'email_id'       	=> $new_email,
                'password'          => $new_password,
                'name'              => $new_name
            );
            //print_r($args);
            $response = register_email($args);

            return $response;
        }
    }

    /*
     * Updating registered user email
     */

    public function impruw_update_email($email_id){

        $new_password   = $_POST['password'];

        $new_fname       = $_POST["firstName"];

        $new_lname       = $_POST["lastName"];

        $name = $new_fname.' '.$new_lname;

        $args = array(

            'email_id'       => $email_id,

            'password'    	 => $new_password,

            'name'           => $name
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

    /*
    * Enabling registered user email
    */
    public function impruw_enable_email($email_id){

        $new_password   = $_POST['password'];

        $args = array(

            'email_id'       	=> $email_id,

            'new_password'      => $new_password
        );

        enable_user_email($args);

    }



    /*
     * Deleting registered user email
     */
    public function impruw_delete_email($email_id){

        $args = array(

            'email_id'       	=> $email_id
        );

        delete_user_email($args);

    }

}

//Register email account
function register_email($args){

    //Check if useremail already exists
    $account =  impruw_email_accounts::get_account($args['email_id']);

    if(is_null($account)){

        //Generating a random password
        $new_pass = $args['password'];

        $new_name = $args['name'];

        // creating account with given email and password
        $data = impruw_email_accounts::create_account($args['email_id'], $new_pass,$new_name);
        $response = array('code'=> 'OK', 'data'=>$data);
    }
    else{
        $response = array('code'=> 'ERROR', 'msg'=>'User email already exists');
    }

    //$response = array('status'=>$status,'response' => $new_account);

    return $response;

    
}


//Fetching domain accounts
function get_domain_accounts($args){

    // loading domain name to list accounts for
    $domain = impruw_email_accounts::get_domain($args['domain_name']);

    if(!is_null($domain)){
        // return an array of imp_email objects
        $data = $domain->get_accounts(false);
        $response = array('code'=> 'OK', 'data'=>$data);
    }
    else{
        $response = "";
    }

    wp_send_json($response);
    exit;

    //return $response;
}

//Updating email account
function update_email($args){

    //Check if useremail already exists
    $account =  impruw_email_accounts::get_account($args['email_id']);

    if($account){

        // updating password
        $password_data = $account->update_password($args['password']);

        $account->name = $args['name'];
        $name_data = $account->save();

        if($password_data == true && $name_data == true){

            $data = $account;
            $response = array('code' => 'OK', 'data' => $data );

        }else{

            $response = array('code' => 'ERROR', 'msg' =>'Unable to update email account' );
        }
    }
    else{
        $response = array('code'=> 'ERROR', 'msg'=>'In-valid email id');
    }

    wp_send_json($response);
    exit;

    //return $response;

}

//Fetching user details
function get_user_account($args){

    //Check if useremail already exists
    $account =  impruw_email_accounts::get_account($args['email_id']);

    if($account){

        $data = $account;
        $response = array('code' => 'OK', 'msg' =>$data );
    }
    else{
        $response = array('code' => 'ERROR', 'msg' =>'In-valid email id' );
    }

    wp_send_json($response);

    exit;

    //return $response;
}

//Disable user email
function disable_user_email($args){

    $account =  impruw_email_accounts::get_account($args['email_id']);

    if($account){
        //Disabling account
        $data = $account->disable();
        $account = impruw_email_accounts::get_account($args['email_id']);
        if($data == true){
            $response = array('code' => 'OK', 'msg' =>$data, 'data'=>$account );
        }
        else{
            $response = array('code' => 'ERROR', 'msg' =>'Email account could not be suspended' );
        }
    }
    else{
        $response = array('code' => 'ERROR', 'msg' =>'In-valid email id' );
    }

    //$response = array('disabled' => $response);

    wp_send_json($response);

    exit;
    //return $response;
}

//Delete user email
function delete_user_email($args){

    $account =  impruw_email_accounts::get_account($args['email_id']);

    if($account){
        //Deleting account
        $data = $account->delete();
        $data = impruw_email_accounts::get_account($args['email_id']);
        if ($data->is_deleted ) {
            $response = array('code' => 'OK', 'data' => $data );
        }
        else{
            $response = array('code' => 'ERROR', 'msg' => 'Email id could not be deleted' );
        }

        
    }

    else{
        $response = array('code' => 'ERROR', 'msg' =>'In-valid email id' );
    }

    wp_send_json($response);

    exit;
    
}




