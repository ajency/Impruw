define ['app', 'controllers/base-controller'
		'apps/language-translation/show/language-translation-view'], (App, AppController)->
	
		App.module 'LanguageApp.Show', (Show, App, Backbone, Marionette, $, _)->
			
			class Show.Controller extends AppController
	
				initialize: (options)->
					@languageLayout = @_getLanguageLayout()

					#function to load view
					@show @languageLayout,
						loading: true


					@listenTo @languageLayout, 'show',=>
						
						App.execute 'show:language:selection:app',
							region: @languageLayout.languageSelectionRegion

						# App.execute 'show:language:page:rooms:app',
						# 	region: @languageLayout.languagePageRooms 							


					@listenTo @languageLayout.languageSelectionRegion, "load:page:nav:bar", @_loadPageNavBar

					@listenTo @languageLayout.languagePageNav, "load:page:room:content", @_loadPageRoomContent

						# App.execute 'show:language:page:content:app',
						#     region: @languageLayout.languagePageContent

						# App.execute 'show:language:page:rooms:app',
						# 	region: @languageLayout.languagePageRooms    

				_getLanguageLayout : ->
					new Show.Views.LanguageLayout

				_loadPageNavBar: (selectedEditingLanguage) =>
					App.execute "show:language:page:nav:app",
						region: @languageLayout.languagePageNav
						language : selectedEditingLanguage
					return

				_loadPageRoomContent: =>
					App.execute "show:language:page:rooms:app",
						region: @languageLayout.languagePageRooms
					return				
		           

