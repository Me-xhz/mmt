(function() {
	var e = "V1.6";
	var t = "plog";
	var n = "default";

	var o = require("./push-stat-conf.js");

	var i = false;
	var a = false;
	var s = {};
	var r = "";
	var f = {
		uu: "",
		ak: "",
		pm: "",
		wvv: "",
		wsdk: "",
		sv: "",
		wv: "",
		nt: "",
		ww: "",
		wh: "",
		pr: "",
		pp: "",
		lat: "",
		lng: "",
		ev: "",
		st: "",
		et: "",
		ppx: "",
		ppy: "",
		v: "",
		data: "",
		fid: "",
		lang: "",
		wsr: "",
		ifo: "",
		jscode: "",
		etype: ""
	};

	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(e) {
			"use strict";

			if (this == null) {
				throw new TypeError();
			}

			var t = Object(this);
			var n = t.length >>> 0;

			if (n === 0) {
				return -1;
			}

			var o = 0;

			if (arguments.length > 1) {
				o = Number(arguments[1]);

				if (o != o) {
					o = 0;
				} else if (o != 0 && o != Infinity && o != -Infinity) {
					o = (o > 0 || -1) * Math.floor(Math.abs(o));
				}
			}

			if (o >= n) {
				return -1;
			}

			var i = o >= 0 ? o : Math.max(n - Math.abs(o), 0);

			for (; i < n; i++) {
				if (i in t && t[i] === e) {
					return i;
				}
			}

			return -1;
		};
	}

	function p(e) {
		var t = wx.getStorageSync("t_uuid");

		if (!t) {
			t = "" + Date.now() + Math.floor(Math.random() * 1e7);
			wx.setStorageSync("t_uuid", t);
			wx.setStorageSync("ifo", 1);
			f.ifo = true;
		} else {
			f.ifo = false;
		}

		return t;
	}

	var l = function(e) {
		wx.getLocation({
			type: "wgs84",
			success: function(t) {
				i = true;
				f["lat"] = t["latitude"];
				f["lng"] = t["longitude"];
				h(e, "location", "location");
			},
			fail: function() {
				i = false;
			}
		});
	};

	var u = function(e) {
		if (wx.getSetting) {
			wx.getSetting({
				success: function(t) {
					if (t.authSetting["scope.userLocation"]) {
						l(e);
					}

					if (t.authSetting["scope.userInfo"]) {
						d(e, function(t) {
							e.aldpush_login_data = t;
							h(e, "user_info", "userinfo");
						});
					}
				}
			});
		}
	};

	var d = function(e, t) {
		 // #ifdef MP-WEIXIN
		wx.login({
			success: function(e) {
				if (e.code) {
					f.jscode = e.code;
					wx.getUserInfo({
						success: function(e) {
							a = true;
							t(e);
						},
						fail: function(e) {
							a = false;
							h(e, "user_info_close", "user_info_close");
						}
					});
				} else {
					f.jscode = 0;
				}
			}
		});
		// #endif
	};

	var c = function(e, n, o) {
		if (typeof arguments[1] === "undefined") n = "GET";
		if (typeof arguments[2] === "undefined") o = "d.html";
		var i = 0;

		var a = function() {
			wx.request({
				url: "https://" + t + ".xiaoshentui.com/" + o,
				data: e,
				header: {},
				method: n,
				success: function() {},
				fail: function() {
					if (i < 2) {
						i++;
						e["retryTimes"] = i;
						a();
					}
				}
			});
		};

		a();
	};

	function h(t, n, i) {
		var a = p(t);
		var l = 0;

		if (n == "app" && i == "hide") {
			var u = Date.now();
			l = wx.getStorageSync("ifo");
			wx.setStorageSync("ifo", 0);
		}

		var d = "";

		if (n == "user_info") {
			d = t.aldpush_login_data;
		} else if (n == "user_info_close") {
			d = {
				status: 0
			};
		} else if (n == "event") {
			d = s;
		} else if (n == "startevent" || n == "yyy") {
			d = s;
		} else {
			d = 0;
		}

		var h = n == "fpage" || n == "fhpage" ? f.fid : 0;
		var w = n == "page" || n == "app" || n == "fpage" || n == "fhpage" ? 0 : f.jscode;
		var v = {
			uu: a,
			ak: o["app_key"],
			pm: f.pm ? f.pm : 0,
			wvv: f.wvv ? f.wvv : 0,
			wsdk: f.wsdk ? f.wsdk : 0,
			sv: f.sv ? f.sv : 0,
			wv: f.wv ? f.wv : 0,
			nt: f.nt ? f.nt : 0,
			ww: f.ww ? f.ww : 0,
			wh: f.wh ? f.wh : 0,
			pr: f.pr ? f.pr : 0,
			pp: f.pp ? f.pp : 0,
			lat: f.lat ? f.lat : 0,
			lng: f.lng ? f.lng : 0,
			ev: n,
			life: i,
			st: f.st || 0,
			et: u ? u : 0,
			ppx: f.ppx ? f.ppx : 0,
			ppy: f.ppy ? f.ppy : 0,
			v: e,
			data: d,
			fid: h,
			lang: f.lang ? f.lang : 0,
			wsr: n == "app" ? t.aldpush_showOptions : {},
			ifo: l,
			jscode: w
		};

		if (r !== "" && n === "event") {
			v["etype"] = r;
		}

		if (n === "yyy" || n === "startevent") {
			c(v, "GET", "d.html");
		} else {
			c(v, "GET", "d.html");
		}
	}

	function w(e) {
		this.app = e;
	}

	function v(e) {
		this["aldPush"] = new w(this);
		var t = this;

		if (typeof e != "undefined") {
			t.aldpush_showOptions = e;
			f.pp = e["path"];
		} else {
			t.aldpush_showOptions = {};
		}

		var n = function() {
			wx.getNetworkType({
				success: function(e) {
					f.nt = e["networkType"];
				}
			});
		};

		n();
		u(t);
		wx.getSystemInfo({
			success: function(e) {
				f.pm = e["model"];
				f.wv = e["version"];
				f.wsdk = typeof e["SDKVersion"] === "undefined" ? "1.0.0" : e["SDKVersion"];
				f.sv = e["system"];
				f.wvv = e["platform"];
				f.ww = e["screenWidth"];
				f.wh = e["screenHeight"];
				f.pr = e["pixelRatio"];
				f.lang = e["language"];
			},
			complete: function() {}
		});
		wx.getSystemInfoSync({
			success: function(e) {
				f.pm = e["model"];
				f.wv = e["version"];
				f.wsdk = typeof e["SDKVersion"] === "undefined" ? "1.0.0" : e["SDKVersion"];
				f.sv = e["system"];
				f.wvv = e["platform"];
				f.ww = e["screenWidth"];
				f.wh = e["screenHeight"];
				f.pr = e["pixelRatio"];
				f.lang = e["language"];
			},
			complete: function() {}
		});
	}

	function g(e) {
		var t = this;

		if (typeof e != "undefined") {
			t.aldpush_showOptions = e;
		} else {
			t.aldpush_showOptions = {};
		}
	}

	function y() {
		var e = this;
		h(e, "app", "hide");
	}

	function x(e) {
		var t = getApp().globalData;
		t.options = e;
	}

	function m(e) {
		var t = this;

		if (typeof e === "undefined") {
			e = t.options;
		}

		f.pp = t["__route__"];

		if (n != "default" && n != t["__route__"]) {
			if (!a) {
				d(t, function(e) {
					t.aldpush_login_data = e;
					h(t, "user_info", "userinfo");
				});
			}
		}

		n = t["__route__"];
		h(t, "page", "hide");
	}

	function _(e, t) {
		var n = f.ww;
		var o = f.wh;
		var i = this;
		var a = {
			length: [],
			is_showHideBtn: true
		};

		for (var s = 0; s <= 50; s++) {
			var r = Math.ceil(Math.random() * n);
			var p = Math.ceil(Math.random() * o);
			var l =
				'-webkit-transform: scale(0.5);transform:scale(1);content:"";height:88px;width:88px;border:1px solid transparent;background-color:transparent;position:fixed;z-index: 999;left:' +
				r + "px;top:" + p + "px;";
			a.length.push(l);
		}

		var u = wx.getStorageSync("isShowClick");
		i.setData({
			hideBtnData: a,
			isShowClick: Boolean(u),
			btn_style: {
				name: "sdk默认按钮",
				style: "border:1px solid transparent;"
			},
			miniSubscribeBtn: {
				name: "关注",
				style: "width:50%;border:1px solid #000;padding:8px 50px;border-radius:8px;font-size:0.8rem;line-height:1.5;background-color:#fff;"
			},
			miniFollowBtn: {
				name: "+关注",
				style: "width:50%;border:1px solid #000;padding:8px 50px;border-radius:8px;font-size:0.8rem;line-height:1.5;background-color:#fff;"
			},
			longSubscribeBtn: {
				name: "关注",
				style: "border:1px solid #000;padding:3px 100px;font-size:0.8rem;line-height:1.5;background-color:#fff;"
			},
			longFollowBtn: {
				name: "关注",
				style: "border:1px solid#000;padding:3px 100px;font-size:0.8rem;line-height:1.5;background-color:#fff;"
			}
		});
	}

	function S(e) {
		var t = this;
		f.ppx = e.detail.target.offsetLeft;
		f.ppy = e.detail.target.offsetTop;
		f.fid = e.detail.formId;

		function n() {
			wx.setStorageSync("isShowClick", "false");
			t.setData({
				is_showHideBtn: true,
				isShowClick: "false"
			});
			wx.showToast({
				title: "成功",
				icon: "success",
				duration: 2e3
			});
		}

		if (!a) {
			d(t, function(e) {
				t.aldpush_login_data = e;
				h(t, "user_info", "userinfo");
				n();
			});
		}

		if (!i) {
			l(t);
		}

		h(t, "fpage", "clickform");
	}

	function b(e, t) {
		var n = "";
		var o = this;

		if (e) {
			var i = ["onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom",
				"onShareAppMessage", "onPageScroll"
			];

			if (typeof e["type"] === "undefined") {
				if (i.indexOf(t) >= 0) {
					r = "wechat_function";
				} else {
					r = "developer_function";
				}
			} else {
				r = e.type;
			}

			n = e.currentTarget ? e.currentTarget : {};
			s = n;
			h(o, "event", t);
		}
	}

	function k(e) {
		var t = this;
		f.ppx = e.detail.target.offsetLeft;
		f.ppy = e.detail.target.offsetTop;
		f.fid = e.detail.formId;
		t.setData({
			is_showHideBtn: true
		});
		h(t, "fhpage", "hideclickform");
	}

	function T(e, t, n) {
		if (e[t]) {
			var o = e[t];

			e[t] = function(e) {
				n.call(this, e);
				o.call(this, e);
			};
		} else {
			e[t] = function(e) {
				n.call(this, e);
			};
		}
	}

	var D = App;

	App = function(e) {
		T(e, "onLaunch", v);
		T(e, "onShow", g);
		T(e, "onHide", y);
		D(e);
	};

	var M = Page;

	Page = function(e) {
		T(e, "onShow", x);
		T(e, "onLoad", _);
		T(e, "onHide", m);
		T(e, "hidepushFormSubmit", k);
		T(e, "pushFormSubmit", S);
		M(e);
	};
})();
