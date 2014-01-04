
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
					
						<div class="alert alert-success hidden" id="roomsave_status" name="roomsave_status" >
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							Your details have been successfully saved.
						</div>
						<form class="form-horizontal clearfix" name="frm_addroom" id="frm_addroom" >
								
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">Add Room Category</label>
								<div class="col-sm-10 col-sm-offset-2">
									<input type="text" class="form-control" id="roomcategory" name="roomcategory" 
									placeholder="eg. Executive Room" required parsley-trigger="blur" parsley-validation-minlength="0"
									parsely-required-message = "Please enter room category" />
									<div class="p-messages"></div>
								</div>
							</div>

							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">No. of Rooms</label>
								<div class="col-sm-10 col-sm-offset-2">
									<input type="numeric" class="form-control" name="roomnos" id="roomnos" placeholder="eg. 10" 
									required parsley-trigger="blur" parsley-validation-minlength="0" parsley-type="number"
									parsley-range="[1, 100]" parsel-required-message = "Please enter no of rooms" >
									<div class="p-messages"></div>
								</div>
							</div>

						</form>
						<div class="scroll-indicator-container" id="scr1">
							<h4 class="aj-imp-sub-head scroll-ref">Room Description <small>Give a brief description of your room category.</small></h4>
							<form class="form-horizontal clearfix" id="frm_roomdesc" name="frm_roomdesc" >
								
								<div class="form-group">
									<label for="inputSEO1" class="col-sm-2 control-label">Room Description</label>
									<div class="col-sm-10 col-sm-offset-2">
										  <textarea class="form-control" rows="2" name="inputSEO1" id="roomdescription" name="roomdescription"
										 placeholder="Room Description" required parsley-trigger="blur" 
										 parsley-validation-minlength="0" parsley-required-message="please enter room description"  ></textarea>  
										<!-- <input type="text" class="form-control" id="roomdescription" name="roomdescription"
										 placeholder="Room Description" required parsley-trigger="blur" 
										 parsley-validation-minlength="0" parsley-required-message="please enter room description" > -->
										<div class="p-messages"></div>
									</div>
								</div>
								
							</form>
						</div>
						<div class="scroll-indicator-container" id="scr2">
							<h4 class="aj-imp-sub-head scroll-ref">Facilities <small>List the facilities available in this room.</small></h4>
							<form class="form-horizontal clearfix" name="form_addfacility" id="form_addfacility">
								
								<div class="form-group">
									<div class="col-sm-12">
										<div class="facilities-list clearfix">
										
										
												<%
												_.each(roomdata.facilities,function(facility,index){ %>
												<div class="facility" id="facility-<%=facility.term_id %>">
													<label for="checkbox2" class="checkbox checked">
														<input type="checkbox" data-toggle="checkbox" checked="checked" name="facility[]"   value="<%=facility.name %>"   >
														<span id="facLabel-<%=facility.term_id %>" facililtyname="<%=facility.name %>"  ><%=facility.name %></span>
													</label>
													<div class="action">
														<a href="javascript:void(0)" class="edit"  term-id="<%=facility.term_id %>">Edit</a>&nbsp;<a href="javascript:void(0)" class="delete" term-id="<%=facility.term_id %>">Delete</a>
													</div>
												</div>
												
												<% }) %>
											 
											
											
											<div class="facility add">
												<div class="input-group">		
													          	              
									              <input type="text" class="form-control input-sm" placeholder="Add Facility" 
									              id="new_facilityname" name="new_facilityname" required parsley-trigger="blur" 
									               parsley-validation-minlength="0" parsely-required-message = "Please enter new facility name" >
													<div class="p-messages"></div>
									              <span class="input-group-btn">
										        	<button type="button" name="btn_addfacility" id="btn_addfacility" class="btn btn-default" >
													<span class="fui-plus"></span></button>
													<img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30"  
													id="newfacilitysave_loader" style="display:none"/>
									              </span>
									              
									            </div>
											</div>
										   
										</div>
									</div>
								</div>
								
							</form>
						</div>
						
						<div class="scroll-indicator-container" id="scr3">
							<h4 class="aj-imp-sub-head scroll-ref">Add Date Range <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h4>
							<form class="form-horizontal clearfix">

								<div class="form-table table-responsive">
									<table class="table table-striped">
										<thead>
											<tr>
												<th width="5%"></th>
												<th width="30%">Date Range</th>
												<th width="35%">Tariff</th>
												<th width="30%">Actions</th>
											</tr>
										</thead>
										<tbody>
										
										
										 <% console.log(roomdata.dateranges) %>
										
										<% _.each(roomdata.dateranges,function(daterange,index){
										%>
										
										
										<tr>
												<td colspan="4" class="no-mar table-responsive">
												
													<table class="table table-vc" data-toggle="collapse" data-target="#rowlink<%=daterange.id%>">
														<tbody data-link="row" class="rowlink">
															<tr>
																<td width="5%"><a href="#rowlink<%=daterange.id%>" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
																<td width="30%">
																	<span class="label label-info">From:</span><%=daterange.from%>    <span class="label label-info">To:</span> <%=daterange.to%>
																</td>
																<td width="35%">
																	<span class="label label-info">Weekday:</span> from<strong>$29</strong> <span class="label label-info">Weekend:</span> from<strong>$37</strong>
																</td>
																<td width="30%" class="rowlink-skip">
																	<a href="#" class="edit-link"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
																	<a href="#" class="delete-link"><span class="glyphicon glyphicon-trash"></span> Delete</a>
																</td>
															</tr>
															
														</tbody>
													</table>
													<div id="rowlink<%=daterange.id%>" class="inner collapse">
														<div class="form-table table-responsive">
															<table class="table table-bordered table-hover">
																<thead>
																	<tr>
																		<th>Plan Name</th>
																		<th>Plan Description</th>
																		<th>Weekday Tariff</th>
																		<th>Weekend Tariff</th>
																	</tr>
																</thead>
																
																<tbody data-link="row" class="rowlink">
																
																<% _.each(daterange.plans,function(plan,plan_index){
																%>
																	<tr>
																		<td>
																			<a href="#plan1" data-toggle="modal"><%=plan.plan_name %></a>
																		</td>
																		<td>
																			<%=plan.plan_description %> 
																		</td>
																		<td>
																			$<%=plan.weekday_tariff %> 
																		</td>
																		<td>
																			$<%=plan.weekend_tariff %> 
																		</td>
																	</tr>
																
																<%
																})%>
																
																<% if(daterange.plans.length<=0){
																%>
																<tr>
																		<td colspan="4">
																			 No plans added yet
																		</td>
																	</tr>
																<%
																}
																%>
																	 
																	 
																</tbody>
															</table>
														</div>
														<div class="add-text">
															Add Another Plan <button type="button" daterange-id = '<%=daterange.id %>'  class="btn add-btn btn-sm btn_add_plan" data-toggle="modal" data-target="#add-plantype"><i class="glyphicon glyphicon-plus"></i></button>
														</div>
													</div>
												</td>
											</tr>
										<% }) %>
										
										
										
										
										
										
										
											<tr>
												<td colspan="4" class="no-mar table-responsive">
												
													<table class="table table-vc" data-toggle="collapse" data-target="#rowlink01">
														<tbody data-link="row" class="rowlink">
															<tr>
																<td width="5%"><a href="#rowlink01" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
																<td width="30%">
																	<span class="label label-info">From:</span> 21/12/2013 <span class="label label-info">To:</span> 30/4/2014
																</td>
																<td width="35%">
																	<span class="label label-info">Weekday:</span> from<strong>$29</strong> <span class="label label-info">Weekend:</span> from<strong>$37</strong>
																</td>
																<td width="30%" class="rowlink-skip">
																	<a href="#" class="edit-link"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
																	<a href="#" class="delete-link"><span class="glyphicon glyphicon-trash"></span> Delete</a>
																</td>
															</tr>
															
														</tbody>
													</table>
													<div id="rowlink01" class="inner collapse">
														<div class="form-table table-responsive">
															<table class="table table-bordered table-hover">
																<thead>
																	<tr>
																		<th>Plan Name</th>
																		<th>Plan Description</th>
																		<th>Weekday Tariff</th>
																		<th>Weekend Tariff</th>
																	</tr>
																</thead>
																<tbody data-link="row" class="rowlink">
																	<tr>
																		<td>
																			<a href="#plan1" data-toggle="modal">American Plan</a>
																		</td>
																		<td>
																			Lorem ipsum dolor sit amet, consectetur adipiscing, lorem ipsum dolor sit amet, consectetur adipiscing.
																		</td>
																		<td>
																			$29
																		</td>
																		<td>
																			$37
																		</td>
																	</tr>
																	<tr>
																		<td>
																			<a href="#plan1" data-toggle="modal">British Plan</a>
																		</td>
																		<td>
																			Lorem ipsum dolor sit amet, consectetur adipiscing, lorem ipsum dolor sit amet, consectetur adipiscing.
																		</td>
																		<td>
																			$29
																		</td>
																		<td>
																			$37
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<div class="add-text">
															Add Another Plan <button type="button" class="btn add-btn btn-sm" data-toggle="modal" data-target="#add-plantype"><i class="glyphicon glyphicon-plus"></i></button>
														</div>
													</div>
												</td>
											</tr>
											
											
											
											
											<tr>
												<td colspan="4" class="no-mar table-responsive">
													<table class="table table-vc" data-toggle="collapse" data-target="#rowlink02">
														<tbody data-link="row" class="rowlink">
															<tr>
																<td width="5%"><a href="#rowlink02" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
																<td width="30%">
																	<span class="label label-info">From:</span> 21/12/2013 <span class="label label-info">To:</span> 30/4/2014
																</td>
																<td width="35%">
																	<span class="label label-info">Weekday:</span> from<strong>$29</strong> <span class="label label-info">Weekend:</span> from<strong>$37</strong>
																</td>
																<td width="30%" class="rowlink-skip">
																	<a href="#" class="edit-link"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
																	<a href="#" class="delete-link"><span class="glyphicon glyphicon-trash"></span> Delete</a>
																</td>
															</tr>
															
														</tbody>
													</table>
													<div id="rowlink02" class="inner collapse">
														<div class="form-table table-responsive">
															<table class="table table-bordered table-hover">
																<thead>
																	<tr>
																		<th>Plan Name</th>
																		<th>Plan Description</th>
																		<th>Weekday Tariff</th>
																		<th>Weekend Tariff</th>
																	</tr>
																</thead>
																<tbody data-link="row" class="rowlink">
																	<tr>
																		<td>
																			<a href="#plan1" data-toggle="modal">American Plan</a>
																		</td>
																		<td>
																			Lorem ipsum dolor sit amet, consectetur adipiscing, lorem ipsum dolor sit amet, consectetur adipiscing.
																		</td>
																		<td>
																			$29
																		</td>
																		<td>
																			$37
																		</td>
																	</tr>
																	<tr>
																		<td>
																			<a href="#plan1" data-toggle="modal">British Plan</a>
																		</td>
																		<td>
																			Lorem ipsum dolor sit amet, consectetur adipiscing, lorem ipsum dolor sit amet, consectetur adipiscing.
																		</td>
																		<td>
																			$29
																		</td>
																		<td>
																			$37
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
														<div class="add-text">
															Add Another Plan <button type="button" class="btn add-btn btn-sm" data-toggle="modal" data-target="#add-plantype"><i class="glyphicon glyphicon-plus"></i></button>
														</div>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="add-text">
									Add Date Range <button type="button" class="btn add-btn btn-sm" data-toggle="modal" data-target="#add-daterange"><i class="glyphicon glyphicon-plus"></i></button> 
								</div>
							</form>

						</div>
						
						
						
						
						
						<div class="scroll-indicator-container" id="scr4">
							<h4 class="aj-imp-sub-head scroll-ref">Additional Info <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h4>
							<form class="form-horizontal clearfix">

								<div class="form-group">
									<div class="col-sm-12">
										<h6 class="aj-imp-sub-head-thin">Taxes</h6>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-12"> 
										<p class="taxoptiontext"> <% if(!_.isUndefined(roomdata.taxoption)) {%><%=roomdata.taxoption %> <%}%> </p>
										<div class="taxoption_edit row hidden"> 
											<div class="col-sm-2">
												<label class="radio <%   if(!_.isUndefined(roomdata.taxoption)) { if(roomdata.taxoption==='With Tax'){ %>  checked  <% } }%>">
												  <input type="radio" name="tax_option1" class='tax__option' value="With Tax" data-toggle="radio" <%   if(!_.isUndefined(roomdata.taxoption)) { if(roomdata.taxoption==='With Tax'){ %> checked="checked" <% } }%> >
												  With Tax
												</label>
											</div>
											<div class="col-sm-2">
												<label class="radio <% if(!_.isUndefined(roomdata.taxoption)) { if(roomdata.taxoption==='Without Tax'){ %>  checked  <% } }%>">
												  <input type="radio" name="tax_option1" class='tax__option'  value="Without Tax" data-toggle="radio" <% if(!_.isUndefined(roomdata.taxoption)) { if(roomdata.taxoption==='Without Tax'){ %> checked="checked" <% } }%>>
												  Without Tax
												</label>
											</div>
										</div>
										<a class="edit-link edit-taxoption" href="javascript:void(0)"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
										<a class="delete-link delete-taxoption hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-trash"></span> Delete</a>
									</div>
								</div>

								<div class="form-group">
									<div class="col-sm-12">
									
									
									 
											<table class="table table-bordered table-striped 
											<%   if (  (roomdata.taxtypes.length<=0) || (_.isUndefined(roomdata.taxtypes.length))  ) { %>hidden<% } %>" id="tax_list">
													<thead>
														<th>Tax Name</th>
														<th>Tax Percentage</th>
														<th>Actions</th>
													</thead>
									
											<%  
											 if(roomdata.taxtypes.length>0){
											
											 		_.each(roomdata.taxtypes,function(taxtype,index){ 
													 
											%>
											
											
													<tbody id="blocktaxtype-<%=taxtype.id %>">
														<td  id="block_edittaxtype-<%= taxtype.id %>"><%= taxtype.name %></td>
														<td id="block_edittaxpercent-<%= taxtype.id %>" ><%= taxtype.percent %></td>
														<td>
															<a href="javascript:void(0)" class="edit-link edit-taxlink" taxtype-id="<%=taxtype.id %>" >
															<span class="glyphicon glyphicon-pencil"></span> Edit</a>
															<a href="javascript:void(0)" class="delete-link delete-taxlink"  taxtype-id="<%=taxtype.id %>" >
															<span class="glyphicon glyphicon-trash"></span> Delete</a>
														</td>
													</tbody>
														 	
														 
													
											<% 		}) 
											 	
												
											}%>
											</table>
									
									
									
									
									
									
									
									
										
												
										
									</div>
								</div>

								<div class="add-text">
									Add Tax <button type="button" class="btn add-btn btn-sm" data-toggle="modal" data-target="#add-tax"><i class="glyphicon glyphicon-plus"></i></button> 
								</div>

								<div class="form-group">
									<div class="col-sm-12">
										<h6 class="aj-imp-sub-head-thin">Add-Ons</h6>
									</div>
								</div>

								<div class="form-group">
									<div class="col-sm-12">
									
											<table class="table table-bordered table-striped  <%   if (  (roomdata.addontypes.length<=0) || (_.isUndefined(roomdata.addontypes.length))  ) { %>hidden<% } %>" id="addons_list">
														<thead>
															<th>Add-On</th>
															<th>Price</th>
															<th>Actions</th>
														</thead>
											<%  
											 if(roomdata.addontypes.length>0){
											
											 		_.each(roomdata.addontypes,function(addontype,index){ 
													 
											%>
											
														<tbody id="blockaddontype-<%=addontype.id %>">
															<td id="block_editaddontype-<%= addontype.id %>"><%= addontype.label %></td>
															<td id="block_editaddonprice-<%= addontype.id %>" ><%= addontype.price %></td>
															<td>
																<a href="javascript:void(0)" class="edit-link edit-addonlink" addontype-id="<%=addontype.id %>"   > <span class="glyphicon glyphicon-pencil"></span> Edit</a>
																<a href="javascript:void(0)" class="delete-link delete-addonlink" addontype-id="<%=addontype.id %>"><span class="glyphicon glyphicon-trash"></span> Delete</a>
															</td>
														</tbody>	
														 
													
											<% 		}) 
											 
											
											 	
												
												
											}%>
											</table>
									
									<!-- 
										<table class="table table-bordered table-striped">
											<thead>
												<th>Add-On</th>
												<th>Price</th>
												<th>Actions</th>
											</thead>
											<tbody>
												<td>Wind Surfing</td>
												<td>24.60</td>
												<td>
													<a href="#" class="edit-link"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
													<a href="#" class="delete-link"><span class="glyphicon glyphicon-trash"></span> Delete</a>
												</td>
											</tbody>	
										</table> -->
									</div>
								</div>

								<div class="add-text">
									Add Add-On <button type="button" class="btn add-btn btn-sm" data-toggle="modal" data-target="#add-addon" id="btn_add_addon"><i class="glyphicon glyphicon-plus"></i></button> 
								</div>

								<div class="form-group">
									<div class="col-sm-12">
										<span class="help-block">Feature your add-ons on your site.</span>
									</div>
								</div>

								<div class="form-group">
									<div class="col-sm-12">
										<h6 class="aj-imp-sub-head-thin">Check-in Time</h6>
									</div>
								</div>

								<div class="form-group">
									<div class="col-sm-12">
										<p class="checkinformat_text"> <% if(!_.isUndefined(roomdata.checkinformat)) {%> <%=roomdata.checkinformat %> <% } %></p>
										<div class="checkinformat_edit row hidden">
											<div class="col-sm-2">
												<label class="radio <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="12-hour Format") { %>  checked " <% } }%>">
												  <input type="radio" name="checkin_format" value="12-hour Format" data-toggle="radio" 
												  <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="12-hour Format") { %>  checked="checked" <% } }%>>
												  12-hour Format
												</label>
												<span class="help-block">eg. 12:01 AM</span>
											</div>
											<div class="col-sm-2">
												<label class="radio <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="24-hour Format") { %>  checked " <% } }%>">
												  <input type="radio" name="checkin_format" value="24-hour Format" data-toggle="radio" 
												  <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="24-hour Format") { %>  checked="checked" <% } }%>>
												  24-hour Format
												</label>
												<span class="help-block">eg: 0:01</span>
											</div>
										</div>
										<a class="edit-link edit-checkinformat" href="javascript:void(0)"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
										<a class="delete-link delete-checkinformat hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-trash"></span> Delete</a>
									</div>
								</div>
								
								
								<div class="form-group">
									<div class="col-sm-7">
										<p class="checkintime_text"><% if(!_.isUndefined(roomdata.checkintime)) {%><%=roomdata.checkintime %> <%}%></p>
										<div class="checkintime_edittext hidden">
											<input type='text' class="form-control" data-mask="99:99" name="checkin_time" id="checkin_time" value="<% if(!_.isUndefined(roomdata.checkintime)) {%><%=roomdata.checkintime %> <%}%>" >
										</div>
										<a class="edit-link edit-checkintime" href="javascript:void(0)"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
										<a class="delete-link delete-checkintime hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-trash"></span> Delete</a>
									</div>
								</div>
								<hr>
								

