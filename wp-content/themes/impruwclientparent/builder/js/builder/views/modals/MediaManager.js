/**
 *  Menu Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['builder/views/modals/Modal','text!builder/templates/modal/media.hbs', 
        'mediamodel','mediacollection', 'global','parsley'], 
		
        function(Modal, template, MediaModel, MediaCollection, global){


            var MediaManager = Modal.extend({

                id       : 'media-manager',

                template : template,

                events   : {
                    'click .refetch-media'          : 'fetchMedia',
                    'click #uploadfiles'            : 'uploadFiles'
                },

                /**
                 * Initialize the manager 
                 */
                initialize : function(args){

                    //bind 
                    
                    var html = _.template(this.outerTemplate,{title : 'Media Manager'});

                    this.$el.html(html);
                    
                    //append to body
                    $('body').append(this.$el);

                    this.$el.modal();

                    this.$el.on('hidden.bs.modal', function(evt){

                        if(!$('#controls-drag').is(':visible'))
                            $('#controls-drag').show();

                    });

                    //initial filters
                    this.filters =  {
                                        order       : 'ASC',
                                        orderBy     : 'date',
                                        offset      : 0,
                                        maxCount    : 30
                                    };

                    //set collection
                    this.mediaCollection = new MediaCollection();
                    
                    this.fetchMedia();
                },

                uploadFiles : function(){

                    if(_.isUndefined(this.uploader))
                          throw 'plupload not set for the view';

                    this.uploader.start();  

                },
                
                /**
                 * Triggers the fetch of MenuCollection
                 * Check if the collection is already fetched. If yes, ignores
                 * @returns {undefined}
                 */
                fetchMedia : function(){

                    if(this.mediaCollection.isFetched())
                        return;

                    var self = this;

                    //show initial fetch loader
                    this.$el.find('.modal-body').html('fetching media... please wait...');

                    this.mediaCollection.fetch({

                        data    : this.filters,

                        success : function(model, response){
                            
                            self.mediaCollection.setFetched(true);
                            
                            markup = _.template(self.template);
                           
                            self.$el.find('.modal-body').html(markup);

                            //bind plupload script
                            require(['plupload'], function(plupload){

                                if(!_.isUndefined(self.uploader))
                                    return;

                                self.uploader = new plupload.Uploader({
                                    'runtimes'          : 'gears,html5,flash,silverlight,browserplus',
                                    'file_data_name'    :'async-upload', // key passed to $_FILE.
                                    'multiple_queues'   : true,
                                    'browse_button'     : 'choosefiles',
                                    'multipart'         : true,
                                    'urlstream_upload'  : true,
                                    'max_file_size'     : '10mb',
                                    'url'               : 'http://localhost/impruw/site1/wp-admin/async-upload.php',
                                    'flash_swf_url'         : '/plupload/js/plupload.flash.swf',
                                    'silverlight_xap_url' : '/plupload/js/plupload.silverlight.xap',
                                    'filters' : [
                                        {'title' : "Image files", 'extensions' : "jpg,gif,png"}
                                    ],
                                    'multipart_params' : {
                                        action      : 'upload-attachment',
                                        _wpnonce    : _WPNONCE
                                    }
                                });
                                log(_WPNONCE);

                                self.uploader.bind('Init', function(up, params) {
                                    $('#filelist').html("<div>Current runtime: " + params.runtime + "</div>");
                                });

                                self.uploader.init();

                                self.uploader.bind('FilesAdded', function(up, files) {
                                    $.each(files, function(i, file) {
                                        $('#filelist').append(
                                            '<div id="' + file.id + '">' +
                                            file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' +
                                        '</div>');
                                    });

                                    up.refresh(); // Reposition Flash/Silverlight
                                });

                                self.uploader.bind('UploadProgress', function(up, file) {
                                    $('#' + file.id + " b").html(file.percent + "%");
                                });

                                self.uploader.bind('Error', function(up, err) {
                                    $('#filelist').append("<div>Error: " + err.code +
                                        ", Message: " + err.message +
                                        (err.file ? ", File: " + err.file.name : "") +
                                        "</div>"
                                    );

                                    up.refresh(); // Reposition Flash/Silverlight
                                });

                                self.uploader.bind('FileUploaded', function(up, file) {
                                    $('#' + file.id + " b").html("100%");
                                });

                            });

                        },
                        error : function(){
                            self.$el.find('.modal-body').html('Failed to fetch menus from server. <a href="#" class="refetch-menus">Click here</a>Please try again.');
                        }
                    })

                }                

            });

            return MediaManager;
			
        });
  
    

