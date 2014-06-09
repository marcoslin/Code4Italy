!function () {
    var mod = angular.module("ngWorkerQueue", []);

    mod.provider("WorkerQueue", function () {
        var priv_worker_allowed = 1;

        this.config = function (configData) {
            if (typeof configData==="undefined") {
                return;
            }
            if (configData.workers) {
                priv_worker_allowed = configData.workers;
            }
        };

        this.$get = ['$q', '$timeout', '$log', function ($q, $timeout, $log) {
            var self = this,
                priv_worker_count = 0,
                priv_queue,
                priv_discarded_items = 0,
                workerQueue = function () {};

            /*
             PRIVATE METHODS
             */
            function addToQueue(obj) {
                priv_queue.push(obj);
            }
            function nextFromQueue() {
                if (typeof priv_queue === "undefined") {
                    return undefined;
                } else {
                    return priv_queue.pop();
                }
            }
            function executeQueue() {
                // Must run in async mode
                $timeout(function () {
                    // Only execute if worker are available
                    // console.log("Checking workers: " + priv_worker_count + "/" + priv_worker_allowed);
                    if ( priv_worker_count < priv_worker_allowed ) {
                        priv_worker_count += 1;
                        // console.log("Started worker " + priv_worker_count + " of " + priv_worker_allowed);

                        var item = nextFromQueue();
                        if (item) {
                            var worker = item.worker,
                                d = item.defer,
                                args = item.args;

                            worker.apply(undefined, args).then(function (data) {
                                $log.log("Queue Resolved from worker " + priv_worker_count);
                                if (priv_worker_count > 0) { priv_worker_count -= 1; }
                                d.resolve(data);

                                // Check if there are more items to process
                                executeQueue();
                            }).catch(function (error) {
                                // console.log("Queue Rejected from worker " + priv_worker_count);
                                if (priv_worker_count > 0) { priv_worker_count -= 1; }
                                d.reject(error);

                                // Check if there are more items to process
                                executeQueue();
                            });
                        }
                    }
                });
            }
            function checkInitialized() {
                if (typeof priv_queue === "undefined") {
                    throw new Error("WorkerQueue not initialized.");
                }
            }

            /**
             * Hidden method for unit test only
             */
            workerQueue.prototype.__getDiscardedItems = function (allowedWorkers) {
                return priv_discarded_items;
            };

            /**
             * @ngdoc function
             * @name WorkerQueue.getLength
             * @module ngWorkerQueue
             * @kind function
             *
             * @description
             * Return queue length
             *
             */
            workerQueue.prototype.getLength = function () {
                if (typeof priv_queue === "undefined") {
                    return undefined;
                } else {
                    return priv_queue.length;
                }
            };

            /**
             * @ngdoc function
             * @name WorkerQueue.getWorkers
             * @module ngWorkerQueue
             * @kind function
             *
             * @description
             * Return number of workers for the queue
             *
             */
            workerQueue.prototype.getWorkers = function () {
                return priv_worker_allowed;
            };

            /**
             * @ngdoc function
             * @name WorkerQueue.initialize
             * @module ngWorkerQueue
             * @kind function
             *
             * @description
             * Initialize the WorkerQueue with scope allowing it to auto cleanup upon exit
             *
             * @param {object} scope scope of current running controller
             *
             */
            workerQueue.prototype.initialize = function (scope) {
                var localfn = this;
                $log.log("workerQueue INITIALIZED");
                priv_queue = [];

                // Clear discarded item counter
                priv_discarded_items = 0;

                // Configure auto-cleanup if scope is provided
                if (scope) {
                    scope.$on("$destroy", function () {
                        localfn.clear();
                    });
                }
            };

            /**
             * @ngdoc function
             * @name WorkerQueue.init
             * @module ngWorkerQueue
             * @kind function
             *
             * @description
             * Clear the queue by loop through the queue and rejecting all promises.
             */
            workerQueue.prototype.clear = function () {
                $log.log("WorkerQueue CLEAR");
                var item = nextFromQueue();
                while (item) {
                    priv_discarded_items += 1;
                    if (item.defer) {
                        item.defer.reject("Terminated by workerQueue.clear");
                    }
                    item = nextFromQueue();
                    // console.log("  item cleared.");
                }
                priv_worker_count = 0;
                priv_queue = undefined;
            };


            /**
             * @ngdoc function
             * @name WorkerQueue.add
             * @module ngWorkerQueue
             * @kind function
             *
             * @description
             * Add task to be queued.  It consist of passing of a callback function and an object called workPackage to be used by
             * this callback.  workPackage must contain at minimum following keys:
             * - defer: an angular's $q.defer() object to communicate completion and errors
             * - desc: a description of task
             *
             * A worker must return a promise to tell WorkerQueue when it completes the task.
             *
             * @param {function} worker a function to be invoked on execution.
             * @param {object} args arguments to be used by the worker function
             */
            workerQueue.prototype.add = function (worker) {
                checkInitialized();
                var d = $q.defer(),
                    args = Array.prototype.slice.call(arguments, 1);
                // console.log(".add called with args: ", args);

                // Add to queue
                addToQueue({
                    "defer": d,
                    "worker": worker,
                    "args": args
                });

                // ExecuteQueue
                executeQueue();

                return d.promise;
            };


            return new workerQueue();
        }];

    });

}()