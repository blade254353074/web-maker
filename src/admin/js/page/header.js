var $ = require('jquery'),
    template = require('../public/helper'),
    global = require('../public/global');

module.exports = function() {
    // var hdData = {
    //     avatar: '/assets/imgs/avatar.png',
    //     username: 'SebastianBlade'
    // }
    console.log(global.userData);
    var $header = $(global.$header.html(template('./header', global.userData)));
    return $header;
}
