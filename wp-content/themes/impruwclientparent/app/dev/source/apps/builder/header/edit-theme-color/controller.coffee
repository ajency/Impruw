define ['app', 'controllers/base-controller'], (App, AppController)->
    App.module 'EditThemeColorApp', (EditThemeColorApp, App, Backbone, Marionette, $, _)->

        # Controller class for showing header resion
        class EditThemeColorController extends AppController

            # initialize the controller. Get all required entities and show the view
            initialize: (opts)->

                @model = opts.model

                @region = opts.region

                @view = @getView @model

                @listenTo @view, "close:edit:theme:clicked", @closeEditThemeClick

                @listenTo @view, "create:custom:set:color", @createCustomSetColor

                @show @view,
                    loading: true


            getView:(model)->
                $("#theme-color-set").slideUp()

                new EditThemeColorView
                        model : model

            closeEditThemeClick:->
                @region.close()

                $("#theme-color-set").slideDown()

            createCustomSetColor:(formdata)->
                options =
                    url: AJAXURL,
                    method: 'POST',
                    data:
                        action: 'create-custom-theme-color'
                        formdata: formdata
                        modeldata   : @model.toJSON()

                $.ajax(options).done (response)->
                    window.location.reload(true)
                .fail (resp)->
                    console.log 'error'

        class EditThemeColorView extends Marionette.ItemView

            tagName: 'form'

            template: "<div class='edit-colors'>
                            <h5>{{name}}</h5>
                            <div class='color-sets'>
                            </div>
                            <div class='actions'>
                                <button class='btn btn-xs closeCard'>{{#polyglot}}Cancel{{/polyglot}}</button>
                                <button class='btn btn-xs btn-primary applyCard'>{{#polyglot}}Apply{{/polyglot}}</button>
                            </div>
                        </div>"

            onShow:->
                colorSetTpl = @displayEditColorSet()
                @$el.find('.color-sets').append(colorSetTpl)
                @$el.find('.theme_colour').minicolors()

            serializeData:->
                data = super()
                data.name = _.polyglot.t @model.get 'name'
                data

            events:
                'click .closeCard' :(e)->
                    e.preventDefault()
                    @trigger "close:edit:theme:clicked"

                'click .applyCard' :(e)->
                    e.preventDefault()
                    formdata = Backbone.Syphon.serialize @
                    #setValues = @mergeModelFormdata(formdata)
                    @$el.find('.applyCard').text('Applying..')
                    @trigger "create:custom:set:color" , formdata

            displayEditColorSet :->
                colorSetHtml = " "
                _.each @model.attributes, (attributeValue, attributeName) =>
                    if attributeName != 'name'
                        themeTitle = _.polyglot.t attributeValue.title
                        themeDescription = _.polyglot.t attributeValue.description
                        colorSetHtml += "<div class='color row'>
                                            <div class='col-sm-2'>
                                                <input type='hidden' name='#{attributeName}' class='theme_colour' readonly value='#{attributeValue.color}'>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>#{themeTitle}</h6>
                                                <p>#{themeDescription}</p>
                                            </div>
                                        </div>"
                colorSetHtml

        App.commands.setHandler "edit:theme:color:set", (opts)->
            new EditThemeColorController opts
		