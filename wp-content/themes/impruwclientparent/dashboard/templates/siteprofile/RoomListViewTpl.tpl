<% console.log(roomdata) %>
<header class="aj-imp-dash-header row">
<div class="aj-imp-dash-title col-xs-8">
	<h2 class="aj-imp-page-head">Room List View</h2>
</div>
<div class="aj-imp-dash-actions col-xs-4">
	<a href="#" class="btn btn-embossed btn-wide"><span
		class="glyphicon glyphicon-cog"></span> Settings</a>
</div>
</header>
<div class="row">
	<div class="aj-imp-dash-content col-md-12">
		<div class="table-responsive">
			<table class="table table-bordered table-striped room-list">
				<thead>
					<th class="one">Room Details</th>
					<th class="two">Tariff</th>
					<th class="three">Actions</th>
				</thead>
				<tbody>
				
				<%  if(!_.isUndefined(roomdata)) {				

                                _.each(roomdata,function(roomDetails,index){
                                %>  
									<tr>
										<td>
											<div class="room-details">
												<h4><%=roomDetails.roomType%></h4>
												<p class="desc">Watch the shimmering spectacle of stars from
													your own private terrace or patio. The Executive Room features
													a Master King size bedroom, soft plump pillows, mattress and a
													light as air duvet. Separater living room designed for
													lounging, chic light fixtures, deep comfortable couch and
													beautifully crafted furnishings.</p>
												<div class="row info-strip">
													<div class="col-md-4 strip">
														<span>5</span> Rooms
													</div>
													<div class="col-md-4 strip">
														<span>12</span> Hour Format
													</div>
													<div class="col-md-4 strip">
														<span>10:45pm</span> Time
													</div>
												</div>
											</div>
										</td>
										<td>
											<div class="tariff">
												<div class="row tariff-plan">
													<div class="col-sm-6 plan">
														<h6>American Plan</h6>
														10/12/2013 to 30/03/2014
													</div>
													<div class="col-sm-3 weekday">
														Weekday
														<div class="price">$120</div>
													</div>
													<div class="col-sm-3 weekend">
														Weekend
														<div class="price">$150</div>
													</div>
												</div>
												<div class="row tariff-plan">
													<div class="col-sm-6 plan">
														<h6>American Plan</h6>
														10/12/2013 to 30/03/2014
													</div>
													<div class="col-sm-3 weekday">
														Weekday
														<div class="price">$120</div>
													</div>
													<div class="col-sm-3 weekend">
														Weekend
														<div class="price">$150</div>
													</div>
												</div>
												<div class="view-all">
													<a href="#">View All</a>
												</div>
											</div>
										</td>
										<td class="actions"><a href="#" class="btn btn-xs"><span
												class="glyphicon glyphicon-pencil"></span> Edit</a> <a href="#"
											class="btn btn-danger btn-xs"><span
												class="glyphicon glyphicon-trash"></span> Delete</a>
										</td>
									</tr>
									
							<%
								})
							 }
							%>
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
									
					<tr>
						<td>
							<div class="room-details">
								<h4>Executive Room</h4>
								<p class="desc">Watch the shimmering spectacle of stars from
									your own private terrace or patio. The Executive Room features
									a Master King size bedroom, soft plump pillows, mattress and a
									light as air duvet. Separater living room designed for
									lounging, chic light fixtures, deep comfortable couch and
									beautifully crafted furnishings.</p>
								<div class="row info-strip">
									<div class="col-md-4 strip">
										<span>5</span> Rooms
									</div>
									<div class="col-md-4 strip">
										<span>12</span> Hour Format
									</div>
									<div class="col-md-4 strip">
										<span>10:45pm</span> Time
									</div>
								</div>
							</div>
						</td>
						<td>
							<div class="tariff">
								<div class="row tariff-plan">
									<div class="col-sm-6 plan">
										<h6>American Plan</h6>
										10/12/2013 to 30/03/2014
									</div>
									<div class="col-sm-3 weekday">
										Weekday
										<div class="price">$120</div>
									</div>
									<div class="col-sm-3 weekend">
										Weekend
										<div class="price">$150</div>
									</div>
								</div>
								<div class="row tariff-plan">
									<div class="col-sm-6 plan">
										<h6>American Plan</h6>
										10/12/2013 to 30/03/2014
									</div>
									<div class="col-sm-3 weekday">
										Weekday
										<div class="price">$120</div>
									</div>
									<div class="col-sm-3 weekend">
										Weekend
										<div class="price">$150</div>
									</div>
								</div>
								<div class="view-all">
									<a href="#">View All</a>
								</div>
							</div>
						</td>
						<td class="actions"><a href="#" class="btn btn-xs"><span
								class="glyphicon glyphicon-pencil"></span> Edit</a> <a href="#"
							class="btn btn-danger btn-xs"><span
								class="glyphicon glyphicon-trash"></span> Delete</a>
						</td>
					</tr>
					<tr>
						<td>
							<div class="room-details">
								<h4>Executive Room</h4>
								<p class="desc">Watch the shimmering spectacle of stars from
									your own private terrace or patio. The Executive Room features
									a Master King size bedroom, soft plump pillows, mattress and a
									light as air duvet. Separater living room designed for
									lounging, chic light fixtures, deep comfortable couch and
									beautifully crafted furnishings.</p>
								<div class="row info-strip">
									<div class="col-md-4 strip">
										<span>5</span> Rooms
									</div>
									<div class="col-md-4 strip">
										<span>12</span> Hour Format
									</div>
									<div class="col-md-4 strip">
										<span>10:45pm</span> Time
									</div>
								</div>
							</div>
						</td>
						<td>
							<div class="tariff">
								<div class="row tariff-plan">
									<div class="col-sm-6 plan">
										<h6>American Plan</h6>
										10/12/2013 to 30/03/2014
									</div>
									<div class="col-sm-3 weekday">
										Weekday
										<div class="price">$120</div>
									</div>
									<div class="col-sm-3 weekend">
										Weekend
										<div class="price">$150</div>
									</div>
								</div>
								<div class="row tariff-plan">
									<div class="col-sm-6 plan">
										<h6>American Plan</h6>
										10/12/2013 to 30/03/2014
									</div>
									<div class="col-sm-3 weekday">
										Weekday
										<div class="price">$120</div>
									</div>
									<div class="col-sm-3 weekend">
										Weekend
										<div class="price">$150</div>
									</div>
								</div>
								<div class="view-all">
									<a href="#">View All</a>
								</div>
							</div>
						</td>
						<td class="actions"><a href="#" class="btn btn-xs"><span
								class="glyphicon glyphicon-pencil"></span> Edit</a> <a href="#"
							class="btn btn-danger btn-xs"><span
								class="glyphicon glyphicon-trash"></span> Delete</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
