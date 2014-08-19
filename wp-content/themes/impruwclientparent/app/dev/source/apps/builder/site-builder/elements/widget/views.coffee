define ['app'],(App)->
	App.module 'SiteBuilderApp.Element.Widget.Views',(Views,App)->

		class Views.WidgetView extends Marionette.ItemView

			className : 'widget embed-responsive '

			templates : ''

			modelEvents : 
				'change:widgetCode' : 'render'
				'change:type' : 'render'

			mixinTemplateHelpers:(data)->
				data = super data
				console.log 'mixin'
				data

			onRender :->
				console.log 'in on render'

				widgetHtml = $.parseHTML _.stripslashes @model.get 'widgetCode'
				@$el.html widgetHtml

				# $(html).addClass 'fb-widget'
				if @model.get('type') is 'youtube'
					@$el.find('iframe').wrap('<div class="embed-responsive-item"></div>')
					width = @$el.find('iframe').attr 'width'
					height = @$el.find('iframe').attr 'height'
					aspectRatio = 100 * height/width
					@model.set 'aspectRatio',aspectRatio

					@$el.css 'padding-bottom',"#{aspectRatio}%"

				if @model.get('type') is 'facebook'
					@$el.removeAttr 'style'
					@$el.html '<div>the facebook placeholder comes here</div>'

				if @model.get('type') is 'tripadvisor'
					@$el.removeAttr 'style'
					@$el.html '<div>the tripadvisor placeholder comes here</div>'


				# @trigger 'save:html:data', $(widgetHtml).get(0)

				# $(html).find('div').attr 'data-width',@$el.width()
				console.log widgetHtml

				

			onShow : ->

				

				@$el.closest('.column').on 'class:changed',=>
					@onRender()