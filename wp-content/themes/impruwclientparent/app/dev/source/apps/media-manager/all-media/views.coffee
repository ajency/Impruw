define ['app'
		'text!apps/media-manager/all-media/templates/media.html'
		], (App, mediaTpl)->
	
			App.module 'MediaManager.AllMedia.Views', (Views, App)->

				# single media view
				class MediaView extends Marionette.ItemView
					template : mediaTpl
					className: 'col-sm-2 single-img'

				# collection view
				class Views.GridView extends Marionette.CollectionView
					className : 'row'
					template: '<div id="selectable-images"></div>'
					itemView : MediaView
					itemViewContainer: '#selectable-images'

				