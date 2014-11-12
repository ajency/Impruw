define ['app', 'controllers/base-controller'], (App, AppController)->

   App.module 'ChangeThemeColorApp', (ChangeThemeColorApp, App, Backbone, Marionette, $, _)->

        # Controller class for showing theme color edits
        class ChangeThemeColorController extends AppController

            # initialize the controller. Get all required entities and show the view
            initialize: (opt = {})->
                @layout = @getLayout()

                @listenTo @layout, "show", @showColorSet

                @listenTo @layout ,"edit:theme:color",@editThemeColor

                @show @layout,
                    loading: true


            getLayout: ->
                new ChangeThemeColorLayout

            showColorSet: ->
                themeColorCollection = App.request "get:themes:color:collection"

                @themeColorSetView = @getView themeColorCollection

                @listenTo @themeColorSetView, "childview:change:theme:color", @changeThemeColorClick

                @listenTo @themeColorSetView, "childview:edit:theme:color:clicked", @editThemeColorClick

                @layout.themecolorsetRegion.show @themeColorSetView

            editThemeColor:(model)->
                App.execute "edit:theme:color:set",
                    region : @layout.themecolorEditRegion
                    model  : model

            getView: (themeColorCollection)->
                new ChangeThemeColorApp.Views.ThemeColorSetView
                    collection: themeColorCollection

            changeThemeColorClick: (iv, model)->
                formdata = model.toJSON()

                options =
                    url: AJAXURL,
                    method: 'POST',
                    data:
                        action: 'change-theme-color'
                        formdata: formdata

                $.ajax(options).done (response)->
                    window.location.reload(true)
                .fail (resp)->
                        console.log 'error'

            editThemeColorClick:(iv,model)->
                @layout.trigger "edit:theme:color" , model


        class ChangeThemeColorLayout extends Marionette.LayoutView

            template: '<div id="theme-color-set"></div>
            		   <div id ="theme-color-edit"></div>'

            className: 'color-picker-container'

            dialogOptions:
                modal_title: _.polyglot.t 'Choose Theme Colors'
                modal_size: 'medium-modal'

            regions:
                themecolorsetRegion: '#theme-color-set'
                themecolorEditRegion : '#theme-color-edit'

        App.commands.setHandler "show:theme:color:set", (opts)->
            new ChangeThemeColorController opts
					



								
