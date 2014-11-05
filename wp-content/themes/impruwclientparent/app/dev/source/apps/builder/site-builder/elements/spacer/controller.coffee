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
               type : 'blank'
               style : 'default'
               height : 20

            super( options )

         bindEvents : ->
            # start listening to model events
            @listenTo @layout.model, "change:style change:type", @renderElement
            super()

         _getSpacerView : ( model )->
            new Spacer.Views.SpacerView
               model : model


         # setup templates for the element
         renderElement : ()=>
            @removeSpinner()
            # get the address element template
            view = @_getSpacerView @layout.model

            @listenTo view , 'set:spacer:height',(height)=>
               @layout.model.set 'height',height
               @layout.model.save()

            @layout.elementRegion.show view