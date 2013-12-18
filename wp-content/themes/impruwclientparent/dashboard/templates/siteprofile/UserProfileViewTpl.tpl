<header class="aj-imp-dash-header row">
					<div class="aj-imp-dash-title col-sm-8">
						<h2 class="aj-imp-page-head">Profile</h2>
					</div>
					<div class="aj-imp-dash-actions col-sm-4">
						<a href="#" class="btn btn-embossed btn-wide"><span class="glyphicon glyphicon-cog"></span> Settings</a>
					</div>
</header>
<div class="row">
					<div class="aj-imp-dash-content col-md-12">
					
					<div class="alert alert-success" id="userprofilesave_status"  style="display:none;">
						<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
						Your details have been successfully saved.
					</div>
					
						<div class="scroll-indicator-container" id="scr1">
							<h4 class="aj-imp-sub-head scroll-ref">General <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h4>
							<form class="form-horizontal clearfix form_userprofile" name="form_usergeneral" id="form_usergeneral" >
								<div class="form-group">
									<label for="name" class="col-sm-2 control-label">Name</label>
									<div class="col-sm-10 col-sm-offset-2">
										 
											<input type="text" class="form-control" id="display_name" name="display_name" 
											placeholder="Name" value="<%= user.get('displayName') %>" 
											required parsley-validation-minlength="0"  parsley-minlength="3" 
											parsley-trigger="blur"  parsley-regexp="^[a-zA-Z ]+$" 
											parsley-required-message="Please enter firstname lastname"  
	                                        parsley-minlength-message="Name should be atleast 3 characters long" />
											<div class="p-messages"></div>
										 
									</div>
								</div>
								
								<div class="form-group">
									<label for="inputEmail1" class="col-sm-2 control-label">Email</label>
									<div class="col-sm-10 col-sm-offset-2">
										 
											<input type="email" class="form-control" id="user_email" name="user_email" 
											placeholder="Email" value='<%= user.get('userEmail') %>' parsley-required="true"  
											parsley-trigger="blur" parsley-validation-minlength="0"  parsley-type="email"
											parsley-required-message="Please enter email Id"   />
											<div class="p-messages"></div>
										 
									</div>
								</div>
								
								<div class="form-group">
									<label for="inputFile4" class="col-sm-2 control-label">Profile Picture</label>
									<div class="col-sm-10 col-sm-offset-2">
										 
											<div class="fileinput fileinput-new" data-provides="fileinput">
											  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 200px;"></div>
											  <div>
												<span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="inputFile4"></span>
												<a href="#" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
											  </div>
											</div>
										 
									</div>
								</div>
								
								<div class="form-group">
									<div class="col-sm-offset-2 col-sm-10">
										 
											<label for="checkbox2" class="checkbox checked">
												<input type="checkbox" data-toggle="checkbox" checked="checked" id="new_feature_alert"  name="new_feature_alert" value="1">
												Let me know about new features and tips!
											</label>
										 
									</div>
								</div>
								
								<div class="form-group">
									<div class="col-sm-offset-2 col-sm-10">
										 
											<button type="button" class="btn btn-wide aj-imp-submit" name="btn_saveusergeneral" id="btn_saveusergeneral" >Update</button>
											<img src ='<%=THEMEURL%>/images/loader.gif' width="38" height="30"  id="userprofilesubmitm_loader" style="display:none"/>
										 
									</div>
								</div>
								
							</form>
						</div>
						<div class="scroll-indicator-container" id="scr2">
							<h6 class="aj-imp-sub-head-thin scroll-ref">Change your Password <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h6>
							<form class="form-horizontal clearfix form_userprofile" id="form_userpass" name="form_userpass" >
								
								<div class="form-group">								
									<label for="inputAddress1" class="col-sm-2 control-label">Old Password</label>
									<div class="col-sm-10 col-sm-offset-2">
										 
											<input type="password" class="form-control" id="currentpass" name="currentpass" 
											placeholder="Old Password" required parsley-trigger="blur" 
											parsley-validation-minlength="0" parsley-minlength="6" 
											parsley-required-message="Please enter current password" >
											<div class="p-messages"></div>
										 
									</div>
								</div>
								
								
								<div class="form-group">
									<label for="inputAddress1" class="col-sm-2 control-label">New Password</label>
									<div class="col-sm-10 col-sm-offset-2">
										 
											<input type="password" class="form-control" id="newpass1" name="newpass1" 
											placeholder="New Password" required parsley-trigger="blur" 
											parsley-validation-minlength="0" parsley-minlength="6" parsley-equalto="#newpass1" 
											parsley-required-message="Please enter new password"   >
											<div class="p-messages"></div>
										 
									</div>
								</div>
								
								
								<div class="form-group">
									<label for="inputAddress1" class="col-sm-2 control-label">Confirm Password</label>
									<div class="col-sm-10 col-sm-offset-2">
										 
											<input type="password" class="form-control" id="newpass2" name="newpass2"  
											placeholder="Confirm Password" required parsley-trigger="blur" 
											parsley-validation-minlength="0" parsley-minlength="6" parsley-equalto="#newpass1" 
											parsley-required-message="Please Retype new password" >
											<div class="p-messages"></div>
										 
									</div>
								</div>
								
								<div class="form-group">
									<div class="col-sm-offset-2 col-sm-10">
										 
											<button type="button" id="btn_updatepassword" name="btn_updatepassword"  class="btn btn-wide aj-imp-submit">Change Password</button>
											<img src ='<%=THEMEURL%>/images/loader.gif' width="38" height="30"  id="changepassubmit_loader" style="display:none"/>
										 
									</div>
								</div>
									
							</form>
							
						</div>
						
						<div class="scroll-indicator-container" id="scr2">
							<h6 class="aj-imp-sub-head-thin scroll-ref">Change Language <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h6>
							<form class="form-horizontal clearfix">
								<div class="form-group">
									<label for="inputAddress4" class="col-sm-2 control-label">Select Language</label>
									<div class="col-sm-10 col-sm-offset-2">
										 
											<select>
												<option value="English">English</option>
												<option value="Norsk">Norsk</option>
												<option value="Swedish">Swedish</option>
											</select>
										 
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>