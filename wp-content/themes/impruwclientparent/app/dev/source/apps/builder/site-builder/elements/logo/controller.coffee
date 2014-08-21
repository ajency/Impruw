define ['app', 'apps/builder/site-builder/elements/logo/views',
        'apps/builder/site-builder/elements/logo/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.Logo', (Logo, App, Backbone, Marionette, $, _)->

        # menu controller
        class Logo.Controller extends App.SiteBuilderApp.Element.Image.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'Logo'
                    image_id: 0
                    size: 'thumbnail'
                    align: 'left'
                    heightRatio : 'auto'
                    topRatio : 0

                super(options)

            _getImageView: (imageModel)->
                new Logo.Views.LogoView
                    model: imageModel
                    imageHeightRatio : @layout.model.get 'heightRatio'
                    positionTopRatio : @layout.model.get 'topRatio'
                    templateHelpers: @_getTemplateHelpers()

            # bindEvents: ->
            #     # start listening to model events
            #     @listenTo @layout.model, "change:image_id", @renderElement
            #     @listenTo @layout.model, "change:align", @renderElement
            #     super()

            # _getLogoView: (imageModel)->
            #     new Logo.Views.LogoView
            #                 model: imageModel

            # # setup templates for the element
            # renderElement: ()=>
            #     @removeSpinner()
            #     # get logo attachment
            #     if window.LOGOID isnt 0
            #         imageModel = App.request "get:media:by:id", window.LOGOID
            #     else
            #         imageModel = new Backbone.Model

            #     App.execute "when:fetched", imageModel, =>
            #         view = @_getLogoView imageModel
            #         @listenTo view, "show:media:manager", ->
            #             App.navigate "media-manager", trigger: true
            #         @layout.elementRegion.show view