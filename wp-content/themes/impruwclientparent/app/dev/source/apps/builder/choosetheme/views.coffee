define ['app'], (App)->
	App.module "ChooseTheme.Views", (Views, App)->

		# single theme template
		class ThemeView extends Marionette.ItemView

			template: '<img src="{{image_url}}">
						<h6 class="desc">{{post_title}}</h6>
						<div class="aj-imp-choose-btn">
							{{^currentTheme}}<a href="#" class="btn choose-theme"><span class="glyphicon glyphicon-ok"></span>&nbsp;{{#polyglot}}Choose{{/polyglot}}</a>{{/currentTheme}}
							<a href="{{preview_link}}" target="_BLANK" class="btn"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;{{#polyglot}}Preview{{/polyglot}}</a>
						</div>
						{{#currentTheme}}<div class="current-wrapper"><div class="current">{{#polyglot}}Current Theme{{/polyglot}}</div></div>{{/currentTheme}}'

			className: 'block'

			tagName: 'li'

			serializeData:->
				data = super()
				data.currentTheme = CURRENTTHEME is data.post_name
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

			template: '{{^ISTHEMESELECTED}}\n
						<h2 class="page-title list-title {{^ISTHEMESELECTED}}hidden{{/ISTHEMESELECTED}}">{{#polyglot}}Choose Site Theme{{/polyglot}}</h2>\n
						<p class="desc list-desc {{^ISTHEMESELECTED}}hidden{{/ISTHEMESELECTED}}">{{#polyglot}}Theme applied for pages{{/polyglot}}\n    {{#polyglot}}Customise logo colors{{/polyglot}}\n    {{#polyglot}}Suit site preferences{{/polyglot}}</p>\n
						{{/ISTHEMESELECTED}}\n
							{{^ISTHEMESELECTED}}
								<h2 class="page-title language-title">{{#polyglot}}Choose a default language for the website{{/polyglot}}</h2>\n
								<p class="desc language-desc">{{#polyglot}}The language you select here will be the one your website viewers will see by default when they access your site. Impruw is built to support multiple languages, you can add more languages to your website from your <a href="../dashboard/#/language" target="_blank">dashboard</a>{{/polyglot}}</p>\n
								<div class="default-language-selection">
									<h3 class="lang-title">{{#polyglot}}Select language for the website{{/polyglot}}</h3>\n
									<select class="select-site-language">
										<option value="English">{{#polyglot}}English{{/polyglot}}</option>
										<option value="Norwegian">{{#polyglot}}Norwegian{{/polyglot}}</option>
									</select>
									<button class="btn choose-site-language"><span class="bicon icon-uniF19A"></span>&nbsp;{{#polyglot}}Choose Language{{/polyglot}}</button>\n
								</div>
							{{/ISTHEMESELECTED}}\n
							{{#ISTHEMESELECTED}}\n
								<button class="btn btn-danger cancel-theme-switch">{{#polyglot}}Cancel{{/polyglot}}</button>\n
							{{/ISTHEMESELECTED}}\n
					<div class="aj-imp-block-list {{^ISTHEMESELECTED}}hidden{{/ISTHEMESELECTED}}">\n    <ul></ul>\n</div>'

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

			onSiteLanguageUpdated :->
				# hide langauge
				@$el.find('.default-language-selection, .language-title, .language-desc').hide()
				# show themes
				@$el.find('.aj-imp-block-list, .list-title, .list-desc').removeClass 'hidden'
