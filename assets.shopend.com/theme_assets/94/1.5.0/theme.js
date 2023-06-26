/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
function arrayContainsArray(t, e) {
    return 0 !== e.length && e.every(function(e) {
        return t.indexOf(e) >= 0
    })
}

function unique(t, e, i) {
    return i.indexOf(t) == e
}

function cartesianProduct(t) {
    var e, i, n, o, r, a = [];
    if (!t || 0 == t.length) return t;
    for (r = t.splice(0, 1)[0], t = cartesianProduct(t), e = 0, n = r.length; e < n; e++)
        if (t && t.length)
            for (i = 0, o = t.length; i < o; i++) a.push([r[e]].concat(t[i]));
        else a.push([r[e]]);
    return a
}

function enableAddButton(t) {
    var e = $(".add-to-cart-button"),
        i = e.find(".add_text"),
        n = e.find(".price_info"),
        o = e.attr("data-add-title");
    e.attr("disabled", !1), t ? (quantity = parseInt($("#quantity").val()), quantity > 0 && (updated_total_price = quantity * t), n.html(Format.money(updated_total_price, !0, !0)), e.attr("data-selected-price", t), n.show()) : (priceTitle = "", n.hide()), i.html(o)
}

function disableAddButton(t) {
    var e = $(".add-to-cart-button"),
        i = e.find(".add_text"),
        n = e.find(".price_info"),
        o = e.attr("data-add-title");
    if ("sold-out" == t) o = e.attr("data-sold-title");
    e.is(":disabled") || e.attr("disabled", "disabled"), i.html(o), n.hide()
}

function enableSelectOption(t) {
    t.removeAttr("disabled"), t.text(t.attr("data-name")), t.removeAttr("disabled-type"), t.parent().is("span") && t.unwrap()
}

function disableSelectOption(t, e) {
    if ("sold-out" === e && (disabled_text = t.parent().attr("data-sold-text"), disabled_type = "sold-out", "false" === show_sold_out_product_options ? hide_option = !0 : hide_option = !1), "unavailable" === e && (disabled_text = t.parent().attr("data-unavailable-text"), disabled_type = "unavailable", hide_option = !0), t.val() > 0) {
        var i = t.attr("data-name");
        t.attr("disabled", !0), t.text(i + " " + disabled_text), t.attr("disabled-type", disabled_type), !0 === hide_option && (t.parent().is("span") || t.wrap("<span>"))
    }
}

function processProduct(t) {
    t.has_option_groups && (disableAddButton("add-to-cart"), setInitialProductOptionStatuses(t), $(".product_option_group").on("change", function() {
        disableAddButton("add-to-cart"), $("#option").val(0), processAvailableDropdownOptions(t, $(this))
    }), $("#option").val() > 0 && enableAddButton()), $(".product_option_select").length && (disableAddButton(), "false" === show_sold_out_product_options && $('option[disabled-type="sold-out"]').wrap("<span>")), $(".reset-selection-button").on("click", function() {
        disableAddButton("add-to-cart"), $("#option").val(0), $(this).hide(), $(".product_option_group option").each(function(t, e) {
            e.value > 0 && enableSelectOption($(e))
        }), setInitialProductOptionStatuses(t)
    })
}

function createCartesianProductOptions(t) {
    for (product_option_groups = [], ogIndex = 0; ogIndex < t.option_groups.length; ogIndex++) {
        for (product_option_group_group_values = [], ogvIndex = 0; ogvIndex < t.option_groups[ogIndex].values.length; ogvIndex++) product_option_group_group_values.push(t.option_groups[ogIndex].values[ogvIndex].id);
        product_option_groups.push(product_option_group_group_values)
    }
    return cartesianProduct(product_option_groups)
}

function setInitialProductOptionStatuses(t) {
    for (product_option_group_values = [], ogIndex = 0; ogIndex < t.option_groups.length; ogIndex++)
        for (ogvIndex = 0; ogvIndex < t.option_groups[ogIndex].values.length; ogvIndex++) product_option_group_values.push(t.option_groups[ogIndex].values[ogvIndex].id);
    for (cartesian_options = createCartesianProductOptions(t), pogv = 0; pogv < product_option_group_values.length; pogv++) {
        var e = product_option_group_values[pogv],
            i = 0,
            n = 0,
            o = 0;
        for (co = 0; co < cartesian_options.length; co++) cartesian_options[co].includes(e) && (product_option = findProductOptionByValueArray(t.options, cartesian_options[co]), product_option && (o++, product_option.sold_out && n++), i++);
        dropdown_select = $(".product_option_group option[value='" + e + "']"), 0 !== o && i !== n && o !== n || (0 === o && (disable_type = "unavailable"), i !== n && o !== n || (disable_type = "sold-out"), disableSelectOption(dropdown_select, disable_type))
    }
}

function processAvailableDropdownOptions(t, e) {
    if (selected_values = getSelectedValues(), num_selected = selected_values.count(t => t > 0), allSelected = selected_values.every(isGreaterThanZero), num_option_groups = t.option_groups.length, changed_value = parseInt(e.val()), selected_value = [], selected_value.push(changed_value), this_group_id = e.attr("data-group-id"), $(".product_option_group").not(e).find("option").each(function(t, e) {
            e.value > 0 && enableSelectOption($(e))
        }), cartesian_options = createCartesianProductOptions(t), 1 === num_selected && num_option_groups > 1)
        for (ogIndex = 0; ogIndex < t.option_groups.length; ogIndex++) {
            var n = t.option_groups[ogIndex];
            if (n.id != this_group_id)
                for (ogvIndex = 0; ogvIndex < n.values.length; ogvIndex++) {
                    var o = n.values[ogvIndex];
                    option_group_value_array = [], option_group_value_array.push(changed_value), option_group_value_array.push(parseInt(o.id));
                    var r = 0,
                        a = 0,
                        s = 0;
                    for (co = 0; co < cartesian_options.length; co++) arrayContainsArray(cartesian_options[co], option_group_value_array) && (product_option = findProductOptionByValueArray(t.options, cartesian_options[co]), product_option && (s++, product_option.sold_out && a++), r++);
                    dropdown_select = $(".product_option_group option[value='" + o.id + "']"), 0 !== s && r !== a && s !== a || (0 === s && (disable_type = "unavailable"), r !== a && s !== a || (disable_type = "sold-out"), disableSelectOption(dropdown_select, disable_type))
                }
        }
    if (2 === num_selected && 3 === num_option_groups)
        for ($(".product_option_group").each(function(t, e) {
                0 == e.value && (unselected_group_id = parseInt($(e).attr("data-group-id")))
            }), ogIndex = 0; ogIndex < t.option_groups.length; ogIndex++)
            if ((n = t.option_groups[ogIndex]).id != this_group_id)
                for (ogvIndex = 0; ogvIndex < n.values.length; ogvIndex++) {
                    o = n.values[ogvIndex], option_group_value_array = [], option_group_value_array.push(changed_value), option_group_value_array.push(parseInt(o.id));
                    r = 0, a = 0, s = 0;
                    for (co = 0; co < cartesian_options.length; co++) arrayContainsArray(cartesian_options[co], option_group_value_array) && (product_option = findProductOptionByValueArray(t.options, cartesian_options[co]), product_option && (s++, product_option.sold_out && a++), r++);
                    if (n.id === unselected_group_id) {
                        for (option_group_value_array = [], option_group_value_array.push(parseInt(o.id)), svIndex = 0; svIndex < selected_values.length; svIndex++) selected_values[svIndex] > 0 && option_group_value_array.push(selected_values[svIndex]);
                        product_option = findProductOptionByValueArray(t.options, option_group_value_array), dropdown_select = $(".product_option_group option[value='" + o.id + "']"), product_option ? product_option.sold_out && disableSelectOption(dropdown_select, "sold-out") : disableSelectOption(dropdown_select, "unavailable")
                    }
                    dropdown_select = $(".product_option_group option[value='" + o.id + "']"), 0 !== s && r !== a && s !== a || (0 === s && (disable_type = "unavailable"), r !== a && s !== a || (disable_type = "sold-out"), disableSelectOption(dropdown_select, disable_type))
                }
    num_selected > 1 && allSelected && $(".product_option_group").not(e).each(function(e, n) {
        (n = $(n)).find("option").each(function(e, o) {
            if (is_selected = $(o).is(":selected"), !is_selected && o.value > 0)
                for (option_group_value_array = [], option_group_value_array.push(parseInt(o.value)), $(".product_option_group").not(n).each(function(t, e) {
                        option_group_value_array.push(parseInt(e.value))
                    }), product_option = findProductOptionByValueArray(t.options, option_group_value_array), i = 0; i < option_group_value_array.length; i++) dropdown_select = $(".product_option_group option[value='" + option_group_value_array[i] + "']").not(":selected"), dropdown_select && (product_option ? product_option.sold_out ? disableSelectOption(dropdown_select, "sold-out") : enableSelectOption(dropdown_select) : disableSelectOption(dropdown_select, "unavailable"))
        })
    }), allSelected && (product_option = findProductOptionByValueArray(t.options, selected_values), product_option && !product_option.sold_out && product_option.id > 0 ? ($("#option").val(product_option.id), enableAddButton(product_option.price), num_option_groups > 1 && $(".reset-selection-button").fadeIn("fast")) : disableAddButton("sold-out"))
}

