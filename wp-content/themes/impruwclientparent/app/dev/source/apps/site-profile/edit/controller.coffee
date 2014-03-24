define ['app', 'controllers/base-controller'
		'apps/site-profile/edit/views', 'entities/site'], (App, AppController)->

	App.module 'SiteProfileApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			initialize:(options)->

				@siteProfile = App.request "get:site:model"

			
			showSiteProfile : ()->	
				
				@view = @.getMainView(@siteProfile)	

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'site-profile'

				@show @view,(loading : true)

				#updating the site profile entries
				@listenTo @view, "save:site:profile" , @saveSiteProfile
				
				#trigger media manager popup and start listening to "media:manager:choosed:media" event
				@listenTo @view, "show:media:manager", =>
						App.navigate "media-manager", trigger : true
						@listenTo App.vent,"media:manager:choosed:media",(media)=>
							@view.triggerMethod "set:logo" , media
							console.log @view
							@stopListening App.vent,"media:manager:choosed:media"	

			

			saveSiteProfile : (data) ->
				siteModel = App.request "get:site:model"
				#console.log data
				siteModel.set(data)
				siteModel.save null, 
					wait : true
					success : @siteProfileSuccess 

			getMainView : (model)->
				
				new Edit.View.MainView
						model : model
			
			siteProfileSuccess : () =>
					@view.triggerMethod "site:profile:added"
			
	App.SiteProfileApp.Edit.Controller		