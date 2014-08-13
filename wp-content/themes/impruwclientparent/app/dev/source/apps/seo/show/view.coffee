define [ 'app'
         'text!apps/seo/templates/view.html' ], ( App, formTpl )->
    App.module 'SeoApp.Show.View', ( View, App, Backbone, Marionette, $, _ )->

        # Genral form
        class View.SeoView extends Marionette.ItemView

            template : formTpl

            className : 'seo-container'
