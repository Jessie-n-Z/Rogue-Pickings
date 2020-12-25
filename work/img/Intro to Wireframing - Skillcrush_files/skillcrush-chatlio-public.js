(function() {
    'use strict';
    
    var showOrHide = function showOrHide() {
        var chatlio = document.querySelector('.chatlio-widget');
        var beacon = document.getElementById('hs-beacon');
        if (chatlio) {
            var beacon = document.getElementById('hs-beacon');
            beacon.style.display = 'none';
        }
    };

    document.addEventListener('chatlio.ready', showOrHide);

})();