function findProductOptionByValueArray(t, e) {
    for (var i = 0; i < t.length; i++)
        if (option_group_values = t[i].option_group_values, option_ids = [], option_group_values.forEach(function(t) {
                option_ids.push(t.id)
            }), arrayContainsArray(option_ids, e)) return t[i]
}

function getSelectedValues() {
    return selected_values = [], $(".product_option_group").each(function(t, e) {
        selected_values.push(parseInt(e.value))
    }), selected_values
}! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(t, r), delete n[r]), r.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? u.call(t) : [t]
    }

    function o(t, e, r) {
        if (!(this instanceof o)) return new o(t, e, r);
        var a = t;
        "string" == typeof t && (a = document.querySelectorAll(t)), a ? (this.elements = n(a), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), s && (this.jqDeferred = new s.Deferred), setTimeout(this.check.bind(this))) : l.error("Bad element for imagesLoaded " + (a || t))
    }

    function r(t) {
        this.img = t
    }

    function a(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var s = t.jQuery,
        l = t.console,
        u = Array.prototype.slice;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var a = r[n];
                    this.addElementBackgroundImages(a)
                }
            }
        }
    };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
    }, o.prototype.addImage = function(t) {
        var e = new r(t);
        this.images.push(e)
    }, o.prototype.addBackground = function(t, e) {
        var i = new a(t, e);
        this.images.push(i)
    }, o.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function(e) {
            e.once("progress", t), e.check()
        }) : this.complete()
    }, o.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
    }, o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
        this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src)
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, r.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, r.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, a.prototype = Object.create(r.prototype), a.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, a.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, a.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function(e) {
        (e = e || t.jQuery) && ((s = e).fn.imagesLoaded = function(t, e) {
            return new o(this, t, e).jqDeferred.promise(s(this))
        })
    }, o.makeJQueryPlugin(), o
}),
function(t) {
    t.flexslider = function(e, i) {
        var n = t(e);
        n.vars = t.extend({}, t.flexslider.defaults, i);
        var o, r = n.vars.namespace,
            a = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            s = ("ontouchstart" in window || a || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            l = "click touchend MSPointerUp keyup",
            u = "",
            d = "vertical" === n.vars.direction,
            c = n.vars.reverse,
            p = n.vars.itemWidth > 0,
            f = "fade" === n.vars.animation,
            h = "" !== n.vars.asNavFor,
            m = {},
            v = !0;
        t.data(e, "flexslider", n), m = {
            init: function() {
                n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = t(n.vars.selector, n), n.container = t(n.containerSelector, n), n.count = n.slides.length, n.syncExists = t(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = d ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !f && n.vars.useCSS && function() {
                    var t = document.createElement("div"),
                        e = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in e)
                        if (t.style[e[i]] !== undefined) return n.pfx = e[i].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1
                }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = t(n.vars.controlsContainer).length > 0 && t(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = t(n.vars.manualControls).length > 0 && t(n.vars.manualControls)), n.vars.randomize && (n.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && m.controlNav.setup(), n.vars.directionNav && m.directionNav.setup(), n.vars.keyboard && (1 === t(n.containerSelector).length || n.vars.multipleKeyboard) && t(document).bind("keyup", function(t) {
                    var e = t.keyCode;
                    if (!n.animating && (39 === e || 37 === e)) {
                        var i = 39 === e ? n.getTarget("next") : 37 === e && n.getTarget("prev");
                        n.flexAnimate(i, n.vars.pauseOnAction)
                    }
                }), n.vars.mousewheel && n.bind("mousewheel", function(t, e) {
                    t.preventDefault();
                    var i = e < 0 ? n.getTarget("next") : n.getTarget("prev");
                    n.flexAnimate(i, n.vars.pauseOnAction)
                }), n.vars.pausePlay && m.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && m.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() {
                    n.manualPlay || n.manualPause || n.pause()
                }, function() {
                    n.manualPause || n.manualPlay || n.stopped || n.play()
                }), n.vars.pauseInvisible && m.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), h && m.asNav.setup(), s && n.vars.touch && m.touch(), (!f || f && n.vars.smoothHeight) && t(window).bind("resize orientationchange focus", m.resize), n.find("img").attr("draggable", "false"), setTimeout(function() {
                    n.vars.start(n)
                }, 200)
            },
            asNav: {
                setup: function() {
                    n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(r + "active-slide").eq(n.currentItem).addClass(r + "active-slide"), a ? (e._slider = n, n.slides.each(function() {
                        var e = this;
                        e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", function(t) {
                            t.preventDefault(), t.currentTarget._gesture && t.currentTarget._gesture.addPointer(t.pointerId)
                        }, !1), e.addEventListener("MSGestureTap", function(e) {
                            e.preventDefault();
                            var i = t(this),
                                o = i.index();
                            t(n.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (n.direction = n.currentItem < o ? "next" : "prev", n.flexAnimate(o, n.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : n.slides.on(l, function(e) {
                        e.preventDefault();
                        var i = t(this),
                            o = i.index();
                        i.offset().left - t(n).scrollLeft() <= 0 && i.hasClass(r + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : t(n.vars.asNavFor).data("flexslider").animating || i.hasClass(r + "active-slide") || (n.direction = n.currentItem < o ? "next" : "prev", n.flexAnimate(o, n.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    n.manualControls ? m.controlNav.setupManual() : m.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var e, i, o = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
                        a = 1;
                    if (n.controlNavScaffold = t('<ol class="' + r + "control-nav " + r + o + '"></ol>'), n.pagingCount > 1)
                        for (var s = 0; s < n.pagingCount; s++) {
                            if (i = n.slides.eq(s), e = "thumbnails" === n.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"/>' : "<a>" + a + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                                var d = i.attr("data-thumbcaption");
                                "" != d && undefined != d && (e += '<span class="' + r + 'caption">' + d + "</span>")
                            }
                            n.controlNavScaffold.append("<li>" + e + "</li>"), a++
                        }
                    n.controlsContainer ? t(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), m.controlNav.set(), m.controlNav.active(), n.controlNavScaffold.delegate("a, img", l, function(e) {
                        if (e.preventDefault(), "" === u || u === e.type) {
                            var i = t(this),
                                o = n.controlNav.index(i);
                            i.hasClass(r + "active") || (n.direction = o > n.currentSlide ? "next" : "prev", n.flexAnimate(o, n.vars.pauseOnAction))
                        }
                        "" === u && (u = e.type), m.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    n.controlNav = n.manualControls, m.controlNav.active(), n.controlNav.bind(l, function(e) {
                        if (e.preventDefault(), "" === u || u === e.type) {
                            var i = t(this),
                                o = n.controlNav.index(i);
                            i.hasClass(r + "active") || (o > n.currentSlide ? n.direction = "next" : n.direction = "prev", n.flexAnimate(o, n.vars.pauseOnAction))
                        }
                        "" === u && (u = e.type), m.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
                    n.controlNav = t("." + r + "control-nav li " + e, n.controlsContainer ? n.controlsContainer : n)
                },
                active: function() {
                    n.controlNav.removeClass(r + "active").eq(n.animatingTo).addClass(r + "active")
                },
                update: function(e, i) {
                    n.pagingCount > 1 && "add" === e ? n.controlNavScaffold.append(t("<li><a>" + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(i).closest("li").remove(), m.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(i, e) : m.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var e = t('<ul class="' + r + 'direction-nav"><li class="' + r + 'nav-prev"><a class="' + r + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + r + 'nav-next"><a class="' + r + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.controlsContainer ? (t(n.controlsContainer).append(e), n.directionNav = t("." + r + "direction-nav li a", n.controlsContainer)) : (n.append(e), n.directionNav = t("." + r + "direction-nav li a", n)), m.directionNav.update(), n.directionNav.bind(l, function(e) {
                        var i;
                        e.preventDefault(), "" !== u && u !== e.type || (i = t(this).hasClass(r + "next") ? n.getTarget("next") : n.getTarget("prev"), n.flexAnimate(i, n.vars.pauseOnAction)), "" === u && (u = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var t = r + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(t).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(t).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(t).filter("." + r + "prev").addClass(t).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(t).filter("." + r + "next").addClass(t).attr("tabindex", "-1") : n.directionNav.removeClass(t).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var e = t('<div class="' + r + 'pauseplay"><a></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = t("." + r + "pauseplay a", n.controlsContainer)) : (n.append(e), n.pausePlay = t("." + r + "pauseplay a", n)), m.pausePlay.update(n.vars.slideshow ? r + "pause" : r + "play"), n.pausePlay.bind(l, function(e) {
                        e.preventDefault(), "" !== u && u !== e.type || (t(this).hasClass(r + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === u && (u = e.type), m.setToClearWatchedEvent()
                    })
                },
                update: function(t) {
                    "play" === t ? n.pausePlay.removeClass(r + "pause").addClass(r + "play").html(n.vars.playText) : n.pausePlay.removeClass(r + "play").addClass(r + "pause").html(n.vars.pauseText)
                }
            },
            touch: function() {
                var t, i, o, r, s, l, u = !1,
                    h = 0,
                    m = 0,
                    v = 0;
                if (a) {
                    function g(t) {
                        t.stopPropagation(), n.animating ? t.preventDefault() : (n.pause(), e._gesture.addPointer(t.pointerId), v = 0, r = d ? n.h : n.w, l = Number(new Date), o = p && c && n.animatingTo === n.last ? 0 : p && c ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : p && n.currentSlide === n.last ? n.limit : p ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : c ? (n.last - n.currentSlide + n.cloneOffset) * r : (n.currentSlide + n.cloneOffset) * r)
                    }

                    function y(t) {
                        t.stopPropagation();
                        var i = t.target._slider;
                        if (i) {
                            var n = -t.translationX,
                                a = -t.translationY;
                            s = v += d ? a : n, u = d ? Math.abs(v) < Math.abs(-n) : Math.abs(v) < Math.abs(-a), t.detail !== t.MSGESTURE_FLAG_INERTIA ? (!u || Number(new Date) - l > 500) && (t.preventDefault(), !f && i.transitions && (i.vars.animationLoop || (s = v / (0 === i.currentSlide && v < 0 || i.currentSlide === i.last && v > 0 ? Math.abs(v) / r + 2 : 1)), i.setProps(o + s, "setTouch"))) : setImmediate(function() {
                                e._gesture.stop()
                            })
                        }
                    }

                    function _(e) {
                        e.stopPropagation();
                        var n = e.target._slider;
                        if (n) {
                            if (n.animatingTo === n.currentSlide && !u && null !== s) {
                                var a = c ? -s : s,
                                    d = a > 0 ? n.getTarget("next") : n.getTarget("prev");
                                n.canAdvance(d) && (Number(new Date) - l < 550 && Math.abs(a) > 50 || Math.abs(a) > r / 2) ? n.flexAnimate(d, n.vars.pauseOnAction) : f || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                            }
                            t = null, i = null, s = null, o = null, v = 0
                        }
                    }
                    e.style.msTouchAction = "none", e._gesture = new MSGesture, e._gesture.target = e, e.addEventListener("MSPointerDown", g, !1), e._slider = n, e.addEventListener("MSGestureChange", y, !1), e.addEventListener("MSGestureEnd", _, !1)
                } else {
                    function b(a) {
                        n.animating ? a.preventDefault() : (window.navigator.msPointerEnabled || 1 === a.touches.length) && (n.pause(), r = d ? n.h : n.w, l = Number(new Date), h = a.touches[0].pageX, m = a.touches[0].pageY, o = p && c && n.animatingTo === n.last ? 0 : p && c ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : p && n.currentSlide === n.last ? n.limit : p ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : c ? (n.last - n.currentSlide + n.cloneOffset) * r : (n.currentSlide + n.cloneOffset) * r, t = d ? m : h, i = d ? h : m, e.addEventListener("touchmove", x, !1), e.addEventListener("touchend", C, !1))
                    }

                    function x(e) {
                        h = e.touches[0].pageX, m = e.touches[0].pageY, s = d ? t - m : t - h;
                        var a = 500;
                        (!(u = d ? Math.abs(s) < Math.abs(h - i) : Math.abs(s) < Math.abs(m - i)) || Number(new Date) - l > a) && (e.preventDefault(), !f && n.transitions && (n.vars.animationLoop || (s /= 0 === n.currentSlide && s < 0 || n.currentSlide === n.last && s > 0 ? Math.abs(s) / r + 2 : 1), n.setProps(o + s, "setTouch")))
                    }

                    function C() {
                        if (e.removeEventListener("touchmove", x, !1), n.animatingTo === n.currentSlide && !u && null !== s) {
                            var a = c ? -s : s,
                                d = a > 0 ? n.getTarget("next") : n.getTarget("prev");
                            n.canAdvance(d) && (Number(new Date) - l < 550 && Math.abs(a) > 50 || Math.abs(a) > r / 2) ? n.flexAnimate(d, n.vars.pauseOnAction) : f || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                        }
                        e.removeEventListener("touchend", C, !1), t = null, i = null, s = null, o = null
                    }
                    e.addEventListener("touchstart", b, !1)
                }
            },
            resize: function() {
                !n.animating && n.is(":visible") && (p || n.doMath(), f ? m.smoothHeight() : p ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && m.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
            },
            smoothHeight: function(t) {
                if (!d || f) {
                    var e = f ? n : n.viewport;
                    t ? e.animate({
                        height: n.slides.eq(n.animatingTo).height()
                    }, t) : e.height(n.slides.eq(n.animatingTo).height())
                }
            },
            sync: function(e) {
                var i = t(n.vars.sync).data("flexslider"),
                    o = n.animatingTo;
                switch (e) {
                    case "animate":
                        i.flexAnimate(o, n.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        i.playing || i.asNav || i.play();
                        break;
                    case "pause":
                        i.pause()
                }
            },
            uniqueID: function(e) {
                return e.filter("[id]").add(e.find("[id]")).each(function() {
                    var e = t(this);
                    e.attr("id", e.attr("id") + "_clone")
                }), e
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var t = m.pauseInvisible.getHiddenProp();
                    if (t) {
                        var e = t.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(e, function() {
                            m.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
                        })
                    }
                },
                isHidden: function() {
                    var t = m.pauseInvisible.getHiddenProp();
                    return !!t && document[t]
                },
                getHiddenProp: function() {
                    var t = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var e = 0; e < t.length; e++)
                        if (t[e] + "Hidden" in document) return t[e] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(o), o = setTimeout(function() {
                    u = ""
                }, 3e3)
            }
        }, n.flexAnimate = function(e, i, o, a, l) {
            if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? "next" : "prev"), h && 1 === n.pagingCount && (n.direction = n.currentItem < e ? "next" : "prev"), !n.animating && (n.canAdvance(e, l) || o) && n.is(":visible")) {
                if (h && a) {
                    var u = t(n.vars.asNavFor).data("flexslider");
                    if (n.atEnd = 0 === e || e === n.count - 1, u.flexAnimate(e, !0, !1, !0, l), n.direction = n.currentItem < e ? "next" : "prev", u.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e) return n.currentItem = e, n.slides.removeClass(r + "active-slide").eq(e).addClass(r + "active-slide"), !1;
                    n.currentItem = e, n.slides.removeClass(r + "active-slide").eq(e).addClass(r + "active-slide"), e = Math.floor(e / n.visible)
                }
                if (n.animating = !0, n.animatingTo = e, i && n.pause(), n.vars.before(n), n.syncExists && !l && m.sync("animate"), n.vars.controlNav && m.controlNav.active(), p || n.slides.removeClass(r + "active-slide").eq(e).addClass(r + "active-slide"), n.atEnd = 0 === e || e === n.last, n.vars.directionNav && m.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), f) s ? (n.slides.eq(n.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), n.slides.eq(e).css({
                    opacity: 1,
                    zIndex: 2
                }), n.wrapup(_)) : (n.slides.eq(n.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
                else {
                    var v, g, y, _ = d ? n.slides.filter(":first").height() : n.computedW;
                    p ? (v = n.vars.itemMargin, g = (y = (n.itemW + v) * n.move * n.animatingTo) > n.limit && 1 !== n.visible ? n.limit : y) : g = 0 === n.currentSlide && e === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? c ? (n.count + n.cloneOffset) * _ : 0 : n.currentSlide === n.last && 0 === e && n.vars.animationLoop && "prev" !== n.direction ? c ? 0 : (n.count + 1) * _ : c ? (n.count - 1 - e + n.cloneOffset) * _ : (e + n.cloneOffset) * _, n.setProps(g, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(n.ensureAnimationEnd), n.wrapup(_)
                    }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() {
                        n.wrapup(_)
                    }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() {
                        n.wrapup(_)
                    })
                }
                n.vars.smoothHeight && m.smoothHeight(n.vars.animationSpeed)
            }
        }, n.wrapup = function(t) {
            f || p || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(t, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(t, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
        }, n.animateSlides = function() {
            !n.animating && v && n.flexAnimate(n.getTarget("next"))
        }, n.pause = function() {
            clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && m.pausePlay.update("play"), n.syncExists && m.sync("pause")
        }, n.play = function() {
            n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && m.pausePlay.update("pause"), n.syncExists && m.sync("play")
        }, n.stop = function() {
            n.pause(), n.stopped = !0
        }, n.canAdvance = function(t, e) {
            var i = h ? n.pagingCount - 1 : n.last;
            return !!e || (!(!h || n.currentItem !== n.count - 1 || 0 !== t || "prev" !== n.direction) || (!h || 0 !== n.currentItem || t !== n.pagingCount - 1 || "next" === n.direction) && (!(t === n.currentSlide && !h) && (!!n.vars.animationLoop || (!n.atEnd || 0 !== n.currentSlide || t !== i || "next" === n.direction) && (!n.atEnd || n.currentSlide !== i || 0 !== t || "next" !== n.direction))))
        }, n.getTarget = function(t) {
            return n.direction = t, "next" === t ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
        }, n.setProps = function(t, e, i) {
            var o, r = (o = t || (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo, -1 * function() {
                if (p) return "setTouch" === e ? t : c && n.animatingTo === n.last ? 0 : c ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : o;
                switch (e) {
                    case "setTotal":
                        return c ? (n.count - 1 - n.currentSlide + n.cloneOffset) * t : (n.currentSlide + n.cloneOffset) * t;
                    case "setTouch":
                        return t;
                    case "jumpEnd":
                        return c ? t : n.count * t;
                    case "jumpStart":
                        return c ? n.count * t : t;
                    default:
                        return t
                }
            }() + "px");
            n.transitions && (r = d ? "translate3d(0," + r + ",0)" : "translate3d(" + r + ",0,0)", i = i !== undefined ? i / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", i), n.container.css("transition-duration", i)), n.args[n.prop] = r, (n.transitions || i === undefined) && n.container.css(n.args), n.container.css("transform", r)
        }, n.setup = function(e) {
            var i, o;
            f ? (n.slides.css({
                width: "100%",
                float: "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === e && (s ? n.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(n.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && m.smoothHeight()) : ("init" === e && (n.viewport = t('<div class="' + r + 'viewport"></div>').css({
                overflow: "hidden",
                position: "relative"
            }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, c && (o = t.makeArray(n.slides).reverse(), n.slides = t(o), n.container.empty().append(n.slides))), n.vars.animationLoop && !p && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== e && n.container.find(".clone").remove(), n.container.append(m.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(m.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = t(n.vars.selector, n), i = c ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !p ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                n.newSlides.css({
                    display: "block"
                }), n.doMath(), n.viewport.height(n.h), n.setProps(i * n.h, "init")
            }, "init" === e ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(i * n.computedW, "init"), setTimeout(function() {
                n.doMath(), n.newSlides.css({
                    width: n.computedW,
                    float: "left",
                    display: "block"
                }), n.vars.smoothHeight && m.smoothHeight()
            }, "init" === e ? 100 : 0)));
            p || n.slides.removeClass(r + "active-slide").eq(n.currentSlide).addClass(r + "active-slide"), n.vars.init(n)
        }, n.doMath = function() {
            var t = n.slides.first(),
                e = n.vars.itemMargin,
                i = n.vars.minItems,
                o = n.vars.maxItems;
            n.w = n.viewport === undefined ? n.width() : n.viewport.width(), n.h = t.height(), n.boxPadding = t.outerWidth() - t.width(), p ? (n.itemT = n.vars.itemWidth + e, n.minW = i ? i * n.itemT : n.w, n.maxW = o ? o * n.itemT - e : n.w, n.itemW = n.minW > n.w ? (n.w - e * (i - 1)) / i : n.maxW < n.w ? (n.w - e * (o - 1)) / o : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + e * (n.count - 1) : (n.itemW + e) * n.count - n.w - e) : (n.itemW = n.w, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding
        }, n.update = function(t, e) {
            n.doMath(), p || (t < n.currentSlide ? n.currentSlide += 1 : t <= n.currentSlide && 0 !== t && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === e && !p || n.pagingCount > n.controlNav.length ? m.controlNav.update("add") : ("remove" === e && !p || n.pagingCount < n.controlNav.length) && (p && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), m.controlNav.update("remove", n.last))), n.vars.directionNav && m.directionNav.update()
        }, n.addSlide = function(e, i) {
            var o = t(e);
            n.count += 1, n.last = n.count - 1, d && c ? i !== undefined ? n.slides.eq(n.count - i).after(o) : n.container.prepend(o) : i !== undefined ? n.slides.eq(i).before(o) : n.container.append(o), n.update(i, "add"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
        }, n.removeSlide = function(e) {
            var i = isNaN(e) ? n.slides.index(t(e)) : e;
            n.count -= 1, n.last = n.count - 1, isNaN(e) ? t(e, n.slides).remove() : d && c ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(i, "remove"), n.slides = t(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
        }, m.init()
    }, t(window).blur(function() {
        focused = !1
    }).focus(function() {
        focused = !0
    }), t.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, t.fn.flexslider = function(e) {
        if (e === undefined && (e = {}), "object" == typeof e) return this.each(function() {
            var i = t(this),
                n = e.selector ? e.selector : ".slides > li",
                o = i.find(n);
            1 === o.length && !0 === e.allowOneSlide || 0 === o.length ? (o.fadeIn(400), e.start && e.start(i)) : i.data("flexslider") === undefined && new t.flexslider(this, e)
        });
        var i = t(this).data("flexslider");
        switch (e) {
            case "play":
                i.play();
                break;
            case "pause":
                i.pause();
                break;
            case "stop":
                i.stop();
                break;
            case "next":
                i.flexAnimate(i.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                i.flexAnimate(i.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof e && i.flexAnimate(e, !0)
        }
    }
}(jQuery),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(t) {
    var e, i, n, o, r, a, s = "Close",
        l = "BeforeClose",
        u = "AfterClose",
        d = "BeforeAppend",
        c = "MarkupParse",
        p = "Open",
        f = "Change",
        h = "mfp",
        m = "." + h,
        v = "mfp-ready",
        g = "mfp-removing",
        y = "mfp-prevent-close",
        _ = function() {},
        b = !!window.jQuery,
        x = t(window),
        C = function(t, i) {
            e.ev.on(h + t + m, i)
        },
        w = function(e, i, n, o) {
            var r = document.createElement("div");
            return r.className = "mfp-" + e, n && (r.innerHTML = n), o ? i && i.appendChild(r) : (r = t(r), i && r.appendTo(i)), r
        },
        I = function(i, n) {
            e.ev.triggerHandler(h + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]))
        },
        S = function(i) {
            return i === a && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), a = i), e.currTemplate.closeBtn
        },
        T = function() {
            t.magnificPopup.instance || ((e = new _).init(), t.magnificPopup.instance = e)
        },
        E = function() {
            var t = document.createElement("p").style,
                e = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== t.transition) return !0;
            for (; e.length;)
                if (e.pop() + "Transition" in t) return !0;
            return !1
        };
    _.prototype = {
        constructor: _,
        init: function() {
            var i = navigator.appVersion;
            e.isIE7 = -1 !== i.indexOf("MSIE 7."), e.isIE8 = -1 !== i.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = E(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {}
        },
        open: function(i) {
            var o;
            if (!1 === i.isObj) {
                e.items = i.items.toArray(), e.index = 0;
                var a, s = i.items;
                for (o = 0; o < s.length; o++)
                    if ((a = s[o]).parsed && (a = a.el[0]), a === i.el[0]) {
                        e.index = o;
                        break
                    }
            } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
            if (!e.isOpen) {
                e.types = [], r = "", e.ev = i.mainEl && i.mainEl.length ? i.mainEl.eq(0) : n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = w("bg").on("click" + m, function() {
                    e.close()
                }), e.wrap = w("wrap").attr("tabindex", -1).on("click" + m, function(t) {
                    e._checkIfClose(t.target) && e.close()
                }), e.container = w("container", e.wrap)), e.contentContainer = w("content"), e.st.preloader && (e.preloader = w("preloader", e.container, e.st.tLoading));
                var l = t.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var u = l[o];
                    u = u.charAt(0).toUpperCase() + u.slice(1), e["init" + u].call(e)
                }
                I("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (C(c, function(t, e, i, n) {
                    i.close_replaceWith = S(n.type)
                }), r += " mfp-close-btn-in") : e.wrap.append(S())), e.st.alignTop && (r += " mfp-align-top"), e.wrap.css(e.fixedContentPos ? {
                    overflow: e.st.overflowY,
                    overflowX: "hidden",
                    overflowY: e.st.overflowY
                } : {
                    top: x.scrollTop(),
                    position: "absolute"
                }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                    height: n.height(),
                    position: "absolute"
                }), e.st.enableEscapeKey && n.on("keyup" + m, function(t) {
                    27 === t.keyCode && e.close()
                }), x.on("resize" + m, function() {
                    e.updateSize()
                }), e.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && e.wrap.addClass(r);
                var d = e.wH = x.height(),
                    f = {};
                if (e.fixedContentPos && e._hasScrollBar(d)) {
                    var h = e._getScrollbarSize();
                    h && (f.marginRight = h)
                }
                e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : f.overflow = "hidden");
                var g = e.st.mainClass;
                return e.isIE7 && (g += " mfp-ie7"), g && e._addClassToMFP(g), e.updateItemHTML(), I("BuildControls"), t("html").css(f), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function() {
                    e.content ? (e._addClassToMFP(v), e._setFocus()) : e.bgOverlay.addClass(v), n.on("focusin" + m, e._onFocusIn)
                }, 16), e.isOpen = !0, e.updateSize(d), I(p), i
            }
            e.updateItemHTML()
        },
        close: function() {
            e.isOpen && (I(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(g), setTimeout(function() {
                e._close()
            }, e.st.removalDelay)) : e._close())
        },
        _close: function() {
            I(s);
            var i = g + " " + v + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "", t("html").css(o)
            }
            n.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, I(u)
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * i;
                e.wrap.css("height", n), e.wH = n
            } else e.wH = t || x.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), I("Resize")
        },
        updateItemHTML: function() {
            var i = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
            var n = i.type;
            if (I("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
                var r = !!e.st[n] && e.st[n].markup;
                I("FirstMarkupParse", r), e.currTemplate[n] = !r || t(r)
            }
            o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
            var a = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
            e.appendContent(a, n), i.preloaded = !0, I(f, i), o = i.type, e.container.prepend(e.contentContainer), I("AfterChange")
        },
        appendContent: function(t, i) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(S()) : e.content = t : e.content = "", I(d), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
        },
        parseEl: function(i) {
            var n, o = e.items[i];
            if (o.tagName ? o = {
                    el: t(o)
                } : (n = o.type, o = {
                    data: o,
                    src: o.src
                }), o.el) {
                for (var r = e.types, a = 0; a < r.length; a++)
                    if (o.el.hasClass("mfp-" + r[a])) {
                        n = r[a];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"), o.src || (o.src = o.el.attr("href"))
            }
            return o.type = n || e.st.type || "inline", o.index = i, o.parsed = !0, e.items[i] = o, I("ElementParse", o), e.items[i]
        },
        addGroup: function(t, i) {
            var n = function(n) {
                n.mfpEl = this, e._openClick(n, t, i)
            };
            i || (i = {});
            var o = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(o).on(o, n)) : (i.isObj = !1, i.delegate ? t.off(o).on(o, i.delegate, n) : (i.items = t, t.off(o).on(o, n)))
        },
        _openClick: function(i, n, o) {
            if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || 2 !== i.which && !i.ctrlKey && !i.metaKey) {
                var r = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                if (r)
                    if (t.isFunction(r)) {
                        if (!r.call(e)) return !0
                    } else if (x.width() < r) return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), o.el = t(i.mfpEl), o.delegate && (o.items = n.find(o.delegate)), e.open(o)
            }
        },
        updateStatus: function(t, n) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
                var o = {
                    status: t,
                    text: n
                };
                I("UpdateStatus", o), t = o.status, n = o.text, e.preloader.html(n), e.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), i = t
            }
        },
        _checkIfClose: function(i) {
            if (!t(i).hasClass(y)) {
                var n = e.st.closeOnContentClick,
                    o = e.st.closeOnBgClick;
                if (n && o) return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (n) return !0
                } else if (o && t.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || x.height())
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        },
        _onFocusIn: function(i) {
            return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
        },
        _parseMarkup: function(e, i, n) {
            var o;
            n.data && (i = t.extend(n.data, i)), I(c, [e, i, n]), t.each(i, function(t, i) {
                if (void 0 === i || !1 === i) return !0;
                if ((o = t.split("_")).length > 1) {
                    var n = e.find(m + "-" + o[0]);
                    if (n.length > 0) {
                        var r = o[1];
                        "replaceWith" === r ? n[0] !== i[0] && n.replaceWith(i) : "img" === r ? n.is("img") ? n.attr("src", i) : n.replaceWith('<img src="' + i + '" class="' + n.attr("class") + '" />') : n.attr(o[1], i)
                    }
                } else e.find(m + "-" + t).html(i)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: _.prototype,
        modules: [],
        open: function(e, i) {
            return T(), (e = e ? t.extend(!0, {}, e) : {}).isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, t.fn.magnificPopup = function(i) {
        T();
        var n = t(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var o, r = b ? n.data("magnificPopup") : n[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[a] : (o = n, r.delegate && (o = o.find(r.delegate)), o = o.eq(a)), e._openClick({
                    mfpEl: o
                }, n, r)
            } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else i = t.extend(!0, {}, i), b ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
        return n
    };
    var P, O, z, k = "inline",
        A = function() {
            z && (O.after(z.addClass(P)).detach(), z = null)
        };
    t.magnificPopup.registerModule(k, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                e.types.push(k), C(s + "." + k, function() {
                    A()
                })
            },
            getInline: function(i, n) {
                if (A(), i.src) {
                    var o = e.st.inline,
                        r = t(i.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (O || (P = o.hiddenClass, O = w(P), P = "mfp-" + P), z = r.after(O).detach().removeClass(P)), e.updateStatus("ready")
                    } else e.updateStatus("error", o.tNotFound), r = t("<div>");
                    return i.inlineElement = r, r
                }
                return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n
            }
        }
    });
    var M, L = "ajax",
        W = function() {
            M && t(document.body).removeClass(M)
        },
        N = function() {
            W(), e.req && e.req.abort()
        };
    t.magnificPopup.registerModule(L, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                e.types.push(L), M = e.st.ajax.cursor, C(s + "." + L, N), C("BeforeChange." + L, N)
            },
            getAjax: function(i) {
                M && t(document.body).addClass(M), e.updateStatus("loading");
                var n = t.extend({
                    url: i.src,
                    success: function(n, o, r) {
                        var a = {
                            data: n,
                            xhr: r
                        };
                        I("ParseAjax", a), e.appendContent(t(a.data), L), i.finished = !0, W(), e._setFocus(), setTimeout(function() {
                            e.wrap.addClass(v)
                        }, 16), e.updateStatus("ready"), I("AjaxContentAdded")
                    },
                    error: function() {
                        W(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(n), ""
            }
        }
    });
    var B, $ = function(i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = e.st.image.titleSrc;
        if (n) {
            if (t.isFunction(n)) return n.call(e, i);
            if (i.el) return i.el.attr(n) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = e.st.image,
                    n = ".image";
                e.types.push("image"), C(p + n, function() {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }), C(s + n, function() {
                    i.cursor && t(document.body).removeClass(i.cursor), x.off("resize" + m)
                }), C("Resize" + n, e.resizeImage), e.isLowIE && C("AfterChange", e.resizeImage)
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0, B && clearInterval(B), t.isCheckingImgSize = !1, I("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0,
                    n = t.img[0],
                    o = function(r) {
                        B && clearInterval(B), B = setInterval(function() {
                            return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(B), void(3 === ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)))
                        }, r)
                    };
                o(1)
            },
            getImage: function(i, n) {
                var o = 0,
                    r = function() {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, I("ImageLoadComplete")) : 200 > ++o ? setTimeout(r, 100) : a())
                    },
                    a = function() {
                        i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", s.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    s = e.st.image,
                    l = n.find(".mfp-img");
                if (l.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img", i.el && i.el.find("img").length && (u.alt = i.el.find("img").attr("alt")), i.img = t(u).on("load.mfploader", r).on("error.mfploader", a), u.src = i.src, l.is("img") && (i.img = i.img.clone()), (u = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : u.width || (i.hasSize = !1)
                }
                return e._parseMarkup(n, {
                    title: $(i),
                    img_replaceWith: i.img
                }, i), e.resizeImage(), i.hasSize ? (B && clearInterval(B), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", s.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n)
            }
        }
    });
    var D, q = function() {
        return void 0 === D && (D = void 0 !== document.createElement("p").style.MozTransform), D
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, i = e.st.zoom,
                    n = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var o, r, a = i.duration,
                        u = function(t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + i.duration / 1e3 + "s " + i.easing,
                                o = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = n, e.css(o), e
                        },
                        d = function() {
                            e.content.css("visibility", "visible")
                        };
                    C("BuildControls" + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void d();
                            (r = u(t)).css(e._getOffset()), e.wrap.append(r), o = setTimeout(function() {
                                r.css(e._getOffset(!0)), o = setTimeout(function() {
                                    d(), setTimeout(function() {
                                        r.remove(), t = r = null, I("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), C(l + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(o), e.st.removalDelay = a, !t) {
                                if (!(t = e._getItemToZoom())) return;
                                r = u(t)
                            }
                            r.css(e._getOffset(!0)), e.wrap.append(r), e.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(e._getOffset())
                            }, 16)
                        }
                    }), C(s + n, function() {
                        e._allowZoom() && (d(), r && r.remove(), t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === e.currItem.type
            },
            _getItemToZoom: function() {
                return !!e.currItem.hasSize && e.currItem.img
            },
            _getOffset: function(i) {
                var n, o = (n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                    r = parseInt(n.css("padding-top"), 10),
                    a = parseInt(n.css("padding-bottom"), 10);
                o.top -= t(window).scrollTop() - r;
                var s = {
                    width: n.width(),
                    height: (b ? n.innerHeight() : n[0].offsetHeight) - a - r
                };
                return q() ? s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)" : (s.left = o.left, s.top = o.top), s
            }
        }
    });
    var H = "iframe",
        F = "//about:blank",
        j = function(t) {
            if (e.currTemplate[H]) {
                var i = e.currTemplate[H].find("iframe");
                i.length && (t || (i[0].src = F), e.isIE8 && i.css("display", t ? "block" : "none"))
            }
        };
    t.magnificPopup.registerModule(H, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push(H), C("BeforeChange", function(t, e, i) {
                    e !== i && (e === H ? j() : i === H && j(!0))
                }), C(s + "." + H, function() {
                    j()
                })
            },
            getIframe: function(i, n) {
                var o = i.src,
                    r = e.st.iframe;
                t.each(r.patterns, function() {
                    return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), o = this.src.replace("%id%", o), !1) : void 0
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = o), e._parseMarkup(n, a, i), e.updateStatus("ready"), n
            }
        }
    });
    var R = function(t) {
            var i = e.items.length;
            return t > i - 1 ? t - i : 0 > t ? i + t : t
        },
        Y = function(t, e, i) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
        };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = e.st.gallery,
                    o = ".mfp-gallery",
                    a = Boolean(t.fn.mfpFastClick);
                return e.direction = !0, !(!i || !i.enabled) && (r += " mfp-gallery", C(p + o, function() {
                    i.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function() {
                        return e.items.length > 1 ? (e.next(), !1) : void 0
                    }), n.on("keydown" + o, function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), C("UpdateStatus" + o, function(t, i) {
                    i.text && (i.text = Y(i.text, e.currItem.index, e.items.length))
                }), C(c + o, function(t, n, o, r) {
                    var a = e.items.length;
                    o.counter = a > 1 ? Y(i.tCounter, r.index, a) : ""
                }), C("BuildControls" + o, function() {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var n = i.arrowMarkup,
                            o = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            r = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(y),
                            s = a ? "mfpFastClick" : "click";
                        o[s](function() {
                            e.prev()
                        }), r[s](function() {
                            e.next()
                        }), e.isIE7 && (w("b", o[0], !1, !0), w("a", o[0], !1, !0), w("b", r[0], !1, !0), w("a", r[0], !1, !0)), e.container.append(o.add(r))
                    }
                }), C(f + o, function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), void C(s + o, function() {
                    n.off(o), e.wrap.off("click" + o), e.arrowLeft && a && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight = e.arrowLeft = null
                }))
            },
            next: function() {
                e.direction = !0, e.index = R(e.index + 1), e.updateItemHTML()
            },
            prev: function() {
                e.direction = !1, e.index = R(e.index - 1), e.updateItemHTML()
            },
            goTo: function(t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, i = e.st.gallery.preload,
                    n = Math.min(i[0], e.items.length),
                    o = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? o : n); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? n : o); t++) e._preloadItem(e.index - t)
            },
            _preloadItem: function(i) {
                if (i = R(i), !e.items[i].preloaded) {
                    var n = e.items[i];
                    n.parsed || (n = e.parseEl(i)), I("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        n.hasSize = !0
                    }).on("error.mfploader", function() {
                        n.hasSize = !0, n.loadError = !0, I("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var G = "retina";
    t.magnificPopup.registerModule(G, {
            options: {
                replaceSrc: function(t) {
                    return t.src.replace(/\.\w+$/, function(t) {
                        return "@2x" + t
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var t = e.st.retina,
                            i = t.ratio;
                        (i = isNaN(i) ? i() : i) > 1 && (C("ImageHasSize." + G, function(t, e) {
                            e.img.css({
                                "max-width": e.img[0].naturalWidth / i,
                                width: "100%"
                            })
                        }), C("ElementParse." + G, function(e, n) {
                            n.src = t.replaceSrc(n, i)
                        }))
                    }
                }
            }
        }),
        function() {
            var e = 1e3,
                i = "ontouchstart" in window,
                n = function() {
                    x.off("touchmove" + o + " touchend" + o)
                },
                o = "." + "mfpFastClick";
            t.fn.mfpFastClick = function(r) {
                return t(this).each(function() {
                    var a, s, l, u, d, c, p, f = t(this);
                    i && f.on("touchstart" + o, function(t) {
                        d = !1, p = 1, c = t.originalEvent ? t.originalEvent.touches[0] : t.touches[0], l = c.clientX, u = c.clientY, x.on("touchmove" + o, function(t) {
                            c = t.originalEvent ? t.originalEvent.touches : t.touches, p = c.length, c = c[0], (Math.abs(c.clientX - l) > 10 || Math.abs(c.clientY - u) > 10) && (d = !0, n())
                        }).on("touchend" + o, function(t) {
                            n(), d || p > 1 || (a = !0, t.preventDefault(), clearTimeout(s), s = setTimeout(function() {
                                a = !1
                            }, e), r())
                        })
                    });
                    f.on("click" + o, function() {
                        a || r()
                    })
                })
            }, t.fn.destroyMfpFastClick = function() {
                t(this).off("touchstart" + o + " click" + o), i && x.off("touchmove" + o + " touchend" + o)
            }
        }(), T()
}),
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, r, s) {
        function l(t, e, n) {
            var o, r = "$()." + i + '("' + e + '")';
            return t.each(function(t, l) {
                var u = s.data(l, i);
                if (u) {
                    var d = u[e];
                    if (d && "_" != e.charAt(0)) {
                        var c = d.apply(u, n);
                        o = o === undefined ? c : o
                    } else a(r + " is not a valid method")
                } else a(i + " not initialized. Cannot call methods, i.e. " + r)
            }), o !== undefined ? o : t
        }

        function u(t, e) {
            t.each(function(t, n) {
                var o = s.data(n, i);
                o ? (o.option(e), o._init()) : (o = new r(n, e), s.data(n, i, o))
            })
        }(s = s || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function(t) {
            s.isPlainObject(t) && (this.options = s.extend(!0, this.options, t))
        }), s.fn[i] = function(t) {
            return "string" == typeof t ? l(this, t, o.call(arguments, 1)) : (u(this, t), this)
        }, n(s))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice,
        r = t.console,
        a = void 0 === r ? function() {} : function(t) {
            r.error(t)
        };
    return n(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(t, r), delete n[r]), r.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < u; e++) {
            t[l[e]] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || s("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
    }

    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            a = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = a, i.removeChild(e)
        }
    }

    function r(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var r = n(e);
            if ("none" == r.display) return i();
            var s = {};
            s.width = e.offsetWidth, s.height = e.offsetHeight;
            for (var d = s.isBorderBox = "border-box" == r.boxSizing, c = 0; c < u; c++) {
                var p = l[c],
                    f = r[p],
                    h = parseFloat(f);
                s[p] = isNaN(h) ? 0 : h
            }
            var m = s.paddingLeft + s.paddingRight,
                v = s.paddingTop + s.paddingBottom,
                g = s.marginLeft + s.marginRight,
                y = s.marginTop + s.marginBottom,
                _ = s.borderLeftWidth + s.borderRightWidth,
                b = s.borderTopWidth + s.borderBottomWidth,
                x = d && a,
                C = t(r.width);
            !1 !== C && (s.width = C + (x ? 0 : m + _));
            var w = t(r.height);
            return !1 !== w && (s.height = w + (x ? 0 : v + b)), s.innerWidth = s.width - (m + _), s.innerHeight = s.height - (v + b), s.outerWidth = s.width + g, s.outerHeight = s.height + y, s
        }
    }
    var a, s = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        u = l.length,
        d = !1;
    return r
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i] + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {
            extend: function(t, e) {
                for (var i in e) t[i] = e[i];
                return t
            },
            modulo: function(t, e) {
                return (t % e + e) % e
            }
        },
        n = Array.prototype.slice;
    i.makeArray = function(t) {
        return Array.isArray(t) ? t : null === t || t === undefined ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement)
                if (n) {
                    e(t, n) && o.push(t);
                    for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
                } else o.push(t)
        }), o
    }, i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
            o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            clearTimeout(t);
            var e = arguments,
                r = this;
            this[o] = setTimeout(function() {
                n.apply(r, e), delete r[o]
            }, i)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var r = i.toDashed(n),
                a = "data-" + r,
                s = document.querySelectorAll("[" + a + "]"),
                l = document.querySelectorAll(".js-" + r),
                u = i.makeArray(s).concat(i.makeArray(l)),
                d = a + "-options",
                c = t.jQuery;
            u.forEach(function(t) {
                var i, r = t.getAttribute(a) || t.getAttribute(d);
                try {
                    i = r && JSON.parse(r)
                } catch (l) {
                    return void(o && o.error("Error parsing " + a + " on " + t.className + ": " + l))
                }
                var s = new e(t, i);
                c && c.data(t, n, s)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function o(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var r = document.documentElement.style,
        a = "string" == typeof r.transition ? "transition" : "WebkitTransition",
        s = "string" == typeof r.transform ? "transform" : "WebkitTransform",
        l = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[a],
        u = {
            transform: s,
            transition: a,
            transitionDuration: a + "Duration",
            transitionProperty: a + "Property",
            transitionDelay: a + "Delay"
        },
        d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() {
        this.size = e(this.element)
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            e[u[i] || i] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = t[e ? "left" : "right"],
            o = t[i ? "top" : "bottom"],
            r = parseFloat(n),
            a = parseFloat(o),
            s = this.layout.size; - 1 != n.indexOf("%") && (r = r / 100 * s.width), -1 != o.indexOf("%") && (a = a / 100 * s.height), r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            o = i ? "paddingLeft" : "paddingRight",
            r = i ? "left" : "right",
            a = i ? "right" : "left",
            s = this.position.x + t[o];
        e[r] = this.getXValue(s), e[a] = "";
        var l = n ? "paddingTop" : "paddingBottom",
            u = n ? "top" : "bottom",
            d = n ? "bottom" : "top",
            c = this.position.y + t[l];
        e[u] = this.getYValue(c), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            n = this.position.y,
            o = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e), !o || this.isTransitioning) {
            var r = t - i,
                a = e - n,
                s = {};
            s.transform = this.getTranslate(r, a), this.transition({
                to: s,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        } else this.layoutPosition()
    }, d.getTranslate = function(t, e) {
        return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)"
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, d._nonTransition = function(t) {
        for (var e in this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var e = this._transn;
            for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        } else this._nonTransition(t)
    };
    var c = "opacity," + o(s);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: c,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(l, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var p = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                n = p[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) e.onEnd[n].call(this), delete e.onEnd[n];
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(l, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var f = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(f)
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function() {
        a && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), this.hide()) : this.removeElem()
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {};
        e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, n
}),
/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, r) {
        return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, n, o) {
    "use strict";

    function r(t, e) {
        var i = n.getQueryElement(t);
        if (i) {
            this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
            var o = ++c;
            this.element.outlayerGUID = o, p[o] = this, this._create(), this._getOption("initLayout") && this.layout()
        } else l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
    }

    function a(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function s(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            n = e && e[2];
        return i.length ? (i = parseFloat(i)) * (h[n] || 1) : 0
    }
    var l = t.console,
        u = t.jQuery,
        d = function() {},
        c = 0,
        p = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var f = r.prototype;
    n.extend(f, e.prototype), f.option = function(t) {
        n.extend(this.options, t)
    }, f._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && this.options[e] !== undefined ? this.options[e] : this.options[t]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, f._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
    }, f.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, f._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = new i(e[o], this);
            n.push(r)
        }
        return n
    }, f._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, f.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, f.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = t !== undefined ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, f._init = f.layout, f._resetLayout = function() {
        this.getSize()
    }, f.getSize = function() {
        this.size = i(this.element)
    }, f._getMeasurement = function(t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, f.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, f._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, f._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, f._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, f._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, f.updateStagger = function() {
        var t = this.options.stagger;
        if (null !== t && t !== undefined) return this.stagger = s(t), this.stagger;
        this.stagger = 0
    }, f._positionItem = function(t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, f._postLayout = function() {
        this.resizeContainer()
    }, f.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
        }
    }, f._getContainerSize = d, f._setContainerMeasure = function(t, e) {
        if (t !== undefined) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, f._emitCompleteOnItems = function(t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            ++a == r && i()
        }
        var o = this,
            r = e.length;
        if (e && r) {
            var a = 0;
            e.forEach(function(e) {
                e.once(t, n)
            })
        } else i()
    }, f.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), u)
            if (this.$element = this.$element || u(this.element), e) {
                var o = u.Event(e);
                o.type = t, this.$element.trigger(o, i)
            } else this.$element.trigger(t, i)
    }, f.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, f.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, f.stamp = function(t) {
        (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, f.unstamp = function(t) {
        (t = this._find(t)) && t.forEach(function(t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, f._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)
    }, f._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, f._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, f._manageStamp = d, f._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            n = this._boundingRect,
            o = i(t);
        return {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        }
    }, f.handleEvent = n.handleEvent, f.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, f.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, f.onresize = function() {
        this.resize()
    }, n.debounceMethod(r, "onresize", 100), f.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, f.needsResizeLayout = function() {
        var t = i(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth
    }, f.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, f.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, f.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, f.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, f.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, f.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, f.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, f.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, f.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, f.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, f.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete p[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, r.data = function(t) {
        var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
        return e && p[e]
    }, r.create = function(t, e) {
        var i = a(r);
        return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = a(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var h = {
        ms: 1,
        s: 1e3
    };
    return r.Item = o, r
}),
/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, n.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter,
            o = this.containerWidth + this.gutter,
            r = o / n,
            a = n - o % n;
        r = Math[a && a < 1 ? "round" : "floor"](r), this.cols = Math.max(r, 1)
    }, n.getContainerWidth = function() {
        var t = this._getOption("fitWidth") ? this.element.parentNode : this.element,
            i = e(t);
        this.containerWidth = i && i.innerWidth
    }, n._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t), o = {
                x: this.columnWidth * n.col,
                y: n.y
            }, r = n.y + t.size.outerHeight, a = i + n.col, s = n.col; s < a; s++) this.colYs[s] = r;
        return o
    }, n._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, n._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) e[n] = this._getColGroupY(n, t);
        return e
    }, n._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, n._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols;
        i = t > 1 && i + t > this.cols ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, n._manageStamp = function(t) {
        var i = e(t),
            n = this._getElementOffset(t),
            o = this._getOption("originLeft") ? n.left : n.right,
            r = o + i.outerWidth,
            a = Math.floor(o / this.columnWidth);
        a = Math.max(0, a);
        var s = Math.floor(r / this.columnWidth);
        s -= r % this.columnWidth ? 0 : 1, s = Math.min(this.cols - 1, s);
        for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, u = a; u <= s; u++) this.colYs[u] = Math.max(l, this.colYs[u])
    }, n._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, n._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, n.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}), API.onError = function(t) {
    var e = $("<ul>", {
            "class": "errors"
        }),
        i = $(".cart_form"),
        n = $(".product_form");
    $.each(t, function(t, i) {
        e.append($("<li>").html(i))
    }), i.length > 0 ? (i.find(".errors").hide(), i.prepend(e), $(".cart-wrapper").scrollTop(0)) : n.length > 0 && (n.find(".errors").hide(), n.prepend(e))
};
var hideCart = function() {
        $(".cart_holder").slideUp(300, function() {
            $(this).remove(), cartShowing = !1
        })
    },
    updateCart = function(t) {
        var e = $(".header_cart_details"),
            i = Format.pluralize(t.item_count, 'Item<span class="hide_mobile">:', 'Items<span class="hide_mobile">:') + " " + Format.money(t.total, !0, !0) + "</span>";
        if (e.html(i), cartShowing || "cart" == $("body").attr("id")) {
            var n = $("<div>"),
                o = $(".cart_holder");
            n.load("/cart?" + $.now() + " .cart_holder", function() {
                o.html(n.find(".cart_holder").html())
            })
        }
    },
    removeFromCart = function(t) {
        Cart.removeItem(t, function(t) {
            updateCart(t)
        })
    },
    showCart = function() {
        var t = $("<div>");
        t.load("/cart?" + $.now() + " .cart_holder", function() {
            var e = t.find(".cart_holder");
            e.css("display", "none"), $("body").prepend(e), e.slideDown(200, function() {
                cartShowing = !0
            })
        })
    };
