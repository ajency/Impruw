define ['app','text!apps/my-profile/language/templates/languageView.html'],(App, langformTpl)->


			App.module 'MyProfileApp.Language.View', (View, App, Backbone, Marionette, $, _)->

				# Password form
				class View.LanguageForm extends Marionette.ItemView

					tagName : 'form'

					template : langformTpl

					className : 'form-horizontal clearfix '

					onShow : ->

						@$el.find('select').selectpicker()

					events:
						'click #btn_update_language' :->
							langName = @$el.find('.dropdown-toggle').attr 'title'
							@trigger "update:user:lang:click" , langName
							
