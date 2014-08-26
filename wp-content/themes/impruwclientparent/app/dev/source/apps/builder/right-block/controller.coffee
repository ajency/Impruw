define ['app'
		'controllers/base-controller'
],(App,AppController)->
	App.module "RightBlock",(RightBlock,App)->

		class RightBlock.Controller extends AppController

			initialize
