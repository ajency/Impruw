<%
var roomModel; 
//roomModel = getAppInstance().roomCollection.get(215)
  
 
 
 if(!_.isUndefined(editroomdata)){
 
	//console.log('edit room template')
	//console.log(editroomdata.get('checkinformat'))
		var roomId 				= editroomdata.get('id')
	
	var roomCategory 		= editroomdata.get('roomType');
	var noOfRooms	 		= editroomdata.get('inventory');
	var roomDesc	 		= editroomdata.get('roomDesc');
	var selectedFacilities 	= editroomdata.get('facilities');
	var roomAttachments 	= editroomdata.get('roomAttachments')
	var minMaxTariff		= editroomdata.get('minmaxTariff');
	var datePlanTariff 		= editroomdata.get('daterangetariff');
	var roomFeaturedImg		= editroomdata.get('roomFeaturedImg');
	}
	
	 
	
	var datePlantariffIds;
	var cntPlanTariff = 0; 
	_.each(datePlanTariff,function(datePlanTariff, index){
	
	
 		if(cntPlanTariff>0){
 			datePlantariffIds+= ',' + datePlanTariff.daterangePlanTariffId;
 		}
 		else{
 			datePlantariffIds = datePlanTariff.daterangePlanTariffId;
 		}
 	  	
 		cntPlanTariff++

	})
	
	 
	
	
 //var facilities_selected_exists  = _.where(selectedFacilities, {id: "1"});
 
var datePlanTariffExists; 
var facilities_selected_exists;
 // facilities_selected_exists = _.find(selectedFacilities, function(num){ return num == 0; }); = _.find(selectedFacilities, function(num){ return num == 0; });
