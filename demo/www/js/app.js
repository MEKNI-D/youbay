// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput','ngOpenFB','ngCordova','chart.js'])

.run(function($ionicPlatform,ngFB) {
    ngFB.init({appId: '474686936037797'});
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.products', {
        url: '/products',
        views: {
            'menuContent': {
                templateUrl: 'templates/products.html',
                controller: 'ProductsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    
    .state('app.facebookProfile', {
    url: "/facebookProfile",
    views: {
        'menuContent': {
            templateUrl: "templates/facebookProfile.html",
            controller: "facebookProfileCtrl"
        }
    }
})
    
    
    
    .state('app.productDetails', {
        url: '/productDetails/:id/view',
        views: {
            'menuContent': {
                templateUrl: 'templates/productDetails.html',
                controller: 'productDetailsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-productDetails" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-productDetails').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    
    .state('app.myProducts', {
        url: '/myProducts',
        views: {
            'menuContent': {
                templateUrl: 'templates/myProducts.html',
                controller: 'myProductsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-myProducts" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-myProducts').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    
    .state('app.updateProduct', {
        url: '/updateProduct/:id/:name/:desc/:tag/:price/:qte',
        views: {
            'menuContent': {
                templateUrl: 'templates/updateProduct.html',
                controller: 'updateProductCtrl'
            },
            'fabContent': {
                template: '<button id="fab-updateProduct" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-updateProduct').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    
    
    .state('app.addProduct', {
        url: '/addProduct',
        views: {
            'menuContent': {
                templateUrl: 'templates/addProduct.html',
                controller: 'addProductCtrl'
            },
            'fabContent': {
                template: '<button id="fab-addProduct" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-addProduct').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
/**********************HAZEM**************************/
    
        .state('app.suggestion', {
        url: '/suggestion',
        views: {
            'menuContent': {
                templateUrl: 'templates/suggestion.html',
                controller: 'SuggestionCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    
    .state('app.sales', {
        url: '/sales',
        views: {
            'menuContent': {
                templateUrl: 'templates/sales.html',
                controller: 'SalesCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
/****************************************************/
    
    
    
 //****************Rim****************************   
.state('app.ShoppingCart', {
        url: '/ShoppingCart/:idShCart',
        views: {
            'menuContent': {
                templateUrl: 'templates/ShoppingCart.html',
                controller: 'myShoppingCartCtrl'
            }
           
        }
    })
    
    .state('app.productsOrder', {
      url: '/productsOrder/:id',
        
         views: {
            'menuContent': {
                templateUrl: 'templates/productsOrder.html',
                controller: 'productsOrderCtrl'
            }
           
        }
      
    })
    
    
    .state('app.validateOrder', {
      url: '/addOrder',
        
         views: {
            'menuContent': {
                templateUrl: 'templates/validateOrder.html',
                controller: 'OrderCtrl'
            }
           
        }
      
    })
    
    .state('app.OrderQuantity', {
      url: '/OrderQuantity/:id/:qte',
        
         views: {
            'menuContent': {
                templateUrl: 'templates/ShoppingCart.html',
                controller: 'productsQuantityCtrl'
            }
           
        }
      
    })
    
     .state('app.addToShop', {
      url: '/addToShop',
        
         views: {
            'menuContent': {
                templateUrl: 'templates/productDetails.html',
                controller: 'addToShopCartCtrl'
            }
           
        }
      
    })
        
        
     
    
     .state('app.total', {
      url: '/total/:nb',
        
         views: {
            'menuContent': {
                templateUrl: 'templates/total.html',
                controller: 'mCtrl'
            }
           
        }
      
    })
    
    
    
/*********************************************************/
    
/***********************Fares*******************************/
    
     ///////////// Deals ////////////

    .state('app.deals', {
        url: '/deals',
        views: {
            'menuContent': {
                templateUrl: 'templates/deals.html',
                controller: 'DealsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-deals" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-deals').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })
    
    
    
    .state('app.AddDeals', {
        url: '/AddDeals',
        views: {
            'menuContent': {
                templateUrl: 'templates/AddDeals.html',
                controller: 'AddDealsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    
    
    /***************************************/
    
    
    
    /////////////// Comments ////////////////
    
        .state('app.Comments', {
        url: '/Comments',
        views: {
            'menuContent': {
                templateUrl: 'templates/Comments.html',
                controller: 'CommentsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })
    
    //////////////////////////////////////
    /********************************************************************/
    
    
    
    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.signupCustomer', {
        url: '/signupCustomer',
        views: {
            'menuContent': {
                templateUrl: 'templates/signupCustomer.html',
                controller: 'signupCustomerCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.signupBusiness', {
        url: '/signupBusiness',
        views: {
            'menuContent': {
                templateUrl: 'templates/signupBusiness.html',
                controller: 'signupBusinessCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    
    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
