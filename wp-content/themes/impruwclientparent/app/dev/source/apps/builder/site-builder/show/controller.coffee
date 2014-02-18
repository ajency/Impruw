
define ['app', 'controllers/base-controller'
		'apps/builder/site-builder/show/views'], (App, AppController)->

			App.module 'SiteBuilderApp.Show', (Show, App, Backbone, Marionette, $, _)->

				class Show.BuilderController extends AppController

					initialize:(opt = {})->
						@region = App.getRegion 'builderRegion'

						#get pageElements
						pageId = 5 #App.request "get:current:editable:page"

						#element json
						elements = App.request "get:page:json", pageId

						@view = new Show.View.Builder
											model : elements

						# listen to element dropped event for next action
						@listenTo @view, "element:dropped", (container, type)->
							App.vent.trigger "element:dropped", container, type

						# triggered when all models are fetched for the page
						# usign this event to start filling up the builder 
						# with elements
						@listenTo @view, "dependencies:fetched", =>
								_.delay =>
									@startFillingElements()
								, 2000

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
						json = @view.model.get('json')
						_.each json, (section, key)=>
							container = @_getContainer key
							_.each section, (element, index)=>
								App.vent.trigger "element:dropped",container,element.element, element



				# Controller class for showing header resion
				class Show.Controller extends AppController

					# initialize the controller. Get all required entities and show the view
					initialize:(opt = {})->
						
						@region = App.getRegion('builderWrapper')
						
						view = new Show.View.MainView

						@listenTo view, 'render',(view)->
							# added delay so that the html is fully rendered
							_.delay ->
								# add new region to application
								App.addRegions
										builderRegion : '#aj-imp-builder-drag-drop'

								new Show.BuilderController()
							, 400

						@show  view

						

			App.SiteBuilderApp.Show.Controller		