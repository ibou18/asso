!(function (i, s) {
  (window.console = window.console || {
    log: function () {},
    error: function () {},
  }),
    (i.fn.footable = function (i, n) {
      return (
        (i = i || {}),
        this.filter("table").each(function (t, e) {
          s.init(e, i, n);
        })
      );
    });
  var n = { events: [] };
  (s.__debug__ = JSON.parse(localStorage.getItem("footable_debug")) || !1),
    (s.__debug_options__ =
      JSON.parse(localStorage.getItem("footable_debug_options")) || n),
    (s.debug = function (t, e) {
      return s.is.boolean(t)
        ? ((s.__debug__ = t),
          void (s.__debug__
            ? (localStorage.setItem(
                "footable_debug",
                JSON.stringify(s.__debug__)
              ),
              (s.__debug_options__ = i.extend(!0, {}, n, e || {})),
              s.is.hash(e) &&
                localStorage.setItem(
                  "footable_debug_options",
                  JSON.stringify(s.__debug_options__)
                ))
            : (localStorage.removeItem("footable_debug"),
              localStorage.removeItem("footable_debug_options"))))
        : s.__debug__;
    }),
    (s.get = function (t) {
      return i(t).first().data("__FooTable__");
    }),
    (s.init = function (t, e, i) {
      var n = s.get(t);
      return n instanceof s.Table && n.destroy(), new s.Table(t, e, i);
    }),
    (s.getRow = function (t) {
      var e = i(t).closest("tr");
      return (
        e.hasClass("footable-detail-row") && (e = e.prev()),
        e.data("__FooTableRow__")
      );
    });
})(jQuery, (FooTable = window.FooTable || {})),
  (function (a) {
    var s = function () {
      return !0;
    };
    (a.arr = {}),
      (a.arr.each = function (t, e) {
        if (a.is.array(t) && a.is.fn(e))
          for (var i = 0, n = t.length; i < n && !1 !== e(t[i], i); i++);
      }),
      (a.arr.get = function (t, e) {
        var i = [];
        if (!a.is.array(t)) return i;
        if (!a.is.fn(e)) return t;
        for (var n = 0, s = t.length; n < s; n++) e(t[n], n) && i.push(t[n]);
        return i;
      }),
      (a.arr.any = function (t, e) {
        if (!a.is.array(t)) return !1;
        e = a.is.fn(e) ? e : s;
        for (var i = 0, n = t.length; i < n; i++) if (e(t[i], i)) return !0;
        return !1;
      }),
      (a.arr.contains = function (t, e) {
        if (!a.is.array(t) || a.is.undef(e)) return !1;
        for (var i = 0, n = t.length; i < n; i++) if (t[i] == e) return !0;
        return !1;
      }),
      (a.arr.first = function (t, e) {
        if (!a.is.array(t)) return null;
        e = a.is.fn(e) ? e : s;
        for (var i = 0, n = t.length; i < n; i++) if (e(t[i], i)) return t[i];
        return null;
      }),
      (a.arr.map = function (t, e) {
        var i = [],
          n = null;
        if (!a.is.array(t) || !a.is.fn(e)) return i;
        for (var s = 0, o = t.length; s < o; s++)
          null != (n = e(t[s], s)) && i.push(n);
        return i;
      }),
      (a.arr.remove = function (t, e) {
        var i = [],
          n = [];
        if (!a.is.array(t) || !a.is.fn(e)) return n;
        for (var s = 0, o = t.length; s < o; s++)
          e(t[s], s, n) && (i.push(s), n.push(t[s]));
        for (
          i.sort(function (t, e) {
            return e - t;
          }),
            s = 0,
            o = i.length;
          s < o;
          s++
        ) {
          var r = i[s] - s;
          t.splice(r, 1);
        }
        return n;
      }),
      (a.arr.delete = function (t, e) {
        var i = -1,
          n = null;
        if (!a.is.array(t) || a.is.undef(e)) return n;
        for (var s = 0, o = t.length; s < o; s++)
          if (t[s] == e) {
            n = t[(i = s)];
            break;
          }
        return -1 != i && t.splice(i, 1), n;
      }),
      (a.arr.replace = function (t, e, i) {
        var n = t.indexOf(e);
        -1 !== n && (t[n] = i);
      });
  })(FooTable),
  (function (i) {
    (i.is = {}),
      (i.is.type = function (t, e) {
        return typeof t === e;
      }),
      (i.is.defined = function (t) {
        return void 0 !== t;
      }),
      (i.is.undef = function (t) {
        return void 0 === t;
      }),
      (i.is.array = function (t) {
        return "[object Array]" === Object.prototype.toString.call(t);
      }),
      (i.is.date = function (t) {
        return (
          "[object Date]" === Object.prototype.toString.call(t) &&
          !isNaN(t.getTime())
        );
      }),
      (i.is.boolean = function (t) {
        return "[object Boolean]" === Object.prototype.toString.call(t);
      }),
      (i.is.string = function (t) {
        return "[object String]" === Object.prototype.toString.call(t);
      }),
      (i.is.number = function (t) {
        return (
          "[object Number]" === Object.prototype.toString.call(t) && !isNaN(t)
        );
      }),
      (i.is.fn = function (t) {
        return (
          (i.is.defined(window) && t === window.alert) ||
          "[object Function]" === Object.prototype.toString.call(t)
        );
      }),
      (i.is.error = function (t) {
        return "[object Error]" === Object.prototype.toString.call(t);
      }),
      (i.is.object = function (t) {
        return "[object Object]" === Object.prototype.toString.call(t);
      }),
      (i.is.hash = function (t) {
        return (
          i.is.object(t) &&
          t.constructor === Object &&
          !t.nodeType &&
          !t.setInterval
        );
      }),
      (i.is.element = function (t) {
        return "object" == typeof HTMLElement
          ? t instanceof HTMLElement
          : t &&
              "object" == typeof t &&
              null !== t &&
              1 === t.nodeType &&
              "string" == typeof t.nodeName;
      }),
      (i.is.promise = function (t) {
        return i.is.object(t) && i.is.fn(t.then) && i.is.fn(t.promise);
      }),
      (i.is.jq = function (t) {
        return (
          i.is.defined(window.jQuery) && t instanceof jQuery && 0 < t.length
        );
      }),
      (i.is.moment = function (t) {
        return (
          i.is.defined(window.moment) &&
          i.is.object(t) &&
          i.is.boolean(t._isAMomentObject)
        );
      }),
      (i.is.emptyObject = function (t) {
        if (!i.is.hash(t)) return !1;
        for (var e in t) if (t.hasOwnProperty(e)) return !1;
        return !0;
      }),
      (i.is.emptyArray = function (t) {
        return !i.is.array(t) || 0 === t.length;
      }),
      (i.is.emptyString = function (t) {
        return !i.is.string(t) || 0 === t.length;
      });
  })(FooTable),
  (function (r) {
    (r.str = {}),
      (r.str.contains = function (t, e, i) {
        return (
          !r.is.emptyString(t) &&
          !r.is.emptyString(e) &&
          e.length <= t.length &&
          -1 !== (i ? t.toUpperCase().indexOf(e.toUpperCase()) : t.indexOf(e))
        );
      }),
      (r.str.containsExact = function (t, e, i) {
        return (
          !(
            r.is.emptyString(t) ||
            r.is.emptyString(e) ||
            e.length > t.length
          ) &&
          new RegExp("\\b" + r.str.escapeRegExp(e) + "\\b", i ? "i" : "").test(
            t
          )
        );
      }),
      (r.str.containsWord = function (t, e, i) {
        if (r.is.emptyString(t) || r.is.emptyString(e) || t.length < e.length)
          return !1;
        for (var n = t.split(/\W/), s = 0, o = n.length; s < o; s++)
          if (i ? n[s].toUpperCase() == e.toUpperCase() : n[s] == e) return !0;
        return !1;
      }),
      (r.str.from = function (t, e) {
        return r.is.emptyString(t)
          ? t
          : r.str.contains(t, e)
          ? t.substring(t.indexOf(e) + 1)
          : t;
      }),
      (r.str.startsWith = function (t, e) {
        return r.is.emptyString(t) ? t == e : t.slice(0, e.length) == e;
      }),
      (r.str.toCamelCase = function (t) {
        return r.is.emptyString(t)
          ? t
          : t.toUpperCase() === t
          ? t.toLowerCase()
          : t.replace(/^([A-Z])|[-\s_](\w)/g, function (t, e, i) {
              return r.is.string(i) ? i.toUpperCase() : e.toLowerCase();
            });
      }),
      (r.str.random = function (t) {
        return (
          (t = r.is.emptyString(t) ? "" : t) +
          Math.random().toString(36).substr(2, 9)
        );
      }),
      (r.str.escapeRegExp = function (t) {
        return r.is.emptyString(t)
          ? t
          : t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      });
  })(FooTable),
  (function (u) {
    "use strict";
    function l() {}
    var i;
    Object.create ||
      (Object.create =
        ((i = function () {}),
        function (t) {
          if (1 < arguments.length)
            throw Error("Second argument not supported");
          if (!u.is.object(t)) throw TypeError("Argument must be an object");
          i.prototype = t;
          var e = new i();
          return (i.prototype = null), e;
        }));
    var c = /xyz/.test(function () {
      xyz;
    })
      ? /\b_super\b/
      : /.*/;
    (l.__extend__ = function (t, e, i, n) {
      var s;
      t[e] =
        u.is.fn(n) && c.test(i)
          ? ((s = i),
            function () {
              var t, e;
              return (
                (t = this._super),
                (this._super = n),
                (e = s.apply(this, arguments)),
                (this._super = t),
                e
              );
            })
          : i;
    }),
      (l.extend = function (t, e) {
        function i(t, e, i, n) {
          var s, o;
          t[e] =
            u.is.fn(n) && c.test(i)
              ? ((s = i),
                (o = n),
                function () {
                  var t, e;
                  return (
                    (t = this._super),
                    (this._super = o),
                    (e = s.apply(this, arguments)),
                    (this._super = t),
                    e
                  );
                })
              : i;
        }
        var n = Array.prototype.slice.call(arguments);
        if (((t = n.shift()), (e = n.shift()), u.is.hash(t))) {
          var s = Object.create(this.prototype),
            o = this.prototype;
          for (var r in t) "__ctor__" !== r && i(s, r, t[r], o[r]);
          var a = u.is.fn(s.__ctor__)
            ? s.__ctor__
            : function () {
                if (!u.is.fn(this.construct))
                  throw new SyntaxError(
                    'FooTable class objects must be constructed with the "new" keyword.'
                  );
                this.construct.apply(this, arguments);
              };
          return (
            (s.construct = u.is.fn(s.construct) ? s.construct : function () {}),
            (((a.prototype = s).constructor = a).extend = l.extend),
            a
          );
        }
        u.is.string(t) &&
          u.is.fn(e) &&
          i(this.prototype, t, e, this.prototype[t]);
      }),
      (u.className = l),
      (u.ClassFactory = u.Class.extend({
        construct: function () {
          this.registered = {};
        },
        contains: function (t) {
          return u.is.defined(this.registered[t]);
        },
        names: function () {
          var t,
            e = [];
          for (t in this.registered)
            this.registered.hasOwnProperty(t) && e.push(t);
          return e;
        },
        register: function (t, e, i) {
          if (u.is.string(t) && u.is.fn(e)) {
            var n = this.registered[t];
            this.registered[t] = {
              name: t,
              klass: e,
              priority: u.is.number(i) ? i : u.is.defined(n) ? n.priority : 0,
            };
          }
        },
        load: function (t, e, i) {
          var n,
            s,
            o = this,
            r = Array.prototype.slice.call(arguments),
            a = [],
            l = [];
          for (n in ((t = r.shift() || {}), o.registered))
            if (o.registered.hasOwnProperty(n)) {
              var c = o.registered[n];
              t.hasOwnProperty(n) &&
                ((s = t[n]),
                u.is.string(s) && (s = u.getFnPointer(t[n])),
                u.is.fn(s) &&
                  (c = {
                    name: n,
                    klass: s,
                    priority: o.registered[n].priority,
                  })),
                a.push(c);
            }
          for (n in t)
            t.hasOwnProperty(n) &&
              !o.registered.hasOwnProperty(n) &&
              ((s = t[n]),
              u.is.string(s) && (s = u.getFnPointer(t[n])),
              u.is.fn(s) && a.push({ name: n, klass: s, priority: 0 }));
          return (
            a.sort(function (t, e) {
              return e.priority - t.priority;
            }),
            u.arr.each(a, function (t) {
              u.is.fn(t.klass) && l.push(o._make(t.klass, r));
            }),
            l
          );
        },
        make: function (t, e, i) {
          var n,
            s = Array.prototype.slice.call(arguments);
          return (
            (t = s.shift()),
            (n = this.registered[t]),
            u.is.fn(n.klass) ? this._make(n.klass, s) : null
          );
        },
        _make: function (t, e) {
          function i() {
            return t.apply(this, e);
          }
          return (i.prototype = t.prototype), new i();
        },
      }));
  })(FooTable),
  (function (l, c) {
    (c.css2json = function (t) {
      if (c.is.emptyString(t)) return {};
      for (
        var e, i, n, s = {}, o = t.split(";"), r = 0, a = o.length;
        r < a;
        r++
      )
        c.is.emptyString(o[r]) ||
          ((e = o[r].split(":")),
          c.is.emptyString(e[0]) ||
            c.is.emptyString(e[1]) ||
            ((i = c.str.toCamelCase(l.trim(e[0]))),
            (n = l.trim(e[1])),
            (s[i] = n)));
      return s;
    }),
      (c.getFnPointer = function (t) {
        if (c.is.emptyString(t)) return null;
        var e = window,
          i = t.split(".");
        return (
          c.arr.each(i, function (t) {
            e[t] && (e = e[t]);
          }),
          c.is.fn(e) ? e : null
        );
      }),
      (c.checkFnValue = function (t, e, i) {
        function n(t, e, i) {
          return c.is.fn(e)
            ? function () {
                return e.apply(t, arguments);
              }
            : i;
        }
        return (
          (i = c.is.fn(i) ? i : null),
          c.is.fn(e)
            ? n(t, e, i)
            : c.is.type(e, "string")
            ? n(t, c.getFnPointer(e), i)
            : i
        );
      });
  })(jQuery, FooTable),
  (function (o, r) {
    r.Cell = r.Class.extend({
      construct: function (t, e, i, n) {
        (this.ft = t),
          (this.row = e),
          (this.column = i),
          (this.created = !1),
          this.define(n);
      },
      define: function (t) {
        (this.$el = r.is.element(t) || r.is.jq(t) ? o(t) : null),
          (this.$detail = null);
        var e = r.is.hash(t) && r.is.hash(t.options) && r.is.defined(t.value);
        (this.value = this.column.parser.call(
          this.column,
          r.is.jq(this.$el) ? this.$el : e ? t.value : t,
          this.ft.o
        )),
          (this.o = o.extend(
            !0,
            { classes: null, style: null },
            e ? t.options : {}
          )),
          (this.classes =
            r.is.jq(this.$el) && this.$el.attr("class")
              ? this.$el.attr("class").match(/\S+/g)
              : r.is.array(this.o.classes)
              ? this.o.classes
              : r.is.string(this.o.classes)
              ? this.o.classes.match(/\S+/g)
              : []),
          (this.style =
            r.is.jq(this.$el) && this.$el.attr("style")
              ? r.css2json(this.$el.attr("style"))
              : r.is.hash(this.o.style)
              ? this.o.style
              : r.is.string(this.o.style)
              ? r.css2json(this.o.style)
              : {});
      },
      $create: function () {
        this.created ||
          ((this.$el = r.is.jq(this.$el) ? this.$el : o("<td/>"))
            .data("value", this.value)
            .contents()
            .detach()
            .end()
            .append(this.format(this.value)),
          this._setClasses(this.$el),
          this._setStyle(this.$el),
          (this.$detail = o("<tr/>")
            .addClass(this.row.classes.join(" "))
            .data("__FooTableCell__", this)
            .append(o("<th/>"))
            .append(o("<td/>"))),
          (this.created = !0));
      },
      collapse: function () {
        this.created &&
          (this.$detail.children("th").html(this.column.title),
          this.$el
            .clone()
            .attr(
              "id",
              this.$el.attr("id") ? this.$el.attr("id") + "-detail" : void 0
            )
            .css("display", "table-cell")
            .html("")
            .append(this.$el.contents().detach())
            .replaceAll(this.$detail.children("td").first()),
          r.is.jq(this.$detail.parent()) ||
            this.$detail.appendTo(
              this.row.$details.find(".footable-details > tbody")
            ));
      },
      restore: function () {
        if (this.created) {
          if (r.is.jq(this.$detail.parent())) {
            var t = this.$detail.children("td").first();
            this.$el
              .attr("class", t.attr("class"))
              .attr("style", t.attr("style"))
              .css(
                "display",
                this.column.hidden || !this.column.visible
                  ? "none"
                  : "table-cell"
              )
              .append(t.contents().detach());
          }
          this.$detail.detach();
        }
      },
      parse: function () {
        return this.column.parser.call(this.column, this.$el, this.ft.o);
      },
      format: function (t) {
        return this.column.formatter.call(this.column, t, this.ft.o);
      },
      val: function (t, e) {
        if (r.is.undef(t)) return this.value;
        var i = r.is.hash(t) && r.is.hash(t.options) && r.is.defined(t.value);
        if (
          ((this.o = o.extend(
            !0,
            { classes: this.classes, style: this.style },
            i ? t.options : {}
          )),
          (this.value = i ? t.value : t),
          (this.classes = r.is.array(this.o.classes)
            ? this.o.classes
            : r.is.string(this.o.classes)
            ? this.o.classes.match(/\S+/g)
            : []),
          (this.style = r.is.hash(this.o.style)
            ? this.o.style
            : r.is.string(this.o.style)
            ? r.css2json(this.o.style)
            : {}),
          this.created)
        ) {
          this.$el.data("value", this.value).empty();
          var n = this.$detail.children("td").first().empty(),
            s = r.is.jq(this.$detail.parent()) ? n : this.$el;
          s.append(this.format(this.value)),
            this._setClasses(s),
            this._setStyle(s),
            (!r.is.boolean(e) || e) && this.row.draw();
        }
      },
      _setClasses: function (t) {
        var e = !r.is.emptyArray(this.column.classes),
          i = !r.is.emptyArray(this.classes),
          n = null;
        t.removeAttr("class"),
          (e || i) &&
            (e && i
              ? (n = this.classes.concat(this.column.classes).join(" "))
              : e
              ? (n = this.column.classes.join(" "))
              : i && (n = this.classes.join(" ")),
            r.is.emptyString(n) || t.addClass(n));
      },
      _setStyle: function (t) {
        var e = !r.is.emptyObject(this.column.style),
          i = !r.is.emptyObject(this.style),
          n = null;
        t.removeAttr("style"),
          (e || i) &&
            (e && i
              ? (n = o.extend({}, this.column.style, this.style))
              : e
              ? (n = this.column.style)
              : i && (n = this.style),
            r.is.hash(n) && t.css(n));
      },
    });
  })(jQuery, FooTable),
  (function (i, n) {
    (n.Column = n.Class.extend({
      construct: function (t, e, i) {
        (this.ft = t),
          (this.type = n.is.emptyString(i) ? "text" : i),
          (this.virtual = !!n.is.boolean(e.virtual) && e.virtual),
          (this.$el = n.is.jq(e.$el) ? e.$el : null),
          (this.index = n.is.number(e.index) ? e.index : -1),
          this.define(e),
          this.$create();
      },
      define: function (t) {
        (this.hidden = !!n.is.boolean(t.hidden) && t.hidden),
          (this.visible = !n.is.boolean(t.visible) || t.visible),
          (this.name = n.is.string(t.name) ? t.name : null),
          null == this.name && (this.name = "col" + (t.index + 1)),
          (this.title = n.is.string(t.title) ? t.title : null),
          !this.virtual &&
            null == this.title &&
            n.is.jq(this.$el) &&
            (this.title = this.$el.html()),
          null == this.title && (this.title = "Column " + (t.index + 1)),
          (this.style = n.is.hash(t.style)
            ? t.style
            : n.is.string(t.style)
            ? n.css2json(t.style)
            : {}),
          (this.classes = n.is.array(t.classes)
            ? t.classes
            : n.is.string(t.classes)
            ? t.classes.match(/\S+/g)
            : []),
          (this.parser = n.checkFnValue(this, t.parser, this.parser)),
          (this.formatter = n.checkFnValue(this, t.formatter, this.formatter));
      },
      $create: function () {
        (this.$el = !this.virtual && n.is.jq(this.$el) ? this.$el : i("<th/>"))
          .html(this.title)
          .addClass(this.classes.join(" "))
          .css(this.style);
      },
      parser: function (t) {
        if (n.is.element(t) || n.is.jq(t)) {
          var e = i(t).data("value");
          return n.is.defined(e) ? e : i(t).html();
        }
        return n.is.defined(t) && null != t ? t + "" : null;
      },
      formatter: function (t) {
        return null == t ? "" : t;
      },
      createCell: function (t) {
        var e = n.is.jq(t.$el) ? t.$el.children("td,th").get(this.index) : null,
          i = n.is.hash(t.value) ? t.value[this.name] : null;
        return new n.Cell(this.ft, t, this, e || i);
      },
    })),
      (n.columns = new n.ClassFactory()),
      n.columns.register("text", n.Column);
  })(jQuery, FooTable),
  (function (t, i) {
    (i.Component = i.Class.extend({
      construct: function (t, e) {
        if (!(t instanceof i.Table))
          throw new TypeError(
            "The instance parameter must be an instance of FooTable.Table."
          );
        (this.ft = t), (this.enabled = !!i.is.boolean(e) && e);
      },
      preinit: function (t) {},
      init: function () {},
      destroy: function () {},
      predraw: function () {},
      draw: function () {},
      postdraw: function () {},
    })),
      (i.components = new i.ClassFactory());
  })(jQuery, FooTable),
  (function (t, e) {
    (e.Defaults = function () {
      (this.stopPropagation = !1), (this.on = null);
    }),
      (e.defaults = new e.Defaults());
  })(jQuery, FooTable),
  (function (r, a) {
    a.Row = a.Class.extend({
      construct: function (t, e, i) {
        (this.ft = t), (this.columns = e), (this.created = !1), this.define(i);
      },
      define: function (t) {
        (this.$el = a.is.element(t) || a.is.jq(t) ? r(t) : null),
          (this.$toggle = r("<span/>", {
            class: "footable-toggle fooicon fooicon-plus",
          }));
        var e = a.is.hash(t),
          i = e && a.is.hash(t.options) && a.is.hash(t.value);
        (this.value = e ? (i ? t.value : t) : null),
          (this.o = r.extend(
            !0,
            { expanded: !1, classes: null, style: null },
            i ? t.options : {}
          )),
          (this.expanded =
            (a.is.jq(this.$el) && this.$el.data("expanded")) ||
            this.o.expanded),
          (this.classes =
            a.is.jq(this.$el) && this.$el.attr("class")
              ? this.$el.attr("class").match(/\S+/g)
              : a.is.array(this.o.classes)
              ? this.o.classes
              : a.is.string(this.o.classes)
              ? this.o.classes.match(/\S+/g)
              : []),
          (this.style =
            a.is.jq(this.$el) && this.$el.attr("style")
              ? a.css2json(this.$el.attr("style"))
              : a.is.hash(this.o.style)
              ? this.o.style
              : a.is.string(this.o.style)
              ? a.css2json(this.o.style)
              : {}),
          (this.cells = this.createCells());
        var n = this;
        (n.value = {}),
          a.arr.each(n.cells, function (t) {
            n.value[t.column.name] = t.val();
          });
      },
      $create: function () {
        if (!this.created) {
          (this.$el = a.is.jq(this.$el) ? this.$el : r("<tr/>")).data(
            "__FooTableRow__",
            this
          ),
            this._setClasses(this.$el),
            this._setStyle(this.$el),
            "last" == this.ft.rows.toggleColumn &&
              this.$toggle.addClass("last-column"),
            (this.$details = r("<tr/>", {
              class: "footable-detail-row",
            }).append(
              r("<td/>", { colspan: this.ft.columns.visibleColspan }).append(
                r("<table/>", {
                  class: "footable-details " + this.ft.classes.join(" "),
                }).append("<tbody/>")
              )
            ));
          var e = this;
          a.arr.each(e.cells, function (t) {
            t.created || t.$create(), e.$el.append(t.$el);
          }),
            e.$el
              .off("click.ft.row")
              .on("click.ft.row", { self: e }, e._onToggle),
            (this.created = !0);
        }
      },
      createCells: function () {
        var e = this;
        return a.arr.map(e.columns, function (t) {
          return t.createCell(e);
        });
      },
      val: function (t, e) {
        var i = this;
        if (!a.is.hash(t))
          return (
            (a.is.hash(this.value) && !a.is.emptyObject(this.value)) ||
              ((this.value = {}),
              a.arr.each(this.cells, function (t) {
                i.value[t.column.name] = t.val();
              })),
            this.value
          );
        this.collapse(!1);
        var n = a.is.hash(t),
          s = n && a.is.hash(t.options) && a.is.hash(t.value);
        if (
          ((this.o = r.extend(
            !0,
            { expanded: i.expanded, classes: i.classes, style: i.style },
            s ? t.options : {}
          )),
          (this.expanded = this.o.expanded),
          (this.classes = a.is.array(this.o.classes)
            ? this.o.classes
            : a.is.string(this.o.classes)
            ? this.o.classes.match(/\S+/g)
            : []),
          (this.style = a.is.hash(this.o.style)
            ? this.o.style
            : a.is.string(this.o.style)
            ? a.css2json(this.o.style)
            : {}),
          n)
        )
          if ((s && (t = t.value), a.is.hash(this.value)))
            for (var o in t) t.hasOwnProperty(o) && (this.value[o] = t[o]);
          else this.value = t;
        else this.value = null;
        a.arr.each(this.cells, function (t) {
          a.is.defined(i.value[t.column.name]) &&
            t.val(i.value[t.column.name], !1);
        }),
          this.created &&
            (this._setClasses(this.$el),
            this._setStyle(this.$el),
            (!a.is.boolean(e) || e) && this.draw());
      },
      _setClasses: function (t) {
        var e = !a.is.emptyArray(this.classes),
          i = null;
        t.removeAttr("class"),
          e &&
            ((i = this.classes.join(" ")),
            a.is.emptyString(i) || t.addClass(i));
      },
      _setStyle: function (t) {
        var e = !a.is.emptyObject(this.style),
          i = null;
        t.removeAttr("style"),
          e && ((i = this.style), a.is.hash(i) && t.css(i));
      },
      expand: function () {
        if (this.created) {
          var t = this;
          t.ft.raise("expand.ft.row", [t]).then(function () {
            (t.__hidden__ = a.arr.map(t.cells, function (t) {
              return t.column.hidden && t.column.visible ? t : null;
            })),
              0 < t.__hidden__.length &&
                (t.$details
                  .insertAfter(t.$el)
                  .children("td")
                  .first()
                  .attr("colspan", t.ft.columns.visibleColspan),
                a.arr.each(t.__hidden__, function (t) {
                  t.collapse();
                })),
              t.$el.attr("data-expanded", !0),
              t.$toggle.removeClass("fooicon-plus").addClass("fooicon-minus"),
              (t.expanded = !0);
          });
        }
      },
      collapse: function (t) {
        if (this.created) {
          var e = this;
          e.ft.raise("collapse.ft.row", [e]).then(function () {
            a.arr.each(e.__hidden__, function (t) {
              t.restore();
            }),
              e.$details.detach(),
              e.$el.removeAttr("data-expanded"),
              e.$toggle.removeClass("fooicon-minus").addClass("fooicon-plus"),
              (!a.is.boolean(t) || t) && (e.expanded = !1);
          });
        }
      },
      predraw: function (t) {
        this.created &&
          (this.expanded && this.collapse(!1),
          this.$toggle.detach(),
          (t = !a.is.boolean(t) || t) && this.$el.detach());
      },
      draw: function (t) {
        this.created || this.$create(), a.is.jq(t) && t.append(this.$el);
        var e = this;
        a.arr.each(e.cells, function (t) {
          t.$el.css(
            "display",
            t.column.hidden || !t.column.visible ? "none" : "table-cell"
          ),
            e.ft.rows.showToggle &&
              e.ft.columns.hasHidden &&
              (("first" == e.ft.rows.toggleColumn &&
                t.column.index == e.ft.columns.firstVisibleIndex) ||
                ("last" == e.ft.rows.toggleColumn &&
                  t.column.index == e.ft.columns.lastVisibleIndex)) &&
              t.$el.prepend(e.$toggle),
            t.$el
              .add(t.column.$el)
              .removeClass("footable-first-visible footable-last-visible"),
            t.column.index == e.ft.columns.firstVisibleIndex &&
              t.$el.add(t.column.$el).addClass("footable-first-visible"),
            t.column.index == e.ft.columns.lastVisibleIndex &&
              t.$el.add(t.column.$el).addClass("footable-last-visible");
        }),
          this.expanded && this.expand();
      },
      toggle: function () {
        this.created &&
          this.ft.columns.hasHidden &&
          (this.expanded ? this.collapse() : this.expand());
      },
      _onToggle: function (t) {
        var e = t.data.self;
        r(t.target).is(e.ft.rows.toggleSelector) && e.toggle();
      },
    });
  })(jQuery, FooTable),
  (function (a, l) {
    (l.instances = []),
      (l.Table = l.Class.extend({
        construct: function (t, e, i) {
          (this._resizeTimeout = null),
            (this.id = l.instances.push(this)),
            (this.initialized = !1),
            (this.$el = (l.is.jq(t) ? t : a(t)).first()),
            (this.$loader = a("<div/>", { class: "footable-loader" }).append(
              a("<span/>", { class: "fooicon fooicon-loader" })
            )),
            (this.o = a.extend(!0, {}, l.defaults, e)),
            (this.data = this.$el.data() || {}),
            (this.classes = []),
            (this.components = l.components.load(
              l.is.hash(this.data.components)
                ? this.data.components
                : this.o.components,
              this
            )),
            (this.breakpoints = this.use(FooTable.Breakpoints)),
            (this.columns = this.use(FooTable.Columns)),
            (this.rows = this.use(FooTable.Rows)),
            this._construct(i);
        },
        _construct: function (e) {
          var i = this;
          this._preinit()
            .then(function () {
              return i._init();
            })
            .always(function (t) {
              return (
                i.$el.show(),
                l.is.error(t)
                  ? void console.error(
                      "FooTable: unhandled error thrown during initialization.",
                      t
                    )
                  : i.raise("ready.ft.table").then(function () {
                      l.is.fn(e) && e.call(i, i);
                    })
              );
            });
        },
        _preinit: function () {
          var n = this;
          return this.raise("preinit.ft.table", [n.data]).then(function () {
            var t = (n.$el.attr("class") || "").match(/\S+/g) || [];
            (n.o.ajax = l.checkFnValue(n, n.data.ajax, n.o.ajax)),
              (n.o.stopPropagation = l.is.boolean(n.data.stopPropagation)
                ? n.data.stopPropagation
                : n.o.stopPropagation);
            for (var e = 0, i = t.length; e < i; e++)
              l.str.startsWith(t[e], "footable") || n.classes.push(t[e]);
            return (
              n.$el.hide().after(n.$loader),
              n.execute(!1, !1, "preinit", n.data)
            );
          });
        },
        _init: function () {
          var n = this;
          return n.raise("init.ft.table").then(function () {
            var t = n.$el.children("thead"),
              e = n.$el.children("tbody"),
              i = n.$el.children("tfoot");
            return (
              n.$el.addClass("footable footable-" + n.id),
              l.is.hash(n.o.on) && n.$el.on(n.o.on),
              0 == i.length && n.$el.append((i = a("<tfoot/>"))),
              0 == e.length && n.$el.append("<tbody/>"),
              0 == t.length && n.$el.prepend((t = a("<thead/>"))),
              n.execute(!1, !0, "init").then(function () {
                return (
                  n.$el.data("__FooTable__", n),
                  0 == i.children("tr").length && i.remove(),
                  0 == t.children("tr").length && t.remove(),
                  n
                    .raise("postinit.ft.table")
                    .then(function () {
                      return n.draw();
                    })
                    .always(function () {
                      a(window)
                        .off("resize.ft" + n.id, n._onWindowResize)
                        .on("resize.ft" + n.id, { self: n }, n._onWindowResize),
                        (n.initialized = !0);
                    })
                );
              })
            );
          });
        },
        destroy: function () {
          var t = this;
          return t
            .raise("destroy.ft.table")
            .then(function () {
              return t.execute(!0, !0, "destroy").then(function () {
                t.$el
                  .removeData("__FooTable__")
                  .removeClass("footable-" + t.id),
                  l.is.hash(t.o.on) && t.$el.off(t.o.on),
                  a(window).off("resize.ft" + t.id, t._onWindowResize),
                  (t.initialized = !1);
              });
            })
            .fail(function (t) {
              l.is.error(t) &&
                console.error(
                  "FooTable: unhandled error thrown while destroying the plugin.",
                  t
                );
            });
        },
        raise: function (i, n) {
          var s = this,
            o =
              l.__debug__ &&
              (l.is.emptyArray(l.__debug_options__.events) ||
                l.arr.any(l.__debug_options__.events, function (t) {
                  return l.str.contains(i, t);
                }));
          return (
            (n = n || []).unshift(this),
            a.Deferred(function (t) {
              var e = a.Event(i);
              1 == s.o.stopPropagation &&
                s.$el.one(i, function (t) {
                  t.stopPropagation();
                }),
                o && console.log("FooTable:" + i + ": ", n),
                s.$el.trigger(e, n),
                e.isDefaultPrevented()
                  ? (o &&
                      console.log(
                        'FooTable: default prevented for the "' + i + '" event.'
                      ),
                    t.reject(e))
                  : t.resolve(e);
            })
          );
        },
        use: function (t) {
          for (var e = 0, i = this.components.length; e < i; e++)
            if (this.components[e] instanceof t) return this.components[e];
          return null;
        },
        draw: function () {
          var t = this,
            e = t.$el.clone().insertBefore(t.$el);
          return (
            t.$el.detach(),
            t
              .execute(!1, !0, "predraw")
              .then(function () {
                return t.raise("predraw.ft.table").then(function () {
                  return t.execute(!1, !0, "draw").then(function () {
                    return t.raise("draw.ft.table").then(function () {
                      return t.execute(!1, !0, "postdraw").then(function () {
                        return t.raise("postdraw.ft.table");
                      });
                    });
                  });
                });
              })
              .fail(function (t) {
                l.is.error(t) &&
                  console.error(
                    "FooTable: unhandled error thrown during a draw operation.",
                    t
                  );
              })
              .always(function () {
                e.replaceWith(t.$el), t.$loader.remove();
              })
          );
        },
        execute: function (t, e, i, n, s) {
          var o = Array.prototype.slice.call(arguments);
          t = o.shift();
          var r = (e = o.shift())
            ? l.arr.get(this.components, function (t) {
                return t.enabled;
              })
            : this.components.slice(0);
          return o.unshift(t ? r.reverse() : r), this._execute.apply(this, o);
        },
        _execute: function (t, i, e, n) {
          if (!t || !t.length) return a.when();
          var s,
            o = this,
            r = Array.prototype.slice.call(arguments);
          return (
            (t = r.shift()),
            (i = r.shift()),
            (s = t.shift()),
            l.is.fn(s[i])
              ? a
                  .Deferred(function (e) {
                    try {
                      var t = s[i].apply(s, r);
                      if (l.is.promise(t)) return t.then(e.resolve, e.reject);
                      e.resolve(t);
                    } catch (t) {
                      e.reject(t);
                    }
                  })
                  .then(function () {
                    return o._execute.apply(o, [t, i].concat(r));
                  })
              : o._execute.apply(o, [t, i].concat(r))
          );
        },
        _onWindowResize: function (t) {
          var e = t.data.self;
          null != e._resizeTimeout && clearTimeout(e._resizeTimeout),
            (e._resizeTimeout = setTimeout(function () {
              (e._resizeTimeout = null),
                e.raise("resize.ft.table").then(function () {
                  e.breakpoints.check();
                });
            }, 300));
        },
      }));
  })(jQuery, FooTable),
  (function (i, n) {
    n.is.undef(window.moment) ||
      ((n.DateColumn = n.Column.extend({
        construct: function (t, e) {
          this._super(t, e, "date"),
            (this.formatString = n.is.string(e.formatString)
              ? e.formatString
              : "MM-DD-YYYY");
        },
        parser: function (t) {
          if (n.is.element(t) || n.is.jq(t)) {
            var e = i(t).data("value");
            (t = n.is.defined(e) ? e : i(t).text()),
              n.is.string(t) && (t = isNaN(t) ? t : +t);
          }
          if (n.is.date(t)) return moment(t);
          if (n.is.object(t) && n.is.boolean(t._isAMomentObject)) return t;
          if (n.is.string(t)) {
            if (isNaN(t)) return moment(t, this.formatString);
            t = +t;
          }
          return n.is.number(t) ? moment(t) : null;
        },
        formatter: function (t) {
          return n.is.object(t) &&
            n.is.boolean(t._isAMomentObject) &&
            t.isValid()
            ? t.format(this.formatString)
            : "";
        },
        filterValue: function (t) {
          if (
            ((n.is.element(t) || n.is.jq(t)) &&
              (t = i(t).data("filterValue") || i(t).text()),
            n.is.hash(t) &&
              n.is.hash(t.options) &&
              (n.is.string(t.options.filterValue) &&
                (t = t.options.filterValue),
              n.is.defined(t.value) && (t = t.value)),
            n.is.object(t) && n.is.boolean(t._isAMomentObject))
          )
            return t.format(this.formatString);
          if (n.is.string(t)) {
            if (isNaN(t)) return t;
            t = +t;
          }
          return n.is.number(t) || n.is.date(t)
            ? moment(t).format(this.formatString)
            : n.is.defined(t) && null != t
            ? t + ""
            : "";
        },
      })),
      n.columns.register("date", n.DateColumn));
  })(jQuery, FooTable),
  (function (n, s) {
    (s.HTMLColumn = s.Column.extend({
      construct: function (t, e) {
        this._super(t, e, "html");
      },
      parser: function (t) {
        if (
          (s.is.string(t) && (t = n(n.trim(t))),
          s.is.element(t) && (t = n(t)),
          s.is.jq(t))
        ) {
          var e = t.prop("tagName").toLowerCase();
          if ("td" != e && "th" != e) return t;
          var i = t.data("value");
          return s.is.defined(i) ? i : t.contents();
        }
        return null;
      },
    })),
      s.columns.register("html", s.HTMLColumn);
  })(jQuery, FooTable),
  (function (i, n) {
    (n.NumberColumn = n.Column.extend({
      construct: function (t, e) {
        this._super(t, e, "number"),
          (this.decimalSeparator = n.is.string(e.decimalSeparator)
            ? e.decimalSeparator
            : "."),
          (this.thousandSeparator = n.is.string(e.thousandSeparator)
            ? e.thousandSeparator
            : ","),
          (this.decimalSeparatorRegex = new RegExp(
            n.str.escapeRegExp(this.decimalSeparator),
            "g"
          )),
          (this.thousandSeparatorRegex = new RegExp(
            n.str.escapeRegExp(this.thousandSeparator),
            "g"
          )),
          (this.cleanRegex = new RegExp(
            "[^0-9" + n.str.escapeRegExp(this.decimalSeparator) + "]",
            "g"
          ));
      },
      parser: function (t) {
        if (n.is.element(t) || n.is.jq(t)) {
          var e = i(t).data("value");
          t = n.is.defined(e) ? e : i(t).text().replace(this.cleanRegex, "");
        }
        return (
          n.is.string(t) &&
            ((t = t
              .replace(this.thousandSeparatorRegex, "")
              .replace(this.decimalSeparatorRegex, ".")),
            (t = parseFloat(t))),
          n.is.number(t) ? t : null
        );
      },
      formatter: function (t) {
        if (null == t) return "";
        var e = (t + "").split(".");
        return (
          2 == e.length &&
            3 < e[0].length &&
            (e[0] = e[0].replace(
              /\B(?=(?:\d{3})+(?!\d))/g,
              this.thousandSeparator
            )),
          e.join(this.decimalSeparator)
        );
      },
    })),
      n.columns.register("number", n.NumberColumn);
  })(jQuery, FooTable),
  (function (t, e) {
    e.Breakpoint = e.Class.extend({
      construct: function (t, e) {
        (this.name = t), (this.width = e);
      },
    });
  })(jQuery, FooTable),
  (function (t, a) {
    (a.Breakpoints = a.Component.extend({
      construct: function (t) {
        this._super(t, !0),
          (this.o = t.o),
          (this.current = null),
          (this.array = []),
          (this.cascade = this.o.cascade),
          (this.useParentWidth = this.o.useParentWidth),
          (this.hidden = null),
          (this._classNames = ""),
          (this.getWidth = a.checkFnValue(
            this,
            this.o.getWidth,
            this.getWidth
          ));
      },
      preinit: function (e) {
        var i = this;
        return this.ft.raise("preinit.ft.breakpoints", [e]).then(function () {
          for (var t in ((i.cascade = a.is.boolean(e.cascade)
            ? e.cascade
            : i.cascade),
          (i.o.breakpoints = a.is.hash(e.breakpoints)
            ? e.breakpoints
            : i.o.breakpoints),
          (i.getWidth = a.checkFnValue(i, e.getWidth, i.getWidth)),
          null == i.o.breakpoints &&
            (i.o.breakpoints = { xs: 480, sm: 768, md: 992, lg: 1200 }),
          i.o.breakpoints))
            i.o.breakpoints.hasOwnProperty(t) &&
              (i.array.push(new a.Breakpoint(t, i.o.breakpoints[t])),
              (i._classNames += "breakpoint-" + t + " "));
          i.array.sort(function (t, e) {
            return e.width - t.width;
          });
        });
      },
      init: function () {
        var t = this;
        return this.ft.raise("init.ft.breakpoints").then(function () {
          t.current = t.get();
        });
      },
      draw: function () {
        this.ft.$el
          .removeClass(this._classNames)
          .addClass("breakpoint-" + this.current.name);
      },
      calculate: function () {
        for (
          var t,
            e = null,
            i = [],
            n = null,
            s = this.getWidth(),
            o = 0,
            r = this.array.length;
          o < r;
          o++
        )
          (t = this.array[o]),
            ((!e && o == r - 1) ||
              (s >= t.width &&
                (!(n instanceof a.Breakpoint) || s < n.width))) &&
              (e = t),
            e || i.push(t.name),
            (n = t);
        return i.push(e.name), (this.hidden = i.join(" ")), e;
      },
      visible: function (t) {
        if (a.is.emptyString(t)) return !0;
        if ("all" === t) return !1;
        for (var e = t.split(" "), i = 0, n = e.length; i < n; i++)
          if (
            this.cascade
              ? a.str.containsWord(this.hidden, e[i])
              : e[i] == this.current.name
          )
            return !1;
        return !0;
      },
      check: function () {
        var e = this,
          i = e.get();
        i instanceof a.Breakpoint &&
          i != e.current &&
          e.ft.raise("before.ft.breakpoints", [e.current, i]).then(function () {
            var t = e.current;
            return (
              (e.current = i),
              e.ft.draw().then(function () {
                e.ft.raise("after.ft.breakpoints", [e.current, t]);
              })
            );
          });
      },
      get: function (e) {
        return a.is.undef(e)
          ? this.calculate()
          : e instanceof a.Breakpoint
          ? e
          : a.is.string(e)
          ? a.arr.first(this.array, function (t) {
              return t.name == e;
            })
          : a.is.number(e) && 0 <= e && e < this.array.length
          ? this.array[e]
          : null;
      },
      getWidth: function () {
        return a.is.fn(this.o.getWidth)
          ? this.o.getWidth(this.ft)
          : 1 == this.useParentWidth
          ? this.getParentWidth()
          : this.getViewportWidth();
      },
      getParentWidth: function () {
        return this.ft.$el.parent().width();
      },
      getViewportWidth: function () {
        return Math.max(
          document.documentElement.clientWidth,
          window.innerWidth,
          0
        );
      },
    })),
      a.components.register("breakpoints", a.Breakpoints, 1e3);
  })(jQuery, FooTable),
  (function (e) {
    (e.Column.prototype.breakpoints = null),
      (e.Column.prototype.__breakpoints_define__ = function (t) {
        this.breakpoints = e.is.emptyString(t.breakpoints)
          ? null
          : t.breakpoints;
      }),
      e.Column.extend("define", function (t) {
        this._super(t), this.__breakpoints_define__(t);
      });
  })(FooTable),
  (function (t) {
    (t.Defaults.prototype.breakpoints = null),
      (t.Defaults.prototype.cascade = !1),
      (t.Defaults.prototype.useParentWidth = !1),
      (t.Defaults.prototype.getWidth = null);
  })(FooTable),
  (function (c, u) {
    (u.Columns = u.Component.extend({
      construct: function (t) {
        this._super(t, !0),
          (this.o = t.o),
          (this.array = []),
          (this.$header = null),
          (this.showHeader = t.o.showHeader),
          (this._fromHTML =
            u.is.emptyArray(t.o.columns) && !u.is.promise(t.o.columns));
      },
      parse: function (t) {
        var l = this;
        return c.Deferred(function (e) {
          function i(t, e) {
            var i = [];
            if (0 == t.length || 0 == e.length) i = t.concat(e);
            else {
              var n = 0;
              u.arr.each(t.concat(e), function (t) {
                t.index > n && (n = t.index);
              }),
                n++;
              for (var s, o, r = 0; r < n; r++)
                (s = {}),
                  u.arr.each(t, function (t) {
                    return t.index == r ? ((s = t), !1) : void 0;
                  }),
                  (o = {}),
                  u.arr.each(e, function (t) {
                    return t.index == r ? ((o = t), !1) : void 0;
                  }),
                  i.push(c.extend(!0, {}, s, o));
            }
            return i;
          }
          var n,
            s,
            o = [],
            r = [],
            t = l.ft.$el
              .find(
                "tr.footable-header, thead > tr:last:has([data-breakpoints]), tbody > tr:first:has([data-breakpoints]), thead > tr:last, tbody > tr:first"
              )
              .first();
          if (0 < t.length) {
            var a =
              t.parent().is("tbody") &&
              t.children().length == t.children("td").length;
            a || (l.$header = t.addClass("footable-header")),
              t.children("td,th").each(function (t, e) {
                (n = c(e)),
                  ((s = n.data()).index = t),
                  (s.$el = n),
                  (s.virtual = a),
                  r.push(s);
              }),
              a && (l.showHeader = !1);
          }
          u.is.array(l.o.columns) && !u.is.emptyArray(l.o.columns)
            ? (u.arr.each(l.o.columns, function (t, e) {
                (t.index = e), o.push(t);
              }),
              l.parseFinalize(e, i(o, r)))
            : u.is.promise(l.o.columns)
            ? l.o.columns.then(
                function (t) {
                  u.arr.each(t, function (t, e) {
                    (t.index = e), o.push(t);
                  }),
                    l.parseFinalize(e, i(o, r));
                },
                function (t) {
                  e.reject(
                    Error(
                      "Columns ajax request error: " +
                        t.status +
                        " (" +
                        t.statusText +
                        ")"
                    )
                  );
                }
              )
            : l.parseFinalize(e, i(o, r));
        });
      },
      parseFinalize: function (t, e) {
        var i,
          n = this,
          s = [];
        u.arr.each(e, function (t) {
          (i = u.columns.contains(t.type)
            ? u.columns.make(t.type, n.ft, t)
            : new u.Column(n.ft, t)) && s.push(i);
        }),
          u.is.emptyArray(s)
            ? t.reject(Error("No columns supplied."))
            : (s.sort(function (t, e) {
                return t.index - e.index;
              }),
              t.resolve(s));
      },
      preinit: function (e) {
        var i = this;
        return i.ft.raise("preinit.ft.columns", [e]).then(function () {
          return i.parse(e).then(function (t) {
            (i.array = t),
              (i.showHeader = u.is.boolean(e.showHeader)
                ? e.showHeader
                : i.showHeader);
          });
        });
      },
      init: function () {
        var t = this;
        return this.ft.raise("init.ft.columns", [t.array]).then(function () {
          t.$create();
        });
      },
      destroy: function () {
        var t = this;
        this.ft.raise("destroy.ft.columns").then(function () {
          t._fromHTML || t.$header.remove();
        });
      },
      predraw: function () {
        var e = this,
          i = !0;
        (e.visibleColspan = 0),
          (e.firstVisibleIndex = 0),
          (e.lastVisibleIndex = 0),
          (e.hasHidden = !1),
          u.arr.each(e.array, function (t) {
            (t.hidden = !e.ft.breakpoints.visible(t.breakpoints)),
              !t.hidden &&
                t.visible &&
                (i && ((e.firstVisibleIndex = t.index), (i = !1)),
                (e.lastVisibleIndex = t.index),
                e.visibleColspan++),
              t.hidden && (e.hasHidden = !0);
          }),
          e.ft.$el.toggleClass("breakpoint", e.hasHidden);
      },
      draw: function () {
        u.arr.each(this.array, function (t) {
          t.$el.css("display", t.hidden || !t.visible ? "none" : "table-cell");
        }),
          !this.showHeader &&
            u.is.jq(this.$header.parent()) &&
            this.$header.detach();
      },
      $create: function () {
        var e = this;
        (e.$header = u.is.jq(e.$header)
          ? e.$header
          : c("<tr/>", { class: "footable-header" })),
          e.$header.children("th,td").detach(),
          u.arr.each(e.array, function (t) {
            e.$header.append(t.$el);
          }),
          e.showHeader &&
            !u.is.jq(e.$header.parent()) &&
            e.ft.$el.children("thead").append(e.$header);
      },
      get: function (e) {
        return e instanceof u.Column
          ? e
          : u.is.string(e)
          ? u.arr.first(this.array, function (t) {
              return t.name == e;
            })
          : u.is.number(e)
          ? u.arr.first(this.array, function (t) {
              return t.index == e;
            })
          : u.is.fn(e)
          ? u.arr.get(this.array, e)
          : null;
      },
      ensure: function (t) {
        var e = this,
          i = [];
        return (
          u.is.array(t) &&
            u.arr.each(t, function (t) {
              i.push(e.get(t));
            }),
          i
        );
      },
    })),
      u.components.register("columns", u.Columns, 900);
  })(jQuery, FooTable),
  (function (t) {
    (t.Defaults.prototype.columns = []), (t.Defaults.prototype.showHeader = !0);
  })(FooTable),
  (function (s, o) {
    (o.Rows = o.Component.extend({
      construct: function (t) {
        this._super(t, !0),
          (this.o = t.o),
          (this.array = []),
          (this.all = []),
          (this.showToggle = t.o.showToggle),
          (this.toggleSelector = t.o.toggleSelector),
          (this.toggleColumn = t.o.toggleColumn),
          (this.emptyString = t.o.empty),
          (this.expandFirst = t.o.expandFirst),
          (this.expandAll = t.o.expandAll),
          (this.$empty = null),
          (this._fromHTML =
            o.is.emptyArray(t.o.rows) && !o.is.promise(t.o.rows));
      },
      parse: function () {
        var i = this;
        return s.Deferred(function (e) {
          var t = i.ft.$el.children("tbody").children("tr");
          o.is.array(i.o.rows) && 0 < i.o.rows.length
            ? i.parseFinalize(e, i.o.rows)
            : o.is.promise(i.o.rows)
            ? i.o.rows.then(
                function (t) {
                  i.parseFinalize(e, t);
                },
                function (t) {
                  e.reject(
                    Error(
                      "Rows ajax request error: " +
                        t.status +
                        " (" +
                        t.statusText +
                        ")"
                    )
                  );
                }
              )
            : o.is.jq(t)
            ? (i.parseFinalize(e, t), t.detach())
            : i.parseFinalize(e, []);
        });
      },
      parseFinalize: function (t, e) {
        var i = this,
          n = s.map(e, function (t) {
            return new o.Row(i.ft, i.ft.columns.array, t);
          });
        t.resolve(n);
      },
      preinit: function (e) {
        var i = this;
        return i.ft.raise("preinit.ft.rows", [e]).then(function () {
          return i.parse().then(function (t) {
            (i.all = t),
              (i.array = i.all.slice(0)),
              (i.showToggle = o.is.boolean(e.showToggle)
                ? e.showToggle
                : i.showToggle),
              (i.toggleSelector = o.is.string(e.toggleSelector)
                ? e.toggleSelector
                : i.toggleSelector),
              (i.toggleColumn = o.is.string(e.toggleColumn)
                ? e.toggleColumn
                : i.toggleColumn),
              "first" != i.toggleColumn &&
                "last" != i.toggleColumn &&
                (i.toggleColumn = "first"),
              (i.emptyString = o.is.string(e.empty) ? e.empty : i.emptyString),
              (i.expandFirst = o.is.boolean(e.expandFirst)
                ? e.expandFirst
                : i.expandFirst),
              (i.expandAll = o.is.boolean(e.expandAll)
                ? e.expandAll
                : i.expandAll);
          });
        });
      },
      init: function () {
        var t = this;
        return t.ft.raise("init.ft.rows", [t.all]).then(function () {
          t.$create();
        });
      },
      destroy: function () {
        var e = this;
        this.ft.raise("destroy.ft.rows").then(function () {
          o.arr.each(e.array, function (t) {
            t.predraw(!e._fromHTML);
          });
        });
      },
      predraw: function () {
        o.arr.each(this.array, function (t) {
          t.predraw();
        }),
          (this.array = this.all.slice(0));
      },
      $create: function () {
        this.$empty = s("<tr/>", { class: "footable-empty" }).append(
          s("<td/>").text(this.emptyString)
        );
      },
      draw: function () {
        var e = this,
          i = e.ft.$el.children("tbody"),
          n = !0;
        0 < e.array.length
          ? (e.$empty.detach(),
            o.arr.each(e.array, function (t) {
              ((e.expandFirst && n) || e.expandAll) &&
                ((t.expanded = !0), (n = !1)),
                t.draw(i);
            }))
          : (e.$empty
              .children("td")
              .attr("colspan", e.ft.columns.visibleColspan),
            i.append(e.$empty));
      },
      load: function (t, e) {
        var i = this,
          n = s.map(t, function (t) {
            return new o.Row(i.ft, i.ft.columns.array, t);
          });
        o.arr.each(this.array, function (t) {
          t.predraw();
        }),
          (this.all = o.is.boolean(e) && e ? this.all.concat(n) : n),
          (this.array = this.all.slice(0)),
          this.ft.draw();
      },
      expand: function () {
        o.arr.each(this.array, function (t) {
          t.expand();
        });
      },
      collapse: function () {
        o.arr.each(this.array, function (t) {
          t.collapse();
        });
      },
    })),
      o.components.register("rows", o.Rows, 800);
  })(jQuery, FooTable),
  (function (t) {
    (t.Defaults.prototype.rows = []),
      (t.Defaults.prototype.empty = "No results"),
      (t.Defaults.prototype.showToggle = !0),
      (t.Defaults.prototype.toggleSelector = "tr,td,.footable-toggle"),
      (t.Defaults.prototype.toggleColumn = "first"),
      (t.Defaults.prototype.expandFirst = !1),
      (t.Defaults.prototype.expandAll = !1);
  })(FooTable),
  (FooTable.Table.prototype.loadRows = function (t, e) {
    this.rows.load(t, e);
  }),
  (function (a) {
    a.Filter = a.Class.extend({
      construct: function (t, e, i, n, s, o, r) {
        (this.name = t),
          (this.space =
            !a.is.string(n) || ("OR" != n && "AND" != n) ? "AND" : n),
          (this.connectors = !a.is.boolean(s) || s),
          (this.ignoreCase = !a.is.boolean(o) || o),
          (this.hidden = !!a.is.boolean(r) && r),
          (this.query =
            e instanceof a.Query
              ? e
              : new a.Query(e, this.space, this.connectors, this.ignoreCase)),
          (this.columns = i);
      },
      match: function (t) {
        return (
          !!a.is.string(t) &&
          (a.is.string(this.query) &&
            (this.query = new a.Query(
              this.query,
              this.space,
              this.connectors,
              this.ignoreCase
            )),
          this.query instanceof a.Query && this.query.match(t))
        );
      },
      matchRow: function (t) {
        var e = this,
          i = a.arr
            .map(t.cells, function (t) {
              return a.arr.contains(e.columns, t.column) ? t.filterValue : null;
            })
            .join(" ");
        return e.match(i);
      },
    });
  })(FooTable),
  (function (r, l) {
    (l.Filtering = l.Component.extend({
      construct: function (t) {
        this._super(t, t.o.filtering.enabled),
          (this.filters = t.o.filtering.filters),
          (this.delay = t.o.filtering.delay),
          (this.min = t.o.filtering.min),
          (this.space = t.o.filtering.space),
          (this.connectors = t.o.filtering.connectors),
          (this.ignoreCase = t.o.filtering.ignoreCase),
          (this.exactMatch = t.o.filtering.exactMatch),
          (this.placeholder = t.o.filtering.placeholder),
          (this.dropdownTitle = t.o.filtering.dropdownTitle),
          (this.position = t.o.filtering.position),
          (this.$row = null),
          (this.$cell = null),
          (this.$dropdown = null),
          (this.$input = null),
          (this.$button = null),
          (this._filterTimeout = null),
          (this._exactRegExp = /^"(.*?)"$/);
      },
      preinit: function (t) {
        var e = this;
        return e.ft.raise("preinit.ft.filtering").then(
          function () {
            e.ft.$el.hasClass("footable-filtering") && (e.enabled = !0),
              (e.enabled = l.is.boolean(t.filtering) ? t.filtering : e.enabled),
              e.enabled &&
                ((e.space = l.is.string(t.filterSpace)
                  ? t.filterSpace
                  : e.space),
                (e.min = l.is.number(t.filterMin) ? t.filterMin : e.min),
                (e.connectors = l.is.boolean(t.filterConnectors)
                  ? t.filterConnectors
                  : e.connectors),
                (e.ignoreCase = l.is.boolean(t.filterIgnoreCase)
                  ? t.filterIgnoreCase
                  : e.ignoreCase),
                (e.exactMatch = l.is.boolean(t.filterExactMatch)
                  ? t.filterExactMatch
                  : e.exactMatch),
                (e.delay = l.is.number(t.filterDelay)
                  ? t.filterDelay
                  : e.delay),
                (e.placeholder = l.is.string(t.filterPlaceholder)
                  ? t.filterPlaceholder
                  : e.placeholder),
                (e.dropdownTitle = l.is.string(t.filterDropdownTitle)
                  ? t.filterDropdownTitle
                  : e.dropdownTitle),
                (e.filters = l.is.array(t.filterFilters)
                  ? e.ensure(t.filterFilters)
                  : e.ensure(e.filters)),
                e.ft.$el.hasClass("footable-filtering-left") &&
                  (e.position = "left"),
                e.ft.$el.hasClass("footable-filtering-center") &&
                  (e.position = "center"),
                e.ft.$el.hasClass("footable-filtering-right") &&
                  (e.position = "right"),
                (e.position = l.is.string(t.filterPosition)
                  ? t.filterPosition
                  : e.position));
          },
          function () {
            e.enabled = !1;
          }
        );
      },
      init: function () {
        var t = this;
        return t.ft.raise("init.ft.filtering").then(
          function () {
            t.$create();
          },
          function () {
            t.enabled = !1;
          }
        );
      },
      destroy: function () {
        var t = this;
        return t.ft.raise("destroy.ft.filtering").then(function () {
          t.ft.$el
            .removeClass("footable-filtering")
            .find("thead > tr.footable-filtering")
            .remove();
        });
      },
      $create: function () {
        var t,
          e = this,
          i = r("<div/>", {
            class: "form-group footable-filtering-search",
          }).append(r("<label/>", { class: "sr-only", text: "Search" })),
          n = r("<div/>", { class: "input-group" }).appendTo(i),
          s = r("<div/>", { class: "input-group-btn" }),
          o = r("<button/>", {
            type: "button",
            class: "btn btn-default dropdown-toggle",
          })
            .on("click", { self: e }, e._onDropdownToggleClicked)
            .append(r("<span/>", { class: "caret" }));
        switch (e.position) {
          case "left":
            t = "footable-filtering-left";
            break;
          case "center":
            t = "footable-filtering-center";
            break;
          default:
            t = "footable-filtering-right";
        }
        e.ft.$el.addClass("footable-filtering").addClass(t),
          (e.$row = r("<tr/>", { class: "footable-filtering" }).prependTo(
            e.ft.$el.children("thead")
          )),
          (e.$cell = r("<th/>")
            .attr("colspan", e.ft.columns.visibleColspan)
            .appendTo(e.$row)),
          (e.$form = r("<form/>", { class: "form-inline" })
            .append(i)
            .appendTo(e.$cell)),
          (e.$input = r("<input/>", {
            type: "text",
            class: "form-control",
            placeholder: e.placeholder,
          })),
          (e.$button = r("<button/>", {
            type: "button",
            class: "btn btn-primary",
          })
            .on("click", { self: e }, e._onSearchButtonClicked)
            .append(r("<span/>", { class: "fooicon fooicon-search" }))),
          (e.$dropdown = r("<ul/>", {
            class: "dropdown-menu dropdown-menu-right",
          })),
          l.is.emptyString(e.dropdownTitle) ||
            e.$dropdown.append(
              r("<li/>", { class: "dropdown-header", text: e.dropdownTitle })
            ),
          e.$dropdown.append(
            l.arr.map(e.ft.columns.array, function (t) {
              return t.filterable
                ? r("<li/>").append(
                    r("<a/>", { class: "checkbox" }).append(
                      r("<label/>", { text: t.title }).prepend(
                        r("<input/>", { type: "checkbox", checked: !0 }).data(
                          "__FooTableColumn__",
                          t
                        )
                      )
                    )
                  )
                : null;
            })
          ),
          0 < e.delay &&
            (e.$input.on(
              "keypress keyup paste",
              { self: e },
              e._onSearchInputChanged
            ),
            e.$dropdown.on(
              "click",
              'input[type="checkbox"]',
              { self: e },
              e._onSearchColumnClicked
            )),
          s.append(e.$button, o, e.$dropdown),
          n.append(e.$input, s);
      },
      predraw: function () {
        if (!l.is.emptyArray(this.filters)) {
          var e = this;
          e.ft.rows.array = r.grep(e.ft.rows.array, function (t) {
            return t.filtered(e.filters);
          });
        }
      },
      draw: function () {
        this.$cell.attr("colspan", this.ft.columns.visibleColspan);
        var t = this.find("search");
        if (t instanceof l.Filter) {
          var e = t.query.val();
          this.exactMatch &&
            this._exactRegExp.test(e) &&
            (e = e.replace(this._exactRegExp, "$1")),
            this.$input.val(e);
        } else this.$input.val(null);
        this.setButton(
          !l.arr.any(this.filters, function (t) {
            return !t.hidden;
          })
        );
      },
      addFilter: function (t, e, i, n, s, o, r) {
        var a = this.createFilter(t, e, i, n, s, o, r);
        a instanceof l.Filter &&
          (this.removeFilter(a.name), this.filters.push(a));
      },
      removeFilter: function (e) {
        l.arr.remove(this.filters, function (t) {
          return t.name == e;
        });
      },
      filter: function () {
        var t = this;
        return (
          (t.filters = t.ensure(t.filters)),
          t.ft.raise("before.ft.filtering", [t.filters]).then(function () {
            return (
              (t.filters = t.ensure(t.filters)),
              t.ft.draw().then(function () {
                t.ft.raise("after.ft.filtering", [t.filters]);
              })
            );
          })
        );
      },
      clear: function () {
        return (
          (this.filters = l.arr.get(this.filters, function (t) {
            return t.hidden;
          })),
          this.filter()
        );
      },
      setButton: function (t) {
        t
          ? this.$button
              .children(".fooicon")
              .removeClass("fooicon-remove")
              .addClass("fooicon-search")
          : this.$button
              .children(".fooicon")
              .removeClass("fooicon-search")
              .addClass("fooicon-remove");
      },
      find: function (e) {
        return l.arr.first(this.filters, function (t) {
          return t.name == e;
        });
      },
      columns: function () {
        return l.is.jq(this.$dropdown)
          ? this.$dropdown
              .find("input:checked")
              .map(function () {
                return r(this).data("__FooTableColumn__");
              })
              .get()
          : this.ft.columns.get(function (t) {
              return t.filterable;
            });
      },
      ensure: function (t) {
        var e = this,
          i = [],
          n = e.columns();
        return (
          l.is.emptyArray(t) ||
            l.arr.each(t, function (t) {
              (t = e._ensure(t, n)) instanceof l.Filter && i.push(t);
            }),
          i
        );
      },
      createFilter: function (t, e, i, n, s, o, r) {
        return (
          l.is.string(t) &&
            (t = {
              name: t,
              query: e,
              columns: i,
              ignoreCase: n,
              connectors: s,
              space: o,
              hidden: r,
            }),
          this._ensure(t, this.columns())
        );
      },
      _ensure: function (t, e) {
        return (l.is.hash(t) || t instanceof l.Filter) &&
          !l.is.emptyString(t.name) &&
          (!l.is.emptyString(t.query) || t.query instanceof l.Query)
          ? ((t.columns = l.is.emptyArray(t.columns)
              ? e
              : this.ft.columns.ensure(t.columns)),
            (t.ignoreCase = l.is.boolean(t.ignoreCase)
              ? t.ignoreCase
              : this.ignoreCase),
            (t.connectors = l.is.boolean(t.connectors)
              ? t.connectors
              : this.connectors),
            (t.hidden = !!l.is.boolean(t.hidden) && t.hidden),
            (t.space =
              !l.is.string(t.space) || ("AND" !== t.space && "OR" !== t.space)
                ? this.space
                : t.space),
            (t.query = l.is.string(t.query)
              ? new l.Query(t.query, t.space, t.connectors, t.ignoreCase)
              : t.query),
            t instanceof l.Filter
              ? t
              : new l.Filter(
                  t.name,
                  t.query,
                  t.columns,
                  t.space,
                  t.connectors,
                  t.ignoreCase,
                  t.hidden
                ))
          : null;
      },
      _onSearchInputChanged: function (t) {
        var e = t.data.self,
          i =
            "keypress" == t.type &&
            !l.is.emptyString(String.fromCharCode(t.charCode)),
          n = "keyup" == t.type && (8 == t.which || 46 == t.which),
          s = "paste" == t.type;
        (i || n || s) &&
          (13 == t.which && t.preventDefault(),
          null != e._filterTimeout && clearTimeout(e._filterTimeout),
          (e._filterTimeout = setTimeout(function () {
            e._filterTimeout = null;
            var t = e.$input.val();
            t.length >= e.min
              ? (e.exactMatch && !e._exactRegExp.test(t) && (t = '"' + t + '"'),
                e.addFilter("search", t),
                e.filter())
              : l.is.emptyString(t) && e.clear();
          }, e.delay)));
      },
      _onSearchButtonClicked: function (t) {
        t.preventDefault();
        var e = t.data.self;
        if (
          (null != e._filterTimeout && clearTimeout(e._filterTimeout),
          e.$button.children(".fooicon").hasClass("fooicon-remove"))
        )
          e.clear();
        else {
          var i = e.$input.val();
          i.length >= e.min &&
            (e.exactMatch && !e._exactRegExp.test(i) && (i = '"' + i + '"'),
            e.addFilter("search", i),
            e.filter());
        }
      },
      _onSearchColumnClicked: function (t) {
        var e = t.data.self;
        null != e._filterTimeout && clearTimeout(e._filterTimeout),
          (e._filterTimeout = setTimeout(function () {
            e._filterTimeout = null;
            var t = e.$button.children(".fooicon");
            t.hasClass("fooicon-remove") &&
              (t.removeClass("fooicon-remove").addClass("fooicon-search"),
              e.addFilter("search", e.$input.val()),
              e.filter());
          }, e.delay));
      },
      _onDropdownToggleClicked: function (t) {
        t.preventDefault(), t.stopPropagation();
        var e = t.data.self;
        e.$dropdown.parent().toggleClass("open"),
          e.$dropdown.parent().hasClass("open")
            ? r(document).on(
                "click.footable",
                { self: e },
                e._onDocumentClicked
              )
            : r(document).off("click.footable", e._onDocumentClicked);
      },
      _onDocumentClicked: function (t) {
        if (0 == r(t.target).closest(".dropdown-menu").length) {
          t.preventDefault();
          var e = t.data.self;
          e.$dropdown.parent().removeClass("open"),
            r(document).off("click.footable", e._onDocumentClicked);
        }
      },
    })),
      l.components.register("filtering", l.Filtering, 500);
  })(jQuery, FooTable),
  (function (r) {
    r.Query = r.Class.extend({
      construct: function (t, e, i, n) {
        (this._original = null),
          (this._value = null),
          (this.space =
            !r.is.string(e) || ("OR" != e && "AND" != e) ? "AND" : e),
          (this.connectors = !r.is.boolean(i) || i),
          (this.ignoreCase = !r.is.boolean(n) || n),
          (this.left = null),
          (this.right = null),
          (this.parts = []),
          (this.operator = null),
          this.val(t);
      },
      val: function (t) {
        if (r.is.emptyString(t)) return this._value;
        if (r.is.emptyString(this._original)) this._original = t;
        else if (this._original == t) return;
        (this._value = t), this._parse();
      },
      match: function (t) {
        return r.is.emptyString(this.operator) || "OR" === this.operator
          ? this._left(t, !1) || this._match(t, !1) || this._right(t, !1)
          : "AND" === this.operator
          ? this._left(t, !0) && this._match(t, !0) && this._right(t, !0)
          : void 0;
      },
      _match: function (i, t) {
        var n = this,
          s = !1,
          o = r.is.emptyString(i);
        return r.is.emptyArray(n.parts) && n.left instanceof r.Query
          ? t
          : (r.is.emptyArray(n.parts) ||
              ("OR" === n.space
                ? r.arr.each(n.parts, function (t) {
                    if (t.empty && o) {
                      if (((s = !0), t.negate)) return (s = !1);
                    } else {
                      var e = (t.exact ? r.str.containsExact : r.str.contains)(
                        i,
                        t.query,
                        n.ignoreCase
                      );
                      if ((e && !t.negate && (s = !0), e && t.negate))
                        return (s = !1);
                    }
                  })
                : ((s = !0),
                  r.arr.each(n.parts, function (t) {
                    if (t.empty)
                      return (
                        ((!o && !t.negate) || (o && t.negate)) && (s = !1), s
                      );
                    var e = (t.exact ? r.str.containsExact : r.str.contains)(
                      i,
                      t.query,
                      n.ignoreCase
                    );
                    return (
                      ((!e && !t.negate) || (e && t.negate)) && (s = !1), s
                    );
                  }))),
            s);
      },
      _left: function (t, e) {
        return this.left instanceof r.Query ? this.left.match(t) : e;
      },
      _right: function (t, e) {
        return this.right instanceof r.Query ? this.right.match(t) : e;
      },
      _parse: function () {
        if (!r.is.emptyString(this._value))
          if (/\sOR\s/.test(this._value)) {
            this.operator = "OR";
            var t = this._value.split(/(?:\sOR\s)(.*)?/);
            (this.left = new r.Query(
              t[0],
              this.space,
              this.connectors,
              this.ignoreCase
            )),
              (this.right = new r.Query(
                t[1],
                this.space,
                this.connectors,
                this.ignoreCase
              ));
          } else if (/\sAND\s/.test(this._value)) {
            this.operator = "AND";
            var e = this._value.split(/(?:\sAND\s)(.*)?/);
            (this.left = new r.Query(
              e[0],
              this.space,
              this.connectors,
              this.ignoreCase
            )),
              (this.right = new r.Query(
                e[1],
                this.space,
                this.connectors,
                this.ignoreCase
              ));
          } else {
            var i = this;
            this.parts = r.arr.map(
              this._value.match(/(?:[^\s"]+|"[^"]*")+/g),
              function (t) {
                return i._part(t);
              }
            );
          }
      },
      _part: function (t) {
        var e = { query: t, negate: !1, phrase: !1, exact: !1, empty: !1 };
        return (
          r.str.startsWith(e.query, "-") &&
            ((e.query = r.str.from(e.query, "-")), (e.negate = !0)),
          /^"(.*?)"$/.test(e.query)
            ? ((e.query = e.query.replace(/^"(.*?)"$/, "$1")),
              (e.phrase = !0),
              (e.exact = !0))
            : this.connectors &&
              /(?:\w)+?([-_\+\.])(?:\w)+?/.test(e.query) &&
              ((e.query = e.query.replace(
                /(?:\w)+?([-_\+\.])(?:\w)+?/g,
                function (t, e) {
                  return t.replace(e, " ");
                }
              )),
              (e.phrase = !0)),
          (e.empty = e.phrase && r.is.emptyString(e.query)),
          e
        );
      },
    });
  })(FooTable),
  (function (e) {
    (e.Cell.prototype.filterValue = null),
      (e.Cell.prototype.__filtering_define__ = function (t) {
        this.filterValue = this.column.filterValue.call(this.column, t);
      }),
      (e.Cell.prototype.__filtering_val__ = function (t) {
        e.is.defined(t) &&
          (this.filterValue = this.column.filterValue.call(this.column, t));
      }),
      e.Cell.extend("define", function (t) {
        this._super(t), this.__filtering_define__(t);
      }),
      e.Cell.extend("val", function (t) {
        var e = this._super(t);
        return this.__filtering_val__(t), e;
      });
  })(FooTable),
  (function (i, n) {
    (n.Column.prototype.filterable = !0),
      (n.Column.prototype.filterValue = function (t) {
        if (n.is.element(t) || n.is.jq(t)) {
          var e = i(t).data("filterValue");
          return n.is.defined(e) ? "" + e : i(t).text();
        }
        if (n.is.hash(t) && n.is.hash(t.options)) {
          if (n.is.string(t.options.filterValue)) return t.options.filterValue;
          n.is.defined(t.value) && (t = t.value);
        }
        return n.is.defined(t) && null != t ? t + "" : "";
      }),
      (n.Column.prototype.__filtering_define__ = function (t) {
        (this.filterable = n.is.boolean(t.filterable)
          ? t.filterable
          : this.filterable),
          (this.filterValue = n.checkFnValue(
            this,
            t.filterValue,
            this.filterValue
          ));
      }),
      n.Column.extend("define", function (t) {
        this._super(t), this.__filtering_define__(t);
      });
  })(jQuery, FooTable),
  (FooTable.Defaults.prototype.filtering = {
    enabled: !1,
    filters: [],
    delay: 1200,
    min: 1,
    space: "AND",
    placeholder: "Search",
    dropdownTitle: null,
    position: "right",
    connectors: !0,
    ignoreCase: !0,
    exactMatch: !1,
  }),
  (function (n) {
    n.Row.prototype.filtered = function (t) {
      var e = !0,
        i = this;
      return (
        n.arr.each(t, function (t) {
          return 0 != (e = t.matchRow(i)) && void 0;
        }),
        e
      );
    };
  })(FooTable),
  (function (t, e) {
    e.Sorter = e.Class.extend({
      construct: function (t, e) {
        (this.column = t), (this.direction = e);
      },
    });
  })(jQuery, FooTable),
  (function (s, o) {
    (o.Sorting = o.Component.extend({
      construct: function (t) {
        this._super(t, t.o.sorting.enabled),
          (this.o = t.o.sorting),
          (this.column = null),
          (this.allowed = !0),
          (this.initial = null);
      },
      preinit: function (t) {
        var e = this;
        this.ft.raise("preinit.ft.sorting", [t]).then(
          function () {
            e.ft.$el.hasClass("footable-sorting") && (e.enabled = !0),
              (e.enabled = o.is.boolean(t.sorting) ? t.sorting : e.enabled),
              e.enabled &&
                (e.column = o.arr.first(e.ft.columns.array, function (t) {
                  return t.sorted;
                }));
          },
          function () {
            e.enabled = !1;
          }
        );
      },
      init: function () {
        var e = this;
        this.ft.raise("init.ft.sorting").then(
          function () {
            if (!e.initial) {
              var t = !!e.column;
              e.initial = {
                isset: t,
                rows: e.ft.rows.all.slice(0),
                column: t ? e.column.name : null,
                direction: t ? e.column.direction : null,
              };
            }
            o.arr.each(e.ft.columns.array, function (t) {
              t.sortable &&
                t.$el
                  .addClass("footable-sortable")
                  .append(s("<span/>", { class: "fooicon fooicon-sort" }));
            }),
              e.ft.$el.on(
                "click.footable",
                ".footable-sortable",
                { self: e },
                e._onSortClicked
              );
          },
          function () {
            e.enabled = !1;
          }
        );
      },
      destroy: function () {
        var t = this;
        this.ft.raise("destroy.ft.paging").then(function () {
          t.ft.$el.off(
            "click.footable",
            ".footable-sortable",
            t._onSortClicked
          ),
            t.ft.$el
              .children("thead")
              .children("tr.footable-header")
              .children(".footable-sortable")
              .removeClass("footable-sortable footable-asc footable-desc")
              .find("span.fooicon")
              .remove();
        });
      },
      predraw: function () {
        if (this.column) {
          var i = this.column;
          this.ft.rows.array.sort(function (t, e) {
            return "DESC" == i.direction
              ? i.sorter(e.cells[i.index].sortValue, t.cells[i.index].sortValue)
              : i.sorter(
                  t.cells[i.index].sortValue,
                  e.cells[i.index].sortValue
                );
          });
        }
      },
      draw: function () {
        if (this.column) {
          var t = this.ft.$el.find("thead > tr > .footable-sortable"),
            e = this.column.$el;
          t
            .removeClass("footable-asc footable-desc")
            .children(".fooicon")
            .removeClass("fooicon-sort fooicon-sort-asc fooicon-sort-desc"),
            t.not(e).children(".fooicon").addClass("fooicon-sort"),
            e
              .addClass(
                "DESC" == this.column.direction
                  ? "footable-desc"
                  : "footable-asc"
              )
              .children(".fooicon")
              .addClass(
                "DESC" == this.column.direction
                  ? "fooicon-sort-desc"
                  : "fooicon-sort-asc"
              );
        }
      },
      sort: function (t, e) {
        return this._sort(t, e);
      },
      toggleAllowed: function (t) {
        (t = o.is.boolean(t) ? t : !this.allowed),
          (this.allowed = t),
          this.ft.$el.toggleClass("footable-sorting-disabled", !this.allowed);
      },
      hasChanged: function () {
        return !(
          !this.initial ||
          !this.column ||
          (this.column.name === this.initial.column &&
            (this.column.direction === this.initial.direction ||
              (null === this.initial.direction &&
                "ASC" === this.column.direction)))
        );
      },
      reset: function () {
        this.initial &&
          (this.initial.isset
            ? this.sort(this.initial.column, this.initial.direction)
            : (this.column &&
                (this.column.$el.removeClass("footable-asc footable-desc"),
                (this.column = null)),
              (this.ft.rows.all = this.initial.rows),
              this.ft.draw()));
      },
      _sort: function (t, e) {
        if (!this.allowed) return s.Deferred().reject("sorting disabled");
        var i = this,
          n = new o.Sorter(i.ft.columns.get(t), o.Sorting.dir(e));
        return i.ft.raise("before.ft.sorting", [n]).then(function () {
          return (
            o.arr.each(i.ft.columns.array, function (t) {
              t != i.column && (t.direction = null);
            }),
            (i.column = i.ft.columns.get(n.column)),
            i.column && (i.column.direction = o.Sorting.dir(n.direction)),
            i.ft.draw().then(function () {
              i.ft.raise("after.ft.sorting", [n]);
            })
          );
        });
      },
      _onSortClicked: function (t) {
        var e = t.data.self,
          i = s(this).closest("th,td"),
          n = i.is(".footable-asc, .footable-desc")
            ? i.hasClass("footable-desc")
              ? "ASC"
              : "DESC"
            : "ASC";
        e._sort(i.index(), n);
      },
    })),
      (o.Sorting.dir = function (t) {
        return !o.is.string(t) || ("ASC" != t && "DESC" != t) ? "ASC" : t;
      }),
      o.components.register("sorting", o.Sorting, 600);
  })(jQuery, FooTable),
  (function (e) {
    (e.Cell.prototype.sortValue = null),
      (e.Cell.prototype.__sorting_define__ = function (t) {
        this.sortValue = this.column.sortValue.call(this.column, t);
      }),
      (e.Cell.prototype.__sorting_val__ = function (t) {
        e.is.defined(t) &&
          (this.sortValue = this.column.sortValue.call(this.column, t));
      }),
      e.Cell.extend("define", function (t) {
        this._super(t), this.__sorting_define__(t);
      }),
      e.Cell.extend("val", function (t) {
        var e = this._super(t);
        return this.__sorting_val__(t), e;
      });
  })(FooTable),
  (function (i, n) {
    (n.Column.prototype.direction = null),
      (n.Column.prototype.sortable = !0),
      (n.Column.prototype.sorted = !1),
      (n.Column.prototype.sorter = function (t, e) {
        return (
          "string" == typeof t && (t = t.toLowerCase()),
          "string" == typeof e && (e = e.toLowerCase()),
          t === e ? 0 : t < e ? -1 : 1
        );
      }),
      (n.Column.prototype.sortValue = function (t) {
        if (n.is.element(t) || n.is.jq(t)) {
          var e = i(t).data("sortValue");
          return n.is.defined(e) ? e : this.parser(t);
        }
        if (n.is.hash(t) && n.is.hash(t.options)) {
          if (n.is.string(t.options.sortValue)) return t.options.sortValue;
          n.is.defined(t.value) && (t = t.value);
        }
        return n.is.defined(t) && null != t ? t : null;
      }),
      (n.Column.prototype.__sorting_define__ = function (t) {
        (this.sorter = n.checkFnValue(this, t.sorter, this.sorter)),
          (this.direction = n.is.type(t.direction, "string")
            ? n.Sorting.dir(t.direction)
            : null),
          (this.sortable = !n.is.boolean(t.sortable) || t.sortable),
          (this.sorted = !!n.is.boolean(t.sorted) && t.sorted),
          (this.sortValue = n.checkFnValue(this, t.sortValue, this.sortValue));
      }),
      n.Column.extend("define", function (t) {
        this._super(t), this.__sorting_define__(t);
      });
  })(jQuery, FooTable),
  (FooTable.Defaults.prototype.sorting = { enabled: !1 }),
  (function (i, n) {
    n.HTMLColumn.extend("__sorting_define__", function (t) {
      this._super(t),
        (this.sortUse =
          n.is.string(t.sortUse) &&
          -1 !== i.inArray(t.sortUse, ["html", "text"])
            ? t.sortUse
            : "html");
    }),
      (n.HTMLColumn.prototype.sortValue = function (t) {
        if (n.is.element(t) || n.is.jq(t)) {
          var e = i(t).data("sortValue");
          return n.is.defined(e) ? e : i.trim(i(t)[this.sortUse]());
        }
        if (n.is.hash(t) && n.is.hash(t.options)) {
          if (n.is.string(t.options.sortValue)) return t.options.sortValue;
          n.is.defined(t.value) && (t = t.value);
        }
        return n.is.defined(t) && null != t ? t : null;
      });
  })(jQuery, FooTable),
  (function (i) {
    i.Table.prototype.sort = function (t, e) {
      return this.use(i.Sorting).sort(t, e);
    };
  })(FooTable),
  (function (t, e) {
    e.Pager = e.Class.extend({
      construct: function (t, e, i, n, s) {
        (this.total = t),
          (this.current = e),
          (this.size = i),
          (this.page = n),
          (this.forward = s);
      },
    });
  })(jQuery, FooTable),
  (function (o, n) {
    (n.Paging = n.Component.extend({
      construct: function (t) {
        this._super(t, t.o.paging.enabled),
          (this.strings = t.o.paging.strings),
          (this.current = t.o.paging.current),
          (this.size = t.o.paging.size),
          (this.limit = t.o.paging.limit),
          (this.position = t.o.paging.position),
          (this.countFormat = t.o.paging.countFormat),
          (this.total = -1),
          (this.totalRows = 0),
          (this.previous = -1),
          (this.formattedCount = null),
          (this.$row = null),
          (this.$cell = null),
          (this.$pagination = null),
          (this.$count = null),
          (this.detached = !0),
          (this._createdLinks = 0);
      },
      preinit: function (t) {
        var e = this;
        this.ft.raise("preinit.ft.paging", [t]).then(
          function () {
            e.ft.$el.hasClass("footable-paging") && (e.enabled = !0),
              (e.enabled = n.is.boolean(t.paging) ? t.paging : e.enabled),
              e.enabled &&
                ((e.size = n.is.number(t.pagingSize) ? t.pagingSize : e.size),
                (e.current = n.is.number(t.pagingCurrent)
                  ? t.pagingCurrent
                  : e.current),
                (e.limit = n.is.number(t.pagingLimit)
                  ? t.pagingLimit
                  : e.limit),
                e.ft.$el.hasClass("footable-paging-left") &&
                  (e.position = "left"),
                e.ft.$el.hasClass("footable-paging-center") &&
                  (e.position = "center"),
                e.ft.$el.hasClass("footable-paging-right") &&
                  (e.position = "right"),
                (e.position = n.is.string(t.pagingPosition)
                  ? t.pagingPosition
                  : e.position),
                (e.countFormat = n.is.string(t.pagingCountFormat)
                  ? t.pagingCountFormat
                  : e.countFormat),
                (e.total = Math.ceil(e.ft.rows.all.length / e.size)));
          },
          function () {
            e.enabled = !1;
          }
        );
      },
      init: function () {
        var t = this;
        this.ft.raise("init.ft.paging").then(
          function () {
            t.$create();
          },
          function () {
            t.enabled = !1;
          }
        );
      },
      destroy: function () {
        var t = this;
        this.ft.raise("destroy.ft.paging").then(function () {
          t.ft.$el
            .removeClass("footable-paging")
            .find("tfoot > tr.footable-paging")
            .remove(),
            (t.detached = !0),
            (t._createdLinks = 0);
        });
      },
      predraw: function () {
        (this.total = Math.ceil(this.ft.rows.array.length / this.size)),
          (this.current =
            this.current > this.total
              ? this.total
              : this.current < 1
              ? 1
              : this.current),
          (this.totalRows = this.ft.rows.array.length),
          this.totalRows > this.size &&
            (this.ft.rows.array = this.ft.rows.array.splice(
              (this.current - 1) * this.size,
              this.size
            )),
          (this.formattedCount = this.format(this.countFormat));
      },
      draw: function () {
        if (this.total <= 1)
          this.detached || (this.$row.detach(), (this.detached = !0));
        else {
          if (this.detached) {
            var t = this.ft.$el.children("tfoot");
            0 == t.length && ((t = o("<tfoot/>")), this.ft.$el.append(t)),
              this.$row.appendTo(t),
              (this.detached = !1);
          }
          this.$cell.attr("colspan", this.ft.columns.visibleColspan),
            this._createLinks(),
            this._setVisible(this.current, this.current > this.previous),
            this._setNavigation(!0),
            this.$count.text(this.formattedCount);
        }
      },
      $create: function () {
        this._createdLinks = 0;
        var t = "footable-paging-center";
        switch (this.position) {
          case "left":
            t = "footable-paging-left";
            break;
          case "right":
            t = "footable-paging-right";
        }
        this.ft.$el.addClass("footable-paging").addClass(t),
          (this.$cell = o("<td/>").attr(
            "colspan",
            this.ft.columns.visibleColspan
          ));
        var e = this.ft.$el.children("tfoot");
        0 == e.length && ((e = o("<tfoot/>")), this.ft.$el.append(e)),
          (this.$row = o("<tr/>", { class: "footable-paging" })
            .append(this.$cell)
            .appendTo(e)),
          (this.$pagination = o("<ul/>", { class: "pagination" }).on(
            "click.footable",
            "a.footable-page-link",
            { self: this },
            this._onPageClicked
          )),
          (this.$count = o("<span/>", { class: "label label-default" })),
          this.$cell.append(
            this.$pagination,
            o("<div/>", { class: "divider" }),
            this.$count
          ),
          (this.detached = !1);
      },
      format: function (t) {
        var e = this.size * (this.current - 1) + 1,
          i = this.size * this.current;
        return (
          (i =
            0 == this.ft.rows.array.length
              ? (e = 0)
              : i > this.totalRows
              ? this.totalRows
              : i),
          t
            .replace(/\{CP}/g, this.current)
            .replace(/\{TP}/g, this.total)
            .replace(/\{PF}/g, e)
            .replace(/\{PL}/g, i)
            .replace(/\{TR}/g, this.totalRows)
        );
      },
      first: function () {
        return this._set(1);
      },
      prev: function () {
        return this._set(0 < this.current - 1 ? this.current - 1 : 1);
      },
      next: function () {
        return this._set(
          this.current + 1 < this.total ? this.current + 1 : this.total
        );
      },
      last: function () {
        return this._set(this.total);
      },
      goto: function (t) {
        return this._set(t > this.total ? this.total : t < 1 ? 1 : t);
      },
      prevPages: function () {
        var t =
          this.$pagination
            .children("li.footable-page.visible:first")
            .data("page") - 1;
        this._setVisible(t, !0), this._setNavigation(!1);
      },
      nextPages: function () {
        var t =
          this.$pagination
            .children("li.footable-page.visible:last")
            .data("page") + 1;
        this._setVisible(t, !1), this._setNavigation(!1);
      },
      pageSize: function (t) {
        return n.is.number(t)
          ? ((this.size = t),
            (this.total = Math.ceil(this.ft.rows.all.length / this.size)),
            n.is.jq(this.$row) && this.$row.remove(),
            this.$create(),
            void this.ft.draw())
          : this.size;
      },
      _set: function (t) {
        var e = this,
          i = new n.Pager(e.total, e.current, e.size, t, t > e.current);
        return e.ft.raise("before.ft.paging", [i]).then(function () {
          return (
            (i.page = i.page > i.total ? i.total : i.page),
            (i.page = i.page < 1 ? 1 : i.page),
            e.current == t
              ? o.when()
              : ((e.previous = e.current),
                (e.current = i.page),
                e.ft.draw().then(function () {
                  e.ft.raise("after.ft.paging", [i]);
                }))
          );
        });
      },
      _createLinks: function () {
        if (this._createdLinks !== this.total) {
          var t = this,
            e = 1 < t.total,
            i = function (t, e, i) {
              return o("<li/>", { class: i })
                .attr("data-page", t)
                .append(
                  o("<a/>", { class: "footable-page-link", href: "#" })
                    .data("page", t)
                    .html(e)
                );
            };
          t.$pagination.empty(),
            e &&
              (t.$pagination.append(
                i("first", t.strings.first, "footable-page-nav")
              ),
              t.$pagination.append(
                i("prev", t.strings.prev, "footable-page-nav")
              ),
              0 < t.limit &&
                t.limit < t.total &&
                t.$pagination.append(
                  i("prev-limit", t.strings.prevPages, "footable-page-nav")
                ));
          for (var n, s = 0; s < t.total; s++)
            (n = i(s + 1, s + 1, "footable-page")), t.$pagination.append(n);
          e &&
            (0 < t.limit &&
              t.limit < t.total &&
              t.$pagination.append(
                i("next-limit", t.strings.nextPages, "footable-page-nav")
              ),
            t.$pagination.append(
              i("next", t.strings.next, "footable-page-nav")
            ),
            t.$pagination.append(
              i("last", t.strings.last, "footable-page-nav")
            )),
            (t._createdLinks = t.total);
        }
      },
      _setNavigation: function (t) {
        1 == this.current
          ? this.$pagination
              .children('li[data-page="first"],li[data-page="prev"]')
              .addClass("disabled")
          : this.$pagination
              .children('li[data-page="first"],li[data-page="prev"]')
              .removeClass("disabled"),
          this.current == this.total
            ? this.$pagination
                .children('li[data-page="next"],li[data-page="last"]')
                .addClass("disabled")
            : this.$pagination
                .children('li[data-page="next"],li[data-page="last"]')
                .removeClass("disabled"),
          1 ==
          (this.$pagination
            .children("li.footable-page.visible:first")
            .data("page") || 1)
            ? this.$pagination
                .children('li[data-page="prev-limit"]')
                .addClass("disabled")
            : this.$pagination
                .children('li[data-page="prev-limit"]')
                .removeClass("disabled"),
          (this.$pagination
            .children("li.footable-page.visible:last")
            .data("page") || this.limit) == this.total
            ? this.$pagination
                .children('li[data-page="next-limit"]')
                .addClass("disabled")
            : this.$pagination
                .children('li[data-page="next-limit"]')
                .removeClass("disabled"),
          0 < this.limit && this.total < this.limit
            ? this.$pagination
                .children(
                  'li[data-page="prev-limit"],li[data-page="next-limit"]'
                )
                .css("display", "none")
            : this.$pagination
                .children(
                  'li[data-page="prev-limit"],li[data-page="next-limit"]'
                )
                .css("display", ""),
          t &&
            this.$pagination
              .children("li.footable-page")
              .removeClass("active")
              .filter('li[data-page="' + this.current + '"]')
              .addClass("active");
      },
      _setVisible: function (t, e) {
        if (0 < this.limit && this.total > this.limit) {
          if (
            !this.$pagination
              .children('li.footable-page[data-page="' + t + '"]')
              .hasClass("visible")
          ) {
            var i = 0,
              n = 0;
            1 == e
              ? (i = (n = t > this.total ? this.total : t) - this.limit)
              : (n = (i = t < 1 ? 0 : t - 1) + this.limit),
              i < 0 &&
                ((i = 0),
                (n = this.limit > this.total ? this.total : this.limit)),
              n > this.total &&
                ((n = this.total),
                (i =
                  this.total - this.limit < 0 ? 0 : this.total - this.limit)),
              this.$pagination
                .children("li.footable-page")
                .removeClass("visible")
                .slice(i, n)
                .addClass("visible");
          }
        } else
          this.$pagination
            .children("li.footable-page")
            .removeClass("visible")
            .slice(0, this.total)
            .addClass("visible");
      },
      _onPageClicked: function (t) {
        if (
          (t.preventDefault(),
          !o(t.target).closest("li").is(".active,.disabled"))
        ) {
          var e = t.data.self,
            i = o(this).data("page");
          switch (i) {
            case "first":
              return void e.first();
            case "prev":
              return void e.prev();
            case "next":
              return void e.next();
            case "last":
              return void e.last();
            case "prev-limit":
              return void e.prevPages();
            case "next-limit":
              return void e.nextPages();
            default:
              return void e._set(i);
          }
        }
      },
    })),
      n.components.register("paging", n.Paging, 400);
  })(jQuery, FooTable),
  (FooTable.Defaults.prototype.paging = {
    enabled: !1,
    countFormat: "{CP} of {TP}",
    current: 1,
    limit: 5,
    position: "center",
    size: 10,
    strings: {
      first: "&laquo;",
      prev: "&lsaquo;",
      next: "&rsaquo;",
      last: "&raquo;",
      prevPages: "...",
      nextPages: "...",
    },
  }),
  (function (e) {
    (e.Table.prototype.gotoPage = function (t) {
      return this.use(e.Paging).goto(t);
    }),
      (e.Table.prototype.nextPage = function () {
        return this.use(e.Paging).next();
      }),
      (e.Table.prototype.prevPage = function () {
        return this.use(e.Paging).prev();
      }),
      (e.Table.prototype.firstPage = function () {
        return this.use(e.Paging).first();
      }),
      (e.Table.prototype.lastPage = function () {
        return this.use(e.Paging).last();
      }),
      (e.Table.prototype.nextPages = function () {
        return this.use(e.Paging).nextPages();
      }),
      (e.Table.prototype.prevPages = function () {
        return this.use(e.Paging).prevPages();
      }),
      (e.Table.prototype.pageSize = function (t) {
        return this.use(e.Paging).pageSize(t);
      });
  })(FooTable),
  (function (s, o) {
    (o.Editing = o.Component.extend({
      construct: function (t) {
        this._super(t, t.o.editing.enabled),
          (this.pageToNew = t.o.editing.pageToNew),
          (this.alwaysShow = t.o.editing.alwaysShow),
          (this.column = s.extend(!0, {}, t.o.editing.column, {
            visible: this.alwaysShow,
          })),
          (this.position = t.o.editing.position),
          (this.showText = t.o.editing.showText),
          (this.hideText = t.o.editing.hideText),
          (this.addText = t.o.editing.addText),
          (this.editText = t.o.editing.editText),
          (this.deleteText = t.o.editing.deleteText),
          (this.viewText = t.o.editing.viewText),
          (this.allowAdd = t.o.editing.allowAdd),
          (this.allowEdit = t.o.editing.allowEdit),
          (this.allowDelete = t.o.editing.allowDelete),
          (this.allowView = t.o.editing.allowView),
          (this._$buttons = null),
          (this.callbacks = {
            addRow: o.checkFnValue(this, t.o.editing.addRow),
            editRow: o.checkFnValue(this, t.o.editing.editRow),
            deleteRow: o.checkFnValue(this, t.o.editing.deleteRow),
            viewRow: o.checkFnValue(this, t.o.editing.viewRow),
          });
      },
      preinit: function (i) {
        var n = this;
        this.ft.raise("preinit.ft.editing", [i]).then(
          function () {
            if (
              (n.ft.$el.hasClass("footable-editing") && (n.enabled = !0),
              (n.enabled = o.is.boolean(i.editing) ? i.editing : n.enabled),
              n.enabled)
            ) {
              if (
                ((n.pageToNew = o.is.boolean(i.editingPageToNew)
                  ? i.editingPageToNew
                  : n.pageToNew),
                (n.alwaysShow = o.is.boolean(i.editingAlwaysShow)
                  ? i.editingAlwaysShow
                  : n.alwaysShow),
                (n.position = o.is.string(i.editingPosition)
                  ? i.editingPosition
                  : n.position),
                (n.showText = o.is.string(i.editingShowText)
                  ? i.editingShowText
                  : n.showText),
                (n.hideText = o.is.string(i.editingHideText)
                  ? i.editingHideText
                  : n.hideText),
                (n.addText = o.is.string(i.editingAddText)
                  ? i.editingAddText
                  : n.addText),
                (n.editText = o.is.string(i.editingEditText)
                  ? i.editingEditText
                  : n.editText),
                (n.deleteText = o.is.string(i.editingDeleteText)
                  ? i.editingDeleteText
                  : n.deleteText),
                (n.viewText = o.is.string(i.editingViewText)
                  ? i.editingViewText
                  : n.viewText),
                (n.allowAdd = o.is.boolean(i.editingAllowAdd)
                  ? i.editingAllowAdd
                  : n.allowAdd),
                (n.allowEdit = o.is.boolean(i.editingAllowEdit)
                  ? i.editingAllowEdit
                  : n.allowEdit),
                (n.allowDelete = o.is.boolean(i.editingAllowDelete)
                  ? i.editingAllowDelete
                  : n.allowDelete),
                (n.allowView = o.is.boolean(i.editingAllowView)
                  ? i.editingAllowView
                  : n.allowView),
                (n.column = new o.EditingColumn(
                  n.ft,
                  n,
                  s.extend(!0, {}, n.column, i.editingColumn, {
                    visible: n.alwaysShow,
                  })
                )),
                n.ft.$el.hasClass("footable-editing-left") &&
                  (n.position = "left"),
                n.ft.$el.hasClass("footable-editing-right") &&
                  (n.position = "right"),
                "right" === n.position)
              )
                n.column.index = n.ft.columns.array.length;
              else
                for (
                  var t = (n.column.index = 0), e = n.ft.columns.array.length;
                  t < e;
                  t++
                )
                  n.ft.columns.array[t].index += 1;
              n.ft.columns.array.push(n.column),
                n.ft.columns.array.sort(function (t, e) {
                  return t.index - e.index;
                }),
                (n.callbacks.addRow = o.checkFnValue(
                  n,
                  i.editingAddRow,
                  n.callbacks.addRow
                )),
                (n.callbacks.editRow = o.checkFnValue(
                  n,
                  i.editingEditRow,
                  n.callbacks.editRow
                )),
                (n.callbacks.deleteRow = o.checkFnValue(
                  n,
                  i.editingDeleteRow,
                  n.callbacks.deleteRow
                )),
                (n.callbacks.viewRow = o.checkFnValue(
                  n,
                  i.editingViewRow,
                  n.callbacks.viewRow
                ));
            }
          },
          function () {
            n.enabled = !1;
          }
        );
      },
      init: function () {
        var t = this;
        this.ft.raise("init.ft.editing").then(
          function () {
            t.$create();
          },
          function () {
            t.enabled = !1;
          }
        );
      },
      destroy: function () {
        var t = this;
        this.ft.raise("destroy.ft.editing").then(function () {
          t.ft.$el
            .removeClass(
              "footable-editing footable-editing-always-show footable-editing-no-add footable-editing-no-edit footable-editing-no-delete footable-editing-no-view"
            )
            .off("click.ft.editing")
            .find("tfoot > tr.footable-editing")
            .remove();
        });
      },
      $create: function () {
        var t = this,
          e =
            "right" === t.position
              ? "footable-editing-right"
              : "footable-editing-left";
        t.ft.$el
          .addClass("footable-editing")
          .addClass(e)
          .on("click.ft.editing", ".footable-show", { self: t }, t._onShowClick)
          .on("click.ft.editing", ".footable-hide", { self: t }, t._onHideClick)
          .on("click.ft.editing", ".footable-edit", { self: t }, t._onEditClick)
          .on(
            "click.ft.editing",
            ".footable-delete",
            { self: t },
            t._onDeleteClick
          )
          .on("click.ft.editing", ".footable-view", { self: t }, t._onViewClick)
          .on("click.ft.editing", ".footable-add", { self: t }, t._onAddClick),
          (t.$cell = s("<td/>")
            .attr("colspan", t.ft.columns.visibleColspan)
            .append(t.$buttonShow())),
          t.allowAdd && t.$cell.append(t.$buttonAdd()),
          t.$cell.append(t.$buttonHide()),
          t.alwaysShow && t.ft.$el.addClass("footable-editing-always-show"),
          t.allowAdd || t.ft.$el.addClass("footable-editing-no-add"),
          t.allowEdit || t.ft.$el.addClass("footable-editing-no-edit"),
          t.allowDelete || t.ft.$el.addClass("footable-editing-no-delete"),
          t.allowView || t.ft.$el.addClass("footable-editing-no-view");
        var i = t.ft.$el.children("tfoot");
        0 == i.length && ((i = s("<tfoot/>")), t.ft.$el.append(i)),
          (t.$row = s("<tr/>", { class: "footable-editing" })
            .append(t.$cell)
            .appendTo(i));
      },
      $buttonShow: function () {
        return (
          '<button type="button" className="btn btn-primary footable-show">' +
          this.showText +
          "</button>"
        );
      },
      $buttonHide: function () {
        return (
          '<button type="button" className="btn btn-default footable-hide">' +
          this.hideText +
          "</button>"
        );
      },
      $buttonAdd: function () {
        return (
          '<button type="button" className="btn btn-primary footable-add">' +
          this.addText +
          "</button> "
        );
      },
      $buttonEdit: function () {
        return (
          '<button type="button" className="btn btn-default footable-edit">' +
          this.editText +
          "</button> "
        );
      },
      $buttonDelete: function () {
        return (
          '<button type="button" className="btn btn-default footable-delete">' +
          this.deleteText +
          "</button>"
        );
      },
      $buttonView: function () {
        return (
          '<button type="button" className="btn btn-default footable-view">' +
          this.viewText +
          "</button> "
        );
      },
      $rowButtons: function () {
        return o.is.jq(this._$buttons)
          ? this._$buttons.clone()
          : ((this._$buttons = s(
              '<div className="btn-group btn-group-xs" role="group"></div>'
            )),
            this.allowView && this._$buttons.append(this.$buttonView()),
            this.allowEdit && this._$buttons.append(this.$buttonEdit()),
            this.allowDelete && this._$buttons.append(this.$buttonDelete()),
            this._$buttons);
      },
      draw: function () {
        this.$cell.attr("colspan", this.ft.columns.visibleColspan);
      },
      _onEditClick: function (t) {
        t.preventDefault();
        var e = t.data.self,
          i = s(this).closest("tr").data("__FooTableRow__");
        i instanceof o.Row &&
          e.ft.raise("edit.ft.editing", [i]).then(function () {
            e.callbacks.editRow.call(e.ft, i);
          });
      },
      _onDeleteClick: function (t) {
        t.preventDefault();
        var e = t.data.self,
          i = s(this).closest("tr").data("__FooTableRow__");
        i instanceof o.Row &&
          e.ft.raise("delete.ft.editing", [i]).then(function () {
            e.callbacks.deleteRow.call(e.ft, i);
          });
      },
      _onViewClick: function (t) {
        t.preventDefault();
        var e = t.data.self,
          i = s(this).closest("tr").data("__FooTableRow__");
        i instanceof o.Row &&
          e.ft.raise("view.ft.editing", [i]).then(function () {
            e.callbacks.viewRow.call(e.ft, i);
          });
      },
      _onAddClick: function (t) {
        t.preventDefault();
        var e = t.data.self;
        e.ft.raise("add.ft.editing").then(function () {
          e.callbacks.addRow.call(e.ft);
        });
      },
      _onShowClick: function (t) {
        t.preventDefault();
        var e = t.data.self;
        e.ft.raise("show.ft.editing").then(function () {
          e.ft.$el.addClass("footable-editing-show"),
            (e.column.visible = !0),
            e.ft.draw();
        });
      },
      _onHideClick: function (t) {
        t.preventDefault();
        var e = t.data.self;
        e.ft.raise("hide.ft.editing").then(function () {
          e.ft.$el.removeClass("footable-editing-show"),
            (e.column.visible = !1),
            e.ft.draw();
        });
      },
    })),
      o.components.register("editing", o.Editing, 850);
  })(jQuery, FooTable),
  (function (n, s) {
    (s.EditingColumn = s.Column.extend({
      construct: function (t, e, i) {
        this._super(t, i, "editing"), (this.editing = e);
      },
      $create: function () {
        (this.$el =
          !this.virtual && s.is.jq(this.$el)
            ? this.$el
            : n("<th/>", { class: "footable-editing" })).html(this.title);
      },
      parser: function (t) {
        if (
          (s.is.string(t) && (t = n(n.trim(t))),
          s.is.element(t) && (t = n(t)),
          s.is.jq(t))
        ) {
          var e = t.prop("tagName").toLowerCase();
          return "td" == e || "th" == e ? t.data("value") || t.contents() : t;
        }
        return null;
      },
      createCell: function (t) {
        var e = this.editing.$rowButtons(),
          i = n("<td/>").append(e);
        return (
          s.is.jq(t.$el) &&
            (0 === this.index
              ? i.prependTo(t.$el)
              : i.insertAfter(t.$el.children().eq(this.index - 1))),
          new s.Cell(this.ft, t, this, i || i.html())
        );
      },
    })),
      s.columns.register("editing", s.EditingColumn);
  })(jQuery, FooTable),
  jQuery,
  (FooTable.Defaults.prototype.editing = {
    enabled: !1,
    pageToNew: !0,
    position: "right",
    alwaysShow: !1,
    addRow: function () {},
    editRow: function (t) {},
    deleteRow: function (t) {},
    viewRow: function (t) {},
    showText:
      '<span className="fooicon fooicon-pencil" aria-hidden="true"></span> Edit rows',
    hideText: "Cancel",
    addText: "New row",
    editText:
      '<span className="fooicon fooicon-pencil" aria-hidden="true"></span>',
    deleteText:
      '<span className="fooicon fooicon-trash" aria-hidden="true"></span>',
    viewText:
      '<span className="fooicon fooicon-stats" aria-hidden="true"></span>',
    allowAdd: !0,
    allowEdit: !0,
    allowDelete: !0,
    allowView: !1,
    column: {
      classes: "footable-editing",
      name: "editing",
      title: "",
      filterable: !1,
      sortable: !1,
    },
  }),
  (function (t, e) {
    e.is.defined(e.Paging) &&
      ((e.Paging.prototype.unpaged = []),
      e.Paging.extend("predraw", function () {
        (this.unpaged = this.ft.rows.array.slice(0)), this._super();
      }));
  })(jQuery, FooTable),
  (function (t, o) {
    (o.Row.prototype.add = function (i) {
      i = !o.is.boolean(i) || i;
      var n = this;
      return t.Deferred(function (t) {
        var e = n.ft.rows.all.push(n) - 1;
        return i
          ? n.ft.draw().then(function () {
              t.resolve(e);
            })
          : void t.resolve(e);
      });
    }),
      (o.Row.prototype.delete = function (i) {
        i = !o.is.boolean(i) || i;
        var n = this;
        return t.Deferred(function (t) {
          var e = n.ft.rows.all.indexOf(n);
          return o.is.number(e) &&
            0 <= e &&
            e < n.ft.rows.all.length &&
            (n.ft.rows.all.splice(e, 1), i)
            ? n.ft.draw().then(function () {
                t.resolve(n);
              })
            : void t.resolve(n);
        });
      }),
      o.is.defined(o.Paging) &&
        o.Row.extend("add", function (t) {
          t = !o.is.boolean(t) || t;
          var i,
            n = this,
            e = this._super(t),
            s = n.ft.use(o.Editing);
          return s && s.pageToNew && (i = n.ft.use(o.Paging)) && t
            ? e.then(function () {
                var t = i.unpaged.indexOf(n),
                  e = Math.ceil((t + 1) / i.size);
                return i.current !== e ? i.goto(e) : void 0;
              })
            : e;
        }),
      o.is.defined(o.Sorting) &&
        o.Row.extend("val", function (t, e) {
          e = !o.is.boolean(e) || e;
          var i = this._super(t);
          if (!o.is.hash(t)) return i;
          var s = this;
          return (
            e &&
              s.ft.draw().then(function () {
                var t,
                  e = s.ft.use(o.Editing);
                if (
                  o.is.defined(o.Paging) &&
                  e &&
                  e.pageToNew &&
                  (t = s.ft.use(o.Paging))
                ) {
                  var i = t.unpaged.indexOf(s),
                    n = Math.ceil((i + 1) / t.size);
                  if (t.current !== n) return t.goto(n);
                }
              }),
            i
          );
        });
  })(jQuery, FooTable),
  (function (o) {
    (o.Rows.prototype.add = function (t, e) {
      var i = t;
      o.is.hash(t) && (i = new FooTable.Row(this.ft, this.ft.columns.array, t)),
        i instanceof FooTable.Row && i.add(e);
    }),
      (o.Rows.prototype.update = function (t, e, i) {
        var n = this.ft.rows.all.length,
          s = t;
        o.is.number(t) && 0 <= t && t < n && (s = this.ft.rows.all[t]),
          s instanceof FooTable.Row && o.is.hash(e) && s.val(e, i);
      }),
      (o.Rows.prototype.delete = function (t, e) {
        var i = this.ft.rows.all.length,
          n = t;
        o.is.number(t) && 0 <= t && t < i && (n = this.ft.rows.all[t]),
          n instanceof FooTable.Row && n.delete(e);
      });
  })(FooTable),
  (function (t, i) {
    var e = 0,
      n = (function (t) {
        var e,
          i,
          n = 2166136261;
        for (e = 0, i = t.length; e < i; e++)
          (n ^= t.charCodeAt(e)),
            (n += (n << 1) + (n << 4) + (n << 7) + (n << 8) + (n << 24));
        return n >>> 0;
      })(location.origin + location.pathname);
    (i.State = i.Component.extend({
      construct: function (t) {
        this._super(t, t.o.state.enabled),
          (this._key = "1"),
          (this.key =
            this._key +
            (i.is.string(t.o.state.key) ? t.o.state.key : this._uid())),
          (this.filtering =
            !i.is.boolean(t.o.state.filtering) || t.o.state.filtering),
          (this.paging = !i.is.boolean(t.o.state.paging) || t.o.state.paging),
          (this.sorting =
            !i.is.boolean(t.o.state.sorting) || t.o.state.sorting);
      },
      preinit: function (t) {
        var e = this;
        this.ft.raise("preinit.ft.state", [t]).then(
          function () {
            (e.enabled = i.is.boolean(t.state) ? t.state : e.enabled),
              e.enabled &&
                ((e.key =
                  e._key + (i.is.string(t.stateKey) ? t.stateKey : e.key)),
                (e.filtering = i.is.boolean(t.stateFiltering)
                  ? t.stateFiltering
                  : e.filtering),
                (e.paging = i.is.boolean(t.statePaging)
                  ? t.statePaging
                  : e.paging),
                (e.sorting = i.is.boolean(t.stateSorting)
                  ? t.stateSorting
                  : e.sorting));
          },
          function () {
            e.enabled = !1;
          }
        );
      },
      get: function (t) {
        return JSON.parse(localStorage.getItem(this.key + ":" + t));
      },
      set: function (t, e) {
        localStorage.setItem(this.key + ":" + t, JSON.stringify(e));
      },
      remove: function (t) {
        localStorage.removeItem(this.key + ":" + t);
      },
      read: function () {
        this.ft.execute(!1, !0, "readState");
      },
      write: function () {
        this.ft.execute(!1, !0, "writeState");
      },
      clear: function () {
        this.ft.execute(!1, !0, "clearState");
      },
      _uid: function () {
        var t = this.ft.$el.attr("id");
        return n + "_" + (i.is.string(t) ? t : ++e);
      },
    })),
      i.components.register("state", i.State, 700);
  })(jQuery, FooTable),
  (function (t) {
    (t.Component.prototype.readState = function () {}),
      (t.Component.prototype.writeState = function () {}),
      (t.Component.prototype.clearState = function () {});
  })(FooTable),
  (FooTable.Defaults.prototype.state = {
    enabled: !1,
    filtering: !0,
    paging: !0,
    sorting: !0,
    key: null,
  }),
  (function (e) {
    e.Filtering &&
      ((e.Filtering.prototype.readState = function () {
        if (this.ft.state.filtering) {
          var t = this.ft.state.get("filtering");
          e.is.hash(t) &&
            !e.is.emptyArray(t.filters) &&
            (this.filters = this.ensure(t.filters));
        }
      }),
      (e.Filtering.prototype.writeState = function () {
        if (this.ft.state.filtering) {
          var t = e.arr.map(this.filters, function (t) {
            return {
              name: t.name,
              query: t.query instanceof e.Query ? t.query.val() : t.query,
              columns: e.arr.map(t.columns, function (t) {
                return t.name;
              }),
              hidden: t.hidden,
              space: t.space,
              connectors: t.connectors,
              ignoreCase: t.ignoreCase,
            };
          });
          this.ft.state.set("filtering", { filters: t });
        }
      }),
      (e.Filtering.prototype.clearState = function () {
        this.ft.state.filtering && this.ft.state.remove("filtering");
      }));
  })(FooTable),
  (function (e) {
    e.Paging &&
      ((e.Paging.prototype.readState = function () {
        if (this.ft.state.paging) {
          var t = this.ft.state.get("paging");
          e.is.hash(t) && ((this.current = t.current), (this.size = t.size));
        }
      }),
      (e.Paging.prototype.writeState = function () {
        this.ft.state.paging &&
          this.ft.state.set("paging", {
            current: this.current,
            size: this.size,
          });
      }),
      (e.Paging.prototype.clearState = function () {
        this.ft.state.paging && this.ft.state.remove("paging");
      }));
  })(FooTable),
  (function (i) {
    i.Sorting &&
      ((i.Sorting.prototype.readState = function () {
        if (this.ft.state.sorting) {
          var t = this.ft.state.get("sorting");
          if (i.is.hash(t)) {
            var e = this.ft.columns.get(t.column);
            e instanceof i.Column &&
              ((this.column = e), (this.column.direction = t.direction));
          }
        }
      }),
      (i.Sorting.prototype.writeState = function () {
        this.ft.state.sorting &&
          this.column instanceof i.Column &&
          this.ft.state.set("sorting", {
            column: this.column.name,
            direction: this.column.direction,
          });
      }),
      (i.Sorting.prototype.clearState = function () {
        this.ft.state.sorting && this.ft.state.remove("sorting");
      }));
  })(FooTable),
  (function (t) {
    t.Table.extend("_construct", function (t) {
      (this.state = this.use(FooTable.State)), this._super(t);
    }),
      t.Table.extend("_preinit", function () {
        var t = this;
        return t._super().then(function () {
          t.state.enabled && t.state.read();
        });
      }),
      t.Table.extend("draw", function () {
        var t = this;
        return t._super().then(function () {
          t.state.enabled && t.state.write();
        });
      });
  })(FooTable);
