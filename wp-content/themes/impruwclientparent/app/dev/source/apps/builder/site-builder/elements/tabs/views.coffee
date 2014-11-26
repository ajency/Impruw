define ['app'
],(App)->
	App.module 'SiteBuilderApp.Element.Tabs.Views', (Views,App)->


		class TabPaneView extends Marionette.ItemView

			tagName : 'div'

			className : ' tab-pane column empty-column'

			template : ''

			onRender : ->
				@$el.attr('role','tabpanel').attr 'id', _.uniqueId 'tab-'
				@$el.attr('data-name',@model.get('tabName'))

			onShow : ->
				 @$el.sortable
                    revert: 'invalid'
                    items: '> .element-wrapper'
                    connectWith: '.droppable-column, .droppable-column .column'
                    handle: '.aj-imp-drag-handle'
                    start: (e, ui)->
#                        ui.placeholder.height ui.item.height()
                        window.dragging = true
                        return
                    stop: (e, ui)->
                        window.dragging = false
                        return
                    helper: @_getHelper
                    opacity: .65
                    placeholder: "ui-sortable-placeholder builder-sortable-placeholder"
                    out : (evt,ui)=>
                        @$el.closest('.tab-container').closest('.element-wrapper').removeClass('hover-class')

                        window.dragging = false
                        return
                    over : ()=>
                        _.delay =>
                            @$el.closest('.tab-container').closest('.element-wrapper').addClass('hover-class')
                        ,100
                        window.dragging = true
                        return
                    remove: (evt, ui)=>
                        @$el.trigger "element:moved", $(evt.target)
                        if $(evt.target).children().length is 0
                            $(evt.target).addClass 'empty-column'
                    update: (e, ui)=>
                        # @$el.trigger "element:moved", $(e.target)
                        if ui.item.find('form').find('input[name="element"]').val() is 'Row'
                            ui.item.children('.element-markup').children().trigger 'row:is:moved',
                                ui.item.children('.element-markup').children().prop 'id'
                        $(e.target).removeClass 'empty-column'

		class Views.TabsView extends Marionette.CompositeView

			className : 'tab-container tabs-style-flip'

			template : ' 

					  <!-- Nav tabs -->
					  <ul class="nav nav-tabs nav-justified" role="tablist">
						
						
					  </ul>
					  <div class="add-tab"><span class="bicon icon-uniF193"></span>&nbsp;Add Tab</div>

					  <!-- Tab panes -->
					  <div class="tab-content">
						
					  </div>'

			itemView : TabPaneView

			itemViewContainer : '.tab-content'

			collectionEvents : 
				'add' : 'collectionAdded'



			events : 
				'click .add-tab' : ->
					@collection.add
						position : @collection.size() + 1
						element : 'TabPane'
						elements : []
						tabName : 'tab'

				'blur .nav-tabs span' :(evt)->
					@$el.find("#{$(evt.target).parent().attr('href')}").attr 'data-name',$(evt.target).text()


			onRender : ->
				@$el.attr 'role',"tabpanel"



			
			initialize: (opt = {})->
				@collection = new Backbone.Collection
				if @model.get('elements').length is 0
					for i in [1, 2]
						@collection.add
							position: i
							element: 'TabPane'
							tabName : 'tab'
							# className: 6
							elements: []
							,{silent: true}
				else
					for column in @model.get('elements')
						col = _.clone column
						delete col.elements
						@collection.add col,{silent: true}
						
			onAfterItemAdded : (itemView)->
				id = itemView.$el.attr 'id'

				@$el.find('ul.nav-tabs').append '<li role="presentation" class=""><a href="#'+id+'" role="tab" data-toggle="tab"><span contenteditable="true">'+itemView.model.get('tabName')+'</span></a></li>'

				


			onShow: ->
				@$el.tabs()

			collectionAdded :->
				_.delay =>
					@$el.tabs('refresh')
				,200


			 