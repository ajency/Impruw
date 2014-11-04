define [ 'app'
         'text!apps/builder/site-builder/show/templates/maintemplate.html'
         'moment' ], ( App, mainviewTpl, moment )->

   App.module 'SiteBuilderApp.Show.View', ( View, App, Backbone, Marionette, $, _ )->

      class View.MainView extends Marionette.Layout

         template : mainviewTpl

         className : 'aj-imp-builder-area'

         collectionEvents :
            "add" : "addPageDropDown"

         templateHelpers : ( data = {} )->
            data.DASHBOARDURL = DASHBOARDURL
            data.SITEURL = SITEURL + '/'
            pages = @collection.toJSON()
            data.pages = _.reject pages, (page)->
               page.post_name in ['full-width-page']
            data

         events :
            'click .publish-page' : ( evt ) ->
               evt.preventDefault()
               $( evt.currentTarget ).attr 'disabled', true
               @$el.find( '.publish-page ' ).text 'Publishing...'
               promise = App.request "publish:page"
               promise.always @onPagePublished

            'change select#builder-page-sel' : ( evt )->
               # suspend local autosaving
               App.autoSaveAPI.local.suspend()
               @releasePage()               
               @_addToPageSlug parseInt $( evt.target ).val()
               @trigger 'editable:page:changed', $( evt.target ).val()
               @currentPageId = parseInt $( evt.target ).val()
               App.vent.trigger "change:page:check:single:room"
               @changePreviewLinkUrl()
               @displayPageNameForUpdate()
               @$el.find('.aj-imp-builder-drag-drop').fadeOut 'fast', -> App.resetElementRegistry()
               

            'change select#builder-page-sel-lock' : (evt)->
               @$el.find( 'select#builder-page-sel' ).selectpicker 'val', parseInt $( evt.target ).val()

            'click .add-new-page' : ->
               @trigger "add:new:page:clicked"

            'click .btn-update-pg-name' : ->
               currentPageId = @getCurrentPageId()
               updatedPageName = @$el.find( '#page_name' ).val()
               data =
                  'post_title' : updatedPageName
                  'ID' : currentPageId
               @trigger "update:page:name", data

            'click #take-over-button' : 'takeOverPage'

         onPageRendered : ->
            @$el.find('.aj-imp-builder-drag-drop').fadeIn()

         onPageRenderError : ->
            @$el.empty()   
            @$el.fadeIn()


         handleWindowEvents : ->
            
            $(window).on 'unload.site-builder', @windowUnloadHandler
            #$(window).on 'beforeunload.site-builder', @windowBeforeUnloadHandler

         windowUnloadHandler : (evt)=>
            currentPageId = @getCurrentPageId()
            @releasePage currentPageId

         windowBeforeUnloadHandler : =>
            return "The changes you made will be lost if you navigate away from this page."

         releasePage : (pageId = 0)->

            if pageId is 0 and @currentPageId is 0
               return false

            if @currentPageId > 0
               pageId = @currentPageId
             
            $.ajax
               type: 'POST',
               url: AJAXURL,
               async: false,
               data: 
                  action: 'wp-remove-post-lock',
                  _wpnonce: window._wpnonce,
                  post_ID: pageId,
                  active_post_lock: window.lockValue

            return true
            
         addPageDropDown : =>
            @modelAddedToCollection = @collection.last()
            @new_page_id = @modelAddedToCollection.get 'ID'
            _.each @collection.models, ( model, index ) =>
               modelId = model.get 'ID'
               originalPageId = model.get 'original_id'
               if modelId == @new_page_id and model.get('post_name') not in ['full-width-page']
                  page_name = model.get 'post_title'
                  select_html = "<option value='"+modelId+"' data-originalid='"+originalPageId+"'>#{page_name}</option>"
                  selectpicker_html = "<li rel='#{index}'>
                                            <a tabindex='0' class='' style=''>
                                                <span class='text'>#{page_name}</span>
                                                <i class='glyphicon glyphicon-ok icon-ok check-mark'></i>
                                            </a>
                                        </li>"
                  @$el.find( 'select#builder-page-sel' )
                     .parent().find('div .dropdown-menu ul' ).append( selectpicker_html )
                  @$el.find( 'select#builder-page-sel' ).append( select_html )

            @enableSelectPicker()

         initialize : ->
            @currentPageId = 0
            App.reqres.setHandler "get:current:editable:page:name", @getCurrentPageName
            App.reqres.setHandler "get:current:editable:page", @getCurrentPageId
            App.reqres.setHandler "get:original:editable:page", @getOriginalPageId
            @handleWindowEvents()

         # return the name of the currently editable page
         getCurrentPageName : =>
            pageId = @getCurrentPageId()
            name = @$el.find( 'select#builder-page-sel' ).find( "option[value='#{pageId}']" ).text()
            name

         # returns the page id of the currently selected page
         getCurrentPageId : =>
            pageId = @$el.find( 'select#builder-page-sel' ).val()
            parseInt pageId

         # returns the original page id of the currently selected page
         getOriginalPageId : =>
            pageId = @$el.find( 'select#builder-page-sel' ).find(':selected').data('originalid')
            parseInt pageId

         onPagePublished : =>
            @$el.find( '.publish-page ' ).text 'Publish'
            @$el.find( '.publish-page ' ).removeAttr 'disabled'
            
            
         changePreviewLinkUrl : ->
            currentPageId = App.request "get:current:editable:page"
            previewUrl = "#{SITEURL}?preview=true&p=#{currentPageId}&sim=full"
            @$el.find( 'a.preview-current-page' )
               .attr 'href', previewUrl
               .attr 'target', '_newtab' + Math.floor(Math.random()*999999)

            mobilePreviewUrl = "#{SITEURL}?preview=true&p=#{currentPageId}&sim=mobp"
            @$el.find( 'a.mobile-preview-current-page' )
               .attr 'href', mobilePreviewUrl
               .attr 'target', '_newtab' + Math.floor(Math.random()*999999)

         # trigger the editable page changed event on show
         onShow : ->
            # set the selectpicker
            @enableSelectPicker()

            # trigger page change event to load the initial page
            _.delay =>

               pageId = $.cookie 'current-page-id'
               if isNaN parseInt pageId
                  pageId = @$el.find( 'select#builder-page-sel' ).selectpicker 'val'
               
               @$el.find( 'select#builder-page-sel-lock,select#builder-page-sel' ).selectpicker 'val', pageId

               @_addToPageSlug pageId
               
               @changePreviewLinkUrl()
            , 250

            # handle revision dropdown
            @$el.find( '#aj-imp-revision-sel' ).on 'show.bs.dropdown', @addPageRevisions

            #update the page name links
            @displayPageNameForUpdate()

            $('body').on 'click',@_removeAllFocusClass
   

         _addToPageSlug : (pageId)=>
            page = App.request "get:fetched:page", pageId
            toArray = $('.page-slug-edit').val().split('/')
            newUrl = toArray.pop()
            #newUrl = toArray.pop()
            newUrl = toArray.push page.get 'post_name'
            newUrl = toArray.join '/'
            $('.page-slug-edit').val newUrl

         #set the selectpicker for the drop down
         enableSelectPicker : =>
            @$el.find( 'select#builder-page-sel,select#builder-page-sel-lock' ).selectpicker
               style : 'btn-xs btn-default'
               menuStyle : 'dropdown'

         # add page revisions to dropdown
         addPageRevisions : =>
            return
            @clearRevisionItems()
            @addFetchSpinner()
            @trigger "add:page:revisions"

         # add a spinner to dropdown
         addFetchSpinner : ->
            @$el.find( '#aj-imp-revision-sel ul' ).append '<li class="spinner"></li>'
            @$el.find( '#aj-imp-revision-sel ul li.spinner' ).spin()


         # append page revisions
         onAddPageRevisionItems : ( collection )->
            @clearRevisionItems()

            @revisionView.close() if not _.isUndefined @revisionView

            @revisionView = new RevisionView
               collection : collection
            @revisionView.render()
            @listenTo @revisionView, 'revision:link:clicked', @revisionLinkClicked
            @$el.find( '#aj-imp-revision-sel' ).append @revisionView.$el

         revisionLinkClicked : ( iv, id )=>
            @trigger "revision:link:clicked", id

         # remove any previous revision items
         clearRevisionItems : ->
            @$el.find( '#aj-imp-revision-sel ul' ).empty()

         #display the page name in the textbox
         displayPageNameForUpdate : ->
            @$el.find( '#page_name' ).removeAttr 'readonly'
            @$el.find( '.btn-update-pg-name' ).removeAttr 'disabled'

            currentPageName = @getCurrentPageName()
            singleRoom = @isSingleRoomPage()

            if singleRoom is true
               @$el.find( '#page_name' ).attr 'readonly', 'readonly'
               @$el.find( '.btn-update-pg-name' ).attr 'disabled', 'disabled'

            @$el.find( '#page_name' ).val currentPageName

         isSingleRoomPage : ->
            pageName = App.request "get:current:editable:page:name"
            page = false
            if pageName is 'Single Room'
               page = true
            page


         onPageNameUpdated : ( pageModel )->
            page_name = pageModel.get 'post_title'
            page_id = pageModel.get 'ID'
            @$el.find( 'div .dropdown-menu ul .selected .text' ).text( page_name )
            @$el.find( 'div .btn-group .filter-option' ).text( page_name )
            @$el.find( "select#builder-page-sel option[value='#{page_id}']" ).text( page_name )
            @enableSelectPicker()

         onClose:->
            $('body').on 'click',@_removeAllFocusClass

         _removeAllFocusClass:(e)->
            $('.element-wrapper').removeClass 'focus-class'

         onPageTookOver : (errorMessage)->
            @$el.find('div.lock-message')
               .removeClass 'hidden'
               .addClass 'show'
               .find 'div.message-span'
                  .text errorMessage

         onPageReleased : ->
            @$el.find('div.lock-message')
               .removeClass 'show'
               .addClass 'hidden'

            @trigger 'editable:page:changed', @getCurrentPageId()

         onAutosavePageJsonEnableButtons : ->
            @$el.find('.publish-page').removeAttr 'disabled'

         onAutosavePageJsonDisableButtons : ->
            @$el.find('.publish-page').attr 'disabled', 'disabled'

         takeOverPage : (evt)->
            $(evt.currentTarget).text 'Please wait...'
               .attr 'disabled', true

            $.post AJAXURL, 
                  (  
                     action : 'take_over_page_editing'
                     page_id : $.cookie('current-page-id')
                  ),
                  ((resp)->
                     $(evt.currentTarget).text 'Take Over'
                        .removeAttr 'disabled'

                     wp.heartbeat.connectNow()
                  ), 'json'


      class SingleRevision extends Marionette.ItemView

         tagName : 'li'

         template : '<div class="aj-imp-revision row">
                         <div class="col-sm-5 date">
                           {{datetime}}
                         </div>
                         <div class="col-sm-7 time">
                           {{post_name}} {{timeago}}
                         </div>
                     </div>'

         events :
            'click' : ( e )->
               App.vent.trigger "revision:link:clicked", @model.get 'ID'

         serializeData : ()->
            data = super()
            data.timestamp = moment( data.post_modified ).toDate().getTime()
            data.timeago = moment( data.post_modified ).fromNow()
            data.datetime = moment( data.post_modified ).format 'D/MM/YYYY h:m:s'
            data

         onRender : ->
            @$el.attr 'role', 'presentation'
            .attr 'data-revision-id', @model.get 'id'

      class NoRevisionView extends Marionette.ItemView

         tagName : 'li'

         template : 'No revision found'

      class RevisionView extends Marionette.CollectionView

         tagName : 'ul'

         className : 'dropdown-menu pull-right revision-dropdown'

         itemView : SingleRevision

         emptyView : NoRevisionView

         onRender : ->
            @$el.attr 'role', 'menu'

         onBeforeRender : ->
            @collection.sort()


      class View.Builder extends Marionette.ItemView

         template : '<header id="site-header-region" class="droppable-column edit-lock"></header>
                     <div id="site-page-content-region" class="droppable-column"></div>
                     <footer id="site-footer-region" class="droppable-column edit-lock"></footer>'

         events : 
            'click .headit' :->
               $( 'select#builder-page-sel' ).selectpicker 'val', parseInt @model.get 'front_page'

         onRetryEditPageClicked : =>
            App.commands.execute 'editable:page:changed', @model.get 'page_id'

         onShow : ->

            if not @model.get 'is_home_page'
               @$el.find('#site-header-region, #site-footer-region').removeClass 'droppable-column'

            @$el.find( '.droppable-column' ).sortable
               revert : 'invalid'
               items : '> .element-wrapper'
               connectWith : '.droppable-column,.droppable-column .column'
               start : ( e, ui )->
