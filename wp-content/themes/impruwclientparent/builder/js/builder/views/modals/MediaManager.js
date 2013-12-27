/**
 *  Menu Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['builder/views/modals/Modal','text!builder/templates/modal/mediamanager.hbs', 
        'mediamodel','mediacollection', 'global','parsley'], 
		
        function(Modal, template, MediaModel, MediaCollection, global){


            var MediaManager = Modal.extend({

                id       : 'media-manager',

                template : template,

                shouldUpdate : false,

                events   : {
                    'click .refetch-media'         : 'fetchMedia',
                    'click .save_image_details'    : 'saveImageDetails'
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
                    var self = this;
                    this.$el.on('hidden.bs.modal', function(evt){

                        if(!$('#controls-drag').is(':visible'))
                            $('#controls-drag').show();
                         
                        //trigger the elements update self
                        if(self.shouldUpdate)
                            self.element.updateSelf();

                    });

                    var markup = _.template(this.template,{});
                           
                    this.$el.find('.modal-body').html(markup);

                    this.bindPlupload();
                },

                /**
                 * Opens a new Media manager
                 */
                open : function(element){

                    if(!_.isUndefined(element))
                        this.element  = element;

                    this.$el.modal('show');
                    $('#controls-drag').hide();
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
                        success : function(collection, response){
                            
                            self.mediaCollection.setFetched(true);
                            
                            self.$el.find('.selectable-images').selectable({filter : 'img'});

                        },
                        error : function(){
                            self.$el.find('.modal-body').html('Failed to fetch menus from server. <a href="#" class="refetch-menus">Click here</a>Please try again.');
                        }
                    });

                },

                bindPlupload : function(){

                    var self  = this;

                    //bind plupload script
                    require(['plupload'], function(plupload){

                        if(!_.isUndefined(self.uploader))
                            return;

                        self.uploader = new plupload.Uploader({
                            'runtimes'          : 'gears,html5,flash,silverlight,browserplus',
                            'file_data_name'    : 'async-upload', // key passed to $_FILE.
                            'multiple_queues'   : true,
                            'browse_button'     : 'choosefiles',
                            'multipart'         : true,
                            'urlstream_upload'  : true,
                            'max_file_size'     : '10mb',
                            'url'               : UPLOADURL,
                            'flash_swf_url'     : SITEURL + '/wp-includes/js/plupload/plupload.flash.swf',
                            'silverlight_xap_url' : SITEURL + '/wp-includes/js/plupload/plupload.silverlight.xap',
                            'filters' : [
                                {'title' : "Image files", 'extensions' : "jpg,gif,png"}
                            ],
                            'multipart_params' : {
                                action      : 'upload-attachment',
                                _wpnonce    : _WPNONCE
                            }
                        });
                        
                        self.uploader.init();

                        self.uploader.bind('FilesAdded', function(up, files) {
                            self.uploader.start();  
                            self.$el.find('#progress').show();
                        });

                        self.uploader.bind('UploadProgress', function(up, file) {
                            self.$el.find('#progress').find('.progress-bar').css('width',file.percent + "%");
                        });

                        self.uploader.bind('Error', function(up, err) {
                            up.refresh(); // Reposition Flash/Silverlight
                        });

                        self.uploader.bind('FileUploaded', function(up, file, response) {
                            self.$el.find('#progress').hide();
                            var response = JSON.parse(response.response);
                            if(response.success){
                                self.shouldUpdate = true;
                                var media = new MediaModel(response.data);
                                $('#uplaod-details').find('img.thumbnail-img').attr('src',response.data.url);
                                $('#uplaod-details').find('input[name="image-title"]').val(response.data.title);
                                $('#uplaod-details').find('input[name="image-link"]').val("");
                                $('#uplaod-details').find('textarea[name="image-description"]').val(response.data.caption);
                                $('#uplaod-details').slideDown();
                                self.element.dataSource = media;
                                self.hide();
                            }
                        });

                    });
                },
                
                /**
                 * SAves the image details on server
                 * @returns {undefined}
                 */
                saveImageDetails : function(){
                   
                }

            });

            return MediaManager;
			
        });
  
    

