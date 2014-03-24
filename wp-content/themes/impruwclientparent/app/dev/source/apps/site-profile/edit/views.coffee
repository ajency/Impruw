define ['app'
		'text!apps/site-profile/edit/templates/mainview.html'
		'text!apps/site-profile/edit/templates/siteprofile.html'],
		(App, mainviewTpl, siteprofileTpl)->


			App.module 'SiteProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->


				class View.MainView extends Marionette.ItemView

					template : mainviewTpl

					events: 
						'click #btn_savesitedetails' : ->
										@trigger "save:site:profile", Backbone.Syphon.serialize @

						'click .fileinput-new' : ->
									@trigger "show:media:manager"


					onShow:->
						@$el.find('select').selectpicker()

						# set affix
						@$el.find('*[data-spy="affix"]').width @$el.width()
						@$el.find('*[data-spy="affix"]').affix()
					
					onSiteProfileAdded:->
						@$el.find('#form-siteprofile').prepend '<div class="alert alert-warning alert-dismissable">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							Save successfully</div>'
						$('html, body').animate({
							scrollTop: 0
						}, 1000);

					onSetLogo :(media) -> 
						console.log media
						#@$el.find().append(media.sizes.full.url)