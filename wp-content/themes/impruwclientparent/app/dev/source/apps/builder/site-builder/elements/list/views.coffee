define ['app'], (App)->

	# Row views
	App.module 'SiteBuilderApp.Element.List.Views', (Views, App, Backbone, Marionette, $, _)->


		class ListItem extends Marionette.ItemView

			tagName : 'li'

			template : '<span class="list-data" contenteditable="true">{{data}}</span>                                   
						<div class="delete"><a href="#" title="Delete Item"><span class="bicon icon-uniF16F"></span></a></div>'

			modelEvents:
				'change' : ->
					if @model.hasChanged()
						@trigger "save:list"		

			events :
				'focus .list-data' :(e)->
					e.stopPropagation()
					$(e.target).addClass 'focus'

				'blur .list-data' :(e)->
					e.stopPropagation()
					$(e.target).removeClass 'focus'
					@model.set 'data', $(e.target).text()

				'click .delete a' : (e)->
					e.stopPropagation()
					@model.destroy 
						index : @model.collection.indexOf @model

		


		class Views.ListView extends Marionette.CompositeView

			className: 'impruw-list'

			template : '<ul class="list-container {{style}} text-{{align}}"></ul>
						<div class="add-another">
                            <span class="bicon icon-uniF193"></span>
                            Add Another Item
                        </div>'

			itemView : ListItem

			itemViewContainer : 'ul.list-container'

			events : 
				'click .add-another' : ->
					@trigger 'add:new:model:to:collection'

			
					