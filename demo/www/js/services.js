angular.module('starter.services', ['ngResource'])


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

.factory('updateProductFactory', function($resource){
       
        //Resource   
    
    return $resource('http://localhost:18080/sprint.youbay-web/rest/managingProducts/:id', { id: 'id_Product' }, {
    updateProduct: {
      method: 'PUT' // this method issues a PUT request
    }
})

    })



.service('BlankService', [function(){

}]);