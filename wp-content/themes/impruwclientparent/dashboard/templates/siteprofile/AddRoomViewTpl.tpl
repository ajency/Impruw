
				<header class="aj-imp-dash-header row">
					<div class="aj-imp-dash-title col-xs-8">
						<h2 class="aj-imp-page-head">Add Room</h2>
					</div>
					<div class="aj-imp-dash-actions col-xs-4">
						<a href="#" class="btn btn-embossed btn-wide"><span class="glyphicon glyphicon-cog"></span> Settings</a>
					</div>
				</header>
	
				<div class="row">
					<div class="aj-imp-dash-content col-md-12">
					
						<div class="alert alert-success">
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							Your details have been successfully saved.
						</div>
						<form class="form-horizontal clearfix">
								
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">Add Room Category</label>
								<div class="col-sm-10 col-sm-offset-2">
									<input type="text" class="form-control" id="roomcategory" name="roomcategory" 
									placeholder="eg. Executive Room" required parsley-trigger="blur" parsley-validation-minlength="0"
									/>
								</div>
							</div>

							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">No. of Rooms</label>
								<div class="col-sm-10 col-sm-offset-2">
									<input type="numeric" class="form-control" name="roomnos" id="roomnos" placeholder="eg. 10">
								</div>
							</div>

						</form>
						<div class="scroll-indicator-container" id="scr1">
							<h4 class="aj-imp-sub-head scroll-ref">Room Description <small>Give a brief description of your room category.</small></h4>
							<form class="form-horizontal clearfix">
								
								<div class="form-group">
									<label for="inputSEO1" class="col-sm-2 control-label">Room Description</label>
									<div class="col-sm-10 col-sm-offset-2">
										<!-- <textarea class="form-control" rows="3" name="inputSEO1" placeholder="eg. Watch the shimmering spectacle of stars from your own private terrace or patio. The Executive Room features a Master King size bedroom, soft plump pillows, mattress and a light as air duvet. Separater living room designed for lounging, chic light fixtures, deep comfortable couch and beautifully crafted furnishings."></textarea> -->
										<input type="text" class="form-control" id="roomdescription" name="roomdescription" placeholder="Room Description">
									</div>
								</div>
								
							</form>
						</div>
						<div class="scroll-indicator-container" id="scr2">
							<h4 class="aj-imp-sub-head scroll-ref">Facilities <small>List the facilities available in this room.</small></h4>
							<form class="form-horizontal clearfix" name="form_addroom" id="form_addroom">
								
								<div class="form-group">
									<div class="col-sm-12">
										<div class="facilities-list clearfix">
											<div class="facility">
												<label for="checkbox2" class="checkbox checked">
													<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" >
													Air Conditioning
												</label>
												<div class="action">
													<a href="#" class="edit">Edit</a>&nbsp;<a href="#" class="delete">Delete</a>
												</div>
											</div>
											<div class="facility">
												<label for="checkbox2" class="checkbox checked">
													<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" >
													Room Service
												</label>
												<div class="action">
													<a href="#" class="edit">Edit</a>&nbsp;<a href="#" class="delete">Delete</a>
												</div>
											</div>
											<div class="facility">
												<label for="checkbox2" class="checkbox checked">
													<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" >
													Mini Bar
												</label>
												<div class="action">
													<a href="#" class="edit">Edit</a>&nbsp;<a href="#" class="delete">Delete</a>
												</div>
											</div>
											<div class="facility">
												<label for="checkbox2" class="checkbox checked">
													<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" >
													Free WIFI
												</label>
												<div class="action">
													<a href="#" class="edit">Edit</a>&nbsp;<a href="#" class="delete">Delete</a>
												</div>
											</div>
											<div class="facility">
												<label for="checkbox2" class="checkbox checked">
													<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" >
													Television
												</label>
												<div class="action">
													<a href="#" class="edit">Edit</a>&nbsp;<a href="#" class="delete">Delete</a>
												</div>
											</div>
											<div class="facility add">
												<div class="input-group">		            	              
									              <input type="text" class="form-control input-sm" placeholder="Add Facility" id="search-query-2">
									              <span class="input-group-btn">
										        	<button type="button" name="btn_saveroom" id="btn_saveroom" class="btn btn-default"><span class="fui-plus"></span></button>
									              </span>
									            </div>
											</div>
										</div>
									</div>
								</div>
								
							</form>
						</div>
						
						<div class="aj-imp-long-form-actions" data-spy="affix" data-offset-top="200">
							<form class="form-horizontal clearfix">
								<div class="affix-show">You have unsaved changes!</div>
								<button type="button" class="btn btn-wide aj-imp-submit" id="btn_saveroom" name="btn_saveroom">Save Room</button>
							</form>
						</div>
					
					
					</div>					
				</div>