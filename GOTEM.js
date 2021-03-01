//thanks, fredd
var gamemode, myScore, top_sco_re, my_sco_re, game_timer, game_timer_c, killed_other, killed_total, grid_width, grid_height, game_timer_0, newgame_loaded, game_mode, game_challenge, obstaclesOn, game_speed, mpd, spd;

$("#left").html("");

gamemode = "";

window.lastTimePress = new Date;

function timePressCheck() {
    let t = new Date;
    let e = Math.floor(t.getTime() - window.lastTimePress.getTime());
    return e >= 14e3 / game_speed;
}

function timePressSet() {
    let t = new Date;
    window.lastTimePress.setTime(t.getTime());
}

ts = +Cookies.get("paperio_topscore");

isNaN(ts) && (ts = 0);

myScore = 0;

top_sco_re = ts;

my_sco_re = 0;

game_timer = 0;

game_timer_c = 0;

killed_other = 0;

killed_total = 0;

grid_width = 90;

grid_height = 70;

game_timer_0 = +new Date;

function game_is_over_main() {
    var t, e, n, i, a;
    if ("paper2" == game_mode) {
        t = window.paper2_results;
        window.paper2_results.win;
        playtime = t.time / 1e3;
        playtime_m = Math.floor(playtime / 60);
        playtime_m < 10 && (playtime_m = "0" + playtime_m);
        playtime_s = Math.floor(playtime - 60 * playtime_m);
        playtime_s < 10 && (playtime_s = "0" + playtime_s);
        new_top = t.newBest;
        top_sco_re = t.best;
        my_sco_re = t.score;
        killed_other = t.kills;
    } else {
        game_timer_2 = +new Date;
        playtime = Math.floor((game_timer_2 - game_timer) / 1e3);
        playtime_m = Math.floor(playtime / 60);
        playtime_m < 10 && (playtime_m = "0" + playtime_m);
        playtime_s = Math.floor(playtime - 60 * playtime_m);
        playtime_s < 10 && (playtime_s = "0" + playtime_s);
        if (my_sco_re > top_sco_re) {
            top_sco_re = my_sco_re;
            new_top = !0;
        } else new_top = !1;
        Cookies.set("paperio_topscore", top_sco_re, {
            expires: 30
        });
    }
    $("#game_over").empty();
    $(".main2").hide().delay(500).fadeIn(4e3);
    $('<div class="gameover"></div>').appendTo("#game_over");
    $('<div class="go_sc">YOUR SCORE:</div>').appendTo("#game_over").hide().delay(1e3).fadeIn(1e3);
    $('<div class="da_sc">' + my_sco_re.toFixed(2) + "%</div>").appendTo("#game_over").hide().delay(1e3).fadeIn(1e3);
    new_top ? $('<div class="go_bs"><span>NEW </span>BEST SCORE:</div>').appendTo("#game_over").hide().delay(1500).fadeIn(1e3) : $('<div class="go_bs">BEST SCORE:</div>').appendTo("#game_over").hide().delay(1500).fadeIn(1e3);
    $('<div class="da_bs">' + top_sco_re.toFixed(2) + "%</div>").appendTo("#game_over").hide().delay(1500).fadeIn(1e3);
    $('<div class="go_pt">TIME PLAYED:</div>').appendTo("#game_over").hide().delay(2e3).fadeIn(1e3);
    $('<div class="da_pt">' + playtime_m + ":" + playtime_s + "</div>").appendTo("#game_over").hide().delay(2e3).fadeIn(1e3);
    $('<div class="go_pk">PLAYERS KILLED:</div>').appendTo("#game_over").hide().delay(2500).fadeIn(1e3);
    $('<div class="da_pk">' + killed_other + "</div>").appendTo("#game_over").hide().delay(2500).fadeIn(1e3);
    $("#game_over").show();
    $(".animiescontainer").show();
    e = killed_other;
    0 == e && (e = 1);
    myScore = my_sco_re;
    n = Math.floor(499 * Math.random() + 1);
    i = myScore.toFixed(2) * e * (15e3 / playtime.toFixed(0));
    a = $("#nickname").val();
    "" == a && (a = "paperio7.com_" + n);
    $(".saveScore").attr("onclick", "puanKaydet('" + a + "','" + i.toFixed(2) + "','" + playtime_m + ":" + playtime_s + "','" + killed_other + "','" + myScore.toFixed(2) + "')");
    $(".saveScore").hide().delay(3e3).fadeIn(1e3);
    $(".playAgain").hide().delay(3e3).fadeIn(1e3);
    $(".changeMode").hide().delay(3e3).fadeIn(1e3);
    geberikos();
}

newgame_loaded = null;

function showLoad() {
    $(".play").hide();
    $(".loader").show();
    $(".mode").addClass("disabled");
    setTimeout(showResetUI, 1e4);
}

function showResetUI() {
    $(".noConnectBtn").show();
    $(".noConnectText").show();
}

function game_start(t) {
    $(".animiescontainer").hide();
    if (!1 !== newgame_loaded) {
        newgame_loaded = !0;
        modesReady = !0;
        "undefined" != typeof afg_do ? afg_do() : game_starter();
    }
}

function game_starter(t = !1) {
    if ("paper2" != game_mode)
        if (newgame_loaded && modesReady) {
            newgame_loaded = null;
            var e = parseFloat(document.body.style.zoom);
            window.addWidth = .5 * document.body.clientWidth * e - .5 * document.body.clientWidth;
            !0 === window.obstaclesOn && obstaclesMake();
            grid_scale = 1;
            prev_scale = 1;
            $("#left").hide();
            $("#right").hide();
            $("#bottom").hide();
            $("#share").hide();
            $("#links").hide();
            $("#cpmstar_anchor").hide();
            $("div").each((function(t) {
                100 != this.style.zIndex || "0px" != this.style.left && "0px" != this.style.right || (this.style.display = "none");
            }));
            pause = !1;
            game_timer = +new Date;
            game_timer_c = 0;
            killed_other = 0;
            killed_total = 0;
        } else window.setTimeout(game_starter, 100);
    else if (window.paper2) {
        $(".main").hide();
        $(".main2").hide();
        $("#game_over").hide();
        window.paper2.start();
    } else window.setTimeout(game_starter, 100);
}

$("#nickname").on("keyup", (function(t) {
    13 == t.keyCode && $(".main").is(":visible") && $(".playButon").trigger("click");
}));

function resetPage() {
    location.reload();
}

function screen_sizes() {
    if ("blocks" != game_mode) {
        $("#paperio #outer_grid").css({
            width: 30 * grid_width + $("#paperio").width(),
            height: 30 * grid_height + $("#paperio").height()
        });
        $("#paperio #grid").css({
            width: 30 * grid_width,
            height: 30 * grid_height,
            left: $(window).width() / 2 / document.body.style.zoom,
            top: $("#paperio").height() / 2
        });
    }
}

$(document).ready((function() {}));

$(window).on("resize", (function() {}));

function setZoom() {
    if (0 == $(".grow").is(":visible") && 0 == $("#game_over").is(":visible")) {
        document.body.style.zoom = 1 / window.devicePixelRatio;
        screen_sizes();
    } else document.body.style.zoom = 1;
}

game_mode = game_with_modes ? "normal" : "";

game_challenge = 0;

obstaclesOn = !1;

game_speed = 400;

mpd = 0;

spd = 100;

function serverSelect(t, e) {
    spd = "ffa" == t ? 100 : "speed" == t ? 150 : "jet" == t ? 200 : 100;
    game_mode = e;
    $(".selectedServer").html(t);
    switch (game_mode) {
        case "paper2":
            Path2D || $(".play").hide();
    }
    window.game_speed = game_speed;
}

