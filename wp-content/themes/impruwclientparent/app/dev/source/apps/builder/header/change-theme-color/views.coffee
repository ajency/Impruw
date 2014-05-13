define ['app'], (App)->
    App.module 'ChangeThemeColorApp.Views', (Views, App, Backbone, Marionette, $, _)->
        class SingleSetView extends Marionette.ItemView

            tagName: 'li'

            template: '	<div class="thumbnail flipthis" >
            			  <div class="indicator"><span class="glyphicon glyphicon-ok"></span></div>
						  <div class="colors"></div>
						  <div class="caption">
							<h3>{{name}}</h3>
							<p>
								<a href="#" class="btn btn-xs btn-primary apply-theme-color" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a>
								<a href="#" class="btn btn-xs btn-default edit-theme-color" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a>
							</p>
						  </div>
						</div>'
            onShow: ->
                #display the colors in the set
                @displayColorSet()

                #highlight current set
                @highlightCurrentColorSet()

            highlightCurrentColorSet :->
                setName = @model.get 'name'
                if setName == THEMECOLORSET
                   @$el.find('.thumbnail').addClass 'selected'

            displayColorSet:->
                _.each @model.attributes, (colorValue, attributeName) =>
                    if attributeName != 'name'
                        @$el.find('.colors').append("<span style='background: #{colorValue};'>&nbsp;</span>")

            serializeData: ->
                data = super()
                data.THEMECOLORSET = THEMECOLORSET
                data

            events:
                'click .apply-theme-color': ->
                    @$el.find('.apply-theme-color').text('Applying..')
                    @trigger "change:theme:color", @model

                'click .edit-theme-color': ->
                    @trigger "edit:theme:color:clicked",@model
                    #@getEditView()
                    #@showColorPicker()

            getEditView: ->
                setColorHtmlObject = @$el.find('.flipthis')
                setColorHtml = setColorHtmlObject.get '0'
                back = undefined
                setName =  @model.get 'name'
                back_content = "<div class='edit-colors'>
                                    <h5> #{setName}</h5>
                                    <div class='color-sets'>"+
                                    @displayEditColorSet()+
                                    "</div>
                                    <div class='actions'>
                                        <button id='closeCard' class='btn btn-xs'>Cancel</button>
                                        <button id='applyCard' class='btn btn-xs btn-primary'>Apply</button>
                                    </div>
                                </div>"
                back = flippant.flip(setColorHtml, back_content, "modal")
                $('#closeCard').on 'click',@closeEditView back

            closeEditView:(back)->
                back.close()

            showColorPicker:->
                $('.color-picker-box').on 'click',->
                     $(@).minicolors()


            displayEditColorSet :->
                colorSetHtml = " "
                _.each @model.attributes, (colorValue, attributeName) =>
                    if attributeName != 'name'
                        colorSetHtml += "<div class='color row'>
                                            <div class='col-sm-2'>
                                                <span class='color-picker-box' style='background: #{colorValue};'>Click to Edit</span>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>#{attributeName}</h6>
                                                <p>Used in Headings, Links, Menu, Buttons and Accents</p>
                                            </div>
                                        </div>"
                colorSetHtml



        class EmptyView extends Marionette.ItemView

            tagName: 'li'

            template: 'No theme color set found'


        class Views.ThemeColorSetView extends Marionette.CompositeView

            template: ' <ul class="color-set-list"></ul>'

            itemView: SingleSetView

            emptyView: EmptyView

            itemViewContainer: '.color-set-list'
							
