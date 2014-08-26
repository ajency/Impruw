define ['app'],(App)->
	App.module 'SiteBuilderApp.Element.Widget.Views',(Views,App)->

		class Views.WidgetView extends Marionette.ItemView

			className : 'widget  '

			templates : ''

			modelEvents : 
				'change:widgetCode' : 'renderWidget'
				'change:type' : 'renderWidget'

			mixinTemplateHelpers:(data)->
				data = super data
				console.log 'mixin'
				data

			renderWidget :->
				if @model.get('widgetCode') is ''
					if @model.get('type') is ''
						@$el.html '<div class="empty-view"><span class="bicon icon-uniF162"></span>Choose your widget type and add your embed code from the settings</div>'
					else if @model.get('type') is 'youtube'
						@$el.html '<div class="empty-view"><span class="bicon icon-uniF162"></span>Add Youtube embed code in the settings</div>'
					else if @model.get('type') is 'facebook'
						@$el.html '<div class="empty-view"><span class="bicon icon-uniF162"></span>Add Facebook embed code in the settings</div>'
					else if @model.get('type') is 'tripadvisor'
						@$el.html '<div class="empty-view"><span class="bicon icon-uniF162"></span>Add Tripadvisor embed code in the settings</div>'
					return


				widgetHtml = $.parseHTML _.stripslashes @model.get 'widgetCode'
				@$el.html widgetHtml

				# $(html).addClass 'fb-widget'
				if @model.get('type') is 'youtube'
					@$el.find('iframe').wrap('<div class="embed-responsive-item"></div>')
					width = @$el.find('iframe').attr 'width'
					height = @$el.find('iframe').attr 'height'
					aspectRatio = 100 * height/width
					@model.set 'aspectRatio',aspectRatio
					@$el.addClass 'embed-responsive'
					@$el.css 'padding-bottom',"#{aspectRatio}%"

				if @model.get('type') is 'facebook'
					@$el.removeClass 'embed-responsive'
					@$el.find('div').attr('data-width',@$el.closest('.element-markup').width())

					@$el.removeAttr 'style'
					((d, s, id) ->
						js = undefined
						
						return if d.getElementById(id)
							# current = d.getElementById(id)
							# current.parentNode.removeChild(current)
						fjs = d.getElementsByTagName(s)[0]
						js = d.createElement(s)
						js.id = id
						js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0"
						fjs.parentNode.insertBefore js, fjs
						return
					) document, "script", "facebook-jssdk"
					# @$el.html '<div>the facebook placeholder comes here</div>'

				if @model.get('type') is 'tripadvisor'
					@$el.removeAttr 'style'
					@$el.html '<div class="empty-view"><span class="bicon icon-uniF162"></span>Add Tripadvisor embed code in the settings</div>'


				# @trigger 'save:html:data', $(widgetHtml).get(0)

				# $(html).find('div').attr 'data-width',@$el.width()

				

			onShow : ->
				@renderWidget()
				

				@$el.closest('.column').on 'class:changed',=>
					@renderWidget()