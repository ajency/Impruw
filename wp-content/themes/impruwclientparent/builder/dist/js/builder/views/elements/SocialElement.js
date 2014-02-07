define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'],
    function(BuilderElement, template, global) {

        var SocialElement = BuilderElement.extend({

            //class name for view
            className: 'aj-imp-elem-social element',

            //define template for control
            template: template,

            //element type
            elementType: 'SocialElement',

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
                } else {
                    this.setProperties(options.config);
                }
                this.generateMarkup({icon : 'uniF11A', name : 'Social Element'});
                this.setContextMenu();

            },

            /**
             * Generates the markup for social
             * and triggers the column droppable function
             *
             * @param {type} col
             * @returns {_L2.Anonym$0}
             */
            render: function() {

                return this;
            }

        });

        return SocialElement;
    });