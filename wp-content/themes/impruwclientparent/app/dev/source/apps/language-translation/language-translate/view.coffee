define ['app'
        'text!apps/language-translation/language-translate/templates/languagetranslationview.html'], (App, languagetranslationviewTpl)->

            App.module 'LanguageApp.LanguageTranslate.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageTranslateView extends Marionette.ItemView

                    template : languagetranslationviewTpl
                    
                    onShow: ->
                        # set affix
                        @$el.find('*[data-spy="affix"]').affix()

                        # affix width
                        w = $('.aj-imp-right').width()
                        @$el.find('*[data-spy="affix"]').width(w)

                        m = $('.aj-imp-left').width()
                        @$el.find('*[data-spy="affix"]').css('margin-left', m)