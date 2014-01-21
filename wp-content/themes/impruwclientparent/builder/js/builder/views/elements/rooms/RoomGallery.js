define(['sliderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'],
    function(SliderElement, template, global) {

        var RoomGallery = SliderElement.extend({

            //class name for view
            className: 'aj-imp-elem-room-gallery element',

            //define template for control
            template: template,

            //element type
            elementType: 'RoomGallery',

            //events
            events: {
                'mouseenter'                : 'elementMouseEnter',
                'mouseleave'                : 'elementMouseLeave',
                'click > .aj-imp-delete-btn': 'destroyElement',
                'click'                     : 'showModal',
                'contextmenu'               : 'showContextMenu',
                'click a.carousel-control'  : 'stopModalPopup'
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
                this.generateMarkup({icon : '' , name : 'Room Gallery'});
                this.setContextMenu();
            }

        });

        return RoomGallery;
    });