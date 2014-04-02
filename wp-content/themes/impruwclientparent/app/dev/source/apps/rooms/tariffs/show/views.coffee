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



		class SingleTariff extends Marionette.ItemView

			className : 'package-block-outer'

			template : '<div class="block clearfix">
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
						</div>'			

		class NoTariff extends Marionette.ItemView

			className : 'package-block-outer'

			template : '<div class="block clearfix"> 
							<h3>NA</h3>
						</div>'

		
		class Views.TariffsView extends Marionette.CompositeView

			template : ''

			dateRangeTemplate : '<div class="date-range">
									<div class="from">
										<span class="date">{{startdate}}</span>
										to <span class="date">{{enddate}}</span>
									</div>
								</div>'

			dateRangeItemViewContainer : '.package-blocks'

			render:->
				@isRendered = true
				@isClosed = false
				
				@triggerBeforeRender()
					
				# get daterange collection
				dCollection = Marionette.getOption @,'dateRangeCollection'
				html = ''
				dCollection.each (model)=>
					html += @renderDaterange model

				@$el.html html 
				@

			# render the daterange 
			renderDaterange:(model)->
				data = @serailizeDaterangeModel model
				template = @dateRangeTemplate
				html =  Marionette.Renderer.render template, data

				markup = '<div class="tariff clearfix">'
				markup += html
				markup +='	<div class="packages">
								<div class="package-blocks clearfix">' 

				markup += @renderTariffs()

				markup += 		'</div>
							</div>
						</div>
						<hr />'

				markup

			# render all tariffs
			renderTariffs:(dateRangeId)->
				plans = Marionette.getOption @, 'planCollection'

				html = ''

				plans.each (plan)=>
					tariff = @getTariff plan.get('id'), dateRangeId
					html += if not tariff then @getEmptyTariff() else @getTariffView(tariff)

				html

			getEmptyTariff:->
				'No Tariff Available'

			getTariffView:->
				'show tariff'

			# get tariff model
			getTariff:(planId, dateRangeId)->
				models = @collection.filter (model)->
								model.get('plan_id') is planId and model.get('daterange_id') is dateRangeId

				return models[0] if models.length > 0

				return false

			serailizeDaterangeModel:(model)->

				data = model.toJSON()

				data.startdate = ->
					moment(@from_date).format('Do-MMM')

				data.enddate = ->
					moment(@to_date).format('Do-MMM')

				data




				 