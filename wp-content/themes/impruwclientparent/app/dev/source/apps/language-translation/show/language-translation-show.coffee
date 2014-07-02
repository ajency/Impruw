define ['app', 'controllers/base-controller'
        'apps/language-translation/show/language-translation-view'], (App, AppController)->
    App.module 'LanguageApp.Show', (Show, App, Backbone, Marionette, $, _)->
        class Show.Controller extends AppController

            initialize: (options)->
                @languageLayout = @_getLanguageLayout()

                #function to load view
                @show @languageLayout,
                    loading: true


                @listenTo @languageLayout, 'show', =>
                    App.execute 'show:language:selection:app',
                        region: @languageLayout.languageSelectionRegion

                @listenTo @languageLayout.languageSelectionRegion, "load:page:nav:bar", @_loadPageNavBar

                @listenTo @languageLayout.languagePageNav, "load:page:room:content", @_loadPageRoomContent
                @listenTo @languageLayout.languagePageNav, "load:other:page:content", @_loadPageContent


            _getLanguageLayout: ->
                new Show.Views.LanguageLayout

            _loadPageNavBar: (selectedEditingLanguage) =>
                App.execute "show:language:page:nav:app",
                    region: @languageLayout.languagePageNav
                    language: selectedEditingLanguage

            _loadPageRoomContent: (editingLanguage)=>
                App.execute "show:language:page:rooms:app",
                    region: @languageLayout.languagePageRooms
                    editLang: editingLanguage

            _loadPageContent: (editingLanguage, pageId, originalId)=>
                App.execute "show:language:page:content:app",
                    region: @languageLayout.languagePageRooms
                    editLang : editingLanguage
                    pageId : pageId
                    originalId : originalId



