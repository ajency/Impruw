define ['app', 'controllers/base-controller'], (App, AppController)->
    App.module "AddPage", (AddPage, App)->
        class AddPageController extends AppController

            initialize: (opt = {}) ->

                # hold the selected template
                @layout = layout = @_getAddPageView()


                @listenTo layout, "show", ->
                    App.execute "show:templates:grid", region: layout.chooseTemplateRegion

                # listen to save event
                @listenTo layout, "add:new:page", (data)=>
                    @_saveNewPage data

                # listen to template selection region
                @listenTo layout.chooseTemplateRegion, "template:selected", (model)=>
                    @layout.triggerMethod "update:template:page:id", model.get 'ID'

                @show layout

            # save new page
            _saveNewPage: (data)->
                page = App.request "create:page:model", data
                page.save null,
                    wait: true
                    success: @showSuccessMessage

                @addToPageMenu page

            showSuccessMessage:() =>
                @layout.triggerMethod "show:success:message"

            addToPageMenu:(pageModel)->
                pageCollection = App.request "get:editable:pages"
                pageCollection.add pageModel

            _getAddPageView: ->
                new AddPageView

        class AddPageView extends Marionette.Layout

            tagName: 'form'

            className: 'form-horizontal'

            dialogOptions:
                modal_title: 'Add New Page'
                modal_size: 'medium-modal'

            regions:
                chooseTemplateRegion: '#choose-template-region'

            template: '<div class="row">
            							<div class="form-group">
            								<label for="inputEmail3" class="col-sm-2 control-label">Page title</label>
            								<div class="col-sm-10 col-sm-offset-2">
            									<input type="text" required class="form-control" id="post_title" name="post_title" />
            									<div class="p-messages"></div>
            								</div>
            							</div>
            							<input type="hidden" name="template_page_id" value="0"/>
            							<div id="choose-template-region"></div>
            							<button type="button" class="btn btn-wide aj-imp-submit add-new-page">Add New Page</button>
            						</div>'

            onShowSuccessMessage: ->
                @$el.prepend '<div class="alert alert-success">New Page added successfully</div>'

            onUpdateTemplatePageId: (id)->
                @$el.find('input[name="template_page_id"]').val id

            events:
                'click .add-new-page': ->
                    if @$el.valid()
                        @trigger "add:new:page", Backbone.Syphon.serialize @


        App.commands.setHandler "show:add:new:page", (opt)->
            new AddPageController opt

