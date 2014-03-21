
jQuery(document).ready ($)->

	$('#submit-contact-form').click (evt)->

		evt.preventDefault()



	 getFormData = (form)->

	    if (_.isUndefined(form))
	        return false;

	    serializedData = $(form).serializeArray();

	    data = {};

	    _.each(serializedData, function(ele, key) {

	        if(_.endsWith(ele.name,'[]')){

	            var name = ele.name.replace('[]','');

	            if(!_.isArray(data[name]))
	                data[name] = [];

	            data[name].push(ele.value);
	        }
	        else{
	            data[ele.name] = ele.value;
	        }
	    });

	    data
