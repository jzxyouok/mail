$(function(){
  $.getJSON("mock/data.json",function(response){
    RenderDom(response.data);
  })

  function RenderDom(allItem){
    var app = new Vue({
      el:'#mail-App',
      data:{
        AllItem:allItem
      },
      methods:{
        readEmail:function(){
          
        }
      }
    })
  }
})
