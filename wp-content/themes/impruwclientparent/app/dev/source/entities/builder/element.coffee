define ["app", 'backbone'], (App, Backbone) ->

        App.module "Entities.Elements", (Elements, App, Backbone, Marionette, $, _)->

        	# Generic element model
            class Elements.ElementModel extends Backbone.Model

                # custom id attribute as we will be using post_meta table for saving this 
                # element details
                idAttribute : 'meta_id'

                defaults:->
                    markup : '<span></span>' # this is for the initial spinner

                url :->
                    "#{AJAXURL}"
                
                # name property. this property is used by the sync function to 
                # set the action name. Ex: create-element-model, update-element-model, delete-element-model
                name :->
                    'element-model'

                # override the default sync to make it wirk with wordpress :(
                sync:(method, model, options = {}) ->

                    if not @name
                        throw new Error "'name' property missing"

                    if _.isFunction @name
                        name = @name()
                    else 
                        name = @name

                    # creation the action property with method name and name property
                    # ex: create-model-name, delete-model-name, update-model-name, read-model-name
                    _action = "#{method}-#{name}"
                    
                    switch method
                        when 'create'
                            # set the data property for request
                            options.data = model.toJSON()
                            @removeFields options.data
                            Backbone.send _action,options
                        else
                            Backbone.Model.prototype.sync.apply this, arguments

                # remove fields which should not be sent to server
                removeFields:(data)->
                    # do not delete markup field if element type is text or title
                    # we need to actually store this field with json
                    return if @get('elementType') is 'TextElement' or @get('elementType') is 'TitleElement'

                    delete data.markup

                # parse the json response
                parse : (resp)->
                    return resp.data if resp.code is 'OK'

                
            # PUBLIC API FOR ENitity
            API =
                createElement: (data = {})->
                    
                    element = new Elements.ElementModel
                        
                    element.set data    

                    ele = element.save null,
                                    wait : true

                    element


            # REQUEST HANDLERS
            App.reqres.setHandler "create:new:element",(data) ->
                API.createElement data