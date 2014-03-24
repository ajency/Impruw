App.execute("show:edit:tariff", function(id) {
  return new EditTariffController({
    tariffId: id
  });
});
