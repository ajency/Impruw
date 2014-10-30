define ['app'
		'moment'
],(App,moment)->
	App.module 'RevisionHistory.Views',(Views,App)->

		class RevisionHistoryItem extends Marionette.ItemView

			template : '<li>
							<span class="revision">
								{{author}}, {{timeElapsed}}
								<a href="#" class="time-link">{{date}}</a>
							</span>
						</li>'

			events : 
				'click .time-link':(e)->
					@trigger "show:revision:restore", @model.id

			mixinTemplateHelpers : (data)->
				data = super data 
				dateGMT = new Date(data.post_date.replace(/-/g,'/')+' UTC ')
				data.date = dateGMT.toLocaleDateString()
				data.timeElapsed = moment(dateGMT).fromNow();
				data

		class EmptyHistoryItem extends Marionette.ItemView

			template : '<div style="color:#fff">No revisions made</div>'

		class Views.RevisionHitoryList extends Marionette.CompositeView

			template : '<h6>{{#polyglot}}History{{/polyglot}}</h6>
							<ol>
							</ol>
							<a href="#history" class="view-history-link hidden">{{#polyglot}}View Full History{{/polyglot}}</a>'

			itemView : RevisionHistoryItem

			emptyView : EmptyHistoryItem
			
			itemViewContainer : 'ol'

			events : 
				'click .view-history-link' :(e)-> 
                	e.preventDefault()
                	if @collection.at(0)
                		@trigger "show:revision:restore"
                	
			initialize:(option)->
				@revisionCollection = Marionette.getOption @, 'fullCollection'
				@getLatestCollection()
				@listenTo @revisionCollection, 'add', @getLatestCollection

			getLatestCollection : =>

				@revisionCollection.comparator = (rev)->
  						-rev.id;
				@revisionCollection.sort()
				lastThreeRevisions = _.first @revisionCollection.toArray() , 3

				@collection = new Backbone.Collection lastThreeRevisions
				# console.log 'df'
				@render()

			onRender : ->
				if @collection.size()
					@$el.find('.view-history-link').removeClass 'hidden'

			 
			


		

