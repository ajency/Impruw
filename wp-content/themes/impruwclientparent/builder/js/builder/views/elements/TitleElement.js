define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'],
    function(BuilderElement, template, global) {

        var TitleElement = BuilderElement.extend({

            //class name for view
            className: 'aj-imp-elem-title element',

            //define template for control
            template: template,

            //element type
            elementType: 'TitleElement',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 60,

            //
            events: {
                'mouseenter': 'elementMouseEnter',
                'mouseleave': 'elementMouseLeave',
                'click > .aj-imp-delete-btn': 'destroyElement',
                'contextmenu': 'showContextMenu'
            },

            /**
             * Initialize view
             *
             * @param {type} options
             * @returns {undefined}
             */
            initialize: function(options) {

                this.parent = options.parent;

                //drop mode
                if (_.isUndefined(options.config)) {
                    this.id = this.type() + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                    this.generateMarkup({icon : 'uniF11C', name : 'Title Element'});
                } else {

                    this.setProperties(options.config);
                    if (!_.isUndefined(options.config.content))
                        this.generateMarkup({icon : 'uniF11C', name : 'Title Element'}, options.config.content);
                }
                this.setContextMenu();

                this.$el.find('.content').attr('contenteditable',true);
            },

            /**
             *
             * @returns {undefined}
             */
            generateJSON: function() {

                var self = this;

                var json = this.returnJSON();

                json.content = this.$el.find('.content').html();

                return json;

            }
        });

        return TitleElement;
    });