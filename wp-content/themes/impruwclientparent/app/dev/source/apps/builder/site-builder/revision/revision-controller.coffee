define ['app'
		'controllers/base-controller'
		'apps/builder/site-builder/revision/revision-views'
],(App, AppController)->
	App.module "SiteBuilderApp.Revision",(Revision,App)->

		class Revision.Controller extends AppController

			initialize : (options)->

				@revisionCollection = options.revisionCollection

				@view = @_getRevisionView()

				@listenTo @view, "close:revision",=>
					@region.close()

				@listenTo @view, 'restore:revision',(revisionId)->
					App.execute 'restore:revision',revisionId

				@show @view

			_getRevisionView : ->
				new Revision.Views.RevisionView
					collection : @revisionCollection


		App.commands.setHandler "show:revision:restore",(opts)->
			new Revision.Controller opts