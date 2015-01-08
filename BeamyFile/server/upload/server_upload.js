Meteor.startup(function () {
  
  Meteor.methods({
   
    
	  insertfile: function (file,userId, ulUser) {
      //var isUser = Meteor.users.find({_id: userId});
      var isUser = Meteor.users.findOne(userId)._id;
      //console.log("### THIS IS isUser var### "+isUser);
      //console.log("### THIS IS userId arg### "+userId);
      
      // is userId provided && (user exist in database and matches provided name) && googleuserid not null && (random checks to confirm a file was actually sent here and does not have null fields)
        if(userId && (isUser == userId)&& ulUser !== null && (file.name !== null && file.url !== null)){
        console.log('on server, file inserted');
      var x = "Success";
      
		img.insert({
      Name: file.name,
      IsPrivate: true,
      Uploader: Meteor.user().services.google.given_name+" "+Meteor.user().services.google.family_name,
      Src: file.url,
      Type: file.type,
      UploaduserID: Meteor.user()._id,
      UploaduserGoogID: ulUser,
      HasVoted: [],
      Upvotes: 0,
      Downvotes: 0,
      UploadDate: Date()
      
    });
      return x;
      } else {
        console.log('on server, file failed to insert, does the user really exist ?');
        return "User does not exist";
      }
		
	  },
    
    removeImage: function (fileId, userId) {
      var isFileUploader = img.findOne({_id:fileId}).UploaduserID;
      var isUser = Meteor.users.findOne(userId)._id;
      //console.log("### THIS IS isUser var### "+isUser);
      //console.log("### THIS IS userId arg### "+userId);
     // console.log("### THIS IS fileId### "+fileId)
      //console.log('### THIS IS isFile uploader### '+isFileUploader)
      var x = "Image"+fileId+"removed";
      
        //check if userId provided && (userId provided is in database) && (if file we are removing is owned by provided userid)
        if(userId && (isUser == userId) && (isFileUploader == isUser)){
          console.log('on server, file removing file');
          img.remove(fileId);
          return x;

          //fail the attempt
        } else {
            console.log('on server, failed to remove');
            return "User does not exist or not owner";
          }

    },

    
    
    changeState: function (fileId, userId) {

      var isFileUploader = img.findOne({_id:fileId}).UploaduserID;
      var isUser = Meteor.users.findOne(userId)._id; 

     //check if userId provided && (userId provided is in database and equals to provided name) && (if file we are removing is owned by provided userid)
      if(userId && (isUser == userId) && (isFileUploader == isUser)){
        console.log('Changed state public: true/false');
        var x = "Image "+fileId+"changed state true";
        img.update(fileId, {$set: {IsPrivate: true} });
        return x;

      }else {

      }
    },
    
    changeState2: function (fileId, userId) {
      var isFileUploader = img.findOne({_id:fileId}).UploaduserID;
      var isUser = Meteor.users.findOne(userId)._id;

       //check if userId provided && (userId provided is in database) && (if file we are removing is owned by provided userid)
      if(userId && (isUser == userId) && (isFileUploader == isUser)){
        console.log('Changed state public: true/false');
        var x = "Image "+fileId+"changed state false";
        img.update(fileId, {$set: {IsPrivate: false} });
        return x;
      }else{

      }
    },
    
     voteButtonUp: function (fileId, userId,googUsr) {
      var isUser = Meteor.users.findOne(userId);
      var voteStatus = img.findOne({_id:fileId}).HasVoted
      var testgoogusr = Meteor.users.findOne(userId).services.google.id;
       
       var randomNess = voteStatus.indexOf(googUsr) > -1;
       //console.log(testgoogusr)
       console.log(randomNess)
       //check if userId provided && (userId provided is in database)
      if(userId && (isUser._id == userId) && googUsr !== null && testgoogusr==googUsr && !randomNess){
        console.log('you upvoted picture '+ fileId);
        var x = "Image "+fileId+"changed state false";
        img.update({ _id: fileId },{ $addToSet: { HasVoted: googUsr }, $inc: { Upvotes: 1 } });
        return x;
      }else{
        console.log("votepicture wonkyness occured");
      }
    },
    
    voteButtonDown: function (fileId, userId,googUsr) {
      var isUser = Meteor.users.findOne(userId);
      var voteStatus = img.findOne({_id:fileId}).HasVoted
      var testgoogusr = Meteor.users.findOne(userId).services.google.id;
      
      var randomNess = voteStatus.indexOf(googUsr) > -1;
       //check if userId provided && (userId provided is in database)
      if(userId && (isUser._id == userId) && googUsr !== null && testgoogusr==googUsr && !randomNess){
        console.log('you downvoted picture '+ fileId);
        var x = "Image "+fileId+"changed state false";
        img.update({ _id: fileId },{ $addToSet: { HasVoted: googUsr }, $inc: { Downvotes: 1 } });
        return x;
      }else{
        console.log("votepicture wonkyness occured");
      }
    },
    
    
    
 
	      
    
	});
    

UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    imageVersions: {thumbnailSmall: {width: 200, height: 200}},
  //imageVersions: {thumbnail: {width: 200, height: 200}},
    
    getDirectory: function(file, formData) {
      console.log('Directory: '+ formData.contentType)
      return formData.contentType;
    },
    
  /*
   getFileName: function(file, formData) {
      console.log('formData : '+ formData)
      return "saved-" + file;
    },
*/
  
    finished: function(file, folder, formData) {
      // perform some disk operation
      
    }
    
    })


});


if (Meteor.isServer){
  Router.map(function() {
    this.route('serverFile', {
        where: 'server',
      
        path: /^\/upload\/images\/(.*)$/,
        action: function() {
          var filePath = process.env.PWD + '/.uploads/images/' + this.params[0];

          if (fs.existsSync(filePath)) {
            var data = fs.readFileSync(filePath);
            this.response.writeHead(200, {
                  'Content-Type': 'image'
             });
             this.response.write(data);
             this.response.end();
            
           }else{
             this.response.writeHead(301, {'Location': '/'});
             this.response.end();
           }
        }
    });
  });
 }



var fs = Npm.require('fs');
WebApp.connectHandlers.use(function(req, res, next) {
    var re = /^\/uploads_url_prefix\/(.*)$/.exec(req.url);
    if (re !== null) {   // Only handle URLs that start with /uploads_url_prefix/*
        var filePath = process.env.PWD + '/.uploads/' + re[1];
        var data = fs.readFileSync(filePath);
        res.writeHead(200, {
                'Content-Type': 'image'
            });
        res.write(data);
        res.end();
    } else {  // Other urls will have default behaviors
        next();
    }
});
