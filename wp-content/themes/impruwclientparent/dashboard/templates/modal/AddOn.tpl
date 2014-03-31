<div class="modal-body">
    <form class="form-horizontal clearfix" name="form_add_addon"  id="form_add_addon" >
    <div class="alert alert-success hidden status_message"></div>
	<div class="form-group dual">
        <div class="col-sm-6">
            <div class="form-group">
                <label for="inputAddress2" class="col-sm-4 control-label">Add-On</label>
                <div class="col-sm-8 col-sm-offset-4">
                    <input type="text" class="form-control" id="addontype_name"  name='addontype_name'
                    placeholder="Scuba Diving" required parsley-trigger="blur" parsley-validation-minlength="0">
                          <div class="p-messages"></div>
                </div>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="form-group">
                <label for="inputAddress2" class="col-sm-4 control-label">Price</label>
                <div class="col-sm-7 col-sm-offset-4">
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
    <button class="btn btn-default aj-imp-modal-save"  id="btn_savenewaddon"  name="btn_savenewaddon"  ><i class="fui-plus"></i> Add Add-On</button>
    <img src ="<%=THEMEURL%>/images/loader.gif" width="38" height="30" id="newaddonsave_loader" style="display:none"/>
</div>