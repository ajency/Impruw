<div class="modal-body">
	<form class="form-horizontal clearfix" name="form_addplan"
		id="form_addplan">
		<div class="alert alert-success hidden status_message"></div>
		<input type='hidden' name='hdn_daterange' id='hdn_daterange' value='' />
		<div class="form-group">
			<label for="inputSocial2" class="col-sm-2 control-label">Plan Type</label>
			<div class="col-sm-9 col-sm-offset-2">
				<input type="text" class="form-control" id="plantype"
					name="plantype" placeholder="eg. American Plan" required parsley-trigger="blur" parsley-validation-minlength="0"
					parsely-required-message = "Please enter plan type">
			</div>
		</div>

		<div class="form-group">
			<label for="inputSEO1" class="col-sm-2 control-label">Plan
				Description</label>
			<div class="col-sm-9 col-sm-offset-2">
				<textarea class="form-control" rows="3" id="plandescription"
					name="plandescription"
					placeholder="eg. This Plan is inclusive of 3 meals a day."
					required parsley-trigger="blur" parsley-validation-minlength="0"
					parsely-required-message = "Please enter plan description" ></textarea>
			</div>
		</div>

		<div class="form-group dual">
			<div class="col-sm-5">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-5 control-label">Tariff</label>
					<div class="col-sm-7 col-sm-offset-5">
						<label for="checkbox2" class="checkbox checked"> <input
							type="checkbox" data-toggle="checkbox" class="chk_tariffdays"
							tariff-type='weekday' checked="checked" id="rad_weekday"
							name="rad_weekday"> Weekday </label> <span class="help-block">Monday
							to Friday</span> <input type="text"
							class="form-control formel_weedaytariff" id="weekday_tariff"
							name="weekday_tariff" placeholder="420">
					</div>
				</div>
			</div>

			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<label for="checkbox2" class="checkbox checked"> <input
							type="checkbox" data-toggle="checkbox" class="chk_tariffdays"
							tariff-type='weekend' checked="checked" id="rad_weekend"
							name="rad_weekend"> Weekend </label> <span class="help-block">Saturday
							to Sunday</span> <input type="text"
							class="form-control formel_weekendtariff" id="weekend_tariff"
							name="weekend_tariff" placeholder="999">
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
							id="weekday_maxadults" name="weekday_maxadults" placeholder="10">
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_maxadults" name="weekend_maxadults" placeholder="10">
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
							id="weekday_maxchildren" name="weekday_maxchildren"
							placeholder="10">
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_maxchildren" name="weekend_maxchildren"
							placeholder="10">
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
							id="weekday_charges_extra_adult"
							name="weekday_charges_extra_adult" placeholder="28">
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_charges_extra_adult"
							name="weekend_charges_extra_adult" placeholder="32">
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
							id="weekday_charges_extra_child"
							name="weekday_charges_extra_child" placeholder="17">
					</div>
				</div>
			</div>
			<div class="col-sm-5">
				<div class="form-group">
					<div class="col-sm-7">
						<input type="text" class="form-control formel_weekendtariff"
							id="weekend_charges_extra_child"
							name="weekend_charges_extra_child" placeholder="19">
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
	<button class="btn btn-default aj-imp-modal-save" id="btn_addplan">
		<i class="fui-plus"></i> Add Plan
	</button>
	<img src="<%=THEMEURL%>/images/loader.gif" width="38" height="30"
	id="newaddonsave_loader" style="display:none"/>
</div>
