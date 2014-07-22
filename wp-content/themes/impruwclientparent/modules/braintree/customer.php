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