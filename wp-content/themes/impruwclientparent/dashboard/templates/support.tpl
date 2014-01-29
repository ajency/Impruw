<header class="aj-imp-dash-header row">
	<div class="aj-imp-dash-title col-xs-12">
		<h2 class="aj-imp-page-head">Support</h2>
	</div>
</header>
<div class="alert alert-success hidden" id="support_status" name="support_status" ></div>
<div class="row">
	<div class="aj-imp-dash-content col-md-12">
		<h4 class="aj-imp-sub-head">Need Help? <small>Send us a message and we will get back to you.</small></h4>
		<form class="contact-form form-horizontal clearfix" method="post" action="" name="frm_support" id="frm_support">
	        <div class="form-group">
	            <label for="cf_name" class="col-sm-2 control-label">Name</label>
	            <div class="col-sm-10 col-sm-offset-2">
	                <input type="text" name="your_name" id="cf_name" class="form-control" placeholder="Your Full Name" value="" 
	                 required  parsley-trigger="blur" parsley-validation-minlength="0" parsley-regexp="^[a-zA-Z ]+$"  
	                 parsley-required-message="Please enter your name" parsley-regexp-message="Please enter valid name"/>
	                 <div class="p-messages"></div>
	            </div>
	        </div>
	        <div class="form-group">
	            <label for="cf_email" class="col-sm-2 control-label">Your E-mail Address</label>
	            <div class="col-sm-10 col-sm-offset-2">
	                <input type="text" name="email" id="cf_email" class="form-control" placeholder="Your Email Address" value="" 
	                 required  parsley-trigger="blur" parsley-validation-minlength="0" parsley-type="email"
					 parsley-required-message="Please enter email Id" />
	                 <div class="p-messages"></div>
	            </div>
	        </div>
	        <div class="form-group">
	            <label for="cf_subject" class="col-sm-2 control-label">Subject</label>
	            <div class="col-sm-10 col-sm-offset-2">
	                <input type="text" name="subject" id="cf_subject" class="form-control" placeholder="The Subject of your enquiry" value="" 
	                 required  parsley-trigger="blur" parsley-validation-minlength="0" parsley-required-message="Please enter subject" />
	                 <div class="p-messages"></div>
	            </div>
	        </div>
	        <div class="form-group">
	            <label for="cf_message" class="col-sm-2 control-label">Your Message</label>
	            <div class="col-sm-10 col-sm-offset-2">
	                <textarea name="message" id="cf_message" class="form-control" placeholder="Your Message" rows="3"
	                 required  parsley-trigger="blur" parsley-validation-minlength="0" parsley-required-message="Please enter your message" ></textarea>
	                 <div class="p-messages"></div>
	            </div>
	        </div>
	        <div class="form-group">
	            <div class="col-sm-10 col-sm-offset-2">
	                <button type="button" name="send" id="cf_send" class="btn aj-imp-submit">Submit</button>
	                <img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30" class="hidden"/>
	            </div>
	        </div>
	    </form>

	    <h4 class="aj-imp-sub-head">Cannot Wait? <small>Get in touch with us instantly, using these details.</small></h4>
		
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Registered Address</h3>
			</div>
			<div class="panel-body">
				<h5>Impruw Pvt. Ltd.</h5>
				<p>
					Leilighet 425<br>
					Trondheim<br>
					Norway<br>
					NO-7321
				</p>
			</div>
		</div>
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">Phone Numbers</h3>
			</div>
			<div class="panel-body">
				<h5><a href="tel:+4712345678">+47 - 12 34 56 78</a></h5>
				<h5><a href="tel:+4712345678">+47 - 12 34 56 78</a></h5>
			</div>
		</div>
		
	</div>
</div>