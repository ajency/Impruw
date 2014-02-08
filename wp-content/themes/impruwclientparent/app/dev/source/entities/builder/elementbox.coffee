define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.ElementBox", (ElementBox, App, Backbone, Marionette, $, _)->

            # Element Model
            class ElementBox.ElementModel extends Backbone.Model

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
                    
                    elements.url = AJAXURL + '?action=get-elementbox-elements'
                    
                    elements.fetch
                                reset : true
                                data  : param
                                
                    elements


            # REQUEST HANDLERS
            App.reqres.setHandler "get:elementbox:elements", ->
                API.getElements()
