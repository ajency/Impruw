define ['app'
        'controllers/base-controller'], (App, AppController)->
            
    App.module 'SliderManager.GridView', (GridView, App, Backbone, Marionette, $, _)->
        class GridViewController extends AppController

            initialize: (opt)->
                {collection} = opt

                # pass the collection to composite view
                view = @_getSliderGridView collection

                # listen to create slider event from the view
                @listenTo view, "create:new:slider", () ->
                    Marionette.triggerMethod.call @region, "create:new:slider"

                # listen to create slider event from the view
                @listenTo view, "itemview:edit:slider", (iv, id) ->
                    Marionette.triggerMethod.call @region, "edit:slider", id

                # listen to delete slider event from the view
                @listenTo view, "itemview:delete:slider", (iv, id) ->
                    Marionette.triggerMethod.call @region, "delete:slider", id

                # show the view with loading indicator
                @show view, loading: true

            _getSliderGridView: (collection)->
                new SliderGridView
                    collection: collection


        class SliderView extends Marionette.ItemView

            template: '<div class="thumbnail"><img src="{{thumb_url}}" style="height:200px;width:100%"/>
                          <div class="caption">
                            <h5>{{title}}<span class="badge">Slides: {{no_of_slides}}</span></h5>
                          </div>
                          <div class="actions">
                            <button type="button" class="btn btn-default btn-xs edit-slider"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Edit</button>
                            <button type="button" class="btn btn-danger btn-xs delete-slider"><span class="glyphicon glyphicon-trash"></span>&nbsp;Delete</button>
                          </div>
                        </div>'

            className: 'col-sm-2'

            events:
                'click .edit-slider': ->
                    @trigger "edit:slider", @model.get 'id'
                'click .delete-slider': ->
                    if confirm(_.polyglot.t "Are you sure?")
                        @trigger "delete:slider", @model.get 'id'



        class SliderGridView extends Marionette.CompositeView

            template: '<div class="col-sm-2">
            									<a href="#" class="thumbnail create-slider"><span class="glyphicon glyphicon-plus-sign"></span><br>{{#polyglot}}Add New Slider{{/polyglot}}</a>
            								</div>'

            className: 'row sliders'

            itemView: SliderView

            events:
                'click a.create-slider': (e) ->
                    e.preventDefault()
                    @trigger "create:new:slider"


        App.commands.setHandler 'show:sliders:grid', (opts = {})->
            App.navigate 'slider-manager'
            new GridViewController opts
