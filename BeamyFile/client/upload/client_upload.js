Meteor.startup(function() {  

  Uploader.finished = function(index, file) {
    if (!Session.get("UploadedFiles")) {
      Session.set("UploadedFiles", []);
    }

    var files = Session.get("UploadedFiles");
    
    
    //file.name = "asd.jpg"
    //file.url = ""
    
    files.push(file);
    console.log(file.Type);
    Session.set("UploadedFiles", files);

    
    /*
    var formData = 'ello';
    
    Meteor.call('getFileName', file, formData , function(err,response) {
			if(err) {
				Session.set('serverDataResponse', "Error:" + err.reason);
				return;
			}
			Session.set('serverDataResponse', response);
		});
    
    Template.imageUpload.result = function () {
	return Session.get('serverDataResponse') || "";
  };
   */
    
    var uploadUser = Meteor.users.findOne().services.google.id;
    Meteor.call('insertfile', file, Meteor.user()._id, uploadUser, function(err,response) {
			if(err) {
				Session.set('serverDataResponse', "Error:" + err.reason);
        console.log(response);
				return;
			}
			Session.set('serverDataResponse', response);
		});
    
    Template.imageUpload.result = function () {
	return Session.get('serverDataResponse') || "";
  };
    // for reactivity you can write to the collection
    /*img.insert({
      Name: file.name,
      IsPrivate: true,
      Uploader: Meteor.user().services.google.given_name+" "+Meteor.user().services.google.family_name,
      Src: file.url,
      Type: file.type,
      Uploaduser: Meteor.user()._id
      
    });*/
    
    
    
    console.log('Write to database: ' + file.name);

   // Uploads.insert({file: file.name});
  }
})


