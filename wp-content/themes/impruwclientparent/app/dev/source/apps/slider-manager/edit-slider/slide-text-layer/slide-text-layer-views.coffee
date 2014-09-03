define ['app'
],(App)->
	App.module 'SliderManager.SlideTextLayer.Views',(Views,App)->

		class NoTextLayerView extends Marionette.ItemView

			template : '<div>There are no layers for this slide. Click on the add button to add a Text Layer</div>'

		class TextLayerView extends Marionette.ItemView

			className : 'text-layer-view'

			template : '<div class="edit-text-layer"><input type="text" value="{{text}}" /></div>
						<div class="view-text-layer">{{text}}</div><div class="pull-right"><button class="remove-layer"> remove </button></div>'

			events : 
				'blur input' : (e)->
					@model.set 'text',$(e.target).val()
				'click .view-text-layer' : ->
					@$el.siblings().removeClass('text-layer-edit').addClass('text-layer-view')
					@$el.removeClass('text-layer-view').addClass('text-layer-edit')
				'click .remove-layer' :->
					@trigger 'remove:text:layer'

		class Views.TextlayerListView extends Marionette.CompositeView

			template : '<div id="text-layers"></div>
						<button id="add-text-layer"> Add Layer</button>
						<button id="save-layers"> Save Slide </button>'

			itemView : TextLayerView

			emptyView : NoTextLayerView

			itemViewContainer : '#text-layers'

			events : 
				'click #add-text-layer' : '_addTextLayer'
				'click #save-layers' : '_saveLayers'

			initialize : ->


			_addTextLayer : ->
				@trigger 'add:text:layer'

			_saveLayers : ->
				@trigger 'save:layers'


