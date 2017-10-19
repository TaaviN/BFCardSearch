var ua = navigator.userAgent.toLowerCase();
var isM = ua.indexOf("mobile") > -1; //&& ua.indexOf("mobile");
if (isM) {

    addScript('applicationmobile.js');
    var styles = 'img {                -webkit-user-select: none; /* disable selection/Copy of UIWebView */                -webkit-touch-callout:inherit;            }           .no-right-padding-button.x-iconalign-left > .x-button-label {                padding-right: 5px !important;            }           .white-text-title .x-innerhtml {               color: #ffffff !important;           }       .low-margin-fieldset{       margin: 0.4em 1em 0.4em !important;     }   .low-margin-fieldset .x-form-fieldset-title { margin: 0.2em 0em 0.2em !important;color: #606060;}';

    window.onload = function () {
        appendStyle(styles);
    };
} else {
    doCardViewFiltersFromUrl();
    addScript('application.js');

    var styles = '.kill-margins .x-tab-default-top {               -webkit-border-radius: 0;                -moz-border-radius: 0;                -ms-border-radius: 0;               -o-border-radius: 0;               border-radius: 0;                padding: 0px 10px 0px 10px;                border-width: 0;                border-style: solid;               background-color: transparent;           }            .nokill-margins .x-tab-default-top {               -webkit-border-radius: 0;                -moz-border-radius: 0;                -ms-border-radius: 0;                -o-border-radius: 0;                border-radius: 0;                padding: 8px 10px 8px 10px;               border-width: 0; border-style: solid; background-color: transparent;}';

    window.onload = function () {
        appendStyle(styles);
    };
}

function addScript(src) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.setAttribute('data-app', 'f7cdfd05-2248-44b0-9af7-017f82277105');
    s.setAttribute('id', 'microloader');
    document.getElementsByTagName("head")[0].appendChild(s);
}

function appendStyle(styles) {
    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet)
        css.styleSheet.cssText = styles;
    else
        css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
}
function doCardViewFiltersFromUrl() {
    
    var sharingurl = location.search;
      
    if (sharingurl !== '')
    {
        if (sharingurl.substr(0, 11) == "?search:en:" || 
                sharingurl.substr(0, 11) == "?search:de:" || 
                sharingurl.substr(0, 11) == "?search:ru:") {
            var stringparts = sharingurl.substr(11);
            if (sharingurl.substr(0, 11) == "?search:en:") {
                window.localStorage.setItem('BaFoLNG', 'en');
            } else if (sharingurl.substr(0, 11) == "?search:de:") {
                window.localStorage.setItem('BaFoLNG', 'de');
            } else if (sharingurl.substr(0, 11) == "?search:ru:") {
                window.localStorage.setItem('BaFoLNG', 'ru');
            }
            var searchTypes = [
                'c', 'uc', 'r', 'ur',
                'afn', 'afr', 'afi', 'an', 'as',
                'ts', 'tc', 'tb',
                'colfr', 'colfi', 'coln', 'cols', 'coltl', 'colb', 'colsk', 'colls', 'collg',
                'munits', 'runits',
                'otms', 'otmm', 'otml', 'otmxl', 'ots',
                'dts', 'dtm', 'dtl', 'dtxl',
                'tiero', 'tiertw', 'tiert', 'tierf',
                'eda', 'edls', 'edr', 'edt'
            ];

            var i = 0;
            var i2 = 0;
            var partstokeep = {};
            var partsOfSearchArr = stringparts.split('&');
             
            for (i; i < partsOfSearchArr.length; i++) {
                var part = partsOfSearchArr[i].split('=');
                window.localStorage.setItem("_appCardsSearch" + part[0], part[1]);
                partstokeep[part[0]] = 1;
            }
            for (i2; i2 < searchTypes.length; i2++) {
                if (!partstokeep[searchTypes[i2]] || partstokeep[searchTypes[i2]] < 1) {
                     
                    window.localStorage.setItem("_appCardsSearch" + searchTypes[i2], 0);
                }else{
                    
                }
            }
        }
    }
}


var Ext = Ext || {};

Ext.beforeLoad = function (tags) {
    var s = location.search,
            profile;

    if (isM) {

        profile = 'modern';

    } else {
        profile = 'classic';
    }

    Ext.manifest = profile;


};


