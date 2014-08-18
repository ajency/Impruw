define ['app'],(App)->
	App.module 'SiteBuilderApp.Element.Widget.Views',(Views,App)->

		class Views.WidgetView extends Marionette.ItemView

			className : 'widget'

			templates : ''

			onRender :->
				console.log 'in on render'

				html = $.parseHTML _.stripslashes @model.get 'htmlData'

				# $(html).addClass 'fb-widget'

				@trigger 'save:html:data', $(html).get(0)

				$(html).find('div').attr 'data-width',@$el.width()
				console.log html

				@$el.html html

			onShow : ->

				

				@$el.closest('.column').on 'class:changed',=>
					@onRender()