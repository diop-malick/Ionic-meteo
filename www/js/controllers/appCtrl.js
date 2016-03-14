/* =================================================================================
  HOME
 ================================================================================= */

app.controller('HomeCtrl', function($scope, $state) {

    $scope.search = function(city) {
        $state.go('weather', { city })
    }

});


/* =================================================================================
     WEATHER                
 ================================================================================= */

app.controller('WeatherCtrl', function($scope, $ionicLoading, $stateParams, $http, $state) {

    // $scope.Math = window.Math;
    $scope.Math = Math;

    // $scope.city = $stateParams.city;
    // url = "http://api.openweathermap.org/data/2.5/forecast?q="+ $stateParams.city + "&mode=json&units=metric&cnt=10"; &lang=zh_cn
    apikey = "c8b9975f74ef8d9edf6f1222f374198c";
    // url  = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ $stateParams.city + ",fr&mode=json&units=metric" + "&APPID=" + apikey;  
    url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $stateParams.city + "&lang=fr&mode=json&units=metric&cnt=7&APPID=" + apikey;

    $ionicLoading.show({
        template: 'Chargement...'
    });
    $http.get(url)
        .success(function(response) {
            $ionicLoading.hide();
            $scope.weather = response;
        })
        .error(function() {
            $ionicLoading.hide();
        });

    $scope.expand = function(city, date, index) {
        // console.log(city);
        if (index <= 5) {
            $state.go('weatherdaily', {
                city: city,
                date: date
            });
        }
    }
});

app.controller('WeatherDailyCtrl', function($scope, $ionicLoading, $stateParams, $http) {

    $scope.Math = Math;
    apikey = "c8b9975f74ef8d9edf6f1222f374198c";
    url = "http://api.openweathermap.org/data/2.5/forecast?q=" + $stateParams.city + "&mode=json&units=metric&APPID=" + apikey;

    $scope.list_dt = [];

    var startDate = parseInt($stateParams.date);

    $ionicLoading.show({
        template: 'Chargement...'
    });
    $http.get(url)
        .success(function(response) {
            $ionicLoading.hide();
            $scope.weather = response; // return lis of 40 T° in interval of 3h
            // filtre de la liste retournée
            for (item of $scope.weather.list) {
                if (item.dt > startDate && item.dt < (startDate + (3 * 60 * 60 * 8))) {
                    $scope.list_dt.push(item);
                }
            }
            // intervalle : 10800 seconde : 180 minutes : 3h
            // 3h * 60mn * 60s * 8 intervalles -> 24 h
            // console.log($scope.list_dt);
        })
        .error(function() {
            $ionicLoading.hide();
        });
});




/* =================================================================================

 ================================================================================= */
app.controller('ConfigCtrl', function($scope) {
    console.log("ConfigCtrl");

});
