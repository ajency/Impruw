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

                
            # PUBLIC API FOR ENitity
            API =
                getElements: (param = {})->

                    media = new ElementBox.ElementCollection
                    
                    media.url = AJAXURL + '?action=get-elementbox-elements'
                    
                    media.fetch
                                reset : true
                                data  : param
                                
                    media


            # REQUEST HANDLERS
            App.reqres.setHandler "get:elementbox:elements", ->
                API.getElements()
