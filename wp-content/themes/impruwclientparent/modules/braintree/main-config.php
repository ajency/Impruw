<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/17/14
 * Time: 5:40 PM
 */


require_once get_template_directory().'/braintree/Braintree.php';


Braintree_Configuration::environment(BT_ENVIRONMENT);
Braintree_Configuration::merchantId(BT_MERCHANT_ID);
Braintree_Configuration::publicKey(BT_PUBLIC_KEY);
Braintree_Configuration::privateKey(BT_PRIVATE_KEY);

/**
 * Include all the custom files required for braintree transaction and API calls
 */
require_once 'plans.php';
require_once 'subscription.php';
require_once 'customer.php';


function generate_client_token(){
    $clientToken = Braintree_ClientToken::generate();
    return $clientToken;
}
