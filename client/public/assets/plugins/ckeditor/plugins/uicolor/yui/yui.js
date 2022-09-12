if ("undefined" == typeof YAHOO || !YAHOO) var YAHOO = {};
YAHOO.namespace = function () {
  var c = arguments,
    e = null,
    a,
    d,
    b;
  for (a = 0; a < c.length; a += 1)
    for (
      b = ("" + c[a]).split("."), e = YAHOO, d = "YAHOO" == b[0] ? 1 : 0;
      d < b.length;
      d += 1
    )
      (e[b[d]] = e[b[d]] || {}), (e = e[b[d]]);
  return e;
};
YAHOO.log = function (c, e, a) {
  var d = YAHOO.widget.Logger;
  return d && d.log ? d.log(c, e, a) : !1;
};
YAHOO.register = function (c, e, a) {
  var d = YAHOO.env.modules,
    b,
    f,
    g;
  d[c] || (d[c] = { versions: [], builds: [] });
  d = d[c];
  b = a.version;
  a = a.build;
  f = YAHOO.env.listeners;
  d.name = c;
  d.version = b;
  d.build = a;
  d.versions.push(b);
  d.builds.push(a);
  d.mainclassName = e;
  for (g = 0; g < f.length; g += 1) f[g](d);
  e
    ? ((e.VERSION = b), (e.BUILD = a))
    : YAHOO.log("mainClass is undefined for module " + c, "warn");
};
YAHOO.env = YAHOO.env || { modules: [], listeners: [] };
YAHOO.env.getVersion = function (c) {
  return YAHOO.env.modules[c] || null;
};
YAHOO.env.ua = (function () {
  var c = {
      ie: 0,
      opera: 0,
      gecko: 0,
      webkit: 0,
      mobile: null,
      air: 0,
      caja: 0,
    },
    e = navigator.userAgent,
    a;
  /KHTML/.test(e) && (c.webkit = 1);
  if ((a = e.match(/AppleWebKit\/([^\s]*)/)) && a[1]) {
    c.webkit = parseFloat(a[1]);
    if (/ Mobile\//.test(e)) c.mobile = "Apple";
    else if ((a = e.match(/NokiaN[^\/]*/))) c.mobile = a[0];
    if ((a = e.match(/AdobeAIR\/([^\s]*)/))) c.air = a[0];
  }
  if (!c.webkit)
    if ((a = e.match(/Opera[\s\/]([^\s]*)/)) && a[1]) {
      if (((c.opera = parseFloat(a[1])), (a = e.match(/Opera Mini[^;]*/))))
        c.mobile = a[0];
    } else if ((a = e.match(/MSIE\s([^;]*)/)) && a[1]) c.ie = parseFloat(a[1]);
    else if ((a = e.match(/Gecko\/([^\s]*)/)))
      (c.gecko = 1),
        (a = e.match(/rv:([^\s\)]*)/)) && a[1] && (c.gecko = parseFloat(a[1]));
  (a = e.match(/Caja\/([^\s]*)/)) && a[1] && (c.caja = parseFloat(a[1]));
  return c;
})();
(function () {
  YAHOO.namespace("util", "widget", "example");
  if ("undefined" !== typeof YAHOO_config) {
    var c = YAHOO_config.listener,
      e = YAHOO.env.listeners,
      a = !0,
      d;
    if (c) {
      for (d = 0; d < e.length; d += 1)
        if (e[d] == c) {
          a = !1;
          break;
        }
      a && e.push(c);
    }
  }
})();
YAHOO.lang = YAHOO.lang || {};
(function () {
  var c = YAHOO.lang,
    e = Object.prototype,
    a = ["toString", "valueOf"],
    d = {
      isArray: function (b) {
        return "[object Array]" === e.toString.apply(b);
      },
      isBoolean: function (b) {
        return "boolean" === typeof b;
      },
      isFunction: function (b) {
        return "[object Function]" === e.toString.apply(b);
      },
      isNull: function (b) {
        return null === b;
      },
      isNumber: function (b) {
        return "number" === typeof b && isFinite(b);
      },
      isObject: function (b) {
        return (b && ("object" === typeof b || c.isFunction(b))) || !1;
      },
      isString: function (b) {
        return "string" === typeof b;
      },
      isUndefined: function (b) {
        return "undefined" === typeof b;
      },
      _IEEnumFix: YAHOO.env.ua.ie
        ? function (b, d) {
            var g, h, k;
            for (g = 0; g < a.length; g += 1)
              (h = a[g]),
                (k = d[h]),
                c.isFunction(k) && k != e[h] && (b[h] = k);
          }
        : function () {},
      extend: function (b, a, d) {
        if (!a || !b)
          throw Error(
            "extend failed, please check that all dependencies are included."
          );
        var h = function () {},
          k;
        h.prototype = a.prototype;
        b.prototype = new h();
        b.prototype.constructor = b;
        b.superclassName = a.prototype;
        a.prototype.constructor == e.constructor &&
          (a.prototype.constructor = a);
        if (d) {
          for (k in d) c.hasOwnProperty(d, k) && (b.prototype[k] = d[k]);
          c._IEEnumFix(b.prototype, d);
        }
      },
      augmentObject: function (b, a) {
        if (!a || !b) throw Error("Absorb failed, verify dependencies.");
        var d = arguments,
          e,
          k = d[2];
        if (k && !0 !== k) for (e = 2; e < d.length; e += 1) b[d[e]] = a[d[e]];
        else {
          for (e in a) (!k && e in b) || (b[e] = a[e]);
          c._IEEnumFix(b, a);
        }
      },
      augmentProto: function (b, a) {
        if (!a || !b) throw Error("Augment failed, verify dependencies.");
        var d = [b.prototype, a.prototype],
          e;
        for (e = 2; e < arguments.length; e += 1) d.push(arguments[e]);
        c.augmentObject.apply(this, d);
      },
      dump: function (b, a) {
        var d,
          e,
          k = [];
        if (c.isObject(b)) {
          if (b instanceof Date || ("nodeType" in b && "tagName" in b))
            return b;
          if (c.isFunction(b)) return "f(){...}";
        } else return b + "";
        a = c.isNumber(a) ? a : 3;
        if (c.isArray(b)) {
          k.push("[");
          d = 0;
          for (e = b.length; d < e; d += 1)
            c.isObject(b[d])
              ? k.push(0 < a ? c.dump(b[d], a - 1) : "{...}")
              : k.push(b[d]),
              k.push(", ");
          1 < k.length && k.pop();
          k.push("]");
        } else {
          k.push("{");
          for (d in b)
            c.hasOwnProperty(b, d) &&
              (k.push(d + " \x3d\x3e "),
              c.isObject(b[d])
                ? k.push(0 < a ? c.dump(b[d], a - 1) : "{...}")
                : k.push(b[d]),
              k.push(", "));
          1 < k.length && k.pop();
          k.push("}");
        }
        return k.join("");
      },
      substitute: function (b, a, d) {
        for (var h, k, l, m, n, p = [], q; ; ) {
          h = b.lastIndexOf("{");
          if (0 > h) break;
          k = b.indexOf("}", h);
          if (h + 1 >= k) break;
          m = q = b.substring(h + 1, k);
          n = null;
          l = m.indexOf(" ");
          -1 < l && ((n = m.substring(l + 1)), (m = m.substring(0, l)));
          l = a[m];
          d && (l = d(m, l, n));
          c.isObject(l)
            ? c.isArray(l)
              ? (l = c.dump(l, parseInt(n, 10)))
              : ((n = n || ""),
                (m = n.indexOf("dump")),
                -1 < m && (n = n.substring(4)),
                (l =
                  l.toString === e.toString || -1 < m
                    ? c.dump(l, parseInt(n, 10))
                    : l.toString()))
            : c.isString(l) ||
              c.isNumber(l) ||
              ((l = "~-" + p.length + "-~"), (p[p.length] = q));
          b = b.substring(0, h) + l + b.substring(k + 1);
        }
        for (h = p.length - 1; 0 <= h; --h)
          b = b.replace(new RegExp("~-" + h + "-~"), "{" + p[h] + "}", "g");
        return b;
      },
      trim: function (b) {
        try {
          return b.replace(/^\s+|\s+$/g, "");
        } catch (a) {
          return b;
        }
      },
      merge: function () {
        var b = {},
          a = arguments,
          d = a.length,
          e;
        for (e = 0; e < d; e += 1) c.augmentObject(b, a[e], !0);
        return b;
      },
      later: function (b, a, d, e, k) {
        b = b || 0;
        a = a || {};
        var l = d,
          m = e,
          n;
        c.isString(d) && (l = a[d]);
        if (!l) throw new TypeError("method undefined");
        c.isArray(m) || (m = [e]);
        d = function () {
          l.apply(a, m);
        };
        n = k ? setInterval(d, b) : setTimeout(d, b);
        return {
          interval: k,
          cancel: function () {
            this.interval ? clearInterval(n) : clearTimeout(n);
          },
        };
      },
      isValue: function (b) {
        return (
          c.isObject(b) || c.isString(b) || c.isNumber(b) || c.isBoolean(b)
        );
      },
    };
  c.hasOwnProperty = e.hasOwnProperty
    ? function (b, a) {
        return b && b.hasOwnProperty(a);
      }
    : function (b, a) {
        return !c.isUndefined(b[a]) && b.constructor.prototype[a] !== b[a];
      };
  d.augmentObject(c, d, !0);
  YAHOO.util.Lang = c;
  c.augment = c.augmentProto;
  YAHOO.augment = c.augmentProto;
  YAHOO.extend = c.extend;
})();
YAHOO.register("yahoo", YAHOO, { version: "2.7.0", build: "1796" });
(function () {
  YAHOO.env._id_counter = YAHOO.env._id_counter || 0;
  var c = YAHOO.util,
    e = YAHOO.lang,
    a = YAHOO.env.ua,
    d = YAHOO.lang.trim,
    b = {},
    f = {},
    g = /^t(?:able|d|h)$/i,
    h = /color$/i,
    k = window.document,
    l = k.documentElement,
    m = a.opera,
    n = a.webkit,
    p = a.gecko,
    q = a.ie;
  c.Dom = {
    CUSTOM_ATTRIBUTES: l.hasAttribute
      ? { htmlFor: "for", className: "class" }
      : { for: "htmlFor", class: "className" },
    get: function (b) {
      var a, d, f, e;
      if (b) {
        if (b.nodeType || b.item) return b;
        if ("string" === typeof b) {
          a = b;
          b = k.getElementById(b);
          if ((!b || b.id !== a) && b && k.all)
            for (b = null, d = k.all[a], f = 0, e = d.length; f < e; ++f)
              if (d[f].id === a) return d[f];
          return b;
        }
        b.DOM_EVENTS && (b = b.get("element"));
        if ("length" in b) {
          a = [];
          f = 0;
          for (e = b.length; f < e; ++f) a[a.length] = c.Dom.get(b[f]);
          return a;
        }
        return b;
      }
      return null;
    },
    getComputedStyle: function (b, a) {
      if (window.getComputedStyle)
        return b.ownerDocument.defaultView.getComputedStyle(b, null)[a];
      if (b.currentStyle) return c.Dom.IE_ComputedStyle.get(b, a);
    },
    getStyle: function (b, a) {
      return c.Dom.batch(b, c.Dom._getStyle, a);
    },
    _getStyle: (function () {
      if (window.getComputedStyle)
        return function (b, a) {
          a = "float" === a ? (a = "cssFloat") : c.Dom._toCamel(a);
          var d = b.style[a],
            f;
          d ||
            ((f = b.ownerDocument.defaultView.getComputedStyle(b, null)) &&
              (d = f[a]));
          return d;
        };
      if (l.currentStyle)
        return function (b, a) {
          var d;
          switch (a) {
            case "opacity":
              d = 100;
              try {
                d = b.filters["DXImageTransform.Microsoft.Alpha"].opacity;
              } catch (f) {
                try {
                  d = b.filters("alpha").opacity;
                } catch (e) {}
              }
              return d / 100;
            case "float":
              a = "styleFloat";
            default:
              return (
                (a = c.Dom._toCamel(a)),
                (d = b.currentStyle ? b.currentStyle[a] : null),
                b.style[a] || d
              );
          }
        };
    })(),
    setStyle: function (b, a, d) {
      c.Dom.batch(b, c.Dom._setStyle, { prop: a, val: d });
    },
    _setStyle: (function () {
      return q
        ? function (b, a) {
            var d = c.Dom._toCamel(a.prop),
              f = a.val;
            if (b)
              switch (d) {
                case "opacity":
                  e.isString(b.style.filter) &&
                    ((b.style.filter = "alpha(opacity\x3d" + 100 * f + ")"),
                    (b.currentStyle && b.currentStyle.hasLayout) ||
                      (b.style.zoom = 1));
                  break;
                case "float":
                  d = "styleFloat";
                default:
                  b.style[d] = f;
              }
          }
        : function (b, a) {
            var d = c.Dom._toCamel(a.prop),
              f = a.val;
            b && ("float" == d && (d = "cssFloat"), (b.style[d] = f));
          };
    })(),
    getXY: function (b) {
      return c.Dom.batch(b, c.Dom._getXY);
    },
    _canPosition: function (b) {
      return "none" !== c.Dom._getStyle(b, "display") && c.Dom._inDoc(b);
    },
    _getXY: (function () {
      return k.documentElement.getBoundingClientRect
        ? function (b) {
            var d,
              f,
              e,
              g,
              l,
              h,
              p,
              m = Math.floor;
            f = !1;
            if (c.Dom._canPosition(b)) {
              f = b.getBoundingClientRect();
              e = b.ownerDocument;
              b = c.Dom.getDocumentScrollLeft(e);
              d = c.Dom.getDocumentScrollTop(e);
              f = [m(f.left), m(f.top)];
              q &&
                8 > a.ie &&
                ((l = g = 2),
                (h = e.compatMode),
                (p = r(e.documentElement, "borderLeftWidth")),
                (e = r(e.documentElement, "borderTopWidth")),
                6 === a.ie && "BackCompat" !== h && (l = g = 0),
                "BackCompat" == h &&
                  ("medium" !== p && (g = parseInt(p, 10)),
                  "medium" !== e && (l = parseInt(e, 10))),
                (f[0] -= g),
                (f[1] -= l));
              if (d || b) (f[0] += b), (f[1] += d);
              f[0] = m(f[0]);
              f[1] = m(f[1]);
            }
            return f;
          }
        : function (b) {
            var d,
              f,
              e,
              g = !1,
              l = b;
            if (c.Dom._canPosition(b)) {
              g = [b.offsetLeft, b.offsetTop];
              d = c.Dom.getDocumentScrollLeft(b.ownerDocument);
              f = c.Dom.getDocumentScrollTop(b.ownerDocument);
              for (e = p || 519 < a.webkit ? !0 : !1; (l = l.offsetParent); )
                (g[0] += l.offsetLeft),
                  (g[1] += l.offsetTop),
                  e && (g = c.Dom._calcBorders(l, g));
              if ("fixed" !== c.Dom._getStyle(b, "position")) {
                for (l = b; (l = l.parentNode) && l.tagName; )
                  if (
                    ((b = l.scrollTop),
                    (e = l.scrollLeft),
                    p &&
                      "visible" !== c.Dom._getStyle(l, "overflow") &&
                      (g = c.Dom._calcBorders(l, g)),
                    b || e)
                  )
                    (g[0] -= e), (g[1] -= b);
                g[0] += d;
                g[1] += f;
              } else if (m) (g[0] -= d), (g[1] -= f);
              else if (n || p) (g[0] += d), (g[1] += f);
              g[0] = Math.floor(g[0]);
              g[1] = Math.floor(g[1]);
            }
            return g;
          };
    })(),
    getX: function (b) {
      return c.Dom.batch(
        b,
        function (b) {
          return c.Dom.getXY(b)[0];
        },
        c.Dom,
        !0
      );
    },
    getY: function (b) {
      return c.Dom.batch(
        b,
        function (b) {
          return c.Dom.getXY(b)[1];
        },
        c.Dom,
        !0
      );
    },
    setXY: function (b, a, d) {
      c.Dom.batch(b, c.Dom._setXY, { pos: a, noRetry: d });
    },
    _setXY: function (b, a) {
      var d = c.Dom._getStyle(b, "position"),
        f = c.Dom.setStyle,
        e = a.pos,
        g = a.noRetry,
        l = [
          parseInt(c.Dom.getComputedStyle(b, "left"), 10),
          parseInt(c.Dom.getComputedStyle(b, "top"), 10),
        ],
        h;
      "static" == d && ((d = "relative"), f(b, "position", d));
      h = c.Dom._getXY(b);
      if (!e || !1 === h) return !1;
      isNaN(l[0]) && (l[0] = "relative" == d ? 0 : b.offsetLeft);
      isNaN(l[1]) && (l[1] = "relative" == d ? 0 : b.offsetTop);
      null !== e[0] && f(b, "left", e[0] - h[0] + l[0] + "px");
      null !== e[1] && f(b, "top", e[1] - h[1] + l[1] + "px");
      g ||
        ((d = c.Dom._getXY(b)),
        ((null !== e[0] && d[0] != e[0]) || (null !== e[1] && d[1] != e[1])) &&
          c.Dom._setXY(b, { pos: e, noRetry: !0 }));
    },
    setX: function (b, a) {
      c.Dom.setXY(b, [a, null]);
    },
    setY: function (b, a) {
      c.Dom.setXY(b, [null, a]);
    },
    getRegion: function (b) {
      return c.Dom.batch(
        b,
        function (b) {
          var a = !1;
          c.Dom._canPosition(b) && (a = c.Region.getRegion(b));
          return a;
        },
        c.Dom,
        !0
      );
    },
    getClientWidth: function () {
      return c.Dom.getViewportWidth();
    },
    getClientHeight: function () {
      return c.Dom.getViewportHeight();
    },
    getElementsByClassName: function (b, a, d, f, g, l) {
      b = e.trim(b);
      a = a || "*";
      d = d ? c.Dom.get(d) : k;
      if (!d) return [];
      var h = [];
      a = d.getElementsByTagName(a);
      d = c.Dom.hasClass;
      for (var p = 0, m = a.length; p < m; ++p)
        d(a[p], b) && (h[h.length] = a[p]);
      f && c.Dom.batch(h, f, g, l);
      return h;
    },
    hasClass: function (b, a) {
      return c.Dom.batch(b, c.Dom._hasClass, a);
    },
    _hasClass: function (b, a) {
      var d = !1;
      b &&
        a &&
        ((d = c.Dom.getAttribute(b, "className") || ""),
        (d = a.exec
          ? a.test(d)
          : a && -1 < (" " + d + " ").indexOf(" " + a + " ")));
      return d;
    },
    addClass: function (b, a) {
      return c.Dom.batch(b, c.Dom._addClass, a);
    },
    _addClass: function (b, a) {
      var f = !1,
        e;
      b &&
        a &&
        ((e = c.Dom.getAttribute(b, "className") || ""),
        c.Dom._hasClass(b, a) ||
          (c.Dom.setAttribute(b, "className", d(e + " " + a)), (f = !0)));
      return f;
    },
    removeClass: function (b, a) {
      return c.Dom.batch(b, c.Dom._removeClass, a);
    },
    _removeClass: function (b, a) {
      var f = !1,
        e,
        g;
      b &&
        a &&
        ((e = c.Dom.getAttribute(b, "className") || ""),
        c.Dom.setAttribute(
          b,
          "className",
          e.replace(c.Dom._getClassRegex(a), "")
        ),
        (g = c.Dom.getAttribute(b, "className")),
        e !== g &&
          (c.Dom.setAttribute(b, "className", d(g)),
          (f = !0),
          "" === c.Dom.getAttribute(b, "className") &&
            ((e =
              b.hasAttribute && b.hasAttribute("class")
                ? "class"
                : "className"),
            b.removeAttribute(e))));
      return f;
    },
    replaceClass: function (b, a, d) {
      return c.Dom.batch(b, c.Dom._replaceClass, { from: a, to: d });
    },
    _replaceClass: function (b, a) {
      var f,
        e,
        g = !1;
      b &&
        a &&
        (((f = a.from), (e = a.to), e)
          ? f
            ? f !== e &&
              ((g = c.Dom.getAttribute(b, "className") || ""),
              (f = (" " + g.replace(c.Dom._getClassRegex(f), " " + e)).split(
                c.Dom._getClassRegex(e)
              )),
              f.splice(1, 0, " " + e),
              c.Dom.setAttribute(b, "className", d(f.join(""))),
              (g = !0))
            : (g = c.Dom._addClass(b, a.to))
          : (g = !1));
      return g;
    },
    generateId: function (b, a) {
      a = a || "yui-gen";
      var d = function (b) {
        if (b && b.id) return b.id;
        var d = a + YAHOO.env._id_counter++;
        if (b) {
          if (b.ownerDocument.getElementById(d))
            return c.Dom.generateId(b, d + a);
          b.id = d;
        }
        return d;
      };
      return c.Dom.batch(b, d, c.Dom, !0) || d.apply(c.Dom, arguments);
    },
    isAncestor: function (b, a) {
      b = c.Dom.get(b);
      a = c.Dom.get(a);
      var d = !1;
      b &&
        a &&
        b.nodeType &&
        a.nodeType &&
        (b.contains && b !== a
          ? (d = b.contains(a))
          : b.compareDocumentPosition &&
            (d = !!(b.compareDocumentPosition(a) & 16)));
      return d;
    },
    inDocument: function (b, a) {
      return c.Dom._inDoc(c.Dom.get(b), a);
    },
    _inDoc: function (b, a) {
      var d = !1;
      b &&
        b.tagName &&
        ((a = a || b.ownerDocument),
        (d = c.Dom.isAncestor(a.documentElement, b)));
      return d;
    },
    getElementsBy: function (b, a, d, f, e, g, l) {
      a = a || "*";
      d = d ? c.Dom.get(d) : k;
      if (!d) return [];
      var h = [];
      a = d.getElementsByTagName(a);
      d = 0;
      for (var p = a.length; d < p; ++d)
        if (b(a[d]))
          if (l) {
            h = a[d];
            break;
          } else h[h.length] = a[d];
      f && c.Dom.batch(h, f, e, g);
      return h;
    },
    getElementBy: function (b, a, d) {
      return c.Dom.getElementsBy(b, a, d, null, null, null, !0);
    },
    batch: function (b, a, d, f) {
      var e = [];
      f = f ? d : window;
      if ((b = b && (b.tagName || b.item) ? b : c.Dom.get(b)) && a) {
        if (b.tagName || void 0 === b.length) return a.call(f, b, d);
        for (var g = 0; g < b.length; ++g) e[e.length] = a.call(f, b[g], d);
      } else return !1;
      return e;
    },
    getDocumentHeight: function () {
      return Math.max(
        "CSS1Compat" != k.compatMode || n
          ? k.body.scrollHeight
          : l.scrollHeight,
        c.Dom.getViewportHeight()
      );
    },
    getDocumentWidth: function () {
      return Math.max(
        "CSS1Compat" != k.compatMode || n ? k.body.scrollWidth : l.scrollWidth,
        c.Dom.getViewportWidth()
      );
    },
    getViewportHeight: function () {
      var b = self.innerHeight,
        a = k.compatMode;
      (!a && !q) ||
        m ||
        (b = "CSS1Compat" == a ? l.clientHeight : k.body.clientHeight);
      return b;
    },
    getViewportWidth: function () {
      var b = self.innerWidth,
        a = k.compatMode;
      if (a || q) b = "CSS1Compat" == a ? l.clientWidth : k.body.clientWidth;
      return b;
    },
    getAncestorBy: function (b, a) {
      for (; (b = b.parentNode); ) if (c.Dom._testElement(b, a)) return b;
      return null;
    },
    getAncestorByClassName: function (b, a) {
      return (b = c.Dom.get(b))
        ? c.Dom.getAncestorBy(b, function (b) {
            return c.Dom.hasClass(b, a);
          })
        : null;
    },
    getAncestorByTagName: function (b, a) {
      return (b = c.Dom.get(b))
        ? c.Dom.getAncestorBy(b, function (b) {
            return b.tagName && b.tagName.toUpperCase() == a.toUpperCase();
          })
        : null;
    },
    getPreviousSiblingBy: function (b, a) {
      for (; b; )
        if (((b = b.previousSibling), c.Dom._testElement(b, a))) return b;
      return null;
    },
    getPreviousSibling: function (b) {
      return (b = c.Dom.get(b)) ? c.Dom.getPreviousSiblingBy(b) : null;
    },
    getNextSiblingBy: function (b, a) {
      for (; b; ) if (((b = b.nextSibling), c.Dom._testElement(b, a))) return b;
      return null;
    },
    getNextSibling: function (b) {
      return (b = c.Dom.get(b)) ? c.Dom.getNextSiblingBy(b) : null;
    },
    getFirstChildBy: function (b, a) {
      return (
        (c.Dom._testElement(b.firstChild, a) ? b.firstChild : null) ||
        c.Dom.getNextSiblingBy(b.firstChild, a)
      );
    },
    getFirstChild: function (b, a) {
      return (b = c.Dom.get(b)) ? c.Dom.getFirstChildBy(b) : null;
    },
    getLastChildBy: function (b, a) {
      return b
        ? (c.Dom._testElement(b.lastChild, a) ? b.lastChild : null) ||
            c.Dom.getPreviousSiblingBy(b.lastChild, a)
        : null;
    },
    getLastChild: function (b) {
      b = c.Dom.get(b);
      return c.Dom.getLastChildBy(b);
    },
    getChildrenBy: function (b, a) {
      var d = c.Dom.getFirstChildBy(b, a),
        f = d ? [d] : [];
      c.Dom.getNextSiblingBy(d, function (b) {
        if (!a || a(b)) f[f.length] = b;
        return !1;
      });
      return f;
    },
    getChildren: function (b) {
      b = c.Dom.get(b);
      return c.Dom.getChildrenBy(b);
    },
    getDocumentScrollLeft: function (b) {
      b = b || k;
      return Math.max(b.documentElement.scrollLeft, b.body.scrollLeft);
    },
    getDocumentScrollTop: function (b) {
      b = b || k;
      return Math.max(b.documentElement.scrollTop, b.body.scrollTop);
    },
    insertBefore: function (b, a) {
      b = c.Dom.get(b);
      a = c.Dom.get(a);
      return b && a && a.parentNode ? a.parentNode.insertBefore(b, a) : null;
    },
    insertAfter: function (b, a) {
      b = c.Dom.get(b);
      a = c.Dom.get(a);
      return b && a && a.parentNode
        ? a.nextSibling
          ? a.parentNode.insertBefore(b, a.nextSibling)
          : a.parentNode.appendChild(b)
        : null;
    },
    getClientRegion: function () {
      var b = c.Dom.getDocumentScrollTop(),
        a = c.Dom.getDocumentScrollLeft(),
        d = c.Dom.getViewportWidth() + a,
        f = c.Dom.getViewportHeight() + b;
      return new c.Region(b, d, f, a);
    },
    setAttribute: function (b, a, d) {
      a = c.Dom.CUSTOM_ATTRIBUTES[a] || a;
      b.setAttribute(a, d);
    },
    getAttribute: function (b, a) {
      a = c.Dom.CUSTOM_ATTRIBUTES[a] || a;
      return b.getAttribute(a);
    },
    _toCamel: function (a) {
      function d(b, a) {
        return a.toUpperCase();
      }
      return (
        b[a] || (b[a] = -1 === a.indexOf("-") ? a : a.replace(/-([a-z])/gi, d))
      );
    },
    _getClassRegex: function (b) {
      var a;
      void 0 !== b &&
        (b.exec
          ? (a = b)
          : ((a = f[b]),
            a ||
              ((b = b.replace(c.Dom._patterns.CLASS_RE_TOKENS, "\\$1")),
              (a = f[b] = new RegExp("(?:^|\\s)" + b + "(?\x3d |$)", "g")))));
      return a;
    },
    _patterns: {
      ROOT_TAG: /^body|html$/i,
      CLASS_RE_TOKENS: /([\.\(\)\^\$\*\+\?\|\[\]\{\}])/g,
    },
    _testElement: function (b, a) {
      return b && 1 == b.nodeType && (!a || a(b));
    },
    _calcBorders: function (b, a) {
      var d = parseInt(c.Dom.getComputedStyle(b, "borderTopWidth"), 10) || 0,
        f = parseInt(c.Dom.getComputedStyle(b, "borderLeftWidth"), 10) || 0;
      p && g.test(b.tagName) && (f = d = 0);
      a[0] += f;
      a[1] += d;
      return a;
    },
  };
  var r = c.Dom.getComputedStyle;
  a.opera &&
    (c.Dom.getComputedStyle = function (b, a) {
      var d = r(b, a);
      h.test(a) && (d = c.Dom.Color.toRGB(d));
      return d;
    });
  a.webkit &&
    (c.Dom.getComputedStyle = function (b, a) {
      var d = r(b, a);
      "rgba(0, 0, 0, 0)" === d && (d = "transparent");
      return d;
    });
})();
YAHOO.util.Region = function (c, e, a, d) {
  this.y = this.top = c;
  this[1] = c;
  this.right = e;
  this.bottom = a;
  this.x = this.left = d;
  this[0] = d;
  this.width = this.right - this.left;
  this.height = this.bottom - this.top;
};
YAHOO.util.Region.prototype.contains = function (c) {
  return (
    c.left >= this.left &&
    c.right <= this.right &&
    c.top >= this.top &&
    c.bottom <= this.bottom
  );
};
YAHOO.util.Region.prototype.getArea = function () {
  return (this.bottom - this.top) * (this.right - this.left);
};
YAHOO.util.Region.prototype.intersect = function (c) {
  var e = Math.max(this.top, c.top),
    a = Math.min(this.right, c.right),
    d = Math.min(this.bottom, c.bottom);
  c = Math.max(this.left, c.left);
  return d >= e && a >= c ? new YAHOO.util.Region(e, a, d, c) : null;
};
YAHOO.util.Region.prototype.union = function (c) {
  var e = Math.min(this.top, c.top),
    a = Math.max(this.right, c.right),
    d = Math.max(this.bottom, c.bottom);
  c = Math.min(this.left, c.left);
  return new YAHOO.util.Region(e, a, d, c);
};
YAHOO.util.Region.prototype.toString = function () {
  return (
    "Region {top: " +
    this.top +
    ", right: " +
    this.right +
    ", bottom: " +
    this.bottom +
    ", left: " +
    this.left +
    ", height: " +
    this.height +
    ", width: " +
    this.width +
    "}"
  );
};
YAHOO.util.Region.getRegion = function (c) {
  var e = YAHOO.util.Dom.getXY(c);
  return new YAHOO.util.Region(
    e[1],
    e[0] + c.offsetWidth,
    e[1] + c.offsetHeight,
    e[0]
  );
};
YAHOO.util.Point = function (c, e) {
  YAHOO.lang.isArray(c) && ((e = c[1]), (c = c[0]));
  YAHOO.util.Point.superclass.constructor.call(this, e, c, e, c);
};
YAHOO.extend(YAHOO.util.Point, YAHOO.util.Region);
(function () {
  var c = YAHOO.util,
    e = /^width|height$/,
    a =
      /^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,
    d = {
      get: function (b, d) {
        var e = "",
          e = b.currentStyle[d];
        return (e =
          "opacity" === d
            ? c.Dom.getStyle(b, "opacity")
            : !e || (e.indexOf && -1 < e.indexOf("px"))
            ? e
            : c.Dom.IE_COMPUTED[d]
            ? c.Dom.IE_COMPUTED[d](b, d)
            : a.test(e)
            ? c.Dom.IE.ComputedStyle.getPixel(b, d)
            : e);
      },
      getOffset: function (b, a) {
        var d = b.currentStyle[a],
          c = a.charAt(0).toUpperCase() + a.substr(1),
          l = "offset" + c,
          m = "pixel" + c,
          c = "";
        "auto" == d
          ? ((c = d = b[l]),
            e.test(a) &&
              ((b.style[a] = d),
              b[l] > d && (c = d - (b[l] - d)),
              (b.style[a] = "auto")))
          : (b.style[m] || b.style[a] || (b.style[a] = d), (c = b.style[m]));
        return c + "px";
      },
      getBorderWidth: function (b, a) {
        var d = null;
        b.currentStyle.hasLayout || (b.style.zoom = 1);
        switch (a) {
          case "borderTopWidth":
            d = b.clientTop;
            break;
          case "borderBottomWidth":
            d = b.offsetHeight - b.clientHeight - b.clientTop;
            break;
          case "borderLeftWidth":
            d = b.clientLeft;
            break;
          case "borderRightWidth":
            d = b.offsetWidth - b.clientWidth - b.clientLeft;
        }
        return d + "px";
      },
      getPixel: function (b, a) {
        var d = null,
          c = b.currentStyle.right;
        b.style.right = b.currentStyle[a];
        d = b.style.pixelRight;
        b.style.right = c;
        return d + "px";
      },
      getMargin: function (b, a) {
        return "auto" == b.currentStyle[a]
          ? "0px"
          : c.Dom.IE.ComputedStyle.getPixel(b, a);
      },
      getVisibility: function (b, a) {
        for (var d; (d = b.currentStyle) && "inherit" == d[a]; )
          b = b.parentNode;
        return d ? d[a] : "visible";
      },
      getColor: function (b, a) {
        return c.Dom.Color.toRGB(b.currentStyle[a]) || "transparent";
      },
      getBorderColor: function (b, a) {
        var d = b.currentStyle;
        return c.Dom.Color.toRGB(c.Dom.Color.toHex(d[a] || d.color));
      },
    },
    b = {};
  b.top = b.right = b.bottom = b.left = b.width = b.height = d.getOffset;
  b.color = d.getColor;
  b.borderTopWidth =
    b.borderRightWidth =
    b.borderBottomWidth =
    b.borderLeftWidth =
      d.getBorderWidth;
  b.marginTop = b.marginRight = b.marginBottom = b.marginLeft = d.getMargin;
  b.visibility = d.getVisibility;
  b.borderColor =
    b.borderTopColor =
    b.borderRightColor =
    b.borderBottomColor =
    b.borderLeftColor =
      d.getBorderColor;
  c.Dom.IE_COMPUTED = b;
  c.Dom.IE_ComputedStyle = d;
})();
(function () {
  var c = parseInt,
    e = RegExp,
    a = YAHOO.util;
  a.Dom.Color = {
    KEYWORDS: {
      black: "000",
      silver: "c0c0c0",
      gray: "808080",
      white: "fff",
      maroon: "800000",
      red: "f00",
      purple: "800080",
      fuchsia: "f0f",
      green: "008000",
      lime: "0f0",
      olive: "808000",
      yellow: "ff0",
      navy: "000080",
      blue: "00f",
      teal: "008080",
      aqua: "0ff",
    },
    re_RGB: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
    re_hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
    re_hex3: /([0-9A-F])/gi,
    toRGB: function (d) {
      a.Dom.Color.re_RGB.test(d) || (d = a.Dom.Color.toHex(d));
      a.Dom.Color.re_hex.exec(d) &&
        (d = "rgb(" + [c(e.$1, 16), c(e.$2, 16), c(e.$3, 16)].join(", ") + ")");
      return d;
    },
    toHex: function (d) {
      d = a.Dom.Color.KEYWORDS[d] || d;
      if (a.Dom.Color.re_RGB.exec(d)) {
        d = 1 === e.$2.length ? "0" + e.$2 : Number(e.$2);
        var b = 1 === e.$3.length ? "0" + e.$3 : Number(e.$3);
        d = [
          (1 === e.$1.length ? "0" + e.$1 : Number(e.$1)).toString(16),
          d.toString(16),
          b.toString(16),
        ].join("");
      }
      6 > d.length && (d = d.replace(a.Dom.Color.re_hex3, "$1$1"));
      "transparent" !== d && 0 > d.indexOf("#") && (d = "#" + d);
      return d.toLowerCase();
    },
  };
})();
YAHOO.register("dom", YAHOO.util.Dom, { version: "2.7.0", build: "1796" });
YAHOO.util.CustomEvent = function (c, e, a, d) {
  this.type = c;
  this.scope = e || window;
  this.silent = a;
  this.signature = d || YAHOO.util.CustomEvent.LIST;
  this.subscribers = [];
  "_YUICEOnSubscribe" !== c &&
    (this.subscribeEvent = new YAHOO.util.CustomEvent(
      "_YUICEOnSubscribe",
      this,
      !0
    ));
  this.lastError = null;
};
YAHOO.util.CustomEvent.LIST = 0;
YAHOO.util.CustomEvent.FLAT = 1;
YAHOO.util.CustomEvent.prototype = {
  subscribe: function (c, e, a) {
    if (!c)
      throw Error("Invalid callback for subscriber to '" + this.type + "'");
    this.subscribeEvent && this.subscribeEvent.fire(c, e, a);
    this.subscribers.push(new YAHOO.util.Subscriber(c, e, a));
  },
  unsubscribe: function (c, e) {
    if (!c) return this.unsubscribeAll();
    for (var a = !1, d = 0, b = this.subscribers.length; d < b; ++d) {
      var f = this.subscribers[d];
      f && f.contains(c, e) && (this._delete(d), (a = !0));
    }
    return a;
  },
  fire: function () {
    this.lastError = null;
    var c = this.subscribers.length;
    if (!c && this.silent) return !0;
    var e = [].slice.call(arguments, 0),
      a = !0,
      d,
      b = this.subscribers.slice(),
      f = YAHOO.util.Event.throwErrors;
    for (d = 0; d < c; ++d) {
      var g = b[d];
      if (g) {
        var h = g.getScope(this.scope);
        if (this.signature == YAHOO.util.CustomEvent.FLAT) {
          var k = null;
          0 < e.length && (k = e[0]);
          try {
            a = g.fn.call(h, k, g.obj);
          } catch (l) {
            if (((this.lastError = l), f)) throw l;
          }
        } else
          try {
            a = g.fn.call(h, this.type, e, g.obj);
          } catch (m) {
            if (((this.lastError = m), f)) throw m;
          }
        if (!1 === a) break;
      }
    }
    return !1 !== a;
  },
  unsubscribeAll: function () {
    var c = this.subscribers.length,
      e;
    for (e = c - 1; -1 < e; e--) this._delete(e);
    this.subscribers = [];
    return c;
  },
  _delete: function (c) {
    var e = this.subscribers[c];
    e && (delete e.fn, delete e.obj);
    this.subscribers.splice(c, 1);
  },
  toString: function () {
    return "CustomEvent: '" + this.type + "', context: " + this.scope;
  },
};
YAHOO.util.Subscriber = function (c, e, a) {
  this.fn = c;
  this.obj = YAHOO.lang.isUndefined(e) ? null : e;
  this.overrideContext = a;
};
YAHOO.util.Subscriber.prototype.getScope = function (c) {
  return this.overrideContext
    ? !0 === this.overrideContext
      ? this.obj
      : this.overrideContext
    : c;
};
YAHOO.util.Subscriber.prototype.contains = function (c, e) {
  return e ? this.fn == c && this.obj == e : this.fn == c;
};
YAHOO.util.Subscriber.prototype.toString = function () {
  return (
    "Subscriber { obj: " +
    this.obj +
    ", overrideContext: " +
    (this.overrideContext || "no") +
    " }"
  );
};
YAHOO.util.Event ||
  ((YAHOO.util.Event = (function () {
    var c = !1,
      e = [],
      a = [],
      d = [],
      b = [],
      f = 0,
      g = [],
      h = [],
      k = 0,
      l = {
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63276: 33,
        63277: 34,
        25: 9,
      },
      m = YAHOO.env.ua.ie ? "focusin" : "focus",
      n = YAHOO.env.ua.ie ? "focusout" : "blur";
    return {
      POLL_RETRYS: 2e3,
      POLL_INTERVAL: 20,
      EL: 0,
      TYPE: 1,
      FN: 2,
      WFN: 3,
      UNLOAD_OBJ: 3,
      ADJ_SCOPE: 4,
      OBJ: 5,
      OVERRIDE: 6,
      lastError: null,
      isSafari: YAHOO.env.ua.webkit,
      webkit: YAHOO.env.ua.webkit,
      isIE: YAHOO.env.ua.ie,
      _interval: null,
      _dri: null,
      DOMReady: !1,
      throwErrors: !1,
      startInterval: function () {
        if (!this._interval) {
          var b = this;
          this._interval = setInterval(function () {
            b._tryPreloadAttach();
          }, this.POLL_INTERVAL);
        }
      },
      onAvailable: function (b, a, d, c, e) {
        b = YAHOO.lang.isString(b) ? [b] : b;
        for (var l = 0; l < b.length; l += 1)
          g.push({
            id: b[l],
            fn: a,
            obj: d,
            overrideContext: c,
            checkReady: e,
          });
        f = this.POLL_RETRYS;
        this.startInterval();
      },
      onContentReady: function (b, a, d, c) {
        this.onAvailable(b, a, d, c, !0);
      },
      onDOMReady: function (b, a, d) {
        this.DOMReady
          ? setTimeout(function () {
              var c = window;
              d && (c = !0 === d ? a : d);
              b.call(c, "DOMReady", [], a);
            }, 0)
          : this.DOMReadyEvent.subscribe(b, a, d);
      },
      _addListener: function (c, f, l, g, m, k) {
        if (!l || !l.call) return !1;
        if (this._isValidCollection(c)) {
          k = !0;
          for (var n = 0, w = c.length; n < w; ++n)
            k = this.on(c[n], f, l, g, m) && k;
          return k;
        }
        if (YAHOO.lang.isString(c))
          if ((n = this.getEl(c))) c = n;
          else
            return (
              this.onAvailable(c, function () {
                YAHOO.util.Event.on(c, f, l, g, m);
              }),
              !0
            );
        if (!c) return !1;
        if ("unload" == f && g !== this)
          return (a[a.length] = [c, f, l, g, m]), !0;
        var x = c;
        m && (x = !0 === m ? g : m);
        n = function (b) {
          return l.call(x, YAHOO.util.Event.getEvent(b, c), g);
        };
        w = [c, f, l, n, x, g, m];
        e[e.length] = w;
        if (this.useLegacyEvent(c, f)) {
          var t = this.getLegacyIndex(c, f);
          if (-1 == t || c != d[t][0])
            (t = d.length),
              (h[c.id + f] = t),
              (d[t] = [c, f, c["on" + f]]),
              (b[t] = []),
              (c["on" + f] = function (b) {
                YAHOO.util.Event.fireLegacyEvent(
                  YAHOO.util.Event.getEvent(b),
                  t
                );
              });
          b[t].push(w);
        } else
          try {
            this._simpleAdd(c, f, n, k);
          } catch (y) {
            return (this.lastError = y), this.removeListener(c, f, l), !1;
          }
        return !0;
      },
      addListener: function (b, a, d, c, f) {
        return this._addListener(b, a, d, c, f, !1);
      },
      addFocusListener: function (b, a, d, c) {
        return this._addListener(b, m, a, d, c, !0);
      },
      removeFocusListener: function (b, a) {
        return this.removeListener(b, m, a);
      },
      addBlurListener: function (b, a, d, c) {
        return this._addListener(b, n, a, d, c, !0);
      },
      removeBlurListener: function (b, a) {
        return this.removeListener(b, n, a);
      },
      fireLegacyEvent: function (a, c) {
        var f = !0,
          e,
          l,
          g;
        e = b[c].slice();
        for (var h = 0, m = e.length; h < m; ++h)
          (l = e[h]) &&
            l[this.WFN] &&
            ((g = l[this.ADJ_SCOPE]),
            (l = l[this.WFN].call(g, a)),
            (f = f && l));
        if ((e = d[c]) && e[2]) e[2](a);
        return f;
      },
      getLegacyIndex: function (b, a) {
        var d = this.generateId(b) + a;
        return "undefined" == typeof h[d] ? -1 : h[d];
      },
      useLegacyEvent: function (b, a) {
        return (
          this.webkit && 419 > this.webkit && ("click" == a || "dblclick" == a)
        );
      },
      removeListener: function (d, c, f, l) {
        var g, h, m;
        if ("string" == typeof d) d = this.getEl(d);
        else if (this._isValidCollection(d)) {
          l = !0;
          for (g = d.length - 1; -1 < g; g--)
            l = this.removeListener(d[g], c, f) && l;
          return l;
        }
        if (!f || !f.call) return this.purgeElement(d, !1, c);
        if ("unload" == c) {
          for (g = a.length - 1; -1 < g; g--)
            if ((m = a[g]) && m[0] == d && m[1] == c && m[2] == f)
              return a.splice(g, 1), !0;
          return !1;
        }
        g = null;
        "undefined" === typeof l && (l = this._getCacheIndex(d, c, f));
        0 <= l && (g = e[l]);
        if (!d || !g) return !1;
        if (this.useLegacyEvent(d, c)) {
          g = this.getLegacyIndex(d, c);
          var k = b[g];
          if (k)
            for (g = 0, h = k.length; g < h; ++g)
              if (
                (m = k[g]) &&
                m[this.EL] == d &&
                m[this.TYPE] == c &&
                m[this.FN] == f
              ) {
                k.splice(g, 1);
                break;
              }
        } else
          try {
            this._simpleRemove(d, c, g[this.WFN], !1);
          } catch (n) {
            return (this.lastError = n), !1;
          }
        delete e[l][this.WFN];
        delete e[l][this.FN];
        e.splice(l, 1);
        return !0;
      },
      getTarget: function (b, a) {
        return this.resolveTextNode(b.target || b.srcElement);
      },
      resolveTextNode: function (b) {
        try {
          if (b && 3 == b.nodeType) return b.parentNode;
        } catch (a) {}
        return b;
      },
      getPageX: function (b) {
        var a = b.pageX;
        a ||
          0 === a ||
          ((a = b.clientX || 0), this.isIE && (a += this._getScrollLeft()));
        return a;
      },
      getPageY: function (b) {
        var a = b.pageY;
        a ||
          0 === a ||
          ((a = b.clientY || 0), this.isIE && (a += this._getScrollTop()));
        return a;
      },
      getXY: function (b) {
        return [this.getPageX(b), this.getPageY(b)];
      },
      getRelatedTarget: function (b) {
        var a = b.relatedTarget;
        a ||
          ("mouseout" == b.type
            ? (a = b.toElement)
            : "mouseover" == b.type && (a = b.fromElement));
        return this.resolveTextNode(a);
      },
      getTime: function (b) {
        if (!b.time) {
          var a = new Date().getTime();
          try {
            b.time = a;
          } catch (d) {
            return (this.lastError = d), a;
          }
        }
        return b.time;
      },
      stopEvent: function (b) {
        this.stopPropagation(b);
        this.preventDefault(b);
      },
      stopPropagation: function (b) {
        b.stopPropagation ? b.stopPropagation() : (b.cancelBubble = !0);
      },
      preventDefault: function (b) {
        b.preventDefault ? b.preventDefault() : (b.returnValue = !1);
      },
      getEvent: function (b, a) {
        var d = b || window.event;
        if (!d)
          for (
            var c = this.getEvent.caller;
            c && (!(d = c.arguments[0]) || Event != d.constructor);

          )
            c = c.caller;
        return d;
      },
      getCharCode: function (b) {
        b = b.keyCode || b.charCode || 0;
        YAHOO.env.ua.webkit && b in l && (b = l[b]);
        return b;
      },
      _getCacheIndex: function (b, a, d) {
        for (var c = 0, f = e.length; c < f; c += 1) {
          var g = e[c];
          if (g && g[this.FN] == d && g[this.EL] == b && g[this.TYPE] == a)
            return c;
        }
        return -1;
      },
      generateId: function (b) {
        var a = b.id;
        a || ((a = "yuievtautoid-" + k), ++k, (b.id = a));
        return a;
      },
      _isValidCollection: function (b) {
        try {
          return (
            b &&
            "string" !== typeof b &&
            b.length &&
            !b.tagName &&
            !b.alert &&
            "undefined" !== typeof b[0]
          );
        } catch (a) {
          return !1;
        }
      },
      elCache: {},
      getEl: function (b) {
        return "string" === typeof b ? document.getElementById(b) : b;
      },
      clearCache: function () {},
      DOMReadyEvent: new YAHOO.util.CustomEvent("DOMReady", this),
      _load: function (b) {
        c ||
          ((c = !0), (b = YAHOO.util.Event), b._ready(), b._tryPreloadAttach());
      },
      _ready: function (b) {
        b = YAHOO.util.Event;
        b.DOMReady ||
          ((b.DOMReady = !0),
          b.DOMReadyEvent.fire(),
          b._simpleRemove(document, "DOMContentLoaded", b._ready));
      },
      _tryPreloadAttach: function () {
        if (0 === g.length)
          (f = 0),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null));
        else if (!this.locked)
          if (this.isIE && !this.DOMReady) this.startInterval();
          else {
            this.locked = !0;
            var b = !c;
            b || (b = 0 < f && 0 < g.length);
            var a = [],
              d = function (b, a) {
                var d = b;
                a.overrideContext &&
                  (d = !0 === a.overrideContext ? a.obj : a.overrideContext);
                a.fn.call(d, a.obj);
              },
              e,
              l,
              h,
              m,
              k = [];
            e = 0;
            for (l = g.length; e < l; e += 1)
              if ((h = g[e]))
                if ((m = this.getEl(h.id)))
                  if (h.checkReady) {
                    if (c || m.nextSibling || !b) k.push(h), (g[e] = null);
                  } else d(m, h), (g[e] = null);
                else a.push(h);
            e = 0;
            for (l = k.length; e < l; e += 1)
              (h = k[e]), d(this.getEl(h.id), h);
            f--;
            if (b) {
              for (e = g.length - 1; -1 < e; e--)
                ((h = g[e]) && h.id) || g.splice(e, 1);
              this.startInterval();
            } else
              this._interval &&
                (clearInterval(this._interval), (this._interval = null));
            this.locked = !1;
          }
      },
      purgeElement: function (b, a, d) {
        b = YAHOO.lang.isString(b) ? this.getEl(b) : b;
        var c = this.getListeners(b, d),
          f;
        if (c)
          for (f = c.length - 1; -1 < f; f--) {
            var e = c[f];
            this.removeListener(b, e.type, e.fn);
          }
        if (a && b && b.childNodes)
          for (f = 0, c = b.childNodes.length; f < c; ++f)
            this.purgeElement(b.childNodes[f], a, d);
      },
      getListeners: function (b, d) {
        var c = [],
          f;
        f = d ? ("unload" === d ? [a] : [e]) : [e, a];
        for (
          var g = YAHOO.lang.isString(b) ? this.getEl(b) : b, l = 0;
          l < f.length;
          l += 1
        ) {
          var h = f[l];
          if (h)
            for (var m = 0, k = h.length; m < k; ++m) {
              var n = h[m];
              !n ||
                n[this.EL] !== g ||
                (d && d !== n[this.TYPE]) ||
                c.push({
                  type: n[this.TYPE],
                  fn: n[this.FN],
                  obj: n[this.OBJ],
                  adjust: n[this.OVERRIDE],
                  scope: n[this.ADJ_SCOPE],
                  index: m,
                });
            }
        }
        return c.length ? c : null;
      },
      _unload: function (b) {
        var c = YAHOO.util.Event,
          f,
          l,
          g,
          h = a.slice(),
          m;
        f = 0;
        for (g = a.length; f < g; ++f)
          if ((l = h[f]))
            (m = window),
              l[c.ADJ_SCOPE] &&
                (m = !0 === l[c.ADJ_SCOPE] ? l[c.UNLOAD_OBJ] : l[c.ADJ_SCOPE]),
              l[c.FN].call(m, c.getEvent(b, l[c.EL]), l[c.UNLOAD_OBJ]),
              (h[f] = null);
        a = null;
        if (e)
          for (b = e.length - 1; -1 < b; b--)
            (l = e[b]) && c.removeListener(l[c.EL], l[c.TYPE], l[c.FN], b);
        d = null;
        c._simpleRemove(window, "unload", c._unload);
      },
      _getScrollLeft: function () {
        return this._getScroll()[1];
      },
      _getScrollTop: function () {
        return this._getScroll()[0];
      },
      _getScroll: function () {
        var b = document.documentElement,
          a = document.body;
        return b && (b.scrollTop || b.scrollLeft)
          ? [b.scrollTop, b.scrollLeft]
          : a
          ? [a.scrollTop, a.scrollLeft]
          : [0, 0];
      },
      regCE: function () {},
      _simpleAdd: (function () {
        return window.addEventListener
          ? function (b, a, d, c) {
              b.addEventListener(a, d, c);
            }
          : window.attachEvent
          ? function (b, a, d, c) {
              b.attachEvent("on" + a, d);
            }
          : function () {};
      })(),
      _simpleRemove: (function () {
        return window.removeEventListener
          ? function (b, a, d, c) {
              b.removeEventListener(a, d, c);
            }
          : window.detachEvent
          ? function (b, a, d) {
              b.detachEvent("on" + a, d);
            }
          : function () {};
      })(),
    };
  })()),
  (function () {
    var c = YAHOO.util.Event;
    c.on = c.addListener;
    c.onFocus = c.addFocusListener;
    c.onBlur = c.addBlurListener;
    if (c.isIE) {
      YAHOO.util.Event.onDOMReady(
        YAHOO.util.Event._tryPreloadAttach,
        YAHOO.util.Event,
        !0
      );
      var e = document.createElement("p");
      c._dri = setInterval(function () {
        try {
          e.doScroll("left"),
            clearInterval(c._dri),
            (c._dri = null),
            c._ready(),
            (e = null);
        } catch (a) {}
      }, c.POLL_INTERVAL);
    } else
      c.webkit && 525 > c.webkit
        ? (c._dri = setInterval(function () {
            var a = document.readyState;
            if ("loaded" == a || "complete" == a)
              clearInterval(c._dri), (c._dri = null), c._ready();
          }, c.POLL_INTERVAL))
        : c._simpleAdd(document, "DOMContentLoaded", c._ready);
    c._simpleAdd(window, "load", c._load);
    c._simpleAdd(window, "unload", c._unload);
    c._tryPreloadAttach();
  })());
