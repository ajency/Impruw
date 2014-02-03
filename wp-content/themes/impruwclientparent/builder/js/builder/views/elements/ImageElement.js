define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'],
    function(BuilderElement, template, global) {

        var ImageElement = BuilderElement.extend({

            className: 'aj-imp-elem-image element',

            //define template for control
            template: template,

            //element type
            elementType: 'ImageElement',

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
                    this.id = this.type() + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                } else {
                    this.setProperties(options.config);
                }
                this.generateMarkup({icon : 'uniF10E', name : 'Image Element'});
             
                this.setContextMenu();

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

                require(['underscore', 'mediamanager'], _.bind(function(_, MediaManager) {

                    var mediamanager = getAppInstance().ViewManager.findByCustom("media-manager");

                    //if not present create new
                    if (_.isUndefined(mediamanager)) {
                        mediamanager = new MediaManager();
                        getAppInstance().ViewManager.add(mediamanager, "media-manager");
                    }

                    //start listening to event
                    this.listenTo(getAppInstance().vent,'image-selected', this.updateSelf);
 
                    mediamanager.open();

                }, this));

            },

            /**
             * Update self
             * @returns {undefined}
             */
            updateSelf: function(image, size) {

                //stop listening to image-selected event
                this.stopListening(getAppInstance().vent, 'image-selected', this.updateSelf);

                if (!_.isObject(image))
                    throw 'Invalid <image> datatype. Must be an Object';

                this.dataSource = {};

                this.dataSource.attachmentID    = image.get('id');
                this.dataSource.size            = size;

                this.$el.find('img').removeAttr('data-src').removeAttr('style').attr('alt','');
                this.$el.find('img').attr('src', image.get('sizes')[size].url);

            }

        });

        return ImageElement;
    });