/**
 *  Media .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['backbone', 'tpl!builder/templates/modal/media/singlemedia.tpl',
        'mediamodel', 'global'
    ],

    function(Backbone, template, MediaModel, global) {


        var SingleMedia = Backbone.View.extend({

            className: 'col-sm-2 single-img',

            template: template,

            events: {
                'click .save-image-details'     : 'saveImageDetails',
                'click .delete-image'           : 'deleteImageDetails',
                'click .cancel-image-details'   : 'cancelImageDetails',
                'click .select-image'           : 'selectImage'
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                if (_.isUndefined(args.model))
                    return;

                _.bindAll(this, 'saveImageDetails', 'selectImage');

                this.model = args.model;

                this.$el.attr('id', 'media-'+this.model.get('id'));

            },

            /**
             * [render description]
             * @return {[type]} [description]
             */
            render: function() {

                var html = this.template({
                
                    media: this.model,

                    type : 'modal'
                
                });

                this.$el.attr('media-id', this.model.get('id'));

                this.$el.html(html);

                // this.$el.find('select').selectpicker({
                //                                         style: 'btn-mini btn-default',
                //                                         menuStyle: 'dropdown'
                //                                     });

                // this.$el.find('input[type="checkbox"]').checkbox();

                return this;
            },

            /**
             * [unselectImage description]
             * @return {[type]} [description]
             */
            unselectImage : function(){

                this.$el.removeClass('ui-selected');

            },

            /** 
             * Close the details box
             */
            cancelImageDetails: function(evt) {
            
                $(evt.target).closest('.panel-collapse').prev().find('a[data-toggle="collapse"]').click();
            
            },

            /**
             * Delete the image
             * @return {[type]} [description]
             */
            deleteImageDetails : function(){

                if(!confirm('Are you sure?'))
                    return;

                 this.model.destroy({
                    success: _.bind(function(model, response){
                        getAppInstance().mediaCollection.remove(model);
                    }, this)
                });
            },

            /**
             * Select the image
             */
            selectImage: function(evt) {
                
                var size  = this.$el.find('select.image-size').val()

                size = size === '' ? 'thumbnail' : size;

                getAppInstance().vent.trigger('image-choosed', this.model, size);
                
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

                //remove error message  if any
                $(evt.target).parent().find('span.error-span').remove();

                var saveSuccessFn = _.bind(function(){
                    this.cancelImageDetails(evt);
                    this.$el.find('.aj-imp-image-item .imgname').text(formData['title']);
                }, this);


                this.model.save(formData,{
                    success : saveSuccessFn
                });
            }

        });

        return SingleMedia;

    });