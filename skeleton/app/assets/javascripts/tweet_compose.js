$.TweetCompose = function (el, options) {
  this.$form = $(el)
  this.$formText = $("[name='tweet\\[content\\]']")

  this.$formText.on('input', this.handleInput.bind(this))
  this.$form.on('submit', this.submit.bind(this))
  this.$formInputs = $("form.tweet-compose:input")
}

$.TweetCompose.CHAR_LIMIT = 140;

$.TweetCompose.prototype.handleInput = function () {
  var remainingChars = $.TweetCompose.CHAR_LIMIT - this.$formText.val().length
  $('strong.chars-left').text(remainingChars)
}

$.TweetCompose.prototype.submit = function () {
  event.preventDefault()

  var formTextJSON = this.$formText.serializeJSON()
  this.$formInputs.prop('disabled', true)
  var tweetCompose = this

  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formTextJSON,
    success: function (tweet) {
      // console.log(tweet)
      // var tweetString = JSON.stringify(tweet)
      tweetCompose.handleSuccess();
    }

  })
}

$.TweetCompose.prototype.handleSuccess = function () {
  var feedId = this.$form.data('tweets-ul')
  var $feedUl = $(feedId)

  var $li = $('<li></li>')
  $li.text(this.$formText.val())
  $feedUl.append($li)
  this.clearInput()
}

$.TweetCompose.prototype.clearInput = function () {
  this.$formInputs.prop('disabled', false)
  this.$formInputs.empty()
}

$.fn.tweetCompose = function (options) {
  return this.each(function() {
    new $.TweetCompose(this, options)
  })
}

$(function () {
  $('.tweet-compose').tweetCompose();
})
