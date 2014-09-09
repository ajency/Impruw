define [ 'app'
         'apps/builder/site-builder/elements/address/views'
         'apps/builder/site-builder/elements/address/settings/controller' ],
( App )->
   App.module 'SiteBuilderApp.Element.Address', ( Address, App, Backbone, Marionette, $, _ )->

      # menu controller
      class Address.Controller extends App.SiteBuilderApp.Element.Controller

         # intializer
         initialize : ( options )->

            _.defaults options.modelData,
               element : 'Address'
               street : 'Street'
               city : 'City'
               postal_code : '4000212'
               country : 'Country'
               phone_no : '9999888877'
               email : 'demo@email.com'
               style : 'Default Style'

            if _.isObject window.HOTELADDRESS
               options.modelData.street = window.HOTELADDRESS.street
               options.modelData.city = window.HOTELADDRESS.city
               options.modelData.country = window.HOTELADDRESS.country
               options.modelData.phone_no = window.HOTELADDRESS.other_phone_no[0]
               options.modelData.email = window.HOTELADDRESS.site_email
               
            if window.ISDEMOTHEME is '1'
               options.modelData.email = 'info@impruw.com'


            super( options )

         bindEvents : ->
            # start listening to model events
            @listenTo @layout.model, "change:style", @renderElement
            super()

         _getAddressView : ( model, template )->
            new Address.Views.AddressView
               model : model
               template : template


         # setup templates for the element
         renderElement : ()=>
            @removeSpinner()
            # get the address element template
            template = @_getElementTemplate @layout.model
            view = @_getAddressView @layout.model, template
            @layout.elementRegion.show view