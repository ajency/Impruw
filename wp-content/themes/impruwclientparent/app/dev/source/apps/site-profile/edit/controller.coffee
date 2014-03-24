define ['app', 'controllers/base-controller'
		'apps/site-profile/edit/views', 'entities/site'], (App, AppController)->

	App.module 'SiteProfileApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			initialize:()->

				@siteProfile = App.request "get:site:model"

				#@layout = @.getLayout()
			
			showSiteProfile : ()->	
				
				@view = @.getMainView(@siteProfile)	

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'site-profile'

				@show @view,(loading : true)

				@listenTo @view, "save:site:profile" , @saveSiteProfile
					

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