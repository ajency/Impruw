define [ 'app'
         'text!apps/builder/elementsbox/show/templates/main.html'
         'text!apps/builder/elementsbox/show/templates/error.html' ],
( App, mainviewTpl, singleEleTpl, errorTpl )->
   App.module 'ElementsBoxApp.Show.Views', ( Views, App, Backbone, Marionette, $, _ )->

      # Single element region
      class Views.SingleElement extends Marionette.ItemView

         tagName : 'li'

         className : 'element'

         template : '<a href="#" class="drag builder-element">
                        <div class="aj-imp-builder-icon {{icon}}"></div>
								<div class="aj-imp-builder-title">{{elementName}}</div>
							</a>
                     <div class="element-help hide">
                        Hi! I am help text to help you understand this element!
                     </div>'

         events : 
            'click a' : (e)->
               e.preventDefault()

         serializeData : ->
            data = super()
            data.elementName = ->
               if @title
                  return _.polyglot.t @title
               else
                  return _.polyglot.t @element

            data

         onRender : ->
            @$el.attr 'data-element', @model.get 'element'

         



      # Composite view wrapper for element box region
      class Views.MainView extends Marionette.CompositeView

         template : mainviewTpl

         className : 'aj-imp-drag-menu'

         id : 'controls-drag'

         itemView : Views.SingleElement

         # on show make the element draggable
         # secondly, make all the elements draggable
         onShow : ->
            @$el.css('position','fixed').draggable
               handle : "p.desc"
               addClasses : false
               containment : 'document'
               scroll : true

            @_setDraggableElements()

            # on click of body un highlight 
            $('body').on 'click',=>
               @$el.closest('#controls-drag').find('.element').removeClass 'selected-element'

            # triggered when an element is clicked in the builder area
            App.ElementsBoxApp.ElementsBoxEvtAggr.on 'highlight:element',(title)=>
                  @$el.closest('#controls-drag').find('li').removeClass 'selected-element'
                  @$el.closest('#controls-drag').find("li[data-element='#{title}']").addClass 'selected-element'


         # append html
         appendHtml : ( cv, view, index )->
            return if view.model.get( 'element' ) is 'Row'

            category = view.model.get( 'category' ) || 'content'
            switch category
               when 'hotel'
                  @$el.find( '#hotel-elements ul' ).append view.$el
               when 'room'
                  @$el.find( '#room-elements ul' ).append view.$el
               else
                  @$el.find( '#content-elements ul' ).append view.$el

            @_ifSingleRoom()
            @_setDraggableElements()

         _ifSingleRoom : ->
            isSingleRoom = Marionette.getOption @, 'singleroom'
            if not isSingleRoom
               @$el.find( '#room-elements ul' ).remove()
               roomSummaryhtml = '<ul class="aj-imp-builder-items clearfix">
                                      <li class="element" data-element="RoomSummary">
                                         <a href="#" class="drag builder-element">
                                             <div class="aj-imp-builder-icon bicon icon-uniF15B"></div>
                                             <div class="aj-imp-builder-title">Display Rooms</div>
                                         </a>
                                      </li>
                                    </ul>'
               @$el.find( '#room-elements' ).append( roomSummaryhtml )



         # set draggable elements
         _setDraggableElements : ->
            @$el.find( '*[data-element]' ).draggable
               connectToSortable : '.droppable-column'
               helper : @_getHelper
               delay : 5
               addClasses : false
               distance : 5
               revert : 'invalid'

         _getHelper : ->
            '<div class="element-helper"></div> '

         onPageTookOver : ->
            @$el.fadeOut()

         onPageReleased : ->
            @$el.fadeIn()
