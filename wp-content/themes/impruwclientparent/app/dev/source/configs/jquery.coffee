## You can add your own jquery plugins here
## Or even mixin some extra functions
define ['jquery', 'underscore','jqueryvalidate'], ($, _)->

	# define helper functions
	$.fn.isEmptyColumn=(params = {})->
		@children('.element-wrapper').length is 0

	# check if a row is empty and can be deleted
	$.fn.canBeDeleted = ()->
		columns = @children('.column')
		empty = true
		_.each columns, (column, index)=>	
			if not $(column).isEmptyColumn()
				empty = false
				
		empty

	$.validator.setDefaults
		ignore: []
		errorElement : 'div'
		errorClass : 'field-error'
		validClass : 'field-valid'

	$.fn.center = (parent) ->
		if parent
			parent = @parent()
		else
			parent = window
		@css
			position: "fixed"
			top: ((($(parent).height() - @outerHeight()) / 2) + $(parent).scrollTop() + "px")
			left: ((($(parent).width() - @outerWidth()) / 2) + $(parent).scrollLeft() + "px")
		this


	# scroll to top
	$.scrollTop = ->
		$('html, body').animate
					scrollTop: 0
				,1000

	$.scrollTo =(ele)->
		$ele = $(ele)
		$('html, body').animate
					scrollTop: $ele.offset().top
				,1000
		

	# adjust the dimesion of upper content and also the left section and right section
	# Uses jquery to get window dimensions and sets min-height css property so that if height 
	# is greater it will not hide the content
	# @uses underscore's _.debounce to avoid repeated function calls on window resize 
	adjustPageDim = _.debounce ()->

		height = $(window).height()

		minHeight = height - 40

		$('.aj-upper-content').css 'min-height',minHeight

		$('.aj-upper-content').children().css 'min-height',minHeight

	, 30	

	#setup page initial dimesions
	$(document).ready ()->

		adjustPageDim()
		
	#adjust the page size and dimensions on resize
	$(window).resize adjustPageDim

	FloatMenu = ()->
		menuPosition = $("#fl_menu").position().top
		scrollAmount = $(document).scrollTop()
		newPosition = menuPosition + scrollAmount
		if $(window).height() < $fl_menu.height() + $fl_menu_menu.height()
			$fl_menu.css "top", menuPosition
		else
			$fl_menu.stop().animate top: newPosition , $float_speed, $float_easing


	$float_speed = 1500

	$float_easing = "easeOutQuint"

	$menu_fade_speed = 500

	$closed_menu_opacity = 0.75

	$fl_menu = $ "#fl_menu"

	$fl_menu_menu = $ "#fl_menu .menu"

	$fl_menu_label = $ "#fl_menu .label"

	$(window).load ->
		menuPosition = $("#fl_menu").position().top
		FloatMenu()
		$fl_menu.hover ->
			$fl_menu_label.fadeTo $menu_fade_speed, 1
			$fl_menu_menu.fadeIn $menu_fade_speed
		,->
			$fl_menu_label.fadeTo $menu_fade_speed, $closed_menu_opacity
			$fl_menu_menu.fadeOut $menu_fade_speed

	$(window).scroll ->
		FloatMenu()
