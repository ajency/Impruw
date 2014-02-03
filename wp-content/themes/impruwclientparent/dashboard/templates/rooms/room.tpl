<tr id="row_room_<%=room.get('id')    %>">
	<td>
		<div class="room-details">
			<h4><%=room.get('roomType')%></h4>
			<p class="desc"><%= _(room.get('roomDesc')).prune(150) %> </p>
			<div class="row info-strip">
				<div class="col-md-4 strip divNoRooms">
					<span><%=room.get('inventory')    %></span> Rooms
				</div>
				<div class="col-md-4 strip divHourFormat">
					<span><%=room.get('checkinformat')    %></span> Hour Format
				</div>
				<div class="col-md-4 strip divCheckinTime">
					<span><%=room.get('checkintime')    %></span> Time
				</div>
			</div>
		</div>
	</td>
	<td><% //console.log(room.get('daterangetariff'))    %>
		<div class="tariff">
		
		<%
		var count_roomtariff = 0;
		
		 _.each(room.get('daterangetariff'),function(dateRangeTariff,index){
		   
		 //console.log(dateRangeTariff.planId)
		 if(count_roomtariff<=1) 
		 %>
		 <div class="row tariff-plan">
				<div class="col-sm-6 plan">
					<h6><%=dateRangeTariff.planName%></h6>
					<%=dateRangeTariff.fromDate%> to <%=dateRangeTariff.toDate%>
				</div>
				<div class="col-sm-3 weekday">
					Weekday
					<div class="price">$<%=dateRangeTariff.weekdayTariff%></div>
				</div>
				<div class="col-sm-3 weekend">
					Weekend
					<div class="price">$<%=dateRangeTariff.weekEndTariff%></div>
				</div>
			</div>
		 <% 
		 count_roomtariff++;
		  }) %>
		 
			
			<div class="view-all">
			<% 
			 
			if(!_.isEmpty(room.get('daterangetariff'))){
			%>	<a href="#">View All</a>
			<%
			}
			else{
			%> <span class="no-data">No Tariff added yet. Please add a tariff plan.</span>
			<%
			}
			%>
			</div>
			
		</div>
	</td>
	<td class="actions">
		<a href="#edit-room/<%=room.get('id') %>" class="btn btn-xs editroom_link">
		<span class="glyphicon glyphicon-pencil"></span> Edit</a> 
		<a href="javascript:void(0)" class="btn btn-danger btn-xs deleteroom_link" room-id='<%=room.get('id') %>' >
		<span class="glyphicon glyphicon-trash"></span> Delete</a>
	</td>
</tr>