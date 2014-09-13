define ['app'], (App)->
	
	App.module 'Media.EditMedia.Views', (Views, App)->
		class Views.EditMediaView extends Marionette.ItemView

			template: '<form action="" method="POST" role="form">
						  <!--<h5>{{#polyglot}}Media{{/polyglot}}</h5>-->
						  <div class="form-group">
						    <!--<label for="">{{#polyglot}}Title{{/polyglot}}</label>-->
						    <label for="">{{#polyglot}}Image Name{{/polyglot}}</label>
						    <input type="text" placeholder="" name="title" value="{{title}}" class="form-control" readonly ="readonly"/>
						  </div>
						  <!--<div class="form-group">-->
						    <!--<label for="">{{#polyglot}}Caption{{/polyglot}}</label>-->
						    <!--<input type="text" placeholder="" name="caption" value="{{caption}}" class="form-control"/>-->
						  <!--</div>-->
						  <!--<div class="form-group">-->
						    <!--<label for="">{{#polyglot}}Alt Text{{/polyglot}}</label>-->
						    <!--<input type="text" placeholder="" name="alt" value="{{alt}}" class="form-control"/>-->
						  <!--</div>-->
						  <!--<div class="form-group">-->
						    <!--<label for="">{{#polyglot}}Description{{/polyglot}}</label>-->
						    <!--<input type="text" placeholder="" name="description" value="{{description}}" class="form-control"/>-->
						  <!--</div>-->
						  <!--<button type="button" id="save-media-details" class="btn btn-sm aj-imp-orange-btn">{{#polyglot}}Save{{/polyglot}}</button>-->
						</form>'

			events :
				'click #save-media-details' : '_updateImageData'

			_updateImageData : ->
				data = Backbone.Syphon.serialize @
				@trigger 'update:image:data', data