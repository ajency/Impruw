<?php

/**
 * All of the stattistics related code goes here
 *///initial google setup

// api dependencies
require_once('google-api-php-client/src/Google_Client.php');
require_once('google-api-php-client/src/contrib/Google_AnalyticsService.php');

function get_data($start_date,$end_date,$profile_id,$metrics,$optParams){

	$client= google_analytics_object();

	// create service and get data
	$service = new Google_AnalyticsService($client);
	
    try{
		$response = $service->data_ga->get(
		         'ga:'.$profile_id, // profile id
		         $start_date, // start date
		         $end_date, // end date
		         $metrics,
		         $optParams
		        );
		$response2=  array('status'=>'1','data3'=>$response);

		return $response2;
	}
	catch(Exception $e) {
		$error_res = array('status'=>'0','error_code'=>$e->getCode(),'error_msg'=>$e->getMessage());
		return $error_res;
    	
	}
}

function google_analytics_object(){
	
	// create client object and set app name
	$client = new Google_Client();
	$client->setApplicationName('ServiceProject'); // name of your app

	// set session
	session_start();
	if (isset($_SESSION['token'])) {
	 $client->setAccessToken($_SESSION['token']);
	}
	
	// set assertion credentials
	$client->setAssertionCredentials(
	    new Google_AssertionCredentials(
	        GA_EMAIL, // email you added to GA
	        array('https://www.googleapis.com/auth/analytics.readonly'),
	       file_get_contents(GA_KEY_FILE) // keyfile you downloaded
	    )
	);

	// other settings
	$client->setClientId(GA_CLIENT_ID); // from API console
	$client->setAccessType('offline_access'); 

	return $client;
}



//defining ajax
//// url to test this function :
///http://localhost/impruw/wp-admin/admin-ajax.php?action=get-unique-page-views
function get_analytics_data(){

	//call the google API method here to fetch the data
	$start_date="2014-02-01"; //$_POST['start_date'];
	$end_date="2014-02-20"; //$_POST['end-date'];
	$profile_id= "81856773"; //$_POST['ids'];
	$metrics= 'ga:visits,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces'; //$_POST['metrics'];
	$dimensions = 'ga:date';
	$optParams = array('dimensions' => $dimensions);

	$metrics_name= explode(',',$metrics);

	// format the returned data according to required model/collection. (this u can ignore for now)
	$data = get_data($start_date,$end_date,$profile_id,$metrics,$optParams);//formated data
	$arr= array();
    //echo '<pre>';
    //print_r($data);
    
    if($data['status'] != 0){
    	$arr = make_array($data['data3']['rows'],$metrics_name);	
	}
    else{
	 	$arr =  array('Error_code' => $data['error_code'],'Error_Msg' => $data['error_msg']);
	} 

  // echo '<pre>';
  // print_r($arr);

   wp_send_json(array('response' => $arr));
}

/**
 * Define a function to get data from ga
 * this function will get all filters/9dimensions/ metrix and query te ga Api.
 * andle no response and actual response
 * Finally send the response are json data 
 */ 
function abc(){

	//get the start date
	$sdsdas = sdsadas;


	// get end date
		// 

	///
	//

	//get the date querying google API, 

	//check for repons status
	// if proper 


	//else




}

function make_array($array_val,$metrics_name){

	$metr= $metrics_name;

    // looping through the rows array
	foreach ($array_val as $key => $values) {
		$date= $array_val[$key][0];
		$date2= date("m/d/y", strtotime($date));
		$condate = strtotime($date2) * 1000;
		$arr[] = array('date' => $condate);
		$metric_name_val = make_metric_arr($metr,$values);
		
	    // looping through the metric array and merging with the arr[] array
	    foreach ($metric_name_val as $key_val => $arr_val) {
	    	foreach ($arr_val as $key_val2 => $arr_val2) {
	    		$arr[$key][$key_val2] = (float)$arr_val2;
	    	}
	    }

	}
	return $arr;
}

/**
 *
 * 
 *
 * @param string $format Format of the date to return.
 * @param string $date Date string to convert.
 * @param bool $translate Whether the return date should be translated. Default is true.
 * @return string|int Formatted date string, or Unix timestamp.
 */
function make_metric_arr($metric_name,$values){

    // setting the indexes of the array to 0
    unset($values[0]);
    $values2 = array_values($values);	

	// loop to prepare the metrics array with their value
	for($i=0; $i<count($metric_name); $i++){

		$metric_name_val[] = array($metric_name[$i] => $values2[$i] );

	}
	
	return $metric_name_val;
		
}

add_action('wp_ajax_get_analytics_data', 'get_analytics_data');









// //defining ajax
// function get_unique_page_views(){

// 	//call the google API method here to fetch the data
	

// 	// format the returned data according to required model/collection. (this u can ignore for now)
// 	$data = '';//formated data

// 	wp_send_json(array('code' => 'OK', 'data' => $data));
// }
// add_action('wp_ajax_get-unique-page-views', 'get_unique_page_views');