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
				console.log "model data"
				console.log data
				data.currentTheme = CURRENTTHEME is data.post_name
				data

			events:
				'click a.choose-theme': (e)->
					e.stopPropagation()
					e.preventDefault()
					@$el.find('.choose-theme').text 'Applying...'
					@trigger "choose:theme:clicked", @model



		# choose theme view
		class Views.ChooseThemeView extends Marionette.CompositeView

			template: '<h2 class="page-title">{{#polyglot}}Choose Site Theme{{/polyglot}}</h2>\n
						<p class="desc">{{#polyglot}}Theme applied for pages{{/polyglot}}\n    {{#polyglot}}Customise logo colors{{/polyglot}}\n    {{#polyglot}}Suit site preferences{{/polyglot}}</p>\n
							{{^ISTHEMESELECTED}}
								<div class="default-language-selection" style="text-align: center;">
									<h3 class="page-title">{{#polyglot}}Choose your default Language{{/polyglot}}</h3>\n
									<select class="select-site-language" style="margin-left: 632px;">
										<option value="English">English</option>
										<option value="Norwegian">Norwegian</option>
									</select>
									<br/><br/>
									<button class="btn choose-site-language">&nbsp;Choose Language</button>\n
								</div>
							{{/ISTHEMESELECTED}}\n
							{{#ISTHEMESELECTED}}\n
								<button class="btn btn-danger cancel-theme-switch">{{#polyglot}}Cancel{{/polyglot}}</button>\n
							{{/ISTHEMESELECTED}}\n
					<div class="aj-imp-block-list hidden">\n    <ul></ul>\n</div>'

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
				console.log "Language updated!!"
				# hide langauge
				@$el.find('.default-language-selection').hide()
				# show themes
				@$el.find('.aj-imp-block-list').removeClass 'hidden'
