/**
 *  Menu Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['builder/views/modals/Modal', 'tpl!builder/templates/modal/media/mediamanager.tpl',
        'mediamodel', 'mediacollection', 'mediasingle', 'global', 'parsley'
    ],

    function(Modal, template, MediaModel, MediaCollection, SingleMedia, global) {


        var MediaManager = Modal.extend({

            id: 'media-manager',

            template: template,

            shouldUpdate: false,

            events: {
                'click .refetch-media': 'fetchMedia'
            },

            selected: null,

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                _.bindAll(this, 'addMediaView');

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

                //check if app media collection property is set
                if(!global.appHasProperty('mediaCollection'))
                    getAppInstance().mediaCollection = new MediaCollection();

                
                this.bindPlupload();

                //listen to image selected event
                var imageChoosedFn = _.bind(function(model, size){
                                        getAppInstance().vent.trigger('image-selected', model, size);
                                        this.hide();
                                    }, this);

                //bind listeners
                this.listenTo(getAppInstance().vent, 'image-choosed', imageChoosedFn);
                this.listenTo(getAppInstance().vent, 'media-fetch-failed', _.bind(function(){}));
                this.listenTo(getAppInstance().mediaCollection, 'add', this.addMediaView));

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
             * Opens a new Media manager
             */
            open: function() {

                this.$el.modal('show');
                $('#controls-drag').hide();
            },


            /**
             * Triggers the fetch of MenuCollection
             * Check if the collection is already fetched. If yes, ignores
             * @returns {undefined}
             */
            fetchMedia: function() {

                if (getAppInstance().mediaCollection.isFetched())
                    return;

                getAppInstance().mediaCollection.fetch({
                    data: this.filters,
                    success: _bind(function(collection, response) {

                        if(response.code !== 'OK')
                            return;

                        getAppInstance().mediaCollection.setFetched(true);

                        collection.each(function(model, index) {
                            var mediaView = new SingleMedia({
                                model: model,
                                parent: this
                            });
                            this.$el.find('.selectable-images').append(mediaView.render().$el);
                        });

                    }, this),
                    error: _.bind(function(error) {
                    
                        this.$el.find('.modal-body').html('Failed to fetch menus from server. <a href="#" class="refetch-menus">Click here</a>Please try again.');
                    
                    }, this)
                });

            },

            bindPlupload: function() {

                var self = this;

                //bind plupload script
                require(['plupload'], function(plupload) {

                    if (!_.isUndefined(self.uploader))
                        return;

                    self.uploader = new plupload.Uploader({
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

                    self.uploader.init();

                    self.uploader.bind('FilesAdded', function(up, files) {
                        self.totalFiles = up.files.length;

                        self.uploader.start();
                        self.$el.find('#progress').show();
                    });

                    self.uploader.bind('UploadProgress', function(up, file) {
                        self.$el.find('#progress').find('.progress-bar').css('width', file.percent + "%");
                    });

                    self.uploader.bind('Error', function(up, err) {
                        up.refresh(); // Reposition Flash/Silverlight
                    });

                    self.uploader.bind('FileUploaded', function(up, file, response) {
                        //self.$el.find('#progress').hide();
                        self.$el.find('#progress').find('.progress-bar').css('width', "0%");

                        var response = JSON.parse(response.response);
                        if (response.success) {

                            var media = new MediaModel(response.data);
                            
                            getAppInstance().mediaCollection.add(media);

                        }

                        if (up.total.queued == 0) {
                            self.$el.find('a[href="#images"]').click();
                            setTimeout(function() {
                                self.$el.find('.selectable-images .panel').first().hide().toggle('highlight');
                            }, 500);
                        }

                    });

                });
            }

        });

        return MediaManager;

    });