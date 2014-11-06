define ['app'], (App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Spacer.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		#class Views.SpacerView extends Marionette.ItemView

		# layouts
		class Views.SpacerView extends Marionette.ItemView
			# basic template
			template: '<div class="blank-info">{{#polyglot}}This is a blank spacer. Increase or decrease the height to add space between elements.{{/polyglot}}</div><hr class="{{style}}" >'

			className: 'spacer'

			onRender: ->
				# className = _.slugify @model.get 'type'
				@$el.addClass  @model.get 'type'
				if @model.get('type') isnt 'line'
					@$el.find('hr').css 'height', @model.get 'height'

			onShow : ->
				if @model.get('type') isnt 'line'
					@$el.find('hr').resizable
                        helper : "ui-image-resizable-helper"
                        handles: "s"
                        stop : (evt, ui)=>
                            @$el.css 'width','auto'
                            @trigger 'set:spacer:height', @$el.height()
			   # @$el.attr "data-content", _.polyglot.t("Update address ")+" <a href='#{SITEURL}/dashboard/#/site-profile'>"+_.polyglot.t("here")+"</a> "
			   # @$el.popover
			   #    html : true
			   #    placement : 'top'