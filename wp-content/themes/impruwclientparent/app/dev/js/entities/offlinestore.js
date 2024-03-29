define(['app'], function(App) {
  return App.module("OfflineStore", function(OfflineStore, App) {
    var API;
    API = {
      getCollection: function(type) {
        var _ref;
        return (_ref = OfflineStore[type]) != null ? _ref : false;
      },
      getCollectionModel: function(collectionType, modelId) {
        var model;
        model = OfflineStore[collectionType].get(modelId);
        if (_.isUndefined(model)) {
          return false;
        }
        return model;
      },
      setCollection: function(type, collection) {
        return OfflineStore[type] = collection;
      },
      createOfflineCollection: function(type, collection) {}
    };
    App.reqres.setHandler("get:collection", function(type) {
      return API.getCollection(type);
    });
    App.reqres.setHandler("set:collection", function(type, collection) {
      return API.setCollection(type, collection);
    });
    App.reqres.setHandler("get:collection:model", function(collectionType, modelId) {
      return API.getCollectionModel(collectionType, modelId);
    });
    return App.commands.setHandler("create:offline:collection", function(type, collection) {
      return API.createOfflineCollection(type, collection);
    });
  });
});
