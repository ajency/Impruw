define ['app', 'controllers/base-controller'
		'apps/builder/header/change-theme-font/theme-font-views'], (App, AppController)->
	App.module 'ChangeThemeFontApp', (ChangeThemeFontApp, App, Backbone, Marionette, $, _)->

		# Controller class for showing theme font edits
		class ChangeThemeFontApp.Controller extends AppController

			# initialize the controller. Get all required entities and show the view
			initialize: (opt = {})->
				@layout = @getLayout()

				

				

				@listenTo @layout, "show", @showFontSet

				@show @layout,
					loading: true


			getLayout: ->
				new ChangeThemeFontApp.Views.ChangeThemeFontLayout

			

			showFontSet : ->

				@themeFontCollection = App.request 'get:google:font'
				@themeFontModel = App.request 'get:current:theme:font'
				@themeSecFontModel = App.request 'get:current:theme:sec:font'
				
				@themeFontSetView = @getView @themeFontCollection

				@listenTo @themeFontSetView, 'dialog:close', ->
					@layout.trigger 'dialog:close'

				App.execute 'when:fetched',[@themeFontCollection],=>

					@layout.themefontsetRegion.show @themeFontSetView

			
			getView: ->
			    new ChangeThemeFontApp.Views.ThemeFontSetView
			        collection: @themeFontCollection
			        model : @themeFontModel
			        secModel : @themeSecFontModel

		
		

		App.commands.setHandler "show:theme:font:set", (opts)->
			new ChangeThemeFontApp.Controller opts
					



								
