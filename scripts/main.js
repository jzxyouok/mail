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
        oncemail:{},
        show:true,
        SendMailPep:'',
        index:0,
        unreadNum:0,
        message:'',
        dropdown:false,
        Read:'全部已读',
        feedItemShow:false,
        mailSendShow:true,
        feedEditshow:false,
        mailItemShow:true,
        addFriendShow:true,
        feedBtnPull:false,
        friendNum:0
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
          this.friendNum ++
        }.bind(this));
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
          this.mailItemShow = false;

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
          this.mailItemShow = true
          this.AllItem.forEach(function(element){
            if(element.status == 'Unread'){
              i++;
            }
            this.unreadNum = i ;
          }.bind(this));
        },
        onHome:function(){

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
          this.userInfo.forEach(function(element) {
            element.isPull = false;
            item.isPull = !_status;
          })
          this.AllItem.forEach(function (element) {
            if(element.username == item.username){
               this.oncemail = element;
              if(element.content[element.content.length-1].reply =='sb'){
                this.SendMailPep = 'You';
              } else{
                this.SendMailPep = element.username;
              }
            };
          }.bind(this));
      },

        feedEdit:function(item){
          this.mailItemShow = false;
          this.mailSendShow = true;
          this.AllItem.forEach(function(element){
            if(element.username == item.username){
              this.email = element;
            }
          }.bind(this));
          
        },
        sendMailShow:function () {
          this.mailSendShow = false;
        },
        renderFriend:function(){
          this.feedItemShow = false;
          this.addFriendShow = true;
        },
        addFriend:function(){
          this.feedItemShow = true;
          this.addFriendShow = false;
        }
      }
    })
  }
})
