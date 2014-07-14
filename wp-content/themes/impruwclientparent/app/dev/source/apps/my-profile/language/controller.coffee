define [ 'app', 'controllers/base-controller'
         'apps/my-profile/language/views' ], ( App, AppController )->
    App.module 'MyProfileApp.Language', ( Language, App, Backbone, Marionette, $, _ )->
        class Language.Controller extends AppController

            initialize : ( opts )->
                {model} = opts

                @model = model

                @view = @getLanguageView @model

                @listenTo @view, "update:user:lang:click", @updateLanguage

                @show @view,
                    loading : true


            getLanguageView : ( model ) ->
                new Language.View.LanguageForm
                    model : model

            updateLanguage : ( lang )=>
                @model.set lang
                @model.save null,
                    wait : true
                    onlyChanged : true
                    success : @languageUpdated


            languageUpdated : ( model , response ) =>
                #since page does not get re-loaded, jquery validate msgs and modal titles and similiar js strings
                # reflect previously selected language strings
                #TODO so either re-load the page on language change or find another solution
                @view.triggerMethod "user:lang:updated"
                window.PHRASES = response.PHRASES
                _.polyglot = new Polyglot
                    phrases : window.PHRASES
                App.execute "show:leftnav:app"
                App.execute "show:myprofile:app"

        App.commands.setHandler "show:language:form", ( opts ) ->
            new Language.Controller opts


		

			
	