define ['app'], (App)->
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
					@$el.find('.choose-theme').text _.polyglot.t('Applying...')
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


