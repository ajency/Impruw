define [ 'app'], ( App, mediaTpl )->

   App.module 'Media.Grid.Views', ( Views, App )->

      # single media view
      class MediaView extends Marionette.ItemView
         
         template : '<a href="#" class="thumbnail">
                        <div class="imgthumb"><img src="{{image_url}}" class="img-responsive"/></div>
                        <div class="ticker"><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-minus"></span></div>
                     </a>
                     <div class="edit-image clearfix">
                        <span class="glyphicon glyphicon-edit edit"></span> Edit
                     </div>
                     <div class="delete-media-img">
                        <span class="glyphicon glyphicon-trash delete"></span> Delete
                     </div>'

         className : 'col-sm-1 single-img'

         modelEvents :
            'change' : 'render'

         mixinTemplateHelpers : (data)->
            data = super data
            data.image_url = if data.sizes.thumbnail then data.sizes.thumbnail.url else data.sizes.full.url
            data

         events :
            'click a.thumbnail' : ( e )->
               e.preventDefault()
               @_whenImageClicked e
            'click .delete-media-img' : ->
               if confirm "Delete image?"
                  @trigger "delete:media:image", @model
            'click .edit-image' : ->
               @trigger 'show:image:editor', @model

         _whenImageClicked : ( e )->
            media = if $( e.target ).hasClass( 'single-img' ) then $( e.target ) else $( e.target ).closest( '.single-img' )
            @trigger "media:element:selected"


      class EmptyMediaGrid extends Marionette.ItemView

         template : '<p>No media uploaded. Please upload</p>'



      # collection view
      class Views.GridView extends Marionette.CompositeView
         
         className : 'row'
         
         template : '<div id="selectable-images"></div>
                     <div id="edit-image-view"></div>'

         itemView : MediaView

         emptyView : EmptyMediaGrid
         
         itemViewContainer : '#selectable-images'

         onCollectionRendered : ->
            if @multiSelect
               @$el.find( '#selectable-images' ).bind "mousedown", ( e )->
                  e.metaKey = true;
               .selectable
                     cancel : '.delete-media-img'
            else
               @$el.find( '#selectable-images' ).selectable
                  cancel : '.delete-media-img'

            if @collection.length < @collection.totalMedia
               @$el.find('#selectable-images').after('<button type="button" class="btn btn-xs load-more"><span class="glyphicon glyphicon-repeat"></span> Load More</button>')

               @$el.find('#selectable-images').parent().find('.load-more').click @loadMoreClicked

         loadMoreClicked : (evt)=>
            @collection.fetch
                        success : =>
                           @$el.find('#selectable-images').parent().find('.load-more').remove()
                           if @collection.length < @collection.totalMedia
                              @$el.find('#selectable-images').after('<button type="button" class="btn btn-xs load-more"><span class="glyphicon glyphicon-repeat"></span> Load More</button>')
                              @$el.find('#selectable-images').parent().find('.load-more').click @loadMoreClicked

         onShow : ->
            @on 'after:item:added', ( imageView )=>

               #show the grid view on image added
               @$el.closest( '.tab-content' ).siblings( '.nav-tabs' )
               .find( '.all-media-tab' ).find( 'a' ).trigger 'click'
               #trigger the selectable to point to the newly added image
               imageView.$el.find( 'img' ).trigger 'click'
               @$el.find( '#selectable-images' ).selectSelectableElements imageView.$el

         onShowEditImage : ( editView )->
            @$el.find( '#selectable-images, .load-more' ).hide()
            @$el.find( '#edit-image-view' ).html( editView.render().$el ).show()
            editView.triggerMethod 'show'

         onImageEditingCancelled : ->
            self = @
            @$el.find( '#edit-image-view' ).fadeOut 'fast', ->
               $( @ ).empty()
               self.$el.find( '#selectable-images, .load-more' ).show()


