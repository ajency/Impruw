define ['app', 'controllers/base-controller'
        'apps/language-translation/language-selection/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageSelection', (LanguageSelection, App, Backbone, Marionette, $, _)->

        class LanguageSelection.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @siteModel= App.request 'get:site:model'

                #get language collection
                @collection = collection = App.request "get:all:languages"

                @languageSelectionView = @_getLanguageView @collection, @siteModel

                @listenTo @languageSelectionView, "itemview:language:updated", @updateLanguageModel
                @listenTo @languageSelectionView, "update:enabled:languages", @updateEnabledLanguages


                #function to load view
                @show @languageSelectionView,
                    loading: true

            _getLanguageView : (collection, model)->
                new LanguageSelection.Views.LanguageSelectionView
                    collection: collection
                    model: model

            updateLanguageModel : (view, checkbox)->
                model = view.model
                collection = model.collection
                data = []
                if checkbox.is(':checked')
                    data = {selectStatus:true}
                else
                    data = {selectStatus:false}

                model.set data
                

            updateEnabledLanguages: (enabledLanguageCodes)=>
                data = {enabledlanguages: enabledLanguageCodes}

                responseFn = (response)=>
                    selLang = JSON.parse(response.data)

                    #request for filtered collection App.request
                    selectedLanguagesCollection = App.request "get:selected:languages" 

                    #trigger method on view with this collection so that view can be populated
                    @languageSelectionView.triggerMethod "selected:languages:enabled", selectedLanguagesCollection 

                # update enabled languages
                $.post "#{AJAXURL}?action=update-enabled-languages", data, responseFn, 'json'

        App.commands.setHandler "show:language:selection:app", (opts) ->
            new LanguageSelection.Controller opts

			