YAHOO.util.EventProvider = function () {};
YAHOO.util.EventProvider.prototype = {
  __yui_events: null,
  __yui_subscribers: null,
  subscribe: function (c, e, a, d) {
    this.__yui_events = this.__yui_events || {};
    var b = this.__yui_events[c];
    b
      ? b.subscribe(e, a, d)
      : ((b = this.__yui_subscribers = this.__yui_subscribers || {}),
        b[c] || (b[c] = []),
        b[c].push({ fn: e, obj: a, overrideContext: d }));
  },
  unsubscribe: function (c, e, a) {
    var d = (this.__yui_events = this.__yui_events || {});
    if (c) {
      if ((d = d[c])) return d.unsubscribe(e, a);
    } else {
      c = !0;
      for (var b in d)
        YAHOO.lang.hasOwnProperty(d, b) && (c = c && d[b].unsubscribe(e, a));
      return c;
    }
    return !1;
  },
  unsubscribeAll: function (c) {
    return this.unsubscribe(c);
  },
  createEvent: function (c, e) {
    this.__yui_events = this.__yui_events || {};
    var a = e || {},
      d = this.__yui_events;
    if (!d[c]) {
      var b = new YAHOO.util.CustomEvent(
        c,
        a.scope || this,
        a.silent,
        YAHOO.util.CustomEvent.FLAT
      );
      d[c] = b;
      a.onSubscribeCallback &&
        b.subscribeEvent.subscribe(a.onSubscribeCallback);
      this.__yui_subscribers = this.__yui_subscribers || {};
      if ((a = this.__yui_subscribers[c]))
        for (var f = 0; f < a.length; ++f)
          b.subscribe(a[f].fn, a[f].obj, a[f].overrideContext);
    }
    return d[c];
  },
  fireEvent: function (c, e, a, d) {
    this.__yui_events = this.__yui_events || {};
    var b = this.__yui_events[c];
    if (!b) return null;
    for (var f = [], g = 1; g < arguments.length; ++g) f.push(arguments[g]);
    return b.fire.apply(b, f);
  },
  hasEvent: function (c) {
    return this.__yui_events && this.__yui_events[c] ? !0 : !1;
  },
};
(function () {
  var c = YAHOO.util.Event,
    e = YAHOO.lang;
  YAHOO.util.KeyListener = function (a, b, f, g) {
    function h(a, d) {
      b.shift || (b.shift = !1);
      b.alt || (b.alt = !1);
      b.ctrl || (b.ctrl = !1);
      if (a.shiftKey == b.shift && a.altKey == b.alt && a.ctrlKey == b.ctrl) {
        var f,
          e = b.keys,
          g;
        if (YAHOO.lang.isArray(e))
          for (var h = 0; h < e.length; h++) {
            if (((f = e[h]), (g = c.getCharCode(a)), f == g)) {
              k.fire(g, a);
              break;
            }
          }
        else (g = c.getCharCode(a)), e == g && k.fire(g, a);
      }
    }
    g || (g = YAHOO.util.KeyListener.KEYDOWN);
    var k = new YAHOO.util.CustomEvent("keyPressed");
    this.enabledEvent = new YAHOO.util.CustomEvent("enabled");
    this.disabledEvent = new YAHOO.util.CustomEvent("disabled");
    e.isString(a) && (a = document.getElementById(a));
    e.isFunction(f)
      ? k.subscribe(f)
      : k.subscribe(f.fn, f.scope, f.correctScope);
    this.enable = function () {
      this.enabled || (c.on(a, g, h), this.enabledEvent.fire(b));
      this.enabled = !0;
    };
    this.disable = function () {
      this.enabled && (c.removeListener(a, g, h), this.disabledEvent.fire(b));
      this.enabled = !1;
    };
    this.toString = function () {
      return (
        "KeyListener [" +
        b.keys +
        "] " +
        a.tagName +
        (a.id ? "[" + a.id + "]" : "")
      );
    };
  };
  var a = YAHOO.util.KeyListener;
  a.KEYDOWN = "keydown";
  a.KEYUP = "keyup";
  a.KEY = {
    ALT: 18,
    BACK_SPACE: 8,
    CAPS_LOCK: 20,
    CONTROL: 17,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    META: 224,
    NUM_LOCK: 144,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PAUSE: 19,
    PRINTSCREEN: 44,
    RIGHT: 39,
    SCROLL_LOCK: 145,
    SHIFT: 16,
    SPACE: 32,
    TAB: 9,
    UP: 38,
  };
})();
YAHOO.register("event", YAHOO.util.Event, { version: "2.7.0", build: "1796" });
YAHOO.register("yahoo-dom-event", YAHOO, { version: "2.7.0", build: "1796" });
YAHOO.util.DragDropMgr ||
  ((YAHOO.util.DragDropMgr = (function () {
    var c = YAHOO.util.Event,
      e = YAHOO.util.Dom;
    return {
      useShim: !1,
      _shimActive: !1,
      _shimState: !1,
      _debugShim: !1,
      _createShim: function () {
        var a = document.createElement("div");
        a.id = "yui-ddm-shim";
        document.body.firstChild
          ? document.body.insertBefore(a, document.body.firstChild)
          : document.body.appendChild(a);
        a.style.display = "none";
        a.style.backgroundColor = "red";
        a.style.position = "absolute";
        a.style.zIndex = "99999";
        e.setStyle(a, "opacity", "0");
        this._shim = a;
        c.on(a, "mouseup", this.handleMouseUp, this, !0);
        c.on(a, "mousemove", this.handleMouseMove, this, !0);
        c.on(window, "scroll", this._sizeShim, this, !0);
      },
      _sizeShim: function () {
        if (this._shimActive) {
          var a = this._shim;
          a.style.height = e.getDocumentHeight() + "px";
          a.style.width = e.getDocumentWidth() + "px";
          a.style.top = "0";
          a.style.left = "0";
        }
      },
      _activateShim: function () {
        if (this.useShim) {
          this._shim || this._createShim();
          this._shimActive = !0;
          var a = this._shim,
            d = "0";
          this._debugShim && (d = ".5");
          e.setStyle(a, "opacity", d);
          this._sizeShim();
          a.style.display = "block";
        }
      },
      _deactivateShim: function () {
        this._shim.style.display = "none";
        this._shimActive = !1;
      },
      _shim: null,
      ids: {},
      handleIds: {},
      dragCurrent: null,
      dragOvers: {},
      deltaX: 0,
      deltaY: 0,
      preventDefault: !0,
      stopPropagation: !0,
      initialized: !1,
      locked: !1,
      interactionInfo: null,
      init: function () {
        this.initialized = !0;
      },
      POINT: 0,
      INTERSECT: 1,
      STRICT_INTERSECT: 2,
      mode: 0,
      _execOnAll: function (a, d) {
        for (var b in this.ids)
          for (var c in this.ids[b]) {
            var e = this.ids[b][c];
            this.isTypeOfDD(e) && e[a].apply(e, d);
          }
      },
      _onLoad: function () {
        this.init();
        c.on(document, "mouseup", this.handleMouseUp, this, !0);
        c.on(document, "mousemove", this.handleMouseMove, this, !0);
        c.on(window, "unload", this._onUnload, this, !0);
        c.on(window, "resize", this._onResize, this, !0);
      },
      _onResize: function (a) {
        this._execOnAll("resetConstraints", []);
      },
      lock: function () {
        this.locked = !0;
      },
      unlock: function () {
        this.locked = !1;
      },
      isLocked: function () {
        return this.locked;
      },
      locationCache: {},
      useCache: !0,
      clickPixelThresh: 3,
      clickTimeThresh: 1e3,
      dragThreshMet: !1,
      clickTimeout: null,
      startX: 0,
      startY: 0,
      fromTimeout: !1,
      regDragDrop: function (a, d) {
        this.initialized || this.init();
        this.ids[d] || (this.ids[d] = {});
        this.ids[d][a.id] = a;
      },
      removeDDFromGroup: function (a, d) {
        this.ids[d] || (this.ids[d] = {});
        var b = this.ids[d];
        b && b[a.id] && delete b[a.id];
      },
      _remove: function (a) {
        for (var d in a.groups)
          if (d) {
            var b = this.ids[d];
            b && b[a.id] && delete b[a.id];
          }
        delete this.handleIds[a.id];
      },
      regHandle: function (a, d) {
        this.handleIds[a] || (this.handleIds[a] = {});
        this.handleIds[a][d] = d;
      },
      isDragDrop: function (a) {
        return this.getDDById(a) ? !0 : !1;
      },
      getRelated: function (a, d) {
        var b = [],
          c;
        for (c in a.groups)
          for (var e in this.ids[c]) {
            var h = this.ids[c][e];
            !this.isTypeOfDD(h) || (d && !h.isTarget) || (b[b.length] = h);
          }
        return b;
      },
      isLegalTarget: function (a, d) {
        for (var b = this.getRelated(a, !0), c = 0, e = b.length; c < e; ++c)
          if (b[c].id == d.id) return !0;
        return !1;
      },
      isTypeOfDD: function (a) {
        return a && a.__ygDragDrop;
      },
      isHandle: function (a, d) {
        return this.handleIds[a] && this.handleIds[a][d];
      },
      getDDById: function (a) {
        for (var d in this.ids) if (this.ids[d][a]) return this.ids[d][a];
        return null;
      },
      handleMouseDown: function (a, d) {
        this.currentTarget = YAHOO.util.Event.getTarget(a);
        this.dragCurrent = d;
        var b = d.getEl();
        this.startX = YAHOO.util.Event.getPageX(a);
        this.startY = YAHOO.util.Event.getPageY(a);
        this.deltaX = this.startX - b.offsetLeft;
        this.deltaY = this.startY - b.offsetTop;
        this.dragThreshMet = !1;
        this.clickTimeout = setTimeout(function () {
          var b = YAHOO.util.DDM;
          b.startDrag(b.startX, b.startY);
          b.fromTimeout = !0;
        }, this.clickTimeThresh);
      },
      startDrag: function (a, d) {
        this.dragCurrent &&
          this.dragCurrent.useShim &&
          ((this._shimState = this.useShim), (this.useShim = !0));
        this._activateShim();
        clearTimeout(this.clickTimeout);
        var b = this.dragCurrent;
        b &&
          b.events.b4StartDrag &&
          (b.b4StartDrag(a, d),
          b.fireEvent("b4StartDragEvent", { x: a, y: d }));
        b &&
          b.events.startDrag &&
          (b.startDrag(a, d), b.fireEvent("startDragEvent", { x: a, y: d }));
        this.dragThreshMet = !0;
      },
      handleMouseUp: function (a) {
        this.dragCurrent &&
          (clearTimeout(this.clickTimeout),
          this.dragThreshMet &&
            (this.fromTimeout &&
              ((this.fromTimeout = !1), this.handleMouseMove(a)),
            (this.fromTimeout = !1),
            this.fireEvents(a, !0)),
          this.stopDrag(a),
          this.stopEvent(a));
      },
      stopEvent: function (a) {
        this.stopPropagation && YAHOO.util.Event.stopPropagation(a);
        this.preventDefault && YAHOO.util.Event.preventDefault(a);
      },
      stopDrag: function (a, d) {
        var b = this.dragCurrent;
        b &&
          !d &&
          (this.dragThreshMet &&
            (b.events.b4EndDrag &&
              (b.b4EndDrag(a), b.fireEvent("b4EndDragEvent", { e: a })),
            b.events.endDrag &&
              (b.endDrag(a), b.fireEvent("endDragEvent", { e: a }))),
          b.events.mouseUp &&
            (b.onMouseUp(a), b.fireEvent("mouseUpEvent", { e: a })));
        this._shimActive &&
          (this._deactivateShim(),
          this.dragCurrent &&
            this.dragCurrent.useShim &&
            ((this.useShim = this._shimState), (this._shimState = !1)));
        this.dragCurrent = null;
        this.dragOvers = {};
      },
      handleMouseMove: function (a) {
        var d = this.dragCurrent;
        if (d) {
          if (YAHOO.util.Event.isIE && !a.button)
            return this.stopEvent(a), this.handleMouseUp(a);
          if (!this.dragThreshMet) {
            var b = Math.abs(this.startX - YAHOO.util.Event.getPageX(a)),
              c = Math.abs(this.startY - YAHOO.util.Event.getPageY(a));
            (b > this.clickPixelThresh || c > this.clickPixelThresh) &&
              this.startDrag(this.startX, this.startY);
          }
          this.dragThreshMet &&
            (d &&
              d.events.b4Drag &&
              (d.b4Drag(a), d.fireEvent("b4DragEvent", { e: a })),
            d &&
              d.events.drag &&
              (d.onDrag(a), d.fireEvent("dragEvent", { e: a })),
            d && this.fireEvents(a, !1));
          this.stopEvent(a);
        }
      },
      fireEvents: function (a, d) {
        var b = this.dragCurrent;
        if (b && !b.isLocked() && !b.dragOnly) {
          var c = YAHOO.util.Event.getPageX(a),
            e = YAHOO.util.Event.getPageY(a),
            h = new YAHOO.util.Point(c, e),
            e = b.getTargetCoord(h.x, h.y),
            k = b.getDragEl(),
            c = ["out", "over", "drop", "enter"],
            l = new YAHOO.util.Region(
              e.y,
              e.x + k.offsetWidth,
              e.y + k.offsetHeight,
              e.x
            ),
            m = [],
            n = {},
            e = [],
            k = { outEvts: [], overEvts: [], dropEvts: [], enterEvts: [] },
            p;
          for (p in this.dragOvers) {
            var q = this.dragOvers[p];
            this.isTypeOfDD(q) &&
              (this.isOverTarget(h, q, this.mode, l) || k.outEvts.push(q),
              (m[p] = !0),
              delete this.dragOvers[p]);
          }
          for (var r in b.groups)
            if ("string" == typeof r)
              for (p in this.ids[r])
                (q = this.ids[r][p]),
                  this.isTypeOfDD(q) &&
                    q.isTarget &&
                    !q.isLocked() &&
                    q != b &&
                    this.isOverTarget(h, q, this.mode, l) &&
                    ((n[r] = !0),
                    d
                      ? k.dropEvts.push(q)
                      : (m[q.id] ? k.overEvts.push(q) : k.enterEvts.push(q),
                        (this.dragOvers[q.id] = q)));
          this.interactionInfo = {
            out: k.outEvts,
            enter: k.enterEvts,
            over: k.overEvts,
            drop: k.dropEvts,
            point: h,
            draggedRegion: l,
            sourceRegion: this.locationCache[b.id],
            validDrop: d,
          };
          for (var v in n) e.push(v);
          d &&
            !k.dropEvts.length &&
            ((this.interactionInfo.validDrop = !1),
            b.events.invalidDrop &&
              (b.onInvalidDrop(a), b.fireEvent("invalidDropEvent", { e: a })));
          for (p = 0; p < c.length; p++)
            if (
              ((r = null),
              k[c[p] + "Evts"] && (r = k[c[p] + "Evts"]),
              r && r.length)
            )
              if (
                ((m = c[p].charAt(0).toUpperCase() + c[p].substr(1)),
                (v = "onDrag" + m),
                (h = "b4Drag" + m),
                (l = "drag" + m + "Event"),
                (m = "drag" + m),
                this.mode)
              )
                b.events[h] &&
                  (b[h](a, r, e),
                  b.fireEvent(h + "Event", { event: a, info: r, group: e })),
                  b.events[m] &&
                    (b[v](a, r, e),
                    b.fireEvent(l, { event: a, info: r, group: e }));
              else
                for (n = 0, q = r.length; n < q; ++n)
                  b.events[h] &&
                    (b[h](a, r[n].id, e[0]),
                    b.fireEvent(h + "Event", {
                      event: a,
                      info: r[n].id,
                      group: e[0],
                    })),
                    b.events[m] &&
                      (b[v](a, r[n].id, e[0]),
                      b.fireEvent(l, { event: a, info: r[n].id, group: e[0] }));
        }
      },
      getBestMatch: function (a) {
        var d = null,
          b = a.length;
        if (1 == b) d = a[0];
        else
          for (var c = 0; c < b; ++c) {
            var e = a[c];
            if (this.mode == this.INTERSECT && e.cursorIsOver) {
              d = e;
              break;
            } else if (
              !d ||
              !d.overlap ||
              (e.overlap && d.overlap.getArea() < e.overlap.getArea())
            )
              d = e;
          }
        return d;
      },
      refreshCache: function (a) {
        a = a || this.ids;
        for (var d in a)
          if ("string" == typeof d)
            for (var b in this.ids[d])
              if (((a = this.ids[d][b]), this.isTypeOfDD(a))) {
                var c = this.getLocation(a);
                c
                  ? (this.locationCache[a.id] = c)
                  : delete this.locationCache[a.id];
              }
      },
      verifyEl: function (a) {
        try {
          if (a && a.offsetParent) return !0;
        } catch (d) {}
        return !1;
      },
      getLocation: function (a) {
        if (!this.isTypeOfDD(a)) return null;
        var d = a.getEl(),
          b,
          c,
          e;
        try {
          b = YAHOO.util.Dom.getXY(d);
        } catch (h) {}
        if (!b) return null;
        c = b[0];
        e = c + d.offsetWidth;
        b = b[1];
        return new YAHOO.util.Region(
          b - a.padding[0],
          e + a.padding[1],
          b + d.offsetHeight + a.padding[2],
          c - a.padding[3]
        );
      },
      isOverTarget: function (a, d, b, c) {
        var e = this.locationCache[d.id];
        (e && this.useCache) ||
          ((e = this.getLocation(d)), (this.locationCache[d.id] = e));
        if (!e) return !1;
        d.cursorIsOver = e.contains(a);
        var h = this.dragCurrent;
        if (!h || (!b && !h.constrainX && !h.constrainY)) return d.cursorIsOver;
        d.overlap = null;
        c ||
          ((a = h.getTargetCoord(a.x, a.y)),
          (h = h.getDragEl()),
          (c = new YAHOO.util.Region(
            a.y,
            a.x + h.offsetWidth,
            a.y + h.offsetHeight,
            a.x
          )));
        return (e = c.intersect(e))
          ? ((d.overlap = e), b ? !0 : d.cursorIsOver)
          : !1;
      },
      _onUnload: function (a, d) {
        this.unregAll();
      },
      unregAll: function () {
        this.dragCurrent && (this.stopDrag(), (this.dragCurrent = null));
        this._execOnAll("unreg", []);
        this.ids = {};
      },
      elementCache: {},
      getElWrapper: function (a) {
        var d = this.elementCache[a];
        (d && d.el) ||
          (d = this.elementCache[a] =
            new this.ElementWrapper(YAHOO.util.Dom.get(a)));
        return d;
      },
      getElement: function (a) {
        return YAHOO.util.Dom.get(a);
      },
      getCss: function (a) {
        return (a = YAHOO.util.Dom.get(a)) ? a.style : null;
      },
      ElementWrapper: function (a) {
        this.id = (this.el = a || null) && a.id;
        this.css = this.el && a.style;
      },
      getPosX: function (a) {
        return YAHOO.util.Dom.getX(a);
      },
      getPosY: function (a) {
        return YAHOO.util.Dom.getY(a);
      },
      swapNode: function (a, d) {
        if (a.swapNode) a.swapNode(d);
        else {
          var b = d.parentNode,
            c = d.nextSibling;
          c == a
            ? b.insertBefore(a, d)
            : d == a.nextSibling
            ? b.insertBefore(d, a)
            : (a.parentNode.replaceChild(d, a), b.insertBefore(a, c));
        }
      },
      getScroll: function () {
        var a,
          d,
          b = document.documentElement,
          c = document.body;
        b && (b.scrollTop || b.scrollLeft)
          ? ((a = b.scrollTop), (d = b.scrollLeft))
          : c && ((a = c.scrollTop), (d = c.scrollLeft));
        return { top: a, left: d };
      },
      getStyle: function (a, d) {
        return YAHOO.util.Dom.getStyle(a, d);
      },
      getScrollTop: function () {
        return this.getScroll().top;
      },
      getScrollLeft: function () {
        return this.getScroll().left;
      },
      moveToEl: function (a, d) {
        var b = YAHOO.util.Dom.getXY(d);
        YAHOO.util.Dom.setXY(a, b);
      },
      getClientHeight: function () {
        return YAHOO.util.Dom.getViewportHeight();
      },
      getClientWidth: function () {
        return YAHOO.util.Dom.getViewportWidth();
      },
      numericSort: function (a, d) {
        return a - d;
      },
      _timeoutCount: 0,
      _addListeners: function () {
        var a = YAHOO.util.DDM;
        YAHOO.util.Event && document
          ? a._onLoad()
          : 2e3 < a._timeoutCount ||
            (setTimeout(a._addListeners, 10),
            document && document.body && (a._timeoutCount += 1));
      },
      handleWasClicked: function (a, d) {
        if (this.isHandle(d, a.id)) return !0;
        for (var b = a.parentNode; b; ) {
          if (this.isHandle(d, b.id)) return !0;
          b = b.parentNode;
        }
        return !1;
      },
    };
  })()),
  (YAHOO.util.DDM = YAHOO.util.DragDropMgr),
  YAHOO.util.DDM._addListeners());
