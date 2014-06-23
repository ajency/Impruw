define ['app'
        'text!apps/language-translation/language-page-rooms/templates/languagepageroomsview.html'], (App, languagepageroomsviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguagePageRoomsView extends Marionette.ItemView

                    template : languagepageroomsviewTpl

                    className : 'tab-content'
                    
                    onShow: ->
                        # set affix
                        @$el.find('*[data-spy="affix"]').affix()

                        # affix width
                        w = $('.aj-imp-right').width()
                        @$el.find('*[data-spy="affix"]').width(w)

                        m = $('.aj-imp-left').width()
                        @$el.find('*[data-spy="affix"]').css('margin-left', m)