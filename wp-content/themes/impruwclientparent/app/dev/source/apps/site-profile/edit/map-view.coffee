define ['app'
],(App)->
	App.module 'SiteProfileApp.Edit.View',(View,App)->

		callbacks = null
		window.initializeDragMap = ->
			if callbacks isnt null
				callbacks.fire()
				callbacks.remove window['renderDragMap']

		class View.MapView extends Marionette.ItemView

			template : '<div class="row">
							<div id="map-preview-top-info" class="col-sm-10">
								<div class="default-position default-text hide"> 
									<span>Position not accurate? Move the marker to set to accurate position</span>
								</div>
								<div class="default-position not-found-text hide"> 
									<span>your address could not be found. Move the marker to your address</span>
								</div>
								<div class="custom-position hide">
									<span>Now showing custom position. Click on default button to show default. 
								</div>
							</div>
							<div class="buttons col-sm-2 ">
								<button class="custom-position hide btn btn-primary set-default-position" type="button">Show Default</button>
							</div>
						</div>
						<div id="map-canvas" class="col-sm-offset-1 col-sm-10"></div>
						'
			modelEvents : 
				'change:position' : 'positionChange'

			events: 
				'click .set-default-position' : 'setDefaultPosition'

			onShow : ->
				
				@geoCodeAddress()

			positionChange : (model,position)->
					@$el.find('.custom-position, .default-position').addClass 'hide'

			geoCodeAddress:->
				callbacks = $.Callbacks 'once'
				window['renderDragMap'] = @renderMap
				callbacks.add window['renderDragMap']
				if( typeof google is 'undefined' )
					$.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=initializeDragMap')
				else
					@renderMap()

			onRefreshMap : ->
				@model.set 'position',false
				@trigger 'save:coordinates'
				@renderMap()

			renderMap : =>

				if not @map
					@map = new google.maps.Map document.getElementById("map-canvas"),
														center :  new google.maps.LatLng(59.913, 10.750)
														zoom : 17
					@marker = new google.maps.Marker
										map: @map
										draggable : true
										animation: google.maps.Animation.DROP
										position: @map.getCenter()

					google.maps.event.addListener @marker, 'dragend', @onMarkerDrag.bind @

				if @model.get 'position'
					pos = new google.maps.LatLng @model.get('latitude'),@model.get 'longitude'
					@$el.find('.custom-position').removeClass 'hide'
					@displayMap pos, @model.get 'address'
					
				else 
					@getPositionFromAddress()


			getPositionFromAddress: ->
				address = @model.get 'address'

				service = new google.maps.places.PlacesService @map
				service.textSearch 
						query : address 
					, (results, status)=>
						if status is google.maps.places.PlacesServiceStatus.OK and results.length > 0
							@displayMap results[0].geometry.location, address
							@$el.find('.default-position').not('.not-found-text').removeClass 'hide'
						else
							@displayMap @map.getCenter(), address
							@$el.find('.default-position').not('.default-text').removeClass 'hide'

						
						

			displayMap:( location, address = "")->
				
				@map.setCenter location
				@createMarker address

			createMarker :(address)->

				@marker.setPosition @map.getCenter()

				@createInfoWindow address

			

			createInfoWindow:( address)->
				# TODO: add formatted content in info window
				infowindow = new google.maps.InfoWindow
												content: address

				google.maps.event.addListener @marker, 'click',->
					infowindow.open @map,@marker

			displayGeoCodeErrorMessage:->
				@$el.html "<div class='empty-view no-click'><span class='bicon icon-uniF132'></span>"+_.polyglot.t('Failed to geocode your address. Please click')+"</div>"

			onMarkerDrag  : (data)->
				@model.set 'position',true
				@model.set 'latitude',data.latLng.k
				@model.set 'longitude', data.latLng.D
				@trigger 'save:coordinates'
				@$el.find('.custom-position').removeClass 'hide'

			setDefaultPosition : ->
				@model.set 'position',false
				@trigger 'save:coordinates'
				@renderMap()

