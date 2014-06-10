define ['app'
        'apps/builder/site-builder/elements/contactform/views'
        'apps/builder/site-builder/elements/contactform/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.ContactForm', (ContactForm, App, Backbone, Marionette, $, _)->

        # menu controller
        class ContactForm.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'ContactForm'

                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:style", @renderElement
                super()

            _getContactFormView: (template, className)->
                data = {}
                data.clsName = className
                data.template = template if not _(template).isBlank()
                new ContactForm.Views.ContactFormView data

            # setup templates for the element
            renderElement: ()=>
                # get the address element template
                template = if not _(@layout.model.get('style')).isBlank() then @_getElementTemplate(@layout.model) else ''
                className = _.slugify @layout.model.get 'style'

                view = @_getContactFormView template, className
                @layout.elementRegion.show view