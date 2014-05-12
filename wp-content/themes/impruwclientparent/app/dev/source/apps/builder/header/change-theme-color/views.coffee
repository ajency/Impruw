define ['app'], (App)->
    App.module 'ChangeThemeColorApp.Views', (Views, App, Backbone, Marionette, $, _)->
        class SingleSetView extends Marionette.ItemView

            tagName: 'li'

            template: '<div class="thumbnail" id="flipthis">
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

            highlightCurrentColorSet: ->
                setName = @model.get 'name'
                if setName == THEMECOLORSET
                    @$el.find('.thumbnail').addClass 'selected'

            displayColorSet: ->
                _.each @model.attributes, (colorValue, index) =>
                    if index != 'name'
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
                    @getEditView()

            getEditView: ->
                front = @$el.find('#flipthis').html()
                front2 = document.getElementById("flipthis")
                back = undefined
                back_content = "<div class='edit-colors'>
                                    <h5>Color Set 1</h5>
                                    <div class='color-sets'>
                                        <div class='color row'>
                                            <div class='col-sm-2'>
                                                <span class='color-picker-box' style='background: #FF5F5F;'>Click to Edit</span>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>Primary Color</h6>
                                                <p>Used in Headings, Links, Menu, Buttons and Accents</p>
                                            </div>
                                        </div>
                                        <div class='color row'>
                                            <div class='col-sm-2'>
                                                <span class='color-picker-box' style='background: #2A3B66;'>Click to Edit</span>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>Secondary Color</h6>
                                                <p>Used in Headings, Links, Menu, Buttons and Accents</p>
                                            </div>
                                        </div>
                                        <div class='color row'>
                                            <div class='col-sm-2'>
                                                <span class='color-picker-box' style='background: #16A2F5;'>Click to Edit</span>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>Tertiary Color</h6>
                                                <p>Used in Headings, Links, Menu, Buttons and Accents</p>
                                            </div>
                                        </div>
                                        <div class='color row'>
                                            <div class='col-sm-2'>
                                                <span class='color-picker-box' style='background:#CCCCCC;'>Click to Edit</span>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>Background Color</h6>
                                                <p>Used in Headings, Links, Menu, Buttons and Accents</p>
                                            </div>
                                        </div>
                                        <div class='color row'>
                                            <div class='col-sm-2'>
                                                <span class='color-picker-box' style='background: #333333;'>Click to Edit</span>
                                            </div>
                                            <div class='col-sm-10'>
                                                <h6>Text Color</h6>
                                                <p>Used in Headings, Links, Menu, Buttons and Accents</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='actions'>
                                        <button id='closeCard' class='btn btn-xs'>Cancel</button>
                                        <button id='applyCard' class='btn btn-xs btn-primary'>Apply</button>
                                    </div>
                                </div>"
                back = flippant.flip(front2, back_content, "modal")


        class EmptyView extends Marionette.ItemView

            tagName: 'li'

            template: 'No theme color set found'


        class Views.ThemeColorSetView extends Marionette.CompositeView

            template: ' <ul class="color-set-list"></ul>'

            itemView: SingleSetView

            emptyView: EmptyView

            itemViewContainer: '.color-set-list'
							
