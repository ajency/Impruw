define ['app'], (App)->
    App.module 'SiteBuilderApp.AutoSave', (AutoSave, App, Backbone, Marionette, $, _)->
        window.SAVING = false

        # Controller class for showing header resion
        class AutoSave.Controller extends Marionette.Controller

            # initialize the controller. Get all required entities and show the view
            initialize: (opt = {})->

                # autoSave
            autoSave: ()->
                return if window.SAVING is true

                siteRegion = App.builderRegion.$el

                _sectionJson = @_getPageJson siteRegion

                if not _.isObject _sectionJson
                    throw new Error "invalid json..."

                _page_id = App.request "get:current:editable:page"
                return
                options =
                    type: 'POST'
                    url: AJAXURL
                    data:
                        action: 'auto-save'
                        page_id: _page_id

                options.data = _.defaults options.data, _sectionJson
                window.SAVING = true
                $.ajax(options).done (response)->
                    window.SAVING = false
                .fail (resp)->
                        window.SAVING = false

            # get the json
            _getPageJson: ($site)->
                _json = {}

                _.each ['header', 'page-content', 'footer'], (section, index)=>
                    #if App.request "is:section:modified", section
                    _json["#{section}-json"] = JSON.stringify @_getJson $site.find "#site-#{section}-region"

                _json

            # generate the JSON for the layout
            # loops through rows and nested columns and elements inside it
            _getJson: ($element, arr = [])->

                # find all elements inside $element container
                elements = $element.children '.element-wrapper'

                _.each elements, (element, index)=>
                    ele =
                        element: $(element).find('form input[name="element"]').val()
                        meta_id: parseInt $(element).find('form input[name="meta_id"]').val()

                    if ele.element is 'Row'
                        ele.draggable = $(element).children('form').find('input[name="draggable"]').val() is "true"
                        ele.style = $(element).children('form').find('input[name="style"]').val()
                        delete ele.meta_id
                        ele.elements = []
                        _.each $(element).children('.element-markup').children('.row').children('.column'), (column, index)=>
                            className = $(column).attr 'data-class'
                            col =
                                position: index + 1
                                element: 'Column'
                                className: className
                                elements: @_getJson $(column)

                            ele.elements.push col
                            return

                    arr.push ele

                arr


        App.commands.setHandler "unused:element:added", (metaId, _page_id)->

            $.ajax
                type: 'POST'
                url: AJAXURL
                data:
                    action: 'remove-unused-element'
                    page_id: _page_id
                    element_meta_id : metaId
                success:->
                    console.log "element removed from unused list"
