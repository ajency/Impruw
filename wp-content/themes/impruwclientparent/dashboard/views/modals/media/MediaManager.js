/**
 *  Menu Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['modal', 'tpl!templates/modal/media/mediamanager.tpl',
        'mediamodel', 'mediacollection', 'mediasingle'
    ],

    function(Modal, template, MediaModel, MediaCollection, SingleMedia){


        var MediaManager = Modal.extend({

            id: 'media-manager',

            template: template,

            shouldUpdate: false,

            events: {
                'click .retry-fetch': 'fetchMedia'
            },

            selected: null,

            progressBar : null,

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                _.bindAll(this, 'addMediaView','handleFetchFailed','removeMediaView');

                //bind 
                var html = this.outerTemplate({
                    title: 'Media Manager'
                });

                this.$el.html(html);

                //append to body
                $('body').append(this.$el);

                this.$el.modal();
                var self = this;
                this.$el.on('hidden.bs.modal', function(evt) {

                    if (!$('#controls-drag').is(':visible'))
                        $('#controls-drag').show();

                    //trigger the elements update self
                    getAppInstance().vent.trigger('modal-closed', self);

                });

                var markup = this.template({});

                this.$el.find('.modal-content').append(markup);

                //set progressbar
                this.$progressBar = this.$el.find('#progress');

                //check if app media collection property is set
                if(appHasProperty('mediaCollection'))
                    getAppInstance().mediaCollection = new MediaCollection();

                
                this.bindPlupload();

                //listen to image selected event
                var imageChoosedFn = _.bind(function(model, size){
                                        getAppInstance().vent.trigger('image-selected', model, size);
                                        this.hide();
                                    }, this);

                //bind listeners
                this.listenTo(getAppInstance().vent, 'image-choosed', imageChoosedFn);
                this.listenTo(getAppInstance().vent, 'media-fetch-failed', this.handleFetchFailed);
                this.listenTo(getAppInstance().mediaCollection, 'add', this.addMediaView);
                this.listenTo(getAppInstance().mediaCollection, 'remove', this.removeMediaView);

                //trigger fetch
                this.fetchMedia();

            },

            /**
             * Add single media view
             * @param {[object]} media [backbone model]
             */
            addMediaView : function(media){

                var mediaView = new SingleMedia({
                    model: media
                });
                this.$el.find('.selectable-images').prepend(mediaView.render().$el);
            
            },

            /**
             * Add single media view
             * @param {[object]} media [backbone model]
             */
            removeMediaView : function(media){

                var id = '#media-' + media.get('id');
                this.$el.find('.selectable-images').find(id).remove();
            
            },

            /**
             * Handle media fetch failed
             * @return {[type]} [description]
             */
            handleFetchFailed : function(){

                var html = '<div class="alert alert-danger">Failed to fetch media. <a href="#" class="retry-fetch">try again</a></div>';

                this.$el.find('#images').find('.selectable-images').prepend(html);

            },

            /**
             * Triggers the fetch of MenuCollection
             * Check if the collection is already fetched. If yes, ignores
             * @returns {undefined}
             */
            fetchMedia: function(evt) {

                if(_.isObject(evt))
                    evt.preventDefault();

                if (getAppInstance().mediaCollection.isFetched())
                    return;

                //clear any messages
                this.$el.find('#images').find('.alert').remove();

                getAppInstance().mediaCollection.fetch({
                    data: {}
                });

            },

            bindPlupload: function() {

                //bind plupload script
                var pluploadFn = _.bind(function(plupload) {

                    if (!_.isUndefined(this.uploader))
                        return;

                    this.uploader = new plupload.Uploader({
                        'runtimes': 'gears,html5,flash,silverlight,browserplus',
                        'file_data_name': 'async-upload', // key passed to $_FILE.
                        'multiple_queues': true,
                        'browse_button': 'choosefiles',
                        'multipart': true,
                        'urlstream_upload': true,
                        'max_file_size': '10mb',
                        'url': UPLOADURL,
                        'flash_swf_url': SITEURL + '/wp-includes/js/plupload/plupload.flash.swf',
                        'silverlight_xap_url': SITEURL + '/wp-includes/js/plupload/plupload.silverlight.xap',
                        'filters': [{
                            'title': "Image files",
                            'extensions': "jpg,gif,png"
                        }],
                        'multipart_params': {
                            action: 'upload-attachment',
                            _wpnonce: _WPNONCE
                        }
                    });

                    this.uploader.init();

                    this.uploader.bind('FilesAdded', _.bind(function(up, files) {
                        
                        this.uploader.start();
                        this.$el.find('#progress').show();

                    }, this));

                    this.uploader.bind('UploadProgress', _.bind(function(up, file) {
                    
                        this.$progressBar.find('.progress-bar').css('width', file.percent + "%");
                    
                    }, this));

                    this.uploader.bind('Error', function(up, err) {
                        up.refresh(); // Reposition Flash/Silverlight
                    });

                    this.uploader.bind('FileUploaded', _.bind(function(up, file, response) {
                        //self.$el.find('#progress').hide();
                        this.$progressBar.find('.progress-bar').css('width', "0%");

                        var response = JSON.parse(response.response);
                        if (response.success) {

                            var media = new MediaModel(response.data);
                            
                            getAppInstance().mediaCollection.add(media);

                        }

                        if (up.total.queued == 0) {
                            this.$el.find('a[href="#images"]').click();
                            setTimeout(_.bind(function() {
                                this.$el.find('.selectable-images .panel').first().hide().toggle('highlight');
                            }, this), 500);
                        }

                    }, this));

                }, this);

                require(['plupload'], pluploadFn);
           
            }
        });

        return MediaManager;

    });