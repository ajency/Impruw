define ['app'
        'text!apps/media/grid/templates/media.html'
], (App, mediaTpl, layoutTpl)->
    App.module 'Media.Grid.Views', (Views, App)->

        # single media view
        class MediaView extends Marionette.ItemView
            template: mediaTpl
            className: 'col-sm-2 single-img'
            events:
                'click a': (e)->
                    e.preventDefault()
                'click':  '_whenImageClicked'


            _whenImageClicked: (e)->
                    media = if $(e.target).hasClass('single-img') then $(e.target) else $(e.target).closest('.single-img')
#                    if $(media).hasClass('ui-selected')
                    @trigger "media:element:selected"
                    # else
                    #     @trigger "media:element:unselected"

        # collection view
        class Views.GridView extends Marionette.CompositeView
            className: 'row'
            template: '<div id="selectable-images"></div>'
            itemView: MediaView
            itemViewContainer: '#selectable-images'
            onCollectionRendered: ->
                if @multiSelect
                    @$el.find('#selectable-images').bind "mousedown", (e)->
                        e.metaKey = true;
                    .selectable()
                else
                    @$el.find('#selectable-images').selectable()


            onShow : ->
                 @on 'after:item:added', (imageView)=>
                    
                    #show the grid view on image added
                    @$el.closest('.tab-content').siblings('.nav-tabs')
                    .find('.all-media-tab').find('a').trigger 'click'
                    #trigger the selectable to point to the newly added image
                    imageView.$el.find('img').trigger 'click'
                    @$el.find('#selectable-images').selectSelectableElements imageView.$el

