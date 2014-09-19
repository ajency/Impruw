define ['app', 'bootbox'], (App, bootbox)->
	App.module "ChooseTheme.Views", (Views, App)->

		# single theme template
		class ThemeView extends Marionette.ItemView

			template: '<img src="{{image_url}}">
						<h6 class="desc">{{post_title}}</h6>
						<div class="aj-imp-choose-btn">
							{{^currentTheme}}<a href="#" class="btn choose-theme"><span class="glyphicon glyphicon-ok"></span>&nbsp;{{#polyglot}}Choose{{/polyglot}}</a>{{/currentTheme}}
							<a href="{{preview_link}}" target="_newtab{{ID}}" class="btn"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;{{#polyglot}}Preview{{/polyglot}}</a>
						</div>
						{{#currentTheme}}<div class="current-wrapper"><div class="current">{{#polyglot}}Current Theme{{/polyglot}}</div></div>{{/currentTheme}}'

			className: 'block'

			tagName: 'li'

			serializeData:->
				data = super()
				data.currentTheme = CURRENTTHEME is _.slugify data.post_title
				data.post_title = _.polyglot.t(data.post_title)
				data

			events:
				'click a.choose-theme': (e)->
					e.stopPropagation()
					e.preventDefault()
					bootbox.dialog 
						title: "<h4 class='delete-message'>" + _.polyglot.t( 'Are you sure?' ) + "</h4>",
						message: _.polyglot.t( 'You will lose your layout if you switch themes, you saved content can be retrieved from unused elements box. Your uploaded images are saved in the image gallery, so you will need to add them again.' ),
						buttons: 
							cancelswitch: 
								label: _.polyglot.t( 'No, I don\'t want to switch themes' )
								className: "btn-default"
								callback: =>
									@trigger "cancel:theme:switch"
									$('body').removeClass 'choose-theme-page'
							switch:
								label: _.polyglot.t( 'Yes, switch my theme' )
								className: "btn-primary"
								callback: =>
									#@$el.find('a.choose-theme').attr 'disabled', true
									#@$el.find('.choose-theme').text _.polyglot.t('Applying...')
									bootbox.hideAll()
									@$el.find('.aj-imp-choose-btn').html('<span class="glyphicon glyphicon-tasks pulse"></span><div class="msg-1">' +  _.polyglot.t( "Creating pages with demo content." ) + ' </div><div class="msg-2">' + _.polyglot.t( "Applying the theme colors." ) + ' </div><div class="msg-3">' + _.polyglot.t( "Prepping up the elements." ) + ' </div><div class="msg-4">' + _.polyglot.t( "Hang on, we are almost done..." ) + ' </div>').show()
									_.delay =>
					                    @$el.find('.msg-1').show().addClass('slideRight')
					                , 500
					                _.delay =>
					                    @$el.find('.msg-2').show().addClass('slideRight')
					                , 1000
					                _.delay =>
					                    @$el.find('.msg-3').show().addClass('slideRight')
					                , 1500
					                _.delay =>
					                    @$el.find('.msg-4').show().addClass('slideRight')
					                , 2000
									
									@trigger "choose:theme:clicked", @model			



		# choose theme view
		class Views.ChooseThemeView extends Marionette.CompositeView

			template: '<h2 class="page-title list-title">{{#polyglot}}Choose Site Theme{{/polyglot}}</h2>\n
						<p class="desc list-desc">{{#polyglot}}Theme applied for pages{{/polyglot}}\n
                            {{#polyglot}}Customise logo colors{{/polyglot}}\n    {{#polyglot}}Suit site preferences{{/polyglot}}</p>\n

   							{{#ISTHEMESELECTED}}\n
								<button class="btn btn-danger cancel-theme-switch">{{#polyglot}}Cancel{{/polyglot}}</button>\n
							{{/ISTHEMESELECTED}}\n
					<div class="aj-imp-block-list">\n
                        <ul></ul>\n
                    </div>'

			events:
				'click button.cancel-theme-switch' : ->
					@trigger "cancel:theme:switch"
				'click button.choose-site-language' : ->
					@trigger "choose:site:language",  @$el.find('.select-site-language').val()

			className: 'aj-imp-theme-area'

			itemView: ThemeView

			itemViewContainer: '.aj-imp-block-list ul'

			serializeData:->
				data = super()
				data.ISTHEMESELECTED = ISTHEMESELECTED is 1
				data

			onShow: ->
				# add class to body
				$('body').addClass 'choose-theme-page'
				@$el.find('select').selectpicker()
				@$el.find('select.choose-site-language').val()


			onClose: ->
				# remove body class
				$('body').removeClass 'choose-theme-page'


