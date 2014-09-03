define ['app'
		'controllers/base-controller'
		'apps/slider-manager/edit-slider/slide-text-layer/slide-text-layer-views'
], (App, AppController)->

	App.module "SliderManager.SlideTextLayer",(SlideTextLayer,App)->

		class SlideTextLayer.Controller extends AppController

			initialize : (options)->
				{@model} = options

				@collection = new Backbone.Collection @model.get('layers')
				console.log @collection

				@view = @_getTextLayerView()

				@listenTo @view,'add:text:layer',->
					layerModel = new Backbone.Model @layerDefault()
					console.log layerModel
					@collection.add layerModel

				@listenTo @view,'itemview:remove:text:layer',(itemview)->
					@collection.remove itemview.model	

				@collection.on 'add remove',=>
					@collection.each (model,index)->
						model.set 'serial',index

				@listenTo @view,'save:layers',->
					@model.set 'layers', @collection.toJSON()
					@model.save()
					Marionette.triggerMethod.call @region, "slide:layers:saved"


				@show @view

			onClose :->
				console.log 'closed'

			

			_getTextLayerView : ->
				new SlideTextLayer.Views.TextlayerListView
					collection : @collection

			layerDefault : ->
				align_hor: "left"
				align_vert: "top"
				alt: ""
				animation: "tp-fade"
				attrClasses: ""
				attrID: ""
				attrRel: ""
				attrTitle: ""
				corner_left: "nothing"
				corner_right: "nothing"
				easing: "Power3.easeInOut"
				endSpeedFinal: 300
				endTimeFinal: 8700
				endanimation: "auto"
				endeasing: "nothing"
				endspeed: 300
				endsplit: "none"
				endsplitdelay: "10"
				endtime: ""
				height: -1
				hiddenunder: false
				left: 100
				link: ""
				link_open_in: "same"
				link_slide: "nothing"
				max_height: "auto"
				max_width: "auto"
				realEndTime: 9000
				resizeme: true
				scaleProportional: false
				scaleX: ""
				scaleY: ""
				scrollunder_offset: ""
				serial: 0
				speed: 300
				split: "none"
				splitdelay: "10"
				style: "black"
				text: "Caption Text1"
				time: 500
				timeLast: 8500
				top: 100
				type: "text"
				whitespace: "nowrap"
				width: -1


		App.commands.setHandler 'show:slide:text:layer',(opts)->
			new SlideTextLayer.Controller opts
