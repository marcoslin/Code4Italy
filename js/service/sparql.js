(function () {

    var app = angular.module("c4iapp");

    app.service("SPARQL", ["$http", "$templateCache", "$log", function ($http, $templateCache, $log) {

        var self = this,
            // Define the TARGET URL
            URL_PRE = "http://dati.camera.it/sparql?default-graph-uri=&query=",
            URL_POS = "&format=application%2Fjson&timeout=0&debug=on&callback=JSON_CALLBACK";


        /**
         * render: Render the text containing mustache parameters.  If key mot provided in
         * `params`, it will be replaced by an empty string.
         *
         * @param {string} template_text - Text with mustache variable to be parsed
         * @param {Object} [params] - Optional key/value that will be used to populate template.
         * @returns {string}
         */
        this.render = function (template_text, params) {
            // Default params to an empty object
            params = params || {};

            // Search for mustache like params with {{...}}
            return template_text.replace(/{{\s*[\w\.]+\s*}}/g, function(x) {
                // Extract key in the mustache quote
                var key = x.match(/[\w\.]+/)[0];

                // Return the key from params if exists, or return an empty string
                if (typeof params[key] === "undefined") {
                    return "";
                } else {
                    return params[key];
                }
            });
        }

        /**
         * generate_trimmed: Same as `generate` but remove all extra spaces.  Designed to remove
         * space based formatting of a SQL statement to be passed as URL.
         *
         * @param {string} template_id - Text of `id` to retrieve the ngTemplate
         * @param {Object} [params] - Optional key/value that will be used to populate template.
         * @returns {string}
         */
        this.generate = function (template_id, params) {
            // Retrieve template using id and trim the string
            var templ = $templateCache.get(template_id),
                templ_trimmed = "";

            if (templ) {
                templ_trimmed = templ.trim().replace(/\s+/g, " ");
            }

            return self.render(templ_trimmed, params);
        }


        /**
         *
         * getData: Return json for given sparql statement and params
         *
         * @param spl_id
         * @param params
         * @returns {json}
         */
        this.getData = function (spl_id, params) {
            var sql = self.generate(spl_id, params);
            $log.log(spl_id + ": ", sql);
            return $http.jsonp(URL_PRE + sql + URL_POS);
        };

    }]);


})();

