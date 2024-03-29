<?php
/**
 * Created by PhpStorm.
 * User: Mahima
 * Date: 7/22/14
 * Time: 4:34 PM
 */


function get_transaction_details( $transaction_id_array ) {

    foreach ( $transaction_id_array as $key => $transaction_id ) {
        $transaction_data = Braintree_Transaction::find( $transaction_id );
        $transaction[ $key ][ 'amount' ] = round( $transaction_data->amount );
        $transaction[ $key ][ 'transaction_id' ] = $transaction_data->id;
        $transaction[ $key ][ 'date' ] = $transaction_data->createdAt->format( 'd M Y' );
        $transaction[ $key ][ 'plan_id' ] = $transaction_data->planId;
    }
    return $transaction;
}

function get_transaction_id_for_customer( $customer_id ) {

    $transaction = Braintree_Transaction::search( array(
        Braintree_TransactionSearch::customerId()->is( $customer_id )
    ) );

    $transaction_id_array = $transaction->_ids;

    return $transaction_id_array;

}