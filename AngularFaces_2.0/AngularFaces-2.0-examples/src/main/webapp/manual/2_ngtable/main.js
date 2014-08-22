var app = angular.module('AngularFacesExamples', ["angularfaces", 'ngTable']).
controller('MyCtrl', function($scope, $filter, ngTableParams) {
	// This initializes the Angular Model with the values of the JSF bean attributes
	initJSFScope($scope);

    $scope.tableParams = new ngTableParams({
        page: 1,                  // show first page
        count: 10,                // count per page
        sorting: { brand: 'asc' } // initial sorting
    }, {
        total: $scope.carPool.carPool.length, // length of data
        getData: function($defer, params) {
        	var rows = $scope.carPool.carPool;
        	if (params.sorting()) rows = $filter('orderBy')(rows, params.orderBy());
        	var page = params.page();
        	var pageLength = params.count();
			$defer.resolve(rows.slice((page - 1) * pageLength, page * pageLength));
        }
    });
})


