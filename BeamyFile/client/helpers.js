/*Template.images_public.events({
  'click .fancybox': function(evt, tpl){
    link = $(evt.currentTarget);
    $(this).fancybox({
            'autoScale': true,
            'type':'iframe',
            'height': (typeof link.data('height') == 'undefined' ? link.data('height') : 340),
            'width': (typeof link.data('width') == 'undefined' ? link.data('width') : 560),
            'href': link.attr('href')
        }).click();
    return false;
  }
});


Meteor.startup(function() {
      $('.fancybox').fancybox({
            padding : 0,
            openEffect  : 'elastic'
       });
});*/

if (Meteor.isClient) {
  
  
  Template.navItems.helpers({
    activeIfTemplateIs: function (template) {
      //console.log("this is our templates: " + template)
     // console.log("userID;" + Meteor.userId() + " username; " + Meteor.user().profile.name)
      
      
      var currentRoute = Router.current();
      //console.log(currentRoute.lookupTemplate())
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? "active" : "";
    }
  });
  
Template.logoutForm.events({
  "submit #logout-form": function(event, template) {
    event.preventDefault();
    Meteor.logout(function(error) {
      if (error) {
        // Display the logout error to the user however you want
      }
    });
  }
});
  

 

  
  
  Template.Profile.events({
 'change #public_btn' : function (){
   
   Meteor.call('changeState2', this._id, Meteor.user()._id, function(err,response) {
			if(err) {
				Session.set('serverDataResponse3', "Error:" + err.reason);
				return;
			}
			Session.set('serverDataResponse3', response);
        console.log(response);
		});
   
  // something
 },

 'change #private_btn' : function (){
   
   Meteor.call('changeState', this._id, Meteor.user()._id, function(err,response) {
			if(err) {
				Session.set('serverDataResponse3', "Error:" + err.reason);
				return;
			}
			Session.set('serverDataResponse3', response);
        console.log(response);
		});
   
  
  // something
 }
  });

  
}