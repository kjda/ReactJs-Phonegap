(function() {
  var IScrollSticky;

  window.IScrollSticky = IScrollSticky = (function() {
    var has3d, trnClose, trnOpen, vendor;

    vendor = /webkit/i.test(navigator.appVersion) ? 'webkit' : /firefox/i.test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : '';

    has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

    trnOpen = 'translate' + (has3d ? '3d(' : '(');

    trnClose = has3d ? ',0)' : ')';

    function IScrollSticky(iscroll, selector) {
      if (!iscroll.options.useTransform) {
        throw new Error("Can't use sticky headers without transform on iScroll.");
      }
      this.iscroll = iscroll;
      this.selector = selector;
      this.initialize();
    }

    IScrollSticky.prototype.headers = [];

    IScrollSticky.prototype.initialize = function() {
      var _this = this;
      this.iscroll.on('refresh', function() {
        return _this.refresh();
      });
      this.iscroll.on('scroll', function() {
        return _this.translate();
      });
      return this.iscroll.refresh();
    };

    IScrollSticky.prototype.refresh = function() {
      var elm, elms, header, i, prevHeader, s, _i, _len;
      elms = this.iscroll.scroller.querySelectorAll(this.selector);
      this.headers = [];
      for (i = _i = 0, _len = elms.length; _i < _len; i = ++_i) {
        elm = elms[i];
        header = {
          elm: elm,
          minY: elm.offsetTop,
          maxY: elm.offsetHeight + elm.offsetTop
        };
        prevHeader = this.headers[i - 1];
        if (prevHeader) {
          prevHeader.maxY = Math.abs(prevHeader.maxY - header.minY);
        }
        s = header.elm.style;
        s["" + vendor + "TransitionTimingFunction"] = "cubic-bezier(.33, .66, .66, 1)";
        s["" + vendor + "TransitionProperty"] = "-" + (vendor.toLowerCase()) + "-transform";
        s["" + vendor + "TransitionDuration"] = "0";
        s["" + vendor + "TransformOrigin"] = "0 0";
        this.headers.push(header);
      }
      return this.translate();
    };

    IScrollSticky.prototype.translate = function() {
      var absY, header, preventTranslate, s, translateY, _i, _len, _ref, _results;
      absY = Math.abs(this.iscroll.y);
      preventTranslate = this.iscroll.y > 0;
      _ref = this.headers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        header = _ref[_i];
        translateY = absY - header.minY;
        if (preventTranslate || translateY < 0) {
          translateY = 0;
        } else {
          if (translateY > header.maxY) {
            translateY = header.maxY;
          }
        }
        s = header.elm.style;
        _results.push(s["" + vendor + "Transform"] = "" + trnOpen + "0, " + translateY + "px" + trnClose);
      }
      return _results;
    };

    IScrollSticky.prototype._transition = function(time) {
      var header, _i, _len, _ref, _results;
      _ref = this.headers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        header = _ref[_i];
        _results.push(header.elm.style["" + vendor + "TransitionDuration"] = time + "ms");
      }
      return _results;
    };

    return IScrollSticky;

  })();

}).call(this);

/*
//@ sourceMappingURL=iscroll-sticky.js.map
*/