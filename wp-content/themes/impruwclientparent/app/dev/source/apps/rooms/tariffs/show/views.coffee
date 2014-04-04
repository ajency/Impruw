# , 'apps/rooms/tariffs/show/templates/'

define ['app', 'moment'], (App, moment)->

	App.module "RoomsApp.RoomsTariff.Show.Views", (Views, App)->

		# package single view
		class PackageSingle extends Marionette.ItemView

			className : 'package-block-outer'

			template : '<div class="block clearfix">
							<h6>{{plan_name}}</h6>
							<div class="package-desc">
								{{plandescription}}
							</div>
						</div>'

			serializeData:->
				data = super()

				data.plandescription = ->
					_(@plan_description).prune(50)

				data

		# packages view
		class Views.PackagesView extends Marionette.CompositeView

			className : 'tariff package-names clearfix'

			template : '<div class="packages"><div class="package-blocks header clearfix"></div><button type="button" class="btn-add-plan"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Add Plan</button></div>'
						
			itemView : PackageSingle

			itemViewContainer : '.package-blocks'


		################ Tariffs views ###################

		class SingleTariff extends Marionette.ItemView

			className: 'package-block-outer'

			events:
				'click .edit-trariff' : -> 
						App.execute "show:edit:tariff", model : @model
				'click .not-yet-added': -> 
						App.execute "show:add:tariff", model : @model

			modelEvents:
				'change' : 'render'

			render :->
				console.log @model
				super()

			template : '{{^id}}
							<div class="block clearfix not-yet-added"><h4>NA</h4></div>
						{{/id}}
						{{#id}}
							<div class="block clearfix">
								<div class="weekday">
									Weekdays
									<span class="price">{{weekdays.charge}}</span>
								</div>
								<div class="weekend">
									Weekends
									<span class="price">{{weekends.charge}}</span>
								</div>
								<div class="tariff-label clearfix">Extra Adult</div>
								<div class="weekday">
									<span class="price">{{weekdays.extra_adult}}</span>
								</div>
								<div class="weekend">
									<span class="price">{{weekends.extra_adult}}</span>
								</div>
								<div class="tariff-label clearfix">Extra Child</div>
								<div class="weekday">
									<span class="price">{{weekdays.extra_child}}</span>
								</div>
								<div class="weekend">
									<span class="price">{{weekends.extra_child}}</span>
								</div>
								<div class="block-action">
									<button type="button" class="btn btn-sm edit-trariff edit-tran"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Edit</button>
								</div>
							</div>
						{{/id}}'	


		class DateRageView extends Marionette.CompositeView
			
			template : '<div class="date-range">
							<div class="from">
								<span class="date">{{fromdate}}</span>
								to <span class="date">{{todate}}</span>
							</div>
						</div>
						<div class="packages">
							<div class="package-blocks clearfix"></div>
						</div>'	

			serializeData:->
				data = super()

				data.fromdate = ->
					moment(@from_date).format 'Do-MMM'

				data.todate = ->
					moment(@to_date).format 'Do-MMM'

				data

			itemView : SingleTariff

			itemViewContainer : '.package-blocks'		

		
		class Views.DateRangeCollectionView extends Marionette.CollectionView

			className : 'tariff clearfix'

			itemView : DateRageView

			itemViewOptions:(item, index)->
				dateRangeId = item.get 'id'
				tariffs = App.request "get:tariffs:for:daterange", dateRangeId

				plans = App.request "get:plans:collection"

				tariffCollection = new Backbone.Collection

				getTariff =(planId)->
					tariff = _.filter tariffs,(t)->
									t.get('plan_id') is planId and t.get('daterange_id') is dateRangeId

					return tariff[0] if tariff.length > 0
					return false

				plans.each (plan, index)=>

					tariff = getTariff plan.get 'id'

					if tariff is false
						tariff = new Backbone.Model
						tariff.set 
								plan_id : plan.get 'id'
								daterange_id : dateRangeId
					else
						tariff = new Backbone.Model tariff

					tariff.name = 'tariff'

					tariffCollection.add tariff

				collection : tariffCollection



				 