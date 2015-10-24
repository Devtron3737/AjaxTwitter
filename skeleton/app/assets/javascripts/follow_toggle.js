//im returning a modified button with FollowToggle. So, i need to
//call it on a button. and if that button doesnt have
//data-user-name and data-followState, then i need to pass
//those in as options

$.FollowToggle = function (el, options) {
  this.$el = $(el)
  this.userId = this.$el.data('user-id') || options.userId
  this.followState = this.$el.data('initial-follow-state') || options.followState
  this.render()
  this.$el.on('click', this.handleClick.bind(this))
}


$.FollowToggle.prototype.render = function () {
  if (this.followState === 'unfollowing') {
    this.$el.text('Unfollowing...')
    this.$el.prop('disabled', true)
  } else if (this.followState === 'following') {
    this.$el.text('Following...')
    this.$el.prop('disabled', true)
  } else if (this.followState === 'unfollowed') {
    this.$el.prop('disabled', false)
    this.$el.text('Follow!')
  } else if (this.followState === 'followed') {
    this.$el.prop('disabled', false)
    this.$el.text('Unfollow!')
  }
}

$.FollowToggle.prototype.handleClick = function () {
  event.preventDefault();

  var followToggle = this
  this.followState = (this.followState == 'followed') ? "unfollowing" : "following"
  this.render()
  if (this.followState === 'following') {
    $.ajax({
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      type: "POST",
      success: function (result) {
        console.log(result)
        followToggle.followState = 'followed'
        followToggle.render();
      },
      error: function (result) {
        console.log('AJAX failed')
        console.log(result)
      }
    })
  } else {
    $.ajax({
      url: "/users/" + this.userId + "/follow",
      dataType: "json",
      type: "DELETE",
      success: function (result) {
        console.log(result)
        followToggle.followState = 'unfollowed';
        followToggle.render();
      },
      error: function (result) {
        console.log('AJAX failed')
        console.log(result)
      }
    })
  }
}

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  })
}

// $( function () {
//   $('button.follow-toggle').followToggle()
// })
