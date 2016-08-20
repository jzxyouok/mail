$(function(){
  $.getJSON("mock/data.json",function(response){
    var allItem = response.data
    $.getJSON("mock/userInfo.json",function (response) {
      var userinfo = response.data;
      RenderDom(allItem,userinfo);
    })
  })
  Vue.use(VueTouch);
  function RenderDom(allItem,userinfo){
    var app = new Vue({
      el:'#mail-App',
      data:{
        AllItem:allItem,
        userInfo:userinfo,
        email:{},
        show:true,
        index:0,
        unreadNum:0,
        message:'',
        dropdown:false,
        Read:'全部已读',
      },
      ready: function () {
          this.AllItem.forEach(function(element){
            Vue.set(element,'status','Unread');
            Vue.set(element,'readStatus',true);
            if(element.status == 'Unread'){
              this.unreadNum ++;
            }
          }.bind(this));
        this.userInfo.forEach(function(element){
          Vue.set(element,'isPull',false);
        });
        },
      methods:{
        mailOnClick:function(){

        },
        onSwipeLeft:function(event,item,index){
          item.status = 'read';
          item.readStatus = false;
          this.email = item;
          this.index = index;
          this.show = false;
          $("#mail-main-item").removeClass("hidden");

        },
        sendMail:function(){
          var self = this;
          this.email.content.push({
            "time":this.getTime(),      //获取时间
            "mailcontent":this.message,
            "reply":"sb"
          });
          this.message = '';
          setTimeout(function() {
            self.$el.querySelector('.mail-content').scrollTop = self.$el.querySelector('.mail-content').scrollHeight;
          }, 50);
        },
        cancelSend:function(){
          this.message = '';
          this.onBack();
        },
        onBack:function(){
          var i = 0;
          this.show = true;
          $("#mail-main-item").addClass("hidden");
          this.AllItem.forEach(function(element){
            if(element.status == 'Unread'){
              i++;
            }
            this.unreadNum = i ;
          }.bind(this));
        },
        getUp:function(){
          var id = this.index-1;
          this.forEachData(id);
          this.index--;
        },
        getDown:function() {
          var id = this.index+1;
          this.forEachData(id);
          this.index++;
        },
        forEachData:function(id){
          this.AllItem.forEach(function(element,index){
            if(index == id){
              this.email = element;
              element.status = 'read';
              element.readStatus = false;
            }
          }.bind(this))
        },
        getTime:function(){
          var myDate = new Date();
          return((myDate.toLocaleString()).toString());
        },
        dropdownShow:function(){
          this.dropdown = !(this.dropdown);
        },
        allRead:function(){
         if(this.Read == "全部已读"){
           this.AllItem.forEach(function(element){
             element.readStatus = false;
           }.bind(this));
           this.Read = '全部未读';
         } else{
           this.AllItem.forEach(function(element){
             element.readStatus = true;
           }.bind(this));
           this.Read ='全部已读';
         }
        },
        feedNormalClick:function(event,item){
          var _status = item.isPull;
          this.userInfo.forEach(function(element){
            element.isPull = false;
          })
          item.isPull = !_status;
        },
        feedEdit:function(){
          
        }
      }
    })
  }
})
