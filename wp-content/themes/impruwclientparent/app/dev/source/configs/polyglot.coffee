define ['polyglot', 'underscore'], (Polyglot, _ ) ->

    _.polyglot = new Polyglot
                        phrases :
                            #dashboard.home
                            "My Dashboard" : "My Dashboard_N",
                            "Hi! Good to see you here. Lets get you started on Impruw." : "Hi! Good to see you here. Lets get you started on Impruw._N",
                            "Edit Site" : "Edit Site_N",
                            "Your website is ready:" : "Your website is ready:_N",
                            "My Site Profile" : "My Site Profile_N",
                            "Filling your Website profile is an essential step. Let us explain why?" : "Filling your Website profile is an essential step. Let us explain why?_N",
                            "It lets you add your" : "It lets you add your_N",
                            "Business details such as your logo, address etc" : "Business details such as your logo, address etc_N",
                            "Add your facebook/ twitter page urls." : "Add your facebook/ twitter page urls._N",
                            "Select the people that are allowed to edit your website" : "Select the people that are allowed to edit your website_N",
                            "We know how tedious it is to keep filling the same content over and over again every time you decide to change the design of your website so we like making things simpler. Fill in your website details once and that's it, your job is done.": "We know how tedious it is to keep filling the same content over and over again every time you decide to change the design of your website so we like making things simpler. Fill in your website details once and that's it, your job is done._N",
                            "Click here to update your website profile" : "Click here to update your website profile_N",
                            "Site Builder" : "Site Builder_N",
                            "Drag, drop and create a site in less than 30 minutes." : "Drag, drop and create a site in less than 30 minutes.",
                            "Our site builder makes it fast and easy to create a professional website in under 30 minutes. Our drag and drop editor allows you to add your content anywhere you want on the site. Simply add rows and drag - drop text or forms or images in the row." : "Our site builder makes it fast and easy to create a professional website in under 30 minutes. Our drag and drop editor allows you to add your content anywhere you want on the site. Simply add rows and drag - drop text or forms or images in the row._N",
                            "Customize your site with additional functionality like social media, contact forms and more." : "Customize your site with additional functionality like social media, contact forms and more._N",
                            "Click here to edit your website" : "Click here to edit your website_N",
                            "Rooms" : "Rooms_N",
                            "Add your room types, tariff and packages - at one place" : "Add your room types, tariff and packages - at one place_N",
                            "Impruw has been specifically designed to suit your business needs and therefore you can" : "Impruw has been specifically designed to suit your business needs and therefore you can_N",
                            "Add tariff according to your chosen date range" : "Add tariff according to your chosen date range_N",
                            "Add facilities and add ons to your room" : "Add facilities and add ons to your room_N",
                            "Create room types of your choice" : "Create room types of your choice_N",
                            "We want to make sure that you are able to create a business website that is completely yours - with your chosen room types to adding your unique business policies." : "We want to make sure that you are able to create a business website that is completely yours - with your chosen room types to adding your unique business policies._N",
                            "Click here to add rooms" : "Click here to add rooms_N",
                            "User Profile" : "User Profile_N",
                            "Complete your User Profile" : "Complete your User Profile_N",
                            "It's always nice to put a face to a name, so upload your profile picture." : "It's always nice to put a face to a name, so upload your profile picture._N",
                            "You can also change your password or your preferred language here." : "You can also change your password or your preferred language here._N",
                            "Click here to complete your user profile" : "Click here to complete your user profile_N",

                            #room-summary
                            "Room Summary" : "Room Summary_N",
                            "Additional Info for rooms" : "Additional Info that applies to all the rooms across your site_N",
                            "Check-in Time" : "Check-in Time_N",
                            "Additional Policies" : "Additional Policies_N",

                            #rooms.add
                            "Add Room" : "Add Room_N",
                            "Add Room Category" : "Add Room Category_N",
                            "No. of Rooms" : "No. of Rooms_N",
                            "Room Description" : "Room Description_N",
                            "Description of your room category" : "Give a brief description of your room category._N",
                            "Images" : "Images_N",
                            "Add attachment images to your room." : "Add attachment images to your room._N",
                            "Add Images" : "Add Images_N",
                            "Add Images to your Room here. The images that you add here can then be added to the page of the room by placing the Gallery Element in the Site Builder." : "Add Images to your Room here. The images that you add here can then be added to the page of the room by placing the Gallery Element in the Site Builder._N",
                            "Room Tariff" : "Room Tariff_N",
                            "Add tariffs and date ranges for your rooms." : "Add tariffs and date ranges for your rooms._N",
                            "All Prices are in " : "All Prices are in _N",
                            "€" : "€_N",
                            "(Euros)" : "(Euros)_N",
                            "Room Booking" : "Room Booking_N",
                            "Set up booking" : "Set up booking_N",
                            "Save Room" : "Save Room_N",
                            "eg. Executive Room" : "eg. Executive Room_N",
                            "eg. 10" : "eg. 10_N",
                            "Room Description" : "Room Description_N",

                            #rooms.add.views
                            "New room added successfully" : "New room added successfully_N",

                            #rooms.edit-room
                            "Edit Room" : "Edit Room_N",

                            #rooms.edit.views
                            "Room updated successfully" : "Room updated successfully_N",

                            #rooms.list
                            "No Rooms found. Add Rooms to your Site." : "No Rooms found. Add Rooms to your Site._N" ,
                            "Room List" : "Room List_N" ,
                            "Room Details" : "Room Details_N" ,
                            "Tariff" : "Tariff_N" ,
                            "Actions" : "Actions_N" ,
                            "Rooms" : "Rooms_N" ,
                            "12Hr" : "12Hr_N" ,
                            "Hour Format" : "Hour Format_N" ,
                            "9:00AM" : "Hour Format_N" ,
                            "Plan Name" : "Plan Name_N" ,
                            "1st Jan to 31st Mar" : "1st Jan to 31st Mar_N" ,
                            "Weekday" : "Weekday_N" ,
                            "$200" : "$200_N" ,
                            "Weekend" : "Weekend_N" ,
                            "$300" : "$300_N" ,
                            "Edit" : "Edit_N" ,
                            "Delete" : "Delete_N" ,

                            #rooms.facilities.list.view
                            "Are you sure?" : "Are you sure?_N" ,
                            "Delete the room and all its data?" : "Delete the room and all its data?_N" ,


                            #rooms.tarrifs.addtarrif
                            "Monday to Friday" : "Monday to Friday_N",
                            "Saturday to Sunday" : "Saturday to Sunday_N",
                            "Enter your tariff plan for the chosen category." : "Enter your tariff plan for the chosen category._N",
                            "Entered rate will be the same as the currency on your site profile. Customers can view your tariff in the currency chosen by them on your website." : "Entered rate will be the same as the currency on your site profile. Customers can view your tariff in the currency chosen by them on your website._N",
                            "Maximum Adults" : "Maximum Adults_N",
                            "Maximum Children" : "Maximum Children_N",
                            "Additional Charge per extra Adult" : "Additional Charge per extra Adult_N",
                            "Additional Charge per extra Child" : "Additional Charge per extra Child_N",
                            "The tariff is exclusive of additional charges." : "The tariff is exclusive of additional charges._N",
                            "Add Tariff" : "Add Tariff_N",
                            "Tariff added succesfully for the plan" : "Tariff added succesfully for the plan_N",

                            #rooms.tarrifs.daterange
                            "Daterange Label" : "Daterange Label_N",
                            "Start Date" : "Start Date_N",
                            "End Date" : "End Date_N",
                            "Color" : "Color_N",
                            "Add Date Range" : "Add Date Range_N",
                            "Update Date Range" : "Update Date Range_N",

                            #rooms.tarrifs.edittarrif
                            "Update Tariff" : "Update Tariff_N",
                            "Delete Tariff" : "Delete Tariff_N",
                            "Tariff updated successfully" : "Tariff updated successfully_N",
                            "Edit Tariff" : "Edit Tariff_N",
                            "The tariff will be deleted for the plan and date range. Are you sure you want to continue?" : "The tariff will be deleted for the plan and date range. Are you sure you want to continue?_N",

                            #rooms.tarrifs.plan
                            "Plan Type" : "Plan Type_N",
                            "Plan Description" : "Plan Description_N",
                            "Add Plan" : "Add Plan_N",
                            "Delete Plan" : "Delete Plan_N",
                            "Update Plan" : "Update Plan_N",

                            #rooms.tarrifs.plan.addplan
                            "You have created a new plan. Update your tariff by clicking on the plan" : "You have created a new plan. Update your tariff by clicking on the plan_N",

                            #rooms.tarrifs.daterange.editdaterange alerts
                            "All plans with date range deleted confirm" : "All the plans associated with the date range will also be deleted. Are you sure you want to delete the date range?_N",

                            #rooms.tarrifs.daterange.adddaterange
                            "Add DateRange" : "Add DateRange_N",
                            "You have added a new date range. Add plans and tariff to the date range" : "You have added a new date range. Add plans and tariff to the date range_N",

                            #rooms.tarrifs.daterange.editdaterange
                            "Edit DateRange" : "Edit DateRange_N",


                            #rooms.tarrifs.plan.editplan alerts
                            "plan will not exist" : "The plan will not exist for all the date ranges. Are you sure you want to continue?_N",
                            "Updated successfully" : "Updated successfully_N",
                            "Edit Plan" : "Edit Plan_N",

                            #rooms.facilities
                            "Facilities" : "Facilities_N",
                            "List the facilities available in this room." : "List the facilities available in this room._N",

                            #rooms.facilities.add
                            "Add a Facility" : "Add a Facility_N",
                            "Add" : "Add_N",

                            #rooms.facilities.list
                            "Update" : "Update_N",
                            "Cancel" : "Cancel_N",

                            #rooms.gallery
                            "No images found. Please add images." : "No images found. Please add images._N",

                            #slider-manager.edit
                            "Slider Settings" : "Slider Settings_N",
                            "Slides" : "Slides_N",
                            "Add/Edit Slides" : "Add/Edit Slides_N",

                            #slider-manager.edit-slider.addedit-slide
                            "Click to Add an Image to Your Slide" : "Click to Add an Image to Your Slide_N",
                            "Title" : "Title_N",
                            "Link" : "Link_N",
                            "Description" : "Description_N",
                            "Upload" : "Upload_N",
                            "Gallery" : "Gallery_N",
                            "Done" : "Done_N",

                            #slider-manager.edit-slider.list-slides
                            "No images found. Please add images." : "No images found. Please add images._N",
                            "File Name" : "File Name_N",
                            "Actions" : "Actions_N",
                            "Add Image" : "Add Image_N",
                            "Order updated successfully" : "Order updated successfully_N",
                            "Image Gallery" : "Image Gallery_N",

                            #slider-manager.edit-slider.setting
                            "Slider Name" : "Slider Name_N",
                            "Name Your Slider" : "Name Your Slider_N",
                            "Updated successfully" : "Updated successfully_N",

                            #slider-manager.grid
                            "Add New Slider" : "Add New Slider_N",

                            #slider-manager.new
                            "Name Your Slider" : "Name Your Slider_N" ,
                            "Create Slider" : "Create Slider_N" ,

                            #Error messages in jquery.validate plugin
                            "This field is required." : "This field is required._NNNN" ,
                            "Please fix this field." : "Please fix this field._NNNN" ,
                            "Please enter a valid email address." : "Please enter a valid email address._NNNN" ,
                            "Please enter a valid URL." : "Please enter a valid email address._NNNN" ,
                            "Please enter a valid date." : "Please enter a valid date._NNNN" ,
                            "Please enter a valid date (ISO)." : "Please enter a valid date (ISO)._NNNN" ,
                            "Please enter a valid number." : "Please enter a valid number._NNNN" ,
                            "Please enter only digits." : "Please enter only digits._NNNN" ,
                            "Please enter a valid credit card number." : "Please enter a valid credit card number._NNNN" ,
                            "Please enter the same value again." : "Please enter the same value again._NNNN" ,
                            "Please enter no more than {0} characters." : "Please enter no more than {0} characters._NNNN" ,
                            "Please enter at least {0} characters." : "Please enter at least {0} characters._NNNN" ,
                            "Please enter a value between {0} and {1} characters long." : "Please enter a value between {0} and {1} characters long._NNNN" ,
                            "Please enter a value between {0} and {1}." : "Please enter a value between {0} and {1}._NNNN" ,
                            "Please enter a value less than or equal to {0}." : "Please enter a value less than or equal to {0}._NNNN" ,
                            "Please enter a value greater than or equal to {0}." : "Please enter a value greater than or equal to {0}._NNNN"