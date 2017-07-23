/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['ui.router','ngResource','ngOpenFB','ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, ngFB) {
    // Form data for the login modal
    $scope.loginData = {};
    
    ///////////////FB LOGIN//////////////////////
    $scope.fbLogin = function () {
    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};
    
    //////////////////////////////
    
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})


.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,$resource,$rootScope,$state) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    
    $scope.data = {};
    
    $scope.doLogIn = function(){     
         var loginResource = $resource('http://localhost:18080/sprint.youbay-web/rest/account/loginCustomer/:login/:password');
        $scope.data = loginResource.get({login:$scope.data.login,password:$scope.data.password}, function (response) {
            
            console.log(response.c.customer_Id);
            console.log(response.type);
            
            if(response.c.customer_Id) {
                $rootScope.currentUser = response;
                console.log($rootScope.currentUser);
                $state.go("app.home");
                        if($rootScope.currentUser.type=="customer"){
                        $rootScope.control = {
                            showProducts: false,
                            showDeals:false,
                            showSales:false
                        };          

                        }
                else if($rootScope.currentUser.type=="business"){
                $rootScope.control = {
                            showProducts: true,
                            showDeals:true,
                            showSales:true
                        };          
                }
                
                
               
            } else {
                $scope.showAlert('Incorrect Credentials','Verify Your Username and Password');   
                 $state.go("app.login");
            }
        },
        function (errorResponse) {
            console.log(errorResponse);
        });
     }
 
        
   
    
})




.controller('facebookProfileCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
})


.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('HomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$rootScope,$cordovaGeolocation) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    
    console.log($rootScope.currentUser.c);
    $scope.user = $rootScope.currentUser.c;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    
    
        
     /////////////////////MAP//////////////////////
   // $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    
    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location");
  });
    //////////////////////////////////////////////////

})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    
    

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})
//*********************************Donia Controllers******************//

//All Customer Products
.controller('ProductsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,ProductListFactory,CategoryListFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    
    $scope.products=ProductListFactory.query();
    $scope.categories=CategoryListFactory.query();
    console.log(ProductListFactory.query());      

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
})

// Product Details
.controller('productDetailsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,viewProductFactory){

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    $scope.product=viewProductFactory.get({id: $stateParams.id});
    console.log(viewProductFactory);
    //$scope.categories=CategoryListFactory.query();
        

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

})

// All provider Products
.controller('myProductsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,ProductListFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    
    $scope.products=ProductListFactory.query();
    $scope.removeProduct = function (index) {
        $scope.products.splice(index, 1);
    };
    
    console.log(ProductListFactory.query());      

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
})

//Update Product
.controller('updateProductCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,CategoryListFactory,viewProductFactory,$resource,$state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
     $scope.categories=CategoryListFactory.query();
    
    var res= $resource('http://localhost:18080/sprint.youbay-web/rest/managingProducts/:id/:name/:desc/:tag/:price/:qte', { id: '@id_Product', name:'@product_Name', desc:'@product_Description', tag:'@product_Tag', price:'@product_Price', qte:'@product_Quantity'}, {
    updateProduct: {
      method: 'PUT' // this method issues a PUT request
    }
     
});
    res.updateProduct({id_Product:$stateParams.id,
                       product_Name:$stateParams.name,
                       product_Description:$stateParams.desc,
                       product_Tag:$stateParams.tag,
                       product_Price:$stateParams.price,
                       product_Quantity:$stateParams.qte});
/*
    $state.go('app.myProducts');
*/
    
    $scope.loadProduct = function() { //Issues a GET request to /api/products/:id to get a product to update
    $scope.product = viewProductFactory.get({ id: $stateParams.id });
  };

  $scope.loadProduct(); // Load a product which can be edited on UI
    
    

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
})

//Add Product

.controller('addProductCtrl', function($scope, $state,$stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,CategoryListFactory,addProductFactory,$rootScope) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    
    $scope.product=new addProductFactory();
    $scope.categories=CategoryListFactory.query();
    $scope.addProduct=function(){
        
        $scope.product.businessConsumer= $rootScope.currentUser.c;
        console.log($scope.product.businessConsumer_customer_Id);
        $scope.product.$save(function(){
           $state.go('app.myProducts');
        });
    }
    

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
})
//***************************************************//

//*********************RIM Controllers*********************//

