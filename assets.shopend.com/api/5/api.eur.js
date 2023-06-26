(function() {
    window.API = {
        debug: !1,
        log: function(e) {
            if (this.debug && window.console) return console.debug ? console.debug(e) : console.log(e)
        },
        emptyFunction: function() {
            return function() {}
        },
        Ajax: {
            transport: function() {
                var e, r, t, n, a, o;
                for (a = !1, r = 0, t = (o = [function() {
                        return new XMLHttpRequest
                    }, function() {
                        return new ActiveXObject("Msxml2.XMLHTTP")
                    }, function() {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    }]).length; r < t; r++) {
                    n = o[r];
                    try {
                        a = n();
                        break
                    } catch (s) {
                        e = s, API.log(e)
                    }
                }
                return a
            },
            events: ["Uninitialized", "Loading", "Loaded", "Interactive", "Complete"],
            success: function(e) {
                var r;
                return !(r = this.status(e)) || 200 <= r && r < 300 || 304 === r
            },
            status: function(e) {
                try {
                    return 1223 === e.status ? 204 : e.status || 0
                } catch (r) {
                    return r, 0
                }
            },
            serializeForm: function(e) {
                var r, t, n, a, o, s;
                for (o = {}, n = 0, a = (r = document.getElementById(e).getElementsByTagName("*")).length; n < a; n++) "input" !== (s = (t = r[n]).tagName.toLowerCase()) && "select" !== s || !t.name || t.disabled || (o[t.name] = t.value);
                return o
            }
        },
        send: function(action, params, callback, options) {
            var body, e, method, transport, url;
            null == params && (params = {}), null == callback && (callback = API.emptyFunction), method = params.method && "GET" === params.method.toUpperCase() ? "GET" : "POST", delete params.method, params = params instanceof String ? params : Format.queryString(params), url = "/" + action + ".js" + (params && "GET" === method ? "?" + params : ""), body = "POST" === method ? params : null, transport = API.Ajax.transport();
            try {
                return transport.open(method, url, !0), transport.setRequestHeader("X-Requested-With", "XMLHttpRequest"), transport.setRequestHeader("Accept", "text/javascript, text/html, application/xml, text/xml, */*"), transport.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), transport.onreadystatechange = function() {
                    var complete, e, response, state, success;
                    if (state = API.Ajax.events[transport.readyState], success = API.Ajax.success(transport), complete = "Complete" === state, response = complete ? transport.responseText : "", response = complete && success && response ? eval("(" + response + ")") : response, complete) try {
                        success ? response.errors ? API.onError(response.errors) : callback(response) : API.onError(response)
                    } catch (error1) {
                        e = error1, API.log('Ajax error handling "Complete" response'), API.log(e)
                    }
                    try {
                        return (options["on" + state] || API.emptyFunction)(response)
                    } catch (error1) {
                        return e = error1, API.log("Ajax error handling '" + state + "' response"), API.log(e)
                    }
                }, transport.send(body)
            } catch (error1) {
                return e = error1, API.log("Ajax error"), API.log(e)
            }
        },
        onError: function(e) {
            return "[object Array]" === Object.prototype.toString.call(e) && (e = e.join(", ")), alert("Error: " + e)
        }
    }
}).call(this),
    function() {
        window.Cart = {
            refresh: function(e, r) {
                return API.send("cart", {}, e, r)
            },
            updateFromForm: function(e, r, t) {
                return API.send("cart", API.Ajax.serializeForm(e), r, t)
            },
            addItem: function(e, r, t, n) {
                var a;
                return (a = {})["cart[add][id]"] = e, a["cart[add][quantity]"] = r || 1, API.send("cart", a, t, n)
            },
            updateItem: function(e, r, t, n) {
                var a;
                return (a = {})["cart[update][" + e + "]"] = r, API.send("cart", a, t, n)
            },
            removeItem: function(e, r, t) {
                return this.updateItem(e, 0, r, t)
            }
        }
    }.call(this),
    function() {
        window.Product = {
            find: function(e, r, t) {
                var n;
                return n = {
                    method: "get"
                }, API.send("product/" + e, n, r, t)
            },
            findAll: function(e, r, t) {
                return null == e && (e = {}), e.method = "get", API.send("products", e, r, t)
            },
            search: function(e, r, t, n) {
                return null == r && (r = {}), r.search = e, this.findAll(r, t, n)
            },
            findImage: function(e, r, t) {
                var n, a, o;
                if (parseInt(r, 10) ? o = parseInt(r, 10) : -1 !== ["thumb", "medium", "large"].indexOf(r) && (a = r), parseInt(t, 10) && (n = parseInt(t, 10)), !a && !o && !n) return e;
                if (void 0 !== a) switch (a.toLowerCase()) {
                    case "large":
                        e = e.replace(/(max_h-)\d+(\+)(max_w-)\d+/, "$1300$2$3300");
                        break;
                    case "medium":
                        e = e.replace(/(max_h-)\d+(\+)(max_w-)\d+/, "$1175$2$3175");
                        break;
                    case "thumb":
                        e = e.replace(/(max_h-)\d+(\+)(max_w-)\d+/, "$175$2$375")
                }
                return void 0 !== o && (e = e.replace(/(max_w-)\d+/, "$1" + o)), void 0 !== n && (e = e.replace(/(max_h-)\d+/, "$1" + n)), e
            }
        }
    }.call(this),
    function() {
        window.Format = {
            currency: {
                format: "%u%n",
                unit: "&euro;",
                separator: ".",
                delimiter: ",",
                precision: 2,
                significant: !1,
                strip_insignificant_zeros: !1,
                code: "EUR"
            },
            version: function(e) {
                var r;
                return r = e.split("."), parseFloat(r.shift() + "." + r.join(""))
            },
            number: function(e, r, t) {
                var n, a, o, s, c;
                for (o = e < 0, e = (s = Math.abs(e).toFixed(Format.currency.precision).toString().split("."))[0], s[1], a = []; 0 < e.length;) a.unshift(e.substr(Math.max(0, e.length - 3), 3)), e = e.substr(0, e.length - 3);
                return n = a.join(r ? Format.currency.delimiter : ""), t && 0 < Format.currency.precision && (n += Format.currency.separator + s[1]), o && (n = "-" + n), Format.currency.strip_insignificant_zeros && (c = {
                    separator: new RegExp(Format.currency.separator.replace(/\./, "\\.") + "$"),
                    zeros: /0+$/
                }, n = n.replace(c.zeros, "").replace(c.separator, "")), n
            },
            commas: function(e) {
                return Format.number(e, !0)
            },
            money: function(e, r, t, n) {
                var a;
                return e = Format.number(e, r, !0), a = t ? Format.currency.format.replace("%u", "<span class='currency_sign'>" + Format.currency.unit + "</span>").replace("%n", e) : e, n ? a + ' <span class="currency_code">' + Format.currency.code + "</span>" : a
            },
            pluralize: function(e, r, t) {
                return t = t || r + "s", e + " " + (1 === e ? r : t)
            },
            queryString: function(e) {
                var r, t;
                for (r in t = [], e) t.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
                return t.join("&")
            }
        }
    }.call(this),
    function() {}.call(this);