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
        status:'Unread',
        index:0
      },
      methods:{
        mailOnClick:function(){

        },
        onSwipeLeft:function(event,item,index){
          item.status = 'read';
          this.email = item;
          this.index = index;
          this.show = false;
          $(".mail-item").removeClass("hidden");

        },
        onBack:function(){
          this.show = true;
          $(".mail-item").addClass("hidden");

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
            }
          }.bind(this))
        }
      }
    })
  }
})
