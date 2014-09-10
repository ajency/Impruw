define [ 'app' ],( App, elementTpl )->

   # Headerapp views
   App.module 'SiteBuilderApp.Element.Views', ( Views, App, Backbone, Marionette, $, _ )->

      # Pages single view
      class Views.ElementView extends Marionette.Layout

         # basic template
         template : '<form>
                       <input type="hidden" name="meta_id"/>
                       <input type="hidden" name="element"/>
                     </form>
                     <div class="element-controls">
                       <div class="aj-imp-drag-handle">
                         <p title="{{#polyglot}}Move{{/polyglot}}"><span class="bicon icon-uniF140"></span></p>
                       </div>
                       <div class="aj-imp-delete-btn"><span title="{{#polyglot}}Delete{{/polyglot}}">&times;</span></div>
                       <div class="aj-imp-settings-btn"><span title="{{#polyglot}}Settings{{/polyglot}}" class="glyphicon glyphicon-cog"></span></div>
                     </div>
                     <div class="element-markup"><span></span></div>'

         tagName : 'div'

         regions :
            elementRegion : '> .element-markup'

         # class name
         className : 'element-wrapper'

         # element events
         events :
            'click .aj-imp-settings-btn' : ( evt )->
               evt.stopPropagation()
               @trigger "show:setting:popup", @model

            'click .aj-imp-delete-btn' : ( evt )->
               evt.stopPropagation()
               @trigger "delete:element", @model

            # on click of element trigger event
            'click':(e)->
               if @model.get('element') isnt 'Table'
                  e.stopPropagation()
               App.ElementsBoxApp.ElementsBoxEvtAggr.trigger 'highlight:element', @model.get 'element'

         initialize : =>
            # bind event only once
            @once 'before:render:element', =>
               @trigger "bind:element:events"

         # set the data-element attribute for element
         onRender : ->
            @$el.find( '.element-markup > span' ).spin @_getOptions()

         # set mouse hover for element
         onShow : ()=>
            @$el.mouseover ( evt )=>
               evt.stopPropagation()
               return if window.dragging
               @$el.addClass 'hover-class'
            .mouseout ()=>
                  @$el.removeClass 'hover-class'

            # @_disableOptions()

            @_noOptions()

         # _disableOptions : ()->
         #    elements = [ 'RoomSummary', 'Row', 'Link', 'Image', 'Table', 'Widget' ]
         #    if ISTHEMEEDITOR isnt 'yes'
         #       if elements.indexOf( @model.get 'element' ) is -1
         #          @$el.children('.element-controls').children('.aj-imp-settings-btn' ).remove()

         # remove settings button by default
         _noOptions : ()->
            nosettings = [ 'Logo', 'Text', 'Title', 'Gallery' ]
            if nosettings.indexOf( @model.get 'element' ) isnt -1
               @$el.children('.element-controls').children('.aj-imp-settings-btn' ).remove()

         # set the hidden fields before rendering the element
         onBeforeRenderElement : ->
            for field in [ 'meta_id', 'style', 'element' ]
               @setHiddenField field, @model.get field

            @setDraggable @model.get 'draggable'

         # special hidden fields for row element
         addHiddenFields : ()->
            for field in [ 'draggable', 'style' ]
               @$el.children( 'form' ).append "<input type='hidden' name='#{field}' value=''/>"

         # on set draggable
         setDraggable : ( draggable )->
            if draggable is false
               @$el.find( '.aj-imp-drag-handle' ).addClass( 'non-visible' )
            else if draggable is true
               @$el.find( '.aj-imp-drag-handle' ).removeClass( 'non-visible' )

            @setHiddenField 'draggable', draggable

         setMargin : ( newMargin, prevMargin = '' )->
            element = @elementRegion.currentView
            element.$el.removeClass prevMargin
            element.$el.addClass newMargin

         setStyle : ( newStyle, prevStyle = '' )->
            element = @elementRegion.currentView
            element.$el.removeClass prevStyle
            element.$el.addClass newStyle

         # set the meta id for element
         setHiddenField : ( name, value )->
            if @$el.children( 'form' ).find( "input[name='#{name}']" ).length is 1
               @$el.children( 'form' ).find( "input[name='#{name}']" ).val value

         # rerender markup
         onElementModelCreated : ->
            # close the spinner
            @$el.find( '.element-markup > span' ).spin false


         # spinner options
         _getOptions : ->
            lines : 10
            length : 6
            width : 2.5
            radius : 7
            corners : 1
            rotate : 9
            direction : 1
            color : '#ff9e2c'
            speed : 1
            trail : 60
            shadow : false
            hwaccel : true
            className : 'spinner'
            zIndex : 2e9
            top : '0px'
            left : '40px'