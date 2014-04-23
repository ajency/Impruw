define ['app', 'controllers/base-controller'
		'apps/my-profile/language/views'], (App, AppController)->

	App.module 'MyProfileApp.Language', (Language, App, Backbone, Marionette, $, _)->

		class Language.Controller extends AppController

			initialize :(opts)->
				{model} = opts
				
				@model = model

				@view =  @getLanguageView @model

				@listenTo @view ,"update:user:lang:click", @updateLanguage

				@show @view,
					loading: true


			getLanguageView :(model) ->
				new Language.View.LanguageForm
						model : model

			updateLanguage :(lang)=>
				@model.set 'user_lang' : lang
				@model.save null,
						onlyChanged : true
						wait: true
						success: @languageUpdated
				

			languageUpdated :=>
				@view.triggerMethod "user:lang:updated"

		App.commands.setHandler "show:language:form",(opts) ->
			new Language.Controller opts


		

			
	