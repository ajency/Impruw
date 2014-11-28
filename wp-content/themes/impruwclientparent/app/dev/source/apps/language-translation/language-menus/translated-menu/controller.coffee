define ['app', 'controllers/base-controller'
        'apps/language-translation/language-menus/translated-menu/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageMenuContent.TranslatedMenu', (TranslatedMenu, App, Backbone, Marionette, $, _)->

        class TranslatedMenu.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                #get site model
                @siteModel = siteModel = App.request "get:language:based:site" , @editLang

                #get menu collection
                @menuElementsCollection = App.request "get:site:menu:elements" , @editLang

                @translatedMenuView = @_getTranslatedMenuView @menuElementsCollection

                @listenTo @translatedMenuView, "itemview:itemview:menuitem:updated", @updateMenuElementContent

                #function to load view
                @show @translatedMenuView,
                    loading: true

            _getTranslatedMenuView :(collection)->
                new TranslatedMenu.Views.TranslatedMenuView
                    model: @siteModel
                    collection: collection
                    language: @editLang

            updateMenuElementContent :(outerview,innerview,translatedMenuItemTitle, menuItemId)->

                console.log "Triggered update of menu item"

                model = innerview.model
                
                data =
                    translatedMenuItemTitle: translatedMenuItemTitle
                    menuItemId: menuItemId
                    language: @editLang

                responseFn = (response)=>
                    console.log "Menu item translation Success"

                $.post "#{AJAXURL}?action=update-translated-menu-item", data, responseFn, 'json'

        App.commands.setHandler "translated:menu:app", (opts) ->
            new TranslatedMenu.Controller opts