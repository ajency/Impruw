define ['app'],(App)->

	# Row views
	App.module 'FacilitiesApp.List.Views', (Views, App, Backbone, Marionette, $, _)->

		#empty view
		class FacilityItem extends Marionette.ItemView

			className : 'facility'

			tagName: 'div'

			template : '<div class="display_facility">
							<label for="checkbox2" class="checkbox ">
								<span class="icons">
									<span class="first-icon fui-checkbox-unchecked"></span>
									<span class="second-icon fui-checkbox-checked"></span>
								</span>
								<input type="checkbox" data-toggle="checkbox" name="facility[{{term_id}}]" value="{{term_id}}">
								<span class="facility-name">{{name}}</span>
							</label>
							<div class="action">
								<a href="javascript:void(0)" class="edit">Edit</a>&nbsp;
								<a href="javascript:void(0)" class="delete">Delete</a>
							</div>
						</div>
						<div class="update_facility hidden">
							<form class="facility_update">
							<input type="text" name="facility_name" class="form-control input-sm" value="{{name}}" />
							<div class="">
								<a href="javascript:void(0)" class="update">Update</a>&nbsp;&nbsp;
								<a href="javascript:void(0)" class="cancel" >Cancel</a>
							</div>
							</form>
						</div>'

			onRender : ->
<<<<<<< HEAD
					 @$el.attr 'id', "facility-#{@model.get 'term_id'}"
=======
					 @$el.attr 'id': "facility-#{@model.get 'term_id'}"
>>>>>>> 069eb002039940f8091a0c77bb983dd69a74f629

			events:
				'click a.delete' : -> 
					if confirm('Are you sure?')
						@trigger "delete:facility:clicked", @model

				'click a.edit'	: ->					
						# set the value to test field
						facility_name = @$el.find('.display_facility .facility-name').html()
						@$el.find('input[name="facility_name"]').val facility_name
						#@$el.find('input[name="facility_name"]').val @model.get 'name'						
						@$el.find('.display_facility').addClass 'hidden'
						@$el.find('.update_facility').removeClass 'hidden'


				'click a.cancel' :->	
						@$el.find('.update_facility').addClass 'hidden'
						@$el.find('.display_facility').removeClass 'hidden'

				'click a.update' : ->
						@trigger "update:facility:clicked", Backbone.Syphon.serialize @


						

		#empty view
		class EmptyView extends Marionette.ItemView

			className : 'empty-info empty-roomfacilities'

			tagName: 'div' 

			template : 'No Facilities Found. Add Facilities to your Room here.'

	

		# Composite view
		class Views.FacilitiesView extends Marionette.CompositeView

			template : '<div class="facilities-list clearfix"></div>'

			itemView : FacilityItem

			emptyView : EmptyView

			itemViewContainer : '.facilities-list'

			onUpdateView :(model)->
<<<<<<< HEAD
					term_id = model.get 'term_id'
					facility_name = model.get 'facility_name'
					#console.log(model)
					@$el.find("#facility-#{term_id} .display_facility").removeClass 'hidden'
					@$el.find("#facility-#{term_id} .update_facility").addClass 'hidden'
					@$el.find("#facility-#{term_id} .facility-name").text facility_name
=======
				view = @$el.find "#facility-#{model.get 'term_id'}"
				view.find('input[name="facility_name"]').val model.get 'name'	
				view.find('.update_facility').addClass 'hidden'
				view.find('.display_facility').removeClass 'hidden'
>>>>>>> 069eb002039940f8091a0c77bb983dd69a74f629

			

		