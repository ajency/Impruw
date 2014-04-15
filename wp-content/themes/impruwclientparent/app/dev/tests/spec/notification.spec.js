// Generated by CoffeeScript 1.7.1
define(['app', 'components/notifications/notificationcontroller'], function(App, Notification) {
  return describe("Global notification component", function() {
    describe("Initial setup", function() {
      it("must have a controller", function() {
        return expect(Notification.NotificationController).toBeDefined();
      });
      return it("must have a command handler", function() {
        return expect(App.commands.hasHandler('show:notification')).toBe(true);
      });
    });
    return describe("initializing controller without the message", function() {
      return it("must throw an error", function() {
        var nc;
        spyOn(Notification.NotificationController.prototype, 'initialize');
        nc = new Notification.NotificationController;
        return expect(nc.initialize).toHaveBeenCalled();
      });
    });
  });
});
