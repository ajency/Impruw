define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.ElementBox", (ElementBox, App, Backbone, Marionette, $, _)->

            # Element Model
            class ElementBox.ElementModel extends Backbone.Model

                idAttribute : 'element'

            # Element collection
            class ElementBox.ElementCollection extends Backbone.Collection

                # model
                model : ElementBox.ElementModel

                # get all regular elements
                regularElements :->
                    @where
                        type : 'regular'

                # room elements
                roomElements :->
                    @where
                        type : 'room'

                # parse
                parse: (resp)->

                    return resp.data if resp.code is 'OK'

                    App.vent.trigger "elementbox:collection:fetch:error", resp

                
            # PUBLIC API FOR ENitity
            API =
                getElements: (param = {})->

                    elements = new ElementBox.ElementCollection

                    App.request "set:collection", 'elementbox', elements
                    
                    elements.url = AJAXURL + '?action=get-elementbox-elements'
                    
                    elements.fetch
                                reset : true
                                data  : param
                                
                    elements

                # returns the element settings options
                getElementSettingOptions:(ele)->

                    element = App.request "get:collection:model", 'elementbox', ele

                    element


            # REQUEST HANDLERS
            App.reqres.setHandler "get:elementbox:elements", ->
                API.getElements()

            App.reqres.setHandler "get:element:settings:options",(ele)->
                API.getElementSettingOptions ele

