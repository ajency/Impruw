define ['app'], (App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Map.Views', (Views, App, Backbone, Marionette, $, _)->
		callbacks = null
		window.initializeMap = ->
			if callbacks isnt null
				callbacks.fire()
				callbacks.remove window['renderMap']

		# Menu item view
		class Views.MapView extends Marionette.ItemView

			className: 'map'

			id: 'map-canvas'

			template: ''

			# set the class name before element is rendered
			onShow: ->
				@className += " " + Marionette.getOption this, 'className'

				# set height 
				@adjustMapHeight()
				@$el.height '100%'
				# @trigger 'set:image:height',
				#             height : @$el.parent().height()
				#             width : @$el.parent().width()

				@$el.parent().resizable
					# helper : "ui-image-resizable-helper"
					handles: "s"

					stop : (evt, ui)=>
						@$el.parent().css 'width','auto'
						# @model.set 'height',@$el.parent().height()
						@trigger 'set:image:height' ,
							height : @$el.parent().height()
							width : @$el.parent().width()


				if window.ADDRESS.trim() is ''
					@$el.html "<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>Address not specified. Please<a href='#{SITEURL}/dashboard/#site-profile'> click here to add.</a></div>"
				else
					@geoCodeAddress()

				@parentColumns = @$el.parents('.column')
				@parentColumns.each (index,parentColumn)=>
					$(parentColumn).on 'class:changed',@adjustMapHeight
					$(parentColumn).on 'element:moved',@mapMoved

			mapMoved : =>
				@parentColumns.each (index,parentColumn)=>
					$(parentColumn).off 'element:moved',@mapMoved
					$(parentColumn).off 'class:changed',@adjustMapHeight
				@parentColumns = @$el.parents('.column')
				@parentColumns.each (index,parentColumn)=>
					$(parentColumn).on 'element:moved',@mapMoved
					$(parentColumn).on 'class:changed',@adjustMapHeight
				@adjustMapHeight()

			adjustMapHeight:=>
				@$el.parent().height parseFloat(@model.get('heightRatio'))*@$el.parent().width()

			geoCodeAddress:->
				callbacks = $.Callbacks 'once'
				window['renderMap'] = @renderMap
				callbacks.add window['renderMap']
				if( typeof google is 'undefined' )
					$.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=initializeMap')
				else
					@renderMap()

			renderMap : =>
				address = window.ADDRESS
				# geocoder = new google.maps.Geocoder()
				# geocoder.geocode
				# 			address: address
				# 		, (results, status)=>
				# 			if status is google.maps.GeocoderStatus.OK
				# 				@displayMap results[0].geometry.location, address
				# 			else
				# 				@displayGeoCodeErrorMessage()

				map = new google.maps.Map document.getElementById("map-canvas"),
																center :  new google.maps.LatLng(-34.397, 150.644)
																zoom : 17

				if window.HOTELPOSITION.position
            		newCenter = new google.maps.LatLng window.HOTELPOSITION.latitude, window.HOTELPOSITION.longitude 
            		@displayMap map, newCenter, address
            		return

				service = new google.maps.places.PlacesService map
				service.textSearch 
						query : address 
					, (results, status)=>
						if status is google.maps.places.PlacesServiceStatus.OK and results.length > 0
							@displayMap map, results[0].geometry.location, address
						else
							@displayGeoCodeErrorMessage()
						
						

			displayMap:(map, location, address)->
				# map = new google.maps.Map document.getElementById("map-canvas"),
				# 												center : location
				# 												zoom : 14
				map.setCenter location
				@createMarker map, address

			createMarker :(map, address)->

				marker = new google.maps.Marker
									map: map
									position: map.getCenter()

				@createInfoWindow map, marker, address

			createInfoWindow:(map, marker, address)->
				# TODO: add formatted content in info window
				infowindow = new google.maps.InfoWindow
												content: address

				google.maps.event.addListener marker, 'click',->
					infowindow.open map,marker

			displayGeoCodeErrorMessage:->
				@$el.html "<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>"+_.polyglot.t('Failed to geocode your address. Please click')+"
									 <a href='#{SITEURL}/dashboard/#/site-profile'> "+_.polyglot.t('here to update.')+"</a></div>"