<header class="aj-imp-dash-header row">
    <div class="aj-imp-dash-title col-xs-8">
        <h2 class="aj-imp-page-head">My Site Profile</h2>
    </div>
    <div class="aj-imp-dash-actions col-xs-4">
        <a href="#" class="btn btn-embossed btn-wide"><span class="glyphicon glyphicon-cog"></span> Settings</a>
    </div>
</header>
<div class="row">
    <div class="aj-imp-dash-content col-md-12">
        <div class="alert alert-success hidden" id="siteprofilesave_status">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            Your details have been successfully saved.
        </div>
        <div class="scroll-indicator-container" id="scr1">
            <h4 class="aj-imp-sub-head scroll-ref">General Settings</h4>
            <form class="form-horizontal clearfix" name="form-siteprofile-general" id="form-siteprofile-general">
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Site Name</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <div class="input-group">
                            <input type="text" class="form-control" id="sitename" disabled="disabled" name="sitename" placeholder="<%= site.getGeneralDetails('siteName') %>" value="<%= site.getGeneralDetails('siteName') %>" >
                            <span class="input-group-addon">.impruw.com</span>
                        </div>
                    </div>
                </div>
                <div class="form-group pic-upload">
                    <label for="inputFile3" class="col-sm-2 control-label">Upload your Logo</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <div class="fileinput fileinput-new" data-provides="fileinput">
                            <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 300px; height: 100px;"><img name="business_logo"  id="businesslogo_img"   class="<% if(site.getGeneralDetails('businessLogoUrl')=='') { %>hidden<% } %>" src="<%= site.getGeneralDetails('businessLogoUrl') %>" /><input type="hidden" name="hdn_businesslogo_id" id="hdn_businesslogo_id" value="<%= site.getGeneralDetails('businessLogoId') %>" /></div>
                            <div>
                                <span class="btn btn-default btn-file"><span class="fileinput-new filepopup<% if(site.getGeneralDetails('businessLogoUrl')!='') { %> fileinput-exists<% } %>" id="select_businesslogo">Select image</span><span class="<% if(site.getGeneralDetails('businessLogoUrl')=='') { %>fileinput-exists<% } %> filepopup" id="change_businesslogo">Change</span><!-- <input type="file" name="inputFile3">--> </span>
                                <a href="#" class="btn btn-danger <% if(site.getGeneralDetails('businessLogoUrl')=='') { %>fileinput-exists<% } %>" data-dismiss="fileinput" id="remove_businesslogo" >Remove</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group pic-upload">
                    <label for="inputFile4" class="col-sm-2 control-label">Upload Favicon <br><small>of size 16 X 16 pixels</small></label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <div class="fileinput fileinput-new" data-provides="fileinput">
                            <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 300px; height: 100px;"></div>
                            <div>
                                <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="inputFile4"></span>
                                <a href="#" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
        <div class="scroll-indicator-container" id="scr2">
            <h4 class="aj-imp-sub-head scroll-ref">Business Details <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h4>
            <form class="form-horizontal clearfix" name="form-siteprofile-business" id="form-siteprofile-business" >

                <div class="form-group">
                    <label for="inputAddress1" class="col-sm-2 control-label">Street</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <input type="text" class="form-control" id="street" name="street" placeholder="21 Jump Street" 
                               value="<%= site.getBusinessDetails('street')   %>" required  parsley-trigger="blur" parsley-validation-minlength="0" /> 
                        <div class="p-messages"></div>

                    </div>
                </div>

















                <div class="form-group dual">
                    <div class="col-sm-5">
                        <div class="form-group">
                            <label for="inputAddress2" class="col-sm-5 control-label">Postal Code</label>
                            <div class="col-sm-7 col-sm-offset-5">
                                <input type="text" class="form-control" id="postalcode" name="postalcode"  
                                       data-mask="999-999" placeholder="420-001" value="<%= site.getBusinessDetails('postalcode') %>" 
                                       required parsley-trigger="blur" parsley-validation-minlength="0"  parsley-type="number" parsley-type-number-message="Please enter valid postal code" />
                                <div class="p-messages"></div>

                            </div>
                        </div>
                    </div>

                    <div class="col-sm-5">
                        <div class="form-group">
                            <label for="inputAddress3" class="col-sm-5 control-label">City / Town</label>
                            <div class="col-sm-7 col-sm-offset-5">
                                <input type="text" class="form-control"  id="city" name="city"  placeholder="Gotham City"
                                       value="<%= site.getBusinessDetails('city') %>" required parsley-trigger="blur"  
                                       parsley-validation-minlength="0" >
                                <div class="p-messages"></div>
                            </div>
                        </div>
                    </div>
                </div>














                <div class="form-group">
                    <label for="inputAddress4" class="col-sm-2 control-label dd-label">Country</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <select name="country" id="country" required parsley-trigger="blur" >
                            <option value="Norway" <% if(site.getBusinessDetails('country')=='Norway') { %> selected  <% } %>>Norway</option>
                            <option value="Sweden" <% if(site.getBusinessDetails('country')=='Sweden') { %> selected  <% } %>>Sweden</option>
                            <option value="Denmark" <% if(site.getBusinessDetails('country')=='Denmark') { %> selected  <% } %>>Denmark</option>
                        </select>
                        <div class="p-messages"></div>
                    </div>
                </div>


                <div class="form-group dual">
                    <div class="col-sm-5">
                        <div class="form-group  add-another">
                            <label for="inputEmail1" class="col-sm-5 control-label">Email</label>
                            <div class="col-sm-7 col-sm-offset-5">

                                <%   if(site.getSiteProfileEmails().length>0) {  

                                _.each(site.getSiteProfileEmails(), function(email, index) { %>

                                <span class="div_email" >
                                    <div>
                                        <input type="email" class="form-control"   name="email[]"    value="<%= email %>"  
                                               parsley-required="true" parsley-trigger="blur" parsley-validation-minlength="0"  
                                               parsley-type="email" parsley-required-message="Please enter email Id" parsley-group="myemails">  
                                        <div class="p-messages"></div>
                                        <span class="del_email <%= (index <= 0 ) ? 'hidden' : '' %>" ><span class="fui-cross"></span> Delete</span> 
                                    </div>
                                </span>

                                <% });
                                }
                                else{
                                %>
                                <span class="div_email" >
                                    <input type="email" class="form-control"   name="email[]"  value=""
                                           parsley-required="true" parsley-trigger="blur" parsley-validation-minlength="0"  
                                           parsley-type="email" parsley-required-message="Please enter email Id"  parsley-group="myemails" />
                                    <div class="p-messages"></div>  
                                    <span class="del_email hidden"><span class="fui-cross"></span> Delete</span> 
                                </span>
                                <%
                                }

                                %>


                                <span class="help-block add-another-link"><a href="#" id="add_another_email"><span class="glyphicon glyphicon-plus-sign"></span> Add Another</a></span>
                            </div>
                        </div>
                    </div>								

                    <div class="col-sm-5">
                        <div class="form-group  add-another">
                            <label for="inputPhone1" class="col-sm-5 control-label">Phone</label>
                            <div class="col-sm-7 col-sm-offset-5">
                                <% if(site.getSiteProfilePhoneNos().length>0){

                                _.each(site.getSiteProfilePhoneNos(),function(phone,index){
                                %>  
                                <span class="div_phone" >
                                    <div>
                                        <input type="text" class="form-control"   name="phone[]" data-mask="99-999-999"  
                                               value="<%= phone %>" parsley-required="true" parsley-trigger="blur" 
                                               parsley-validation-minlength="0" parsley-required-message="Please enter phone no"
                                               parsley-group="myphones" parsley-rangelength="[10,10]"
                                               parsley-type="number" parsley-type-number-message="Please enter valid phone no" /> 
                                        <div class="p-messages"></div>  
                                        <span class="del_phone <%= (index <= 0 ) ? 'hidden' : '' %>" ><span class="fui-cross"></span> Delete</span>
                                    </div> 
                                </span>									
                                <% 		}); 			

                                }
                                else { %>

                                <span class="div_phone" >
                                    <input type="text" class="form-control"   name="phone[]" data-mask="99-999-999"  
                                           value="" parsley-required="true" parsley-trigger="blur" 
                                           parsley-validation-minlength="0" parsley-required-message="Please enter phone no"
                                           parsley-group="myphones"  parsley-rangelength="[10,10]"
                                           parsley-type="number" parsley-type-number-message="Please enter valid phone no" />
                                    <div class="p-messages"></div>  
                                    <span class="del_phone hidden" ><span class="fui-cross"></span> Delete</span> 
                                </span>
                                <% }							 

                                %>
                                <span class="help-block add-another-link">
                                    <a href="#" id="add_another_phone"><span class="glyphicon glyphicon-plus-sign"></span> Add Another</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">

                </div>
            </form>
        </div>
        <div class="scroll-indicator-container" id="scr3">
            <h4 class="aj-imp-sub-head scroll-ref">Social Settings <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h4>
            <form class="form-horizontal clearfix" id="form-siteprofile-social" name ="form-siteprofile-social" >


                <div class="form-group">
                    <label for="inputSocial1" class="col-sm-2 control-label">Facebook</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <div class="input-group">
                            <span class="input-group-addon">www.facebook.com/</span>
                            <input type="text" class="form-control" id="facebook" name="facebook"  
                                   placeholder="yourpageurl"  value="<%= site.getSocialDetails('facebook') %>" 
                                   required parsley-trigger="blur" parsley-validation-minlength="0" />
                            <div class="p-messages"></div>

                        </div>
                    </div>
                </div>


                <div class="form-group">
                    <label for="inputSocial2" class="col-sm-2 control-label">Twitter</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <div class="input-group">
                            <span class="input-group-addon">www.twitter.com/</span>
                            <input type="text" class="form-control" id="twitter" name="twitter"  placeholder="Twitter"
                                   value="<%= site.getSocialDetails('twitter') %>" required parsley-trigger="blur" 
                                   parsley-validation-minlength="0"  >
                            <div class="p-messages"></div>

                        </div>
                    </div>
                </div>

            </form>
        </div>
        <div class="scroll-indicator-container" id="scr4">
            <h4 class="aj-imp-sub-head scroll-ref">SEO <small>Lorem ipsum dolor sit amet, consectetur adipiscing</small></h4>
            <form class="form-horizontal clearfix" id="form-siteprofile-meta" name="form-siteprofile-meta">


                <div class="form-group">
                    <label for="inputSEO1" class="col-sm-2 control-label">Site Description</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="sitedescription" id="sitedescription" 
                                  placeholder="A brief description of your site for search engines."></textarea>
                    </div>
                </div>


                <div class="form-group">
                    <label for="inputSEO2" class="col-sm-2 control-label">Meta Keywords</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="metakeywords" id="metakeywords" 
                                  placeholder="Separate each keyword with a comma."></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <span class="help-block col-sm-10 col-sm-offset-2"></span>
                </div>

                <div class="form-group">
                    <label for="inputSEO3" class="col-sm-2 control-label">Footer Code</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="footercode" id="footercode"  
                                  placeholder="ex. Google Analytics tracking code."></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputSEO4" class="col-sm-2 control-label">Header Code</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="headercode" id="headercode" 
                                  placeholder="ex. Google Webmaster tools verification code."></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <label for="checkbox2" class="checkbox checked">
                            <input type="checkbox" data-toggle="checkbox" checked="checked" id="checkbox2" value="">
                            Hide site from Search Engines
                        </label>
                    </div>
                </div>

            </form>
        </div>
        <div class="scroll-indicator-container" id="scr5" style="margin-bottom: 5em;">
            <h4 class="aj-imp-sub-head scroll-ref">Editors <small>Editors are other people you've allowed to edit this site.</small></h4>
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody data-link="row" class="rowlink">
                    <tr>
                        <td>
                            <a href="#rowlinkModal" data-toggle="modal">admin@impruw.com</a>
                        </td>
                        <td>
                            Admin
                        </td>
                        <td>
                            23/11/2013 @ 13:09
                        </td>
                        <td class="rowlink-skip">
                            <a href="#">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#rowlinkModal" data-toggle="modal">user@impruw.com</a>
                        </td>
                        <td>
                            Author
                        </td>
                        <td>
                            23/11/2013 @ 13:09
                        </td>
                        <td class="rowlink-skip">
                            <a href="#">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="#rowlinkModal" data-toggle="modal">user@impruw.com</a>
                        </td>
                        <td>
                            Author
                        </td>
                        <td>
                            23/11/2013 @ 13:09
                        </td>
                        <td class="rowlink-skip">
                            <a href="#">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <a href="#addeditorModal" data-toggle="modal"><span class="glyphicon glyphicon-plus-sign"></span> Add Editor</a>
        </div>
        <div class="aj-imp-long-form-actions" data-spy="affix" data-offset-top="200">
            <form class="form-horizontal clearfix">
                <div class="affix-show">You have unsaved changes!</div>
                <button type="button" id="btn_savesitedetails"  name="btn_savesitedetails" class="btn btn-wide aj-imp-submit">Save</button>
                <img src ='<%=THEMEURL%>/images/loader.gif' width="38" height="30"  id="siteprofilesubmitm_loader" style="display:none"/>
            </form>
        </div>
    </div>
</div>




