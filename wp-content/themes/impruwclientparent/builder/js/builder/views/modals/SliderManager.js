/**
 *  Slider Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['builder/views/modals/Modal', 'tpl!builder/templates/modal/slidermanager.tpl',
        'mediamodel', 'mediacollection', 'mediasingle', 'global', 'parsley'
    ],

    function(Modal, template, MediaModel, MediaCollection, SingleMedia, global) {


        var SliderManager = Modal.extend({

            id: 'slider-manager',

            template: template,

            type : 'slider',

            shouldUpdate: false,

            events: {
                'click .refetch-media' : 'fetchMedia',
                'click #create-slider' : 'createSlider'
            },

            selected: null,

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                //bind 
                var html = this.outerTemplate({
                    title: 'Slider Manager'
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
                    SiteBuilder.vent.trigger('modal-closed', self);

                });

                var markup = this.template();

                this.$el.find('.modal-content').append(markup);

                this.mediaCollection = new MediaCollection();

                this.bindPlupload();
            },

            /**
             * Opens a new Media manager
             */
            open: function(element) {

                if (!_.isUndefined(element))
                    this.element = element;

                this.$el.modal('show');
                $('#controls-drag').hide();
            },


            /**
             * Create the slider
             * @return {[type]} [description]
             */
            createSlider: function(evt){

                var checkboxes = $(evt.target).closest('form').find('input[type="checkbox"]');

                var ids = [];
                _.each(checkboxes, function(checkbox, index){

                    ids.push(parseInt($(checkbox).val()));

                });

                var medias = _.filter(this.mediaCollection.models, 
                                    function(media){ 
                                        return _.indexOf(ids, media.get('id')) !== -1;
                                    });

                SiteBuilder.vent.trigger('create-slider', medias, ids);

                this.hide();

            },


            /**
             * Triggers the fetch of MenuCollection
             * Check if the collection is already fetched. If yes, ignores
             * @returns {undefined}
             */
            fetchMedia: function() {

                if (this.mediaCollection.isFetched())
                    return;

                var self = this;

                //show initial fetch loader
                //this.$el.find('.modal-body').html('fetching media... please wait...');

                this.mediaCollection.fetch({
                    data: this.filters,
                    success: _.bind(function(collection, response) {

                        this.mediaCollection.setFetched(true);

                        collection.each(function(model, index) {
                            var mediaView = new SingleMedia({
                                model: model,
                                parent: this
                            });
                            this.$el.find('.selectable-images').append(mediaView.render().$el);
                        });

                    },this),

                    error: function(error) {
                        self.$el.find('.modal-body').html('Failed to fetch menus from server. <a href="#" class="refetch-menus">Click here</a>Please try again.');
                    }
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
                            self.shouldUpdate = true;
                            var media = new MediaModel(response.data);
                            
                            self.mediaCollection.add(media);

                            var mediaView = new SingleMedia({
                                model: media,
                                parent: self
                            });
                            self.$el.find('.selectable-images').prepend(mediaView.render().$el);
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

        return SliderManager;

    });