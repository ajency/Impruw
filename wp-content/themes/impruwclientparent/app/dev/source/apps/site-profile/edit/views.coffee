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
						#console.log model
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
						image_id = media.get 'id'
						media_size= media.get 'sizes'
						image_path = media_size.full.url
						console.log image_path
						#@$el.find('.fileinput-preview ').append '<img src ="" class="site_profile_images"/>'
						@$el.find('.site_profile_images').attr 'src', image_path
						@$el.find('#logo_id').attr 'value', image_id