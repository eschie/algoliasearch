'use strict';

(function() {

  angular
    .module('myapp', ['algoliasearch','algolia.autocomplete','ngSanitize'])
    .controller('SearchCtrl', ['$scope', 'algolia', function($scope, algolia) {
      $scope.search = {
        query: '',
        hits: []
      };

      $scope.opts = {
        openOnFocus: true
        // debug: true
      };

      var client = algolia.Client('25SNTVL07O', 'e8db19ef1ebc49680ab2db27cd01b259');
      var index = client.initIndex('test_BESTBUY');

       $scope.getDatasets = function() {
        return {
          source: algolia.sources.hits(index, { hitsPerPage: 5 }),
          displayKey: 'name',
          templates: {
            suggestion: function(suggestion) {
              console.log( "suggestion: ", suggestion );
              if (suggestion._highlightResult.name.value.indexOf())
              return '<img src="'+suggestion.image+'" height="50" align="right">' + suggestion._highlightResult.name.value + '<div class="sm"> in ' + suggestion.categories[suggestion.categories.length - 1] + '</div>';
            }
          }
        };
      };

      $scope.$on('autocomplete:selected', function(event, suggestion, dataset) {
        window.location.href = suggestion.url;
      });
    }]);

})();