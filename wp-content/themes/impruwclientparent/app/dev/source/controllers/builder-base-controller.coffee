define ["marionette"
        "app"], (Marionette, App) ->
            
    class AppController extends Marionette.Controller

        constructor: (options = {}) ->
            @_instance_id = _.uniqueId "elementcontroller"
            App.commands.execute "register:builder:instance", @, @_instance_id
            super options

        # close the controller.
        # unregister the controller instance from application object
        close: (args...) ->
            # close the layout first
            if @layout
                @layout.close()
            delete @layout
            delete @options
            App.commands.execute "unregister:builder:instance", @, @_instance_id
            super args

        # add new element to the section
        add: (layout, section)->
            @listenTo layout, 'close', @close
            type = layout.model.get "element"
            if section.find("li[data-element='#{type}']").length is 1
                section.find("li[data-element='#{type}']").replaceWith layout.$el
            else
                section.append layout.$el

            # remove empty-column class if found
            section.removeClass 'empty-column'

            layout.render()
            layout.triggerMethod 'show'

            # for row add hidden fields
            @layout.addHiddenFields() if layout.model.get('element') in ['Row','Tabs','Accordion']

            #check if element need save
            if not layout.model.isNew() or layout.model.get('element') is 'Row'
                layout.triggerMethod "before:render:element"
                try
                    @renderElement()
                catch e
                    @layout.elementRegion.show @_getErrorView()