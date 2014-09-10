define [ 'app'
         'plupload'], ( App, plupload, uploadTpl )->

   App.module 'Media.Upload.Views', ( Views, App )->
      class Views.UploadView extends Marionette.ItemView

         template : '<div class="aj-imp-upload-media"><span class="bicon icon-uniF10C"></span>
                      <div id="choosefiles" class="aj-imp-upload-message"><span class="glyphicon glyphicon-cloud-upload"></span> {{#polyglot}}Upload Images{{/polyglot}}
                      </div>
                      <span class="small-text">{{#polyglot}}Upload Multiple Images{{/polyglot}}</span>

                      <div class="clear"></div>
                      <br/>

                      <div id="progress" style="width: 30%; margin: 0px auto; display: none;" class="progress progress-striped active">
                          <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="progress-bar"></div>
                          <span class="sr-only">{{#polyglot}}0% Complete{{/polyglot}} </span>
                      </div>
                  </div>'

         # setup plupload on show
         # the url for plupload will be async-upload.php(wordpress default)
         # this plupload configuration is copied over from wordpress core
         # Note: do not change these settings
         onShow : ->
            #bind plupload script
            @uploader = new plupload.Uploader
               runtimes : "gears,html5,flash,silverlight,browserplus"
               file_data_name : "async-upload" # key passed to $_FILE.
               multiple_queues : true
               browse_button : "choosefiles"
               multipart : true
               urlstream_upload : true
               max_file_size : "10mb"
               url : UPLOADURL
               flash_swf_url : SITEURL + "/wp-includes/js/plupload/plupload.flash.swf"
               silverlight_xap_url : SITEURL + "/wp-includes/js/plupload/plupload.silverlight.xap"
               filters : [
                  title : "Image files"
                  extensions : "jpg,gif,png"
               ]
               multipart_params :
                  action : "upload-attachment"
                  _wpnonce : _WPNONCE


            @uploader.init()

            @uploader.bind "FilesAdded", ( up, files )=>
               @uploader.start()
               @$el.find( "#progress" ).show()

            @uploader.bind "UploadProgress", ( up, file )=>
               @$el.find( ".progress-bar" ).css "width", file.percent + "%"

            @uploader.bind "Error", ( up, err )=>
               up.refresh() # Reposition Flash/Silverlight

            @uploader.bind "FileUploaded", ( up, file, response )=>
               response = JSON.parse( response.response )
               if up.total.queued is 0
                  App.execute "new:media:added", response.data

            @uploader.bind "UploadComplete", ( up, file )=>
                @$el.find( "#progress" ).hide()
                @trigger "upload:complete"


         # destroyt the plupload instance on close to release memory
         onClose : ->
            @uploader.destroy()
							
								