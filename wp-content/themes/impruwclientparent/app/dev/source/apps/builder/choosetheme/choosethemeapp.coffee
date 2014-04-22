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

				view = @_getChooseThemeView themesCollection

				@listenTo view, "itemview:choose:theme:clicked", @themeSelected

				@show view, loading : true


			# theme selected
			themeSelected:(iv, model)=>

				data =
					new_theme_id : model.get 'ID'

				if ISTHEMESELECTED is 1
					data.clone_pages = false

				responseFn = (resp)=>
					window.location.href = BUILDERURL
					@region.close()

				# assign the new theme to site
				$.post 	"#{AJAXURL}?action=assign-theme-to-site", data, responseFn, 'json'

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