<!-- 							<div class="form-group">
									<label for="inputEmail3" class="col-sm-2 control-label">Time</label>
									<div class="col-sm-2 col-sm-offset-2">
										<input type='text' class="form-control" data-mask="99:99" name="checkin_time" id="checkin_time" value="<% if(!_.isUndefined(roomdata.checkintime)) {%><%=roomdata.checkintime %> <%}%>" >
									</div>
								</div>
 -->

<!-- 								
								<div class="form-group">
									<div class="col-sm-12">
										<h6 class="aj-imp-sub-head-thin">Add Policies</h6>
									</div>
								</div>


								<div class="form-group">
									<label for="inputSEO1" class="col-sm-2 control-label">Additional Policies</label>
									<div class="col-sm-10 col-sm-offset-2">
										<textarea class="form-control" rows="3" name="additional_policies"  id="additional_policies" placeholder="eg. All rates are per night rates."><% if(!_.isUndefined(roomdata.additionalpolicies)) {%><%=roomdata.additionalpolicies%> <%}%></textarea>
									</div>
								</div>
-->							
								
								
								
								
								<div class="form-group">
									<div class="col-sm-12">
										<h6 class="aj-imp-sub-head-thin">Additional Policies</h6>
									</div>
								</div>

								<div class="form-group">
									<div class="col-sm-12">
										<p class='addpoliciestext'><% if(!_.isUndefined(roomdata.additionalpolicies)) {%><%=roomdata.additionalpolicies%> <%}%></p>
										<div class="addpoliciestext_edit hidden">
											<textarea class="form-control" rows="3" name="additional_policies"  id="additional_policies" placeholder="eg. All rates are per night rates."><% if(!_.isUndefined(roomdata.additionalpolicies)) {%><%=roomdata.additionalpolicies%> <%}%></textarea>
										</div>
										<a class="edit-link edit-additional-policies" href="javascript:void(0)"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
										<a class="delete-link delete-additional-policies hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-trash"></span> Delete</a>
									</div>
								</div>
								
								
								
								
								
								
								
								
								
							</form>
						</div>
						
						
						<div class="aj-imp-long-form-actions" data-spy="affix" data-offset-top="200">
							<form class="form-horizontal clearfix">
								<div class="affix-show">You have unsaved changes!</div>
								<button type="button" class="btn btn-wide aj-imp-submit" id="btn_saveroom" name="btn_saveroom">Save Room</button>
								<img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30"  
													id="roomsave_loader" style="display:none"/>
							</form>
						</div>
					
					
					</div>					
				</div>
				
				
				
				
				













