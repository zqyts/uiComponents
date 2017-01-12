 //省市县数据格式
 var province_city_county_data = [{
   province: "四川",
   city: [{
     cityName: "成都",
     county: ["成都市", "崇州市", "金堂县"]
   }, {
     cityName: "南充",
     county: ["仪陇县", "南部县", "营山县"]
   }]
 }, {
   province: "北京",
   city: [{
     cityName: "北京市",
     county: ["东城区", "朝阳区"]
   }]
 }, {
   province: "安徽",
   city: [{
     cityName: "安庆",
     county: ["安庆市", "怀宁县", "潜山县"]
   }, {
     cityName: "蚌埠",
     county: ["蚌埠市", "固镇县", "怀远县"]
   }]
 }];

 function provinceCityCounty(options) {
   this.options = options;
 }

 provinceCityCounty.prototype = {
   province_index: 0, //初始化为0
   init_select: function() {    
     this.init_title();    
     this.init_province();    
     this.bind_province();
   },

   //初始化提示标题
   init_title: function() {    
     for (var k = 0; k < this.options.id.length; k++) {      
       var select_obj = document.getElementById(this.options.id[k]);      
       select_obj.options[0] = new Option(this.options.initText[k], this.options.initText[k]);    
     }  
   },

   //初始化省份
   init_province: function() {    
     var province_select_obj = document.getElementById(this.options.id[0]);    
     var province_len = province_city_county_data.length;    
     for (var i = 0; i < province_len; i++) {      
       province_select_obj.options[i + 1] = new Option(province_city_county_data[i].province, province_city_county_data[i].province);    
     }  
   },
   //给省份绑定onchange事件
   bind_province: function() {
     var that = this;    
     var province_select_obj = document.getElementById(this.options.id[0]);    
     province_select_obj.onchange = function() {      
       var opt_index = province_select_obj.selectedIndex;      
       if (opt_index != 0) {        
         that.province_index = opt_index - 1;  //每个省份的序号比 option 的下标要小1      
         that.init_city(that.province_index);        
         that.bind_city();        
         that.init_county(that.province_index, 0);      
       } else {        
         that.clear_city();        
         that.clear_county();      
       }    
     }  
   },
    
   //选择一个省份才能初始化地级市
   init_city: function(index) {    
     this.clear_city();    
     var city_len = province_city_county_data[index].city.length;    
     for (var i = 0; i < city_len; i++) {      
       document.getElementById(this.options.id[1]).options[i + 1] = new Option(province_city_county_data[index].city[i].cityName, province_city_county_data[index].city[i].cityName);    
     }    
     document.getElementById(this.options.id[1]).options[1].selected = true;  
   },
     
   //清除地级市信息 
   clear_city: function() {    
     var city_select_obj = document.getElementById(this.options.id[1]);    
     city_select_obj.options.length = 0; //每次选中一个新的省份 都重新删除地级市的信息
     this.init_title(); //重新初始化标题
   },
    
   //给地级市绑定onchange事件
   bind_city: function() {
     var that = this;  
     var city_select_obj = document.getElementById(this.options.id[1]);    
     city_select_obj.onchange = function() {      
       var opt_index = city_select_obj.selectedIndex;      
       if (opt_index != 0) {        
         that.init_county(that.province_index, opt_index - 1);      
       } else {        
         that.clear_county();      
       }    
     }  
   },

   //选择一个地级市后才能初始化县
   init_county: function(index, city_index) {   
     this.clear_county();    
     var county_len = province_city_county_data[index].city[city_index].county.length;    
     for (var i = 0; i < county_len; i++) {      
       document.getElementById(this.options.id[2]).options[i + 1] = new Option(province_city_county_data[index].city[city_index].county[i], province_city_county_data[index].city[city_index].county[i]);    
     }    
     document.getElementById(this.options.id[2]).options[1].selected = true;  
   },
     
   //清除县城信息
   clear_county: function() {    
     var county_select_obj = document.getElementById(this.options.id[2]);    
     county_select_obj.options.length = 0; //每次选中一个新的地级市 都重新删除县的信息
     this.init_title(); //重新初始化标题
   }
 }
 window.onload = function() {   //初始化下拉框
   var provinceCityCountyObj = new provinceCityCounty({
     id: ["provinceid", "cityid", "countyid"],
     initText: ["省份", "地级市", "市、县级市、县"]
   });
   provinceCityCountyObj.init_select();
 }