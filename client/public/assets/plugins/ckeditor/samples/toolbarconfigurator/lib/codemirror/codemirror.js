(function (q) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = q();
  else {
    if ("function" == typeof define && define.amd) return define([], q);
    this.CodeMirror = q();
  }
})(function () {
  function q(a, b) {
    if (!(this instanceof q)) return new q(a, b);
    this.options = b = b ? V(b) : {};
    V(qf, b, !1);
    wc(b);
    var c = b.value;
    "string" == typeof c && (c = new P(c, b.mode));
    this.doc = c;
    var d = new q.inputStyles[b.inputStyle](this),
      d = (this.display = new rf(a, c, d));
    d.wrapper.CodeMirror = this;
    Ad(this);
    Bd(this);
    b.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
    b.autofocus && !ab && d.input.focus();
    Cd(this);
    this.state = {
      keyMaps: [],
      overlays: [],
      modeGen: 0,
      overwrite: !1,
      delayingBlurEvent: !1,
      focused: !1,
      suppressEdits: !1,
      pasteIncoming: !1,
      cutIncoming: !1,
      draggingText: !1,
      highlight: new bb(),
      keySeq: null,
      specialChars: null,
    };
    var e = this;
    B &&
      11 > C &&
      setTimeout(function () {
        e.display.input.reset(!0);
      }, 20);
    sf(this);
    Dd || (tf(), (Dd = !0));
    Ja(this);
    this.curOp.forceUpdate = !0;
    Ed(this, c);
    (b.autofocus && !ab) || e.hasFocus()
      ? setTimeout(cb(xc, this), 20)
      : db(this);
    for (var f in Ka) if (Ka.hasOwnProperty(f)) Ka[f](this, b[f], Fd);
    Gd(this);
    b.finishInit && b.finishInit(this);
    for (c = 0; c < yc.length; ++c) yc[c](this);
    La(this);
    J &&
      b.lineWrapping &&
      "optimizelegibility" == getComputedStyle(d.lineDiv).textRendering &&
      (d.lineDiv.style.textRendering = "auto");
  }
  function rf(a, b, c) {
    this.input = c;
    this.scrollbarFiller = t("div", null, "CodeMirror-scrollbar-filler");
    this.scrollbarFiller.setAttribute("cm-not-content", "true");
    this.gutterFiller = t("div", null, "CodeMirror-gutter-filler");
    this.gutterFiller.setAttribute("cm-not-content", "true");
    this.lineDiv = t("div", null, "CodeMirror-code");
    this.selectionDiv = t("div", null, null, "position: relative; z-index: 1");
    this.cursorDiv = t("div", null, "CodeMirror-cursors");
    this.measure = t("div", null, "CodeMirror-measure");
    this.lineMeasure = t("div", null, "CodeMirror-measure");
    this.lineSpace = t(
      "div",
      [
        this.measure,
        this.lineMeasure,
        this.selectionDiv,
        this.cursorDiv,
        this.lineDiv,
      ],
      null,
      "position: relative; outline: none"
    );
    this.mover = t(
      "div",
      [t("div", [this.lineSpace], "CodeMirror-lines")],
      null,
      "position: relative"
    );
    this.sizer = t("div", [this.mover], "CodeMirror-sizer");
    this.sizerWidth = null;
    this.heightForcer = t(
      "div",
      null,
      null,
      "position: absolute; height: " + Hd + "px; width: 1px;"
    );
    this.gutters = t("div", null, "CodeMirror-gutters");
    this.lineGutter = null;
    this.scroller = t(
      "div",
      [this.sizer, this.heightForcer, this.gutters],
      "CodeMirror-scroll"
    );
    this.scroller.setAttribute("tabIndex", "-1");
    this.wrapper = t(
      "div",
      [this.scrollbarFiller, this.gutterFiller, this.scroller],
      "CodeMirror"
    );
    B &&
      8 > C &&
      ((this.gutters.style.zIndex = -1),
      (this.scroller.style.paddingRight = 0));
    J || (wa && ab) || (this.scroller.draggable = !0);
    a && (a.appendChild ? a.appendChild(this.wrapper) : a(this.wrapper));
    this.reportedViewFrom =
      this.reportedViewTo =
      this.viewFrom =
      this.viewTo =
        b.first;
    this.view = [];
    this.externalMeasured = this.renderedView = null;
    this.lastWrapHeight = this.lastWrapWidth = this.viewOffset = 0;
    this.updateLineNumbers = null;
    this.nativeBarWidth = this.barHeight = this.barWidth = 0;
    this.scrollbarsClipped = !1;
    this.lineNumWidth = this.lineNumInnerWidth = this.lineNumChars = null;
    this.alignWidgets = !1;
    this.maxLine =
      this.cachedCharWidth =
      this.cachedTextHeight =
      this.cachedPaddingH =
        null;
    this.maxLineLength = 0;
    this.maxLineChanged = !1;
    this.wheelDX = this.wheelDY = this.wheelStartX = this.wheelStartY = null;
    this.shift = !1;
    this.activeTouch = this.selForContextMenu = null;
    c.init(this);
  }
  function zc(a) {
    a.doc.mode = q.getMode(a.options, a.doc.modeOption);
    eb(a);
  }
  function eb(a) {
    a.doc.iter(function (a) {
      a.stateAfter && (a.stateAfter = null);
      a.styles && (a.styles = null);
    });
    a.doc.frontier = a.doc.first;
    fb(a, 100);
    a.state.modeGen++;
    a.curOp && Q(a);
  }
  function Id(a) {
    var b = xa(a.display),
      c = a.options.lineWrapping,
      d = c && Math.max(5, a.display.scroller.clientWidth / gb(a.display) - 3);
    return function (e) {
      if (ya(a.doc, e)) return 0;
      var f = 0;
      if (e.widgets)
        for (var g = 0; g < e.widgets.length; g++)
          e.widgets[g].height && (f += e.widgets[g].height);
      return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b;
    };
  }
  function Ac(a) {
    var b = a.doc,
      c = Id(a);
    b.iter(function (a) {
      var b = c(a);
      b != a.height && ca(a, b);
    });
  }
  function Bd(a) {
    a.display.wrapper.className =
      a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      a.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    hb(a);
  }
  function ib(a) {
    Ad(a);
    Q(a);
    setTimeout(function () {
      Bc(a);
    }, 20);
  }
  function Ad(a) {
    var b = a.display.gutters,
      c = a.options.gutters;
    za(b);
    for (var d = 0; d < c.length; ++d) {
      var e = c[d],
        f = b.appendChild(t("div", null, "CodeMirror-gutter " + e));
      "CodeMirror-linenumbers" == e &&
        ((a.display.lineGutter = f),
        (f.style.width = (a.display.lineNumWidth || 1) + "px"));
    }
    b.style.display = d ? "" : "none";
    Cc(a);
  }
  function Cc(a) {
    a.display.sizer.style.marginLeft = a.display.gutters.offsetWidth + "px";
  }
  function Kb(a) {
    if (0 == a.height) return 0;
    for (var b = a.text.length, c, d = a; (c = Aa(d, !0)); )
      (c = c.find(0, !0)), (d = c.from.line), (b += c.from.ch - c.to.ch);
    for (d = a; (c = Aa(d, !1)); )
      (c = c.find(0, !0)),
        (b -= d.text.length - c.from.ch),
        (d = c.to.line),
        (b += d.text.length - c.to.ch);
    return b;
  }
  function Dc(a) {
    var b = a.display;
    a = a.doc;
    b.maxLine = u(a, a.first);
    b.maxLineLength = Kb(b.maxLine);
    b.maxLineChanged = !0;
    a.iter(function (a) {
      var d = Kb(a);
      d > b.maxLineLength && ((b.maxLineLength = d), (b.maxLine = a));
    });
  }
  function wc(a) {
    var b = D(a.gutters, "CodeMirror-linenumbers");
    -1 == b && a.lineNumbers
      ? (a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]))
      : -1 < b &&
        !a.lineNumbers &&
        ((a.gutters = a.gutters.slice(0)), a.gutters.splice(b, 1));
  }
  function jb(a) {
    var b = a.display,
      c = b.gutters.offsetWidth,
      d = Math.round(a.doc.height + Ec(a.display));
    return {
      clientHeight: b.scroller.clientHeight,
      viewHeight: b.wrapper.clientHeight,
      scrollWidth: b.scroller.scrollWidth,
      clientWidth: b.scroller.clientWidth,
      viewWidth: b.wrapper.clientWidth,
      barLeft: a.options.fixedGutter ? c : 0,
      docHeight: d,
      scrollHeight: d + da(a) + b.barHeight,
      nativeBarWidth: b.nativeBarWidth,
      gutterWidth: c,
    };
  }
  function Fc(a, b, c) {
    this.cm = c;
    var d = (this.vert = t(
        "div",
        [t("div", null, null, "min-width: 1px")],
        "CodeMirror-vscrollbar"
      )),
      e = (this.horiz = t(
        "div",
        [t("div", null, null, "height: 100%; min-height: 1px")],
        "CodeMirror-hscrollbar"
      ));
    a(d);
    a(e);
    v(d, "scroll", function () {
      d.clientHeight && b(d.scrollTop, "vertical");
    });
    v(e, "scroll", function () {
      e.clientWidth && b(e.scrollLeft, "horizontal");
    });
    this.checkedOverlay = !1;
    B &&
      8 > C &&
      (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
  }
  function Gc() {}
  function Cd(a) {
    a.display.scrollbars &&
      (a.display.scrollbars.clear(),
      a.display.scrollbars.addClass &&
        kb(a.display.wrapper, a.display.scrollbars.addClass));
    a.display.scrollbars = new q.scrollbarModel[a.options.scrollbarStyle](
      function (b) {
        a.display.wrapper.insertBefore(b, a.display.scrollbarFiller);
        v(b, "mousedown", function () {
          a.state.focused &&
            setTimeout(function () {
              a.display.input.focus();
            }, 0);
        });
        b.setAttribute("cm-not-content", "true");
      },
      function (b, c) {
        "horizontal" == c ? Ma(a, b) : lb(a, b);
      },
      a
    );
    a.display.scrollbars.addClass &&
      mb(a.display.wrapper, a.display.scrollbars.addClass);
  }
  function Na(a, b) {
    b || (b = jb(a));
    var c = a.display.barWidth,
      d = a.display.barHeight;
    Jd(a, b);
    for (
      var e = 0;
      (4 > e && c != a.display.barWidth) || d != a.display.barHeight;
      e++
    )
      c != a.display.barWidth && a.options.lineWrapping && Lb(a),
        Jd(a, jb(a)),
        (c = a.display.barWidth),
        (d = a.display.barHeight);
  }
  function Jd(a, b) {
    var c = a.display,
      d = c.scrollbars.update(b);
    c.sizer.style.paddingRight = (c.barWidth = d.right) + "px";
    c.sizer.style.paddingBottom = (c.barHeight = d.bottom) + "px";
    d.right && d.bottom
      ? ((c.scrollbarFiller.style.display = "block"),
        (c.scrollbarFiller.style.height = d.bottom + "px"),
        (c.scrollbarFiller.style.width = d.right + "px"))
      : (c.scrollbarFiller.style.display = "");
    d.bottom && a.options.coverGutterNextToScrollbar && a.options.fixedGutter
      ? ((c.gutterFiller.style.display = "block"),
        (c.gutterFiller.style.height = d.bottom + "px"),
        (c.gutterFiller.style.width = b.gutterWidth + "px"))
      : (c.gutterFiller.style.display = "");
  }
  function Hc(a, b, c) {
    var d = c && null != c.top ? Math.max(0, c.top) : a.scroller.scrollTop,
      d = Math.floor(d - a.lineSpace.offsetTop),
      e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight,
      d = Ba(b, d),
      e = Ba(b, e);
    if (c && c.ensure) {
      var f = c.ensure.from.line;
      c = c.ensure.to.line;
      f < d
        ? ((d = f), (e = Ba(b, ea(u(b, f)) + a.wrapper.clientHeight)))
        : Math.min(c, b.lastLine()) >= e &&
          ((d = Ba(b, ea(u(b, c)) - a.wrapper.clientHeight)), (e = c));
    }
    return { from: d, to: Math.max(e, d + 1) };
  }
  function Bc(a) {
    var b = a.display,
      c = b.view;
    if (b.alignWidgets || (b.gutters.firstChild && a.options.fixedGutter)) {
      for (
        var d = Ic(b) - b.scroller.scrollLeft + a.doc.scrollLeft,
          e = b.gutters.offsetWidth,
          f = d + "px",
          g = 0;
        g < c.length;
        g++
      )
        if (!c[g].hidden) {
          a.options.fixedGutter && c[g].gutter && (c[g].gutter.style.left = f);
          var h = c[g].alignable;
          if (h) for (var k = 0; k < h.length; k++) h[k].style.left = f;
        }
      a.options.fixedGutter && (b.gutters.style.left = d + e + "px");
    }
  }
  function Gd(a) {
    if (!a.options.lineNumbers) return !1;
    var b = a.doc,
      b = Jc(a.options, b.first + b.size - 1),
      c = a.display;
    if (b.length != c.lineNumChars) {
      var d = c.measure.appendChild(
          t("div", [t("div", b)], "CodeMirror-linenumber CodeMirror-gutter-elt")
        ),
        e = d.firstChild.offsetWidth,
        d = d.offsetWidth - e;
      c.lineGutter.style.width = "";
      c.lineNumInnerWidth = Math.max(e, c.lineGutter.offsetWidth - d) + 1;
      c.lineNumWidth = c.lineNumInnerWidth + d;
      c.lineNumChars = c.lineNumInnerWidth ? b.length : -1;
      c.lineGutter.style.width = c.lineNumWidth + "px";
      Cc(a);
      return !0;
    }
    return !1;
  }
  function Jc(a, b) {
    return String(a.lineNumberFormatter(b + a.firstLineNumber));
  }
  function Ic(a) {
    return (
      a.scroller.getBoundingClientRect().left -
      a.sizer.getBoundingClientRect().left
    );
  }
  function Mb(a, b, c) {
    var d = a.display;
    this.viewport = b;
    this.visible = Hc(d, a.doc, b);
    this.editorIsHidden = !d.wrapper.offsetWidth;
    this.wrapperHeight = d.wrapper.clientHeight;
    this.wrapperWidth = d.wrapper.clientWidth;
    this.oldDisplayWidth = pa(a);
    this.force = c;
    this.dims = Kc(a);
    this.events = [];
  }
  function Lc(a, b) {
    var c = a.display,
      d = a.doc;
    if (b.editorIsHidden) return qa(a), !1;
    if (
      !b.force &&
      b.visible.from >= c.viewFrom &&
      b.visible.to <= c.viewTo &&
      (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo) &&
      c.renderedView == c.view &&
      0 == Kd(a)
    )
      return !1;
    Gd(a) && (qa(a), (b.dims = Kc(a)));
    var e = d.first + d.size,
      f = Math.max(b.visible.from - a.options.viewportMargin, d.first),
      g = Math.min(e, b.visible.to + a.options.viewportMargin);
    c.viewFrom < f &&
      20 > f - c.viewFrom &&
      (f = Math.max(d.first, c.viewFrom));
    c.viewTo > g && 20 > c.viewTo - g && (g = Math.min(e, c.viewTo));
    ra && ((f = Mc(a.doc, f)), (g = Ld(a.doc, g)));
    d =
      f != c.viewFrom ||
      g != c.viewTo ||
      c.lastWrapHeight != b.wrapperHeight ||
      c.lastWrapWidth != b.wrapperWidth;
    e = a.display;
    0 == e.view.length || f >= e.viewTo || g <= e.viewFrom
      ? ((e.view = Nb(a, f, g)), (e.viewFrom = f))
      : (e.viewFrom > f
          ? (e.view = Nb(a, f, e.viewFrom).concat(e.view))
          : e.viewFrom < f && (e.view = e.view.slice(Ca(a, f))),
        (e.viewFrom = f),
        e.viewTo < g
          ? (e.view = e.view.concat(Nb(a, e.viewTo, g)))
          : e.viewTo > g && (e.view = e.view.slice(0, Ca(a, g))));
    e.viewTo = g;
    c.viewOffset = ea(u(a.doc, c.viewFrom));
    a.display.mover.style.top = c.viewOffset + "px";
    g = Kd(a);
    if (
      !d &&
      0 == g &&
      !b.force &&
      c.renderedView == c.view &&
      (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo)
    )
      return !1;
    f = fa();
    4 < g && (c.lineDiv.style.display = "none");
    uf(a, c.updateLineNumbers, b.dims);
    4 < g && (c.lineDiv.style.display = "");
    c.renderedView = c.view;
    f && fa() != f && f.offsetHeight && f.focus();
    za(c.cursorDiv);
    za(c.selectionDiv);
    c.gutters.style.height = 0;
    d &&
      ((c.lastWrapHeight = b.wrapperHeight),
      (c.lastWrapWidth = b.wrapperWidth),
      fb(a, 400));
    c.updateLineNumbers = null;
    return !0;
  }
  function Md(a, b) {
    for (var c = b.viewport, d = !0; ; d = !1) {
      if (!d || !a.options.lineWrapping || b.oldDisplayWidth == pa(a))
        if (
          (c &&
            null != c.top &&
            (c = {
              top: Math.min(a.doc.height + Ec(a.display) - Nc(a), c.top),
            }),
          (b.visible = Hc(a.display, a.doc, c)),
          b.visible.from >= a.display.viewFrom &&
            b.visible.to <= a.display.viewTo)
        )
          break;
      if (!Lc(a, b)) break;
      Lb(a);
      d = jb(a);
      nb(a);
      Oc(a, d);
      Na(a, d);
    }
    b.signal(a, "update", a);
    if (
      a.display.viewFrom != a.display.reportedViewFrom ||
      a.display.viewTo != a.display.reportedViewTo
    )
      b.signal(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo),
        (a.display.reportedViewFrom = a.display.viewFrom),
        (a.display.reportedViewTo = a.display.viewTo);
  }
  function Pc(a, b) {
    var c = new Mb(a, b);
    if (Lc(a, c)) {
      Lb(a);
      Md(a, c);
      var d = jb(a);
      nb(a);
      Oc(a, d);
      Na(a, d);
      c.finish();
    }
  }
  function Oc(a, b) {
    a.display.sizer.style.minHeight = b.docHeight + "px";
    var c = b.docHeight + a.display.barHeight;
    a.display.heightForcer.style.top = c + "px";
    a.display.gutters.style.height = Math.max(c + da(a), b.clientHeight) + "px";
  }
  function Lb(a) {
    a = a.display;
    for (var b = a.lineDiv.offsetTop, c = 0; c < a.view.length; c++) {
      var d = a.view[c],
        e;
      if (!d.hidden) {
        if (B && 8 > C) {
          var f = d.node.offsetTop + d.node.offsetHeight;
          e = f - b;
          b = f;
        } else (e = d.node.getBoundingClientRect()), (e = e.bottom - e.top);
        f = d.line.height - e;
        2 > e && (e = xa(a));
        if (0.001 < f || -0.001 > f)
          if ((ca(d.line, e), Nd(d.line), d.rest))
            for (e = 0; e < d.rest.length; e++) Nd(d.rest[e]);
      }
    }
  }
  function Nd(a) {
    if (a.widgets)
      for (var b = 0; b < a.widgets.length; ++b)
        a.widgets[b].height = a.widgets[b].node.offsetHeight;
  }
  function Kc(a) {
    for (
      var b = a.display,
        c = {},
        d = {},
        e = b.gutters.clientLeft,
        f = b.gutters.firstChild,
        g = 0;
      f;
      f = f.nextSibling, ++g
    )
      (c[a.options.gutters[g]] = f.offsetLeft + f.clientLeft + e),
        (d[a.options.gutters[g]] = f.clientWidth);
    return {
      fixedPos: Ic(b),
      gutterTotalWidth: b.gutters.offsetWidth,
      gutterLeft: c,
      gutterWidth: d,
      wrapperWidth: b.wrapper.clientWidth,
    };
  }
  function uf(a, b, c) {
    function d(b) {
      var c = b.nextSibling;
      J && W && a.display.currentWheelTarget == b
        ? (b.style.display = "none")
        : b.parentNode.removeChild(b);
      return c;
    }
    for (
      var e = a.display,
        f = a.options.lineNumbers,
        g = e.lineDiv,
        h = g.firstChild,
        k = e.view,
        e = e.viewFrom,
        l = 0;
      l < k.length;
      l++
    ) {
      var m = k[l];
      if (!m.hidden)
        if (m.node && m.node.parentNode == g) {
          for (; h != m.node; ) h = d(h);
          h = f && null != b && b <= e && m.lineNumber;
          m.changes &&
            (-1 < D(m.changes, "gutter") && (h = !1), Od(a, m, e, c));
          h &&
            (za(m.lineNumber),
            m.lineNumber.appendChild(
              document.createTextNode(Jc(a.options, e))
            ));
          h = m.node.nextSibling;
        } else {
          var p = vf(a, m, e, c);
          g.insertBefore(p, h);
        }
      e += m.size;
    }
    for (; h; ) h = d(h);
  }
  function Od(a, b, c, d) {
    for (var e = 0; e < b.changes.length; e++) {
      var f = b.changes[e];
      if ("text" == f) {
        var f = b,
          g = f.text.className,
          h = Pd(a, f);
        f.text == f.node && (f.node = h.pre);
        f.text.parentNode.replaceChild(h.pre, f.text);
        f.text = h.pre;
        h.bgClass != f.bgClass || h.textClass != f.textClass
          ? ((f.bgclassName = h.bgClass),
            (f.textclassName = h.textClass),
            Qc(f))
          : g && (f.text.className = g);
      } else if ("gutter" == f) Qd(a, b, c, d);
      else if ("class" == f) Qc(b);
      else if ("widget" == f) {
        f = a;
        g = b;
        h = d;
        g.alignable && (g.alignable = null);
        for (var k = g.node.firstChild, l = void 0; k; k = l)
          (l = k.nextSibling),
            "CodeMirror-linewidget" == k.className && g.node.removeChild(k);
        Rd(f, g, h);
      }
    }
    b.changes = null;
  }
  function Ob(a) {
    a.node == a.text &&
      ((a.node = t("div", null, null, "position: relative")),
      a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text),
      a.node.appendChild(a.text),
      B && 8 > C && (a.node.style.zIndex = 2));
    return a.node;
  }
  function Pd(a, b) {
    var c = a.display.externalMeasured;
    return c && c.line == b.line
      ? ((a.display.externalMeasured = null), (b.measure = c.measure), c.built)
      : Sd(a, b);
  }
  function Qc(a) {
    var b = a.bgClass
      ? a.bgClass + " " + (a.line.bgClass || "")
      : a.line.bgClass;
    b && (b += " CodeMirror-linebackground");
    if (a.background)
      b
        ? (a.background.className = b)
        : (a.background.parentNode.removeChild(a.background),
          (a.background = null));
    else if (b) {
      var c = Ob(a);
      a.background = c.insertBefore(t("div", null, b), c.firstChild);
    }
    a.line.wrapClass
      ? (Ob(a).className = a.line.wrapClass)
      : a.node != a.text && (a.node.className = "");
    a.text.className =
      (a.textClass
        ? a.textClass + " " + (a.line.textClass || "")
        : a.line.textClass) || "";
  }
  function Qd(a, b, c, d) {
    b.gutter && (b.node.removeChild(b.gutter), (b.gutter = null));
    var e = b.line.gutterMarkers;
    if (a.options.lineNumbers || e) {
      var f = Ob(b),
        g = (b.gutter = t(
          "div",
          null,
          "CodeMirror-gutter-wrapper",
          "left: " +
            (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) +
            "px; width: " +
            d.gutterTotalWidth +
            "px"
        ));
      a.display.input.setUneditable(g);
      f.insertBefore(g, b.text);
      b.line.gutterClass && (g.className += " " + b.line.gutterClass);
      !a.options.lineNumbers ||
        (e && e["CodeMirror-linenumbers"]) ||
        (b.lineNumber = g.appendChild(
          t(
            "div",
            Jc(a.options, c),
            "CodeMirror-linenumber CodeMirror-gutter-elt",
            "left: " +
              d.gutterLeft["CodeMirror-linenumbers"] +
              "px; width: " +
              a.display.lineNumInnerWidth +
              "px"
          )
        ));
      if (e)
        for (b = 0; b < a.options.gutters.length; ++b)
          (c = a.options.gutters[b]),
            (f = e.hasOwnProperty(c) && e[c]) &&
              g.appendChild(
                t(
                  "div",
                  [f],
                  "CodeMirror-gutter-elt",
                  "left: " +
                    d.gutterLeft[c] +
                    "px; width: " +
                    d.gutterWidth[c] +
                    "px"
                )
              );
    }
  }
  function vf(a, b, c, d) {
    var e = Pd(a, b);
    b.text = b.node = e.pre;
    e.bgClass && (b.bgclassName = e.bgClass);
    e.textClass && (b.textclassName = e.textClass);
    Qc(b);
    Qd(a, b, c, d);
    Rd(a, b, d);
    return b.node;
  }
  function Rd(a, b, c) {
    Td(a, b.line, b, c, !0);
    if (b.rest)
      for (var d = 0; d < b.rest.length; d++) Td(a, b.rest[d], b, c, !1);
  }
  function Td(a, b, c, d, e) {
    if (b.widgets) {
      var f = Ob(c),
        g = 0;
      for (b = b.widgets; g < b.length; ++g) {
        var h = b[g],
          k = t("div", [h.node], "CodeMirror-linewidget");
        h.handleMouseEvents || k.setAttribute("cm-ignore-events", "true");
        var l = h,
          m = k,
          p = d;
        if (l.noHScroll) {
          (c.alignable || (c.alignable = [])).push(m);
          var n = p.wrapperWidth;
          m.style.left = p.fixedPos + "px";
          l.coverGutter ||
            ((n -= p.gutterTotalWidth),
            (m.style.paddingLeft = p.gutterTotalWidth + "px"));
          m.style.width = n + "px";
        }
        l.coverGutter &&
          ((m.style.zIndex = 5),
          (m.style.position = "relative"),
          l.noHScroll || (m.style.marginLeft = -p.gutterTotalWidth + "px"));
        a.display.input.setUneditable(k);
        e && h.above ? f.insertBefore(k, c.gutter || c.text) : f.appendChild(k);
        L(h, "redraw");
      }
    }
  }
  function Rc(a) {
    return r(a.line, a.ch);
  }
  function Pb(a, b) {
    return 0 > y(a, b) ? b : a;
  }
  function Qb(a, b) {
    return 0 > y(a, b) ? a : b;
  }
  function Ud(a) {
    a.state.focused || (a.display.input.focus(), xc(a));
  }
  function Rb(a) {
    return a.options.readOnly || a.doc.cantEdit;
  }
  function Sc(a, b, c, d, e) {
    var f = a.doc;
    a.display.shift = !1;
    d || (d = f.sel);
    var g = sa(b),
      h = null;
    a.state.pasteIncoming &&
      1 < d.ranges.length &&
      (X && X.join("\n") == b
        ? (h = 0 == d.ranges.length % X.length && ob(X, sa))
        : g.length == d.ranges.length &&
          (h = ob(g, function (a) {
            return [a];
          })));
    for (var k = d.ranges.length - 1; 0 <= k; k--) {
      var l = d.ranges[k],
        m = l.from(),
        p = l.to();
      l.empty() &&
        (c && 0 < c
          ? (m = r(m.line, m.ch - c))
          : a.state.overwrite &&
            !a.state.pasteIncoming &&
            (p = r(
              p.line,
              Math.min(u(f, p.line).text.length, p.ch + A(g).length)
            )));
      var n = a.curOp.updateInput,
        m = {
          from: m,
          to: p,
          text: h ? h[k % h.length] : g,
          origin:
            e ||
            (a.state.pasteIncoming
              ? "paste"
              : a.state.cutIncoming
              ? "cut"
              : "+input"),
        };
      Oa(a.doc, m);
      L(a, "inputRead", a, m);
      if (
        b &&
        !a.state.pasteIncoming &&
        a.options.electricChars &&
        a.options.smartIndent &&
        100 > l.head.ch &&
        (!k || d.ranges[k - 1].head.line != l.head.line)
      ) {
        l = a.getModeAt(l.head);
        m = ta(m);
        p = !1;
        if (l.electricChars)
          for (var E = 0; E < l.electricChars.length; E++) {
            if (-1 < b.indexOf(l.electricChars.charAt(E))) {
              p = pb(a, m.line, "smart");
              break;
            }
          }
        else
          l.electricInput &&
            l.electricInput.test(u(f, m.line).text.slice(0, m.ch)) &&
            (p = pb(a, m.line, "smart"));
        p && L(a, "electricInput", a, m.line);
      }
    }
    Pa(a);
    a.curOp.updateInput = n;
    a.curOp.typing = !0;
    a.state.pasteIncoming = a.state.cutIncoming = !1;
  }
  function Vd(a) {
    for (var b = [], c = [], d = 0; d < a.doc.sel.ranges.length; d++) {
      var e = a.doc.sel.ranges[d].head.line,
        e = { anchor: r(e, 0), head: r(e + 1, 0) };
      c.push(e);
      b.push(a.getRange(e.anchor, e.head));
    }
    return { text: b, ranges: c };
  }
  function Wd(a) {
    a.setAttribute("autocorrect", "off");
    a.setAttribute("autocapitalize", "off");
    a.setAttribute("spellcheck", "false");
  }
  function Tc(a) {
    this.cm = a;
    this.prevInput = "";
    this.pollingFast = !1;
    this.polling = new bb();
    this.hasSelection = this.inaccurateSelection = !1;
    this.composing = null;
  }
  function Xd() {
    var a = t(
        "textarea",
        null,
        null,
        "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"
      ),
      b = t(
        "div",
        [a],
        null,
        "overflow: hidden; position: relative; width: 3px; height: 0px;"
      );
    J ? (a.style.width = "1000px") : a.setAttribute("wrap", "off");
    Qa && (a.style.border = "1px solid black");
    Wd(a);
    return b;
  }
  function Uc(a) {
    this.cm = a;
    this.lastAnchorNode =
      this.lastAnchorOffset =
      this.lastFocusNode =
      this.lastFocusOffset =
        null;
    this.polling = new bb();
    this.gracePeriod = !1;
  }
  function Yd(a, b) {
    var c = Vc(a, b.line);
    if (!c || c.hidden) return null;
    var d = u(a.doc, b.line),
      c = Zd(c, d, b.line);
    (d = Y(d)) && Sb(d, b.ch);
    d = $d(c.map, b.ch, "left");
    d.offset = "right" == d.collapse ? d.end : d.start;
    return d;
  }
  function Ra(a, b) {
    b && (a.bad = !0);
    return a;
  }
  function Tb(a, b, c) {
    var d;
    if (b == a.display.lineDiv) {
      d = a.display.lineDiv.childNodes[c];
      if (!d) return Ra(a.clipPos(r(a.display.viewTo - 1)), !0);
      b = null;
      c = 0;
    } else
      for (d = b; ; d = d.parentNode) {
        if (!d || d == a.display.lineDiv) return null;
        if (d.parentNode && d.parentNode == a.display.lineDiv) break;
      }
    for (var e = 0; e < a.display.view.length; e++) {
      var f = a.display.view[e];
      if (f.node == d) return wf(f, b, c);
    }
  }
  function wf(a, b, c) {
    function d(b, c, d) {
      for (var e = -1; e < (l ? l.length : 0); e++)
        for (var f = 0 > e ? k.map : l[e], g = 0; g < f.length; g += 3) {
          var h = f[g + 2];
          if (h == b || h == c) {
            c = F(0 > e ? a.line : a.rest[e]);
            e = f[g] + d;
            if (0 > d || h != b) e = f[g + (d ? 1 : 0)];
            return r(c, e);
          }
        }
    }
    var e = a.text.firstChild,
      f = !1;
    if (!b || !Wc(e, b)) return Ra(r(F(a.line), 0), !0);
    if (b == e && ((f = !0), (b = e.childNodes[c]), (c = 0), !b))
      return (c = a.rest ? A(a.rest) : a.line), Ra(r(F(c), c.text.length), f);
    var g = 3 == b.nodeType ? b : null,
      h = b;
    g ||
      1 != b.childNodes.length ||
      3 != b.firstChild.nodeType ||
      ((g = b.firstChild), c && (c = g.nodeValue.length));
    for (; h.parentNode != e; ) h = h.parentNode;
    var k = a.measure,
      l = k.maps;
    if ((b = d(g, h, c))) return Ra(b, f);
    e = h.nextSibling;
    for (g = g ? g.nodeValue.length - c : 0; e; e = e.nextSibling) {
      if ((b = d(e, e.firstChild, 0))) return Ra(r(b.line, b.ch - g), f);
      g += e.textContent.length;
    }
    h = h.previousSibling;
    for (g = c; h; h = h.previousSibling) {
      if ((b = d(h, h.firstChild, -1))) return Ra(r(b.line, b.ch + g), f);
      g += e.textContent.length;
    }
  }
  function xf(a, b, c, d, e) {
    function f(a) {
      return function (b) {
        return b.id == a;
      };
    }
    function g(b) {
      if (1 == b.nodeType) {
        var c = b.getAttribute("cm-text");
        if (null != c)
          "" == c && (c = b.textContent.replace(/\u200b/g, "")), (h += c);
        else {
          var c = b.getAttribute("cm-marker"),
            p;
          if (c)
            (b = a.findMarks(r(d, 0), r(e + 1, 0), f(+c))),
              b.length &&
                (p = b[0].find()) &&
                (h += Da(a.doc, p.from, p.to).join("\n"));
          else if ("false" != b.getAttribute("contenteditable")) {
            for (p = 0; p < b.childNodes.length; p++) g(b.childNodes[p]);
            /^(pre|div|p)$/i.test(b.nodeName) && (k = !0);
          }
        }
      } else 3 == b.nodeType && (b = b.nodeValue) && (k && ((h += "\n"), (k = !1)), (h += b));
    }
    for (var h = "", k = !1; ; ) {
      g(b);
      if (b == c) break;
      b = b.nextSibling;
    }
    return h;
  }
  function la(a, b) {
    this.ranges = a;
    this.primIndex = b;
  }
  function z(a, b) {
    this.anchor = a;
    this.head = b;
  }
  function Z(a, b) {
    var c = a[b];
    a.sort(function (a, b) {
      return y(a.from(), b.from());
    });
    b = D(a, c);
    for (c = 1; c < a.length; c++) {
      var d = a[c],
        e = a[c - 1];
      if (0 <= y(e.to(), d.from())) {
        var f = Qb(e.from(), d.from()),
          g = Pb(e.to(), d.to()),
          d = e.empty() ? d.from() == d.head : e.from() == e.head;
        c <= b && --b;
        a.splice(--c, 2, new z(d ? g : f, d ? f : g));
      }
    }
    return new la(a, b);
  }
  function ga(a, b) {
    return new la([new z(a, b || a)], 0);
  }
  function w(a, b) {
    if (b.line < a.first) return r(a.first, 0);
    var c = a.first + a.size - 1;
    if (b.line > c) return r(c, u(a, c).text.length);
    var c = u(a, b.line).text.length,
      d = b.ch,
      c = null == d || d > c ? r(b.line, c) : 0 > d ? r(b.line, 0) : b;
    return c;
  }
  function qb(a, b) {
    return b >= a.first && b < a.first + a.size;
  }
  function rb(a, b, c, d) {
    return (a.cm && a.cm.display.shift) || a.extend
      ? ((a = b.anchor),
        d &&
          ((b = 0 > y(c, a)),
          b != 0 > y(d, a) ? ((a = c), (c = d)) : b != 0 > y(c, d) && (c = d)),
        new z(a, c))
      : new z(d || c, c);
  }
  function Ub(a, b, c, d) {
    H(a, new la([rb(a, a.sel.primary(), b, c)], 0), d);
  }
  function ae(a, b, c) {
    for (var d = [], e = 0; e < a.sel.ranges.length; e++)
      d[e] = rb(a, a.sel.ranges[e], b[e], null);
    b = Z(d, a.sel.primIndex);
    H(a, b, c);
  }
  function Xc(a, b, c, d) {
    var e = a.sel.ranges.slice(0);
    e[b] = c;
    H(a, Z(e, a.sel.primIndex), d);
  }
  function yf(a, b) {
    var c = {
      ranges: b.ranges,
      update: function (b) {
        this.ranges = [];
        for (var c = 0; c < b.length; c++)
          this.ranges[c] = new z(w(a, b[c].anchor), w(a, b[c].head));
      },
    };
    K(a, "beforeSelectionChange", a, c);
    a.cm && K(a.cm, "beforeSelectionChange", a.cm, c);
    return c.ranges != b.ranges ? Z(c.ranges, c.ranges.length - 1) : b;
  }
  function be(a, b, c) {
    var d = a.history.done,
      e = A(d);
    e && e.ranges ? ((d[d.length - 1] = b), Vb(a, b, c)) : H(a, b, c);
  }
  function H(a, b, c) {
    Vb(a, b, c);
    b = a.sel;
    var d = a.cm ? a.cm.curOp.id : NaN,
      e = a.history,
      f = c && c.origin,
      g;
    if (
      !(g = d == e.lastSelOp) &&
      (g = f && e.lastSelOrigin == f) &&
      !(g = e.lastModTime == e.lastSelTime && e.lastOrigin == f)
    ) {
      g = A(e.done);
      var h = f.charAt(0);
      g =
        "*" == h ||
        ("+" == h &&
          g.ranges.length == b.ranges.length &&
          g.somethingSelected() == b.somethingSelected() &&
          new Date() - a.history.lastSelTime <=
            (a.cm ? a.cm.options.historyEventDelay : 500));
    }
    g ? (e.done[e.done.length - 1] = b) : Wb(b, e.done);
    e.lastSelTime = +new Date();
    e.lastSelOrigin = f;
    e.lastSelOp = d;
    c && !1 !== c.clearRedo && ce(e.undone);
  }
  function Vb(a, b, c) {
    if (
      S(a, "beforeSelectionChange") ||
      (a.cm && S(a.cm, "beforeSelectionChange"))
    )
      b = yf(a, b);
    var d =
      (c && c.bias) || (0 > y(b.primary().head, a.sel.primary().head) ? -1 : 1);
    de(a, ee(a, b, d, !0));
    (c && !1 === c.scroll) || !a.cm || Pa(a.cm);
  }
  function de(a, b) {
    b.equals(a.sel) ||
      ((a.sel = b),
      a.cm &&
        ((a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0), fe(a.cm)),
      L(a, "cursorActivity", a));
  }
  function ge(a) {
    de(a, ee(a, a.sel, null, !1), ha);
  }
  function ee(a, b, c, d) {
    for (var e, f = 0; f < b.ranges.length; f++) {
      var g = b.ranges[f],
        h = Xb(a, g.anchor, c, d),
        k = Xb(a, g.head, c, d);
      if (e || h != g.anchor || k != g.head)
        e || (e = b.ranges.slice(0, f)), (e[f] = new z(h, k));
    }
    return e ? Z(e, b.primIndex) : b;
  }
  function Xb(a, b, c, d) {
    var e = !1,
      f = b,
      g = c || 1;
    a.cantEdit = !1;
    a: for (;;) {
      var h = u(a, f.line);
      if (h.markedSpans)
        for (var k = 0; k < h.markedSpans.length; ++k) {
          var l = h.markedSpans[k],
            m = l.marker;
          if (
            (null == l.from ||
              (m.inclusiveLeft ? l.from <= f.ch : l.from < f.ch)) &&
            (null == l.to || (m.inclusiveRight ? l.to >= f.ch : l.to > f.ch))
          ) {
            if (d && (K(m, "beforeCursorEnter"), m.explicitlyCleared))
              if (h.markedSpans) {
                --k;
                continue;
              } else break;
            if (m.atomic) {
              k = m.find(0 > g ? -1 : 1);
              if (
                0 == y(k, f) &&
                ((k.ch += g),
                0 > k.ch
                  ? (k = k.line > a.first ? w(a, r(k.line - 1)) : null)
                  : k.ch > h.text.length &&
                    (k =
                      k.line < a.first + a.size - 1 ? r(k.line + 1, 0) : null),
                !k)
              ) {
                if (e) {
                  if (!d) return Xb(a, b, c, !0);
                  a.cantEdit = !0;
                  return r(a.first, 0);
                }
                e = !0;
                k = b;
                g = -g;
              }
              f = k;
              continue a;
            }
          }
        }
      return f;
    }
  }
  function nb(a) {
    a.display.input.showSelection(a.display.input.prepareSelection());
  }
  function he(a, b) {
    for (
      var c = a.doc,
        d = {},
        e = (d.cursors = document.createDocumentFragment()),
        f = (d.selection = document.createDocumentFragment()),
        g = 0;
      g < c.sel.ranges.length;
      g++
    )
      if (!1 !== b || g != c.sel.primIndex) {
        var h = c.sel.ranges[g],
          k = h.empty();
        if (k || a.options.showCursorWhenSelecting) {
          var l = a,
            m = e,
            p = ma(
              l,
              h.head,
              "div",
              null,
              null,
              !l.options.singleCursorHeightPerLine
            ),
            n = m.appendChild(t("div", " ", "CodeMirror-cursor"));
          n.style.left = p.left + "px";
          n.style.top = p.top + "px";
          n.style.height =
            Math.max(0, p.bottom - p.top) * l.options.cursorHeight + "px";
          p.other &&
            ((l = m.appendChild(
              t("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor")
            )),
            (l.style.display = ""),
            (l.style.left = p.other.left + "px"),
            (l.style.top = p.other.top + "px"),
            (l.style.height = 0.85 * (p.other.bottom - p.other.top) + "px"));
        }
        k || zf(a, h, f);
      }
    return d;
  }
  function zf(a, b, c) {
    function d(a, b, c, d) {
      0 > b && (b = 0);
      b = Math.round(b);
      d = Math.round(d);
      h.appendChild(
        t(
          "div",
          null,
          "CodeMirror-selected",
          "position: absolute; left: " +
            a +
            "px; top: " +
            b +
            "px; width: " +
            (null == c ? m - a : c) +
            "px; height: " +
            (d - b) +
            "px"
        )
      );
    }
    function e(b, c, e) {
      var f = u(g, b),
        h = f.text.length,
        k,
        p;
      Af(Y(f), c || 0, null == e ? h : e, function (g, q, t) {
        var u = Yb(a, r(b, g), "div", f, "left"),
          v,
          w;
        g == q
          ? ((v = u), (t = w = u.left))
          : ((v = Yb(a, r(b, q - 1), "div", f, "right")),
            "rtl" == t && ((t = u), (u = v), (v = t)),
            (t = u.left),
            (w = v.right));
        null == c && 0 == g && (t = l);
        3 < v.top - u.top &&
          (d(t, u.top, null, u.bottom),
          (t = l),
          u.bottom < v.top && d(t, u.bottom, null, v.top));
        null == e && q == h && (w = m);
        if (!k || u.top < k.top || (u.top == k.top && u.left < k.left)) k = u;
        if (
          !p ||
          v.bottom > p.bottom ||
          (v.bottom == p.bottom && v.right > p.right)
        )
          p = v;
        t < l + 1 && (t = l);
        d(t, v.top, w - t, v.bottom);
      });
      return { start: k, end: p };
    }
    var f = a.display,
      g = a.doc,
      h = document.createDocumentFragment(),
      k = ie(a.display),
      l = k.left,
      m = Math.max(f.sizerWidth, pa(a) - f.sizer.offsetLeft) - k.right,
      f = b.from();
    b = b.to();
    if (f.line == b.line) e(f.line, f.ch, b.ch);
    else {
      var p = u(g, f.line),
        k = u(g, b.line),
        k = ia(p) == ia(k),
        f = e(f.line, f.ch, k ? p.text.length + 1 : null).end;
      b = e(b.line, k ? 0 : null, b.ch).start;
      k &&
        (f.top < b.top - 2
          ? (d(f.right, f.top, null, f.bottom), d(l, b.top, b.left, b.bottom))
          : d(f.right, f.top, b.left - f.right, f.bottom));
      f.bottom < b.top && d(l, f.bottom, null, b.top);
    }
    c.appendChild(h);
  }
  function Yc(a) {
    if (a.state.focused) {
      var b = a.display;
      clearInterval(b.blinker);
      var c = !0;
      b.cursorDiv.style.visibility = "";
      0 < a.options.cursorBlinkRate
        ? (b.blinker = setInterval(function () {
            b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden";
          }, a.options.cursorBlinkRate))
        : 0 > a.options.cursorBlinkRate &&
          (b.cursorDiv.style.visibility = "hidden");
    }
  }
  function fb(a, b) {
    a.doc.mode.startState &&
      a.doc.frontier < a.display.viewTo &&
      a.state.highlight.set(b, cb(Bf, a));
  }
  function Bf(a) {
    var b = a.doc;
    b.frontier < b.first && (b.frontier = b.first);
    if (!(b.frontier >= a.display.viewTo)) {
      var c = +new Date() + a.options.workTime,
        d = Sa(b.mode, sb(a, b.frontier)),
        e = [];
      b.iter(
        b.frontier,
        Math.min(b.first + b.size, a.display.viewTo + 500),
        function (f) {
          if (b.frontier >= a.display.viewFrom) {
            var g = f.styles,
              h = je(a, f, d, !0);
            f.styles = h.styles;
            var k = f.styleClasses;
            (h = h.classes)
              ? (f.styleClasses = h)
              : k && (f.styleClasses = null);
            k =
              !g ||
              g.length != f.styles.length ||
              (k != h &&
                (!k ||
                  !h ||
                  k.bgClass != h.bgClass ||
                  k.textClass != h.textClass));
            for (h = 0; !k && h < g.length; ++h) k = g[h] != f.styles[h];
            k && e.push(b.frontier);
            f.stateAfter = Sa(b.mode, d);
          } else
            Zc(a, f.text, d),
              (f.stateAfter = 0 == b.frontier % 5 ? Sa(b.mode, d) : null);
          ++b.frontier;
          if (+new Date() > c) return fb(a, a.options.workDelay), !0;
        }
      );
      e.length &&
        T(a, function () {
          for (var b = 0; b < e.length; b++) na(a, e[b], "text");
        });
    }
  }
  function Cf(a, b, c) {
    for (
      var d, e, f = a.doc, g = c ? -1 : b - (a.doc.mode.innerMode ? 1e3 : 100);
      b > g;
      --b
    ) {
      if (b <= f.first) return f.first;
      var h = u(f, b - 1);
      if (h.stateAfter && (!c || b <= f.frontier)) return b;
      h = aa(h.text, null, a.options.tabSize);
      if (null == e || d > h) (e = b - 1), (d = h);
    }
    return e;
  }
  function sb(a, b, c) {
    var d = a.doc,
      e = a.display;
    if (!d.mode.startState) return !0;
    var f = Cf(a, b, c),
      g = f > d.first && u(d, f - 1).stateAfter,
      g = g ? Sa(d.mode, g) : Df(d.mode);
    d.iter(f, b, function (c) {
      Zc(a, c.text, g);
      c.stateAfter =
        f == b - 1 || 0 == f % 5 || (f >= e.viewFrom && f < e.viewTo)
          ? Sa(d.mode, g)
          : null;
      ++f;
    });
    c && (d.frontier = f);
    return g;
  }
  function Ec(a) {
    return a.mover.offsetHeight - a.lineSpace.offsetHeight;
  }
  function ie(a) {
    if (a.cachedPaddingH) return a.cachedPaddingH;
    var b = U(a.measure, t("pre", "x")),
      b = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle,
      b = { left: parseInt(b.paddingLeft), right: parseInt(b.paddingRight) };
    isNaN(b.left) || isNaN(b.right) || (a.cachedPaddingH = b);
    return b;
  }
  function da(a) {
    return Hd - a.display.nativeBarWidth;
  }
  function pa(a) {
    return a.display.scroller.clientWidth - da(a) - a.display.barWidth;
  }
  function Nc(a) {
    return a.display.scroller.clientHeight - da(a) - a.display.barHeight;
  }
  function Zd(a, b, c) {
    if (a.line == b) return { map: a.measure.map, cache: a.measure.cache };
    for (var d = 0; d < a.rest.length; d++)
      if (a.rest[d] == b)
        return { map: a.measure.maps[d], cache: a.measure.caches[d] };
    for (d = 0; d < a.rest.length; d++)
      if (F(a.rest[d]) > c)
        return {
          map: a.measure.maps[d],
          cache: a.measure.caches[d],
          before: !0,
        };
  }
  function Vc(a, b) {
    if (b >= a.display.viewFrom && b < a.display.viewTo)
      return a.display.view[Ca(a, b)];
    var c = a.display.externalMeasured;
    if (c && b >= c.lineN && b < c.lineN + c.size) return c;
  }
  function Zb(a, b) {
    var c = F(b),
      d = Vc(a, c);
    d && !d.text ? (d = null) : d && d.changes && Od(a, d, c, Kc(a));
    if (!d) {
      var e;
      e = ia(b);
      d = F(e);
      e = a.display.externalMeasured = new ke(a.doc, e, d);
      e.lineN = d;
      d = e.built = Sd(a, e);
      e.text = d.pre;
      U(a.display.lineMeasure, d.pre);
      d = e;
    }
    c = Zd(d, b, c);
    return {
      line: b,
      view: d,
      rect: null,
      map: c.map,
      cache: c.cache,
      before: c.before,
      hasHeights: !1,
    };
  }
  function $c(a, b, c, d, e) {
    b.before && (c = -1);
    var f = c + (d || "");
    if (b.cache.hasOwnProperty(f)) a = b.cache[f];
    else {
      b.rect || (b.rect = b.view.text.getBoundingClientRect());
      if (!b.hasHeights) {
        var g = b.view,
          h = b.rect,
          k = a.options.lineWrapping,
          l = k && pa(a);
        if (!g.measure.heights || (k && g.measure.width != l)) {
          var m = (g.measure.heights = []);
          if (k)
            for (
              g.measure.width = l,
                g = g.text.firstChild.getClientRects(),
                k = 0;
              k < g.length - 1;
              k++
            ) {
              var l = g[k],
                p = g[k + 1];
              2 < Math.abs(l.bottom - p.bottom) &&
                m.push((l.bottom + p.top) / 2 - h.top);
            }
          m.push(h.bottom - h.top);
        }
        b.hasHeights = !0;
      }
      g = d;
      k = $d(b.map, c, g);
      d = k.node;
      h = k.start;
      l = k.end;
      c = k.collapse;
      var n;
      if (3 == d.nodeType) {
        for (m = 0; 4 > m; m++) {
          for (; h && tb(b.line.text.charAt(k.coverStart + h)); ) --h;
          for (
            ;
            k.coverStart + l < k.coverEnd &&
            tb(b.line.text.charAt(k.coverStart + l));

          )
            ++l;
          if (B && 9 > C && 0 == h && l == k.coverEnd - k.coverStart)
            n = d.parentNode.getBoundingClientRect();
          else if (B && a.options.lineWrapping) {
            var E = Ea(d, h, l).getClientRects();
            n = E.length ? E["right" == g ? E.length - 1 : 0] : ad;
          } else n = Ea(d, h, l).getBoundingClientRect() || ad;
          if (n.left || n.right || 0 == h) break;
          l = h;
          --h;
          c = "right";
        }
        B &&
          11 > C &&
          ((E =
            !window.screen ||
            null == screen.logicalXDPI ||
            screen.logicalXDPI == screen.deviceXDPI) ||
            (null != bd
              ? (E = bd)
              : ((m = U(a.display.measure, t("span", "x"))),
                (E = m.getBoundingClientRect()),
                (m = Ea(m, 0, 1).getBoundingClientRect()),
                (E = bd = 1 < Math.abs(E.left - m.left))),
            (E = !E)),
          E ||
            ((E = screen.logicalXDPI / screen.deviceXDPI),
            (m = screen.logicalYDPI / screen.deviceYDPI),
            (n = {
              left: n.left * E,
              right: n.right * E,
              top: n.top * m,
              bottom: n.bottom * m,
            })));
      } else
        0 < h && (c = g = "right"),
          (n =
            a.options.lineWrapping && 1 < (E = d.getClientRects()).length
              ? E["right" == g ? E.length - 1 : 0]
              : d.getBoundingClientRect());
      !(B && 9 > C) ||
        h ||
        (n && (n.left || n.right)) ||
        (n = (n = d.parentNode.getClientRects()[0])
          ? {
              left: n.left,
              right: n.left + gb(a.display),
              top: n.top,
              bottom: n.bottom,
            }
          : ad);
      E = n.top - b.rect.top;
      d = n.bottom - b.rect.top;
      h = (E + d) / 2;
      g = b.view.measure.heights;
      for (m = 0; m < g.length - 1 && !(h < g[m]); m++);
      c = {
        left: ("right" == c ? n.right : n.left) - b.rect.left,
        right: ("left" == c ? n.left : n.right) - b.rect.left,
        top: m ? g[m - 1] : 0,
        bottom: g[m],
      };
      n.left || n.right || (c.bogus = !0);
      a.options.singleCursorHeightPerLine || ((c.rtop = E), (c.rbottom = d));
      a = c;
      a.bogus || (b.cache[f] = a);
    }
    return {
      left: a.left,
      right: a.right,
      top: e ? a.rtop : a.top,
      bottom: e ? a.rbottom : a.bottom,
    };
  }
  function $d(a, b, c) {
    for (var d, e, f, g, h = 0; h < a.length; h += 3) {
      var k = a[h],
        l = a[h + 1];
      if (b < k) (e = 0), (f = 1), (g = "left");
      else if (b < l) (e = b - k), (f = e + 1);
      else if (h == a.length - 3 || (b == l && a[h + 3] > b))
        (f = l - k), (e = f - 1), b >= l && (g = "right");
      if (null != e) {
        d = a[h + 2];
        k == l && c == (d.insertLeft ? "left" : "right") && (g = c);
        if ("left" == c && 0 == e)
          for (; h && a[h - 2] == a[h - 3] && a[h - 1].insertLeft; )
            (d = a[(h -= 3) + 2]), (g = "left");
        if ("right" == c && e == l - k)
          for (
            ;
            h < a.length - 3 && a[h + 3] == a[h + 4] && !a[h + 5].insertLeft;

          )
            (d = a[(h += 3) + 2]), (g = "right");
        break;
      }
    }
    return {
      node: d,
      start: e,
      end: f,
      collapse: g,
      coverStart: k,
      coverEnd: l,
    };
  }
  function le(a) {
    if (
      a.measure &&
      ((a.measure.cache = {}), (a.measure.heights = null), a.rest)
    )
      for (var b = 0; b < a.rest.length; b++) a.measure.caches[b] = {};
  }
  function me(a) {
    a.display.externalMeasure = null;
    za(a.display.lineMeasure);
    for (var b = 0; b < a.display.view.length; b++) le(a.display.view[b]);
  }
  function hb(a) {
    me(a);
    a.display.cachedCharWidth =
      a.display.cachedTextHeight =
      a.display.cachedPaddingH =
        null;
    a.options.lineWrapping || (a.display.maxLineChanged = !0);
    a.display.lineNumChars = null;
  }
  function cd(a, b, c, d) {
    if (b.widgets)
      for (var e = 0; e < b.widgets.length; ++e)
        if (b.widgets[e].above) {
          var f = ub(b.widgets[e]);
          c.top += f;
          c.bottom += f;
        }
    if ("line" == d) return c;
    d || (d = "local");
    b = ea(b);
    b =
      "local" == d
        ? b + a.display.lineSpace.offsetTop
        : b - a.display.viewOffset;
    if ("page" == d || "window" == d)
      (a = a.display.lineSpace.getBoundingClientRect()),
        (b +=
          a.top +
          ("window" == d
            ? 0
            : window.pageYOffset ||
              (document.documentElement || document.body).scrollTop)),
        (d =
          a.left +
          ("window" == d
            ? 0
            : window.pageXOffset ||
              (document.documentElement || document.body).scrollLeft)),
        (c.left += d),
        (c.right += d);
    c.top += b;
    c.bottom += b;
    return c;
  }
  function ne(a, b, c) {
    if ("div" == c) return b;
    var d = b.left;
    b = b.top;
    "page" == c
      ? ((d -=
          window.pageXOffset ||
          (document.documentElement || document.body).scrollLeft),
        (b -=
          window.pageYOffset ||
          (document.documentElement || document.body).scrollTop))
      : ("local" != c && c) ||
        ((c = a.display.sizer.getBoundingClientRect()),
        (d += c.left),
        (b += c.top));
    a = a.display.lineSpace.getBoundingClientRect();
    return { left: d - a.left, top: b - a.top };
  }
  function Yb(a, b, c, d, e) {
    d || (d = u(a.doc, b.line));
    var f = d;
    b = b.ch;
    d = $c(a, Zb(a, d), b, e);
    return cd(a, f, d, c);
  }
  function ma(a, b, c, d, e, f) {
    function g(b, g) {
      var h = $c(a, e, b, g ? "right" : "left", f);
      g ? (h.left = h.right) : (h.right = h.left);
      return cd(a, d, h, c);
    }
    function h(a, b) {
      var c = k[b],
        d = c.level % 2;
      a == dd(c) && b && c.level < k[b - 1].level
        ? ((c = k[--b]), (a = ed(c) - (c.level % 2 ? 0 : 1)), (d = !0))
        : a == ed(c) &&
          b < k.length - 1 &&
          c.level < k[b + 1].level &&
          ((c = k[++b]), (a = dd(c) - (c.level % 2)), (d = !1));
      return d && a == c.to && a > c.from ? g(a - 1) : g(a, d);
    }
    d = d || u(a.doc, b.line);
    e || (e = Zb(a, d));
    var k = Y(d);
    b = b.ch;
    if (!k) return g(b);
    var l = Sb(k, b),
      l = h(b, l);
    null != vb && (l.other = h(b, vb));
    return l;
  }
  function oe(a, b) {
    var c = 0;
    b = w(a.doc, b);
    a.options.lineWrapping || (c = gb(a.display) * b.ch);
    var d = u(a.doc, b.line),
      e = ea(d) + a.display.lineSpace.offsetTop;
    return { left: c, right: c, top: e, bottom: e + d.height };
  }
  function $b(a, b, c, d) {
    a = r(a, b);
    a.xRel = d;
    c && (a.outside = !0);
    return a;
  }
  function fd(a, b, c) {
    var d = a.doc;
    c += a.display.viewOffset;
    if (0 > c) return $b(d.first, 0, !0, -1);
    var e = Ba(d, c),
      f = d.first + d.size - 1;
    if (e > f) return $b(d.first + d.size - 1, u(d, f).text.length, !0, 1);
    0 > b && (b = 0);
    for (d = u(d, e); ; )
      if (
        ((e = Ef(a, d, e, b, c)),
        (f = (d = Aa(d, !1)) && d.find(0, !0)),
        d && (e.ch > f.from.ch || (e.ch == f.from.ch && 0 < e.xRel)))
      )
        e = F((d = f.to.line));
      else return e;
  }
  function Ef(a, b, c, d, e) {
    function f(d) {
      d = ma(a, r(c, d), "line", b, l);
      h = !0;
      if (g > d.bottom) return d.left - k;
      if (g < d.top) return d.left + k;
      h = !1;
      return d.left;
    }
    var g = e - ea(b),
      h = !1,
      k = 2 * a.display.wrapper.clientWidth,
      l = Zb(a, b),
      m = Y(b),
      p = b.text.length;
    e = ac(b);
    var n = bc(b),
      E = f(e),
      q = h,
      t = f(n),
      u = h;
    if (d > t) return $b(c, n, u, 1);
    for (;;) {
      if (m ? n == e || n == gd(b, e, 1) : 1 >= n - e) {
        m = d < E || d - E <= t - d ? e : n;
        for (d -= m == e ? E : t; tb(b.text.charAt(m)); ) ++m;
        return $b(c, m, m == e ? q : u, -1 > d ? -1 : 1 < d ? 1 : 0);
      }
      var v = Math.ceil(p / 2),
        w = e + v;
      if (m) for (var w = e, x = 0; x < v; ++x) w = gd(b, w, 1);
      x = f(w);
      if (x > d) {
        n = w;
        t = x;
        if ((u = h)) t += 1e3;
        p = v;
      } else (e = w), (E = x), (q = h), (p -= v);
    }
  }
  function xa(a) {
    if (null != a.cachedTextHeight) return a.cachedTextHeight;
    if (null == Fa) {
      Fa = t("pre");
      for (var b = 0; 49 > b; ++b)
        Fa.appendChild(document.createTextNode("x")), Fa.appendChild(t("br"));
      Fa.appendChild(document.createTextNode("x"));
    }
    U(a.measure, Fa);
    b = Fa.offsetHeight / 50;
    3 < b && (a.cachedTextHeight = b);
    za(a.measure);
    return b || 1;
  }
  function gb(a) {
    if (null != a.cachedCharWidth) return a.cachedCharWidth;
    var b = t("span", "xxxxxxxxxx"),
      c = t("pre", [b]);
    U(a.measure, c);
    b = b.getBoundingClientRect();
    b = (b.right - b.left) / 10;
    2 < b && (a.cachedCharWidth = b);
    return b || 10;
  }
  function Ja(a) {
    a.curOp = {
      cm: a,
      viewChanged: !1,
      startHeight: a.doc.height,
      forceUpdate: !1,
      updateInput: null,
      typing: !1,
      changeObjs: null,
      cursorActivityHandlers: null,
      cursorActivityCalled: 0,
      selectionChanged: !1,
      updateMaxLine: !1,
      scrollLeft: null,
      scrollTop: null,
      scrollToPos: null,
      focus: !1,
      id: ++Ff,
    };
    Ta
      ? Ta.ops.push(a.curOp)
      : (a.curOp.ownsGroup = Ta = { ops: [a.curOp], delayedCallbacks: [] });
  }
  function La(a) {
    if ((a = a.curOp.ownsGroup))
      try {
        var b = a.delayedCallbacks,
          c = 0;
        do {
          for (; c < b.length; c++) b[c]();
          for (var d = 0; d < a.ops.length; d++) {
            var e = a.ops[d];
            if (e.cursorActivityHandlers)
              for (; e.cursorActivityCalled < e.cursorActivityHandlers.length; )
                e.cursorActivityHandlers[e.cursorActivityCalled++](e.cm);
          }
        } while (c < b.length);
      } finally {
        Ta = null;
        for (b = 0; b < a.ops.length; b++) a.ops[b].cm.curOp = null;
        a = a.ops;
        for (b = 0; b < a.length; b++) {
          var e = a[b],
            c = e.cm,
            f = (d = c.display);
          !f.scrollbarsClipped &&
            f.scroller.offsetWidth &&
            ((f.nativeBarWidth =
              f.scroller.offsetWidth - f.scroller.clientWidth),
            (f.heightForcer.style.height = da(c) + "px"),
            (f.sizer.style.marginBottom = -f.nativeBarWidth + "px"),
            (f.sizer.style.borderRightWidth = da(c) + "px"),
            (f.scrollbarsClipped = !0));
          e.updateMaxLine && Dc(c);
          e.mustUpdate =
            e.viewChanged ||
            e.forceUpdate ||
            null != e.scrollTop ||
            (e.scrollToPos &&
              (e.scrollToPos.from.line < d.viewFrom ||
                e.scrollToPos.to.line >= d.viewTo)) ||
            (d.maxLineChanged && c.options.lineWrapping);
          e.update =
            e.mustUpdate &&
            new Mb(
              c,
              e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos },
              e.forceUpdate
            );
        }
        for (b = 0; b < a.length; b++)
          (e = a[b]), (e.updatedDisplay = e.mustUpdate && Lc(e.cm, e.update));
        for (b = 0; b < a.length; b++)
          if (
            ((e = a[b]),
            (c = e.cm),
            (d = c.display),
            e.updatedDisplay && Lb(c),
            (e.barMeasure = jb(c)),
            d.maxLineChanged &&
              !c.options.lineWrapping &&
              ((f = void 0),
              (f = d.maxLine.text.length),
              (f = $c(c, Zb(c, d.maxLine), f, void 0)),
              (e.adjustWidthTo = f.left + 3),
              (c.display.sizerWidth = e.adjustWidthTo),
              (e.barMeasure.scrollWidth = Math.max(
                d.scroller.clientWidth,
                d.sizer.offsetLeft +
                  e.adjustWidthTo +
                  da(c) +
                  c.display.barWidth
              )),
              (e.maxScrollLeft = Math.max(
                0,
                d.sizer.offsetLeft + e.adjustWidthTo - pa(c)
              ))),
            e.updatedDisplay || e.selectionChanged)
          )
            e.preparedSelection = d.input.prepareSelection();
        for (b = 0; b < a.length; b++)
          (e = a[b]),
            (c = e.cm),
            null != e.adjustWidthTo &&
              ((c.display.sizer.style.minWidth = e.adjustWidthTo + "px"),
              e.maxScrollLeft < c.doc.scrollLeft &&
                Ma(
                  c,
                  Math.min(c.display.scroller.scrollLeft, e.maxScrollLeft),
                  !0
                ),
              (c.display.maxLineChanged = !1)),
            e.preparedSelection &&
              c.display.input.showSelection(e.preparedSelection),
            e.updatedDisplay && Oc(c, e.barMeasure),
            (e.updatedDisplay || e.startHeight != c.doc.height) &&
              Na(c, e.barMeasure),
            e.selectionChanged && Yc(c),
            c.state.focused && e.updateInput && c.display.input.reset(e.typing),
            e.focus && e.focus == fa() && Ud(e.cm);
        for (b = 0; b < a.length; b++) {
          e = a[b];
          c = e.cm;
          d = c.display;
          f = c.doc;
          e.updatedDisplay && Md(c, e.update);
          null == d.wheelStartX ||
            (null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos) ||
            (d.wheelStartX = d.wheelStartY = null);
          null == e.scrollTop ||
            (d.scroller.scrollTop == e.scrollTop && !e.forceScroll) ||
            ((f.scrollTop = Math.max(
              0,
              Math.min(
                d.scroller.scrollHeight - d.scroller.clientHeight,
                e.scrollTop
              )
            )),
            d.scrollbars.setScrollTop(f.scrollTop),
            (d.scroller.scrollTop = f.scrollTop));
          null == e.scrollLeft ||
            (d.scroller.scrollLeft == e.scrollLeft && !e.forceScroll) ||
            ((f.scrollLeft = Math.max(
              0,
              Math.min(d.scroller.scrollWidth - pa(c), e.scrollLeft)
            )),
            d.scrollbars.setScrollLeft(f.scrollLeft),
            (d.scroller.scrollLeft = f.scrollLeft),
            Bc(c));
          if (e.scrollToPos) {
            var g = void 0,
              h = w(f, e.scrollToPos.from),
              g = w(f, e.scrollToPos.to),
              k = e.scrollToPos.margin;
            null == k && (k = 0);
            for (var l = 0; 5 > l; l++) {
              var m = !1,
                p = ma(c, h),
                n = g && g != h ? ma(c, g) : p,
                n = cc(
                  c,
                  Math.min(p.left, n.left),
                  Math.min(p.top, n.top) - k,
                  Math.max(p.left, n.left),
                  Math.max(p.bottom, n.bottom) + k
                ),
                q = c.doc.scrollTop,
                r = c.doc.scrollLeft;
              null != n.scrollTop &&
                (lb(c, n.scrollTop),
                1 < Math.abs(c.doc.scrollTop - q) && (m = !0));
              null != n.scrollLeft &&
                (Ma(c, n.scrollLeft),
                1 < Math.abs(c.doc.scrollLeft - r) && (m = !0));
              if (!m) break;
            }
            g = p;
            e.scrollToPos.isCursor &&
              c.state.focused &&
              (ja(c, "scrollCursorIntoView") ||
                ((k = c.display),
                (l = k.sizer.getBoundingClientRect()),
                (h = null),
                0 > g.top + l.top
                  ? (h = !0)
                  : g.bottom + l.top >
                      (window.innerHeight ||
                        document.documentElement.clientHeight) && (h = !1),
                null == h ||
                  Gf ||
                  ((g = t(
                    "div",
                    "​",
                    null,
                    "position: absolute; top: " +
                      (g.top - k.viewOffset - c.display.lineSpace.offsetTop) +
                      "px; height: " +
                      (g.bottom - g.top + da(c) + k.barHeight) +
                      "px; left: " +
                      g.left +
                      "px; width: 2px;"
                  )),
                  c.display.lineSpace.appendChild(g),
                  g.scrollIntoView(h),
                  c.display.lineSpace.removeChild(g))));
          }
          h = e.maybeHiddenMarkers;
          g = e.maybeUnhiddenMarkers;
          if (h)
            for (k = 0; k < h.length; ++k) h[k].lines.length || K(h[k], "hide");
          if (g)
            for (k = 0; k < g.length; ++k)
              g[k].lines.length && K(g[k], "unhide");
          d.wrapper.offsetHeight &&
            (f.scrollTop = c.display.scroller.scrollTop);
          e.changeObjs && K(c, "changes", c, e.changeObjs);
          e.update && e.update.finish();
        }
      }
  }
  function T(a, b) {
    if (a.curOp) return b();
    Ja(a);
    try {
      return b();
    } finally {
      La(a);
    }
  }
  function G(a, b) {
    return function () {
      if (a.curOp) return b.apply(a, arguments);
      Ja(a);
      try {
        return b.apply(a, arguments);
      } finally {
        La(a);
      }
    };
  }
  function M(a) {
    return function () {
      if (this.curOp) return a.apply(this, arguments);
      Ja(this);
      try {
        return a.apply(this, arguments);
      } finally {
        La(this);
      }
    };
  }
  function N(a) {
    return function () {
      var b = this.cm;
      if (!b || b.curOp) return a.apply(this, arguments);
      Ja(b);
      try {
        return a.apply(this, arguments);
      } finally {
        La(b);
      }
    };
  }
  function ke(a, b, c) {
    for (var d = (this.line = b), e; (d = Aa(d, !1)); )
      (d = d.find(1, !0).line), (e || (e = [])).push(d);
    this.size = (this.rest = e) ? F(A(this.rest)) - c + 1 : 1;
    this.node = this.text = null;
    this.hidden = ya(a, b);
  }
  function Nb(a, b, c) {
    var d = [],
      e;
    for (e = b; e < c; )
      (b = new ke(a.doc, u(a.doc, e), e)), (e += b.size), d.push(b);
    return d;
  }
  function Q(a, b, c, d) {
    null == b && (b = a.doc.first);
    null == c && (c = a.doc.first + a.doc.size);
    d || (d = 0);
    var e = a.display;
    d &&
      c < e.viewTo &&
      (null == e.updateLineNumbers || e.updateLineNumbers > b) &&
      (e.updateLineNumbers = b);
    a.curOp.viewChanged = !0;
    if (b >= e.viewTo) ra && Mc(a.doc, b) < e.viewTo && qa(a);
    else if (c <= e.viewFrom)
      ra && Ld(a.doc, c + d) > e.viewFrom
        ? qa(a)
        : ((e.viewFrom += d), (e.viewTo += d));
    else if (b <= e.viewFrom && c >= e.viewTo) qa(a);
    else if (b <= e.viewFrom) {
      var f = dc(a, c, c + d, 1);
      f
        ? ((e.view = e.view.slice(f.index)),
          (e.viewFrom = f.lineN),
          (e.viewTo += d))
        : qa(a);
    } else if (c >= e.viewTo)
      (f = dc(a, b, b, -1))
        ? ((e.view = e.view.slice(0, f.index)), (e.viewTo = f.lineN))
        : qa(a);
    else {
      var f = dc(a, b, b, -1),
        g = dc(a, c, c + d, 1);
      f && g
        ? ((e.view = e.view
            .slice(0, f.index)
            .concat(Nb(a, f.lineN, g.lineN))
            .concat(e.view.slice(g.index))),
          (e.viewTo += d))
        : qa(a);
    }
    if ((a = e.externalMeasured))
      c < a.lineN
        ? (a.lineN += d)
        : b < a.lineN + a.size && (e.externalMeasured = null);
  }
  function na(a, b, c) {
    a.curOp.viewChanged = !0;
    var d = a.display,
      e = a.display.externalMeasured;
    e && b >= e.lineN && b < e.lineN + e.size && (d.externalMeasured = null);
    b < d.viewFrom ||
      b >= d.viewTo ||
      ((a = d.view[Ca(a, b)]),
      null != a.node &&
        ((a = a.changes || (a.changes = [])), -1 == D(a, c) && a.push(c)));
  }
  function qa(a) {
    a.display.viewFrom = a.display.viewTo = a.doc.first;
    a.display.view = [];
    a.display.viewOffset = 0;
  }
  function Ca(a, b) {
    if (b >= a.display.viewTo) return null;
    b -= a.display.viewFrom;
    if (0 > b) return null;
    for (var c = a.display.view, d = 0; d < c.length; d++)
      if (((b -= c[d].size), 0 > b)) return d;
  }
  function dc(a, b, c, d) {
    var e = Ca(a, b),
      f = a.display.view;
    if (!ra || c == a.doc.first + a.doc.size) return { index: e, lineN: c };
    for (var g = 0, h = a.display.viewFrom; g < e; g++) h += f[g].size;
    if (h != b) {
      if (0 < d) {
        if (e == f.length - 1) return null;
        b = h + f[e].size - b;
        e++;
      } else b = h - b;
      c += b;
    }
    for (; Mc(a.doc, c) != c; ) {
      if (e == (0 > d ? 0 : f.length - 1)) return null;
      c += d * f[e - (0 > d ? 1 : 0)].size;
      e += d;
    }
    return { index: e, lineN: c };
  }
  function Kd(a) {
    a = a.display.view;
    for (var b = 0, c = 0; c < a.length; c++) {
      var d = a[c];
      d.hidden || (d.node && !d.changes) || ++b;
    }
    return b;
  }
  function sf(a) {
    function b() {
      d.activeTouch &&
        ((e = setTimeout(function () {
          d.activeTouch = null;
        }, 1e3)),
        (f = d.activeTouch),
        (f.end = +new Date()));
    }
    function c(a, b) {
      if (null == b.left) return !0;
      var c = b.left - a.left,
        d = b.top - a.top;
      return 400 < c * c + d * d;
    }
    var d = a.display;
    v(d.scroller, "mousedown", G(a, pe));
    B && 11 > C
      ? v(
          d.scroller,
          "dblclick",
          G(a, function (b) {
            if (!ja(a, b)) {
              var c = Ua(a, b);
              !c ||
                hd(a, b, "gutterClick", !0, L) ||
                oa(a.display, b) ||
                (O(b), (b = a.findWordAt(c)), Ub(a.doc, b.anchor, b.head));
            }
          })
        )
      : v(d.scroller, "dblclick", function (b) {
          ja(a, b) || O(b);
        });
    id ||
      v(d.scroller, "contextmenu", function (b) {
        qe(a, b);
      });
    var e,
      f = { end: 0 };
    v(d.scroller, "touchstart", function (a) {
      var b;
      1 != a.touches.length
        ? (b = !1)
        : ((b = a.touches[0]), (b = 1 >= b.radiusX && 1 >= b.radiusY));
      b ||
        (clearTimeout(e),
        (b = +new Date()),
        (d.activeTouch = {
          start: b,
          moved: !1,
          prev: 300 >= b - f.end ? f : null,
        }),
        1 == a.touches.length &&
          ((d.activeTouch.left = a.touches[0].pageX),
          (d.activeTouch.top = a.touches[0].pageY)));
    });
    v(d.scroller, "touchmove", function () {
      d.activeTouch && (d.activeTouch.moved = !0);
    });
    v(d.scroller, "touchend", function (e) {
      var f = d.activeTouch;
      if (
        f &&
        !oa(d, e) &&
        null != f.left &&
        !f.moved &&
        300 > new Date() - f.start
      ) {
        var g = a.coordsChar(d.activeTouch, "page"),
          f =
            !f.prev || c(f, f.prev)
              ? new z(g, g)
              : !f.prev.prev || c(f, f.prev.prev)
              ? a.findWordAt(g)
              : new z(r(g.line, 0), w(a.doc, r(g.line + 1, 0)));
        a.setSelection(f.anchor, f.head);
        a.focus();
        O(e);
      }
      b();
    });
    v(d.scroller, "touchcancel", b);
    v(d.scroller, "scroll", function () {
      d.scroller.clientHeight &&
        (lb(a, d.scroller.scrollTop),
        Ma(a, d.scroller.scrollLeft, !0),
        K(a, "scroll", a));
    });
    v(d.scroller, "mousewheel", function (b) {
      re(a, b);
    });
    v(d.scroller, "DOMMouseScroll", function (b) {
      re(a, b);
    });
    v(d.wrapper, "scroll", function () {
      d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
    });
    d.dragFunctions = {
      simple: function (b) {
        ja(a, b) || jd(b);
      },
      start: function (b) {
        if (B && (!a.state.draggingText || 100 > +new Date() - se)) jd(b);
        else if (
          !ja(a, b) &&
          !oa(a.display, b) &&
          (b.dataTransfer.setData("Text", a.getSelection()),
          b.dataTransfer.setDragImage && !te)
        ) {
          var c = t("img", null, null, "position: fixed; left: 0; top: 0;");
          c.src =
            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d";
          ba &&
            ((c.width = c.height = 1),
            a.display.wrapper.appendChild(c),
            (c._top = c.offsetTop));
          b.dataTransfer.setDragImage(c, 0, 0);
          ba && c.parentNode.removeChild(c);
        }
      },
      drop: G(a, Hf),
    };
    var g = d.input.getField();
    v(g, "keyup", function (b) {
      ue.call(a, b);
    });
    v(g, "keydown", G(a, ve));
    v(g, "keypress", G(a, we));
    v(g, "focus", cb(xc, a));
    v(g, "blur", cb(db, a));
  }
  function If(a) {
    var b = a.display;
    if (
      b.lastWrapHeight != b.wrapper.clientHeight ||
      b.lastWrapWidth != b.wrapper.clientWidth
    )
      (b.cachedCharWidth = b.cachedTextHeight = b.cachedPaddingH = null),
        (b.scrollbarsClipped = !1),
        a.setSize();
  }
  function oa(a, b) {
    for (var c = b.target || b.srcElement; c != a.wrapper; c = c.parentNode)
      if (
        !c ||
        (1 == c.nodeType && "true" == c.getAttribute("cm-ignore-events")) ||
        (c.parentNode == a.sizer && c != a.mover)
      )
        return !0;
  }
  function Ua(a, b, c, d) {
    var e = a.display;
    if (
      !c &&
      "true" == (b.target || b.srcElement).getAttribute("cm-not-content")
    )
      return null;
    var f, g;
    c = e.lineSpace.getBoundingClientRect();
    try {
      (f = b.clientX - c.left), (g = b.clientY - c.top);
    } catch (h) {
      return null;
    }
    b = fd(a, f, g);
    var k;
    d &&
      1 == b.xRel &&
      (k = u(a.doc, b.line).text).length == b.ch &&
      ((d = aa(k, k.length, a.options.tabSize) - k.length),
      (b = r(
        b.line,
        Math.max(0, Math.round((f - ie(a.display).left) / gb(a.display)) - d)
      )));
    return b;
  }
  function pe(a) {
    var b = this.display;
    if (!((b.activeTouch && b.input.supportsTouch()) || ja(this, a)))
      if (((b.shift = a.shiftKey), oa(b, a)))
        J ||
          ((b.scroller.draggable = !1),
          setTimeout(function () {
            b.scroller.draggable = !0;
          }, 100));
      else if (!hd(this, a, "gutterClick", !0, L)) {
        var c = Ua(this, a);
        window.focus();
        switch (xe(a)) {
          case 1:
            c
              ? Jf(this, a, c)
              : (a.target || a.srcElement) == b.scroller && O(a);
            break;
          case 2:
            J && (this.state.lastMiddleDown = +new Date());
            c && Ub(this.doc, c);
            setTimeout(function () {
              b.input.focus();
            }, 20);
            O(a);
            break;
          case 3:
            id ? qe(this, a) : Kf(this);
        }
      }
  }
  function Jf(a, b, c) {
    B ? setTimeout(cb(Ud, a), 0) : (a.curOp.focus = fa());
    var d = +new Date(),
      e;
    ec && ec.time > d - 400 && 0 == y(ec.pos, c)
      ? (e = "triple")
      : fc && fc.time > d - 400 && 0 == y(fc.pos, c)
      ? ((e = "double"), (ec = { time: d, pos: c }))
      : ((e = "single"), (fc = { time: d, pos: c }));
    var d = a.doc.sel,
      f = W ? b.metaKey : b.ctrlKey,
      g;
    a.options.dragDrop &&
    Lf &&
    !Rb(a) &&
    "single" == e &&
    -1 < (g = d.contains(c)) &&
    !d.ranges[g].empty()
      ? Mf(a, b, c, f)
      : Nf(a, b, c, e, f);
  }
  function Mf(a, b, c, d) {
    var e = a.display,
      f = +new Date(),
      g = G(a, function (h) {
        J && (e.scroller.draggable = !1);
        a.state.draggingText = !1;
        ka(document, "mouseup", g);
        ka(e.scroller, "drop", g);
        10 >
          Math.abs(b.clientX - h.clientX) + Math.abs(b.clientY - h.clientY) &&
          (O(h),
          !d && +new Date() - 200 < f && Ub(a.doc, c),
          J || (B && 9 == C)
            ? setTimeout(function () {
                document.body.focus();
                e.input.focus();
              }, 20)
            : e.input.focus());
      });
    J && (e.scroller.draggable = !0);
    a.state.draggingText = g;
    e.scroller.dragDrop && e.scroller.dragDrop();
    v(document, "mouseup", g);
    v(e.scroller, "drop", g);
  }
  function Nf(a, b, c, d, e) {
    function f(b) {
      if (0 != y(x, b))
        if (((x = b), "rect" == d)) {
          for (
            var e = [],
              f = a.options.tabSize,
              g = aa(u(l, c.line).text, c.ch, f),
              h = aa(u(l, b.line).text, b.ch, f),
              k = Math.min(g, h),
              g = Math.max(g, h),
              h = Math.min(c.line, b.line),
              q = Math.min(a.lastLine(), Math.max(c.line, b.line));
            h <= q;
            h++
          ) {
            var E = u(l, h).text,
              t = ye(E, k, f);
            k == g
              ? e.push(new z(r(h, t), r(h, t)))
              : E.length > t && e.push(new z(r(h, t), r(h, ye(E, g, f))));
          }
          e.length || e.push(new z(c, c));
          H(l, Z(n.ranges.slice(0, p).concat(e), p), {
            origin: "*mouse",
            scroll: !1,
          });
          a.scrollIntoView(b);
        } else
          (e = m),
            (f = e.anchor),
            (k = b),
            "single" != d &&
              ((b =
                "double" == d
                  ? a.findWordAt(b)
                  : new z(r(b.line, 0), w(l, r(b.line + 1, 0)))),
              0 < y(b.anchor, f)
                ? ((k = b.head), (f = Qb(e.from(), b.anchor)))
                : ((k = b.anchor), (f = Pb(e.to(), b.head)))),
            (e = n.ranges.slice(0)),
            (e[p] = new z(w(l, f), k)),
            H(l, Z(e, p), kd);
    }
    function g(b) {
      var c = ++A,
        e = Ua(a, b, !0, "rect" == d);
      if (e)
        if (0 != y(e, x)) {
          a.curOp.focus = fa();
          f(e);
          var h = Hc(k, l);
          (e.line >= h.to || e.line < h.from) &&
            setTimeout(
              G(a, function () {
                A == c && g(b);
              }),
              150
            );
        } else {
          var m = b.clientY < B.top ? -20 : b.clientY > B.bottom ? 20 : 0;
          m &&
            setTimeout(
              G(a, function () {
                A == c && ((k.scroller.scrollTop += m), g(b));
              }),
              50
            );
        }
    }
    function h(a) {
      A = Infinity;
      O(a);
      k.input.focus();
      ka(document, "mousemove", F);
      ka(document, "mouseup", C);
      l.history.lastSelOrigin = null;
    }
    var k = a.display,
      l = a.doc;
    O(b);
    var m,
      p,
      n = l.sel,
      q = n.ranges;
    e && !b.shiftKey
      ? ((p = l.sel.contains(c)), (m = -1 < p ? q[p] : new z(c, c)))
      : ((m = l.sel.primary()), (p = l.sel.primIndex));
    if (b.altKey)
      (d = "rect"), e || (m = new z(c, c)), (c = Ua(a, b, !0, !0)), (p = -1);
    else if ("double" == d) {
      var t = a.findWordAt(c);
      m = a.display.shift || l.extend ? rb(l, m, t.anchor, t.head) : t;
    } else
      "triple" == d
        ? ((t = new z(r(c.line, 0), w(l, r(c.line + 1, 0)))),
          (m = a.display.shift || l.extend ? rb(l, m, t.anchor, t.head) : t))
        : (m = rb(l, m, c));
    e
      ? -1 == p
        ? ((p = q.length),
          H(l, Z(q.concat([m]), p), { scroll: !1, origin: "*mouse" }))
        : 1 < q.length && q[p].empty() && "single" == d && !b.shiftKey
        ? (H(l, Z(q.slice(0, p).concat(q.slice(p + 1)), 0)), (n = l.sel))
        : Xc(l, p, m, kd)
      : ((p = 0), H(l, new la([m], 0), kd), (n = l.sel));
    var x = c,
      B = k.wrapper.getBoundingClientRect(),
      A = 0,
      F = G(a, function (a) {
        xe(a) ? g(a) : h(a);
      }),
      C = G(a, h);
    v(document, "mousemove", F);
    v(document, "mouseup", C);
  }
  function hd(a, b, c, d, e) {
    try {
      var f = b.clientX,
        g = b.clientY;
    } catch (h) {
      return !1;
    }
    if (f >= Math.floor(a.display.gutters.getBoundingClientRect().right))
      return !1;
    d && O(b);
    d = a.display;
    var k = d.lineDiv.getBoundingClientRect();
    if (g > k.bottom || !S(a, c)) return ld(b);
    g -= k.top - d.viewOffset;
    for (k = 0; k < a.options.gutters.length; ++k) {
      var l = d.gutters.childNodes[k];
      if (l && l.getBoundingClientRect().right >= f)
        return (
          (f = Ba(a.doc, g)), e(a, c, a, f, a.options.gutters[k], b), ld(b)
        );
    }
  }
  function Hf(a) {
    var b = this;
    if (!ja(b, a) && !oa(b.display, a)) {
      O(a);
      B && (se = +new Date());
      var c = Ua(b, a, !0),
        d = a.dataTransfer.files;
      if (c && !Rb(b))
        if (d && d.length && window.FileReader && window.File) {
          var e = d.length,
            f = Array(e),
            g = 0;
          a = function (a, d) {
            var h = new FileReader();
            h.onload = G(b, function () {
              f[d] = h.result;
              if (++g == e) {
                c = w(b.doc, c);
                var a = {
                  from: c,
                  to: c,
                  text: sa(f.join("\n")),
                  origin: "paste",
                };
                Oa(b.doc, a);
                be(b.doc, ga(c, ta(a)));
              }
            });
            h.readAsText(a);
          };
          for (var h = 0; h < e; ++h) a(d[h], h);
        } else if (b.state.draggingText && -1 < b.doc.sel.contains(c))
          b.state.draggingText(a),
            setTimeout(function () {
              b.display.input.focus();
            }, 20);
        else
          try {
            if ((f = a.dataTransfer.getData("Text"))) {
              if (b.state.draggingText && (W ? !a.altKey : !a.ctrlKey))
                var k = b.listSelections();
              Vb(b.doc, ga(c, c));
              if (k)
                for (h = 0; h < k.length; ++h)
                  wb(b.doc, "", k[h].anchor, k[h].head, "drag");
              b.replaceSelection(f, "around", "paste");
              b.display.input.focus();
            }
          } catch (l) {}
    }
  }
  function lb(a, b) {
    2 > Math.abs(a.doc.scrollTop - b) ||
      ((a.doc.scrollTop = b),
      wa || Pc(a, { top: b }),
      a.display.scroller.scrollTop != b && (a.display.scroller.scrollTop = b),
      a.display.scrollbars.setScrollTop(b),
      wa && Pc(a),
      fb(a, 100));
  }
  function Ma(a, b, c) {
    (c ? b == a.doc.scrollLeft : 2 > Math.abs(a.doc.scrollLeft - b)) ||
      ((b = Math.min(
        b,
        a.display.scroller.scrollWidth - a.display.scroller.clientWidth
      )),
      (a.doc.scrollLeft = b),
      Bc(a),
      a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b),
      a.display.scrollbars.setScrollLeft(b));
  }
  function re(a, b) {
    var c = ze(b),
      d = c.x,
      c = c.y,
      e = a.display,
      f = e.scroller;
    if (
      (d && f.scrollWidth > f.clientWidth) ||
      (c && f.scrollHeight > f.clientHeight)
    ) {
      if (c && W && J) {
        var g = b.target,
          h = e.view;
        a: for (; g != f; g = g.parentNode)
          for (var k = 0; k < h.length; k++)
            if (h[k].node == g) {
              a.display.currentWheelTarget = g;
              break a;
            }
      }
      !d || wa || ba || null == R
        ? (c &&
            null != R &&
            ((g = c * R),
            (h = a.doc.scrollTop),
            (k = h + e.wrapper.clientHeight),
            0 > g
              ? (h = Math.max(0, h + g - 50))
              : (k = Math.min(a.doc.height, k + g + 50)),
            Pc(a, { top: h, bottom: k })),
          20 > gc &&
            (null == e.wheelStartX
              ? ((e.wheelStartX = f.scrollLeft),
                (e.wheelStartY = f.scrollTop),
                (e.wheelDX = d),
                (e.wheelDY = c),
                setTimeout(function () {
                  if (null != e.wheelStartX) {
                    var a = f.scrollLeft - e.wheelStartX,
                      b = f.scrollTop - e.wheelStartY,
                      a =
                        (b && e.wheelDY && b / e.wheelDY) ||
                        (a && e.wheelDX && a / e.wheelDX);
                    e.wheelStartX = e.wheelStartY = null;
                    a && ((R = (R * gc + a) / (gc + 1)), ++gc);
                  }
                }, 200))
              : ((e.wheelDX += d), (e.wheelDY += c))))
        : (c &&
            lb(
              a,
              Math.max(
                0,
                Math.min(f.scrollTop + c * R, f.scrollHeight - f.clientHeight)
              )
            ),
          Ma(
            a,
            Math.max(
              0,
              Math.min(f.scrollLeft + d * R, f.scrollWidth - f.clientWidth)
            )
          ),
          O(b),
          (e.wheelStartX = null));
    }
  }
  function hc(a, b, c) {
    if ("string" == typeof b && ((b = ic[b]), !b)) return !1;
    a.display.input.ensurePolled();
    var d = a.display.shift,
      e = !1;
    try {
      Rb(a) && (a.state.suppressEdits = !0),
        c && (a.display.shift = !1),
        (e = b(a) != Ae);
    } finally {
      (a.display.shift = d), (a.state.suppressEdits = !1);
    }
    return e;
  }
  function Of(a, b, c) {
    for (var d = 0; d < a.state.keyMaps.length; d++) {
      var e = xb(b, a.state.keyMaps[d], c, a);
      if (e) return e;
    }
    return (
      (a.options.extraKeys && xb(b, a.options.extraKeys, c, a)) ||
      xb(b, a.options.keyMap, c, a)
    );
  }
  function jc(a, b, c, d) {
    var e = a.state.keySeq;
    if (e) {
      if (Pf(b)) return "handled";
      Qf.set(50, function () {
        a.state.keySeq == e &&
          ((a.state.keySeq = null), a.display.input.reset());
      });
      b = e + " " + b;
    }
    d = Of(a, b, d);
    "multi" == d && (a.state.keySeq = b);
    "handled" == d && L(a, "keyHandled", a, b, c);
    if ("handled" == d || "multi" == d) O(c), Yc(a);
    return e && !d && /\'$/.test(b) ? (O(c), !0) : !!d;
  }
  function Be(a, b) {
    var c = Rf(b, !0);
    return c
      ? b.shiftKey && !a.state.keySeq
        ? jc(a, "Shift-" + c, b, function (b) {
            return hc(a, b, !0);
          }) ||
          jc(a, c, b, function (b) {
            if ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion)
              return hc(a, b);
          })
        : jc(a, c, b, function (b) {
            return hc(a, b);
          })
      : !1;
  }
  function Sf(a, b, c) {
    return jc(a, "'" + c + "'", b, function (b) {
      return hc(a, b, !0);
    });
  }
  function ve(a) {
    this.curOp.focus = fa();
    if (!ja(this, a)) {
      B && 11 > C && 27 == a.keyCode && (a.returnValue = !1);
      var b = a.keyCode;
      this.display.shift = 16 == b || a.shiftKey;
      var c = Be(this, a);
      ba &&
        ((md = c ? b : null),
        !c &&
          88 == b &&
          !Ce &&
          (W ? a.metaKey : a.ctrlKey) &&
          this.replaceSelection("", null, "cut"));
      18 != b ||
        /\bCodeMirror-crosshair\b/.test(this.display.lineDiv.className) ||
        Tf(this);
    }
  }
  function Tf(a) {
    function b(a) {
      (18 != a.keyCode && a.altKey) ||
        (kb(c, "CodeMirror-crosshair"),
        ka(document, "keyup", b),
        ka(document, "mouseover", b));
    }
    var c = a.display.lineDiv;
    mb(c, "CodeMirror-crosshair");
    v(document, "keyup", b);
    v(document, "mouseover", b);
  }
  function ue(a) {
    16 == a.keyCode && (this.doc.sel.shift = !1);
    ja(this, a);
  }
  function we(a) {
    if (
      !(
        oa(this.display, a) ||
        ja(this, a) ||
        (a.ctrlKey && !a.altKey) ||
        (W && a.metaKey)
      )
    ) {
      var b = a.keyCode,
        c = a.charCode;
      if (ba && b == md) (md = null), O(a);
      else if (!ba || (a.which && !(10 > a.which)) || !Be(this, a))
        if (((b = String.fromCharCode(null == c ? b : c)), !Sf(this, a, b)))
          this.display.input.onKeyPress(a);
    }
  }
  function Kf(a) {
    a.state.delayingBlurEvent = !0;
    setTimeout(function () {
      a.state.delayingBlurEvent && ((a.state.delayingBlurEvent = !1), db(a));
    }, 100);
  }
  function xc(a) {
    a.state.delayingBlurEvent && (a.state.delayingBlurEvent = !1);
    "nocursor" != a.options.readOnly &&
      (a.state.focused ||
        (K(a, "focus", a),
        (a.state.focused = !0),
        mb(a.display.wrapper, "CodeMirror-focused"),
        a.curOp ||
          a.display.selForContextMenu == a.doc.sel ||
          (a.display.input.reset(),
          J &&
            setTimeout(function () {
              a.display.input.reset(!0);
            }, 20)),
        a.display.input.receivedFocus()),
      Yc(a));
  }
  function db(a) {
    a.state.delayingBlurEvent ||
      (a.state.focused &&
        (K(a, "blur", a),
        (a.state.focused = !1),
        kb(a.display.wrapper, "CodeMirror-focused")),
      clearInterval(a.display.blinker),
      setTimeout(function () {
        a.state.focused || (a.display.shift = !1);
      }, 150));
  }
  function qe(a, b) {
    var c;
    (c = oa(a.display, b)) ||
      (c = S(a, "gutterContextMenu")
        ? hd(a, b, "gutterContextMenu", !1, K)
        : !1);
    if (!c) a.display.input.onContextMenu(b);
  }
  function De(a, b) {
    if (0 > y(a, b.from)) return a;
    if (0 >= y(a, b.to)) return ta(b);
    var c = a.line + b.text.length - (b.to.line - b.from.line) - 1,
      d = a.ch;
    a.line == b.to.line && (d += ta(b).ch - b.to.ch);
    return r(c, d);
  }
  function nd(a, b) {
    for (var c = [], d = 0; d < a.sel.ranges.length; d++) {
      var e = a.sel.ranges[d];
      c.push(new z(De(e.anchor, b), De(e.head, b)));
    }
    return Z(c, a.sel.primIndex);
  }
  function Ee(a, b, c) {
    return a.line == b.line
      ? r(c.line, a.ch - b.ch + c.ch)
      : r(c.line + (a.line - b.line), a.ch);
  }
  function Fe(a, b, c) {
    b = {
      canceled: !1,
      from: b.from,
      to: b.to,
      text: b.text,
      origin: b.origin,
      cancel: function () {
        this.canceled = !0;
      },
    };
    c &&
      (b.update = function (b, c, f, g) {
        b && (this.from = w(a, b));
        c && (this.to = w(a, c));
        f && (this.text = f);
        void 0 !== g && (this.origin = g);
      });
    K(a, "beforeChange", a, b);
    a.cm && K(a.cm, "beforeChange", a.cm, b);
    return b.canceled
      ? null
      : { from: b.from, to: b.to, text: b.text, origin: b.origin };
  }
  function Oa(a, b, c) {
    if (a.cm) {
      if (!a.cm.curOp) return G(a.cm, Oa)(a, b, c);
      if (a.cm.state.suppressEdits) return;
    }
    if (S(a, "beforeChange") || (a.cm && S(a.cm, "beforeChange")))
      if (((b = Fe(a, b, !0)), !b)) return;
    if ((c = Ge && !c && Uf(a, b.from, b.to)))
      for (var d = c.length - 1; 0 <= d; --d)
        He(a, { from: c[d].from, to: c[d].to, text: d ? [""] : b.text });
    else He(a, b);
  }
  function He(a, b) {
    if (1 != b.text.length || "" != b.text[0] || 0 != y(b.from, b.to)) {
      var c = nd(a, b);
      Ie(a, b, c, a.cm ? a.cm.curOp.id : NaN);
      yb(a, b, c, od(a, b));
      var d = [];
      Ga(a, function (a, c) {
        c || -1 != D(d, a.history) || (Je(a.history, b), d.push(a.history));
        yb(a, b, null, od(a, b));
      });
    }
  }
  function kc(a, b, c) {
    if (!a.cm || !a.cm.state.suppressEdits) {
      for (
        var d = a.history,
          e,
          f = a.sel,
          g = "undo" == b ? d.done : d.undone,
          h = "undo" == b ? d.undone : d.done,
          k = 0;
        k < g.length &&
        ((e = g[k]), c ? !e.ranges || e.equals(a.sel) : e.ranges);
        k++
      );
      if (k != g.length) {
        for (d.lastOrigin = d.lastSelOrigin = null; ; )
          if (((e = g.pop()), e.ranges)) {
            Wb(e, h);
            if (c && !e.equals(a.sel)) {
              H(a, e, { clearRedo: !1 });
              return;
            }
            f = e;
          } else break;
        c = [];
        Wb(f, h);
        h.push({ changes: c, generation: d.generation });
        d.generation = e.generation || ++d.maxGeneration;
        d = S(a, "beforeChange") || (a.cm && S(a.cm, "beforeChange"));
        for (k = e.changes.length - 1; 0 <= k; --k) {
          var l = e.changes[k];
          l.origin = b;
          if (d && !Fe(a, l, !1)) {
            g.length = 0;
            break;
          }
          c.push(pd(a, l));
          f = k ? nd(a, l) : A(g);
          yb(a, l, f, Ke(a, l));
          !k && a.cm && a.cm.scrollIntoView({ from: l.from, to: ta(l) });
          var m = [];
          Ga(a, function (a, b) {
            b || -1 != D(m, a.history) || (Je(a.history, l), m.push(a.history));
            yb(a, l, null, Ke(a, l));
          });
        }
      }
    }
  }
  function Le(a, b) {
    if (
      0 != b &&
      ((a.first += b),
      (a.sel = new la(
        ob(a.sel.ranges, function (a) {
          return new z(
            r(a.anchor.line + b, a.anchor.ch),
            r(a.head.line + b, a.head.ch)
          );
        }),
        a.sel.primIndex
      )),
      a.cm)
    ) {
      Q(a.cm, a.first, a.first - b, b);
      for (var c = a.cm.display, d = c.viewFrom; d < c.viewTo; d++)
        na(a.cm, d, "gutter");
    }
  }
  function yb(a, b, c, d) {
    if (a.cm && !a.cm.curOp) return G(a.cm, yb)(a, b, c, d);
    if (b.to.line < a.first)
      Le(a, b.text.length - 1 - (b.to.line - b.from.line));
    else if (!(b.from.line > a.lastLine())) {
      if (b.from.line < a.first) {
        var e = b.text.length - 1 - (a.first - b.from.line);
        Le(a, e);
        b = {
          from: r(a.first, 0),
          to: r(b.to.line + e, b.to.ch),
          text: [A(b.text)],
          origin: b.origin,
        };
      }
      e = a.lastLine();
      b.to.line > e &&
        (b = {
          from: b.from,
          to: r(e, u(a, e).text.length),
          text: [b.text[0]],
          origin: b.origin,
        });
      b.removed = Da(a, b.from, b.to);
      c || (c = nd(a, b));
      a.cm ? Vf(a.cm, b, d) : qd(a, b, d);
      Vb(a, c, ha);
    }
  }
  function Vf(a, b, c) {
    var d = a.doc,
      e = a.display,
      f = b.from,
      g = b.to,
      h = !1,
      k = f.line;
    a.options.lineWrapping ||
      ((k = F(ia(u(d, f.line)))),
      d.iter(k, g.line + 1, function (a) {
        if (a == e.maxLine) return (h = !0);
      }));
    -1 < d.sel.contains(b.from, b.to) && fe(a);
    qd(d, b, c, Id(a));
    a.options.lineWrapping ||
      (d.iter(k, f.line + b.text.length, function (a) {
        var b = Kb(a);
        b > e.maxLineLength &&
          ((e.maxLine = a),
          (e.maxLineLength = b),
          (e.maxLineChanged = !0),
          (h = !1));
      }),
      h && (a.curOp.updateMaxLine = !0));
    d.frontier = Math.min(d.frontier, f.line);
    fb(a, 400);
    c = b.text.length - (g.line - f.line) - 1;
    b.full
      ? Q(a)
      : f.line != g.line || 1 != b.text.length || Me(a.doc, b)
      ? Q(a, f.line, g.line + 1, c)
      : na(a, f.line, "text");
    c = S(a, "changes");
    if ((d = S(a, "change")) || c)
      (b = {
        from: f,
        to: g,
        text: b.text,
        removed: b.removed,
        origin: b.origin,
      }),
        d && L(a, "change", a, b),
        c && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push(b);
    a.display.selForContextMenu = null;
  }
  function wb(a, b, c, d, e) {
    d || (d = c);
    if (0 > y(d, c)) {
      var f = d;
      d = c;
      c = f;
    }
    "string" == typeof b && (b = sa(b));
    Oa(a, { from: c, to: d, text: b, origin: e });
  }
  function cc(a, b, c, d, e) {
    var f = a.display,
      g = xa(a.display);
    0 > c && (c = 0);
    var h =
        a.curOp && null != a.curOp.scrollTop
          ? a.curOp.scrollTop
          : f.scroller.scrollTop,
      k = Nc(a),
      l = {};
    e - c > k && (e = c + k);
    var m = a.doc.height + Ec(f),
      p = c < g,
      g = e > m - g;
    c < h
      ? (l.scrollTop = p ? 0 : c)
      : e > h + k &&
        ((c = Math.min(c, (g ? m : e) - k)), c != h && (l.scrollTop = c));
    h =
      a.curOp && null != a.curOp.scrollLeft
        ? a.curOp.scrollLeft
        : f.scroller.scrollLeft;
    a = pa(a) - (a.options.fixedGutter ? f.gutters.offsetWidth : 0);
    (f = d - b > a) && (d = b + a);
    10 > b
      ? (l.scrollLeft = 0)
      : b < h
      ? (l.scrollLeft = Math.max(0, b - (f ? 0 : 10)))
      : d > a + h - 3 && (l.scrollLeft = d + (f ? 0 : 10) - a);
    return l;
  }
  function lc(a, b, c) {
    (null == b && null == c) || mc(a);
    null != b &&
      (a.curOp.scrollLeft =
        (null == a.curOp.scrollLeft ? a.doc.scrollLeft : a.curOp.scrollLeft) +
        b);
    null != c &&
      (a.curOp.scrollTop =
        (null == a.curOp.scrollTop ? a.doc.scrollTop : a.curOp.scrollTop) + c);
  }
  function Pa(a) {
    mc(a);
    var b = a.getCursor(),
      c = b,
      d = b;
    a.options.lineWrapping ||
      ((c = b.ch ? r(b.line, b.ch - 1) : b), (d = r(b.line, b.ch + 1)));
    a.curOp.scrollToPos = {
      from: c,
      to: d,
      margin: a.options.cursorScrollMargin,
      isCursor: !0,
    };
  }
  function mc(a) {
    var b = a.curOp.scrollToPos;
    if (b) {
      a.curOp.scrollToPos = null;
      var c = oe(a, b.from),
        d = oe(a, b.to),
        b = cc(
          a,
          Math.min(c.left, d.left),
          Math.min(c.top, d.top) - b.margin,
          Math.max(c.right, d.right),
          Math.max(c.bottom, d.bottom) + b.margin
        );
      a.scrollTo(b.scrollLeft, b.scrollTop);
    }
  }
  function pb(a, b, c, d) {
    var e = a.doc,
      f;
    null == c && (c = "add");
    "smart" == c && (e.mode.indent ? (f = sb(a, b)) : (c = "prev"));
    var g = a.options.tabSize,
      h = u(e, b),
      k = aa(h.text, null, g);
    h.stateAfter && (h.stateAfter = null);
    var l = h.text.match(/^\s*/)[0],
      m;
    if (!d && !/\S/.test(h.text)) (m = 0), (c = "not");
    else if (
      "smart" == c &&
      ((m = e.mode.indent(f, h.text.slice(l.length), h.text)),
      m == Ae || 150 < m)
    ) {
      if (!d) return;
      c = "prev";
    }
    "prev" == c
      ? (m = b > e.first ? aa(u(e, b - 1).text, null, g) : 0)
      : "add" == c
      ? (m = k + a.options.indentUnit)
      : "subtract" == c
      ? (m = k - a.options.indentUnit)
      : "number" == typeof c && (m = k + c);
    m = Math.max(0, m);
    c = "";
    d = 0;
    if (a.options.indentWithTabs)
      for (a = Math.floor(m / g); a; --a) (d += g), (c += "\t");
    d < m && (c += Ne(m - d));
    if (c != l)
      return (
        wb(e, c, r(b, 0), r(b, l.length), "+input"), (h.stateAfter = null), !0
      );
    for (a = 0; a < e.sel.ranges.length; a++)
      if (((g = e.sel.ranges[a]), g.head.line == b && g.head.ch < l.length)) {
        d = r(b, l.length);
        Xc(e, a, new z(d, d));
        break;
      }
  }
  function nc(a, b, c, d) {
    var e = b,
      f = b;
    "number" == typeof b
      ? (f = u(a, Math.max(a.first, Math.min(b, a.first + a.size - 1))))
      : (e = F(b));
    if (null == e) return null;
    d(f, e) && a.cm && na(a.cm, e, c);
    return f;
  }
  function Va(a, b) {
    for (var c = a.doc.sel.ranges, d = [], e = 0; e < c.length; e++) {
      for (var f = b(c[e]); d.length && 0 >= y(f.from, A(d).to); ) {
        var g = d.pop();
        if (0 > y(g.from, f.from)) {
          f.from = g.from;
          break;
        }
      }
      d.push(f);
    }
    T(a, function () {
      for (var b = d.length - 1; 0 <= b; b--)
        wb(a.doc, "", d[b].from, d[b].to, "+delete");
      Pa(a);
    });
  }
  function rd(a, b, c, d, e) {
    function f(b) {
      var d = (e ? gd : Oe)(l, h, c, !0);
      if (null == d) {
        if ((b = !b))
          (b = g + c),
            b < a.first || b >= a.first + a.size
              ? (b = m = !1)
              : ((g = b), (b = l = u(a, b)));
        if (b) h = e ? (0 > c ? bc : ac)(l) : 0 > c ? l.text.length : 0;
        else return (m = !1);
      } else h = d;
      return !0;
    }
    var g = b.line,
      h = b.ch,
      k = c,
      l = u(a, g),
      m = !0;
    if ("char" == d) f();
    else if ("column" == d) f(!0);
    else if ("word" == d || "group" == d) {
      var p = null;
      d = "group" == d;
      b = a.cm && a.cm.getHelper(b, "wordChars");
      for (var n = !0; !(0 > c) || f(!n); n = !1) {
        var q = l.text.charAt(h) || "\n",
          q = oc(q, b)
            ? "w"
            : d && "\n" == q
            ? "n"
            : !d || /\s/.test(q)
            ? null
            : "p";
        !d || n || q || (q = "s");
        if (p && p != q) {
          0 > c && ((c = 1), f());
          break;
        }
        q && (p = q);
        if (0 < c && !f(!n)) break;
      }
    }
    k = Xb(a, r(g, h), k, !0);
    m || (k.hitSide = !0);
    return k;
  }
  function Pe(a, b, c, d) {
    var e = a.doc,
      f = b.left,
      g;
    "page" == d
      ? ((g = Math.min(
          a.display.wrapper.clientHeight,
          window.innerHeight || document.documentElement.clientHeight
        )),
        (g = b.top + c * (g - (0 > c ? 1.5 : 0.5) * xa(a.display))))
      : "line" == d && (g = 0 < c ? b.bottom + 3 : b.top - 3);
    for (;;) {
      b = fd(a, f, g);
      if (!b.outside) break;
      if (0 > c ? 0 >= g : g >= e.height) {
        b.hitSide = !0;
        break;
      }
      g += 5 * c;
    }
    return b;
  }
  function x(a, b, c, d) {
    q.defaults[a] = b;
    c &&
      (Ka[a] = d
        ? function (a, b, d) {
            d != Fd && c(a, b, d);
          }
        : c);
  }
  function Wf(a) {
    var b = a.split(/-(?!$)/);
    a = b[b.length - 1];
    for (var c, d, e, f, g = 0; g < b.length - 1; g++) {
      var h = b[g];
      if (/^(cmd|meta|m)$/i.test(h)) f = !0;
      else if (/^a(lt)?$/i.test(h)) c = !0;
      else if (/^(c|ctrl|control)$/i.test(h)) d = !0;
      else if (/^s(hift)$/i.test(h)) e = !0;
      else throw Error("Unrecognized modifier name: " + h);
    }
    c && (a = "Alt-" + a);
    d && (a = "Ctrl-" + a);
    f && (a = "Cmd-" + a);
    e && (a = "Shift-" + a);
    return a;
  }
  function pc(a) {
    return "string" == typeof a ? ua[a] : a;
  }
  function Wa(a, b, c, d, e) {
    if (d && d.shared) return Xf(a, b, c, d, e);
    if (a.cm && !a.cm.curOp) return G(a.cm, Wa)(a, b, c, d, e);
    var f = new Ha(a, e);
    e = y(b, c);
    d && V(d, f, !1);
    if (0 < e || (0 == e && !1 !== f.clearWhenEmpty)) return f;
    f.replacedWith &&
      ((f.collapsed = !0),
      (f.widgetNode = t("span", [f.replacedWith], "CodeMirror-widget")),
      d.handleMouseEvents ||
        f.widgetNode.setAttribute("cm-ignore-events", "true"),
      d.insertLeft && (f.widgetNode.insertLeft = !0));
    if (f.collapsed) {
      if (
        Qe(a, b.line, b, c, f) ||
        (b.line != c.line && Qe(a, c.line, b, c, f))
      )
        throw Error(
          "Inserting collapsed marker partially overlapping an existing one"
        );
      ra = !0;
    }
    f.addToHistory && Ie(a, { from: b, to: c, origin: "markText" }, a.sel, NaN);
    var g = b.line,
      h = a.cm,
      k;
    a.iter(g, c.line + 1, function (a) {
      h &&
        f.collapsed &&
        !h.options.lineWrapping &&
        ia(a) == h.display.maxLine &&
        (k = !0);
      f.collapsed && g != b.line && ca(a, 0);
      var d = new qc(f, g == b.line ? b.ch : null, g == c.line ? c.ch : null);
      a.markedSpans = a.markedSpans ? a.markedSpans.concat([d]) : [d];
      d.marker.attachLine(a);
      ++g;
    });
    f.collapsed &&
      a.iter(b.line, c.line + 1, function (b) {
        ya(a, b) && ca(b, 0);
      });
    f.clearOnEnter &&
      v(f, "beforeCursorEnter", function () {
        f.clear();
      });
    f.readOnly &&
      ((Ge = !0),
      (a.history.done.length || a.history.undone.length) && a.clearHistory());
    f.collapsed && ((f.id = ++sd), (f.atomic = !0));
    if (h) {
      k && (h.curOp.updateMaxLine = !0);
      if (f.collapsed) Q(h, b.line, c.line + 1);
      else if (f.className || f.title || f.startStyle || f.endStyle || f.css)
        for (d = b.line; d <= c.line; d++) na(h, d, "text");
      f.atomic && ge(h.doc);
      L(h, "markerAdded", h, f);
    }
    return f;
  }
  function Xf(a, b, c, d, e) {
    d = V(d);
    d.shared = !1;
    var f = [Wa(a, b, c, d, e)],
      g = f[0],
      h = d.widgetNode;
    Ga(a, function (a) {
      h && (d.widgetNode = h.cloneNode(!0));
      f.push(Wa(a, w(a, b), w(a, c), d, e));
      for (var l = 0; l < a.linked.length; ++l)
        if (a.linked[l].isParent) return;
      g = A(f);
    });
    return new rc(f, g);
  }
  function Re(a) {
    return a.findMarks(r(a.first, 0), a.clipPos(r(a.lastLine())), function (a) {
      return a.parent;
    });
  }
  function Yf(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b],
        d = [c.primary.doc];
      Ga(c.primary.doc, function (a) {
        d.push(a);
      });
      for (var e = 0; e < c.markers.length; e++) {
        var f = c.markers[e];
        -1 == D(d, f.doc) && ((f.parent = null), c.markers.splice(e--, 1));
      }
    }
  }
  function qc(a, b, c) {
    this.marker = a;
    this.from = b;
    this.to = c;
  }
  function zb(a, b) {
    if (a)
      for (var c = 0; c < a.length; ++c) {
        var d = a[c];
        if (d.marker == b) return d;
      }
  }
  function od(a, b) {
    if (b.full) return null;
    var c = qb(a, b.from.line) && u(a, b.from.line).markedSpans,
      d = qb(a, b.to.line) && u(a, b.to.line).markedSpans;
    if (!c && !d) return null;
    var e = b.from.ch,
      f = b.to.ch,
      g = 0 == y(b.from, b.to);
    if (c)
      for (var h = 0, k; h < c.length; ++h) {
        var l = c[h],
          m = l.marker;
        if (
          null == l.from ||
          (m.inclusiveLeft ? l.from <= e : l.from < e) ||
          !(l.from != e || "bookmark" != m.type || (g && l.marker.insertLeft))
        ) {
          var p = null == l.to || (m.inclusiveRight ? l.to >= e : l.to > e);
          (k || (k = [])).push(new qc(m, l.from, p ? null : l.to));
        }
      }
    c = k;
    if (d)
      for (var h = 0, n; h < d.length; ++h)
        if (
          ((k = d[h]),
          (l = k.marker),
          null == k.to ||
            (l.inclusiveRight ? k.to >= f : k.to > f) ||
            (k.from == f &&
              "bookmark" == l.type &&
              (!g || k.marker.insertLeft)))
        )
          (m = null == k.from || (l.inclusiveLeft ? k.from <= f : k.from < f)),
            (n || (n = [])).push(
              new qc(l, m ? null : k.from - f, null == k.to ? null : k.to - f)
            );
    d = n;
    g = 1 == b.text.length;
    n = A(b.text).length + (g ? e : 0);
    if (c)
      for (f = 0; f < c.length; ++f)
        if (((h = c[f]), null == h.to))
          ((k = zb(d, h.marker)), k)
            ? g && (h.to = null == k.to ? null : k.to + n)
            : (h.to = e);
    if (d)
      for (f = 0; f < d.length; ++f)
        (h = d[f]),
          null != h.to && (h.to += n),
          null == h.from
            ? ((k = zb(c, h.marker)),
              k || ((h.from = n), g && (c || (c = [])).push(h)))
            : ((h.from += n), g && (c || (c = [])).push(h));
    c && (c = Se(c));
    d && d != c && (d = Se(d));
    e = [c];
    if (!g) {
      var g = b.text.length - 2,
        q;
      if (0 < g && c)
        for (f = 0; f < c.length; ++f)
          null == c[f].to &&
            (q || (q = [])).push(new qc(c[f].marker, null, null));
      for (f = 0; f < g; ++f) e.push(q);
      e.push(d);
    }
    return e;
  }
  function Se(a) {
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      null != c.from &&
        c.from == c.to &&
        !1 !== c.marker.clearWhenEmpty &&
        a.splice(b--, 1);
    }
    return a.length ? a : null;
  }
  function Ke(a, b) {
    var c;
    if ((c = b["spans_" + a.id])) {
      for (var d = 0, e = []; d < b.text.length; ++d) e.push(Zf(c[d]));
      c = e;
    } else c = null;
    d = od(a, b);
    if (!c) return d;
    if (!d) return c;
    for (e = 0; e < c.length; ++e) {
      var f = c[e],
        g = d[e];
      if (f && g) {
        var h = 0;
        a: for (; h < g.length; ++h) {
          for (var k = g[h], l = 0; l < f.length; ++l)
            if (f[l].marker == k.marker) continue a;
          f.push(k);
        }
      } else g && (c[e] = g);
    }
    return c;
  }
  function Uf(a, b, c) {
    var d = null;
    a.iter(b.line, c.line + 1, function (a) {
      if (a.markedSpans)
        for (var b = 0; b < a.markedSpans.length; ++b) {
          var c = a.markedSpans[b].marker;
          !c.readOnly || (d && -1 != D(d, c)) || (d || (d = [])).push(c);
        }
    });
    if (!d) return null;
    a = [{ from: b, to: c }];
    for (b = 0; b < d.length; ++b) {
      c = d[b];
      for (var e = c.find(0), f = 0; f < a.length; ++f) {
        var g = a[f];
        if (!(0 > y(g.to, e.from) || 0 < y(g.from, e.to))) {
          var h = [f, 1],
            k = y(g.from, e.from),
            l = y(g.to, e.to);
          (0 > k || (!c.inclusiveLeft && !k)) &&
            h.push({ from: g.from, to: e.from });
          (0 < l || (!c.inclusiveRight && !l)) &&
            h.push({ from: e.to, to: g.to });
          a.splice.apply(a, h);
          f += h.length - 1;
        }
      }
    }
    return a;
  }
  function Te(a) {
    var b = a.markedSpans;
    if (b) {
      for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
      a.markedSpans = null;
    }
  }
  function Ue(a, b) {
    if (b) {
      for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
      a.markedSpans = b;
    }
  }
  function Ve(a, b) {
    var c = a.lines.length - b.lines.length;
    if (0 != c) return c;
    var c = a.find(),
      d = b.find(),
      e =
        y(c.from, d.from) ||
        (a.inclusiveLeft ? -1 : 0) - (b.inclusiveLeft ? -1 : 0);
    return e
      ? -e
      : (c =
          y(c.to, d.to) ||
          (a.inclusiveRight ? 1 : 0) - (b.inclusiveRight ? 1 : 0))
      ? c
      : b.id - a.id;
  }
  function Aa(a, b) {
    var c = ra && a.markedSpans,
      d;
    if (c)
      for (var e, f = 0; f < c.length; ++f)
        (e = c[f]),
          e.marker.collapsed &&
            null == (b ? e.from : e.to) &&
            (!d || 0 > Ve(d, e.marker)) &&
            (d = e.marker);
    return d;
  }
  function Qe(a, b, c, d, e) {
    a = u(a, b);
    if ((a = ra && a.markedSpans))
      for (b = 0; b < a.length; ++b) {
        var f = a[b];
        if (f.marker.collapsed) {
          var g = f.marker.find(0),
            h =
              y(g.from, c) ||
              (f.marker.inclusiveLeft ? -1 : 0) - (e.inclusiveLeft ? -1 : 0),
            k =
              y(g.to, d) ||
              (f.marker.inclusiveRight ? 1 : 0) - (e.inclusiveRight ? 1 : 0);
          if (
            !((0 <= h && 0 >= k) || (0 >= h && 0 <= k)) &&
            ((0 >= h &&
              (0 < y(g.to, c) ||
                (f.marker.inclusiveRight && e.inclusiveLeft))) ||
              (0 <= h &&
                (0 > y(g.from, d) ||
                  (f.marker.inclusiveLeft && e.inclusiveRight))))
          )
            return !0;
        }
      }
  }
  function ia(a) {
    for (var b; (b = Aa(a, !0)); ) a = b.find(-1, !0).line;
    return a;
  }
  function Mc(a, b) {
    var c = u(a, b),
      d = ia(c);
    return c == d ? b : F(d);
  }
  function Ld(a, b) {
    if (b > a.lastLine()) return b;
    var c = u(a, b),
      d;
    if (!ya(a, c)) return b;
    for (; (d = Aa(c, !1)); ) c = d.find(1, !0).line;
    return F(c) + 1;
  }
  function ya(a, b) {
    var c = ra && b.markedSpans;
    if (c)
      for (var d, e = 0; e < c.length; ++e)
        if (
          ((d = c[e]),
          d.marker.collapsed &&
            (null == d.from ||
              (!d.marker.widgetNode &&
                0 == d.from &&
                d.marker.inclusiveLeft &&
                td(a, b, d))))
        )
          return !0;
  }
  function td(a, b, c) {
    if (null == c.to)
      return (
        (b = c.marker.find(1, !0)),
        td(a, b.line, zb(b.line.markedSpans, c.marker))
      );
    if (c.marker.inclusiveRight && c.to == b.text.length) return !0;
    for (var d, e = 0; e < b.markedSpans.length; ++e)
      if (
        ((d = b.markedSpans[e]),
        d.marker.collapsed &&
          !d.marker.widgetNode &&
          d.from == c.to &&
          (null == d.to || d.to != c.from) &&
          (d.marker.inclusiveLeft || c.marker.inclusiveRight) &&
          td(a, b, d))
      )
        return !0;
  }
  function ub(a) {
    if (null != a.height) return a.height;
    var b = a.doc.cm;
    if (!b) return 0;
    if (!Wc(document.body, a.node)) {
      var c = "position: relative;";
      a.coverGutter &&
        (c += "margin-left: -" + b.display.gutters.offsetWidth + "px;");
      a.noHScroll && (c += "width: " + b.display.wrapper.clientWidth + "px;");
      U(b.display.measure, t("div", [a.node], null, c));
    }
    return (a.height = a.node.offsetHeight);
  }
  function $f(a, b, c, d) {
    var e = new sc(a, c, d),
      f = a.cm;
    f && e.noHScroll && (f.display.alignWidgets = !0);
    nc(a, b, "widget", function (b) {
      var c = b.widgets || (b.widgets = []);
      null == e.insertAt
        ? c.push(e)
        : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e);
      e.line = b;
      f &&
        !ya(a, b) &&
        ((c = ea(b) < a.scrollTop),
        ca(b, b.height + ub(e)),
        c && lc(f, null, e.height),
        (f.curOp.forceUpdate = !0));
      return !0;
    });
    return e;
  }
  function We(a, b) {
    if (a)
      for (;;) {
        var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!c) break;
        a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
        var d = c[1] ? "bgClass" : "textClass";
        null == b[d]
          ? (b[d] = c[2])
          : new RegExp("(?:^|s)" + c[2] + "(?:$|s)").test(b[d]) ||
            (b[d] += " " + c[2]);
      }
    return a;
  }
  function Xe(a, b) {
    if (a.blankLine) return a.blankLine(b);
    if (a.innerMode) {
      var c = q.innerMode(a, b);
      if (c.mode.blankLine) return c.mode.blankLine(c.state);
    }
  }
  function ud(a, b, c, d) {
    for (var e = 0; 10 > e; e++) {
      d && (d[0] = q.innerMode(a, c).mode);
      var f = a.token(b, c);
      if (b.pos > b.start) return f;
    }
    throw Error("Mode " + a.name + " failed to advance stream.");
  }
  function Ye(a, b, c, d) {
    function e(a) {
      return {
        start: m.start,
        end: m.pos,
        string: m.current(),
        type: h || null,
        state: a ? Sa(f.mode, l) : l,
      };
    }
    var f = a.doc,
      g = f.mode,
      h;
    b = w(f, b);
    var k = u(f, b.line),
      l = sb(a, b.line, c),
      m = new tc(k.text, a.options.tabSize),
      p;
    for (d && (p = []); (d || m.pos < b.ch) && !m.eol(); )
      (m.start = m.pos), (h = ud(g, m, l)), d && p.push(e(!0));
    return d ? p : e();
  }
  function Ze(a, b, c, d, e, f, g) {
    var h = c.flattenSpans;
    null == h && (h = a.options.flattenSpans);
    var k = 0,
      l = null,
      m = new tc(b, a.options.tabSize),
      p,
      n = a.options.addModeClass && [null];
    for ("" == b && We(Xe(c, d), f); !m.eol(); ) {
      m.pos > a.options.maxHighlightLength
        ? ((h = !1), g && Zc(a, b, d, m.pos), (m.pos = b.length), (p = null))
        : (p = We(ud(c, m, d, n), f));
      if (n) {
        var q = n[0].name;
        q && (p = "m-" + (p ? q + " " + p : q));
      }
      if (!h || l != p) {
        for (; k < m.start; ) (k = Math.min(m.start, k + 5e4)), e(k, l);
        l = p;
      }
      m.start = m.pos;
    }
    for (; k < m.pos; ) (a = Math.min(m.pos, k + 5e4)), e(a, l), (k = a);
  }
  function je(a, b, c, d) {
    var e = [a.state.modeGen],
      f = {};
    Ze(
      a,
      b.text,
      a.doc.mode,
      c,
      function (a, b) {
        e.push(a, b);
      },
      f,
      d
    );
    for (c = 0; c < a.state.overlays.length; ++c) {
      var g = a.state.overlays[c],
        h = 1,
        k = 0;
      Ze(
        a,
        b.text,
        g.mode,
        !0,
        function (a, b) {
          for (var c = h; k < a; ) {
            var d = e[h];
            d > a && e.splice(h, 1, a, e[h + 1], d);
            h += 2;
            k = Math.min(a, d);
          }
          if (b)
            if (g.opaque) e.splice(c, h - c, a, "cm-overlay " + b), (h = c + 2);
            else
              for (; c < h; c += 2)
                (d = e[c + 1]),
                  (e[c + 1] = (d ? d + " " : "") + "cm-overlay " + b);
        },
        f
      );
    }
    return { styles: e, classes: f.bgClass || f.textClass ? f : null };
  }
  function $e(a, b, c) {
    if (!b.styles || b.styles[0] != a.state.modeGen) {
      var d = je(a, b, (b.stateAfter = sb(a, F(b))));
      b.styles = d.styles;
      d.classes
        ? (b.styleClasses = d.classes)
        : b.styleClasses && (b.styleClasses = null);
      c === a.doc.frontier && a.doc.frontier++;
    }
    return b.styles;
  }
  function Zc(a, b, c, d) {
    var e = a.doc.mode,
      f = new tc(b, a.options.tabSize);
    f.start = f.pos = d || 0;
    for (
      "" == b && Xe(e, c);
      !f.eol() && f.pos <= a.options.maxHighlightLength;

    )
      ud(e, f, c), (f.start = f.pos);
  }
  function af(a, b) {
    if (!a || /^\s*$/.test(a)) return null;
    var c = b.addModeClass ? ag : bg;
    return c[a] || (c[a] = a.replace(/\S+/g, "cm-$\x26"));
  }
  function Sd(a, b) {
    var c = t("span", null, null, J ? "padding-right: .1px" : null),
      c = {
        pre: t("pre", [c]),
        content: c,
        col: 0,
        pos: 0,
        cm: a,
        splitSpaces: (B || J) && a.getOption("lineWrapping"),
      };
    b.measure = {};
    for (var d = 0; d <= (b.rest ? b.rest.length : 0); d++) {
      var e = d ? b.rest[d - 1] : b.line,
        f;
      c.pos = 0;
      c.addToken = cg;
      var g;
      if (null != vd) g = vd;
      else {
        g = U(a.display.measure, document.createTextNode("AخA"));
        var h = Ea(g, 0, 1).getBoundingClientRect();
        g =
          h && h.left != h.right
            ? (vd = 3 > Ea(g, 1, 2).getBoundingClientRect().right - h.right)
            : !1;
      }
      g && (f = Y(e)) && (c.addToken = dg(c.addToken, f));
      c.map = [];
      h = b != a.display.externalMeasured && F(e);
      a: {
        g = c;
        var h = $e(a, e, h),
          k = e.markedSpans,
          l = e.text,
          m = 0;
        if (k)
          for (
            var p = l.length,
              n = 0,
              q = 1,
              r = "",
              u = void 0,
              v = void 0,
              w = 0,
              x = void 0,
              y = void 0,
              A = void 0,
              C = void 0,
              z = void 0;
            ;

          ) {
            if (w == n) {
              for (
                var x = (y = A = C = v = ""),
                  z = null,
                  w = Infinity,
                  G = [],
                  H = 0;
                H < k.length;
                ++H
              ) {
                var I = k[H],
                  D = I.marker;
                "bookmark" == D.type && I.from == n && D.widgetNode
                  ? G.push(D)
                  : I.from <= n &&
                    (null == I.to ||
                      I.to > n ||
                      (D.collapsed && I.to == n && I.from == n))
                  ? (null != I.to &&
                      I.to != n &&
                      w > I.to &&
                      ((w = I.to), (y = "")),
                    D.className && (x += " " + D.className),
                    D.css && (v = D.css),
                    D.startStyle && I.from == n && (A += " " + D.startStyle),
                    D.endStyle && I.to == w && (y += " " + D.endStyle),
                    D.title && !C && (C = D.title),
                    D.collapsed && (!z || 0 > Ve(z.marker, D)) && (z = I))
                  : I.from > n && w > I.from && (w = I.from);
              }
              if (z && (z.from || 0) == n) {
                bf(
                  g,
                  (null == z.to ? p + 1 : z.to) - n,
                  z.marker,
                  null == z.from
                );
                if (null == z.to) break a;
                z.to == n && (z = !1);
              }
              if (!z && G.length) for (H = 0; H < G.length; ++H) bf(g, 0, G[H]);
            }
            if (n >= p) break;
            for (G = Math.min(p, w); ; ) {
              if (r) {
                H = n + r.length;
                z ||
                  ((I = H > G ? r.slice(0, G - n) : r),
                  g.addToken(
                    g,
                    I,
                    u ? u + x : x,
                    A,
                    n + I.length == w ? y : "",
                    C,
                    v
                  ));
                if (H >= G) {
                  r = r.slice(G - n);
                  n = G;
                  break;
                }
                n = H;
                A = "";
              }
              r = l.slice(m, (m = h[q++]));
              u = af(h[q++], g.cm.options);
            }
          }
        else
          for (var q = 1; q < h.length; q += 2)
            g.addToken(g, l.slice(m, (m = h[q])), af(h[q + 1], g.cm.options));
      }
      e.styleClasses &&
        (e.styleClasses.bgClass &&
          (c.bgclassName = wd(e.styleClasses.bgClass, c.bgClass || "")),
        e.styleClasses.textClass &&
          (c.textclassName = wd(e.styleClasses.textClass, c.textClass || "")));
      0 == c.map.length &&
        c.map.push(0, 0, c.content.appendChild(eg(a.display.measure)));
      0 == d
        ? ((b.measure.map = c.map), (b.measure.cache = {}))
        : ((b.measure.maps || (b.measure.maps = [])).push(c.map),
          (b.measure.caches || (b.measure.caches = [])).push({}));
    }
    J &&
      /\bcm-tab\b/.test(c.content.lastChild.className) &&
      (c.content.className = "cm-tab-wrap-hack");
    K(a, "renderLine", a, b.line, c.pre);
    c.pre.className &&
      (c.textclassName = wd(c.pre.className, c.textClass || ""));
    return c;
  }
  function cg(a, b, c, d, e, f, g) {
    if (b) {
      var h = a.splitSpaces ? b.replace(/ {3,}/g, fg) : b,
        k = a.cm.state.specialChars,
        l = !1;
      if (k.test(b))
        for (var m = document.createDocumentFragment(), p = 0; ; ) {
          k.lastIndex = p;
          var n = k.exec(b),
            q = n ? n.index - p : b.length - p;
          if (q) {
            var r = document.createTextNode(h.slice(p, p + q));
            B && 9 > C ? m.appendChild(t("span", [r])) : m.appendChild(r);
            a.map.push(a.pos, a.pos + q, r);
            a.col += q;
            a.pos += q;
          }
          if (!n) break;
          p += q + 1;
          "\t" == n[0]
            ? ((r = a.cm.options.tabSize),
              (n = r - (a.col % r)),
              (r = m.appendChild(t("span", Ne(n), "cm-tab"))),
              r.setAttribute("role", "presentation"),
              r.setAttribute("cm-text", "\t"),
              (a.col += n))
            : ((r = a.cm.options.specialCharPlaceholder(n[0])),
              r.setAttribute("cm-text", n[0]),
              B && 9 > C ? m.appendChild(t("span", [r])) : m.appendChild(r),
              (a.col += 1));
          a.map.push(a.pos, a.pos + 1, r);
          a.pos++;
        }
      else {
        a.col += b.length;
        var m = document.createTextNode(h);
        a.map.push(a.pos, a.pos + b.length, m);
        B && 9 > C && (l = !0);
        a.pos += b.length;
      }
      if (c || d || e || l || g)
        return (
          (b = c || ""),
          d && (b += d),
          e && (b += e),
          (d = t("span", [m], b, g)),
          f && (d.title = f),
          a.content.appendChild(d)
        );
      a.content.appendChild(m);
    }
  }
  function fg(a) {
    for (var b = " ", c = 0; c < a.length - 2; ++c) b += c % 2 ? " " : " ";
    return b + " ";
  }
  function dg(a, b) {
    return function (c, d, e, f, g, h, k) {
      e = e ? e + " cm-force-border" : "cm-force-border";
      for (var l = c.pos, m = l + d.length; ; ) {
        for (var p = 0; p < b.length; p++) {
          var n = b[p];
          if (n.to > l && n.from <= l) break;
        }
        if (n.to >= m) return a(c, d, e, f, g, h, k);
        a(c, d.slice(0, n.to - l), e, f, null, h, k);
        f = null;
        d = d.slice(n.to - l);
        l = n.to;
      }
    };
  }
  function bf(a, b, c, d) {
    var e = !d && c.widgetNode;
    e && a.map.push(a.pos, a.pos + b, e);
    !d &&
      a.cm.display.input.needsContentAttribute &&
      (e || (e = a.content.appendChild(document.createElement("span"))),
      e.setAttribute("cm-marker", c.id));
    e && (a.cm.display.input.setUneditable(e), a.content.appendChild(e));
    a.pos += b;
  }
  function Me(a, b) {
    return (
      0 == b.from.ch &&
      0 == b.to.ch &&
      "" == A(b.text) &&
      (!a.cm || a.cm.options.wholeLineUpdateBefore)
    );
  }
  function qd(a, b, c, d) {
    function e(a, c, e) {
      a.text = c;
      a.stateAfter && (a.stateAfter = null);
      a.styles && (a.styles = null);
      null != a.order && (a.order = null);
      Te(a);
      Ue(a, e);
      c = d ? d(a) : 1;
      c != a.height && ca(a, c);
      L(a, "change", a, b);
    }
    function f(a, b) {
      for (var e = a, f = []; e < b; ++e)
        f.push(new Ab(k[e], c ? c[e] : null, d));
      return f;
    }
    var g = b.from,
      h = b.to,
      k = b.text,
      l = u(a, g.line),
      m = u(a, h.line),
      p = A(k),
      n = c ? c[k.length - 1] : null,
      q = h.line - g.line;
    if (b.full)
      a.insert(0, f(0, k.length)), a.remove(k.length, a.size - k.length);
    else if (Me(a, b)) {
      var r = f(0, k.length - 1);
      e(m, m.text, n);
      q && a.remove(g.line, q);
      r.length && a.insert(g.line, r);
    } else
      l == m
        ? 1 == k.length
          ? e(l, l.text.slice(0, g.ch) + p + l.text.slice(h.ch), n)
          : ((r = f(1, k.length - 1)),
            r.push(new Ab(p + l.text.slice(h.ch), n, d)),
            e(l, l.text.slice(0, g.ch) + k[0], c ? c[0] : null),
            a.insert(g.line + 1, r))
        : 1 == k.length
        ? (e(
            l,
            l.text.slice(0, g.ch) + k[0] + m.text.slice(h.ch),
            c ? c[0] : null
          ),
          a.remove(g.line + 1, q))
        : (e(l, l.text.slice(0, g.ch) + k[0], c ? c[0] : null),
          e(m, p + m.text.slice(h.ch), n),
          (r = f(1, k.length - 1)),
          1 < q && a.remove(g.line + 1, q - 1),
          a.insert(g.line + 1, r));
    L(a, "change", a, b);
  }
  function Bb(a) {
    this.lines = a;
    this.parent = null;
    for (var b = 0, c = 0; b < a.length; ++b)
      (a[b].parent = this), (c += a[b].height);
    this.height = c;
  }
  function Cb(a) {
    this.children = a;
    for (var b = 0, c = 0, d = 0; d < a.length; ++d) {
      var e = a[d],
        b = b + e.chunkSize(),
        c = c + e.height;
      e.parent = this;
    }
    this.size = b;
    this.height = c;
    this.parent = null;
  }
  function Ga(a, b, c) {
    function d(a, f, g) {
      if (a.linked)
        for (var h = 0; h < a.linked.length; ++h) {
          var k = a.linked[h];
          if (k.doc != f) {
            var l = g && k.sharedHist;
            if (!c || l) b(k.doc, l), d(k.doc, a, l);
          }
        }
    }
    d(a, null, !0);
  }
  function Ed(a, b) {
    if (b.cm) throw Error("This document is already in use.");
    a.doc = b;
    b.cm = a;
    Ac(a);
    zc(a);
    a.options.lineWrapping || Dc(a);
    a.options.mode = b.modeOption;
    Q(a);
  }
  function u(a, b) {
    b -= a.first;
    if (0 > b || b >= a.size)
      throw Error("There is no line " + (b + a.first) + " in the document.");
    for (var c = a; !c.lines; )
      for (var d = 0; ; ++d) {
        var e = c.children[d],
          f = e.chunkSize();
        if (b < f) {
          c = e;
          break;
        }
        b -= f;
      }
    return c.lines[b];
  }
  function Da(a, b, c) {
    var d = [],
      e = b.line;
    a.iter(b.line, c.line + 1, function (a) {
      a = a.text;
      e == c.line && (a = a.slice(0, c.ch));
      e == b.line && (a = a.slice(b.ch));
      d.push(a);
      ++e;
    });
    return d;
  }
  function xd(a, b, c) {
    var d = [];
    a.iter(b, c, function (a) {
      d.push(a.text);
    });
    return d;
  }
  function ca(a, b) {
    var c = b - a.height;
    if (c) for (var d = a; d; d = d.parent) d.height += c;
  }
  function F(a) {
    if (null == a.parent) return null;
    var b = a.parent;
    a = D(b.lines, a);
    for (var c = b.parent; c; b = c, c = c.parent)
      for (var d = 0; c.children[d] != b; ++d) a += c.children[d].chunkSize();
    return a + b.first;
  }
  function Ba(a, b) {
    var c = a.first;
    a: do {
      for (var d = 0; d < a.children.length; ++d) {
        var e = a.children[d],
          f = e.height;
        if (b < f) {
          a = e;
          continue a;
        }
        b -= f;
        c += e.chunkSize();
      }
      return c;
    } while (!a.lines);
    for (d = 0; d < a.lines.length; ++d) {
      e = a.lines[d].height;
      if (b < e) break;
      b -= e;
    }
    return c + d;
  }
  function ea(a) {
    a = ia(a);
    for (var b = 0, c = a.parent, d = 0; d < c.lines.length; ++d) {
      var e = c.lines[d];
      if (e == a) break;
      else b += e.height;
    }
    for (a = c.parent; a; c = a, a = c.parent)
      for (d = 0; d < a.children.length && ((e = a.children[d]), e != c); ++d)
        b += e.height;
    return b;
  }
  function Y(a) {
    var b = a.order;
    null == b && (b = a.order = gg(a.text));
    return b;
  }
  function uc(a) {
    this.done = [];
    this.undone = [];
    this.undoDepth = Infinity;
    this.lastModTime = this.lastSelTime = 0;
    this.lastOrigin = this.lastSelOrigin = this.lastOp = this.lastSelOp = null;
    this.generation = this.maxGeneration = a || 1;
  }
  function pd(a, b) {
    var c = { from: Rc(b.from), to: ta(b), text: Da(a, b.from, b.to) };
    cf(a, c, b.from.line, b.to.line + 1);
    Ga(
      a,
      function (a) {
        cf(a, c, b.from.line, b.to.line + 1);
      },
      !0
    );
    return c;
  }
  function ce(a) {
    for (; a.length; )
      if (A(a).ranges) a.pop();
      else break;
  }
  function Ie(a, b, c, d) {
    var e = a.history;
    e.undone.length = 0;
    var f = +new Date(),
      g,
      h;
    if (
      (h =
        e.lastOp == d ||
        (e.lastOrigin == b.origin &&
          b.origin &&
          (("+" == b.origin.charAt(0) &&
            a.cm &&
            e.lastModTime > f - a.cm.options.historyEventDelay) ||
            "*" == b.origin.charAt(0))))
    )
      e.lastOp == d
        ? (ce(e.done), (g = A(e.done)))
        : e.done.length && !A(e.done).ranges
        ? (g = A(e.done))
        : 1 < e.done.length && !e.done[e.done.length - 2].ranges
        ? (e.done.pop(), (g = A(e.done)))
        : (g = void 0),
        (h = g);
    if (h) {
      var k = A(g.changes);
      0 == y(b.from, b.to) && 0 == y(b.from, k.to)
        ? (k.to = ta(b))
        : g.changes.push(pd(a, b));
    } else for (((g = A(e.done)) && g.ranges) || Wb(a.sel, e.done), g = { changes: [pd(a, b)], generation: e.generation }, e.done.push(g); e.done.length > e.undoDepth; ) e.done.shift(), e.done[0].ranges || e.done.shift();
    e.done.push(c);
    e.generation = ++e.maxGeneration;
    e.lastModTime = e.lastSelTime = f;
    e.lastOp = e.lastSelOp = d;
    e.lastOrigin = e.lastSelOrigin = b.origin;
    k || K(a, "historyAdded");
  }
  function Wb(a, b) {
    var c = A(b);
    (c && c.ranges && c.equals(a)) || b.push(a);
  }
  function cf(a, b, c, d) {
    var e = b["spans_" + a.id],
      f = 0;
    a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function (c) {
      c.markedSpans &&
        ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans);
      ++f;
    });
  }
  function Zf(a) {
    if (!a) return null;
    for (var b = 0, c; b < a.length; ++b)
      a[b].marker.explicitlyCleared
        ? c || (c = a.slice(0, b))
        : c && c.push(a[b]);
    return c ? (c.length ? c : null) : a;
  }
  function Xa(a, b, c) {
    for (var d = 0, e = []; d < a.length; ++d) {
      var f = a[d];
      if (f.ranges) e.push(c ? la.prototype.deepCopy.call(f) : f);
      else {
        var f = f.changes,
          g = [];
        e.push({ changes: g });
        for (var h = 0; h < f.length; ++h) {
          var k = f[h],
            l;
          g.push({ from: k.from, to: k.to, text: k.text });
          if (b)
            for (var m in k)
              (l = m.match(/^spans_(\d+)$/)) &&
                -1 < D(b, Number(l[1])) &&
                ((A(g)[m] = k[m]), delete k[m]);
        }
      }
    }
    return e;
  }
  function df(a, b, c, d) {
    c < a.line ? (a.line += d) : b < a.line && ((a.line = b), (a.ch = 0));
  }
  function ef(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e],
        g = !0;
      if (f.ranges) {
        f.copied || ((f = a[e] = f.deepCopy()), (f.copied = !0));
        for (var h = 0; h < f.ranges.length; h++)
          df(f.ranges[h].anchor, b, c, d), df(f.ranges[h].head, b, c, d);
      } else {
        for (h = 0; h < f.changes.length; ++h) {
          var k = f.changes[h];
          if (c < k.from.line)
            (k.from = r(k.from.line + d, k.from.ch)),
              (k.to = r(k.to.line + d, k.to.ch));
          else if (b <= k.to.line) {
            g = !1;
            break;
          }
        }
        g || (a.splice(0, e + 1), (e = 0));
      }
    }
  }
  function Je(a, b) {
    var c = b.from.line,
      d = b.to.line,
      e = b.text.length - (d - c) - 1;
    ef(a.done, c, d, e);
    ef(a.undone, c, d, e);
  }
  function ld(a) {
    return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue;
  }
  function xe(a) {
    var b = a.which;
    null == b &&
      (a.button & 1
        ? (b = 1)
        : a.button & 2
        ? (b = 3)
        : a.button & 4 && (b = 2));
    W && a.ctrlKey && 1 == b && (b = 3);
    return b;
  }
  function L(a, b) {
    function c(a) {
      return function () {
        a.apply(null, e);
      };
    }
    var d = a._handlers && a._handlers[b];
    if (d) {
      var e = Array.prototype.slice.call(arguments, 2),
        f;
      Ta
        ? (f = Ta.delayedCallbacks)
        : Db
        ? (f = Db)
        : ((f = Db = []), setTimeout(hg, 0));
      for (var g = 0; g < d.length; ++g) f.push(c(d[g]));
    }
  }
  function hg() {
    var a = Db;
    Db = null;
    for (var b = 0; b < a.length; ++b) a[b]();
  }
  function ja(a, b, c) {
    "string" == typeof b &&
      (b = {
        type: b,
        preventDefault: function () {
          this.defaultPrevented = !0;
        },
      });
    K(a, c || b.type, a, b);
    return ld(b) || b.codemirrorIgnore;
  }
  function fe(a) {
    var b = a._handlers && a._handlers.cursorActivity;
    if (b) {
      a =
        a.curOp.cursorActivityHandlers || (a.curOp.cursorActivityHandlers = []);
      for (var c = 0; c < b.length; ++c) -1 == D(a, b[c]) && a.push(b[c]);
    }
  }
  function S(a, b) {
    var c = a._handlers && a._handlers[b];
    return c && 0 < c.length;
  }
  function Ya(a) {
    a.prototype.on = function (a, c) {
      v(this, a, c);
    };
    a.prototype.off = function (a, c) {
      ka(this, a, c);
    };
  }
  function bb() {
    this.id = null;
  }
  function ye(a, b, c) {
    for (var d = 0, e = 0; ; ) {
      var f = a.indexOf("\t", d);
      -1 == f && (f = a.length);
      var g = f - d;
      if (f == a.length || e + g >= b) return d + Math.min(g, b - e);
      e += f - d;
      e += c - (e % c);
      d = f + 1;
      if (e >= b) return d;
    }
  }
  function Ne(a) {
    for (; vc.length <= a; ) vc.push(A(vc) + " ");
    return vc[a];
  }
  function A(a) {
    return a[a.length - 1];
  }
  function D(a, b) {
    for (var c = 0; c < a.length; ++c) if (a[c] == b) return c;
    return -1;
  }
  function ob(a, b) {
    for (var c = [], d = 0; d < a.length; d++) c[d] = b(a[d], d);
    return c;
  }
  function Eb() {}
  function ff(a, b) {
    var c;
    Object.create
      ? (c = Object.create(a))
      : ((Eb.prototype = a), (c = new Eb()));
    b && V(b, c);
    return c;
  }
  function V(a, b, c) {
    b || (b = {});
    for (var d in a)
      !a.hasOwnProperty(d) ||
        (!1 === c && b.hasOwnProperty(d)) ||
        (b[d] = a[d]);
    return b;
  }
  function cb(a) {
    var b = Array.prototype.slice.call(arguments, 1);
    return function () {
      return a.apply(null, b);
    };
  }
  function oc(a, b) {
    return b ? (-1 < b.source.indexOf("\\w") && gf(a) ? !0 : b.test(a)) : gf(a);
  }
  function hf(a) {
    for (var b in a) if (a.hasOwnProperty(b) && a[b]) return !1;
    return !0;
  }
  function tb(a) {
    return 768 <= a.charCodeAt(0) && ig.test(a);
  }
  function t(a, b, c, d) {
    a = document.createElement(a);
    c && (a.className = c);
    d && (a.style.cssText = d);
    if ("string" == typeof b) a.appendChild(document.createTextNode(b));
    else if (b) for (c = 0; c < b.length; ++c) a.appendChild(b[c]);
    return a;
  }
  function za(a) {
    for (var b = a.childNodes.length; 0 < b; --b) a.removeChild(a.firstChild);
    return a;
  }
  function U(a, b) {
    return za(a).appendChild(b);
  }
  function fa() {
    return document.activeElement;
  }
  function Fb(a) {
    return new RegExp("(^|\\s)" + a + "(?:$|\\s)\\s*");
  }
  function wd(a, b) {
    for (var c = a.split(" "), d = 0; d < c.length; d++)
      c[d] && !Fb(c[d]).test(b) && (b += " " + c[d]);
    return b;
  }
  function jf(a) {
    if (document.body.getElementsByClassName)
      for (
        var b = document.body.getElementsByClassName("CodeMirror"), c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c].CodeMirror;
        d && a(d);
      }
  }
  function tf() {
    var a;
    v(window, "resize", function () {
      null == a &&
        (a = setTimeout(function () {
          a = null;
          jf(If);
        }, 100));
    });
    v(window, "blur", function () {
      jf(db);
    });
  }
  function eg(a) {
    if (null == yd) {
      var b = t("span", "​");
      U(a, t("span", [b, document.createTextNode("x")]));
      0 != a.firstChild.offsetHeight &&
        (yd = 1 >= b.offsetWidth && 2 < b.offsetHeight && !(B && 8 > C));
    }
    a = yd
      ? t("span", "​")
      : t(
          "span",
          " ",
          null,
          "display: inline-block; width: 1px; margin-right: -1px"
        );
    a.setAttribute("cm-text", "");
    return a;
  }
  function Af(a, b, c, d) {
    if (!a) return d(b, c, "ltr");
    for (var e = !1, f = 0; f < a.length; ++f) {
      var g = a[f];
      if ((g.from < c && g.to > b) || (b == c && g.to == b))
        d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr"),
          (e = !0);
    }
    e || d(b, c, "ltr");
  }
  function dd(a) {
    return a.level % 2 ? a.to : a.from;
  }
  function ed(a) {
    return a.level % 2 ? a.from : a.to;
  }
  function ac(a) {
    return (a = Y(a)) ? dd(a[0]) : 0;
  }
  function bc(a) {
    var b = Y(a);
    return b ? ed(A(b)) : a.text.length;
  }
  function kf(a, b) {
    var c = u(a.doc, b),
      d = ia(c);
    d != c && (b = F(d));
    d = (c = Y(d)) ? (c[0].level % 2 ? bc(d) : ac(d)) : 0;
    return r(b, d);
  }
  function lf(a, b) {
    var c = kf(a, b.line),
      d = u(a.doc, c.line),
      e = Y(d);
    return e && 0 != e[0].level
      ? c
      : ((d = Math.max(0, d.text.search(/\S/))),
        r(c.line, b.line == c.line && b.ch <= d && b.ch ? 0 : d));
  }
  function Sb(a, b) {
    vb = null;
    for (var c = 0, d; c < a.length; ++c) {
      var e = a[c];
      if (e.from < b && e.to > b) return c;
      if (e.from == b || e.to == b)
        if (null == d) d = c;
        else {
          var f;
          f = e.level;
          var g = a[d].level,
            h = a[0].level;
          f = f == h ? !0 : g == h ? !1 : f < g;
          if (f) return e.from != e.to && (vb = d), c;
          e.from != e.to && (vb = c);
          break;
        }
    }
    return d;
  }
  function zd(a, b, c, d) {
    if (!d) return b + c;
    do b += c;
    while (0 < b && tb(a.text.charAt(b)));
    return b;
  }
  function gd(a, b, c, d) {
    var e = Y(a);
    if (!e) return Oe(a, b, c, d);
    var f = Sb(e, b),
      g = e[f];
    for (b = zd(a, b, g.level % 2 ? -c : c, d); ; ) {
      if (b > g.from && b < g.to) return b;
      if (b == g.from || b == g.to) {
        if (Sb(e, b) == f) return b;
        g = e[f + c];
        return 0 < c == g.level % 2 ? g.to : g.from;
      }
      g = e[(f += c)];
      if (!g) return null;
      b = 0 < c == g.level % 2 ? zd(a, g.to, -1, d) : zd(a, g.from, 1, d);
    }
  }
  function Oe(a, b, c, d) {
    b += c;
    if (d) for (; 0 < b && tb(a.text.charAt(b)); ) b += c;
    return 0 > b || b > a.text.length ? null : b;
  }
  var wa = /gecko\/\d/i.test(navigator.userAgent),
    mf = /MSIE \d/.test(navigator.userAgent),
    nf = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
    B = mf || nf,
    C = B && (mf ? document.documentMode || 6 : nf[1]),
    J = /WebKit\//.test(navigator.userAgent),
    jg = J && /Qt\/\d+\.\d+/.test(navigator.userAgent),
    kg = /Chrome\//.test(navigator.userAgent),
    ba = /Opera\//.test(navigator.userAgent),
    te = /Apple Computer/.test(navigator.vendor),
    lg = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
    Gf = /PhantomJS/.test(navigator.userAgent),
    Qa =
      /AppleWebKit/.test(navigator.userAgent) &&
      /Mobile\/\w+/.test(navigator.userAgent),
    ab =
      Qa ||
      /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(
        navigator.userAgent
      ),
    W = Qa || /Mac/.test(navigator.platform),
    mg = /win/i.test(navigator.platform),
    Ia = ba && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
  Ia && (Ia = Number(Ia[1]));
  Ia && 15 <= Ia && ((ba = !1), (J = !0));
  var of = W && (jg || (ba && (null == Ia || 12.11 > Ia))),
    id = wa || (B && 9 <= C),
    Ge = !1,
    ra = !1;
  Fc.prototype = V(
    {
      update: function (a) {
        var b = a.scrollWidth > a.clientWidth + 1,
          c = a.scrollHeight > a.clientHeight + 1,
          d = a.nativeBarWidth;
        c
          ? ((this.vert.style.display = "block"),
            (this.vert.style.bottom = b ? d + "px" : "0"),
            (this.vert.firstChild.style.height =
              Math.max(
                0,
                a.scrollHeight - a.clientHeight + (a.viewHeight - (b ? d : 0))
              ) + "px"))
          : ((this.vert.style.display = ""),
            (this.vert.firstChild.style.height = "0"));
        b
          ? ((this.horiz.style.display = "block"),
            (this.horiz.style.right = c ? d + "px" : "0"),
            (this.horiz.style.left = a.barLeft + "px"),
            (this.horiz.firstChild.style.width =
              a.scrollWidth -
              a.clientWidth +
              (a.viewWidth - a.barLeft - (c ? d : 0)) +
              "px"))
          : ((this.horiz.style.display = ""),
            (this.horiz.firstChild.style.width = "0"));
        !this.checkedOverlay &&
          0 < a.clientHeight &&
          (0 == d && this.overlayHack(), (this.checkedOverlay = !0));
        return { right: c ? d : 0, bottom: b ? d : 0 };
      },
      setScrollLeft: function (a) {
        this.horiz.scrollLeft != a && (this.horiz.scrollLeft = a);
      },
      setScrollTop: function (a) {
        this.vert.scrollTop != a && (this.vert.scrollTop = a);
      },
      overlayHack: function () {
        this.horiz.style.minHeight = this.vert.style.minWidth =
          W && !lg ? "12px" : "18px";
        var a = this,
          b = function (b) {
            (b.target || b.srcElement) != a.vert &&
              (b.target || b.srcElement) != a.horiz &&
              G(a.cm, pe)(b);
          };
        v(this.vert, "mousedown", b);
        v(this.horiz, "mousedown", b);
      },
      clear: function () {
        var a = this.horiz.parentNode;
        a.removeChild(this.horiz);
        a.removeChild(this.vert);
      },
    },
    Fc.prototype
  );
  Gc.prototype = V(
    {
      update: function () {
        return { bottom: 0, right: 0 };
      },
      setScrollLeft: function () {},
      setScrollTop: function () {},
      clear: function () {},
    },
    Gc.prototype
  );
  q.scrollbarModel = { native: Fc, null: Gc };
  Mb.prototype.signal = function (a, b) {
    S(a, b) && this.events.push(arguments);
  };
  Mb.prototype.finish = function () {
    for (var a = 0; a < this.events.length; a++) K.apply(null, this.events[a]);
  };
  var r = (q.Pos = function (a, b) {
      if (!(this instanceof r)) return new r(a, b);
      this.line = a;
      this.ch = b;
    }),
    y = (q.cmpPos = function (a, b) {
      return a.line - b.line || a.ch - b.ch;
    }),
    X = null;
  Tc.prototype = V(
    {
      init: function (a) {
        function b(a) {
          if (d.somethingSelected())
            (X = d.getSelections()),
              c.inaccurateSelection &&
                ((c.prevInput = ""),
                (c.inaccurateSelection = !1),
                (f.value = X.join("\n")),
                Za(f));
          else if (d.options.lineWiseCopyCut) {
            var b = Vd(d);
            X = b.text;
            "cut" == a.type
              ? d.setSelections(b.ranges, null, ha)
              : ((c.prevInput = ""), (f.value = b.text.join("\n")), Za(f));
          } else return;
          "cut" == a.type && (d.state.cutIncoming = !0);
        }
        var c = this,
          d = this.cm,
          e = (this.wrapper = Xd()),
          f = (this.textarea = e.firstChild);
        a.wrapper.insertBefore(e, a.wrapper.firstChild);
        Qa && (f.style.width = "0px");
        v(f, "input", function () {
          B && 9 <= C && c.hasSelection && (c.hasSelection = null);
          c.poll();
        });
        v(f, "paste", function () {
          if (
            J &&
            !d.state.fakedLastChar &&
            !(200 > new Date() - d.state.lastMiddleDown)
          ) {
            var a = f.selectionStart,
              b = f.selectionEnd;
            f.value += "$";
            f.selectionEnd = b;
            f.selectionStart = a;
            d.state.fakedLastChar = !0;
          }
          d.state.pasteIncoming = !0;
          c.fastPoll();
        });
        v(f, "cut", b);
        v(f, "copy", b);
        v(a.scroller, "paste", function (b) {
          oa(a, b) || ((d.state.pasteIncoming = !0), c.focus());
        });
        v(a.lineSpace, "selectstart", function (b) {
          oa(a, b) || O(b);
        });
        v(f, "compositionstart", function () {
          var a = d.getCursor("from");
          c.composing = {
            start: a,
            range: d.markText(a, d.getCursor("to"), {
              className: "CodeMirror-composing",
            }),
          };
        });
        v(f, "compositionend", function () {
          c.composing &&
            (c.poll(), c.composing.range.clear(), (c.composing = null));
        });
      },
      prepareSelection: function () {
        var a = this.cm,
          b = a.display,
          c = a.doc,
          d = he(a);
        if (a.options.moveInputWithCursor) {
          var a = ma(a, c.sel.primary().head, "div"),
            c = b.wrapper.getBoundingClientRect(),
            e = b.lineDiv.getBoundingClientRect();
          d.teTop = Math.max(
            0,
            Math.min(b.wrapper.clientHeight - 10, a.top + e.top - c.top)
          );
          d.teLeft = Math.max(
            0,
            Math.min(b.wrapper.clientWidth - 10, a.left + e.left - c.left)
          );
        }
        return d;
      },
      showSelection: function (a) {
        var b = this.cm.display;
        U(b.cursorDiv, a.cursors);
        U(b.selectionDiv, a.selection);
        null != a.teTop &&
          ((this.wrapper.style.top = a.teTop + "px"),
          (this.wrapper.style.left = a.teLeft + "px"));
      },
      reset: function (a) {
        if (!this.contextMenuPending) {
          var b,
            c,
            d = this.cm,
            e = d.doc;
          d.somethingSelected()
            ? ((this.prevInput = ""),
              (b = e.sel.primary()),
              (c = (b =
                Ce &&
                (100 < b.to().line - b.from().line ||
                  1e3 < (c = d.getSelection()).length))
                ? "-"
                : c || d.getSelection()),
              (this.textarea.value = c),
              d.state.focused && Za(this.textarea),
              B && 9 <= C && (this.hasSelection = c))
            : a ||
              ((this.prevInput = this.textarea.value = ""),
              B && 9 <= C && (this.hasSelection = null));
          this.inaccurateSelection = b;
        }
      },
      getField: function () {
        return this.textarea;
      },
      supportsTouch: function () {
        return !1;
      },
      focus: function () {
        if (
          "nocursor" != this.cm.options.readOnly &&
          (!ab || fa() != this.textarea)
        )
          try {
            this.textarea.focus();
          } catch (a) {}
      },
      blur: function () {
        this.textarea.blur();
      },
      resetPosition: function () {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      },
      receivedFocus: function () {
        this.slowPoll();
      },
      slowPoll: function () {
        var a = this;
        a.pollingFast ||
          a.polling.set(this.cm.options.pollInterval, function () {
            a.poll();
            a.cm.state.focused && a.slowPoll();
          });
      },
      fastPoll: function () {
        function a() {
          c.poll() || b
            ? ((c.pollingFast = !1), c.slowPoll())
            : ((b = !0), c.polling.set(60, a));
        }
        var b = !1,
          c = this;
        c.pollingFast = !0;
        c.polling.set(20, a);
      },
      poll: function () {
        var a = this.cm,
          b = this.textarea,
          c = this.prevInput;
        if (
          !a.state.focused ||
          (ng(b) && !c) ||
          Rb(a) ||
          a.options.disableInput ||
          a.state.keySeq
        )
          return !1;
        a.state.pasteIncoming &&
          a.state.fakedLastChar &&
          ((b.value = b.value.substring(0, b.value.length - 1)),
          (a.state.fakedLastChar = !1));
        var d = b.value;
        if (d == c && !a.somethingSelected()) return !1;
        if (
          (B && 9 <= C && this.hasSelection === d) ||
          (W && /[\uf700-\uf7ff]/.test(d))
        )
          return a.display.input.reset(), !1;
        if (a.doc.sel == a.display.selForContextMenu) {
          var e = d.charCodeAt(0);
          8203 != e || c || (c = "​");
          if (8666 == e) return this.reset(), this.cm.execCommand("undo");
        }
        for (
          var f = 0, e = Math.min(c.length, d.length);
          f < e && c.charCodeAt(f) == d.charCodeAt(f);

        )
          ++f;
        var g = this;
        T(a, function () {
          Sc(
            a,
            d.slice(f),
            c.length - f,
            null,
            g.composing ? "*compose" : null
          );
          1e3 < d.length || -1 < d.indexOf("\n")
            ? (b.value = g.prevInput = "")
            : (g.prevInput = d);
          g.composing &&
            (g.composing.range.clear(),
            (g.composing.range = a.markText(
              g.composing.start,
              a.getCursor("to"),
              { className: "CodeMirror-composing" }
            )));
        });
        return !0;
      },
      ensurePolled: function () {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      },
      onKeyPress: function () {
        B && 9 <= C && (this.hasSelection = null);
        this.fastPoll();
      },
      onContextMenu: function (a) {
        function b() {
          if (null != g.selectionStart) {
            var a = e.somethingSelected(),
              b = "​" + (a ? g.value : "");
            g.value = "⇚";
            g.value = b;
            d.prevInput = a ? "" : "​";
            g.selectionStart = 1;
            g.selectionEnd = b.length;
            f.selForContextMenu = e.doc.sel;
          }
        }
        function c() {
          d.contextMenuPending = !1;
          d.wrapper.style.position = "relative";
          g.style.cssText = l;
          B && 9 > C && f.scrollbars.setScrollTop((f.scroller.scrollTop = k));
          if (null != g.selectionStart) {
            (!B || (B && 9 > C)) && b();
            var a = 0,
              c = function () {
                f.selForContextMenu == e.doc.sel &&
                0 == g.selectionStart &&
                0 < g.selectionEnd &&
                "​" == d.prevInput
                  ? G(e, ic.selectAll)(e)
                  : 10 > a++
                  ? (f.detectingSelectAll = setTimeout(c, 500))
                  : f.input.reset();
              };
            f.detectingSelectAll = setTimeout(c, 200);
          }
        }
        var d = this,
          e = d.cm,
          f = e.display,
          g = d.textarea,
          h = Ua(e, a),
          k = f.scroller.scrollTop;
        if (h && !ba) {
          e.options.resetSelectionOnContextMenu &&
            -1 == e.doc.sel.contains(h) &&
            G(e, H)(e.doc, ga(h), ha);
          var l = g.style.cssText;
          d.wrapper.style.position = "absolute";
          g.style.cssText =
            "position: fixed; width: 30px; height: 30px; top: " +
            (a.clientY - 5) +
            "px; left: " +
            (a.clientX - 5) +
            "px; z-index: 1000; background: " +
            (B ? "rgba(255, 255, 255, .05)" : "transparent") +
            "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity\x3d5);";
          if (J) var m = window.scrollY;
          f.input.focus();
          J && window.scrollTo(null, m);
          f.input.reset();
          e.somethingSelected() || (g.value = d.prevInput = " ");
          d.contextMenuPending = !0;
          f.selForContextMenu = e.doc.sel;
          clearTimeout(f.detectingSelectAll);
          B && 9 <= C && b();
          if (id) {
            jd(a);
            var p = function () {
              ka(window, "mouseup", p);
              setTimeout(c, 20);
            };
            v(window, "mouseup", p);
          } else setTimeout(c, 50);
        }
      },
      setUneditable: Eb,
      needsContentAttribute: !1,
    },
    Tc.prototype
  );
  Uc.prototype = V(
    {
      init: function (a) {
        function b(a) {
          if (d.somethingSelected())
            (X = d.getSelections()),
              "cut" == a.type && d.replaceSelection("", null, "cut");
          else if (d.options.lineWiseCopyCut) {
            var b = Vd(d);
            X = b.text;
            "cut" == a.type &&
              d.operation(function () {
                d.setSelections(b.ranges, 0, ha);
                d.replaceSelection("", null, "cut");
              });
          } else return;
          if (a.clipboardData && !Qa)
            a.preventDefault(),
              a.clipboardData.clearData(),
              a.clipboardData.setData("text/plain", X.join("\n"));
          else {
            var c = Xd();
            a = c.firstChild;
            d.display.lineSpace.insertBefore(c, d.display.lineSpace.firstChild);
            a.value = X.join("\n");
            var h = document.activeElement;
            Za(a);
            setTimeout(function () {
              d.display.lineSpace.removeChild(c);
              h.focus();
            }, 50);
          }
        }
        var c = this,
          d = c.cm;
        a = c.div = a.lineDiv;
        a.contentEditable = "true";
        Wd(a);
        v(a, "paste", function (a) {
          var b = a.clipboardData && a.clipboardData.getData("text/plain");
          b && (a.preventDefault(), d.replaceSelection(b, null, "paste"));
        });
        v(a, "compositionstart", function (a) {
          a = a.data;
          c.composing = { sel: d.doc.sel, data: a, startData: a };
          if (a) {
            var b = d.doc.sel.primary(),
              g = d
                .getLine(b.head.line)
                .indexOf(a, Math.max(0, b.head.ch - a.length));
            -1 < g &&
              g <= b.head.ch &&
              (c.composing.sel = ga(
                r(b.head.line, g),
                r(b.head.line, g + a.length)
              ));
          }
        });
        v(a, "compositionupdate", function (a) {
          c.composing.data = a.data;
        });
        v(a, "compositionend", function (a) {
          var b = c.composing;
          b &&
            (a.data == b.startData ||
              /\u200b/.test(a.data) ||
              (b.data = a.data),
            setTimeout(function () {
              b.handled || c.applyComposition(b);
              c.composing == b && (c.composing = null);
            }, 50));
        });
        v(a, "touchstart", function () {
          c.forceCompositionEnd();
        });
        v(a, "input", function () {
          c.composing ||
            c.pollContent() ||
            T(c.cm, function () {
              Q(d);
            });
        });
        v(a, "copy", b);
        v(a, "cut", b);
      },
      prepareSelection: function () {
        var a = he(this.cm, !1);
        a.focus = this.cm.state.focused;
        return a;
      },
      showSelection: function (a) {
        a &&
          this.cm.display.view.length &&
          (a.focus && this.showPrimarySelection(),
          this.showMultipleSelections(a));
      },
      showPrimarySelection: function () {
        var a = window.getSelection(),
          b = this.cm.doc.sel.primary(),
          c = Tb(this.cm, a.anchorNode, a.anchorOffset),
          d = Tb(this.cm, a.focusNode, a.focusOffset);
        if (
          !c ||
          c.bad ||
          !d ||
          d.bad ||
          0 != y(Qb(c, d), b.from()) ||
          0 != y(Pb(c, d), b.to())
        )
          if (
            ((c = Yd(this.cm, b.from())), (d = Yd(this.cm, b.to())), c || d)
          ) {
            var e = this.cm.display.view,
              b = a.rangeCount && a.getRangeAt(0);
            c
              ? d ||
                ((d = e[e.length - 1].measure),
                (d = d.maps ? d.maps[d.maps.length - 1] : d.map),
                (d = {
                  node: d[d.length - 1],
                  offset: d[d.length - 2] - d[d.length - 3],
                }))
              : (c = { node: e[0].measure.map[2], offset: 0 });
            try {
              var f = Ea(c.node, c.offset, d.offset, d.node);
            } catch (g) {}
            f &&
              (a.removeAllRanges(),
              a.addRange(f),
              b && null == a.anchorNode
                ? a.addRange(b)
                : wa && this.startGracePeriod());
            this.rememberSelection();
          }
      },
      startGracePeriod: function () {
        var a = this;
        clearTimeout(this.gracePeriod);
        this.gracePeriod = setTimeout(function () {
          a.gracePeriod = !1;
          a.selectionChanged() &&
            a.cm.operation(function () {
              a.cm.curOp.selectionChanged = !0;
            });
        }, 20);
      },
      showMultipleSelections: function (a) {
        U(this.cm.display.cursorDiv, a.cursors);
        U(this.cm.display.selectionDiv, a.selection);
      },
      rememberSelection: function () {
        var a = window.getSelection();
        this.lastAnchorNode = a.anchorNode;
        this.lastAnchorOffset = a.anchorOffset;
        this.lastFocusNode = a.focusNode;
        this.lastFocusOffset = a.focusOffset;
      },
      selectionInEditor: function () {
        var a = window.getSelection();
        if (!a.rangeCount) return !1;
        a = a.getRangeAt(0).commonAncestorContainer;
        return Wc(this.div, a);
      },
      focus: function () {
        "nocursor" != this.cm.options.readOnly && this.div.focus();
      },
      blur: function () {
        this.div.blur();
      },
      getField: function () {
        return this.div;
      },
      supportsTouch: function () {
        return !0;
      },
      receivedFocus: function () {
        function a() {
          b.cm.state.focused &&
            (b.pollSelection(), b.polling.set(b.cm.options.pollInterval, a));
        }
        var b = this;
        this.selectionInEditor()
          ? this.pollSelection()
          : T(this.cm, function () {
              b.cm.curOp.selectionChanged = !0;
            });
        this.polling.set(this.cm.options.pollInterval, a);
      },
      selectionChanged: function () {
        var a = window.getSelection();
        return (
          a.anchorNode != this.lastAnchorNode ||
          a.anchorOffset != this.lastAnchorOffset ||
          a.focusNode != this.lastFocusNode ||
          a.focusOffset != this.lastFocusOffset
        );
      },
      pollSelection: function () {
        if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
          var a = window.getSelection(),
            b = this.cm;
          this.rememberSelection();
          var c = Tb(b, a.anchorNode, a.anchorOffset),
            d = Tb(b, a.focusNode, a.focusOffset);
          c &&
            d &&
            T(b, function () {
              H(b.doc, ga(c, d), ha);
              if (c.bad || d.bad) b.curOp.selectionChanged = !0;
            });
        }
      },
      pollContent: function () {
        var a = this.cm,
          b = a.display,
          c = a.doc.sel.primary(),
          d = c.from(),
          c = c.to();
        if (d.line < b.viewFrom || c.line > b.viewTo - 1) return !1;
        var e;
        d.line == b.viewFrom || 0 == (e = Ca(a, d.line))
          ? ((d = F(b.view[0].line)), (e = b.view[0].node))
          : ((d = F(b.view[e].line)), (e = b.view[e - 1].node.nextSibling));
        var f = Ca(a, c.line);
        f == b.view.length - 1
          ? ((c = b.viewTo - 1), (b = b.view[f].node))
          : ((c = F(b.view[f + 1].line) - 1),
            (b = b.view[f + 1].node.previousSibling));
        b = sa(xf(a, e, b, d, c));
        for (
          e = Da(a.doc, r(d, 0), r(c, u(a.doc, c).text.length));
          1 < b.length && 1 < e.length;

        )
          if (A(b) == A(e)) b.pop(), e.pop(), c--;
          else if (b[0] == e[0]) b.shift(), e.shift(), d++;
          else break;
        for (
          var g = 0,
            f = 0,
            h = b[0],
            k = e[0],
            l = Math.min(h.length, k.length);
          g < l && h.charCodeAt(g) == k.charCodeAt(g);

        )
          ++g;
        h = A(b);
        k = A(e);
        for (
          l = Math.min(
            h.length - (1 == b.length ? g : 0),
            k.length - (1 == e.length ? g : 0)
          );
          f < l &&
          h.charCodeAt(h.length - f - 1) == k.charCodeAt(k.length - f - 1);

        )
          ++f;
        b[b.length - 1] = h.slice(0, h.length - f);
        b[0] = b[0].slice(g);
        d = r(d, g);
        c = r(c, e.length ? A(e).length - f : 0);
        if (1 < b.length || b[0] || y(d, c))
          return wb(a.doc, b, d, c, "+input"), !0;
      },
      ensurePolled: function () {
        this.forceCompositionEnd();
      },
      reset: function () {
        this.forceCompositionEnd();
      },
      forceCompositionEnd: function () {
        this.composing &&
          !this.composing.handled &&
          (this.applyComposition(this.composing),
          (this.composing.handled = !0),
          this.div.blur(),
          this.div.focus());
      },
      applyComposition: function (a) {
        a.data &&
          a.data != a.startData &&
          G(this.cm, Sc)(this.cm, a.data, 0, a.sel);
      },
      setUneditable: function (a) {
        a.setAttribute("contenteditable", "false");
      },
      onKeyPress: function (a) {
        a.preventDefault();
        G(this.cm, Sc)(
          this.cm,
          String.fromCharCode(null == a.charCode ? a.keyCode : a.charCode),
          0
        );
      },
      onContextMenu: Eb,
      resetPosition: Eb,
      needsContentAttribute: !0,
    },
    Uc.prototype
  );
  q.inputStyles = { textarea: Tc, contenteditable: Uc };
  la.prototype = {
    primary: function () {
      return this.ranges[this.primIndex];
    },
    equals: function (a) {
      if (a == this) return !0;
      if (
        a.primIndex != this.primIndex ||
        a.ranges.length != this.ranges.length
      )
        return !1;
      for (var b = 0; b < this.ranges.length; b++) {
        var c = this.ranges[b],
          d = a.ranges[b];
        if (0 != y(c.anchor, d.anchor) || 0 != y(c.head, d.head)) return !1;
      }
      return !0;
    },
    deepCopy: function () {
      for (var a = [], b = 0; b < this.ranges.length; b++)
        a[b] = new z(Rc(this.ranges[b].anchor), Rc(this.ranges[b].head));
      return new la(a, this.primIndex);
    },
    somethingSelected: function () {
      for (var a = 0; a < this.ranges.length; a++)
        if (!this.ranges[a].empty()) return !0;
      return !1;
    },
    contains: function (a, b) {
      b || (b = a);
      for (var c = 0; c < this.ranges.length; c++) {
        var d = this.ranges[c];
        if (0 <= y(b, d.from()) && 0 >= y(a, d.to())) return c;
      }
      return -1;
    },
  };
  z.prototype = {
    from: function () {
      return Qb(this.anchor, this.head);
    },
    to: function () {
      return Pb(this.anchor, this.head);
    },
    empty: function () {
      return (
        this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
      );
    },
  };
  var ad = { left: 0, right: 0, top: 0, bottom: 0 },
    Fa,
    Ta = null,
    Ff = 0,
    fc,
    ec,
    se = 0,
    gc = 0,
    R = null;
  B ? (R = -0.53) : wa ? (R = 15) : kg ? (R = -0.7) : te && (R = -1 / 3);
  var ze = function (a) {
    var b = a.wheelDeltaX,
      c = a.wheelDeltaY;
    null == b && a.detail && a.axis == a.HORIZONTAL_AXIS && (b = a.detail);
    null == c && a.detail && a.axis == a.VERTICAL_AXIS
      ? (c = a.detail)
      : null == c && (c = a.wheelDelta);
    return { x: b, y: c };
  };
  q.wheelEventPixels = function (a) {
    a = ze(a);
    a.x *= R;
    a.y *= R;
    return a;
  };
  var Qf = new bb(),
    md = null,
    ta = (q.changeEnd = function (a) {
      return a.text
        ? r(
            a.from.line + a.text.length - 1,
            A(a.text).length + (1 == a.text.length ? a.from.ch : 0)
          )
        : a.to;
    });
  q.prototype = {
    constructor: q,
    focus: function () {
      window.focus();
      this.display.input.focus();
    },
    setOption: function (a, b) {
      var c = this.options,
        d = c[a];
      if (c[a] != b || "mode" == a)
        (c[a] = b), Ka.hasOwnProperty(a) && G(this, Ka[a])(this, b, d);
    },
    getOption: function (a) {
      return this.options[a];
    },
    getDoc: function () {
      return this.doc;
    },
    addKeyMap: function (a, b) {
      this.state.keyMaps[b ? "push" : "unshift"](pc(a));
    },
    removeKeyMap: function (a) {
      for (var b = this.state.keyMaps, c = 0; c < b.length; ++c)
        if (b[c] == a || b[c].name == a) return b.splice(c, 1), !0;
    },
    addOverlay: M(function (a, b) {
      var c = a.token ? a : q.getMode(this.options, a);
      if (c.startState) throw Error("Overlays may not be stateful.");
      this.state.overlays.push({ mode: c, modeSpec: a, opaque: b && b.opaque });
      this.state.modeGen++;
      Q(this);
    }),
    removeOverlay: M(function (a) {
      for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
        var d = b[c].modeSpec;
        if (d == a || ("string" == typeof a && d.name == a)) {
          b.splice(c, 1);
          this.state.modeGen++;
          Q(this);
          break;
        }
      }
    }),
    indentLine: M(function (a, b, c) {
      "string" != typeof b &&
        "number" != typeof b &&
        (b =
          null == b
            ? this.options.smartIndent
              ? "smart"
              : "prev"
            : b
            ? "add"
            : "subtract");
      qb(this.doc, a) && pb(this, a, b, c);
    }),
    indentSelection: M(function (a) {
      for (var b = this.doc.sel.ranges, c = -1, d = 0; d < b.length; d++) {
        var e = b[d];
        if (e.empty())
          e.head.line > c &&
            (pb(this, e.head.line, a, !0),
            (c = e.head.line),
            d == this.doc.sel.primIndex && Pa(this));
        else {
          for (
            var f = e.from(),
              e = e.to(),
              g = Math.max(c, f.line),
              c = Math.min(this.lastLine(), e.line - (e.ch ? 0 : 1)) + 1,
              e = g;
            e < c;
            ++e
          )
            pb(this, e, a);
          e = this.doc.sel.ranges;
          0 == f.ch &&
            b.length == e.length &&
            0 < e[d].from().ch &&
            Xc(this.doc, d, new z(f, e[d].to()), ha);
        }
      }
    }),
    getTokenAt: function (a, b) {
      return Ye(this, a, b);
    },
    getLineTokens: function (a, b) {
      return Ye(this, r(a), b, !0);
    },
    getTokenTypeAt: function (a) {
      a = w(this.doc, a);
      var b = $e(this, u(this.doc, a.line)),
        c = 0,
        d = (b.length - 1) / 2;
      a = a.ch;
      if (0 == a) b = b[2];
      else
        for (;;) {
          var e = (c + d) >> 1;
          if ((e ? b[2 * e - 1] : 0) >= a) d = e;
          else if (b[2 * e + 1] < a) c = e + 1;
          else {
            b = b[2 * e + 2];
            break;
          }
        }
      c = b ? b.indexOf("cm-overlay ") : -1;
      return 0 > c ? b : 0 == c ? null : b.slice(0, c - 1);
    },
    getModeAt: function (a) {
      var b = this.doc.mode;
      return b.innerMode ? q.innerMode(b, this.getTokenAt(a).state).mode : b;
    },
    getHelper: function (a, b) {
      return this.getHelpers(a, b)[0];
    },
    getHelpers: function (a, b) {
      var c = [];
      if (!$a.hasOwnProperty(b)) return c;
      var d = $a[b],
        e = this.getModeAt(a);
      if ("string" == typeof e[b]) d[e[b]] && c.push(d[e[b]]);
      else if (e[b])
        for (var f = 0; f < e[b].length; f++) {
          var g = d[e[b][f]];
          g && c.push(g);
        }
      else
        e.helperType && d[e.helperType]
          ? c.push(d[e.helperType])
          : d[e.name] && c.push(d[e.name]);
      for (f = 0; f < d._global.length; f++)
        (g = d._global[f]),
          g.pred(e, this) && -1 == D(c, g.val) && c.push(g.val);
      return c;
    },
    getStateAfter: function (a, b) {
      var c = this.doc;
      a = Math.max(
        c.first,
        Math.min(null == a ? c.first + c.size - 1 : a, c.first + c.size - 1)
      );
      return sb(this, a + 1, b);
    },
    cursorCoords: function (a, b) {
      var c;
      c = this.doc.sel.primary();
      c =
        null == a
          ? c.head
          : "object" == typeof a
          ? w(this.doc, a)
          : a
          ? c.from()
          : c.to();
      return ma(this, c, b || "page");
    },
    charCoords: function (a, b) {
      return Yb(this, w(this.doc, a), b || "page");
    },
    coordsChar: function (a, b) {
      a = ne(this, a, b || "page");
      return fd(this, a.left, a.top);
    },
    lineAtHeight: function (a, b) {
      a = ne(this, { top: a, left: 0 }, b || "page").top;
      return Ba(this.doc, a + this.display.viewOffset);
    },
    heightAtLine: function (a, b) {
      var c = !1,
        d;
      "number" == typeof a
        ? ((d = this.doc.first + this.doc.size - 1),
          a < this.doc.first
            ? (a = this.doc.first)
            : a > d && ((a = d), (c = !0)),
          (d = u(this.doc, a)))
        : (d = a);
      return (
        cd(this, d, { top: 0, left: 0 }, b || "page").top +
        (c ? this.doc.height - ea(d) : 0)
      );
    },
    defaultTextHeight: function () {
      return xa(this.display);
    },
    defaultCharWidth: function () {
      return gb(this.display);
    },
    setGutterMarker: M(function (a, b, c) {
      return nc(this.doc, a, "gutter", function (a) {
        var e = a.gutterMarkers || (a.gutterMarkers = {});
        e[b] = c;
        !c && hf(e) && (a.gutterMarkers = null);
        return !0;
      });
    }),
    clearGutter: M(function (a) {
      var b = this,
        c = b.doc,
        d = c.first;
      c.iter(function (c) {
        c.gutterMarkers &&
          c.gutterMarkers[a] &&
          ((c.gutterMarkers[a] = null),
          na(b, d, "gutter"),
          hf(c.gutterMarkers) && (c.gutterMarkers = null));
        ++d;
      });
    }),
    lineInfo: function (a) {
      if ("number" == typeof a) {
        if (!qb(this.doc, a)) return null;
        var b = a;
        a = u(this.doc, a);
        if (!a) return null;
      } else if (((b = F(a)), null == b)) return null;
      return {
        line: b,
        handle: a,
        text: a.text,
        gutterMarkers: a.gutterMarkers,
        textClass: a.textClass,
        bgClass: a.bgClass,
        wrapClass: a.wrapClass,
        widgets: a.widgets,
      };
    },
    getViewport: function () {
      return { from: this.display.viewFrom, to: this.display.viewTo };
    },
    addWidget: function (a, b, c, d, e) {
      var f = this.display;
      a = ma(this, w(this.doc, a));
      var g = a.bottom,
        h = a.left;
      b.style.position = "absolute";
      b.setAttribute("cm-ignore-events", "true");
      this.display.input.setUneditable(b);
      f.sizer.appendChild(b);
      if ("over" == d) g = a.top;
      else if ("above" == d || "near" == d) {
        var k = Math.max(f.wrapper.clientHeight, this.doc.height),
          l = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
        ("above" == d || a.bottom + b.offsetHeight > k) &&
        a.top > b.offsetHeight
          ? (g = a.top - b.offsetHeight)
          : a.bottom + b.offsetHeight <= k && (g = a.bottom);
        h + b.offsetWidth > l && (h = l - b.offsetWidth);
      }
      b.style.top = g + "px";
      b.style.left = b.style.right = "";
      "right" == e
        ? ((h = f.sizer.clientWidth - b.offsetWidth), (b.style.right = "0px"))
        : ("left" == e
            ? (h = 0)
            : "middle" == e && (h = (f.sizer.clientWidth - b.offsetWidth) / 2),
          (b.style.left = h + "px"));
      c &&
        ((a = cc(this, h, g, h + b.offsetWidth, g + b.offsetHeight)),
        null != a.scrollTop && lb(this, a.scrollTop),
        null != a.scrollLeft && Ma(this, a.scrollLeft));
    },
    triggerOnKeyDown: M(ve),
    triggerOnKeyPress: M(we),
    triggerOnKeyUp: ue,
    execCommand: function (a) {
      if (ic.hasOwnProperty(a)) return ic[a](this);
    },
    findPosH: function (a, b, c, d) {
      var e = 1;
      0 > b && ((e = -1), (b = -b));
      var f = 0;
      for (
        a = w(this.doc, a);
        f < b && ((a = rd(this.doc, a, e, c, d)), !a.hitSide);
        ++f
      );
      return a;
    },
    moveH: M(function (a, b) {
      var c = this;
      c.extendSelectionsBy(function (d) {
        return c.display.shift || c.doc.extend || d.empty()
          ? rd(c.doc, d.head, a, b, c.options.rtlMoveVisually)
          : 0 > a
          ? d.from()
          : d.to();
      }, Gb);
    }),
    deleteH: M(function (a, b) {
      var c = this.doc;
      this.doc.sel.somethingSelected()
        ? c.replaceSelection("", null, "+delete")
        : Va(this, function (d) {
            var e = rd(c, d.head, a, b, !1);
            return 0 > a ? { from: e, to: d.head } : { from: d.head, to: e };
          });
    }),
    findPosV: function (a, b, c, d) {
      var e = 1;
      0 > b && ((e = -1), (b = -b));
      var f = 0;
      for (
        a = w(this.doc, a);
        f < b &&
        ((a = ma(this, a, "div")),
        null == d ? (d = a.left) : (a.left = d),
        (a = Pe(this, a, e, c)),
        !a.hitSide);
        ++f
      );
      return a;
    },
    moveV: M(function (a, b) {
      var c = this,
        d = this.doc,
        e = [],
        f = !c.display.shift && !d.extend && d.sel.somethingSelected();
      d.extendSelectionsBy(function (g) {
        if (f) return 0 > a ? g.from() : g.to();
        var k = ma(c, g.head, "div");
        null != g.goalColumn && (k.left = g.goalColumn);
        e.push(k.left);
        var l = Pe(c, k, a, b);
        "page" == b &&
          g == d.sel.primary() &&
          lc(c, null, Yb(c, l, "div").top - k.top);
        return l;
      }, Gb);
      if (e.length)
        for (var g = 0; g < d.sel.ranges.length; g++)
          d.sel.ranges[g].goalColumn = e[g];
    }),
    findWordAt: function (a) {
      var b = u(this.doc, a.line).text,
        c = a.ch,
        d = a.ch;
      if (b) {
        var e = this.getHelper(a, "wordChars");
        (0 > a.xRel || d == b.length) && c ? --c : ++d;
        for (
          var f = b.charAt(c),
            f = oc(f, e)
              ? function (a) {
                  return oc(a, e);
                }
              : /\s/.test(f)
              ? function (a) {
                  return /\s/.test(a);
                }
              : function (a) {
                  return !/\s/.test(a) && !oc(a);
                };
          0 < c && f(b.charAt(c - 1));

        )
          --c;
        for (; d < b.length && f(b.charAt(d)); ) ++d;
      }
      return new z(r(a.line, c), r(a.line, d));
    },
    toggleOverwrite: function (a) {
      if (null == a || a != this.state.overwrite)
        (this.state.overwrite = !this.state.overwrite)
          ? mb(this.display.cursorDiv, "CodeMirror-overwrite")
          : kb(this.display.cursorDiv, "CodeMirror-overwrite"),
          K(this, "overwriteToggle", this, this.state.overwrite);
    },
    hasFocus: function () {
      return this.display.input.getField() == fa();
    },
    scrollTo: M(function (a, b) {
      (null == a && null == b) || mc(this);
      null != a && (this.curOp.scrollLeft = a);
      null != b && (this.curOp.scrollTop = b);
    }),
    getScrollInfo: function () {
      var a = this.display.scroller;
      return {
        left: a.scrollLeft,
        top: a.scrollTop,
        height: a.scrollHeight - da(this) - this.display.barHeight,
        width: a.scrollWidth - da(this) - this.display.barWidth,
        clientHeight: Nc(this),
        clientWidth: pa(this),
      };
    },
    scrollIntoView: M(function (a, b) {
      null == a
        ? ((a = { from: this.doc.sel.primary().head, to: null }),
          null == b && (b = this.options.cursorScrollMargin))
        : "number" == typeof a
        ? (a = { from: r(a, 0), to: null })
        : null == a.from && (a = { from: a, to: null });
      a.to || (a.to = a.from);
      a.margin = b || 0;
      if (null != a.from.line) mc(this), (this.curOp.scrollToPos = a);
      else {
        var c = cc(
          this,
          Math.min(a.from.left, a.to.left),
          Math.min(a.from.top, a.to.top) - a.margin,
          Math.max(a.from.right, a.to.right),
          Math.max(a.from.bottom, a.to.bottom) + a.margin
        );
        this.scrollTo(c.scrollLeft, c.scrollTop);
      }
    }),
    setSize: M(function (a, b) {
      function c(a) {
        return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a;
      }
      var d = this;
      null != a && (d.display.wrapper.style.width = c(a));
      null != b && (d.display.wrapper.style.height = c(b));
      d.options.lineWrapping && me(this);
      var e = d.display.viewFrom;
      d.doc.iter(e, d.display.viewTo, function (a) {
        if (a.widgets)
          for (var b = 0; b < a.widgets.length; b++)
            if (a.widgets[b].noHScroll) {
              na(d, e, "widget");
              break;
            }
        ++e;
      });
      d.curOp.forceUpdate = !0;
      K(d, "refresh", this);
    }),
    operation: function (a) {
      return T(this, a);
    },
    refresh: M(function () {
      var a = this.display.cachedTextHeight;
      Q(this);
      this.curOp.forceUpdate = !0;
      hb(this);
      this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
      Cc(this);
      (null == a || 0.5 < Math.abs(a - xa(this.display))) && Ac(this);
      K(this, "refresh", this);
    }),
    swapDoc: M(function (a) {
      var b = this.doc;
      b.cm = null;
      Ed(this, a);
      hb(this);
      this.display.input.reset();
      this.scrollTo(a.scrollLeft, a.scrollTop);
      this.curOp.forceScroll = !0;
      L(this, "swapDoc", this, b);
      return b;
    }),
    getInputField: function () {
      return this.display.input.getField();
    },
    getWrapperElement: function () {
      return this.display.wrapper;
    },
    getScrollerElement: function () {
      return this.display.scroller;
    },
    getGutterElement: function () {
      return this.display.gutters;
    },
  };
  Ya(q);
  var qf = (q.defaults = {}),
    Ka = (q.optionHandlers = {}),
    Fd = (q.Init = {
      toString: function () {
        return "CodeMirror.Init";
      },
    });
  x(
    "value",
    "",
    function (a, b) {
      a.setValue(b);
    },
    !0
  );
  x(
    "mode",
    null,
    function (a, b) {
      a.doc.modeOption = b;
      zc(a);
    },
    !0
  );
  x("indentUnit", 2, zc, !0);
  x("indentWithTabs", !1);
  x("smartIndent", !0);
  x(
    "tabSize",
    4,
    function (a) {
      eb(a);
      hb(a);
      Q(a);
    },
    !0
  );
  x(
    "specialChars",
    /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,
    function (a, b, c) {
      a.state.specialChars = new RegExp(
        b.source + (b.test("\t") ? "" : "|\t"),
        "g"
      );
      c != q.Init && a.refresh();
    }
  );
  x(
    "specialCharPlaceholder",
    function (a) {
      var b = t("span", "•", "cm-invalidchar");
      b.title = "\\u" + a.charCodeAt(0).toString(16);
      b.setAttribute("aria-label", b.title);
      return b;
    },
    function (a) {
      a.refresh();
    },
    !0
  );
  x("electricChars", !0);
  x(
    "inputStyle",
    ab ? "contenteditable" : "textarea",
    function () {
      throw Error("inputStyle can not (yet) be changed in a running editor");
    },
    !0
  );
  x("rtlMoveVisually", !mg);
  x("wholeLineUpdateBefore", !0);
  x(
    "theme",
    "default",
    function (a) {
      Bd(a);
      ib(a);
    },
    !0
  );
  x("keyMap", "default", function (a, b, c) {
    b = pc(b);
    (c = c != q.Init && pc(c)) && c.detach && c.detach(a, b);
    b.attach && b.attach(a, c || null);
  });
  x("extraKeys", null);
  x(
    "lineWrapping",
    !1,
    function (a) {
      a.options.lineWrapping
        ? (mb(a.display.wrapper, "CodeMirror-wrap"),
          (a.display.sizer.style.minWidth = ""),
          (a.display.sizerWidth = null))
        : (kb(a.display.wrapper, "CodeMirror-wrap"), Dc(a));
      Ac(a);
      Q(a);
      hb(a);
      setTimeout(function () {
        Na(a);
      }, 100);
    },
    !0
  );
  x(
    "gutters",
    [],
    function (a) {
      wc(a.options);
      ib(a);
    },
    !0
  );
  x(
    "fixedGutter",
    !0,
    function (a, b) {
      a.display.gutters.style.left = b ? Ic(a.display) + "px" : "0";
      a.refresh();
    },
    !0
  );
  x(
    "coverGutterNextToScrollbar",
    !1,
    function (a) {
      Na(a);
    },
    !0
  );
  x(
    "scrollbarStyle",
    "native",
    function (a) {
      Cd(a);
      Na(a);
      a.display.scrollbars.setScrollTop(a.doc.scrollTop);
      a.display.scrollbars.setScrollLeft(a.doc.scrollLeft);
    },
    !0
  );
  x(
    "lineNumbers",
    !1,
    function (a) {
      wc(a.options);
      ib(a);
    },
    !0
  );
  x("firstLineNumber", 1, ib, !0);
  x(
    "lineNumberFormatter",
    function (a) {
      return a;
    },
    ib,
    !0
  );
  x("showCursorWhenSelecting", !1, nb, !0);
  x("resetSelectionOnContextMenu", !0);
  x("lineWiseCopyCut", !0);
  x("readOnly", !1, function (a, b) {
    "nocursor" == b
      ? (db(a), a.display.input.blur(), (a.display.disabled = !0))
      : ((a.display.disabled = !1), b || a.display.input.reset());
  });
  x(
    "disableInput",
    !1,
    function (a, b) {
      b || a.display.input.reset();
    },
    !0
  );
  x("dragDrop", !0, function (a, b, c) {
    !b != !(c && c != q.Init) &&
      ((c = a.display.dragFunctions),
      (b = b ? v : ka),
      b(a.display.scroller, "dragstart", c.start),
      b(a.display.scroller, "dragenter", c.simple),
      b(a.display.scroller, "dragover", c.simple),
      b(a.display.scroller, "drop", c.drop));
  });
  x("cursorBlinkRate", 530);
  x("cursorScrollMargin", 0);
  x("cursorHeight", 1, nb, !0);
  x("singleCursorHeightPerLine", !0, nb, !0);
  x("workTime", 100);
  x("workDelay", 100);
  x("flattenSpans", !0, eb, !0);
  x("addModeClass", !1, eb, !0);
  x("pollInterval", 100);
  x("undoDepth", 200, function (a, b) {
    a.doc.history.undoDepth = b;
  });
  x("historyEventDelay", 1250);
  x(
    "viewportMargin",
    10,
    function (a) {
      a.refresh();
    },
    !0
  );
  x("maxHighlightLength", 1e4, eb, !0);
  x("moveInputWithCursor", !0, function (a, b) {
    b || a.display.input.resetPosition();
  });
  x("tabindex", null, function (a, b) {
    a.display.input.getField().tabIndex = b || "";
  });
  x("autofocus", null);
  var pf = (q.modes = {}),
    Hb = (q.mimeModes = {});
  q.defineMode = function (a, b) {
    q.defaults.mode || "null" == a || (q.defaults.mode = a);
    2 < arguments.length &&
      (b.dependencies = Array.prototype.slice.call(arguments, 2));
    pf[a] = b;
  };
  q.defineMIME = function (a, b) {
    Hb[a] = b;
  };
  q.resolveMode = function (a) {
    if ("string" == typeof a && Hb.hasOwnProperty(a)) a = Hb[a];
    else if (a && "string" == typeof a.name && Hb.hasOwnProperty(a.name)) {
      var b = Hb[a.name];
      "string" == typeof b && (b = { name: b });
      a = ff(b, a);
      a.name = b.name;
    } else if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a))
      return q.resolveMode("application/xml");
    return "string" == typeof a ? { name: a } : a || { name: "null" };
  };
  q.getMode = function (a, b) {
    b = q.resolveMode(b);
    var c = pf[b.name];
    if (!c) return q.getMode(a, "text/plain");
    c = c(a, b);
    if (Ib.hasOwnProperty(b.name)) {
      var d = Ib[b.name],
        e;
      for (e in d)
        d.hasOwnProperty(e) &&
          (c.hasOwnProperty(e) && (c["_" + e] = c[e]), (c[e] = d[e]));
    }
    c.name = b.name;
    b.helperType && (c.helperType = b.helperType);
    if (b.modeProps) for (e in b.modeProps) c[e] = b.modeProps[e];
    return c;
  };
  q.defineMode("null", function () {
    return {
      token: function (a) {
        a.skipToEnd();
      },
    };
  });
  q.defineMIME("text/plain", "null");
  var Ib = (q.modeExtensions = {});
  q.extendMode = function (a, b) {
    var c = Ib.hasOwnProperty(a) ? Ib[a] : (Ib[a] = {});
    V(b, c);
  };
  q.defineExtension = function (a, b) {
    q.prototype[a] = b;
  };
  q.defineDocExtension = function (a, b) {
    P.prototype[a] = b;
  };
  q.defineOption = x;
  var yc = [];
  q.defineInitHook = function (a) {
    yc.push(a);
  };
  var $a = (q.helpers = {});
  q.registerHelper = function (a, b, c) {
    $a.hasOwnProperty(a) || ($a[a] = q[a] = { _global: [] });
    $a[a][b] = c;
  };
  q.registerGlobalHelper = function (a, b, c, d) {
    q.registerHelper(a, b, d);
    $a[a]._global.push({ pred: c, val: d });
  };
  var Sa = (q.copyState = function (a, b) {
      if (!0 === b) return b;
      if (a.copyState) return a.copyState(b);
      var c = {},
        d;
      for (d in b) {
        var e = b[d];
        e instanceof Array && (e = e.concat([]));
        c[d] = e;
      }
      return c;
    }),
    Df = (q.startState = function (a, b, c) {
      return a.startState ? a.startState(b, c) : !0;
    });
  q.innerMode = function (a, b) {
    for (; a.innerMode; ) {
      var c = a.innerMode(b);
      if (!c || c.mode == a) break;
      b = c.state;
      a = c.mode;
    }
    return c || { mode: a, state: b };
  };
  var ic = (q.commands = {
      selectAll: function (a) {
        a.setSelection(r(a.firstLine(), 0), r(a.lastLine()), ha);
      },
      singleSelection: function (a) {
        a.setSelection(a.getCursor("anchor"), a.getCursor("head"), ha);
      },
      killLine: function (a) {
        Va(a, function (b) {
          if (b.empty()) {
            var c = u(a.doc, b.head.line).text.length;
            return b.head.ch == c && b.head.line < a.lastLine()
              ? { from: b.head, to: r(b.head.line + 1, 0) }
              : { from: b.head, to: r(b.head.line, c) };
          }
          return { from: b.from(), to: b.to() };
        });
      },
      deleteLine: function (a) {
        Va(a, function (b) {
          return {
            from: r(b.from().line, 0),
            to: w(a.doc, r(b.to().line + 1, 0)),
          };
        });
      },
      delLineLeft: function (a) {
        Va(a, function (a) {
          return { from: r(a.from().line, 0), to: a.from() };
        });
      },
      delWrappedLineLeft: function (a) {
        Va(a, function (b) {
          var c = a.charCoords(b.head, "div").top + 5;
          return {
            from: a.coordsChar({ left: 0, top: c }, "div"),
            to: b.from(),
          };
        });
      },
      delWrappedLineRight: function (a) {
        Va(a, function (b) {
          var c = a.charCoords(b.head, "div").top + 5,
            c = a.coordsChar(
              { left: a.display.lineDiv.offsetWidth + 100, top: c },
              "div"
            );
          return { from: b.from(), to: c };
        });
      },
      undo: function (a) {
        a.undo();
      },
      redo: function (a) {
        a.redo();
      },
      undoSelection: function (a) {
        a.undoSelection();
      },
      redoSelection: function (a) {
        a.redoSelection();
      },
      goDocStart: function (a) {
        a.extendSelection(r(a.firstLine(), 0));
      },
      goDocEnd: function (a) {
        a.extendSelection(r(a.lastLine()));
      },
      goLineStart: function (a) {
        a.extendSelectionsBy(
          function (b) {
            return kf(a, b.head.line);
          },
          { origin: "+move", bias: 1 }
        );
      },
      goLineStartSmart: function (a) {
        a.extendSelectionsBy(
          function (b) {
            return lf(a, b.head);
          },
          { origin: "+move", bias: 1 }
        );
      },
      goLineEnd: function (a) {
        a.extendSelectionsBy(
          function (b) {
            b = b.head.line;
            for (var c, d = u(a.doc, b); (c = Aa(d, !1)); )
              (d = c.find(1, !0).line), (b = null);
            c = (c = Y(d)) ? (c[0].level % 2 ? ac(d) : bc(d)) : d.text.length;
            return r(null == b ? F(d) : b, c);
          },
          { origin: "+move", bias: -1 }
        );
      },
      goLineRight: function (a) {
        a.extendSelectionsBy(function (b) {
          b = a.charCoords(b.head, "div").top + 5;
          return a.coordsChar(
            { left: a.display.lineDiv.offsetWidth + 100, top: b },
            "div"
          );
        }, Gb);
      },
      goLineLeft: function (a) {
        a.extendSelectionsBy(function (b) {
          b = a.charCoords(b.head, "div").top + 5;
          return a.coordsChar({ left: 0, top: b }, "div");
        }, Gb);
      },
      goLineLeftSmart: function (a) {
        a.extendSelectionsBy(function (b) {
          var c = a.charCoords(b.head, "div").top + 5,
            c = a.coordsChar({ left: 0, top: c }, "div");
          return c.ch < a.getLine(c.line).search(/\S/) ? lf(a, b.head) : c;
        }, Gb);
      },
      goLineUp: function (a) {
        a.moveV(-1, "line");
      },
      goLineDown: function (a) {
        a.moveV(1, "line");
      },
      goPageUp: function (a) {
        a.moveV(-1, "page");
      },
      goPageDown: function (a) {
        a.moveV(1, "page");
      },
      goCharLeft: function (a) {
        a.moveH(-1, "char");
      },
      goCharRight: function (a) {
        a.moveH(1, "char");
      },
      goColumnLeft: function (a) {
        a.moveH(-1, "column");
      },
      goColumnRight: function (a) {
        a.moveH(1, "column");
      },
      goWordLeft: function (a) {
        a.moveH(-1, "word");
      },
      goGroupRight: function (a) {
        a.moveH(1, "group");
      },
      goGroupLeft: function (a) {
        a.moveH(-1, "group");
      },
      goWordRight: function (a) {
        a.moveH(1, "word");
      },
      delCharBefore: function (a) {
        a.deleteH(-1, "char");
      },
      delCharAfter: function (a) {
        a.deleteH(1, "char");
      },
      delWordBefore: function (a) {
        a.deleteH(-1, "word");
      },
      delWordAfter: function (a) {
        a.deleteH(1, "word");
      },
      delGroupBefore: function (a) {
        a.deleteH(-1, "group");
      },
      delGroupAfter: function (a) {
        a.deleteH(1, "group");
      },
      indentAuto: function (a) {
        a.indentSelection("smart");
      },
      indentMore: function (a) {
        a.indentSelection("add");
      },
      indentLess: function (a) {
        a.indentSelection("subtract");
      },
      insertTab: function (a) {
        a.replaceSelection("\t");
      },
      insertSoftTab: function (a) {
        for (
          var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0;
          e < c.length;
          e++
        ) {
          var f = c[e].from(),
            f = aa(a.getLine(f.line), f.ch, d);
          b.push(Array(d - (f % d) + 1).join(" "));
        }
        a.replaceSelections(b);
      },
      defaultTab: function (a) {
        a.somethingSelected()
          ? a.indentSelection("add")
          : a.execCommand("insertTab");
      },
      transposeChars: function (a) {
        T(a, function () {
          for (var b = a.listSelections(), c = [], d = 0; d < b.length; d++) {
            var e = b[d].head,
              f = u(a.doc, e.line).text;
            if (f)
              if ((e.ch == f.length && (e = new r(e.line, e.ch - 1)), 0 < e.ch))
                (e = new r(e.line, e.ch + 1)),
                  a.replaceRange(
                    f.charAt(e.ch - 1) + f.charAt(e.ch - 2),
                    r(e.line, e.ch - 2),
                    e,
                    "+transpose"
                  );
              else if (e.line > a.doc.first) {
                var g = u(a.doc, e.line - 1).text;
                g &&
                  a.replaceRange(
                    f.charAt(0) + "\n" + g.charAt(g.length - 1),
                    r(e.line - 1, g.length - 1),
                    r(e.line, 1),
                    "+transpose"
                  );
              }
            c.push(new z(e, e));
          }
          a.setSelections(c);
        });
      },
      newlineAndIndent: function (a) {
        T(a, function () {
          for (var b = a.listSelections().length, c = 0; c < b; c++) {
            var d = a.listSelections()[c];
            a.replaceRange("\n", d.anchor, d.head, "+input");
            a.indentLine(d.from().line + 1, null, !0);
            Pa(a);
          }
        });
      },
      toggleOverwrite: function (a) {
        a.toggleOverwrite();
      },
    }),
    ua = (q.keyMap = {});
  ua.basic = {
    Left: "goCharLeft",
    Right: "goCharRight",
    Up: "goLineUp",
    Down: "goLineDown",
    End: "goLineEnd",
    Home: "goLineStartSmart",
    PageUp: "goPageUp",
    PageDown: "goPageDown",
    Delete: "delCharAfter",
    Backspace: "delCharBefore",
    "Shift-Backspace": "delCharBefore",
    Tab: "defaultTab",
    "Shift-Tab": "indentAuto",
    Enter: "newlineAndIndent",
    Insert: "toggleOverwrite",
    Esc: "singleSelection",
  };
  ua.pcDefault = {
    "Ctrl-A": "selectAll",
    "Ctrl-D": "deleteLine",
    "Ctrl-Z": "undo",
    "Shift-Ctrl-Z": "redo",
    "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart",
    "Ctrl-End": "goDocEnd",
    "Ctrl-Up": "goLineUp",
    "Ctrl-Down": "goLineDown",
    "Ctrl-Left": "goGroupLeft",
    "Ctrl-Right": "goGroupRight",
    "Alt-Left": "goLineStart",
    "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore",
    "Ctrl-Delete": "delGroupAfter",
    "Ctrl-S": "save",
    "Ctrl-F": "find",
    "Ctrl-G": "findNext",
    "Shift-Ctrl-G": "findPrev",
    "Shift-Ctrl-F": "replace",
    "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess",
    "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection",
    "Shift-Ctrl-U": "redoSelection",
    "Alt-U": "redoSelection",
    fallthrough: "basic",
  };
  ua.emacsy = {
    "Ctrl-F": "goCharRight",
    "Ctrl-B": "goCharLeft",
    "Ctrl-P": "goLineUp",
    "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight",
    "Alt-B": "goWordLeft",
    "Ctrl-A": "goLineStart",
    "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown",
    "Shift-Ctrl-V": "goPageUp",
    "Ctrl-D": "delCharAfter",
    "Ctrl-H": "delCharBefore",
    "Alt-D": "delWordAfter",
    "Alt-Backspace": "delWordBefore",
    "Ctrl-K": "killLine",
    "Ctrl-T": "transposeChars",
  };
  ua.macDefault = {
    "Cmd-A": "selectAll",
    "Cmd-D": "deleteLine",
    "Cmd-Z": "undo",
    "Shift-Cmd-Z": "redo",
    "Cmd-Y": "redo",
    "Cmd-Home": "goDocStart",
    "Cmd-Up": "goDocStart",
    "Cmd-End": "goDocEnd",
    "Cmd-Down": "goDocEnd",
    "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight",
    "Cmd-Left": "goLineLeft",
    "Cmd-Right": "goLineRight",
    "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter",
    "Alt-Delete": "delGroupAfter",
    "Cmd-S": "save",
    "Cmd-F": "find",
    "Cmd-G": "findNext",
    "Shift-Cmd-G": "findPrev",
    "Cmd-Alt-F": "replace",
    "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess",
    "Cmd-]": "indentMore",
    "Cmd-Backspace": "delWrappedLineLeft",
    "Cmd-Delete": "delWrappedLineRight",
    "Cmd-U": "undoSelection",
    "Shift-Cmd-U": "redoSelection",
    "Ctrl-Up": "goDocStart",
    "Ctrl-Down": "goDocEnd",
    fallthrough: ["basic", "emacsy"],
  };
  ua["default"] = W ? ua.macDefault : ua.pcDefault;
  q.normalizeKeyMap = function (a) {
    var b = {},
      c;
    for (c in a)
      if (a.hasOwnProperty(c)) {
        var d = a[c];
        if (!/^(name|fallthrough|(de|at)tach)$/.test(c)) {
          if ("..." != d)
            for (var e = ob(c.split(" "), Wf), f = 0; f < e.length; f++) {
              var g, h;
              f == e.length - 1
                ? ((h = c), (g = d))
                : ((h = e.slice(0, f + 1).join(" ")), (g = "..."));
              var k = b[h];
              if (!k) b[h] = g;
              else if (k != g) throw Error("Inconsistent bindings for " + h);
            }
          delete a[c];
        }
      }
    for (var l in b) a[l] = b[l];
    return a;
  };
  var xb = (q.lookupKey = function (a, b, c, d) {
      b = pc(b);
      var e = b.call ? b.call(a, d) : b[a];
      if (!1 === e) return "nothing";
      if ("..." === e) return "multi";
      if (null != e && c(e)) return "handled";
      if (b.fallthrough) {
        if ("[object Array]" != Object.prototype.toString.call(b.fallthrough))
          return xb(a, b.fallthrough, c, d);
        for (e = 0; e < b.fallthrough.length; e++) {
          var f = xb(a, b.fallthrough[e], c, d);
          if (f) return f;
        }
      }
    }),
    Pf = (q.isModifierKey = function (a) {
      a = "string" == typeof a ? a : va[a.keyCode];
      return "Ctrl" == a || "Alt" == a || "Shift" == a || "Mod" == a;
    }),
    Rf = (q.keyName = function (a, b) {
      if (ba && 34 == a.keyCode && a["char"]) return !1;
      var c = va[a.keyCode],
        d = c;
      if (null == d || a.altGraphKey) return !1;
      a.altKey && "Alt" != c && (d = "Alt-" + d);
      (of ? a.metaKey : a.ctrlKey) && "Ctrl" != c && (d = "Ctrl-" + d);
      (of ? a.ctrlKey : a.metaKey) && "Cmd" != c && (d = "Cmd-" + d);
      !b && a.shiftKey && "Shift" != c && (d = "Shift-" + d);
      return d;
    });
  q.fromTextArea = function (a, b) {
    function c() {
      a.value = k.getValue();
    }
    b = b ? V(b) : {};
    b.value = a.value;
    !b.tabindex && a.tabIndex && (b.tabindex = a.tabIndex);
    !b.placeholder && a.placeholder && (b.placeholder = a.placeholder);
    if (null == b.autofocus) {
      var d = fa();
      b.autofocus =
        d == a || (null != a.getAttribute("autofocus") && d == document.body);
    }
    if (a.form && (v(a.form, "submit", c), !b.leaveSubmitMethodAlone)) {
      var e = a.form,
        f = e.submit;
      try {
        var g = (e.submit = function () {
          c();
          e.submit = f;
          e.submit();
          e.submit = g;
        });
      } catch (h) {}
    }
    b.finishInit = function (b) {
      b.save = c;
      b.getTextArea = function () {
        return a;
      };
      b.toTextArea = function () {
        b.toTextArea = isNaN;
        c();
        a.parentNode.removeChild(b.getWrapperElement());
        a.style.display = "";
        a.form &&
          (ka(a.form, "submit", c),
          "function" == typeof a.form.submit && (a.form.submit = f));
      };
    };
    a.style.display = "none";
    var k = q(function (b) {
      a.parentNode.insertBefore(b, a.nextSibling);
    }, b);
    return k;
  };
  var tc = (q.StringStream = function (a, b) {
    this.pos = this.start = 0;
    this.string = a;
    this.tabSize = b || 8;
    this.lineStart = this.lastColumnPos = this.lastColumnValue = 0;
  });
  tc.prototype = {
    eol: function () {
      return this.pos >= this.string.length;
    },
    sol: function () {
      return this.pos == this.lineStart;
    },
    peek: function () {
      return this.string.charAt(this.pos) || void 0;
    },
    next: function () {
      if (this.pos < this.string.length) return this.string.charAt(this.pos++);
    },
    eat: function (a) {
      var b = this.string.charAt(this.pos);
      if ("string" == typeof a ? b == a : b && (a.test ? a.test(b) : a(b)))
        return ++this.pos, b;
    },
    eatWhile: function (a) {
      for (var b = this.pos; this.eat(a); );
      return this.pos > b;
    },
    eatSpace: function () {
      for (var a = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
        ++this.pos;
      return this.pos > a;
    },
    skipToEnd: function () {
      this.pos = this.string.length;
    },
    skipTo: function (a) {
      a = this.string.indexOf(a, this.pos);
      if (-1 < a) return (this.pos = a), !0;
    },
    backUp: function (a) {
      this.pos -= a;
    },
    column: function () {
      this.lastColumnPos < this.start &&
        ((this.lastColumnValue = aa(
          this.string,
          this.start,
          this.tabSize,
          this.lastColumnPos,
          this.lastColumnValue
        )),
        (this.lastColumnPos = this.start));
      return (
        this.lastColumnValue -
        (this.lineStart ? aa(this.string, this.lineStart, this.tabSize) : 0)
      );
    },
    indentation: function () {
      return (
        aa(this.string, null, this.tabSize) -
        (this.lineStart ? aa(this.string, this.lineStart, this.tabSize) : 0)
      );
    },
    match: function (a, b, c) {
      if ("string" == typeof a) {
        var d = function (a) {
            return c ? a.toLowerCase() : a;
          },
          e = this.string.substr(this.pos, a.length);
        if (d(e) == d(a)) return !1 !== b && (this.pos += a.length), !0;
      } else {
        if ((a = this.string.slice(this.pos).match(a)) && 0 < a.index)
          return null;
        a && !1 !== b && (this.pos += a[0].length);
        return a;
      }
    },
    current: function () {
      return this.string.slice(this.start, this.pos);
    },
    hideFirstChars: function (a, b) {
      this.lineStart += a;
      try {
        return b();
      } finally {
        this.lineStart -= a;
      }
    },
  };
  var sd = 0,
    Ha = (q.TextMarker = function (a, b) {
      this.lines = [];
      this.type = b;
      this.doc = a;
      this.id = ++sd;
    });
  Ya(Ha);
  Ha.prototype.clear = function () {
    if (!this.explicitlyCleared) {
      var a = this.doc.cm,
        b = a && !a.curOp;
      b && Ja(a);
      if (S(this, "clear")) {
        var c = this.find();
        c && L(this, "clear", c.from, c.to);
      }
      for (var d = (c = null), e = 0; e < this.lines.length; ++e) {
        var f = this.lines[e],
          g = zb(f.markedSpans, this);
        a && !this.collapsed
          ? na(a, F(f), "text")
          : a && (null != g.to && (d = F(f)), null != g.from && (c = F(f)));
        for (
          var h = f, k = f.markedSpans, l = g, m = void 0, p = 0;
          p < k.length;
          ++p
        )
          k[p] != l && (m || (m = [])).push(k[p]);
        h.markedSpans = m;
        null == g.from &&
          this.collapsed &&
          !ya(this.doc, f) &&
          a &&
          ca(f, xa(a.display));
      }
      if (a && this.collapsed && !a.options.lineWrapping)
        for (e = 0; e < this.lines.length; ++e)
          (f = ia(this.lines[e])),
            (g = Kb(f)),
            g > a.display.maxLineLength &&
              ((a.display.maxLine = f),
              (a.display.maxLineLength = g),
              (a.display.maxLineChanged = !0));
      null != c && a && this.collapsed && Q(a, c, d + 1);
      this.lines.length = 0;
      this.explicitlyCleared = !0;
      this.atomic &&
        this.doc.cantEdit &&
        ((this.doc.cantEdit = !1), a && ge(a.doc));
      a && L(a, "markerCleared", a, this);
      b && La(a);
      this.parent && this.parent.clear();
    }
  };
  Ha.prototype.find = function (a, b) {
    null == a && "bookmark" == this.type && (a = 1);
    for (var c, d, e = 0; e < this.lines.length; ++e) {
      var f = this.lines[e],
        g = zb(f.markedSpans, this);
      if (null != g.from && ((c = r(b ? f : F(f), g.from)), -1 == a)) return c;
      if (null != g.to && ((d = r(b ? f : F(f), g.to)), 1 == a)) return d;
    }
    return c && { from: c, to: d };
  };
  Ha.prototype.changed = function () {
    var a = this.find(-1, !0),
      b = this,
      c = this.doc.cm;
    a &&
      c &&
      T(c, function () {
        var d = a.line,
          e = F(a.line);
        if ((e = Vc(c, e)))
          le(e), (c.curOp.selectionChanged = c.curOp.forceUpdate = !0);
        c.curOp.updateMaxLine = !0;
        ya(b.doc, d) ||
          null == b.height ||
          ((e = b.height),
          (b.height = null),
          (e = ub(b) - e) && ca(d, d.height + e));
      });
  };
  Ha.prototype.attachLine = function (a) {
    if (!this.lines.length && this.doc.cm) {
      var b = this.doc.cm.curOp;
      (b.maybeHiddenMarkers && -1 != D(b.maybeHiddenMarkers, this)) ||
        (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this);
    }
    this.lines.push(a);
  };
  Ha.prototype.detachLine = function (a) {
    this.lines.splice(D(this.lines, a), 1);
    !this.lines.length &&
      this.doc.cm &&
      ((a = this.doc.cm.curOp),
      (a.maybeHiddenMarkers || (a.maybeHiddenMarkers = [])).push(this));
  };
  var sd = 0,
    rc = (q.SharedTextMarker = function (a, b) {
      this.markers = a;
      this.primary = b;
      for (var c = 0; c < a.length; ++c) a[c].parent = this;
    });
  Ya(rc);
  rc.prototype.clear = function () {
    if (!this.explicitlyCleared) {
      this.explicitlyCleared = !0;
      for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
      L(this, "clear");
    }
  };
  rc.prototype.find = function (a, b) {
    return this.primary.find(a, b);
  };
  var sc = (q.LineWidget = function (a, b, c) {
    if (c) for (var d in c) c.hasOwnProperty(d) && (this[d] = c[d]);
    this.doc = a;
    this.node = b;
  });
  Ya(sc);
  sc.prototype.clear = function () {
    var a = this.doc.cm,
      b = this.line.widgets,
      c = this.line,
      d = F(c);
    if (null != d && b) {
      for (var e = 0; e < b.length; ++e) b[e] == this && b.splice(e--, 1);
      b.length || (c.widgets = null);
      var f = ub(this);
      ca(c, Math.max(0, c.height - f));
      a &&
        T(a, function () {
          var b = -f;
          ea(c) < ((a.curOp && a.curOp.scrollTop) || a.doc.scrollTop) &&
            lc(a, null, b);
          na(a, d, "widget");
        });
    }
  };
  sc.prototype.changed = function () {
    var a = this.height,
      b = this.doc.cm,
      c = this.line;
    this.height = null;
    var d = ub(this) - a;
    d &&
      (ca(c, c.height + d),
      b &&
        T(b, function () {
          b.curOp.forceUpdate = !0;
          ea(c) < ((b.curOp && b.curOp.scrollTop) || b.doc.scrollTop) &&
            lc(b, null, d);
        }));
  };
  var Ab = (q.Line = function (a, b, c) {
    this.text = a;
    Ue(this, b);
    this.height = c ? c(this) : 1;
  });
  Ya(Ab);
  Ab.prototype.lineNo = function () {
    return F(this);
  };
  var bg = {},
    ag = {};
  Bb.prototype = {
    chunkSize: function () {
      return this.lines.length;
    },
    removeInner: function (a, b) {
      for (var c = a, d = a + b; c < d; ++c) {
        var e = this.lines[c];
        this.height -= e.height;
        var f = e;
        f.parent = null;
        Te(f);
        L(e, "delete");
      }
      this.lines.splice(a, b);
    },
    collapse: function (a) {
      a.push.apply(a, this.lines);
    },
    insertInner: function (a, b, c) {
      this.height += c;
      this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
      for (a = 0; a < b.length; ++a) b[a].parent = this;
    },
    iterN: function (a, b, c) {
      for (b = a + b; a < b; ++a) if (c(this.lines[a])) return !0;
    },
  };
  Cb.prototype = {
    chunkSize: function () {
      return this.size;
    },
    removeInner: function (a, b) {
      this.size -= b;
      for (var c = 0; c < this.children.length; ++c) {
        var d = this.children[c],
          e = d.chunkSize();
        if (a < e) {
          var f = Math.min(b, e - a),
            g = d.height;
          d.removeInner(a, f);
          this.height -= g - d.height;
          e == f && (this.children.splice(c--, 1), (d.parent = null));
          if (0 == (b -= f)) break;
          a = 0;
        } else a -= e;
      }
      25 > this.size - b &&
        (1 < this.children.length || !(this.children[0] instanceof Bb)) &&
        ((c = []),
        this.collapse(c),
        (this.children = [new Bb(c)]),
        (this.children[0].parent = this));
    },
    collapse: function (a) {
      for (var b = 0; b < this.children.length; ++b)
        this.children[b].collapse(a);
    },
    insertInner: function (a, b, c) {
      this.size += b.length;
      this.height += c;
      for (var d = 0; d < this.children.length; ++d) {
        var e = this.children[d],
          f = e.chunkSize();
        if (a <= f) {
          e.insertInner(a, b, c);
          if (e.lines && 50 < e.lines.length) {
            for (; 50 < e.lines.length; )
              (a = e.lines.splice(e.lines.length - 25, 25)),
                (a = new Bb(a)),
                (e.height -= a.height),
                this.children.splice(d + 1, 0, a),
                (a.parent = this);
            this.maybeSpill();
          }
          break;
        }
        a -= f;
      }
    },
    maybeSpill: function () {
      if (!(10 >= this.children.length)) {
        var a = this;
        do {
          var b = a.children.splice(a.children.length - 5, 5),
            b = new Cb(b);
          if (a.parent) {
            a.size -= b.size;
            a.height -= b.height;
            var c = D(a.parent.children, a);
            a.parent.children.splice(c + 1, 0, b);
          } else
            (c = new Cb(a.children)),
              (c.parent = a),
              (a.children = [c, b]),
              (a = c);
          b.parent = a.parent;
        } while (10 < a.children.length);
        a.parent.maybeSpill();
      }
    },
    iterN: function (a, b, c) {
      for (var d = 0; d < this.children.length; ++d) {
        var e = this.children[d],
          f = e.chunkSize();
        if (a < f) {
          f = Math.min(b, f - a);
          if (e.iterN(a, f, c)) return !0;
          if (0 == (b -= f)) break;
          a = 0;
        } else a -= f;
      }
    },
  };
  var og = 0,
    P = (q.Doc = function (a, b, c) {
      if (!(this instanceof P)) return new P(a, b, c);
      null == c && (c = 0);
      Cb.call(this, [new Bb([new Ab("", null)])]);
      this.first = c;
      this.scrollTop = this.scrollLeft = 0;
      this.cantEdit = !1;
      this.cleanGeneration = 1;
      this.frontier = c;
      c = r(c, 0);
      this.sel = ga(c);
      this.history = new uc(null);
      this.id = ++og;
      this.modeOption = b;
      "string" == typeof a && (a = sa(a));
      qd(this, { from: c, to: c, text: a });
      H(this, ga(c), ha);
    });
  P.prototype = ff(Cb.prototype, {
    constructor: P,
    iter: function (a, b, c) {
      c
        ? this.iterN(a - this.first, b - a, c)
        : this.iterN(this.first, this.first + this.size, a);
    },
    insert: function (a, b) {
      for (var c = 0, d = 0; d < b.length; ++d) c += b[d].height;
      this.insertInner(a - this.first, b, c);
    },
    remove: function (a, b) {
      this.removeInner(a - this.first, b);
    },
    getValue: function (a) {
      var b = xd(this, this.first, this.first + this.size);
      return !1 === a ? b : b.join(a || "\n");
    },
    setValue: N(function (a) {
      var b = r(this.first, 0),
        c = this.first + this.size - 1;
      Oa(
        this,
        {
          from: b,
          to: r(c, u(this, c).text.length),
          text: sa(a),
          origin: "setValue",
          full: !0,
        },
        !0
      );
      H(this, ga(b));
    }),
    replaceRange: function (a, b, c, d) {
      b = w(this, b);
      c = c ? w(this, c) : b;
      wb(this, a, b, c, d);
    },
    getRange: function (a, b, c) {
      a = Da(this, w(this, a), w(this, b));
      return !1 === c ? a : a.join(c || "\n");
    },
    getLine: function (a) {
      return (a = this.getLineHandle(a)) && a.text;
    },
    getLineHandle: function (a) {
      if (qb(this, a)) return u(this, a);
    },
    getLineNumber: function (a) {
      return F(a);
    },
    getLineHandleVisualStart: function (a) {
      "number" == typeof a && (a = u(this, a));
      return ia(a);
    },
    lineCount: function () {
      return this.size;
    },
    firstLine: function () {
      return this.first;
    },
    lastLine: function () {
      return this.first + this.size - 1;
    },
    clipPos: function (a) {
      return w(this, a);
    },
    getCursor: function (a) {
      var b = this.sel.primary();
      return null == a || "head" == a
        ? b.head
        : "anchor" == a
        ? b.anchor
        : "end" == a || "to" == a || !1 === a
        ? b.to()
        : b.from();
    },
    listSelections: function () {
      return this.sel.ranges;
    },
    somethingSelected: function () {
      return this.sel.somethingSelected();
    },
    setCursor: N(function (a, b, c) {
      a = w(this, "number" == typeof a ? r(a, b || 0) : a);
      H(this, ga(a, null), c);
    }),
    setSelection: N(function (a, b, c) {
      var d = w(this, a);
      a = w(this, b || a);
      H(this, ga(d, a), c);
    }),
    extendSelection: N(function (a, b, c) {
      Ub(this, w(this, a), b && w(this, b), c);
    }),
    extendSelections: N(function (a, b) {
      for (var c = [], d = 0; d < a.length; d++) c[d] = w(this, a[d]);
      ae(this, c);
    }),
    extendSelectionsBy: N(function (a, b) {
      ae(this, ob(this.sel.ranges, a), b);
    }),
    setSelections: N(function (a, b, c) {
      if (a.length) {
        for (var d = 0, e = []; d < a.length; d++)
          e[d] = new z(w(this, a[d].anchor), w(this, a[d].head));
        null == b && (b = Math.min(a.length - 1, this.sel.primIndex));
        H(this, Z(e, b), c);
      }
    }),
    addSelection: N(function (a, b, c) {
      var d = this.sel.ranges.slice(0);
      d.push(new z(w(this, a), w(this, b || a)));
      H(this, Z(d, d.length - 1), c);
    }),
    getSelection: function (a) {
      for (var b = this.sel.ranges, c, d = 0; d < b.length; d++) {
        var e = Da(this, b[d].from(), b[d].to());
        c = c ? c.concat(e) : e;
      }
      return !1 === a ? c : c.join(a || "\n");
    },
    getSelections: function (a) {
      for (var b = [], c = this.sel.ranges, d = 0; d < c.length; d++) {
        var e = Da(this, c[d].from(), c[d].to());
        !1 !== a && (e = e.join(a || "\n"));
        b[d] = e;
      }
      return b;
    },
    replaceSelection: function (a, b, c) {
      for (var d = [], e = 0; e < this.sel.ranges.length; e++) d[e] = a;
      this.replaceSelections(d, b, c || "+input");
    },
    replaceSelections: N(function (a, b, c) {
      for (var d = [], e = this.sel, f = 0; f < e.ranges.length; f++) {
        var g = e.ranges[f];
        d[f] = { from: g.from(), to: g.to(), text: sa(a[f]), origin: c };
      }
      if ((f = b && "end" != b)) {
        f = [];
        c = a = r(this.first, 0);
        for (e = 0; e < d.length; e++) {
          var h = d[e],
            g = Ee(h.from, a, c),
            k = Ee(ta(h), a, c);
          a = h.to;
          c = k;
          "around" == b
            ? ((h = this.sel.ranges[e]),
              (h = 0 > y(h.head, h.anchor)),
              (f[e] = new z(h ? k : g, h ? g : k)))
            : (f[e] = new z(g, g));
        }
        f = new la(f, this.sel.primIndex);
      }
      b = f;
      for (f = d.length - 1; 0 <= f; f--) Oa(this, d[f]);
      b ? be(this, b) : this.cm && Pa(this.cm);
    }),
    undo: N(function () {
      kc(this, "undo");
    }),
    redo: N(function () {
      kc(this, "redo");
    }),
    undoSelection: N(function () {
      kc(this, "undo", !0);
    }),
    redoSelection: N(function () {
      kc(this, "redo", !0);
    }),
    setExtending: function (a) {
      this.extend = a;
    },
    getExtending: function () {
      return this.extend;
    },
    historySize: function () {
      for (var a = this.history, b = 0, c = 0, d = 0; d < a.done.length; d++)
        a.done[d].ranges || ++b;
      for (d = 0; d < a.undone.length; d++) a.undone[d].ranges || ++c;
      return { undo: b, redo: c };
    },
    clearHistory: function () {
      this.history = new uc(this.history.maxGeneration);
    },
    markClean: function () {
      this.cleanGeneration = this.changeGeneration(!0);
    },
    changeGeneration: function (a) {
      a &&
        (this.history.lastOp =
          this.history.lastSelOp =
          this.history.lastOrigin =
            null);
      return this.history.generation;
    },
    isClean: function (a) {
      return this.history.generation == (a || this.cleanGeneration);
    },
    getHistory: function () {
      return { done: Xa(this.history.done), undone: Xa(this.history.undone) };
    },
    setHistory: function (a) {
      var b = (this.history = new uc(this.history.maxGeneration));
      b.done = Xa(a.done.slice(0), null, !0);
      b.undone = Xa(a.undone.slice(0), null, !0);
    },
    addLineClass: N(function (a, b, c) {
      return nc(this, a, "gutter" == b ? "gutter" : "class", function (a) {
        var e =
          "text" == b
            ? "textClass"
            : "background" == b
            ? "bgClass"
            : "gutter" == b
            ? "gutterClass"
            : "wrapClass";
        if (a[e]) {
          if (Fb(c).test(a[e])) return !1;
          a[e] += " " + c;
        } else a[e] = c;
        return !0;
      });
    }),
    removeLineClass: N(function (a, b, c) {
      return nc(this, a, "gutter" == b ? "gutter" : "class", function (a) {
        var e =
            "text" == b
              ? "textClass"
              : "background" == b
              ? "bgClass"
              : "gutter" == b
              ? "gutterClass"
              : "wrapClass",
          f = a[e];
        if (f)
          if (null == c) a[e] = null;
          else {
            var g = f.match(Fb(c));
            if (!g) return !1;
            var h = g.index + g[0].length;
            a[e] =
              f.slice(0, g.index) +
                (g.index && h != f.length ? " " : "") +
                f.slice(h) || null;
          }
        else return !1;
        return !0;
      });
    }),
    addLineWidget: N(function (a, b, c) {
      return $f(this, a, b, c);
    }),
    removeLineWidget: function (a) {
      a.clear();
    },
    markText: function (a, b, c) {
      return Wa(this, w(this, a), w(this, b), c, "range");
    },
    setBookmark: function (a, b) {
      var c = {
        replacedWith: b && (null == b.nodeType ? b.widget : b),
        insertLeft: b && b.insertLeft,
        clearWhenEmpty: !1,
        shared: b && b.shared,
        handleMouseEvents: b && b.handleMouseEvents,
      };
      a = w(this, a);
      return Wa(this, a, a, c, "bookmark");
    },
    findMarksAt: function (a) {
      a = w(this, a);
      var b = [],
        c = u(this, a.line).markedSpans;
      if (c)
        for (var d = 0; d < c.length; ++d) {
          var e = c[d];
          (null == e.from || e.from <= a.ch) &&
            (null == e.to || e.to >= a.ch) &&
            b.push(e.marker.parent || e.marker);
        }
      return b;
    },
    findMarks: function (a, b, c) {
      a = w(this, a);
      b = w(this, b);
      var d = [],
        e = a.line;
      this.iter(a.line, b.line + 1, function (f) {
        if ((f = f.markedSpans))
          for (var g = 0; g < f.length; g++) {
            var h = f[g];
            (e == a.line && a.ch > h.to) ||
              (null == h.from && e != a.line) ||
              (e == b.line && h.from > b.ch) ||
              (c && !c(h.marker)) ||
              d.push(h.marker.parent || h.marker);
          }
        ++e;
      });
      return d;
    },
    getAllMarks: function () {
      var a = [];
      this.iter(function (b) {
        if ((b = b.markedSpans))
          for (var c = 0; c < b.length; ++c)
            null != b[c].from && a.push(b[c].marker);
      });
      return a;
    },
    posFromIndex: function (a) {
      var b,
        c = this.first;
      this.iter(function (d) {
        d = d.text.length + 1;
        if (d > a) return (b = a), !0;
        a -= d;
        ++c;
      });
      return w(this, r(c, b));
    },
    indexFromPos: function (a) {
      a = w(this, a);
      var b = a.ch;
      if (a.line < this.first || 0 > a.ch) return 0;
      this.iter(this.first, a.line, function (a) {
        b += a.text.length + 1;
      });
      return b;
    },
    copy: function (a) {
      var b = new P(
        xd(this, this.first, this.first + this.size),
        this.modeOption,
        this.first
      );
      b.scrollTop = this.scrollTop;
      b.scrollLeft = this.scrollLeft;
      b.sel = this.sel;
      b.extend = !1;
      a &&
        ((b.history.undoDepth = this.history.undoDepth),
        b.setHistory(this.getHistory()));
      return b;
    },
    linkedDoc: function (a) {
      a || (a = {});
      var b = this.first,
        c = this.first + this.size;
      null != a.from && a.from > b && (b = a.from);
      null != a.to && a.to < c && (c = a.to);
      b = new P(xd(this, b, c), a.mode || this.modeOption, b);
      a.sharedHist && (b.history = this.history);
      (this.linked || (this.linked = [])).push({
        doc: b,
        sharedHist: a.sharedHist,
      });
      b.linked = [{ doc: this, isParent: !0, sharedHist: a.sharedHist }];
      a = Re(this);
      for (c = 0; c < a.length; c++) {
        var d = a[c],
          e = d.find(),
          f = b.clipPos(e.from),
          e = b.clipPos(e.to);
        y(f, e) &&
          ((f = Wa(b, f, e, d.primary, d.primary.type)),
          d.markers.push(f),
          (f.parent = d));
      }
      return b;
    },
    unlinkDoc: function (a) {
      a instanceof q && (a = a.doc);
      if (this.linked)
        for (var b = 0; b < this.linked.length; ++b)
          if (this.linked[b].doc == a) {
            this.linked.splice(b, 1);
            a.unlinkDoc(this);
            Yf(Re(this));
            break;
          }
      if (a.history == this.history) {
        var c = [a.id];
        Ga(
          a,
          function (a) {
            c.push(a.id);
          },
          !0
        );
        a.history = new uc(null);
        a.history.done = Xa(this.history.done, c);
        a.history.undone = Xa(this.history.undone, c);
      }
    },
    iterLinkedDocs: function (a) {
      Ga(this, a);
    },
    getMode: function () {
      return this.mode;
    },
    getEditor: function () {
      return this.cm;
    },
  });
  P.prototype.eachLine = P.prototype.iter;
  var pg = ["iter", "insert", "remove", "copy", "getEditor"],
    Jb;
  for (Jb in P.prototype)
    P.prototype.hasOwnProperty(Jb) &&
      0 > D(pg, Jb) &&
      (q.prototype[Jb] = (function (a) {
        return function () {
          return a.apply(this.doc, arguments);
        };
      })(P.prototype[Jb]));
  Ya(P);
  var O = (q.e_preventDefault = function (a) {
      a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
    }),
    qg = (q.e_stopPropagation = function (a) {
      a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = !0);
    }),
    jd = (q.e_stop = function (a) {
      O(a);
      qg(a);
    }),
    v = (q.on = function (a, b, c) {
      a.addEventListener
        ? a.addEventListener(b, c, !1)
        : a.attachEvent
        ? a.attachEvent("on" + b, c)
        : ((a = a._handlers || (a._handlers = {})),
          (a[b] || (a[b] = [])).push(c));
    }),
    ka = (q.off = function (a, b, c) {
      if (a.removeEventListener) a.removeEventListener(b, c, !1);
      else if (a.detachEvent) a.detachEvent("on" + b, c);
      else if ((a = a._handlers && a._handlers[b]))
        for (b = 0; b < a.length; ++b)
          if (a[b] == c) {
            a.splice(b, 1);
            break;
          }
    }),
    K = (q.signal = function (a, b) {
      var c = a._handlers && a._handlers[b];
      if (c)
        for (
          var d = Array.prototype.slice.call(arguments, 2), e = 0;
          e < c.length;
          ++e
        )
          c[e].apply(null, d);
    }),
    Db = null,
    Hd = 30,
    Ae = (q.Pass = {
      toString: function () {
        return "CodeMirror.Pass";
      },
    }),
    ha = { scroll: !1 },
    kd = { origin: "*mouse" },
    Gb = { origin: "+move" };
  bb.prototype.set = function (a, b) {
    clearTimeout(this.id);
    this.id = setTimeout(b, a);
  };
  var aa = (q.countColumn = function (a, b, c, d, e) {
      null == b && ((b = a.search(/[^\s\u00a0]/)), -1 == b && (b = a.length));
      d = d || 0;
      for (e = e || 0; ; ) {
        var f = a.indexOf("\t", d);
        if (0 > f || f >= b) return e + (b - d);
        e += f - d;
        e += c - (e % c);
        d = f + 1;
      }
    }),
    vc = [""],
    Za = function (a) {
      a.select();
    };
  Qa
    ? (Za = function (a) {
        a.selectionStart = 0;
        a.selectionEnd = a.value.length;
      })
    : B &&
      (Za = function (a) {
        try {
          a.select();
        } catch (b) {}
      });
  var rg =
      /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
    gf = (q.isWordChar = function (a) {
      return (
        /\w/.test(a) ||
        ("" < a && (a.toUpperCase() != a.toLowerCase() || rg.test(a)))
      );
    }),
    ig =
      /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
    Ea;
  Ea = document.createRange
    ? function (a, b, c, d) {
        var e = document.createRange();
        e.setEnd(d || a, c);
        e.setStart(a, b);
        return e;
      }
    : function (a, b, c) {
        var d = document.body.createTextRange();
        try {
          d.moveToElementText(a.parentNode);
        } catch (e) {
          return d;
        }
        d.collapse(!0);
        d.moveEnd("character", c);
        d.moveStart("character", b);
        return d;
      };
  var Wc = (q.contains = function (a, b) {
    3 == b.nodeType && (b = b.parentNode);
    if (a.contains) return a.contains(b);
    do if ((11 == b.nodeType && (b = b.host), b == a)) return !0;
    while ((b = b.parentNode));
  });
  B &&
    11 > C &&
    (fa = function () {
      try {
        return document.activeElement;
      } catch (a) {
        return document.body;
      }
    });
  var kb = (q.rmclassName = function (a, b) {
      var c = a.className,
        d = Fb(b).exec(c);
      if (d) {
        var e = c.slice(d.index + d[0].length);
        a.className = c.slice(0, d.index) + (e ? d[1] + e : "");
      }
    }),
    mb = (q.addclassName = function (a, b) {
      var c = a.className;
      Fb(b).test(c) || (a.className += (c ? " " : "") + b);
    }),
    Dd = !1,
    Lf = (function () {
      if (B && 9 > C) return !1;
      var a = t("div");
      return "draggable" in a || "dragDrop" in a;
    })(),
    yd,
    vd,
    sa = (q.splitLines =
      3 != "\n\nb".split(/\n/).length
        ? function (a) {
            for (var b = 0, c = [], d = a.length; b <= d; ) {
              var e = a.indexOf("\n", b);
              -1 == e && (e = a.length);
              var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
                g = f.indexOf("\r");
              -1 != g
                ? (c.push(f.slice(0, g)), (b += g + 1))
                : (c.push(f), (b = e + 1));
            }
            return c;
          }
        : function (a) {
            return a.split(/\r\n?|\n/);
          }),
    ng = window.getSelection
      ? function (a) {
          try {
            return a.selectionStart != a.selectionEnd;
          } catch (b) {
            return !1;
          }
        }
      : function (a) {
          try {
            var b = a.ownerDocument.selection.createRange();
          } catch (c) {}
          return b && b.parentElement() == a
            ? 0 != b.compareEndPoints("StartToEnd", b)
            : !1;
        },
    Ce = (function () {
      var a = t("div");
      if ("oncopy" in a) return !0;
      a.setAttribute("oncopy", "return;");
      return "function" == typeof a.oncopy;
    })(),
    bd = null,
    va = {
      3: "Enter",
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Esc",
      32: "Space",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      44: "PrintScrn",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "\x3d",
      91: "Mod",
      92: "Mod",
      93: "Mod",
      107: "\x3d",
      109: "-",
      127: "Delete",
      173: "-",
      186: ";",
      187: "\x3d",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      63232: "Up",
      63233: "Down",
      63234: "Left",
      63235: "Right",
      63272: "Delete",
      63273: "Home",
      63275: "End",
      63276: "PageUp",
      63277: "PageDown",
      63302: "Insert",
    };
  q.keyNames = va;
  (function () {
    for (var a = 0; 10 > a; a++) va[a + 48] = va[a + 96] = String(a);
    for (a = 65; 90 >= a; a++) va[a] = String.fromCharCode(a);
    for (a = 1; 12 >= a; a++) va[a + 111] = va[a + 63235] = "F" + a;
  })();
  var vb,
    gg = (function () {
      function a(a) {
        return 247 >= a
          ? "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(
              a
            )
          : 1424 <= a && 1524 >= a
          ? "R"
          : 1536 <= a && 1773 >= a
          ? "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm".charAt(
              a - 1536
            )
          : 1774 <= a && 2220 >= a
          ? "r"
          : 8192 <= a && 8203 >= a
          ? "w"
          : 8204 == a
          ? "b"
          : "L";
      }
      function b(a, b, c) {
        this.level = a;
        this.from = b;
        this.to = c;
      }
      var c = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
        d = /[stwN]/,
        e = /[LRr]/,
        f = /[Lb1n]/,
        g = /[1n]/;
      return function (h) {
        if (!c.test(h)) return !1;
        for (var k = h.length, l = [], m = 0, p; m < k; ++m)
          l.push(a(h.charCodeAt(m)));
        for (var m = 0, n = "L"; m < k; ++m)
          (p = l[m]), "m" == p ? (l[m] = n) : (n = p);
        m = 0;
        for (n = "L"; m < k; ++m)
          (p = l[m]),
            "1" == p && "r" == n
              ? (l[m] = "n")
              : e.test(p) && ((n = p), "r" == p && (l[m] = "R"));
        m = 1;
        for (n = l[0]; m < k - 1; ++m)
          (p = l[m]),
            "+" == p && "1" == n && "1" == l[m + 1]
              ? (l[m] = "1")
              : "," != p ||
                n != l[m + 1] ||
                ("1" != n && "n" != n) ||
                (l[m] = n),
            (n = p);
        for (m = 0; m < k; ++m)
          if (((p = l[m]), "," == p)) l[m] = "N";
          else if ("%" == p) {
            for (n = m + 1; n < k && "%" == l[n]; ++n);
            var q =
              (m && "!" == l[m - 1]) || (n < k && "1" == l[n]) ? "1" : "N";
            for (p = m; p < n; ++p) l[p] = q;
            m = n - 1;
          }
        m = 0;
        for (n = "L"; m < k; ++m)
          (p = l[m]),
            "L" == n && "1" == p ? (l[m] = "L") : e.test(p) && (n = p);
        for (m = 0; m < k; ++m)
          if (d.test(l[m])) {
            for (n = m + 1; n < k && d.test(l[n]); ++n);
            p = "L" == (n < k ? l[n] : "L");
            q = "L" == (m ? l[m - 1] : "L") || p ? "L" : "R";
            for (p = m; p < n; ++p) l[p] = q;
            m = n - 1;
          }
        for (var n = [], r, m = 0; m < k; )
          if (f.test(l[m])) {
            p = m;
            for (++m; m < k && f.test(l[m]); ++m);
            n.push(new b(0, p, m));
          } else {
            var t = m,
              q = n.length;
            for (++m; m < k && "L" != l[m]; ++m);
            for (p = t; p < m; )
              if (g.test(l[p])) {
                t < p && n.splice(q, 0, new b(1, t, p));
                t = p;
                for (++p; p < m && g.test(l[p]); ++p);
                n.splice(q, 0, new b(2, t, p));
                t = p;
              } else ++p;
            t < m && n.splice(q, 0, new b(1, t, m));
          }
        1 == n[0].level &&
          (r = h.match(/^\s+/)) &&
          ((n[0].from = r[0].length), n.unshift(new b(0, 0, r[0].length)));
        1 == A(n).level &&
          (r = h.match(/\s+$/)) &&
          ((A(n).to -= r[0].length), n.push(new b(0, k - r[0].length, k)));
        2 == n[0].level && n.unshift(new b(1, n[0].to, n[0].to));
        n[0].level != A(n).level && n.push(new b(n[0].level, k, k));
        return n;
      };
    })();
  q.version = "5.2.0";
  return q;
});
