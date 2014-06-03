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
                            "Description of your room category." : "Give a brief description of your room category._N",
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

                            #rooms.edit-room
                            "Edit Room" : "Edit Room_N",

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

                            #rooms.tarrifs.plan
                            "Plan Type" : "Plan Type_N",
                            "Plan Description" : "Plan Description_N",
                            "Add Plan" : "Add Plan_N",
                            "Delete Plan" : "Delete Plan_N",
                            "Update Plan" : "Update Plan_N",

