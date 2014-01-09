define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'],
    function(BuilderElement, template, global) {

        var AddressElement = BuilderElement.extend({

            //class name for view
            className: 'aj-imp-elem-address element',

            //define template for control
            template: template,

            //element type
            elementType: 'AddressElement',

            //identify element type
            type: 'address',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 100,

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
                    this.id = this.type + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                } else {
                    this.setProperties(options.config);
                }
                this.generateMarkup({icon : '', name : 'Address Element'});
                this.setParent(options.parent);
                this.setContextMenu();

            }

        });

        return AddressElement;
    });