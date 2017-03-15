/**
 * Created by jansabhi on 2/16/17.
 */
var app = angular.module('expense', []);

app.controller('expCtrl', function ($scope) {
    $scope.master = {};
    $scope.todaysDate = new Date();
    $scope.filtering = false;
    $scope.deletionIndex;
    $scope.expenses = (localStorage.getItem('expenses') !== null) ? JSON.parse(localStorage.getItem('expenses')) : [];
    $scope.expense = $scope.expenses;


    $scope.update = function (expense) {
        $scope.expenses.push({date: $scope.todaysDate, name: $scope.expense.name, amount: $scope.expense.amount});
        $scope.expense.name = '';
        $scope.expense.amount = '';
        localStorage.setItem('expenses', JSON.stringify($scope.expenses));
    };
    $scope.editexp = function (expense) {
        $scope.expenses[$scope.deletionIndex].amount = expense.amount;
        localStorage.setItem('expenses', JSON.stringify($scope.expenses));
        $scope.readonly = false;
        $scope.editit = false;
        $scope.addit = false;
        $scope.reset();

    };

    $scope.reset = function () {

        $scope.expense.name = '';
        $scope.expense.amount = '';

    };


    $scope.getExpense = function () {

        var total = 0;
        angular.forEach($scope.expense, function (expense, key) {
            var amount = expense.amount;
            total += amount;

        });
        return total;
    };

    $scope.getExp = function (filteredExpense) {
        var total = 0;
        $scope.filteredExpense = filteredExpense;
        angular.forEach($scope.filteredExpense, function (expense, key) {
            var amount = expense.amount;
            total += amount;

        });
        return total;

    };

    $scope.Edit = function (exp) {

        $scope.readonly = true;
        $scope.editit = true;
        $scope.addit = true;
        $scope.expense.name = exp.name;
        $scope.expense.amount = exp.amount;
        $scope.deletionIndex = $scope.expense.indexOf(exp);
    };

    $scope.Delete = function (exp) {
        var _index = $scope.expense.indexOf(exp);
        $scope.expenses.splice(_index, 1);
        localStorage.setItem('expenses', JSON.stringify($scope.expenses));

    }

});
