$(function(){
  $.getJSON("mock/data.json",function(response){
    RenderDom(response.data);
  })
  Vue.use(VueTouch);
  function RenderDom(allItem){
    var app = new Vue({
      el:'#mail-App',
      data:{
        AllItem:allItem
      },
      methods:{
        mailOnClick:function(){

        },
        onSwipeLeft:function(){

        }
      }
    })
  }
})
