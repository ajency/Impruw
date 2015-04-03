define ['app'], (App)->
    App.module 'SiteBuilderApp.Publish', (Publish, App, Backbone, Marionette, $, _)->
        window.SAVING = false

        # Controller class for showing header resion
        class Publish.Controller extends Marionette.Controller

            publish: ()->
                return if window.SAVING is true

                siteRegion = App.builderRegion.$el

                _sectionJson = @_getPageJson siteRegion

                if not _.isObject _sectionJson
                    throw new Error "invalid json..."

                _page_id = App.request "get:original:editable:page"

                options =
                    type: 'POST'
                    url: AJAXURL
                    data:
                        action: 'publish-page'
                        page_id: _page_id
                        instance_id : App.instanceId

                options.data = _.defaults options.data, _sectionJson
                window.SAVING = true
                $.ajax(options).done (response)->
                    if response.success is true
                        App.execute "update:revision:on:published",response.revision
                        App.vent.trigger "page:published"
                    else if response.success is false and response.new_instance
                        App.vent.trigger "new:instance:opened", response
                    else
                        App.vent.trigger "publish:failed", response.reason

                .always (resp)->
                    window.SAVING = false
                
            # get the json
            _getPageJson: ($site)->

                # error = false

                _json = {}

                _.each ['header', 'page-content', 'footer'], (section, index)=>
                    #if App.request "is:section:modified", section
                    _json["#{section}-json"] = JSON.stringify @_getJson $site.find "#site-#{section}-region"
                
                    # if _.isEmpty JSON.parse _json["#{section}-json"]
                    #     error = true

                # if error
                #     return false

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

                    if ele.element is 'Tabs'
                        ele.draggable = $(element).children('form').find('input[name="draggable"]').val() is "true"
                        ele.style = $(element).children('form').find('input[name="style"]').val()
                        ele.justified = $(element).children('form').find('input[name="justified"]').val()
                        # delete ele.meta_id
                        ele.meta_id = $(element).find('form input[name="meta_id"]').val()    
                        ele.elements = []
                        _.each $(element).children('.element-markup').children('.tab-container').children('.tab-content').children('.column'), (column, index)=>
                            id = $(column).attr('id')
                            tabName = {}
                            $(element).children('.element-markup').children('.tab-container').find("form[data-id=#{id}] input").each (index,input)->
                                tabName[$(input).prop('name')] = $(input).val()
                            # className = $(column).attr 'data-class'
                            col =
                                position: index + 1
                                element: 'TabPane'
                                tabName : tabName
                                # className: className
                                elements: @_getJson $(column)

                            ele.elements.push col
                            return

                    if ele.element is 'Accordion'
                        ele.draggable = $(element).children('form').find('input[name="draggable"]').val() is "true"
                        ele.style = $(element).children('form').find('input[name="style"]').val()
                        ele.meta_id = $(element).find('form input[name="meta_id"]').val()                        
                        ele.elements = []
                        _.each $(element).children('.element-markup').children('.accordion-container').children('.panel-group').children('.panel'), (column, index)=>
                            # tabName = $(column).children('.panel-heading').find('a').text()
                            tabName = {}
                            $(column).children('.panel-heading').find('form input').each (index,input)->
                                tabName[$(input).prop('name')] = $(input).val()
                            # className = $(column).attr 'data-class'
                            col =
                                position: index + 1
                                element: 'AccordionTab'
                                tabName : tabName
                                # className: className
                                elements: @_getJson $(column).children('.panel-collapse').children('.column')

                            ele.elements.push col
                            return

                    arr.push ele

                arr
