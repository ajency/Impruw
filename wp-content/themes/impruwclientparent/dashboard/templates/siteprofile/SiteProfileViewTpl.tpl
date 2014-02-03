<header class="aj-imp-dash-header row">
    <div class="aj-imp-dash-title col-xs-12">
        <h2 class="aj-imp-page-head">My Site Profile</h2>
    </div>
</header>
<div class="row">
    <div class="aj-imp-dash-content col-md-12">
        <div class="alert alert-success hidden" id="siteprofilesave_status">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            Your details have been successfully saved.
        </div>
        <form class="form-horizontal clearfix" name="form-siteprofile" id="form-siteprofile">
            <div class="scroll-indicator-container" id="scr1">
                <h4 class="aj-imp-sub-head scroll-ref">General Settings</h4>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">Site Name</label>
                        <div class="col-sm-10 col-sm-offset-2">
                            <div class="input-group">
                                <input type="text" class="form-control" id="sitename" disabled="disabled" name="siteName" placeholder="<%= site.get('siteName') %>" value="<%= site.get('siteName') %>" >
                                <span class="input-group-addon">.impruw.com</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group pic-upload">
                        <label for="inputFile3" class="col-sm-2 control-label">Upload your Logo</label>
                        <div class="col-sm-10 col-sm-offset-2">
                            <div class="fileinput fileinput-new" data-provides="fileinput">
                                <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 300px; height: 100px;"><img name="business_logo"  id="businesslogo_img"   class="<% if(site.get('businessLogoUrl')=='') { %>hidden<% } %>" src="<%= site.get('businessLogoUrl') %>" /><input type="hidden" name="businessLogoId" id="hdn_businesslogo_id" value="<%= site.get('businessLogoId') %>" /></div>
                                <div>
                                    <span class="btn btn-default btn-file"><span class="fileinput-new filepopup<% if(site.get('businessLogoUrl')!='') { %> fileinput-exists<% } %>" id="select_businesslogo">Select image</span><span class="<% if(site.get('businessLogoUrl')=='') { %>fileinput-exists<% } %> filepopup" id="change_businesslogo">Change</span><!-- <input type="file" name="inputFile3">--> </span>
                                    <a href="#" class="btn btn-danger <% if(site.get('businessLogoUrl')=='') { %>fileinput-exists<% } %>" data-dismiss="fileinput" id="remove_businesslogo" >Remove</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="form-group pic-upload">
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

                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <span class="help-block">
                                <p>Favicon stands for "Favorites Icon". It's the little icon beside your site's name in the favorites list, before the URL in the address bar and bookmarks folder and as a bookmarked website on the desktop in some operating systems.</p>
                                <h6>Why should you use a favicon?</h6>
                                <p>Most people have a very cluttered bookmarks / favorites list. Having yours stand out with a nice graphical reminder of your site beside it, is a good way to get their attention again.</p>
                            </span>
                        </div>
                    </div> -->
            </div>
            <div class="scroll-indicator-container" id="scr2">
                <h4 class="aj-imp-sub-head scroll-ref">Business Details <small>These details will be used in your contact us page.</small></h4>
                  <div class="form-group">
                        <label for="inputAddress1" class="col-sm-2 control-label">Street</label>
                        <div class="col-sm-10 col-sm-offset-2">
                            <input type="text" class="form-control" id="street" name="street" placeholder="Leilighet 425" 
                                   value="<%= site.get('street')   %>" required  parsley-trigger="blur" parsley-validation-minlength="0" /> 
                            <div class="p-messages"></div>

                        </div>
                    </div>
                    <div class="form-group dual">
                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="inputAddress2" class="col-sm-5 control-label">Postal Code</label>
                                <div class="col-sm-7 col-sm-offset-5">
                                    <!-- data-mask="aa-9999" -->
                                    <input type="text" class="form-control" id="postalcode" name="postalcode"  
                                            placeholder="NO-7321" value="<%= site.get('postalcode') %>" 
                                           required parsley-trigger="blur" parsley-validation-minlength="0"  parsley-type="number" parsley-type-number-message="Please enter valid postal code" />
                                    <div class="p-messages"></div>

                                </div>
                            </div>
                        </div>

                        <div class="col-sm-5">
                            <div class="form-group">
                                <label for="inputAddress3" class="col-sm-5 control-label">City / Town</label>
                                <div class="col-sm-7 col-sm-offset-5">
                                    <input type="text" class="form-control"  id="city" name="city"  placeholder="Trondheim"
                                           value="<%= site.get('city') %>" required parsley-trigger="blur"  
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
                                <option value="Norway" <% if(site.get('country')=='Norway') { %> selected  <% } %>>Norway</option>
                                <option value="Sweden" <% if(site.get('country')=='Sweden') { %> selected  <% } %>>Sweden</option>
                                <option value="Denmark" <% if(site.get('country')=='Denmark') { %> selected  <% } %>>Denmark</option>
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
                                            <input type="email" class="form-control"   name="email[]"    value="<%= email %>"  placeholder="someone@example.com"
                                                   parsley-required="true" parsley-trigger="blur" parsley-validation-minlength="0"  
                                                   parsley-type="email" parsley-required-message="Please enter email ID" parsley-group="myemails">  
                                            <div class="p-messages"></div>
                                            <span class="del_email <%= (index <= 0 ) ? 'hidden' : '' %>" ><span class="fui-cross"></span> Delete</span> 
                                        </div>
                                    </span>

                                    <% });
                                    }
                                    else{
                                    %>
                                    <span class="div_email" >
                                        <input type="email" class="form-control"   name="email[]"  value="" placeholder="someone@example.com"
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
                                            <!-- data-mask="99-999-999" -->
                                            <input type="text" class="form-control" name="phone[]"   placeholder="+47 - 12 34 56 78"
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
                                        <!-- data-mask="99-999-999" -->
                                        <input type="text" class="form-control"   name="phone[]"  placeholder="+47 - 12 34 56 78"
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
                        <div class="col-sm-10 col-sm-offset-2">
                            <span class="help-block">
                                <p>Email accounts and phone numbers are easy to setup and there is really no limit to how many you can have. Use this to better organize and manage your communication.</p>
                            </span>
                        </div>
                    </div>
            </div>
            <div class="scroll-indicator-container" id="scr3">
                <h4 class="aj-imp-sub-head scroll-ref">Social Settings <small>Update the social tags on your website.</small></h4>
                    <div class="form-group">
                        <label for="inputSocial1" class="col-sm-2 control-label">Facebook</label>
                        <div class="col-sm-10 col-sm-offset-2">
                            <div class="input-group">
                                <span class="input-group-addon">www.facebook.com/</span>
                                <input type="text" class="form-control" id="facebook" name="facebook"  
                                       placeholder="yourpageurl"  value="<%= site.get('facebook') %>" 
                                       required parsley-trigger="blur" parsley-validation-minlength="0" />
                            </div>
                            <div class="p-messages"></div>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="inputSocial2" class="col-sm-2 control-label">Twitter</label>
                        <div class="col-sm-10 col-sm-offset-2">
                            <div class="input-group">
                                <span class="input-group-addon">www.twitter.com/</span>
                                <input type="text" class="form-control" id="twitter" name="twitter"  placeholder="Twitter"
                                       value="<%= site.get('twitter') %>" required parsley-trigger="blur" 
                                       parsley-validation-minlength="0"  >
                            </div>
                            <div class="p-messages"></div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <span class="help-block">
                                <p>It's always a good idea to have social links on your website. The reasons are</p>
                                <h6>Itâ€™s the future</h6>
                                <p>No business wants to get left behind right? Every single day that passes the more your competition promote across social media. This wave of social media marketing is here to stay... and if you donâ€™t jump on board now you are severely hampering your chances of longevity online â€“ which is where more business is going.</p>
                                <h6>It's the best way to come up in search results</h6>
                                <p>Every time you create content on a social media site that links back to your website, the search engines see that link. Every time the search engines â€œseeâ€� a link to your site, it makes them think, â€œWow, that site must be pretty important, seeing as there are so many other places linking to it.â€� When the search engines think your site is important, they will make your listing appear higher in the results.</p>
                            </span>
                        </div>
                    </div>
              </div>
        </form>
        <!--
        <div class="scroll-indicator-container" id="scr4">
            <h4 class="aj-imp-sub-head scroll-ref">SEO <small>Make your website rank higher</small></h4>
            <form class="form-horizontal clearfix" id="form-siteprofile-meta" name="form-siteprofile-meta">


                <div class="form-group">
                    <label for="inputSEO1" class="col-sm-2 control-label">Site Description</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="sitedescription" id="sitedescription" 
                                  placeholder="Keep site descriptions between 150 and 160 characters as search engines generally truncate snippets longer than 160 characters."></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <span class="help-block">
                            <h6>What is a site description?</h6>
                            <p>The site description serves the function of advertising copy. It draws readers to a website from the search engines and thus, is an extremely important part of search marketing. Crafting a readable, compelling description using important keywords can improve the click-through rate for a given webpage. To maximize click-through rates on search engine result pages, it's important to note that Google and other search engines bold keywords in the description when they match search queries.</p>
                        </span>
                    </div>
                </div>


                <div class="form-group">
                    <label for="inputSEO2" class="col-sm-2 control-label">Meta Keywords</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="metakeywords" id="metakeywords" 
                                  placeholder="A meta keywords tag is supposed to be a brief and concise list of the most important terms on your page."></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <span class="help-block col-sm-10 col-sm-offset-2"></span>
                </div>

                <div class="form-group">
                    <label for="inputSEO3" class="col-sm-2 control-label">Footer Code</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="footercode" id="footercode"  
                                  placeholder="example: Google Analytics tracking code."></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputSEO4" class="col-sm-2 control-label">Header Code</label>
                    <div class="col-sm-10 col-sm-offset-2">
                        <textarea class="form-control" rows="3" name="headercode" id="headercode" 
                                  placeholder="example: Google Webmaster tools verification code."></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <span class="help-block">
                            <h6>Why is it important to gauge my website metrics?</h6>
                            <p>Knowing precisely what your website visitors -- who are often current and potential customers -- like and dislike about your site can help you reach your overall business goals.</p>
                        </span>
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

                <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                        <span class="help-block">
                            <p>If you choose this your website will no longer be available on the search results.</p>
                        </span>
                    </div>
                </div>

            </form>
        </div>
        <div class="scroll-indicator-container" id="scr5" style="margin-bottom: 5em;">
            <h4 class="aj-imp-sub-head scroll-ref">Editors <small>Select people that are allowed to edit your website</small></h4>
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
            <form class="form-horizontal">
                <div class="form-group">
                    <div class="col-sm-12">
                        <span class="help-block">
                            <h6>Roles and their Capabilities</h6>
                            <p><b>A user can have one of the below given roles.</b></p>
                            <p><b>Administrator</b> â€“ somebody who has access to all the administration features in the website<br>
                            <b>Editor</b> â€“ somebody who can publish and manage posts including the posts of other users.<br>
                            <b>Author</b> â€“ somebody who can publish and manage their own posts.</p>
                        </span>
                    </div>
                </div>
            </form>
        </div>
        -->
        <div class="aj-imp-long-form-actions" data-spy="affix">
            <form class="form-horizontal">
                <div class="affix-show">You have unsaved changes!</div>
                <button type="button" id="btn_savesitedetails"  name="btn_savesitedetails" class="btn btn-wide aj-imp-submit">Save</button>
                <img src ='<%=THEMEURL%>/images/loader-white.gif' width="38" height="30"  id="siteprofilesubmitm_loader" style="display:none"/>
            </form>
        </div>
    </div>
</div>




