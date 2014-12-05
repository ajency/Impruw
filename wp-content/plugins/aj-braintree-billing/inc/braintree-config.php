<?php
if(!class_exists("Braintree"))
	require_once("lib/Braintree/Braintree.php");

Braintree_Configuration::environment(BT_ENVIRONMENT);
Braintree_Configuration::merchantId(BT_MERCHANT_ID);
Braintree_Configuration::publicKey(BT_PUBLIC_KEY);
Braintree_Configuration::privateKey(BT_PRIVATE_KEY);


function aj_braintree_generate_client_token(){
    $clientToken = Braintree_ClientToken::generate();
    return $clientToken;
}