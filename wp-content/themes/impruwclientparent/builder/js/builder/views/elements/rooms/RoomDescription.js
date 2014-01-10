define(['textelement', 'text!builder/templates/elements/BasicElement.hbs', 'global'],
    function(TextElement, template, global) {

        var RoomDescription = TextElement.extend({

            //class name for view
            className: 'aj-imp-elem-room-description element',

            //define template for control
            template: template,

            //element type
            elementType: 'RoomDescription',

            //identify element type
            type: 'roomtitle',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 100,

            //
            events: {
                'mouseenter'                : 'elementMouseEnter',
                'mouseleave'                : 'elementMouseLeave',
                'click > .aj-imp-delete-btn': 'destroyElement',
                'contextmenu'               : 'showContextMenu'
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
                this.generateMarkup({icon : 'icon', name : 'Room Description'});
                this.setContextMenu();
            }

        });

        return RoomDescription;
    });