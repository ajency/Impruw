define ['app'
		'text!apps/media-manager/show/templates/outer.html'
		], (App, outerTpl)->
	
			App.module 'MediaManager.Show.Views', (Views, App)->

				class Views.OuterLayout extends Marionette.Layout

					template: outerTpl

					regions : 
						uploadRegion 	: '#upload-region'
						allMediaRegion	: '#all-media-region'

					dialogOptions : 
						modal_title : 'Media Manager'

				