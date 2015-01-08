Router.configure({
   layoutTemplate: 'layoutStart',//can be any template name
   notFoundTemplate: 'Home'
 });

Router.map(function () {
  this.route('home', {
    path: '/',
    waitOn: function() {
      return [Meteor.subscribe('frontPageFiles')];
    }
  }); 
  this.route('profile',{
    waitOn: function() {
      return [Meteor.subscribe('profilePageFiles')];
    }
  });

  //if (Meteor.user()._Id !== null){
  this.route('imageUpload');
  //}
  });


Router.onBeforeAction('loading');