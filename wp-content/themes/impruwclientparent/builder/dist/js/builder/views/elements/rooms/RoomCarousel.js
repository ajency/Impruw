(function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t};define(["builderelement","tpl!builder/templates/elements/BasicElement.tpl","global"],function(e,n,r){var i,s;return i=function(e){function i(){return s=i.__super__.constructor.apply(this,arguments),s}return t(i,e),i.prototype.className="aj-imp-elem-room-carousel element",i.prototype.template=n,i.prototype.elementType="RoomCarousel",i.prototype.events={mouseenter:"elementMouseEnter",mouseleave:"elementMouseLeave","click > .aj-imp-delete-btn":"destroyElement",contextmenu:"showContextMenu","click a":"void"},i.prototype.initialize=function(e){e==null&&(e={}),_.isUndefined(e.config)?(this.id=this.type()+"-"+r.generateRandomId(),this.$el.attr("id",this.id)):this.setProperties(e.config),this.generateMarkup({icon:"uniF11C",name:"Room Carousel"}),this.setContextMenu()},i}(e)})}).call(this);