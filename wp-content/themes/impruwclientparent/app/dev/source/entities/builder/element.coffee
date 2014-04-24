define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Elements", (Elements, App, Backbone, Marionette, $, _)->

			# Generic element model
			class Elements.ElementModel extends Backbone.Model

				# custom id attribute as we will be using post_meta table for saving this 
				# element details
				idAttribute : 'meta_id'

				defaults:->
					style       : ''
					draggable   : true
				
				name : 'element'

				# override destroy implementation
				# when an element is removed from builder it must be removed from DB
				# as previous revision of the same page will need it.
				# so, skip the delete ajax call. only remove the model
				destroy : (options) ->
					options = (if options then _.clone(options) else {})
					model = this
					success = options.success
					destroy = ->
						model.trigger "destroy", model, model.collection, options
						return

					options.success = (resp) ->
						destroy()  if options.wait or model.isNew()
						success model, resp, options  if success
						model.trigger "sync", model, resp, options  unless model.isNew()
						return

					if @isNew()
						options.success()
						return false
					
					destroy() unless options.wait
				

			# element collection class
			class ElementsCollection extends Backbone.Collection

				model : Elements.ElementModel

				url:->
					"#{AJAXURL}?action=fetch-elements"


			recoveredElements = new ElementsCollection
			recoveredElements.fetch
								data :
									type : 'recovered'


			# PUBLIC API FOR ENitity
			API =
				# create a new element and save it to server
				createElement: (data = {})->
					
					element = new Elements.ElementModel                        
					element.set data    
					if element.get('element') isnt 'Row' and element.get('element') isnt 'Column' 
						if element.isNew()
							element.save null,
									 wait : true
								
					element

				# returns the model of the recovered element
				getRecoveredElement:(metaId = 0)->

					return {} if metaId is 0

					element = recoveredElements.get parseInt metaId

					element || {}


			# REQUEST HANDLERS
			App.reqres.setHandler "create:new:element",(data) ->
				API.createElement data

			App.reqres.setHandler "get:recovered:element",(metaId)->
				API.getRecoveredElement metaId