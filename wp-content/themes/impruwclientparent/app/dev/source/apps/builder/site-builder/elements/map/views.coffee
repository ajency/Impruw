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
				
				map = new google.maps.Map document.getElementById("map-canvas"),
																center :  new google.maps.LatLng(-34.397, 150.644)
																zoom : 17

				if window.HOTELPOSITION.position
					newCenter = new google.maps.LatLng window.HOTELPOSITION.latitude, window.HOTELPOSITION.longitude 
					@createMarker map, newCenter
					return

				else if _.trim(window.HOTELPOSITION.placeId) isnt ''
					@getPlacesDetails window.HOTELPOSITION.placeId,map
					return

				else
					console.log window.HOTELPOSITION.placeId
					service = new google.maps.places.PlacesService(map);
					service.textSearch
							query: window.ADDRESS
						, (results,status)=>
							if status is google.maps.places.PlacesServiceStatus.OK
								@getPlacesDetails results[0].place_id,map
							else 
								jQuery('#map_canvas').height('auto').html('<div class="empty-view"><span class="glyphicon glyphicon-map-marker"></span>Please add an address for your site.</div>');
						


			getPlacesDetails : (placeId,map) ->
				service = new google.maps.places.PlacesService(map);
				service.getDetails
						placeId: placeId
					,(place, status)=>
						if status is google.maps.places.PlacesServiceStatus.OK
							# x= place
							# // createMarker(place);
							@createMarker map, place.geometry.location ,place
						
						else 
							jQuery('#map_canvas').height('auto').html('<div class="empty-view"><span class="glyphicon glyphicon-map-marker"></span>Please add an address for your site.</div>');
						
				
						
						

			# displayMap:(map, location, place)->
			# 	# map = new google.maps.Map document.getElementById("map-canvas"),
			# 	# 												center : location
			# 	# 												zoom : 14
				
			# 	@createMarker map, place

			createMarker :(map, location,  place)->
				map.setCenter location

				marker = new google.maps.Marker
									map: map
									position: location

				if (place)
					image =
						url : place.icon
						size : new google.maps.Size(71 , 71)
						origin: new google.maps.Point(0, 0)
						anchor: new google.maps.Point(7, 7)
						scaledSize: new google.maps.Size(15, 15)
					
					marker.setTitle(place.name);
					marker.setIcon(image);
					content = "<div><b>"+place.name+"</b></div>"+place.adr_address;
					if (place.url)
						content += "<div class='text-center'><a href="+place.url+">more</a></div>"
			
				else
					content = window.ADDRESS

				@createInfoWindow map, marker, content

			createInfoWindow:(map, marker, content)->
				# TODO: add formatted content in info window
				infowindow = new google.maps.InfoWindow
												content: content

				google.maps.event.addListener marker, 'click',->
					infowindow.open map,marker

			displayGeoCodeErrorMessage:->
				@$el.html "<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>"+_.polyglot.t('Failed to geocode your address. Please click')+"
									 <a href='#{SITEURL}/dashboard/#/site-profile'> "+_.polyglot.t('here to update.')+"</a></div>"