//shopping Cart controller 

/*
.controller('myShoppingCartCtrl', function($scope,ProductSHPFactory,$rootScope,getAccountFactory) {
*/
  
    
    /*var account =getAccountFactory.get({idAccount: $rootScope.currentUser.c.customer_Id});
    console.log(account);*/
    
/*$scope.myproducts=ProductSHPFactory.get({idShCart: $rootScope.currentUser.c.account.shoppingCart.shoppinCart_Id }); 
 */  

/*     $scope.total = function() {
        var total = 0;
        angular.forEach($scope.myproducts, function(product) {
            total += product.product_Price  * product.product_Quantity;
          
        })

        return total;
    }
    
     
        $scope.removeItem = function(index) {
        $scope.myproducts.splice(index, 1);
    };

})*/

//shopping Cart controller 

.controller('myShoppingCartCtrl', function($scope,ProductSHPFactory) {
  
$scope.myproducts=ProductSHPFactory.query(); 
   
 

     $scope.total = function() {
        var total = 0;
        angular.forEach($scope.myproducts, function(product) {
            total += product.product_Price  * product.product_Quantity;
          
        })

        return total;
    }
    
     
        $scope.removeItem = function(index) {
        $scope.myproducts.splice(index, 1);
    };

})

.controller('addToShopCartCtrl', function($scope,$state,$rootScope,addToShopFactory) {
  
     
    $scope.LineItem=new addToShopFactory();
    
    $scope.addToShop=function(){
        
/*
        $scope.LineItem.id_Product= $scope.id_Product;
*/
        $scope.LineItem.$save(function(){
           $state.go('app.productDetails');
        });
    
    
}
})


//Order Products

.controller('productsOrderCtrl', function($scope,$resource,$stateParams,OrderFactory,$state) {

 $scope.total=$stateParams.id;
   $scope.order=new OrderFactory();
  $scope.date = new Date();
    $scope.addOrder=function(){
        $scope.order.$save(function(){
           $state.go('app.ShoppingCart');
        });
    }
   
})

// Count Qte

.controller('productsQuantityCtrl', function($scope,$resource,$stateParams) {
  
    var res= $resource('http://localhost:18080/sprint.youbay-web/rest/sales/updateQuantity/:id/:qte', { id: '@id_Product',qte:'@product_Quantity' }, {
    updateProduct: {
      method: 'PUT' // this method issues a PUT request
    }
     
});
    res.updateProduct({id_Product:$stateParams.id,product_Quantity:$stateParams.qte});
})

   

/*************************Hazem*********************/

.controller('SuggestionCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,suggestCategoryFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    
    //suggestion
    $scope.suggestCategory=function(name)
    {
    
    var category =new suggestCategoryFactory;
    category.category_Name=name;
    //enregistrer
    
    category.$save();
    $scope.status="Your Suggestion has been successfully sent.";
    }
        

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
})

.controller("SalesCtrl", function($scope,$resource) {
    
    var salesRessource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/countSales/:paramId/:paramMonth');
    
    var monthData = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,-1];
    var months = [1,2,3,4,5,6,7,8,9,10,11,12];
    months.forEach(function(entry)
                   {        
        var salesMonth = salesRessource.get({paramId:"2",paramMonth:entry},function(response)
                                      {          
            monthData[entry-1] = response.data;
            if(entry==12)
            {
                
                $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                $scope.series = ['Sales Number'];
                $scope.data = [monthData];
                console.log(monthData[10]);
            }                
            
        },function(errorResponse){
            
            console.log(errorResponse);
            
        });
        
                   }); 
})




//************************************************//


/******************Fares Controllers*********************/
//////  Deals ////////////
.controller('DealsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,DealsListFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    

    
      $scope.deals=DealsListFactory.query();
    console.log(DealsListFactory.query());
    

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})


.controller('CommentsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,CommentsListFactory) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    

    
      $scope.comments=CommentsListFactory.query();
    console.log(CommentsListFactory.query());
    

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})




///////////////////// Comments ///////////////////





.controller('AddDealsCtrl', function($scope, $state,$stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,CategoryListFactory,addDealsFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    
    
    $scope.deal=new addDealsFactory();
    $scope.addDeals=function(){
        $scope.deal.$save(function(){
           $state.go('app.deals');
        });
    }
        $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
    
})

