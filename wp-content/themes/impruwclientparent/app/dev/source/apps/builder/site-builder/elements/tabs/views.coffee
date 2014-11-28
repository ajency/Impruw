define ['app','bootbox'
],(App,bootbox)->
	App.module 'SiteBuilderApp.Element.Tabs.Views', (Views,App)->


		class TabPaneView extends Marionette.ItemView

			tagName : 'div'

			className : ' tab-pane column empty-column'

			template : ''

			onRender : ->
				id = _.uniqueId 'tab-'
				@$el.attr('role','tabpanel').attr 'id', id
				@$el.attr('data-name',@model.get('tabName'))
				@model.set 'id',id

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

			className : 'tab-container'

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

				'click .delete-tab-btn' : (evt)->
					evt.stopPropagation()
					id = $(evt.target).closest('.delete-tab-btn').siblings('a').first().attr 'href'
					id =  _.trim id, '#'
					if not $("##{id}").isEmptyColumn()
						bootbox.alert "The tab is not empty. Please delete elements inside tab content to remove"
						return
					$(evt.target).closest('li').remove()
					@collection.remove @collection.get id

			onRender : ->
				@$el.attr 'role',"tabpanel"
				@$el.addClass @model.get 'style'

			
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

				@$el.find('ul.nav-tabs').append '<li role="presentation" class=""><a href="#'+id+'" role="tab" data-toggle="tab"><span contenteditable="true">'+itemView.model.get('tabName')+'</span></a><div class="delete-tab-btn">&times;</div></li>'
				

			onShow: ->
				@$el.tabs()

				# move tab position
				@$el.find('.nav-tabs').sortable
					axis : 'x'
					distance : 10
					delay : 150
					cancel : 'span[contenteditable="true"]'
					cursor : 'move'
					stop : (evt,ui)=>
						index = ui.item.index()
						id = ui.item.find('a').attr 'href'
						old = @$el.find('.tab-content').children(id).detach()
						if index is 0
							@$el.find('.tab-content').prepend old
						else if index is -1
							return
						else
							$(old).insertAfter @$el.find('.tab-content').children(':eq('+(index-1)+')')
			

			collectionAdded :->
				_.delay =>
					@$el.tabs('refresh')
				,200

			onStyleChanged: (newStyle, old)->
                @$el.removeClass(old) if not _(old).isEmpty()
                @$el.addClass newStyle


            onBeforeClose : ->
            	if not @$el.find('.tab-content').canBeDeleted()
            		return false
            	else
            		return true


			 