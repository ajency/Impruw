 
<div class="modal-body">
	<form class="form-horizontal clearfix" name="form_edittariff"
		id="form_edittariff">
		<div class="alert alert-success hidden status_message"></div>
		<input type='hidden' name='hdn_daterangeId' id='hdn_daterangeId' value='' />
		<input type='hidden' name='hdn_planId' id='hdn_planId' value='' />
		<input type='hidden' name='hdn_dateplantariff' id='hdn_dateplantariff' value='' /> 
		<div class="form-group dual">
			<div class="col-sm-5">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-5 control-label">Tariff</label>
					<div class="col-sm-7 col-sm-offset-5">
						<label for="checkbox2" class="checkbox <% if(!_.isUndefined(datePlanTariff.weekday.tariff)){%>checked<%}%>"> <input 
							type="checkbox" data-toggle="checkbox" class="chk_tariffdays"
							tariff-type='weekday' <% if(!_.isUndefined(datePlanTariff.weekday.tariff)){%>checked="checked"d<%}%>  id="rad_weekday"
							name="rad_weekday"> Weekday </label> <span class="help-block">Monday
							to Friday</span> <input type="text"
							class="form-control formel_weedaytariff" id="weekday_tariff"
							name="weekday_tariff" placeholder="420" value="<% if(!_.isUndefined(datePlanTariff.weekday.tariff)){%><%=datePlanTariff.weekday.tariff%><%}%>">
					</div>
				</div>
			</div>

			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<label for="checkbox2" class="checkbox <% if(!_.isUndefined(datePlanTariff.weekend.tariff)){%>checked<%}%>"> <input 
							type="checkbox" data-toggle="checkbox" class="chk_tariffdays"
							tariff-type='weekend' <% if(!_.isUndefined(datePlanTariff.weekend.tariff)){%>checked="checked"<%}%>  id="rad_weekend"
							name="rad_weekend"> Weekend </label> <span class="help-block">Saturday
							to Sunday</span> <input type="text"
							class="form-control formel_weekendtariff" id="weekend_tariff"
							name="weekend_tariff" placeholder="999" value="<% if(!_.isUndefined(datePlanTariff.weekend.tariff)){%><%=datePlanTariff.weekend.tariff%><%}%>">
					</div>
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="col-sm-10 col-sm-offset-2">
				<span class="help-block">Enter your tariff plan for the chosen
					category.<br>Entered rate will be the same as the currency on your
					site profile. Customers can view your tariff in the currency chosen
					by them on your website.</span>
			</div>
		</div>

		<div class="form-group dual">
			<div class="col-sm-5">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-5 control-label">Maximum
						Adults</label>
					<div class="col-sm-7 col-sm-offset-5">
						<input type="text" class="form-control formel_weedaytariff"
							id="weekday_maxadults" name="weekday_maxadults" placeholder="10" 
							value='<% if(!_.isUndefined(datePlanTariff.weekday.tariff)){%><%=datePlanTariff.weekday.maxadults%><%}%>' >
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_maxadults" name="weekend_maxadults" placeholder="10" 
							value="<% if(!_.isUndefined(datePlanTariff.weekend.tariff)){%><%=datePlanTariff.weekend.maxadults%><%}%>">
					</div>
				</div>
			</div>
		</div>

		<div class="form-group dual">
			<div class="col-sm-5">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-5 control-label">Maximum
						Children</label>
					<div class="col-sm-7 col-sm-offset-5">
						<input type="text" class="form-control formel_weedaytariff"
							id="weekday_maxchildren" name="weekday_maxchildren"	placeholder="10"
							 value='<% if(!_.isUndefined(datePlanTariff.weekday.maxchildren)){%><%=datePlanTariff.weekday.maxchildren%><%}%>' >
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_maxchildren" name="weekend_maxchildren"  placeholder="10"
							value='<% if(!_.isUndefined(datePlanTariff.weekend.maxchildren)){%><%=datePlanTariff.weekend.maxchildren%><%}%>'>
					</div>
				</div>
			</div>
		</div>

		<div class="form-group dual">
			<div class="col-sm-5">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-5 control-label">Additional
						Charge per extra Adult</label>
					<div class="col-sm-7 col-sm-offset-5">
						<input type="text" class="form-control formel_weedaytariff"
							id="weekday_charges_extra_adult" name="weekday_charges_extra_adult" placeholder="28"
							value='<% if(!_.isUndefined(datePlanTariff.weekday.extra_adult_charges)){%><%=datePlanTariff.weekday.extra_adult_charges%><%}%>' >
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_charges_extra_adult" name="weekend_charges_extra_adult" placeholder="32"
							value='<% if(!_.isUndefined(datePlanTariff.weekend.extra_adult_charges)){%><%=datePlanTariff.weekend.extra_adult_charges%><%}%>' >
					</div>
				</div>
			</div>
		</div>

		<div class="form-group dual">
			<div class="col-sm-5">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-5 control-label">Additional
						Charge per extra Child</label>
					<div class="col-sm-7 col-sm-offset-5">
						<input type="text" class="form-control formel_weedaytariff"
							id="weekday_charges_extra_child" name="weekday_charges_extra_child" placeholder="17"
							value='<% if(!_.isUndefined(datePlanTariff.weekday.extra_child_charges)){%><%=datePlanTariff.weekday.extra_child_charges%><%}%>' />
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_charges_extra_child" name="weekend_charges_extra_child" placeholder="19"
							value='<% if(!_.isUndefined(datePlanTariff.weekend.extra_child_charges)){%><%=datePlanTariff.weekend.extra_child_charges%><%}%>'>
					</div>
				</div>
			</div>
		</div>

		<div class="form-group">
			<div class="col-sm-10 col-sm-offset-2">
				<span class="help-block">The tariff is exclusive of additional
					charges.</span>
			</div>
		</div>
	</form>
</div>


<div class="modal-footer">
	<button class="btn btn-default aj-imp-modal-save" id="btn_save_edittariff">
		<i class="fui-plus"></i> Edit Tariff
	</button>
	<img src="<%=THEMEURL%>/images/loader.gif" width="38" height="30"
	id="newaddonsave_loader" style="display:none"/>
</div>
