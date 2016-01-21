/**
 * Created by jeremycloutier on 1/20/16.
 */
var app = angular.module("myApp", []);

app.controller('mainController', ['$scope', 'addNewSkills', 'getSkillz', 'getTalent', function($scope, addNewSkills, getSkillz, getTalent){
    $scope.hello = "Elaborate Greeting!";
    $scope.addSkills = addNewSkills.addSkills;
    $scope.displaySkillz = getSkillz.getSkillz;
    $scope.skillz = getSkillz.data;
    console.log($scope.displaySkillz);
    $scope.getTalent = getTalent.getTalent;
    $scope.talent = getTalent.data;
}]);

app.factory('addNewSkills', ['$http', function($http){
    //var data = {};

    var addSkills = function(skillName){
        var sendSkills = {skill: skillName};
        var data = {};

        $http.post('/addSkills', sendSkills).then(function(response, err){
            //data.response = response.data;
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
    var getSkillz = function(){
        $http.get('/getSkillz').then(function(response, err) {
            data.response = response.data;
            console.log(data.response);
        });
    };
    return {
        data: data,
        getSkillz: getSkillz
    };
}]);

app.factory('getTalent', ['$http', function($http){
    var data = {};
    var getTalent = function(){
        $http.get('/getTalent').then(function(response, err) {
            data.response = response.data;
            console.log(data.response);
        });
    };
    return {
        data: data,
        getTalent: getTalent
    };
}]);