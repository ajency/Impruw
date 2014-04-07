/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

jQuery(document).ready(function($){
	
	$('#contact-form-save').click(function(){

		if(!$(this).closest('form').valid())
			return;

		var data = getFormData($(this).closest('form'));
		
		data['action'] = 'send-contact-form-message';

		$.post(AJAXURL,
				data,
				function(response){

					$('#contact-form-save').closest('form').parent().find('.alert').remove();

					if(response.code === 'OK'){

						$('#contact-form-reset').click();
						var html = '<div class="alert alert-success alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Success!</strong> Message sent successfully\
									</div>';

						$('#contact-form-save').closest('form').before(html);
						$('#contact-form-save').closest('form').find('input[type="reset"]').click()
					}
					else if(response.code === 'ERROR'){

						$('#contact-form-reset').click();
						var html = '<div class="alert alert-danger alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Error!</strong>'+response.message+'\
									</div>';
						$('#contact-form-save').closest('form').before(html);
					}

				},'json');
	});

	var getFormData = function(form) {

        var serializedData = $(form).serializeArray();

        var data = {};

        $.each(serializedData, function(key, ele) {
            data[ele.name] = ele.value;
        });

        return data;

       }
       
      
        // create the slugs for the class names
        function slugify(str) {
            var $slug = '';
            var trimmed = $.trim(str);
            $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
            replace(/-+/g, '-').
            replace(/^-|-$/g, '');
            return $slug.toLowerCase();
        }
        
    // get the class name based on the daterange
        function getDateRangeClassName(date){
            var date_range_name = ''; 
           
            for(var i=0; i< DATERANGE.length; i++){
                    
               var from_date = new Date(DATERANGE[i].from_date);
                    
               var to_date = new Date(DATERANGE[i].to_date);
               
               if( date >= from_date && date <= to_date){
                   
                    var class_name = DATERANGE[i].daterange_name;
                    
                    var class_name_slug = slugify(class_name);
                                                        
                    date_range_name = class_name_slug;
                   
                    break;
               }
               else{
                   date_range_name = ' ';
               }
            
            }
            
            return date_range_name;
        }
       
        // get class name based on avaialbilty status
        function getAvailabilityClassName(date){
            
            var status = '';
           
            for(var i=0; i< BOOKING.length; i++){
                    
               var check = moment(BOOKING[i].bdate).isSame(date);
               
               if(check){
                   
                    status = BOOKING[i].status;
               }
               else{
                   status = 'available';
               } 
            }
            
            return status;
        }
        
        // get the class names for the dateranges
        function showDateRangeClass(date){
           
           var date_range_slug = getDateRangeClassName(date);
            
           var status = getAvailabilityClassName(date);
  
           var class_name = ['true',date_range_slug+' '+status];
                      
           return class_name;
        }
    
    // generate the datepicker  for the room booking 
       $('#room-booking-calendar').datepicker({
          inline: true,
          numberOfMonths: 2,
          dateFormat: 'yy-mm-dd',
          beforeShowDay : showDateRangeClass,
          onSelect : showData,
          
        });
        
        $('.ui-datepicker-current-day').click();
        
        $("#room-booking-calendar td.ui-datepicker-today a.ui-state-highlight").removeClass('ui-state-highlight');
        $("#room-booking-calendar td.ui-datepicker-today a.ui-state-active").removeClass('ui-state-active');
        
        getColour();
       
   // display the colour on the calender for date ranges 
       function getColour(){
            
          var classNames = ['green', 'red', 'orange', 'blue', 'pink','yellow'];
          
          var arr =[]; 
          for(var i=0; i< DATERANGE.length; i++){

              var date_range_name = DATERANGE[i].daterange_name;

              var slug_name= slugify(date_range_name);

              arr.push(slug_name); 
           }
           
           $.each(arr, function(key, val) {
              $(" ." + val ).addClass("booking-" + classNames[key]);
           });
      }
      
    // display the selected date and corresponding plans for the date
      function showData(date){
          
         displaySelectedDate(date);
         
         var html = showPlans(date);
         
         $('#plans-details-region').find('.carousel-inner').empty();
         
         $('#plans-details-region').find('.carousel-inner').append(html);
 
         $('.carousel').carousel({
                interval: 2000
          });
          
        setTimeout(function(){
        	 getColour();
         }, 10);
         
        
         
         
      }
      
      // display the date selected along with availabilty status
      function displaySelectedDate(date){
          
          var selected_date = moment(date).format('D MMM');
          
          $('.date-range').find('b').text(selected_date);
          
          $('.status').text(getAvailabilityClassName(date));
         
      }
      
      
      function showPlans(date){
        var html ='';
        
        for(var i=0; i< DATERANGE.length; i++){

             var from_date = new Date(DATERANGE[i].from_date);

             var to_date = new Date(DATERANGE[i].to_date);
             
             var selected_date=  new Date(date);
             
             var  range = moment().range(from_date, to_date);
             
              if(range.contains(selected_date)){
                  
                  html = checkTariffForPlanId(DATERANGE[i].id);
                  
                  break;
              }
              
              else{
                  
                  html = '  <div class="item active">\n\
                            <div class="room-booking-plan"><h5>\n\
                            No plans exsists for selected date</h5></div></div>';
              }
    
          }
          
          return html;
      }
      
      function checkTariffForPlanId(daterange_id){
           var html = ''; var temp =0;
           
           if(TARIFF.length > 0){ 
           
              for(var i=0; i< TARIFF.length; i++){
               
               if(TARIFF[i].daterange_id == daterange_id){
                   
                    var plans = getPlans(TARIFF[i].plan_id);
                    
                    var weekday = TARIFF[i].weekday;
                    
                    var weekend = TARIFF[i].weekend;

                    if( plans!= ''){
                        
                        if(temp == 0){
                            
                          html += '<div class=" active item">';
                          temp = 1;
                        }
                        else{
                             html += '<div class="item">';
                        }
                        
                        html += '<div class="room-booking-plan">'+plans;
                        
                        html += '<div class="booking-detail">Max Adults Weekdays:<span>'+
                                weekday.max_adults+'</span></div>';
 
                        html += '<div class="booking-detail">Max Children Weekdays:<span>'+
                                weekday.max_children+'</span></div>';
                       
                        html += '<div class="clearfix"></div>';
                        
                         html += '<div class="plan-bg">'

                        html += '<h6>Additional Charge Weekdays</h6>'+
                                '<div class="booking-detail">per extra Adult:$'
                                + weekday.extra_adult+'</div>';

                        html += '<div class="booking-detail">per extra Child:$'
                                + weekday.extra_child+'</div>';

                        html += '<div class="clearfix"></div>';
                        
                        html += '<div class="booking-price">WEEKDAYS <b>$'+weekday.charge+'</b></div>';
                        
                        html += '</div>';
                        
                        html += '<div class="booking-detail">Max Adults Weekend:<span>'+
                                weekend.max_adults+'</span></div>';
 
                        html += '<div class="booking-detail">Max Children Weekend:<span>'+
                                weekend.max_children+'</span></div>';
                       
                        html += '<div class="clearfix"></div>';
                        
                        html += '<div class="plan-bg">';

                        html += '<h6>Additional Charge Weekend</h6>'+
                                '<div class="booking-detail">per extra Adult:$'
                                + weekend.extra_adult+'</div>';

                        html += '<div class="booking-detail">per extra Child:$'
                                + weekend.extra_child+'</div>';

                        html += '<div class="clearfix"></div>';
                        
                        html += '<div class="booking-price">WEEKEND <b>$'+weekend.charge+'</b></div>';
                        
                        html += '</div></div></div>';
                       
                    }
                   
               }
               else{
                   //console.log(TARIFF[i].daterange_id+'----'+daterange_id);
                  // html = ' <div class="room-booking-plan"><h5>No plans \n\
                //   exsists for selected date</h5></div>'; 
               }
           }
       }
       else{
           html = ' <div class="room-booking-plan"><h5>No plans \n\
                    exsists for selected date</h5></div>';
       }
           
       return html;
          
      }
      
      function getPlans(plan_id){
         var html = '';
         
         for(var i=0; i< PLANS.length; i++){
            
              if(PLANS[i].id == plan_id){
                  
                  var plan_name = PLANS[i].plan_name;
                  
                  var plan_description = PLANS[i].plan_description;
                  
                  html = ' <h5>'+plan_name+
                          '</h5><p>'+plan_description+'</p>';
             }
         }
         
         return html;
      }    
     
});