%>
				<header class="aj-imp-dash-header row">
					<div class="aj-imp-dash-title col-xs-12">
						<h2 class="aj-imp-page-head"><%= __('Add Room') %></h2>
					</div>
				</header>
	
				<div class="row">
					<div class="aj-imp-dash-content col-md-12">
					
						<div class="alert alert-success hidden" id="roomsave_status" name="roomsave_status" >
							<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
							<%= __('Your details have been successfully saved.') %>
						</div>
						<form class="form-horizontal clearfix" name="frm_addroom" id="frm_addroom" >
							 <input type='hidden' name='hdn_roomId'  id='hdn_roomId' value='<% if(!_.isUndefined(roomId)) { %><%=roomId%><% } %>' /> 	
								
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label"><%= __('Add Room Category') %></label>
								<div class="col-sm-10 col-sm-offset-2">
									<input type="text" class="form-control" id="roomcategory" name="roomcategory" 
									placeholder="eg. Executive Room" required parsley-trigger="blur" parsley-validation-minlength="0"
									parsely-required-message = "<%= __('Please enter room category') %>" 
									value="<%if(!_.isUndefined(roomCategory)) {%><%=roomCategory%><%}%>" />
									<div class="p-messages"></div>
								</div>
							</div>

							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label"><%= __('No. of Rooms') %></label>
								<div class="col-sm-10 col-sm-offset-2">
									<input type="numeric" class="form-control" name="roomnos" id="roomnos" placeholder="eg. 10" 
									required parsley-trigger="blur" parsley-validation-minlength="0" parsley-type="number"
									parsley-range="[1, 100]" parsel-required-message = "Please enter no of rooms"
									value="<%if(!_.isUndefined(noOfRooms)) {%><%=noOfRooms%><%}%>"  >
									<div class="p-messages"></div>
								</div>
							</div>

						</form><!-- End frm_addroom -->
						<div class="scroll-indicator-container" id="scr1">
							<h4 class="aj-imp-sub-head scroll-ref">Room Description <small>Give a brief description of your room category.</small></h4>
							<form class="form-horizontal clearfix" id="frm_roomdesc" name="frm_roomdesc" >
								
								<div class="form-group">
									<label for="inputSEO1" class="col-sm-2 control-label">Room Description</label>
									<div class="col-sm-10 col-sm-offset-2">
										  <textarea class="form-control" rows="2" name="inputSEO1" id="roomdescription" name="roomdescription"
										 placeholder="Room Description" required parsley-trigger="blur" 
										 parsley-validation-minlength="0" parsley-required-message="please enter room description"  ><%if(!_.isUndefined(noOfRooms)) {
										 %><%=roomDesc%><%}%></textarea>  
										<!-- <input type="text" class="form-control" id="roomdescription" name="roomdescription"
										 placeholder="Room Description" required parsley-trigger="blur" 
										 parsley-validation-minlength="0" parsley-required-message="please enter room description" > -->
										<div class="p-messages"></div>
									</div>
								</div>
								
							</form><!--  frm_roomdesc -->
						</div>
						
						<div class="scroll-indicator-container" id="scr2">
							<h4 class="aj-imp-sub-head scroll-ref">Images <small>Add attachment images to your room.</small></h4>
							<form class="form-horizontal clearfix" name="frm_images">
								
							 	
								<div class="form-group pic-upload">
									<label for="inputSEO1" class="col-sm-2 control-label">Featured image</label>
									<div class="col-sm-10 col-sm-offset-2">
		                            <div class="fileinput fileinput-new" data-provides="fileinput">
		                                <div class="fileinput-preview thumbnail room-featured-img <% if(_.isUndefined(roomFeaturedImg)){  %>hidden<% } else if(_.isNull(roomFeaturedImg.url)) {%> hidden<%} %>" data-trigger="fileinput" style="width: 120px; height: 120px;">
		                                	<a href="javascript:void(0)" class="btn btn-danger btn_del_featuredimg" attachment-id="" data-dismiss="fileinput" >&times;</a>
		                                	<img name="featured_image"  id="featured_image"   class="" src="<% if(!_.isUndefined(roomFeaturedImg)){ %><%=roomFeaturedImg.url%><% } %>" />		                                	
		                                </div>
		                                
		                                <input type="hidden" name="hdn_roomfeaturedimg"  id="hdn_roomfeaturedimg"  value='<% if(!_.isUndefined(roomFeaturedImg)){ %><%=roomFeaturedImg.id%><% } %>'   />
		                                <div>
		                                    <span class="btn btn-default btn-file"><span class="fileinput-new " id="select_featuredimg">Select image</span> <!-- <input type="file" name="inputFile3">--> </span>
		                                    
		                                </div>
		                            </div>
		                        </div>
								</div>
								
								
								<div class="form-group pic-upload">
									<label for="inputSEO1" class="col-sm-2 control-label">Attachments</label>
									<div class="col-sm-10 col-sm-offset-2">
			                            <div class="fileinput fileinput-new" data-provides="fileinput">
			                                <div class="fileinput-preview thumbnail room-attachment-img hidden" data-trigger="fileinput" style="width: 120px; height: 120px;">
			                                	<a href="javascript:void(0)" class="btn btn-danger btn_deleteAttachment" attachment-id="" data-dismiss="fileinput" >&times;</a>
			                                	<img name="business_logo"  id="businesslogo_img"   class="" src="" />		                                	
			                                </div>
			                                
			                                <% var rmAttachIds =  '';
			                                	var cnt_roomattachments = 0 ;
			                                 	_.each(roomAttachments,function(rmAttachment,index){
			                                     
			                                     	if(cnt_roomattachments>0)
			                                     		rmAttachIds+= ',';
			                                    	 rmAttachIds+=rmAttachment.attach_id;
			                                
					                                %>
					                                <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 120px; height: 120px;">
					                                	<a href="javascript:void(0)" class="btn btn-danger btn_deleteAttachment" attachment-id="<%=rmAttachment.attach_id%>" data-dismiss="fileinput" >&times;</a>
					                                	<img name="business_logo"  id="businesslogo_img"   class="" src="<%=rmAttachment.attach_url%>" />		                                	
					                                </div>
					                                <%
					                                
					                                cnt_roomattachments++;
					                            })
			                                %>
			                                <input type="hidden" name="hdn_roomattachments"  id="hdn_roomattachments" value="<%=rmAttachIds%>"  />
			                                <div>
			                                    <span class="btn btn-default btn-file"><span class="fileinput-new filepopup" id="select_businesslogo">Select image</span> <!-- <input type="file" name="inputFile3">--> </span>
			                                    
			                                </div>
			                            </div>
		                        	</div>
								</div>
								 
								
								
								
							</form><!--  end .frm_images -->
						</div>
						
						
						
						
						<div class="scroll-indicator-container" id="scr3">
							<h4 class="aj-imp-sub-head scroll-ref">Facilities <small>List the facilities available in this room.</small></h4>
							<form class="form-horizontal clearfix" name="form_addfacility" id="form_addfacility">
								<div class="alert alert-success hidden status_message"></div>
								<div class="form-group">
									<div class="col-sm-12">
										<div class="facilities-list clearfix">
										
										
												<%
												_.each(roomdata.facilities,function(facility,index){ 
												
												//check if facility is selected
												facilities_selected_exists  = _.find(selectedFacilities, function(fac){ return fac == facility.name; });
												  
												%>
												<div class="facility" id="facility-<%=facility.term_id %>">
													<label for="checkbox2" class="checkbox <% if(!_.isUndefined(facilities_selected_exists)){%>checked<% } %>">
														<input type="checkbox" data-toggle="checkbox" <% if(!_.isUndefined(facilities_selected_exists)){%>checked="checked"<% } %> name="facility[]"   value="<%=facility.name %>"   >
														<span id="facLabel-<%=facility.term_id %>" facililtyname="<%=facility.name %>"  ><%=facility.name %></span>
														<span class='hidden inputEditFacility' > 
															<!--  <form name='frm_editfacility' id='frmeditfacility-<%=facility.term_id %>'   > --> 
																<input type='text' class='form-control input-sm'  
																placeholder='Edit Facility' name='inputfacility-<%=facility.term_id %>' id='inputfacility-<%=facility.term_id %>' 
																parsley-validation-minlength='0'  
																value='<%=facility.name %>'   > 
														<!--  </form> -->
														</span>
														 
														
													</label>
													<div class="action">
														<a href="javascript:void(0)" class="edit"  term-id="<%=facility.term_id %>">Edit</a>&nbsp;<a href="javascript:void(0)" class="cancel_editfacility hidden"  term-id="<%=facility.term_id %>">Cancel</a>&nbsp;<a href="javascript:void(0)" class="delete" term-id="<%=facility.term_id %>">Delete</a>
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
						
						
						
						
						
						
						
						
						<div class="scroll-indicator-container" id="scr4">
							<h4 class="aj-imp-sub-head scroll-ref">Add Date Range <small>Add your peak season, off-season or create your own seasonal tariffs here.</small></h4>
							<form class="form-horizontal clearfix">
								<div class="alert alert-success hidden status_message"></div>

								<div class="form-table table-responsive">
								
								<input type="hidden" name="hdn_plantariffids"  id="hdn_plantariffids" class = "chk_plantariff"  value="<% if(!_.isUndefined(datePlantariffIds)){%><%=datePlantariffIds%><% } %>"   >
								
								
									<table class="table table-striped" id="tbl_daterangelist">
										<thead>
											<tr>
												<th width="5%"></th>
												<th width="30%">Date Range</th>
												<th width="35%">Tariff</th>
												<th width="30%">Actions</th>
											</tr>
										</thead>
										<tbody>
 										<% if(_.isUndefined(datePlantariffIds)){ %>
											<tr class="no-data">
												<td></td>
												<td>No Date Range Defined.</td>
												<td>No Date Range Defined.</td>
												<td>No Date Range Defined.</td>
											</tr>
										<% } %>
										 
										
										<% _.each(roomdata.dateranges,function(daterange,index){
										%>
										
										
										<tr>
												<td colspan="4" class="no-mar table-responsive">
												
												<!-- 	<table class="table table-vc" data-toggle="collapse" data-target="#rowlink<%=daterange.id%>"> -->
													<table class="table table-vc"  >
														<tbody data-link="row" class="rowlink">
															<tr>
																<td width="5%"><a href="#rowlink<%=daterange.id%>" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-down"></span></a></td>
																<td width="30%">
																	<span class="label label-info daterange_fromlabel">From:</span>
																	<span class="daterange_fromtxt" ><%=daterange.from%></span>
																	<span class="daterange_frominput hidden" >
																		<input type="text" class="form-control dated fromdaterange_input" value="<%=daterange.from_calendar%>"  /> 	
																	</span>   
																	<br class="hidden"> 
																	<span class="label label-info daterange_tolabel">To:</span> 
																	<span class="daterange_totxt" ><%=daterange.to%></span>
																	<span class="daterange_toinput hidden" >	
																		<input type="text" class="form-control dated todaterange_input" value="<%=daterange.to_calendar%>" id="todaterange" /> 
																	</span>
																</td>
																<td width="35%">
																	<span class="label label-info">Weekday:</span> from<strong><%if(!_.isUndefined(minMaxTariff)){ %>$<%=minMaxTariff.min_weekday%><% } else {%> - <% } %></strong> <span class="label label-info">Weekend:</span> from<strong><%if(!_.isUndefined(minMaxTariff)){ %>$<%=minMaxTariff.min_weekend%><% } else {%> - <% } %></strong>
																</td>
																<td width="30%" class="rowlink-skip">
																	<a href="javascript:void(0)" class="edit-link editdaterange_lnk"  daterange-id = "<%=daterange.id%>"  ><span class="glyphicon glyphicon-pencil"></span>Edit</a>
																	<a href="javascript:void(0)" class="edit-link canceleditdaterange_lnk hidden"  daterange-id = "<%=daterange.id%>"  ><span class="glyphicon glyphicon-ban-circle"></span>Cancel</a>
																	<a href="javascript:void(0)" class="delete-link deletedaterange_lnk"  daterange-id = "<%=daterange.id%>"  ><span class="glyphicon glyphicon-trash" daterange-id="<%=daterange.id%>" ></span> Delete</a>
																</td>
															</tr>
															
														</tbody>
													</table>
													<div id="rowlink<%=daterange.id%>" class="inner collapse">
														<div class="form-table table-responsive">
														
															<table class="table table-bordered table-hover daterangeplan-table" id="planlist_<%=daterange.id%>" daterange-id = "<%=daterange.id%>">
																<thead>
																	<tr>
																		<th>Plan Name</th>
																		<th>Plan Description</th>
																		<th>Weekday Tariff</th>
																		<th>Weekend Tariff</th>
																		<th>Actions</th>
																	</tr>
																</thead>
																
																<tbody data-link="row" class="rowlink">
																
																<% 
																datePlanTariffExists = '';
																
																_.each(daterange.plans,function(plan,plan_index){
																  
																  
																  //console.log(datePlanTariff)
																   datePlanTariffExists =  _.where(datePlanTariff, {planId: plan.plan_id, daterange_id: daterange.id});
																  
																  //console.log('checking datePlantariff exists')
																  
																  //console.log(datePlanTariffExists)
																  
																   if(!_.isEmpty(datePlanTariffExists)){
																   //console.log(datePlanTariffExists)
																  	//console.log('not empty'); 
																  	}
																%>
																 
																	<tr class="plan-row-<%=plan.plan_id %>" >
																		<td class="block-plan-name" >
																			
																			<a href="#plan1" data-toggle="modal"><%=plan.plan_name %></a>
																		</td>
																		<td class="block-plan-description">
																			<%=plan.plan_description %> 
																		</td>
																		<td class = "block-plan-weekday-tariff" >
																			 <%  if(!_.isEmpty(datePlanTariffExists)) {%>$<%=datePlanTariffExists[0].weekdayTariff%> <% }else { %> - <%} %>
																		</td>
																		<td class="block-plan-weekend-tariff" >
																			 <%  if(!_.isEmpty(datePlanTariffExists)) {%>$<%=datePlanTariffExists[0].weekEndTariff%> <% }else { %> - <%} %>
																		</td>
																		<td class="block-plan-tariff-action">
																			<a href="javascript:void(0)" class="edit-link editplan_link" planid="<%=plan.plan_id %>"    ><span class="glyphicon glyphicon-pencil"></span> Edit Plan</a>
																			<a href="javascript:void(0)" class="edit-link addtariff_link <%  if(!_.isEmpty(datePlanTariffExists)) {%>hidden<%} %>" planid="<%=plan.plan_id %>"    ><span class="glyphicon glyphicon-plus"></span> Add Tariff</a>
																			<a href="javascript:void(0)" class="edit-link edittariff-link <%  if(_.isEmpty(datePlanTariffExists)) {%>hidden<%} %>"  planid="<%=plan.plan_id %>"  <%  if(!_.isEmpty(datePlanTariffExists)) {%>date-range-plan-tariffid='<%=datePlanTariffExists[0].daterangePlanTariffId%>'<% } %>  ><span class="glyphicon glyphicon-pencil"></span> Edit Tariff</a>	
																			 
																		</td>
																	</tr>
																
																<%
																})%>
																
																<% if(daterange.plans.length<=0){
																%>
																<tr>
																		<td colspan="5">
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
														<!--  Add Another Plan <button type="button" daterange-id = '<%=daterange.id %>'  class="btn add-btn btn-sm btn_addplanmodal" data-toggle="modal" data-target="#add-plantype"><i class="glyphicon glyphicon-plus btn_addplanmodal"  daterange-id = '<%=daterange.id %>'></i></button> -->
														Add Another Plan <button type="button" daterange-id = '<%=daterange.id %>'  class="btn add-btn btn-sm btn_addplanmodal"><i class="glyphicon glyphicon-plus btn_addplanmodal"  daterange-id = '<%=daterange.id %>'></i></button>
														</div>
													</div>
												</td>
											</tr>
										<% }) %>
										
										 
											 
										</tbody>
									</table>
								</div>
								<div class="add-text">
									Add Date Range <button type="button" class="btn add-btn btn-sm" id="btn_add_daterange"  ><i class="glyphicon glyphicon-plus"></i></button> 
								</div>
							</form>

						</div>		
						
						
						
						
						
						
						
										
						
						
						
						
						<div class="scroll-indicator-container" id="scr5">
							<h4 class="aj-imp-sub-head scroll-ref">Additional Info <small>These details shall apply to all room categories, unless you want to edit them separately.</small></h4>
							<form class="form-horizontal clearfix">

								<div class="form-group">
									<div class="col-sm-12">
										<h6 class="aj-imp-sub-head-thin">Taxes</h6>
									</div>
								</div>
								<div class="form-group">
								<div class="alert alert-success status_message hidden"></div>
									<div class="col-sm-12"> 
										<div class="taxoptiontext">
											<% if(!_.isUndefined(roomdata.taxoption)) { if(!_.isEmpty(roomdata.taxoption.trim())) { %><p><%=roomdata.taxoption %></p> <% } else{%> <p class="alert">Please select Tax option</p> <%} }else {%> <p class="alert">Please select Tax option</p> <% } %> 
										</div>
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
										<a class="delete-link delete-taxoption hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-remove-circle"></span> Cancel</a>
									</div>
								</div>

								<div id="div_taxlist" class="form-group <%   if(!_.isUndefined(roomdata.taxoption)) { if(roomdata.taxoption!=='With Tax'){ %> hidden <% }  }%>">
								
									<div class="alert alert-success hidden status_message"></div>
									<div class="col-sm-12">
									
									
									 
											<table class="table table-bordered table-striped" id="tax_list">
													<thead>
														<th>Tax Name</th>
														<th>Tax Percentage</th>
														<th>Actions</th>
													</thead>

													<%   if (  (roomdata.taxtypes.length<=0) || (_.isUndefined(roomdata.taxtypes.length))  ) { %>
														<tr class="no-data">
															<td>No Taxes Set</td>
															<td>No Taxes Set</td>
															<td>No Taxes Set</td>
														</tr>
													<% } %>
									
											<%  
											 if(roomdata.taxtypes.length>0){
											
											 		_.each(roomdata.taxtypes,function(taxtype,index){ 
													 
											%>
											
											
													<tbody id="blocktaxtype-<%=taxtype.id %>">
														<td  id="block_edittaxtype-<%= taxtype.id %>">
															<span class='lbl_tax'><%= taxtype.name %></span>
															<div class='form-group hidden'> 
																<div class=''>
																	<input type='text' class='form-control' name='input_edittaxtype-<%=taxtype.id %>' id='input_edittaxtype-<%=taxtype.id %>' 
																			placeholder='Service Tax' required parsley-trigger='blur' parsley-validation-minlength='0'
																			parsley-required-message = 'Please enter tax type'   value='<%= taxtype.name %>'  />
																	<div class='p-messages'></div>
																</div>
															 </div>	 				
															
														
														</td>
														<td id="block_edittaxpercent-<%= taxtype.id %>" >
															<span class='lbl_tax'><%= taxtype.percent %></span>
															<div class='form-group hidden'>  
																<div class=''>
																	<input type='text' class='form-control' name='input_edittaxprice- <%=taxtype.id %>'  id='input_edittaxprice-<%=taxtype.id %>'   
																		placeholder='12.5%' required parsley-trigger='blur' parsley-validation-minlength='0' 
																		parsley-required-message = 'Please enter percentage'   value='<%= taxtype.percent %>'  /> 
																		<div class='p-messages'></div> 																
																</div>
															</div>
															 
														</td>
														<td>
															<a href="javascript:void(0)" class="edit-link edit-taxlink" taxtype-id="<%=taxtype.id %>" >
															<span class="glyphicon glyphicon-pencil"  taxtype-id="<%=taxtype.id %>" ></span> Edit</a>
															<a href="javascript:void(0)" class="edit-link cancel-taxlink hidden" taxtype-id="<%=taxtype.id %>" >
															<span class="glyphicon glyphicon-ban-circle"  taxtype-id="<%=taxtype.id %>" ></span> Cancel</a>
															<a href="javascript:void(0)" class="delete-link delete-taxlink"  taxtype-id="<%=taxtype.id %>" >
															<span class="glyphicon glyphicon-trash"  taxtype-id="<%=taxtype.id %>" ></span> Delete</a>
														</td>
													</tbody>
														 	
														 
													
											<% 		}) 
											 	
												
											}%>
											</table>
									
									
									
									
									
									
									
									
										
												
										
									</div>
								</div>

								<div id="div_addtax" class="add-text <%   if(!_.isUndefined(roomdata.taxoption)) { if(roomdata.taxoption!=='With Tax'){ %> hidden <% }  }%>">
									
									<!--  Add Tax <button type="button" class="btn add-btn btn-sm" data-toggle="modal" data-target="#add-tax"><i class="glyphicon glyphicon-plus"></i></button> -->
									Add Tax <button type="button" class="btn add-btn btn-sm add_tax_btn"><i class="glyphicon glyphicon-plus"></i></button>
									 
								</div>

								<div class="form-group">
									<div class="col-sm-12">
										<h6 class="aj-imp-sub-head-thin">Add-Ons</h6>
									</div>
								</div>

								<div class="form-group">
									<div class="alert alert-success hidden status_message"></div>
									<div class="col-sm-12">
									
											<table class="table table-bordered table-striped" id="addons_list">
														<thead>
															<th>Add-On</th>
															<th>Price</th>
															<th>Actions</th>
														</thead>

														<%   if (  (roomdata.addontypes.length<=0) || (_.isUndefined(roomdata.addontypes.length))  ) { %>
															<tr class="no-data">
																<td>No Add-ons Defined</td>
																<td>No Add-ons Defined</td>
																<td>No Add-ons Defined</td>
															</tr>
														<% } %>
											<%  
											 if(roomdata.addontypes.length>0){
											
											 		_.each(roomdata.addontypes,function(addontype,index){ 
													 
											%>
											
														<tbody id="blockaddontype-<%=addontype.id %>">
															<td id="block_editaddontype-<%= addontype.id %>">
													
																<span class="lbl_addon"><%= addontype.label %></span>
																<div class='form-group hidden'>  
														 			<div class=''>
																		<input type='text' class='form-control' name='input_editaddontype-<%=addontype.id %>' id='input_editaddontype-<%=addontype.id %>' 
																			placeholder='Scuba diving' required parsley-trigger='blur' parsley-validation-minlength='0'
																			parsley-required-message = 'Please enter addon type'    value='<%= addontype.label %>'  />
																			<div class='p-messages'></div>
																	</div>
																</div>
															
															
															</td>
															<td id="block_editaddonprice-<%= addontype.id %>" >
																	<span class="lbl_addon"><%= addontype.price %></span>
																	<div class='form-group hidden'> 
																		<div class=''>
																			<input type='text' class='form-control'  name='input_editaddonprice-<%=addontype.id %>'  id='input_editaddonprice-<%=addontype.id %>'
																			placeholder='12.99' required parsley-trigger='blur' parsley-validation-minlength='0' 
																			parsley-required-message = 'Please enter price'   value='<%= addontype.price %>'   /> 
																			<div class='p-messages'></div>
																		</div>
																	</div> 
																	
															
															
															
															</td>
															<td>
																<a href="javascript:void(0)" class="edit-link edit-addonlink" addontype-id="<%=addontype.id %>"   > 
																	<span class="glyphicon glyphicon-pencil"  addontype-id="<%=addontype.id %>"></span> Edit</a>
																<a href="javascript:void(0)" class="edit-link cancel-addonlink hidden" addontype-id="<%=addontype.id %>">
																	<span class="glyphicon glyphicon-ban-circle"  addontype-id="<%=addontype.id %>"></span> Cancel</a>
																<a href="javascript:void(0)" class="delete-link delete-addonlink" addontype-id="<%=addontype.id %>">
																	<span class="glyphicon glyphicon-trash"  addontype-id="<%=addontype.id %>"></span> Delete</a>
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
									Add Add-On <button type="button" class="btn add-btn btn-sm"  id="btn_add_addon"><i class="glyphicon glyphicon-plus"></i></button> 
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

								<div class="form-group checkin_span_block">
									<div class="alert alert-success hidden status_message"></div>
									<div class="col-sm-6">
										<div class="checkinformat_text"> 
											<% if(!_.isUndefined(roomdata.checkinformat)) { 
													if(!_.isEmpty(roomdata.checkinformat.trim())){ %>
														<p><%=roomdata.checkinformat %>-hour Format</p> <% 
													} 
													else{ %>
														<p class="alert">Please select Check-in time format</p><% 
													} 
												} 
											%>
										</div>
										<div class="checkinformat_edit row hidden">
											<div class="col-sm-6">
												<label class="radio <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="12") { %>  checked " <% } }%>">
												  <input type="radio" name="checkin_format" value="12" data-toggle="radio" 
												  <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="12") { %>  checked="checked" <% } }%>>
												  12-hour Format
												</label>
												<span class="help-block">eg. 12:01 AM</span>
											</div>
											<div class="col-sm-6">
												<label class="radio <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="24") { %>  checked " <% } }%>">
												  <input type="radio" name="checkin_format" value="24" data-toggle="radio" 
												  <% if(!_.isUndefined(roomdata.checkinformat)) { 
												  if(roomdata.checkinformat=="24") { %>  checked="checked" <% } }%>>
												  24-hour Format
												</label>
												<span class="help-block">eg: 0:01</span>
											</div>
										</div>
									<!-- 	<a class="edit-link edit-checkinformat" href="javascript:void(0)"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
										<a class="delete-link delete-checkinformat hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-trash"></span> Delete</a>
								    -->
									</div>
								</div>
								
								
								<div class="form-group">
									<div class="alert alert-success hidden status_message"></div>
									<div class="col-sm-6">
											<div class="checkintime_text">
											<% if(!_.isUndefined(roomdata.checkintime)) { 
											 		 if(_.isEmpty(roomdata.checkintime.trim()) ){ %>
												 	 	<p class="alert">Please enter checkin time.</p><% 
													 }
													 else { %>
													 	<p><%=roomdata.checkintime %></p>
												  <% } 
											   }
											%>
										    </div>
										<div class="checkintime_edittext hidden">
											<input type='text' class="form-control" data-mask="99:99" placeholder="09:00" name="checkin_time" id="checkin_time" value="<% if(!_.isUndefined(roomdata.checkintime)) {%><%=roomdata.checkintime %> <%}%>" >
										</div>
										<br>
										<a class="edit-link edit-checkintime" href="javascript:void(0)"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
										<a class="delete-link delete-checkintime hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-remove-circle"></span> Cancel</a>
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
									<div class="alert alert-success hidden status_message"></div>
									<div class="col-sm-12">
										<div class="addpoliciestext">
										<% if(!_.isUndefined(roomdata.additionalpolicies)){   
												if(_.isEmpty(roomdata.additionalpolicies.trim())){ %>
													<p class="alert">Add additional policies if any.</p><%} 
												else { %>
													<p><%=roomdata.additionalpolicies%></p> <% }
											}%>
										</div>
										<div class="addpoliciestext_edit hidden">
											<textarea class="form-control" rows="3" name="additional_policies"  id="additional_policies" placeholder="eg. All rates are per night rates."><%
												 if(!_.isUndefined(roomdata.additionalpolicies)) {
													%><%=roomdata.additionalpolicies.trim()
												%><% } 
											%></textarea>
										</div>
										<br>
										<a class="edit-link edit-additional-policies" href="javascript:void(0)"><span class="glyphicon glyphicon-pencil"></span> Edit</a>
										<a class="delete-link delete-additional-policies hidden" href="javascript:void(0)"><span class="glyphicon glyphicon-remove-circle"></span> Cancel</a>
									</div>
								</div>
								
								
								
								
								
								
								
								
								
							</form>
						</div>
						
						
						<div class="aj-imp-long-form-actions" data-spy="affix" data-offset-top="200">
							<form class="form-horizontal clearfix">
								<div class="affix-show">You have unsaved changes!</div>
								 <% if(!_.isUndefined(editroomdata)) {%>
									<button type="button" class="btn btn-wide aj-imp-submit" id="btn_updateroom" name="btn_updateroom">Update Room</button>
								<% }
								   else{								   
								%>	<button type="button" class="btn btn-wide aj-imp-submit" id="btn_saveroom" name="btn_saveroom">Save Room</button>
								<%	
								   }
								%>
								<img src ="<%=THEMEURL%>/images/loader-white.gif" width="38" height="30"  
													id="roomsave_loader" style="display:none"/>
							</form>
						</div>
					
					
					</div>					
				</div>
				
				
				
				
				









									
	<!-- Add Plan Modal -->
