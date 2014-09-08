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
								{{{content}}}
							</div>
						</a>'

            serializeData: ->
                serializedData = super()
                serializedData.element = _.str.capitalize serializedData.element
                content = @model.get('content')[WPML_DEFAULT_LANG] ? @model.get('content')
                serializedData.content = _.stripslashes content
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

            template: '<div class="label trash-label clearfix"><span><span class="glyphicon glyphicon-trash"></span> {{#polyglot}}Unused Elements{{/polyglot}}</span></div>
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


            # TODO: Move this code to plugins/ jquery config
            onShow: ->
                #Float Menu
                floatSpeed = 1500

                floatEasing = "easeOutQuint"

                menuFadeSpeed = 500

                closedMenuOpacity = 0.75

                flMenu = $ "#fl_menu"

                flMenuMenu = $ "#fl_menu .menu"

                flMenuTriggers = $ "#fl_menu .label span, #fl_menu .menu"

                FloatMenu = ()->
                    scrollAmount = $(document).scrollTop()
                    newPosition = menuPosition + scrollAmount
                    if $(window).height() < flMenu.height() + flMenuMenu.height()
                        flMenu.css "top", menuPosition
                    else
                        flMenu.stop().animate top: newPosition, floatSpeed, floatEasing

                menuPosition = $("#fl_menu").position().top

                menuPosition = $("#fl_menu").position().top
                FloatMenu()
                flMenuTriggers.hover ->
                    $("#fl_menu .menu").show()
                , ->
                    $("#fl_menu .menu").hide()

                $(window).scroll ->
                    FloatMenu()

                @makeElementsDraggable()


            makeElementsDraggable: ->
                @$el.find('*[data-element]').draggable
                                            connectToSortable: '.droppable-column'
                                            delay: 5
                                            addClasses: false
                                            distance: 5
                                            revert: 'invalid'
