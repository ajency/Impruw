define [ 'app'
         'apps/builder/site-builder/elements/title/views'
         'apps/builder/site-builder/elements/title/settings/controller' ], ( App )->
   App.module 'SiteBuilderApp.Element.Title', ( Title, App, Backbone, Marionette, $, _ )->

      # menu controller
      class Title.Controller extends App.SiteBuilderApp.Element.Controller

         # intializer
         initialize : ( options )->
            data = {}
            data['en'] = 'Click here to enter title'
            data['nb'] = 'Klikk her for å skrive inn tittel'

            _.defaults options.modelData,
               element : 'Title'
               content : data
               style : ''
               justify : ''

            @settingsModel = App.request "get:element:settings:options", 'Title'            
            
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
               settingsModel : @settingsModel


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
               #get original data
               original_data =  @layout.model.get('content')

               if _.isObject original_data
                  data = {}
                  Object.getOwnPropertyNames(original_data).forEach (val, idx, array) ->
                     data[val] = _.stripslashes original_data[val]
               else
                  data = {}
                  data['en'] = original_data
               
               data[WPML_DEFAULT_LANG] = html

               @layout.model.set 'content', data
               @layout.model.save()
            @layout.model.save()

            @layout.elementRegion.show view