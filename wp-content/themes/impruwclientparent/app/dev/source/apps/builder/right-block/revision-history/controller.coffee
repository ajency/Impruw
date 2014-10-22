define ['app'
		'controllers/base-controller'
		'apps/builder/right-block/revision-history/views'
],( App, AppController )->
	App.module 'RevisionHistory', (RevisionHistory,App)->

		class RevisionHistory.Controller extends AppController

			initialize :(options)->
				pageId = options.pageId
				@revisions = App.request "get:page:revisions", pageId				

				App.execute "when:fetched", [@revisions] ,=>
					lastThreeRevisions = _.first @revisions.toArray() , 3

					@latestRevision = new Backbone.Collection lastThreeRevisions
					@view = @_showHistoryView()

					@show @view

			_showHistoryView:->
				console.log 'x'
				new RevisionHistory.Views.RevisionHitoryList
					collection : @latestRevision


		App.commands.setHandler 'show:revision:history',(opts)->
			console.log 'history'
			new RevisionHistory.Controller opts
