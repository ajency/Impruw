define ['app','bootbox'
],(App,bootbox)->
	App.module 'SiteBuilderApp.Element.Accordion.Views', (Views,App)->


		class AccordionTab extends Marionette.ItemView

			tagName : 'div'

			className : ' panel panel-default '

			template : '<div class="panel-heading" >
						  <h4 class="panel-title">
							<a>
							  <span>{{tab_name}}</span>
							</a>
						  </h4>
						  <form></form>
						  <div class="delete-accordion-btn"><span class="glyphicon glyphicon-trash"></span></div>
						</div>
						<div  class="panel-collapse collapse in" >
						  <div class="panel-body column empty-column">
						  </div>
						</div>'

			mixinTemplateHelpers : (data)->
				data = super data
				data.tab_name = data.tabName[WPML_DEFAULT_LANG]
				data

			events : 
				'click .delete-accordion-btn' : ->
					if not @$el.children('.panel-collapse').children('.column').isEmptyColumn()
						bootbox.alert "<h4 class='delete-message'>" + _.polyglot.t("The tab is not empty. Please delete elements inside tab content to remove") + "</h4>"
						return
					@model.collection.remove @model

				'click .panel-title span' : (evt)->
					bootbox.dialog
						title: "Accordian tab name"
						message: '<div class="row"> 
									<div class="col-md-12"> 
										<form class="form-horizontal"> 
											<div class="form-group"> 
												<label class="col-md-4 control-label" for="name">Name</label> 
												<div class="col-md-4"> 
													<input  name="name" type="text" placeholder="Tab name" 
													class="tab-name-modal form-control input-md" value="'+$(evt.target).text()+'"> 
												</div>  
							 				</div>
										</form> 
									</div>  
								</div>'
						buttons: 
							success :
								label : 'Save'
								className : 'btn-primary'
								callback : ->
									result = $('.tab-name-modal').val()
									if not _.isEmpty result
										$(evt.target).text result
										$(evt.target).closest('.panel-title').siblings('form').find("input[name=#{WPML_DEFAULT_LANG}]").val result

			onShow : ->
				object = @model.get 'tabName'
				for prop of object
					if object.hasOwnProperty prop
						@$el.children('.panel-heading').children('form')
						.append "<input type='hidden' name='#{prop}' value='#{object[prop]}'>"

				# console.log 'sortable'
				@$el.find('.panel-body').sortable
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
						@$el.closest('.accordion-container').closest('.element-wrapper').removeClass('hover-class')

						window.dragging = false
						return
					over : ()=>
						_.delay =>
							@$el.closest('.accordion-container').closest('.element-wrapper').addClass('hover-class')
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

		class Views.AccordionView extends Marionette.CompositeView

			className : 'accordion-container'

			template : ' 
						<div class="panel-group {{style}}" id="accordion" role="tablist" aria-multiselectable="true">
						</div>
					  
						<div class="add-tab"><span class="bicon icon-uniF193"></span>&nbsp;Add Tab</div>

					  '

			itemView : AccordionTab

			itemViewContainer : '.panel-group'

			collectionEvents : 
				'add' : 'collectionAdded'



			events : 
				'click .add-tab' : ->
					@collection.add
						position : @collection.size() + 1
						element : 'AccordionTab'
						elements : []
						tabName : {'en' : 'tab', 'nb' : 'tab_N'}
			
			initialize: (opt = {})->
				@collection = new Backbone.Collection
				if @model.get('elements').length is 0
					for i in [1, 2]
						@collection.add
							position: i
							element: 'AccordionTab'
							tabName : {'en' : 'tab', 'nb' : 'tab_N'}
							# className: 6
							elements: []
							,{silent: true}
				else
					for column in @model.get('elements')
						col = _.clone column
						delete col.elements
						@collection.add col,{silent: true}
						
	
			onShow: ->
				@$el.find('.panel-group').accordion
					header : '.panel-heading'
					heightStyle: "content"
					collapsible: true

				@$el.find('.panel-group').sortable
					axis: "y"
					cancel : '.panel-heading a span'
					forcePlaceholderSize: true
					handle: ".panel-heading"
					stop: ( event, ui ) =>
						ui.item.children( ".panel-heading" ).triggerHandler( "focusout" )
						@$el.find('.panel-group').accordion( "refresh" )

			collectionAdded :->
				_.delay =>
					@$el.find('.panel-group').accordion('refresh')
				,200

			onStyleChanged: (newStyle, old)->
				@$el.find('.panel-group').removeClass(old) if not _(old).isEmpty()
				@$el.find('.panel-group').addClass newStyle


   
			 