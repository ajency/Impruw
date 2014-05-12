define ['app'],(App)->

			App.module 'ChangeThemeColorApp.Views', (Views, App, Backbone, Marionette, $, _)->
				
				class SingleSetView extends Marionette.ItemView

					tagName: 'li'

					template : '<div class="thumbnail" id="flipthis">
								  <div class="colors"></div>
								  <div class="caption">
									<h3>{{name}}</h3>
									<p>
										<a href="#" class="btn btn-xs btn-primary apply-theme-color" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a>
										<a href="#" class="btn btn-xs btn-default" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a>
									</p>
								  </div>
								</div>'
					onShow:->
						@model.unset 'name'
						_.each @model.attributes,(colorValue,index) =>
							@$el.find('.colors').append("<span style='background: #{colorValue};'>&nbsp;</span>")

					serializeData :->
						data = super()
						data
					
					events :
						'click .apply-theme-color' :->
							@trigger "change:theme:color", @model



				class EmptyView extends Marionette.ItemView

					tagName: 'li'

					template: 'No theme color set found'
				
				
				class Views.ThemeColorSetView extends Marionette.CompositeView

					template : ' <ul class="color-set-list"></ul>'
									   
					itemView: SingleSetView

					emptyView : EmptyView

					itemViewContainer: '.color-set-list'
							
