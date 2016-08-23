$(function(){
  $.getJSON("mock/data.json",function(response){
    var allItem = response.data;
    $.getJSON("mock/userInfo.json",function (response) {
      var userinfo = response.data;
      $.getJSON("mock/friends.json",function(response){
        var friends = (response.data);
        RenderDom(allItem,userinfo,friends);
      })
    })
  });
  Vue.use(VueTouch);
  function RenderDom(allItem,userinfo,friends){
    var app = new Vue({
      el:'#mail-App',
      data:{
        AllItem:allItem,
        userInfo:userinfo,
        AllFirends:friends,
        searchFriends:[],
        email:{},
        oncemail:{},
        show:true,
        SendMailPep:'',
        index:0,
        unreadNum:0,
        message:'',
        dropdown:false,
        Read:'全部已读',
        searchText:'',
        feedItemShow:false,
        mailItemShow:true,
        mailItemHide:true,
        friendlistshow:true,
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
          this.friendNum = this.userInfo.length;
        }.bind(this));
        },
      methods:{
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
          this.feedItemShow = true;
          this.mailItemHide = true;
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
          this.dropdown = false;
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
          this.AllItem.forEach(function(element){
            if(element.username == item.username){
              this.email = element;
            }
          }.bind(this));
          
        },
        sendMailShow:function () {
          this.show = false;
          this.feedItemShow = false;
          this.mailItemHide = false;
          this.dropdown = false;
        },
        renderFriend:function(){
          this.feedItemShow = false;
        },
        addFriend:function(item){
          this.mailItemShow = true;
          this.mailItemHide = false;
          this.feedItemShow = true;
          this.dropdown = false;
          this.show = false;
        },
        feedBtnShow:function(item){
          var _status = item.feedBtnPull || false;
          this.AllFirends.forEach(function(element){
            Vue.set(element,'feedBtnPull',false);
            // element.feedBtnPull = false;
          })
          item.feedBtnPull = !_status;
        },
        feedBtnClick:function(item){
          var _User =item.username;
          _User = _User.replace(/<\/?span[^>]*>/ig,"");
          var _Url = item.url;
          var _Introduction =item.introduction;
          this.userInfo.push({
            "username":_User,
            "imgurl":_Url,
            "introduction":_Introduction
          });
          alert("添加成功");
          this.AllFirends.forEach(function(element,index){
            if(element.url == _Url){
              this.AllFirends.splice(index,1);
            }
          }.bind(this));
          this.userInfo.forEach(function(){
            this.friendNum = this.userInfo.length;
          }.bind(this));
        },
        SearchInput:function() {
          this.searchFriends = [];
          this.friendlistshow = false;
          var _Text = this.searchText;
          if(_Text == ''){
            this.friendlistshow = true;
          }
          else {
            this.searchFriends.forEach(function (feed) {
              if (feed.username.indexOf(_Text) !== -1) {
                this.searchFriends.push(feed);
                this.searchFriends.forEach(function(element){
                  var _User = element.username;
                  var _Reg = new RegExp(_Text, 'g');
                  element.username = _User.replace(_Reg, '<span class="blue">' + _Text + '</span>')
                })
              }
            }.bind(this));
          }
        }
      }

    })
  }
})
