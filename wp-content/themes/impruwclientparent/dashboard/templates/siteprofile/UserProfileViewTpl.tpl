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
						<div class="scroll-indicator-container" id="scr1">
							<h4 class="aj-imp-sub-head scroll-ref">General <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h4>
							<form class="form-horizontal clearfix">
								
								<label for="inputEmail3" class="col-sm-2 control-label">Name</label>
								<div class="col-sm-10">
									<div class="form-group">
										<input type="text" class="form-control" id="inputEmail3" placeholder="Name" value="<%= user.get('displayName') %>">
									</div>
								</div>
								
								<label for="inputEmail1" class="col-sm-2 control-label">Email</label>
								<div class="col-sm-10">
									<div class="form-group">
										<input type="email" class="form-control" id="inputEmail1" placeholder="Email" value='<%= user.get('userEmail') %>'>
									</div>
								</div>
								
								<label for="inputFile4" class="col-sm-2 control-label">Profile Picture</label>
								<div class="col-sm-10">
									<div class="form-group">
										<div class="fileinput fileinput-new" data-provides="fileinput">
										  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 200px;"></div>
										  <div>
											<span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="inputFile4"></span>
											<a href="#" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
										  </div>
										</div>
									</div>
								</div>
								
								<div class="col-sm-offset-2 col-sm-10">
									<div class="form-group">
										<label for="checkbox2" class="checkbox checked">
											<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" value="">
											Let me know about new features and tips!
										</label>
									</div>
								</div>
								
								<div class="col-sm-offset-2 col-sm-10">
									<div class="form-group">
										<button type="submit" class="btn btn-wide aj-imp-submit">Update</button>
									</div>
								</div>
							</form>
						</div>
						<div class="scroll-indicator-container" id="scr2">
							<h6 class="aj-imp-sub-head-thin scroll-ref">Change your Password <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h6>
							<form class="form-horizontal clearfix">
																
								<label for="inputAddress1" class="col-sm-2 control-label">Old Password</label>
								<div class="col-sm-10">
									<div class="form-group">
										<input type="password" class="form-control" id="inputAddress1" placeholder="Old Password">
									</div>
								</div>
								
								<label for="inputAddress1" class="col-sm-2 control-label">New Password</label>
								<div class="col-sm-10">
									<div class="form-group">
										<input type="password" class="form-control" id="inputAddress1" placeholder="New Password">
									</div>
								</div>
								
								<label for="inputAddress1" class="col-sm-2 control-label">Confirm Password</label>
								<div class="col-sm-10">
									<div class="form-group">
										<input type="password" class="form-control" id="inputAddress1" placeholder="Confirm Password">
									</div>
								</div>
								
								<div class="col-sm-offset-2 col-sm-10">
									<div class="form-group">
										<button type="submit" class="btn btn-wide aj-imp-submit">Change Password</button>
									</div>
								</div>
									
							</form>
							
						</div>
						
						<div class="scroll-indicator-container" id="scr2">
							<h6 class="aj-imp-sub-head-thin scroll-ref">Change Language <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h6>
							<form class="form-horizontal clearfix">
								<label for="inputAddress4" class="col-sm-2 control-label">Select Language</label>
								<div class="col-sm-10">
									<div class="form-group">
										<select>
											<option value="0">English</option>
											<option value="1">Norsk</option>
											<option value="2">Swedish</option>
										</select>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>