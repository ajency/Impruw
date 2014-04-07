<?php
/*
* Function to update the tariff plans 
* returns the tariff Id
*
*/
function update_tariff($formdata){

	global $wpdb;
  
    $table_name= $wpdb->prefix.'tariffs';

    // serializing the weekend and weekday array
    foreach ($formdata as $key => $value) {
    	
    	if($key == "weekend" || $key == "weekday")
    	{
    		$formdata[$key] = maybe_serialize($value);
    	}	
    }

	$wpdb->update($table_name, $formdata,array('id' => $formdata['id'] ));
	return $formdata['id'];
}

/**
 * 
 * @param unknown $formdata
 * @return number
 */
function add_tariff($formdata){

	global $wpdb;

	$table_name= $wpdb->prefix.'tariffs';

	// serializing the weekend and weekday array
	foreach ($formdata as $key => $value) {
		 
		if($key == "weekend" || $key == "weekday")
		{
			$formdata[$key] = maybe_serialize($value);
		}
	}
	
	$wpdb->insert($table_name, $formdata);
	return $wpdb->insert_id;

}

/**
 * 
 * @param unknown $room_id
 * @return Ambigous <mixed, NULL, multitype:, multitype:multitype: , multitype:Ambigous <multitype:, NULL> >
 */
function get_tariff($room_id = 0) {

	global $wpdb;
        
        if($room_id === 0)
		$room_id = get_the_ID();

	$table_name = $wpdb->prefix . 'tariff';

	$query = "SELECT * FROM $table_name WHERE room_id = $room_id ";

	$tariff = $wpdb->get_results($query, ARRAY_A);
        
        foreach ($tariff as $key => $value) {
          
            $tariff[$key]['weekday'] = maybe_unserialize($tariff[$key]['weekday']);
          
          $tariff[$key]['weekend'] = maybe_unserialize($tariff[$key]['weekend']);  
        }
       
	return $tariff;
}
