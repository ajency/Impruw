define ['app', 'apps/builder/site-builder/elements/link/views',
        'apps/builder/site-builder/elements/link/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.Link', (Link, App, Backbone, Marionette, $, _)->

        # menu controller
        class Link.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'Link'
                    align : 'left'
                    link: '#'
                    text: 
                        'en':'Add link'
                        'nb': _.polyglot.t('Add link')
                    target: '_self'

                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:style change:link change:text change:target change:align change:link_page_id", @renderElement
                super()

            _getLinkView: (model)->
                new Link.Views.LinkView
                    model: model

            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                view = @_getLinkView @layout.model

                @layout.elementRegion.show view