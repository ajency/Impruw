define ['app','bootbox'], (App, bootbox)->

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
                            <button class="btn btn-xs remove-element">{{#polyglot}}Delete{{/polyglot}}</button>
						</a>'

            events :
                'click .remove-element' : (e)->
                    bootbox.confirm "<h4 class='delete-message'>#{ _.polyglot.t 'Are you sure?'}</h4><p>#{ _.polyglot.t 'You will lose this content permanently.'}</p>",(result)=>
                        if result is true
                            @trigger 'clear:element', @model.get 'meta_id'

            onShow:->
                @$el.attr 'id', 'unused-element-' + @model.get 'meta_id'


            serializeData: ->
                serializedData = super()
                serializedData.element = _.str.capitalize serializedData.element
                ele = serializedData.element
                if ele is 'Title' or ele is 'Text' or ele is 'ImageWithText'
                    content = @model.get('content')[WPML_DEFAULT_LANG] ? @model.get('content')
                else
                    content = ''

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

            childView: SingleUnusedElement

            emtpyView: EmptyUnsedElementView

            template: '<div class="label trash-label clearfix"><span><span class="glyphicon glyphicon-trash"></span> {{#polyglot}}Unused Elements{{/polyglot}}</span></div>
				        <div class="menu aj-imp-drag-menu">
				            <p class="desc">
				              {{#polyglot}}Unused deleted elements{{/polyglot}}
				            </p>
				            <a href="#" class="trash-elem-link clear-all-elements"><span class="bicon icon-uniF16F"></span> {{#polyglot}}Clear Elements{{/polyglot}}</a>
				            <ul class="trash-list">
				            </ul>
				        </div>
				    </div>'

            childViewContainer: 'ul.trash-list'

            events:
                'click a.clear-all-elements' : (e)->
                    e.preventDefault()
                    bootbox.confirm "<h4 class='delete-message'>#{ _.polyglot.t 'Are you sure?'}</h4><p>#{ _.polyglot.t 'All elements will be lost. You cannot undo this action.'}</p>",(result)=>
                        if result is true
                            @trigger 'clear:all:elements'

            onElementsCleared : ->
                @$el.find('a.clear-all-elements').hide()
                @$el.fadeOut 'fast', => @.close()

            onElementCleared : (id)->
                @$el.find('#unused-element-' + id).remove()
                if @$el.find('ul.trash-list li').length is 0
                    @$el.fadeOut 'fast', => @.close()


            # TODO: Move this code to plugins/ jquery config
            onShow: ->
                #Float Menu
                floatSpeed = 1500

                floatEasing = "easeOutQuint"

                menuFadeSpeed = 500

                closedMenuOpacity = 0.75

                flMenu = $ "#fl_menu"

                flMenuMenu = $ "#fl_menu .menu"

                flMenuTriggers = $ "#fl_menu .trash-label, #fl_menu .menu"

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

            onPageTookOver : ->
                @$el.fadeOut()

            onPageReleased : ->
                @$el.fadeIn()
