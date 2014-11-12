define ['app'
        'text!apps/language-translation/language-site-details/templates/languagesitedetailsview.html'], (App, languagesitedetailsviewTpl)->

            App.module 'LanguageApp.LanguageSiteContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.LanguageSiteContentLayout extends Marionette.LayoutView

                    template : languagesitedetailsviewTpl

                    className : 'tab-content'

                    regions:
                        originalSiteContent: ".original-site-content",
                        translatedSiteContent: ".translated-site-content"