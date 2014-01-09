/**
 *  Media .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['backbone', 'text!builder/templates/modal/media/singlemedia.hbs',
        'mediamodel', 'global'
    ],

    function(Backbone, template, MediaModel, global) {


        var SingleMedia = Backbone.View.extend({

            className: 'panel panel-default',

            template: _.template(template),

            events: {
                'click .save-image-details': 'saveImageDetails',
                'click .cancel-image-details': 'cancelImageDetails',
                'click .select-image': 'selectImage'
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                if (_.isUndefined(args.model))
                    return;

                _.bindAll(this, 'saveImageDetails', 'selectImage');

                this.model = args.model;

                this.parent = args.parent;


            },

            render: function() {

                var html = this.template({
                
                    media: this.model,

                    type : _.isUndefined(this.parent.type) ? 'modal' : this.parent.type
                
                });

                this.$el.html(html);

                this.$el.find('select').selectpicker({
                                                        style: 'btn-mini btn-default',
                                                        menuStyle: 'dropdown'
                                                    });

                this.$el.find('input[type="checkbox"]').checkbox();

                return this;
            },

            /** 
             * Close the details box
             */
            cancelImageDetails: function(evt) {
            
                $(evt.target).closest('.panel-collapse').prev().find('a[data-toggle="collapse"]').click();
            
            },

            /**
             * Select the image
             */
            selectImage: function(evt) {
                
                var size  = this.$el.find('select.image-size').val()

                size = size === '' ? 'thumbnail' : size;

                SiteBuilder.vent.trigger('image-selected', this.model, size);
                this.parent.hide();

            },

            /**
             * SAves the image details on server
             * @returns {undefined}
             */
            saveImageDetails: function(evt) {

                var form = $(evt.target).closest('form');
                var formData = global.getFormData(form);

                var self = this;

                if (!_.isObject(formData))
                    return;

                formData['action'] = 'impruw_media_update';

                //remove error message  if any
                $(evt.target).parent().find('span.error-span').remove();

                $.post(AJAXURL,
                    formData,
                    function(response) {

                        if (response.code === 'OK') {
                            self.cancelImageDetails(evt);
                            self.$el.find('.aj-imp-image-item .imgname').text(formData['image-title']);
                        } else if (response.code === 'ERROR') {
                            $(evt.target).before('<span class="error-span">' + response.message + '</span>');
                        }

                    }, 'json');

            }

        });

        return SingleMedia;

    });