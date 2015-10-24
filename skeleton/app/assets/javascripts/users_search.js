$.UserSearch = function (el) {
  this.$el = $(el)
  // this.$input = $('input')
  this.$input = $ ("input[name=username]");
  this.$users = $('.users')
  // this.$ul = this.$el.find(".users");
  this.$input.on('input', this.handleInput.bind(this))
}

$.UserSearch.prototype.handleInput = function () {
  $.ajax({
    url: '/users/search',
    dataType: 'json',
    type: 'GET',
    data: { query: this.$input.val() },
    success: this.renderResults.bind(this)
  });
};

$.UserSearch.prototype.renderResults = function (users) {
  this.$users.empty()

  for (var i = 0; i < users.length; i++) {
    var user = users[i]

    var $a = $('<a></a>')
    $a.text(user.username)
    $a.attr('href', "/users/" + user.id);

    var $li = $('<li></li>')
    $li.append($a)
    // var liEl = "<li><a href='/users/" + user.id + "'>" + user.username + "</a></li>"
    var $followToggleButton = $('<button></button>')
    $followToggleButton.followToggle({
      userId: user.id,
      followState: user.followed ? 'followed' : 'unfollowed'
    })
    // $followToggleButton.followToggle({
    //   followState: "unfollowed",
    //   userId: user.id
    // })
    $li.append($followToggleButton)

    this.$users.append($li)
  }
}

$.fn.userSearch = function () {
  return this.each(function () {
    new $.UserSearch(this)
  })
}

$( function () {
  $('div.users-search').userSearch();
})
