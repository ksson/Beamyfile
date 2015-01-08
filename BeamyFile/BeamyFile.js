Router.configure({
   layoutTemplate: 'layoutStart'  //can be any template name
 });

Router.configure({
  waitOn: function(){
    //return img.find('isPrivate: false');
    return Meteor.subscribe('userData');
  }
});

img = new Meteor.Collection("img");
        
        if(Meteor.isServer){
          //Meteor.publish("img", function(){
          //return img.find();
          }

           Meteor.startup(function () {
            });
       // }else{
         //  Meteor.subscribe("img");
          
      //  }










        


      
        
