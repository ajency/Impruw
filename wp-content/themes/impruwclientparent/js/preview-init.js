jQuery(document).ready(function($) {
	jQuery('.options-div').tabSlideOut({
                tabHandle: '.handle',                     //class of the element that will become your tab
                tabLocation: 'left',                      //side of screen where tab lives, top, right, bottom, or left
                speed: 100,                               //speed of animation
                action: 'click',                          //options: 'click' or 'hover', action to trigger animation
                topPos: '150px',                          //position from the top/ use if tabLocation is left or right
                fixedPosition: true                       //options: true makes it stick(fixed position) on scroll
            });
// (function(w){
// 		sw = document.body.clientWidth;
// 		sh = document.body.clientHeight-50;
		
// 		$sizeFull = $('#size-full'),
// 		$sizeTab = $('#size-tab'),
// 		$sizeMobile = $('#size-mobile'),

	
// 	$(window).resize(function(){ //Update dimensions on resize
// 		sw = document.body.clientWidth;
// 		sh = document.body.clientHeight-50;
// 		if($sizeFull.closest('li').hasClass('active')){
// 			sizeiframe(sw,sh);
// 		}
// 	});
	
// 	//Size View Events
// 	$sizeFull.on("click", function(e){
// 		e.preventDefault();
// 		sizeiframe(sw,sh,e);
		
// 	});
// 	$sizeTab.on("click", function(e){
// 		e.preventDefault();
// 		sizeiframe(768,1024,e);
// 	});
// 	$sizeMobile.on("click", function(e){
// 		e.preventDefault();
// 		sizeiframe(320,480,e);
// 	});
	
// 	function sizeiframe(width,height,e) {

// 		$('#viewport').width(width);
// 		$('#viewport').height(height);
// 		if(e){
// 			$(e.target).closest('li').siblings().removeClass('active');
// 			$(e.target).closest('li').addClass('active');
// 		}
// 	}
	

//     sizeiframe(sw,sh);

// })(this);
});
