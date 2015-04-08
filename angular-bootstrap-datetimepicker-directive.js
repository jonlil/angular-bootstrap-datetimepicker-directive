(function() {
  'use strict';

  var module = angular.module('datetimepicker', []);


  module.provider('datetimepicker', function() {
    var defaultOptions = {};

    this.setOptions = function (options) {
      defaultOptions = options;
    };

    this.$get = function () {
      return {
        getOptions: function () {
          return defaultOptions;
        }
      };
    };
  });

  
  function DateTimePickerDirective($timeout, datetimepicker) {
    var defaultOptions = datetimepicker.getOptions();

    return {
      require: '?ngModel',
      restrict: 'AE',
      link: function ($scope, $element, $attrs, ngModelCtrl) {
        var datetimepickerOptions = $scope.$eval($attrs.datetimepickerOptions);
        var options = angular.extend({}, defaultOptions, datetimepickerOptions);

        $element
          .on('dp.change', function (e) {
            if (ngModelCtrl) {
              $timeout(function () {
                ngModelCtrl.$setViewValue(e.date._d);
              });
            }
          })
          .datetimepicker(options);
      }
    };
  }
  DateTimePickerDirective.$inject = [
    '$timeout',
    'datetimepicker'
  ];

  module.directive('datetimepicker', DateTimePickerDirective);

})();
