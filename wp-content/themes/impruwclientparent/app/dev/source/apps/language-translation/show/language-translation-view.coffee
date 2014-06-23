define ['app'
        'text!apps/language-translation/show/templates/languageview.html'], (App, languageviewTpl)->

            App.module 'LanguageApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageLayout extends Marionette.Layout

                    template : languageviewTpl

                    regions: 
                        #TODO change to proper divs
                        languageSelectionRegion: ".pick-language-container",
                        languageTranslateRegion: ".aj-imp-dash-widget",


                    onShow: ->
                        @$el.find('select').selectpicker()

                        @$el.find('input[type="checkbox"]').checkbox()

                        # set affix
                        @$el.find('*[data-spy="affix"]').affix()

                        # affix width
                        w = $('.aj-imp-right').width()
                        @$el.find('*[data-spy="affix"]').width(w)

                        m = $('.aj-imp-left').width()
                        @$el.find('*[data-spy="affix"]').css('margin-left', m)