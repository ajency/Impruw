define ['app'],(App)->

	describe "Application object",->

		it "must have a application object", ->
			expect(App).toBeDefined()

		it "must have a root route", ->
			expect(App.rootRoute).toBeDefined()

		it "must have 3 regions",->
			expect(App.leftRegion).toBeDefined()

		it "must have a default:region handler", ->
			expect(App.reqres.hasHandler("default:region")).toBe true

		it "must return App main region as default region", ->
			expect(App.request("default:region")).toBe App.rightRegion