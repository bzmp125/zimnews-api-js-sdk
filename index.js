"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _https = require("https");

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var securedRoutes = ["news", "sources"];
var ZimNews = function () {
    function ZimNews(apiKey) {
        (0, _classCallCheck3.default)(this, ZimNews);

        this.setAPIKey(apiKey);
        this.securedRoutes = securedRoutes;
    }

    (0, _createClass3.default)(ZimNews, [{
        key: "getURL",
        value: function getURL(resource, options) {
            //handle apiKey

            var isSecuredRoute = this.securedRoutes.indexOf(resource) != -1;
            if (isSecuredRoute && typeof this.getAPIKey() != "string") throw new Error("Invalid type of API Key.");

            if (isSecuredRoute && !this.apiKey) throw new Error("Missing API Key.");

            var url = "https://zimnews-api.firebaseapp.com/api/" + resource;
            if (isSecuredRoute) url = url + "?apiKey=" + this.getAPIKey();

            //handle options
            if (options && (typeof options === "undefined" ? "undefined" : (0, _typeof3.default)(options)) == "object") {
                var tmp = [];
                (0, _keys2.default)(options).forEach(function (option) {
                    tmp.push(option + "=" + options[option]);
                });
                url += "&" + tmp.join("&");
            }
            return url;
        }
    }, {
        key: "getAPIKey",
        value: function getAPIKey() {
            return this.apiKey;
        }
    }, {
        key: "setAPIKey",
        value: function setAPIKey(apiKey) {
            this.apiKey = apiKey;
        }
    }, {
        key: "error",
        value: function error(_error, data) {
            return data ? { error: _error, data: data } : { error: _error };
        }
    }, {
        key: "getNews",
        value: function getNews(options) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                var url = _this.getURL("news", options);

                _https2.default.get(url, function (resp) {
                    if (resp.statusCode < 200 || resp.statusCode > 299) reject(new Error("Failed to connect. Status Code: " + resp.statusCode));

                    var data = '';
                    resp.on('data', function (chunk) {
                        data += chunk;
                    });
                    resp.on('end', function () {
                        data = JSON.parse(data);
                        if (data.success == true && data.stories) resolve(data.stories);else reject(_this.error("Stories not found.", data));
                    });
                    resp.on('err', function (err) {
                        return reject(err);
                    });
                });
            });
        }
    }, {
        key: "getSources",
        value: function getSources(options) {
            var _this2 = this;

            return new _promise2.default(function (resolve, reject) {
                var url = _this2.getURL("sources", options);

                _https2.default.get(url, function (resp) {
                    if (resp.statusCode < 200 || resp.statusCode > 299) reject(new Error("Failed to connect. Status Code: " + resp.statusCode));

                    var data = '';
                    resp.on('data', function (chunk) {
                        data += chunk;
                    });
                    resp.on('end', function () {
                        data = JSON.parse(data);
                        if (data.success == true && data.data) resolve(data.data);else reject(_this2.error("Sources not found."));
                    });
                    resp.on('err', function (err) {
                        return reject(err);
                    });
                });
            });
        }
    }, {
        key: "getCategories",
        value: function getCategories(options) {
            var _this3 = this;

            return new _promise2.default(function (resolve, reject) {
                var url = _this3.getURL("categories", options);

                _https2.default.get(url, function (resp) {
                    if (resp.statusCode < 200 || resp.statusCode > 299) reject(new Error("Failed to connect. Status Code: " + resp.statusCode));

                    var data = '';
                    resp.on('data', function (chunk) {
                        data += chunk;
                    });
                    resp.on('end', function () {
                        data = JSON.parse(data);
                        if (data.success == true && data.data) resolve(data.data);else reject(_this3.error("Categories not found."));
                    });
                    resp.on('err', function (err) {
                        return reject(err);
                    });
                });
            });
        }
    }]);
    return ZimNews;
}();

module.exports = ZimNews;

// 

// https.get('https://zimnews-api.firebaseapp.com/api/news?apiKey=36805db855c5f4e963f996217f7b4182',resp=>{
//     let data = '';
//     resp.on('data',chunk=>{
//         data += chunk;
//     })
//     resp.on('end',()=>{
//         console.log(JSON.parse(data).stories[0].title)
//     })
// })