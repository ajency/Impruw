define(['builder/views/elements/BuilderElement', 'text!builder/templates/elements/ImageElement.hbs', 'global'],
    function(BuilderElement, template, global) {

        var ImageElement = BuilderElement.extend({

            className: 'aj-imp-elem-image element',

            //define template for control
            template: template,

            //element type
            elementType: 'ImageElement',

            //identify element type
            type: 'image',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 100,

            // /**
            //  * Default datasource for an image
            //  * @type {Object}
            //  */
            // dataSource: {
            //     attachmentID : <int>,
            //     size         : <string>
            // },

            //
            events: {
                'mouseenter': 'elementMouseEnter',
                'mouseleave': 'elementMouseLeave',
                'click > .aj-imp-delete-btn': 'destroyElement',
                'contextmenu': 'showContextMenu',
                'click': 'showMediaManager'
            },

            /**
             * Initialize view
             *
             * @param {type} options
             * @returns {undefined}
             */
            initialize: function(options) {

                _.bindAll(this, 'elementMouseEnter', 'elementMouseLeave', 'updateSelf');

                //drop mode
                if (_.isUndefined(options.config)) {
                    this.id = this.type + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                } else {
                    this.setProperties(options.config);
                }
                this.generateMarkup();
                this.setParent(options.parent);
                this.setContextMenu();

            },

            /**
             * Generates the markup for column
             * and triggers the column droppable function
             *
             * @param {type} col
             * @returns {_L2.Anonym$0}
             */
            render: function() {

                return this;
            },

            /**
             * retunrs the JSOn
             */
            generateJSON: function() {

                var json = this.returnJSON();

                json.dataSource = this.dataSource;

                return json;
            },

            /**
             * Show the media manager modal
             */
            showMediaManager: function() {

                var self = this;

                require(['underscore', 'mediamanager'], function(_, MediaManager) {

                    var mediamanager = SiteBuilder.ViewManager.findByCustom("media-manager");

                    //if not present create new
                    if (_.isUndefined(mediamanager)) {
                        mediamanager = new MediaManager();
                        SiteBuilder.ViewManager.add(mediamanager, "media-manager");
                    }

                    //start listening to event
 
                    this.listenTo(SiteBuilder.vent,'image-selected', this.updateSelf);
 

                    mediamanager.open();

                });

            },

            /**
             * Update self
             * @returns {undefined}
             */
            updateSelf: function(image, size) {

                //stop listening to image-selected event
                this.stopListening(SiteBuilder.vent, 'image-selected', this.updateSelf);

                if (!_.isObject(image))
                    throw 'Invalid <image> datatype. Must be an Object';

                this.dataSource = {};

                this.dataSource.attachmentID    = image.get('id');
                this.dataSource.size            = size;

                this.$el.find('img').attr('src', image.get('sizes')[size].url);

            }

        });

        return ImageElement;
    });