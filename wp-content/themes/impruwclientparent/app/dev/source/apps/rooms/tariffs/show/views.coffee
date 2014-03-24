# , 'apps/rooms/tariffs/show/templates/'

define ['app'], (App)->

	App.module "RoomsApp.RoomsTariff.Show.Views", (Views, App)->

		# package single view
		class PackageSingle extends Marionette.ItemView

			className : 'package-block-outer'

			template : '<div class="block clearfix">
							<h6>{{package_name}}</h6>
							<div class="package-desc">
								{{package_description}}
							</div>
						</div>'

			serializeData:->
				data = super()

				data.packagedescription = ->
					_(@package_description).prune(50)

				data

		# packages view
		class Views.PackagesView extends Marionette.CompositeView

			className : 'tariff package-names clearfix'

			template : '<div class="packages"><div class="package-blocks header clearfix"></div></div>'
						
			itemView : PackageSingle

			itemViewContainer : '.package-blocks'


		class DateRangeSingle extends Marionette.ItemView

			className : 'tariff clearfix'

			events : 
				'click .package-block-outer' : (e)->
					e.stopPropagation()
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
                                        </div>
                                    </div>
								{{/tariffs}}
							</div>
						</div>'

			serializeData:->

				data = super()

				data.startdate = ->
					moment(new Date(@start_date)).format('DD/MMM')

				data.enddate = ->
					moment(new Date(@end_date)).format('DD/MMM')

				console.log data

				data

		class Views.TariffsView extends Marionette.CollectionView

			itemView : DateRangeSingle

				 