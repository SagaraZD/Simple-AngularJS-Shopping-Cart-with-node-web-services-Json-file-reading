var app = angular.module('ShopingCart', []);

app.controller('shopingCtrl', function($scope, $http) {
  //Get All products
  $http.get("http://localhost:3000/json/products.json")
  .then(function(response) {
    $scope.products = response.data.products;
  });
  
  $scope.viewProduct = function(id){
    $scope.pid = id;
  }

  //Cart Handler
  $scope.total = 0;
  $scope.mydisabled=true;
  $scope.items = [];
  $scope.addToCart = function(name, price){
    $scope.items.push(name);
    $scope.total = $scope.total + price;
    price = 0;
    $scope.mydisabled=false;
  }

//Clear Cart
  $scope.clearCart = function(){
    $scope.items = [];
    $scope.total= 0;
    $scope.mydisabled=true;
  }


  // Place order
  $scope.placeOrder = function () {
    $scope.errors = [];
    $scope.msgs = [];
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    };
    var vata = $.param({
      Items:$scope.items,
      Total:$scope.total,
      Name: $scope.name,
      Email: $scope.email,
      Massage: $scope.address
    });

    $scope.errors.splice(0, $scope.errors.length); // remove all error messages
    $scope.msgs.splice(0, $scope.msgs.length);
    $http.post('/placeOrder', vata, config
  ).success(function (data, status, headers, config) {
     alert(JSON.stringify(data));
     $('#chekoutModel').modal('hide');
     $scope.clearCart();
  }
).error(function (data, status) { // called asynchronously if an error occurs
  $scope.errors.push(status);
});
}

});
