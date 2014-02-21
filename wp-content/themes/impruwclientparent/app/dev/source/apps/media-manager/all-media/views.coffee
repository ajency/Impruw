define ['app'
		'text!apps/media-manager/all-media/templates/media.html'
		], (App, mediaTpl)->
	
			App.module 'MediaManager.AllMedia.Views', (Views, App)->

				# single media view
				class MediaView extends Marionette.ItemView
					template : mediaTpl
					className: 'col-sm-2 single-img'
					events:
						'click a': (e)-> e.preventDefault()

				# collection view
				class Views.GridView extends Marionette.CompositeView
					className : 'row'
					template: '<div id="selectable-images"></div>'
					itemView : MediaView
					itemViewContainer: '#selectable-images'

					onCollectionRendered:->
						@$el.find('#selectable-images').selectable()

				