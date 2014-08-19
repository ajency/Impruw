define ['app'
		'apps/builder/site-builder/elements/widget/views'
        'apps/builder/site-builder/elements/widget/settings/controller'
],(App,RegionController)->
	App.module 'SiteBuilderApp.Element.Widget',(Widget,App)->

		class Widget.Controller extends App.SiteBuilderApp.Element.Controller

			 # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'Widget'
                    type : ''
                    widgetCode : ''#'<iframe  width="1280" height="720" src="//www.youtube.com/embed/nZVIGsm5WeY" frameborder="0" allowfullscreen></iframe>'
                        # '<div class="fb-widget"><div class="fb-like-box" data-href="https://www.facebook.com/FacebookDevelopers" data-width="500" data-colorscheme="light" data-show-faces="true" data-header="true" data-stream="false" data-show-border="true"></div></div>'                    
                    #'<iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;width&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=80" 
                    	# scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:80px;" allowTransparency="true"></iframe>'

                super(options)

            bindEvents: ->
                # start listening to model events.
                super()

            _getWidgetView: ->
                new Widget.Views.WidgetView
                    model : @layout.model
                    # style: style


            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                # get the social element collection
                # collection = App.request "get:site:widget"
                #console.log collection
                @view = @_getWidgetView() #collection, style

                # @listenTo @view,'save:html:data',(htmlData)=>
                # 	@layout.model.set 'htmlData',htmlData
                # 	console.log @layout.model
                # 	@layout.model.save()

                @layout.elementRegion.show @view