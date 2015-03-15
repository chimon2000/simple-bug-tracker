/**
 * Created by chimon2000 on 3/14/15.
 */

var autobahn = require('autobahn');
var fs = require('fs');
var _ = require('lodash');
var routes = require('./routes');

var wsuri = "ws://127.0.0.1:8080/ws";
var session;

var bugs = JSON.parse(fs.readFileSync('./bugs.json', 'utf8'));

bugs.forEach(function(single){
    single.id = _.uniqueId('bug_');
});

var connection = new autobahn.Connection({
    url: wsuri,
    realm: 'bugs'
});

connection.onopen = function(session, details){
    main(session);
};

function main(newSession){
    //session = newSession;
    routes.initialize(newSession);
    //session.register('com.demo.bugs', getBugs);
    //session.register('com.demo.bugs.get', getBugById);
    //session.register('com.demo.bugs.put', updateBug);
    //session.register('com.demo.bugs.post', createBug);
    //session.register('com.demo.bugs.delete', deleteBug);
    //session.register('com.demo.bugs.open', bugToOpen);
    //session.register('com.demo.bugs.working', bugToWorking);
    //session.register('com.demo.bugs.done', bugToDone);
}

var updateStatus = function(bug, status){
    bug.status = status;
    return bug;
};

var getBugs = function(){
    return bugs;
};

var getBugById = function(args, kwargs, details){
    var bug = _.find(bugs, 'id', args[0].id)
};

var updateBug = function(args, kwargs, details){
    var bug = _.find(bugs, 'id', args[0].id)

    if(bug) bug = args[0];

    return bug;
};

var createBug = function(args, kwargs, details){

    var newBug = {
        id: _.uniqueId('bug_'),
        description: args[0],
        status: 'open'
    };

    bugs.push(newBug);

    session.publish('com.demo.bugs.oncreate');

    return newBug;

};
var deleteBug = function(args, kwargs, details){

    var id = args[0];
    for(var i = 0; i < items.length; i++){
        if(bugs[i].id === id){
            bus.splice(i, 1);
            session.publish('com.demo.bugs.ondelete', [id]);
            break;
        }
    }

    return true;
};

var bugToOpen = function(args, kwargs, details){
    var bug = _.find(bugs, 'id', args[0].id)

    updateStatus(bug, 'open');

    session.publish('com.demo.bugs.onupdate', [bug]);

    console.log('Returning: ' + bug);

    return bug;
};

var bugToWorking = function(args, kwargs, details){
    var bug = _.find(bugs, 'id', args[0].id)

    updateStatus(bug, 'working');

    session.publish('com.demo.bugs.onupdate', [bug]);

    console.log('Returning: ' + bug);

    return bug;
};

var bugToDone = function(args, kwargs, details){
    var bug = _.find(bugs, 'id', args[0].id)

    updateStatus(bug, 'done');

    session.publish('com.demo.bugs.onupdate', [bug]);

    console.log('Returning: ' + bug);

    return bug;
};

connection.open();

