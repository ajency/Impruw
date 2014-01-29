define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'],
    function(BuilderElement, template, global) {

        var TextElement = BuilderElement.extend({

            //class name for view
            className: 'aj-imp-elem-text element',

            //define template for control
            template: template,

            //element type
            elementType: 'TextElement',

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

                //drop mode
                if (_.isUndefined(options.config)) {
                    this.id = this.type() + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                    this.generateMarkup({icon : 'uniF111', name : 'Text Element'});
                } else {
                    this.setProperties(options.config);
                    if (!_.isUndefined(options.config.content))
                        this.generateMarkup({icon : 'uniF111', name : 'Text Element'}, options.config.content);
                }
                this.setContextMenu();

                this.$el.find('.content').attr('contenteditable',true);

            },

            /**
             * Generates the markup for column
             * and triggers the column droppable function
             *
             * @param {type} col
             * @returns {_L2.Anonym$0}
             */
            render: function(col) {

                return this;
            },

            /**
             *
             * @returns {undefined}
             */
            generateJSON: function() {

                var self = this;

                var json = this.returnJSON();

                var content = this.$el.find('.content').html();

                json.content = content.trim() === '' ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
                                                             Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,\
                                                             when an unknown printer took a galley of type and scrambled it to make a \
                                                             type specimen book. It has survived not only five centuries, but also the \
                                                             leap into electronic typesetting" : content;

                return json;

            },

        });

        return TextElement;
    });