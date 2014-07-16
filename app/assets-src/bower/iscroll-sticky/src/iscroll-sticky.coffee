window.IScrollSticky = class IScrollSticky
  vendor =
    if /webkit/i.test navigator.appVersion
      'webkit'
    else
      if /firefox/i.test navigator.userAgent
        'Moz'
      else
        if 'opera' of window then 'O' else ''
  has3d = 'WebKitCSSMatrix' of window and 'm11' of new WebKitCSSMatrix()
  trnOpen = 'translate' + (if has3d then '3d(' else '(')
  trnClose = if has3d then ',0)' else ')'

  constructor: (iscroll, selector) ->
    unless iscroll.options.useTransform
      throw new Error "Can't use sticky headers without transform on iScroll."
    @iscroll = iscroll
    @selector = selector
    @initialize()

  headers: []

  initialize: ->
    @iscroll.on 'refresh', =>
      @refresh()
    @iscroll.on 'scroll', =>
      @translate()
    @iscroll.on 'scrollEnd' =>
      @translate();

    @iscroll.refresh()

  refresh: ->
    elms = @iscroll.scroller.querySelectorAll @selector
    @headers = []

    for elm, i in elms
      header =
        elm: elm
        minY: elm.offsetTop
        maxY: elm.offsetHeight + elm.offsetTop

      prevHeader = @headers[i - 1]
      prevHeader.maxY = Math.abs(prevHeader.maxY - header.minY) if prevHeader
      s = header.elm.style
      s["#{vendor}TransitionTimingFunction"] = "cubic-bezier(.33, .66, .66, 1)"
      s["#{vendor}TransitionProperty"] = "-#{vendor.toLowerCase()}-transform"
      s["#{vendor}TransitionDuration"] = "0"
      s["#{vendor}TransformOrigin"] = "0 0"
      @headers.push header
    @translate()

  translate: ->
    absY = Math.abs @iscroll.y
    preventTranslate = @iscroll.y > 0

    for header in @headers
      translateY = absY - header.minY
      if preventTranslate or translateY < 0
        translateY = 0

      # Make sure it never exceeds it's max allowed position
      else translateY = header.maxY  if translateY > header.maxY
      s = header.elm.style
      s["#{vendor}Transform"] = "#{trnOpen}0, #{translateY}px#{trnClose}"

  _transition: (time) ->
    for header in @headers
      header.elm.style["#{vendor}TransitionDuration"] = time + "ms"
