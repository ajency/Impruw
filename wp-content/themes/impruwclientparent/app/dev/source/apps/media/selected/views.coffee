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

				class EmptyView extends Marionette.ItemView
					className : 'pick-image'
					template : '<span class="glyphicon glyphicon-hand-left"></span><h4>Select an Image from the library</h4>'

				# collection view 
				class Views.SelectedView extends Marionette.CompositeView
					className : 'clearfix'
					template: '<div id="selected-images"></div>'
					itemView : SelectedSingle
					emptyView: EmptyView
					itemViewContainer: '#selected-images'
					