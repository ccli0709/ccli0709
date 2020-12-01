angular.module('starter.services', [])

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{ "id": 1, "facebookId": "ccli0709", "facebookName": "https:\/\/www.facebook.com\/ccli0709", "email": "ccli0709@gmail.com", "name": "\u674e\u653f\u5fe0", "phone": "0932-270709", "cellphone": "07-7918728", "address": "812\u9ad8\u96c4\u5e02\u5c0f\u6e2f\u5340\u5b54\u7965\u885728-2\u865f", "familyMartId": "", "familyMartName": "", "sevenElevenId": "", "sevenElevenName": "", "created_at": null, "updated_at": null }, { "id": 2, "facebookId": "shan5433", "facebookName": "https:\/\/www.facebook.com\/shan5433", "email": "shan5433shan5433@gmail.com", "name": "\u80e1\u6e58\u83ef", "phone": "0925-612061", "cellphone": "07-7918728", "address": "812\u9ad8\u96c4\u5e02\u5c0f\u6e2f\u5340\u5b54\u7965\u885728-2\u865f", "familyMartId": "", "familyMartName": "", "sevenElevenId": "", "sevenElevenName": "", "created_at": null, "updated_at": null }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});
