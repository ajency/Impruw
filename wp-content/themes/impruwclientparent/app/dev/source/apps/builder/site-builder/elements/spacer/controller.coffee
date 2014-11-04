define [ 'app'
         'apps/builder/site-builder/elements/spacer/views'
         'apps/builder/site-builder/elements/spacer/settings/controller' ],
( App )->
   App.module 'SiteBuilderApp.Element.Spacer', ( Spacer, App, Backbone, Marionette, $, _ )->

      # menu controller
      class Spacer.Controller extends App.SiteBuilderApp.Element.Controller

         # intializer
         initialize : ( options )->

            _.defaults options.modelData,
               element : 'Spacer'

            super( options )

         bindEvents : ->
            # start listening to model events
            @listenTo @layout.model, "change:style", @renderElement
            super()

         _getSpacerView : ( model )->
            new Spacer.Views.SpacerView
               model : model


         # setup templates for the element
         renderElement : ()=>
            @removeSpinner()
            # get the address element template
            view = @_getSpacerView @layout.model
            @layout.elementRegion.show view