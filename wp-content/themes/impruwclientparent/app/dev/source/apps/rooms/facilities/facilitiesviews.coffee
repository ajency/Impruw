define ['app'],(App)->

	# Row views
	App.module 'FacilitiesApp.Views', (Views, App, Backbone, Marionette, $, _)->

		#empty view
		class FacilityItem extends Marionette.ItemView

			className : 'facility'

			tagName: 'div' 

			template : '<label for="checkbox2" class="checkbox ">
							<span class="icons">
								<span class="first-icon fui-checkbox-unchecked"></span>
								<span class="second-icon fui-checkbox-checked"></span>
							</span>
							<input type="checkbox" data-toggle="checkbox" name="facility[]" value="{{name}}">
							<span>{{name}}</span>
						</label>
						<div class="action">
							<a href="javascript:void(0)" class="edit">Edit</a>&nbsp;
							<a href="javascript:void(0)" class="cancel_editfacility hidden" >Cancel</a>&nbsp;
							<a href="javascript:void(0)" class="delete">Delete</a>
						</div>'


		#empty view
		class EmptyView extends Marionette.ItemView

			className : 'empty-roomfacilities'

			tagName: 'div' 

			template : 'No Facilities Found'

		


		# Composite view
		class Views.FacilitiesView extends Marionette.CompositeView

				template : '<h4 class="aj-imp-sub-head scroll-ref">
								Facilities
							 	<small>List the facilities available in this room.</small>
							 </h4>
							 <div class="form-group">
									<div class="col-sm-12">
										<div class="facilities-list clearfix"></div>
									</div>
							</div>'
				itemView : FacilityItem

				emptyView : EmptyView

				itemViewContainer : '.facilities-list'

			

		