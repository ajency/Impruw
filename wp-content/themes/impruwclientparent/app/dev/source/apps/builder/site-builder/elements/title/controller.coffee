define [ 'app'
         'apps/builder/site-builder/elements/title/views'
         'apps/builder/site-builder/elements/title/settings/controller' ], ( App )->
   App.module 'SiteBuilderApp.Element.Title', ( Title, App, Backbone, Marionette, $, _ )->

      # menu controller
      class Title.Controller extends App.SiteBuilderApp.Element.Controller

         # intializer
         initialize : ( options )->
            data = {}
            data[WPML_DEFAULT_LANG] = 'Click here to enter title'

            _.defaults options.modelData,
               element : 'Title'
               content : data

            super( options )

         bindEvents : ->
            # start listening to model events
            @listenTo @layout.model, "change:style", @renderElement
            @layout.elementRegion.on 'show', ( view )=>
               @layout.setStyle _.slugify @layout.model.get 'style'
            super()

         _getTitleView : ( model )->
            new Title.Views.TitleView
               model : model


         # setup templates for the element
         renderElement : ()=>
            @removeSpinner()
            view = @_getTitleView @layout.model

            # listen to "text:element:blur" event
            # this will pass the current html for the text element.
            # set it to the model. If it is a different markup it will
            # change the model changed property to true
            # save the new markup if the model is changed
            @listenTo view, "title:element:blur", ( html ) =>
               data = {}
               data[WPML_DEFAULT_LANG] = html
               @layout.model.set 'content', data
               @layout.model.save() if @layout.model.hasChanged()

            @layout.elementRegion.show view