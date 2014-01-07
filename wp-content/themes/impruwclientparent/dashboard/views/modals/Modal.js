/**
 * 
 */
define(['backbone', 'text!templates/modal/Model.tpl'],

    function(Backbone, outerTemplate) {


        var Modal = Backbone.View.extend({

            id: 'id',

            forElement: null,

            outerTemplate: outerTemplate,

            className: 'modal wide-modal',

            open: function() {
                this.$el.modal('show');
                ImpruwDashboard.vent.trigger(this.id + '-opened');
            },

            hide: function() {
                this.$el.modal('hide');
                ImpruwDashboard.vent.trigger(this.id + '-closed');
            }

        });

        return Modal;


    });
 