(function () {
  var c = YAHOO.util.Event,
    e = YAHOO.util.Dom;
  YAHOO.util.DragDrop = function (a, d, b) {
    a && this.init(a, d, b);
  };
  YAHOO.util.DragDrop.prototype = {
    events: null,
    on: function () {
      this.subscribe.apply(this, arguments);
    },
    id: null,
    config: null,
    dragElId: null,
    handleElId: null,
    invalidHandleTypes: null,
    invalidHandleIds: null,
    invalidHandleClasses: null,
    startPageX: 0,
    startPageY: 0,
    groups: null,
    locked: !1,
    lock: function () {
      this.locked = !0;
    },
    unlock: function () {
      this.locked = !1;
    },
    isTarget: !0,
    padding: null,
    dragOnly: !1,
    useShim: !1,
    _domRef: null,
    __ygDragDrop: !0,
    constrainX: !1,
    constrainY: !1,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
    deltaX: 0,
    deltaY: 0,
    maintainOffset: !1,
    xTicks: null,
    yTicks: null,
    primaryButtonOnly: !0,
    available: !1,
    hasOuterHandles: !1,
    cursorIsOver: !1,
    overlap: null,
    b4StartDrag: function (a, d) {},
    startDrag: function (a, d) {},
    b4Drag: function (a) {},
    onDrag: function (a) {},
    onDragEnter: function (a, d) {},
    b4DragOver: function (a) {},
    onDragOver: function (a, d) {},
    b4DragOut: function (a) {},
    onDragOut: function (a, d) {},
    b4DragDrop: function (a) {},
    onDragDrop: function (a, d) {},
    onInvalidDrop: function (a) {},
    b4EndDrag: function (a) {},
    endDrag: function (a) {},
    b4MouseDown: function (a) {},
    onMouseDown: function (a) {},
    onMouseUp: function (a) {},
    onAvailable: function () {},
    getEl: function () {
      this._domRef || (this._domRef = e.get(this.id));
      return this._domRef;
    },
    getDragEl: function () {
      return e.get(this.dragElId);
    },
    init: function (a, d, b) {
      this.initTarget(a, d, b);
      c.on(
        this._domRef || this.id,
        "mousedown",
        this.handleMouseDown,
        this,
        !0
      );
      for (var e in this.events) this.createEvent(e + "Event");
    },
    initTarget: function (a, d, b) {
      this.config = b || {};
      this.events = {};
      this.DDM = YAHOO.util.DDM;
      this.groups = {};
      "string" !== typeof a && ((this._domRef = a), (a = e.generateId(a)));
      this.id = a;
      this.addToGroup(d ? d : "default");
      this.handleElId = a;
      c.onAvailable(a, this.handleOnAvailable, this, !0);
      this.setDragElId(a);
      this.invalidHandleTypes = { A: "A" };
      this.invalidHandleIds = {};
      this.invalidHandleClasses = [];
      this.applyConfig();
    },
    applyConfig: function () {
      this.events = {
        mouseDown: !0,
        b4MouseDown: !0,
        mouseUp: !0,
        b4StartDrag: !0,
        startDrag: !0,
        b4EndDrag: !0,
        endDrag: !0,
        drag: !0,
        b4Drag: !0,
        invalidDrop: !0,
        b4DragOut: !0,
        dragOut: !0,
        dragEnter: !0,
        b4DragOver: !0,
        dragOver: !0,
        b4DragDrop: !0,
        dragDrop: !0,
      };
      if (this.config.events)
        for (var a in this.config.events)
          !1 === this.config.events[a] && (this.events[a] = !1);
      this.padding = this.config.padding || [0, 0, 0, 0];
      this.isTarget = !1 !== this.config.isTarget;
      this.maintainOffset = this.config.maintainOffset;
      this.primaryButtonOnly = !1 !== this.config.primaryButtonOnly;
      this.dragOnly = !0 === this.config.dragOnly ? !0 : !1;
      this.useShim = !0 === this.config.useShim ? !0 : !1;
    },
    handleOnAvailable: function () {
      this.available = !0;
      this.resetConstraints();
      this.onAvailable();
    },
    setPadding: function (a, d, b, c) {
      this.padding =
        d || 0 === d
          ? b || 0 === b
            ? [a, d, b, c]
            : [a, d, a, d]
          : [a, a, a, a];
    },
    setInitPosition: function (a, d) {
      var b = this.getEl();
      if (this.DDM.verifyEl(b)) {
        var c = a || 0,
          g = d || 0,
          b = e.getXY(b);
        this.initPageX = b[0] - c;
        this.initPageY = b[1] - g;
        this.lastPageX = b[0];
        this.lastPageY = b[1];
        this.setStartPosition(b);
      }
    },
    setStartPosition: function (a) {
      a = a || e.getXY(this.getEl());
      this.deltaSetXY = null;
      this.startPageX = a[0];
      this.startPageY = a[1];
    },
    addToGroup: function (a) {
      this.groups[a] = !0;
      this.DDM.regDragDrop(this, a);
    },
    removeFromGroup: function (a) {
      this.groups[a] && delete this.groups[a];
      this.DDM.removeDDFromGroup(this, a);
    },
    setDragElId: function (a) {
      this.dragElId = a;
    },
    setHandleElId: function (a) {
      "string" !== typeof a && (a = e.generateId(a));
      this.handleElId = a;
      this.DDM.regHandle(this.id, a);
    },
    setOuterHandleElId: function (a) {
      "string" !== typeof a && (a = e.generateId(a));
      c.on(a, "mousedown", this.handleMouseDown, this, !0);
      this.setHandleElId(a);
      this.hasOuterHandles = !0;
    },
    unreg: function () {
      c.removeListener(this.id, "mousedown", this.handleMouseDown);
      this._domRef = null;
      this.DDM._remove(this);
    },
    isLocked: function () {
      return this.DDM.isLocked() || this.locked;
    },
    handleMouseDown: function (a, d) {
      var b = a.which || a.button;
      if (!((this.primaryButtonOnly && 1 < b) || this.isLocked())) {
        var b = this.b4MouseDown(a),
          e = !0;
        this.events.b4MouseDown && (e = this.fireEvent("b4MouseDownEvent", a));
        var g = this.onMouseDown(a),
          h = !0;
        this.events.mouseDown && (h = this.fireEvent("mouseDownEvent", a));
        !1 !== b &&
          !1 !== g &&
          !1 !== e &&
          !1 !== h &&
          (this.DDM.refreshCache(this.groups),
          (b = new YAHOO.util.Point(c.getPageX(a), c.getPageY(a))),
          (this.hasOuterHandles || this.DDM.isOverTarget(b, this)) &&
            this.clickValidator(a) &&
            (this.setStartPosition(),
            this.DDM.handleMouseDown(a, this),
            this.DDM.stopEvent(a)));
      }
    },
    clickValidator: function (a) {
      a = YAHOO.util.Event.getTarget(a);
      return (
        this.isValidHandleChild(a) &&
        (this.id == this.handleElId || this.DDM.handleWasClicked(a, this.id))
      );
    },
    getTargetCoord: function (a, d) {
      var b = a - this.deltaX,
        c = d - this.deltaY;
      this.constrainX &&
        (b < this.minX && (b = this.minX), b > this.maxX && (b = this.maxX));
      this.constrainY &&
        (c < this.minY && (c = this.minY), c > this.maxY && (c = this.maxY));
      b = this.getTick(b, this.xTicks);
      c = this.getTick(c, this.yTicks);
      return { x: b, y: c };
    },
    addInvalidHandleType: function (a) {
      a = a.toUpperCase();
      this.invalidHandleTypes[a] = a;
    },
    addInvalidHandleId: function (a) {
      "string" !== typeof a && (a = e.generateId(a));
      this.invalidHandleIds[a] = a;
    },
    addInvalidHandleClass: function (a) {
      this.invalidHandleClasses.push(a);
    },
    removeInvalidHandleType: function (a) {
      a = a.toUpperCase();
      delete this.invalidHandleTypes[a];
    },
    removeInvalidHandleId: function (a) {
      "string" !== typeof a && (a = e.generateId(a));
      delete this.invalidHandleIds[a];
    },
    removeInvalidHandleClass: function (a) {
      for (var d = 0, b = this.invalidHandleClasses.length; d < b; ++d)
        this.invalidHandleClasses[d] == a &&
          delete this.invalidHandleClasses[d];
    },
    isValidHandleChild: function (a) {
      var d = !0,
        b;
      try {
        b = a.nodeName.toUpperCase();
      } catch (c) {
        b = a.nodeName;
      }
      d =
        (d = d && !this.invalidHandleTypes[b]) && !this.invalidHandleIds[a.id];
      b = 0;
      for (var g = this.invalidHandleClasses.length; d && b < g; ++b)
        d = !e.hasClass(a, this.invalidHandleClasses[b]);
      return d;
    },
    setXTicks: function (a, d) {
      this.xTicks = [];
      this.xTickSize = d;
      for (var b = {}, c = this.initPageX; c >= this.minX; c -= d)
        b[c] || ((this.xTicks[this.xTicks.length] = c), (b[c] = !0));
      for (c = this.initPageX; c <= this.maxX; c += d)
        b[c] || ((this.xTicks[this.xTicks.length] = c), (b[c] = !0));
      this.xTicks.sort(this.DDM.numericSort);
    },
    setYTicks: function (a, d) {
      this.yTicks = [];
      this.yTickSize = d;
      for (var b = {}, c = this.initPageY; c >= this.minY; c -= d)
        b[c] || ((this.yTicks[this.yTicks.length] = c), (b[c] = !0));
      for (c = this.initPageY; c <= this.maxY; c += d)
        b[c] || ((this.yTicks[this.yTicks.length] = c), (b[c] = !0));
      this.yTicks.sort(this.DDM.numericSort);
    },
    setXConstraint: function (a, d, b) {
      this.leftConstraint = parseInt(a, 10);
      this.rightConstraint = parseInt(d, 10);
      this.minX = this.initPageX - this.leftConstraint;
      this.maxX = this.initPageX + this.rightConstraint;
      b && this.setXTicks(this.initPageX, b);
      this.constrainX = !0;
    },
    clearConstraints: function () {
      this.constrainY = this.constrainX = !1;
      this.clearTicks();
    },
    clearTicks: function () {
      this.yTicks = this.xTicks = null;
      this.yTickSize = this.xTickSize = 0;
    },
    setYConstraint: function (a, d, b) {
      this.topConstraint = parseInt(a, 10);
      this.bottomConstraint = parseInt(d, 10);
      this.minY = this.initPageY - this.topConstraint;
      this.maxY = this.initPageY + this.bottomConstraint;
      b && this.setYTicks(this.initPageY, b);
      this.constrainY = !0;
    },
    resetConstraints: function () {
      this.initPageX || 0 === this.initPageX
        ? this.setInitPosition(
            this.maintainOffset ? this.lastPageX - this.initPageX : 0,
            this.maintainOffset ? this.lastPageY - this.initPageY : 0
          )
        : this.setInitPosition();
      this.constrainX &&
        this.setXConstraint(
          this.leftConstraint,
          this.rightConstraint,
          this.xTickSize
        );
      this.constrainY &&
        this.setYConstraint(
          this.topConstraint,
          this.bottomConstraint,
          this.yTickSize
        );
    },
    getTick: function (a, d) {
      if (d) {
        if (d[0] >= a) return d[0];
        for (var b = 0, c = d.length; b < c; ++b) {
          var e = b + 1;
          if (d[e] && d[e] >= a) return d[e] - a > a - d[b] ? d[b] : d[e];
        }
        return d[d.length - 1];
      }
      return a;
    },
    toString: function () {
      return "DragDrop " + this.id;
    },
  };
  YAHOO.augment(YAHOO.util.DragDrop, YAHOO.util.EventProvider);
})();
YAHOO.util.DD = function (c, e, a) {
  c && this.init(c, e, a);
};
YAHOO.extend(YAHOO.util.DD, YAHOO.util.DragDrop, {
  scroll: !0,
  autoOffset: function (c, e) {
    this.setDelta(c - this.startPageX, e - this.startPageY);
  },
  setDelta: function (c, e) {
    this.deltaX = c;
    this.deltaY = e;
  },
  setDragElPos: function (c, e) {
    var a = this.getDragEl();
    this.alignElWithMouse(a, c, e);
  },
  alignElWithMouse: function (c, e, a) {
    var d = this.getTargetCoord(e, a);
    this.deltaSetXY
      ? (YAHOO.util.Dom.setStyle(c, "left", d.x + this.deltaSetXY[0] + "px"),
        YAHOO.util.Dom.setStyle(c, "top", d.y + this.deltaSetXY[1] + "px"))
      : (YAHOO.util.Dom.setXY(c, [d.x, d.y]),
        (e = parseInt(YAHOO.util.Dom.getStyle(c, "left"), 10)),
        (a = parseInt(YAHOO.util.Dom.getStyle(c, "top"), 10)),
        (this.deltaSetXY = [e - d.x, a - d.y]));
    this.cachePosition(d.x, d.y);
    var b = this;
    setTimeout(function () {
      b.autoScroll.call(b, d.x, d.y, c.offsetHeight, c.offsetWidth);
    }, 0);
  },
  cachePosition: function (c, e) {
    if (c) (this.lastPageX = c), (this.lastPageY = e);
    else {
      var a = YAHOO.util.Dom.getXY(this.getEl());
      this.lastPageX = a[0];
      this.lastPageY = a[1];
    }
  },
  autoScroll: function (c, e, a, d) {
    if (this.scroll) {
      var b = this.DDM.getClientHeight(),
        f = this.DDM.getClientWidth(),
        g = this.DDM.getScrollTop(),
        h = this.DDM.getScrollLeft();
      d += c;
      var k = b + g - e - this.deltaY,
        l = f + h - c - this.deltaX,
        m = document.all ? 80 : 30;
      a + e > b && 40 > k && window.scrollTo(h, g + m);
      e < g && 0 < g && 40 > e - g && window.scrollTo(h, g - m);
      d > f && 40 > l && window.scrollTo(h + m, g);
      c < h && 0 < h && 40 > c - h && window.scrollTo(h - m, g);
    }
  },
  applyConfig: function () {
    YAHOO.util.DD.superclass.applyConfig.call(this);
    this.scroll = !1 !== this.config.scroll;
  },
  b4MouseDown: function (c) {
    this.setStartPosition();
    this.autoOffset(YAHOO.util.Event.getPageX(c), YAHOO.util.Event.getPageY(c));
  },
  b4Drag: function (c) {
    this.setDragElPos(
      YAHOO.util.Event.getPageX(c),
      YAHOO.util.Event.getPageY(c)
    );
  },
  toString: function () {
    return "DD " + this.id;
  },
});
YAHOO.util.DDProxy = function (c, e, a) {
  c && (this.init(c, e, a), this.initFrame());
};
YAHOO.util.DDProxy.dragElId = "ygddfdiv";
YAHOO.extend(YAHOO.util.DDProxy, YAHOO.util.DD, {
  resizeFrame: !0,
  centerFrame: !1,
  createFrame: function () {
    var c = this,
      e = document.body;
    if (e && e.firstChild) {
      var a = this.getDragEl(),
        d = YAHOO.util.Dom;
      if (!a) {
        a = document.createElement("div");
        a.id = this.dragElId;
        var b = a.style;
        b.position = "absolute";
        b.visibility = "hidden";
        b.cursor = "move";
        b.border = "2px solid #aaa";
        b.zIndex = 999;
        b.height = "25px";
        b.width = "25px";
        b = document.createElement("div");
        d.setStyle(b, "height", "100%");
        d.setStyle(b, "width", "100%");
        d.setStyle(b, "background-color", "#ccc");
        d.setStyle(b, "opacity", "0");
        a.appendChild(b);
        e.insertBefore(a, e.firstChild);
      }
    } else
      setTimeout(function () {
        c.createFrame();
      }, 50);
  },
  initFrame: function () {
    this.createFrame();
  },
  applyConfig: function () {
    YAHOO.util.DDProxy.superclass.applyConfig.call(this);
    this.resizeFrame = !1 !== this.config.resizeFrame;
    this.centerFrame = this.config.centerFrame;
    this.setDragElId(this.config.dragElId || YAHOO.util.DDProxy.dragElId);
  },
  showFrame: function (c, e) {
    this.getEl();
    var a = this.getDragEl(),
      d = a.style;
    this._resizeProxy();
    this.centerFrame &&
      this.setDelta(
        Math.round(parseInt(d.width, 10) / 2),
        Math.round(parseInt(d.height, 10) / 2)
      );
    this.setDragElPos(c, e);
    YAHOO.util.Dom.setStyle(a, "visibility", "visible");
  },
  _resizeProxy: function () {
    if (this.resizeFrame) {
      var c = YAHOO.util.Dom,
        e = this.getEl(),
        a = this.getDragEl(),
        d = parseInt(c.getStyle(a, "borderTopWidth"), 10),
        b = parseInt(c.getStyle(a, "borderRightWidth"), 10),
        f = parseInt(c.getStyle(a, "borderBottomWidth"), 10),
        g = parseInt(c.getStyle(a, "borderLeftWidth"), 10);
      isNaN(d) && (d = 0);
      isNaN(b) && (b = 0);
      isNaN(f) && (f = 0);
      isNaN(g) && (g = 0);
      b = Math.max(0, e.offsetWidth - b - g);
      e = Math.max(0, e.offsetHeight - d - f);
      c.setStyle(a, "width", b + "px");
      c.setStyle(a, "height", e + "px");
    }
  },
  b4MouseDown: function (c) {
    this.setStartPosition();
    var e = YAHOO.util.Event.getPageX(c);
    c = YAHOO.util.Event.getPageY(c);
    this.autoOffset(e, c);
  },
  b4StartDrag: function (c, e) {
    this.showFrame(c, e);
  },
  b4EndDrag: function (c) {
    YAHOO.util.Dom.setStyle(this.getDragEl(), "visibility", "hidden");
  },
  endDrag: function (c) {
    c = YAHOO.util.Dom;
    var e = this.getEl(),
      a = this.getDragEl();
    c.setStyle(a, "visibility", "");
    c.setStyle(e, "visibility", "hidden");
    YAHOO.util.DDM.moveToEl(e, a);
    c.setStyle(a, "visibility", "hidden");
    c.setStyle(e, "visibility", "");
  },
  toString: function () {
    return "DDProxy " + this.id;
  },
});
YAHOO.util.DDTarget = function (c, e, a) {
  c && this.initTarget(c, e, a);
};
YAHOO.extend(YAHOO.util.DDTarget, YAHOO.util.DragDrop, {
  toString: function () {
    return "DDTarget " + this.id;
  },
});
YAHOO.register("dragdrop", YAHOO.util.DragDropMgr, {
  version: "2.7.0",
  build: "1796",
});
(function () {
  function c(b, a, d, e) {
    c.ANIM_AVAIL = !YAHOO.lang.isUndefined(YAHOO.util.Anim);
    b && (this.init(b, a, !0), this.initSlider(e), this.initThumb(d));
  }
  var e = YAHOO.util.Dom.getXY,
    a = YAHOO.util.Event,
    d = Array.prototype.slice;
  YAHOO.lang.augmentObject(
    c,
    {
      getHorizSlider: function (b, a, d, e, k) {
        return new c(
          b,
          b,
          new YAHOO.widget.SliderThumb(a, b, d, e, 0, 0, k),
          "horiz"
        );
      },
      getVertSlider: function (b, a, d, e, k) {
        return new c(
          b,
          b,
          new YAHOO.widget.SliderThumb(a, b, 0, 0, d, e, k),
          "vert"
        );
      },
      getSliderRegion: function (b, a, d, e, k, l, m) {
        return new c(
          b,
          b,
          new YAHOO.widget.SliderThumb(a, b, d, e, k, l, m),
          "region"
        );
      },
      SOURCE_UI_EVENT: 1,
      SOURCE_SET_VALUE: 2,
      SOURCE_KEY_EVENT: 3,
      ANIM_AVAIL: !1,
    },
    !0
  );
  YAHOO.extend(c, YAHOO.util.DragDrop, {
    _mouseDown: !1,
    dragOnly: !0,
    initSlider: function (b) {
      this.type = b;
      this.createEvent("change", this);
      this.createEvent("slideStart", this);
      this.createEvent("slideEnd", this);
      this.isTarget = !1;
      this.animate = c.ANIM_AVAIL;
      this.backgroundEnabled = !0;
      this.tickPause = 40;
      this.enableKeys = !0;
      this.keyIncrement = 20;
      this.moveComplete = !0;
      this.animationDuration = 0.2;
      this.SOURCE_UI_EVENT = 1;
      this.SOURCE_SET_VALUE = 2;
      this.valueChangeSource = 0;
      this._silent = !1;
      this.lastOffset = [0, 0];
    },
    initThumb: function (b) {
      var a = this;
      this.thumb = b;
      b.cacheBetweenDrags = !0;
      b._isHoriz && b.xTicks && b.xTicks.length
        ? (this.tickPause = Math.round(360 / b.xTicks.length))
        : b.yTicks &&
          b.yTicks.length &&
          (this.tickPause = Math.round(360 / b.yTicks.length));
      b.onAvailable = function () {
        return a.setStartSliderState();
      };
      b.onMouseDown = function () {
        a._mouseDown = !0;
        return a.focus();
      };
      b.startDrag = function () {
        a._slideStart();
      };
      b.onDrag = function () {
        a.fireEvents(!0);
      };
      b.onMouseUp = function () {
        a.thumbMouseUp();
      };
    },
    onAvailable: function () {
      this._bindKeyEvents();
    },
    _bindKeyEvents: function () {
      a.on(this.id, "keydown", this.handleKeyDown, this, !0);
      a.on(this.id, "keypress", this.handleKeyPress, this, !0);
    },
    handleKeyPress: function (b) {
      if (this.enableKeys)
        switch (a.getCharCode(b)) {
          case 37:
          case 38:
          case 39:
          case 40:
          case 36:
          case 35:
            a.preventDefault(b);
        }
    },
    handleKeyDown: function (b) {
      if (this.enableKeys) {
        var d = a.getCharCode(b),
          e = this.thumb,
          h = this.getXValue(),
          k = this.getYValue(),
          l = !0;
        switch (d) {
          case 37:
            h -= this.keyIncrement;
            break;
          case 38:
            k -= this.keyIncrement;
            break;
          case 39:
            h += this.keyIncrement;
            break;
          case 40:
            k += this.keyIncrement;
            break;
          case 36:
            h = e.leftConstraint;
            k = e.topConstraint;
            break;
          case 35:
            h = e.rightConstraint;
            k = e.bottomConstraint;
            break;
          default:
            l = !1;
        }
        l &&
          (e._isRegion
            ? this._setRegionValue(c.SOURCE_KEY_EVENT, h, k, !0)
            : this._setValue(c.SOURCE_KEY_EVENT, e._isHoriz ? h : k, !0),
          a.stopEvent(b));
      }
    },
    setStartSliderState: function () {
      this.setThumbCenterPoint();
      this.baselinePos = e(this.getEl());
      this.thumb.startOffset = this.thumb.getOffsetFromParent(this.baselinePos);
      this.thumb._isRegion
        ? this.deferredSetRegionValue
          ? (this._setRegionValue.apply(this, this.deferredSetRegionValue),
            (this.deferredSetRegionValue = null))
          : this.setRegionValue(0, 0, !0, !0, !0)
        : this.deferredSetValue
        ? (this._setValue.apply(this, this.deferredSetValue),
          (this.deferredSetValue = null))
        : this.setValue(0, !0, !0, !0);
    },
    setThumbCenterPoint: function () {
      var b = this.thumb.getEl();
      b &&
        (this.thumbCenterPoint = {
          x: parseInt(b.offsetWidth / 2, 10),
          y: parseInt(b.offsetHeight / 2, 10),
        });
    },
    lock: function () {
      this.thumb.lock();
      this.locked = !0;
    },
    unlock: function () {
      this.thumb.unlock();
      this.locked = !1;
    },
    thumbMouseUp: function () {
      this._mouseDown = !1;
      this.isLocked() || this.moveComplete || this.endMove();
    },
    onMouseUp: function () {
      this._mouseDown = !1;
      !this.backgroundEnabled ||
        this.isLocked() ||
        this.moveComplete ||
        this.endMove();
    },
    getThumb: function () {
      return this.thumb;
    },
    focus: function () {
      this.valueChangeSource = c.SOURCE_UI_EVENT;
      var b = this.getEl();
      if (b.focus)
        try {
          b.focus();
        } catch (a) {}
      this.verifyOffset();
      return !this.isLocked();
    },
    onChange: function (b, a) {},
    onSlideStart: function () {},
    onSlideEnd: function () {},
    getValue: function () {
      return this.thumb.getValue();
    },
    getXValue: function () {
      return this.thumb.getXValue();
    },
    getYValue: function () {
      return this.thumb.getYValue();
    },
    setValue: function () {
      var b = d.call(arguments);
      b.unshift(c.SOURCE_SET_VALUE);
      return this._setValue.apply(this, b);
    },
    _setValue: function (b, a, d, e, k) {
      var l = this.thumb,
        m;
      if (!l.available) return (this.deferredSetValue = arguments), !1;
      if ((this.isLocked() && !e) || isNaN(a) || l._isRegion) return !1;
      this._silent = k;
      this.valueChangeSource = b || c.SOURCE_SET_VALUE;
      l.lastOffset = [a, a];
      this.verifyOffset(!0);
      this._slideStart();
      l._isHoriz
        ? ((m = l.initPageX + a + this.thumbCenterPoint.x),
          this.moveThumb(m, l.initPageY, d))
        : ((m = l.initPageY + a + this.thumbCenterPoint.y),
          this.moveThumb(l.initPageX, m, d));
      return !0;
    },
    setRegionValue: function () {
      var b = d.call(arguments);
      b.unshift(c.SOURCE_SET_VALUE);
      return this._setRegionValue.apply(this, b);
    },
    _setRegionValue: function (b, a, d, e, k, l) {
      var m = this.thumb;
      if (!m.available) return (this.deferredSetRegionValue = arguments), !1;
      if ((this.isLocked() && !k) || isNaN(a) || !m._isRegion) return !1;
      this._silent = l;
      this.valueChangeSource = b || c.SOURCE_SET_VALUE;
      m.lastOffset = [a, d];
      this.verifyOffset(!0);
      this._slideStart();
      this.moveThumb(
        m.initPageX + a + this.thumbCenterPoint.x,
        m.initPageY + d + this.thumbCenterPoint.y,
        e
      );
      return !0;
    },
    verifyOffset: function (b) {
      b = e(this.getEl());
      var a = this.thumb;
      (this.thumbCenterPoint && this.thumbCenterPoint.x) ||
        this.setThumbCenterPoint();
      return !b || (b[0] == this.baselinePos[0] && b[1] == this.baselinePos[1])
        ? !0
        : (this.setInitPosition(),
          (this.baselinePos = b),
          (a.initPageX = this.initPageX + a.startOffset[0]),
          (a.initPageY = this.initPageY + a.startOffset[1]),
          (a.deltaSetXY = null),
          this.resetThumbConstraints(),
          !1);
    },
    moveThumb: function (b, a, d, h) {
      var k = this.thumb,
        l = this,
        m,
        n;
      k.available &&
        (k.setDelta(this.thumbCenterPoint.x, this.thumbCenterPoint.y),
        (n = k.getTargetCoord(b, a)),
        (m = [Math.round(n.x), Math.round(n.y)]),
        this.animate && k._graduated && !d
          ? (this.lock(),
            (this.curCoord = e(this.thumb.getEl())),
            (this.curCoord = [
              Math.round(this.curCoord[0]),
              Math.round(this.curCoord[1]),
            ]),
            setTimeout(function () {
              l.moveOneTick(m);
            }, this.tickPause))
          : this.animate && c.ANIM_AVAIL && !d
          ? (this.lock(),
            (b = new YAHOO.util.Motion(
              k.id,
              { points: { to: m } },
              this.animationDuration,
              YAHOO.util.Easing.easeOut
            )),
            b.onComplete.subscribe(function () {
              l.unlock();
              l._mouseDown || l.endMove();
            }),
            b.animate())
          : (k.setDragElPos(b, a), h || this._mouseDown || this.endMove()));
    },
    _slideStart: function () {
      this._sliding ||
        (this._silent || (this.onSlideStart(), this.fireEvent("slideStart")),
        (this._sliding = !0));
    },
    _slideEnd: function () {
      if (this._sliding && this.moveComplete) {
        var b = this._silent;
        this.moveComplete = this._silent = this._sliding = !1;
        b || (this.onSlideEnd(), this.fireEvent("slideEnd"));
      }
    },
    moveOneTick: function (b) {
      var a = this.thumb,
        d = this,
        c = null,
        e;
      a._isRegion
        ? ((c = this._getNextX(this.curCoord, b)),
          (e = null !== c ? c[0] : this.curCoord[0]),
          (c = this._getNextY(this.curCoord, b)),
          (c = null !== c ? c[1] : this.curCoord[1]),
          (c =
            e !== this.curCoord[0] || c !== this.curCoord[1] ? [e, c] : null))
        : (c = a._isHoriz
            ? this._getNextX(this.curCoord, b)
            : this._getNextY(this.curCoord, b));
      c
        ? ((this.curCoord = c),
          this.thumb.alignElWithMouse(
            a.getEl(),
            c[0] + this.thumbCenterPoint.x,
            c[1] + this.thumbCenterPoint.y
          ),
          c[0] != b[0] || c[1] != b[1]
            ? setTimeout(function () {
                d.moveOneTick(b);
              }, this.tickPause)
            : (this.unlock(), this._mouseDown || this.endMove()))
        : (this.unlock(), this._mouseDown || this.endMove());
    },
    _getNextX: function (b, a) {
      var d = this.thumb,
        c;
      c = [];
      c = null;
      b[0] > a[0]
        ? ((c = d.tickSize - this.thumbCenterPoint.x),
          (c = d.getTargetCoord(b[0] - c, b[1])),
          (c = [c.x, c.y]))
        : b[0] < a[0] &&
          ((c = d.tickSize + this.thumbCenterPoint.x),
          (c = d.getTargetCoord(b[0] + c, b[1])),
          (c = [c.x, c.y]));
      return c;
    },
    _getNextY: function (b, a) {
      var d = this.thumb,
        c;
      c = [];
      c = null;
      b[1] > a[1]
        ? ((c = d.tickSize - this.thumbCenterPoint.y),
          (c = d.getTargetCoord(b[0], b[1] - c)),
          (c = [c.x, c.y]))
        : b[1] < a[1] &&
          ((c = d.tickSize + this.thumbCenterPoint.y),
          (c = d.getTargetCoord(b[0], b[1] + c)),
          (c = [c.x, c.y]));
      return c;
    },
    b4MouseDown: function (b) {
      if (!this.backgroundEnabled) return !1;
      this.thumb.autoOffset();
      this.resetThumbConstraints();
    },
    onMouseDown: function (b) {
      if (!this.backgroundEnabled || this.isLocked()) return !1;
      this._mouseDown = !0;
      var d = a.getPageX(b);
      b = a.getPageY(b);
      this.focus();
      this._slideStart();
      this.moveThumb(d, b);
    },
    onDrag: function (b) {
      if (this.backgroundEnabled && !this.isLocked()) {
        var d = a.getPageX(b);
        b = a.getPageY(b);
        this.moveThumb(d, b, !0, !0);
        this.fireEvents();
      }
    },
    endMove: function () {
      this.unlock();
      this.fireEvents();
      this.moveComplete = !0;
      this._slideEnd();
    },
    resetThumbConstraints: function () {
      var b = this.thumb;
      b.setXConstraint(b.leftConstraint, b.rightConstraint, b.xTickSize);
      b.setYConstraint(b.topConstraint, b.bottomConstraint, b.xTickSize);
    },
    fireEvents: function (b) {
      var a = this.thumb;
      b || a.cachePosition();
      this.isLocked() ||
        (a._isRegion
          ? ((b = a.getXValue()),
            (a = a.getYValue()),
            (b == this.previousX && a == this.previousY) ||
              this._silent ||
              (this.onChange(b, a), this.fireEvent("change", { x: b, y: a })),
            (this.previousX = b),
            (this.previousY = a))
          : ((a = a.getValue()),
            a == this.previousVal ||
              this._silent ||
              (this.onChange(a), this.fireEvent("change", a)),
            (this.previousVal = a)));
    },
    toString: function () {
      return "Slider (" + this.type + ") " + this.id;
    },
  });
  YAHOO.lang.augmentProto(c, YAHOO.util.EventProvider);
  YAHOO.widget.Slider = c;
})();
YAHOO.widget.SliderThumb = function (c, e, a, d, b, f, g) {
  c &&
    (YAHOO.widget.SliderThumb.superclass.constructor.call(this, c, e),
    (this.parentElId = e));
  this.isTarget = !1;
  this.tickSize = g;
  this.maintainOffset = !0;
  this.initSlider(a, d, b, f, g);
  this.scroll = !1;
};
YAHOO.extend(YAHOO.widget.SliderThumb, YAHOO.util.DD, {
  startOffset: null,
  dragOnly: !0,
  _isHoriz: !1,
  _prevVal: 0,
  _graduated: !1,
  getOffsetFromParent0: function (c) {
    var e = YAHOO.util.Dom.getXY(this.getEl());
    c = c || YAHOO.util.Dom.getXY(this.parentElId);
    return [e[0] - c[0], e[1] - c[1]];
  },
  getOffsetFromParent: function (c) {
    var e = this.getEl(),
      a;
    this.deltaOffset
      ? ((a = parseInt(YAHOO.util.Dom.getStyle(e, "left"), 10)),
        (e = parseInt(YAHOO.util.Dom.getStyle(e, "top"), 10)),
        (a = [a + this.deltaOffset[0], e + this.deltaOffset[1]]))
      : ((a = YAHOO.util.Dom.getXY(e)),
        (c = c || YAHOO.util.Dom.getXY(this.parentElId)),
        (a = [a[0] - c[0], a[1] - c[1]]),
        (c = parseInt(YAHOO.util.Dom.getStyle(e, "left"), 10)),
        (e = parseInt(YAHOO.util.Dom.getStyle(e, "top"), 10)),
        (c -= a[0]),
        (e -= a[1]),
        isNaN(c) || isNaN(e) || (this.deltaOffset = [c, e]));
    return a;
  },
  initSlider: function (c, e, a, d, b) {
    this.initLeft = c;
    this.initRight = e;
    this.initUp = a;
    this.initDown = d;
    this.setXConstraint(c, e, b);
    this.setYConstraint(a, d, b);
    b && 1 < b && (this._graduated = !0);
    this._isHoriz = c || e;
    this._isVert = a || d;
    this._isRegion = this._isHoriz && this._isVert;
  },
  clearTicks: function () {
    YAHOO.widget.SliderThumb.superclass.clearTicks.call(this);
    this.tickSize = 0;
    this._graduated = !1;
  },
  getValue: function () {
    return this._isHoriz ? this.getXValue() : this.getYValue();
  },
  getXValue: function () {
    if (!this.available) return 0;
    var c = this.getOffsetFromParent();
    return YAHOO.lang.isNumber(c[0])
      ? ((this.lastOffset = c), c[0] - this.startOffset[0])
      : this.lastOffset[0] - this.startOffset[0];
  },
  getYValue: function () {
    if (!this.available) return 0;
    var c = this.getOffsetFromParent();
    return YAHOO.lang.isNumber(c[1])
      ? ((this.lastOffset = c), c[1] - this.startOffset[1])
      : this.lastOffset[1] - this.startOffset[1];
  },
  toString: function () {
    return "SliderThumb " + this.id;
  },
  onChange: function (c, e) {},
});
(function () {
  function c(a, b, c, e) {
    var h = this,
      k = !1,
      l = !1,
      m,
      n;
    this.minSlider = a;
    this.maxSlider = b;
    this.activeSlider = a;
    this.isHoriz = a.thumb._isHoriz;
    m = this.minSlider.thumb.onMouseDown;
    n = this.maxSlider.thumb.onMouseDown;
    this.minSlider.thumb.onMouseDown = function () {
      h.activeSlider = h.minSlider;
      m.apply(this, arguments);
    };
    this.maxSlider.thumb.onMouseDown = function () {
      h.activeSlider = h.maxSlider;
      n.apply(this, arguments);
    };
    this.minSlider.thumb.onAvailable = function () {
      a.setStartSliderState();
      k = !0;
      l && h.fireEvent("ready", h);
    };
    this.maxSlider.thumb.onAvailable = function () {
      b.setStartSliderState();
      l = !0;
      k && h.fireEvent("ready", h);
    };
    a.onMouseDown = b.onMouseDown = function (b) {
      return this.backgroundEnabled && h._handleMouseDown(b);
    };
    a.onDrag = b.onDrag = function (b) {
      h._handleDrag(b);
    };
    a.onMouseUp = b.onMouseUp = function (b) {
      h._handleMouseUp(b);
    };
    a._bindKeyEvents = function () {
      h._bindKeyEvents(this);
    };
    b._bindKeyEvents = function () {};
    a.subscribe("change", this._handleMinChange, a, this);
    a.subscribe("slideStart", this._handleSlideStart, a, this);
    a.subscribe("slideEnd", this._handleSlideEnd, a, this);
    b.subscribe("change", this._handleMaxChange, b, this);
    b.subscribe("slideStart", this._handleSlideStart, b, this);
    b.subscribe("slideEnd", this._handleSlideEnd, b, this);
    this.createEvent("ready", this);
    this.createEvent("change", this);
    this.createEvent("slideStart", this);
    this.createEvent("slideEnd", this);
    e = YAHOO.lang.isArray(e) ? e : [0, c];
    e[0] = Math.min(Math.max(parseInt(e[0], 10) | 0, 0), c);
    e[1] = Math.max(Math.min(parseInt(e[1], 10) | 0, c), 0);
    e[0] > e[1] && e.splice(0, 2, e[1], e[0]);
    this.minVal = e[0];
    this.maxVal = e[1];
    this.minSlider.setValue(this.minVal, !0, !0, !0);
    this.maxSlider.setValue(this.maxVal, !0, !0, !0);
  }
  var e = YAHOO.util.Event,
    a = YAHOO.widget;
  c.prototype = {
    minVal: -1,
    maxVal: -1,
    minRange: 0,
    _handleSlideStart: function (a, b) {
      this.fireEvent("slideStart", b);
    },
    _handleSlideEnd: function (a, b) {
      this.fireEvent("slideEnd", b);
    },
    _handleDrag: function (d) {
      a.Slider.prototype.onDrag.call(this.activeSlider, d);
    },
    _handleMinChange: function () {
      this.activeSlider = this.minSlider;
      this.updateValue();
    },
    _handleMaxChange: function () {
      this.activeSlider = this.maxSlider;
      this.updateValue();
    },
    _bindKeyEvents: function (a) {
      e.on(a.id, "keydown", this._handleKeyDown, this, !0);
      e.on(a.id, "keypress", this._handleKeyPress, this, !0);
    },
    _handleKeyDown: function (a) {
      this.activeSlider.handleKeyDown.apply(this.activeSlider, arguments);
    },
    _handleKeyPress: function (a) {
      this.activeSlider.handleKeyPress.apply(this.activeSlider, arguments);
    },
    setValues: function (a, b, c, e, h) {
      var k = this.minSlider,
        l = this.maxSlider,
        m = k.thumb,
        n = l.thumb,
        p = this,
        q = !1,
        r = !1;
      m._isHoriz
        ? (m.setXConstraint(m.leftConstraint, n.rightConstraint, m.tickSize),
          n.setXConstraint(m.leftConstraint, n.rightConstraint, n.tickSize))
        : (m.setYConstraint(m.topConstraint, n.bottomConstraint, m.tickSize),
          n.setYConstraint(m.topConstraint, n.bottomConstraint, n.tickSize));
      this._oneTimeCallback(k, "slideEnd", function () {
        q = !0;
        r &&
          (p.updateValue(h),
          setTimeout(function () {
            p._cleanEvent(k, "slideEnd");
            p._cleanEvent(l, "slideEnd");
          }, 0));
      });
      this._oneTimeCallback(l, "slideEnd", function () {
        r = !0;
        q &&
          (p.updateValue(h),
          setTimeout(function () {
            p._cleanEvent(k, "slideEnd");
            p._cleanEvent(l, "slideEnd");
          }, 0));
      });
      k.setValue(a, c, e, !1);
      l.setValue(b, c, e, !1);
    },
    setMinValue: function (a, b, c, e) {
      var h = this.minSlider,
        k = this;
      this.activeSlider = h;
      k = this;
      this._oneTimeCallback(h, "slideEnd", function () {
        k.updateValue(e);
        setTimeout(function () {
          k._cleanEvent(h, "slideEnd");
        }, 0);
      });
      h.setValue(a, b, c);
    },
    setMaxValue: function (a, b, c, e) {
      var h = this.maxSlider,
        k = this;
      this.activeSlider = h;
      this._oneTimeCallback(h, "slideEnd", function () {
        k.updateValue(e);
        setTimeout(function () {
          k._cleanEvent(h, "slideEnd");
        }, 0);
      });
      h.setValue(a, b, c);
    },
    updateValue: function (a) {
      var b = this.minSlider.getValue(),
        c = this.maxSlider.getValue(),
        e = !1,
        h,
        k,
        l,
        m;
      if (b != this.minVal || c != this.maxVal)
        (e = !0),
          (h = this.minSlider.thumb),
          (k = this.maxSlider.thumb),
          (l = this.isHoriz ? "x" : "y"),
          (m =
            this.minSlider.thumbCenterPoint[l] +
            this.maxSlider.thumbCenterPoint[l]),
          (l = Math.max(c - m - this.minRange, 0)),
          (m = Math.min(-b - m - this.minRange, 0)),
          this.isHoriz
            ? ((l = Math.min(l, k.rightConstraint)),
              h.setXConstraint(h.leftConstraint, l, h.tickSize),
              k.setXConstraint(m, k.rightConstraint, k.tickSize))
            : ((l = Math.min(l, k.bottomConstraint)),
              h.setYConstraint(h.leftConstraint, l, h.tickSize),
              k.setYConstraint(m, k.bottomConstraint, k.tickSize));
      this.minVal = b;
      this.maxVal = c;
      e && !a && this.fireEvent("change", this);
    },
    selectActiveSlider: function (a) {
      var b = this.minSlider,
        c = this.maxSlider,
        e = b.isLocked() || !b.backgroundEnabled,
        h = c.isLocked() || !b.backgroundEnabled,
        k = YAHOO.util.Event;
      e || h
        ? (this.activeSlider = e ? c : b)
        : ((a = this.isHoriz
            ? k.getPageX(a) - b.thumb.initPageX - b.thumbCenterPoint.x
            : k.getPageY(a) - b.thumb.initPageY - b.thumbCenterPoint.y),
          (this.activeSlider = 2 * a > c.getValue() + b.getValue() ? c : b));
    },
    _handleMouseDown: function (d) {
      if (d._handled) return !1;
      d._handled = !0;
      this.selectActiveSlider(d);
      return a.Slider.prototype.onMouseDown.call(this.activeSlider, d);
    },
    _handleMouseUp: function (d) {
      a.Slider.prototype.onMouseUp.apply(this.activeSlider, arguments);
    },
    _oneTimeCallback: function (a, b, c) {
      a.subscribe(b, function () {
        a.unsubscribe(b, arguments.callee);
        c.apply({}, [].slice.apply(arguments));
      });
    },
    _cleanEvent: function (a, b) {
      var c, e, h, k, l, m;
      if (a.__yui_events && a.events[b]) {
        for (e = a.__yui_events.length; 0 <= e; --e)
          if (a.__yui_events[e].type === b) {
            c = a.__yui_events[e];
            break;
          }
        if (c) {
          l = c.subscribers;
          m = [];
          e = k = 0;
          for (h = l.length; e < h; ++e) l[e] && (m[k++] = l[e]);
          c.subscribers = m;
        }
      }
    },
  };
  YAHOO.lang.augmentProto(c, YAHOO.util.EventProvider);
  a.Slider.getHorizDualSlider = function (d, b, e, g, h, k) {
    b = new a.SliderThumb(b, d, 0, g, 0, 0, h);
    e = new a.SliderThumb(e, d, 0, g, 0, 0, h);
    return new c(
      new a.Slider(d, d, b, "horiz"),
      new a.Slider(d, d, e, "horiz"),
      g,
      k
    );
  };
  a.Slider.getVertDualSlider = function (c, b, e, g, h, k) {
    b = new a.SliderThumb(b, c, 0, 0, 0, g, h);
    e = new a.SliderThumb(e, c, 0, 0, 0, g, h);
    return new a.DualSlider(
      new a.Slider(c, c, b, "vert"),
      new a.Slider(c, c, e, "vert"),
      g,
      k
    );
  };
  YAHOO.widget.DualSlider = c;
})();
YAHOO.register("slider", YAHOO.widget.Slider, {
  version: "2.7.0",
  build: "1796",
});
YAHOO.util.Attribute = function (c, e) {
  e && ((this.owner = e), this.configure(c, !0));
};
YAHOO.util.Attribute.prototype = {
  name: void 0,
  value: null,
  owner: null,
  readOnly: !1,
  writeOnce: !1,
  _initialConfig: null,
  _written: !1,
  method: null,
  setter: null,
  getter: null,
  validator: null,
  getValue: function () {
    var c = this.value;
    this.getter && (c = this.getter.call(this.owner, this.name));
    return c;
  },
  setValue: function (c, e) {
    var a,
      d = this.owner,
      b = this.name,
      f = { type: b, prevValue: this.getValue(), newValue: c };
    if (
      this.readOnly ||
      (this.writeOnce && this._written) ||
      (this.validator && !this.validator.call(d, c)) ||
      (!e && ((a = d.fireBeforeChangeEvent(f)), !1 === a))
    )
      return !1;
    this.setter && (c = this.setter.call(d, c, this.name));
    this.method && this.method.call(d, c, this.name);
    this.value = c;
    this._written = !0;
    f.type = b;
    e || this.owner.fireChangeEvent(f);
    return !0;
  },
  configure: function (c, e) {
    c = c || {};
    e && (this._written = !1);
    this._initialConfig = this._initialConfig || {};
    for (var a in c)
      c.hasOwnProperty(a) &&
        ((this[a] = c[a]), e && (this._initialConfig[a] = c[a]));
  },
  resetValue: function () {
    return this.setValue(this._initialConfig.value);
  },
  resetConfig: function () {
    this.configure(this._initialConfig, !0);
  },
  refresh: function (c) {
    this.setValue(this.value, c);
  },
};
(function () {
  var c = YAHOO.util.Lang;
  YAHOO.util.AttributeProvider = function () {};
  YAHOO.util.AttributeProvider.prototype = {
    _configs: null,
    get: function (c) {
      this._configs = this._configs || {};
      var a = this._configs[c];
      return a && this._configs.hasOwnProperty(c) ? a.getValue() : null;
    },
    set: function (c, a, d) {
      this._configs = this._configs || {};
      return (c = this._configs[c]) ? c.setValue(a, d) : !1;
    },
    getAttributeKeys: function () {
      this._configs = this._configs;
      var e = [],
        a;
      for (a in this._configs)
        c.hasOwnProperty(this._configs, a) &&
          !c.isUndefined(this._configs[a]) &&
          (e[e.length] = a);
      return e;
    },
    setAttributes: function (e, a) {
      for (var d in e) c.hasOwnProperty(e, d) && this.set(d, e[d], a);
    },
    resetValue: function (c, a) {
      this._configs = this._configs || {};
      return this._configs[c]
        ? (this.set(c, this._configs[c]._initialConfig.value, a), !0)
        : !1;
    },
    refresh: function (e, a) {
      var d = (this._configs = this._configs || {});
      e = (c.isString(e) ? [e] : e) || this.getAttributeKeys();
      for (var b = 0, f = e.length; b < f; ++b)
        d.hasOwnProperty(e[b]) && this._configs[e[b]].refresh(a);
    },
    register: function (c, a) {
      this.setAttributeConfig(c, a);
    },
    getAttributeConfig: function (e) {
      this._configs = this._configs || {};
      var a = this._configs[e] || {},
        d = {};
      for (e in a) c.hasOwnProperty(a, e) && (d[e] = a[e]);
      return d;
    },
    setAttributeConfig: function (c, a, d) {
      this._configs = this._configs || {};
      a = a || {};
      this._configs[c]
        ? this._configs[c].configure(a, d)
        : ((a.name = c), (this._configs[c] = this.createAttribute(a)));
    },
    configureAttribute: function (c, a, d) {
      this.setAttributeConfig(c, a, d);
    },
    resetAttributeConfig: function (c) {
      this._configs = this._configs || {};
      this._configs[c].resetConfig();
    },
    subscribe: function (c, a) {
      this._events = this._events || {};
      c in this._events || (this._events[c] = this.createEvent(c));
      YAHOO.util.EventProvider.prototype.subscribe.apply(this, arguments);
    },
    on: function () {
      this.subscribe.apply(this, arguments);
    },
    addListener: function () {
      this.subscribe.apply(this, arguments);
    },
    fireBeforeChangeEvent: function (c) {
      var a;
      a =
        "before" +
        (c.type.charAt(0).toUpperCase() + c.type.substr(1) + "Change");
      c.type = a;
      return this.fireEvent(c.type, c);
    },
    fireChangeEvent: function (c) {
      c.type += "Change";
      return this.fireEvent(c.type, c);
    },
    createAttribute: function (c) {
      return new YAHOO.util.Attribute(c, this);
    },
  };
  YAHOO.augment(YAHOO.util.AttributeProvider, YAHOO.util.EventProvider);
})();
(function () {
  var c = YAHOO.util.Dom,
    e = YAHOO.util.AttributeProvider,
    a = function (a, b) {
      this.init.apply(this, arguments);
    };
  a.DOM_EVENTS = {
    click: !0,
    dblclick: !0,
    keydown: !0,
    keypress: !0,
    keyup: !0,
    mousedown: !0,
    mousemove: !0,
    mouseout: !0,
    mouseover: !0,
    mouseup: !0,
    focus: !0,
    blur: !0,
    submit: !0,
    change: !0,
  };
  a.prototype = {
    DOM_EVENTS: null,
    DEFAULT_HTML_SETTER: function (a, b) {
      var c = this.get("element");
      c && (c[b] = a);
    },
    DEFAULT_HTML_GETTER: function (a) {
      var b = this.get("element"),
        c;
      b && (c = b[a]);
      return c;
    },
    appendChild: function (a) {
      a = a.get ? a.get("element") : a;
      return this.get("element").appendChild(a);
    },
    getElementsByTagName: function (a) {
      return this.get("element").getElementsByTagName(a);
    },
    hasChildNodes: function () {
      return this.get("element").hasChildNodes();
    },
    insertBefore: function (a, b) {
      a = a.get ? a.get("element") : a;
      b = b && b.get ? b.get("element") : b;
      return this.get("element").insertBefore(a, b);
    },
    removeChild: function (a) {
      a = a.get ? a.get("element") : a;
      return this.get("element").removeChild(a);
    },
    replaceChild: function (a, b) {
      a = a.get ? a.get("element") : a;
      b = b.get ? b.get("element") : b;
      return this.get("element").replaceChild(a, b);
    },
    initAttributes: function (a) {},
    addListener: function (a, b, c, e) {
      var h = this.get("element") || this.get("id");
      e = e || this;
      var k = this;
      this._events[a] ||
        (h &&
          this.DOM_EVENTS[a] &&
          YAHOO.util.Event.addListener(
            h,
            a,
            function (b) {
              b.srcElement && !b.target && (b.target = b.srcElement);
              k.fireEvent(a, b);
            },
            c,
            e
          ),
        this.createEvent(a, this));
      return YAHOO.util.EventProvider.prototype.subscribe.apply(
        this,
        arguments
      );
    },
    on: function () {
      return this.addListener.apply(this, arguments);
    },
    subscribe: function () {
      return this.addListener.apply(this, arguments);
    },
    removeListener: function (a, b) {
      return this.unsubscribe.apply(this, arguments);
    },
    addClass: function (a) {
      c.addClass(this.get("element"), a);
    },
    getElementsByClassName: function (a, b) {
      return c.getElementsByClassName(a, b, this.get("element"));
    },
    hasClass: function (a) {
      return c.hasClass(this.get("element"), a);
    },
    removeClass: function (a) {
      return c.removeClass(this.get("element"), a);
    },
    replaceClass: function (a, b) {
      return c.replaceClass(this.get("element"), a, b);
    },
    setStyle: function (a, b) {
      return c.setStyle(this.get("element"), a, b);
    },
    getStyle: function (a) {
      return c.getStyle(this.get("element"), a);
    },
    fireQueue: function () {
      for (var a = this._queue, b = 0, c = a.length; b < c; ++b)
        this[a[b][0]].apply(this, a[b][1]);
    },
    appendTo: function (a, b) {
      a = a.get ? a.get("element") : c.get(a);
      this.fireEvent("beforeAppendTo", { type: "beforeAppendTo", target: a });
      b = b && b.get ? b.get("element") : c.get(b);
      var e = this.get("element");
      if (!e || !a) return !1;
      e.parent != a && (b ? a.insertBefore(e, b) : a.appendChild(e));
      this.fireEvent("appendTo", { type: "appendTo", target: a });
      return e;
    },
    get: function (a) {
      var b = this._configs || {},
        c = b.element;
      !c ||
        b[a] ||
        YAHOO.lang.isUndefined(c.value[a]) ||
        this._setHTMLAttrConfig(a);
      return e.prototype.get.call(this, a);
    },
    setAttributes: function (a, b) {
      for (var c = {}, e = this._configOrder, h = 0, k = e.length; h < k; ++h)
        void 0 !== a[e[h]] && ((c[e[h]] = !0), this.set(e[h], a[e[h]], b));
      for (var l in a) a.hasOwnProperty(l) && !c[l] && this.set(l, a[l], b);
    },
    set: function (a, b, c) {
      var g = this.get("element");
      if (g)
        return (
          this._configs[a] ||
            YAHOO.lang.isUndefined(g[a]) ||
            this._setHTMLAttrConfig(a),
          e.prototype.set.apply(this, arguments)
        );
      this._queue[this._queue.length] = ["set", arguments];
      this._configs[a] && (this._configs[a].value = b);
    },
    setAttributeConfig: function (a, b, c) {
      this._configOrder.push(a);
      e.prototype.setAttributeConfig.apply(this, arguments);
    },
    createEvent: function (a, b) {
      this._events[a] = !0;
      return e.prototype.createEvent.apply(this, arguments);
    },
    init: function (a, b) {
      this._initElement(a, b);
    },
    destroy: function () {
      var a = this.get("element");
      YAHOO.util.Event.purgeElement(a, !0);
      this.unsubscribeAll();
      a && a.parentNode && a.parentNode.removeChild(a);
      this._queue = [];
      this._events = {};
      this._configs = {};
      this._configOrder = [];
    },
    _initElement: function (d, b) {
      this._queue = this._queue || [];
      this._events = this._events || {};
      this._configs = this._configs || {};
      this._configOrder = [];
      b = b || {};
      b.element = b.element || d || null;
      var e = !1,
        g = a.DOM_EVENTS;
      this.DOM_EVENTS = this.DOM_EVENTS || {};
      for (var h in g) g.hasOwnProperty(h) && (this.DOM_EVENTS[h] = g[h]);
      "string" === typeof b.element &&
        this._setHTMLAttrConfig("id", { value: b.element });
      c.get(b.element) &&
        ((e = !0), this._initHTMLElement(b), this._initContent(b));
      YAHOO.util.Event.onAvailable(
        b.element,
        function () {
          e || this._initHTMLElement(b);
          this.fireEvent("available", {
            type: "available",
            target: c.get(b.element),
          });
        },
        this,
        !0
      );
      YAHOO.util.Event.onContentReady(
        b.element,
        function () {
          e || this._initContent(b);
          this.fireEvent("contentReady", {
            type: "contentReady",
            target: c.get(b.element),
          });
        },
        this,
        !0
      );
    },
    _initHTMLElement: function (a) {
      this.setAttributeConfig("element", {
        value: c.get(a.element),
        readOnly: !0,
      });
    },
    _initContent: function (a) {
      this.initAttributes(a);
      this.setAttributes(a, !0);
      this.fireQueue();
    },
    _setHTMLAttrConfig: function (a, b) {
      var c = this.get("element");
      b = b || {};
      b.name = a;
      b.setter = b.setter || this.DEFAULT_HTML_SETTER;
      b.getter = b.getter || this.DEFAULT_HTML_GETTER;
      b.value = b.value || c[a];
      this._configs[a] = new YAHOO.util.Attribute(b, this);
    },
  };
  YAHOO.augment(a, e);
  YAHOO.util.Element = a;
})();
YAHOO.register("element", YAHOO.util.Element, {
  version: "2.7.0",
  build: "1796",
});
YAHOO.util.Color = (function () {
  var c = YAHOO.lang.isArray,
    e = YAHOO.lang.isNumber;
  return {
    real2dec: function (a) {
      return Math.min(255, Math.round(256 * a));
    },
    hsv2rgb: function (a, d, b) {
      if (c(a)) return this.hsv2rgb.call(this, a[0], a[1], a[2]);
      var e,
        g,
        h,
        k = Math.floor((a / 60) % 6),
        l = a / 60 - k;
      a = b * (1 - d);
      var m = b * (1 - l * d);
      d = b * (1 - (1 - l) * d);
      switch (k) {
        case 0:
          e = b;
          g = d;
          h = a;
          break;
        case 1:
          e = m;
          g = b;
          h = a;
          break;
        case 2:
          e = a;
          g = b;
          h = d;
          break;
        case 3:
          e = a;
          g = m;
          h = b;
          break;
        case 4:
          e = d;
          g = a;
          h = b;
          break;
        case 5:
          (e = b), (g = a), (h = m);
      }
      b = this.real2dec;
      return [b(e), b(g), b(h)];
    },
    rgb2hsv: function (a, d, b) {
      if (c(a)) return this.rgb2hsv.apply(this, a);
      a /= 255;
      d /= 255;
      b /= 255;
      var e,
        g = Math.min(Math.min(a, d), b),
        h = Math.max(Math.max(a, d), b),
        k = h - g;
      switch (h) {
        case g:
          e = 0;
          break;
        case a:
          e = (60 * (d - b)) / k;
          d < b && (e += 360);
          break;
        case d:
          e = (60 * (b - a)) / k + 120;
          break;
        case b:
          e = (60 * (a - d)) / k + 240;
      }
      a = 0 === h ? 0 : 1 - g / h;
      return [Math.round(e), a, h];
    },
    rgb2hex: function (a, d, b) {
      if (c(a)) return this.rgb2hex.apply(this, a);
      var e = this.dec2hex;
      return e(a) + e(d) + e(b);
    },
    dec2hex: function (a) {
      a = parseInt(a, 10) | 0;
      return ("0" + (255 < a || 0 > a ? 0 : a).toString(16))
        .slice(-2)
        .toUpperCase();
    },
    hex2dec: function (a) {
      return parseInt(a, 16);
    },
    hex2rgb: function (a) {
      var c = this.hex2dec;
      return [c(a.slice(0, 2)), c(a.slice(2, 4)), c(a.slice(4, 6))];
    },
    websafe: function (a, d, b) {
      if (c(a)) return this.websafe.apply(this, a);
      var f = function (a) {
        if (e(a)) {
          a = Math.min(Math.max(0, a), 255);
          var b, c;
          for (b = 0; 256 > b; b += 51)
            if (((c = b + 51), a >= b && a <= c)) return 25 < a - b ? c : b;
        }
        return a;
      };
      return [f(a), f(d), f(b)];
    },
  };
})();
(function () {
  function c(a, b) {
    e += 1;
    b = b || {};
    1 !== arguments.length ||
      YAHOO.lang.isString(a) ||
      a.nodeName ||
      ((b = a), (a = b.element || null));
    a || b.element || (a = this._createHostElement(b));
    c.superclass.constructor.call(this, a, b);
    this.initPicker();
  }
  var e = 0,
    a = YAHOO.util,
    d = YAHOO.lang,
    b = YAHOO.widget.Slider,
    f = a.Color,
    g = a.Dom,
    h = a.Event,
    k = d.substitute;
  YAHOO.extend(c, YAHOO.util.Element, {
    ID: {
      R: "yui-picker-r",
      R_HEX: "yui-picker-rhex",
      G: "yui-picker-g",
      G_HEX: "yui-picker-ghex",
      B: "yui-picker-b",
      B_HEX: "yui-picker-bhex",
      H: "yui-picker-h",
      S: "yui-picker-s",
      V: "yui-picker-v",
      PICKER_BG: "yui-picker-bg",
      PICKER_THUMB: "yui-picker-thumb",
      HUE_BG: "yui-picker-hue-bg",
      HUE_THUMB: "yui-picker-hue-thumb",
      HEX: "yui-picker-hex",
      SWATCH: "yui-picker-swatch",
      WEBSAFE_SWATCH: "yui-picker-websafe-swatch",
      CONTROLS: "yui-picker-controls",
      RGB_CONTROLS: "yui-picker-rgb-controls",
      HSV_CONTROLS: "yui-picker-hsv-controls",
      HEX_CONTROLS: "yui-picker-hex-controls",
      HEX_SUMMARY: "yui-picker-hex-summary",
      CONTROLS_LABEL: "yui-picker-controls-label",
    },
    TXT: {
      ILLEGAL_HEX: "Illegal hex value entered",
      SHOW_CONTROLS: "Show color details",
      HIDE_CONTROLS: "Hide color details",
      CURRENT_COLOR: "Currently selected color: {rgb}",
      CLOSEST_WEBSAFE: "Closest websafe color: {rgb}. Click to select.",
      R: "R",
      G: "G",
      B: "B",
      H: "H",
      S: "S",
      V: "V",
      HEX: "#",
      DEG: "°",
      PERCENT: "%",
    },
    IMAGE: {
      PICKER_THUMB: "../../build/colorpicker/assets/picker_thumb.png",
      HUE_THUMB: "../../build/colorpicker/assets/hue_thumb.png",
    },
    DEFAULT: { PICKER_SIZE: 180 },
    OPT: {
      HUE: "hue",
      SATURATION: "saturation",
      VALUE: "value",
      RED: "red",
      GREEN: "green",
      BLUE: "blue",
      HSV: "hsv",
      RGB: "rgb",
      WEBSAFE: "websafe",
      HEX: "hex",
      PICKER_SIZE: "pickersize",
      SHOW_CONTROLS: "showcontrols",
      SHOW_RGB_CONTROLS: "showrgbcontrols",
      SHOW_HSV_CONTROLS: "showhsvcontrols",
      SHOW_HEX_CONTROLS: "showhexcontrols",
      SHOW_HEX_SUMMARY: "showhexsummary",
      SHOW_WEBSAFE: "showwebsafe",
      CONTAINER: "container",
      IDS: "ids",
      ELEMENTS: "elements",
      TXT: "txt",
      IMAGES: "images",
      ANIMATE: "animate",
    },
    skipAnim: !0,
    _createHostElement: function () {
      var a = document.createElement("div");
      this.CSS.BASE && (a.className = this.CSS.BASE);
      return a;
    },
    _updateHueSlider: function () {
      var a = this.get(this.OPT.PICKER_SIZE),
        b = this.get(this.OPT.HUE),
        b = a - Math.round((b / 360) * a);
      b === a && (b = 0);
      this.hueSlider.setValue(b, this.skipAnim);
    },
    _updatePickerSlider: function () {
      var a = this.get(this.OPT.PICKER_SIZE),
        b = this.get(this.OPT.SATURATION),
        c = this.get(this.OPT.VALUE),
        b = Math.round((b * a) / 100),
        c = Math.round(a - (c * a) / 100);
      this.pickerSlider.setRegionValue(b, c, this.skipAnim);
    },
    _updateSliders: function () {
      this._updateHueSlider();
      this._updatePickerSlider();
    },
    setValue: function (a, b) {
      this.set(this.OPT.RGB, a, b || !1);
      this._updateSliders();
    },
    hueSlider: null,
    pickerSlider: null,
    _getH: function () {
      var a = this.get(this.OPT.PICKER_SIZE),
        a = (a - this.hueSlider.getValue()) / a,
        a = Math.round(360 * a);
      return 360 === a ? 0 : a;
    },
    _getS: function () {
      return this.pickerSlider.getXValue() / this.get(this.OPT.PICKER_SIZE);
    },
    _getV: function () {
      var a = this.get(this.OPT.PICKER_SIZE);
      return (a - this.pickerSlider.getYValue()) / a;
    },
    _updateSwatch: function () {
      var a = this.get(this.OPT.RGB),
        b = this.get(this.OPT.WEBSAFE),
        c = this.getElement(this.ID.SWATCH),
        a = a.join(","),
        d = this.get(this.OPT.TXT);
      g.setStyle(c, "background-color", "rgb(" + a + ")");
      c.title = k(d.CURRENT_COLOR, { rgb: "#" + this.get(this.OPT.HEX) });
      c = this.getElement(this.ID.WEBSAFE_SWATCH);
      a = b.join(",");
      g.setStyle(c, "background-color", "rgb(" + a + ")");
      c.title = k(d.CLOSEST_WEBSAFE, { rgb: "#" + f.rgb2hex(b) });
    },
    _getValuesFromSliders: function () {
      this.set(
        this.OPT.RGB,
        f.hsv2rgb(this._getH(), this._getS(), this._getV())
      );
    },
    _updateFormFields: function () {
      this.getElement(this.ID.H).value = this.get(this.OPT.HUE);
      this.getElement(this.ID.S).value = this.get(this.OPT.SATURATION);
      this.getElement(this.ID.V).value = this.get(this.OPT.VALUE);
      this.getElement(this.ID.R).value = this.get(this.OPT.RED);
      this.getElement(this.ID.R_HEX).innerHTML = f.dec2hex(
        this.get(this.OPT.RED)
      );
      this.getElement(this.ID.G).value = this.get(this.OPT.GREEN);
      this.getElement(this.ID.G_HEX).innerHTML = f.dec2hex(
        this.get(this.OPT.GREEN)
      );
      this.getElement(this.ID.B).value = this.get(this.OPT.BLUE);
      this.getElement(this.ID.B_HEX).innerHTML = f.dec2hex(
        this.get(this.OPT.BLUE)
      );
      this.getElement(this.ID.HEX).value = this.get(this.OPT.HEX);
    },
    _onHueSliderChange: function (a) {
      a = this._getH();
      var c = "rgb(" + f.hsv2rgb(a, 1, 1).join(",") + ")";
      this.set(this.OPT.HUE, a, !0);
      g.setStyle(this.getElement(this.ID.PICKER_BG), "background-color", c);
      this.hueSlider.valueChangeSource !== b.SOURCE_SET_VALUE &&
        this._getValuesFromSliders();
      this._updateFormFields();
      this._updateSwatch();
    },
    _onPickerSliderChange: function (a) {
      a = this._getS();
      var c = this._getV();
      this.set(this.OPT.SATURATION, Math.round(100 * a), !0);
      this.set(this.OPT.VALUE, Math.round(100 * c), !0);
      this.pickerSlider.valueChangeSource !== b.SOURCE_SET_VALUE &&
        this._getValuesFromSliders();
      this._updateFormFields();
      this._updateSwatch();
    },
    _getCommand: function (a) {
      var b = h.getCharCode(a);
      return 38 === b
        ? 3
        : 13 === b
        ? 6
        : 40 === b
        ? 4
        : 48 <= b && 57 >= b
        ? 1
        : 97 <= b && 102 >= b
        ? 2
        : 65 <= b && 70 >= b
        ? 2
        : -1 < "8, 9, 13, 27, 37, 39".indexOf(b) || a.ctrlKey || a.metaKey
        ? 5
        : 0;
    },
    _useFieldValue: function (a, b, c) {
      a = b.value;
      c !== this.OPT.HEX && (a = parseInt(a, 10));
      a !== this.get(c) && this.set(c, a);
    },
    _rgbFieldKeypress: function (a, b, c) {
      var d = this._getCommand(a),
        e = a.shiftKey ? 10 : 1;
      switch (d) {
        case 6:
          this._useFieldValue.apply(this, arguments);
          break;
        case 3:
          this.set(c, Math.min(this.get(c) + e, 255));
          this._updateFormFields();
          break;
        case 4:
          this.set(c, Math.max(this.get(c) - e, 0)), this._updateFormFields();
      }
    },
    _hexFieldKeypress: function (a, b, c) {
      6 === this._getCommand(a) && this._useFieldValue.apply(this, arguments);
    },
    _hexOnly: function (a, b) {
      switch (this._getCommand(a)) {
        case 6:
        case 5:
        case 1:
          break;
        case 2:
          if (!0 !== b) break;
        default:
          return h.stopEvent(a), !1;
      }
    },
    _numbersOnly: function (a) {
      return this._hexOnly(a, !0);
    },
    getElement: function (a) {
      return this.get(this.OPT.ELEMENTS)[this.get(this.OPT.IDS)[a]];
    },
    _createElements: function () {
      var a,
        b,
        c,
        e,
        f = this.get(this.OPT.IDS),
        g = this.get(this.OPT.TXT),
        h = this.get(this.OPT.IMAGES),
        k = function (a, b) {
          var c = document.createElement(a);
          b && d.augmentObject(c, b, !0);
          return c;
        },
        u = function (a, b) {
          var c = d.merge(
            { autocomplete: "off", value: "0", size: 3, maxlength: 3 },
            b
          );
          c.name = c.id;
          return new k(a, c);
        };
      e = this.get("element");
      a = new k("div", {
        id: f[this.ID.PICKER_BG],
        className: "yui-picker-bg",
        tabIndex: -1,
        hideFocus: !0,
      });
      b = new k("div", {
        id: f[this.ID.PICKER_THUMB],
        className: "yui-picker-thumb",
      });
      c = new k("img", { src: h.PICKER_THUMB });
      b.appendChild(c);
      a.appendChild(b);
      e.appendChild(a);
      a = new k("div", {
        id: f[this.ID.HUE_BG],
        className: "yui-picker-hue-bg",
        tabIndex: -1,
        hideFocus: !0,
      });
      b = new k("div", {
        id: f[this.ID.HUE_THUMB],
        className: "yui-picker-hue-thumb",
      });
      c = new k("img", { src: h.HUE_THUMB });
      b.appendChild(c);
      a.appendChild(b);
      e.appendChild(a);
      a = new k("div", {
        id: f[this.ID.CONTROLS],
        className: "yui-picker-controls",
      });
      e.appendChild(a);
      e = a;
      a = new k("div", { className: "hd" });
      b = new k("a", { id: f[this.ID.CONTROLS_LABEL], href: "#" });
      a.appendChild(b);
      e.appendChild(a);
      a = new k("div", { className: "bd" });
      e.appendChild(a);
      e = a;
      a = new k("ul", {
        id: f[this.ID.RGB_CONTROLS],
        className: "yui-picker-rgb-controls",
      });
      b = new k("li");
      b.appendChild(document.createTextNode(g.R + " "));
      c = new u("input", { id: f[this.ID.R], className: "yui-picker-r" });
      b.appendChild(c);
      a.appendChild(b);
      b = new k("li");
      b.appendChild(document.createTextNode(g.G + " "));
      c = new u("input", { id: f[this.ID.G], className: "yui-picker-g" });
      b.appendChild(c);
      a.appendChild(b);
      b = new k("li");
      b.appendChild(document.createTextNode(g.B + " "));
      c = new u("input", { id: f[this.ID.B], className: "yui-picker-b" });
      b.appendChild(c);
      a.appendChild(b);
      e.appendChild(a);
      a = new k("ul", {
        id: f[this.ID.HSV_CONTROLS],
        className: "yui-picker-hsv-controls",
      });
      b = new k("li");
      b.appendChild(document.createTextNode(g.H + " "));
      c = new u("input", { id: f[this.ID.H], className: "yui-picker-h" });
      b.appendChild(c);
      b.appendChild(document.createTextNode(" " + g.DEG));
      a.appendChild(b);
      b = new k("li");
      b.appendChild(document.createTextNode(g.S + " "));
      c = new u("input", { id: f[this.ID.S], className: "yui-picker-s" });
      b.appendChild(c);
      b.appendChild(document.createTextNode(" " + g.PERCENT));
      a.appendChild(b);
      b = new k("li");
      b.appendChild(document.createTextNode(g.V + " "));
      c = new u("input", { id: f[this.ID.V], className: "yui-picker-v" });
      b.appendChild(c);
      b.appendChild(document.createTextNode(" " + g.PERCENT));
      a.appendChild(b);
      e.appendChild(a);
      a = new k("ul", {
        id: f[this.ID.HEX_SUMMARY],
        className: "yui-picker-hex_summary",
      });
      b = new k("li", { id: f[this.ID.R_HEX] });
      a.appendChild(b);
      b = new k("li", { id: f[this.ID.G_HEX] });
      a.appendChild(b);
      b = new k("li", { id: f[this.ID.B_HEX] });
      a.appendChild(b);
      e.appendChild(a);
      a = new k("div", {
        id: f[this.ID.HEX_CONTROLS],
        className: "yui-picker-hex-controls",
      });
      a.appendChild(document.createTextNode(g.HEX + " "));
      b = new u("input", {
        id: f[this.ID.HEX],
        className: "yui-picker-hex",
        size: 6,
        maxlength: 6,
      });
      a.appendChild(b);
      e.appendChild(a);
      e = this.get("element");
      a = new k("div", {
        id: f[this.ID.SWATCH],
        className: "yui-picker-swatch",
      });
      e.appendChild(a);
      a = new k("div", {
        id: f[this.ID.WEBSAFE_SWATCH],
        className: "yui-picker-websafe-swatch",
      });
      e.appendChild(a);
    },
    _attachRGBHSV: function (a, b) {
      h.on(
        this.getElement(a),
        "keydown",
        function (a, c) {
          c._rgbFieldKeypress(a, this, b);
        },
        this
      );
      h.on(this.getElement(a), "keypress", this._numbersOnly, this, !0);
      h.on(
        this.getElement(a),
        "blur",
        function (a, c) {
          c._useFieldValue(a, this, b);
        },
        this
      );
    },
    _updateRGB: function () {
      var a = [
        this.get(this.OPT.RED),
        this.get(this.OPT.GREEN),
        this.get(this.OPT.BLUE),
      ];
      this.set(this.OPT.RGB, a);
      this._updateSliders();
    },
    _initElements: function () {
      var a = this.OPT,
        b = this.get(a.IDS),
        a = this.get(a.ELEMENTS),
        c,
        e,
        f;
      for (c in this.ID) d.hasOwnProperty(this.ID, c) && (b[this.ID[c]] = b[c]);
      (e = g.get(b[this.ID.PICKER_BG])) || this._createElements();
      for (c in b)
        d.hasOwnProperty(b, c) &&
          ((e = g.get(b[c])),
          (f = g.generateId(e)),
          (b[c] = f),
          (b[b[c]] = f),
          (a[f] = e));
    },
    initPicker: function () {
      this._initSliders();
      this._bindUI();
      this.syncUI(!0);
    },
    _initSliders: function () {
      var a = this.ID,
        c = this.get(this.OPT.PICKER_SIZE);
      this.hueSlider = b.getVertSlider(
        this.getElement(a.HUE_BG),
        this.getElement(a.HUE_THUMB),
        0,
        c
      );
      this.pickerSlider = b.getSliderRegion(
        this.getElement(a.PICKER_BG),
        this.getElement(a.PICKER_THUMB),
        0,
        c,
        0,
        c
      );
      this.set(this.OPT.ANIMATE, this.get(this.OPT.ANIMATE));
    },
    _bindUI: function () {
      var a = this.ID,
        b = this.OPT;
      this.hueSlider.subscribe("change", this._onHueSliderChange, this, !0);
      this.pickerSlider.subscribe(
        "change",
        this._onPickerSliderChange,
        this,
        !0
      );
      h.on(
        this.getElement(a.WEBSAFE_SWATCH),
        "click",
        function (a) {
          this.setValue(this.get(b.WEBSAFE));
        },
        this,
        !0
      );
      h.on(
        this.getElement(a.CONTROLS_LABEL),
        "click",
        function (a) {
          this.set(b.SHOW_CONTROLS, !this.get(b.SHOW_CONTROLS));
          h.preventDefault(a);
        },
        this,
        !0
      );
      this._attachRGBHSV(a.R, b.RED);
      this._attachRGBHSV(a.G, b.GREEN);
      this._attachRGBHSV(a.B, b.BLUE);
      this._attachRGBHSV(a.H, b.HUE);
      this._attachRGBHSV(a.S, b.SATURATION);
      this._attachRGBHSV(a.V, b.VALUE);
      h.on(
        this.getElement(a.HEX),
        "keydown",
        function (a, c) {
          c._hexFieldKeypress(a, this, b.HEX);
        },
        this
      );
      h.on(this.getElement(this.ID.HEX), "keypress", this._hexOnly, this, !0);
      h.on(
        this.getElement(this.ID.HEX),
        "blur",
        function (a, c) {
          c._useFieldValue(a, this, b.HEX);
        },
        this
      );
    },
    syncUI: function (a) {
      this.skipAnim = a;
      this._updateRGB();
      this.skipAnim = !1;
    },
    _updateRGBFromHSV: function () {
      var a = [
          this.get(this.OPT.HUE),
          this.get(this.OPT.SATURATION) / 100,
          this.get(this.OPT.VALUE) / 100,
        ],
        a = f.hsv2rgb(a);
      this.set(this.OPT.RGB, a);
      this._updateSliders();
    },
    _updateHex: function () {
      var a = this.get(this.OPT.HEX),
        b = a.length,
        c;
      if (3 === b) {
        a = a.split("");
        for (c = 0; c < b; c += 1) a[c] += a[c];
        a = a.join("");
      }
      if (6 !== a.length) return !1;
      b = f.hex2rgb(a);
      this.setValue(b);
    },
    _hideShowEl: function (a, b) {
      var c = d.isString(a) ? this.getElement(a) : a;
      g.setStyle(c, "display", b ? "" : "none");
    },
    initAttributes: function (a) {
      a = a || {};
      c.superclass.initAttributes.call(this, a);
      this.setAttributeConfig(this.OPT.PICKER_SIZE, {
        value: a.size || this.DEFAULT.PICKER_SIZE,
      });
      this.setAttributeConfig(this.OPT.HUE, {
        value: a.hue || 0,
        validator: d.isNumber,
      });
      this.setAttributeConfig(this.OPT.SATURATION, {
        value: a.saturation || 0,
        validator: d.isNumber,
      });
      this.setAttributeConfig(this.OPT.VALUE, {
        value: d.isNumber(a.value) ? a.value : 100,
        validator: d.isNumber,
      });
      this.setAttributeConfig(this.OPT.RED, {
        value: d.isNumber(a.red) ? a.red : 255,
        validator: d.isNumber,
      });
      this.setAttributeConfig(this.OPT.GREEN, {
        value: d.isNumber(a.green) ? a.green : 255,
        validator: d.isNumber,
      });
      this.setAttributeConfig(this.OPT.BLUE, {
        value: d.isNumber(a.blue) ? a.blue : 255,
        validator: d.isNumber,
      });
      this.setAttributeConfig(this.OPT.HEX, {
        value: a.hex || "FFFFFF",
        validator: d.isString,
      });
      this.setAttributeConfig(this.OPT.RGB, {
        value: a.rgb || [255, 255, 255],
        method: function (a) {
          this.set(this.OPT.RED, a[0], !0);
          this.set(this.OPT.GREEN, a[1], !0);
          this.set(this.OPT.BLUE, a[2], !0);
          var b = f.websafe(a),
            c = f.rgb2hex(a);
          a = f.rgb2hsv(a);
          this.set(this.OPT.WEBSAFE, b, !0);
          this.set(this.OPT.HEX, c, !0);
          a[1] && this.set(this.OPT.HUE, a[0], !0);
          this.set(this.OPT.SATURATION, Math.round(100 * a[1]), !0);
          this.set(this.OPT.VALUE, Math.round(100 * a[2]), !0);
        },
        readonly: !0,
      });
      this.setAttributeConfig(this.OPT.CONTAINER, {
        value: null,
        method: function (a) {
          a &&
            a.showEvent.subscribe(
              function () {
                this.pickerSlider.focus();
              },
              this,
              !0
            );
        },
      });
      this.setAttributeConfig(this.OPT.WEBSAFE, {
        value: a.websafe || [255, 255, 255],
      });
      var b = a.ids || d.merge({}, this.ID),
        h;
      if (!a.ids && 1 < e) for (h in b) d.hasOwnProperty(b, h) && (b[h] += e);
      this.setAttributeConfig(this.OPT.IDS, { value: b, writeonce: !0 });
      this.setAttributeConfig(this.OPT.TXT, {
        value: a.txt || this.TXT,
        writeonce: !0,
      });
      this.setAttributeConfig(this.OPT.IMAGES, {
        value: a.images || this.IMAGE,
        writeonce: !0,
      });
      this.setAttributeConfig(this.OPT.ELEMENTS, { value: {}, readonly: !0 });
      this.setAttributeConfig(this.OPT.SHOW_CONTROLS, {
        value: d.isBoolean(a.showcontrols) ? a.showcontrols : !0,
        method: function (a) {
          var b = g.getElementsByClassName(
            "bd",
            "div",
            this.getElement(this.ID.CONTROLS)
          )[0];
          this._hideShowEl(b, a);
          this.getElement(this.ID.CONTROLS_LABEL).innerHTML = a
            ? this.get(this.OPT.TXT).HIDE_CONTROLS
            : this.get(this.OPT.TXT).SHOW_CONTROLS;
        },
      });
      this.setAttributeConfig(this.OPT.SHOW_RGB_CONTROLS, {
        value: d.isBoolean(a.showrgbcontrols) ? a.showrgbcontrols : !0,
        method: function (a) {
          this._hideShowEl(this.ID.RGB_CONTROLS, a);
        },
      });
      this.setAttributeConfig(this.OPT.SHOW_HSV_CONTROLS, {
        value: d.isBoolean(a.showhsvcontrols) ? a.showhsvcontrols : !1,
        method: function (a) {
          this._hideShowEl(this.ID.HSV_CONTROLS, a);
          a &&
            this.get(this.OPT.SHOW_HEX_SUMMARY) &&
            this.set(this.OPT.SHOW_HEX_SUMMARY, !1);
        },
      });
      this.setAttributeConfig(this.OPT.SHOW_HEX_CONTROLS, {
        value: d.isBoolean(a.showhexcontrols) ? a.showhexcontrols : !1,
        method: function (a) {
          this._hideShowEl(this.ID.HEX_CONTROLS, a);
        },
      });
      this.setAttributeConfig(this.OPT.SHOW_WEBSAFE, {
        value: d.isBoolean(a.showwebsafe) ? a.showwebsafe : !0,
        method: function (a) {
          this._hideShowEl(this.ID.WEBSAFE_SWATCH, a);
        },
      });
      this.setAttributeConfig(this.OPT.SHOW_HEX_SUMMARY, {
        value: d.isBoolean(a.showhexsummary) ? a.showhexsummary : !0,
        method: function (a) {
          this._hideShowEl(this.ID.HEX_SUMMARY, a);
          a &&
            this.get(this.OPT.SHOW_HSV_CONTROLS) &&
            this.set(this.OPT.SHOW_HSV_CONTROLS, !1);
        },
      });
      this.setAttributeConfig(this.OPT.ANIMATE, {
        value: d.isBoolean(a.animate) ? a.animate : !0,
        method: function (a) {
          this.pickerSlider &&
            ((this.pickerSlider.animate = a), (this.hueSlider.animate = a));
        },
      });
      this.on(this.OPT.HUE + "Change", this._updateRGBFromHSV, this, !0);
      this.on(this.OPT.SATURATION + "Change", this._updateRGBFromHSV, this, !0);
      this.on(this.OPT.VALUE + "Change", this._updateRGBFromHSV, this, !0);
      this.on(this.OPT.RED + "Change", this._updateRGB, this, !0);
      this.on(this.OPT.GREEN + "Change", this._updateRGB, this, !0);
      this.on(this.OPT.BLUE + "Change", this._updateRGB, this, !0);
      this.on(this.OPT.HEX + "Change", this._updateHex, this, !0);
      this._initElements();
    },
  });
  YAHOO.widget.ColorPicker = c;
})();
YAHOO.register("colorpicker", YAHOO.widget.ColorPicker, {
  version: "2.7.0",
  build: "1796",
});
(function () {
  var c = YAHOO.util,
    e = function (a, c, b, e) {
      this.init(a, c, b, e);
    };
  e.NAME = "Anim";
  e.prototype = {
    toString: function () {
      var a = this.getEl() || {};
      return this.constructor.NAME + ": " + (a.id || a.tagName);
    },
    patterns: {
      noNegatives: /width|height|opacity|padding/i,
      offsetAttribute: /^((width|height)|(top|left))$/,
      defaultUnit: /width|height|top$|bottom$|left$|right$/i,
      offsetUnit: /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i,
    },
    doMethod: function (a, c, b) {
      return this.method(this.currentFrame, c, b - c, this.totalFrames);
    },
    setAttribute: function (a, d, b) {
      var e = this.getEl();
      this.patterns.noNegatives.test(a) && (d = 0 < d ? d : 0);
      "style" in e ? c.Dom.setStyle(e, a, d + b) : a in e && (e[a] = d);
    },
    getAttribute: function (a) {
      var d = this.getEl(),
        b = c.Dom.getStyle(d, a);
      if ("auto" !== b && !this.patterns.offsetUnit.test(b))
        return parseFloat(b);
      var e = this.patterns.offsetAttribute.exec(a) || [],
        g = !!e[3],
        h = !!e[2];
      "style" in d
        ? (b =
            h || ("absolute" == c.Dom.getStyle(d, "position") && g)
              ? d["offset" + e[0].charAt(0).toUpperCase() + e[0].substr(1)]
              : 0)
        : a in d && (b = d[a]);
      return b;
    },
    getDefaultUnit: function (a) {
      return this.patterns.defaultUnit.test(a) ? "px" : "";
    },
    setRuntimeAttribute: function (a) {
      var c,
        b,
        e = this.attributes;
      this.runtimeAttributes[a] = {};
      var g = function (a) {
        return "undefined" !== typeof a;
      };
      if (!g(e[a].to) && !g(e[a].by)) return !1;
      c = g(e[a].from) ? e[a].from : this.getAttribute(a);
      if (g(e[a].to)) b = e[a].to;
      else if (g(e[a].by))
        if (c.constructor == Array) {
          b = [];
          for (var h = 0, k = c.length; h < k; ++h)
            b[h] = c[h] + 1 * e[a].by[h];
        } else b = c + 1 * e[a].by;
      this.runtimeAttributes[a].start = c;
      this.runtimeAttributes[a].end = b;
      this.runtimeAttributes[a].unit = g(e[a].unit)
        ? e[a].unit
        : this.getDefaultUnit(a);
      return !0;
    },
    init: function (a, d, b, e) {
      var g = !1,
        h = null,
        k = 0;
      a = c.Dom.get(a);
      this.attributes = d || {};
      this.duration = YAHOO.lang.isUndefined(b) ? 1 : b;
      this.method = e || c.Easing.easeNone;
      this.useSeconds = !0;
      this.currentFrame = 0;
      this.totalFrames = c.AnimMgr.fps;
      this.setEl = function (b) {
        a = c.Dom.get(b);
      };
      this.getEl = function () {
        return a;
      };
      this.isAnimated = function () {
        return g;
      };
      this.getStartTime = function () {
        return h;
      };
      this.runtimeAttributes = {};
      this.animate = function () {
        if (this.isAnimated()) return !1;
        this.currentFrame = 0;
        this.totalFrames = this.useSeconds
          ? Math.ceil(c.AnimMgr.fps * this.duration)
          : this.duration;
        0 === this.duration && this.useSeconds && (this.totalFrames = 1);
        c.AnimMgr.registerElement(this);
        return !0;
      };
      this.stop = function (a) {
        if (!this.isAnimated()) return !1;
        a && ((this.currentFrame = this.totalFrames), this._onTween.fire());
        c.AnimMgr.stop(this);
      };
      this._onStart = new c.CustomEvent("_start", this, !0);
      this.onStart = new c.CustomEvent("start", this);
      this.onTween = new c.CustomEvent("tween", this);
      this._onTween = new c.CustomEvent("_tween", this, !0);
      this.onComplete = new c.CustomEvent("complete", this);
      this._onComplete = new c.CustomEvent("_complete", this, !0);
      this._onStart.subscribe(function () {
        this.onStart.fire();
        this.runtimeAttributes = {};
        for (var a in this.attributes) this.setRuntimeAttribute(a);
        g = !0;
        k = 0;
        h = new Date();
      });
      this._onTween.subscribe(function () {
        var a = {
          duration: new Date() - this.getStartTime(),
          currentFrame: this.currentFrame,
          toString: function () {
            return (
              "duration: " + a.duration + ", currentFrame: " + a.currentFrame
            );
          },
        };
        this.onTween.fire(a);
        var b = this.runtimeAttributes,
          c;
        for (c in b)
          this.setAttribute(
            c,
            this.doMethod(c, b[c].start, b[c].end),
            b[c].unit
          );
        k += 1;
      });
      this._onComplete.subscribe(function () {
        var a = (new Date() - h) / 1e3,
          b = {
            duration: a,
            frames: k,
            fps: k / a,
            toString: function () {
              return (
                "duration: " +
                b.duration +
                ", frames: " +
                b.frames +
                ", fps: " +
                b.fps
              );
            },
          };
        g = !1;
        k = 0;
        this.onComplete.fire(b);
      });
    },
  };
  c.Anim = e;
})();
YAHOO.util.AnimMgr = new (function () {
  var c = null,
    e = [],
    a = 0;
  this.fps = 1e3;
  this.delay = 1;
  this.registerElement = function (c) {
    e[e.length] = c;
    a += 1;
    c._onStart.fire();
    this.start();
  };
  this.unRegister = function (c, b) {
    var f;
    if (!(f = b))
      a: {
        f = 0;
        for (var g = e.length; f < g; ++f) if (e[f] == c) break a;
        f = -1;
      }
    b = f;
    if (!c.isAnimated() || -1 == b) return !1;
    c._onComplete.fire();
    e.splice(b, 1);
    --a;
    0 >= a && this.stop();
    return !0;
  };
  this.start = function () {
    null === c && (c = setInterval(this.run, this.delay));
  };
  this.stop = function (d) {
    if (d) this.unRegister(d);
    else {
      clearInterval(c);
      d = 0;
      for (var b = e.length; d < b; ++d) this.unRegister(e[0], 0);
      e = [];
      c = null;
      a = 0;
    }
  };
  this.run = function () {
    for (var a = 0, b = e.length; a < b; ++a) {
      var c = e[a];
      if (c && c.isAnimated())
        if (c.currentFrame < c.totalFrames || null === c.totalFrames) {
          c.currentFrame += 1;
          if (c.useSeconds) {
            var g = c,
              h = g.totalFrames,
              k = g.currentFrame,
              l = (g.currentFrame * g.duration * 1e3) / g.totalFrames,
              m = new Date() - g.getStartTime(),
              n = 0,
              n =
                m < 1e3 * g.duration
                  ? Math.round((m / l - 1) * g.currentFrame)
                  : h - (k + 1);
            0 < n &&
              isFinite(n) &&
              (g.currentFrame + n >= h && (n = h - (k + 1)),
              (g.currentFrame += n));
          }
          c._onTween.fire();
        } else YAHOO.util.AnimMgr.stop(c, a);
    }
  };
})();
YAHOO.util.Bezier = new (function () {
  this.getPosition = function (c, e) {
    for (var a = c.length, d = [], b = 0; b < a; ++b) d[b] = [c[b][0], c[b][1]];
    for (var f = 1; f < a; ++f)
      for (b = 0; b < a - f; ++b)
        (d[b][0] = (1 - e) * d[b][0] + e * d[parseInt(b + 1, 10)][0]),
          (d[b][1] = (1 - e) * d[b][1] + e * d[parseInt(b + 1, 10)][1]);
    return [d[0][0], d[0][1]];
  };
})();
(function () {
  var c = function (a, d, e, h) {
    c.superclass.constructor.call(this, a, d, e, h);
  };
  c.NAME = "ColorAnim";
  c.DEFAULT_BGCOLOR = "#fff";
  var e = YAHOO.util;
  YAHOO.extend(c, e.Anim);
  var a = c.superclass,
    d = c.prototype;
  d.patterns.color = /color$/i;
  d.patterns.rgb = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;
  d.patterns.hex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  d.patterns.hex3 = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;
  d.patterns.transparent = /^transparent|rgba\(0, 0, 0, 0\)$/;
  d.parseColor = function (a) {
    if (3 == a.length) return a;
    var c = this.patterns.hex.exec(a);
    return c && 4 == c.length
      ? [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)]
      : (c = this.patterns.rgb.exec(a)) && 4 == c.length
      ? [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)]
      : (c = this.patterns.hex3.exec(a)) && 4 == c.length
      ? [
          parseInt(c[1] + c[1], 16),
          parseInt(c[2] + c[2], 16),
          parseInt(c[3] + c[3], 16),
        ]
      : null;
  };
  d.getAttribute = function (b) {
    var d = this.getEl();
    if (this.patterns.color.test(b)) {
      var g = YAHOO.util.Dom.getStyle(d, b),
        h = this;
      this.patterns.transparent.test(g) &&
        (g = (d = YAHOO.util.Dom.getAncestorBy(d, function (a) {
          return !h.patterns.transparent.test(g);
        }))
          ? e.Dom.getStyle(d, b)
          : c.DEFAULT_BGCOLOR);
    } else g = a.getAttribute.call(this, b);
    return g;
  };
  d.doMethod = function (b, c, d) {
    var e;
    if (this.patterns.color.test(b)) {
      e = [];
      for (var k = 0, l = c.length; k < l; ++k)
        e[k] = a.doMethod.call(this, b, c[k], d[k]);
      e =
        "rgb(" +
        Math.floor(e[0]) +
        "," +
        Math.floor(e[1]) +
        "," +
        Math.floor(e[2]) +
        ")";
    } else e = a.doMethod.call(this, b, c, d);
    return e;
  };
  d.setRuntimeAttribute = function (b) {
    a.setRuntimeAttribute.call(this, b);
    if (this.patterns.color.test(b)) {
      var c = this.attributes,
        d = this.parseColor(this.runtimeAttributes[b].start),
        e = this.parseColor(this.runtimeAttributes[b].end);
      if ("undefined" === typeof c[b].to && "undefined" !== typeof c[b].by)
        for (var e = this.parseColor(c[b].by), c = 0, k = d.length; c < k; ++c)
          e[c] = d[c] + e[c];
      this.runtimeAttributes[b].start = d;
      this.runtimeAttributes[b].end = e;
    }
  };
  e.ColorAnim = c;
})();
YAHOO.util.Easing = {
  easeNone: function (c, e, a, d) {
    return (a * c) / d + e;
  },
  easeIn: function (c, e, a, d) {
    return a * (c /= d) * c + e;
  },
  easeOut: function (c, e, a, d) {
    return -a * (c /= d) * (c - 2) + e;
  },
  easeBoth: function (c, e, a, d) {
    return 1 > (c /= d / 2)
      ? (a / 2) * c * c + e
      : (-a / 2) * (--c * (c - 2) - 1) + e;
  },
  easeInStrong: function (c, e, a, d) {
    return a * (c /= d) * c * c * c + e;
  },
  easeOutStrong: function (c, e, a, d) {
    return -a * ((c = c / d - 1) * c * c * c - 1) + e;
  },
  easeBothStrong: function (c, e, a, d) {
    return 1 > (c /= d / 2)
      ? (a / 2) * c * c * c * c + e
      : (-a / 2) * ((c -= 2) * c * c * c - 2) + e;
  },
  elasticIn: function (c, e, a, d, b, f) {
    if (0 == c) return e;
    if (1 == (c /= d)) return e + a;
    f || (f = 0.3 * d);
    !b || b < Math.abs(a)
      ? ((b = a), (a = f / 4))
      : (a = (f / (2 * Math.PI)) * Math.asin(a / b));
    return (
      -(b * Math.pow(2, 10 * --c) * Math.sin((2 * (c * d - a) * Math.PI) / f)) +
      e
    );
  },
  elasticOut: function (c, e, a, d, b, f) {
    if (0 == c) return e;
    if (1 == (c /= d)) return e + a;
    f || (f = 0.3 * d);
    if (!b || b < Math.abs(a)) {
      b = a;
      var g = f / 4;
    } else g = (f / (2 * Math.PI)) * Math.asin(a / b);
    return (
      b * Math.pow(2, -10 * c) * Math.sin((2 * (c * d - g) * Math.PI) / f) +
      a +
      e
    );
  },
  elasticBoth: function (c, e, a, d, b, f) {
    if (0 == c) return e;
    if (2 == (c /= d / 2)) return e + a;
    f || (f = 0.3 * d * 1.5);
    if (!b || b < Math.abs(a)) {
      b = a;
      var g = f / 4;
    } else g = (f / (2 * Math.PI)) * Math.asin(a / b);
    return 1 > c
      ? -0.5 *
          b *
          Math.pow(2, 10 * --c) *
          Math.sin((2 * (c * d - g) * Math.PI) / f) +
          e
      : b *
          Math.pow(2, -10 * --c) *
          Math.sin((2 * (c * d - g) * Math.PI) / f) *
          0.5 +
          a +
          e;
  },
  backIn: function (c, e, a, d, b) {
    "undefined" == typeof b && (b = 1.70158);
    return a * (c /= d) * c * ((b + 1) * c - b) + e;
  },
  backOut: function (c, e, a, d, b) {
    "undefined" == typeof b && (b = 1.70158);
    return a * ((c = c / d - 1) * c * ((b + 1) * c + b) + 1) + e;
  },
  backBoth: function (c, e, a, d, b) {
    "undefined" == typeof b && (b = 1.70158);
    return 1 > (c /= d / 2)
      ? (a / 2) * c * c * (((b *= 1.525) + 1) * c - b) + e
      : (a / 2) * ((c -= 2) * c * (((b *= 1.525) + 1) * c + b) + 2) + e;
  },
  bounceIn: function (c, e, a, d) {
    return a - YAHOO.util.Easing.bounceOut(d - c, 0, a, d) + e;
  },
  bounceOut: function (c, e, a, d) {
    return (c /= d) < 1 / 2.75
      ? 7.5625 * a * c * c + e
      : c < 2 / 2.75
      ? a * (7.5625 * (c -= 1.5 / 2.75) * c + 0.75) + e
      : c < 2.5 / 2.75
      ? a * (7.5625 * (c -= 2.25 / 2.75) * c + 0.9375) + e
      : a * (7.5625 * (c -= 2.625 / 2.75) * c + 0.984375) + e;
  },
  bounceBoth: function (c, e, a, d) {
    return c < d / 2
      ? 0.5 * YAHOO.util.Easing.bounceIn(2 * c, 0, a, d) + e
      : 0.5 * YAHOO.util.Easing.bounceOut(2 * c - d, 0, a, d) + 0.5 * a + e;
  },
};
(function () {
  var c = function (a, b, d, e) {
    a && c.superclass.constructor.call(this, a, b, d, e);
  };
  c.NAME = "Motion";
  var e = YAHOO.util;
  YAHOO.extend(c, e.ColorAnim);
  var a = c.superclass,
    d = c.prototype;
  d.patterns.points = /^points$/i;
  d.setAttribute = function (b, c, d) {
    this.patterns.points.test(b)
      ? ((d = d || "px"),
        a.setAttribute.call(this, "left", c[0], d),
        a.setAttribute.call(this, "top", c[1], d))
      : a.setAttribute.call(this, b, c, d);
  };
  d.getAttribute = function (b) {
    return this.patterns.points.test(b)
      ? [a.getAttribute.call(this, "left"), a.getAttribute.call(this, "top")]
      : a.getAttribute.call(this, b);
  };
  d.doMethod = function (b, c, d) {
    var f = null;
    this.patterns.points.test(b)
      ? ((c = this.method(this.currentFrame, 0, 100, this.totalFrames) / 100),
        (f = e.Bezier.getPosition(this.runtimeAttributes[b], c)))
      : (f = a.doMethod.call(this, b, c, d));
    return f;
  };
  d.setRuntimeAttribute = function (c) {
    if (this.patterns.points.test(c)) {
      var d = this.getEl(),
        k = this.attributes,
        l = k.points.control || [],
        m,
        n,
        p;
      if (0 < l.length && !(l[0] instanceof Array)) l = [l];
      else {
        var q = [];
        n = 0;
        for (p = l.length; n < p; ++n) q[n] = l[n];
        l = q;
      }
      "static" == e.Dom.getStyle(d, "position") &&
        e.Dom.setStyle(d, "position", "relative");
      f(k.points.from)
        ? e.Dom.setXY(d, k.points.from)
        : e.Dom.setXY(d, e.Dom.getXY(d));
      d = this.getAttribute("points");
      if (f(k.points.to))
        for (
          m = b.call(this, k.points.to, d),
            e.Dom.getXY(this.getEl()),
            n = 0,
            p = l.length;
          n < p;
          ++n
        )
          l[n] = b.call(this, l[n], d);
      else if (f(k.points.by))
        for (
          m = [d[0] + k.points.by[0], d[1] + k.points.by[1]],
            n = 0,
            p = l.length;
          n < p;
          ++n
        )
          l[n] = [d[0] + l[n][0], d[1] + l[n][1]];
      this.runtimeAttributes[c] = [d];
      0 < l.length &&
        (this.runtimeAttributes[c] = this.runtimeAttributes[c].concat(l));
      this.runtimeAttributes[c][this.runtimeAttributes[c].length] = m;
    } else a.setRuntimeAttribute.call(this, c);
  };
  var b = function (a, b) {
      var c = e.Dom.getXY(this.getEl());
      return (a = [a[0] - c[0] + b[0], a[1] - c[1] + b[1]]);
    },
    f = function (a) {
      return "undefined" !== typeof a;
    };
  e.Motion = c;
})();
(function () {
  var c = function (a, d, e, h) {
    a && c.superclass.constructor.call(this, a, d, e, h);
  };
  c.NAME = "Scroll";
  var e = YAHOO.util;
  YAHOO.extend(c, e.ColorAnim);
  var a = c.superclass,
    d = c.prototype;
  d.doMethod = function (b, c, d) {
    var e = null;
    return (e =
      "scroll" == b
        ? [
            this.method(this.currentFrame, c[0], d[0] - c[0], this.totalFrames),
            this.method(this.currentFrame, c[1], d[1] - c[1], this.totalFrames),
          ]
        : a.doMethod.call(this, b, c, d));
  };
  d.getAttribute = function (b) {
    var c = null,
      c = this.getEl();
    return (c =
      "scroll" == b
        ? [c.scrollLeft, c.scrollTop]
        : a.getAttribute.call(this, b));
  };
  d.setAttribute = function (b, c, d) {
    var e = this.getEl();
    "scroll" == b
      ? ((e.scrollLeft = c[0]), (e.scrollTop = c[1]))
      : a.setAttribute.call(this, b, c, d);
  };
  e.Scroll = c;
})();
YAHOO.register("animation", YAHOO.util.Anim, {
  version: "2.7.0",
  build: "1799",
});
