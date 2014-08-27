define ['app'], (App)->
    
    App.module 'UnusedElement.Views', (Views, App, Backbone, Marionette, $, _)->
        
        class SingleUnusedElement extends Marionette.ItemView

            tagName: 'li'

            className: 'trash-elem'

            template: '<a href="#">
							<div class="trash-elem-header">
								<span class="bicon icon-uniF111"></span> {{element}}
							</div>
							<div class="trash-elem-content">
								{{content}}
							</div>
						</a>'

            serializeData: ->
                serializedData = super()
                serializedData.element = _.str.capitalize serializedData.element
                serializedData

            onRender: ->
                @$el.attr 'data-element', @model.get 'element'
                .attr 'data-meta-id', @model.get 'meta_id'

        class EmptyUnsedElementView extends Marionette.ItemView

            tagName: 'li'

            className: 'trash-elem'

            template: 'No unsed elements'


        class Views.UnsedElementsViews extends Marionette.CompositeView

            itemView: SingleUnusedElement

            emtpyView: EmptyUnsedElementView

            className: 'right-toolbox'

            template: '<div class="handle-right"><span class="bicon icon-uniF164"></span></div>
                        
                        <div class="aj-imp-builder-top-options "> 
                            <a href="#" class="builder-help">{{#polyglot}}Need Help{{/polyglot}}&nbsp;<span class="bicon icon-uniF13B"></span></a>
                        </div>

                        <a href="#choose-theme" class="btn btn-xs choose-theme"><span class="bicon icon-uniF185"></span>{{#polyglot}}Switch Theme{{/polyglot}}</a>
                        <div id="aj-imp-color-sel"> 
                         <!-- <a class="btn btn-default" data-toggle="modal" href="#theme-color-pop">Change Theme Colors</a> -->
                          <a class="btn btn-default">{{#polyglot}}Change Theme Colors{{/polyglot}}</a>
                        </div>

                        <div class="label trash-label clearfix"><span><span class="glyphicon glyphicon-trash"></span> {{#polyglot}}Unused Elements{{/polyglot}}</span></div>
					        <div class="menu aj-imp-drag-menu">
					            <p class="desc">
					              {{#polyglot}}Unused deleted elements{{/polyglot}}
					            </p>
					            <a href="#" class="trash-elem-link"><span class="bicon icon-uniF16F"></span> {{#polyglot}}Clear Elements{{/polyglot}}</a>
					            <ul class="trash-list">
					            </ul>
					        </div>
            		    </div>'

            itemViewContainer: 'ul.trash-list'

            events : 
                'click #aj-imp-color-sel' :-> @trigger "show:theme:color:clicked" 


            # TODO: Move this code to plugins/ jquery config
            onShow: ->
                @$el.tabSlideOut
                    tabHandle: '.handle-right'                   
                    tabLocation: 'right'                     
                    speed: 300                              
                    action: 'click'                          
                    topPos: '90px'                          
                    fixedPosition: true
                #Float Menu
                # floatSpeed = 1500

                # floatEasing = "easeOutQuint"

                # menuFadeSpeed = 500

                # closedMenuOpacity = 0.75

                # flMenu = $ "#fl_menu"

                # flMenuMenu = $ "#fl_menu .menu"

                flMenuTriggers = $ "#fl_menu .label span, #fl_menu .menu"

                # FloatMenu = ()->
                #     scrollAmount = $(document).scrollTop()
                #     newPosition = menuPosition + scrollAmount
                #     if $(window).height() < flMenu.height() + flMenuMenu.height()
                #         flMenu.css "top", menuPosition
                #     else
                #         flMenu.stop().animate top: newPosition, floatSpeed, floatEasing

                # menuPosition = $("#fl_menu").position().top

                # menuPosition = $("#fl_menu").position().top
                # FloatMenu()
                flMenuTriggers.hover ->
                    $("#fl_menu .menu").show()
                , ->
                    $("#fl_menu .menu").hide()

                # $(window).scroll ->
                #     FloatMenu()

                @makeElementsDraggable()


            makeElementsDraggable: ->
                @$el.find('*[data-element]').draggable
                                            connectToSortable: '.droppable-column'
                                            delay: 5
                                            addClasses: false
                                            distance: 5
                                            revert: 'invalid'
