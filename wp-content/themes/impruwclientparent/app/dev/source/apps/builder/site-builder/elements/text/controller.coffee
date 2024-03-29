define [ 'app', 'apps/builder/site-builder/elements/text/views',
         'apps/builder/site-builder/elements/text/settings/controller' ],
( App )->
   App.module 'SiteBuilderApp.Element.Text', ( Text, App, Backbone, Marionette, $, _ )->

      # menu controller
      class Text.Controller extends App.SiteBuilderApp.Element.Controller

         # intializer
         initialize : ( options )->
            data = {}
            data['en'] = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            data['nb'] = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"

            _.defaults options.modelData,
               element : 'Text'
               content : data

            super( options )

         bindEvents : ->
            # start listening to model events
            #@listenTo @layout.model, "change:content", @renderElement
            super()

         _getTextView : ( model )->
            new Text.Views.TextView
                           model : model

         # setup templates for the element
         renderElement : ()=>
            @removeSpinner()
            view = @_getTextView @layout.model

            # listen to "text:element:blur" event
            # this will pass the current html for the text element.
            # set it to the model. If it is a different markup it will
            # change the model changed property to true
            # save the new markup if the model is changed
            @listenTo view, "text:element:blur", ( html ) =>
               #get original data
               original_data =  @layout.model.get('content')

               if _.isObject original_data
                  data = {}
                  Object.getOwnPropertyNames(original_data).forEach (val, idx, array) ->
                     data[val] = _.stripslashes original_data[val]
               else
                  data = {}
                  data['en'] = _.stripslashes original_data
               
               data[WPML_DEFAULT_LANG] = html

               @layout.model.set 'content', data
               @layout.model.save()

            @layout.elementRegion.show view