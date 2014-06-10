define ['app'
		'text!apps/dashboard/statistics/charts/templates/layout.html'
		'nvd3'
		'd3'],(App, layoutTmpl)->

			App.module 'DashboardApp.Statistics.OverViewChart.Views', (Views, App, Backbone, Marionette, $, _)->

				class Views.Layout extends Marionette.Layout
					template : layoutTmpl

					regions : 
						chartRegion : '#overview-chart-region'

					events :
						'click input.chart-button' : 'changeChart'

					changeChart:->

						App.DashboardApp.Statistics.graphNames = new Array() 

						$('input.chart-button:checked').each ->
							App.DashboardApp.Statistics.graphNames.push $(this).val()

						#alert JSON.stringify(criterion)

						@trigger "button:clicked" ,App.DashboardApp.Statistics.graphNames

					onShow:->
						#check if the graph name exists in the array, if yes check the radio button
						$('input.chart-button').each ->
							if _.indexOf(App.DashboardApp.Statistics.graphNames, $(this).val())+1

								$(this).attr "checked","checked"
						

				class Views.Chart extends Marionette.ItemView

					className: 'overview-chart'

					template: '<svg style="height:500px; font: 12px sans-serif;"></svg>'

					id : 'overview-chart'

					initialize:(options)->
						@chartData = options.data


					# add the graph/chart handling code here
					onShow:->
						data = @chartData
						#console.log JSON.stringify(data)
						nv.addGraph ->
							chart = nv.models.lineWithFocusChart()
							chart.options 
								margin :
									left :100
							#.showLegend(true).showYAxis(true).showXAxis(true)
							chart.xAxis.axisLabel("Date").tickFormat (d)->
								d3.time.format('%x')(new Date(d))
							chart.yAxis.axisLabel("Number").tickFormat d3.format(".02f")
							myData = data
							d3.select("#overview-chart svg").datum(myData).call chart
							nv.utils.windowResize chart.update
							d3.select('.nv-context').remove()
							d3.select('.nv-legendWrap').remove()
							chart