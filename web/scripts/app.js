/**
 * Created by chimon2000 on 3/14/15.
 */
(function(global){
    var wsuri;
    var session = {};
    var app = {};

    if(document.location.origin == 'file://'){
        wsuri = 'ws://127.0.0.1:8080/ws';
    } else{
        wsuri = (document.location.protocol === 'http:' ? 'ws:' : 'wss:') + '//' +
            document.location.host + '/ws';
    }

    app.initialize = function(){
        var promise = new Promise(function(resolve, reject){
            var connection = new autobahn.Connection({
                url: wsuri,
                realm: 'bugs'
            });

            connection.onopen = function(newSession, details){
                console.log('Connected');

                session = newSession;
                resolve(session);
            };

            connection.onclose = function(reason, details){
                console.log('Connection lost: ' + reason);

                reject(reason);
            };

            connection.open();

        });

        return promise;
    };

    app.getBugs = function(){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs').then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    app.getBugById = function(id){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs.get', [id]).then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    app.createBug = function(bug){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs.post', [bug]).then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    app.updateBug = function(bug){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs.put', [bug]).then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    app.deleteBug = function(id){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs.delete', [id]).then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    app.bugToWorking = function(bug){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs.working', [bug]).then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    app.bugToOpen = function(bug){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs.open', [bug]).then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    app.bugToDone = function(bug){
        var promise = new Promise(function(resolve, reject) {
            session.call('com.demo.bugs.done', [bug]).then(function(res){
                resolve(res);
            }, session.log)
        });

        return promise;
    };

    global.app = global.app || app;
})(this);