define ['app'
        'text!apps/language-translation/language-page-content/templates/languagepagecontentview.html'], (App, languagepagecontentviewTpl)->

            App.module 'LanguageApp.LanguagePageContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguagePageContentLayout extends Marionette.Layout

                    template : languagepagecontentviewTpl

                    className : 'tab-content'

                    regions:
                        originalPageContent: ".original-page-content",
                        translatedPageContent: ".translated-page-content"
                        originalTabAccordion: ".original-tab-accordion",
                        translatedTabAccordion: ".translated-tab-accordion"
                        originalTableContent: ".original-table-content"
                        translatedTableContent: ".translated-table-content"
                        originalSmartTable: ".original-smart-table"
                        translatedSmartTable: ".translated-smart-table"
                        originalSliderContent: ".original-slider-content"
                        translatedSliderContent: ".translated-slider-content"