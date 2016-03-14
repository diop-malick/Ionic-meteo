app.factory('StorageService', function($sessionStorage, $localStorage) {

    // $scope.$storage = $localStorage;

    $localStorage = $localStorage.$default({
        trajet: []
    });

    var _getAllPositions = function() {
        return $localStorage.trajet;
    };

    var _addPosition = function(position) {
        $localStorage.trajet.push(position);
    };
    var _removePosition = function(key) { // key = position
        $localStorage.trajet.splice($scope.$storage.trajet.indexOf(key), 1);
    };
    return {
        getAllPositions: _getAllPositions,
        addPosition: _addPosition,
        removePosition: _removePosition
    }

});
