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

			mixinTemplateHelpers : (data)->
				data = super data 
				dateGMT = new Date(data.post_date+' UTC ')
				data.date = dateGMT.toLocaleDateString()
				data.timeElapsed = moment(dateGMT).fromNow();
			# 	# data.
				data

		class Views.RevisionHitoryList extends Marionette.CompositeView

			template : '<h6>{{#polyglot}}History{{/polyglot}}</h6>
							<ol>
							</ol>
							<a href="#history" class="view-history-link">{{#polyglot}}View Full History{{/polyglot}}</a>'

			itemView : RevisionHistoryItem
			
			itemViewContainer : 'ol'

			events : 
				'click .view-history-link' :(e)-> 
                	e.preventDefault()
                	if @collection.at(0)
                		@trigger "show:revision:restore"
                	
			onShow:->
				# console.log 'df'

			 
			


		

