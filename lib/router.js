var OnBeforeActions = {
    loginRequired: function(){
        if(!Meteor.userId()) {
            Router.go('/login');
        } else {
            this.next();
        }
    }
    // ,
    // activeGameRequired: function(){
    //
    //   var currentGame = Meteor.subscribe('currentGame');
    //   if(currentGame.ready()){
    //
    //     if(Games.find().count() == 0){
    //       Router.go('/login');
    //     } else {
    //         Router.next();
    //     }
    //   }
    // }
};



Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('rules', {
    path: '/rules'
  });
});

Router.route('/', {
  action: function () {
    Router.go('/overview');
  }
});

Router.route('/overview', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe('currentGame');
  },

  action: function () {
    if (this.ready()) {
      if(Games.find().count() == 0){
        Router.go('/login');
      } else {
          this.render();
      }
    } else {
      console.log('Loading');
    }
  }
});

Router.route('/team', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe('currentGame');
  },

  action: function () {
    if (this.ready()) {
      if(Games.find().count() == 0){
        Router.go('/login');
      } else {
          this.render();
      }
    } else {
      console.log('Loading');
    }
  }
});

Router.route('/radar', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe('currentGame');
  },

  action: function () {
    if (this.ready()) {
      if(Games.find().count() == 0){
        Router.go('/login');
      } else {
          this.render();
      }
    } else {
      console.log('Loading');
    }
  }
});

Router.onBeforeAction(OnBeforeActions.loginRequired, {
    only: ['team', 'overview', 'radar']
});
