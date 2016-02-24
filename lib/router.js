var OnBeforeActions = {
    loginRequired: function(){
        if(!Meteor.userId()) {
            Router.go('/login');
        } else {
            this.next();
        }
    }
};



Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('rules', {
    path: '/'
  });

  this.route('team', {
    path: '/team'
  });

  this.route('overview', {
    path: '/overview'
  });

  this.route('radar', {
    path: '/radar'
  });

  this.route('login', {
    path: '/login',
    layoutTemplate: 'loginLayout'
  });


});
Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['team', 'overview', 'radar']
});
