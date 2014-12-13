<?php

//Rename the API prefix
function change_json_rest_api_prefix($prefix){

    require_once 'email/rest-email.php';


    return "api";

}
add_filter( 'json_url_prefix', 'change_json_rest_api_prefix',10,1);




