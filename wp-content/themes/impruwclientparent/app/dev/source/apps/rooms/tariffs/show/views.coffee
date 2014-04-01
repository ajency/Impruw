# , 'apps/rooms/tariffs/show/templates/'

define ['app'], (App)->

	App.module "RoomsApp.RoomsTariff.Show.Views", (Views, App)->

		# package single view
		class PackageSingle extends Marionette.ItemView

			className : 'package-block-outer'

			template : '<div class="block clearfix">
							<h6>{{plan_name}}</h6>
							<div class="package-desc">
								{{plan_description}}
							</div>
						</div>'

			serializeData:->
				data = super()

				data.packagedescription = ->
					_(@plan_description).prune(50)

				data

		# packages view
		class Views.PackagesView extends Marionette.CompositeView

			className : 'tariff package-names clearfix'

			template : '<div class="packages"><div class="package-blocks header clearfix"></div><button type="button" class="btn-add-plan"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Add Plan</button></div>'
						
			itemView : PackageSingle

			itemViewContainer : '.package-blocks'


		class DateRangeSingle extends Marionette.ItemView

			className : 'tariff clearfix'

			events : 
				'click .edit-trariff' : (e)->
					e.stopPropagation()
					e.preventDefault()
					id = $(e.target).attr 'data-id'
					@trigger "show:edit:tariff", 2

			template : '<div class="date-range">
							<div class="from">
								From <span class="date">{{startdate}}</span>
							</div>
							<div class="to">
								To <span class="date">{{enddate}}</span>
							</div>
						</div>
						<div class="packages">
							<div class="package-blocks clearfix">
								{{#tariffs}}
									<div class="package-block-outer" data-id="{{id}}">
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
                                            	<button class="btn btn-sm edit-trariff edit-tran"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Edit</button>
                                            </div>
                                        </div>
                                    </div>
								{{/tariffs}}
							</div>
						</div>'

			serializeData:->

				data = super()

				data.startdate = ->
					moment(new Date(@from_date)).format('DD/MMM')

				data.enddate = ->
					moment(new Date(@to_date)).format('DD/MMM')

				data

		class Views.TariffsView extends Marionette.CollectionView

			itemView : DateRangeSingle

				 