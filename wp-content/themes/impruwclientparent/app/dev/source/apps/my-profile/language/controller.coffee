define ['app', 'controllers/base-controller'
        'apps/my-profile/language/views'], (App, AppController)->
    App.module 'MyProfileApp.Language', (Language, App, Backbone, Marionette, $, _)->
        class Language.Controller extends AppController

            initialize: (opts)->
                {model} = opts

                @model = model

                @view = @getLanguageView @model

                @listenTo @view, "update:user:lang:click", @updateLanguage

                @show @view,
                    loading: true


            getLanguageView: (model) ->
                new Language.View.LanguageForm
                    model: model

            updateLanguage: (lang)=>
                @model.set 'user_lang': lang
                $.post AJAXURL + '?action=update-user-language',
                    (
                        user_lang : lang
                    ),@languageUpdated, 'json'


            languageUpdated:(response) =>
                @view.triggerMethod "user:lang:updated"
                _.polyglot = new Polyglot
                                    phrases : response.PHRASES
                App.execute "show:leftnav:app"
                App.execute "show:myprofile:app"

        App.commands.setHandler "show:language:form", (opts) ->
            new Language.Controller opts


		

			
	