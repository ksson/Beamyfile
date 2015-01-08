if (Meteor.isClient){
  Meteor.startup(function() {
    Session.set("sort_order", {Upvotes: -1});
  });
  
  
Template.upload_v3.helpers({
  
  filesToUpload: function() {
    return Uploader.info.get();
  },
  filesUploaded: function() {
    return Session.get('UploadedFiles');
  }
})

Template.uploadedInfo.helpers({
  src: function() {
    if (this.type.indexOf('image') >= 0) {
      return this.url;
    } else return 'file_icon.png';
  }
})

Template.upload_v2.rendered = function () {
  Uploader.render.call(this);
};

Template.Profile.helpers({
    images: function(){
      var userId = Meteor.users.findOne().services.google.id
      return img.find({UploaduserGoogID: userId});
    },
  
  subscribePictures: function(){
    var userId = Meteor.users.findOne().services.google.id
    Meteor.subscribe('profilePageFiles',Meteor.user()._id );
  }
  
});
 
  //voteButtonUp
    Template.images_public.events({
    
      
    'click #voteUp': function(){
    var uploadUser = Meteor.users.findOne().services.google.id;
      Meteor.call('voteButtonUp', this._id, Meteor.user()._id,uploadUser, function(err,response) {
			if(err) {
				//Session.set('serverDataResponse2', "Error:" + err.reason);
				return;
			}
			//Session.set('serverDataResponse2', response);
        console.log(response);
		});
    
    
},
      
      'click #byUpvotes': function(){
        //console.log("Anropar ny ordning!")
      //Meteor.subscribe('testar');
        Session.set("sort_order", {Upvotes: -1});
        Session.set("current_sort_ord", 'upvotes');
        //return img.find({}, {sort: {Upvotes: 1}});
    
    
},
       'click #byDownvotes': function(){
    //Meteor.subscribe('testar2');
        // return img.find({}, {sort: {Downvotes: 1}});
    Session.set("sort_order", {Downvotes: -1});
         
        Session.set("current_sort_ord", 'downvotes');
    
},
      'click #byDateNew': function(){
    //Meteor.subscribe('testar2');
        // return img.find({}, {sort: {Downvotes: 1}});
    Session.set("sort_order", {UploadDate	: -1});
        
        Session.set("current_sort_ord", 'datenew');
    
},
      'click #byDateOld': function(){
    //Meteor.subscribe('testar2');
        // return img.find({}, {sort: {Downvotes: 1}});
    Session.set("sort_order", {UploadDate	: 1});
        
        Session.set("current_sort_ord", 'dateold');
    
},
      
      
      
      
      
       'click #voteDown': function(){
    var uploadUser = Meteor.users.findOne().services.google.id;
      Meteor.call('voteButtonDown', this._id, Meteor.user()._id,uploadUser, function(err,response) {
			if(err) {
				//Session.set('serverDataResponse2', "Error:" + err.reason);
				return;
			}
			//Session.set('serverDataResponse2', response);
        console.log(response);
		});
    
    
}
});
  
  
  Template.Profile.events({
    
    
    
    
    'click #deletepic': function(){
    if (confirm("Are you sure?") === true) {
      Meteor.call('removeImage', this._id, Meteor.user()._id, function(err,response) {
			if(err) {
				Session.set('serverDataResponse2', "Error:" + err.reason);
				return;
			}
			Session.set('serverDataResponse2', response);
        console.log(response);
		});
    } else {
      return;
    }
    
}
});
  
  Template.images_public.helpers({
    pubImages: function(){
      test = img.find({IsPrivate: false}, {sort: Session.get("sort_order")});
      return test
      
    },
    
   
    
    whichButtons: function(){
      var uploadUser = Meteor.users.findOne().services.google.id;
      var voteStatus = img.findOne({_id:this._id}).HasVoted;
      
      var randomNess = voteStatus.indexOf(uploadUser) > -1;
      
      if(randomNess){
        console.log("has voted");
        return true
        
      } else {
        console.log("has not voted");
        return false
      }
      
      
    },
    
    
  
  homePagePictures: function(){
    Meteor.subscribe('frontPageFiles');
  }
  
});
  


  
}