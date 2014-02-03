<div class="modal-body">
	<form class="form-horizontal clearfix" name="form_daterange" id="form_daterange">
	<div class="alert alert-message status_message hidden"></div>
	
	
		<div class="form-group">
			<label for="inputSocial2" class="col-sm-2 control-label">Date Range Label</label>
			<div class="col-sm-9 col-sm-offset-2">
				<input type="text" class="form-control" id="daterange_label"
					name="daterange_label" placeholder="eg. Summer season" required parsley-trigger="blur" parsley-validation-minlength="0"
					parsely-required-message = "Please enter daterange label">
					<div class="p-messages"></div>
			</div>
		</div>
	
		<div class="form-group dual dates">
			<div class="col-sm-6">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-4 control-label">Start Date</label>
					<div class="col-sm-8 col-sm-offset-4">
						<div class="input-group">
							<input type="text" class="form-control dated"
								value="14 March, 2014" id="fromdaterange" 
								required parsley-trigger="blur" 
								parsley-validation-minlength="0"/> 
								<span class="input-icon fui-calendar" ></span>
						</div>
					</div>
				</div>
			</div>

			<div class="col-sm-6">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-4 control-label">End Date</label>
					<div class="col-sm-8 col-sm-offset-4">
						<div class="input-group">
							<input type="text" class="form-control dated"
								value="14 April, 2014" id="todaterange" 
								required parsley-trigger="blur" 
								parsley-validation-minlength="0"/> 
								<span class="input-icon fui-calendar"></span>
						</div>
					</div>
				</div>
			</div>
		</div>

	</form>
</div>

<div class="modal-footer">
	<button class="btn btn-default aj-imp-modal-save"
		id="btn_savedaterange">
		<i class="fui-plus"></i> Add Date Range
	</button>
	<img src="<%=THEMEURL%>/images/loader.gif" width="38" height="30"
	id="newaddonsave_loader" style="display:none"/>
</div>
