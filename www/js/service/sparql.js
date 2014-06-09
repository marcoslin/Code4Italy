(function () {

    var app = angular.module("c4iapp");

    app.service("SPARQL", ["$http", "$templateCache", "$q", "$timeout", "WorkerQueue", "$log", function ($http, $templateCache, $q, $timeout, WorkerQueue, $log) {

        var self = this,
            // Define the TARGET URL
            URL_PRE = "http://dati.camera.it/sparql?default-graph-uri=&query=",
            URL_POS = "&format=application%2Fjson&timeout=0&debug=on&callback=JSON_CALLBACK";


        // Initialize WorkerQueue
        this.initialize = function (scope) {
            WorkerQueue.initialize(scope);
        };

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
            var sql = self.generate(spl_id, params),
                retry_max = 3,
                retry_count = 0;

            $log.log(spl_id + ": ", sql);

            function getSparqlWithRetry(sparl_sql) {
                var d = $q.defer();

                function executeGet() {
                    $http.jsonp(sparl_sql).then(function (data) {
                        d.resolve(data);
                    }).catch(function (error) {
                        /*
                        As there is no way to get HTTP Status code back from serer when
                        using jsonp, blindly perform retries
                        https://github.com/angular/angular.js/issues/1423
                         */
                        if (retry_count < retry_max) {
                            retry_count += 1;
                            $log.error("http.jsonp error retry: ", error );
                            $timeout(executeGet, 500);
                        } else {
                            $log.error("http.jsonp error max retry reached: ", error );
                            d.reject(error);
                        }
                    });
                }

                executeGet();

                return d.promise;
            }

            return WorkerQueue.add(getSparqlWithRetry, URL_PRE + sql + URL_POS);
        };
    }]);


})();