#                  w = ui.item.width()
#                  h = if ui.item.height() > 200 then 200 else ui.item.height()
#                  ui.placeholder.height h
                  window.dragging = true
                  return
               stop : ( e, ui )->
                  window.dragging = false
                  return
               out : ()->
                  window.dragging = false
                  return
               over : ()->
                    window.dragging = true
                    return
               handle : '.aj-imp-drag-handle'
               helper : @_getHelper
               opacity : .65
               tolerance : 'pointer'
               receive : @elementDropped
               placeholder: "ui-sortable-placeholder builder-sortable-placeholder"

            if @model.get 'is_home_page'
               @$el.find('#site-header-region, #site-footer-region').removeClass 'edit-lock'
            

            @$el.find('#site-header-region.edit-lock').append('<div class="edit-unlock"><div class="unlock-message"><span class="bicon icon-uniF180"></span>Your Header is Locked<div class="headit">Edit the Header from Your Homepage</div></div></div>')
            @$el.find('#site-footer-region.edit-lock').append('<div class="edit-unlock"><div class="unlock-message"><span class="bicon icon-uniF180"></span>Your Footer is Locked<div class="headit">Edit the Footer from Your Homepage</div></div></div>')


         _getHelper : (evt,original)=>

             left = $(original).width()/2
             @$el.find( '.droppable-column' ).sortable( "option", "cursorAt", { left: 50, top: 25 } );

             "<div class='element-helper'></div>"



         elementDropped : ( evt, ui )=>
            # trigger drop event if ui.item is Li tag
            if ui.item.prop( "tagName" ) is 'LI'
               type = ui.item.attr 'data-element'
               metaId = ui.item.attr 'data-meta-id'
               metaId = if metaId isnt undefined then parseInt( metaId ) else 0
               @trigger "add:new:element", $( evt.target ), type, metaId

         onPageRenderFailed : ->
            @showRenderError()

         showRenderError : =>
            @$el.addClass  'dsdsds'
            @$el.prepend '<h3>Failed to render view</h3>
                        <button class="retry-edit-page">Retry</button>
                        <button class="let-us-know">Let us know about this</button>'
            @$el.find('.retry-edit-page').on 'click', @onRetryEditPageClicked
            @$el.find('.let-us-know').on 'click', @onLetUsKnowClicked
           
         errorNotified : =>
            @$el.find('.let-us-know').after 'Error reported successfully'

         onLetUsKnowClicked : =>
            error = 
               type : 'page_load_failed'
               user_id : window.USER.ID
               details : 
                  page_id : @model.get 'page_id'
                  blog_id : window.BLOGID
                  message : 'Page load failed in builder'

            deferred = App.request 'error:encountered', error
            deferred.always =>
               @errorNotified()
