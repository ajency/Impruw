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
								<a href="#" class="btn btn-xs btn-primary apply-theme-color" role="button"><span class="glyphicon glyphicon-check"></span> {{#polyglot}}Apply{{/polyglot}}</a>
								<a href="#" class="btn btn-xs btn-default edit-theme-color" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> {{#polyglot}}Edit{{/polyglot}}</a>
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

                if _.slugify(setName) is _.slugify THEMECOLORSET
                   @$el.find('.thumbnail').addClass 'selected'

            displayColorSet:->
                _.each @model.attributes, (attributeValue, attributeName) =>
                    if attributeName != 'name'
                        @$el.find('.colors').append("<span style='background: #{attributeValue.color};'>&nbsp;</span>")

            serializeData: ->
                data = super()
                data.THEMECOLORSET = THEMECOLORSET
                data.name = _.polyglot.t @model.get 'name'
                data

            events:
                'click .apply-theme-color': ->
                    @$el.find('.apply-theme-color').text('Applying..')
                    @trigger "change:theme:color", @model

                'click .edit-theme-color': ->
                    @trigger "edit:theme:color:clicked",@model

        class EmptyView extends Marionette.ItemView

            tagName: 'li'

            template: 'No theme color set found'


        class Views.ThemeColorSetView extends Marionette.CompositeView

            template: '<ul class="color-set-list"></ul>'

            itemView: SingleSetView

            emptyView: EmptyView

            itemViewContainer: '.color-set-list'
							
