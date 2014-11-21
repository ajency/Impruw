define ['app'
],(App)->
	App.module 'SiteBuilderApp.Element.Tabs.Views', (Views,App)->


		class TabPaneView extends Marionette.ItemView

			tagName : 'div'

			className : ' tab-pane'

			template : ''

			onRender : ->
				@$el.attr('role','tabpanel').attr 'id', _.uniqueId 'tab-'

		class Views.TabsView extends Marionette.CompositeView

			template : '<div class="tab-container tabs-style-flip" role="tabpanel">

					  <!-- Nav tabs -->
					  <ul class="nav nav-tabs nav-justified" role="tablist">
						
						
					  </ul>

					  <!-- Tab panes -->
					  <div class="tab-content">
						
					  </div>

					</div>'

			itemView : TabPaneView

			itemViewContainer : '.tab-content'

			# collectionEvents : 
			# 	'add' : 'collectionAdded'


			
			initialize: (opt = {})->
				@collection = new Backbone.Collection
				if @model.get('elements').length is 0
					for i in [1, 2]
						@collection.add
							position: i
							element: 'TabPane'
							# className: 6
							elements: []
				else
					for column in @model.get('elements')
						col = _.clone column
						delete col.elements
						@collection.add col
						
			onAfterItemAdded : (itemView)->
				id = itemView.$el.attr 'id'

				@$el.find('ul.nav-tabs').append '<li role="presentation" class="active"><a href="#'+id+'" role="tab" data-toggle="tab"><span>Tab 1</span></a></li>'


			 