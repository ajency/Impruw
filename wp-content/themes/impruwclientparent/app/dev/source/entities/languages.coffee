define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Languages", (Languages, App, Backbone, Marionette, $, _)->

       # Language model
        class Languages.LanguageModel extends Backbone.Model
            name: 'language'
            idAttribute: 'code'

		#Languages Collection class
        class Languages.LanguagesCollection extends Backbone.Collection

            model: Languages.LanguageModel

            url: ->
                AJAXURL + '?action=get-languages'

        languages = new Languages.LanguagesCollection
        languages.fetch()

        #Public API
        API =
            getLanguages: ()->
                languages

            getSelectedLanguages: ()->
                #console.log "Inside entities "+codes
                # models = languages.filter ->
                languages = this.getLanguages()

                selectedLanguages = new Languages.LanguagesCollection 
                selectedLanguages.set (languages.where 'selectStatus': true )
                selectedLanguages


        #App request handlers
        App.reqres.setHandler "get:all:languages", ->
            API.getLanguages()  

        App.reqres.setHandler "get:selected:languages", ->
            API.getSelectedLanguages()                                                  