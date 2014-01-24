/**
 *  Adddaterange .js *  
 */
define(['modal', 'tpl!templates/modal/AddDateRange.tpl','parsley'], 
      function(Modal, template) {


        var AddDateRangeModal = Modal.extend({

            id: 'add-daterange',

            template: template,

            events: {
            	'click #btn_savedaterange'			: 'saveDateRange' 
            	// 'click .dated'						: 'showdatepicker' 
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                var html = this.outerTemplate({
                    title: 'Add Date Range'
                });
                
                this.$el.html(html);
                
                //add markup
                var h = this.template({});
                
                this.$el.find('.modal-content').append(h);
                
                //append to body
                $('body').append(this.$el);

                this.$el.modal();
                
                var datepickerSelector = '.dated';
     			$(datepickerSelector).datepicker({
     			  showOtherMonths: true,
     			  selectOtherMonths: true,
     			  dateFormat: "d MM, yy",
     			  yearRange: '-1:+1'
     			}).prev('.btn').on('click', function (e) {
     			  e && e.preventDefault();
     			  $(datepickerSelector).focus();
     			});

     			// Now let's align datepicker with the prepend button
     			$(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth()});
     			parsleyInitialize($('#form_daterange'));
     			
               
               
            },
            /*showdatepicker : function(){
            	 var datepickerSelector = '.dated';
     			$(datepickerSelector).datepicker({
     			  showOtherMonths: true,
     			  selectOtherMonths: true,
     			  dateFormat: "d MM, yy",
     			  yearRange: '-1:+1'
     			}).prev('.btn').on('click', function (e) {
     			  e && e.preventDefault();
     			  $(datepickerSelector).focus();
     			});

     			// Now let's align datepicker with the prepend button
     			$(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth()});
     		
            	
            },*/
            
            /**
             * Function to save date range
             */
            saveDateRange : function(evt){
            	
            	if (!this.$el.find('#form_daterange').parsley('validate'))
  				  return;
            	
            	$(evt.target).prop('disabled',true);
            	
    			var fromDaterange 	=  $(evt.target).closest('.modal-content').find('#fromdaterange').val() 
    			var toDaterange		=  $(evt.target).closest('.modal-content').find('#todaterange').val() 
    			var daterangeLabel		=  $(evt.target).closest('.modal-content').find('#daterange_label').val()
    			$(evt.target).next().show();
    			 
    			
    			var evt_ = evt;
    			var self_ = this;
    			
    			var data = {	action			: 'add_date_range',						 
    							fromdaterange 	: fromDaterange,
    							todaterange		: toDaterange,
    							daterangeLabel 	: daterangeLabel
    						};
    			
    			
    			$.post(	AJAXURL,
    			data,
    			function(response){ 
    				 
    				 if(response.code=='OK'){ 		
    					 
    				 	 	ImpruwDashboard.vent.trigger('new-date-range-added',response,evt_);
    				 	 	ImpruwDashboard.vent.trigger('modal-closed');
						 	$(evt_.target).parent().parent().find('.close').click();
    					 
    				}
    				else{
    						 
    						$(evt.target).prop('disabled',false);
    						ImpruwDashboard.vent.trigger('new-date-range-added',response,evt_);
    				} 
    			
    			});
    			
    		} 

  
        });

        return AddDateRangeModal;

    });
