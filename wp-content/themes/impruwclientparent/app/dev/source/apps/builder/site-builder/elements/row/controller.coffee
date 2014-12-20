define ['app', 'bootbox', 'apps/builder/site-builder/elements/row/views',
        'apps/builder/site-builder/elements/row/settings/controller'],
( App, bootbox )->
   App.module 'SiteBuilderApp.Element.Row', ( Row, App, Backbone, Marionette, $, _ )->

      # menu controller
      class Row.Controller extends App.SiteBuilderApp.Element.Controller

         # intializer
         initialize : ( options )->
            @isNew = _.isEmpty options.modelData
            _.defaults options.modelData,
               element : 'Row'
               columncount : 2
               elements : []
               meta_id : 0
               style : 'Default'

            super( options )

         bindEvents : ->
            # start listening to model events
            @listenTo @layout.model, "change:style", @changeStyle
            @listenTo @layout.model, "change:columncount", @columnCountChanged
            super()

         _getRowView : ()->
            new Row.Views.RowView
               model : @layout.model

         columnCountChanged : ( model )->
            @layout.elementRegion.currentView.triggerMethod "column:count:changed", model.get 'columncount'

         changeStyle : ( model )->
            prevStyle = model.previous( 'style' ) ? ''
            newStyle = model.get( 'style' )
            @layout.elementRegion.currentView.triggerMethod "style:changed", _.slugify( newStyle ), _.slugify( prevStyle )
            @layout.setHiddenField 'style', newStyle

         # setup templates for the element
         renderElement : ()=>
            @removeSpinner()
            # get menu
            row = @_getRowView()

            # on drop of a new row show popup
            @listenTo row, 'show',=>
               if @isNew
                  App.vent.trigger "show:row:settings:popup", @layout.model


            @listenTo row, "itemview:element:moved", @elementMoved

            @layout.elementRegion.show row
            @changeStyle @layout.model

            
         # element moved
         elementMoved : ( columnView, container )=>
            # App.execute "mark:section:as:modified", container
            # App.execute "auto:save"

            # remove the element model
         deleteElement : ( model )->
            if @hasNonDeletable model and ISTHEMEEDITOR is 'no'
               bootbox.alert '<h6>'+_.polyglot.t('This row contains non deletable elements. You cannot delete this row')+'</h6>'
               return

            if not @layout.elementRegion.currentView.$el.canBeDeleted()
               bootbox.confirm '<h6>'+_.polyglot.t('All elements inside the row will also be deleted. Do you want to continue?')+'</h6>', ( answer )->
                  if answer is yes
                     model.destroy()
                     _.delay ->
                        App.commands.execute "auto:save"
                     , 700
            else
               model.destroy()


         hasNonDeletable : (ele)->
            elementNameArray = @checkElement(ele.toJSON(),[])

            _.intersection(elementNameArray,['Menu','LanguageSwitcher']).length isnt 0

         checkElement : (ele,elementNameArray)->
            # console.log model
            if ele.element in ['Row','Column']
               _.each ele.elements,(element,idx)=>
                  @checkElement element,elementNameArray

            else
               elementNameArray.push ele.element

            elementNameArray
