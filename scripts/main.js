$(function(){
  $.getJSON("mock/data.json",function(response){
    RenderDom(response.data);
  })
  Vue.use(VueTouch);
  function RenderDom(allItem){
    var app = new Vue({
      el:'#mail-App',
      data:{
        AllItem:allItem,
        email:{},
        show:true,
        index:0,
        unreadNum:0,
        message:''
      },
      ready: function () {
          this.AllItem.forEach(function(element){
            Vue.set(element,'status','Unread');
            Vue.set(element,'readStatus',true);
            if(element.status == 'Unread'){
              this.unreadNum ++;
            }
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
          $(".mail-item").removeClass("hidden");

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
          $(".mail-item").addClass("hidden");
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
        }
      }
    })
  }
})
