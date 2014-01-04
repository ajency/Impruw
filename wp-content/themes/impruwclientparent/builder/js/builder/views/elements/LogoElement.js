define(['builder/views/elements/ImageElement', 'text!builder/templates/elements/LogoElement.hbs', 'global'],
    function(ImageElement, template, global) {

        var LogoElement = ImageElement.extend({

            //classnames
            className: 'aj-imp-elem-logo element',

            //define template for control
            template: template,

            //element type
            elementType: 'LogoElement',

            //identify element type
            type: 'logo',

            //view events
            events: {
                'mouseenter'                    : 'elementMouseEnter',
                'mouseleave'                    : 'elementMouseLeave',
                'click > .aj-imp-delete-btn'    : 'destroyElement',
                'contextmenu'                   : 'showContextMenu',
                'click .content a'              : 'avoidClick'
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
             * Avoid click of menu in builder 
             * @return {[type]} [description]
             */
            avoidClick : function(event){

                event.preventDefault();

                this.$el.click();

                return false;

            }

        });

        return LogoElement;
    });