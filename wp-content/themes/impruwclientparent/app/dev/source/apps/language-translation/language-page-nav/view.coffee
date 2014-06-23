define ['app'
        'text!apps/language-translation/language-page-nav/templates/languagepagenavview.html'], (App, languagepagenavviewTpl)->

            App.module 'LanguageApp.LanguagePageNav.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguagePageNavView extends Marionette.ItemView

                    template : languagepagenavviewTpl
                    
                    onShow: ->
                        # set affix
                        @$el.find('*[data-spy="affix"]').affix()

                        # affix width
                        w = $('.aj-imp-right').width()
                        @$el.find('*[data-spy="affix"]').width(w)

                        m = $('.aj-imp-left').width()
                        @$el.find('*[data-spy="affix"]').css('margin-left', m)