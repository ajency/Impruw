define ['app','apps/rooms/tariffs/tariffsapp'],(App)->

	describe "Rooms Tariff App", ->
		
		it "must have a Rooms Tariff app",->
			should.exist(App.RoomsApp);
