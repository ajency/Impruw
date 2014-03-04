define ['app'], (App, mediaTpl, layoutTpl)->
	
			App.module 'Media.Selected.Views', (Views, App)->

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
				class Views.SelectedView extends Marionette.CompositeView
					className : 'row'
					template: '<div id="selected-images"></div>'
					itemView : SelectedSingle
					itemViewContainer: '#selected-images'
					