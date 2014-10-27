define ['app'
],(App)->
	App.module 'RevisionHistory.Views',(Views,App)->

		class RevisionHistoryItem extends Marionette.ItemView

			template : '<li>
							<span class="revision">
								{{author}}, {{timeElapsed}}
								<a href="#" class="time-link">{{post_modified}}</a>
							</span>
						</li>'

			mixinTemplateHelpers : (data)->
				data = super data 
				milliseconds = new Date() - (new Date(data.post_modified))
				seconds = parseInt (milliseconds / 1000) % 60 
				minutes = parseInt (milliseconds / (1000*60)) % 60
				hours   = parseInt (milliseconds / (1000*60*60)) % 24
				days   = parseInt (milliseconds / (1000*60*60*24)) % 7
				if days > 1
					data.timeElapsed = "#{days} days ago"
				else if days is 1
					data.timeElapsed = "1 day ago"
				else if hours > 1
					data.timeElapsed = "#{hours} hours ago"
				else if hours is 1
					data.timeElapsed = "1 hour ago"
				else if minutes > 1
					data.timeElapsed = "#{minutes} minutes ago"
				else if minutes is 1
					data.timeElapsed = "1 minute ago"
				else if seconds 
					data.timeElapsed = "#{seconds} seconds ago"
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
                	@trigger "show:revision:restore"
                	
			onShow:->
				# console.log 'df'

			 
			


		

