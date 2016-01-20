/**
 * Created by jeremycloutier on 1/20/16.
 */
var app = angular.module("myApp", []);

app.controller('mainController', ['$scope', 'addNewSkills', function($scope, addNewSkills){
    $scope.hello = "Elaborate Greeting!";
    $scope.addSkills = addNewSkills.addSkills;
    $scope.data = addNewSkills.data.response;
    //console.log($scope.data);
}]);

app.factory('addNewSkills', ['$http', function($http){
    //var data = {};

    var addSkills = function(skillName){
        var sendSkills = {skill: skillName};
        var data = {};

        $http.post('/addSkills', sendSkills).then(function(response, err){
            //data.response = response.data;
            //console.log(data);
        });
        //return data;
    };
    return {
        addSkills: addSkills
        //data: data
    }
}]);

app.factory('getSkillz', ['$http', function($http){
    var data = {};
    $http.get('/getSkillz').then(function(response, err){
        data.response = response.data;
    });
}]);