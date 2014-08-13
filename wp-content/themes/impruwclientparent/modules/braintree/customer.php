<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/22/14
 * Time: 10:26 AM
 */

/**
 * Function to create a customer with credit card  in the vault
 *
 * @param $customer_data
 * @return array containing credit card token and customer id
 *         on success and error msg on failure
 */
function create_customer_with_card( $customer_data ) {

    $create_customer_with_card = Braintree_Customer::create( array(
        'firstName' => $customer_data[ 'user_name' ],
        'creditCard' => array(
            'paymentMethodNonce' => $customer_data[ 'payment_method_nonce' ]
        )
    ) );

    if ( $create_customer_with_card->success ) {

        $credit_card_token = $create_customer_with_card->customer->creditCards[ 0 ]->token;
        $customer_id = $create_customer_with_card->customer->id;

        $success_msg = array( 'code' => 'OK',
            'credit_card_token' => $credit_card_token,
            'customer_id' => $customer_id );
        return $success_msg;

    } else {
        $error_msg = array( 'code' => 'ERROR', 'msg' => $create_customer_with_card->message );
        return $error_msg;
    }


}


/**
 * Function to get credit card details of a customer stored in the vault
 *
 * @param braintree (int) $customer_id
 *
 * @return empty array with key card_exists set to false, if no credit card found.
 *         if credit card found for user, returns the card details along with key
 *         card_exists set to true
 */
function get_customer_credit_card_details( $customer_id ) {

    $customer = Braintree_Customer::find( $customer_id );

    if ( empty( $customer->creditCards ) )
        return array( 'card_exists' => false,
            'customer_id' => $customer_id,
            'braintree_client_token' => generate_client_token() );

    $customer_credit_card_data = customer_credit_card_details( $customer->creditCards );

    return $customer_credit_card_data;

}

/**
 * Function to check if credit card exists for customer and returns card details
 *
 * @param array $credit_cards from braintree
 *
 * @return empty array with key card_exists set to false, if no credit card found.
 *         if credit card found for user, returns the card details along with key
 *         card_exists set to true
 */
function customer_credit_card_details( $credit_cards ) {

    foreach ( $credit_cards as $key => $credit_card ) {

        $credit_card_details[ $key ][ 'customer_name' ] = $credit_card->cardholderName;
        $credit_card_details[ $key ][ 'customer_id' ] = $credit_card->customerId;
        $credit_card_details[ $key ][ 'card_number' ] = $credit_card->maskedNumber;
        $credit_card_details[ $key ][ 'expiration_date' ] = $credit_card->expirationDate;
        $credit_card_details[ $key ][ 'token' ] = $credit_card->token;
        $credit_card_details[ $key ][ 'card_type' ] = $credit_card->cardType;
        $credit_card_details[ $key ][ 'card_exists' ] = true;
        $credit_card_details[ $key ][ 'braintree_client_token' ] = generate_client_token();

    }
    return $credit_card_details;

}

function  get_customer_address( $braintree_customer_id ) {

    $billing_address = array();

    $customer = Braintree_Customer::find( $braintree_customer_id );
    $address = $customer->addresses;

    if ( !empty( $address ) ) {

        $billing_address[ 'customerId' ] = $address[ 0 ]->customerId;
        $billing_address[ 'id' ] = $address[ 0 ]->id;
        $billing_address[ 'streetAddress' ] = $address[ 0 ]->streetAddress;
        $billing_address[ 'postalCode' ] = $address[ 0 ]->postalCode;
        $billing_address[ 'region' ] = $address[ 0 ]->region;
        $billing_address[ 'countryName' ] = $address[ 0 ]->countryName;
        $billing_address[ 'address_exists' ] = true;

    }

    return $billing_address;
}

function create_customer_billing_address( $address_data ) {

    try {

        $result = Braintree_Address::create( $address_data );
        if ( $result->success ) {

            return array( 'code' => 'OK' );
        } else {

            $error_msg = array( 'code' => 'ERROR', 'msg' => 'Address not added' );
            return $error_msg;
        }
    } catch ( Braintree_Exception_NotFound $e ) {

        return array( 'code' => 'ERROR', 'msg' => 'Address not added' );

    }

}


function update_customer_billing_address( $address_data ) {

    $customer_id = $address_data[ 'customerId' ];
    $address_id = $address_data[ 'id' ];

    unset( $address_data[ 'id' ] );
    unset( $address_data[ 'customerId' ] );

    $address_update = Braintree_Address::update( $customer_id, $address_id, $address_data );

    if ( $address_update->success ) {
        return array( 'code' => 'OK' );
    } else {
        $error_msg = array( 'code' => 'ERROR', 'msg' => $address_update->message );
        return $error_msg;
    }

}


function  add_new_credit_card_to_customer( $customer_id, $payment_method_nonce ) {

    $create_card = Braintree_PaymentMethod::create(array(
        'customerId' => $customer_id,
        'paymentMethodNonce' => $payment_method_nonce,
        'options' => array(
            'failOnDuplicatePaymentMethod' => true
        )
    ));

//    $create_card = Braintree_Customer::update( $customer_id, array(
//        'creditCard' => array(
//            'paymentMethodNonce' => $payment_method_nonce,
//            'options' => array(
//                'verifyCard' => true
//            )
//        )
//    ) );

    if ( $create_card->success ) {
        $credit_card_token = $create_card->paymentMethod->token;
        $success_msg = array( 'code' => 'OK', 'credit_card_token' => $credit_card_token );
        return $success_msg;

    } else {
        $error_msg = array( 'code' => 'ERROR', 'msg' => $create_card->message );
        return $error_msg;
    }
}


function get_credit_card_details_by_token( $card_token ) {

    try {
        $credit_card = Braintree_PaymentMethod::find( $card_token );

        $credit_card_details[ 'customer_name' ] = $credit_card->cardholderName;
        $credit_card_details[ 'customer_id' ] = $credit_card->customerId;
        $credit_card_details[ 'card_number' ] = $credit_card->maskedNumber;
        $credit_card_details[ 'expiration_date' ] = $credit_card->expirationDate;
        $credit_card_details[ 'token' ] = $credit_card->token;
        $credit_card_details[ 'card_type' ] = $credit_card->cardType;
        $credit_card_details[ 'card_exists' ] = true;
        $credit_card_details[ 'braintree_client_token' ] = generate_client_token();

        return array('code'=>'OK','credit_card_details'=>$credit_card_details);

    } catch ( Braintree_Exception_NotFound $e ) {

        return array( 'code' => 'ERROR', 'msg' => 'Card not found' );

    }

}
