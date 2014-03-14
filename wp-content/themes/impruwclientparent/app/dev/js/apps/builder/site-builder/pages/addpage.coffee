define ['app', 'controllers/base-controller'], (App, AppController)->

	App.module "AddPage", (AddPage, App)->

		class AddPageController extends AppController

			initialize :(opt = {}) ->

				@view = view = @_getAddPageView()

				# listen to save event
				@listenTo view, "add:new:page", (data)=>
					@_saveNewPage data

				# listen to save event
				@listenTo view, "cancel:add:new:page", ()=>
					console.log "cancel"

				@show view


			_getAddPageView:->
				new AddPageView



		class AddPageView extends Marionette.ItemView

			tagName : 'form'

			className : 'form-horizontal'

			template : '<div class="row">
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">Page title</label>
								<div class="col-sm-10 col-sm-offset-2">
									<input type="text" required class="form-control" id="post_title" name="post_title" />
									<div class="p-messages"></div>
								</div>
							</div>
							<button type="button" class="btn btn-wide aj-imp-submit add-new-page">Add New Page</button>
							<button type="button" class="btn cancel-button">Cancel</button>
						</div>'

			events : 
				'click .add-new-page' : ->
						if @$el.valid()
							@trigger "add:new:page", Backbone.Syphon.serialize @
				'click .cancel-button' : -> @trigger "cancel:add:new:page"