<!-- 	<div class="modal wide-modal plan-modal" id="add-plantype">
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
											<input type="checkbox" data-toggle="checkbox" class="chk_tariffdays" tariff-type='weekday' checked="checked" id="rad_weekday" name="rad_weekday"  >
											Weekday
										</label>
										<span class="help-block">Monday to Friday</span>
										<input type="text" class="form-control formel_weedaytariff" id="weekday_tariff" name="weekday_tariff" placeholder="420">
									</div>
								</div>
							</div>
							
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<label for="checkbox2" class="checkbox checked">
											<input type="checkbox" data-toggle="checkbox" class="chk_tariffdays" tariff-type='weekend'  checked="checked" id="rad_weekend"  name="rad_weekend">
											Weekend
										</label>
										<span class="help-block">Saturday to Sunday</span>
										<input type="text" class="form-control formel_weekendtariff" id="weekend_tariff" name="weekend_tariff"  placeholder="999">
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
										<input type="text" class="form-control formel_weedaytariff" id="weekday_maxadults" name="weekday_maxadults" placeholder="10">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control formel_weekendtariff" id="weekend_maxadults" name="weekend_maxadults"  placeholder="10">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Maximum Children</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control formel_weedaytariff" id="weekday_maxchildren" name="weekday_maxchildren"  placeholder="10">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control formel_weekendtariff" id="weekend_maxchildren" name="weekend_maxchildren"  placeholder="10">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Additional Charge per extra Adult</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control formel_weedaytariff" id="weekday_charges_extra_adult" name="weekday_charges_extra_adult"  placeholder="28">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control formel_weekendtariff" id="weekend_charges_extra_adult" name="weekend_charges_extra_adult"  placeholder="32">
									</div>
								</div>
							</div>
						</div>

						<div class="form-group dual">
							<div class="col-sm-5">
								<div class="form-group">
									<label for="inputAddress2" class="col-sm-5 control-label">Additional Charge per extra Child</label>
									<div class="col-sm-7 col-sm-offset-5">
										<input type="text" class="form-control formel_weedaytariff" id="weekday_charges_extra_child" name="weekday_charges_extra_child"  placeholder="17">
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<div class="col-sm-7">
										<input type="text" class="form-control formel_weekendtariff" id="weekend_charges_extra_child" name="weekend_charges_extra_child"  placeholder="19">
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
	-->
	
	<!-- Edit Plan Modal -->
<!-- 	<div class="modal wide-modal plan-modal" id="plan1">
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
	-->
	
	
	
	<!-- Add Date Range Modal
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
	</div> -->