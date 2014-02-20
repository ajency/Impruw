
define ['app', 'controllers/base-controller'
		'apps/builder/site-builder/show/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				siteBuilderController = null

				class Show.BuilderController extends AppController

					initialize:(opt = {})->
						@region = App.getRegion 'builderRegion'

						#get pageElements
						pageId = App.request "get:current:editable:page"

						#element json
						elements = App.request "get:page:json", pageId

						# builder view
						@view = new Show.View.Builder
											model : elements

						# listen to element dropped event for next action
						@listenTo @view, "add:new:element", (container, type)->
									App.request "add:new:element", container, type

						# triggered when all models are fetched for the page
						# usign this event to start filling up the builder 
						# with elements
						@listenTo @view, "dependencies:fetched", =>
								_.delay =>
									@startFillingElements()
								, 400

						@show  @view,
								loading : true

					_getContainer :(section)->
						switch section
							when 'header' 
								$('#site-header-region')
							when 'page' 
								$('#site-page-content-region')
							when 'footer' 
								$('#site-footer-region')


					# start filling elements
					startFillingElements: ()->
						section = @view.model.get('header')
						container = @_getContainer 'header'
						_.each section, (element, i)=>
							App.request "add:new:element",container,element.element, element

						section = @view.model.get('page')
						container = @_getContainer 'page'
						_.each section, (element, i)=>
							App.request "add:new:element",container,element.element, element

						section = @view.model.get('footer')
						container = @_getContainer 'footer'
						_.each section, (element, i)=>
							App.request "add:new:element",container,element.element, element									



				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->
						
						@region = App.getRegion('builderWrapper')
						
						view = new Show.View.MainView

						@listenTo view, 'render',(view)=>
							# added delay so that the html is fully rendered
							_.delay =>
								# add new region to application
								App.addRegions
										builderRegion : '#aj-imp-builder-drag-drop'

								siteBuilderController = new Show.BuilderController()
							, 400

						@show  view


				App.commands.setHandler "editable:page:changed",(pageId)=>
					siteBuilderController.close() if @siteBuilderController isnt null
					siteBuilderController = new Show.BuilderController()

						

			App.SiteBuilderApp.Show.Controller		