! function() {
    var t, e, n, i, a, s, o, r, c, l, h, u, f, d, m, p, x, y, g, v, _, w, k, b, M, S, T, E, P, q, C, I, O, z, L, j, R, D, B, A, W, F, K, H, N, U, Y, G, J, X, V, Z, Q, tt, et, nt, it, at, st, ot, rt, ct, lt, ht, ut, ft, dt, mt, pt;

    function _0x2fcax2b(t) {
        return (_0x2fcax2b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
    }

    function _0x2fcax2d(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }

    function _0x2fcax1e(t, e) {
        var n, i;
        for (n = 0; n < e.length; n++) {
            i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i);
        }
    }

    function _0x2fcax2f(t, e, n) {
        return e && _0x2fcax1e(t.prototype, e), n && _0x2fcax1e(t, n), t;
    }

    function _0x2fcax1f(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), e && _0x2fcax2e(t, e);
    }

    function _0x2fcax30(t) {
        return (_0x2fcax30 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }

    function _0x2fcax2e(t, e) {
        return (_0x2fcax2e = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }

    function _0x2fcax31(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }

    function _0x2fcax32(t, e) {
        return !e || "object" != typeof e && "function" != typeof e ? _0x2fcax31(t) : e;
    }

    function _0x2fcax33(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t;
        }(t) || function(t, e) {
            var n, i, a = [],
                s = !0,
                o = !1,
                r = void 0;
            try {
                for (i = t[Symbol.iterator](); !(s = (n = i.next()).done) && (a.push(n.value), !e || a.length !== e); s = !0);
            } catch (t) {
                o = !0, r = t;
            } finally {
                try {
                    s || null == i.return || i.return();
                } finally {
                    if (o) throw r;
                }
            }
            return a;
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }();
    }

    function _0x2fcax37(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance");
        }();
    }
    c = Math.pow(2, -26), l = function(t) {
            return Math.abs(t) <= c;
        }, h = function(t, e) {
            return Math.abs(t - e) <= c;
        }, u = function(t, e, n, i) {
            return t * i - e * n;
        }, f = function(t, e, n) {
            return Math.min(t, e) - c <= n && n <= Math.max(t, e) + c;
        }, d = function(t, e, n, i) {
            var a;
            return e < t && (a = t, t = e, e = a), i < n && (a = n, n = i, i = a), Math.min(e, i) - Math.max(t, n);
        }, m = performance || Date, p = m.now.bind(m), x = 1, y = function(t, e, n, i) {
            for (var a = 2 * Math.PI, s = a / n, o = [], r = 0; r < a - c; r += s) o.push(new v(t + Math.cos(r) * i, e + Math.sin(r) * i));
            return o;
        }, g = function(t, e, n) {
            return "#".concat(function(t) {
                var e = "";
                return t.forEach((function(t) {
                    var n = t.toString(16);
                    e += n.length < 2 ? "0".concat(n) : n;
                })), e;
            }(function(t) {
                var e, n, i, a, s, o, r, c, l = t.h,
                    h = t.s,
                    u = t.v;
                if (l = Math.max(0, Math.min(360, l)), h = Math.max(0, Math.min(100, h)), u = Math.max(0, Math.min(100, u)),
                    u /= 100, 0 == (h /= 100)) return e = n = i = u, [Math.round(255 * e), Math.round(255 * n), Math.round(255 * i)];
                switch (o = u * (1 - h), r = u * (1 - h * (s = (l /= 60) - (a = Math.floor(l)))),
                    c = u * (1 - h * (1 - s)), a) {
                    case 0:
                        e = u, n = c, i = o;
                        break;

                    case 1:
                        e = r, n = u, i = o;
                        break;

                    case 2:
                        e = o, n = u, i = c;
                        break;

                    case 3:
                        e = o, n = r, i = u;
                        break;

                    case 4:
                        e = c, n = o, i = u;
                        break;

                    default:
                        e = u, n = o, i = r;
                }
                return [Math.round(255 * e), Math.round(255 * n), Math.round(255 * i)];
            }({
                h: t,
                s: e,
                v: n
            })));
        }, v = function() {
            function _0x2fcax2e(t, e) {
                _0x2fcax2d(this, _0x2fcax2e), this.cell = null, this.segments = [], this.set(t, e);
            }
            return _0x2fcax2f(_0x2fcax2e, [{
                key: "set",
                value: function(t, e) {
                    return this.x = t || 0, this.y = e || (0 === e ? 0 : this.x), this;
                }
            }, {
                key: "commit",
                value: function(t) {
                    if (-1 === this.segments.indexOf(t) && this.segments.push(t), !this.cell) {
                        var e = _0x2fcax2e.space.cell(this);
                        e.commit(this), this.cell = e;
                    }
                }
            }, {
                key: "remove",
                value: function(t) {
                    var e = this.segments.indexOf(t);
                    this.segments.splice(e, 1), this.cell && !this.segments.length && this.cell.remove(this);
                }
            }, {
                key: "add",
                value: function(t) {
                    return this.x += t.x, this.y += t.y, this;
                }
            }, {
                key: "sub",
                value: function(t) {
                    return this.x -= t.x, this.y -= t.y, this;
                }
            }, {
                key: "mul",
                value: function(t) {
                    return this.x *= t.x, this.y *= t.y, this;
                }
            }, {
                key: "mulScalar",
                value: function(t) {
                    return this.x *= t, this.y *= t, this;
                }
            }, {
                key: "magnitude",
                value: function() {
                    var t = this.x,
                        e = this.y;
                    return Math.sqrt(t * t + e * e);
                }
            }, {
                key: "normalize",
                value: function() {
                    var t = this.magnitude();
                    return t && this.mulScalar(1 / t), this;
                }
            }, {
                key: "clone",
                value: function() {
                    return new _0x2fcax2e(this.x, this.y);
                }
            }, {
                key: "copy",
                value: function(t) {
                    return this.x = t.x, this.y = t.y, this;
                }
            }, {
                key: "distance",
                value: function(t) {
                    return Math.sqrt(this.distance2(t));
                }
            }, {
                key: "distance2",
                value: function(t) {
                    var e = this.x - t.x,
                        n = this.y - t.y;
                    return e * e + n * n;
                }
            }, {
                key: "dot",
                value: function(t) {
                    return this.x * t.x + this.y * t.y;
                }
            }, {
                key: "rotate",
                value: function(t) {
                    var e = this.x,
                        n = this.y,
                        i = Math.cos(t),
                        a = Math.sin(t);
                    return this.x = e * i - n * a, this.y = e * a + n * i, this;
                }
            }, {
                key: "angle",
                value: function(t) {
                    return Math.atan2(this.x * t.y - t.x * this.y, this.dot(t));
                }
            }, {
                key: "invert",
                value: function() {
                    return this.mulScalar(-1);
                }
            }, {
                key: "equal",
                value: function(t) {
                    return h(this.x, t.x) && h(this.y, t.y);
                }
            }]), _0x2fcax2e;
        }(), _ = function() {
            function _0x2fcax2e(t, e) {
                _0x2fcax2d(this, _0x2fcax2e), this.points = [], this.x = t, this.y = e;
            }
            return _0x2fcax2f(_0x2fcax2e, [{
                key: "commit",
                value: function(t) {
                    this.points.push(t);
                }
            }, {
                key: "remove",
                value: function(t) {
                    var e = this.points,
                        n = e.indexOf(t); -
                    1 !== n && e.splice(n, 1);
                }
            }]), _0x2fcax2e;
        }(), w = function() {
            function _0x2fcax35(t, e, n) {
                var i, a;
                _0x2fcax2d(this, _0x2fcax35), this.width = t, this.height = e, this.center = new v(t / 2, e / 2),
                    this.size = n, this.w = Math.ceil(t / n), this.h = Math.ceil(e / n), this.cells = [];
                for (i = 0; i < this.h; i++)
                    for (a = 0; a < this.w; a++) this.cells.push(new _(a, i));
            }
            return _0x2fcax2f(_0x2fcax35, [{
                key: "count",
                value: function() {
                    var t = 0;
                    return this.cells.forEach((function(e) {
                        t += e.points.length;
                    })), t;
                }
            }, {
                key: "cell",
                value: function(t) {
                    return this.getCell(Math.floor(t.x / this.size), Math.floor(t.y / this.size));
                }
            }, {
                key: "getCell",
                value: function(t, e) {
                    return this.cells[t + e * this.w];
                }
            }, {
                key: "checkPoint",
                value: function(t) {
                    return this.cell(t).points.find((function(e) {
                        return e.equal(t);
                    })) || t;
                }
            }, {
                key: "segmentsCount",
                value: function() {
                    var t, e, n;
                    for (t = {}, e = 0; e < this.h; e++)
                        for (n = 0; n < this.w; n++) this.getCell(n, e).points.forEach((function(e) {
                            e.segments.forEach((function(e) {
                                return t[e.id] = e;
                            }));
                        }));
                    return t;
                }
            }, {
                key: "intersections",
                value: function(t) {
                    var e, n, i, a, s, o, r, c, l, h, u;
                    for (e = this.cell(t.start), n = this.cell(t.end), i = Math.min(e.x, n.x), a = Math.max(e.x, n.x),
                        s = Math.min(e.y, n.y), o = Math.max(e.y, n.y), r = x++, c = [], l = s; l <= o; l++)
                        for (h = i; h <= a; h++) this.getCell(h, l).points.forEach((function(t) {
                            t.segments.forEach((function(t) {
                                t.mark !== r && (c.push(t), t.mark = r);
                            }));
                        }));
                    u = [];
                    return c.forEach((function(e) {
                        var n = e.intersect(t);
                        n && u.push(n);
                    })), u;
                }
            }]), _0x2fcax35;
        }(), k = function() {
            function _0x2fcax2e(t, e) {
                _0x2fcax2d(this, _0x2fcax2e), t.equal(e), this.mark = 0, this.shape = null, this.start = t,
                    this.end = e, this.calc();
            }
            return _0x2fcax2f(_0x2fcax2e, [{
                key: "calc",
                value: function() {
                    var t, e, n, i = this.start,
                        a = this.end;
                    this.vector = a.clone().sub(i);
                    t = i.y - a.y, e = a.x - i.x, n = Math.sqrt(t * t + e * e);
                    t /= n, e /= n, this.a = t, this.b = e, this.c = -(t * i.x + e * i.y);
                }
            }, {
                key: "clone",
                value: function() {
                    return new _0x2fcax2e(this.start, this.end);
                }
            }, {
                key: "reverse",
                value: function() {
                    var t = this.start;
                    return this.start = this.end, this.end = t, this.calc(), this;
                }
            }, {
                key: "commit",
                value: function(t) {
                    return this.shape = t, this.start.commit(this), this.end.commit(this), this;
                }
            }, {
                key: "remove",
                value: function() {
                    this.shape = null, this.start.remove(this), this.end.remove(this);
                }
            }, {
                key: "length",
                value: function() {
                    return this.vector.magnitude();
                }
            }, {
                key: "zn",
                value: function(t) {
                    var e = t.a,
                        n = t.b,
                        i = this.a,
                        a = this.b;
                    return u(e, n, i, a);
                }
            }, {
                key: "intersect",
                value: function(t) {
                    var e, n, i, a, s, o, r, h = t.a,
                        m = t.b,
                        p = t.c,
                        x = t.start,
                        y = t.end,
                        g = this.a,
                        _ = this.b,
                        w = this.c,
                        k = this.start,
                        b = this.end,
                        M = u(h, m, g, _);
                    if (!l(M)) {
                        e = -u(p, m, w, _) / M, n = -u(h, p, g, w) / M, i = f(x.x, y.x, e) && f(x.y, y.y, n) && f(k.x, b.x, e) && f(k.y, b.y, n) && new v(e, n);
                        return !!i && {
                            point: k.equal(i) && k || b.equal(i) && b || x.equal(i) && x || y.equal(i) && y || i,
                            segment: this,
                            distance: i.distance2(x),
                            overlay: !1,
                            zn: Math.sign(M)
                        };
                    }
                    a = d(x.x, y.x, k.x, b.x), s = d(x.y, y.y, k.y, b.y);
                    if (l(u(h, p, g, w)) && l(u(m, p, _, w)) && -c <= a && -c <= s) {
                        if (c <= a || c <= s) return {
                            point: o = f(k.x, b.x, x.x) && f(k.y, b.y, x.y) ? k.equal(x) && k || b.equal(x) && b || x : x.distance2(k) >= x.distance2(b) ? b : k,
                            segment: this,
                            distance: o.distance2(x),
                            overlay: !0,
                            zn: 0
                        };
                        r = k.equal(x) || k.equal(y) ? k : b;
                        return {
                            point: r,
                            segment: this,
                            distance: r.distance2(x),
                            overlay: !1,
                            zn: 0
                        };
                    }
                    return !1;
                }
            }, {
                key: "has",
                value: function(t) {
                    return this.start === t || this.end === t;
                }
            }, {
                key: "owner",
                get: function() {}
            }]), _0x2fcax2e;
        }(), b = function(t, e, n) {
            var i, a, s = t.x - n.x,
                o = t.y - n.y,
                r = e.x - n.x,
                c = e.y - n.y;
            if (0 < o * c) return 1;
            i = s * c - o * r, a = l(i) ? 0 : Math.sign(i);
            return 0 === a ? s * r <= 0 ? 0 : 1 : o < 0 ? -a : c < 0 ? a : 1;
        }, M = function() {
            function _0x2fcax1e(t) {
                _0x2fcax2d(this, _0x2fcax1e), this.segments = [], this.owner = null;
                for (var e = t.length, n = 0; n < e;) this.segments.push(new k(t[n++], t[n < e ? n : 0]));
                this.updateBounds();
            }
            return _0x2fcax2f(_0x2fcax1e, [{
                key: "commit",
                value: function(t) {
                    var e = this;
                    t && (this.owner = t), this.segments.forEach((function(t) {
                        return t.commit(e);
                    }));
                }
            }, {
                key: "remove",
                value: function() {
                    this.segments.forEach((function(t) {
                        return t.remove();
                    }));
                }
            }, {
                key: "reverse",
                value: function() {
                    return this.segments.reverse(), this.segments.forEach((function(t) {
                        return t.reverse();
                    })), this;
                }
            }, {
                key: "insert",
                value: function(t, e) {
                    if (!t.has(e)) {
                        var n = this.segments.findIndex((function(e) {
                                return e === t;
                            })),
                            i = new k(t.start, e).commit(this),
                            a = new k(e, t.end).commit(this);
                        t.remove(), this.segments.splice(n, 1, i, a);
                    }
                }
            }, {
                key: "hasPoint",
                value: function(t) {
                    return this.segments.some((function(e) {
                        return e.has(t);
                    }));
                }
            }, {
                key: "findSegment",
                value: function(t) {
                    return this.segments.findIndex((function(e) {
                        return e.start === t;
                    }));
                }
            }, {
                key: "splice",
                value: function(t, e, n) {
                    var i;
                    (i = this.segments).splice.apply(i, [e, n - e].concat(_0x2fcax37(t.segments))).forEach((function(t) {
                        return t.remove();
                    })), t.commit(this);
                }
            }, {
                key: "unsplice",
                value: function(t, e, n) {
                    var i = this.segments.splice(e, n - e);
                    this.remove(), this.segments = i.concat(t.reverse().segments), t.commit(this);
                }
            }, {
                key: "left",
                value: function(t, e, n) {
                    var i, a, s, o, r;
                    for (a = this, s = [], o = 0; o < t.length - 1; o++) s.push(new k(t[o], t[o + 1]));
                    r = (i = this.segments).splice.apply(i, [e, n - e].concat(s));
                    s.forEach((function(t) {
                        return t.commit(a);
                    })), r.forEach((function(t) {
                        return t.remove();
                    }));
                }
            }, {
                key: "right",
                value: function(t, e, n) {
                    var i, a, s, o;
                    for (i = this, a = [], s = 0; s < t.length - 1; s++) a.push(new k(t[s], t[s + 1]));
                    o = this.segments.splice(e, n - e);
                    this.remove(), a.reverse().forEach((function(t) {
                        return t.reverse().commit(i);
                    })), this.segments = o.concat(a);
                }
            }, {
                key: "points",
                value: function() {
                    return this.segments.map((function(t) {
                        return t.start;
                    }));
                }
            }, {
                key: "intersections",
                value: function(t) {
                    var e = [];
                    return 1 < this.segments.length && this.segments.forEach((function(n) {
                        var i = n.intersect(t);
                        i && e.push(i);
                    })), e.sort((function(t, e) {
                        return t.distance - e.distance;
                    })), e;
                }
            }, {
                key: "inside",
                value: function(t) {
                    var e, n, i, a, s, o, r;
                    for (e = this.segments.length, n = 1, i = 0; i < e; i++) {
                        a = this.segments[i], s = a.start, o = a.end, r = b(s, o, t);
                        if (0 === r) return !0;
                        n *= r;
                    }
                    return 1 !== n;
                }
            }, {
                key: "rawSquare",
                value: function() {
                    var t = 0;
                    return this.segments.forEach((function(e) {
                        var n = e.start,
                            i = e.end;
                        t += (n.x + i.x) * (i.y - n.y);
                    })), t / 2;
                }
            }, {
                key: "square",
                value: function() {
                    var t = this.rawSquare();
                    return t < 0 && (t *= -1), t;
                }
            }, {
                key: "calcPath",
                value: function() {
                    var t, e, n = new Path2D,
                        i = this.segments,
                        a = i.length,
                        s = i[0].start;
                    n.moveTo(s.x, s.y);
                    for (t = 1; t < a; t++) {
                        e = i[t].start;
                        n.lineTo(e.x, e.y);
                    }
                    n.closePath(), this.path = n, this.updateBounds();
                }
            }, {
                key: "updateBounds",
                value: function() {
                    var t = 1 / 0,
                        e = -1 / 0,
                        n = 1 / 0,
                        i = -1 / 0;
                    this.segments.forEach((function(a) {
                        var s = a.start,
                            o = s.x,
                            r = s.y;
                        t = Math.min(t, o), e = Math.max(e, o), n = Math.min(n, r), i = Math.max(i, r);
                    })), this.bounds = {
                        left: t,
                        right: e,
                        top: n,
                        bottom: i
                    };
                }
            }]), _0x2fcax1e;
        }(), S = function() {
            function _0x2fcax31(t, e) {
                var n, i, a, s, o, r;
                if (_0x2fcax2d(this, _0x2fcax31), !t) {
                    n = window.innerWidth / 2, i = window.innerHeight / 2, a = .85 * Math.min(n, i),
                        s = 2 * Math.PI, o = s / 200;
                    t = [];
                    for (r = 0; r < s - c; r += o) t.push(new v(n + Math.cos(r) * a, i + Math.sin(r) * a));
                }
                this.radius = e, this.polygon = new M(t);
            }
            return _0x2fcax2f(_0x2fcax31, [{
                key: "intersections",
                value: function(t) {
                    return this.polygon.intersections(t).filter((function(t) {
                        return !t.overlay;
                    }));
                }
            }]), _0x2fcax31;
        }(), T = function() {
            function _0x2fcax30(t, e, n, i, a, s, o) {
                _0x2fcax2d(this, _0x2fcax30), this.text = t, this.color = e, this.unit = n, this.position = i,
                    this.velocity = a, this.duration = s, this.time = s, this.fading = o;
            }
            return _0x2fcax2f(_0x2fcax30, [{
                key: "update",
                value: function(t) {
                    this.time -= t, 0 < this.time && this.position.add(this.velocity.clone().mulScalar(t / 1e3));
                }
            }, {
                key: "draw",
                value: function(t, e) {
                    var n, i, a, s = Math.floor((n = this.time / this.duration) * n * n * (n * (6 * n - 15) + 10) * 255).toString(16);
                    s.length < 2 && (s = "0" + s);
                    i = this.unit ? this.unit.position.clone().add(this.position) : this.position, a = ~~(38 / window.devicePixelRatio);
                    t.fillStyle = "".concat(this.color).concat(this.fading ? s : ""), t.font = "bold ".concat(a, "px Nunito"),
                        t.textAlign = "center", t.textBaseline = "middle", t.fillText(this.text, i.x * e, i.y * e);
                }
            }]), _0x2fcax30;
        }(), E = ((t = new Path2D).moveTo(-1, -1), t.lineTo(1, -1), t.lineTo(1, 1), t.lineTo(-1, 1),
            t.closePath(), t), P = function() {
            function _0x2fcax31(t, e, n, i, a, s, o, r) {
                _0x2fcax2d(this, _0x2fcax31), this.color = t, this.position = e, this.velocity = n,
                    this.acceleration = r, this.rotate = i, this.scale = a, this.vscale = s, this.rotation = Math.random() * Math.PI * 2,
                    this.time = o;
            }
            return _0x2fcax2f(_0x2fcax31, [{
                key: "update",
                value: function(t) {
                    this.time -= t;
                    var e = t / 1e3;
                    0 < this.time && (this.acceleration && this.velocity.add(this.acceleration.clone().mulScalar(e)),
                        this.position.add(this.velocity.clone().mulScalar(e)), this.rotation += this.rotate * e,
                        this.scale += this.vscale * e);
                }
            }, {
                key: "draw",
                value: function(t) {
                    var e = this.position,
                        n = e.x,
                        i = e.y,
                        a = this.rotation,
                        s = this.color,
                        o = this.scale;
                    t.save(), t.translate(n, i), t.rotate(a), t.scale(o, o), t.fillStyle = s, t.fill(E),
                        t.restore();
                }
            }]), _0x2fcax31;
        }(), q = function() {
            function _0x2fcax42(t, e) {
                var n, i, a, s, o, r, c, l, h, u, f = this;
                _0x2fcax2d(this, _0x2fcax42), this.up = !1, this.down = !1, this.left = !1, this.right = !1,
                    this.modifiers = {
                        shift: !1,
                        ctrl: !1,
                        alt: !1,
                        meta: !1
                    }, this.mouse = null, this.lastMouse = null, this.buttons = {
                        left: !1,
                        middle: !1,
                        right: !1
                    }, (this.keyboardModeSwitch = e).get();
                n = function(t) {
                    return t.preventDefault();
                };
                t.addEventListener("contextmenu", n, !1);
                i = function(t) {
                    return f.onKeyChange(t, !0);
                }, a = function(t) {
                    return f.onKeyChange(t, !1);
                };
                window.addEventListener("keydown", i, !1), window.addEventListener("keyup", a, !1);
                s = function(t) {
                    return f.onMouseChange(t, !0);
                }, o = function(t) {
                    return f.onMouseChange(t, !1);
                }, r = function() {
                    f.lastMouse = f.mouse, f.mouse = null;
                }, c = function(t) {
                    null === f.mouse && (f.mouse = {}), f.mouse.x = t.pageX, f.mouse.y = t.pageY;
                }, l = function(t) {
                    c(t);
                    var e = t.buttons;
                    f.buttons = {
                        left: !!(1 & e),
                        middle: !!(4 & e),
                        right: !!(2 & e)
                    };
                };
                t.addEventListener("mouseenter", l, !1), t.addEventListener("mousemove", c, !1),
                    t.addEventListener("mouseleave", r, !1), t.addEventListener("mousedown", s, !1),
                    t.addEventListener("mouseup", o, !1);
                h = function() {
                    f.lastMouse = f.mouse, f.mouse = null;
                }, u = function(t) {
                    null === f.mouse && (f.mouse = {});
                    var e = t.changedTouches[0];
                    f.mouse.x = e.clientX, f.mouse.y = e.clientY;
                };
                t.addEventListener("touchstart", u, !1), t.addEventListener("touchmove", u, !1),
                    t.addEventListener("touchend", h, !1), t.addEventListener("touchcancel", h, !1),
                    this.dispose = function() {
                        t.removeEventListener("contextmenu", n, !1), window.removeEventListener("keydown", i, !1),
                            window.removeEventListener("keyup", a, !1), t.removeEventListener("mouseenter", l, !1),
                            t.removeEventListener("mousemove", c, !1), t.removeEventListener("mouseleave", r, !1),
                            t.removeEventListener("mousedown", s, !1), t.removeEventListener("mouseup", o, !1),
                            t.removeEventListener("touchstart", touchHandler, !1), t.removeEventListener("touchmove", touchHandler, !1);
                    };
            }
            return _0x2fcax2f(_0x2fcax42, [{
                key: "pressed",
                value: function() {
                    return this.up || this.down || this.left || this.right;
                }
            }, {
                key: "onKeyChange",
                value: function(t, e) {
                    if (t.target === document.body) {
                        switch (t.keyCode) {
                            case 38:
                            case 87:
                                this.up = e;
                                break;

                            case 40:
                            case 83:
                                this.down = e;
                                break;

                            case 37:
                            case 65:
                                this.left = e;
                                break;

                            case 39:
                            case 68:
                                this.right = e;
                                break;

                            case 67:
                                e || this.keyboardModeSwitch.switch();
                        }
                        this.modifiers.shift = t.shiftKey, this.modifiers.ctrl = t.ctrlKey, this.modifiers.alt = t.altKey,
                            this.modifiers.meta = t.metaKey;
                    }
                }
            }, {
                key: "onMouseChange",
                value: function(t, e) {
                    switch (t.button) {
                        case 0:
                            this.buttons.left = e;
                            break;

                        case 1:
                            this.buttons.middle = e;
                            break;

                        case 2:
                            this.buttons.right = e;
                    }
                }
            }]), _0x2fcax42;
        }(), C = {
            baseRadius: 30,
            baseCount: 50,
            minScale: 3,
            maxScale: 5,
            trackWidth: 8,
            unitSpeed: 90,
            spawnTimeout: 3e3,
            prepareCounter: 1e3,
            baseHeight: 2
        }, I = function(t, e, n) {
            t.fillStyle = n, t.fill(e);
        }, O = function(t, e, n, i, a) {
            var s = e.polygon.path;
            t.fillStyle = i, t.fill(s);
        }, z = function(t, e, n, i, a, s) {
            var o = C.trackWidth;
            n.polyline.segments.length && (t.lineWidth = o + (a ? 2 : 0), t.strokeStyle = e,
                t.stroke(n.polyline.path));
        }, L = ((n = new Path2D).moveTo(-24, -24), n.lineTo(-8, -8), n.lineTo(0, -24), n.lineTo(8, -8),
            n.lineTo(24, -24), n.lineTo(16, 8), n.lineTo(-16, 8), n.closePath(), n), (i = new Path2D).moveTo(0, -14),
        i.lineTo(10, -12), i.lineTo(14, -6), i.lineTo(12, 4), i.lineTo(8, 6), i.lineTo(6, 12),
        i.lineTo(0, 14), i.lineTo(-6, 12), i.lineTo(-8, 6), i.lineTo(-12, 4), i.lineTo(-14, -6),
        i.lineTo(-10, -12), i.closePath(), i.arc(-6, -2, 4, 0, 2 * Math.PI, !0), i.closePath(),
        i.arc(6, -2, 4, 0, 2 * Math.PI, !0), i.closePath(), i.moveTo(0, 2), i.lineTo(-4, 6),
        i.lineTo(0, 8), i.lineTo(4, 6), i.closePath(), i, j = function(t, e, n) {
            var i, a, s, o, r, c = C.trackWidth;
            if (n.image) {
                i = n.image.naturalWidth || n.image.width, a = n.image.naturalHeight || n.image.height,
                    s = c * e.skin.avatar.scale * n.scale / i;
                t.save(), t.translate(e.position.x, e.position.y - C.baseHeight * n.level), t.rotate(e.direction + Math.PI / 2),
                    t.translate((e.skin.avatar.x + n.x) * c, (e.skin.avatar.y + n.y) * c);
                o = 0;
                if ("target" === n.direction) {
                    r = e.target.clone().sub(e.position);
                    o += Math.atan2(r.y, r.x) - e.direction;
                }
                "billboard" === n.direction && (o += -e.direction - Math.PI / 2), n.rotation && (o += .0174533 * n.rotation),
                    o && t.rotate(o), t.drawImage(n.image, i * s * -n.pivot.x, a * s * -n.pivot.y, i * s, a * s),
                    t.restore();
            }
        }, R = function() {
            function _0x2fcax2e(t, e) {
                _0x2fcax2d(this, _0x2fcax2e), this.unit = t, this.merges = [], this.polygon = new M(e),
                    this.polygon.commit(this), this.calcSquare(), this.polygon.calcPath();
            }
            return _0x2fcax2f(_0x2fcax2e, [{
                key: "calcPath",
                value: function() {
                    var t, e, n, i, a;
                    this.path = new Path2D;
                    t = this.polygon.segments, e = t.length, n = t[0].start;
                    this.path.moveTo(n.x, n.y);
                    for (i = 1; i < e; i++) {
                        a = t[i].start;
                        this.path.lineTo(a.x, a.y);
                    }
                    return this.path.closePath(), this.path;
                }
            }, {
                key: "calcSquare",
                value: function() {
                    this.square = this.polygon.square();
                }
            }, {
                key: "remove",
                value: function() {
                    this.polygon.remove();
                }
            }, {
                key: "handleIntersect",
                value: function(t, e, n, i) {
                    e === this.unit ? this.handleSelfIntersect(t, e, n, i) : this.handleEnemyIntersect(t, e, n, i);
                }
            }, {
                key: "handleSelfIntersect",
                value: function(t, e, n, i) {
                    if (!t.overlay) {
                        var a = t.point,
                            s = t.segment;
                        if (e.in === this) {
                            if (t.zn < 0) return;
                            if (a.equal(n.end)) return;
                            this.polygon.insert(s, a), e.track.polyline.add(a), e.in = null;
                        } else {
                            if (0 < t.zn) return;
                            if (a.equal(n.start)) return;
                            if (e.in) return;
                            this.polygon.insert(s, a), e.track.polyline.add(a), e.track.polyline.end && i.handleReturn(e),
                                e.in = this, e.track.remove();
                        }
                    }
                }
            }, {
                key: "handleEnemyIntersect",
                value: function(t, e, n, i) {
                    var a = t.point,
                        s = t.segment;
                    if (e.in === this) {
                        if (t.zn < 0) return;
                        this.polygon.insert(s, a), e.track.polyline.add(a), e.track.intersect(t, this, !1),
                            e.in = null;
                    } else {
                        if (0 < t.zn) return;
                        if (t.overlay) return;
                        if (a.equal(n.end)) return;
                        if (e.in) return;
                        this.polygon.insert(s, a), e.track.polyline.add(a), e.track.intersect(t, this, !0),
                            e.in = this;
                    }
                }
            }]), _0x2fcax2e;
        }(), D = function() {
            function _0x2fcax1f(t) {
                _0x2fcax2d(this, _0x2fcax1f), this.owner = t || null, this.start = null, this.end = null,
                    this.segments = [], this.bounds = {
                        left: 1 / 0,
                        right: -1 / 0,
                        top: 1 / 0,
                        bottom: -1 / 0
                    }, this.path = new Path2D;
            }
            return _0x2fcax2f(_0x2fcax1f, [{
                key: "commit",
                value: function(t) {
                    this.segments.forEach((function(e) {
                        return e.commit(t);
                    }));
                }
            }, {
                key: "remove",
                value: function() {
                    this.segments.forEach((function(t) {
                        return t.remove();
                    }));
                }
            }, {
                key: "reverse",
                value: function() {
                    if (this.segments.reverse().forEach((function(t) {
                            return t.reverse();
                        })), this.end) {
                        var t = this.start;
                        this.start = this.end, this.end = t;
                    }
                    return this;
                }
            }, {
                key: "clone",
                value: function() {
                    var t = new _0x2fcax1f;
                    return t.segments = this.segments.map((function(t) {
                            return t.clone();
                        })), t.start = this.start, t.end = this.end, Object.assign(t.bounds, this.bounds),
                        t;
                }
            }, {
                key: "updateBounds",
                value: function(t) {
                    var e = t.x,
                        n = t.y;
                    this.bounds.left = Math.min(this.bounds.left, e), this.bounds.right = Math.max(this.bounds.right, e),
                        this.bounds.top = Math.min(this.bounds.top, n), this.bounds.bottom = Math.max(this.bounds.bottom, n);
                }
            }, {
                key: "add",
                value: function(t) {
                    var e, n, i = this.end || this.start;
                    if (!i || !i.equal(t)) {
                        e = t.x, n = t.y;
                        if (this.end) return this.segments.push(new k(this.end, t).commit(this)), this.end = t,
                            this.updateBounds(t), void this.path.lineTo(e, n);
                        if (this.start) return this.segments.push(new k(this.start, t).commit(this)), this.end = t,
                            this.updateBounds(t), void this.path.lineTo(e, n);
                        this.start = t, this.updateBounds(t), this.path.moveTo(e, n);
                    }
                }
            }, {
                key: "points",
                value: function() {
                    var t = this.segments.map((function(t) {
                        return t.start;
                    }));
                    return this.end && t.push(this.end), t;
                }
            }]), _0x2fcax1f;
        }(), B = function() {
            function _0x2fcax1f(t) {
                _0x2fcax2d(this, _0x2fcax1f), this.polyline = new D(this), this.unit = t, this.intersections = [],
                    this.isTrack = !0;
            }
            return _0x2fcax2f(_0x2fcax1f, [{
                key: "intersect",
                value: function(t, e, n) {
                    var i = this.intersections.find((function(e) {
                        return e.point.equal(t.point);
                    }));
                    i ? i.intersections.push({
                        intersection: t,
                        base: e,
                        enter: n
                    }) : this.intersections.push({
                        point: t.point,
                        intersections: [{
                            intersection: t,
                            base: e,
                            enter: n
                        }]
                    });
                }
            }, {
                key: "remove",
                value: function() {
                    this.polyline.remove(), this.polyline = new D(this), this.intersections = [];
                }
            }, {
                key: "handleIntersect",
                value: function(t, e, n, i) {
                    e === this.unit ? !0 !== t.overlay && t.point === this.polyline.segments[this.polyline.segments.length - 1].end || (this.unit.position = t.point,
                        i.kill(this.unit)) : i.kill(this.unit, e);
                }
            }, {
                key: "owner",
                get: function() {}
            }]), _0x2fcax1f;
        }(), A = function() {
            function _0x2fcax1e(t, e, n) {
                _0x2fcax2d(this, _0x2fcax1e), this.states = t, this.state = "", this.payload = n,
                    this.context = {}, this.change(e);
            }
            return _0x2fcax2f(_0x2fcax1e, [{
                key: "change",
                value: function(t) {
                    var e, n = this.states[this.state];
                    n && n.leave && (this.context = n.leave(this.payload, this.context) || this.context);
                    e = this.states[t];
                    e && (this.state = t, this.context = e.enter && e.enter(this.payload, this.context) || this.context,
                        this.update());
                }
            }, {
                key: "update",
                value: function() {
                    var t = this.states[this.state],
                        e = t && t.update(this.payload, this.context);
                    e && this.change(e);
                }
            }]), _0x2fcax1e;
        }(), W = {
            idle: {
                update: function() {
                    return Math.random() < .25 ? "cut" : "exit";
                }
            },
            cut: {
                enter: function(t) {
                    var e = t.position.clone().sub(t.game.space.center),
                        n = e.magnitude(),
                        i = new k(t.position, e.normalize().mulScalar(t.game.border.radius - n + 10).add(t.position)),
                        a = t.base.polygon.intersections(i),
                        s = {};
                    return s.exitPoint = a.sort((function(t, e) {
                        return t.distance - e.distance;
                    }))[0].point, s;
                },
                update: function(t, e) {
                    if (t.in !== t.base) return "capture";
                    var n = t.position.distance(t.game.space.center);
                    if (t.game.border.radius - n < 1) return "idle";
                    t.target = e.exitPoint;
                }
            },
            exit: {
                enter: function(t) {
                    var e, n, i, a, s = {},
                        o = 1 / 0,
                        r = t.base.polygon.segments.length,
                        c = C.unitSpeed;
                    for (s.minDistance = c; void 0 === e;) {
                        for (n = 0; n < 1; n++) {
                            i = ~~(Math.random() * r), a = t.base.polygon.segments[i].start.distance(t.position);
                            a < o && c < a && (o = a, e = i);
                        }
                        c *= .75;
                    }
                    return s.exitPoint = t.base.polygon.segments[e].start, s;
                },
                update: function(t, e) {
                    if (t.in !== t.base) return "capture";
                    var n = t.base.polygon.segments.length,
                        i = e.minDistance,
                        a = ~~(Math.random() * n),
                        s = t.base.polygon.segments[a].start,
                        o = s.distance(t.position),
                        r = e.exitPoint.distance(t.position);
                    i < o && o < r ? e.exitPoint = s : (Object.values(e.exitPoint.segments).some((function(e) {
                            return e && e.shape === t.base.polygon;
                        })) || (e.exitPoint = s), t.target && t.target.distance(t.game.space.center) > t.game.border.radius - 1 && (e.exitPoint = s)),
                        t.target = e.exitPoint;
                }
            },
            capture: {
                enter: function(t, e) {
                    var n, i, a, s, o, r, c, l, h, u = e.exitPoint,
                        f = C.unitSpeed,
                        d = t.base.polygon.segments,
                        m = (1 + Math.random()) * f,
                        p = Math.sign(Math.random() - .5) || 1,
                        x = 0,
                        y = d.findIndex((function(t) {
                            return t.start.equal(u);
                        }));
                    if (-1 === y) {
                        n = 1 / 0, i = 0;
                        if (d.forEach((function(e, a) {
                                var s = e.start.distance2(t.position);
                                s < n && (n = s, i = a);
                            })), u = d[i].start, e.exitPoint = u, -1 === (y = d.findIndex((function(t) {
                                return t.start.equal(u);
                            })))) throw console.log("exitPoint", u), new Error("Сегмент не найден. Баг в грязном хаке!!!");
                    }
                    for (a = !1; x < m;) {
                        if (x = d[y].start.distance(u), (y += p) >= d.length) {
                            if (y = 0, a) break;
                            a = !0;
                        }
                        if (y < 0) {
                            if (y = d.length - 1, a) break;
                            a = !0;
                        }
                    }
                    s = d[y].start, o = s.clone().sub(u), r = u.clone().add(o.clone().mulScalar(.5)),
                        c = (.5 + Math.random()) * f, l = o.clone().rotate(-p * Math.PI / 2).normalize().mulScalar(c),
                        h = r.add(l);
                    t.target = h, e.targets = [s], e.sign = p, e.returnPoint = s;
                },
                update: function(t, e) {
                    if (t.in === t.base) return "idle";
                    if (!Object.values(e.returnPoint.segments).some((function(e) {
                            return e && e.shape === t.base.polygon;
                        }))) return "back";
                    if (t.game.units.some((function(e) {
                            return e !== t && t.position.distance(e.position) < C.unitSpeed;
                        }))) return "back";
                    if (t.target.distance(t.game.space.center) > t.game.border.radius + 18) return "back";
                    if (t.position.distance2(t.target) < 400) {
                        var n = e.targets.shift();
                        if (!n) return "back";
                        t.target = n;
                    }
                }
            },
            back: {
                enter: function(t, e) {
                    var n, i = t.base.polygon.segments,
                        a = e.exitPoint,
                        s = e.sign,
                        o = 1 / 0,
                        r = 0;
                    i.forEach((function(e, n) {
                        var i = e.start.distance2(t.position);
                        i < o && (o = i, r = n);
                    }));
                    n = i[r].start;
                    if (a)
                        for (; n.distance2(a) < 100;)(r += s) >= i.length && (r = 0), r < 0 && (r = i.length - 1),
                            n = i[r].start;
                    t.target = n;
                },
                update: function(t, e) {
                    if (t.in === t.base) return "idle";
                }
            }
        }, F = function() {
            function _0x2fcax34(t, e, n, i) {
                _0x2fcax2d(this, _0x2fcax34), this.name = t, this.direction = 0, this.position = e,
                    this.base = new R(this, n), this.skin = i, this.lastSquare = this.base.square, this.in = this.base,
                    this.track = new B(this), this.target = null, this.respawn = !1, this.statistics = {
                        kills: 0
                    };
            }
            return _0x2fcax2f(_0x2fcax34, [{
                key: "movement",
                value: function() {
                    return this.target && this.target.clone().sub(this.position).normalize();
                }
            }, {
                key: "speed",
                get: function() {}
            }]), _0x2fcax34;
        }(), K = function(t) {
            function _0x2fcax35(t, e, n, i) {
                var a;
                return _0x2fcax2d(this, _0x2fcax35), (a = _0x2fcax32(this, _0x2fcax30(_0x2fcax35).call(this, t, e, n, i))).lastSquare = a.base.square,
                    a;
            }
            return _0x2fcax1f(_0x2fcax35, F), _0x2fcax2f(_0x2fcax35, [{
                key: "update",
                value: function(t) {
                    this.respawn || (this.target = t.direction.clone().mulScalar(50).add(this.position));
                }
            }]), _0x2fcax35;
        }(), H = function(t) {
            function _0x2fcax36(t, e, n, i, a) {
                var s;
                return _0x2fcax2d(this, _0x2fcax36), (s = _0x2fcax32(this, _0x2fcax30(_0x2fcax36).call(this, t, n, i, a))).targets = [],
                    s.game = e, s.fsm = new A(W, "exit", _0x2fcax31(s)), s;
            }
            return _0x2fcax1f(_0x2fcax36, F), _0x2fcax2f(_0x2fcax36, [{
                key: "update",
                value: function() {
                    this.fsm.update();
                }
            }]), _0x2fcax36;
        }(), N = Math.cos(0), U = Math.sin(0), Y = function(t) {
            var e = Math.cos(t),
                n = Math.sin(t);
            return new v(N * e - U * n, N * n + U * e);
        }, G = function() {
            function _0x2fcax32(t, e, n, i, r, c, l, h) {
                var u, f = this;
                if (_0x2fcax2d(this, _0x2fcax32), s = C.minScale, a = C.maxScale, o = C.trackWidth,
                    this.controller = new q(t, h), this.skinManager = i, this.nameManager = l, this.space = e,
                    this.maxUnits = r, this.view = t, this.border = n, this.player = null, this.units = [],
                    this.mouse = new v, this.direction = new v(1, 0), this.keyboard = !1, this.fakeMouse = null,
                    this.labels = [], this.scale = a, this.square = this.border.polygon.square(), this.gameOverCallback = c,
                    this.actived = !1, this.needSuspendSpawn = !0, this.suspendSpawn = !1, this.generateParticles = !1,
                    this.particles = [], this.border.polygon.calcPath(), t) {
                    u = function() {
                        f.view.width = window.innerWidth, f.view.height = window.innerHeight;
                    };
                    window.addEventListener("resize", u, !1), u();
                }
                this.stats = {
                    fps: 0,
                    ut: 0,
                    ait: 0,
                    st: 0,
                    rt: 0
                }, this.timings = {
                    updateStartTime: 0,
                    updateEndTime: 0,
                    aiStartTime: 0,
                    aiEndTime: 0,
                    spawnStartTime: 0,
                    spawnEndTime: 0,
                    renderStartTime: 0,
                    renderEndTime: 0
                };
            }
            return _0x2fcax2f(_0x2fcax32, [{
                key: "addPlayer",
                value: function(t) {
                    this.units.push(t), this.player = t;
                }
            }, {
                key: "addUnit",
                value: function(t) {
                    this.units.push(t);
                }
            }, {
                key: "getspawnPosition",
                value: function(t) {
                    var e, n, i, a, s, o, r, c;
                    for (e = this.space.center, n = this.border.radius, i = 2 * C.baseRadius, a = i * (this.player ? 3 - this.player.base.square / this.square * 2 : 3),
                        s = a * a, o = e.clone().add(new v(0, t ? n - 3 * i + Math.random() * (2 * i) : Math.random() * (n - i)).rotate(Math.random() * Math.PI * 2)),
                        r = 0; r < this.units.length; r++) {
                        c = this.units[r];
                        if (c.base.polygon.inside(o)) return;
                        if (c.base.polygon.segments.some((function(t) {
                                return o.distance2(t.start) < s;
                            }))) return;
                        if (c.track.polyline.segments.some((function(t) {
                                return o.distance2(t.start) < s;
                            }))) return;
                    }
                    return o;
                }
            }, {
                key: "spawnBot",
                value: function(t) {
                    var e, n = this;
                    if (this.actived) {
                        if (this.suspendSpawn) return;
                        if (this.needSuspendSpawn) return this.suspendSpawn = !0, void setTimeout((function() {
                            n.needSuspendSpawn = !1, n.suspendSpawn = !1;
                        }), (1 + Math.random()) * C.spawnTimeout);
                    }
                    if (this.nameManager.pool.length) {
                        e = this.getspawnPosition(t);
                        e && (this.addUnit(new H(this.nameManager.get(), this, e, y(e.x, e.y, C.baseCount, C.baseRadius), this.skinManager.get())),
                            this.needSuspendSpawn = !0, this.suspendSpawn = !1);
                    } else this.nameManager.request();
                }
            }, {
                key: "spawnPlayer",
                value: function(t, e) {
                    var n, i, o, r, c, l, h;
                    for (i = 0; !n;) 50 < ++i && (i = 0, this.units.length && this.kill(this.units[0])),
                        n = this.getspawnPosition();
                    if (n) {
                        o = this.skinManager.get(e, !0);
                        if (!o) {
                            r = this.units.find((function(t) {
                                return t.skin.name === e;
                            }));
                            r ? (o = r.skin, r.skin = this.skinManager.get()) : o = this.skinManager.get("", !0);
                        }
                        c = Math.floor(499 * Math.random() + 1);
                        l = $("#nickname").val();
                        "" == l && (l = "paperio7.com_" + c);
                        h = new K(t || l, n, y(n.x, n.y, C.baseCount, C.baseRadius), o);
                        this.addPlayer(h), this.scale = a - h.base.square / this.square * (a - s), this.startTime = Date.now();
                    }
                }
            }, {
                key: "genKillParticles",
                value: function(t, e, n) {
                    var i, a = this;
                    if (this.generateParticles) {
                        i = 0;
                        e.forEach((function(e) {
                            var s, o, r;
                            if (5 < (i += e.vector.magnitude())) {
                                i = 0;
                                s = e.vector.clone().normalize().rotate(Math.sign(Math.random() - .5) * Math.PI / 2).mulScalar(25 + 100 * Math.random());
                                .25 < Math.random() && s.mulScalar(.1);
                                o = (n ? 3 : 1) * (1 + .5 * Math.random()), r = new P(t.skin.colors.particles[~~(Math.random() * t.skin.colors.particles.length)], e.start.clone(), s, 2 * Math.PI * (1 + Math.random()) * Math.sign(Math.random() - .5 || 1), o, .9 * -o, 1e3);
                                a.particles.push(r);
                            }
                        }));
                    }
                }
            }, {
                key: "gameOver",
                value: function(t) {
                    var e, n, i, a, s, o, r, c, l, h = this,
                        u = 1 / 0,
                        f = 0,
                        d = 1 / 0,
                        m = 0;
                    this.player.base.polygon.segments.forEach((function(t) {
                        var e = t.start,
                            n = e.x,
                            i = e.y;
                        u = Math.min(u, n), f = Math.max(f, n), d = Math.min(d, i), m = Math.max(m, i);
                    }));
                    e = f - u, n = m - d, i = Math.max(e, n), a = new v(u + e / 2, d + n / 2), s = 475 / i,
                        o = document.createElement("canvas");
                    o.width = 500, o.height = 500;
                    r = o.getContext("2d");
                    r.scale(s, s), r.translate(250 / s - a.x, 250 / s - a.y), r.translate(0, 5 / s),
                        I(r, this.player.base.polygon.path, this.player.skin.colors.back), r.translate(0, -10 / s),
                        I(r, this.player.base.polygon.path, this.player.skin.pattern || this.player.skin.colors.main);
                    c = o.toDataURL("image/png"), l = {
                        game: this,
                        score: t ? 100 : this.player.base.square / this.square * 100,
                        best: this.best,
                        time: Date.now() - this.startTime,
                        kills: this.player.statistics.kills,
                        image: c,
                        win: t
                    };
                    setTimeout((function() {
                        t && h.kill(h.player, void 0, t), h.player = null, h.gameOverCallback && h.gameOverCallback(l);
                    }), 1e3);
                }
            }, {
                key: "kill",
                value: function(t, e, n) {
                    t.death = !0, this.skinManager && this.skinManager.release(t.skin), this.units.forEach((function(e) {
                            e !== t && e.in === t.base && (e.in = null);
                        })), this.genKillParticles(t, t.track.polyline.segments), this.genKillParticles(t, t.base.polygon.segments, !0),
                        t.track.remove(), t.base.remove();
                    var i = this.units.findIndex((function(e) {
                        return e === t;
                    }));
                    this.units.splice(i, 1), e && (e.statistics.kills++, e === this.player && this.labels.push(new T("Kill", t.skin.colors.main, e, new v(0, -35), new v(0, -10), 1e3, !0))),
                        n || t !== this.player || this.gameOver();
                }
            }, {
                key: "getMovement",
                value: function(t, e) {
                    var n, i, a, s, o, r, c, h, u, f, d, m, p, x, y, g, v = [],
                        _ = e.movement();
                    if (!_) return v;
                    _.mulScalar(spd * t / 1e3);
                    n = Y(e.direction), i = Math.atan2(n.x * _.y - _.x * n.y, n.dot(_)), a = 2 * Math.PI * t / 1e3;
                    Math.abs(i) > a && (i = a * Math.sign(i)), e.direction += i;
                    for (s = Y(e.direction).mulScalar(spd * t / 1e3), o = new k(e.position, e.position.clone().add(s)),
                        r = this.border.intersections(o); r.length;) {
                        c = void 0, h = o.vector;
                        if (2 === r.length) {
                            u = r[0].segment.vector;
                            c = 0 < Math.atan2(h.x * u.y - u.x * h.y, h.dot(u)) ? r[0] : r[1];
                        } else c = r[0];
                        f = c, d = f.segment, m = f.point, p = d.vector;
                        if (Math.atan2(h.x * p.y - p.x * h.y, h.dot(p)) < 0) break;
                        if (!l(c.distance)) {
                            x = new k(o.start, m);
                            v.push(x);
                        }
                        y = (o = new k(m, o.end)).vector, g = p.clone().normalize().mulScalar(y.dot(p) / p.magnitude());
                        o = new k(m, m.clone().add(g)), r = this.border.intersections(o);
                    }
                    return v.push(o), v;
                }
            }, {
                key: "update",
                value: function(t) {
                    var e, n, i, r, c, l, u, f = this;
                    if (this.timings.updateStartTime = p(), this.controller.pressed())
                        if (this.keyboard = Object.assign({}, this.controller.mouse),
                            this.controller.keyboardModeSwitch.mode2) {
                            e = 0;
                            (this.controller.up || this.controller.left) && (e = -1), (this.controller.down || this.controller.right) && (e = 1),
                            e && this.direction.rotate(t * e * .003);
                        } else {
                            n = new v;
                            if (this.controller.up && n.add(new v(0, -1)), this.controller.down && n.add(new v(0, 1)),
                                this.controller.left && n.add(new v(-1, 0)), this.controller.right && n.add(new v(1, 0)),
                                n.magnitude()) {
                                i = Math.atan2(this.direction.x * n.y - n.x * this.direction.y, this.direction.x * n.x + this.direction.y * n.y),
                                    r = t * Math.sign(i) * .003;
                                this.direction.rotate(Math.abs(r) > Math.abs(i) ? i : r);
                            }
                        }
                    else this.controller.mouse ? (!this.keyboard || this.keyboard.x !== this.controller.mouse.x && this.keyboard.y !== this.controller.mouse.y) && (this.keyboard = null,
                        this.direction = new v(this.controller.mouse.x, this.controller.mouse.y).sub(new v(this.view.width / 2, this.view.height / 2)).normalize()) : !this.keyboard && this.controller.lastMouse && (this.direction = new v(this.controller.lastMouse.x, this.controller.lastMouse.y).sub(new v(this.view.width / 2, this.view.height / 2)).normalize());
                    c = this.player;
                    if (this.timings.aiStartTime = p(), this.units.forEach((function(t) {
                            return t.update(f);
                        })), this.timings.aiEndTime = p(), this.units.slice().forEach((function(e) {
                            var n, i, a;
                            if (!e.death)
                                for (n = f.getMovement(t, e), i = function() {
                                        var t, i, a, s, r, c, l, u, d, m, p, x, y, g, _, w;
                                        if (e.death) return {
                                            v: void 0
                                        };
                                        t = n.shift(), i = f.space.intersections(t), a = [];
                                        i.forEach((function(t) {
                                            var e = a.findIndex((function(e) {
                                                return e.point.equal(t.point);
                                            }));
                                            if (-1 === e) a.push({
                                                point: t.point,
                                                intersections: [t]
                                            });
                                            else {
                                                if (t.point !== a[e].point)
                                                    if (t.point.cell) {
                                                        if (a[e].point.cell) throw new Error("Бывает ли такое?");
                                                        a[e].point = t.point, a[e].intersections.forEach((function(e) {
                                                            e.point = t.point;
                                                        }));
                                                    } else t.point = a[e].point;
                                                a[e].intersections.push(t);
                                            }
                                        })), i.forEach((function(e) {
                                            e.distance = t.start.distance2(e.point);
                                        })), i.sort((function(t, e) {
                                            return t.distance - e.distance;
                                        }));
                                        s = [], r = null, c = -1;
                                        if (i.forEach((function(t) {
                                                h(t.distance, c) || (r = [], c = t.distance, s.push(r)), r.push(t);
                                            })), s.forEach((function(n) {
                                                var i, a = [];
                                                n.forEach((function(t) {
                                                    var e = t.segment.shape;
                                                    e && -1 === a.indexOf(e) && a.push(e);
                                                }));
                                                for (i = function() {
                                                        var i, s, o, r, c, l, h = a.findIndex((function(t) {
                                                            return t.owner === e.in;
                                                        }));
                                                        if (0 < h) {
                                                            i = a[0];
                                                            a[0] = a[h], a[h] = i;
                                                        }
                                                        s = a.findIndex((function(t) {
                                                            return t.owner.isTrack;
                                                        }));
                                                        if (0 < s) {
                                                            o = a[0];
                                                            a[0] = a[s], a[s] = o;
                                                        }
                                                        r = a.shift(), c = [];
                                                        for (n.forEach((function(t) {
                                                                t.segment.shape === r && c.push(t);
                                                            })); !e.death && c.length;) {
                                                            c.sort((function(t, n) {
                                                                return e.in ? n.zn - t.zn : t.zn - n.zn;
                                                            }));
                                                            l = c.shift();
                                                            l.segment.shape && !r.owner.unit.death && r.owner.handleIntersect(l, e, t, f);
                                                        }
                                                    }; a.length;) i();
                                            })), e.death) return {
                                            v: void 0
                                        };
                                        l = t.end;
                                        if (e.in !== e.base && e.track.polyline.add(l), e.position = l, f.generateParticles && !n.length && e.in && e.in !== e.base) {
                                            u = Math.sign(Math.random() - .5), d = e.skin.avatar.scale * o, m = t.vector.clone().normalize().rotate(u * Math.random() * (Math.PI / 30)).mulScalar(1 * C.unitSpeed + Math.random() * C.unitSpeed),
                                                p = t.vector.clone().rotate(Math.PI / 2).normalize().mulScalar(u * Math.random() * d / 2),
                                                x = t.vector.clone().normalize().mulScalar(d / 2), y = t.vector.clone().normalize().mulScalar(-6 * C.unitSpeed),
                                                g = e.in.unit.skin.colors.particles, _ = .75 + .5 * Math.random(), w = new P(g[~~(Math.random() * g.length)], t.start.clone().add(p).add(x).add(new v(0, -C.baseHeight)), m, Math.PI + Math.random() * Math.PI, _, -2 * _, 300, y);
                                            f.particles.push(w);
                                        }
                                    }; n.length;) {
                                    a = i();
                                    if ("object" === _0x2fcax2b(a)) return a.v;
                                }
                        })), c) {
                        l = (c.base.square - c.lastSquare) / this.square * 100;
                        c.lastSquare = c.base.square, .01 <= l && this.labels.push(new T("+".concat(l.toFixed(2), "%"), c.skin.colors.back, c, new v(0, -35), new v(0, -10), 1e3, !0));
                    }
                    this.units.sort((function(t, e) {
                        return e.base.square - t.base.square;
                    })), this.labels = this.labels.filter((function(e) {
                        return e.update(t), 0 < e.time;
                    })), this.particles = this.particles.filter((function(e) {
                        return e.update(t), 0 < e.time;
                    }));
                    u = (c ? a - c.base.square / this.square * (a - s) : .5) - this.scale;
                    this.scale += u * t / 200, c && .9999 < c.base.square / this.square && this.gameOver(!0),
                        this.timings.spawnStartTime = p(), this.units.length < this.maxUnits && this.spawnBot(.3 < Math.random()),
                        this.timings.spawnEndTime = p(), this.timings.updateEndTime = p();
                }
            }, {
                key: "render",
                value: function(t) {
                    var n, i, a, s, r, c, l, h, u, m, x, y, g, v, _, w, k, b, M, S, T, E, P, q, $, R, D, B, A, W, F, K, H, N = this;
                    this.timings.renderStartTime = p();
                    n = this.view;
                    if (n) {
                        i = n.getContext("2d"), a = window.devicePixelRatio, s = n.width * a, r = n.height * a,
                            c = Math.sqrt(s * s + r * r) / Math.sqrt(2455780), l = this.scale * c / a, h = this.player ? this.player.position : this.space.center,
                            u = h.x * l - n.width / 2, m = h.y * l - n.height / 2, x = h.x - n.width / 2 / l,
                            y = h.x + n.width / 2 / l, g = h.y - n.height / 2 / l, v = h.y + n.height / 2 / l,
                            _ = function(t) {
                                var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
                                return f(x - e, y + e, t.x) && f(g - e, v + e, t.y);
                            }, w = function(t) {
                                var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
                                return 0 < d(t.bounds.left - e, t.bounds.right + e, x, y) && 0 < d(t.bounds.top - e, t.bounds.bottom + e, g, v);
                            };
                        i.resetTransform(), i.clearRect(0, 0, n.width, n.height), i.translate(-u, -m), i.scale(l, l),
                            i.translate(0, -C.baseHeight), this.units.forEach((function(t) {
                                w(t.base.polygon, o) && I(i, t.base.polygon.path, t.skin.pattern || t.skin.colors.main);
                            })), i.lineCap = "round", i.globalCompositeOperation = "destination-out", this.units.forEach((function(t) {
                                var e = t.track.polyline,
                                    n = e.start;
                                e.bounds;
                                n && w(t.track.polyline, o) && (z(i, t.skin.colors.main, t.track, t.position), i.save(),
                                    i.globalCompositeOperation = "destination-over", i.clip(t.base.polygon.path), i.fillStyle = t.skin.pattern || t.skin.colors.main,
                                    z(i, t.skin.pattern || t.skin.colors.main, t.track, t.position, !0), i.restore());
                            })), i.translate(0, C.baseHeight), i.globalCompositeOperation = "source-over", this.units.forEach((function(t) {
                                _(t.position, 4 * o) && (i.save(), t.skin.avatar.topLayers.forEach((function(e) {
                                    return j(i, t, e);
                                })), i.restore());
                            })), this.units.forEach((function(t) {
                                ! function(t, e, n) {
                                    var i = ~~(30 / window.devicePixelRatio);
                                    t.save(), t.translate(e.position.x, e.position.y), t.scale(1.001 / n, 1.001 / n),
                                        t.font = "bold ".concat(i, "px Nunito"), t.textAlign = "center", t.textBaseline = "bottom",
                                        t.fillStyle = e.skin.colors.nick, t.fillText(e.name, 0, -10 * n), t.restore();
                                }(i, t, l);
                            })), i.globalCompositeOperation = "destination-over", this.units.forEach((function(t) {
                                _(t.position, 4 * o) && (i.save(), t.skin.avatar.bottomLayers.forEach((function(e) {
                                    return j(i, t, e);
                                })), i.restore());
                            })), i.globalAlpha = .6, this.units.forEach((function(t) {
                                t.in !== t.base && w(t.track.polyline, o) && z(i, t.skin.pattern || t.skin.colors.main, t.track, t.position);
                            })), i.globalAlpha = 1, this.units.forEach((function(t) {
                                w(t.base.polygon, o) && I(i, t.base.polygon.path, t.skin && t.skin.back || t.skin.colors.back);
                            })), O(i, this.border, 0, "#e7fff4"), i.translate(0, 5), O(i, this.border, 0, "#88a799"),
                            i.translate(0, -5), i.fillStyle = function(t, n) {
                                return e || ((e = t.createLinearGradient(n.width / 2, 0, n.width / 2, n.height)).addColorStop(0, "#2d6998"),
                                    e.addColorStop(.5, "#51d7dd"), e.addColorStop(1, "#81faff")), e;
                            }(i, this.space), i.fillRect(s / -2, r / -2, this.space.width + s, this.space.height + r),
                            i.lineJoin = "round", i.globalCompositeOperation = "source-over", i.globalCompositeOperation = "source-over",
                            i.lineJoin = "butt", i.lineCap = "butt", this.particles.forEach((function(t) {
                                return _(t.position, o) && t.draw(i);
                            })), i.scale(1 / l, 1 / l), this.labels.forEach((function(t) {
                                return t.draw(i, l);
                            })), i.scale(l, l);
                        k = this.units[0];
                        k && function(t, e, n) {
                            var i = window.devicePixelRatio,
                                a = ~~(30 / i);
                            t.save(), t.translate(e.position.x, e.position.y), t.scale(1 / (n * i), 1 / (n * i)),
                                t.fillStyle = "#ffff00", t.strokeStyle = "#ff8800", t.lineJoin = "round", t.lineWidth = 1,
                                t.translate(0, -10 * n * i), t.translate(0, -4), t.translate(0, -a * i), t.translate(0, -12),
                                t.fill(L), t.stroke(L), t.restore();
                        }(i, k, l);
                        b = k && k.base.square / this.square;
                        i.resetTransform();
                        M = function(t, e, n, i, a, s) {
                            var o = _0x2fcax33(s, 4),
                                r = o[0],
                                c = o[1],
                                l = o[2],
                                h = o[3];
                            t.beginPath(), t.moveTo(e + r, n), t.lineTo(e + i - c, n), t.quadraticCurveTo(e + i, n, e + i, n + c),
                                t.lineTo(e + i, n + a - l), t.quadraticCurveTo(e + i, n + a, e + i - l, n + a),
                                t.lineTo(e + h, n + a), t.quadraticCurveTo(e, n + a, e, n + a - h), t.lineTo(e, n + r),
                                t.quadraticCurveTo(e, n, e + r, n), t.closePath(), t.fill();
                        };
                        i.scale(1 / a, 1 / a);
                        for (T = function(t, e, n) {
                                return n < t ? t : e < n ? e : n;
                            }(9 / 16, 16 / 9, s / r), E = 9 / 16 - 16 / 9, P = s / (-(1.75 + 1.75 * T) / E),
                            q = P / 2, $ = function(t, e, n, a) {
                                var o, r = 16 + 46 * n,
                                    c = t.base.square / N.square / a * q;
                                S && S - .05 * q < c && (c = S - .05 * q);
                                o = s - (q + (S = c));
                                i.fillStyle = "#00000011", M(i, o, 16 + r, P, 36, [18, 0, 0, 18]), i.fillStyle = t.skin.colors.back,
                                    M(i, o, 4 + r, P, 36, [18, 0, 0, 18]), i.fillStyle = t.skin.colors.main, M(i, o, r, P, 36, [18, 0, 0, 18]),
                                    i.fillStyle = t.skin.colors.nick, i.font = "bold ".concat(20, "px Nunito"), i.textAlign = "left",
                                    i.textBaseline = "middle", i.fillText("".concat(e, "— ").concat((t.base.square / N.square * 100).toFixed(2), "% ").concat(t.name), 18 + o, 18 + r + 2);
                            }, R = !1, D = 0; D < 5; D++) {
                            B = this.units[D];
                            B && (B === this.player && (R = !0), $(B, D + 1, D, b));
                        }
                        if (!R && this.player && !this.player.death) {
                            A = this.units.findIndex((function(t) {
                                return t === N.player;
                            }));
                            $(this.player, A + 1, 6, b);
                        }
                        if (this.player) {
                            i.fillStyle = "#00000022", M(i, 0, 16, P, 40, [0, 20, 20, 0]);
                            W = .25 * P + this.player.base.square / this.square * P * .75;
                            i.fillStyle = this.player.skin.colors.back, M(i, 0, 20, W, 36, [0, 18, 18, 0]),
                                i.fillStyle = this.player.skin.colors.main, M(i, 0, 14, W, 36, [0, 18, 18, 0]),
                                i.fillStyle = this.player.skin.colors.nick, i.font = "bold ".concat(22, "px Nunito"),
                                i.textAlign = "left", i.textBaseline = "middle", i.fillText("".concat((this.player.base.square / this.square * 100).toFixed(2), "%"), 18, 36),
                                i.fillStyle = "#00000088", i.fillStyle = "#58c921", M(i, 0, 60, 150, 36, [0, 18, 18, 0]),
                                i.font = "bold ".concat(20, "px Nunito"), i.fillStyle = "#fff", i.textBaseline = "top",
                                i.fillText("🏆 ".concat(this.best.toFixed(2), "%"), 3, 70);
                            i.fillStyle = "#ffae13", M(i, 0, 100, 80, 36, [0, 18, 18, 0]), i.fillStyle = "#fff",
                                i.font = "bold ".concat(20, "px Nunito"), i.textBaseline = "middle", i.fillText("☠️ ".concat(this.player.statistics.kills), 3, 120);
                        }
                        this.timings.renderEndTime = p();
                        F = function(t, e) {
                            return .95 * t + .05 * e;
                        }, K = this.stats, H = this.timings;
                        K.fps = F(K.fps, 1e3 / t), K.ut = F(K.ut, H.updateEndTime - H.updateStartTime),
                            K.ait = F(K.ait, H.aiEndTime - H.aiStartTime), K.st = F(K.st, H.spawnEndTime - H.spawnStartTime),
                            K.rt = F(K.rt, H.renderEndTime - H.renderStartTime);
                    }
                }
            }, {
                key: "checkSegments",
                value: function(t) {
                    this.units.forEach((function(t) {
                        t.base.polygon.segments.length, t.track.polyline.segments.length;
                    }));
                    var e = this.space.segmentsCount();
                    Object.keys(e).length;
                }
            }, {
                key: "handleReturn",
                value: function(t) {
                    var e, n, i, a, s, o, r, c, l, h, u, f, d, m, p, x, y, g = this;
                    if (!t.death) {
                        e = t.track.polyline.clone(), n = t.base, i = n.polygon.segments.findIndex((function(t) {
                            return t.start === e.start;
                        })), a = n.polygon.segments.findIndex((function(t) {
                            return t.start === e.end;
                        })), s = Math.min(a, i), o = Math.max(a, i);
                        s !== i && e.reverse();
                        r = e.points(), c = n.polygon.points(), l = c.splice.apply(c, [s, o - s + 1].concat(_0x2fcax37(r)));
                        l.shift(), l.pop(), l.reverse(), l.push.apply(l, _0x2fcax37(r));
                        u = new M(l);
                        u.rawSquare() < 0 ? (h = new M(c.reverse()), n.polygon.unsplice(e, s, o)) : (h = u,
                            n.polygon.splice(e, s, o)), n.square += h.square(), n.polygon.calcPath(), this.units.filter((function(e) {
                            return e !== t;
                        })).forEach((function(e) {
                            e.death || (e.in === e.base && h.inside(e.position) && g.kill(e, t), e.track.polyline.start && h.inside(e.track.polyline.start) && g.kill(e, t));
                        }));
                        for (f = [], d = t.track.polyline.segments, m = d.length, p = function(e) {
                                var n, i, a, s, o, r, c = e === m ? d[e - 1].end : d[e].start,
                                    l = c.segments.filter((function(e) {
                                        return e.shape.owner !== t.track && e.shape.owner !== t.base && e.start === c;
                                    }));
                                if (l.length) {
                                    n = l.map((function(t) {
                                        return {
                                            owner: t.shape.owner,
                                            point: c,
                                            segment: t,
                                            index: e
                                        };
                                    }));
                                    if (f.length) {
                                        i = f.filter((function(t) {
                                            return n.some((function(e) {
                                                return e.owner === t.owner;
                                            }));
                                        }));
                                        if (i.length) {
                                            a = i[0], s = n.find((function(t) {
                                                return t.owner === a.owner;
                                            }));
                                            ! function(e) {
                                                var n, i, a, s, o, r, c, l, h, u, f = e.owner,
                                                    d = e.startT,
                                                    m = e.endT,
                                                    p = e.startPoint,
                                                    x = e.endPoint,
                                                    y = e.enter,
                                                    v = e.leave;
                                                if (y.shape !== f.polygon && (y = f.polygon.segments.find((function(t) {
                                                        return t.start === p;
                                                    }))), v.shape !== f.polygon && (v = f.polygon.segments.find((function(t) {
                                                        return t.start === x;
                                                    }))), y !== v) {
                                                    n = t.track.polyline.points().splice(d, m - d + 1), i = f.polygon.segments.findIndex((function(t) {
                                                        return t === y;
                                                    })), a = f.polygon.segments.findIndex((function(t) {
                                                        return t === v;
                                                    })), s = Math.min(a, i), o = Math.max(a, i);
                                                    s !== i && n.reverse();
                                                    r = f.polygon.points(), c = r.splice.apply(r, [s, o - s + 1].concat(_0x2fcax37(n)));
                                                    c.shift(), c.pop(), c.push.apply(c, _0x2fcax37(n.slice().reverse()));
                                                    h = new M(c), u = new M(r);
                                                    l = f.unit.in === f.unit.base && h.inside(f.unit.position) || f.unit.in !== f.unit.base && h.inside(f.unit.track.polyline.start) ? (f.polygon.right(n, s, o),
                                                            u) : (f.polygon.left(n, s, o), h), f.square -= l.square(), f.polygon.calcPath(),
                                                        g.units.forEach((function(t) {
                                                            f.unit !== t && t.in === f && l.inside(t.position) && (t.in = null);
                                                        }));
                                                }
                                            }({
                                                owner: a.owner,
                                                enter: a.segment,
                                                startPoint: a.point,
                                                startT: a.index,
                                                leave: s.segment,
                                                endPoint: s.point,
                                                endT: s.index
                                            });
                                            o = t.track.intersections.find((function(t) {
                                                return t.point.equal(c);
                                            })).intersections.filter((function(t) {
                                                return t.base === a.owner;
                                            }));
                                            1 !== o.length && !1 !== o[o.length - 1].enter || (n = n.filter((function(t) {
                                                return t.owner !== a.owner;
                                            })));
                                        }
                                        f = n;
                                    } else {
                                        r = t.track.intersections.find((function(t) {
                                            return t.point.equal(c);
                                        }));
                                        if (!r) return {
                                            v: !1
                                        };
                                        f = n.filter((function(t) {
                                            var e = r.intersections.filter((function(e) {
                                                return e.base === t.owner;
                                            }));
                                            return !!e.length && e[e.length - 1].enter;
                                        }));
                                    }
                                }
                            }, x = 0; x <= m; x++) {
                            y = p(x);
                            if ("object" === _0x2fcax2b(y)) return y.v;
                        }
                        this.units.forEach((function(e) {
                            t !== e && h.inside(e.position) && (e.in = t.base);
                        }));
                    }
                }
            }]), _0x2fcax32;
        }(), J = C.trackWidth * C.maxScale, X = {
            level: 0,
            scale: 1,
            x: 0,
            y: 0,
            pivot: {
                x: .5,
                y: .5
            },
            direction: "",
            rotation: 0,
            image: null
        }, V = {
            scale: 1,
            x: 0,
            y: 0,
            layers: []
        }, Z = {
            main: "black",
            back: "black",
            nick: "black",
            particles: ["black"]
        }, Q = {
            name: "",
            colors: Z,
            pattern: null,
            avatar: null
        }, tt = document.createElementNS("http://www.w3.org/2000/svg", "svg"), et = function _0x2fcax2c(t, e, n) {
            var i, a, s = this;
            if (_0x2fcax2d(this, _0x2fcax2c), Object.assign(this, Q, e), this.colors = Object.assign({}, Z, e.colors),
                this.pattern = null, e.pattern) {
                i = new Image;
                i.onload = function() {
                    var n, a, o = i.width,
                        r = i.height,
                        c = 100 / o * C.maxScale * (e.pattern.scale || 1),
                        l = document.createElement("canvas");
                    l.width = ~~(o * c), l.height = ~~(r * c), l.getContext("2d").drawImage(i, 0, 0, l.width, l.height),
                        s.pattern = t.getContext("2d").createPattern(l, "repeat");
                    n = 1 / C.maxScale, a = tt.createSVGMatrix().scale(n, n);
                    s.pattern.setTransform && s.pattern.setTransform(a);
                }, i.src = n + e.pattern.url;
            }
            a = function(t, e) {
                var n, i = document.createElement("canvas");
                i.width = J, i.height = J;
                n = i.getContext("2d");
                return n.fillStyle = e, n.fillRect(0, 0, J, J), n.fillStyle = t, n.fillRect(J / 6, J / 6, 2 / 3 * J, 2 / 3 * J),
                    i;
            };
            e.avatar ? (this.avatar = Object.assign({}, V, e.avatar), this.avatar.layers = (e.avatar.layers || []).map((function(t) {
                var e, i = Object.assign({}, X, t);
                i.pivot = Object.assign({
                    x: .5,
                    y: .5
                }, t.pivot);
                e = new Image;
                return e.src = n + i.url, e.onload = function() {
                    var t = e.naturalWidth || e.width,
                        n = e.naturalHeight || e.height,
                        a = J * s.avatar.scale * i.scale / t,
                        o = ~~(t * a),
                        r = ~~(n * a),
                        c = document.createElement("canvas");
                    c.width = o, c.height = r, c.getContext("2d").drawImage(e, 0, 0, o, r), i.image = c;
                }, i;
            }))) : this.avatar = Object.assign({}, V, {
                layers: [Object.assign({}, X, {
                    image: a(this.colors.back, this.colors.back)
                }), Object.assign({}, X, {
                    level: 1,
                    image: a(this.colors.main, this.colors.back)
                })]
            }), this.avatar.topLayers = this.avatar.layers.filter((function(t) {
                return 1 <= t.level;
            })).sort((function(t, e) {
                return t.level - e.level;
            })), this.avatar.bottomLayers = this.avatar.layers.filter((function(t) {
                return t.level < 1;
            })).sort((function(t, e) {
                return e.level - t.level;
            }));
        }, nt = function() {
            function _0x2fcax2c(t) {
                var e = this;
                _0x2fcax2d(this, _0x2fcax2c), this.view = t, this.available = [], this.used = [];
                [0, 30, 60, 120, 175, 200, 220, 240, 260, 280, 320].forEach((function(n) {
                    var i = g(n, 70, 100),
                        a = g(n, 70, 95),
                        s = g(n, 70, 80),
                        o = g(n, 70, 60);
                    e.available.push(new et(t, {
                        colors: {
                            main: a,
                            back: s,
                            nick: o,
                            particles: [i, a, s, o]
                        }
                    }));
                }));
            }
            return _0x2fcax2f(_0x2fcax2c, [{
                key: "add",
                value: function(t, e) {
                    var n = this;
                    t.forEach((function(t) {
                        return n.available.push(new et(n.view, t, e));
                    }));
                }
            }, {
                key: "get",
                value: function(t, e) {
                    var n, i, a, s, o;
                    "default" === t && (t = "");
                    i = this.available.length;
                    if (!i) throw new Error("Запас скинов исчерпан");
                    if (t) n = this.available.findIndex((function(e) {
                        return e.name === t;
                    }));
                    else if (e) {
                        a = this.available.filter((function(e) {
                            return e.name === t;
                        })), s = a[~~(Math.random() * a.length)];
                        n = this.available.indexOf(s);
                    } else n = ~~(Math.random() * i);
                    if (0 <= n) {
                        o = this.available.splice(n, 1)[0];
                        return this.used.push(o), o;
                    }
                }
            }, {
                key: "release",
                value: function(t) {
                    var e = this.used.indexOf(t); -
                    1 !== e && this.used.splice(e, 1), this.available.push(t);
                }
            }]), _0x2fcax2c;
        }(), it = function() {
            function _0x2fcax1f(t) {
                _0x2fcax2d(this, _0x2fcax1f), this.pool = [], this.requested = !1, this.callback = function() {
                    return t && t.prepare();
                };
            }
            return _0x2fcax2f(_0x2fcax1f, [{
                key: "get",
                value: function() {
                    return this.pool.shift();
                }
            }, {
                key: "request",
                value: function() {
                    var t, e = this;
                    if (!this.requested) {
                        this.requested = !0;
                        t = 10 - this.pool.length;
                        $.ajax({
                            url: "paper2.php",
                            method: "POST",
                            data: {
                                length: t
                            },
                            success: function(t) {
                                e.requested = !1, e.pool = e.pool.concat(t.names), e.callback && (e.callback(),
                                    e.callback = null);
                            },
                            error: function(t, n, i) {
                                e.requested = !1;
                            }
                        });
                    }
                }
            }]), _0x2fcax1f;
        }(), at = function() {
            function _0x2fcax2c() {
                _0x2fcax2d(this, _0x2fcax2c), this.mode2 = !1;
            }
            return _0x2fcax2f(_0x2fcax2c, [{
                key: "get",
                value: function() {
                    return "undefined" != typeof Cookies && void 0 !== Cookies.get("paper2_keyboard_mode2") && (this.mode2 = "true" === Cookies.get("paper2_keyboard_mode2")),
                        this.mode2;
                }
            }, {
                key: "switch",
                value: function() {
                    this.mode2 = !this.mode2, "undefined" != typeof Cookies && Cookies.set("paper2_keyboard_mode2", this.mode2);
                }
            }]), _0x2fcax2c;
        }();
    if (Path2D) {
        st = new w(2e3, 2e3, 50);
        v.space = st;
        ot = new v(1e3, 1e3), rt = .95 * Math.min(ot.x, ot.y), ct = new S(y(ot.x, ot.y, 300, rt), rt),
            lt = {}, ht = 0, ut = function(t) {
                var e = t.game,
                    n = t.score,
                    i = t.best,
                    a = (t.time, t.kills, t.image, t.win);
                t.newBest = !1, i < n && ("undefined" != typeof Cookies && Cookies.set("paper3_best", n),
                        t.newBest = !0, t.best = n), a && (ht = 0, lt.prepare()), e.view.style.display = "none",
                    e.generateParticles = !1, e.actived = !1, window.paper2_results = t, window.game_is_over_main();
            }, ft = ((r = document.createElement("canvas")).style.display = "none", r.style.width = "100%",
                r.style.height = "100%", r.style.position = "absolute", r.style.top = "50%", r.style.left = "50%",
                r.style.transform = "translate(-50%, -50%)", document.body.appendChild(r), r), dt = new it(lt),
            mt = new nt(ft), pt = new at;
        $.ajax({
            url: "skins/skins.json",
            method: "GET",
            success: function(t) {
                dt.request(), mt.add(t, "skins/");
                var e, n, i = new G(ft, st, ct, mt, 10, ut, dt, pt),
                    a = !1,
                    s = C.spawnTimeout;
                C.spawnTimeout = 0, lt.prepare = function() {
                    e = setInterval((function() {
                        dt.pool.length && (i.update(1e3 / 60 * 2 + Math.random()), ++ht > C.prepareCounter && clearInterval(e));
                    }), 1e3 / 60);
                }, lt.start = function() {
                    for (i.best = "undefined" != typeof Cookies && Cookies.get("paper3_best") ? parseFloat(Cookies.get("paper3_best")) : 0,
                        i.view.style.display = "block", i.controller.keyboardModeSwitch.get(), clearInterval(e); ht < C.prepareCounter; ht++) i.update(1e3 / 60 * 2 + Math.random());
                    C.spawnTimeout = s;
                    i.spawnPlayer("undefined" != typeof Cookies && Cookies.get("myNick"), Cookies.get("mySkin")),
                        i.generateParticles = !0, i.actived = !0, a || (a = !0, n = performance.now() - 1e3 / 60,
                            function _0x2fcax2c() {
                                var t, e, a = performance.now(),
                                    s = a - n;
                                !i.actived && 500 < s && (s = 1e3 / 60 + Math.random());
                                for (t = s; 0 < s;)
                                    if (2e3 / 60 < s) {
                                        e = Math.random() + 2e3 / 60;
                                        s - e < 1e3 / 60 && (e = Math.random() + 25), s -= e, i.update(e);
                                    } else i.update(s), s = 0;
                                i.actived && i.render(t), n = a, requestAnimationFrame(_0x2fcax2c);
                            }());
                }, window.paper2 = lt;
            }
        });
    } else window.paper2 = {
        noSupport: !0
    };
}();
