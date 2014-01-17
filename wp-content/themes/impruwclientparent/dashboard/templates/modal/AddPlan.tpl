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
					<div class="p-messages"></div>
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
					<div class="p-messages"></div>
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
