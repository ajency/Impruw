<header class="aj-imp-dash-header row">
    <div class="aj-imp-dash-title col-xs-12">
        <h2 class="aj-imp-page-head">My Site Profile</h2>
    </div>
</header>
<div class="row">
    <div class="aj-imp-dash-content col-md-12">
        <form class="form-horizontal clearfix" name="form-siteprofile" id="form-siteprofile">
            <div class="scroll-indicator-container" id="scr1">
                <h4 class="aj-imp-sub-head scroll-ref">General Settings</h4>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">Site Name</label>
                        <div class="col-sm-10 col-sm-offset-2">
                            <div class="input-group">
                                <input type="text" class="form-control" id="sitename" disabled="disabled" name="siteName" value="" >
                                <span class="input-group-addon">.impruw.com</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </form>
        <div class="aj-imp-long-form-actions" data-spy="affix">
            <form class="form-horizontal">
                <div class="affix-show">You have unsaved changes!</div>
                <button type="button" id="btn_savesitedetails"  name="btn_savesitedetails" class="btn btn-wide aj-imp-submit">Save</button>
                <img src ='{{THEMEURL}}/images/loader.gif' width="38" height="30"  id="siteprofilesubmitm_loader" style="display:none"/>
            </form>
        </div>
    </div>
</div>




