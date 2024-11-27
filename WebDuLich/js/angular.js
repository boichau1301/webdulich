var app=angular.module("myapp",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/",{templateUrl: "trangchu.html",controller: "myCtrl"})
    .when("/tour",{templateUrl: "tour.html",controller: "myCtrl"})
    .when("/privatetour",{templateUrl: "vethamquan.html",controller: "myCtrl"})
    .when("/blog",{templateUrl: "blog.html",controller: "myCtrl"})
    .when("/lienhe",{templateUrl: "lienhe.html",controller: "myCtrl"})
    .when("/cart",{templateUrl: "cart.html",controller: "myCtrl"})
    .when("/detail/:id",{templateUrl: "detail.html",controller: "myCtrl"},)
    .otherwise({templateUrl: "trangchu.html",controller: "myCtrl"})
})  

app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];

    $http.get("http://localhost:3000/products").then(function (response) {
        $scope.products = response.data;
        console.log($scope.products);
        $scope.detailPro = $scope.products.find(item => item.id == $routeParams.id);
    });

    $scope.blogs = [];
    $http.get("http://localhost:3000/blogs").then(function (response) {
        $scope.blogs = response.data;
    });

    $scope.sort = 'price';
    $scope.tang = function () {
        $scope.sort = 'price';
    }
    $scope.giam = function () {
        $scope.sort = '-price';
    }


    $scope.getTotalQuantity = function() {
        var totalQuantity = 0;
        for (var i = 0; i < $rootScope.cart.length; i++) {
          totalQuantity += $rootScope.cart[i].quantity;
        }
        return totalQuantity;
      };
 
    $scope.addCart = function (product) {
        if (typeof $rootScope.cart == 'undefined') {
            $rootScope.cart = [];
        }
        var index = $rootScope.cart.findIndex(item=>item.id==product.id);
        if(index==-1){
            product.quantity = 1;
            product.childQuantity = 0; 
            product.infantQuantity = 0;
            $rootScope.cart.push(product);
        }else{
            $rootScope.cart[index].quantity++;
        }
    }

    $scope.calculateSubtotal = function(item) {
        var adultprice = item.price * item.quantity;
        var childprice = item.price * 0.9 * item.childQuantity;
        var infantprice = item.price * 0.8 * item.infantQuantity;
        var subtotal = adultprice + childprice + infantprice;
        return subtotal;
      };


    $scope.removeItem = function (item) {
        var index = $rootScope.cart.indexOf(item);
        if (index !== -1) {
            $rootScope.cart.splice(index, 1);
        }
        // $scope.updateTotal(); 
    };
    
    // $scope.updateTotal = function() {
    //     $scope.totalAmount = $rootScope.cart.reduce(function(total, item) {
    //         if (item.checked) {
    //             return total + $scope.calculateSubtotal(item);
    //         }
    //         return total;
    //     }, 0);
    // };

    
    // $scope.updateTotal();

    // $scope.calculateTotal = function() {
    //     return $scope.totalAmount;
    // };

});



app.controller("myctrl", function ($scope) {
    $scope.countries=['Việt Nam','Mỹ','Trung Quốc','Khác'];
    $scope.tours = [
        'Tour phổ thông',
        'Tour ngày lễ',
        'Tour cao cấp',
        'Tour trong ngày',
        'Tour theo đoàn',
        'Tour khuyến mãi',
        'Tour du thuyền'
    ];

    $scope.months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    $scope.departure=['Thành phố Hồ Chí Minh','Hà Nội','Đà Nẵng','Cần Thơ'];

    $scope.domestic = ['Vũng Tàu','Phú Quốc','Phan Thiết','SaPa','Côn Đảo','Vịnh Hạ Long','Mộc Châu','Buôn Mê Thuột','Nha Trang'];

    $scope.international = ['Ai Cập','Hy Lạp','Nhật Bản','Nam Phi','Châu Âu'];

    $scope.duration = ['1/2 ngày','2 ngày 1 đêm','3 ngày 2 đêm','7 ngày 6 đêm','10 ngày 9 đêm','14 ngày 13 đêm'];

});

