define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Slider.Views', (Views, App, Backbone, Marionette, $, _)->


		class SliderItem extends Marionette.ItemView

			template : '<img src="{{full_url}}" alt="Slide" data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat"/>'

			tagName : 'li'

			onRender:->
				@$el.attr 'data-transition','fade'
					.attr 'data-slotamount','7'
					.attr 'data-masterspeed','1500'
 

		# Menu item view
		class Views.SliderView extends Marionette.CompositeView

			className : 'fullwidthbanner-container roundedcorners'

			template : '<div class="fullwidthbanner"><ul></ul></div>'

			id : _.uniqueId('carousel-')

			itemView : SliderItem

			itemViewContainer: '.fullwidthbanner > ul'

			events:
				'click' :(e)-> 
					@trigger "show:slides:manager"
				'click .tp-rightarrow,.tp-leftarrow,.bullet' :(e)-> e.stopPropagation()

			# close revolution slider on close
			onClose:->
				delete @revapi

			onShow:->
				@revapi = @$el.find(".fullwidthbanner").revolution
													  	delay: 9000
													  	startwidth: 1170
													  	startheight: 500
													  	hideThumbs: 10
													  	thumbWidth: 100
													  	thumbHeight: 50
													  	thumbAmount: 5
													  	navigationType: "both"
													  	navigationArrows: "solo"
													  	navigationStyle: "round"
													  	touchenabled: "on"
													  	onHoverStop: "on"
													  	navigationHAlign: "center"
													  	navigationVAlign: "bottom"
													  	navigationHOffset: 0
													  	navigationVOffset: 0
													  	soloArrowLeftHalign: "left"
													  	soloArrowLeftValign: "center"
													  	soloArrowLeftHOffset: 20
													  	soloArrowLeftVOffset: 0
													  	soloArrowRightHalign: "right"
													  	soloArrowRightValign: "center"
													  	soloArrowRightHOffset: 20
													  	soloArrowRightVOffset: 0
													  	shadow: 0
													  	fullWidth: "on"
													  	fullScreen: "off"
													  	stopLoop: "off"
													  	stopAfterLoops: -1
													  	stopAtSlide: -1
													  	shuffle: "off"
													  	autoHeight: "off"
													  	forceFullWidth: "off"
													  	hideThumbsOnMobile: "off"
													  	hideBulletsOnMobile: "on"
													  	hideArrowsOnMobile: "on"
													  	hideThumbsUnderResolution: 0
													  	hideSliderAtLimit: 0
													  	hideCaptionAtLimit: 768
													  	hideAllCaptionAtLilmit: 0
													  	startWithSlide: 0
													  	fullScreenOffsetContainer: ""



														