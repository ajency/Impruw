<div class="modal-body">
    <form class="form-horizontal clearfix" name="form_add_tax"  id="form_add_tax">
    <span class="alert alert-message status_message hidden"></span>
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
    <img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30"  id="newaddonsave_loader" style="display:none"/>
</div>