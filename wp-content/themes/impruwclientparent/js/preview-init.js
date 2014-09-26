jQuery(document).ready(function($) {
(function(w){
		sw = document.body.clientWidth;
		sh = document.body.clientHeight-86;
		
		$sizeFull = $('#size-full'),
		$sizeTab = $('#size-tab'),
		$sizeMobile = $('#size-mobile'),

	
	$(window).resize(function(){ //Update dimensions on resize
		sw = document.body.clientWidth;
		sh = document.body.clientHeight-86;
		if($sizeFull.closest('li').hasClass('active')){
			sizeiframe(sw,sh);
		}
	});
	
	//Size View Events
	$sizeFull.on("click", function(e){
		e.preventDefault();
		sizeiframe(sw,sh,e);
		
	});
	$sizeTab.on("click", function(e){
		e.preventDefault();
		sizeiframe(768,1024,e);
	});
	$sizeMobile.on("click", function(e){
		e.preventDefault();
		sizeiframe(320,480,e);
	});
	
	function sizeiframe(width,height,e) {

		$('#viewport').width(width);
		$('#viewport').height(height);
		if(e){
			$(e.target).closest('li').siblings().removeClass('active');
			$(e.target).closest('li').addClass('active');
		}
	}
	

    sizeiframe(sw,sh);

})(this);
});
