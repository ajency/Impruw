define ['app'
        'text!apps/language-translation/language-header/show/templates/languagepageheaderview.html'], (App, pageheaderviewTpl)->

            App.module 'LanguageApp.LanguageHeaderContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageHeaderContentLayout extends Marionette.Layout

                    template : pageheaderviewTpl

                    className : 'tab-content'

                    regions:
                        originalHeaderContent: ".original-page-header-content",
                        translatedHeaderContent: ".translated-page-header-content"