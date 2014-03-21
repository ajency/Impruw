define ['app'],(App)->

	# Row views
	App.module 'FacilitiesApp.List.Views', (Views, App, Backbone, Marionette, $, _)->

		#empty view
		class FacilityItem extends Marionette.ItemView

			className : 'facility'

			tagName: 'div' 

			template : '<label for="checkbox2" class="checkbox ">
							<span class="icons">
								<span class="first-icon fui-checkbox-unchecked"></span>
								<span class="second-icon fui-checkbox-checked"></span>
							</span>
							<input type="checkbox" data-toggle="checkbox" name="facility[{{term_id}}]" value="{{term_id}}">
							<span>{{name}}</span>
						</label>
						<div class="action">
							<a href="javascript:void(0)" class="edit">Edit</a>&nbsp;
							<a href="javascript:void(0)" class="cancel_editfacility hidden" >Cancel</a>&nbsp;
							<a href="javascript:void(0)" class="delete">Delete</a>
						</div>'

			events:
				'click a.delete' : -> 
					if confirm('Are you sure?')
						@trigger "delete:facility:clicked", @model


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

			

		