define ['app'], (App)->

	App.module "OfflineStore", (OfflineStore, App)->

		#offline store API
		API = 
			# get collection of type
			getCollection: (type)->
				OfflineStore[type] ? false

			# get a model from collection
			getCollectionModel:(collectionType, modelId)->
				model = OfflineStore[collectionType].get modelId
				return false if _.isUndefined model
				model

			# set the collection for the type
			setCollection: (type, collection)->
				OfflineStore[type] = collection


		#get collection
		App.reqres.setHandler "get:collection",(type)->
			API.getCollection type

		#set collection
		App.reqres.setHandler "set:collection",(type, collection)->
			API.setCollection type, collection

		#get model for collection
		App.reqres.setHandler "get:collection:model",(collectionType, modelId)->
			console.log modelId
			API.getCollectionModel collectionType, modelId