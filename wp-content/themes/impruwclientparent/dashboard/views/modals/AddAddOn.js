/**
 *  Add Tax .js *  
 */
define(['views/modals/Modal', 'text!templates/modal/AddOn.tpl'], 
      function(Modal, template) {


        var AddAddOnModal = Modal.extend({

            id: 'add-tax',

            template: template,

            events: {
                
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                var html = _.template(this.outerTemplate, {
                    title: 'New Add On'
                });
                
                this.$el.html(html);
                
                //add markup
                var h = _.template(this.template,{});
                
                this.$el.find('.modal-content').append(h);
                
                //append to body
                $('body').append(this.$el);

                this.$el.modal();
            }
            
        });

        return AddAddOnModal;

    });
