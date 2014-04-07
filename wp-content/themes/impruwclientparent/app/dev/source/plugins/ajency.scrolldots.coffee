# jquery scroll dots for sections
$.fn.scrollSections =  ->

  self = @
  @indicators = []
  
  #
  #	CREATE THE INDICATORS AND ADD TO PAGE
  #
  sectionsIndicator = ""
  sections = self.find '.scrollsection'
  
  # Create a bubble for each article
  sections.each (i) ->
    iInverse = sections.length - i - 1
    
    # Top margin is a function of the nodes before it, bottom is proportional to those after. determines stacking at top / bottom static positions
    margins = "margin: " + ((i * 1.5) + 0.5) + "em 0 " + ((iInverse * 1.5) + 0.5) + "em 0;"
    sectionsIndicator += "<a class=\"indicator indicator--upcoming\" style=\"" + margins + "\" href=\"#" + @id + "\"><span class=\"indicator-tooltip\">" + $(this).attr('data-text') + "</span></a>"
    return

  self.append sectionsIndicator
  
  # Utility function to calculate the proper top coordinate for a bubble when it's on the move (position: absolute)
  getNodeTopPos = (indicator, target) ->
    indMargTop = parseInt(indicator.css("margin-top").replace("px", ""))
    targCenter = target.outerHeight(false) / 2
    indCenter = indicator.outerHeight(false) / 2
    target.offset().top - indMargTop + targCenter - indCenter

  
  # 
  # INITIAL SET UP OF INDICATOR OBJECT
  #
  calcIndicatorInfo = ->
    
    self.find(".indicator").each ->

      o =
        $indicator: $(this)
        $target: $($(this).attr("href"))
        $targetTitle: $($(this).attr("href") )

      
      # When it's abs positioned (on the move), this is the top pos
      o.absPos = getNodeTopPos(o.$indicator, o.$targetTitle)
      
      # When it's abs positioned, at this scroll pos we should make the indicator fixed to the bottom
      o.absBottomStop = window.innerHeight - (o.absPos + o.$indicator.outerHeight(true))
      
      # Top / bottom stops for being 'viewable'
      o.viewableTopStop = o.$target.offset().top - window.innerHeight
      o.viewableBottomStop = o.$target.offset().top + o.$target.outerHeight()
      self.indicators[self.indicators.length] = o
      return

    return

  
  #
  # ON RESIZE FUNCTION - UPDATE THE CACHED POSITON VALUES
  #
  initIndicators = ->
    calcIndicatorInfo()
    
    # Bug fix - without timeout scroll top reports 0, even when it scrolls down the page to last page loaded position
    # http://stackoverflow.com/questions/16239520/chrome-remembers-scroll-position
    setTimeout (->
      st = $(document).scrollTop()
      $(self.indicators).each ->
        if st <= @absPos and st >= (-1 * @absBottomStop)
          @$indicator.removeClass("indicator--upcoming").removeClass("indicator--passed").addClass("indicator--active").css top: @absPos
        else if st >= (-1 * @absBottomStop)
          @$indicator.removeClass("indicator--active").removeClass("indicator--upcoming").addClass("indicator--passed").css top: ""
        else
          @$indicator.removeClass("indicator--active").removeClass("indicator--passed").addClass("indicator--upcoming").css top: ""
        if st >= @viewableTopStop and st <= (@viewableBottomStop)
          @$indicator.addClass "indicator--viewing"
        else
          @$indicator.removeClass "indicator--viewing"
        return

      return
    ), 0
    return

  
  #
  # SCROLL FUNCTION - UPDATE ALL OF THE INDICATORS
  #
  adjustIndicators = ->
    st = $(document).scrollTop()
    
    # The indicators that SHOULD be scrolling
    anticipated = _.filter self.indicators, (o) ->
      st <= o.absPos and st >= (-1 * o.absBottomStop)
    
    # The $ elements that are indeed scrolling
    active$ = self.find ".indicator--active"
    
    # Anything in anticipated that isn't in active should be activated ...
    needsActivation = _.filter anticipated, (o) ->
      not _.contains(active$, o.$indicator[0])
    
    # ... And anything thats in active that isn't in anticipated needs to be stopped. 
    anticipatedEls = [] #_.pluck(anticipated, "$indicator")
    needsDeactivation = _.filter active$, (o) ->
      not _.find anticipatedEls, (e) ->
        e[0] is o
    
    # Do the Activation
    _.each needsActivation, (o) ->
      o.$indicator.removeClass("indicator--upcoming").removeClass("indicator--passed").addClass("indicator--active").css top: o.absPos
      return

    _.each needsDeactivation, (i$) ->
      indicator = _.find self.indicators, (i) ->
        i.$indicator[0] is i$
      
      if st >= indicator.absPos
        # Went off top. now passed. 
        indicator.$indicator.removeClass("indicator--active").addClass("indicator--passed").css top: ""
      else
        
        # Went off bottom. now upcoming. 
        indicator.$indicator.removeClass("indicator--active").addClass("indicator--upcoming").css top: ""
      return

    $(self.indicators).each ->
      if st >= @viewableTopStop and st <= (@viewableBottomStop)
        @$indicator.addClass "indicator--viewing"
      else
        @$indicator.removeClass "indicator--viewing"
      return

    return

  
  #
  # BIND EVENTS
  #
  $(document).scroll ->
    adjustIndicators()
    return

  $(window).resize ->
    initIndicators()
    adjustIndicators()
    return

  initIndicators()
  adjustIndicators()
  self.find(".indicator").click (e)->
    e.preventDefault()

    $('html, body').animate
            scrollTop: $("#{$(e.target).attr 'href'}").position().top
          ,1000
          , ->
            initIndicators()
            adjustIndicators()
            adjustIndicators()