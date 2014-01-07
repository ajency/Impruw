/**
 * 
 */
define(['backbone', 'text!templates/modal/ModelTpl.tpl', 'global'],

    function(Backbone, outerTemplate, global) {


        var Modal = Backbone.View.extend({

            id: 'id',

            forElement: null,

            outerTemplate: outerTemplate,

            className: 'modal wide-modal',

            open: function() {
                this.$el.modal('show');
                $('#controls-drag').hide();
                SiteBuilder.vent.trigger(this.id + '-open');
            },

            hide: function() {
                this.$el.modal('hide');
                SiteBuilder.vent.trigger(this.id + '-hide');
            }

        });

        return Modal;


    });
 