$(document).ready(function() {
    $(".open_shop a").on("click", function(t) {
        t.preventDefault(), $(".page_links").slideUp("fast", function() {
            $("ul.category_links").slideToggle(150)
        })
    }), $(".open_pages a").on("click", function(t) {
        t.preventDefault(), $(".category_links").slideUp("fast", function() {
            $(".page_links").slideToggle(150)
        })
    }), "cart" != $("body").attr("id") && (cartShowing = !1, $(document).on("click", ".open_cart a", function(t) {
        t.preventDefault(), cartShowing || showCart(), cartShowing && hideCart()
    }).on("click", ".close_cart", function(t) {
        t.preventDefault(), cartShowing && hideCart()
    })), $(".image-link").magnificPopup({
        type: "image",
        gallery: {
            enabled: !0
        }
    }), $("#quantity").keyup(function() {
        var t = $(this),
            e = $(".product_form .price_info"),
            i = parseInt(t.val()),
            n = $(".add-to-cart-button").attr("data-selected-price");
        i > 0 && n && e.html(Format.money(i * n, !0, !0))
    }), $(".product_form").submit(function(t) {
        t.preventDefault();
        var e = $(this).find("#quantity").val(),
            i = $(this).find("#option").val(),
            n = $(this).find(".add-to-cart-button"),
            o = $(this).find(".add_text"),
            r = o.html(),
            a = n.data("added-text");
        Cart.addItem(i, e, function(t) {
            o.html(a), $(".product_form .errors").length && $(".product_form .errors").hide(), setTimeout(function() {
                o.html(r)
            }, 1100), updateCart(t)
        }), n.blur()
    }), $(document).on("click", ".remove a", function(t) {
        if (t.preventDefault(), "cart" == $("body").attr("id")) $(this).closest("li").find("input[id$=_qty]").val(0).closest("form").submit();
        else {
            var e = $(this).data("item-id");
            removeFromCart(e)
        }
    }), $(document).on("click", ".cart_holder #update", function(t) {
        "cart" != $("body").attr("id") && (t.preventDefault(), Cart.updateFromForm("cart_form", function(t) {
            updateCart(t)
        }))
    })
});
var $container = $(".masonry");
$container.length && $container.imagesLoaded(function() {
    $container.masonry()
});
var isGreaterThanZero = function(t) {
    return t > 0
};
Array.prototype.equals = function(t) {
    if (!t) return !1;
    if (this.length != t.length) return !1;
    for (var e = 0, i = this.length; e < i; e++)
        if (this[e] instanceof Array && t[e] instanceof Array) {
            if (!this[e].equals(t[e])) return !1
        } else if (this[e] != t[e]) return !1;
    return !0
}, Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
    value: function(t, e) {
        function i(t, e) {
            return t === e || "number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e)
        }
        if (null == this) throw new TypeError('"this" is null or not defined');
        var n = Object(this),
            o = n.length >>> 0;
        if (0 === o) return !1;
        for (var r = 0 | e, a = Math.max(r >= 0 ? r : o - Math.abs(r), 0); a < o;) {
            if (i(n[a], t)) return !0;
            a++
        }
        return !1
    }
}), Array.prototype.count = function(t) {
    return this.reduce((e, i) => t(i) ? e + 1 : e, 0)
}, $(".product_option_select").on("change", function() {
    enableAddButton($(this).find("option:selected").attr("data-price"))
});