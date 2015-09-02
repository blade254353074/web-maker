var $ = require('jquery');

module.exports = {
    $header: $('#header'),
    $app: $('#app'),
    $body: $('body'),
    $window: $(window),
    frameLoad: false,
    userData: {
        avatar: '/assets/imgs/avatar.png',
        auth: '',
        username: ''
    }
}
