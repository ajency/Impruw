$.fn.scrollSections = function() {
  var adjustIndicators, calcIndicatorInfo, getNodeTopPos, initIndicators, scrollFn, sections, sectionsIndicator, self;
  self = this;
  this.indicators = [];
  sectionsIndicator = "";
  sections = self.find('.scrollsection');
  sections.each(function(i) {
    var iInverse, margins;
    iInverse = sections.length - i - 1;
    margins = "margin: " + ((i * 1.5) + 0.5) + "em 0 " + ((iInverse * 1.5) + 0.5) + "em 0;";
    sectionsIndicator += "<a class=\"indicator indicator--upcoming\" style=\"" + margins + "\" href=\"#" + this.id + "\"><span class=\"indicator-tooltip\">" + $(this).attr('data-text') + "</span></a>";
  });
  self.append(sectionsIndicator);
  getNodeTopPos = function(indicator, target) {
    var indCenter, indMargTop, targCenter;
    indMargTop = parseInt(indicator.css("margin-top").replace("px", ""));
    targCenter = target.outerHeight(false) / 2;
    indCenter = indicator.outerHeight(false) / 2;
    return target.offset().top;
  };
  calcIndicatorInfo = function() {
    self.find(".indicator").each(function() {
      var o;
      o = {
        $indicator: $(this),
        $target: $($(this).attr("href")),
        $targetTitle: $($(this).attr("href") + " h4")
      };
      o.absPos = getNodeTopPos(o.$indicator, o.$targetTitle);
      o.absBottomStop = window.innerHeight - (o.absPos + o.$indicator.outerHeight(true));
      o.viewableTopStop = o.$target.offset().top - window.innerHeight;
      o.viewableBottomStop = o.$target.offset().top + o.$target.outerHeight();
      self.indicators[self.indicators.length] = o;
    });
  };
  initIndicators = function() {
    calcIndicatorInfo();
    setTimeout((function() {
      var st;
      st = $(document).scrollTop();
      $(self.indicators).each(function() {
        if (st <= this.absPos && st >= (-1 * this.absBottomStop)) {
          this.$indicator.removeClass("indicator--upcoming").removeClass("indicator--passed").addClass("indicator--active").css({
            top: this.absPos
          });
        } else if (st >= (-1 * this.absBottomStop)) {
          this.$indicator.removeClass("indicator--active").removeClass("indicator--upcoming").addClass("indicator--passed").css({
            top: ""
          });
        } else {
          this.$indicator.removeClass("indicator--active").removeClass("indicator--passed").addClass("indicator--upcoming").css({
            top: ""
          });
        }
        if (st >= this.viewableTopStop && st <= this.viewableBottomStop) {
          this.$indicator.addClass("indicator--viewing");
        } else {
          this.$indicator.removeClass("indicator--viewing");
        }
      });
    }), 0);
  };
  adjustIndicators = function() {
    var active$, anticipated, anticipatedEls, needsActivation, needsDeactivation, st;
    st = $(document).scrollTop();
    anticipated = _.filter(self.indicators, function(o) {
      return st <= o.absPos && st >= (-1 * o.absBottomStop);
    });
    active$ = self.find(".indicator--active");
    needsActivation = _.filter(anticipated, function(o) {
      return !_.contains(active$, o.$indicator[0]);
    });
    anticipatedEls = [];
    needsDeactivation = _.filter(active$, function(o) {
      return !_.find(anticipatedEls, function(e) {
        return e[0] === o;
      });
    });
    _.each(needsActivation, function(o) {
      o.$indicator.removeClass("indicator--upcoming").removeClass("indicator--passed").addClass("indicator--active").css({
        top: o.absPos
      });
    });
    _.each(needsDeactivation, function(i$) {
      var indicator;
      indicator = _.find(self.indicators, function(i) {
        return i.$indicator[0] === i$;
      });
      if (st >= indicator.absPos) {
        indicator.$indicator.removeClass("indicator--active").addClass("indicator--passed").css({
          top: ""
        });
      } else {
        indicator.$indicator.removeClass("indicator--active").addClass("indicator--upcoming").css({
          top: ""
        });
      }
    });
    $(self.indicators).each(function() {
      if (st >= this.viewableTopStop && st <= this.viewableBottomStop) {
        this.$indicator.addClass("indicator--viewing");
      } else {
        this.$indicator.removeClass("indicator--viewing");
      }
    });
  };
  scrollFn = _.throttle(adjustIndicators, 150);
  $(document).scroll(scrollFn);
  $(window).resize(_.debounce(function() {
    initIndicators();
    return adjustIndicators();
  }, 300));
  initIndicators();
  adjustIndicators();
  return self.find(".indicator").click(function(e) {
    e.preventDefault();
    return $('html, body').animate({
      scrollTop: $("" + ($(e.target).attr('href'))).position().top
    }, 1000, function() {
      initIndicators();
      adjustIndicators();
      return adjustIndicators();
    });
  });
};
