define [ 'app', 'controllers/base-controller' ], ( App, AppController )->
    App.module "AddPage", ( AddPage, App )->
        class AddPageController extends AppController

            initialize : ( opt = {} ) ->

                # hold the selected template
                @layout = layout = @_getAddPageView()


                @listenTo layout, "show", ->
                    App.execute "show:templates:grid", region : layout.chooseTemplateRegion

                # listen to save event
                @listenTo layout, "add:new:page", ( data )=>
                    @_saveNewPage data

                # listen to template selection region
                @listenTo layout.chooseTemplateRegion, "template:selected", ( model )=>
                    is_theme_template = false
                    console.log model
                    console.log model.get 'is_theme_template'
                    if model.get 'is_theme_template'
                        console.log model.get 'is_theme_template'
                        is_theme_template = true
                    @layout.triggerMethod "update:template:page:id", model.get('ID'),is_theme_template

                @show layout

            # save new page
            _saveNewPage : ( data )->
                @setAsMenuItem = data.add_to_menu
                page = App.request "create:page:model", data
                page.save null,
                    wait : true
                    success : @showSuccessMessage


            showSuccessMessage : ( page ) =>
                @addToPageMenu page
                @layout.triggerMethod "show:success:message",page

                ### Update the element setting collection's link model to reflect the newly added page BEGINS###
                
                # Get element setting collection
                elementsCollection = App.request "get:elementbox:elements"

                # Get the link model to be modified
                linkModel = elementsCollection.get('Link')

                # Get the array of page/room objects associated with the linkmodel
                linkModelLinkPages = linkModel.get 'link_pages'
                # Get the new page object that needs to be added to the above array
                newLinkedPageObj = page.attributes
                # Add the page object to the array
                linkModelLinkPages[linkModelLinkPages.length] = newLinkedPageObj

                # Remove the old linkmodel and add the new updated linkModel to the collection
                elementsCollection.remove linkModel
                newLinkModel =  linkModel.set 'link_pages', linkModelLinkPages
                elementsCollection.add newLinkModel

                ### Update the element setting collection's link model to reflect the newly added page ENDS###


                #if page is selected to be added as a menu item
                menuId = window.MENUID

                if menuId is 0
                    return

                if @setAsMenuItem is true
                    menumodel = App.request "create:new:menu:item"

                    menumodel.set 'menu_id', menuId
                    menuCollection = App.request "get:menu:items:by:menuid", window.MENUID

                    data =
                        menu_item_title: page.get 'post_title'
                        page_id : page.get 'original_id'
                        menu_item_parent: 0
                        order: menuCollection.length + 1

                    menumodel.save data,
                        wait: true
                        success: @newMenuItemAdded

            newMenuItemAdded:(model)=>
                menuCollection = App.request "get:menu:items:by:menuid", window.MENUID
                menuCollection.add model


            addToPageMenu : ( pageModel )->
                pageCollection = App.request "get:editable:pages"
                pageCollection.add pageModel

            _getAddPageView : ->
                new AddPageView

        class AddPageView extends Marionette.LayoutView

            tagName: 'form'

            className: 'form-horizontal'

            dialogOptions:
                modal_title: _.polyglot.t 'Add New Page'
                modal_size: 'modal'

            regions:
                chooseTemplateRegion: '#choose-template-region'

            template:  '<div class="row add-page-container">
        					<div class="form-group">
        						<label for="post_title" class="col-sm-3 control-label">{{#polyglot}}Page Title{{/polyglot}}</label>
        						<div class="col-sm-9">
        							<input type="text" required class="form-control" id="post_title" name="post_title" />
        							<div class="p-messages"></div>
        						</div>
        					</div>
                            <input type="hidden" name="is_theme_template" value="false"/>
        					<input type="hidden" name="template_page_id" value="0"/>
                            <div class="form-group">
                                <div class="col-sm-9 col-sm-offset-3">
                                    <label class="control-label">
                                        <span class="checkbox">
                                            <input type="checkbox" value="1" checked="checked" name="add_to_menu"/>
                                            Add page to menu
                                        </span>
                                    </label>
                                	<div id="choose-template-region"></div>
                                    <div class="select-template-error field-error hide">{{#polyglot}}Please select a template first{{/polyglot}}</div>
                					<button type="button" class="btn btn-sm btn-wide aj-imp-orange-btn add-new-page">
                                    {{#polyglot}}Add New Page{{/polyglot}}</button>
                                </div>
                            </div>
        				</div>'

            onShow: ->
                @$el.find('input[type="checkbox"]').radiocheck()

            onShowSuccessMessage: (page)->
                @$el.find('#post_title').val page.get 'post_title'
                @$el.prepend '<div class="alert alert-success">'+ _.polyglot.t("New Page added")+'</div>'

            onUpdateTemplatePageId : ( id, is_theme_template = false )->
                
                @$el.find( 'input[name="is_theme_template"]' ).val is_theme_template
                @$el.find( 'input[name="template_page_id"]' ).val id
                @$el.find('.select-template-error').removeClass('show').addClass('hide')

            events :
                'click .add-new-page' : ->
                    if @$el.valid() 
                        if @$el.find( 'input[name="template_page_id"]' ).val() isnt '0'
                            @trigger "add:new:page", Backbone.Syphon.serialize @
                        else
                            @$el.find('.select-template-error').removeClass('hide').addClass('show')


        App.commands.setHandler "show:add:new:page", ( opt )->
            new AddPageController opt

