define ['app', 'controllers/base-controller'
        'apps/language-translation/show/language-translation-view'], (App, AppController)->
    App.module 'LanguageApp.Show', (Show, App, Backbone, Marionette, $, _)->
        class Show.Controller extends AppController

            initialize: (options)->
                @languageLayout = @_getLanguageLayout()

                #function to load view
                @show @languageLayout,
                    loading: true

                App.vent.trigger "set:active:menu", 'language'

                @listenTo @languageLayout, 'show', =>
                    App.execute 'show:language:selection:app',
                        region: @languageLayout.languageSelectionRegion

                @listenTo @languageLayout.languageSelectionRegion, "load:page:nav:bar", @_loadPageNavBar

                @listenTo @languageLayout.languagePageNav, "load:page:room:content", @_loadPageRoomContent
                @listenTo @languageLayout.languagePageNav, "load:other:page:content", @_loadPageContent
                @listenTo @languageLayout.languagePageNav, "load:site:content", @_loadSiteContent
                @listenTo @languageLayout.languagePageNav, "load:header:content", @_loadHeaderContent
                @listenTo @languageLayout.languagePageNav, "load:footer:content", @_loadFooterContent


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

            _loadSiteContent: (editingLanguage)=>
                App.execute "show:site:content:app",
                    region: @languageLayout.languagePageRooms
                    editLang: editingLanguage

            _loadHeaderContent: (editingLanguage)=>
                App.execute "show:header:content:app",
                    region: @languageLayout.languagePageRooms
                    editLang: editingLanguage

            _loadFooterContent: (editingLanguage)=>
                App.execute "show:footer:content:app",
                    region: @languageLayout.languagePageRooms
                    editLang: editingLanguage

            _loadPageContent: (editingLanguage, pageId, originalId)=>
                App.execute "show:language:page:content:app",
                    region: @languageLayout.languagePageRooms
                    editLang : editingLanguage
                    pageId : pageId
                    originalId : originalId



