define ['app'], (App)->

	# Row views
	App.module 'SiteBuilderApp.Element.SmartTable.Views', (Views, App, Backbone, Marionette, $, _)->


		class SmartTableItem extends Marionette.ItemView

			tagName : 'dl'

			className : 'smart-cell'

			template : '{{#dtExist}}<dt contenteditable="true" data-key="dt">{{dt}}</dt>{{/dtExist}}
						{{#ddExist}}<dd contenteditable="true" data-key="dd">{{dd}}</dd>{{/ddExist}}
						{{#emExist}}<dd class="emphasis" contenteditable="true" data-key="em">{{em}}</dd>{{/emExist}}
						<dd class="delete"><a href="#" title="Delete Item"><span class="bicon icon-uniF16F"></span></a></dd>'

			mixinTemplateHelpers :(data)->
				data = super data
				data.dtExist = true if data.dt? and data.dt isnt ''
				data.ddExist = true if data.dd? and data.dd isnt ''
				data.emExist = true if data.em? and data.em isnt ''
				data

			modelEvents:
				'change' : ->
					if @model.hasChanged()
						@trigger "save:smart:table"

				# 'destroy' : ->
				# 	@trigger 'save:smart:table'

			events :
				'focus dt, dd' :(e)->
					e.stopPropagation()
					$(e.target).addClass 'focus'

				'blur dt, dd' :(e)->
					e.stopPropagation()
					$(e.target).removeClass 'focus'
					@model.set $(e.target).attr('data-key'), $(e.target).text()
					# console.log @model.toJSON()

				'click .delete a' : (e)->
					e.stopPropagation()
					@model.destroy 
						index : @model.collection.indexOf @model

			# onShow : ->
			# 	console.log @model
			# 	console.log 


		class Views.TableView extends Marionette.CompositeView

			className: 'smart-table'

			template : '<div class="smart-content"></div>
						<div class="add-another">
                            <span class="bicon icon-uniF193"></span>
                            Add Another Item
                        </div>'

			itemView : SmartTableItem

			itemViewContainer : '.smart-content'

			events : 
				'click .add-another' : ->
					@trigger 'add:new:model:to:collection'

			onRender: ->
					style = _.slugify @model.get 'style'
					@$el.addClass style
					innerStyle = _.slugify @model.get 'innerStyle'
					@$el.addClass innerStyle

			onShow : ->
					