/********************** 7amma Controllers********************/
.controller('signupCustomerCtrl', function($scope,addCustomer,$state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    
	$scope.add=function(address,email,first_Name,lastName,login,password,phone){
		var customer = new addCustomer;
		customer.address=address;
		customer.email=email;
		customer.first_Name=first_Name;
		customer.lastName=lastName;
		customer.login=login;
        customer.password=password;
        customer.phone=phone;
		customer.$save();
         $state.go("app.login");
        
	}

})
.controller('signupBusinessCtrl', function($scope,addBusiness) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    
	$scope.add=function(address,email,first_Name,lastName,login,password,phone){
		var business = new addBusiness;
		business.address=address;
		business.email=email;
		business.first_Name=first_Name;
		business.lastName=lastName;
		business.login=login;
        business.password=password;
        business.phone=phone;
		business.$save();
        $state.go("app.login");
	}

})
/***********************************************************/

/*********************************************************/

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})


//***************************Donia Factories**************************

.factory('ProductListFactory', function($resource){
       
        //Resource
        var browsingProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts');
       
        return browsingProductsResource;
})
.factory('viewProductFactory', function($resource){
       
        //Resources
       var browsingProductsByCriteriaResource=$resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts/:id');
          return browsingProductsByCriteriaResource;
})

.factory('CategoryListFactory', function($resource){
       
        //Resources
       var browsingCategoriesResource=$resource('http://localhost:18080/sprint.youbay-web/rest/browsingCategories');
          return browsingCategoriesResource;
})


.factory('addProductFactory', function($resource){
       
        //Resources
       var managingProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/managingProducts');
          return managingProductsResource;
})


//*******************************************************************//

//**************Factories RIM*********************//

.factory('ProductsFactory', function($resource){
       
        //Resource
        var browsingProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/browsingProducts');
       
        return browsingProductsResource;
})


.factory('ProductSHPFactory', function($resource,$rootScope){
   
    if($rootScope.currentUser.type=="customer"){
        
       var browsingShCartProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/findLineItems/1');
         
    }
    
    else if($rootScope.currentUser.type=="business"){
    var browsingShCartProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/findLineItems/2');
    }
 
    return browsingShCartProductsResource;
    
}
    
)

.factory('addToShopFactory', function($resource,$rootScope){
   
    var res=$resource('http://localhost:18080/sprint.youbay.ejb-web/rest/sales/addLineItem');
    
    return res;
    
}
    
)


.factory('OrderFactory', function($resource){
       
        //Resources
       var OrderResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/OrderProduct');
          return OrderResource;
}
    
)


.factory('nbProductsFactory', function($resource){
       
        //Resources
       var  nbProductsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/sales/NbrLineItems/1');
          return nbProductsResource;
}
    
)
//************************************************************//

/******************Hazem Factory******************************/
.factory('suggestCategoryFactory', function($resource){
       
        //Resources
       var managingCategoriesResource=$resource('http://localhost:18080/sprint.youbay-web/rest/categories/suggestCat');
          return managingCategoriesResource;
})

/*****************************************************************/


/*****************Fares Factories******************************/

  //// deals /////



.factory('DealsListFactory', function($resource){
       
        //Resource
        var browsingDealsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/deals');
       
        return browsingDealsResource;
})



.factory('addDealsFactory', function($resource){
       
        //Resources
       var managingDealsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/deals');
          return managingDealsResource;
})


////// Comments ///////////


.factory('CommentsListFactory', function($resource){
       
        //Resource
        var browsingCommentsResource=$resource('http://localhost:18080/sprint.youbay-web/rest/comments');
       
        return browsingCommentsResource;
})


/****************************************************************/

/***********************7amma Factories*******************************/

.factory('addCustomer', function($resource){
       
        //Resources
      return  $resource('http://localhost:18080/sprint.youbay-web/rest/account/addCustomer');
          
}
    
)
.factory('addBusiness', function($resource){
       
        //Resources
      return  $resource('http://localhost:18080/sprint.youbay-web/rest/account/addBusiness');
          
}
    
)

.factory('getAccountFactory', function($resource){
       
        //Resources
      return  $resource('http://localhost:18080/sprint.youbay-web/rest/account/getAccount/:idAccount');
          
}
    
)

/**********************************************************************/

;
