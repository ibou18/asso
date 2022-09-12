!(function (t) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).Chart = t();
  }
})(function () {
  return (function r(o, s, l) {
    function d(i, t) {
      if (!s[i]) {
        if (!o[i]) {
          var e = "function" == typeof require && require;
          if (!t && e) return e(i, !0);
          if (u) return u(i, !0);
          var n = new Error("Cannot find module '" + i + "'");
          throw ((n.code = "MODULE_NOT_FOUND"), n);
        }
        var a = (s[i] = { exports: {} });
        o[i][0].call(
          a.exports,
          function (t) {
            var e = o[i][1][t];
            return d(e || t);
          },
          a,
          a.exports,
          r,
          o,
          s,
          l
        );
      }
      return s[i].exports;
    }
    for (
      var u = "function" == typeof require && require, t = 0;
      t < l.length;
      t++
    )
      d(l[t]);
    return d;
  })(
    {
      1: [
        function (t, e, i) {
          var r = t(5);
          function n(t) {
            if (t) {
              var e = [0, 0, 0],
                i = 1,
                n = t.match(/^#([a-fA-F0-9]{3})$/);
              if (n) {
                n = n[1];
                for (var a = 0; a < e.length; a++)
                  e[a] = parseInt(n[a] + n[a], 16);
              } else if ((n = t.match(/^#([a-fA-F0-9]{6})$/))) {
                n = n[1];
                for (a = 0; a < e.length; a++)
                  e[a] = parseInt(n.slice(2 * a, 2 * a + 2), 16);
              } else if (
                (n = t.match(
                  /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
                ))
              ) {
                for (a = 0; a < e.length; a++) e[a] = parseInt(n[a + 1]);
                i = parseFloat(n[4]);
              } else if (
                (n = t.match(
                  /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
                ))
              ) {
                for (a = 0; a < e.length; a++)
                  e[a] = Math.round(2.55 * parseFloat(n[a + 1]));
                i = parseFloat(n[4]);
              } else if ((n = t.match(/(\w+)/))) {
                if ("transparent" == n[1]) return [0, 0, 0, 0];
                if (!(e = r[n[1]])) return;
              }
              for (a = 0; a < e.length; a++) e[a] = u(e[a], 0, 255);
              return (i = i || 0 == i ? u(i, 0, 1) : 1), (e[3] = i), e;
            }
          }
          function a(t) {
            if (t) {
              var e = t.match(
                /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/
              );
              if (e) {
                var i = parseFloat(e[4]);
                return [
                  u(parseInt(e[1]), 0, 360),
                  u(parseFloat(e[2]), 0, 100),
                  u(parseFloat(e[3]), 0, 100),
                  u(isNaN(i) ? 1 : i, 0, 1),
                ];
              }
            }
          }
          function o(t) {
            if (t) {
              var e = t.match(
                /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/
              );
              if (e) {
                var i = parseFloat(e[4]);
                return [
                  u(parseInt(e[1]), 0, 360),
                  u(parseFloat(e[2]), 0, 100),
                  u(parseFloat(e[3]), 0, 100),
                  u(isNaN(i) ? 1 : i, 0, 1),
                ];
              }
            }
          }
          function s(t, e) {
            return (
              void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
              "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
            );
          }
          function l(t, e) {
            return (
              "rgba(" +
              Math.round((t[0] / 255) * 100) +
              "%, " +
              Math.round((t[1] / 255) * 100) +
              "%, " +
              Math.round((t[2] / 255) * 100) +
              "%, " +
              (e || t[3] || 1) +
              ")"
            );
          }
          function d(t, e) {
            return (
              void 0 === e && (e = void 0 !== t[3] ? t[3] : 1),
              "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
            );
          }
          function u(t, e, i) {
            return Math.min(Math.max(e, t), i);
          }
          function h(t) {
            var e = t.toString(16).toUpperCase();
            return e.length < 2 ? "0" + e : e;
          }
          e.exports = {
            getRgba: n,
            getHsla: a,
            getRgb: function (t) {
              var e = n(t);
              return e && e.slice(0, 3);
            },
            getHsl: function (t) {
              var e = a(t);
              return e && e.slice(0, 3);
            },
            getHwb: o,
            getAlpha: function (t) {
              var e = n(t);
              {
                if (e) return e[3];
                if ((e = a(t))) return e[3];
                if ((e = o(t))) return e[3];
              }
            },
            hexString: function (t) {
              return "#" + h(t[0]) + h(t[1]) + h(t[2]);
            },
            rgbString: function (t, e) {
              if (e < 1 || (t[3] && t[3] < 1)) return s(t, e);
              return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
            },
            rgbaString: s,
            percentString: function (t, e) {
              if (e < 1 || (t[3] && t[3] < 1)) return l(t, e);
              var i = Math.round((t[0] / 255) * 100),
                n = Math.round((t[1] / 255) * 100),
                a = Math.round((t[2] / 255) * 100);
              return "rgb(" + i + "%, " + n + "%, " + a + "%)";
            },
            percentaString: l,
            hslString: function (t, e) {
              if (e < 1 || (t[3] && t[3] < 1)) return d(t, e);
              return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)";
            },
            hslaString: d,
            hwbString: function (t, e) {
              void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);
              return (
                "hwb(" +
                t[0] +
                ", " +
                t[1] +
                "%, " +
                t[2] +
                "%" +
                (void 0 !== e && 1 !== e ? ", " + e : "") +
                ")"
              );
            },
            keyword: function (t) {
              return c[t.slice(0, 3)];
            },
          };
          var c = {};
          for (var f in r) c[r[f]] = f;
        },
        { 5: 5 },
      ],
      2: [
        function (t, e, i) {
          var u = t(4),
            n = t(1),
            o = function (t) {
              if (t instanceof o) return t;
              if (!(this instanceof o)) return new o(t);
              var e;
              if (
                ((this.values = {
                  rgb: [0, 0, 0],
                  hsl: [0, 0, 0],
                  hsv: [0, 0, 0],
                  hwb: [0, 0, 0],
                  cmyk: [0, 0, 0, 0],
                  alpha: 1,
                }),
                "string" == typeof t)
              )
                if ((e = n.getRgba(t))) this.setValues("rgb", e);
                else if ((e = n.getHsla(t))) this.setValues("hsl", e);
                else {
                  if (!(e = n.getHwb(t)))
                    throw new Error(
                      'Unable to parse color from string "' + t + '"'
                    );
                  this.setValues("hwb", e);
                }
              else if ("object" == typeof t)
                if (void 0 !== (e = t).r || void 0 !== e.red)
                  this.setValues("rgb", e);
                else if (void 0 !== e.l || void 0 !== e.lightness)
                  this.setValues("hsl", e);
                else if (void 0 !== e.v || void 0 !== e.value)
                  this.setValues("hsv", e);
                else if (void 0 !== e.w || void 0 !== e.whiteness)
                  this.setValues("hwb", e);
                else {
                  if (void 0 === e.c && void 0 === e.cyan)
                    throw new Error(
                      "Unable to parse color from object " + JSON.stringify(t)
                    );
                  this.setValues("cmyk", e);
                }
            };
          (o.prototype = {
            rgb: function () {
              return this.setSpace("rgb", arguments);
            },
            hsl: function () {
              return this.setSpace("hsl", arguments);
            },
            hsv: function () {
              return this.setSpace("hsv", arguments);
            },
            hwb: function () {
              return this.setSpace("hwb", arguments);
            },
            cmyk: function () {
              return this.setSpace("cmyk", arguments);
            },
            rgbArray: function () {
              return this.values.rgb;
            },
            hslArray: function () {
              return this.values.hsl;
            },
            hsvArray: function () {
              return this.values.hsv;
            },
            hwbArray: function () {
              var t = this.values;
              return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb;
            },
            cmykArray: function () {
              return this.values.cmyk;
            },
            rgbaArray: function () {
              var t = this.values;
              return t.rgb.concat([t.alpha]);
            },
            hslaArray: function () {
              var t = this.values;
              return t.hsl.concat([t.alpha]);
            },
            alpha: function (t) {
              return void 0 === t
                ? this.values.alpha
                : (this.setValues("alpha", t), this);
            },
            red: function (t) {
              return this.setChannel("rgb", 0, t);
            },
            green: function (t) {
              return this.setChannel("rgb", 1, t);
            },
            blue: function (t) {
              return this.setChannel("rgb", 2, t);
            },
            hue: function (t) {
              return (
                t && (t = (t %= 360) < 0 ? 360 + t : t),
                this.setChannel("hsl", 0, t)
              );
            },
            saturation: function (t) {
              return this.setChannel("hsl", 1, t);
            },
            lightness: function (t) {
              return this.setChannel("hsl", 2, t);
            },
            saturationv: function (t) {
              return this.setChannel("hsv", 1, t);
            },
            whiteness: function (t) {
              return this.setChannel("hwb", 1, t);
            },
            blackness: function (t) {
              return this.setChannel("hwb", 2, t);
            },
            value: function (t) {
              return this.setChannel("hsv", 2, t);
            },
            cyan: function (t) {
              return this.setChannel("cmyk", 0, t);
            },
            magenta: function (t) {
              return this.setChannel("cmyk", 1, t);
            },
            yellow: function (t) {
              return this.setChannel("cmyk", 2, t);
            },
            black: function (t) {
              return this.setChannel("cmyk", 3, t);
            },
            hexString: function () {
              return n.hexString(this.values.rgb);
            },
            rgbString: function () {
              return n.rgbString(this.values.rgb, this.values.alpha);
            },
            rgbaString: function () {
              return n.rgbaString(this.values.rgb, this.values.alpha);
            },
            percentString: function () {
              return n.percentString(this.values.rgb, this.values.alpha);
            },
            hslString: function () {
              return n.hslString(this.values.hsl, this.values.alpha);
            },
            hslaString: function () {
              return n.hslaString(this.values.hsl, this.values.alpha);
            },
            hwbString: function () {
              return n.hwbString(this.values.hwb, this.values.alpha);
            },
            keyword: function () {
              return n.keyword(this.values.rgb, this.values.alpha);
            },
            rgbNumber: function () {
              var t = this.values.rgb;
              return (t[0] << 16) | (t[1] << 8) | t[2];
            },
            luminosity: function () {
              for (var t = this.values.rgb, e = [], i = 0; i < t.length; i++) {
                var n = t[i] / 255;
                e[i] =
                  n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
              }
              return 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
            },
            contrast: function (t) {
              var e = this.luminosity(),
                i = t.luminosity();
              return i < e ? (e + 0.05) / (i + 0.05) : (i + 0.05) / (e + 0.05);
            },
            level: function (t) {
              var e = this.contrast(t);
              return 7.1 <= e ? "AAA" : 4.5 <= e ? "AA" : "";
            },
            dark: function () {
              var t = this.values.rgb;
              return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128;
            },
            light: function () {
              return !this.dark();
            },
            negate: function () {
              for (var t = [], e = 0; e < 3; e++)
                t[e] = 255 - this.values.rgb[e];
              return this.setValues("rgb", t), this;
            },
            lighten: function (t) {
              var e = this.values.hsl;
              return (e[2] += e[2] * t), this.setValues("hsl", e), this;
            },
            darken: function (t) {
              var e = this.values.hsl;
              return (e[2] -= e[2] * t), this.setValues("hsl", e), this;
            },
            saturate: function (t) {
              var e = this.values.hsl;
              return (e[1] += e[1] * t), this.setValues("hsl", e), this;
            },
            desaturate: function (t) {
              var e = this.values.hsl;
              return (e[1] -= e[1] * t), this.setValues("hsl", e), this;
            },
            whiten: function (t) {
              var e = this.values.hwb;
              return (e[1] += e[1] * t), this.setValues("hwb", e), this;
            },
            blacken: function (t) {
              var e = this.values.hwb;
              return (e[2] += e[2] * t), this.setValues("hwb", e), this;
            },
            greyscale: function () {
              var t = this.values.rgb,
                e = 0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2];
              return this.setValues("rgb", [e, e, e]), this;
            },
            clearer: function (t) {
              var e = this.values.alpha;
              return this.setValues("alpha", e - e * t), this;
            },
            opaquer: function (t) {
              var e = this.values.alpha;
              return this.setValues("alpha", e + e * t), this;
            },
            rotate: function (t) {
              var e = this.values.hsl,
                i = (e[0] + t) % 360;
              return (
                (e[0] = i < 0 ? 360 + i : i), this.setValues("hsl", e), this
              );
            },
            mix: function (t, e) {
              var i = this,
                n = t,
                a = void 0 === e ? 0.5 : e,
                r = 2 * a - 1,
                o = i.alpha() - n.alpha(),
                s = ((r * o == -1 ? r : (r + o) / (1 + r * o)) + 1) / 2,
                l = 1 - s;
              return this.rgb(
                s * i.red() + l * n.red(),
                s * i.green() + l * n.green(),
                s * i.blue() + l * n.blue()
              ).alpha(i.alpha() * a + n.alpha() * (1 - a));
            },
            toJSON: function () {
              return this.rgb();
            },
            clone: function () {
              var t,
                e,
                i = new o(),
                n = this.values,
                a = i.values;
              for (var r in n)
                n.hasOwnProperty(r) &&
                  ((t = n[r]),
                  "[object Array]" === (e = {}.toString.call(t))
                    ? (a[r] = t.slice(0))
                    : "[object Number]" === e
                    ? (a[r] = t)
                    : console.error("unexpected color value:", t));
              return i;
            },
          }),
            (o.prototype.spaces = {
              rgb: ["red", "green", "blue"],
              hsl: ["hue", "saturation", "lightness"],
              hsv: ["hue", "saturation", "value"],
              hwb: ["hue", "whiteness", "blackness"],
              cmyk: ["cyan", "magenta", "yellow", "black"],
            }),
            (o.prototype.maxes = {
              rgb: [255, 255, 255],
              hsl: [360, 100, 100],
              hsv: [360, 100, 100],
              hwb: [360, 100, 100],
              cmyk: [100, 100, 100, 100],
            }),
            (o.prototype.getValues = function (t) {
              for (var e = this.values, i = {}, n = 0; n < t.length; n++)
                i[t.charAt(n)] = e[t][n];
              return 1 !== e.alpha && (i.a = e.alpha), i;
            }),
            (o.prototype.setValues = function (t, e) {
              var i,
                n,
                a = this.values,
                r = this.spaces,
                o = this.maxes,
                s = 1;
              if ("alpha" === t) s = e;
              else if (e.length)
                (a[t] = e.slice(0, t.length)), (s = e[t.length]);
              else if (void 0 !== e[t.charAt(0)]) {
                for (i = 0; i < t.length; i++) a[t][i] = e[t.charAt(i)];
                s = e.a;
              } else if (void 0 !== e[r[t][0]]) {
                var l = r[t];
                for (i = 0; i < t.length; i++) a[t][i] = e[l[i]];
                s = e.alpha;
              }
              if (
                ((a.alpha = Math.max(
                  0,
                  Math.min(1, void 0 === s ? a.alpha : s)
                )),
                "alpha" === t)
              )
                return !1;
              for (i = 0; i < t.length; i++)
                (n = Math.max(0, Math.min(o[t][i], a[t][i]))),
                  (a[t][i] = Math.round(n));
              for (var d in r) d !== t && (a[d] = u[t][d](a[t]));
              return !0;
            }),
            (o.prototype.setSpace = function (t, e) {
              var i = e[0];
              return void 0 === i
                ? this.getValues(t)
                : ("number" == typeof i && (i = Array.prototype.slice.call(e)),
                  this.setValues(t, i),
                  this);
            }),
            (o.prototype.setChannel = function (t, e, i) {
              var n = this.values[t];
              return void 0 === i
                ? n[e]
                : (i === n[e] || ((n[e] = i), this.setValues(t, n)), this);
            }),
            "undefined" != typeof window && (window.Color = o),
            (e.exports = o);
        },
        { 1: 1, 4: 4 },
      ],
      3: [
        function (t, e, i) {
          function a(t) {
            var e,
              i,
              n = t[0] / 255,
              a = t[1] / 255,
              r = t[2] / 255,
              o = Math.min(n, a, r),
              s = Math.max(n, a, r),
              l = s - o;
            return (
              s == o
                ? (e = 0)
                : n == s
                ? (e = (a - r) / l)
                : a == s
                ? (e = 2 + (r - n) / l)
                : r == s && (e = 4 + (n - a) / l),
              (e = Math.min(60 * e, 360)) < 0 && (e += 360),
              (i = (o + s) / 2),
              [
                e,
                100 * (s == o ? 0 : i <= 0.5 ? l / (s + o) : l / (2 - s - o)),
                100 * i,
              ]
            );
          }
          function n(t) {
            var e,
              i,
              n = t[0],
              a = t[1],
              r = t[2],
              o = Math.min(n, a, r),
              s = Math.max(n, a, r),
              l = s - o;
            return (
              (i = 0 == s ? 0 : ((l / s) * 1e3) / 10),
              s == o
                ? (e = 0)
                : n == s
                ? (e = (a - r) / l)
                : a == s
                ? (e = 2 + (r - n) / l)
                : r == s && (e = 4 + (n - a) / l),
              (e = Math.min(60 * e, 360)) < 0 && (e += 360),
              [e, i, ((s / 255) * 1e3) / 10]
            );
          }
          function o(t) {
            var e = t[0],
              i = t[1],
              n = t[2];
            return [
              a(t)[0],
              100 * ((1 / 255) * Math.min(e, Math.min(i, n))),
              100 * (n = 1 - (1 / 255) * Math.max(e, Math.max(i, n))),
            ];
          }
          function s(t) {
            var e,
              i = t[0] / 255,
              n = t[1] / 255,
              a = t[2] / 255;
            return [
              100 *
                ((1 - i - (e = Math.min(1 - i, 1 - n, 1 - a))) / (1 - e) || 0),
              100 * ((1 - n - e) / (1 - e) || 0),
              100 * ((1 - a - e) / (1 - e) || 0),
              100 * e,
            ];
          }
          function l(t) {
            return M[JSON.stringify(t)];
          }
          function d(t) {
            var e = t[0] / 255,
              i = t[1] / 255,
              n = t[2] / 255;
            return [
              100 *
                (0.4124 *
                  (e =
                    0.04045 < e
                      ? Math.pow((e + 0.055) / 1.055, 2.4)
                      : e / 12.92) +
                  0.3576 *
                    (i =
                      0.04045 < i
                        ? Math.pow((i + 0.055) / 1.055, 2.4)
                        : i / 12.92) +
                  0.1805 *
                    (n =
                      0.04045 < n
                        ? Math.pow((n + 0.055) / 1.055, 2.4)
                        : n / 12.92)),
              100 * (0.2126 * e + 0.7152 * i + 0.0722 * n),
              100 * (0.0193 * e + 0.1192 * i + 0.9505 * n),
            ];
          }
          function u(t) {
            var e = d(t),
              i = e[0],
              n = e[1],
              a = e[2];
            return (
              (n /= 100),
              (a /= 108.883),
              (i =
                0.008856 < (i /= 95.047)
                  ? Math.pow(i, 1 / 3)
                  : 7.787 * i + 16 / 116),
              [
                116 *
                  (n =
                    0.008856 < n ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) -
                  16,
                500 * (i - n),
                200 *
                  (n -
                    (a =
                      0.008856 < a
                        ? Math.pow(a, 1 / 3)
                        : 7.787 * a + 16 / 116)),
              ]
            );
          }
          function h(t) {
            var e,
              i,
              n,
              a,
              r,
              o = t[0] / 360,
              s = t[1] / 100,
              l = t[2] / 100;
            if (0 == s) return [(r = 255 * l), r, r];
            (e = 2 * l - (i = l < 0.5 ? l * (1 + s) : l + s - l * s)),
              (a = [0, 0, 0]);
            for (var d = 0; d < 3; d++)
              (n = o + (1 / 3) * -(d - 1)) < 0 && n++,
                1 < n && n--,
                (r =
                  6 * n < 1
                    ? e + 6 * (i - e) * n
                    : 2 * n < 1
                    ? i
                    : 3 * n < 2
                    ? e + (i - e) * (2 / 3 - n) * 6
                    : e),
                (a[d] = 255 * r);
            return a;
          }
          function c(t) {
            var e = t[0] / 60,
              i = t[1] / 100,
              n = t[2] / 100,
              a = Math.floor(e) % 6,
              r = e - Math.floor(e),
              o = 255 * n * (1 - i),
              s = 255 * n * (1 - i * r),
              l = 255 * n * (1 - i * (1 - r));
            n *= 255;
            switch (a) {
              case 0:
                return [n, l, o];
              case 1:
                return [s, n, o];
              case 2:
                return [o, n, l];
              case 3:
                return [o, s, n];
              case 4:
                return [l, o, n];
              case 5:
                return [n, o, s];
            }
          }
          function f(t) {
            var e,
              i,
              n,
              a,
              o = t[0] / 360,
              s = t[1] / 100,
              l = t[2] / 100,
              d = s + l;
            switch (
              (1 < d && ((s /= d), (l /= d)),
              (n = 6 * o - (e = Math.floor(6 * o))),
              0 != (1 & e) && (n = 1 - n),
              (a = s + n * ((i = 1 - l) - s)),
              e)
            ) {
              default:
              case 6:
              case 0:
                (r = i), (g = a), (b = s);
                break;
              case 1:
                (r = a), (g = i), (b = s);
                break;
              case 2:
                (r = s), (g = i), (b = a);
                break;
              case 3:
                (r = s), (g = a), (b = i);
                break;
              case 4:
                (r = a), (g = s), (b = i);
                break;
              case 5:
                (r = i), (g = s), (b = a);
            }
            return [255 * r, 255 * g, 255 * b];
          }
          function p(t) {
            var e = t[0] / 100,
              i = t[1] / 100,
              n = t[2] / 100,
              a = t[3] / 100;
            return [
              255 * (1 - Math.min(1, e * (1 - a) + a)),
              255 * (1 - Math.min(1, i * (1 - a) + a)),
              255 * (1 - Math.min(1, n * (1 - a) + a)),
            ];
          }
          function m(t) {
            var e,
              i,
              n,
              a = t[0] / 100,
              r = t[1] / 100,
              o = t[2] / 100;
            return (
              (i = -0.9689 * a + 1.8758 * r + 0.0415 * o),
              (n = 0.0557 * a + -0.204 * r + 1.057 * o),
              (e =
                0.0031308 < (e = 3.2406 * a + -1.5372 * r + -0.4986 * o)
                  ? 1.055 * Math.pow(e, 1 / 2.4) - 0.055
                  : (e *= 12.92)),
              (i =
                0.0031308 < i
                  ? 1.055 * Math.pow(i, 1 / 2.4) - 0.055
                  : (i *= 12.92)),
              (n =
                0.0031308 < n
                  ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055
                  : (n *= 12.92)),
              [
                255 * (e = Math.min(Math.max(0, e), 1)),
                255 * (i = Math.min(Math.max(0, i), 1)),
                255 * (n = Math.min(Math.max(0, n), 1)),
              ]
            );
          }
          function v(t) {
            var e = t[0],
              i = t[1],
              n = t[2];
            return (
              (i /= 100),
              (n /= 108.883),
              (e =
                0.008856 < (e /= 95.047)
                  ? Math.pow(e, 1 / 3)
                  : 7.787 * e + 16 / 116),
              [
                116 *
                  (i =
                    0.008856 < i ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) -
                  16,
                500 * (e - i),
                200 *
                  (i -
                    (n =
                      0.008856 < n
                        ? Math.pow(n, 1 / 3)
                        : 7.787 * n + 16 / 116)),
              ]
            );
          }
          function y(t) {
            var e,
              i,
              n,
              a,
              r = t[0],
              o = t[1],
              s = t[2];
            return (
              (a =
                r <= 8
                  ? ((i = (100 * r) / 903.3) / 100) * 7.787 + 16 / 116
                  : ((i = 100 * Math.pow((r + 16) / 116, 3)),
                    Math.pow(i / 100, 1 / 3))),
              [
                (e =
                  e / 95.047 <= 0.008856
                    ? (e = (95.047 * (o / 500 + a - 16 / 116)) / 7.787)
                    : 95.047 * Math.pow(o / 500 + a, 3)),
                i,
                (n =
                  n / 108.883 <= 0.008859
                    ? (n = (108.883 * (a - s / 200 - 16 / 116)) / 7.787)
                    : 108.883 * Math.pow(a - s / 200, 3)),
              ]
            );
          }
          function x(t) {
            var e,
              i = t[0],
              n = t[1],
              a = t[2];
            return (
              (e = (360 * Math.atan2(a, n)) / 2 / Math.PI) < 0 && (e += 360),
              [i, Math.sqrt(n * n + a * a), e]
            );
          }
          function k(t) {
            return m(y(t));
          }
          function S(t) {
            var e,
              i = t[0],
              n = t[1];
            return (
              (e = (t[2] / 360) * 2 * Math.PI),
              [i, n * Math.cos(e), n * Math.sin(e)]
            );
          }
          function w(t) {
            return _[t];
          }
          e.exports = {
            rgb2hsl: a,
            rgb2hsv: n,
            rgb2hwb: o,
            rgb2cmyk: s,
            rgb2keyword: l,
            rgb2xyz: d,
            rgb2lab: u,
            rgb2lch: function (t) {
              return x(u(t));
            },
            hsl2rgb: h,
            hsl2hsv: function (t) {
              var e = t[0],
                i = t[1] / 100,
                n = t[2] / 100;
              return 0 !== n
                ? [
                    e,
                    100 * ((2 * (i *= (n *= 2) <= 1 ? n : 2 - n)) / (n + i)),
                    100 * ((n + i) / 2),
                  ]
                : [0, 0, 0];
            },
            hsl2hwb: function (t) {
              return o(h(t));
            },
            hsl2cmyk: function (t) {
              return s(h(t));
            },
            hsl2keyword: function (t) {
              return l(h(t));
            },
            hsv2rgb: c,
            hsv2hsl: function (t) {
              var e,
                i,
                n = t[0],
                a = t[1] / 100,
                r = t[2] / 100;
              return (
                (e = a * r),
                [
                  n,
                  100 * (e = (e /= (i = (2 - a) * r) <= 1 ? i : 2 - i) || 0),
                  100 * (i /= 2),
                ]
              );
            },
            hsv2hwb: function (t) {
              return o(c(t));
            },
            hsv2cmyk: function (t) {
              return s(c(t));
            },
            hsv2keyword: function (t) {
              return l(c(t));
            },
            hwb2rgb: f,
            hwb2hsl: function (t) {
              return a(f(t));
            },
            hwb2hsv: function (t) {
              return n(f(t));
            },
            hwb2cmyk: function (t) {
              return s(f(t));
            },
            hwb2keyword: function (t) {
              return l(f(t));
            },
            cmyk2rgb: p,
            cmyk2hsl: function (t) {
              return a(p(t));
            },
            cmyk2hsv: function (t) {
              return n(p(t));
            },
            cmyk2hwb: function (t) {
              return o(p(t));
            },
            cmyk2keyword: function (t) {
              return l(p(t));
            },
            keyword2rgb: w,
            keyword2hsl: function (t) {
              return a(w(t));
            },
            keyword2hsv: function (t) {
              return n(w(t));
            },
            keyword2hwb: function (t) {
              return o(w(t));
            },
            keyword2cmyk: function (t) {
              return s(w(t));
            },
            keyword2lab: function (t) {
              return u(w(t));
            },
            keyword2xyz: function (t) {
              return d(w(t));
            },
            xyz2rgb: m,
            xyz2lab: v,
            xyz2lch: function (t) {
              return x(v(t));
            },
            lab2xyz: y,
            lab2rgb: k,
            lab2lch: x,
            lch2lab: S,
            lch2xyz: function (t) {
              return y(S(t));
            },
            lch2rgb: function (t) {
              return k(S(t));
            },
          };
          var _ = {
              aliceblue: [240, 248, 255],
              antiquewhite: [250, 235, 215],
              aqua: [0, 255, 255],
              aquamarine: [127, 255, 212],
              azure: [240, 255, 255],
              beige: [245, 245, 220],
              bisque: [255, 228, 196],
              black: [0, 0, 0],
              blanchedalmond: [255, 235, 205],
              blue: [0, 0, 255],
              blueviolet: [138, 43, 226],
              brown: [165, 42, 42],
              burlywood: [222, 184, 135],
              cadetblue: [95, 158, 160],
              chartreuse: [127, 255, 0],
              chocolate: [210, 105, 30],
              coral: [255, 127, 80],
              cornflowerblue: [100, 149, 237],
              cornsilk: [255, 248, 220],
              crimson: [220, 20, 60],
              cyan: [0, 255, 255],
              darkblue: [0, 0, 139],
              darkcyan: [0, 139, 139],
              darkgoldenrod: [184, 134, 11],
              darkgray: [169, 169, 169],
              darkgreen: [0, 100, 0],
              darkgrey: [169, 169, 169],
              darkkhaki: [189, 183, 107],
              darkmagenta: [139, 0, 139],
              darkolivegreen: [85, 107, 47],
              darkorange: [255, 140, 0],
              darkorchid: [153, 50, 204],
              darkred: [139, 0, 0],
              darksalmon: [233, 150, 122],
              darkseagreen: [143, 188, 143],
              darkslateblue: [72, 61, 139],
              darkslategray: [47, 79, 79],
              darkslategrey: [47, 79, 79],
              darkturquoise: [0, 206, 209],
              darkviolet: [148, 0, 211],
              deeppink: [255, 20, 147],
              deepskyblue: [0, 191, 255],
              dimgray: [105, 105, 105],
              dimgrey: [105, 105, 105],
              dodgerblue: [30, 144, 255],
              firebrick: [178, 34, 34],
              floralwhite: [255, 250, 240],
              forestgreen: [34, 139, 34],
              fuchsia: [255, 0, 255],
              gainsboro: [220, 220, 220],
              ghostwhite: [248, 248, 255],
              gold: [255, 215, 0],
              goldenrod: [218, 165, 32],
              gray: [128, 128, 128],
              green: [0, 128, 0],
              greenyellow: [173, 255, 47],
              grey: [128, 128, 128],
              honeydew: [240, 255, 240],
              hotpink: [255, 105, 180],
              indianred: [205, 92, 92],
              indigo: [75, 0, 130],
              ivory: [255, 255, 240],
              khaki: [240, 230, 140],
              lavender: [230, 230, 250],
              lavenderblush: [255, 240, 245],
              lawngreen: [124, 252, 0],
              lemonchiffon: [255, 250, 205],
              lightblue: [173, 216, 230],
              lightcoral: [240, 128, 128],
              lightcyan: [224, 255, 255],
              lightgoldenrodyellow: [250, 250, 210],
              lightgray: [211, 211, 211],
              lightgreen: [144, 238, 144],
              lightgrey: [211, 211, 211],
              lightpink: [255, 182, 193],
              lightsalmon: [255, 160, 122],
              lightseagreen: [32, 178, 170],
              lightskyblue: [135, 206, 250],
              lightslategray: [119, 136, 153],
              lightslategrey: [119, 136, 153],
              lightsteelblue: [176, 196, 222],
              lightyellow: [255, 255, 224],
              lime: [0, 255, 0],
              limegreen: [50, 205, 50],
              linen: [250, 240, 230],
              magenta: [255, 0, 255],
              maroon: [128, 0, 0],
              mediumaquamarine: [102, 205, 170],
              mediumblue: [0, 0, 205],
              mediumorchid: [186, 85, 211],
              mediumpurple: [147, 112, 219],
              mediumseagreen: [60, 179, 113],
              mediumslateblue: [123, 104, 238],
              mediumspringgreen: [0, 250, 154],
              mediumturquoise: [72, 209, 204],
              mediumvioletred: [199, 21, 133],
              midnightblue: [25, 25, 112],
              mintcream: [245, 255, 250],
              mistyrose: [255, 228, 225],
              moccasin: [255, 228, 181],
              navajowhite: [255, 222, 173],
              navy: [0, 0, 128],
              oldlace: [253, 245, 230],
              olive: [128, 128, 0],
              olivedrab: [107, 142, 35],
              orange: [255, 165, 0],
              orangered: [255, 69, 0],
              orchid: [218, 112, 214],
              palegoldenrod: [238, 232, 170],
              palegreen: [152, 251, 152],
              paleturquoise: [175, 238, 238],
              palevioletred: [219, 112, 147],
              papayawhip: [255, 239, 213],
              peachpuff: [255, 218, 185],
              peru: [205, 133, 63],
              pink: [255, 192, 203],
              plum: [221, 160, 221],
              powderblue: [176, 224, 230],
              purple: [128, 0, 128],
              rebeccapurple: [102, 51, 153],
              red: [255, 0, 0],
              rosybrown: [188, 143, 143],
              royalblue: [65, 105, 225],
              saddlebrown: [139, 69, 19],
              salmon: [250, 128, 114],
              sandybrown: [244, 164, 96],
              seagreen: [46, 139, 87],
              seashell: [255, 245, 238],
              sienna: [160, 82, 45],
              silver: [192, 192, 192],
              skyblue: [135, 206, 235],
              slateblue: [106, 90, 205],
              slategray: [112, 128, 144],
              slategrey: [112, 128, 144],
              snow: [255, 250, 250],
              springgreen: [0, 255, 127],
              steelblue: [70, 130, 180],
              tan: [210, 180, 140],
              teal: [0, 128, 128],
              thistle: [216, 191, 216],
              tomato: [255, 99, 71],
              turquoise: [64, 224, 208],
              violet: [238, 130, 238],
              wheat: [245, 222, 179],
              white: [255, 255, 255],
              whitesmoke: [245, 245, 245],
              yellow: [255, 255, 0],
              yellowgreen: [154, 205, 50],
            },
            M = {};
          for (var D in _) M[JSON.stringify(_[D])] = D;
        },
        {},
      ],
      4: [
        function (t, e, i) {
          var a = t(3),
            r = function () {
              return new d();
            };
          for (var n in a) {
            r[n + "Raw"] = (function (e) {
              return function (t) {
                return (
                  "number" == typeof t &&
                    (t = Array.prototype.slice.call(arguments)),
                  a[e](t)
                );
              };
            })(n);
            var o = /(\w+)2(\w+)/.exec(n),
              s = o[1],
              l = o[2];
            (r[s] = r[s] || {})[l] = r[n] = (function (n) {
              return function (t) {
                "number" == typeof t &&
                  (t = Array.prototype.slice.call(arguments));
                var e = a[n](t);
                if ("string" == typeof e || void 0 === e) return e;
                for (var i = 0; i < e.length; i++) e[i] = Math.round(e[i]);
                return e;
              };
            })(n);
          }
          var d = function () {
            this.convs = {};
          };
          (d.prototype.routeSpace = function (t, e) {
            var i = e[0];
            return void 0 === i
              ? this.getValues(t)
              : ("number" == typeof i && (i = Array.prototype.slice.call(e)),
                this.setValues(t, i));
          }),
            (d.prototype.setValues = function (t, e) {
              return (
                (this.space = t), (this.convs = {}), (this.convs[t] = e), this
              );
            }),
            (d.prototype.getValues = function (t) {
              var e = this.convs[t];
              if (!e) {
                var i = this.space,
                  n = this.convs[i];
                (e = r[i][t](n)), (this.convs[t] = e);
              }
              return e;
            }),
            ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function (e) {
              d.prototype[e] = function (t) {
                return this.routeSpace(e, arguments);
              };
            }),
            (e.exports = r);
        },
        { 3: 3 },
      ],
      5: [
        function (t, e, i) {
          e.exports = {
            aliceblue: [240, 248, 255],
            antiquewhite: [250, 235, 215],
            aqua: [0, 255, 255],
            aquamarine: [127, 255, 212],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            bisque: [255, 228, 196],
            black: [0, 0, 0],
            blanchedalmond: [255, 235, 205],
            blue: [0, 0, 255],
            blueviolet: [138, 43, 226],
            brown: [165, 42, 42],
            burlywood: [222, 184, 135],
            cadetblue: [95, 158, 160],
            chartreuse: [127, 255, 0],
            chocolate: [210, 105, 30],
            coral: [255, 127, 80],
            cornflowerblue: [100, 149, 237],
            cornsilk: [255, 248, 220],
            crimson: [220, 20, 60],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgoldenrod: [184, 134, 11],
            darkgray: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkgrey: [169, 169, 169],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkseagreen: [143, 188, 143],
            darkslateblue: [72, 61, 139],
            darkslategray: [47, 79, 79],
            darkslategrey: [47, 79, 79],
            darkturquoise: [0, 206, 209],
            darkviolet: [148, 0, 211],
            deeppink: [255, 20, 147],
            deepskyblue: [0, 191, 255],
            dimgray: [105, 105, 105],
            dimgrey: [105, 105, 105],
            dodgerblue: [30, 144, 255],
            firebrick: [178, 34, 34],
            floralwhite: [255, 250, 240],
            forestgreen: [34, 139, 34],
            fuchsia: [255, 0, 255],
            gainsboro: [220, 220, 220],
            ghostwhite: [248, 248, 255],
            gold: [255, 215, 0],
            goldenrod: [218, 165, 32],
            gray: [128, 128, 128],
            green: [0, 128, 0],
            greenyellow: [173, 255, 47],
            grey: [128, 128, 128],
            honeydew: [240, 255, 240],
            hotpink: [255, 105, 180],
            indianred: [205, 92, 92],
            indigo: [75, 0, 130],
            ivory: [255, 255, 240],
            khaki: [240, 230, 140],
            lavender: [230, 230, 250],
            lavenderblush: [255, 240, 245],
            lawngreen: [124, 252, 0],
            lemonchiffon: [255, 250, 205],
            lightblue: [173, 216, 230],
            lightcoral: [240, 128, 128],
            lightcyan: [224, 255, 255],
            lightgoldenrodyellow: [250, 250, 210],
            lightgray: [211, 211, 211],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightsalmon: [255, 160, 122],
            lightseagreen: [32, 178, 170],
            lightskyblue: [135, 206, 250],
            lightslategray: [119, 136, 153],
            lightslategrey: [119, 136, 153],
            lightsteelblue: [176, 196, 222],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            limegreen: [50, 205, 50],
            linen: [250, 240, 230],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            mediumaquamarine: [102, 205, 170],
            mediumblue: [0, 0, 205],
            mediumorchid: [186, 85, 211],
            mediumpurple: [147, 112, 219],
            mediumseagreen: [60, 179, 113],
            mediumslateblue: [123, 104, 238],
            mediumspringgreen: [0, 250, 154],
            mediumturquoise: [72, 209, 204],
            mediumvioletred: [199, 21, 133],
            midnightblue: [25, 25, 112],
            mintcream: [245, 255, 250],
            mistyrose: [255, 228, 225],
            moccasin: [255, 228, 181],
            navajowhite: [255, 222, 173],
            navy: [0, 0, 128],
            oldlace: [253, 245, 230],
            olive: [128, 128, 0],
            olivedrab: [107, 142, 35],
            orange: [255, 165, 0],
            orangered: [255, 69, 0],
            orchid: [218, 112, 214],
            palegoldenrod: [238, 232, 170],
            palegreen: [152, 251, 152],
            paleturquoise: [175, 238, 238],
            palevioletred: [219, 112, 147],
            papayawhip: [255, 239, 213],
            peachpuff: [255, 218, 185],
            peru: [205, 133, 63],
            pink: [255, 192, 203],
            plum: [221, 160, 221],
            powderblue: [176, 224, 230],
            purple: [128, 0, 128],
            rebeccapurple: [102, 51, 153],
            red: [255, 0, 0],
            rosybrown: [188, 143, 143],
            royalblue: [65, 105, 225],
            saddlebrown: [139, 69, 19],
            salmon: [250, 128, 114],
            sandybrown: [244, 164, 96],
            seagreen: [46, 139, 87],
            seashell: [255, 245, 238],
            sienna: [160, 82, 45],
            silver: [192, 192, 192],
            skyblue: [135, 206, 235],
            slateblue: [106, 90, 205],
            slategray: [112, 128, 144],
            slategrey: [112, 128, 144],
            snow: [255, 250, 250],
            springgreen: [0, 255, 127],
            steelblue: [70, 130, 180],
            tan: [210, 180, 140],
            teal: [0, 128, 128],
            thistle: [216, 191, 216],
            tomato: [255, 99, 71],
            turquoise: [64, 224, 208],
            violet: [238, 130, 238],
            wheat: [245, 222, 179],
            white: [255, 255, 255],
            whitesmoke: [245, 245, 245],
            yellow: [255, 255, 0],
            yellowgreen: [154, 205, 50],
          };
        },
        {},
      ],
      6: [
        function (Ri, Wi, t) {
          var e, i;
          (e = this),
            (i = function () {
              "use strict";
              var t, n;
              function c() {
                return t.apply(null, arguments);
              }
              function s(t) {
                return (
                  t instanceof Array ||
                  "[object Array]" === Object.prototype.toString.call(t)
                );
              }
              function l(t) {
                return "[object Object]" === Object.prototype.toString.call(t);
              }
              function d(t) {
                return (
                  t instanceof Date ||
                  "[object Date]" === Object.prototype.toString.call(t)
                );
              }
              function u(t, e) {
                var i,
                  n = [];
                for (i = 0; i < t.length; ++i) n.push(e(t[i], i));
                return n;
              }
              function f(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
              }
              function h(t, e) {
                for (var i in e) f(e, i) && (t[i] = e[i]);
                return (
                  f(e, "toString") && (t.toString = e.toString),
                  f(e, "valueOf") && (t.valueOf = e.valueOf),
                  t
                );
              }
              function g(t, e, i, n) {
                return xe(t, e, i, n, !0).utc();
              }
              function p(t) {
                return (
                  null == t._pf &&
                    (t._pf = {
                      empty: !1,
                      unusedTokens: [],
                      unusedInput: [],
                      overflow: -2,
                      charsLeftOver: 0,
                      nullInput: !1,
                      invalidMonth: null,
                      invalidFormat: !1,
                      userInvalidated: !1,
                      iso: !1,
                      parsedDateParts: [],
                      meridiem: null,
                    }),
                  t._pf
                );
              }
              function m(t) {
                if (null == t._isValid) {
                  var e = p(t),
                    i = n.call(e.parsedDateParts, function (t) {
                      return null != t;
                    });
                  (t._isValid =
                    !isNaN(t._d.getTime()) &&
                    e.overflow < 0 &&
                    !e.empty &&
                    !e.invalidMonth &&
                    !e.invalidWeekday &&
                    !e.nullInput &&
                    !e.invalidFormat &&
                    !e.userInvalidated &&
                    (!e.meridiem || (e.meridiem && i))),
                    t._strict &&
                      (t._isValid =
                        t._isValid &&
                        0 === e.charsLeftOver &&
                        0 === e.unusedTokens.length &&
                        void 0 === e.bigHour);
                }
                return t._isValid;
              }
              function v(t) {
                var e = g(NaN);
                return null != t ? h(p(e), t) : (p(e).userInvalidated = !0), e;
              }
              function r(t) {
                return void 0 === t;
              }
              n = Array.prototype.some
                ? Array.prototype.some
                : function (t) {
                    for (
                      var e = Object(this), i = e.length >>> 0, n = 0;
                      n < i;
                      n++
                    )
                      if (n in e && t.call(this, e[n], n, e)) return !0;
                    return !1;
                  };
              var o = (c.momentProperties = []);
              function b(t, e) {
                var i, n, a;
                if (
                  (r(e._isAMomentObject) ||
                    (t._isAMomentObject = e._isAMomentObject),
                  r(e._i) || (t._i = e._i),
                  r(e._f) || (t._f = e._f),
                  r(e._l) || (t._l = e._l),
                  r(e._strict) || (t._strict = e._strict),
                  r(e._tzm) || (t._tzm = e._tzm),
                  r(e._isUTC) || (t._isUTC = e._isUTC),
                  r(e._offset) || (t._offset = e._offset),
                  r(e._pf) || (t._pf = p(e)),
                  r(e._locale) || (t._locale = e._locale),
                  0 < o.length)
                )
                  for (i in o) r((a = e[(n = o[i])])) || (t[n] = a);
                return t;
              }
              var e = !1;
              function y(t) {
                b(this, t),
                  (this._d = new Date(null != t._d ? t._d.getTime() : NaN)),
                  !1 === e && ((e = !0), c.updateOffset(this), (e = !1));
              }
              function x(t) {
                return (
                  t instanceof y || (null != t && null != t._isAMomentObject)
                );
              }
              function k(t) {
                return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
              }
              function S(t) {
                var e = +t,
                  i = 0;
                return 0 !== e && isFinite(e) && (i = k(e)), i;
              }
              function w(t, e, i) {
                var n,
                  a = Math.min(t.length, e.length),
                  r = Math.abs(t.length - e.length),
                  o = 0;
                for (n = 0; n < a; n++)
                  ((i && t[n] !== e[n]) || (!i && S(t[n]) !== S(e[n]))) && o++;
                return o + r;
              }
              function a(t) {
                !1 === c.suppressDeprecationWarnings &&
                  "undefined" != typeof console &&
                  console.warn &&
                  console.warn("Deprecation warning: " + t);
              }
              function i(t, e) {
                var i = !0;
                return h(function () {
                  return (
                    null != c.deprecationHandler &&
                      c.deprecationHandler(null, t),
                    i &&
                      (a(
                        t +
                          "\nArguments: " +
                          Array.prototype.slice.call(arguments).join(", ") +
                          "\n" +
                          new Error().stack
                      ),
                      (i = !1)),
                    e.apply(this, arguments)
                  );
                }, e);
              }
              var _,
                M = {};
              function D(t, e) {
                null != c.deprecationHandler && c.deprecationHandler(t, e),
                  M[t] || (a(e), (M[t] = !0));
              }
              function C(t) {
                return (
                  t instanceof Function ||
                  "[object Function]" === Object.prototype.toString.call(t)
                );
              }
              function T(t, e) {
                var i,
                  n = h({}, t);
                for (i in e)
                  f(e, i) &&
                    (l(t[i]) && l(e[i])
                      ? ((n[i] = {}), h(n[i], t[i]), h(n[i], e[i]))
                      : null != e[i]
                      ? (n[i] = e[i])
                      : delete n[i]);
                for (i in t)
                  f(t, i) && !f(e, i) && l(t[i]) && (n[i] = h({}, n[i]));
                return n;
              }
              function P(t) {
                null != t && this.set(t);
              }
              (c.suppressDeprecationWarnings = !1),
                (c.deprecationHandler = null),
                (_ = Object.keys
                  ? Object.keys
                  : function (t) {
                      var e,
                        i = [];
                      for (e in t) f(t, e) && i.push(e);
                      return i;
                    });
              var F = {};
              function A(t, e) {
                var i = t.toLowerCase();
                F[i] = F[i + "s"] = F[e] = t;
              }
              function I(t) {
                return "string" == typeof t
                  ? F[t] || F[t.toLowerCase()]
                  : void 0;
              }
              function O(t) {
                var e,
                  i,
                  n = {};
                for (i in t) f(t, i) && (e = I(i)) && (n[e] = t[i]);
                return n;
              }
              var R = {};
              function W(t, e) {
                R[t] = e;
              }
              function L(e, i) {
                return function (t) {
                  return null != t
                    ? (B(this, e, t), c.updateOffset(this, i), this)
                    : V(this, e);
                };
              }
              function V(t, e) {
                return t.isValid()
                  ? t._d["get" + (t._isUTC ? "UTC" : "") + e]()
                  : NaN;
              }
              function B(t, e, i) {
                t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](i);
              }
              function Y(t, e, i) {
                var n = "" + Math.abs(t),
                  a = e - n.length;
                return (
                  (0 <= t ? (i ? "+" : "") : "-") +
                  Math.pow(10, Math.max(0, a)).toString().substr(1) +
                  n
                );
              }
              var z =
                  /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
                H = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
                N = {},
                E = {};
              function U(t, e, i, n) {
                var a = n;
                "string" == typeof n &&
                  (a = function () {
                    return this[n]();
                  }),
                  t && (E[t] = a),
                  e &&
                    (E[e[0]] = function () {
                      return Y(a.apply(this, arguments), e[1], e[2]);
                    }),
                  i &&
                    (E[i] = function () {
                      return this.localeData().ordinal(
                        a.apply(this, arguments),
                        t
                      );
                    });
              }
              function j(t, e) {
                return t.isValid()
                  ? ((e = G(e, t.localeData())),
                    (N[e] =
                      N[e] ||
                      (function (n) {
                        var t,
                          a,
                          e,
                          r = n.match(z);
                        for (t = 0, a = r.length; t < a; t++)
                          E[r[t]]
                            ? (r[t] = E[r[t]])
                            : (r[t] = (e = r[t]).match(/\[[\s\S]/)
                                ? e.replace(/^\[|\]$/g, "")
                                : e.replace(/\\/g, ""));
                        return function (t) {
                          var e,
                            i = "";
                          for (e = 0; e < a; e++)
                            i +=
                              r[e] instanceof Function ? r[e].call(t, n) : r[e];
                          return i;
                        };
                      })(e)),
                    N[e](t))
                  : t.localeData().invalidDate();
              }
              function G(t, e) {
                var i = 5;
                function n(t) {
                  return e.longDateFormat(t) || t;
                }
                for (H.lastIndex = 0; 0 <= i && H.test(t); )
                  (t = t.replace(H, n)), (H.lastIndex = 0), (i -= 1);
                return t;
              }
              var q = /\d/,
                Z = /\d\d/,
                J = /\d{3}/,
                X = /\d{4}/,
                Q = /[+-]?\d{6}/,
                $ = /\d\d?/,
                K = /\d\d\d\d?/,
                tt = /\d\d\d\d\d\d?/,
                et = /\d{1,3}/,
                it = /\d{1,4}/,
                nt = /[+-]?\d{1,6}/,
                at = /\d+/,
                rt = /[+-]?\d+/,
                ot = /Z|[+-]\d\d:?\d\d/gi,
                st = /Z|[+-]\d\d(?::?\d\d)?/gi,
                lt =
                  /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
                dt = {};
              function ut(t, i, n) {
                dt[t] = C(i)
                  ? i
                  : function (t, e) {
                      return t && n ? n : i;
                    };
              }
              function ht(t, e) {
                return f(dt, t)
                  ? dt[t](e._strict, e._locale)
                  : new RegExp(
                      ct(
                        t
                          .replace("\\", "")
                          .replace(
                            /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                            function (t, e, i, n, a) {
                              return e || i || n || a;
                            }
                          )
                      )
                    );
              }
              function ct(t) {
                return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
              }
              var ft = {};
              function gt(t, i) {
                var e,
                  n = i;
                for (
                  "string" == typeof t && (t = [t]),
                    "number" == typeof i &&
                      (n = function (t, e) {
                        e[i] = S(t);
                      }),
                    e = 0;
                  e < t.length;
                  e++
                )
                  ft[t[e]] = n;
              }
              function pt(t, a) {
                gt(t, function (t, e, i, n) {
                  (i._w = i._w || {}), a(t, i._w, i, n);
                });
              }
              var mt,
                vt = 0,
                bt = 1,
                yt = 2,
                xt = 3,
                kt = 4,
                St = 5,
                wt = 6,
                _t = 7,
                Mt = 8;
              function Dt(t, e) {
                return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
              }
              (mt = Array.prototype.indexOf
                ? Array.prototype.indexOf
                : function (t) {
                    var e;
                    for (e = 0; e < this.length; ++e)
                      if (this[e] === t) return e;
                    return -1;
                  }),
                U("M", ["MM", 2], "Mo", function () {
                  return this.month() + 1;
                }),
                U("MMM", 0, 0, function (t) {
                  return this.localeData().monthsShort(this, t);
                }),
                U("MMMM", 0, 0, function (t) {
                  return this.localeData().months(this, t);
                }),
                A("month", "M"),
                W("month", 8),
                ut("M", $),
                ut("MM", $, Z),
                ut("MMM", function (t, e) {
                  return e.monthsShortRegex(t);
                }),
                ut("MMMM", function (t, e) {
                  return e.monthsRegex(t);
                }),
                gt(["M", "MM"], function (t, e) {
                  e[bt] = S(t) - 1;
                }),
                gt(["MMM", "MMMM"], function (t, e, i, n) {
                  var a = i._locale.monthsParse(t, n, i._strict);
                  null != a ? (e[bt] = a) : (p(i).invalidMonth = t);
                });
              var Ct = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
                Tt =
                  "January_February_March_April_May_June_July_August_September_October_November_December".split(
                    "_"
                  );
              var Pt = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
                "_"
              );
              function Ft(t, e) {
                var i;
                if (!t.isValid()) return t;
                if ("string" == typeof e)
                  if (/^\d+$/.test(e)) e = S(e);
                  else if (
                    "number" != typeof (e = t.localeData().monthsParse(e))
                  )
                    return t;
                return (
                  (i = Math.min(t.date(), Dt(t.year(), e))),
                  t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i),
                  t
                );
              }
              function At(t) {
                return null != t
                  ? (Ft(this, t), c.updateOffset(this, !0), this)
                  : V(this, "Month");
              }
              var It = lt;
              var Ot = lt;
              function Rt() {
                function t(t, e) {
                  return e.length - t.length;
                }
                var e,
                  i,
                  n = [],
                  a = [],
                  r = [];
                for (e = 0; e < 12; e++)
                  (i = g([2e3, e])),
                    n.push(this.monthsShort(i, "")),
                    a.push(this.months(i, "")),
                    r.push(this.months(i, "")),
                    r.push(this.monthsShort(i, ""));
                for (n.sort(t), a.sort(t), r.sort(t), e = 0; e < 12; e++)
                  (n[e] = ct(n[e])), (a[e] = ct(a[e]));
                for (e = 0; e < 24; e++) r[e] = ct(r[e]);
                (this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i")),
                  (this._monthsShortRegex = this._monthsRegex),
                  (this._monthsStrictRegex = new RegExp(
                    "^(" + a.join("|") + ")",
                    "i"
                  )),
                  (this._monthsShortStrictRegex = new RegExp(
                    "^(" + n.join("|") + ")",
                    "i"
                  ));
              }
              function Wt(t) {
                return Lt(t) ? 366 : 365;
              }
              function Lt(t) {
                return (t % 4 == 0 && t % 100 != 0) || t % 400 == 0;
              }
              U("Y", 0, 0, function () {
                var t = this.year();
                return t <= 9999 ? "" + t : "+" + t;
              }),
                U(0, ["YY", 2], 0, function () {
                  return this.year() % 100;
                }),
                U(0, ["YYYY", 4], 0, "year"),
                U(0, ["YYYYY", 5], 0, "year"),
                U(0, ["YYYYYY", 6, !0], 0, "year"),
                A("year", "y"),
                W("year", 1),
                ut("Y", rt),
                ut("YY", $, Z),
                ut("YYYY", it, X),
                ut("YYYYY", nt, Q),
                ut("YYYYYY", nt, Q),
                gt(["YYYYY", "YYYYYY"], vt),
                gt("YYYY", function (t, e) {
                  e[vt] = 2 === t.length ? c.parseTwoDigitYear(t) : S(t);
                }),
                gt("YY", function (t, e) {
                  e[vt] = c.parseTwoDigitYear(t);
                }),
                gt("Y", function (t, e) {
                  e[vt] = parseInt(t, 10);
                }),
                (c.parseTwoDigitYear = function (t) {
                  return S(t) + (68 < S(t) ? 1900 : 2e3);
                });
              var Vt = L("FullYear", !0);
              function Bt(t) {
                var e = new Date(Date.UTC.apply(null, arguments));
                return (
                  t < 100 &&
                    0 <= t &&
                    isFinite(e.getUTCFullYear()) &&
                    e.setUTCFullYear(t),
                  e
                );
              }
              function Yt(t, e, i) {
                var n = 7 + e - i;
                return -((7 + Bt(t, 0, n).getUTCDay() - e) % 7) + n - 1;
              }
              function zt(t, e, i, n, a) {
                var r,
                  o,
                  s = 1 + 7 * (e - 1) + ((7 + i - n) % 7) + Yt(t, n, a);
                return (
                  (o =
                    s <= 0
                      ? Wt((r = t - 1)) + s
                      : s > Wt(t)
                      ? ((r = t + 1), s - Wt(t))
                      : ((r = t), s)),
                  { year: r, dayOfYear: o }
                );
              }
              function Ht(t, e, i) {
                var n,
                  a,
                  r = Yt(t.year(), e, i),
                  o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1;
                return (
                  o < 1
                    ? (n = o + Nt((a = t.year() - 1), e, i))
                    : o > Nt(t.year(), e, i)
                    ? ((n = o - Nt(t.year(), e, i)), (a = t.year() + 1))
                    : ((a = t.year()), (n = o)),
                  { week: n, year: a }
                );
              }
              function Nt(t, e, i) {
                var n = Yt(t, e, i),
                  a = Yt(t + 1, e, i);
                return (Wt(t) - n + a) / 7;
              }
              U("w", ["ww", 2], "wo", "week"),
                U("W", ["WW", 2], "Wo", "isoWeek"),
                A("week", "w"),
                A("isoWeek", "W"),
                W("week", 5),
                W("isoWeek", 5),
                ut("w", $),
                ut("ww", $, Z),
                ut("W", $),
                ut("WW", $, Z),
                pt(["w", "ww", "W", "WW"], function (t, e, i, n) {
                  e[n.substr(0, 1)] = S(t);
                });
              U("d", 0, "do", "day"),
                U("dd", 0, 0, function (t) {
                  return this.localeData().weekdaysMin(this, t);
                }),
                U("ddd", 0, 0, function (t) {
                  return this.localeData().weekdaysShort(this, t);
                }),
                U("dddd", 0, 0, function (t) {
                  return this.localeData().weekdays(this, t);
                }),
                U("e", 0, 0, "weekday"),
                U("E", 0, 0, "isoWeekday"),
                A("day", "d"),
                A("weekday", "e"),
                A("isoWeekday", "E"),
                W("day", 11),
                W("weekday", 11),
                W("isoWeekday", 11),
                ut("d", $),
                ut("e", $),
                ut("E", $),
                ut("dd", function (t, e) {
                  return e.weekdaysMinRegex(t);
                }),
                ut("ddd", function (t, e) {
                  return e.weekdaysShortRegex(t);
                }),
                ut("dddd", function (t, e) {
                  return e.weekdaysRegex(t);
                }),
                pt(["dd", "ddd", "dddd"], function (t, e, i, n) {
                  var a = i._locale.weekdaysParse(t, n, i._strict);
                  null != a ? (e.d = a) : (p(i).invalidWeekday = t);
                }),
                pt(["d", "e", "E"], function (t, e, i, n) {
                  e[n] = S(t);
                });
              var Et =
                "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                  "_"
                );
              var Ut = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
              var jt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
              var Gt = lt;
              var qt = lt;
              var Zt = lt;
              function Jt() {
                function t(t, e) {
                  return e.length - t.length;
                }
                var e,
                  i,
                  n,
                  a,
                  r,
                  o = [],
                  s = [],
                  l = [],
                  d = [];
                for (e = 0; e < 7; e++)
                  (i = g([2e3, 1]).day(e)),
                    (n = this.weekdaysMin(i, "")),
                    (a = this.weekdaysShort(i, "")),
                    (r = this.weekdays(i, "")),
                    o.push(n),
                    s.push(a),
                    l.push(r),
                    d.push(n),
                    d.push(a),
                    d.push(r);
                for (
                  o.sort(t), s.sort(t), l.sort(t), d.sort(t), e = 0;
                  e < 7;
                  e++
                )
                  (s[e] = ct(s[e])), (l[e] = ct(l[e])), (d[e] = ct(d[e]));
                (this._weekdaysRegex = new RegExp(
                  "^(" + d.join("|") + ")",
                  "i"
                )),
                  (this._weekdaysShortRegex = this._weekdaysRegex),
                  (this._weekdaysMinRegex = this._weekdaysRegex),
                  (this._weekdaysStrictRegex = new RegExp(
                    "^(" + l.join("|") + ")",
                    "i"
                  )),
                  (this._weekdaysShortStrictRegex = new RegExp(
                    "^(" + s.join("|") + ")",
                    "i"
                  )),
                  (this._weekdaysMinStrictRegex = new RegExp(
                    "^(" + o.join("|") + ")",
                    "i"
                  ));
              }
              function Xt() {
                return this.hours() % 12 || 12;
              }
              function Qt(t, e) {
                U(t, 0, 0, function () {
                  return this.localeData().meridiem(
                    this.hours(),
                    this.minutes(),
                    e
                  );
                });
              }
              function $t(t, e) {
                return e._meridiemParse;
              }
              U("H", ["HH", 2], 0, "hour"),
                U("h", ["hh", 2], 0, Xt),
                U("k", ["kk", 2], 0, function () {
                  return this.hours() || 24;
                }),
                U("hmm", 0, 0, function () {
                  return "" + Xt.apply(this) + Y(this.minutes(), 2);
                }),
                U("hmmss", 0, 0, function () {
                  return (
                    "" +
                    Xt.apply(this) +
                    Y(this.minutes(), 2) +
                    Y(this.seconds(), 2)
                  );
                }),
                U("Hmm", 0, 0, function () {
                  return "" + this.hours() + Y(this.minutes(), 2);
                }),
                U("Hmmss", 0, 0, function () {
                  return (
                    "" +
                    this.hours() +
                    Y(this.minutes(), 2) +
                    Y(this.seconds(), 2)
                  );
                }),
                Qt("a", !0),
                Qt("A", !1),
                A("hour", "h"),
                W("hour", 13),
                ut("a", $t),
                ut("A", $t),
                ut("H", $),
                ut("h", $),
                ut("HH", $, Z),
                ut("hh", $, Z),
                ut("hmm", K),
                ut("hmmss", tt),
                ut("Hmm", K),
                ut("Hmmss", tt),
                gt(["H", "HH"], xt),
                gt(["a", "A"], function (t, e, i) {
                  (i._isPm = i._locale.isPM(t)), (i._meridiem = t);
                }),
                gt(["h", "hh"], function (t, e, i) {
                  (e[xt] = S(t)), (p(i).bigHour = !0);
                }),
                gt("hmm", function (t, e, i) {
                  var n = t.length - 2;
                  (e[xt] = S(t.substr(0, n))),
                    (e[kt] = S(t.substr(n))),
                    (p(i).bigHour = !0);
                }),
                gt("hmmss", function (t, e, i) {
                  var n = t.length - 4,
                    a = t.length - 2;
                  (e[xt] = S(t.substr(0, n))),
                    (e[kt] = S(t.substr(n, 2))),
                    (e[St] = S(t.substr(a))),
                    (p(i).bigHour = !0);
                }),
                gt("Hmm", function (t, e, i) {
                  var n = t.length - 2;
                  (e[xt] = S(t.substr(0, n))), (e[kt] = S(t.substr(n)));
                }),
                gt("Hmmss", function (t, e, i) {
                  var n = t.length - 4,
                    a = t.length - 2;
                  (e[xt] = S(t.substr(0, n))),
                    (e[kt] = S(t.substr(n, 2))),
                    (e[St] = S(t.substr(a)));
                });
              var Kt,
                te = L("Hours", !0),
                ee = {
                  calendar: {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[Last] dddd [at] LT",
                    sameElse: "L",
                  },
                  longDateFormat: {
                    LTS: "h:mm:ss A",
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D, YYYY",
                    LLL: "MMMM D, YYYY h:mm A",
                    LLLL: "dddd, MMMM D, YYYY h:mm A",
                  },
                  invalidDate: "Invalid date",
                  ordinal: "%d",
                  ordinalParse: /\d{1,2}/,
                  relativeTime: {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years",
                  },
                  months: Tt,
                  monthsShort: Pt,
                  week: { dow: 0, doy: 6 },
                  weekdays: Et,
                  weekdaysMin: jt,
                  weekdaysShort: Ut,
                  meridiemParse: /[ap]\.?m?\.?/i,
                },
                ie = {};
              function ne(t) {
                return t ? t.toLowerCase().replace("_", "-") : t;
              }
              function ae(t) {
                var e = null;
                if (!ie[t] && void 0 !== Wi && Wi && Wi.exports)
                  try {
                    (e = Kt._abbr), Ri("./locale/" + t), re(e);
                  } catch (t) {}
                return ie[t];
              }
              function re(t, e) {
                var i;
                return t && (i = r(e) ? se(t) : oe(t, e)) && (Kt = i), Kt._abbr;
              }
              function oe(t, e) {
                if (null === e) return delete ie[t], null;
                var i = ee;
                return (
                  (e.abbr = t),
                  null != ie[t]
                    ? (D(
                        "defineLocaleOverride",
                        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
                      ),
                      (i = ie[t]._config))
                    : null != e.parentLocale &&
                      (null != ie[e.parentLocale]
                        ? (i = ie[e.parentLocale]._config)
                        : D(
                            "parentLocaleUndefined",
                            "specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/"
                          )),
                  (ie[t] = new P(T(i, e))),
                  re(t),
                  ie[t]
                );
              }
              function se(t) {
                var e;
                if (
                  (t && t._locale && t._locale._abbr && (t = t._locale._abbr),
                  !t)
                )
                  return Kt;
                if (!s(t)) {
                  if ((e = ae(t))) return e;
                  t = [t];
                }
                return (function (t) {
                  for (var e, i, n, a, r = 0; r < t.length; ) {
                    for (
                      e = (a = ne(t[r]).split("-")).length,
                        i = (i = ne(t[r + 1])) ? i.split("-") : null;
                      0 < e;

                    ) {
                      if ((n = ae(a.slice(0, e).join("-")))) return n;
                      if (i && i.length >= e && w(a, i, !0) >= e - 1) break;
                      e--;
                    }
                    r++;
                  }
                  return null;
                })(t);
              }
              function le(t) {
                var e,
                  i = t._a;
                return (
                  i &&
                    -2 === p(t).overflow &&
                    ((e =
                      i[bt] < 0 || 11 < i[bt]
                        ? bt
                        : i[yt] < 1 || i[yt] > Dt(i[vt], i[bt])
                        ? yt
                        : i[xt] < 0 ||
                          24 < i[xt] ||
                          (24 === i[xt] &&
                            (0 !== i[kt] || 0 !== i[St] || 0 !== i[wt]))
                        ? xt
                        : i[kt] < 0 || 59 < i[kt]
                        ? kt
                        : i[St] < 0 || 59 < i[St]
                        ? St
                        : i[wt] < 0 || 999 < i[wt]
                        ? wt
                        : -1),
                    p(t)._overflowDayOfYear && (e < vt || yt < e) && (e = yt),
                    p(t)._overflowWeeks && -1 === e && (e = _t),
                    p(t)._overflowWeekday && -1 === e && (e = Mt),
                    (p(t).overflow = e)),
                  t
                );
              }
              var de =
                  /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                ue =
                  /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
                he = /Z|[+-]\d\d(?::?\d\d)?/,
                ce = [
                  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
                  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
                  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
                  ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
                  ["YYYY-DDD", /\d{4}-\d{3}/],
                  ["YYYY-MM", /\d{4}-\d\d/, !1],
                  ["YYYYYYMMDD", /[+-]\d{10}/],
                  ["YYYYMMDD", /\d{8}/],
                  ["GGGG[W]WWE", /\d{4}W\d{3}/],
                  ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
                  ["YYYYDDD", /\d{7}/],
                ],
                fe = [
                  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
                  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
                  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
                  ["HH:mm", /\d\d:\d\d/],
                  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
                  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
                  ["HHmmss", /\d\d\d\d\d\d/],
                  ["HHmm", /\d\d\d\d/],
                  ["HH", /\d\d/],
                ],
                ge = /^\/?Date\((\-?\d+)/i;
              function pe(t) {
                var e,
                  i,
                  n,
                  a,
                  r,
                  o,
                  s = t._i,
                  l = de.exec(s) || ue.exec(s);
                if (l) {
                  for (p(t).iso = !0, e = 0, i = ce.length; e < i; e++)
                    if (ce[e][1].exec(l[1])) {
                      (a = ce[e][0]), (n = !1 !== ce[e][2]);
                      break;
                    }
                  if (null == a) return void (t._isValid = !1);
                  if (l[3]) {
                    for (e = 0, i = fe.length; e < i; e++)
                      if (fe[e][1].exec(l[3])) {
                        r = (l[2] || " ") + fe[e][0];
                        break;
                      }
                    if (null == r) return void (t._isValid = !1);
                  }
                  if (!n && null != r) return void (t._isValid = !1);
                  if (l[4]) {
                    if (!he.exec(l[4])) return void (t._isValid = !1);
                    o = "Z";
                  }
                  (t._f = a + (r || "") + (o || "")), be(t);
                } else t._isValid = !1;
              }
              function me(t, e, i) {
                return null != t ? t : null != e ? e : i;
              }
              function ve(t) {
                var e,
                  i,
                  n,
                  a,
                  r = [];
                if (!t._d) {
                  var o, s;
                  for (
                    o = t,
                      s = new Date(c.now()),
                      n = o._useUTC
                        ? [s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()]
                        : [s.getFullYear(), s.getMonth(), s.getDate()],
                      t._w &&
                        null == t._a[yt] &&
                        null == t._a[bt] &&
                        (function (t) {
                          var e, i, n, a, r, o, s, l;
                          null != (e = t._w).GG || null != e.W || null != e.E
                            ? ((r = 1),
                              (o = 4),
                              (i = me(e.GG, t._a[vt], Ht(ke(), 1, 4).year)),
                              (n = me(e.W, 1)),
                              ((a = me(e.E, 1)) < 1 || 7 < a) && (l = !0))
                            : ((r = t._locale._week.dow),
                              (o = t._locale._week.doy),
                              (i = me(e.gg, t._a[vt], Ht(ke(), r, o).year)),
                              (n = me(e.w, 1)),
                              null != e.d
                                ? ((a = e.d) < 0 || 6 < a) && (l = !0)
                                : null != e.e
                                ? ((a = e.e + r),
                                  (e.e < 0 || 6 < e.e) && (l = !0))
                                : (a = r));
                          n < 1 || n > Nt(i, r, o)
                            ? (p(t)._overflowWeeks = !0)
                            : null != l
                            ? (p(t)._overflowWeekday = !0)
                            : ((s = zt(i, n, a, r, o)),
                              (t._a[vt] = s.year),
                              (t._dayOfYear = s.dayOfYear));
                        })(t),
                      t._dayOfYear &&
                        ((a = me(t._a[vt], n[vt])),
                        t._dayOfYear > Wt(a) && (p(t)._overflowDayOfYear = !0),
                        (i = Bt(a, 0, t._dayOfYear)),
                        (t._a[bt] = i.getUTCMonth()),
                        (t._a[yt] = i.getUTCDate())),
                      e = 0;
                    e < 3 && null == t._a[e];
                    ++e
                  )
                    t._a[e] = r[e] = n[e];
                  for (; e < 7; e++)
                    t._a[e] = r[e] =
                      null == t._a[e] ? (2 === e ? 1 : 0) : t._a[e];
                  24 === t._a[xt] &&
                    0 === t._a[kt] &&
                    0 === t._a[St] &&
                    0 === t._a[wt] &&
                    ((t._nextDay = !0), (t._a[xt] = 0)),
                    (t._d = (
                      t._useUTC
                        ? Bt
                        : function (t, e, i, n, a, r, o) {
                            var s = new Date(t, e, i, n, a, r, o);
                            return (
                              t < 100 &&
                                0 <= t &&
                                isFinite(s.getFullYear()) &&
                                s.setFullYear(t),
                              s
                            );
                          }
                    ).apply(null, r)),
                    null != t._tzm &&
                      t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
                    t._nextDay && (t._a[xt] = 24);
                }
              }
              function be(t) {
                if (t._f !== c.ISO_8601) {
                  (t._a = []), (p(t).empty = !0);
                  var e,
                    i,
                    n,
                    a,
                    r,
                    o,
                    s,
                    l,
                    d = "" + t._i,
                    u = d.length,
                    h = 0;
                  for (
                    n = G(t._f, t._locale).match(z) || [], e = 0;
                    e < n.length;
                    e++
                  )
                    (a = n[e]),
                      (i = (d.match(ht(a, t)) || [])[0]) &&
                        (0 < (r = d.substr(0, d.indexOf(i))).length &&
                          p(t).unusedInput.push(r),
                        (d = d.slice(d.indexOf(i) + i.length)),
                        (h += i.length)),
                      E[a]
                        ? (i ? (p(t).empty = !1) : p(t).unusedTokens.push(a),
                          (o = a),
                          (l = t),
                          null != (s = i) && f(ft, o) && ft[o](s, l._a, l, o))
                        : t._strict && !i && p(t).unusedTokens.push(a);
                  (p(t).charsLeftOver = u - h),
                    0 < d.length && p(t).unusedInput.push(d),
                    t._a[xt] <= 12 &&
                      !0 === p(t).bigHour &&
                      0 < t._a[xt] &&
                      (p(t).bigHour = void 0),
                    (p(t).parsedDateParts = t._a.slice(0)),
                    (p(t).meridiem = t._meridiem),
                    (t._a[xt] = (function (t, e, i) {
                      var n;
                      if (null == i) return e;
                      return null != t.meridiemHour
                        ? t.meridiemHour(e, i)
                        : (null != t.isPM &&
                            ((n = t.isPM(i)) && e < 12 && (e += 12),
                            n || 12 !== e || (e = 0)),
                          e);
                    })(t._locale, t._a[xt], t._meridiem)),
                    ve(t),
                    le(t);
                } else pe(t);
              }
              function ye(t) {
                var e,
                  i,
                  n,
                  a,
                  r = t._i,
                  o = t._f;
                return (
                  (t._locale = t._locale || se(t._l)),
                  null === r || (void 0 === o && "" === r)
                    ? v({ nullInput: !0 })
                    : ("string" == typeof r &&
                        (t._i = r = t._locale.preparse(r)),
                      x(r)
                        ? new y(le(r))
                        : (s(o)
                            ? (function (t) {
                                var e, i, n, a, r;
                                if (0 === t._f.length)
                                  return (
                                    (p(t).invalidFormat = !0),
                                    (t._d = new Date(NaN))
                                  );
                                for (a = 0; a < t._f.length; a++)
                                  (r = 0),
                                    (e = b({}, t)),
                                    null != t._useUTC &&
                                      (e._useUTC = t._useUTC),
                                    (e._f = t._f[a]),
                                    be(e),
                                    m(e) &&
                                      ((r += p(e).charsLeftOver),
                                      (r += 10 * p(e).unusedTokens.length),
                                      (p(e).score = r),
                                      (null == n || r < n) &&
                                        ((n = r), (i = e)));
                                h(t, i || e);
                              })(t)
                            : d(r)
                            ? (t._d = r)
                            : o
                            ? be(t)
                            : void 0 === (i = (e = t)._i)
                            ? (e._d = new Date(c.now()))
                            : d(i)
                            ? (e._d = new Date(i.valueOf()))
                            : "string" == typeof i
                            ? ((n = e),
                              null === (a = ge.exec(n._i))
                                ? (pe(n),
                                  !1 === n._isValid &&
                                    (delete n._isValid,
                                    c.createFromInputFallback(n)))
                                : (n._d = new Date(+a[1])))
                            : s(i)
                            ? ((e._a = u(i.slice(0), function (t) {
                                return parseInt(t, 10);
                              })),
                              ve(e))
                            : "object" == typeof i
                            ? (function (t) {
                                if (!t._d) {
                                  var e = O(t._i);
                                  (t._a = u(
                                    [
                                      e.year,
                                      e.month,
                                      e.day || e.date,
                                      e.hour,
                                      e.minute,
                                      e.second,
                                      e.millisecond,
                                    ],
                                    function (t) {
                                      return t && parseInt(t, 10);
                                    }
                                  )),
                                    ve(t);
                                }
                              })(e)
                            : "number" == typeof i
                            ? (e._d = new Date(i))
                            : c.createFromInputFallback(e),
                          m(t) || (t._d = null),
                          t))
                );
              }
              function xe(t, e, i, n, a) {
                var r,
                  o = {};
                return (
                  "boolean" == typeof i && ((n = i), (i = void 0)),
                  ((l(t) &&
                    (function (t) {
                      var e;
                      for (e in t) return !1;
                      return !0;
                    })(t)) ||
                    (s(t) && 0 === t.length)) &&
                    (t = void 0),
                  (o._isAMomentObject = !0),
                  (o._useUTC = o._isUTC = a),
                  (o._l = i),
                  (o._i = t),
                  (o._f = e),
                  (o._strict = n),
                  (r = new y(le(ye(o))))._nextDay &&
                    (r.add(1, "d"), (r._nextDay = void 0)),
                  r
                );
              }
              function ke(t, e, i, n) {
                return xe(t, e, i, n, !1);
              }
              (c.createFromInputFallback = i(
                "moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
                function (t) {
                  t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
                }
              )),
                (c.ISO_8601 = function () {});
              var Se = i(
                  "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
                  function () {
                    var t = ke.apply(null, arguments);
                    return this.isValid() && t.isValid()
                      ? t < this
                        ? this
                        : t
                      : v();
                  }
                ),
                we = i(
                  "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
                  function () {
                    var t = ke.apply(null, arguments);
                    return this.isValid() && t.isValid()
                      ? this < t
                        ? this
                        : t
                      : v();
                  }
                );
              function _e(t, e) {
                var i, n;
                if ((1 === e.length && s(e[0]) && (e = e[0]), !e.length))
                  return ke();
                for (i = e[0], n = 1; n < e.length; ++n)
                  (e[n].isValid() && !e[n][t](i)) || (i = e[n]);
                return i;
              }
              function Me(t) {
                var e = O(t),
                  i = e.year || 0,
                  n = e.quarter || 0,
                  a = e.month || 0,
                  r = e.week || 0,
                  o = e.day || 0,
                  s = e.hour || 0,
                  l = e.minute || 0,
                  d = e.second || 0,
                  u = e.millisecond || 0;
                (this._milliseconds =
                  +u + 1e3 * d + 6e4 * l + 1e3 * s * 60 * 60),
                  (this._days = +o + 7 * r),
                  (this._months = +a + 3 * n + 12 * i),
                  (this._data = {}),
                  (this._locale = se()),
                  this._bubble();
              }
              function De(t) {
                return t instanceof Me;
              }
              function Ce(t, i) {
                U(t, 0, 0, function () {
                  var t = this.utcOffset(),
                    e = "+";
                  return (
                    t < 0 && ((t = -t), (e = "-")),
                    e + Y(~~(t / 60), 2) + i + Y(~~t % 60, 2)
                  );
                });
              }
              Ce("Z", ":"),
                Ce("ZZ", ""),
                ut("Z", st),
                ut("ZZ", st),
                gt(["Z", "ZZ"], function (t, e, i) {
                  (i._useUTC = !0), (i._tzm = Pe(st, t));
                });
              var Te = /([\+\-]|\d\d)/gi;
              function Pe(t, e) {
                var i = (e || "").match(t) || [],
                  n = ((i[i.length - 1] || []) + "").match(Te) || ["-", 0, 0],
                  a = 60 * n[1] + S(n[2]);
                return "+" === n[0] ? a : -a;
              }
              function Fe(t, e) {
                var i, n;
                return e._isUTC
                  ? ((i = e.clone()),
                    (n =
                      (x(t) || d(t) ? t.valueOf() : ke(t).valueOf()) -
                      i.valueOf()),
                    i._d.setTime(i._d.valueOf() + n),
                    c.updateOffset(i, !1),
                    i)
                  : ke(t).local();
              }
              function Ae(t) {
                return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
              }
              function Ie() {
                return !!this.isValid() && this._isUTC && 0 === this._offset;
              }
              c.updateOffset = function () {};
              var Oe =
                  /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
                Re =
                  /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
              function We(t, e) {
                var i,
                  n,
                  a,
                  r = t,
                  o = null;
                return (
                  De(t)
                    ? (r = { ms: t._milliseconds, d: t._days, M: t._months })
                    : "number" == typeof t
                    ? ((r = {}), e ? (r[e] = t) : (r.milliseconds = t))
                    : (o = Oe.exec(t))
                    ? ((i = "-" === o[1] ? -1 : 1),
                      (r = {
                        y: 0,
                        d: S(o[yt]) * i,
                        h: S(o[xt]) * i,
                        m: S(o[kt]) * i,
                        s: S(o[St]) * i,
                        ms: S(o[wt]) * i,
                      }))
                    : (o = Re.exec(t))
                    ? ((i = "-" === o[1] ? -1 : 1),
                      (r = {
                        y: Le(o[2], i),
                        M: Le(o[3], i),
                        w: Le(o[4], i),
                        d: Le(o[5], i),
                        h: Le(o[6], i),
                        m: Le(o[7], i),
                        s: Le(o[8], i),
                      }))
                    : null == r
                    ? (r = {})
                    : "object" == typeof r &&
                      ("from" in r || "to" in r) &&
                      ((a = (function (t, e) {
                        var i;
                        if (!t.isValid() || !e.isValid())
                          return { milliseconds: 0, months: 0 };
                        (e = Fe(e, t)),
                          t.isBefore(e)
                            ? (i = Ve(t, e))
                            : (((i = Ve(e, t)).milliseconds = -i.milliseconds),
                              (i.months = -i.months));
                        return i;
                      })(ke(r.from), ke(r.to))),
                      ((r = {}).ms = a.milliseconds),
                      (r.M = a.months)),
                  (n = new Me(r)),
                  De(t) && f(t, "_locale") && (n._locale = t._locale),
                  n
                );
              }
              function Le(t, e) {
                var i = t && parseFloat(t.replace(",", "."));
                return (isNaN(i) ? 0 : i) * e;
              }
              function Ve(t, e) {
                var i = { milliseconds: 0, months: 0 };
                return (
                  (i.months =
                    e.month() - t.month() + 12 * (e.year() - t.year())),
                  t.clone().add(i.months, "M").isAfter(e) && --i.months,
                  (i.milliseconds = +e - +t.clone().add(i.months, "M")),
                  i
                );
              }
              function Be(t) {
                return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t);
              }
              function Ye(n, a) {
                return function (t, e) {
                  var i;
                  return (
                    null === e ||
                      isNaN(+e) ||
                      (D(
                        a,
                        "moment()." +
                          a +
                          "(period, number) is deprecated. Please use moment()." +
                          a +
                          "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
                      ),
                      (i = t),
                      (t = e),
                      (e = i)),
                    ze(this, We((t = "string" == typeof t ? +t : t), e), n),
                    this
                  );
                };
              }
              function ze(t, e, i, n) {
                var a = e._milliseconds,
                  r = Be(e._days),
                  o = Be(e._months);
                t.isValid() &&
                  ((n = null == n || n),
                  a && t._d.setTime(t._d.valueOf() + a * i),
                  r && B(t, "Date", V(t, "Date") + r * i),
                  o && Ft(t, V(t, "Month") + o * i),
                  n && c.updateOffset(t, r || o));
              }
              We.fn = Me.prototype;
              var He = Ye(1, "add"),
                Ne = Ye(-1, "subtract");
              function Ee(t) {
                var e;
                return void 0 === t
                  ? this._locale._abbr
                  : (null != (e = se(t)) && (this._locale = e), this);
              }
              (c.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
                (c.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
              var Ue = i(
                "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
                function (t) {
                  return void 0 === t ? this.localeData() : this.locale(t);
                }
              );
              function je() {
                return this._locale;
              }
              function Ge(t, e) {
                U(0, [t, t.length], 0, e);
              }
              function qe(t, e, i, n, a) {
                var r;
                return null == t
                  ? Ht(this, n, a).year
                  : ((r = Nt(t, n, a)) < e && (e = r),
                    function (t, e, i, n, a) {
                      var r = zt(t, e, i, n, a),
                        o = Bt(r.year, 0, r.dayOfYear);
                      return (
                        this.year(o.getUTCFullYear()),
                        this.month(o.getUTCMonth()),
                        this.date(o.getUTCDate()),
                        this
                      );
                    }.call(this, t, e, i, n, a));
              }
              U(0, ["gg", 2], 0, function () {
                return this.weekYear() % 100;
              }),
                U(0, ["GG", 2], 0, function () {
                  return this.isoWeekYear() % 100;
                }),
                Ge("gggg", "weekYear"),
                Ge("ggggg", "weekYear"),
                Ge("GGGG", "isoWeekYear"),
                Ge("GGGGG", "isoWeekYear"),
                A("weekYear", "gg"),
                A("isoWeekYear", "GG"),
                W("weekYear", 1),
                W("isoWeekYear", 1),
                ut("G", rt),
                ut("g", rt),
                ut("GG", $, Z),
                ut("gg", $, Z),
                ut("GGGG", it, X),
                ut("gggg", it, X),
                ut("GGGGG", nt, Q),
                ut("ggggg", nt, Q),
                pt(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, n) {
                  e[n.substr(0, 2)] = S(t);
                }),
                pt(["gg", "GG"], function (t, e, i, n) {
                  e[n] = c.parseTwoDigitYear(t);
                }),
                U("Q", 0, "Qo", "quarter"),
                A("quarter", "Q"),
                W("quarter", 7),
                ut("Q", q),
                gt("Q", function (t, e) {
                  e[bt] = 3 * (S(t) - 1);
                }),
                U("D", ["DD", 2], "Do", "date"),
                A("date", "D"),
                W("date", 9),
                ut("D", $),
                ut("DD", $, Z),
                ut("Do", function (t, e) {
                  return t ? e._ordinalParse : e._ordinalParseLenient;
                }),
                gt(["D", "DD"], yt),
                gt("Do", function (t, e) {
                  e[yt] = S(t.match($)[0]);
                });
              var Ze = L("Date", !0);
              U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
                A("dayOfYear", "DDD"),
                W("dayOfYear", 4),
                ut("DDD", et),
                ut("DDDD", J),
                gt(["DDD", "DDDD"], function (t, e, i) {
                  i._dayOfYear = S(t);
                }),
                U("m", ["mm", 2], 0, "minute"),
                A("minute", "m"),
                W("minute", 14),
                ut("m", $),
                ut("mm", $, Z),
                gt(["m", "mm"], kt);
              var Je = L("Minutes", !1);
              U("s", ["ss", 2], 0, "second"),
                A("second", "s"),
                W("second", 15),
                ut("s", $),
                ut("ss", $, Z),
                gt(["s", "ss"], St);
              var Xe,
                Qe = L("Seconds", !1);
              for (
                U("S", 0, 0, function () {
                  return ~~(this.millisecond() / 100);
                }),
                  U(0, ["SS", 2], 0, function () {
                    return ~~(this.millisecond() / 10);
                  }),
                  U(0, ["SSS", 3], 0, "millisecond"),
                  U(0, ["SSSS", 4], 0, function () {
                    return 10 * this.millisecond();
                  }),
                  U(0, ["SSSSS", 5], 0, function () {
                    return 100 * this.millisecond();
                  }),
                  U(0, ["SSSSSS", 6], 0, function () {
                    return 1e3 * this.millisecond();
                  }),
                  U(0, ["SSSSSSS", 7], 0, function () {
                    return 1e4 * this.millisecond();
                  }),
                  U(0, ["SSSSSSSS", 8], 0, function () {
                    return 1e5 * this.millisecond();
                  }),
                  U(0, ["SSSSSSSSS", 9], 0, function () {
                    return 1e6 * this.millisecond();
                  }),
                  A("millisecond", "ms"),
                  W("millisecond", 16),
                  ut("S", et, q),
                  ut("SS", et, Z),
                  ut("SSS", et, J),
                  Xe = "SSSS";
                Xe.length <= 9;
                Xe += "S"
              )
                ut(Xe, at);
              function $e(t, e) {
                e[wt] = S(1e3 * ("0." + t));
              }
              for (Xe = "S"; Xe.length <= 9; Xe += "S") gt(Xe, $e);
              var Ke = L("Milliseconds", !1);
              U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
              var ti = y.prototype;
              (ti.add = He),
                (ti.calendar = function (t, e) {
                  var i = t || ke(),
                    n = Fe(i, this).startOf("day"),
                    a = c.calendarFormat(this, n) || "sameElse",
                    r = e && (C(e[a]) ? e[a].call(this, i) : e[a]);
                  return this.format(
                    r || this.localeData().calendar(a, this, ke(i))
                  );
                }),
                (ti.clone = function () {
                  return new y(this);
                }),
                (ti.diff = function (t, e, i) {
                  var n, a, r, o;
                  return this.isValid() && (n = Fe(t, this)).isValid()
                    ? ((a = 6e4 * (n.utcOffset() - this.utcOffset())),
                      "year" === (e = I(e)) || "month" === e || "quarter" === e
                        ? ((s = this),
                          (l = n),
                          (h =
                            12 * (l.year() - s.year()) +
                            (l.month() - s.month())),
                          (c = s.clone().add(h, "months")),
                          (u =
                            l - c < 0
                              ? ((d = s.clone().add(h - 1, "months")),
                                (l - c) / (c - d))
                              : ((d = s.clone().add(h + 1, "months")),
                                (l - c) / (d - c))),
                          (o = -(h + u) || 0),
                          "quarter" === e
                            ? (o /= 3)
                            : "year" === e && (o /= 12))
                        : ((r = this - n),
                          (o =
                            "second" === e
                              ? r / 1e3
                              : "minute" === e
                              ? r / 6e4
                              : "hour" === e
                              ? r / 36e5
                              : "day" === e
                              ? (r - a) / 864e5
                              : "week" === e
                              ? (r - a) / 6048e5
                              : r)),
                      i ? o : k(o))
                    : NaN;
                  var s, l, d, u, h, c;
                }),
                (ti.endOf = function (t) {
                  return void 0 === (t = I(t)) || "millisecond" === t
                    ? this
                    : ("date" === t && (t = "day"),
                      this.startOf(t)
                        .add(1, "isoWeek" === t ? "week" : t)
                        .subtract(1, "ms"));
                }),
                (ti.format = function (t) {
                  t ||
                    (t = this.isUtc() ? c.defaultFormatUtc : c.defaultFormat);
                  var e = j(this, t);
                  return this.localeData().postformat(e);
                }),
                (ti.from = function (t, e) {
                  return this.isValid() &&
                    ((x(t) && t.isValid()) || ke(t).isValid())
                    ? We({ to: this, from: t })
                        .locale(this.locale())
                        .humanize(!e)
                    : this.localeData().invalidDate();
                }),
                (ti.fromNow = function (t) {
                  return this.from(ke(), t);
                }),
                (ti.to = function (t, e) {
                  return this.isValid() &&
                    ((x(t) && t.isValid()) || ke(t).isValid())
                    ? We({ from: this, to: t })
                        .locale(this.locale())
                        .humanize(!e)
                    : this.localeData().invalidDate();
                }),
                (ti.toNow = function (t) {
                  return this.to(ke(), t);
                }),
                (ti.get = function (t) {
                  return C(this[(t = I(t))]) ? this[t]() : this;
                }),
                (ti.invalidAt = function () {
                  return p(this).overflow;
                }),
                (ti.isAfter = function (t, e) {
                  var i = x(t) ? t : ke(t);
                  return (
                    !(!this.isValid() || !i.isValid()) &&
                    ("millisecond" === (e = I(r(e) ? "millisecond" : e))
                      ? this.valueOf() > i.valueOf()
                      : i.valueOf() < this.clone().startOf(e).valueOf())
                  );
                }),
                (ti.isBefore = function (t, e) {
                  var i = x(t) ? t : ke(t);
                  return (
                    !(!this.isValid() || !i.isValid()) &&
                    ("millisecond" === (e = I(r(e) ? "millisecond" : e))
                      ? this.valueOf() < i.valueOf()
                      : this.clone().endOf(e).valueOf() < i.valueOf())
                  );
                }),
                (ti.isBetween = function (t, e, i, n) {
                  return (
                    ("(" === (n = n || "()")[0]
                      ? this.isAfter(t, i)
                      : !this.isBefore(t, i)) &&
                    (")" === n[1] ? this.isBefore(e, i) : !this.isAfter(e, i))
                  );
                }),
                (ti.isSame = function (t, e) {
                  var i,
                    n = x(t) ? t : ke(t);
                  return (
                    !(!this.isValid() || !n.isValid()) &&
                    ("millisecond" === (e = I(e || "millisecond"))
                      ? this.valueOf() === n.valueOf()
                      : ((i = n.valueOf()),
                        this.clone().startOf(e).valueOf() <= i &&
                          i <= this.clone().endOf(e).valueOf()))
                  );
                }),
                (ti.isSameOrAfter = function (t, e) {
                  return this.isSame(t, e) || this.isAfter(t, e);
                }),
                (ti.isSameOrBefore = function (t, e) {
                  return this.isSame(t, e) || this.isBefore(t, e);
                }),
                (ti.isValid = function () {
                  return m(this);
                }),
                (ti.lang = Ue),
                (ti.locale = Ee),
                (ti.localeData = je),
                (ti.max = we),
                (ti.min = Se),
                (ti.parsingFlags = function () {
                  return h({}, p(this));
                }),
                (ti.set = function (t, e) {
                  if ("object" == typeof t)
                    for (
                      var i = (function (t) {
                          var e = [];
                          for (var i in t) e.push({ unit: i, priority: R[i] });
                          return (
                            e.sort(function (t, e) {
                              return t.priority - e.priority;
                            }),
                            e
                          );
                        })((t = O(t))),
                        n = 0;
                      n < i.length;
                      n++
                    )
                      this[i[n].unit](t[i[n].unit]);
                  else if (C(this[(t = I(t))])) return this[t](e);
                  return this;
                }),
                (ti.startOf = function (t) {
                  switch ((t = I(t))) {
                    case "year":
                      this.month(0);
                    case "quarter":
                    case "month":
                      this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                    case "date":
                      this.hours(0);
                    case "hour":
                      this.minutes(0);
                    case "minute":
                      this.seconds(0);
                    case "second":
                      this.milliseconds(0);
                  }
                  return (
                    "week" === t && this.weekday(0),
                    "isoWeek" === t && this.isoWeekday(1),
                    "quarter" === t &&
                      this.month(3 * Math.floor(this.month() / 3)),
                    this
                  );
                }),
                (ti.subtract = Ne),
                (ti.toArray = function () {
                  var t = this;
                  return [
                    t.year(),
                    t.month(),
                    t.date(),
                    t.hour(),
                    t.minute(),
                    t.second(),
                    t.millisecond(),
                  ];
                }),
                (ti.toObject = function () {
                  var t = this;
                  return {
                    years: t.year(),
                    months: t.month(),
                    date: t.date(),
                    hours: t.hours(),
                    minutes: t.minutes(),
                    seconds: t.seconds(),
                    milliseconds: t.milliseconds(),
                  };
                }),
                (ti.toDate = function () {
                  return new Date(this.valueOf());
                }),
                (ti.toISOString = function () {
                  var t = this.clone().utc();
                  return 0 < t.year() && t.year() <= 9999
                    ? C(Date.prototype.toISOString)
                      ? this.toDate().toISOString()
                      : j(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                    : j(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
                }),
                (ti.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null;
                }),
                (ti.toString = function () {
                  return this.clone()
                    .locale("en")
                    .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
                }),
                (ti.unix = function () {
                  return Math.floor(this.valueOf() / 1e3);
                }),
                (ti.valueOf = function () {
                  return this._d.valueOf() - 6e4 * (this._offset || 0);
                }),
                (ti.creationData = function () {
                  return {
                    input: this._i,
                    format: this._f,
                    locale: this._locale,
                    isUTC: this._isUTC,
                    strict: this._strict,
                  };
                }),
                (ti.year = Vt),
                (ti.isLeapYear = function () {
                  return Lt(this.year());
                }),
                (ti.weekYear = function (t) {
                  return qe.call(
                    this,
                    t,
                    this.week(),
                    this.weekday(),
                    this.localeData()._week.dow,
                    this.localeData()._week.doy
                  );
                }),
                (ti.isoWeekYear = function (t) {
                  return qe.call(
                    this,
                    t,
                    this.isoWeek(),
                    this.isoWeekday(),
                    1,
                    4
                  );
                }),
                (ti.quarter = ti.quarters =
                  function (t) {
                    return null == t
                      ? Math.ceil((this.month() + 1) / 3)
                      : this.month(3 * (t - 1) + (this.month() % 3));
                  }),
                (ti.month = At),
                (ti.daysInMonth = function () {
                  return Dt(this.year(), this.month());
                }),
                (ti.week = ti.weeks =
                  function (t) {
                    var e = this.localeData().week(this);
                    return null == t ? e : this.add(7 * (t - e), "d");
                  }),
                (ti.isoWeek = ti.isoWeeks =
                  function (t) {
                    var e = Ht(this, 1, 4).week;
                    return null == t ? e : this.add(7 * (t - e), "d");
                  }),
                (ti.weeksInYear = function () {
                  var t = this.localeData()._week;
                  return Nt(this.year(), t.dow, t.doy);
                }),
                (ti.isoWeeksInYear = function () {
                  return Nt(this.year(), 1, 4);
                }),
                (ti.date = Ze),
                (ti.day = ti.days =
                  function (t) {
                    if (!this.isValid()) return null != t ? this : NaN;
                    var e,
                      i,
                      n = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null != t
                      ? ((e = t),
                        (i = this.localeData()),
                        (t =
                          "string" != typeof e
                            ? e
                            : isNaN(e)
                            ? "number" == typeof (e = i.weekdaysParse(e))
                              ? e
                              : null
                            : parseInt(e, 10)),
                        this.add(t - n, "d"))
                      : n;
                  }),
                (ti.weekday = function (t) {
                  if (!this.isValid()) return null != t ? this : NaN;
                  var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
                  return null == t ? e : this.add(t - e, "d");
                }),
                (ti.isoWeekday = function (t) {
                  if (!this.isValid()) return null != t ? this : NaN;
                  if (null == t) return this.day() || 7;
                  var e,
                    i,
                    n =
                      ((e = t),
                      (i = this.localeData()),
                      "string" == typeof e
                        ? i.weekdaysParse(e) % 7 || 7
                        : isNaN(e)
                        ? null
                        : e);
                  return this.day(this.day() % 7 ? n : n - 7);
                }),
                (ti.dayOfYear = function (t) {
                  var e =
                    Math.round(
                      (this.clone().startOf("day") -
                        this.clone().startOf("year")) /
                        864e5
                    ) + 1;
                  return null == t ? e : this.add(t - e, "d");
                }),
                (ti.hour = ti.hours = te),
                (ti.minute = ti.minutes = Je),
                (ti.second = ti.seconds = Qe),
                (ti.millisecond = ti.milliseconds = Ke),
                (ti.utcOffset = function (t, e) {
                  var i,
                    n = this._offset || 0;
                  return this.isValid()
                    ? null != t
                      ? ("string" == typeof t
                          ? (t = Pe(st, t))
                          : Math.abs(t) < 16 && (t *= 60),
                        !this._isUTC && e && (i = Ae(this)),
                        (this._offset = t),
                        (this._isUTC = !0),
                        null != i && this.add(i, "m"),
                        n !== t &&
                          (!e || this._changeInProgress
                            ? ze(this, We(t - n, "m"), 1, !1)
                            : this._changeInProgress ||
                              ((this._changeInProgress = !0),
                              c.updateOffset(this, !0),
                              (this._changeInProgress = null))),
                        this)
                      : this._isUTC
                      ? n
                      : Ae(this)
                    : null != t
                    ? this
                    : NaN;
                }),
                (ti.utc = function (t) {
                  return this.utcOffset(0, t);
                }),
                (ti.local = function (t) {
                  return (
                    this._isUTC &&
                      (this.utcOffset(0, t),
                      (this._isUTC = !1),
                      t && this.subtract(Ae(this), "m")),
                    this
                  );
                }),
                (ti.parseZone = function () {
                  return (
                    this._tzm
                      ? this.utcOffset(this._tzm)
                      : "string" == typeof this._i &&
                        this.utcOffset(Pe(ot, this._i)),
                    this
                  );
                }),
                (ti.hasAlignedHourOffset = function (t) {
                  return (
                    !!this.isValid() &&
                    ((t = t ? ke(t).utcOffset() : 0),
                    (this.utcOffset() - t) % 60 == 0)
                  );
                }),
                (ti.isDST = function () {
                  return (
                    this.utcOffset() > this.clone().month(0).utcOffset() ||
                    this.utcOffset() > this.clone().month(5).utcOffset()
                  );
                }),
                (ti.isLocal = function () {
                  return !!this.isValid() && !this._isUTC;
                }),
                (ti.isUtcOffset = function () {
                  return !!this.isValid() && this._isUTC;
                }),
                (ti.isUtc = Ie),
                (ti.isUTC = Ie),
                (ti.zoneAbbr = function () {
                  return this._isUTC ? "UTC" : "";
                }),
                (ti.zoneName = function () {
                  return this._isUTC ? "Coordinated Universal Time" : "";
                }),
                (ti.dates = i(
                  "dates accessor is deprecated. Use date instead.",
                  Ze
                )),
                (ti.months = i(
                  "months accessor is deprecated. Use month instead",
                  At
                )),
                (ti.years = i(
                  "years accessor is deprecated. Use year instead",
                  Vt
                )),
                (ti.zone = i(
                  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
                  function (t, e) {
                    return null != t
                      ? ("string" != typeof t && (t = -t),
                        this.utcOffset(t, e),
                        this)
                      : -this.utcOffset();
                  }
                )),
                (ti.isDSTShifted = i(
                  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
                  function () {
                    if (!r(this._isDSTShifted)) return this._isDSTShifted;
                    var t = {};
                    if ((b(t, this), (t = ye(t))._a)) {
                      var e = t._isUTC ? g(t._a) : ke(t._a);
                      this._isDSTShifted =
                        this.isValid() && 0 < w(t._a, e.toArray());
                    } else this._isDSTShifted = !1;
                    return this._isDSTShifted;
                  }
                ));
              var ei = ti;
              function ii(t) {
                return t;
              }
              var ni = P.prototype;
              function ai(t, e, i, n) {
                var a = se(),
                  r = g().set(n, e);
                return a[i](r, t);
              }
              function ri(t, e, i) {
                if (
                  ("number" == typeof t && ((e = t), (t = void 0)),
                  (t = t || ""),
                  null != e)
                )
                  return ai(t, e, i, "month");
                var n,
                  a = [];
                for (n = 0; n < 12; n++) a[n] = ai(t, n, i, "month");
                return a;
              }
              function oi(t, e, i, n) {
                e =
                  ("boolean" == typeof t
                    ? "number" == typeof e && ((i = e), (e = void 0))
                    : ((e = t),
                      (t = !1),
                      "number" == typeof (i = e) && ((i = e), (e = void 0))),
                  e || "");
                var a,
                  r = se(),
                  o = t ? r._week.dow : 0;
                if (null != i) return ai(e, (i + o) % 7, n, "day");
                var s = [];
                for (a = 0; a < 7; a++) s[a] = ai(e, (a + o) % 7, n, "day");
                return s;
              }
              (ni.calendar = function (t, e, i) {
                var n = this._calendar[t] || this._calendar.sameElse;
                return C(n) ? n.call(e, i) : n;
              }),
                (ni.longDateFormat = function (t) {
                  var e = this._longDateFormat[t],
                    i = this._longDateFormat[t.toUpperCase()];
                  return e || !i
                    ? e
                    : ((this._longDateFormat[t] = i.replace(
                        /MMMM|MM|DD|dddd/g,
                        function (t) {
                          return t.slice(1);
                        }
                      )),
                      this._longDateFormat[t]);
                }),
                (ni.invalidDate = function () {
                  return this._invalidDate;
                }),
                (ni.ordinal = function (t) {
                  return this._ordinal.replace("%d", t);
                }),
                (ni.preparse = ii),
                (ni.postformat = ii),
                (ni.relativeTime = function (t, e, i, n) {
                  var a = this._relativeTime[i];
                  return C(a) ? a(t, e, i, n) : a.replace(/%d/i, t);
                }),
                (ni.pastFuture = function (t, e) {
                  var i = this._relativeTime[0 < t ? "future" : "past"];
                  return C(i) ? i(e) : i.replace(/%s/i, e);
                }),
                (ni.set = function (t) {
                  var e, i;
                  for (i in t)
                    C((e = t[i])) ? (this[i] = e) : (this["_" + i] = e);
                  (this._config = t),
                    (this._ordinalParseLenient = new RegExp(
                      this._ordinalParse.source + "|" + /\d{1,2}/.source
                    ));
                }),
                (ni.months = function (t, e) {
                  return s(this._months)
                    ? this._months[t.month()]
                    : this._months[
                        (this._months.isFormat || Ct).test(e)
                          ? "format"
                          : "standalone"
                      ][t.month()];
                }),
                (ni.monthsShort = function (t, e) {
                  return s(this._monthsShort)
                    ? this._monthsShort[t.month()]
                    : this._monthsShort[Ct.test(e) ? "format" : "standalone"][
                        t.month()
                      ];
                }),
                (ni.monthsParse = function (t, e, i) {
                  var n, a, r;
                  if (this._monthsParseExact)
                    return function (t, e, i) {
                      var n,
                        a,
                        r,
                        o = t.toLocaleLowerCase();
                      if (!this._monthsParse)
                        for (
                          this._monthsParse = [],
                            this._longMonthsParse = [],
                            this._shortMonthsParse = [],
                            n = 0;
                          n < 12;
                          ++n
                        )
                          (r = g([2e3, n])),
                            (this._shortMonthsParse[n] = this.monthsShort(
                              r,
                              ""
                            ).toLocaleLowerCase()),
                            (this._longMonthsParse[n] = this.months(
                              r,
                              ""
                            ).toLocaleLowerCase());
                      return i
                        ? "MMM" === e
                          ? -1 !== (a = mt.call(this._shortMonthsParse, o))
                            ? a
                            : null
                          : -1 !== (a = mt.call(this._longMonthsParse, o))
                          ? a
                          : null
                        : "MMM" === e
                        ? -1 !== (a = mt.call(this._shortMonthsParse, o))
                          ? a
                          : -1 !== (a = mt.call(this._longMonthsParse, o))
                          ? a
                          : null
                        : -1 !== (a = mt.call(this._longMonthsParse, o))
                        ? a
                        : -1 !== (a = mt.call(this._shortMonthsParse, o))
                        ? a
                        : null;
                    }.call(this, t, e, i);
                  for (
                    this._monthsParse ||
                      ((this._monthsParse = []),
                      (this._longMonthsParse = []),
                      (this._shortMonthsParse = [])),
                      n = 0;
                    n < 12;
                    n++
                  ) {
                    if (
                      ((a = g([2e3, n])),
                      i &&
                        !this._longMonthsParse[n] &&
                        ((this._longMonthsParse[n] = new RegExp(
                          "^" + this.months(a, "").replace(".", "") + "$",
                          "i"
                        )),
                        (this._shortMonthsParse[n] = new RegExp(
                          "^" + this.monthsShort(a, "").replace(".", "") + "$",
                          "i"
                        ))),
                      i ||
                        this._monthsParse[n] ||
                        ((r =
                          "^" +
                          this.months(a, "") +
                          "|^" +
                          this.monthsShort(a, "")),
                        (this._monthsParse[n] = new RegExp(
                          r.replace(".", ""),
                          "i"
                        ))),
                      i && "MMMM" === e && this._longMonthsParse[n].test(t))
                    )
                      return n;
                    if (i && "MMM" === e && this._shortMonthsParse[n].test(t))
                      return n;
                    if (!i && this._monthsParse[n].test(t)) return n;
                  }
                }),
                (ni.monthsRegex = function (t) {
                  return this._monthsParseExact
                    ? (f(this, "_monthsRegex") || Rt.call(this),
                      t ? this._monthsStrictRegex : this._monthsRegex)
                    : (f(this, "_monthsRegex") || (this._monthsRegex = Ot),
                      this._monthsStrictRegex && t
                        ? this._monthsStrictRegex
                        : this._monthsRegex);
                }),
                (ni.monthsShortRegex = function (t) {
                  return this._monthsParseExact
                    ? (f(this, "_monthsRegex") || Rt.call(this),
                      t ? this._monthsShortStrictRegex : this._monthsShortRegex)
                    : (f(this, "_monthsShortRegex") ||
                        (this._monthsShortRegex = It),
                      this._monthsShortStrictRegex && t
                        ? this._monthsShortStrictRegex
                        : this._monthsShortRegex);
                }),
                (ni.week = function (t) {
                  return Ht(t, this._week.dow, this._week.doy).week;
                }),
                (ni.firstDayOfYear = function () {
                  return this._week.doy;
                }),
                (ni.firstDayOfWeek = function () {
                  return this._week.dow;
                }),
                (ni.weekdays = function (t, e) {
                  return s(this._weekdays)
                    ? this._weekdays[t.day()]
                    : this._weekdays[
                        this._weekdays.isFormat.test(e)
                          ? "format"
                          : "standalone"
                      ][t.day()];
                }),
                (ni.weekdaysMin = function (t) {
                  return this._weekdaysMin[t.day()];
                }),
                (ni.weekdaysShort = function (t) {
                  return this._weekdaysShort[t.day()];
                }),
                (ni.weekdaysParse = function (t, e, i) {
                  var n, a, r;
                  if (this._weekdaysParseExact)
                    return function (t, e, i) {
                      var n,
                        a,
                        r,
                        o = t.toLocaleLowerCase();
                      if (!this._weekdaysParse)
                        for (
                          this._weekdaysParse = [],
                            this._shortWeekdaysParse = [],
                            this._minWeekdaysParse = [],
                            n = 0;
                          n < 7;
                          ++n
                        )
                          (r = g([2e3, 1]).day(n)),
                            (this._minWeekdaysParse[n] = this.weekdaysMin(
                              r,
                              ""
                            ).toLocaleLowerCase()),
                            (this._shortWeekdaysParse[n] = this.weekdaysShort(
                              r,
                              ""
                            ).toLocaleLowerCase()),
                            (this._weekdaysParse[n] = this.weekdays(
                              r,
                              ""
                            ).toLocaleLowerCase());
                      return i
                        ? "dddd" === e
                          ? -1 !== (a = mt.call(this._weekdaysParse, o))
                            ? a
                            : null
                          : "ddd" === e
                          ? -1 !== (a = mt.call(this._shortWeekdaysParse, o))
                            ? a
                            : null
                          : -1 !== (a = mt.call(this._minWeekdaysParse, o))
                          ? a
                          : null
                        : "dddd" === e
                        ? -1 !== (a = mt.call(this._weekdaysParse, o))
                          ? a
                          : -1 !== (a = mt.call(this._shortWeekdaysParse, o))
                          ? a
                          : -1 !== (a = mt.call(this._minWeekdaysParse, o))
                          ? a
                          : null
                        : "ddd" === e
                        ? -1 !== (a = mt.call(this._shortWeekdaysParse, o))
                          ? a
                          : -1 !== (a = mt.call(this._weekdaysParse, o))
                          ? a
                          : -1 !== (a = mt.call(this._minWeekdaysParse, o))
                          ? a
                          : null
                        : -1 !== (a = mt.call(this._minWeekdaysParse, o))
                        ? a
                        : -1 !== (a = mt.call(this._weekdaysParse, o))
                        ? a
                        : -1 !== (a = mt.call(this._shortWeekdaysParse, o))
                        ? a
                        : null;
                    }.call(this, t, e, i);
                  for (
                    this._weekdaysParse ||
                      ((this._weekdaysParse = []),
                      (this._minWeekdaysParse = []),
                      (this._shortWeekdaysParse = []),
                      (this._fullWeekdaysParse = [])),
                      n = 0;
                    n < 7;
                    n++
                  ) {
                    if (
                      ((a = g([2e3, 1]).day(n)),
                      i &&
                        !this._fullWeekdaysParse[n] &&
                        ((this._fullWeekdaysParse[n] = new RegExp(
                          "^" + this.weekdays(a, "").replace(".", ".?") + "$",
                          "i"
                        )),
                        (this._shortWeekdaysParse[n] = new RegExp(
                          "^" +
                            this.weekdaysShort(a, "").replace(".", ".?") +
                            "$",
                          "i"
                        )),
                        (this._minWeekdaysParse[n] = new RegExp(
                          "^" +
                            this.weekdaysMin(a, "").replace(".", ".?") +
                            "$",
                          "i"
                        ))),
                      this._weekdaysParse[n] ||
                        ((r =
                          "^" +
                          this.weekdays(a, "") +
                          "|^" +
                          this.weekdaysShort(a, "") +
                          "|^" +
                          this.weekdaysMin(a, "")),
                        (this._weekdaysParse[n] = new RegExp(
                          r.replace(".", ""),
                          "i"
                        ))),
                      i && "dddd" === e && this._fullWeekdaysParse[n].test(t))
                    )
                      return n;
                    if (i && "ddd" === e && this._shortWeekdaysParse[n].test(t))
                      return n;
                    if (i && "dd" === e && this._minWeekdaysParse[n].test(t))
                      return n;
                    if (!i && this._weekdaysParse[n].test(t)) return n;
                  }
                }),
                (ni.weekdaysRegex = function (t) {
                  return this._weekdaysParseExact
                    ? (f(this, "_weekdaysRegex") || Jt.call(this),
                      t ? this._weekdaysStrictRegex : this._weekdaysRegex)
                    : (f(this, "_weekdaysRegex") || (this._weekdaysRegex = Gt),
                      this._weekdaysStrictRegex && t
                        ? this._weekdaysStrictRegex
                        : this._weekdaysRegex);
                }),
                (ni.weekdaysShortRegex = function (t) {
                  return this._weekdaysParseExact
                    ? (f(this, "_weekdaysRegex") || Jt.call(this),
                      t
                        ? this._weekdaysShortStrictRegex
                        : this._weekdaysShortRegex)
                    : (f(this, "_weekdaysShortRegex") ||
                        (this._weekdaysShortRegex = qt),
                      this._weekdaysShortStrictRegex && t
                        ? this._weekdaysShortStrictRegex
                        : this._weekdaysShortRegex);
                }),
                (ni.weekdaysMinRegex = function (t) {
                  return this._weekdaysParseExact
                    ? (f(this, "_weekdaysRegex") || Jt.call(this),
                      t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
                    : (f(this, "_weekdaysMinRegex") ||
                        (this._weekdaysMinRegex = Zt),
                      this._weekdaysMinStrictRegex && t
                        ? this._weekdaysMinStrictRegex
                        : this._weekdaysMinRegex);
                }),
                (ni.isPM = function (t) {
                  return "p" === (t + "").toLowerCase().charAt(0);
                }),
                (ni.meridiem = function (t, e, i) {
                  return 11 < t ? (i ? "pm" : "PM") : i ? "am" : "AM";
                }),
                re("en", {
                  ordinalParse: /\d{1,2}(th|st|nd|rd)/,
                  ordinal: function (t) {
                    var e = t % 10;
                    return (
                      t +
                      (1 === S((t % 100) / 10)
                        ? "th"
                        : 1 === e
                        ? "st"
                        : 2 === e
                        ? "nd"
                        : 3 === e
                        ? "rd"
                        : "th")
                    );
                  },
                }),
                (c.lang = i(
                  "moment.lang is deprecated. Use moment.locale instead.",
                  re
                )),
                (c.langData = i(
                  "moment.langData is deprecated. Use moment.localeData instead.",
                  se
                ));
              var si = Math.abs;
              function li(t, e, i, n) {
                var a = We(e, i);
                return (
                  (t._milliseconds += n * a._milliseconds),
                  (t._days += n * a._days),
                  (t._months += n * a._months),
                  t._bubble()
                );
              }
              function di(t) {
                return t < 0 ? Math.floor(t) : Math.ceil(t);
              }
              function ui(t) {
                return (4800 * t) / 146097;
              }
              function hi(t) {
                return (146097 * t) / 4800;
              }
              function ci(t) {
                return function () {
                  return this.as(t);
                };
              }
              var fi = ci("ms"),
                gi = ci("s"),
                pi = ci("m"),
                mi = ci("h"),
                vi = ci("d"),
                bi = ci("w"),
                yi = ci("M"),
                xi = ci("y");
              function ki(t) {
                return function () {
                  return this._data[t];
                };
              }
              var Si = ki("milliseconds"),
                wi = ki("seconds"),
                _i = ki("minutes"),
                Mi = ki("hours"),
                Di = ki("days"),
                Ci = ki("months"),
                Ti = ki("years");
              var Pi = Math.round,
                Fi = { s: 45, m: 45, h: 22, d: 26, M: 11 };
              var Ai = Math.abs;
              function Ii() {
                var t,
                  e,
                  i = Ai(this._milliseconds) / 1e3,
                  n = Ai(this._days),
                  a = Ai(this._months);
                (e = k((t = k(i / 60)) / 60)), (i %= 60), (t %= 60);
                var r = k(a / 12),
                  o = (a %= 12),
                  s = n,
                  l = e,
                  d = t,
                  u = i,
                  h = this.asSeconds();
                return h
                  ? (h < 0 ? "-" : "") +
                      "P" +
                      (r ? r + "Y" : "") +
                      (o ? o + "M" : "") +
                      (s ? s + "D" : "") +
                      (l || d || u ? "T" : "") +
                      (l ? l + "H" : "") +
                      (d ? d + "M" : "") +
                      (u ? u + "S" : "")
                  : "P0D";
              }
              var Oi = Me.prototype;
              return (
                (Oi.abs = function () {
                  var t = this._data;
                  return (
                    (this._milliseconds = si(this._milliseconds)),
                    (this._days = si(this._days)),
                    (this._months = si(this._months)),
                    (t.milliseconds = si(t.milliseconds)),
                    (t.seconds = si(t.seconds)),
                    (t.minutes = si(t.minutes)),
                    (t.hours = si(t.hours)),
                    (t.months = si(t.months)),
                    (t.years = si(t.years)),
                    this
                  );
                }),
                (Oi.add = function (t, e) {
                  return li(this, t, e, 1);
                }),
                (Oi.subtract = function (t, e) {
                  return li(this, t, e, -1);
                }),
                (Oi.as = function (t) {
                  var e,
                    i,
                    n = this._milliseconds;
                  if ("month" === (t = I(t)) || "year" === t)
                    return (
                      (e = this._days + n / 864e5),
                      (i = this._months + ui(e)),
                      "month" === t ? i : i / 12
                    );
                  switch (
                    ((e = this._days + Math.round(hi(this._months))), t)
                  ) {
                    case "week":
                      return e / 7 + n / 6048e5;
                    case "day":
                      return e + n / 864e5;
                    case "hour":
                      return 24 * e + n / 36e5;
                    case "minute":
                      return 1440 * e + n / 6e4;
                    case "second":
                      return 86400 * e + n / 1e3;
                    case "millisecond":
                      return Math.floor(864e5 * e) + n;
                    default:
                      throw new Error("Unknown unit " + t);
                  }
                }),
                (Oi.asMilliseconds = fi),
                (Oi.asSeconds = gi),
                (Oi.asMinutes = pi),
                (Oi.asHours = mi),
                (Oi.asDays = vi),
                (Oi.asWeeks = bi),
                (Oi.asMonths = yi),
                (Oi.asYears = xi),
                (Oi.valueOf = function () {
                  return (
                    this._milliseconds +
                    864e5 * this._days +
                    (this._months % 12) * 2592e6 +
                    31536e6 * S(this._months / 12)
                  );
                }),
                (Oi._bubble = function () {
                  var t,
                    e,
                    i,
                    n,
                    a,
                    r = this._milliseconds,
                    o = this._days,
                    s = this._months,
                    l = this._data;
                  return (
                    (0 <= r && 0 <= o && 0 <= s) ||
                      (r <= 0 && o <= 0 && s <= 0) ||
                      ((r += 864e5 * di(hi(s) + o)), (s = o = 0)),
                    (l.milliseconds = r % 1e3),
                    (t = k(r / 1e3)),
                    (l.seconds = t % 60),
                    (e = k(t / 60)),
                    (l.minutes = e % 60),
                    (i = k(e / 60)),
                    (l.hours = i % 24),
                    (s += a = k(ui((o += k(i / 24))))),
                    (o -= di(hi(a))),
                    (n = k(s / 12)),
                    (s %= 12),
                    (l.days = o),
                    (l.months = s),
                    (l.years = n),
                    this
                  );
                }),
                (Oi.get = function (t) {
                  return this[(t = I(t)) + "s"]();
                }),
                (Oi.milliseconds = Si),
                (Oi.seconds = wi),
                (Oi.minutes = _i),
                (Oi.hours = Mi),
                (Oi.days = Di),
                (Oi.weeks = function () {
                  return k(this.days() / 7);
                }),
                (Oi.months = Ci),
                (Oi.years = Ti),
                (Oi.humanize = function (t) {
                  var e,
                    i,
                    n,
                    a,
                    r,
                    o,
                    s,
                    l,
                    d,
                    u,
                    h,
                    c = this.localeData(),
                    f =
                      ((i = !t),
                      (n = c),
                      (a = We((e = this)).abs()),
                      (r = Pi(a.as("s"))),
                      (o = Pi(a.as("m"))),
                      (s = Pi(a.as("h"))),
                      (l = Pi(a.as("d"))),
                      (d = Pi(a.as("M"))),
                      (u = Pi(a.as("y"))),
                      ((h = (r < Fi.s && ["s", r]) ||
                        (o <= 1 && ["m"]) ||
                        (o < Fi.m && ["mm", o]) ||
                        (s <= 1 && ["h"]) ||
                        (s < Fi.h && ["hh", s]) ||
                        (l <= 1 && ["d"]) ||
                        (l < Fi.d && ["dd", l]) ||
                        (d <= 1 && ["M"]) ||
                        (d < Fi.M && ["MM", d]) ||
                        (u <= 1 && ["y"]) || ["yy", u])[2] = i),
                      (h[3] = 0 < +e),
                      (h[4] = n),
                      function (t, e, i, n, a) {
                        return a.relativeTime(e || 1, !!i, t, n);
                      }.apply(null, h));
                  return t && (f = c.pastFuture(+this, f)), c.postformat(f);
                }),
                (Oi.toISOString = Ii),
                (Oi.toString = Ii),
                (Oi.toJSON = Ii),
                (Oi.locale = Ee),
                (Oi.localeData = je),
                (Oi.toIsoString = i(
                  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
                  Ii
                )),
                (Oi.lang = Ue),
                U("X", 0, 0, "unix"),
                U("x", 0, 0, "valueOf"),
                ut("x", rt),
                ut("X", /[+-]?\d+(\.\d{1,3})?/),
                gt("X", function (t, e, i) {
                  i._d = new Date(1e3 * parseFloat(t, 10));
                }),
                gt("x", function (t, e, i) {
                  i._d = new Date(S(t));
                }),
                (c.version = "2.14.1"),
                (t = ke),
                (c.fn = ei),
                (c.min = function () {
                  return _e("isBefore", [].slice.call(arguments, 0));
                }),
                (c.max = function () {
                  return _e("isAfter", [].slice.call(arguments, 0));
                }),
                (c.now = function () {
                  return Date.now ? Date.now() : +new Date();
                }),
                (c.utc = g),
                (c.unix = function (t) {
                  return ke(1e3 * t);
                }),
                (c.months = function (t, e) {
                  return ri(t, e, "months");
                }),
                (c.isDate = d),
                (c.locale = re),
                (c.invalid = v),
                (c.duration = We),
                (c.isMoment = x),
                (c.weekdays = function (t, e, i) {
                  return oi(t, e, i, "weekdays");
                }),
                (c.parseZone = function () {
                  return ke.apply(null, arguments).parseZone();
                }),
                (c.localeData = se),
                (c.isDuration = De),
                (c.monthsShort = function (t, e) {
                  return ri(t, e, "monthsShort");
                }),
                (c.weekdaysMin = function (t, e, i) {
                  return oi(t, e, i, "weekdaysMin");
                }),
                (c.defineLocale = oe),
                (c.updateLocale = function (t, e) {
                  if (null != e) {
                    var i,
                      n = ee;
                    null != ie[t] && (n = ie[t]._config),
                      ((i = new P((e = T(n, e)))).parentLocale = ie[t]),
                      (ie[t] = i),
                      re(t);
                  } else
                    null != ie[t] &&
                      (null != ie[t].parentLocale
                        ? (ie[t] = ie[t].parentLocale)
                        : null != ie[t] && delete ie[t]);
                  return ie[t];
                }),
                (c.locales = function () {
                  return _(ie);
                }),
                (c.weekdaysShort = function (t, e, i) {
                  return oi(t, e, i, "weekdaysShort");
                }),
                (c.normalizeUnits = I),
                (c.relativeTimeRounding = function (t) {
                  return void 0 === t
                    ? Pi
                    : "function" == typeof t && ((Pi = t), !0);
                }),
                (c.relativeTimeThreshold = function (t, e) {
                  return (
                    void 0 !== Fi[t] &&
                    (void 0 === e ? Fi[t] : ((Fi[t] = e), !0))
                  );
                }),
                (c.calendarFormat = function (t, e) {
                  var i = t.diff(e, "days", !0);
                  return i < -6
                    ? "sameElse"
                    : i < -1
                    ? "lastWeek"
                    : i < 0
                    ? "lastDay"
                    : i < 1
                    ? "sameDay"
                    : i < 2
                    ? "nextDay"
                    : i < 7
                    ? "nextWeek"
                    : "sameElse";
                }),
                (c.prototype = ei),
                c
              );
            }),
            "object" == typeof t && void 0 !== Wi
              ? (Wi.exports = i())
              : (e.moment = i());
        },
        {},
      ],
      7: [
        function (t, e, i) {
          var n = t(27)();
          t(26)(n),
            t(22)(n),
            t(25)(n),
            t(21)(n),
            t(23)(n),
            t(24)(n),
            t(28)(n),
            t(32)(n),
            t(30)(n),
            t(31)(n),
            t(33)(n),
            t(29)(n),
            t(34)(n),
            t(35)(n),
            t(36)(n),
            t(37)(n),
            t(38)(n),
            t(41)(n),
            t(39)(n),
            t(40)(n),
            t(42)(n),
            t(43)(n),
            t(44)(n),
            t(15)(n),
            t(16)(n),
            t(17)(n),
            t(18)(n),
            t(19)(n),
            t(20)(n),
            t(8)(n),
            t(9)(n),
            t(10)(n),
            t(11)(n),
            t(12)(n),
            t(13)(n),
            t(14)(n),
            (window.Chart = e.exports = n);
        },
        {
          10: 10,
          11: 11,
          12: 12,
          13: 13,
          14: 14,
          15: 15,
          16: 16,
          17: 17,
          18: 18,
          19: 19,
          20: 20,
          21: 21,
          22: 22,
          23: 23,
          24: 24,
          25: 25,
          26: 26,
          27: 27,
          28: 28,
          29: 29,
          30: 30,
          31: 31,
          32: 32,
          33: 33,
          34: 34,
          35: 35,
          36: 36,
          37: 37,
          38: 38,
          39: 39,
          40: 40,
          41: 41,
          42: 42,
          43: 43,
          44: 44,
          8: 8,
          9: 9,
        },
      ],
      8: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            i.Bar = function (t, e) {
              return (e.type = "bar"), new i(t, e);
            };
          };
        },
        {},
      ],
      9: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            i.Bubble = function (t, e) {
              return (e.type = "bubble"), new i(t, e);
            };
          };
        },
        {},
      ],
      10: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            i.Doughnut = function (t, e) {
              return (e.type = "doughnut"), new i(t, e);
            };
          };
        },
        {},
      ],
      11: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            i.Line = function (t, e) {
              return (e.type = "line"), new i(t, e);
            };
          };
        },
        {},
      ],
      12: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            i.PolarArea = function (t, e) {
              return (e.type = "polarArea"), new i(t, e);
            };
          };
        },
        {},
      ],
      13: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            i.Radar = function (t, e) {
              return (
                (e.options = i.helpers.configMerge(
                  { aspectRatio: 1 },
                  e.options
                )),
                (e.type = "radar"),
                new i(t, e)
              );
            };
          };
        },
        {},
      ],
      14: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            (i.defaults.scatter = {
              hover: { mode: "single" },
              scales: {
                xAxes: [{ type: "linear", position: "bottom", id: "x-axis-1" }],
                yAxes: [{ type: "linear", position: "left", id: "y-axis-1" }],
              },
              tooltips: {
                callbacks: {
                  title: function () {
                    return "";
                  },
                  label: function (t) {
                    return "(" + t.xLabel + ", " + t.yLabel + ")";
                  },
                },
              },
            }),
              (i.controllers.scatter = i.controllers.line),
              (i.Scatter = function (t, e) {
                return (e.type = "scatter"), new i(t, e);
              });
          };
        },
        {},
      ],
      15: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            var h = i.helpers;
            (i.defaults.bar = {
              hover: { mode: "label" },
              scales: {
                xAxes: [
                  {
                    type: "category",
                    categoryPercentage: 0.8,
                    barPercentage: 0.9,
                    gridLines: { offsetGridLines: !0 },
                  },
                ],
                yAxes: [{ type: "linear" }],
              },
            }),
              (i.controllers.bar = i.DatasetController.extend({
                dataElementType: i.elements.Rectangle,
                initialize: function (t, e) {
                  i.DatasetController.prototype.initialize.call(this, t, e),
                    (this.getMeta().bar = !0);
                },
                getBarCount: function () {
                  var i = this,
                    n = 0;
                  return (
                    h.each(
                      i.chart.data.datasets,
                      function (t, e) {
                        i.chart.getDatasetMeta(e).bar &&
                          i.chart.isDatasetVisible(e) &&
                          ++n;
                      },
                      i
                    ),
                    n
                  );
                },
                update: function (i) {
                  var n = this;
                  h.each(
                    n.getMeta().data,
                    function (t, e) {
                      n.updateElement(t, e, i);
                    },
                    n
                  );
                },
                updateElement: function (t, e, i) {
                  var n = this,
                    a = n.getMeta(),
                    r = n.getScaleForId(a.xAxisID),
                    o = n.getScaleForId(a.yAxisID),
                    s = o.getBasePixel(),
                    l = n.chart.options.elements.rectangle,
                    d = t.custom || {},
                    u = n.getDataset();
                  h.extend(t, {
                    _xScale: r,
                    _yScale: o,
                    _datasetIndex: n.index,
                    _index: e,
                    _model: {
                      x: n.calculateBarX(e, n.index),
                      y: i ? s : n.calculateBarY(e, n.index),
                      label: n.chart.data.labels[e],
                      datasetLabel: u.label,
                      base: i ? s : n.calculateBarBase(n.index, e),
                      width: n.calculateBarWidth(e),
                      backgroundColor: d.backgroundColor
                        ? d.backgroundColor
                        : h.getValueAtIndexOrDefault(
                            u.backgroundColor,
                            e,
                            l.backgroundColor
                          ),
                      borderSkipped: d.borderSkipped
                        ? d.borderSkipped
                        : l.borderSkipped,
                      borderColor: d.borderColor
                        ? d.borderColor
                        : h.getValueAtIndexOrDefault(
                            u.borderColor,
                            e,
                            l.borderColor
                          ),
                      borderWidth: d.borderWidth
                        ? d.borderWidth
                        : h.getValueAtIndexOrDefault(
                            u.borderWidth,
                            e,
                            l.borderWidth
                          ),
                    },
                  }),
                    t.pivot();
                },
                calculateBarBase: function (t, e) {
                  var i = this.getMeta(),
                    n = this.getScaleForId(i.yAxisID),
                    a = 0;
                  if (n.options.stacked) {
                    for (
                      var r = this.chart,
                        o = r.data.datasets,
                        s = Number(o[t].data[e]),
                        l = 0;
                      l < t;
                      l++
                    ) {
                      var d = o[l],
                        u = r.getDatasetMeta(l);
                      if (
                        u.bar &&
                        u.yAxisID === n.id &&
                        r.isDatasetVisible(l)
                      ) {
                        var h = Number(d.data[e]);
                        a += s < 0 ? Math.min(h, 0) : Math.max(h, 0);
                      }
                    }
                    return n.getPixelForValue(a);
                  }
                  return n.getBasePixel();
                },
                getRuler: function (t) {
                  var e,
                    i = this,
                    n = i.getMeta(),
                    a = i.getScaleForId(n.xAxisID),
                    r = i.getBarCount(),
                    o =
                      (e =
                        "category" === a.options.type
                          ? a.getPixelForTick(t + 1) - a.getPixelForTick(t)
                          : a.width / a.ticks.length) *
                      a.options.categoryPercentage,
                    s = (e - e * a.options.categoryPercentage) / 2,
                    l = o / r;
                  a.ticks.length !== i.chart.data.labels.length &&
                    (l *= a.ticks.length / i.chart.data.labels.length);
                  return {
                    datasetCount: r,
                    tickWidth: e,
                    categoryWidth: o,
                    categorySpacing: s,
                    fullBarWidth: l,
                    barWidth: l * a.options.barPercentage,
                    barSpacing: l - l * a.options.barPercentage,
                  };
                },
                calculateBarWidth: function (t) {
                  var e = this.getScaleForId(this.getMeta().xAxisID);
                  if (e.options.barThickness) return e.options.barThickness;
                  var i = this.getRuler(t);
                  return e.options.stacked ? i.categoryWidth : i.barWidth;
                },
                getBarIndex: function (t) {
                  var e,
                    i = 0;
                  for (e = 0; e < t; ++e)
                    this.chart.getDatasetMeta(e).bar &&
                      this.chart.isDatasetVisible(e) &&
                      ++i;
                  return i;
                },
                calculateBarX: function (t, e) {
                  var i = this,
                    n = i.getMeta(),
                    a = i.getScaleForId(n.xAxisID),
                    r = i.getBarIndex(e),
                    o = i.getRuler(t),
                    s = a.getPixelForValue(null, t, e, i.chart.isCombo);
                  return (
                    (s -= i.chart.isCombo ? o.tickWidth / 2 : 0),
                    a.options.stacked
                      ? s + o.categoryWidth / 2 + o.categorySpacing
                      : s +
                        o.barWidth / 2 +
                        o.categorySpacing +
                        o.barWidth * r +
                        o.barSpacing / 2 +
                        o.barSpacing * r
                  );
                },
                calculateBarY: function (t, e) {
                  var i = this,
                    n = i.getMeta(),
                    a = i.getScaleForId(n.yAxisID),
                    r = Number(i.getDataset().data[t]);
                  if (a.options.stacked) {
                    for (var o = 0, s = 0, l = 0; l < e; l++) {
                      var d = i.chart.data.datasets[l],
                        u = i.chart.getDatasetMeta(l);
                      if (
                        u.bar &&
                        u.yAxisID === a.id &&
                        i.chart.isDatasetVisible(l)
                      ) {
                        var h = Number(d.data[t]);
                        h < 0 ? (s += h || 0) : (o += h || 0);
                      }
                    }
                    return r < 0
                      ? a.getPixelForValue(s + r)
                      : a.getPixelForValue(o + r);
                  }
                  return a.getPixelForValue(r);
                },
                draw: function (t) {
                  var n = this,
                    a = t || 1;
                  h.each(
                    n.getMeta().data,
                    function (t, e) {
                      var i = n.getDataset().data[e];
                      null == i || isNaN(i) || t.transition(a).draw();
                    },
                    n
                  );
                },
                setHoverStyle: function (t) {
                  var e = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    n = t.custom || {},
                    a = t._model;
                  (a.backgroundColor = n.hoverBackgroundColor
                    ? n.hoverBackgroundColor
                    : h.getValueAtIndexOrDefault(
                        e.hoverBackgroundColor,
                        i,
                        h.getHoverColor(a.backgroundColor)
                      )),
                    (a.borderColor = n.hoverBorderColor
                      ? n.hoverBorderColor
                      : h.getValueAtIndexOrDefault(
                          e.hoverBorderColor,
                          i,
                          h.getHoverColor(a.borderColor)
                        )),
                    (a.borderWidth = n.hoverBorderWidth
                      ? n.hoverBorderWidth
                      : h.getValueAtIndexOrDefault(
                          e.hoverBorderWidth,
                          i,
                          a.borderWidth
                        ));
                },
                removeHoverStyle: function (t) {
                  var e = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    n = t.custom || {},
                    a = t._model,
                    r = this.chart.options.elements.rectangle;
                  (a.backgroundColor = n.backgroundColor
                    ? n.backgroundColor
                    : h.getValueAtIndexOrDefault(
                        e.backgroundColor,
                        i,
                        r.backgroundColor
                      )),
                    (a.borderColor = n.borderColor
                      ? n.borderColor
                      : h.getValueAtIndexOrDefault(
                          e.borderColor,
                          i,
                          r.borderColor
                        )),
                    (a.borderWidth = n.borderWidth
                      ? n.borderWidth
                      : h.getValueAtIndexOrDefault(
                          e.borderWidth,
                          i,
                          r.borderWidth
                        ));
                },
              })),
              (i.defaults.horizontalBar = {
                hover: { mode: "label" },
                scales: {
                  xAxes: [{ type: "linear", position: "bottom" }],
                  yAxes: [
                    {
                      position: "left",
                      type: "category",
                      categoryPercentage: 0.8,
                      barPercentage: 0.9,
                      gridLines: { offsetGridLines: !0 },
                    },
                  ],
                },
                elements: { rectangle: { borderSkipped: "left" } },
                tooltips: {
                  callbacks: {
                    title: function (t, e) {
                      var i = "";
                      return (
                        0 < t.length &&
                          (t[0].yLabel
                            ? (i = t[0].yLabel)
                            : 0 < e.labels.length &&
                              t[0].index < e.labels.length &&
                              (i = e.labels[t[0].index])),
                        i
                      );
                    },
                    label: function (t, e) {
                      return (
                        (e.datasets[t.datasetIndex].label || "") +
                        ": " +
                        t.xLabel
                      );
                    },
                  },
                },
              }),
              (i.controllers.horizontalBar = i.controllers.bar.extend({
                updateElement: function (t, e, i) {
                  var n = this,
                    a = n.getMeta(),
                    r = n.getScaleForId(a.xAxisID),
                    o = n.getScaleForId(a.yAxisID),
                    s = r.getBasePixel(),
                    l = t.custom || {},
                    d = n.getDataset(),
                    u = n.chart.options.elements.rectangle;
                  h.extend(t, {
                    _xScale: r,
                    _yScale: o,
                    _datasetIndex: n.index,
                    _index: e,
                    _model: {
                      x: i ? s : n.calculateBarX(e, n.index),
                      y: n.calculateBarY(e, n.index),
                      label: n.chart.data.labels[e],
                      datasetLabel: d.label,
                      base: i ? s : n.calculateBarBase(n.index, e),
                      height: n.calculateBarHeight(e),
                      backgroundColor: l.backgroundColor
                        ? l.backgroundColor
                        : h.getValueAtIndexOrDefault(
                            d.backgroundColor,
                            e,
                            u.backgroundColor
                          ),
                      borderSkipped: l.borderSkipped
                        ? l.borderSkipped
                        : u.borderSkipped,
                      borderColor: l.borderColor
                        ? l.borderColor
                        : h.getValueAtIndexOrDefault(
                            d.borderColor,
                            e,
                            u.borderColor
                          ),
                      borderWidth: l.borderWidth
                        ? l.borderWidth
                        : h.getValueAtIndexOrDefault(
                            d.borderWidth,
                            e,
                            u.borderWidth
                          ),
                    },
                    draw: function () {
                      var t = this._chart.ctx,
                        e = this._view,
                        i = e.height / 2,
                        n = e.y - i,
                        a = e.y + i,
                        r = e.base - (e.base - e.x),
                        o = e.borderWidth / 2;
                      e.borderWidth && ((n += o), (a -= o), (r += o)),
                        t.beginPath(),
                        (t.fillStyle = e.backgroundColor),
                        (t.strokeStyle = e.borderColor),
                        (t.lineWidth = e.borderWidth);
                      var s = [
                          [e.base, a],
                          [e.base, n],
                          [r, n],
                          [r, a],
                        ],
                        l = ["bottom", "left", "top", "right"].indexOf(
                          e.borderSkipped,
                          0
                        );
                      function d(t) {
                        return s[(l + t) % 4];
                      }
                      -1 === l && (l = 0), t.moveTo.apply(t, d(0));
                      for (var u = 1; u < 4; u++) t.lineTo.apply(t, d(u));
                      t.fill(), e.borderWidth && t.stroke();
                    },
                    inRange: function (t, e) {
                      var i = this._view,
                        n = !1;
                      return (
                        i &&
                          (n =
                            i.x < i.base
                              ? e >= i.y - i.height / 2 &&
                                e <= i.y + i.height / 2 &&
                                t >= i.x &&
                                t <= i.base
                              : e >= i.y - i.height / 2 &&
                                e <= i.y + i.height / 2 &&
                                t >= i.base &&
                                t <= i.x),
                        n
                      );
                    },
                  }),
                    t.pivot();
                },
                calculateBarBase: function (t, e) {
                  var i = this.getMeta(),
                    n = this.getScaleForId(i.xAxisID),
                    a = 0;
                  if (n.options.stacked) {
                    for (
                      var r = this.chart,
                        o = r.data.datasets,
                        s = Number(o[t].data[e]),
                        l = 0;
                      l < t;
                      l++
                    ) {
                      var d = o[l],
                        u = r.getDatasetMeta(l);
                      if (
                        u.bar &&
                        u.xAxisID === n.id &&
                        r.isDatasetVisible(l)
                      ) {
                        var h = Number(d.data[e]);
                        a += s < 0 ? Math.min(h, 0) : Math.max(h, 0);
                      }
                    }
                    return n.getPixelForValue(a);
                  }
                  return n.getBasePixel();
                },
                getRuler: function (t) {
                  var e,
                    i = this,
                    n = i.getMeta(),
                    a = i.getScaleForId(n.yAxisID),
                    r = i.getBarCount(),
                    o =
                      (e =
                        "category" === a.options.type
                          ? a.getPixelForTick(t + 1) - a.getPixelForTick(t)
                          : a.width / a.ticks.length) *
                      a.options.categoryPercentage,
                    s = (e - e * a.options.categoryPercentage) / 2,
                    l = o / r;
                  a.ticks.length !== i.chart.data.labels.length &&
                    (l *= a.ticks.length / i.chart.data.labels.length);
                  return {
                    datasetCount: r,
                    tickHeight: e,
                    categoryHeight: o,
                    categorySpacing: s,
                    fullBarHeight: l,
                    barHeight: l * a.options.barPercentage,
                    barSpacing: l - l * a.options.barPercentage,
                  };
                },
                calculateBarHeight: function (t) {
                  var e = this.getScaleForId(this.getMeta().yAxisID);
                  if (e.options.barThickness) return e.options.barThickness;
                  var i = this.getRuler(t);
                  return e.options.stacked ? i.categoryHeight : i.barHeight;
                },
                calculateBarX: function (t, e) {
                  var i = this,
                    n = i.getMeta(),
                    a = i.getScaleForId(n.xAxisID),
                    r = Number(i.getDataset().data[t]);
                  if (a.options.stacked) {
                    for (var o = 0, s = 0, l = 0; l < e; l++) {
                      var d = i.chart.data.datasets[l],
                        u = i.chart.getDatasetMeta(l);
                      if (
                        u.bar &&
                        u.xAxisID === a.id &&
                        i.chart.isDatasetVisible(l)
                      ) {
                        var h = Number(d.data[t]);
                        h < 0 ? (s += h || 0) : (o += h || 0);
                      }
                    }
                    return r < 0
                      ? a.getPixelForValue(s + r)
                      : a.getPixelForValue(o + r);
                  }
                  return a.getPixelForValue(r);
                },
                calculateBarY: function (t, e) {
                  var i = this,
                    n = i.getMeta(),
                    a = i.getScaleForId(n.yAxisID),
                    r = i.getBarIndex(e),
                    o = i.getRuler(t),
                    s = a.getPixelForValue(null, t, e, i.chart.isCombo);
                  return (
                    (s -= i.chart.isCombo ? o.tickHeight / 2 : 0),
                    a.options.stacked
                      ? s + o.categoryHeight / 2 + o.categorySpacing
                      : s +
                        o.barHeight / 2 +
                        o.categorySpacing +
                        o.barHeight * r +
                        o.barSpacing / 2 +
                        o.barSpacing * r
                  );
                },
              }));
          };
        },
        {},
      ],
      16: [
        function (t, e, i) {
          "use strict";
          e.exports = function (f) {
            var g = f.helpers;
            (f.defaults.bubble = {
              hover: { mode: "single" },
              scales: {
                xAxes: [{ type: "linear", position: "bottom", id: "x-axis-0" }],
                yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }],
              },
              tooltips: {
                callbacks: {
                  title: function () {
                    return "";
                  },
                  label: function (t, e) {
                    var i = e.datasets[t.datasetIndex].label || "",
                      n = e.datasets[t.datasetIndex].data[t.index];
                    return i + ": (" + n.x + ", " + n.y + ", " + n.r + ")";
                  },
                },
              },
            }),
              (f.controllers.bubble = f.DatasetController.extend({
                dataElementType: f.elements.Point,
                update: function (i) {
                  var n = this,
                    t = n.getMeta().data;
                  g.each(t, function (t, e) {
                    n.updateElement(t, e, i);
                  });
                },
                updateElement: function (t, e, i) {
                  var n = this,
                    a = n.getMeta(),
                    r = n.getScaleForId(a.xAxisID),
                    o = n.getScaleForId(a.yAxisID),
                    s = t.custom || {},
                    l = n.getDataset(),
                    d = l.data[e],
                    u = n.chart.options.elements.point,
                    h = n.index;
                  g.extend(t, {
                    _xScale: r,
                    _yScale: o,
                    _datasetIndex: h,
                    _index: e,
                    _model: {
                      x: i
                        ? r.getPixelForDecimal(0.5)
                        : r.getPixelForValue(
                            "object" == typeof d ? d : NaN,
                            e,
                            h,
                            n.chart.isCombo
                          ),
                      y: i ? o.getBasePixel() : o.getPixelForValue(d, e, h),
                      radius: i ? 0 : s.radius ? s.radius : n.getRadius(d),
                      hitRadius: s.hitRadius
                        ? s.hitRadius
                        : g.getValueAtIndexOrDefault(
                            l.hitRadius,
                            e,
                            u.hitRadius
                          ),
                    },
                  }),
                    f.DatasetController.prototype.removeHoverStyle.call(
                      n,
                      t,
                      u
                    );
                  var c = t._model;
                  (c.skip = s.skip ? s.skip : isNaN(c.x) || isNaN(c.y)),
                    t.pivot();
                },
                getRadius: function (t) {
                  return t.r || this.chart.options.elements.point.radius;
                },
                setHoverStyle: function (t) {
                  f.DatasetController.prototype.setHoverStyle.call(this, t);
                  var e = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    n = t.custom || {};
                  t._model.radius = n.hoverRadius
                    ? n.hoverRadius
                    : g.getValueAtIndexOrDefault(
                        e.hoverRadius,
                        i,
                        this.chart.options.elements.point.hoverRadius
                      ) + this.getRadius(e.data[i]);
                },
                removeHoverStyle: function (t) {
                  f.DatasetController.prototype.removeHoverStyle.call(
                    this,
                    t,
                    this.chart.options.elements.point
                  );
                  var e =
                      this.chart.data.datasets[t._datasetIndex].data[t._index],
                    i = t.custom || {};
                  t._model.radius = i.radius ? i.radius : this.getRadius(e);
                },
              }));
          };
        },
        {},
      ],
      17: [
        function (t, e, i) {
          "use strict";
          e.exports = function (e) {
            var F = e.helpers,
              t = e.defaults;
            (t.doughnut = {
              animation: { animateRotate: !0, animateScale: !1 },
              aspectRatio: 1,
              hover: { mode: "single" },
              legendCallback: function (t) {
                var e = [];
                e.push('<ul className="' + t.id + '-legend">');
                var i = t.data,
                  n = i.datasets,
                  a = i.labels;
                if (n.length)
                  for (var r = 0; r < n[0].data.length; ++r)
                    e.push(
                      '<li><span style="background-color:' +
                        n[0].backgroundColor[r] +
                        '"></span>'
                    ),
                      a[r] && e.push(a[r]),
                      e.push("</li>");
                return e.push("</ul>"), e.join("");
              },
              legend: {
                labels: {
                  generateLabels: function (l) {
                    var d = l.data;
                    return d.labels.length && d.datasets.length
                      ? d.labels.map(function (t, e) {
                          var i = l.getDatasetMeta(0),
                            n = d.datasets[0],
                            a = i.data[e],
                            r = (a && a.custom) || {},
                            o = F.getValueAtIndexOrDefault,
                            s = l.options.elements.arc;
                          return {
                            text: t,
                            fillStyle: r.backgroundColor
                              ? r.backgroundColor
                              : o(n.backgroundColor, e, s.backgroundColor),
                            strokeStyle: r.borderColor
                              ? r.borderColor
                              : o(n.borderColor, e, s.borderColor),
                            lineWidth: r.borderWidth
                              ? r.borderWidth
                              : o(n.borderWidth, e, s.borderWidth),
                            hidden: isNaN(n.data[e]) || i.data[e].hidden,
                            index: e,
                          };
                        })
                      : [];
                  },
                },
                onClick: function (t, e) {
                  var i,
                    n,
                    a,
                    r = e.index,
                    o = this.chart;
                  for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)
                    (a = o.getDatasetMeta(i)).data[r].hidden =
                      !a.data[r].hidden;
                  o.update();
                },
              },
              cutoutPercentage: 50,
              rotation: -0.5 * Math.PI,
              circumference: 2 * Math.PI,
              tooltips: {
                callbacks: {
                  title: function () {
                    return "";
                  },
                  label: function (t, e) {
                    return (
                      e.labels[t.index] +
                      ": " +
                      e.datasets[t.datasetIndex].data[t.index]
                    );
                  },
                },
              },
            }),
              (t.pie = F.clone(t.doughnut)),
              F.extend(t.pie, { cutoutPercentage: 0 }),
              (e.controllers.doughnut = e.controllers.pie =
                e.DatasetController.extend({
                  dataElementType: e.elements.Arc,
                  linkScales: F.noop,
                  getRingIndex: function (t) {
                    for (var e = 0, i = 0; i < t; ++i)
                      this.chart.isDatasetVisible(i) && ++e;
                    return e;
                  },
                  update: function (i) {
                    var n = this,
                      t = n.chart,
                      e = t.chartArea,
                      a = t.options,
                      r = a.elements.arc,
                      o = e.right - e.left - r.borderWidth,
                      s = e.bottom - e.top - r.borderWidth,
                      l = Math.min(o, s),
                      d = { x: 0, y: 0 },
                      u = n.getMeta(),
                      h = a.cutoutPercentage,
                      c = a.circumference;
                    if (c < 2 * Math.PI) {
                      var f = a.rotation % (2 * Math.PI),
                        g =
                          (f +=
                            2 *
                            Math.PI *
                            (f >= Math.PI ? -1 : f < -Math.PI ? 1 : 0)) + c,
                        p = Math.cos(f),
                        m = Math.sin(f),
                        v = Math.cos(g),
                        b = Math.sin(g),
                        y =
                          (f <= 0 && 0 <= g) ||
                          (f <= 2 * Math.PI && 2 * Math.PI <= g),
                        x =
                          (f <= 0.5 * Math.PI && 0.5 * Math.PI <= g) ||
                          (f <= 2.5 * Math.PI && 2.5 * Math.PI <= g),
                        k =
                          (f <= -Math.PI && -Math.PI <= g) ||
                          (f <= Math.PI && Math.PI <= g),
                        S =
                          (f <= 0.5 * -Math.PI && 0.5 * -Math.PI <= g) ||
                          (f <= 1.5 * Math.PI && 1.5 * Math.PI <= g),
                        w = h / 100,
                        _ = k
                          ? -1
                          : Math.min(p * (p < 0 ? 1 : w), v * (v < 0 ? 1 : w)),
                        M = S
                          ? -1
                          : Math.min(m * (m < 0 ? 1 : w), b * (b < 0 ? 1 : w)),
                        D = y
                          ? 1
                          : Math.max(p * (0 < p ? 1 : w), v * (0 < v ? 1 : w)),
                        C = x
                          ? 1
                          : Math.max(m * (0 < m ? 1 : w), b * (0 < b ? 1 : w)),
                        T = 0.5 * (D - _),
                        P = 0.5 * (C - M);
                      (l = Math.min(o / T, s / P)),
                        (d = { x: -0.5 * (D + _), y: -0.5 * (C + M) });
                    }
                    (t.borderWidth = n.getMaxBorderWidth(u.data)),
                      (t.outerRadius = Math.max((l - t.borderWidth) / 2, 0)),
                      (t.innerRadius = Math.max(
                        h ? (t.outerRadius / 100) * h : 1,
                        0
                      )),
                      (t.radiusLength =
                        (t.outerRadius - t.innerRadius) /
                        t.getVisibleDatasetCount()),
                      (t.offsetX = d.x * t.outerRadius),
                      (t.offsetY = d.y * t.outerRadius),
                      (u.total = n.calculateTotal()),
                      (n.outerRadius =
                        t.outerRadius -
                        t.radiusLength * n.getRingIndex(n.index)),
                      (n.innerRadius = n.outerRadius - t.radiusLength),
                      F.each(u.data, function (t, e) {
                        n.updateElement(t, e, i);
                      });
                  },
                  updateElement: function (t, e, i) {
                    var n = this,
                      a = n.chart,
                      r = a.chartArea,
                      o = a.options,
                      s = o.animation,
                      l = (r.left + r.right) / 2,
                      d = (r.top + r.bottom) / 2,
                      u = o.rotation,
                      h = o.rotation,
                      c = n.getDataset(),
                      f =
                        i && s.animateRotate
                          ? 0
                          : t.hidden
                          ? 0
                          : n.calculateCircumference(c.data[e]) *
                            (o.circumference / (2 * Math.PI)),
                      g = i && s.animateScale ? 0 : n.innerRadius,
                      p = i && s.animateScale ? 0 : n.outerRadius,
                      m = F.getValueAtIndexOrDefault;
                    F.extend(t, {
                      _datasetIndex: n.index,
                      _index: e,
                      _model: {
                        x: l + a.offsetX,
                        y: d + a.offsetY,
                        startAngle: u,
                        endAngle: h,
                        circumference: f,
                        outerRadius: p,
                        innerRadius: g,
                        label: m(c.label, e, a.data.labels[e]),
                      },
                    });
                    var v = t._model;
                    this.removeHoverStyle(t),
                      (i && s.animateRotate) ||
                        ((v.startAngle =
                          0 === e
                            ? o.rotation
                            : n.getMeta().data[e - 1]._model.endAngle),
                        (v.endAngle = v.startAngle + v.circumference)),
                      t.pivot();
                  },
                  removeHoverStyle: function (t) {
                    e.DatasetController.prototype.removeHoverStyle.call(
                      this,
                      t,
                      this.chart.options.elements.arc
                    );
                  },
                  calculateTotal: function () {
                    var i,
                      n = this.getDataset(),
                      t = this.getMeta(),
                      a = 0;
                    return (
                      F.each(t.data, function (t, e) {
                        (i = n.data[e]),
                          isNaN(i) || t.hidden || (a += Math.abs(i));
                      }),
                      a
                    );
                  },
                  calculateCircumference: function (t) {
                    var e = this.getMeta().total;
                    return 0 < e && !isNaN(t) ? 2 * Math.PI * (t / e) : 0;
                  },
                  getMaxBorderWidth: function (t) {
                    for (
                      var e, i, n = 0, a = this.index, r = t.length, o = 0;
                      o < r;
                      o++
                    )
                      n =
                        (n =
                          n < (e = t[o]._model ? t[o]._model.borderWidth : 0)
                            ? e
                            : n) <
                        (i = t[o]._chart
                          ? t[o]._chart.config.data.datasets[a].hoverBorderWidth
                          : 0)
                          ? i
                          : n;
                    return n;
                  },
                }));
          };
        },
        {},
      ],
      18: [
        function (t, e, i) {
          "use strict";
          e.exports = function (a) {
            var g = a.helpers;
            function f(t, e) {
              return g.getValueOrDefault(t.showLine, e.showLines);
            }
            (a.defaults.line = {
              showLines: !0,
              spanGaps: !1,
              hover: { mode: "label" },
              scales: {
                xAxes: [{ type: "category", id: "x-axis-0" }],
                yAxes: [{ type: "linear", id: "y-axis-0" }],
              },
            }),
              (a.controllers.line = a.DatasetController.extend({
                datasetElementType: a.elements.Line,
                dataElementType: a.elements.Point,
                addElementAndReset: function (t) {
                  var e = this,
                    i = e.chart.options,
                    n = e.getMeta();
                  a.DatasetController.prototype.addElementAndReset.call(e, t),
                    f(e.getDataset(), i) &&
                      0 !== n.dataset._model.tension &&
                      e.updateBezierControlPoints();
                },
                update: function (t) {
                  var e,
                    i,
                    n,
                    a = this,
                    r = a.getMeta(),
                    o = r.dataset,
                    s = r.data || [],
                    l = a.chart.options,
                    d = l.elements.line,
                    u = a.getScaleForId(r.yAxisID),
                    h = a.getDataset(),
                    c = f(h, l);
                  for (
                    c &&
                      ((n = o.custom || {}),
                      void 0 !== h.tension &&
                        void 0 === h.lineTension &&
                        (h.lineTension = h.tension),
                      (o._scale = u),
                      (o._datasetIndex = a.index),
                      (o._children = s),
                      (o._model = {
                        spanGaps: h.spanGaps ? h.spanGaps : l.spanGaps,
                        tension: n.tension
                          ? n.tension
                          : g.getValueOrDefault(h.lineTension, d.tension),
                        backgroundColor: n.backgroundColor
                          ? n.backgroundColor
                          : h.backgroundColor || d.backgroundColor,
                        borderWidth: n.borderWidth
                          ? n.borderWidth
                          : h.borderWidth || d.borderWidth,
                        borderColor: n.borderColor
                          ? n.borderColor
                          : h.borderColor || d.borderColor,
                        borderCapStyle: n.borderCapStyle
                          ? n.borderCapStyle
                          : h.borderCapStyle || d.borderCapStyle,
                        borderDash: n.borderDash
                          ? n.borderDash
                          : h.borderDash || d.borderDash,
                        borderDashOffset: n.borderDashOffset
                          ? n.borderDashOffset
                          : h.borderDashOffset || d.borderDashOffset,
                        borderJoinStyle: n.borderJoinStyle
                          ? n.borderJoinStyle
                          : h.borderJoinStyle || d.borderJoinStyle,
                        fill: n.fill
                          ? n.fill
                          : void 0 !== h.fill
                          ? h.fill
                          : d.fill,
                        steppedLine: n.steppedLine
                          ? n.steppedLine
                          : g.getValueOrDefault(h.steppedLine, d.stepped),
                        scaleTop: u.top,
                        scaleBottom: u.bottom,
                        scaleZero: u.getBasePixel(),
                      }),
                      o.pivot()),
                      e = 0,
                      i = s.length;
                    e < i;
                    ++e
                  )
                    a.updateElement(s[e], e, t);
                  for (
                    c &&
                      0 !== o._model.tension &&
                      a.updateBezierControlPoints(),
                      e = 0,
                      i = s.length;
                    e < i;
                    ++e
                  )
                    s[e].pivot();
                },
                getPointBackgroundColor: function (t, e) {
                  var i = this.chart.options.elements.point.backgroundColor,
                    n = this.getDataset(),
                    a = t.custom || {};
                  return (
                    a.backgroundColor
                      ? (i = a.backgroundColor)
                      : n.pointBackgroundColor
                      ? (i = g.getValueAtIndexOrDefault(
                          n.pointBackgroundColor,
                          e,
                          i
                        ))
                      : n.backgroundColor && (i = n.backgroundColor),
                    i
                  );
                },
                getPointBorderColor: function (t, e) {
                  var i = this.chart.options.elements.point.borderColor,
                    n = this.getDataset(),
                    a = t.custom || {};
                  return (
                    a.borderColor
                      ? (i = a.borderColor)
                      : n.pointBorderColor
                      ? (i = g.getValueAtIndexOrDefault(
                          n.pointBorderColor,
                          e,
                          i
                        ))
                      : n.borderColor && (i = n.borderColor),
                    i
                  );
                },
                getPointBorderWidth: function (t, e) {
                  var i = this.chart.options.elements.point.borderWidth,
                    n = this.getDataset(),
                    a = t.custom || {};
                  return (
                    a.borderWidth
                      ? (i = a.borderWidth)
                      : n.pointBorderWidth
                      ? (i = g.getValueAtIndexOrDefault(
                          n.pointBorderWidth,
                          e,
                          i
                        ))
                      : n.borderWidth && (i = n.borderWidth),
                    i
                  );
                },
                updateElement: function (t, e, i) {
                  var n,
                    a,
                    r = this,
                    o = r.getMeta(),
                    s = t.custom || {},
                    l = r.getDataset(),
                    d = r.index,
                    u = l.data[e],
                    h = r.getScaleForId(o.yAxisID),
                    c = r.getScaleForId(o.xAxisID),
                    f = r.chart.options.elements.point;
                  void 0 !== l.radius &&
                    void 0 === l.pointRadius &&
                    (l.pointRadius = l.radius),
                    void 0 !== l.hitRadius &&
                      void 0 === l.pointHitRadius &&
                      (l.pointHitRadius = l.hitRadius),
                    (n = c.getPixelForValue(
                      "object" == typeof u ? u : NaN,
                      e,
                      d,
                      r.chart.isCombo
                    )),
                    (a = i ? h.getBasePixel() : r.calculatePointY(u, e, d)),
                    (t._xScale = c),
                    (t._yScale = h),
                    (t._datasetIndex = d),
                    (t._index = e),
                    (t._model = {
                      x: n,
                      y: a,
                      skip: s.skip || isNaN(n) || isNaN(a),
                      radius:
                        s.radius ||
                        g.getValueAtIndexOrDefault(l.pointRadius, e, f.radius),
                      pointStyle:
                        s.pointStyle ||
                        g.getValueAtIndexOrDefault(
                          l.pointStyle,
                          e,
                          f.pointStyle
                        ),
                      backgroundColor: r.getPointBackgroundColor(t, e),
                      borderColor: r.getPointBorderColor(t, e),
                      borderWidth: r.getPointBorderWidth(t, e),
                      tension: o.dataset._model ? o.dataset._model.tension : 0,
                      steppedLine:
                        !!o.dataset._model && o.dataset._model.steppedLine,
                      hitRadius:
                        s.hitRadius ||
                        g.getValueAtIndexOrDefault(
                          l.pointHitRadius,
                          e,
                          f.hitRadius
                        ),
                    });
                },
                calculatePointY: function (t, e, i) {
                  var n,
                    a,
                    r,
                    o = this.chart,
                    s = this.getMeta(),
                    l = this.getScaleForId(s.yAxisID),
                    d = 0,
                    u = 0;
                  if (l.options.stacked) {
                    for (n = 0; n < i; n++)
                      if (
                        ((a = o.data.datasets[n]),
                        "line" === (r = o.getDatasetMeta(n)).type &&
                          r.yAxisID === l.id &&
                          o.isDatasetVisible(n))
                      ) {
                        var h = Number(l.getRightValue(a.data[e]));
                        h < 0 ? (u += h || 0) : (d += h || 0);
                      }
                    var c = Number(l.getRightValue(t));
                    return c < 0
                      ? l.getPixelForValue(u + c)
                      : l.getPixelForValue(d + c);
                  }
                  return l.getPixelForValue(t);
                },
                updateBezierControlPoints: function () {
                  var t,
                    e,
                    i,
                    n,
                    a = this.getMeta(),
                    r = this.chart.chartArea,
                    o = (a.data || []).filter(function (t) {
                      return !t._model.skip;
                    }),
                    s = this.chart.options.elements.line.capBezierPoints;
                  function l(t, e, i) {
                    return s ? Math.max(Math.min(t, i), e) : t;
                  }
                  for (t = 0, e = o.length; t < e; ++t)
                    (i = o[t]._model),
                      (n = g.splineCurve(
                        g.previousItem(o, t)._model,
                        i,
                        g.nextItem(o, t)._model,
                        a.dataset._model.tension
                      )),
                      (i.controlPointPreviousX = l(
                        n.previous.x,
                        r.left,
                        r.right
                      )),
                      (i.controlPointPreviousY = l(
                        n.previous.y,
                        r.top,
                        r.bottom
                      )),
                      (i.controlPointNextX = l(n.next.x, r.left, r.right)),
                      (i.controlPointNextY = l(n.next.y, r.top, r.bottom));
                },
                draw: function (t) {
                  var e,
                    i,
                    n = this.getMeta(),
                    a = n.data || [],
                    r = t || 1;
                  for (e = 0, i = a.length; e < i; ++e) a[e].transition(r);
                  for (
                    f(this.getDataset(), this.chart.options) &&
                      n.dataset.transition(r).draw(),
                      e = 0,
                      i = a.length;
                    e < i;
                    ++e
                  )
                    a[e].draw();
                },
                setHoverStyle: function (t) {
                  var e = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    n = t.custom || {},
                    a = t._model;
                  (a.radius =
                    n.hoverRadius ||
                    g.getValueAtIndexOrDefault(
                      e.pointHoverRadius,
                      i,
                      this.chart.options.elements.point.hoverRadius
                    )),
                    (a.backgroundColor =
                      n.hoverBackgroundColor ||
                      g.getValueAtIndexOrDefault(
                        e.pointHoverBackgroundColor,
                        i,
                        g.getHoverColor(a.backgroundColor)
                      )),
                    (a.borderColor =
                      n.hoverBorderColor ||
                      g.getValueAtIndexOrDefault(
                        e.pointHoverBorderColor,
                        i,
                        g.getHoverColor(a.borderColor)
                      )),
                    (a.borderWidth =
                      n.hoverBorderWidth ||
                      g.getValueAtIndexOrDefault(
                        e.pointHoverBorderWidth,
                        i,
                        a.borderWidth
                      ));
                },
                removeHoverStyle: function (t) {
                  var e = this,
                    i = e.chart.data.datasets[t._datasetIndex],
                    n = t._index,
                    a = t.custom || {},
                    r = t._model;
                  void 0 !== i.radius &&
                    void 0 === i.pointRadius &&
                    (i.pointRadius = i.radius),
                    (r.radius =
                      a.radius ||
                      g.getValueAtIndexOrDefault(
                        i.pointRadius,
                        n,
                        e.chart.options.elements.point.radius
                      )),
                    (r.backgroundColor = e.getPointBackgroundColor(t, n)),
                    (r.borderColor = e.getPointBorderColor(t, n)),
                    (r.borderWidth = e.getPointBorderWidth(t, n));
                },
              }));
          };
        },
        {},
      ],
      19: [
        function (t, e, i) {
          "use strict";
          e.exports = function (e) {
            var S = e.helpers;
            (e.defaults.polarArea = {
              scale: {
                type: "radialLinear",
                lineArc: !0,
                ticks: { beginAtZero: !0 },
              },
              animation: { animateRotate: !0, animateScale: !0 },
              startAngle: -0.5 * Math.PI,
              aspectRatio: 1,
              legendCallback: function (t) {
                var e = [];
                e.push('<ul className="' + t.id + '-legend">');
                var i = t.data,
                  n = i.datasets,
                  a = i.labels;
                if (n.length)
                  for (var r = 0; r < n[0].data.length; ++r)
                    e.push(
                      '<li><span style="background-color:' +
                        n[0].backgroundColor[r] +
                        '">'
                    ),
                      a[r] && e.push(a[r]),
                      e.push("</span></li>");
                return e.push("</ul>"), e.join("");
              },
              legend: {
                labels: {
                  generateLabels: function (s) {
                    var l = s.data;
                    return l.labels.length && l.datasets.length
                      ? l.labels.map(function (t, e) {
                          var i = s.getDatasetMeta(0),
                            n = l.datasets[0],
                            a = i.data[e].custom || {},
                            r = S.getValueAtIndexOrDefault,
                            o = s.options.elements.arc;
                          return {
                            text: t,
                            fillStyle: a.backgroundColor
                              ? a.backgroundColor
                              : r(n.backgroundColor, e, o.backgroundColor),
                            strokeStyle: a.borderColor
                              ? a.borderColor
                              : r(n.borderColor, e, o.borderColor),
                            lineWidth: a.borderWidth
                              ? a.borderWidth
                              : r(n.borderWidth, e, o.borderWidth),
                            hidden: isNaN(n.data[e]) || i.data[e].hidden,
                            index: e,
                          };
                        })
                      : [];
                  },
                },
                onClick: function (t, e) {
                  var i,
                    n,
                    a,
                    r = e.index,
                    o = this.chart;
                  for (i = 0, n = (o.data.datasets || []).length; i < n; ++i)
                    (a = o.getDatasetMeta(i)).data[r].hidden =
                      !a.data[r].hidden;
                  o.update();
                },
              },
              tooltips: {
                callbacks: {
                  title: function () {
                    return "";
                  },
                  label: function (t, e) {
                    return e.labels[t.index] + ": " + t.yLabel;
                  },
                },
              },
            }),
              (e.controllers.polarArea = e.DatasetController.extend({
                dataElementType: e.elements.Arc,
                linkScales: S.noop,
                update: function (i) {
                  var n = this,
                    t = n.chart,
                    e = t.chartArea,
                    a = n.getMeta(),
                    r = t.options,
                    o = r.elements.arc,
                    s = Math.min(e.right - e.left, e.bottom - e.top);
                  (t.outerRadius = Math.max((s - o.borderWidth / 2) / 2, 0)),
                    (t.innerRadius = Math.max(
                      r.cutoutPercentage
                        ? (t.outerRadius / 100) * r.cutoutPercentage
                        : 1,
                      0
                    )),
                    (t.radiusLength =
                      (t.outerRadius - t.innerRadius) /
                      t.getVisibleDatasetCount()),
                    (n.outerRadius = t.outerRadius - t.radiusLength * n.index),
                    (n.innerRadius = n.outerRadius - t.radiusLength),
                    (a.count = n.countVisibleElements()),
                    S.each(a.data, function (t, e) {
                      n.updateElement(t, e, i);
                    });
                },
                updateElement: function (t, e, i) {
                  for (
                    var n = this,
                      a = n.chart,
                      r = n.getDataset(),
                      o = a.options,
                      s = o.animation,
                      l = a.scale,
                      d = S.getValueAtIndexOrDefault,
                      u = a.data.labels,
                      h = n.calculateCircumference(r.data[e]),
                      c = l.xCenter,
                      f = l.yCenter,
                      g = 0,
                      p = n.getMeta(),
                      m = 0;
                    m < e;
                    ++m
                  )
                    isNaN(r.data[m]) || p.data[m].hidden || ++g;
                  var v = o.startAngle,
                    b = t.hidden
                      ? 0
                      : l.getDistanceFromCenterForValue(r.data[e]),
                    y = v + h * g,
                    x = y + (t.hidden ? 0 : h),
                    k = s.animateScale
                      ? 0
                      : l.getDistanceFromCenterForValue(r.data[e]);
                  S.extend(t, {
                    _datasetIndex: n.index,
                    _index: e,
                    _scale: l,
                    _model: {
                      x: c,
                      y: f,
                      innerRadius: 0,
                      outerRadius: i ? k : b,
                      startAngle: i && s.animateRotate ? v : y,
                      endAngle: i && s.animateRotate ? v : x,
                      label: d(u, e, u[e]),
                    },
                  }),
                    n.removeHoverStyle(t),
                    t.pivot();
                },
                removeHoverStyle: function (t) {
                  e.DatasetController.prototype.removeHoverStyle.call(
                    this,
                    t,
                    this.chart.options.elements.arc
                  );
                },
                countVisibleElements: function () {
                  var i = this.getDataset(),
                    t = this.getMeta(),
                    n = 0;
                  return (
                    S.each(t.data, function (t, e) {
                      isNaN(i.data[e]) || t.hidden || n++;
                    }),
                    n
                  );
                },
                calculateCircumference: function (t) {
                  var e = this.getMeta().count;
                  return 0 < e && !isNaN(t) ? (2 * Math.PI) / e : 0;
                },
              }));
          };
        },
        {},
      ],
      20: [
        function (t, e, i) {
          "use strict";
          e.exports = function (e) {
            var d = e.helpers;
            (e.defaults.radar = {
              scale: { type: "radialLinear" },
              elements: { line: { tension: 0 } },
            }),
              (e.controllers.radar = e.DatasetController.extend({
                datasetElementType: e.elements.Line,
                dataElementType: e.elements.Point,
                linkScales: d.noop,
                addElementAndReset: function (t) {
                  e.DatasetController.prototype.addElementAndReset.call(
                    this,
                    t
                  ),
                    this.updateBezierControlPoints();
                },
                update: function (i) {
                  var n = this,
                    t = n.getMeta(),
                    e = t.dataset,
                    a = t.data,
                    r = e.custom || {},
                    o = n.getDataset(),
                    s = n.chart.options.elements.line,
                    l = n.chart.scale;
                  void 0 !== o.tension &&
                    void 0 === o.lineTension &&
                    (o.lineTension = o.tension),
                    d.extend(t.dataset, {
                      _datasetIndex: n.index,
                      _children: a,
                      _loop: !0,
                      _model: {
                        tension: r.tension
                          ? r.tension
                          : d.getValueOrDefault(o.lineTension, s.tension),
                        backgroundColor: r.backgroundColor
                          ? r.backgroundColor
                          : o.backgroundColor || s.backgroundColor,
                        borderWidth: r.borderWidth
                          ? r.borderWidth
                          : o.borderWidth || s.borderWidth,
                        borderColor: r.borderColor
                          ? r.borderColor
                          : o.borderColor || s.borderColor,
                        fill: r.fill
                          ? r.fill
                          : void 0 !== o.fill
                          ? o.fill
                          : s.fill,
                        borderCapStyle: r.borderCapStyle
                          ? r.borderCapStyle
                          : o.borderCapStyle || s.borderCapStyle,
                        borderDash: r.borderDash
                          ? r.borderDash
                          : o.borderDash || s.borderDash,
                        borderDashOffset: r.borderDashOffset
                          ? r.borderDashOffset
                          : o.borderDashOffset || s.borderDashOffset,
                        borderJoinStyle: r.borderJoinStyle
                          ? r.borderJoinStyle
                          : o.borderJoinStyle || s.borderJoinStyle,
                        scaleTop: l.top,
                        scaleBottom: l.bottom,
                        scaleZero: l.getBasePosition(),
                      },
                    }),
                    t.dataset.pivot(),
                    d.each(
                      a,
                      function (t, e) {
                        n.updateElement(t, e, i);
                      },
                      n
                    ),
                    n.updateBezierControlPoints();
                },
                updateElement: function (t, e, i) {
                  var n = this,
                    a = t.custom || {},
                    r = n.getDataset(),
                    o = n.chart.scale,
                    s = n.chart.options.elements.point,
                    l = o.getPointPositionForValue(e, r.data[e]);
                  d.extend(t, {
                    _datasetIndex: n.index,
                    _index: e,
                    _scale: o,
                    _model: {
                      x: i ? o.xCenter : l.x,
                      y: i ? o.yCenter : l.y,
                      tension: a.tension
                        ? a.tension
                        : d.getValueOrDefault(
                            r.tension,
                            n.chart.options.elements.line.tension
                          ),
                      radius: a.radius
                        ? a.radius
                        : d.getValueAtIndexOrDefault(
                            r.pointRadius,
                            e,
                            s.radius
                          ),
                      backgroundColor: a.backgroundColor
                        ? a.backgroundColor
                        : d.getValueAtIndexOrDefault(
                            r.pointBackgroundColor,
                            e,
                            s.backgroundColor
                          ),
                      borderColor: a.borderColor
                        ? a.borderColor
                        : d.getValueAtIndexOrDefault(
                            r.pointBorderColor,
                            e,
                            s.borderColor
                          ),
                      borderWidth: a.borderWidth
                        ? a.borderWidth
                        : d.getValueAtIndexOrDefault(
                            r.pointBorderWidth,
                            e,
                            s.borderWidth
                          ),
                      pointStyle: a.pointStyle
                        ? a.pointStyle
                        : d.getValueAtIndexOrDefault(
                            r.pointStyle,
                            e,
                            s.pointStyle
                          ),
                      hitRadius: a.hitRadius
                        ? a.hitRadius
                        : d.getValueAtIndexOrDefault(
                            r.hitRadius,
                            e,
                            s.hitRadius
                          ),
                    },
                  }),
                    (t._model.skip = a.skip
                      ? a.skip
                      : isNaN(t._model.x) || isNaN(t._model.y));
                },
                updateBezierControlPoints: function () {
                  var a = this.chart.chartArea,
                    r = this.getMeta();
                  d.each(r.data, function (t, e) {
                    var i = t._model,
                      n = d.splineCurve(
                        d.previousItem(r.data, e, !0)._model,
                        i,
                        d.nextItem(r.data, e, !0)._model,
                        i.tension
                      );
                    (i.controlPointPreviousX = Math.max(
                      Math.min(n.previous.x, a.right),
                      a.left
                    )),
                      (i.controlPointPreviousY = Math.max(
                        Math.min(n.previous.y, a.bottom),
                        a.top
                      )),
                      (i.controlPointNextX = Math.max(
                        Math.min(n.next.x, a.right),
                        a.left
                      )),
                      (i.controlPointNextY = Math.max(
                        Math.min(n.next.y, a.bottom),
                        a.top
                      )),
                      t.pivot();
                  });
                },
                draw: function (t) {
                  var e = this.getMeta(),
                    i = t || 1;
                  d.each(e.data, function (t) {
                    t.transition(i);
                  }),
                    e.dataset.transition(i).draw(),
                    d.each(e.data, function (t) {
                      t.draw();
                    });
                },
                setHoverStyle: function (t) {
                  var e = this.chart.data.datasets[t._datasetIndex],
                    i = t.custom || {},
                    n = t._index,
                    a = t._model;
                  (a.radius = i.hoverRadius
                    ? i.hoverRadius
                    : d.getValueAtIndexOrDefault(
                        e.pointHoverRadius,
                        n,
                        this.chart.options.elements.point.hoverRadius
                      )),
                    (a.backgroundColor = i.hoverBackgroundColor
                      ? i.hoverBackgroundColor
                      : d.getValueAtIndexOrDefault(
                          e.pointHoverBackgroundColor,
                          n,
                          d.getHoverColor(a.backgroundColor)
                        )),
                    (a.borderColor = i.hoverBorderColor
                      ? i.hoverBorderColor
                      : d.getValueAtIndexOrDefault(
                          e.pointHoverBorderColor,
                          n,
                          d.getHoverColor(a.borderColor)
                        )),
                    (a.borderWidth = i.hoverBorderWidth
                      ? i.hoverBorderWidth
                      : d.getValueAtIndexOrDefault(
                          e.pointHoverBorderWidth,
                          n,
                          a.borderWidth
                        ));
                },
                removeHoverStyle: function (t) {
                  var e = this.chart.data.datasets[t._datasetIndex],
                    i = t.custom || {},
                    n = t._index,
                    a = t._model,
                    r = this.chart.options.elements.point;
                  (a.radius = i.radius
                    ? i.radius
                    : d.getValueAtIndexOrDefault(e.radius, n, r.radius)),
                    (a.backgroundColor = i.backgroundColor
                      ? i.backgroundColor
                      : d.getValueAtIndexOrDefault(
                          e.pointBackgroundColor,
                          n,
                          r.backgroundColor
                        )),
                    (a.borderColor = i.borderColor
                      ? i.borderColor
                      : d.getValueAtIndexOrDefault(
                          e.pointBorderColor,
                          n,
                          r.borderColor
                        )),
                    (a.borderWidth = i.borderWidth
                      ? i.borderWidth
                      : d.getValueAtIndexOrDefault(
                          e.pointBorderWidth,
                          n,
                          r.borderWidth
                        ));
                },
              }));
          };
        },
        {},
      ],
      21: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var i = t.helpers;
            (t.defaults.global.animation = {
              duration: 1e3,
              easing: "easeOutQuart",
              onProgress: i.noop,
              onComplete: i.noop,
            }),
              (t.Animation = t.Element.extend({
                currentStep: null,
                numSteps: 60,
                easing: "",
                render: null,
                onAnimationProgress: null,
                onAnimationComplete: null,
              })),
              (t.animationService = {
                frameDuration: 17,
                animations: [],
                dropFrames: 0,
                request: null,
                addAnimation: function (t, e, i, n) {
                  var a = this;
                  n || (t.animating = !0);
                  for (var r = 0; r < a.animations.length; ++r)
                    if (a.animations[r].chartInstance === t)
                      return void (a.animations[r].animationObject = e);
                  a.animations.push({ chartInstance: t, animationObject: e }),
                    1 === a.animations.length && a.requestAnimationFrame();
                },
                cancelAnimation: function (e) {
                  var t = i.findIndex(this.animations, function (t) {
                    return t.chartInstance === e;
                  });
                  -1 !== t &&
                    (this.animations.splice(t, 1), (e.animating = !1));
                },
                requestAnimationFrame: function () {
                  var t = this;
                  null === t.request &&
                    (t.request = i.requestAnimFrame.call(window, function () {
                      (t.request = null), t.startDigest();
                    }));
                },
                startDigest: function () {
                  var t = this,
                    e = Date.now(),
                    i = 0;
                  1 < t.dropFrames &&
                    ((i = Math.floor(t.dropFrames)),
                    (t.dropFrames = t.dropFrames % 1));
                  for (var n = 0; n < t.animations.length; )
                    null === t.animations[n].animationObject.currentStep &&
                      (t.animations[n].animationObject.currentStep = 0),
                      (t.animations[n].animationObject.currentStep += 1 + i),
                      t.animations[n].animationObject.currentStep >
                        t.animations[n].animationObject.numSteps &&
                        (t.animations[n].animationObject.currentStep =
                          t.animations[n].animationObject.numSteps),
                      t.animations[n].animationObject.render(
                        t.animations[n].chartInstance,
                        t.animations[n].animationObject
                      ),
                      t.animations[n].animationObject.onAnimationProgress &&
                        t.animations[n].animationObject.onAnimationProgress
                          .call &&
                        t.animations[
                          n
                        ].animationObject.onAnimationProgress.call(
                          t.animations[n].chartInstance,
                          t.animations[n]
                        ),
                      t.animations[n].animationObject.currentStep ===
                      t.animations[n].animationObject.numSteps
                        ? (t.animations[n].animationObject
                            .onAnimationComplete &&
                            t.animations[n].animationObject.onAnimationComplete
                              .call &&
                            t.animations[
                              n
                            ].animationObject.onAnimationComplete.call(
                              t.animations[n].chartInstance,
                              t.animations[n]
                            ),
                          (t.animations[n].chartInstance.animating = !1),
                          t.animations.splice(n, 1))
                        : ++n;
                  var a = (Date.now() - e) / t.frameDuration;
                  (t.dropFrames += a),
                    0 < t.animations.length && t.requestAnimationFrame();
                },
              });
          };
        },
        {},
      ],
      22: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            (t.canvasHelpers = {}).drawPoint = function (t, e, i, n, a) {
              var r, o, s, l, d, u;
              if (
                "object" != typeof e ||
                ("[object HTMLImageElement]" !== (r = e.toString()) &&
                  "[object HTMLCanvasElement]" !== r)
              ) {
                if (!(isNaN(i) || i <= 0)) {
                  switch (e) {
                    default:
                      t.beginPath(),
                        t.arc(n, a, i, 0, 2 * Math.PI),
                        t.closePath(),
                        t.fill();
                      break;
                    case "triangle":
                      t.beginPath(),
                        (d = ((o = (3 * i) / Math.sqrt(3)) * Math.sqrt(3)) / 2),
                        t.moveTo(n - o / 2, a + d / 3),
                        t.lineTo(n + o / 2, a + d / 3),
                        t.lineTo(n, a - (2 * d) / 3),
                        t.closePath(),
                        t.fill();
                      break;
                    case "rect":
                      (u = (1 / Math.SQRT2) * i),
                        t.beginPath(),
                        t.fillRect(n - u, a - u, 2 * u, 2 * u),
                        t.strokeRect(n - u, a - u, 2 * u, 2 * u);
                      break;
                    case "rectRot":
                      (u = (1 / Math.SQRT2) * i),
                        t.beginPath(),
                        t.moveTo(n - u, a),
                        t.lineTo(n, a + u),
                        t.lineTo(n + u, a),
                        t.lineTo(n, a - u),
                        t.closePath(),
                        t.fill();
                      break;
                    case "cross":
                      t.beginPath(),
                        t.moveTo(n, a + i),
                        t.lineTo(n, a - i),
                        t.moveTo(n - i, a),
                        t.lineTo(n + i, a),
                        t.closePath();
                      break;
                    case "crossRot":
                      t.beginPath(),
                        (s = Math.cos(Math.PI / 4) * i),
                        (l = Math.sin(Math.PI / 4) * i),
                        t.moveTo(n - s, a - l),
                        t.lineTo(n + s, a + l),
                        t.moveTo(n - s, a + l),
                        t.lineTo(n + s, a - l),
                        t.closePath();
                      break;
                    case "star":
                      t.beginPath(),
                        t.moveTo(n, a + i),
                        t.lineTo(n, a - i),
                        t.moveTo(n - i, a),
                        t.lineTo(n + i, a),
                        (s = Math.cos(Math.PI / 4) * i),
                        (l = Math.sin(Math.PI / 4) * i),
                        t.moveTo(n - s, a - l),
                        t.lineTo(n + s, a + l),
                        t.moveTo(n - s, a + l),
                        t.lineTo(n + s, a - l),
                        t.closePath();
                      break;
                    case "line":
                      t.beginPath(),
                        t.moveTo(n - i, a),
                        t.lineTo(n + i, a),
                        t.closePath();
                      break;
                    case "dash":
                      t.beginPath(),
                        t.moveTo(n, a),
                        t.lineTo(n + i, a),
                        t.closePath();
                  }
                  t.stroke();
                }
              } else t.drawImage(e, n - e.width / 2, a - e.height / 2);
            };
          };
        },
        {},
      ],
      23: [
        function (t, e, i) {
          "use strict";
          e.exports = function (l) {
            var d = l.helpers;
            (l.types = {}),
              (l.instances = {}),
              (l.controllers = {}),
              (l.Controller = function (t) {
                return (
                  (this.chart = t),
                  (this.config = t.config),
                  (this.options = this.config.options =
                    d.configMerge(
                      l.defaults.global,
                      l.defaults[this.config.type],
                      this.config.options || {}
                    )),
                  (this.id = d.uid()),
                  Object.defineProperty(this, "data", {
                    get: function () {
                      return this.config.data;
                    },
                  }),
                  (l.instances[this.id] = this).options.responsive &&
                    this.resize(!0),
                  this.initialize(),
                  this
                );
              }),
              d.extend(l.Controller.prototype, {
                initialize: function () {
                  var t = this;
                  return (
                    l.plugins.notify("beforeInit", [t]),
                    t.bindEvents(),
                    t.ensureScalesHaveIDs(),
                    t.buildOrUpdateControllers(),
                    t.buildScales(),
                    t.updateLayout(),
                    t.resetElements(),
                    t.initToolTip(),
                    t.update(),
                    l.plugins.notify("afterInit", [t]),
                    t
                  );
                },
                clear: function () {
                  return d.clear(this.chart), this;
                },
                stop: function () {
                  return l.animationService.cancelAnimation(this), this;
                },
                resize: function (t) {
                  var e = this,
                    i = e.chart,
                    n = i.canvas,
                    a = d.getMaximumWidth(n),
                    r = i.aspectRatio,
                    o =
                      e.options.maintainAspectRatio &&
                      !1 === isNaN(r) &&
                      isFinite(r) &&
                      0 !== r
                        ? a / r
                        : d.getMaximumHeight(n);
                  if (!(i.width !== a || i.height !== o)) return e;
                  (n.width = i.width = a),
                    (n.height = i.height = o),
                    d.retinaScale(i);
                  var s = { width: a, height: o };
                  return (
                    l.plugins.notify("resize", [e, s]),
                    e.options.onResize && e.options.onResize(e, s),
                    t ||
                      (e.stop(),
                      e.update(e.options.responsiveAnimationDuration)),
                    e
                  );
                },
                ensureScalesHaveIDs: function () {
                  var t = this.options,
                    e = t.scales || {},
                    i = t.scale;
                  d.each(e.xAxes, function (t, e) {
                    t.id = t.id || "x-axis-" + e;
                  }),
                    d.each(e.yAxes, function (t, e) {
                      t.id = t.id || "y-axis-" + e;
                    }),
                    i && (i.id = i.id || "scale");
                },
                buildScales: function () {
                  var r = this,
                    t = r.options,
                    o = (r.scales = {}),
                    e = [];
                  t.scales &&
                    (e = e.concat(
                      (t.scales.xAxes || []).map(function (t) {
                        return { options: t, dtype: "category" };
                      }),
                      (t.scales.yAxes || []).map(function (t) {
                        return { options: t, dtype: "linear" };
                      })
                    )),
                    t.scale &&
                      e.push({
                        options: t.scale,
                        dtype: "radialLinear",
                        isDefault: !0,
                      }),
                    d.each(e, function (t) {
                      var e = t.options,
                        i = d.getValueOrDefault(e.type, t.dtype),
                        n = l.scaleService.getScaleConstructor(i);
                      if (n) {
                        var a = new n({
                          id: e.id,
                          options: e,
                          ctx: r.chart.ctx,
                          chart: r,
                        });
                        (o[a.id] = a), t.isDefault && (r.scale = a);
                      }
                    }),
                    l.scaleService.addScalesToLayout(this);
                },
                updateLayout: function () {
                  l.layoutService.update(
                    this,
                    this.chart.width,
                    this.chart.height
                  );
                },
                buildOrUpdateControllers: function () {
                  var n = this,
                    a = [],
                    r = [];
                  if (
                    (d.each(
                      n.data.datasets,
                      function (t, e) {
                        var i = n.getDatasetMeta(e);
                        i.type || (i.type = t.type || n.config.type),
                          a.push(i.type),
                          i.controller
                            ? i.controller.updateIndex(e)
                            : ((i.controller = new l.controllers[i.type](n, e)),
                              r.push(i.controller));
                      },
                      n
                    ),
                    1 < a.length)
                  )
                    for (var t = 1; t < a.length; t++)
                      if (a[t] !== a[t - 1]) {
                        n.isCombo = !0;
                        break;
                      }
                  return r;
                },
                resetElements: function () {
                  var i = this;
                  d.each(
                    i.data.datasets,
                    function (t, e) {
                      i.getDatasetMeta(e).controller.reset();
                    },
                    i
                  );
                },
                update: function (t, e) {
                  var i = this;
                  l.plugins.notify("beforeUpdate", [i]),
                    (i.tooltip._data = i.data);
                  var n = i.buildOrUpdateControllers();
                  d.each(
                    i.data.datasets,
                    function (t, e) {
                      i.getDatasetMeta(e).controller.buildOrUpdateElements();
                    },
                    i
                  ),
                    l.layoutService.update(i, i.chart.width, i.chart.height),
                    l.plugins.notify("afterScaleUpdate", [i]),
                    d.each(n, function (t) {
                      t.reset();
                    }),
                    i.updateDatasets(),
                    l.plugins.notify("afterUpdate", [i]),
                    i.render(t, e);
                },
                updateDatasets: function () {
                  var t, e;
                  if (l.plugins.notify("beforeDatasetsUpdate", [this])) {
                    for (t = 0, e = this.data.datasets.length; t < e; ++t)
                      this.getDatasetMeta(t).controller.update();
                    l.plugins.notify("afterDatasetsUpdate", [this]);
                  }
                },
                render: function (t, e) {
                  var i = this;
                  l.plugins.notify("beforeRender", [i]);
                  var n = i.options.animation;
                  if (
                    n &&
                    ((void 0 !== t && 0 !== t) ||
                      (void 0 === t && 0 !== n.duration))
                  ) {
                    var a = new l.Animation();
                    (a.numSteps = (t || n.duration) / 16.66),
                      (a.easing = n.easing),
                      (a.render = function (t, e) {
                        var i = d.easingEffects[e.easing],
                          n = e.currentStep / e.numSteps,
                          a = i(n);
                        t.draw(a, n, e.currentStep);
                      }),
                      (a.onAnimationProgress = n.onProgress),
                      (a.onAnimationComplete = n.onComplete),
                      l.animationService.addAnimation(i, a, t, e);
                  } else
                    i.draw(),
                      n &&
                        n.onComplete &&
                        n.onComplete.call &&
                        n.onComplete.call(i);
                  return i;
                },
                draw: function (i) {
                  var n = this,
                    t = i || 1;
                  n.clear(),
                    l.plugins.notify("beforeDraw", [n, t]),
                    d.each(
                      n.boxes,
                      function (t) {
                        t.draw(n.chartArea);
                      },
                      n
                    ),
                    n.scale && n.scale.draw(),
                    l.plugins.notify("beforeDatasetsDraw", [n, t]),
                    d.each(
                      n.data.datasets,
                      function (t, e) {
                        n.isDatasetVisible(e) &&
                          n.getDatasetMeta(e).controller.draw(i);
                      },
                      n,
                      !0
                    ),
                    l.plugins.notify("afterDatasetsDraw", [n, t]),
                    n.tooltip.transition(t).draw(),
                    l.plugins.notify("afterDraw", [n, t]);
                },
                getElementAtEvent: function (t) {
                  var n = this,
                    a = d.getRelativePosition(t, n.chart),
                    r = [];
                  return (
                    d.each(n.data.datasets, function (t, e) {
                      if (n.isDatasetVisible(e)) {
                        var i = n.getDatasetMeta(e);
                        d.each(i.data, function (t) {
                          if (t.inRange(a.x, a.y)) return r.push(t), r;
                        });
                      }
                    }),
                    r.slice(0, 1)
                  );
                },
                getElementsAtEvent: function (t) {
                  var n = this,
                    a = d.getRelativePosition(t, n.chart),
                    r = [],
                    o = function () {
                      if (n.data.datasets)
                        for (var t = 0; t < n.data.datasets.length; t++) {
                          var e = n.getDatasetMeta(t);
                          if (n.isDatasetVisible(t))
                            for (var i = 0; i < e.data.length; i++)
                              if (e.data[i].inRange(a.x, a.y)) return e.data[i];
                        }
                    }.call(n);
                  return (
                    o &&
                      d.each(
                        n.data.datasets,
                        function (t, e) {
                          if (n.isDatasetVisible(e)) {
                            var i = n.getDatasetMeta(e).data[o._index];
                            i && !i._view.skip && r.push(i);
                          }
                        },
                        n
                      ),
                    r
                  );
                },
                getElementsAtXAxis: function (t) {
                  var a = this,
                    n = d.getRelativePosition(t, a.chart),
                    r = [],
                    o = function () {
                      if (a.data.datasets)
                        for (var t = 0; t < a.data.datasets.length; t++) {
                          var e = a.getDatasetMeta(t);
                          if (a.isDatasetVisible(t))
                            for (var i = 0; i < e.data.length; i++)
                              if (e.data[i].inLabelRange(n.x, n.y))
                                return e.data[i];
                        }
                    }.call(a);
                  return (
                    o &&
                      d.each(
                        a.data.datasets,
                        function (t, e) {
                          if (a.isDatasetVisible(e)) {
                            var i = a.getDatasetMeta(e),
                              n = d.findIndex(i.data, function (t) {
                                return o._model.x === t._model.x;
                              });
                            -1 === n ||
                              i.data[n]._view.skip ||
                              r.push(i.data[n]);
                          }
                        },
                        a
                      ),
                    r
                  );
                },
                getElementsAtEventForMode: function (t, e) {
                  switch (e) {
                    case "single":
                      return this.getElementAtEvent(t);
                    case "label":
                      return this.getElementsAtEvent(t);
                    case "dataset":
                      return this.getDatasetAtEvent(t);
                    case "x-axis":
                      return this.getElementsAtXAxis(t);
                    default:
                      return t;
                  }
                },
                getDatasetAtEvent: function (t) {
                  var e = this.getElementAtEvent(t);
                  return (
                    0 < e.length &&
                      (e = this.getDatasetMeta(e[0]._datasetIndex).data),
                    e
                  );
                },
                getDatasetMeta: function (t) {
                  var e = this.data.datasets[t];
                  e._meta || (e._meta = {});
                  var i = e._meta[this.id];
                  return (
                    i ||
                      (i = e._meta[this.id] =
                        {
                          type: null,
                          data: [],
                          dataset: null,
                          controller: null,
                          hidden: null,
                          xAxisID: null,
                          yAxisID: null,
                        }),
                    i
                  );
                },
                getVisibleDatasetCount: function () {
                  for (
                    var t = 0, e = 0, i = this.data.datasets.length;
                    e < i;
                    ++e
                  )
                    this.isDatasetVisible(e) && t++;
                  return t;
                },
                isDatasetVisible: function (t) {
                  var e = this.getDatasetMeta(t);
                  return "boolean" == typeof e.hidden
                    ? !e.hidden
                    : !this.data.datasets[t].hidden;
                },
                generateLegend: function () {
                  return this.options.legendCallback(this);
                },
                destroy: function () {
                  var t = this;
                  t.stop(),
                    t.clear(),
                    d.unbindEvents(t, t.events),
                    d.removeResizeListener(t.chart.canvas.parentNode);
                  var e = t.chart.canvas;
                  (e.width = t.chart.width),
                    (e.height = t.chart.height),
                    void 0 !== t.chart.originalDevicePixelRatio &&
                      t.chart.ctx.scale(
                        1 / t.chart.originalDevicePixelRatio,
                        1 / t.chart.originalDevicePixelRatio
                      ),
                    (e.style.width = t.chart.originalCanvasStyleWidth),
                    (e.style.height = t.chart.originalCanvasStyleHeight),
                    l.plugins.notify("destroy", [t]),
                    delete l.instances[t.id];
                },
                toBase64Image: function () {
                  return this.chart.canvas.toDataURL.apply(
                    this.chart.canvas,
                    arguments
                  );
                },
                initToolTip: function () {
                  var t = this;
                  t.tooltip = new l.Tooltip(
                    {
                      _chart: t.chart,
                      _chartInstance: t,
                      _data: t.data,
                      _options: t.options.tooltips,
                    },
                    t
                  );
                },
                bindEvents: function () {
                  var e = this;
                  d.bindEvents(e, e.options.events, function (t) {
                    e.eventHandler(t);
                  });
                },
                updateHoverStyle: function (t, e, i) {
                  var n,
                    a,
                    r,
                    o = i ? "setHoverStyle" : "removeHoverStyle";
                  switch (e) {
                    case "single":
                      t = [t[0]];
                      break;
                    case "label":
                    case "dataset":
                    case "x-axis":
                      break;
                    default:
                      return;
                  }
                  for (a = 0, r = t.length; a < r; ++a)
                    (n = t[a]) &&
                      this.getDatasetMeta(n._datasetIndex).controller[o](n);
                },
                eventHandler: function (t) {
                  var e = this,
                    i = e.tooltip,
                    n = e.options || {},
                    a = n.hover,
                    r = n.tooltips;
                  return (
                    (e.lastActive = e.lastActive || []),
                    (e.lastTooltipActive = e.lastTooltipActive || []),
                    "mouseout" === t.type
                      ? ((e.active = []), (e.tooltipActive = []))
                      : ((e.active = e.getElementsAtEventForMode(t, a.mode)),
                        (e.tooltipActive = e.getElementsAtEventForMode(
                          t,
                          r.mode
                        ))),
                    a.onHover && a.onHover.call(e, e.active),
                    ("mouseup" !== t.type && "click" !== t.type) ||
                      (n.onClick && n.onClick.call(e, t, e.active),
                      e.legend &&
                        e.legend.handleEvent &&
                        e.legend.handleEvent(t)),
                    e.lastActive.length &&
                      e.updateHoverStyle(e.lastActive, a.mode, !1),
                    e.active.length &&
                      a.mode &&
                      e.updateHoverStyle(e.active, a.mode, !0),
                    (r.enabled || r.custom) &&
                      (i.initialize(),
                      (i._active = e.tooltipActive),
                      i.update(!0)),
                    i.pivot(),
                    e.animating ||
                      (d.arrayEquals(e.active, e.lastActive) &&
                        d.arrayEquals(e.tooltipActive, e.lastTooltipActive)) ||
                      (e.stop(),
                      (r.enabled || r.custom) && i.update(!0),
                      e.render(a.animationDuration, !0)),
                    (e.lastActive = e.active),
                    (e.lastTooltipActive = e.tooltipActive),
                    e
                  );
                },
              });
          };
        },
        {},
      ],
      24: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var s = t.helpers,
              e = s.noop;
            (t.DatasetController = function (t, e) {
              this.initialize.call(this, t, e);
            }),
              s.extend(t.DatasetController.prototype, {
                datasetElementType: null,
                dataElementType: null,
                initialize: function (t, e) {
                  (this.chart = t),
                    (this.index = e),
                    this.linkScales(),
                    this.addElements();
                },
                updateIndex: function (t) {
                  this.index = t;
                },
                linkScales: function () {
                  var t = this.getMeta(),
                    e = this.getDataset();
                  null === t.xAxisID &&
                    (t.xAxisID =
                      e.xAxisID || this.chart.options.scales.xAxes[0].id),
                    null === t.yAxisID &&
                      (t.yAxisID =
                        e.yAxisID || this.chart.options.scales.yAxes[0].id);
                },
                getDataset: function () {
                  return this.chart.data.datasets[this.index];
                },
                getMeta: function () {
                  return this.chart.getDatasetMeta(this.index);
                },
                getScaleForId: function (t) {
                  return this.chart.scales[t];
                },
                reset: function () {
                  this.update(!0);
                },
                createMetaDataset: function () {
                  var t = this.datasetElementType;
                  return (
                    t &&
                    new t({
                      _chart: this.chart.chart,
                      _datasetIndex: this.index,
                    })
                  );
                },
                createMetaData: function (t) {
                  var e = this.dataElementType;
                  return (
                    e &&
                    new e({
                      _chart: this.chart.chart,
                      _datasetIndex: this.index,
                      _index: t,
                    })
                  );
                },
                addElements: function () {
                  var t,
                    e,
                    i = this.getMeta(),
                    n = this.getDataset().data || [],
                    a = i.data;
                  for (t = 0, e = n.length; t < e; ++t)
                    a[t] = a[t] || this.createMetaData(i, t);
                  i.dataset = i.dataset || this.createMetaDataset();
                },
                addElementAndReset: function (t) {
                  var e = this.createMetaData(t);
                  this.getMeta().data.splice(t, 0, e),
                    this.updateElement(e, t, !0);
                },
                buildOrUpdateElements: function () {
                  var t = this.getMeta().data,
                    e = this.getDataset().data.length,
                    i = t.length;
                  if (e < i) t.splice(e, i - e);
                  else if (i < e)
                    for (var n = i; n < e; ++n) this.addElementAndReset(n);
                },
                update: e,
                draw: function (t) {
                  var e = t || 1;
                  s.each(this.getMeta().data, function (t) {
                    t.transition(e).draw();
                  });
                },
                removeHoverStyle: function (t, e) {
                  var i = this.chart.data.datasets[t._datasetIndex],
                    n = t._index,
                    a = t.custom || {},
                    r = s.getValueAtIndexOrDefault,
                    o = t._model;
                  (o.backgroundColor = a.backgroundColor
                    ? a.backgroundColor
                    : r(i.backgroundColor, n, e.backgroundColor)),
                    (o.borderColor = a.borderColor
                      ? a.borderColor
                      : r(i.borderColor, n, e.borderColor)),
                    (o.borderWidth = a.borderWidth
                      ? a.borderWidth
                      : r(i.borderWidth, n, e.borderWidth));
                },
                setHoverStyle: function (t) {
                  var e = this.chart.data.datasets[t._datasetIndex],
                    i = t._index,
                    n = t.custom || {},
                    a = s.getValueAtIndexOrDefault,
                    r = s.getHoverColor,
                    o = t._model;
                  (o.backgroundColor = n.hoverBackgroundColor
                    ? n.hoverBackgroundColor
                    : a(e.hoverBackgroundColor, i, r(o.backgroundColor))),
                    (o.borderColor = n.hoverBorderColor
                      ? n.hoverBorderColor
                      : a(e.hoverBorderColor, i, r(o.borderColor))),
                    (o.borderWidth = n.hoverBorderWidth
                      ? n.hoverBorderWidth
                      : a(e.hoverBorderWidth, i, o.borderWidth));
                },
              }),
              (t.DatasetController.extend = s.inherits);
          };
        },
        {},
      ],
      25: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var o = t.helpers;
            (t.elements = {}),
              (t.Element = function (t) {
                o.extend(this, t), this.initialize.apply(this, arguments);
              }),
              o.extend(t.Element.prototype, {
                initialize: function () {
                  this.hidden = !1;
                },
                pivot: function () {
                  var t = this;
                  return (
                    t._view || (t._view = o.clone(t._model)),
                    (t._start = o.clone(t._view)),
                    t
                  );
                },
                transition: function (a) {
                  var r = this;
                  return (
                    r._view || (r._view = o.clone(r._model)),
                    1 === a
                      ? ((r._view = r._model), (r._start = null))
                      : (r._start || r.pivot(),
                        o.each(
                          r._model,
                          function (e, i) {
                            if ("_" === i[0]);
                            else if (r._view.hasOwnProperty(i))
                              if (e === r._view[i]);
                              else if ("string" == typeof e)
                                try {
                                  var t = o
                                    .color(r._model[i])
                                    .mix(o.color(r._start[i]), a);
                                  r._view[i] = t.rgbString();
                                } catch (t) {
                                  r._view[i] = e;
                                }
                              else if ("number" == typeof e) {
                                var n =
                                  void 0 !== r._start[i] &&
                                  !1 === isNaN(r._start[i])
                                    ? r._start[i]
                                    : 0;
                                r._view[i] = (r._model[i] - n) * a + n;
                              } else r._view[i] = e;
                            else
                              "number" != typeof e || isNaN(r._view[i])
                                ? (r._view[i] = e)
                                : (r._view[i] = e * a);
                          },
                          r
                        )),
                    r
                  );
                },
                tooltipPosition: function () {
                  return { x: this._model.x, y: this._model.y };
                },
                hasValue: function () {
                  return o.isNumber(this._model.x) && o.isNumber(this._model.y);
                },
              }),
              (t.Element.extend = o.inherits);
          };
        },
        {},
      ],
      26: [
        function (t, e, i) {
          "use strict";
          var n = t(2);
          e.exports = function (o) {
            var t,
              g = (o.helpers = {});
            (g.each = function (t, e, i, n) {
              var a, r;
              if (g.isArray(t))
                if (((r = t.length), n))
                  for (a = r - 1; 0 <= a; a--) e.call(i, t[a], a);
                else for (a = 0; a < r; a++) e.call(i, t[a], a);
              else if ("object" == typeof t) {
                var o = Object.keys(t);
                for (r = o.length, a = 0; a < r; a++) e.call(i, t[o[a]], o[a]);
              }
            }),
              (g.clone = function (t) {
                var i = {};
                return (
                  g.each(t, function (t, e) {
                    g.isArray(t)
                      ? (i[e] = t.slice(0))
                      : (i[e] =
                          "object" == typeof t && null !== t ? g.clone(t) : t);
                  }),
                  i
                );
              }),
              (g.extend = function (i) {
                for (
                  var t = function (t, e) {
                      i[e] = t;
                    },
                    e = 1,
                    n = arguments.length;
                  e < n;
                  e++
                )
                  g.each(arguments[e], t);
                return i;
              }),
              (g.configMerge = function (t) {
                var n = g.clone(t);
                return (
                  g.each(
                    Array.prototype.slice.call(arguments, 1),
                    function (t) {
                      g.each(t, function (t, e) {
                        if ("scales" === e)
                          n[e] = g.scaleMerge(
                            n.hasOwnProperty(e) ? n[e] : {},
                            t
                          );
                        else if ("scale" === e)
                          n[e] = g.configMerge(
                            n.hasOwnProperty(e) ? n[e] : {},
                            o.scaleService.getScaleDefaults(t.type),
                            t
                          );
                        else if (
                          n.hasOwnProperty(e) &&
                          g.isArray(n[e]) &&
                          g.isArray(t)
                        ) {
                          var i = n[e];
                          g.each(t, function (t, e) {
                            e < i.length
                              ? "object" == typeof i[e] &&
                                null !== i[e] &&
                                "object" == typeof t &&
                                null !== t
                                ? (i[e] = g.configMerge(i[e], t))
                                : (i[e] = t)
                              : i.push(t);
                          });
                        } else
                          n.hasOwnProperty(e) &&
                          "object" == typeof n[e] &&
                          null !== n[e] &&
                          "object" == typeof t
                            ? (n[e] = g.configMerge(n[e], t))
                            : (n[e] = t);
                      });
                    }
                  ),
                  n
                );
              }),
              (g.scaleMerge = function (t, e) {
                var r = g.clone(t);
                return (
                  g.each(e, function (t, a) {
                    "xAxes" === a || "yAxes" === a
                      ? r.hasOwnProperty(a)
                        ? g.each(t, function (t, e) {
                            var i = g.getValueOrDefault(
                                t.type,
                                "xAxes" === a ? "category" : "linear"
                              ),
                              n = o.scaleService.getScaleDefaults(i);
                            e >= r[a].length || !r[a][e].type
                              ? r[a].push(g.configMerge(n, t))
                              : t.type && t.type !== r[a][e].type
                              ? (r[a][e] = g.configMerge(r[a][e], n, t))
                              : (r[a][e] = g.configMerge(r[a][e], t));
                          })
                        : ((r[a] = []),
                          g.each(t, function (t) {
                            var e = g.getValueOrDefault(
                              t.type,
                              "xAxes" === a ? "category" : "linear"
                            );
                            r[a].push(
                              g.configMerge(
                                o.scaleService.getScaleDefaults(e),
                                t
                              )
                            );
                          }))
                      : r.hasOwnProperty(a) &&
                        "object" == typeof r[a] &&
                        null !== r[a] &&
                        "object" == typeof t
                      ? (r[a] = g.configMerge(r[a], t))
                      : (r[a] = t);
                  }),
                  r
                );
              }),
              (g.getValueAtIndexOrDefault = function (t, e, i) {
                return null == t
                  ? i
                  : g.isArray(t)
                  ? e < t.length
                    ? t[e]
                    : i
                  : t;
              }),
              (g.getValueOrDefault = function (t, e) {
                return void 0 === t ? e : t;
              }),
              (g.indexOf = Array.prototype.indexOf
                ? function (t, e) {
                    return t.indexOf(e);
                  }
                : function (t, e) {
                    for (var i = 0, n = t.length; i < n; ++i)
                      if (t[i] === e) return i;
                    return -1;
                  }),
              (g.where = function (t, e) {
                if (g.isArray(t) && Array.prototype.filter) return t.filter(e);
                var i = [];
                return (
                  g.each(t, function (t) {
                    e(t) && i.push(t);
                  }),
                  i
                );
              }),
              (g.findIndex = Array.prototype.findIndex
                ? function (t, e, i) {
                    return t.findIndex(e, i);
                  }
                : function (t, e, i) {
                    i = void 0 === i ? t : i;
                    for (var n = 0, a = t.length; n < a; ++n)
                      if (e.call(i, t[n], n, t)) return n;
                    return -1;
                  }),
              (g.findNextWhere = function (t, e, i) {
                null == i && (i = -1);
                for (var n = i + 1; n < t.length; n++) {
                  var a = t[n];
                  if (e(a)) return a;
                }
              }),
              (g.findPreviousWhere = function (t, e, i) {
                null == i && (i = t.length);
                for (var n = i - 1; 0 <= n; n--) {
                  var a = t[n];
                  if (e(a)) return a;
                }
              }),
              (g.inherits = function (t) {
                var e = this,
                  i =
                    t && t.hasOwnProperty("constructor")
                      ? t.constructor
                      : function () {
                          return e.apply(this, arguments);
                        },
                  n = function () {
                    this.constructor = i;
                  };
                return (
                  (n.prototype = e.prototype),
                  (i.prototype = new n()),
                  (i.extend = g.inherits),
                  t && g.extend(i.prototype, t),
                  (i.__super__ = e.prototype),
                  i
                );
              }),
              (g.noop = function () {}),
              (g.uid =
                ((t = 0),
                function () {
                  return t++;
                })),
              (g.isNumber = function (t) {
                return !isNaN(parseFloat(t)) && isFinite(t);
              }),
              (g.almostEquals = function (t, e, i) {
                return Math.abs(t - e) < i;
              }),
              (g.max = function (t) {
                return t.reduce(function (t, e) {
                  return isNaN(e) ? t : Math.max(t, e);
                }, Number.NEGATIVE_INFINITY);
              }),
              (g.min = function (t) {
                return t.reduce(function (t, e) {
                  return isNaN(e) ? t : Math.min(t, e);
                }, Number.POSITIVE_INFINITY);
              }),
              (g.sign = Math.sign
                ? function (t) {
                    return Math.sign(t);
                  }
                : function (t) {
                    return 0 === (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1;
                  }),
              (g.log10 = Math.log10
                ? function (t) {
                    return Math.log10(t);
                  }
                : function (t) {
                    return Math.log(t) / Math.LN10;
                  }),
              (g.toRadians = function (t) {
                return t * (Math.PI / 180);
              }),
              (g.toDegrees = function (t) {
                return t * (180 / Math.PI);
              }),
              (g.getAngleFromPoint = function (t, e) {
                var i = e.x - t.x,
                  n = e.y - t.y,
                  a = Math.sqrt(i * i + n * n),
                  r = Math.atan2(n, i);
                return (
                  r < -0.5 * Math.PI && (r += 2 * Math.PI),
                  { angle: r, distance: a }
                );
              }),
              (g.aliasPixel = function (t) {
                return t % 2 == 0 ? 0 : 0.5;
              }),
              (g.splineCurve = function (t, e, i, n) {
                var a = t.skip ? e : t,
                  r = e,
                  o = i.skip ? e : i,
                  s = Math.sqrt(
                    Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2)
                  ),
                  l = Math.sqrt(
                    Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)
                  ),
                  d = s / (s + l),
                  u = l / (s + l),
                  h = n * (d = isNaN(d) ? 0 : d),
                  c = n * (u = isNaN(u) ? 0 : u);
                return {
                  previous: {
                    x: r.x - h * (o.x - a.x),
                    y: r.y - h * (o.y - a.y),
                  },
                  next: { x: r.x + c * (o.x - a.x), y: r.y + c * (o.y - a.y) },
                };
              }),
              (g.nextItem = function (t, e, i) {
                return i
                  ? e >= t.length - 1
                    ? t[0]
                    : t[e + 1]
                  : e >= t.length - 1
                  ? t[t.length - 1]
                  : t[e + 1];
              }),
              (g.previousItem = function (t, e, i) {
                return i
                  ? e <= 0
                    ? t[t.length - 1]
                    : t[e - 1]
                  : e <= 0
                  ? t[0]
                  : t[e - 1];
              }),
              (g.niceNum = function (t, e) {
                var i = Math.floor(g.log10(t)),
                  n = t / Math.pow(10, i);
                return (
                  (e
                    ? n < 1.5
                      ? 1
                      : n < 3
                      ? 2
                      : n < 7
                      ? 5
                      : 10
                    : n <= 1
                    ? 1
                    : n <= 2
                    ? 2
                    : n <= 5
                    ? 5
                    : 10) * Math.pow(10, i)
                );
              });
            var e = (g.easingEffects = {
              linear: function (t) {
                return t;
              },
              easeInQuad: function (t) {
                return t * t;
              },
              easeOutQuad: function (t) {
                return -1 * t * (t - 2);
              },
              easeInOutQuad: function (t) {
                return (t /= 0.5) < 1
                  ? 0.5 * t * t
                  : -0.5 * (--t * (t - 2) - 1);
              },
              easeInCubic: function (t) {
                return t * t * t;
              },
              easeOutCubic: function (t) {
                return 1 * ((t = t / 1 - 1) * t * t + 1);
              },
              easeInOutCubic: function (t) {
                return (t /= 0.5) < 1
                  ? 0.5 * t * t * t
                  : 0.5 * ((t -= 2) * t * t + 2);
              },
              easeInQuart: function (t) {
                return t * t * t * t;
              },
              easeOutQuart: function (t) {
                return -1 * ((t = t / 1 - 1) * t * t * t - 1);
              },
              easeInOutQuart: function (t) {
                return (t /= 0.5) < 1
                  ? 0.5 * t * t * t * t
                  : -0.5 * ((t -= 2) * t * t * t - 2);
              },
              easeInQuint: function (t) {
                return 1 * (t /= 1) * t * t * t * t;
              },
              easeOutQuint: function (t) {
                return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
              },
              easeInOutQuint: function (t) {
                return (t /= 0.5) < 1
                  ? 0.5 * t * t * t * t * t
                  : 0.5 * ((t -= 2) * t * t * t * t + 2);
              },
              easeInSine: function (t) {
                return -1 * Math.cos((t / 1) * (Math.PI / 2)) + 1;
              },
              easeOutSine: function (t) {
                return 1 * Math.sin((t / 1) * (Math.PI / 2));
              },
              easeInOutSine: function (t) {
                return -0.5 * (Math.cos((Math.PI * t) / 1) - 1);
              },
              easeInExpo: function (t) {
                return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
              },
              easeOutExpo: function (t) {
                return 1 === t ? 1 : 1 * (1 - Math.pow(2, (-10 * t) / 1));
              },
              easeInOutExpo: function (t) {
                return 0 === t
                  ? 0
                  : 1 === t
                  ? 1
                  : (t /= 0.5) < 1
                  ? 0.5 * Math.pow(2, 10 * (t - 1))
                  : 0.5 * (2 - Math.pow(2, -10 * --t));
              },
              easeInCirc: function (t) {
                return 1 <= t ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
              },
              easeOutCirc: function (t) {
                return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
              },
              easeInOutCirc: function (t) {
                return (t /= 0.5) < 1
                  ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                  : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
              },
              easeInElastic: function (t) {
                var e = 1.70158,
                  i = 0,
                  n = 1;
                return 0 === t
                  ? 0
                  : 1 == (t /= 1)
                  ? 1
                  : (i || (i = 0.3),
                    (e =
                      n < Math.abs(1)
                        ? ((n = 1), i / 4)
                        : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                    -n *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin(((1 * t - e) * (2 * Math.PI)) / i));
              },
              easeOutElastic: function (t) {
                var e = 1.70158,
                  i = 0,
                  n = 1;
                return 0 === t
                  ? 0
                  : 1 == (t /= 1)
                  ? 1
                  : (i || (i = 0.3),
                    (e =
                      n < Math.abs(1)
                        ? ((n = 1), i / 4)
                        : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                    n *
                      Math.pow(2, -10 * t) *
                      Math.sin(((1 * t - e) * (2 * Math.PI)) / i) +
                      1);
              },
              easeInOutElastic: function (t) {
                var e = 1.70158,
                  i = 0,
                  n = 1;
                return 0 === t
                  ? 0
                  : 2 == (t /= 0.5)
                  ? 1
                  : (i || (i = 0.3 * 1.5 * 1),
                    (e =
                      n < Math.abs(1)
                        ? ((n = 1), i / 4)
                        : (i / (2 * Math.PI)) * Math.asin(1 / n)),
                    t < 1
                      ? n *
                        Math.pow(2, 10 * (t -= 1)) *
                        Math.sin(((1 * t - e) * (2 * Math.PI)) / i) *
                        -0.5
                      : n *
                          Math.pow(2, -10 * (t -= 1)) *
                          Math.sin(((1 * t - e) * (2 * Math.PI)) / i) *
                          0.5 +
                        1);
              },
              easeInBack: function (t) {
                return 1 * (t /= 1) * t * (2.70158 * t - 1.70158);
              },
              easeOutBack: function (t) {
                return 1 * ((t = t / 1 - 1) * t * (2.70158 * t + 1.70158) + 1);
              },
              easeInOutBack: function (t) {
                var e = 1.70158;
                return (t /= 0.5) < 1
                  ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
                  : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
              },
              easeInBounce: function (t) {
                return 1 - e.easeOutBounce(1 - t);
              },
              easeOutBounce: function (t) {
                return (t /= 1) < 1 / 2.75
                  ? 7.5625 * t * t * 1
                  : t < 2 / 2.75
                  ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
                  : t < 2.5 / 2.75
                  ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
                  : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
              },
              easeInOutBounce: function (t) {
                return t < 0.5
                  ? 0.5 * e.easeInBounce(2 * t)
                  : 0.5 * e.easeOutBounce(2 * t - 1) + 0.5;
              },
            });
            function u(t, e, i) {
              var n;
              return (
                "string" == typeof t
                  ? ((n = parseInt(t, 10)),
                    -1 != t.indexOf("%") && (n = (n / 100) * e.parentNode[i]))
                  : (n = t),
                n
              );
            }
            function h(t) {
              return null != t && "none" !== t;
            }
            function i(t, e, i) {
              var n = document.defaultView,
                a = t.parentNode,
                r = n.getComputedStyle(t)[e],
                o = n.getComputedStyle(a)[e],
                s = h(r),
                l = h(o),
                d = Number.POSITIVE_INFINITY;
              return s || l
                ? Math.min(s ? u(r, t, i) : d, l ? u(o, a, i) : d)
                : "none";
            }
            (g.requestAnimFrame =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function (t) {
                return window.setTimeout(t, 1e3 / 60);
              }),
              (g.cancelAnimFrame =
                window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                function (t) {
                  return window.clearTimeout(t, 1e3 / 60);
                }),
              (g.getRelativePosition = function (t, e) {
                var i,
                  n,
                  a = t.originalEvent || t,
                  r = t.currentTarget || t.srcElement,
                  o = r.getBoundingClientRect(),
                  s = a.touches;
                n =
                  s && 0 < s.length
                    ? ((i = s[0].clientX), s[0].clientY)
                    : ((i = a.clientX), a.clientY);
                var l = parseFloat(g.getStyle(r, "padding-left")),
                  d = parseFloat(g.getStyle(r, "padding-top")),
                  u = parseFloat(g.getStyle(r, "padding-right")),
                  h = parseFloat(g.getStyle(r, "padding-bottom")),
                  c = o.right - o.left - l - u,
                  f = o.bottom - o.top - d - h;
                return {
                  x: (i = Math.round(
                    (((i - o.left - l) / c) * r.width) /
                      e.currentDevicePixelRatio
                  )),
                  y: (n = Math.round(
                    (((n - o.top - d) / f) * r.height) /
                      e.currentDevicePixelRatio
                  )),
                };
              }),
              (g.addEvent = function (t, e, i) {
                t.addEventListener
                  ? t.addEventListener(e, i)
                  : t.attachEvent
                  ? t.attachEvent("on" + e, i)
                  : (t["on" + e] = i);
              }),
              (g.removeEvent = function (t, e, i) {
                t.removeEventListener
                  ? t.removeEventListener(e, i, !1)
                  : t.detachEvent
                  ? t.detachEvent("on" + e, i)
                  : (t["on" + e] = g.noop);
              }),
              (g.bindEvents = function (e, t, i) {
                var n = (e.events = e.events || {});
                g.each(t, function (t) {
                  (n[t] = function () {
                    i.apply(e, arguments);
                  }),
                    g.addEvent(e.chart.canvas, t, n[t]);
                });
              }),
              (g.unbindEvents = function (t, e) {
                var i = t.chart.canvas;
                g.each(e, function (t, e) {
                  g.removeEvent(i, e, t);
                });
              }),
              (g.getConstraintWidth = function (t) {
                return i(t, "max-width", "clientWidth");
              }),
              (g.getConstraintHeight = function (t) {
                return i(t, "max-height", "clientHeight");
              }),
              (g.getMaximumWidth = function (t) {
                var e = t.parentNode,
                  i =
                    parseInt(g.getStyle(e, "padding-left")) +
                    parseInt(g.getStyle(e, "padding-right")),
                  n = e.clientWidth - i,
                  a = g.getConstraintWidth(t);
                return isNaN(a) ? n : Math.min(n, a);
              }),
              (g.getMaximumHeight = function (t) {
                var e = t.parentNode,
                  i =
                    parseInt(g.getStyle(e, "padding-top")) +
                    parseInt(g.getStyle(e, "padding-bottom")),
                  n = e.clientHeight - i,
                  a = g.getConstraintHeight(t);
                return isNaN(a) ? n : Math.min(n, a);
              }),
              (g.getStyle = function (t, e) {
                return t.currentStyle
                  ? t.currentStyle[e]
                  : document.defaultView
                      .getComputedStyle(t, null)
                      .getPropertyValue(e);
              }),
              (g.retinaScale = function (t) {
                var e = t.ctx,
                  i = t.canvas,
                  n = i.width,
                  a = i.height,
                  r = (t.currentDevicePixelRatio =
                    window.devicePixelRatio || 1);
                1 !== r &&
                  ((i.height = a * r),
                  (i.width = n * r),
                  e.scale(r, r),
                  (t.originalDevicePixelRatio =
                    t.originalDevicePixelRatio || r)),
                  (i.style.width = n + "px"),
                  (i.style.height = a + "px");
              }),
              (g.clear = function (t) {
                t.ctx.clearRect(0, 0, t.width, t.height);
              }),
              (g.fontString = function (t, e, i) {
                return e + " " + t + "px " + i;
              }),
              (g.longestText = function (e, t, i, n) {
                var a = ((n = n || {}).data = n.data || {}),
                  r = (n.garbageCollect = n.garbageCollect || []);
                n.font !== t &&
                  ((a = n.data = {}),
                  (r = n.garbageCollect = []),
                  (n.font = t)),
                  (e.font = t);
                var o = 0;
                g.each(i, function (t) {
                  null != t && !0 !== g.isArray(t)
                    ? (o = g.measureText(e, a, r, o, t))
                    : g.isArray(t) &&
                      g.each(t, function (t) {
                        null == t ||
                          g.isArray(t) ||
                          (o = g.measureText(e, a, r, o, t));
                      });
                });
                var s = r.length / 2;
                if (s > i.length) {
                  for (var l = 0; l < s; l++) delete a[r[l]];
                  r.splice(0, s);
                }
                return o;
              }),
              (g.measureText = function (t, e, i, n, a) {
                var r = e[a];
                return (
                  r || ((r = e[a] = t.measureText(a).width), i.push(a)),
                  n < r && (n = r),
                  n
                );
              }),
              (g.numberOfLabelLines = function (t) {
                var e = 1;
                return (
                  g.each(t, function (t) {
                    g.isArray(t) && t.length > e && (e = t.length);
                  }),
                  e
                );
              }),
              (g.drawRoundedRectangle = function (t, e, i, n, a, r) {
                t.beginPath(),
                  t.moveTo(e + r, i),
                  t.lineTo(e + n - r, i),
                  t.quadraticCurveTo(e + n, i, e + n, i + r),
                  t.lineTo(e + n, i + a - r),
                  t.quadraticCurveTo(e + n, i + a, e + n - r, i + a),
                  t.lineTo(e + r, i + a),
                  t.quadraticCurveTo(e, i + a, e, i + a - r),
                  t.lineTo(e, i + r),
                  t.quadraticCurveTo(e, i, e + r, i),
                  t.closePath();
              }),
              (g.color = function (t) {
                return n
                  ? t instanceof CanvasGradient
                    ? n(o.defaults.global.defaultColor)
                    : n(t)
                  : (console.log("Color.js not found!"), t);
              }),
              (g.addResizeListener = function (t, e) {
                var i = document.createElement("iframe"),
                  n = "chartjs-hidden-iframe";
                i.classlist ? i.classlist.add(n) : i.setAttribute("class", n);
                var a = i.style;
                (a.width = "100%"),
                  (a.display = "block"),
                  (a.border = 0),
                  (a.height = 0),
                  (a.margin = 0),
                  (a.position = "absolute"),
                  (a.left = 0),
                  (a.right = 0),
                  (a.top = 0),
                  (a.bottom = 0),
                  t.insertBefore(i, t.firstChild),
                  ((i.contentWindow || i).onresize = function () {
                    e && e();
                  });
              }),
              (g.removeResizeListener = function (t) {
                var e = t.querySelector(".chartjs-hidden-iframe");
                e && e.parentNode.removeChild(e);
              }),
              (g.isArray = Array.isArray
                ? function (t) {
                    return Array.isArray(t);
                  }
                : function (t) {
                    return (
                      "[object Array]" === Object.prototype.toString.call(t)
                    );
                  }),
              (g.arrayEquals = function (t, e) {
                var i, n, a, r;
                if (!t || !e || t.length != e.length) return !1;
                for (i = 0, n = t.length; i < n; ++i)
                  if (
                    ((a = t[i]),
                    (r = e[i]),
                    a instanceof Array && r instanceof Array)
                  ) {
                    if (!g.arrayEquals(a, r)) return !1;
                  } else if (a != r) return !1;
                return !0;
              }),
              (g.callCallback = function (t, e, i) {
                t && "function" == typeof t.call && t.apply(i, e);
              }),
              (g.getHoverColor = function (t) {
                return t instanceof CanvasPattern
                  ? t
                  : g.color(t).saturate(0.5).darken(0.1).rgbString();
              });
          };
        },
        { 2: 2 },
      ],
      27: [
        function (t, e, i) {
          "use strict";
          e.exports = function () {
            var a = function (t, e) {
              var i = this,
                n = a.helpers;
              return (
                (i.config = e || { data: { datasets: [] } }),
                t.length && t[0].getContext && (t = t[0]),
                t.getContext && (t = t.getContext("2d")),
                (i.ctx = t),
                (i.canvas = t.canvas),
                (t.canvas.style.display = t.canvas.style.display || "block"),
                (i.width =
                  t.canvas.width ||
                  parseInt(n.getStyle(t.canvas, "width"), 10) ||
                  n.getMaximumWidth(t.canvas)),
                (i.height =
                  t.canvas.height ||
                  parseInt(n.getStyle(t.canvas, "height"), 10) ||
                  n.getMaximumHeight(t.canvas)),
                (i.aspectRatio = i.width / i.height),
                (isNaN(i.aspectRatio) || !1 === isFinite(i.aspectRatio)) &&
                  (i.aspectRatio =
                    void 0 !== e.aspectRatio ? e.aspectRatio : 2),
                (i.originalCanvasStyleWidth = t.canvas.style.width),
                (i.originalCanvasStyleHeight = t.canvas.style.height),
                n.retinaScale(i),
                (i.controller = new a.Controller(i)),
                n.addResizeListener(t.canvas.parentNode, function () {
                  i.controller &&
                    i.controller.config.options.responsive &&
                    i.controller.resize();
                }),
                i.controller ? i.controller : i
              );
            };
            return (
              (a.defaults = {
                global: {
                  responsive: !0,
                  responsiveAnimationDuration: 0,
                  maintainAspectRatio: !0,
                  events: [
                    "mousemove",
                    "mouseout",
                    "click",
                    "touchstart",
                    "touchmove",
                  ],
                  hover: {
                    onHover: null,
                    mode: "single",
                    animationDuration: 400,
                  },
                  onClick: null,
                  defaultColor: "rgba(0,0,0,0.1)",
                  defaultFontColor: "#666",
                  defaultFontFamily:
                    "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                  defaultFontSize: 12,
                  defaultFontStyle: "normal",
                  showLines: !0,
                  elements: {},
                  legendCallback: function (t) {
                    var e = [];
                    e.push('<ul className="' + t.id + '-legend">');
                    for (var i = 0; i < t.data.datasets.length; i++)
                      e.push(
                        '<li><span style="background-color:' +
                          t.data.datasets[i].backgroundColor +
                          '"></span>'
                      ),
                        t.data.datasets[i].label &&
                          e.push(t.data.datasets[i].label),
                        e.push("</li>");
                    return e.push("</ul>"), e.join("");
                  },
                },
              }),
              (a.Chart = a)
            );
          };
        },
        {},
      ],
      28: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var D = t.helpers;
            t.layoutService = {
              defaults: {},
              addBox: function (t, e) {
                t.boxes || (t.boxes = []), t.boxes.push(e);
              },
              removeBox: function (t, e) {
                t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1);
              },
              update: function (e, i, t) {
                if (e) {
                  var n = D.where(e.boxes, function (t) {
                      return "left" === t.options.position;
                    }),
                    a = D.where(e.boxes, function (t) {
                      return "right" === t.options.position;
                    }),
                    r = D.where(e.boxes, function (t) {
                      return "top" === t.options.position;
                    }),
                    o = D.where(e.boxes, function (t) {
                      return "bottom" === t.options.position;
                    }),
                    s = D.where(e.boxes, function (t) {
                      return "chartArea" === t.options.position;
                    });
                  r.sort(function (t, e) {
                    return (
                      (e.options.fullWidth ? 1 : 0) -
                      (t.options.fullWidth ? 1 : 0)
                    );
                  }),
                    o.sort(function (t, e) {
                      return (
                        (t.options.fullWidth ? 1 : 0) -
                        (e.options.fullWidth ? 1 : 0)
                      );
                    });
                  var l = i - 0,
                    d = t - 0,
                    u = d / 2,
                    h = (i - l / 2) / (n.length + a.length),
                    c = (t - u) / (r.length + o.length),
                    f = l,
                    g = d,
                    p = [];
                  D.each(n.concat(a, r, o), function (t) {
                    var e,
                      i = t.isHorizontal();
                    i
                      ? ((e = t.update(t.options.fullWidth ? l : f, c)),
                        (g -= e.height))
                      : ((e = t.update(h, u)), (f -= e.width));
                    p.push({ horizontal: i, minSize: e, box: t });
                  });
                  var m = 0,
                    v = 0,
                    b = 0,
                    y = 0;
                  D.each(n.concat(a), _),
                    D.each(n, function (t) {
                      m += t.width;
                    }),
                    D.each(a, function (t) {
                      v += t.width;
                    }),
                    D.each(r.concat(o), _),
                    D.each(r, function (t) {
                      b += t.height;
                    }),
                    D.each(o, function (t) {
                      y += t.height;
                    }),
                    D.each(n.concat(a), function (e) {
                      var t = D.findNextWhere(p, function (t) {
                          return t.box === e;
                        }),
                        i = { left: 0, right: 0, top: b, bottom: y };
                      t && e.update(t.minSize.width, g, i);
                    }),
                    (y = b = v = m = 0),
                    D.each(n, function (t) {
                      m += t.width;
                    }),
                    D.each(a, function (t) {
                      v += t.width;
                    }),
                    D.each(r, function (t) {
                      b += t.height;
                    }),
                    D.each(o, function (t) {
                      y += t.height;
                    });
                  var x = t - b - y,
                    k = i - m - v;
                  (k === f && x === g) ||
                    (D.each(n, function (t) {
                      t.height = x;
                    }),
                    D.each(a, function (t) {
                      t.height = x;
                    }),
                    D.each(r, function (t) {
                      t.options.fullWidth || (t.width = k);
                    }),
                    D.each(o, function (t) {
                      t.options.fullWidth || (t.width = k);
                    }),
                    (g = x),
                    (f = k));
                  var S = 0,
                    w = 0;
                  D.each(n.concat(r), M),
                    (S += f),
                    (w += g),
                    D.each(a, M),
                    D.each(o, M),
                    (e.chartArea = {
                      left: m,
                      top: b,
                      right: m + f,
                      bottom: b + g,
                    }),
                    D.each(s, function (t) {
                      (t.left = e.chartArea.left),
                        (t.top = e.chartArea.top),
                        (t.right = e.chartArea.right),
                        (t.bottom = e.chartArea.bottom),
                        t.update(f, g);
                    });
                }
                function _(e) {
                  var t = D.findNextWhere(p, function (t) {
                    return t.box === e;
                  });
                  if (t)
                    if (e.isHorizontal()) {
                      var i = { left: m, right: v, top: 0, bottom: 0 };
                      e.update(e.options.fullWidth ? l : f, d / 2, i);
                    } else e.update(t.minSize.width, g);
                }
                function M(t) {
                  t.isHorizontal()
                    ? ((t.left = t.options.fullWidth ? 0 : m),
                      (t.right = t.options.fullWidth ? i - 0 : m + f),
                      (t.top = w),
                      (t.bottom = w + t.height),
                      (w = t.bottom))
                    : ((t.left = S),
                      (t.right = S + t.width),
                      (t.top = b),
                      (t.bottom = b + g),
                      (S = t.right));
                }
              },
            };
          };
        },
        {},
      ],
      29: [
        function (t, e, i) {
          "use strict";
          e.exports = function (M) {
            var D = M.helpers,
              t = D.noop;
            (M.defaults.global.legend = {
              display: !0,
              position: "top",
              fullWidth: !0,
              reverse: !1,
              onClick: function (t, e) {
                var i = e.datasetIndex,
                  n = this.chart,
                  a = n.getDatasetMeta(i);
                (a.hidden =
                  null === a.hidden ? !n.data.datasets[i].hidden : null),
                  n.update();
              },
              labels: {
                boxWidth: 40,
                padding: 10,
                generateLabels: function (i) {
                  var t = i.data;
                  return D.isArray(t.datasets)
                    ? t.datasets.map(function (t, e) {
                        return {
                          text: t.label,
                          fillStyle: D.isArray(t.backgroundColor)
                            ? t.backgroundColor[0]
                            : t.backgroundColor,
                          hidden: !i.isDatasetVisible(e),
                          lineCap: t.borderCapStyle,
                          lineDash: t.borderDash,
                          lineDashOffset: t.borderDashOffset,
                          lineJoin: t.borderJoinStyle,
                          lineWidth: t.borderWidth,
                          strokeStyle: t.borderColor,
                          pointStyle: t.pointStyle,
                          datasetIndex: e,
                        };
                      }, this)
                    : [];
                },
              },
            }),
              (M.Legend = M.Element.extend({
                initialize: function (t) {
                  D.extend(this, t),
                    (this.legendHitBoxes = []),
                    (this.doughnutMode = !1);
                },
                beforeUpdate: t,
                update: function (t, e, i) {
                  var n = this;
                  return (
                    n.beforeUpdate(),
                    (n.maxWidth = t),
                    (n.maxHeight = e),
                    (n.margins = i),
                    n.beforeSetDimensions(),
                    n.setDimensions(),
                    n.afterSetDimensions(),
                    n.beforeBuildLabels(),
                    n.buildLabels(),
                    n.afterBuildLabels(),
                    n.beforeFit(),
                    n.fit(),
                    n.afterFit(),
                    n.afterUpdate(),
                    n.minSize
                  );
                },
                afterUpdate: t,
                beforeSetDimensions: t,
                setDimensions: function () {
                  var t = this;
                  t.isHorizontal()
                    ? ((t.width = t.maxWidth),
                      (t.left = 0),
                      (t.right = t.width))
                    : ((t.height = t.maxHeight),
                      (t.top = 0),
                      (t.bottom = t.height)),
                    (t.paddingLeft = 0),
                    (t.paddingTop = 0),
                    (t.paddingRight = 0),
                    (t.paddingBottom = 0),
                    (t.minSize = { width: 0, height: 0 });
                },
                afterSetDimensions: t,
                beforeBuildLabels: t,
                buildLabels: function () {
                  var t = this;
                  (t.legendItems = t.options.labels.generateLabels.call(
                    t,
                    t.chart
                  )),
                    t.options.reverse && t.legendItems.reverse();
                },
                afterBuildLabels: t,
                beforeFit: t,
                fit: function () {
                  var n = this,
                    t = n.options,
                    a = t.labels,
                    e = t.display,
                    r = n.ctx,
                    i = M.defaults.global,
                    o = D.getValueOrDefault,
                    s = o(a.fontSize, i.defaultFontSize),
                    l = o(a.fontStyle, i.defaultFontStyle),
                    d = o(a.fontFamily, i.defaultFontFamily),
                    u = D.fontString(s, l, d),
                    h = (n.legendHitBoxes = []),
                    c = n.minSize,
                    f = n.isHorizontal();
                  if (
                    (f
                      ? ((c.width = n.maxWidth), (c.height = e ? 10 : 0))
                      : ((c.width = e ? 10 : 0), (c.height = n.maxHeight)),
                    e)
                  )
                    if (((r.font = u), f)) {
                      var g = (n.lineWidths = [0]),
                        p = n.legendItems.length ? s + a.padding : 0;
                      (r.textAlign = "left"),
                        (r.textBaseline = "top"),
                        D.each(n.legendItems, function (t, e) {
                          var i =
                            (a.usePointStyle ? s * Math.sqrt(2) : a.boxWidth) +
                            s / 2 +
                            r.measureText(t.text).width;
                          g[g.length - 1] + i + a.padding >= n.width &&
                            ((p += s + a.padding), (g[g.length] = n.left)),
                            (h[e] = { left: 0, top: 0, width: i, height: s }),
                            (g[g.length - 1] += i + a.padding);
                        }),
                        (c.height += p);
                    } else {
                      var m = a.padding,
                        v = (n.columnWidths = []),
                        b = a.padding,
                        y = 0,
                        x = 0,
                        k = s + m;
                      D.each(n.legendItems, function (t, e) {
                        var i =
                          (a.usePointStyle ? 2 * a.boxWidth : a.boxWidth) +
                          s / 2 +
                          r.measureText(t.text).width;
                        x + k > c.height &&
                          ((b += y + a.padding), v.push(y), (x = y = 0)),
                          (y = Math.max(y, i)),
                          (x += k),
                          (h[e] = { left: 0, top: 0, width: i, height: s });
                      }),
                        (b += y),
                        v.push(y),
                        (c.width += b);
                    }
                  (n.width = c.width), (n.height = c.height);
                },
                afterFit: t,
                isHorizontal: function () {
                  return (
                    "top" === this.options.position ||
                    "bottom" === this.options.position
                  );
                },
                draw: function () {
                  var u = this,
                    h = u.options,
                    c = h.labels,
                    f = M.defaults.global,
                    g = f.elements.line,
                    p = u.width,
                    m = u.lineWidths;
                  if (h.display) {
                    var v,
                      b = u.ctx,
                      y = D.getValueOrDefault,
                      t = y(c.fontColor, f.defaultFontColor),
                      x = y(c.fontSize, f.defaultFontSize),
                      e = y(c.fontStyle, f.defaultFontStyle),
                      i = y(c.fontFamily, f.defaultFontFamily),
                      n = D.fontString(x, e, i);
                    (b.textAlign = "left"),
                      (b.textBaseline = "top"),
                      (b.lineWidth = 0.5),
                      (b.strokeStyle = t),
                      (b.fillStyle = t),
                      (b.font = n);
                    var k = c.boxWidth,
                      S = u.legendHitBoxes,
                      w = u.isHorizontal();
                    v = w
                      ? {
                          x: u.left + (p - m[0]) / 2,
                          y: u.top + c.padding,
                          line: 0,
                        }
                      : {
                          x: u.left + c.padding,
                          y: u.top + c.padding,
                          line: 0,
                        };
                    var _ = x + c.padding;
                    D.each(u.legendItems, function (t, e) {
                      var i,
                        n,
                        a,
                        r,
                        o = b.measureText(t.text).width,
                        s = c.usePointStyle ? x + x / 2 + o : k + x / 2 + o,
                        l = v.x,
                        d = v.y;
                      w
                        ? p <= l + s &&
                          ((d = v.y += _),
                          v.line++,
                          (l = v.x = u.left + (p - m[v.line]) / 2))
                        : d + _ > u.bottom &&
                          ((l = v.x = l + u.columnWidths[v.line] + c.padding),
                          (d = v.y = u.top),
                          v.line++),
                        (function (t, e, i) {
                          if (!(isNaN(k) || k <= 0)) {
                            if (
                              (b.save(),
                              (b.fillStyle = y(i.fillStyle, f.defaultColor)),
                              (b.lineCap = y(i.lineCap, g.borderCapStyle)),
                              (b.lineDashOffset = y(
                                i.lineDashOffset,
                                g.borderDashOffset
                              )),
                              (b.lineJoin = y(i.lineJoin, g.borderJoinStyle)),
                              (b.lineWidth = y(i.lineWidth, g.borderWidth)),
                              (b.strokeStyle = y(
                                i.strokeStyle,
                                f.defaultColor
                              )),
                              b.setLineDash &&
                                b.setLineDash(y(i.lineDash, g.borderDash)),
                              h.labels && h.labels.usePointStyle)
                            ) {
                              var n = (x * Math.SQRT2) / 2,
                                a = n / Math.SQRT2,
                                r = t + a,
                                o = e + a;
                              M.canvasHelpers.drawPoint(
                                b,
                                i.pointStyle,
                                n,
                                r,
                                o
                              );
                            } else
                              b.strokeRect(t, e, k, x), b.fillRect(t, e, k, x);
                            b.restore();
                          }
                        })(l, d, t),
                        (S[e].left = l),
                        (S[e].top = d),
                        (i = l),
                        (n = d),
                        (a = t),
                        (r = o),
                        b.fillText(a.text, k + x / 2 + i, n),
                        a.hidden &&
                          (b.beginPath(),
                          (b.lineWidth = 2),
                          b.moveTo(k + x / 2 + i, n + x / 2),
                          b.lineTo(k + x / 2 + i + r, n + x / 2),
                          b.stroke()),
                        w ? (v.x += s + c.padding) : (v.y += _);
                    });
                  }
                },
                handleEvent: function (t) {
                  var e = this,
                    i = D.getRelativePosition(t, e.chart.chart),
                    n = i.x,
                    a = i.y,
                    r = e.options;
                  if (
                    n >= e.left &&
                    n <= e.right &&
                    a >= e.top &&
                    a <= e.bottom
                  )
                    for (var o = e.legendHitBoxes, s = 0; s < o.length; ++s) {
                      var l = o[s];
                      if (
                        n >= l.left &&
                        n <= l.left + l.width &&
                        a >= l.top &&
                        a <= l.top + l.height
                      ) {
                        r.onClick && r.onClick.call(e, t, e.legendItems[s]);
                        break;
                      }
                    }
                },
              })),
              M.plugins.register({
                beforeInit: function (t) {
                  var e = t.options.legend;
                  e &&
                    ((t.legend = new M.Legend({
                      ctx: t.chart.ctx,
                      options: e,
                      chart: t,
                    })),
                    M.layoutService.addBox(t, t.legend));
                },
              });
          };
        },
        {},
      ],
      30: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var e = t.helpers.noop;
            (t.plugins = {
              _plugins: [],
              register: function (t) {
                var e = this._plugins;
                [].concat(t).forEach(function (t) {
                  -1 === e.indexOf(t) && e.push(t);
                });
              },
              unregister: function (t) {
                var i = this._plugins;
                [].concat(t).forEach(function (t) {
                  var e = i.indexOf(t);
                  -1 !== e && i.splice(e, 1);
                });
              },
              clear: function () {
                this._plugins = [];
              },
              count: function () {
                return this._plugins.length;
              },
              getAll: function () {
                return this._plugins;
              },
              notify: function (t, e) {
                var i,
                  n,
                  a = this._plugins,
                  r = a.length;
                for (i = 0; i < r; ++i)
                  if (
                    "function" == typeof (n = a[i])[t] &&
                    !1 === n[t].apply(n, e || [])
                  )
                    return !1;
                return !0;
              },
            }),
              (t.PluginBase = t.Element.extend({
                beforeInit: e,
                afterInit: e,
                beforeUpdate: e,
                afterUpdate: e,
                beforeDraw: e,
                afterDraw: e,
                destroy: e,
              })),
              (t.pluginService = t.plugins);
          };
        },
        {},
      ],
      31: [
        function (t, e, i) {
          "use strict";
          e.exports = function (H) {
            var N = H.helpers;
            (H.defaults.scale = {
              display: !0,
              position: "left",
              gridLines: {
                display: !0,
                color: "rgba(0, 0, 0, 0.1)",
                lineWidth: 1,
                drawBorder: !0,
                drawOnChartArea: !0,
                drawTicks: !0,
                tickMarkLength: 10,
                zeroLineWidth: 1,
                zeroLineColor: "rgba(0,0,0,0.25)",
                offsetGridLines: !1,
              },
              scaleLabel: { labelString: "", display: !1 },
              ticks: {
                beginAtZero: !1,
                minRotation: 0,
                maxRotation: 50,
                mirror: !1,
                padding: 10,
                reverse: !1,
                display: !0,
                autoSkip: !0,
                autoSkipPadding: 0,
                labelOffset: 0,
                callback: function (t) {
                  return N.isArray(t) ? t : "" + t;
                },
              },
            }),
              (H.Scale = H.Element.extend({
                beforeUpdate: function () {
                  N.callCallback(this.options.beforeUpdate, [this]);
                },
                update: function (t, e, i) {
                  var n = this;
                  return (
                    n.beforeUpdate(),
                    (n.maxWidth = t),
                    (n.maxHeight = e),
                    (n.margins = N.extend(
                      { left: 0, right: 0, top: 0, bottom: 0 },
                      i
                    )),
                    n.beforeSetDimensions(),
                    n.setDimensions(),
                    n.afterSetDimensions(),
                    n.beforeDataLimits(),
                    n.determineDataLimits(),
                    n.afterDataLimits(),
                    n.beforeBuildTicks(),
                    n.buildTicks(),
                    n.afterBuildTicks(),
                    n.beforeTickToLabelConversion(),
                    n.convertTicksToLabels(),
                    n.afterTickToLabelConversion(),
                    n.beforeCalculateTickRotation(),
                    n.calculateTickRotation(),
                    n.afterCalculateTickRotation(),
                    n.beforeFit(),
                    n.fit(),
                    n.afterFit(),
                    n.afterUpdate(),
                    n.minSize
                  );
                },
                afterUpdate: function () {
                  N.callCallback(this.options.afterUpdate, [this]);
                },
                beforeSetDimensions: function () {
                  N.callCallback(this.options.beforeSetDimensions, [this]);
                },
                setDimensions: function () {
                  var t = this;
                  t.isHorizontal()
                    ? ((t.width = t.maxWidth),
                      (t.left = 0),
                      (t.right = t.width))
                    : ((t.height = t.maxHeight),
                      (t.top = 0),
                      (t.bottom = t.height)),
                    (t.paddingLeft = 0),
                    (t.paddingTop = 0),
                    (t.paddingRight = 0),
                    (t.paddingBottom = 0);
                },
                afterSetDimensions: function () {
                  N.callCallback(this.options.afterSetDimensions, [this]);
                },
                beforeDataLimits: function () {
                  N.callCallback(this.options.beforeDataLimits, [this]);
                },
                determineDataLimits: N.noop,
                afterDataLimits: function () {
                  N.callCallback(this.options.afterDataLimits, [this]);
                },
                beforeBuildTicks: function () {
                  N.callCallback(this.options.beforeBuildTicks, [this]);
                },
                buildTicks: N.noop,
                afterBuildTicks: function () {
                  N.callCallback(this.options.afterBuildTicks, [this]);
                },
                beforeTickToLabelConversion: function () {
                  N.callCallback(this.options.beforeTickToLabelConversion, [
                    this,
                  ]);
                },
                convertTicksToLabels: function () {
                  var n = this;
                  n.ticks = n.ticks.map(function (t, e, i) {
                    return n.options.ticks.userCallback
                      ? n.options.ticks.userCallback(t, e, i)
                      : n.options.ticks.callback(t, e, i);
                  }, n);
                },
                afterTickToLabelConversion: function () {
                  N.callCallback(this.options.afterTickToLabelConversion, [
                    this,
                  ]);
                },
                beforeCalculateTickRotation: function () {
                  N.callCallback(this.options.beforeCalculateTickRotation, [
                    this,
                  ]);
                },
                calculateTickRotation: function () {
                  var t = this,
                    e = t.ctx,
                    i = H.defaults.global,
                    n = t.options.ticks,
                    a = N.getValueOrDefault(n.fontSize, i.defaultFontSize),
                    r = N.getValueOrDefault(n.fontStyle, i.defaultFontStyle),
                    o = N.getValueOrDefault(n.fontFamily, i.defaultFontFamily),
                    s = N.fontString(a, r, o);
                  e.font = s;
                  var l,
                    d = e.measureText(t.ticks[0]).width,
                    u = e.measureText(t.ticks[t.ticks.length - 1]).width;
                  if (
                    ((t.labelRotation = n.minRotation || 0),
                    (t.paddingRight = 0),
                    (t.paddingLeft = 0),
                    t.options.display && t.isHorizontal())
                  ) {
                    (t.paddingRight = u / 2 + 3),
                      (t.paddingLeft = d / 2 + 3),
                      t.longestTextCache || (t.longestTextCache = {});
                    for (
                      var h,
                        c,
                        f = N.longestText(e, s, t.ticks, t.longestTextCache),
                        g = f,
                        p = t.getPixelForTick(1) - t.getPixelForTick(0) - 6;
                      p < g && t.labelRotation < n.maxRotation;

                    ) {
                      if (
                        ((h = Math.cos(N.toRadians(t.labelRotation))),
                        (c = Math.sin(N.toRadians(t.labelRotation))),
                        (l = h * d) + a / 2 > t.yLabelWidth &&
                          (t.paddingLeft = l + a / 2),
                        (t.paddingRight = a / 2),
                        c * f > t.maxHeight)
                      ) {
                        t.labelRotation--;
                        break;
                      }
                      t.labelRotation++, (g = h * f);
                    }
                  }
                  t.margins &&
                    ((t.paddingLeft = Math.max(
                      t.paddingLeft - t.margins.left,
                      0
                    )),
                    (t.paddingRight = Math.max(
                      t.paddingRight - t.margins.right,
                      0
                    )));
                },
                afterCalculateTickRotation: function () {
                  N.callCallback(this.options.afterCalculateTickRotation, [
                    this,
                  ]);
                },
                beforeFit: function () {
                  N.callCallback(this.options.beforeFit, [this]);
                },
                fit: function () {
                  var t = this,
                    e = (t.minSize = { width: 0, height: 0 }),
                    i = t.options,
                    n = H.defaults.global,
                    a = i.ticks,
                    r = i.scaleLabel,
                    o = i.display,
                    s = t.isHorizontal(),
                    l = N.getValueOrDefault(a.fontSize, n.defaultFontSize),
                    d = N.getValueOrDefault(a.fontStyle, n.defaultFontStyle),
                    u = N.getValueOrDefault(a.fontFamily, n.defaultFontFamily),
                    h = N.fontString(l, d, u),
                    c = N.getValueOrDefault(r.fontSize, n.defaultFontSize),
                    f = i.gridLines.tickMarkLength;
                  if (
                    ((e.width = s
                      ? t.isFullWidth()
                        ? t.maxWidth - t.margins.left - t.margins.right
                        : t.maxWidth
                      : o
                      ? f
                      : 0),
                    (e.height = s ? (o ? f : 0) : t.maxHeight),
                    r.display &&
                      o &&
                      (s ? (e.height += 1.5 * c) : (e.width += 1.5 * c)),
                    a.display && o)
                  ) {
                    t.longestTextCache || (t.longestTextCache = {});
                    var g = N.longestText(
                        t.ctx,
                        h,
                        t.ticks,
                        t.longestTextCache
                      ),
                      p = N.numberOfLabelLines(t.ticks),
                      m = 0.5 * l;
                    if (s) {
                      t.longestLabelWidth = g;
                      var v =
                        Math.sin(N.toRadians(t.labelRotation)) *
                          t.longestLabelWidth +
                        l * p +
                        m * p;
                      (e.height = Math.min(t.maxHeight, e.height + v)),
                        (t.ctx.font = h);
                      var b = t.ctx.measureText(t.ticks[0]).width,
                        y = t.ctx.measureText(
                          t.ticks[t.ticks.length - 1]
                        ).width,
                        x = Math.cos(N.toRadians(t.labelRotation)),
                        k = Math.sin(N.toRadians(t.labelRotation));
                      (t.paddingLeft =
                        0 !== t.labelRotation ? x * b + 3 : b / 2 + 3),
                        (t.paddingRight =
                          0 !== t.labelRotation ? k * (l / 2) + 3 : y / 2 + 3);
                    } else {
                      var S = t.maxWidth - e.width;
                      a.mirror ? (g = 0) : (g += t.options.ticks.padding),
                        g < S ? (e.width += g) : (e.width = t.maxWidth),
                        (t.paddingTop = l / 2),
                        (t.paddingBottom = l / 2);
                    }
                  }
                  t.margins &&
                    ((t.paddingLeft = Math.max(
                      t.paddingLeft - t.margins.left,
                      0
                    )),
                    (t.paddingTop = Math.max(t.paddingTop - t.margins.top, 0)),
                    (t.paddingRight = Math.max(
                      t.paddingRight - t.margins.right,
                      0
                    )),
                    (t.paddingBottom = Math.max(
                      t.paddingBottom - t.margins.bottom,
                      0
                    ))),
                    (t.width = e.width),
                    (t.height = e.height);
                },
                afterFit: function () {
                  N.callCallback(this.options.afterFit, [this]);
                },
                isHorizontal: function () {
                  return (
                    "top" === this.options.position ||
                    "bottom" === this.options.position
                  );
                },
                isFullWidth: function () {
                  return this.options.fullWidth;
                },
                getRightValue: function (t) {
                  return null == t
                    ? NaN
                    : "number" == typeof t && isNaN(t)
                    ? NaN
                    : "object" == typeof t
                    ? t instanceof Date || t.isValid
                      ? t
                      : this.getRightValue(this.isHorizontal() ? t.x : t.y)
                    : t;
                },
                getLabelForIndex: N.noop,
                getPixelForValue: N.noop,
                getValueForPixel: N.noop,
                getPixelForTick: function (t, e) {
                  var i = this;
                  if (i.isHorizontal()) {
                    var n =
                        (i.width - (i.paddingLeft + i.paddingRight)) /
                        Math.max(
                          i.ticks.length -
                            (i.options.gridLines.offsetGridLines ? 0 : 1),
                          1
                        ),
                      a = n * t + i.paddingLeft;
                    e && (a += n / 2);
                    var r = i.left + Math.round(a);
                    return (r += i.isFullWidth() ? i.margins.left : 0);
                  }
                  var o = i.height - (i.paddingTop + i.paddingBottom);
                  return i.top + t * (o / (i.ticks.length - 1));
                },
                getPixelForDecimal: function (t) {
                  var e = this;
                  if (e.isHorizontal()) {
                    var i =
                        (e.width - (e.paddingLeft + e.paddingRight)) * t +
                        e.paddingLeft,
                      n = e.left + Math.round(i);
                    return (n += e.isFullWidth() ? e.margins.left : 0);
                  }
                  return e.top + t * e.height;
                },
                getBasePixel: function () {
                  var t = this.min,
                    e = this.max;
                  return this.getPixelForValue(
                    this.beginAtZero
                      ? 0
                      : t < 0 && e < 0
                      ? e
                      : 0 < t && 0 < e
                      ? t
                      : 0
                  );
                },
                draw: function (y) {
                  var x = this,
                    k = x.options;
                  if (k.display) {
                    var S,
                      t,
                      a = x.ctx,
                      e = H.defaults.global,
                      w = k.ticks,
                      _ = k.gridLines,
                      i = k.scaleLabel,
                      M = 0 !== x.labelRotation,
                      n = w.autoSkip,
                      D = x.isHorizontal();
                    w.maxTicksLimit && (t = w.maxTicksLimit);
                    var r = N.getValueOrDefault(
                        w.fontColor,
                        e.defaultFontColor
                      ),
                      o = N.getValueOrDefault(w.fontSize, e.defaultFontSize),
                      s = N.getValueOrDefault(w.fontStyle, e.defaultFontStyle),
                      l = N.getValueOrDefault(
                        w.fontFamily,
                        e.defaultFontFamily
                      ),
                      d = N.fontString(o, s, l),
                      C = _.tickMarkLength,
                      u = N.getValueOrDefault(i.fontColor, e.defaultFontColor),
                      h = N.getValueOrDefault(i.fontSize, e.defaultFontSize),
                      c = N.getValueOrDefault(i.fontStyle, e.defaultFontStyle),
                      f = N.getValueOrDefault(
                        i.fontFamily,
                        e.defaultFontFamily
                      ),
                      g = N.fontString(h, c, f),
                      T = N.toRadians(x.labelRotation),
                      p = Math.cos(T),
                      m = x.longestLabelWidth * p;
                    a.fillStyle = r;
                    var P = [];
                    if (D) {
                      if (
                        ((S = !1),
                        M && (m /= 2),
                        (m + w.autoSkipPadding) * x.ticks.length >
                          x.width - (x.paddingLeft + x.paddingRight) &&
                          (S =
                            1 +
                            Math.floor(
                              ((m + w.autoSkipPadding) * x.ticks.length) /
                                (x.width - (x.paddingLeft + x.paddingRight))
                            )),
                        t && x.ticks.length > t)
                      )
                        for (; !S || x.ticks.length / (S || 1) > t; )
                          S || (S = 1), (S += 1);
                      n || (S = !1);
                    }
                    var F = "right" === k.position ? x.left : x.right - C,
                      A = "right" === k.position ? x.left + C : x.right,
                      I = "bottom" === k.position ? x.top : x.bottom - C,
                      O = "bottom" === k.position ? x.top + C : x.bottom;
                    if (
                      (N.each(x.ticks, function (t, e) {
                        if (null != t) {
                          var i = x.ticks.length === e + 1;
                          if (
                            (!(
                              (1 < S && 0 < e % S) ||
                              (e % S == 0 && e + S >= x.ticks.length)
                            ) ||
                              i) &&
                            null != t
                          ) {
                            var n, a, r, o, s, l, d, u, h, c, f, g;
                            a =
                              e ===
                              (void 0 !== x.zeroLineIndex ? x.zeroLineIndex : 0)
                                ? ((n = _.zeroLineWidth), _.zeroLineColor)
                                : ((n = N.getValueAtIndexOrDefault(
                                    _.lineWidth,
                                    e
                                  )),
                                  N.getValueAtIndexOrDefault(_.color, e));
                            var p,
                              m = "middle";
                            if (D) {
                              M ||
                                (m = "top" === k.position ? "bottom" : "top"),
                                (p = M ? "right" : "center");
                              var v = x.getPixelForTick(e) + N.aliasPixel(n);
                              (f =
                                x.getPixelForTick(e, _.offsetGridLines) +
                                w.labelOffset),
                                (g = M
                                  ? x.top + 12
                                  : "top" === k.position
                                  ? x.bottom - C
                                  : x.top + C),
                                (r = s = d = h = v),
                                (o = I),
                                (l = O),
                                (u = y.top),
                                (c = y.bottom);
                            } else {
                              p =
                                "left" === k.position
                                  ? w.mirror
                                    ? ((f = x.right + w.padding), "left")
                                    : ((f = x.right - w.padding), "right")
                                  : w.mirror
                                  ? ((f = x.left - w.padding), "right")
                                  : ((f = x.left + w.padding), "left");
                              var b = x.getPixelForTick(e);
                              (b += N.aliasPixel(n)),
                                (g = x.getPixelForTick(e, _.offsetGridLines)),
                                (r = F),
                                (s = A),
                                (d = y.left),
                                (h = y.right),
                                (o = l = u = c = b);
                            }
                            P.push({
                              tx1: r,
                              ty1: o,
                              tx2: s,
                              ty2: l,
                              x1: d,
                              y1: u,
                              x2: h,
                              y2: c,
                              labelX: f,
                              labelY: g,
                              glWidth: n,
                              glColor: a,
                              rotation: -1 * T,
                              label: t,
                              textBaseline: m,
                              textAlign: p,
                            });
                          }
                        }
                      }),
                      N.each(P, function (t) {
                        if (
                          (_.display &&
                            ((a.lineWidth = t.glWidth),
                            (a.strokeStyle = t.glColor),
                            a.beginPath(),
                            _.drawTicks &&
                              (a.moveTo(t.tx1, t.ty1), a.lineTo(t.tx2, t.ty2)),
                            _.drawOnChartArea &&
                              (a.moveTo(t.x1, t.y1), a.lineTo(t.x2, t.y2)),
                            a.stroke()),
                          w.display)
                        ) {
                          a.save(),
                            a.translate(t.labelX, t.labelY),
                            a.rotate(t.rotation),
                            (a.font = d),
                            (a.textBaseline = t.textBaseline),
                            (a.textAlign = t.textAlign);
                          var e = t.label;
                          if (N.isArray(e))
                            for (var i = 0, n = 0; i < e.length; ++i)
                              a.fillText("" + e[i], 0, n), (n += 1.5 * o);
                          else a.fillText(e, 0, 0);
                          a.restore();
                        }
                      }),
                      i.display)
                    ) {
                      var v,
                        b,
                        R = 0;
                      if (D)
                        (v = x.left + (x.right - x.left) / 2),
                          (b =
                            "bottom" === k.position
                              ? x.bottom - h / 2
                              : x.top + h / 2);
                      else {
                        var W = "left" === k.position;
                        (v = W ? x.left + h / 2 : x.right - h / 2),
                          (b = x.top + (x.bottom - x.top) / 2),
                          (R = W ? -0.5 * Math.PI : 0.5 * Math.PI);
                      }
                      a.save(),
                        a.translate(v, b),
                        a.rotate(R),
                        (a.textAlign = "center"),
                        (a.textBaseline = "middle"),
                        (a.fillStyle = u),
                        (a.font = g),
                        a.fillText(i.labelString, 0, 0),
                        a.restore();
                    }
                    if (_.drawBorder) {
                      (a.lineWidth = N.getValueAtIndexOrDefault(
                        _.lineWidth,
                        0
                      )),
                        (a.strokeStyle = N.getValueAtIndexOrDefault(
                          _.color,
                          0
                        ));
                      var L = x.left,
                        V = x.right,
                        B = x.top,
                        Y = x.bottom,
                        z = N.aliasPixel(a.lineWidth);
                      D
                        ? ((B = Y = "top" === k.position ? x.bottom : x.top),
                          (B += z),
                          (Y += z))
                        : ((L = V = "left" === k.position ? x.right : x.left),
                          (L += z),
                          (V += z)),
                        a.beginPath(),
                        a.moveTo(L, B),
                        a.lineTo(V, Y),
                        a.stroke();
                    }
                  }
                },
              }));
          };
        },
        {},
      ],
      32: [
        function (t, e, i) {
          "use strict";
          e.exports = function (i) {
            var n = i.helpers;
            i.scaleService = {
              constructors: {},
              defaults: {},
              registerScaleType: function (t, e, i) {
                (this.constructors[t] = e), (this.defaults[t] = n.clone(i));
              },
              getScaleConstructor: function (t) {
                return this.constructors.hasOwnProperty(t)
                  ? this.constructors[t]
                  : void 0;
              },
              getScaleDefaults: function (t) {
                return this.defaults.hasOwnProperty(t)
                  ? n.scaleMerge(i.defaults.scale, this.defaults[t])
                  : {};
              },
              updateScaleDefaults: function (t, e) {
                var i = this.defaults;
                i.hasOwnProperty(t) && (i[t] = n.extend(i[t], e));
              },
              addScalesToLayout: function (e) {
                n.each(e.scales, function (t) {
                  i.layoutService.addBox(e, t);
                });
              },
            };
          };
        },
        {},
      ],
      33: [
        function (t, e, i) {
          "use strict";
          e.exports = function (m) {
            var v = m.helpers;
            m.defaults.global.title = {
              display: !1,
              position: "top",
              fullWidth: !0,
              fontStyle: "bold",
              padding: 10,
              text: "",
            };
            var t = v.noop;
            (m.Title = m.Element.extend({
              initialize: function (t) {
                v.extend(this, t),
                  (this.options = v.configMerge(
                    m.defaults.global.title,
                    t.options
                  )),
                  (this.legendHitBoxes = []);
              },
              beforeUpdate: function () {
                var t = this.chart.options;
                t &&
                  t.title &&
                  (this.options = v.configMerge(
                    m.defaults.global.title,
                    t.title
                  ));
              },
              update: function (t, e, i) {
                var n = this;
                return (
                  n.beforeUpdate(),
                  (n.maxWidth = t),
                  (n.maxHeight = e),
                  (n.margins = i),
                  n.beforeSetDimensions(),
                  n.setDimensions(),
                  n.afterSetDimensions(),
                  n.beforeBuildLabels(),
                  n.buildLabels(),
                  n.afterBuildLabels(),
                  n.beforeFit(),
                  n.fit(),
                  n.afterFit(),
                  n.afterUpdate(),
                  n.minSize
                );
              },
              afterUpdate: t,
              beforeSetDimensions: t,
              setDimensions: function () {
                var t = this;
                t.isHorizontal()
                  ? ((t.width = t.maxWidth), (t.left = 0), (t.right = t.width))
                  : ((t.height = t.maxHeight),
                    (t.top = 0),
                    (t.bottom = t.height)),
                  (t.paddingLeft = 0),
                  (t.paddingTop = 0),
                  (t.paddingRight = 0),
                  (t.paddingBottom = 0),
                  (t.minSize = { width: 0, height: 0 });
              },
              afterSetDimensions: t,
              beforeBuildLabels: t,
              buildLabels: t,
              afterBuildLabels: t,
              beforeFit: t,
              fit: function () {
                var t = this,
                  e = v.getValueOrDefault,
                  i = t.options,
                  n = m.defaults.global,
                  a = i.display,
                  r = e(i.fontSize, n.defaultFontSize),
                  o = t.minSize;
                t.isHorizontal()
                  ? ((o.width = t.maxWidth),
                    (o.height = a ? r + 2 * i.padding : 0))
                  : ((o.width = a ? r + 2 * i.padding : 0),
                    (o.height = t.maxHeight)),
                  (t.width = o.width),
                  (t.height = o.height);
              },
              afterFit: t,
              isHorizontal: function () {
                var t = this.options.position;
                return "top" === t || "bottom" === t;
              },
              draw: function () {
                var t = this,
                  e = t.ctx,
                  i = v.getValueOrDefault,
                  n = t.options,
                  a = m.defaults.global;
                if (n.display) {
                  var r,
                    o,
                    s = i(n.fontSize, a.defaultFontSize),
                    l = i(n.fontStyle, a.defaultFontStyle),
                    d = i(n.fontFamily, a.defaultFontFamily),
                    u = v.fontString(s, l, d),
                    h = 0,
                    c = t.top,
                    f = t.left,
                    g = t.bottom,
                    p = t.right;
                  (e.fillStyle = i(n.fontColor, a.defaultFontColor)),
                    (e.font = u),
                    t.isHorizontal()
                      ? ((r = f + (p - f) / 2), (o = c + (g - c) / 2))
                      : ((r = "left" === n.position ? f + s / 2 : p - s / 2),
                        (o = c + (g - c) / 2),
                        (h = Math.PI * ("left" === n.position ? -0.5 : 0.5))),
                    e.save(),
                    e.translate(r, o),
                    e.rotate(h),
                    (e.textAlign = "center"),
                    (e.textBaseline = "middle"),
                    e.fillText(n.text, 0, 0),
                    e.restore();
                }
              },
            })),
              m.plugins.register({
                beforeInit: function (t) {
                  var e = t.options.title;
                  e &&
                    ((t.titleBlock = new m.Title({
                      ctx: t.chart.ctx,
                      options: e,
                      chart: t,
                    })),
                    m.layoutService.addBox(t, t.titleBlock));
                },
              });
          };
        },
        {},
      ],
      34: [
        function (t, e, i) {
          "use strict";
          e.exports = function (n) {
            var x = n.helpers;
            function o(t, e) {
              return (
                e &&
                  (x.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)),
                t
              );
            }
            (n.defaults.global.tooltips = {
              enabled: !0,
              custom: null,
              mode: "single",
              backgroundColor: "rgba(0,0,0,0.8)",
              titleFontStyle: "bold",
              titleSpacing: 2,
              titleMarginBottom: 6,
              titleFontColor: "#fff",
              titleAlign: "left",
              bodySpacing: 2,
              bodyFontColor: "#fff",
              bodyAlign: "left",
              footerFontStyle: "bold",
              footerSpacing: 2,
              footerMarginTop: 6,
              footerFontColor: "#fff",
              footerAlign: "left",
              yPadding: 6,
              xPadding: 6,
              yAlign: "center",
              xAlign: "center",
              caretSize: 5,
              cornerRadius: 6,
              multiKeyBackground: "#fff",
              callbacks: {
                beforeTitle: x.noop,
                title: function (t, e) {
                  var i = "",
                    n = e.labels,
                    a = n ? n.length : 0;
                  if (0 < t.length) {
                    var r = t[0];
                    r.xLabel
                      ? (i = r.xLabel)
                      : 0 < a && r.index < a && (i = n[r.index]);
                  }
                  return i;
                },
                afterTitle: x.noop,
                beforeBody: x.noop,
                beforeLabel: x.noop,
                label: function (t, e) {
                  return (
                    (e.datasets[t.datasetIndex].label || "") + ": " + t.yLabel
                  );
                },
                labelColor: function (t, e) {
                  var i = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;
                  return {
                    borderColor: i.borderColor,
                    backgroundColor: i.backgroundColor,
                  };
                },
                afterLabel: x.noop,
                afterBody: x.noop,
                beforeFooter: x.noop,
                footer: x.noop,
                afterFooter: x.noop,
              },
            }),
              (n.Tooltip = n.Element.extend({
                initialize: function () {
                  var t = n.defaults.global,
                    e = this._options,
                    i = x.getValueOrDefault;
                  x.extend(this, {
                    _model: {
                      xPadding: e.xPadding,
                      yPadding: e.yPadding,
                      xAlign: e.xAlign,
                      yAlign: e.yAlign,
                      bodyFontColor: e.bodyFontColor,
                      _bodyFontFamily: i(e.bodyFontFamily, t.defaultFontFamily),
                      _bodyFontStyle: i(e.bodyFontStyle, t.defaultFontStyle),
                      _bodyAlign: e.bodyAlign,
                      bodyFontSize: i(e.bodyFontSize, t.defaultFontSize),
                      bodySpacing: e.bodySpacing,
                      titleFontColor: e.titleFontColor,
                      _titleFontFamily: i(
                        e.titleFontFamily,
                        t.defaultFontFamily
                      ),
                      _titleFontStyle: i(e.titleFontStyle, t.defaultFontStyle),
                      titleFontSize: i(e.titleFontSize, t.defaultFontSize),
                      _titleAlign: e.titleAlign,
                      titleSpacing: e.titleSpacing,
                      titleMarginBottom: e.titleMarginBottom,
                      footerFontColor: e.footerFontColor,
                      _footerFontFamily: i(
                        e.footerFontFamily,
                        t.defaultFontFamily
                      ),
                      _footerFontStyle: i(
                        e.footerFontStyle,
                        t.defaultFontStyle
                      ),
                      footerFontSize: i(e.footerFontSize, t.defaultFontSize),
                      _footerAlign: e.footerAlign,
                      footerSpacing: e.footerSpacing,
                      footerMarginTop: e.footerMarginTop,
                      caretSize: e.caretSize,
                      cornerRadius: e.cornerRadius,
                      backgroundColor: e.backgroundColor,
                      opacity: 0,
                      legendColorBackground: e.multiKeyBackground,
                    },
                  });
                },
                getTitle: function () {
                  var t = this._options.callbacks,
                    e = t.beforeTitle.apply(this, arguments),
                    i = t.title.apply(this, arguments),
                    n = t.afterTitle.apply(this, arguments),
                    a = [];
                  return (a = o((a = o((a = o(a, e)), i)), n));
                },
                getBeforeBody: function () {
                  var t = this._options.callbacks.beforeBody.apply(
                    this,
                    arguments
                  );
                  return x.isArray(t) ? t : void 0 !== t ? [t] : [];
                },
                getBody: function (t, i) {
                  var n = this,
                    a = n._options.callbacks,
                    r = [];
                  return (
                    x.each(t, function (t) {
                      var e = { before: [], lines: [], after: [] };
                      o(e.before, a.beforeLabel.call(n, t, i)),
                        o(e.lines, a.label.call(n, t, i)),
                        o(e.after, a.afterLabel.call(n, t, i)),
                        r.push(e);
                    }),
                    r
                  );
                },
                getAfterBody: function () {
                  var t = this._options.callbacks.afterBody.apply(
                    this,
                    arguments
                  );
                  return x.isArray(t) ? t : void 0 !== t ? [t] : [];
                },
                getFooter: function () {
                  var t = this._options.callbacks,
                    e = t.beforeFooter.apply(this, arguments),
                    i = t.footer.apply(this, arguments),
                    n = t.afterFooter.apply(this, arguments),
                    a = [];
                  return (a = o((a = o((a = o(a, e)), i)), n));
                },
                update: function (t) {
                  var e,
                    i,
                    n,
                    a,
                    r,
                    o,
                    s,
                    l = this,
                    d = l._options,
                    u = l._model,
                    h = l._active,
                    c = l._data,
                    f = l._chartInstance;
                  if (h.length) {
                    u.opacity = 1;
                    var g = [],
                      p = (function (t) {
                        if (!t.length) return !1;
                        var e,
                          i,
                          n = [],
                          a = [];
                        for (e = 0, i = t.length; e < i; ++e) {
                          var r = t[e];
                          if (r && r.hasValue()) {
                            var o = r.tooltipPosition();
                            n.push(o.x), a.push(o.y);
                          }
                        }
                        var s = 0,
                          l = 0;
                        for (e = 0; e < n.length; ++e)
                          n[e] && ((s += n[e]), (l += a[e]));
                        return {
                          x: Math.round(s / n.length),
                          y: Math.round(l / n.length),
                        };
                      })(h),
                      m = [];
                    for (e = 0, i = h.length; e < i; ++e)
                      m.push(
                        ((n = h[e]),
                        (r = a = void 0),
                        (a = n._xScale),
                        (r = n._yScale || n._scale),
                        (o = n._index),
                        (s = n._datasetIndex),
                        {
                          xLabel: a ? a.getLabelForIndex(o, s) : "",
                          yLabel: r ? r.getLabelForIndex(o, s) : "",
                          index: o,
                          datasetIndex: s,
                        })
                      );
                    d.itemSort && (m = m.sort(d.itemSort)),
                      1 < h.length &&
                        x.each(m, function (t) {
                          g.push(d.callbacks.labelColor.call(l, t, f));
                        }),
                      x.extend(u, {
                        title: l.getTitle(m, c),
                        beforeBody: l.getBeforeBody(m, c),
                        body: l.getBody(m, c),
                        afterBody: l.getAfterBody(m, c),
                        footer: l.getFooter(m, c),
                        x: Math.round(p.x),
                        y: Math.round(p.y),
                        caretPadding: x.getValueOrDefault(p.padding, 2),
                        labelColors: g,
                      });
                    var v = l.getTooltipSize(u);
                    l.determineAlignment(v),
                      x.extend(u, l.getBackgroundPoint(u, v));
                  } else l._model.opacity = 0;
                  return t && d.custom && d.custom.call(l, u), l;
                },
                getTooltipSize: function (t) {
                  var e = this._chart.ctx,
                    i = { height: 2 * t.yPadding, width: 0 },
                    n = t.body,
                    a = n.reduce(function (t, e) {
                      return (
                        t + e.before.length + e.lines.length + e.after.length
                      );
                    }, 0);
                  a += t.beforeBody.length + t.afterBody.length;
                  var r = t.title.length,
                    o = t.footer.length,
                    s = t.titleFontSize,
                    l = t.bodyFontSize,
                    d = t.footerFontSize;
                  (i.height += r * s),
                    (i.height += (r - 1) * t.titleSpacing),
                    (i.height += r ? t.titleMarginBottom : 0),
                    (i.height += a * l),
                    (i.height += a ? (a - 1) * t.bodySpacing : 0),
                    (i.height += o ? t.footerMarginTop : 0),
                    (i.height += o * d),
                    (i.height += o ? (o - 1) * t.footerSpacing : 0);
                  var u = 0,
                    h = function (t) {
                      i.width = Math.max(i.width, e.measureText(t).width + u);
                    };
                  return (
                    (e.font = x.fontString(
                      s,
                      t._titleFontStyle,
                      t._titleFontFamily
                    )),
                    x.each(t.title, h),
                    (e.font = x.fontString(
                      l,
                      t._bodyFontStyle,
                      t._bodyFontFamily
                    )),
                    x.each(t.beforeBody.concat(t.afterBody), h),
                    (u = 1 < n.length ? l + 2 : 0),
                    x.each(n, function (t) {
                      x.each(t.before, h),
                        x.each(t.lines, h),
                        x.each(t.after, h);
                    }),
                    (u = 0),
                    (e.font = x.fontString(
                      d,
                      t._footerFontStyle,
                      t._footerFontFamily
                    )),
                    x.each(t.footer, h),
                    (i.width += 2 * t.xPadding),
                    i
                  );
                },
                determineAlignment: function (e) {
                  var t,
                    i,
                    n,
                    a,
                    r,
                    o = this._model,
                    s = this._chart,
                    l = this._chartInstance.chartArea;
                  o.y < e.height
                    ? (o.yAlign = "top")
                    : o.y > s.height - e.height && (o.yAlign = "bottom");
                  var d = (l.left + l.right) / 2,
                    u = (l.top + l.bottom) / 2;
                  (i =
                    "center" === o.yAlign
                      ? ((t = function (t) {
                          return t <= d;
                        }),
                        function (t) {
                          return d < t;
                        })
                      : ((t = function (t) {
                          return t <= e.width / 2;
                        }),
                        function (t) {
                          return t >= s.width - e.width / 2;
                        })),
                    (n = function (t) {
                      return t + e.width > s.width;
                    }),
                    (a = function (t) {
                      return t - e.width < 0;
                    }),
                    (r = function (t) {
                      return t <= u ? "top" : "bottom";
                    }),
                    t(o.x)
                      ? ((o.xAlign = "left"),
                        n(o.x) && ((o.xAlign = "center"), (o.yAlign = r(o.y))))
                      : i(o.x) &&
                        ((o.xAlign = "right"),
                        a(o.x) && ((o.xAlign = "center"), (o.yAlign = r(o.y))));
                },
                getBackgroundPoint: function (t, e) {
                  var i = { x: t.x, y: t.y },
                    n = t.caretSize,
                    a = t.caretPadding,
                    r = t.cornerRadius,
                    o = t.xAlign,
                    s = t.yAlign,
                    l = n + a,
                    d = r + a;
                  return (
                    "right" === o
                      ? (i.x -= e.width)
                      : "center" === o && (i.x -= e.width / 2),
                    "top" === s
                      ? (i.y += l)
                      : (i.y -= "bottom" === s ? e.height + l : e.height / 2),
                    "center" === s
                      ? "left" === o
                        ? (i.x += l)
                        : "right" === o && (i.x -= l)
                      : "left" === o
                      ? (i.x -= d)
                      : "right" === o && (i.x += d),
                    i
                  );
                },
                drawCaret: function (t, e, i) {
                  var n,
                    a,
                    r,
                    o,
                    s,
                    l,
                    d = this._view,
                    u = this._chart.ctx,
                    h = d.caretSize,
                    c = d.cornerRadius,
                    f = d.xAlign,
                    g = d.yAlign,
                    p = t.x,
                    m = t.y,
                    v = e.width,
                    b = e.height;
                  l =
                    "center" === g
                      ? ((r =
                          ((a = "left" === f ? (n = p) - h : (n = p + v) + h),
                          n)),
                        (o = (s = m + b / 2) - h),
                        s + h)
                      : ((r =
                          "left" === f
                            ? (a = (n = p + c) + h) + h
                            : "right" === f
                            ? (a = (n = p + v - c) - h) - h
                            : ((n = (a = p + v / 2) - h), a + h)),
                        (s = "top" === g ? (o = m) - h : (o = m + b) + h),
                        o);
                  var y = x.color(d.backgroundColor);
                  (u.fillStyle = y.alpha(i * y.alpha()).rgbString()),
                    u.beginPath(),
                    u.moveTo(n, o),
                    u.lineTo(a, s),
                    u.lineTo(r, l),
                    u.closePath(),
                    u.fill();
                },
                drawTitle: function (t, e, i, n) {
                  var a = e.title;
                  if (a.length) {
                    (i.textAlign = e._titleAlign), (i.textBaseline = "top");
                    var r,
                      o,
                      s = e.titleFontSize,
                      l = e.titleSpacing,
                      d = x.color(e.titleFontColor);
                    for (
                      i.fillStyle = d.alpha(n * d.alpha()).rgbString(),
                        i.font = x.fontString(
                          s,
                          e._titleFontStyle,
                          e._titleFontFamily
                        ),
                        r = 0,
                        o = a.length;
                      r < o;
                      ++r
                    )
                      i.fillText(a[r], t.x, t.y),
                        (t.y += s + l),
                        r + 1 === a.length && (t.y += e.titleMarginBottom - l);
                  }
                },
                drawBody: function (i, n, a, r) {
                  var o = n.bodyFontSize,
                    e = n.bodySpacing,
                    t = n.body;
                  (a.textAlign = n._bodyAlign), (a.textBaseline = "top");
                  var s = x.color(n.bodyFontColor),
                    l = s.alpha(r * s.alpha()).rgbString();
                  (a.fillStyle = l),
                    (a.font = x.fontString(
                      o,
                      n._bodyFontStyle,
                      n._bodyFontFamily
                    ));
                  var d = 0,
                    u = function (t) {
                      a.fillText(t, i.x + d, i.y), (i.y += o + e);
                    };
                  x.each(n.beforeBody, u);
                  var h = 1 < t.length;
                  (d = h ? o + 2 : 0),
                    x.each(t, function (t, e) {
                      x.each(t.before, u),
                        x.each(t.lines, function (t) {
                          h &&
                            ((a.fillStyle = x
                              .color(n.legendColorBackground)
                              .alpha(r)
                              .rgbaString()),
                            a.fillRect(i.x, i.y, o, o),
                            (a.strokeStyle = x
                              .color(n.labelColors[e].borderColor)
                              .alpha(r)
                              .rgbaString()),
                            a.strokeRect(i.x, i.y, o, o),
                            (a.fillStyle = x
                              .color(n.labelColors[e].backgroundColor)
                              .alpha(r)
                              .rgbaString()),
                            a.fillRect(i.x + 1, i.y + 1, o - 2, o - 2),
                            (a.fillStyle = l)),
                            u(t);
                        }),
                        x.each(t.after, u);
                    }),
                    (d = 0),
                    x.each(n.afterBody, u),
                    (i.y -= e);
                },
                drawFooter: function (e, i, n, t) {
                  var a = i.footer;
                  if (a.length) {
                    (e.y += i.footerMarginTop),
                      (n.textAlign = i._footerAlign),
                      (n.textBaseline = "top");
                    var r = x.color(i.footerFontColor);
                    (n.fillStyle = r.alpha(t * r.alpha()).rgbString()),
                      (n.font = x.fontString(
                        i.footerFontSize,
                        i._footerFontStyle,
                        i._footerFontFamily
                      )),
                      x.each(a, function (t) {
                        n.fillText(t, e.x, e.y),
                          (e.y += i.footerFontSize + i.footerSpacing);
                      });
                  }
                },
                draw: function () {
                  var t = this._chart.ctx,
                    e = this._view;
                  if (0 !== e.opacity) {
                    var i = this.getTooltipSize(e),
                      n = { x: e.x, y: e.y },
                      a = Math.abs(e.opacity < 0.001) ? 0 : e.opacity;
                    if (this._options.enabled) {
                      var r = x.color(e.backgroundColor);
                      (t.fillStyle = r.alpha(a * r.alpha()).rgbString()),
                        x.drawRoundedRectangle(
                          t,
                          n.x,
                          n.y,
                          i.width,
                          i.height,
                          e.cornerRadius
                        ),
                        t.fill(),
                        this.drawCaret(n, i, a),
                        (n.x += e.xPadding),
                        (n.y += e.yPadding),
                        this.drawTitle(n, e, t, a),
                        this.drawBody(n, e, t, a),
                        this.drawFooter(n, e, t, a);
                    }
                  }
                },
              }));
          };
        },
        {},
      ],
      35: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var u = t.helpers,
              e = t.defaults.global;
            (e.elements.arc = {
              backgroundColor: e.defaultColor,
              borderColor: "#fff",
              borderWidth: 2,
            }),
              (t.elements.Arc = t.Element.extend({
                inLabelRange: function (t) {
                  var e = this._view;
                  return (
                    !!e &&
                    Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2)
                  );
                },
                inRange: function (t, e) {
                  var i = this._view;
                  if (i) {
                    for (
                      var n = u.getAngleFromPoint(i, { x: t, y: e }),
                        a = n.angle,
                        r = n.distance,
                        o = i.startAngle,
                        s = i.endAngle;
                      s < o;

                    )
                      s += 2 * Math.PI;
                    for (; s < a; ) a -= 2 * Math.PI;
                    for (; a < o; ) a += 2 * Math.PI;
                    var l = o <= a && a <= s,
                      d = r >= i.innerRadius && r <= i.outerRadius;
                    return l && d;
                  }
                  return !1;
                },
                tooltipPosition: function () {
                  var t = this._view,
                    e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                    i = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                  return { x: t.x + Math.cos(e) * i, y: t.y + Math.sin(e) * i };
                },
                draw: function () {
                  var t = this._chart.ctx,
                    e = this._view,
                    i = e.startAngle,
                    n = e.endAngle;
                  t.beginPath(),
                    t.arc(e.x, e.y, e.outerRadius, i, n),
                    t.arc(e.x, e.y, e.innerRadius, n, i, !0),
                    t.closePath(),
                    (t.strokeStyle = e.borderColor),
                    (t.lineWidth = e.borderWidth),
                    (t.fillStyle = e.backgroundColor),
                    t.fill(),
                    (t.lineJoin = "bevel"),
                    e.borderWidth && t.stroke();
                },
              }));
          };
        },
        {},
      ],
      36: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var f = t.helpers,
              g = t.defaults.global;
            (t.defaults.global.elements.line = {
              tension: 0.4,
              backgroundColor: g.defaultColor,
              borderWidth: 3,
              borderColor: g.defaultColor,
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0,
              borderJoinStyle: "miter",
              capBezierPoints: !0,
              fill: !0,
            }),
              (t.elements.Line = t.Element.extend({
                draw: function () {
                  var t = this._view,
                    e = t.spanGaps,
                    i = t.scaleZero,
                    n = this._loop,
                    a = this._chart.ctx;
                  function r(t, e) {
                    var i = e._view;
                    !0 === e._view.steppedLine
                      ? (a.lineTo(e._view.x, t._view.y),
                        a.lineTo(e._view.x, e._view.y))
                      : 0 === e._view.tension
                      ? a.lineTo(i.x, i.y)
                      : a.bezierCurveTo(
                          t._view.controlPointNextX,
                          t._view.controlPointNextY,
                          i.controlPointPreviousX,
                          i.controlPointPreviousY,
                          i.x,
                          i.y
                        );
                  }
                  a.save();
                  var o,
                    s,
                    l,
                    d,
                    u = this._children.slice(),
                    h = -1;
                  if ((n && u.length && u.push(u[0]), u.length && t.fill)) {
                    for (a.beginPath(), o = 0; o < u.length; ++o)
                      (s = u[o]),
                        (l = f.previousItem(u, o)),
                        (d = s._view),
                        0 === o
                          ? (n ? a.moveTo(i.x, i.y) : a.moveTo(d.x, i),
                            d.skip || ((h = o), a.lineTo(d.x, d.y)))
                          : ((l = -1 === h ? l : u[h]),
                            d.skip
                              ? e ||
                                h !== o - 1 ||
                                (n
                                  ? a.lineTo(i.x, i.y)
                                  : a.lineTo(l._view.x, i))
                              : (h !== o - 1
                                  ? e && -1 !== h
                                    ? r(l, s)
                                    : (n || a.lineTo(d.x, i),
                                      a.lineTo(d.x, d.y))
                                  : r(l, s),
                                (h = o)));
                    n || a.lineTo(u[h]._view.x, i),
                      (a.fillStyle = t.backgroundColor || g.defaultColor),
                      a.closePath(),
                      a.fill();
                  }
                  var c = g.elements.line;
                  for (
                    a.lineCap = t.borderCapStyle || c.borderCapStyle,
                      a.setLineDash &&
                        a.setLineDash(t.borderDash || c.borderDash),
                      a.lineDashOffset =
                        t.borderDashOffset || c.borderDashOffset,
                      a.lineJoin = t.borderJoinStyle || c.borderJoinStyle,
                      a.lineWidth = t.borderWidth || c.borderWidth,
                      a.strokeStyle = t.borderColor || g.defaultColor,
                      a.beginPath(),
                      h = -1,
                      o = 0;
                    o < u.length;
                    ++o
                  )
                    (s = u[o]),
                      (l = f.previousItem(u, o)),
                      (d = s._view),
                      0 === o
                        ? d.skip || (a.moveTo(d.x, d.y), (h = o))
                        : ((l = -1 === h ? l : u[h]),
                          d.skip ||
                            ((h !== o - 1 && !e) || -1 === h
                              ? a.moveTo(d.x, d.y)
                              : r(l, s),
                            (h = o)));
                  a.stroke(), a.restore();
                },
              }));
          };
        },
        {},
      ],
      37: [
        function (t, e, i) {
          "use strict";
          e.exports = function (o) {
            var s = o.helpers,
              l = o.defaults.global,
              d = l.defaultColor;
            (l.elements.point = {
              radius: 3,
              pointStyle: "circle",
              backgroundColor: d,
              borderWidth: 1,
              borderColor: d,
              hitRadius: 1,
              hoverRadius: 4,
              hoverBorderWidth: 1,
            }),
              (o.elements.Point = o.Element.extend({
                inRange: function (t, e) {
                  var i = this._view;
                  return (
                    !!i &&
                    Math.pow(t - i.x, 2) + Math.pow(e - i.y, 2) <
                      Math.pow(i.hitRadius + i.radius, 2)
                  );
                },
                inLabelRange: function (t) {
                  var e = this._view;
                  return (
                    !!e &&
                    Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2)
                  );
                },
                tooltipPosition: function () {
                  var t = this._view;
                  return { x: t.x, y: t.y, padding: t.radius + t.borderWidth };
                },
                draw: function () {
                  var t = this._view,
                    e = this._chart.ctx,
                    i = t.pointStyle,
                    n = t.radius,
                    a = t.x,
                    r = t.y;
                  t.skip ||
                    ((e.strokeStyle = t.borderColor || d),
                    (e.lineWidth = s.getValueOrDefault(
                      t.borderWidth,
                      l.elements.point.borderWidth
                    )),
                    (e.fillStyle = t.backgroundColor || d),
                    o.canvasHelpers.drawPoint(e, i, n, a, r));
                },
              }));
          };
        },
        {},
      ],
      38: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var e = t.defaults.global;
            (e.elements.rectangle = {
              backgroundColor: e.defaultColor,
              borderWidth: 0,
              borderColor: e.defaultColor,
              borderSkipped: "bottom",
            }),
              (t.elements.Rectangle = t.Element.extend({
                draw: function () {
                  var t = this._chart.ctx,
                    e = this._view,
                    i = e.width / 2,
                    n = e.x - i,
                    a = e.x + i,
                    r = e.base - (e.base - e.y),
                    o = e.borderWidth / 2;
                  e.borderWidth && ((n += o), (a -= o), (r += o)),
                    t.beginPath(),
                    (t.fillStyle = e.backgroundColor),
                    (t.strokeStyle = e.borderColor),
                    (t.lineWidth = e.borderWidth);
                  var s = [
                      [n, e.base],
                      [n, r],
                      [a, r],
                      [a, e.base],
                    ],
                    l = ["bottom", "left", "top", "right"].indexOf(
                      e.borderSkipped,
                      0
                    );
                  function d(t) {
                    return s[(l + t) % 4];
                  }
                  -1 === l && (l = 0), t.moveTo.apply(t, d(0));
                  for (var u = 1; u < 4; u++) t.lineTo.apply(t, d(u));
                  t.fill(), e.borderWidth && t.stroke();
                },
                height: function () {
                  var t = this._view;
                  return t.base - t.y;
                },
                inRange: function (t, e) {
                  var i = this._view;
                  return (
                    !!i &&
                    (i.y < i.base
                      ? t >= i.x - i.width / 2 &&
                        t <= i.x + i.width / 2 &&
                        e >= i.y &&
                        e <= i.base
                      : t >= i.x - i.width / 2 &&
                        t <= i.x + i.width / 2 &&
                        e >= i.base &&
                        e <= i.y)
                  );
                },
                inLabelRange: function (t) {
                  var e = this._view;
                  return (
                    !!e && t >= e.x - e.width / 2 && t <= e.x + e.width / 2
                  );
                },
                tooltipPosition: function () {
                  var t = this._view;
                  return { x: t.x, y: t.y };
                },
              }));
          };
        },
        {},
      ],
      39: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var n = t.helpers,
              e = t.Scale.extend({
                getLabels: function () {
                  var t = this.chart.data;
                  return (
                    (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
                  );
                },
                determineDataLimits: function () {
                  var t,
                    e = this,
                    i = e.getLabels();
                  (e.minIndex = 0),
                    (e.maxIndex = i.length - 1),
                    void 0 !== e.options.ticks.min &&
                      ((t = n.indexOf(i, e.options.ticks.min)),
                      (e.minIndex = -1 !== t ? t : e.minIndex)),
                    void 0 !== e.options.ticks.max &&
                      ((t = n.indexOf(i, e.options.ticks.max)),
                      (e.maxIndex = -1 !== t ? t : e.maxIndex)),
                    (e.min = i[e.minIndex]),
                    (e.max = i[e.maxIndex]);
                },
                buildTicks: function () {
                  var t = this,
                    e = t.getLabels();
                  t.ticks =
                    0 === t.minIndex && t.maxIndex === e.length - 1
                      ? e
                      : e.slice(t.minIndex, t.maxIndex + 1);
                },
                getLabelForIndex: function (t) {
                  return this.ticks[t];
                },
                getPixelForValue: function (t, e, i, n) {
                  var a = this,
                    r = Math.max(
                      a.maxIndex +
                        1 -
                        a.minIndex -
                        (a.options.gridLines.offsetGridLines ? 0 : 1),
                      1
                    );
                  if (void 0 !== t) {
                    var o = a.getLabels().indexOf(t);
                    e = -1 !== o ? o : e;
                  }
                  if (a.isHorizontal()) {
                    var s = (a.width - (a.paddingLeft + a.paddingRight)) / r,
                      l = s * (e - a.minIndex) + a.paddingLeft;
                    return (
                      a.options.gridLines.offsetGridLines && n && (l += s / 2),
                      a.left + Math.round(l)
                    );
                  }
                  var d = (a.height - (a.paddingTop + a.paddingBottom)) / r,
                    u = d * (e - a.minIndex) + a.paddingTop;
                  return (
                    a.options.gridLines.offsetGridLines && n && (u += d / 2),
                    a.top + Math.round(u)
                  );
                },
                getPixelForTick: function (t, e) {
                  return this.getPixelForValue(
                    this.ticks[t],
                    t + this.minIndex,
                    null,
                    e
                  );
                },
                getValueForPixel: function (t) {
                  var e = this,
                    i = Math.max(
                      e.ticks.length -
                        (e.options.gridLines.offsetGridLines ? 0 : 1),
                      1
                    ),
                    n = e.isHorizontal(),
                    a =
                      (n
                        ? e.width - (e.paddingLeft + e.paddingRight)
                        : e.height - (e.paddingTop + e.paddingBottom)) / i;
                  return (
                    (t -= n ? e.left : e.top),
                    e.options.gridLines.offsetGridLines && (t -= a / 2),
                    (t -= n ? e.paddingLeft : e.paddingTop) <= 0
                      ? 0
                      : Math.round(t / a)
                  );
                },
                getBasePixel: function () {
                  return this.bottom;
                },
              });
            t.scaleService.registerScaleType("category", e, {
              position: "bottom",
            });
          };
        },
        {},
      ],
      40: [
        function (t, e, i) {
          "use strict";
          e.exports = function (n) {
            var u = n.helpers,
              t = {
                position: "left",
                ticks: {
                  callback: function (t, e, i) {
                    var n = 3 < i.length ? i[2] - i[1] : i[1] - i[0];
                    1 < Math.abs(n) &&
                      t !== Math.floor(t) &&
                      (n = t - Math.floor(t));
                    var a = u.log10(Math.abs(n)),
                      r = "";
                    if (0 !== t) {
                      var o = -1 * Math.floor(a);
                      (o = Math.max(Math.min(o, 20), 0)), (r = t.toFixed(o));
                    } else r = "0";
                    return r;
                  },
                },
              },
              e = n.LinearScaleBase.extend({
                determineDataLimits: function () {
                  var o = this,
                    s = o.options,
                    i = o.chart,
                    t = i.data.datasets,
                    e = o.isHorizontal();
                  function l(t) {
                    return e ? t.xAxisID === o.id : t.yAxisID === o.id;
                  }
                  if (((o.min = null), (o.max = null), s.stacked)) {
                    var d = {};
                    u.each(t, function (t, e) {
                      var n = i.getDatasetMeta(e);
                      void 0 === d[n.type] &&
                        (d[n.type] = {
                          positiveValues: [],
                          negativeValues: [],
                        });
                      var a = d[n.type].positiveValues,
                        r = d[n.type].negativeValues;
                      i.isDatasetVisible(e) &&
                        l(n) &&
                        u.each(t.data, function (t, e) {
                          var i = +o.getRightValue(t);
                          isNaN(i) ||
                            n.data[e].hidden ||
                            ((a[e] = a[e] || 0),
                            (r[e] = r[e] || 0),
                            s.relativePoints
                              ? (a[e] = 100)
                              : i < 0
                              ? (!0, (r[e] += i))
                              : (!0, (a[e] += i)));
                        });
                    }),
                      u.each(d, function (t) {
                        var e = t.positiveValues.concat(t.negativeValues),
                          i = u.min(e),
                          n = u.max(e);
                        (o.min = null === o.min ? i : Math.min(o.min, i)),
                          (o.max = null === o.max ? n : Math.max(o.max, n));
                      });
                  } else
                    u.each(t, function (t, e) {
                      var n = i.getDatasetMeta(e);
                      i.isDatasetVisible(e) &&
                        l(n) &&
                        u.each(t.data, function (t, e) {
                          var i = +o.getRightValue(t);
                          isNaN(i) ||
                            n.data[e].hidden ||
                            (null === o.min
                              ? (o.min = i)
                              : i < o.min && (o.min = i),
                            null === o.max
                              ? (o.max = i)
                              : i > o.max && (o.max = i));
                        });
                    });
                  this.handleTickRangeOptions();
                },
                getTickLimit: function () {
                  var t,
                    e = this.options.ticks;
                  if (this.isHorizontal())
                    t = Math.min(
                      e.maxTicksLimit ? e.maxTicksLimit : 11,
                      Math.ceil(this.width / 50)
                    );
                  else {
                    var i = u.getValueOrDefault(
                      e.fontSize,
                      n.defaults.global.defaultFontSize
                    );
                    t = Math.min(
                      e.maxTicksLimit ? e.maxTicksLimit : 11,
                      Math.ceil(this.height / (2 * i))
                    );
                  }
                  return t;
                },
                handleDirectionalChanges: function () {
                  this.isHorizontal() || this.ticks.reverse();
                },
                getLabelForIndex: function (t, e) {
                  return +this.getRightValue(
                    this.chart.data.datasets[e].data[t]
                  );
                },
                getPixelForValue: function (t) {
                  var e,
                    i,
                    n = this,
                    a = n.paddingLeft,
                    r = n.paddingBottom,
                    o = n.start,
                    s = +n.getRightValue(t),
                    l = n.end - o;
                  return n.isHorizontal()
                    ? ((i = n.width - (a + n.paddingRight)),
                      (e = n.left + (i / l) * (s - o)),
                      Math.round(e + a))
                    : ((i = n.height - (n.paddingTop + r)),
                      (e = n.bottom - r - (i / l) * (s - o)),
                      Math.round(e));
                },
                getValueForPixel: function (t) {
                  var e = this,
                    i = e.isHorizontal(),
                    n = e.paddingLeft,
                    a = e.paddingBottom,
                    r = i
                      ? e.width - (n + e.paddingRight)
                      : e.height - (e.paddingTop + a),
                    o = (i ? t - e.left - n : e.bottom - a - t) / r;
                  return e.start + (e.end - e.start) * o;
                },
                getPixelForTick: function (t) {
                  return this.getPixelForValue(this.ticksAsNumbers[t]);
                },
              });
            n.scaleService.registerScaleType("linear", e, t);
          };
        },
        {},
      ],
      41: [
        function (t, e, i) {
          "use strict";
          e.exports = function (e) {
            var c = e.helpers,
              t = c.noop;
            e.LinearScaleBase = e.Scale.extend({
              handleTickRangeOptions: function () {
                var t = this,
                  e = t.options.ticks;
                if (e.beginAtZero) {
                  var i = c.sign(t.min),
                    n = c.sign(t.max);
                  i < 0 && n < 0 ? (t.max = 0) : 0 < i && 0 < n && (t.min = 0);
                }
                void 0 !== e.min
                  ? (t.min = e.min)
                  : void 0 !== e.suggestedMin &&
                    (t.min = Math.min(t.min, e.suggestedMin)),
                  void 0 !== e.max
                    ? (t.max = e.max)
                    : void 0 !== e.suggestedMax &&
                      (t.max = Math.max(t.max, e.suggestedMax)),
                  t.min === t.max && (t.max++, e.beginAtZero || t.min--);
              },
              getTickLimit: t,
              handleDirectionalChanges: t,
              buildTicks: function () {
                var t,
                  e = this,
                  i = e.options,
                  n = (e.ticks = []),
                  a = i.ticks,
                  r = c.getValueOrDefault,
                  o = e.getTickLimit();
                if (
                  ((o = Math.max(2, o)),
                  (a.fixedStepSize && 0 < a.fixedStepSize) ||
                    (a.stepSize && 0 < a.stepSize))
                )
                  t = r(a.fixedStepSize, a.stepSize);
                else {
                  var s = c.niceNum(e.max - e.min, !1);
                  t = c.niceNum(s / (o - 1), !0);
                }
                var l = Math.floor(e.min / t) * t,
                  d = Math.ceil(e.max / t) * t,
                  u = (d - l) / t;
                (u = c.almostEquals(u, Math.round(u), t / 1e3)
                  ? Math.round(u)
                  : Math.ceil(u)),
                  n.push(void 0 !== a.min ? a.min : l);
                for (var h = 1; h < u; ++h) n.push(l + h * t);
                n.push(void 0 !== a.max ? a.max : d),
                  e.handleDirectionalChanges(),
                  (e.max = c.max(n)),
                  (e.min = c.min(n)),
                  a.reverse
                    ? (n.reverse(), (e.start = e.max), (e.end = e.min))
                    : ((e.start = e.min), (e.end = e.max));
              },
              convertTicksToLabels: function () {
                var t = this;
                (t.ticksAsNumbers = t.ticks.slice()),
                  (t.zeroLineIndex = t.ticks.indexOf(0)),
                  e.Scale.prototype.convertTicksToLabels.call(t);
              },
            });
          };
        },
        {},
      ],
      42: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var u = t.helpers,
              e = {
                position: "left",
                ticks: {
                  callback: function (t, e, i) {
                    var n = t / Math.pow(10, Math.floor(u.log10(t)));
                    return 1 === n ||
                      2 === n ||
                      5 === n ||
                      0 === e ||
                      e === i.length - 1
                      ? t.toExponential()
                      : "";
                  },
                },
              },
              i = t.Scale.extend({
                determineDataLimits: function () {
                  var r = this,
                    o = r.options,
                    t = o.ticks,
                    i = r.chart,
                    e = i.data.datasets,
                    n = u.getValueOrDefault,
                    a = r.isHorizontal();
                  function s(t) {
                    return a ? t.xAxisID === r.id : t.yAxisID === r.id;
                  }
                  if (((r.min = null), (r.max = null), o.stacked)) {
                    var l = {};
                    u.each(e, function (t, e) {
                      var a = i.getDatasetMeta(e);
                      i.isDatasetVisible(e) &&
                        s(a) &&
                        (void 0 === l[a.type] && (l[a.type] = []),
                        u.each(t.data, function (t, e) {
                          var i = l[a.type],
                            n = +r.getRightValue(t);
                          isNaN(n) ||
                            a.data[e].hidden ||
                            ((i[e] = i[e] || 0),
                            o.relativePoints ? (i[e] = 100) : (i[e] += n));
                        }));
                    }),
                      u.each(l, function (t) {
                        var e = u.min(t),
                          i = u.max(t);
                        (r.min = null === r.min ? e : Math.min(r.min, e)),
                          (r.max = null === r.max ? i : Math.max(r.max, i));
                      });
                  } else
                    u.each(e, function (t, e) {
                      var n = i.getDatasetMeta(e);
                      i.isDatasetVisible(e) &&
                        s(n) &&
                        u.each(t.data, function (t, e) {
                          var i = +r.getRightValue(t);
                          isNaN(i) ||
                            n.data[e].hidden ||
                            (null === r.min
                              ? (r.min = i)
                              : i < r.min && (r.min = i),
                            null === r.max
                              ? (r.max = i)
                              : i > r.max && (r.max = i));
                        });
                    });
                  (r.min = n(t.min, r.min)),
                    (r.max = n(t.max, r.max)),
                    r.min === r.max &&
                      (0 !== r.min && null !== r.min
                        ? ((r.min = Math.pow(
                            10,
                            Math.floor(u.log10(r.min)) - 1
                          )),
                          (r.max = Math.pow(
                            10,
                            Math.floor(u.log10(r.max)) + 1
                          )))
                        : ((r.min = 1), (r.max = 10)));
                },
                buildTicks: function () {
                  for (
                    var t = this,
                      e = t.options.ticks,
                      i = u.getValueOrDefault,
                      n = (t.ticks = []),
                      a = i(e.min, Math.pow(10, Math.floor(u.log10(t.min))));
                    a < t.max;

                  ) {
                    n.push(a);
                    var r = Math.floor(u.log10(a)),
                      o = Math.floor(a / Math.pow(10, r)) + 1;
                    10 === o && ((o = 1), ++r), (a = o * Math.pow(10, r));
                  }
                  var s = i(e.max, a);
                  n.push(s),
                    t.isHorizontal() || n.reverse(),
                    (t.max = u.max(n)),
                    (t.min = u.min(n)),
                    e.reverse
                      ? (n.reverse(), (t.start = t.max), (t.end = t.min))
                      : ((t.start = t.min), (t.end = t.max));
                },
                convertTicksToLabels: function () {
                  (this.tickValues = this.ticks.slice()),
                    t.Scale.prototype.convertTicksToLabels.call(this);
                },
                getLabelForIndex: function (t, e) {
                  return +this.getRightValue(
                    this.chart.data.datasets[e].data[t]
                  );
                },
                getPixelForTick: function (t) {
                  return this.getPixelForValue(this.tickValues[t]);
                },
                getPixelForValue: function (t) {
                  var e,
                    i,
                    n = this,
                    a = n.start,
                    r = +n.getRightValue(t),
                    o = u.log10(n.end) - u.log10(a),
                    s = n.paddingTop,
                    l = n.paddingBottom,
                    d = n.paddingLeft;
                  return (
                    n.isHorizontal()
                      ? 0 === r
                        ? (i = n.left + d)
                        : ((e = n.width - (d + n.paddingRight)),
                          (i = n.left + (e / o) * (u.log10(r) - u.log10(a))),
                          (i += d))
                      : (i =
                          0 === r
                            ? n.top + s
                            : ((e = n.height - (s + l)),
                              n.bottom -
                                l -
                                (e / o) * (u.log10(r) - u.log10(a)))),
                    i
                  );
                },
                getValueForPixel: function (t) {
                  var e,
                    i = this,
                    n = u.log10(i.end) - u.log10(i.start);
                  return i.isHorizontal()
                    ? ((e = i.width - (i.paddingLeft + i.paddingRight)),
                      i.start *
                        Math.pow(10, ((t - i.left - i.paddingLeft) * n) / e))
                    : ((e = i.height - (i.paddingTop + i.paddingBottom)),
                      Math.pow(10, ((i.bottom - i.paddingBottom - t) * n) / e) /
                        i.start);
                },
              });
            t.scaleService.registerScaleType("logarithmic", i, e);
          };
        },
        {},
      ],
      43: [
        function (t, e, i) {
          "use strict";
          e.exports = function (t) {
            var w = t.helpers,
              _ = t.defaults.global,
              e = t.LinearScaleBase.extend({
                getValueCount: function () {
                  return this.chart.data.labels.length;
                },
                setDimensions: function () {
                  var t = this,
                    e = t.options,
                    i = e.ticks;
                  (t.width = t.maxWidth),
                    (t.height = t.maxHeight),
                    (t.xCenter = Math.round(t.width / 2)),
                    (t.yCenter = Math.round(t.height / 2));
                  var n = w.min([t.height, t.width]),
                    a = w.getValueOrDefault(i.fontSize, _.defaultFontSize);
                  t.drawingArea = e.display
                    ? n / 2 - (a / 2 + i.backdropPaddingY)
                    : n / 2;
                },
                determineDataLimits: function () {
                  var a = this,
                    i = a.chart;
                  (a.min = null),
                    (a.max = null),
                    w.each(i.data.datasets, function (t, e) {
                      if (i.isDatasetVisible(e)) {
                        var n = i.getDatasetMeta(e);
                        w.each(t.data, function (t, e) {
                          var i = +a.getRightValue(t);
                          isNaN(i) ||
                            n.data[e].hidden ||
                            (null === a.min
                              ? (a.min = i)
                              : i < a.min && (a.min = i),
                            null === a.max
                              ? (a.max = i)
                              : i > a.max && (a.max = i));
                        });
                      }
                    }),
                    a.handleTickRangeOptions();
                },
                getTickLimit: function () {
                  var t = this.options.ticks,
                    e = w.getValueOrDefault(t.fontSize, _.defaultFontSize);
                  return Math.min(
                    t.maxTicksLimit ? t.maxTicksLimit : 11,
                    Math.ceil(this.drawingArea / (1.5 * e))
                  );
                },
                convertTicksToLabels: function () {
                  t.LinearScaleBase.prototype.convertTicksToLabels.call(this),
                    (this.pointLabels = this.chart.data.labels.map(
                      this.options.pointLabels.callback,
                      this
                    ));
                },
                getLabelForIndex: function (t, e) {
                  return +this.getRightValue(
                    this.chart.data.datasets[e].data[t]
                  );
                },
                fit: function () {
                  var t,
                    e,
                    i,
                    n,
                    a,
                    r,
                    o,
                    s,
                    l,
                    d,
                    u,
                    h,
                    c = this.options.pointLabels,
                    f = w.getValueOrDefault(c.fontSize, _.defaultFontSize),
                    g = w.getValueOrDefault(c.fontStyle, _.defaultFontStyle),
                    p = w.getValueOrDefault(c.fontFamily, _.defaultFontFamily),
                    m = w.fontString(f, g, p),
                    v = w.min([this.height / 2 - f - 5, this.width / 2]),
                    b = this.width,
                    y = 0;
                  for (
                    this.ctx.font = m, e = 0;
                    e < this.getValueCount();
                    e++
                  ) {
                    (t = this.getPointPosition(e, v)),
                      (i =
                        this.ctx.measureText(
                          this.pointLabels[e] ? this.pointLabels[e] : ""
                        ).width + 5);
                    var x =
                      ((360 * (this.getIndexAngle(e) + Math.PI / 2)) /
                        (2 * Math.PI)) %
                      360;
                    0 === x || 180 === x
                      ? ((n = i / 2),
                        t.x + n > b && ((b = t.x + n), (a = e)),
                        t.x - n < y && ((y = t.x - n), (o = e)))
                      : x < 180
                      ? t.x + i > b && ((b = t.x + i), (a = e))
                      : t.x - i < y && ((y = t.x - i), (o = e));
                  }
                  (l = y),
                    (d = Math.ceil(b - this.width)),
                    (r = this.getIndexAngle(a)),
                    (s = this.getIndexAngle(o)),
                    (u = d / Math.sin(r + Math.PI / 2)),
                    (h = l / Math.sin(s + Math.PI / 2)),
                    (u = w.isNumber(u) ? u : 0),
                    (h = w.isNumber(h) ? h : 0),
                    (this.drawingArea = Math.round(v - (h + u) / 2)),
                    this.setCenterPoint(h, u);
                },
                setCenterPoint: function (t, e) {
                  var i = this.width - e - this.drawingArea,
                    n = t + this.drawingArea;
                  (this.xCenter = Math.round((n + i) / 2 + this.left)),
                    (this.yCenter = Math.round(this.height / 2 + this.top));
                },
                getIndexAngle: function (t) {
                  var e = (2 * Math.PI) / this.getValueCount(),
                    i =
                      ((this.chart.options && this.chart.options.startAngle
                        ? this.chart.options.startAngle
                        : 0) *
                        Math.PI *
                        2) /
                      360;
                  return t * e - Math.PI / 2 + i;
                },
                getDistanceFromCenterForValue: function (t) {
                  if (null === t) return 0;
                  var e = this.drawingArea / (this.max - this.min);
                  return this.options.reverse
                    ? (this.max - t) * e
                    : (t - this.min) * e;
                },
                getPointPosition: function (t, e) {
                  var i = this.getIndexAngle(t);
                  return {
                    x: Math.round(Math.cos(i) * e) + this.xCenter,
                    y: Math.round(Math.sin(i) * e) + this.yCenter,
                  };
                },
                getPointPositionForValue: function (t, e) {
                  return this.getPointPosition(
                    t,
                    this.getDistanceFromCenterForValue(e)
                  );
                },
                getBasePosition: function () {
                  var t = this.min,
                    e = this.max;
                  return this.getPointPositionForValue(
                    0,
                    this.beginAtZero
                      ? 0
                      : t < 0 && e < 0
                      ? e
                      : 0 < t && 0 < e
                      ? t
                      : 0
                  );
                },
                draw: function () {
                  var l = this,
                    d = l.options,
                    u = d.gridLines,
                    h = d.ticks,
                    t = d.angleLines,
                    e = d.pointLabels,
                    c = w.getValueOrDefault;
                  if (d.display) {
                    var f = l.ctx,
                      g = c(h.fontSize, _.defaultFontSize),
                      i = c(h.fontStyle, _.defaultFontStyle),
                      n = c(h.fontFamily, _.defaultFontFamily),
                      p = w.fontString(g, i, n);
                    if (
                      (w.each(l.ticks, function (t, e) {
                        if (0 < e || d.reverse) {
                          var i = l.getDistanceFromCenterForValue(
                              l.ticksAsNumbers[e]
                            ),
                            n = l.yCenter - i;
                          if (u.display && 0 !== e)
                            if (
                              ((f.strokeStyle = w.getValueAtIndexOrDefault(
                                u.color,
                                e - 1
                              )),
                              (f.lineWidth = w.getValueAtIndexOrDefault(
                                u.lineWidth,
                                e - 1
                              )),
                              d.lineArc)
                            )
                              f.beginPath(),
                                f.arc(l.xCenter, l.yCenter, i, 0, 2 * Math.PI),
                                f.closePath(),
                                f.stroke();
                            else {
                              f.beginPath();
                              for (var a = 0; a < l.getValueCount(); a++) {
                                var r = l.getPointPosition(a, i);
                                0 === a
                                  ? f.moveTo(r.x, r.y)
                                  : f.lineTo(r.x, r.y);
                              }
                              f.closePath(), f.stroke();
                            }
                          if (h.display) {
                            var o = c(h.fontColor, _.defaultFontColor);
                            if (((f.font = p), h.showLabelBackdrop)) {
                              var s = f.measureText(t).width;
                              (f.fillStyle = h.backdropColor),
                                f.fillRect(
                                  l.xCenter - s / 2 - h.backdropPaddingX,
                                  n - g / 2 - h.backdropPaddingY,
                                  s + 2 * h.backdropPaddingX,
                                  g + 2 * h.backdropPaddingY
                                );
                            }
                            (f.textAlign = "center"),
                              (f.textBaseline = "middle"),
                              (f.fillStyle = o),
                              f.fillText(t, l.xCenter, n);
                          }
                        }
                      }),
                      !d.lineArc)
                    ) {
                      (f.lineWidth = t.lineWidth), (f.strokeStyle = t.color);
                      for (
                        var a = l.getDistanceFromCenterForValue(
                            d.reverse ? l.min : l.max
                          ),
                          r = c(e.fontSize, _.defaultFontSize),
                          o = c(e.fontStyle, _.defaultFontStyle),
                          s = c(e.fontFamily, _.defaultFontFamily),
                          m = w.fontString(r, o, s),
                          v = l.getValueCount() - 1;
                        0 <= v;
                        v--
                      ) {
                        if (t.display) {
                          var b = l.getPointPosition(v, a);
                          f.beginPath(),
                            f.moveTo(l.xCenter, l.yCenter),
                            f.lineTo(b.x, b.y),
                            f.stroke(),
                            f.closePath();
                        }
                        var y = l.getPointPosition(v, a + 5),
                          x = c(e.fontColor, _.defaultFontColor);
                        (f.font = m), (f.fillStyle = x);
                        var k = l.pointLabels,
                          S =
                            ((360 * (this.getIndexAngle(v) + Math.PI / 2)) /
                              (2 * Math.PI)) %
                            360;
                        (f.textAlign =
                          0 === S || 180 === S
                            ? "center"
                            : S < 180
                            ? "left"
                            : "right"),
                          (f.textBaseline =
                            90 === S || 270 === S
                              ? "middle"
                              : 270 < S || S < 90
                              ? "bottom"
                              : "top"),
                          f.fillText(k[v] ? k[v] : "", y.x, y.y);
                      }
                    }
                  }
                },
              });
            t.scaleService.registerScaleType("radialLinear", e, {
              display: !0,
              animate: !0,
              lineArc: !1,
              position: "chartArea",
              angleLines: {
                display: !0,
                color: "rgba(0, 0, 0, 0.1)",
                lineWidth: 1,
              },
              ticks: {
                showLabelBackdrop: !0,
                backdropColor: "rgba(255,255,255,0.75)",
                backdropPaddingY: 2,
                backdropPaddingX: 2,
              },
              pointLabels: {
                fontSize: 10,
                callback: function (t) {
                  return t;
                },
              },
            });
          };
        },
        {},
      ],
      44: [
        function (t, e, i) {
          "use strict";
          var d = t(6);
          (d = "function" == typeof d ? d : window.moment),
            (e.exports = function (y) {
              var x = y.helpers,
                k = {
                  units: [
                    {
                      name: "millisecond",
                      steps: [1, 2, 5, 10, 20, 50, 100, 250, 500],
                    },
                    { name: "second", steps: [1, 2, 5, 10, 30] },
                    { name: "minute", steps: [1, 2, 5, 10, 30] },
                    { name: "hour", steps: [1, 2, 3, 6, 12] },
                    { name: "day", steps: [1, 2, 5] },
                    { name: "week", maxStep: 4 },
                    { name: "month", maxStep: 3 },
                    { name: "quarter", maxStep: 4 },
                    { name: "year", maxStep: !1 },
                  ],
                },
                t = y.Scale.extend({
                  initialize: function () {
                    if (!d)
                      throw new Error(
                        "Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com"
                      );
                    y.Scale.prototype.initialize.call(this);
                  },
                  getLabelMoment: function (t, e) {
                    return void 0 !== this.labelMoments[t]
                      ? this.labelMoments[t][e]
                      : null;
                  },
                  getMomentStartOf: function (t) {
                    return "week" === this.options.time.unit &&
                      !1 !== this.options.time.isoWeekday
                      ? t
                          .clone()
                          .startOf("isoWeek")
                          .isoWeekday(this.options.time.isoWeekday)
                      : t.clone().startOf(this.tickUnit);
                  },
                  determineDataLimits: function () {
                    var a = this;
                    a.labelMoments = [];
                    var r = [];
                    a.chart.data.labels && 0 < a.chart.data.labels.length
                      ? (x.each(
                          a.chart.data.labels,
                          function (t) {
                            var e = a.parseTime(t);
                            e.isValid() &&
                              (a.options.time.round &&
                                e.startOf(a.options.time.round),
                              r.push(e));
                          },
                          a
                        ),
                        (a.firstTick = d.min.call(a, r)),
                        (a.lastTick = d.max.call(a, r)))
                      : ((a.firstTick = null), (a.lastTick = null)),
                      x.each(
                        a.chart.data.datasets,
                        function (t, e) {
                          var i = [],
                            n = a.chart.isDatasetVisible(e);
                          "object" == typeof t.data[0] && null !== t.data[0]
                            ? x.each(
                                t.data,
                                function (t) {
                                  var e = a.parseTime(a.getRightValue(t));
                                  e.isValid() &&
                                    (a.options.time.round &&
                                      e.startOf(a.options.time.round),
                                    i.push(e),
                                    n &&
                                      ((a.firstTick =
                                        null !== a.firstTick
                                          ? d.min(a.firstTick, e)
                                          : e),
                                      (a.lastTick =
                                        null !== a.lastTick
                                          ? d.max(a.lastTick, e)
                                          : e)));
                                },
                                a
                              )
                            : (i = r),
                            a.labelMoments.push(i);
                        },
                        a
                      ),
                      a.options.time.min &&
                        (a.firstTick = a.parseTime(a.options.time.min)),
                      a.options.time.max &&
                        (a.lastTick = a.parseTime(a.options.time.max)),
                      (a.firstTick = (a.firstTick || d()).clone()),
                      (a.lastTick = (a.lastTick || d()).clone());
                  },
                  buildTicks: function () {
                    var n = this;
                    n.ctx.save();
                    var t,
                      e = x.getValueOrDefault(
                        n.options.ticks.fontSize,
                        y.defaults.global.defaultFontSize
                      ),
                      i = x.getValueOrDefault(
                        n.options.ticks.fontStyle,
                        y.defaults.global.defaultFontStyle
                      ),
                      a = x.getValueOrDefault(
                        n.options.ticks.fontFamily,
                        y.defaults.global.defaultFontFamily
                      ),
                      r = x.fontString(e, i, a);
                    if (
                      ((n.ctx.font = r),
                      (n.ticks = []),
                      (n.unitScale = 1),
                      (n.scaleSizeInUnits = 0),
                      n.options.time.unit)
                    )
                      (n.tickUnit = n.options.time.unit || "day"),
                        (n.displayFormat =
                          n.options.time.displayFormats[n.tickUnit]),
                        (n.scaleSizeInUnits = n.lastTick.diff(
                          n.firstTick,
                          n.tickUnit,
                          !0
                        )),
                        (n.unitScale = x.getValueOrDefault(
                          n.options.time.unitStepSize,
                          1
                        ));
                    else {
                      var o = n.isHorizontal()
                          ? n.width - (n.paddingLeft + n.paddingRight)
                          : n.height - (n.paddingTop + n.paddingBottom),
                        s = n.tickFormatFunction(n.firstTick, 0, []),
                        l = n.ctx.measureText(s).width,
                        d =
                          o /
                          (l =
                            l *
                              Math.cos(
                                x.toRadians(n.options.ticks.maxRotation)
                              ) +
                            e *
                              Math.sin(
                                x.toRadians(n.options.ticks.maxRotation)
                              ));
                      (n.tickUnit = "millisecond"),
                        (n.scaleSizeInUnits = n.lastTick.diff(
                          n.firstTick,
                          n.tickUnit,
                          !0
                        )),
                        (n.displayFormat =
                          n.options.time.displayFormats[n.tickUnit]);
                      for (var u = 0, h = k.units[u]; u < k.units.length; ) {
                        if (
                          ((n.unitScale = 1),
                          x.isArray(h.steps) &&
                            Math.ceil(n.scaleSizeInUnits / d) < x.max(h.steps))
                        ) {
                          for (var c = 0; c < h.steps.length; ++c)
                            if (
                              h.steps[c] >= Math.ceil(n.scaleSizeInUnits / d)
                            ) {
                              n.unitScale = x.getValueOrDefault(
                                n.options.time.unitStepSize,
                                h.steps[c]
                              );
                              break;
                            }
                          break;
                        }
                        if (
                          !1 === h.maxStep ||
                          Math.ceil(n.scaleSizeInUnits / d) < h.maxStep
                        ) {
                          n.unitScale = x.getValueOrDefault(
                            n.options.time.unitStepSize,
                            Math.ceil(n.scaleSizeInUnits / d)
                          );
                          break;
                        }
                        (h = k.units[++u]), (n.tickUnit = h.name);
                        var f = n.firstTick.diff(
                            n.getMomentStartOf(n.firstTick),
                            n.tickUnit,
                            !0
                          ),
                          g = n
                            .getMomentStartOf(
                              n.lastTick.clone().add(1, n.tickUnit)
                            )
                            .diff(n.lastTick, n.tickUnit, !0);
                        (n.scaleSizeInUnits =
                          n.lastTick.diff(n.firstTick, n.tickUnit, !0) + f + g),
                          (n.displayFormat =
                            n.options.time.displayFormats[h.name]);
                      }
                    }
                    if (
                      ((t = n.options.time.min
                        ? n.getMomentStartOf(n.firstTick)
                        : ((n.firstTick = n.getMomentStartOf(n.firstTick)),
                          n.firstTick)),
                      !n.options.time.max)
                    ) {
                      var p = n.getMomentStartOf(n.lastTick),
                        m = p.diff(n.lastTick, n.tickUnit, !0);
                      m < 0
                        ? (n.lastTick = n.getMomentStartOf(
                            n.lastTick.add(1, n.tickUnit)
                          ))
                        : 0 <= m && (n.lastTick = p),
                        (n.scaleSizeInUnits = n.lastTick.diff(
                          n.firstTick,
                          n.tickUnit,
                          !0
                        ));
                    }
                    (n.smallestLabelSeparation = n.width),
                      x.each(
                        n.chart.data.datasets,
                        function (t, e) {
                          for (var i = 1; i < n.labelMoments[e].length; i++)
                            n.smallestLabelSeparation = Math.min(
                              n.smallestLabelSeparation,
                              n.labelMoments[e][i].diff(
                                n.labelMoments[e][i - 1],
                                n.tickUnit,
                                !0
                              )
                            );
                        },
                        n
                      ),
                      n.options.time.displayFormat &&
                        (n.displayFormat = n.options.time.displayFormat),
                      n.ticks.push(n.firstTick.clone());
                    for (var v = 1; v <= n.scaleSizeInUnits; ++v) {
                      var b = t.clone().add(v, n.tickUnit);
                      if (
                        n.options.time.max &&
                        0 <= b.diff(n.lastTick, n.tickUnit, !0)
                      )
                        break;
                      v % n.unitScale == 0 && n.ticks.push(b);
                    }
                    (0 ===
                      n.ticks[n.ticks.length - 1].diff(
                        n.lastTick,
                        n.tickUnit
                      ) &&
                      0 !== n.scaleSizeInUnits) ||
                      (n.options.time.max
                        ? (n.ticks.push(n.lastTick.clone()),
                          (n.scaleSizeInUnits = n.lastTick.diff(
                            n.ticks[0],
                            n.tickUnit,
                            !0
                          )))
                        : (n.ticks.push(n.lastTick.clone()),
                          (n.scaleSizeInUnits = n.lastTick.diff(
                            n.firstTick,
                            n.tickUnit,
                            !0
                          )))),
                      n.ctx.restore();
                  },
                  getLabelForIndex: function (t, e) {
                    var i =
                      this.chart.data.labels &&
                      t < this.chart.data.labels.length
                        ? this.chart.data.labels[t]
                        : "";
                    return (
                      "object" == typeof this.chart.data.datasets[e].data[0] &&
                        (i = this.getRightValue(
                          this.chart.data.datasets[e].data[t]
                        )),
                      this.options.time.tooltipFormat &&
                        (i = this.parseTime(i).format(
                          this.options.time.tooltipFormat
                        )),
                      i
                    );
                  },
                  tickFormatFunction: function (t, e, i) {
                    var n = t.format(this.displayFormat),
                      a = this.options.ticks,
                      r = x.getValueOrDefault(a.callback, a.userCallback);
                    return r ? r(n, e, i) : n;
                  },
                  convertTicksToLabels: function () {
                    (this.tickMoments = this.ticks),
                      (this.ticks = this.ticks.map(
                        this.tickFormatFunction,
                        this
                      ));
                  },
                  getPixelForValue: function (t, e, i) {
                    var n = this;
                    (t && t.isValid) || (t = d(n.getRightValue(t)));
                    var a =
                      t && t.isValid && t.isValid()
                        ? t
                        : n.getLabelMoment(i, e);
                    if (a) {
                      var r = a.diff(n.firstTick, n.tickUnit, !0),
                        o = 0 !== r ? r / n.scaleSizeInUnits : r;
                      if (n.isHorizontal()) {
                        var s =
                          (n.width - (n.paddingLeft + n.paddingRight)) * o +
                          n.paddingLeft;
                        return n.left + Math.round(s);
                      }
                      var l =
                        (n.height - (n.paddingTop + n.paddingBottom)) * o +
                        n.paddingTop;
                      return n.top + Math.round(l);
                    }
                  },
                  getPixelForTick: function (t) {
                    return this.getPixelForValue(
                      this.tickMoments[t],
                      null,
                      null
                    );
                  },
                  getValueForPixel: function (t) {
                    var e = this,
                      i = e.isHorizontal()
                        ? e.width - (e.paddingLeft + e.paddingRight)
                        : e.height - (e.paddingTop + e.paddingBottom),
                      n =
                        (t -
                          (e.isHorizontal()
                            ? e.left + e.paddingLeft
                            : e.top + e.paddingTop)) /
                        i;
                    return (
                      (n *= e.scaleSizeInUnits),
                      e.firstTick
                        .clone()
                        .add(d.duration(n, e.tickUnit).asSeconds(), "seconds")
                    );
                  },
                  parseTime: function (t) {
                    return "string" == typeof this.options.time.parser
                      ? d(t, this.options.time.parser)
                      : "function" == typeof this.options.time.parser
                      ? this.options.time.parser(t)
                      : "function" == typeof t.getMonth || "number" == typeof t
                      ? d(t)
                      : t.isValid && t.isValid()
                      ? t
                      : "string" != typeof this.options.time.format &&
                        this.options.time.format.call
                      ? (console.warn(
                          "options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"
                        ),
                        this.options.time.format(t))
                      : d(t, this.options.time.format);
                  },
                });
              y.scaleService.registerScaleType("time", t, {
                position: "bottom",
                time: {
                  parser: !1,
                  format: !1,
                  unit: !1,
                  round: !1,
                  displayFormat: !1,
                  isoWeekday: !1,
                  displayFormats: {
                    millisecond: "h:mm:ss.SSS a",
                    second: "h:mm:ss a",
                    minute: "h:mm:ss a",
                    hour: "MMM D, hA",
                    day: "ll",
                    week: "ll",
                    month: "MMM YYYY",
                    quarter: "[Q]Q - YYYY",
                    year: "YYYY",
                  },
                },
                ticks: { autoSkip: !1 },
              });
            });
        },
        { 6: 6 },
      ],
    },
    {},
    [7]
  )(7);
});
