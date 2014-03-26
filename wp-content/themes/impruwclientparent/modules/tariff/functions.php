<?php
/*
* Function to update the tariff plans 
* returns the tariff Id
*
*/
function update_tariff($formdata){

	global $wpdb;
  
    $table_name= $wpdb->prefix.'tariff';

    // serializing the weekend and weekday array
    foreach ($formdata as $key => $value) {
    	
    	if($key == "weekend" || $key == "weekday")
    	{
    		$formdata[$key] = maybe_serialize($value);
    	}	
    }


	$sql = $wpdb->prepare("SELECT COUNT(*) FROM $table_name WHERE id = %s",$formdata['id']);
	
	$query_return = $wpdb->get_var($sql);

	if( $query_return == 0){

		$wpdb->insert($table_name, $formdata);
		return $wpdb->insert_id;

	}
	else{

		$wpdb->update($table_name, $formdata,array('id' => $formdata['id'] ));
		return $formdata['id'];
	}


}