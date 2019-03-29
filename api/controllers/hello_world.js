'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello,
  hellop: hello,
  addProduct: addProduct,
  getproductsbycategoryid: getproductsbycategoryid,
  getproductsbysubcategoryid: getproductsbysubcategoryid,
  getproductsbybrandid: getproductsbybrandid,
  getproductsbysku: getproductsbysku,
  getproductsbymultiid: getproductsbymultiid,
  getproductsbycolorid: getproductsbycolorid
};
var h = "hey";

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
var arr = [{ name: 'note7', SKU: 'sdafg', brand: [{ id: 1, name: 'mi' }], price: 132234, color: [{ id: 1, name: 'black' }], category: [{ id: 1, name: 'electronics' }], subcategory: [{ id: 1, name: 'mobile' }], tags: [{ id: 1, name: '4gb' }], photoUrls: [] }];//this is the variable to store all the product objects
var category = [[], ['sdafg'], [], [], []];
var subcategory = [[], ['sdafg'], [], [], []];
var tags = [[], ['sdafg'], [], [], []];
var brand = [[], ['sdafg'], [], [], []];
var color = [[], ['sdafg'], [], [], []];
//these all 2d matrixes are for the id--will be the index of outer array
//and inside will be the skus of the products
//so get by tag or category or by sub category is possible
//if we have to get by two things like brand and category and some more things
//then it will get the skus of all and will find the one that is matching
//so getproductsbycategoryid
//so getproductsbysubcategoryid
//so getproductsbytagid
//so getproductsbybrandid
//so getproductsbycolorid
//if i have to get it by many attributes then i can 
//get by all the params with id and will find all the skus find the commnon
//of them and output the arrays of objects
//a map for sku and index in arr
var m1 = new Map();
m1.set('sdafg',0);
function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.base.value || 'stranger';
  var hello = util.format('Hello, %s!' + h, name);

  // this sends back a JSON response which is a single string
  res.json(hello);
}
function hellop(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.base.value || 'stranger';
  var hello = util.format('Hello, %s!' + h, name);

  // this sends back a JSON response which is a single string
  res.json(hello);
}
function addProduct(req, res) {
  var inp = req.body;

  m1.set(inp.SKU, arr.length - 1);
  for (var i = 0; i < inp.category.length; i++) {
    category[inp.category[i].id].push(inp.SKU);
  }
  for (var i = 0; i < inp.subcategory.length; i++) {
    subcategory[inp.subcategory[i].id].push(inp.SKU);
  }
  for (var i = 0; i < inp.tags.length; i++) {
    tags[inp.tags[i].id].push(inp.SKU);
  }
  for (var i = 0; i < inp.brand.length; i++) {
    brand[inp.brand[i].id].push(inp.SKU);
  }
  for (var i = 0; i < inp.color.length; i++) {
    color[inp.color[i].id].push(inp.SKU);
  }

  console.log(req.body);
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  arr.push(req.body);
  var message = "object with sku " + req.body.SKU + " is added";
  res.json(message);
  console.log("array of objects till now");
  console.log(arr);
  console.log("category array");
  console.log(category);
  console.log("subcategory array");
  console.log(subcategory);
  console.log("tags array");
  console.log(tags);
  console.log("color array");
  console.log(color);
  // var name = req.swagger.params.base.value || 'stranger';
  // var hello = util.format('Hello, %s!'+h, name);

  // // this sends back a JSON response which is a single string
  // res.json(hello);
}
function getproductsbycategoryid(req, res) {
  var inp = req.swagger.params;
  var categoryid = inp.category.value;
  console.log("this is catid");
  console.log(categoryid);
  var out = [];
  for (var i = 0; i < category[categoryid].length; i++) {
    out.push(arr[m1.get(category[categoryid][i])]);
  }
  res.send(out);
}
function getproductsbybrandid(req, res) {
  var inp = req.swagger.params;
  var brandid = inp.brand.value;
  console.log("this is brandid");
  console.log(brandid);
  var out = [];
  for (var i = 0; i < brand[brandid].length; i++) {
    out.push(arr[m1.get(brand[brandid][i])]);
  }
  res.send(out);
}
function getproductsbysubcategoryid(req, res) {
  var inp = req.swagger.params;
  var subcategoryid = inp.subcategory.value;
  console.log("this is catid");
  console.log(subcategoryid);
  var out = [];
  for (var i = 0; i < subcategory[subcategoryid].length; i++) {
    out.push(arr[m1.get(subcategory[subcategoryid][i])]);
  }
  res.send(out);
}
function getproductsbytagsid(req, res) {
  var inp = req.swagger.params;
  var tagsid = inp.tags.value;
  console.log("this is tagsid");
  console.log(tagsid);
  var out = [];
  for (var i = 0; i < tags[tagsid].length; i++) {
    out.push(arr[m1.get(tags[tagsid][i])]);
  }
  res.send(out);
}

function getproductsbycolorid(req, res) {
  var inp = req.swagger.params;
  var colorid = inp.color.value;
  console.log("this is catid");
  console.log(colorid);
  var out = [];
  for (var i = 0; i < color[colorid].length; i++) {
    out.push(arr[m1.get(color[colorid][i])]);
  }
  res.send(out);
}
function getproductsbymultiid(req, res) {
  var inp = req.swagger.params;
  if(typeof inp.colorid!='undefined'){
    var colorid = inp.colorid.value;
  }
  if(typeof inp.tagsid!='undefined'){
    var tagsid = inp.tagsid.value;
  }
  if(typeof inp.subcategoryid!='undefined'){
    var subcategoryid = inp.subcategoryid.value;
  }
  if(typeof inp.categoryid!='undefined'){
    var categoryid = inp.categoryid.value;
  }
  // var tagsid = inp.tagsid.value;
  // var subcategoryid = inp.subcategoryid.value;
  // var brandid = inp.brandid.value;
  // var categoryid = inp.categoryid.value;
  
  
  var out = [];
  if(colorid!=undefined){
    if(out.length==0){
      for (var i = 0; i < color[colorid].length; i++) {
        out.push(arr[m1.get(color[colorid][i])]);
      }
    }
    else{
      var array2=[];
      for (var i = 0; i < color[colorid].length; i++) {
        array2.push(arr[m1.get(color[colorid][i])]);
      }
      out.filter(value => array2.includes(value))
    }
  }
  if(categoryid!=undefined){
    if(out.length==0){
      for (var i = 0; i < category[categoryid].length; i++) {
        out.push(arr[m1.get(category[categoryid][i])]);
      }
    }
    else{
      var array2=[];
      for (var i = 0; i < category[categoryid].length; i++) {
        array2.push(arr[m1.get(category[categoryid][i])]);
      }
      out.filter(value => array2.includes(value))
    }
  }
  
  res.send(out);
}
function getproductsbysku(req, res) {
  var inp = req.swagger.params;
  var sku = inp.sku.value;
  console.log("this is sku");
  console.log(sku);
  var out = [];
  out.push(arr[m1.get(sku)]);
  res.send(out);
}

//this is the file to write all the functions and export them as operation id
//the db schema for all the proucts
//parent category ..electronics food book wear grocery
//sub category .. mobile.. 
//so what  i am doing is the admin should know the category id and name for each of the 
//categories and similarly for sub cats and tags
//for each of these i will store the

