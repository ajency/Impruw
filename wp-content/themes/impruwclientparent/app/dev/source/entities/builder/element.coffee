define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Elements", (Elements, App, Backbone, Marionette, $, _)->

        	# Generic element model
            class Elements.ElementModel extends Backbone.Model

                url :->
                    "#{AJAXURL}?action=element"
                
            # PUBLIC API FOR ENitity
            API =
                createElement: (data)->

                    element = new Elements.ElementModel

                    element.save(data)

                    element


            # REQUEST HANDLERS
            App.reqres.setHandler "create:new:element",(data) ->
                API.createElement data