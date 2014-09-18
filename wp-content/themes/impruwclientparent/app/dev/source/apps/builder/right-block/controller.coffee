define ['app'
		'controllers/base-controller'
		'apps/builder/right-block/views'
],(App,AppController)->
	App.module "RightBlock",(RightBlock,App)->

		class RightBlock.Controller extends AppController

			initialize :(options)->
				console.log 'right-block'

				revisionId = options.revisionId
				pageId = options.pageId

				@layout = @_getLayoutView()

				@listenTo @layout, 'show',=>
					App.execute "show:unused:elements",
		                region : @layout.unusedElementsRegion
		                revisionId : revisionId
		                pageId : pageId

		        @listenTo @layout ,"show:theme:color:clicked",->
                    App.execute "show:theme:color:set", region : App.dialogRegion

				@show @layout

			_getLayoutView :->
				new RightBlock.Views.RightBlockLayout


		App.commands.setHandler 'show:right:block',(opts)->
			new RightBlock.Controller opts

