define ['app'
		'controllers/base-controller'
		'apps/builder/right-block/revision-history/views'
],( App, AppController )->
	App.module 'RevisionHistory', (RevisionHistory,App)->

		class RevisionHistory.Controller extends AppController

			initialize :(options)->
				pageId = options.pageId
				@revisionCollection = App.request "get:page:revisions", pageId		

				App.commands.setHandler 'update:revision:on:published',(revision)=>
					@revisionCollection.add revision		

				App.execute "when:fetched", [@revisionCollection] ,=>
					@revisionCollection.comparator = (rev)->
  						-rev.id;
					@revisionCollection.sort()
					lastThreeRevisions = _.first @revisionCollection.toArray() , 3

					@latestRevision = new Backbone.Collection lastThreeRevisions
					@view = @_showHistoryView()

					@listenTo @view, "show:revision:restore itemview:show:revision:restore",(view,id = 0)=>
						App.execute "show:revision:restore",
							region : App.revisionRestoreRegion
							revisionCollection : @revisionCollection
							revisionId : id

					@show @view

			_showHistoryView:->
				new RevisionHistory.Views.RevisionHitoryList
					collection : @latestRevision


		App.commands.setHandler 'show:revision:history',(opts)->
			console.log 'history'
			new RevisionHistory.Controller opts
