define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Themes", (Themes, App, Backbone, Marionette, $, _)->

			# Theme Model
			class Themes.ThemeModel extends Backbone.Model

				idAttribute : 'ID'

				defaults :->
					post_title  : ''
					image_url   : ''
					preview_link: '#'

				name : 'theme'



			# Theme collection
			class Themes.ThemeCollection extends Backbone.Collection

				# model
				model : Themes.ThemeModel

				url : ->
					"#{AJAXURL}?action=get-themes"

				getExcept:(currentTheme)=>
					models = @filter (theme)-> 
								_.slugify(theme.get 'post_title') isnt currentTheme
					models                        


			themesCollection = new Themes.ThemeCollection
			themesCollection.fetch()
				
			# PUBLIC API FOR ENitity
			API =
				getThemesCollection: (param = {})->
					themes = themesCollection.getExcept CURRENTTHEME
					new Themes.ThemeCollection themes


			# REQUEST HANDLERS
			App.reqres.setHandler "get:themes:collection", ->
				API.getThemesCollection()