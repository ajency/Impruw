define ['app', 'controllers/base-controller', 'apps/builder/choosetheme/views'],(App, AppController)->

	App.module 'ChooseTheme', (ChooseTheme, App)->

		# define router
		class ChooseThemeRouter extends Marionette.AppRouter

			appRoutes:
				'choose-theme' : 'chooseTheme'


		class ChooseThemeController extends AppController

			# initialize the controller
			initialize:(opt)->

				# get the themes
				themesCollection = App.request "get:themes:collection"

				# fetch collection
				themesCollection.fetch()

				view = @_getChooseThemeView themesCollection

				@listenTo view, "itemview:choose:theme:clicked",(iv, model)=>
					console.log model


				@show view, loading : true

			# get the choose theme view 
			# accepts a collection object
			_getChooseThemeView:(themesCollection)->
				new ChooseTheme.Views.ChooseThemeView
							collection : themesCollection


		# set the commands handler for show choose theme
		App.commands.setHandler "show:choose:theme",(opt = {})->

			if not opt.region
				opt.region = App.chooseThemeRegion

			new ChooseThemeController opt


		Controller =  
			chooseTheme : ->
				new ChooseThemeController
									region : App.chooseThemeRegion


		# start the router
		ChooseTheme.on 'start', =>
				new ChooseThemeRouter
							controller : Controller




