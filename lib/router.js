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
    path: '/rules'
  });
});

Router.route('/login', {
	layoutTemplate: 'loginLayout',
	subscriptions: function() {
		// returning a subscription handle or an array of subscription handles
		// adds them to the wait list.
		return [
			Meteor.subscribe('readyGames'),
			Meteor.subscribe('currentGame')
		];
	},
	action: function () {
		if (this.ready()) {
			if (Games.find({status: "inProgress", players: {$in: [Meteor.userId()]}}).count() == 1) {
				// there is a current game in progress
				Router.go('/team');
			} else if(Games.find({status: "ready", players: {$in: [Meteor.userId()]}}).count() == 1) {
				// joined a game not started yet
				this.render('waitingForUsers');
			} else {
				this.render();
			}
		} else {
			this.next();
			console.log('Loading');
		}
	}
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
		return [
			Meteor.subscribe('readyGames'),
			Meteor.subscribe('currentGame')
		];
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

Router.route('/bomb/:_id', {
    name: "currentBomb",
    subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return [
            Meteor.subscribe('currentBomb', this.params._id),
            Meteor.subscribe('currentGame')
        ];
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
    only: ['rules', 'team', 'overview', 'radar']
});
