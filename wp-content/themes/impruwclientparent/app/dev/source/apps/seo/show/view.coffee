define [ 'app'
         'text!apps/seo/templates/view.html' ], ( App, formTpl )->
    App.module 'SeoApp.Show.View', ( View, App, Backbone, Marionette, $, _ )->

        # Genral form
        class View.SeoView extends Marionette.Layout

            template : formTpl

            className : 'seo-container'

            regions: 
                seoLanguageSelection: "#js-seo-language-selection",
                seoPageNav: "#js-seo-page-nav",
                seoPageContent: "#js-seo-page-tabs"
