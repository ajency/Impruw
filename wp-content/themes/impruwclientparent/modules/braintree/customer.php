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

    $create_customer_with_card = Braintree_Customer::create(array(
        'firstName' => $customer_data['user_name'],
        'creditCard' => array(
            'paymentMethodNonce' => $customer_data['payment_method_nonce'],
            'options' => array(
                'verifyCard' => true
            )
        )
    ));

    if ( $create_customer_with_card->success ) {

        $credit_card_token = $create_customer_with_card->customer->creditCards[ 0 ]->token;
        $customer_id = $create_customer_with_card->customer->id;

        $success_msg = array( 'code' => 'OK',
                            'credit_card_token' => $credit_card_token,
                            'customer_id' => $customer_id);
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

    //$customer_id = '81538496';

    $customer = Braintree_Customer::find( $customer_id );

    $customer_credit_card_data = customer_credit_card_details( $customer->creditCards );

    $customer_credit_card_data[ 'customer_id' ] = $customer_id;

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

    if ( empty( $credit_cards ) )
        return array( 'card_exists' => false );

    $credit_card_details[ 'customer_name' ] = $credit_cards[ 0 ]->cardholderName;
    $credit_card_details[ 'card_number' ] = $credit_cards[ 0 ]->maskedNumber;
    $credit_card_details[ 'expiration_date' ] = $credit_cards[ 0 ]->expirationDate;
    $credit_card_details[ 'token' ] = $credit_cards[ 0 ]->token;
    $credit_card_details[ 'card_type' ] = $credit_cards[ 0 ]->cardType;
    $credit_card_details[ 'card_exists' ] = true;

    return $credit_card_details;


}