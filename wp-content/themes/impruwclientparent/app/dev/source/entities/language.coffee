define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Language", (Language, App, Backbone, Marionette, $, _)->

        # Language model
        class Language.LanguageModel extends Backbone.Model

            name: 'language'
            idAttribute: 'ID'
            defaults:
                'ID' : 1

        language = new Language.LanguageModel
        language.fetch()

        #PUBLIC API
        API =
            getLanguageDetails: ()->
                language


        #REQUEST HANDLERS
        App.reqres.setHandler "get:language:model", (options = {}) ->
            API.getLanguageDetails()