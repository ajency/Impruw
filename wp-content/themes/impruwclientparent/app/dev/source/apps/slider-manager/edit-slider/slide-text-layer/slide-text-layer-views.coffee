define ['app'
],(App)->
	App.module 'SliderManager.SlideTextLayer.Views',(Views,App)->

		class Views.TextLayerView extends Marionette.ItemView

			className : 'row'

			# template : '<div class="slide-display" style="text-align:center;">
			# 				<div class="movable" style="position : absolute; top : {{top}}px; left: {{left}}px; z-index:1000">{{text}}</div>
			# 				<img style=" height:100%; max-width:100%; position : relative" src="{{full_url}}">
			# 			</div>
			# 			<div id="edit-text-layers">
			# 				<input id="edit-caption-text" type="text" value="{{text}}" />
			# 				<select id="edit-caption-style">
			# 					<option value="large_bold_white">Large Bold White</option>
			# 					<option value="large_bold_black">Large Bold Black</option>
			# 					<option value="excerpt">Excerpt</option>
			# 					<option value="very-big-white">Very Big White</option>
			# 					<option value="very-big-black">Very Big Black</option>
			# 				</select>
			# 			</div>
			# 			<button id="remove-text-layer">Remove Text</button>
			# 			<button id="save-text-layer"> Save Slide </button>'

			template : '<div id="text-not-entered" class="alert alert-error hide">{{#polyglot}}Please enter text before saving{{/polyglot}}</div>
						<div class="col-sm-12 ">
					  	<form action="" method="POST" role="form" class="form-horizontal" validate>
					  		<div class="form-group ">
						        <label for="" class="col-sm-4 control-label">{{#polyglot}}Enter Caption Text{{/polyglot}}</label>
						        <div class="col-sm-8">
						          	<input type="text" name="text" class=" form-control" placeholder="Enter caption text"/>
						        </div>
						    </div>
						    <div class="form-group ">
						        <label for="" class="col-sm-4 control-label">{{#polyglot}}Caption Style{{/polyglot}}</label>
						        <div class="col-sm-8">
							        <select name="style">
							        	<option value="black">Black</option>
								       	<option value="large_bold_white">Large Bold White</option>
										<option value="large_bold_black">Large Bold Black</option>
										<option value="excerpt">Excerpt</option>
										<option value="very_big_white">Very Big White</option>
										<option value="very_big_black">Very Big Black</option>
							        </select>
						        </div>
						    </div>
					<!--	    <div class="form-group ">
						        <label for="" class="col-sm-4 control-label">{{#polyglot}}Text Animation{{/polyglot}}</label>
						        <div class="col-sm-8">
							        <select name="animation">
								       	<option value="tp-fade">Fade</option>
										<option value="sft">Short from Top</option>
										<option value="sfl">Short from Left</option>
										<option value="lft">Long from Top</option>
										<option value="lfl">Long from Left</option>
							        </select>
						        </div>
						    </div> -->
						    <div class="form-group ">
						        <label for="" class="col-sm-4 control-label">{{#polyglot}}Horizontal Position{{/polyglot}}</label>
						        <div class="col-sm-8">
							        <select name="left">
								        <option value="left">{{#polyglot}}Left{{/polyglot}}</option>
								        <option value="center">{{#polyglot}}Center{{/polyglot}}</option>
							            <option value="right">{{#polyglot}}Right{{/polyglot}}</option>
							        </select>
						        </div>
						    </div>
						    <div class="form-group ">
						        <label for="" class="col-sm-4 control-label">{{#polyglot}}Vertical Position{{/polyglot}}</label>
						        <div class="col-sm-8">
							        <select name="top">
								        <option value="top">{{#polyglot}}Top{{/polyglot}}</option>
								        <option value="center">{{#polyglot}}Center{{/polyglot}}</option>
							            <option value="bottom">{{#polyglot}}Bottom{{/polyglot}}</option>
							        </select>
						        </div>
						    </div>
						    <div class="form-group ">
						    	<button type="button"  class="btn btn-sm aj-imp-submit" id="save-slide-layer"> Save </button>
						    	<button type="button" class="btn btn-sm aj-imp-submit" id="cancel-slide-layer"> Cancel </button>
						    	<button type="button" class="btn btn-sm aj-imp-submit" id="delete-slide-layer"> Delete </button>
						    </div>
					  	</form>'

			events : 
				'click #save-slide-layer' : (e)->
					data = Backbone.Syphon.serialize @
					if data.text is ''
						@$el.find('#text-not-entered').removeClass 'hide'
					else
						layer =  @model.get('layers')[0]
						_.extend layer, data
						@model.set 'layers', [layer]
						@trigger 'save:text:layer'

				'click #delete-slide-layer' : (e)->
					@model.set 'layers', []
					@trigger 'save:text:layer'

				'click #cancel-slide-layer' : (e)->
					@trigger 'cancel:text:layer'

			onShow :->
				Backbone.Syphon.deserialize @, @model.get('layers')[0]


			# mixinTemplateHelpers : (data)->
			# 	data = super data 
			# 	data.top = @model.get('layers')[0].top if not _.isEmpty @model.get('layers')
			# 	data.left = @model.get('layers')[0].left if not _.isEmpty @model.get('layers')
			# 	data.text = @model.get('layers')[0].text if not _.isEmpty @model.get('layers')
			# 	data

			# events : 
			# 	'click #remove-text-layer' : '_removeTextLayer'
			# 	'click #save-text-layer' : '_saveTextLayer'
			# 	'blur #edit-caption-text' : (e)->
			# 		@$el.find(".movable").html $(e.target).val()

			# onShow:->
				
			# 	@$el.closest('#text-layers').siblings('.slide-display').find("##{@textId}").draggable
			# 		stop : (evt,ui)=>
			# 			@model.set 'top',ui.position.top
			# 			@model.set 'left',ui.position.left

			# _removeTextLayer :->
			# 	@trigger 'remove:slide:text'

			# _saveTextLayer : ->
			# 	layerData = 
			# 		text : @$el.find('#edit-caption-text').val()
			# 		style : @$el.find('#edit-caption-style').val()


		# class NoTextLayerView extends Marionette.ItemView

		# 	template : '<div>There are no layers for this slide. Click on the add button to add a Text Layer</div>'

		# class TextLayerView extends Marionette.ItemView

		# 	className : 'text-layer-view'

		# 	template : '<div class="edit-text-layer">
		# 						<input type="text" value="{{text}}" />
		# 				</div>
		# 				<div class="view-text-layer">{{text}}</div><div class="pull-right"><button class="remove-layer"> remove </button></div>'

		# 	events : 
		# 		'blur input' : (e)->
		# 			@model.set 'text',$(e.target).val()
		# 			@$el.closest('#text-layers').siblings('.slide-display').find("##{@textId}").html $(e.target).val()
		# 		'click .view-text-layer' : ->
		# 			@$el.siblings().removeClass('text-layer-edit').addClass('text-layer-view')
		# 			@$el.removeClass('text-layer-view').addClass('text-layer-edit')
		# 		'click .remove-layer' :->
		# 			@trigger 'remove:text:layer'

		# 	onShow : ->
		# 		@textId = _.uniqueId 'text-'
		# 		@$el.closest('#text-layers').siblings('.slide-display').prepend("<div class='movable' id='#{@textId}' style='position : absolute; top : #{@model.get('top')}px; left:#{@model.get('left')}px; z-index:1000'>#{@model.get('text')}</div>")
		# 		@$el.closest('#text-layers').siblings('.slide-display').find("##{@textId}").draggable
		# 			stop : (evt,ui)=>
		# 				@model.set 'top',ui.position.top
		# 				@model.set 'left',ui.position.left

								      
				  

		# 	onClose : ->
		# 		@$el.closest('#text-layers').siblings('.slide-display').find("##{@textId}").remove()



		# class Views.TextlayerListView extends Marionette.CompositeView

		# 	template : '<div class="slide-display" style="text-align:center;"><img style=" height:100%; max-width:100%; position : relative" src="{{full_url}}"></div>
		# 				<div id="text-layers"></div>
		# 				<button id="add-text-layer">Add Layer</button>
		# 				<button id="save-layers"> Save Slide </button>'

		# 	itemView : TextLayerView

		# 	emptyView : NoTextLayerView

		# 	itemViewContainer : '#text-layers'

		# 	events : 
		# 		'click #add-text-layer' : '_addTextLayer'
		# 		'click #save-layers' : '_saveLayers'

		# 	initialize : ->


		# 	onShow:->
		# 		ratio = App.currentImageRatio.split(':')
		# 		width =  @$el.find('.slide-display').width()
		# 		height = width * ratio[1] / ratio[0]
		# 		@$el.find('.slide-display').width width
		# 		@$el.find('.slide-display').height height



		# 	_addTextLayer : ->
		# 		@trigger 'add:text:layer'

		# 	_saveLayers : ->
		# 		@trigger 'save:layers'