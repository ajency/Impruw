define ['app'
        'text!apps/language/show/templates/languageview.html'], (App, languageviewTpl)->

            App.module 'LanguageApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageView extends Marionette.ItemView

                    template : languageviewTpl

            onRender: ->

            onShow: ->
                @$el.scrollSections()

                #console.log model
                @$el.find('select').selectpicker()

                # set affix
                @$el.find('*[data-spy="affix"]').affix()

                # affix width
                w = $('.aj-imp-right').width()
                @$el.find('*[data-spy="affix"]').width(w)

                m = $('.aj-imp-left').width()
                @$el.find('*[data-spy="affix"]').css('margin-left', m)