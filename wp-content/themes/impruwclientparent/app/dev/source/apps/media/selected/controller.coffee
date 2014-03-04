define ['app', 'controllers/base-controller', 'apps/media/selected/views'], (App, AppController)->

	#Login App module
	App.module "Media.Selected", (Selected, App)->
		
		@startWithParent = false

		#Show Controller 
		class Selected.Controller extends AppController

			# initialize
			initialize:(opt = {})-> 
				{ @region, collection } = opt
				view = @_getView collection
				@show view
				 
				
			# gets the main login view
			_getView :(collection)->
				new SelectedMedia
							collection : collection


		# Views
		# single media view
		class SelectedSingle extends Marionette.ItemView
			template : ''
			className: 'media'
			tagName : 'img'
			events:
				'click a'	: (e)-> e.preventDefault()
			onRender:->
				@$el.width '50px'
					.height '50px'
				@$el.attr 'src', @model.get('sizes').thumbnail.url

		# collection view 
		class SelectedMedia extends Marionette.CompositeView
			className : 'row'
			template: '<div id="selected-images"></div>'
			itemView : SelectedSingle
			itemViewContainer: '#selected-images'
	
		Selected.on 'initialize:before', ->
			

		# start the selected app
		Selected.on 'start',(options) =>
			new Selected.Controller options