<!-- Add Tax Modal -->
	<div class="modal" id="add-tax">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close fui-cross" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Add Tax</h4>
				</div>

				<div class="modal-body">
					<form class="form-horizontal clearfix" name="form_add_tax"  id="form_add_tax">
						
						<div class="form-group dual">
							<div class="col-sm-6">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Tax Name</label>
									<div class="col-sm-8 col-sm-offset-5">
										<input type="text" class="form-control" id="taxname" name="taxname"  
										placeholder="Service Tax"  required parsley-trigger="blur" 
										parsley-validation-minlength="0">
										<div class="p-messages"></div>
									</div>
								</div>
							</div>

							<div class="col-sm-6">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Tax Percentage</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="taxpercent" name="taxpercent"  
										placeholder="12.5%" required parsley-trigger="blur" parsley-validation-minlength="0"  
										parsley-type="number" parsley-type-number-message="Please enter tax percentage">
										<div class="p-messages"></div>
									</div>
								</div>
							</div>
						</div>
						
					</form>
				</div>

				<div class="modal-footer">
					<button class="btn btn-default aj-imp-modal-save" id="btn_addtax"><i class="fui-plus"></i> Add Tax</button>
					<img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30"  
													id="newaddonsave_loader" style="display:none"/>
				</div>
			</div>
		</div>  
	</div>

	<!-- Add Add-on Modal -->
	<div class="modal" id="add-addon">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close fui-cross" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Add Add-Ons</h4>
				</div>

				<div class="modal-body">
					<form class="form-horizontal clearfix" name="form_add_addon"  id="form_add_addon" >
						
						<div class="form-group dual">
							<div class="col-sm-6">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Add-On</label>
									<div class="col-sm-8 col-sm-offset-5">
										<input type="text" class="form-control" id="addontype_name"  name='addontype_name'
										placeholder="Scuba Diving" required parsley-trigger="blur" parsley-validation-minlength="0">
										<div class="p-messages"></div>
									</div>
								</div>
							</div>

							<div class="col-sm-6">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Price</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="addontype_price"  name="addontype_price" placeholder="12.99"
										required parsley-trigger="blur" parsley-validation-minlength="0"  
										parsley-type="number" parsley-type-number-message="Please enter price" >
										<div class="p-messages"></div>
									</div>
								</div>
							</div>
						</div>
						<input type="hidden" name="hdn_addonlabel" id="hdn_addonlabel"  value=""/>
					</form>
				</div>

				<div class="modal-footer">
					
				<!-- 	<button class="btn btn-default aj-imp-modal-save"  id="btn_updateaddon"  name="btn_updateaddon"  ><i class="fui-plus"></i> Update Addon</button> -->
					<button class="btn btn-default aj-imp-modal-save"  id="btn_savenewaddon"  name="btn_savenewaddon"  ><i class="fui-plus"></i> Add Add-On</button>
					<img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30"  
													id="newaddonsave_loader" style="display:none"/>
				</div>
			</div>
		</div>  
	</div>
									
	<!-- Add Plan Modal -->
	<div class="modal wide-modal plan-modal" id="add-plantype">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close fui-cross" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Add Plan</h4>
				</div>

				<div class="modal-body">
					<form class="form-horizontal clearfix" name="form_addplan" id="form_addplan"  >
						<input type='hidden' name='hdn_daterange'  id='hdn_daterange' value=''  />  
						<div class="form-group">
							<label for="inputSocial2" class="col-sm-2 control-label">Plan Type</label>
							<div class="col-sm-9 col-sm-offset-2">
								<input type="text" class="form-control" id="plantype"  name="plantype"  placeholder="eg. American Plan">
							</div>
						</div>

						<div class="form-group">
							<label for="inputSEO1" class="col-sm-2 control-label">Plan Description</label>
							<div class="col-sm-9 col-sm-offset-2">
								<textarea class="form-control" rows="3" id="plandescription" name="plandescription" placeholder="eg. This Plan is inclusive of 3 meals a day."></textarea>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Tariff</label>
									<div class="col-sm-7 col-sm-offset-5">
										<label for="checkbox2" class="checkbox checked">
											<input type="checkbox" data-toggle="checkbox" checked="checked" id="rad_weekday" name="rad_weekday"  >
											Weekday
										</label>
										<span class="help-block">Monday to Friday</span>
										<input type="text" class="form-control" id="weekday_tariff" name="weekday_tariff" placeholder="420">
									</div>
								</div>
							</div>
							
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<label for="checkbox2" class="checkbox checked">
											<input type="checkbox" data-toggle="checkbox" checked="checked" id="rad_weekend"  name="rad_weekend">
											Weekend
										</label>
										<span class="help-block">Monday to Friday</span>
										<input type="text" class="form-control" id="weekend_tariff" name="weekend_tariff"  placeholder="999">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group">
							<div class="col-sm-10 col-sm-offset-2">
								<span class="help-block">Enter your tariff plan for the chosen category.<br>Entered rate will be the same as the currency on your site profile. Customers can view your tariff in the currency chosen by them on your website.</span>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Maximum Adults</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="weekday_maxadults" name="weekday_maxadults" placeholder="10">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="weekend_maxadults" name="weekend_maxadults"  placeholder="10">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Maximum Children</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="weekday_maxchildren" name="weekday_maxchildren"  placeholder="10">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="weekend_maxchildren" name="weekend_maxchildren"  placeholder="10">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Additional Charge per extra Adult</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="weekday_charges_extra_adult" name="weekday_charges_extra_adult"  placeholder="28">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="weekend_charges_extra_adult" name="weekend_charges_extra_adult"  placeholder="32">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Additional Charge per extra Child</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="weekday_charges_extra_child" name="weekday_charges_extra_child"  placeholder="17">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="weekend_charges_extra_child" name="weekend_charges_extra_child"  placeholder="19">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group">
							<div class="col-sm-10 col-sm-offset-2">
								<span class="help-block">The tariff is exclusive of additional charges.</span>
							</div>
						</div>
						
					</form>
				</div>

				<div class="modal-footer">
					<button class="btn btn-default aj-imp-modal-save" id="btn_addplan" ><i class="fui-plus"></i> Add Plan</button>
					<img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30"  
													id="newaddonsave_loader" style="display:none"/>
				</div>
			</div>
		</div>  
	</div>
	
	<!-- Edit Plan Modal -->
	<div class="modal wide-modal plan-modal" id="plan1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close fui-cross" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Edit Plan</h4>
				</div>

				<div class="modal-body">
					<form class="form-horizontal clearfix">

						<div class="form-group">
							<label for="inputSocial2" class="col-sm-2 control-label">Plan Type</label>
							<div class="col-sm-9 col-sm-offset-2">
								<input type="text" class="form-control" id="inputSocial2" placeholder="eg. American Plan">
							</div>
						</div>

						<div class="form-group">
							<label for="inputSEO1" class="col-sm-2 control-label">Plan Description</label>
							<div class="col-sm-9 col-sm-offset-2">
								<textarea class="form-control" rows="3" name="inputSEO1" placeholder="eg. This Plan is inclusive of 3 meals a day."></textarea>
							</div>
						</div>
						
						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Tariff</label>
									<div class="col-sm-7 col-sm-offset-5">
										<label for="checkbox2" class="checkbox checked">
											<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" >
											Weekday
										</label>
										<span class="help-block">Monday to Friday</span>
										<input type="text" class="form-control" id="inputAddress2" placeholder="420">
									</div>
								</div>
							</div>
							
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<label for="checkbox2" class="checkbox checked">
											<input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" >
											Weekend
										</label>
										<span class="help-block">Monday to Friday</span>
										<input type="text" class="form-control" id="inputAddress2" placeholder="999">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group">
							<div class="col-sm-10 col-sm-offset-2">
								<span class="help-block">Enter your tariff plan for the chosen category.<br>Entered rate will be the same as the currency on your site profile. Customers can view your tariff in the currency chosen by them on your website.</span>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Maximum Adults</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="inputAddress2" placeholder="10">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputAddress2" placeholder="10">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Maximum Children</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="inputAddress2" placeholder="10">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputAddress2" placeholder="10">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Additional Charge per extra Adult</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="inputAddress2" placeholder="28">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputAddress2" placeholder="32">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Additional Charge per extra Child</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control" id="inputAddress2" placeholder="17">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control" id="inputAddress2" placeholder="19">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group">
							<div class="col-sm-10 col-sm-offset-2">
								<span class="help-block">The tariff is exclusive of additional charges.</span>
							</div>
						</div>
						
					</form>
				</div>

				<div class="modal-footer">
					<button class="btn btn-default aj-imp-modal-save">Save Plan</button>
				</div>
			</div>
		</div>  
	</div>
	
	
	
	
	<!-- Add Date Range Modal -->
	<div class="modal" id="add-daterange">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close fui-cross" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">Add Date Range</h4>
				</div>

				<div class="modal-body">
					<form class="form-horizontal clearfix">
						
						<div class="form-group dual dates">
							<div class="col-sm-6">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-4 control-label">Start Date</label>
									<div class="col-sm-8 col-sm-offset-4">
										<div class="input-group">
											<input type="text" class="form-control dated" value="14 March, 2013" id="fromdaterange" />
											<span class="input-icon fui-calendar"></span>
										</div>
									</div>
								</div>
							</div>

							<div class="col-sm-6">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-4 control-label">End Date</label>
									<div class="col-sm-8 col-sm-offset-4">
										<div class="input-group">
											<input type="text" class="form-control dated" value="14 March, 2013" id="todaterange" />
											<span class="input-icon fui-calendar"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</form>
				</div>

				<div class="modal-footer">
					<button class="btn btn-default aj-imp-modal-save" id="btn_savedaterange" ><i class="fui-plus"></i> Add Date Range</button>
					<img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30"  
													id="newaddonsave_loader" style="display:none"/>
				</div>
			</div>
		</div>  
	</div>