(function(){
    'use strict';

/**
 * @name codertyLoading
 * @desc <coderty-loading> Directive
 */
function codertyLoading () {


    return {
        restrict: 'A',
        scope: {
            codertyLoading: '='
        },
        transclude: true,
        template: [
            '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
            '<div ng-transclude ng-hide="codertyLoading"></div>'
        ].join('')
    };

}
angular
    .module('codertyLoading', [])
    .directive('codertyLoading', codertyLoading);

})();