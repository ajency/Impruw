define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomTariff.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomTariffView extends Marionette.ItemView

			className : 'tariff clearfix'

			template : '<div class="date-range">
							<div class="from">
								From <span class="date">01/Jan</span>
							</div>
							<div class="to">
								To <span class="date">31/Jan</span>
							</div>
						</div>
						<div class="packages">
							<div class="package-blocks clearfix">
									<div class="package-block-outer" data-id="1">
                                        <div class="block clearfix">
                                            <div class="weekday">
                                                Weekdays
                                                <span class="price">$100</span>
                                            </div>
                                            <div class="weekend">
                                                Weekends
                                                <span class="price">$200</span>
                                            </div>
                                            <div class="tariff-label clearfix">Extra Adult</div>
                                            <div class="weekday">
                                                <span class="price">$20</span>
                                            </div>
                                            <div class="weekend">
                                                <span class="price">$30</span>
                                            </div>
                                            <div class="tariff-label clearfix">Extra Child</div>
                                            <div class="weekday">
                                                <span class="price">$10</span>
                                            </div>
                                            <div class="weekend">
                                                <span class="price">$15</span>
                                            </div>
                                        </div>
                                    </div>
							</div>
						</div>'	