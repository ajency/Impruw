define ["app", 'backbone'], (App, Backbone) ->
	App.module "Entities.Fonts", (Fonts, App, Backbone, Marionette, $, _)->

		class FontsModel extends Backbone.Model
			name :'fonts'
			idAttribute : 'ID'

		class FontsCollection extends Backbone.Collection
			model : FontsModel
			url : 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCd10sz9JLJawK8D8tcdAbYQw7t4U3xA1A'
			parse : (response)->
				response.items

		fontsCollection = new FontsCollection

		mainFontModel = new FontsModel THEMEFONTMAIN

		secFontModel = new FontsModel THEMEFONTTITLE

		API = 
			getGoogleFonts : ->
				if fontsCollection.size()
					return fontsCollection
				else
					fontsCollection.fetch
						success : (collection)->
							collection.unshift 
								family : 'Default'
	
					fontsCollection

			getCurrentThemeFont :->
				mainFontModel

							
			getCurrentThemeSecFont : ->
				secFontModel



		App.reqres.setHandler 'get:google:font',->
			API.getGoogleFonts()

		App.reqres.setHandler 'get:current:theme:font',->
			API.getCurrentThemeFont()

		App.reqres.setHandler 'get:current:theme:sec:font',->
			API.getCurrentThemeSecFont()
