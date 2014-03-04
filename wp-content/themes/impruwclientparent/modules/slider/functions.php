<?php

function get_sliders(){
	$slider = new RevSlider();
	$arrSliders = $slider->getArrSliders();
	echo '<pre>';
	print_r($arrSliders);
	return $arrSliders;
}