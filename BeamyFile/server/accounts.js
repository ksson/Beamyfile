Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services': 1}});
});

Meteor.publish("frontPageFiles", function () {
  return img.find({IsPrivate: false},{fields: {'UploaduserID':0}} ,{sort: {Name: 1}});
});

Meteor.publish("profilePageFiles", function (userName) {
  return img.find({UploaduserID: userName}, {fields: {'UploaduserID':0}} ,{sort: {Name: 1}});
});


Meteor.publish("testar", function () {
  return img.find({IsPrivate: false},{fields: {'UploaduserID':0}} ,{sort: {Upvotes: 1}});
});

Meteor.publish("testar2", function () {
  return img.find({IsPrivate: false},{fields: {'UploaduserID':0}} ,{sort: {Upvotes: -1}});
});