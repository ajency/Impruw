define ['app', 'controllers/base-controller'
		'apps/builder/header/change-theme-font/theme-font-views'], (App, AppController)->
	App.module 'ChangeThemeFontApp', (ChangeThemeFontApp, App, Backbone, Marionette, $, _)->

		# Controller class for showing theme color edits
		class ChangeThemeFontApp.Controller extends AppController

			# initialize the controller. Get all required entities and show the view
			initialize: (opt = {})->
				@layout = @getLayout()

				@themeFontCollection = App.request 'get:google:font'
				@themeFontModel = App.request 'get:current:theme:font'

				App.execute 'when:fetched',[@themeFontCollection],=>

					@listenTo @layout, "show", @showFontSet

					# @listenTo @layout ,"edit:theme:color",@editThemeColor

					@show @layout,
						loading: true


			getLayout: ->
				new ChangeThemeFontApp.Views.ChangeThemeFontLayout

			# showFontSet: ->
			# 	url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCd10sz9JLJawK8D8tcdAbYQw7t4U3xA1A'
				
			# 	$.get url, null, @onFontsLoaded.bind @ 

				# 

				# @listenTo @themeColorSetView, "itemview:change:theme:color", @changeThemeColorClick

				# @listenTo @themeColorSetView, "itemview:edit:theme:color:clicked", @editThemeColorClick

				# 

			showFontSet : ->
				# console.log data.items
				# @themeFontCollection = data.items

				@themeFontSetView = @getView @themeFontCollection

				@listenTo @themeFontSetView, 'dialog:close', ->
					@layout.trigger 'dialog:close'

				@layout.themefontsetRegion.show @themeFontSetView

			# editThemeColor:(model)->
			#     App.execute "edit:theme:color:set",
			#         region : @layout.themecolorEditRegion
			#         model  : model

			getView: ->
			    new ChangeThemeFontApp.Views.ThemeFontSetView
			        collection: @themeFontCollection
			        model : @themeFontModel

			# changeThemeColorClick: (iv, model)->
			#     formdata = model.toJSON()

			#     options =
			#         url: AJAXURL,
			#         method: 'POST',
			#         data:
			#             action: 'change-theme-color'
			#             formdata: formdata

			#     $.ajax(options).done (response)->
			#         window.location.reload(true)
			#     .fail (resp)->
			#             console.log 'error'

			# editThemeColorClick:(iv,model)->
			#     @layout.trigger "edit:theme:color" , model


		

		App.commands.setHandler "show:theme:font:set", (opts)->
			new ChangeThemeFontApp.Controller opts
					



								
