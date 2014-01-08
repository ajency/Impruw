<div class="modal-body">
	<form class="form-horizontal clearfix">

		<div class="form-group dual dates">
			<div class="col-sm-6">
				<div class="form-group">
					<label for="inputAddress2" class="col-sm-4 control-label">Start
						Date</label>
					<div class="col-sm-8 col-sm-offset-4">
						<div class="input-group">
							<input type="text" class="form-control dated"
								value="14 March, 2013" id="fromdaterange" /> <span
								class="input-icon fui-calendar"></span>
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
								value="14 March, 2013" id="todaterange" /> <span
								class="input-icon fui-calendar"></span>
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
