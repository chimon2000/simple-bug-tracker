/**
 * Created by chimon2000 on 3/14/15.
 */
(function(){
   var scope = document.querySelector('template');

    scope.addEventListener('template-bound', function(e){
        scope.bugs = [];
        scope.newBug = '';

        app.initialize().then(function(session){
            session.subscribe('com.demo.bugs.ondelete', function(args){
                if(args[0]){
                    console.log('Bug Deleted: ' + args[0]);

                    var bug = _.find(scope.bugs, 'id', args[0].id);
                }
            });
            session.subscribe('com.demo.bugs.onupdate', function(args){
                if(args[0]){
                    console.log('Bug Deleted: ' + args[0]);

                    var bug = _.find(scope.bugs, 'id', args[0].id);

                    bug.status = args[0].status;
                }
            });
            session.subscribe('com.demo.bugs.oncreate', function(args){
                if(args[0]){
                    console.log('Bug Deleted: ' + args[0]);

                    var bug = _.find(scope.bugs, 'id', args[0].id);

                    if(bug) return;

                    scope.bugs.push(args[0]);
                }
            });
            loadBugs();
        });
    });

    scope.addBug = function(e, detail, sender){
        if(!scope.newBug) return;

        app.createBug(scope.newBug).then(function(data){

            var bug = _.find(scope.bugs, 'id', data.id);

            if(bug) return;

            scope.bugs.push(data);
        });
    };

    scope.moveToDone = function(e, detail, sender){
        var model = sender.templateInstance.model;
        app.bugToDone(model).then(function(data){
            model.status = data.status;
        });
    };
    scope.moveToWorking = function(e, detail, sender){
        var model = sender.templateInstance.model;
        app.bugToWorking(model).then(function(data){
            model.status = data.status;
        });
    };
    scope.moveToOpen = function(e, detail, sender){
        var model = sender.templateInstance.model;
        app.bugToOpen(model).then(function(data){
            model.status = data.status;
        });
    };

    function loadBugs() {
        app.getBugs().then(function(data){
            data.forEach(function(single){
                scope.bugs.push(single);
            });
        })
    }
})();