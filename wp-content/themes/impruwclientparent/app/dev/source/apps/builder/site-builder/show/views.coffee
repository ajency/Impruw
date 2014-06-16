define ['app'
        'text!apps/builder/site-builder/show/templates/maintemplate.html'
        'text!apps/builder/site-builder/show/templates/builder.html'
        'moment'],
(App, mainviewTpl, builderTpl, moment)->
    App.module 'SiteBuilderApp.Show.View', (View, App, Backbone, Marionette, $, _)->

        class View.MainView extends Marionette.Layout

            template: mainviewTpl

            className: 'aj-imp-builder-area'

            collectionEvents:
                    "add" : "addPageDropDown"

            templateHelpers: (data = {})->
                data.SITEURL = SITEURL + '/'
                data.pages = @collection.toJSON()
                data

            events:
                'click .publish-page': (evt) ->
                    evt.preventDefault()
                    @$el.find('.publish-page ').text 'Publishing...'
                    App.execute "publish:page"

                'change select#builder-page-sel': (evt)->
                    @trigger 'editable:page:changed', $(evt.target).val()
                    console.log $(evt.target).val()
                    App.vent.trigger "change:page:check:single:room"
                    @changePreviewLinkUrl()

                'click .add-new-page' : ->
                    @trigger "add:new:page:clicked"

            addPageDropDown :=>
                @modelAddedToCollection = @collection.last()
                @new_page_id = @modelAddedToCollection.get 'ID'
                _.each @collection.models,(model,index) =>
                    modelId = model.get 'ID'
                    if modelId == @new_page_id
                        page_name = model.get 'post_title'
                        select_html = "<option value='#{index}'>#{page_name}</option>"
                        selectpicker_html ="<li rel='#{index}'>
                                                <a tabindex='0' class='' style=''>
                                                    <span class='text'>#{page_name}</span>
                                                    <i class='glyphicon glyphicon-ok icon-ok check-mark'></i>
                                                </a>
                                            </li>"
                        @$el.find('div .dropdown-menu ul').append(selectpicker_html)
                        @$el.find('select#builder-page-sel').append(select_html)
                @enableSelectPicker()

            initialize: ->
                App.reqres.setHandler "get:current:editable:page:name", @getCurrentPageName
                App.reqres.setHandler "get:current:editable:page", @getCurrentPageId

            # return the name of the currently editable page
            getCurrentPageName: =>
                pageId = @getCurrentPageId()
                name = @$el.find('select#builder-page-sel').find("option[value='#{pageId}']").text()
                name

            # returns the page id of the currently selected page
            getCurrentPageId: =>
                pageId = @$el.find('select#builder-page-sel').val()
                parseInt pageId

            onPagePublished:=>
                @$el.find('.publish-page ').text 'Publish'
                _.delay =>
                    @$el.find('.publish-page ').text 'Publish'
                , 500

            changePreviewLinkUrl:->
                currentPageId = App.request "get:current:editable:page"
                previewUrl = "#{SITEURL}?preview=true&p=#{currentPageId}"
                @$el.find('a.preview-current-page').attr 'href', previewUrl

            # trigger the editable page changed event on show
            onShow: ->
                # set the selectpicker
                @enableSelectPicker()

                # trigger page change event to load the initial page
                _.delay =>
                    value = @$el.find('select#builder-page-sel').selectpicker 'val'
                    @trigger 'editable:page:changed', value
                    @changePreviewLinkUrl()
                , 250

                # handle revision dropdown
                @$el.find('#aj-imp-revision-sel').on 'show.bs.dropdown', @addPageRevisions

            #set the selectpicker for the drop down
            enableSelectPicker :=>
                @$el.find('select#builder-page-sel').selectpicker
                    style: 'btn-xs btn-default'
                    menuStyle: 'dropdown'

            # add page revisions to dropdown
            addPageRevisions: =>
                return
                @clearRevisionItems()
                @addFetchSpinner()
                @trigger "add:page:revisions"

            # add a spinner to dropdown
            addFetchSpinner: ->
                @$el.find('#aj-imp-revision-sel ul').append '<li class="spinner"></li>'
                @$el.find('#aj-imp-revision-sel ul li.spinner').spin()


            # append page revisions
            onAddPageRevisionItems: (collection)->
                @clearRevisionItems()

                @revisionView.close() if not _.isUndefined @revisionView

                @revisionView = new RevisionView
                                        collection: collection
                @revisionView.render()
                @listenTo @revisionView, 'revision:link:clicked', @revisionLinkClicked
                @$el.find('#aj-imp-revision-sel').append @revisionView.$el

            revisionLinkClicked: (iv, id)=>
                @trigger "revision:link:clicked", id

            # remove any previous revision items
            clearRevisionItems: ->
                @$el.find('#aj-imp-revision-sel ul').empty()


        class SingleRevision extends Marionette.ItemView

            tagName: 'li'

            template: '<div class="aj-imp-revision row">
							<div class="col-sm-5 date">
							  {{datetime}}
							</div>
							<div class="col-sm-7 time">
							  {{post_name}} {{timeago}}
							</div>
						</div>'

            events:
                'click': (e)->
                    App.vent.trigger "revision:link:clicked", @model.get 'ID'

            serializeData: ()->
                data = super()
                data.timestamp = moment(data.post_modified).toDate().getTime()
                data.timeago = moment(data.post_modified).fromNow()
                data.datetime = moment(data.post_modified).format 'D/MM/YYYY h:m:s'
                data

            onRender: ->
                @$el.attr 'role', 'presentation'
                .attr 'data-revision-id', @model.get 'id'

        class NoRevisionView extends Marionette.ItemView

            tagName: 'li'

            template: 'No revision found'

        class RevisionView extends Marionette.CollectionView

            tagName: 'ul'

            className: 'dropdown-menu pull-right revision-dropdown'

            itemView: SingleRevision

            emptyView: NoRevisionView

            onRender: ->
                @$el.attr 'role', 'menu'

            onBeforeRender: ->
                @collection.sort()


        class View.Builder extends Marionette.ItemView

            template: builderTpl

            onShow: ->
                @$el.find('.droppable-column').sortable
                    revert: 'invalid'
                    items: '> .element-wrapper'
                    connectWith: '.droppable-column,.column'
                    start: (e, ui)->
                        w = ui.item.width()
                        h = if ui.item.height() > 200 then 200 else ui.item.height()
                        ui.placeholder.height h
                        window.dragging = true
                        return
                    stop: (e, ui)->
                        window.dragging = false
                        return
                    handle: '.aj-imp-drag-handle'
                    helper: 'clone'
                    opacity: .65
                    tolerance: 'pointer'
                    receive: @elementDropped



            elementDropped: (evt, ui)=>
                # trigger drop event if ui.item is Li tag
                if ui.item.prop("tagName") is 'LI'
                    type = ui.item.attr 'data-element'
                    metaId = ui.item.attr 'data-meta-id'
                    metaId = if metaId isnt undefined then parseInt(metaId) else 0
                    @trigger "add:new:element", $(evt.target), type, metaId