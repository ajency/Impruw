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
                new EditThemeColorView
                        model : model

            closeEditThemeClick:->
                @region.close()

            createCustomSetColor:(formdata)->
                options =
                    url: AJAXURL,
                    method: 'POST',
                    data:
                        action: 'create-custom-theme-color'
                        formdata: formdata

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
                                <button class='btn btn-xs closeCard'>Cancel</button>
                                <button class='btn btn-xs btn-primary applyCard'>Apply</button>
                            </div>
                        </div>"

            onShow:->
                colorSetTpl = @displayEditColorSet()
                @$el.find('.color-sets').append(colorSetTpl)
                @$el.find('.theme_colour').minicolors()

            events:
                'click .closeCard' :->
                    @trigger "close:edit:theme:clicked"

                'click .applyCard' :(e)->
                    e.preventDefault()
                    formdata = Backbone.Syphon.serialize @
                    @$el.find('.applyCard').text('Applying..')
                    @trigger "create:custom:set:color" , formdata

            displayEditColorSet :->
                colorSetHtml = " "
                _.each @model.attributes, (colorValue, attributeName) =>
                    if attributeName != 'name'
                        colorSetHtml += "<div class='color row'>
                                            <div class='col-sm-2'>
                                                <span class='color-picker-box' style='background: #{colorValue};'>Click to Edit</span>
                                                <input type='hidden' name='#{attributeName}' class='theme_colour' readonly value=''>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>#{attributeName}</h6>
                                                <p>Used in Headings, Links, Menu, Buttons and Accents</p>
                                            </div>
                                        </div>"
                colorSetHtml

        App.commands.setHandler "edit:theme:color:set", (opts)->
            new EditThemeColorController opts
					



								
