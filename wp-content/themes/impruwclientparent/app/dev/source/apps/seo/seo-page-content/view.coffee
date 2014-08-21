define ['app'
        'text!apps/seo/templates/seo-page-view.html'], (App, seoPageTpl )->

            App.module 'SeoApp.SeoPageContent.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.SeoPageContentView extends Marionette.ItemView

                    template: seoPageTpl

                    className : 'tab-content'




