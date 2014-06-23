define ['app'
        'text!apps/language-translation/language-page-content/templates/languagepagecontentview.html'], (App, languagepagecontentviewTpl)->

            App.module 'LanguageApp.LanguagePageContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguagePageContentView extends Marionette.ItemView

                    template : languagepagecontentviewTpl

                    className : 'tab-content'
                    
                    onShow: ->
                        # set affix
                        @$el.find('*[data-spy="affix"]').affix()

                        # affix width
                        w = $('.aj-imp-right').width()
                        @$el.find('*[data-spy="affix"]').width(w)

                        m = $('.aj-imp-left').width()
                        @$el.find('*[data-spy="affix"]').css('margin-left', m)