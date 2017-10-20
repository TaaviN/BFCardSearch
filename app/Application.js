/*static crap not realy needed ;)*/

var msg = null, _app = null, _cardShareOverlay = null, _cardEditorOverlay = null, _actionsheet = null, _actionsheets = null, _mactionsheet = null, _overlay = null, _cardDataOverlay = null, _cardDataOverlayO = {}, _cardDataOverlayId = null, _historyView = null;
var searchMeRec = null;
var serverurl = 'http://www.bafocards.eu/';
var shareserverurl = serverurl + 'shared/';
var shareserverurl2 = serverurl + 'shareddataimg/';
var iAmAEditor = false, iAmAEditorCode = null, iAmAEditorName = null, _eloverlay = null;
Ext.define('slrcards.Application', {
    extend: 'Ext.app.Application',
    name: 'slrcards',
    requires: [
        "slrcards.model.Card",
        "slrcards.model.Deck",
        "slrcards.model.Map",
        'slrcards.model.GameCard'
    ],
    stores: [
        'slrcards.store.Decks',
        'slrcards.store.Cards',
        'slrcards.store.CardsMain',
        'slrcards.store.CardsToDeck',
        'slrcards.store.CardsInDeck',
        'slrcards.store.MapsMain',
        'slrcards.store.SharedCards',
        'slrcards.store.CardsEditorMain',
        'slrcards.store.CardsForGame'
    ],
    launch: function () {

        _app = this;
        if (window.localStorage.getItem('BaFoLNG') == null) {
            window.localStorage.setItem('BaFoLNG', 'en');
        }
        if (window.localStorage.getItem('BaFoLNG2') == null) {
            window.localStorage.setItem('BaFoLNG2', 'en');
        }
        if (window.localStorage.getItem('BaFoLVL') == null) {
            window.localStorage.setItem('BaFoLVL', '0');
        }
        try {

            _app.loadAppData();
            document.title = _app.getLngString('Battleforge cards');
        } catch (err) {
            console.info(_app.getLngString('application error') + ' ' + err.message);

        }
    },
    findMatchingWords: function (t, s) {
        t = t.toLowerCase();

        if (t.includes(s.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    },
    findMatchingWordsByObj: function (t, s) {
        var matchCount = 0;
        for (var prop in t) {
            var str = t[prop].toLowerCase();

            if (str.includes(s.toLowerCase())) {
                matchCount++;
            }
        }
        if (matchCount > 0) {
            return true;
        } else {
            return false;
        }
    },
    alertUser: function (text, title) {

        if (title != "") {
            Ext.Msg.alert(title, text);
        } else {
            Ext.Msg.alert("Info", text);
        }
    },
    testExists: function (item) {

        if ((typeof item) === "undefined" || item === null) {
            return false;
        } else {
            return true;
        }
    },
    loadAppData: function (a, b, c, d) {
        var me = this;
        Ext.Ajax.setTimeout(360000);
        Ext.Ajax.request({
            url: 'newformatjsondata/',
            success: function (response, opts) {
                var data = Ext.decode(response.responseText);
                if (me.testExists(data.success)) {
                    if (data.success) {
                        var i = 0;
                        var id = 1;
                        for (i; i < data.data.length; i++) {
                            if (data.data[i].OrbInfo) {
                                var orbcount = (data.data[i].OrbInfo.Neutral + data.data[i].OrbInfo.Frost + data.data[i].OrbInfo.Fire + data.data[i].OrbInfo.Nature + data.data[i].OrbInfo.Shadow);

                                data.data[i].Orbs = orbcount;
                            } else {
                                data.data[i].Orbs = 0;
                            }
                            id++;
                        }
                        me.loadDataStoreAndInsertData("ApiCardsMain", "slrcards.store.CardsMain", data.data);


                        me.doCardView();

                        me.isSharedCards();
                        me.testOldEditor();
                    }
                }
            },
            failure: function (response, opts) {
                console.info(me.getLngString('server side failure with status code') + ' ' + response.status);
            }
        });
        Ext.Ajax.request({
            url: 'maps.json',
            success: function (response, opts) {
                var data = Ext.decode(response.responseText);
                if (me.testExists(data.success)) {
                    if (data.success) {
                        var i = 0;
                        var id = 1;
                        for (i; i < data.data.length; i++) {
                            data.data[i].mapId = id;
                            id++;
                        }
                        if (window.localStorage.getItem('ApiDeckToEditId') == null) {
                            window.localStorage.setItem('ApiDeckToEditId', '');
                        }
                        me.loadDataStoreAndInsertData("ApiMapsMain", "slrcards.store.MapsMain", data.data);
                    }
                }
            },
            failure: function (response, opts) {
                console.info(me.getLngString('server side failure with status code') + ' ' + response.status);
            }
        });


    },
    isSharedCards: function () {
        var me = this;
        var sharingurl = location.search;
        var sharinghash = location.hash;

        if (sharingurl !== '')
        {
            if (sharingurl.substr(0, 7) == "?shared") {

                var stringparts = sharingurl.substr(8);

                var partsOfArr = stringparts.split(':');
                window.localStorage.setItem('BaFoLNG', partsOfArr[0]);
                if (_actionsheet) {
                    _actionsheet.destroy(this);
                    _actionsheet = null;
                }
                if (!_actionsheet) {
                    Ext.Ajax.request({
                        url: 'shareme/',
                        params: {
                            code: partsOfArr[1],
                            json: 1
                        },
                        success: function (response, opts) {
                            var data = Ext.decode(response.responseText);

                            if (data.success) {
                                var panel = Ext.first('#main');
                                panel.getLayout().setActiveItem(0);
                                var i = 0;
                                var id = 1000;
                                for (i; i < data.data.length; i++) {
                                    if (data.data[i].OrbInfo) {
                                        var orbcount = (data.data[i].OrbInfo.Neutral + data.data[i].OrbInfo.Frost + data.data[i].OrbInfo.Fire + data.data[i].OrbInfo.Nature + data.data[i].OrbInfo.Shadow);

                                        data.data[i].Orbs = orbcount;
                                    } else {
                                        data.data[i].Orbs = 0;
                                    }
                                }


                                var wstore = Ext.data.StoreManager.lookup("ApiSharedCards");
                                var recordsToRemove = [];
                                var range = wstore.getRange();
                                var i = 0;
                                for (i; i < range.length; i++) {
                                    recordsToRemove.push(wstore.getAt(i));

                                }
                                wstore.remove(recordsToRemove);
                                wstore.add(data.data);

                                _actionsheet = Ext.create('Ext.window.Window', {
                                    title: me.getLngString('Shared cards'),
                                    height: 500,
                                    width: 800,
                                    controller: 'mainc',
                                    viewModel: 'mainm',
                                    scrollable: 'y',
                                    modal: true,
                                    tools: [
                                    ],
                                    bodyStyle: "background-color:#000000;background:#000 url('img/back.jpg') no-repeat center center;background-size:cover;background-attachment: fixed;",
                                    items: [
                                        {
                                            xtype: "sharedcardsdataview"
                                        }
                                    ]
                                });
                                _actionsheet.show(null, function () {
                                    var dataview = Ext.first("#sharedcardsdataview");
                                    dataview.refresh();

                                });

                            }
                        },
                        failure: function (response, opts) {

                            Ext.toast(
                                    {
                                        html: response.status,
                                        title: me.getLngString('server side failure with status code'),
                                        width: 600,
                                        align: 't'
                                    }
                            );
                        }
                    });
                }
            } else if (sharingurl.substr(0, 11) == "?search:en:" || sharingurl.substr(0, 11) == "?search:de:" || sharingurl.substr(0, 11) == "?search:ru:") {
                var panel = Ext.first('#main');
                panel.getLayout().setActiveItem(1);
            }

        } else if (sharinghash !== '') {
            if (sharinghash.substr(0, 6) == "#card:") {
                var panel = Ext.first('#main');
                panel.getLayout().setActiveItem(0);

                var arr = sharinghash.substr(6);
                var partsOfArr = arr.split(':');
                window.localStorage.setItem('BaFoLNG', partsOfArr[0]);
                me.setSharedCardWindow(partsOfArr[1], 'make');
            }
        } else {
            var panel = Ext.first('#main');
            panel.getLayout().setActiveItem(1);
        }
    },
    setSharedCardWindow: function (id, action) {
        var store = Ext.data.StoreManager.lookup("ApiCardsMain");
        var ids = id.split(',');
        var me = this;
        if (ids.length > 1)
        {
            var ic = 0;
            var len = ids.length;
            if (ids.length > 10) {
                len = 10;
            }

            for (ic; ic < len; ic++) {

                var card = store.getById(ids[ic]);
                if (card) {
                    var raw = card.getData();


                    if ((typeof window.innerWidth) === "undefined" || window.innerWidth === null) {
                        w = screen.width;
                        h = screen.iheight;
                    } else {
                        if (screen.width > window.innerWidth) {
                            w = window.innerWidth;
                            h = window.innerHeight;
                        } else {
                            w = screen.width;
                            h = screen.iheight;
                        }
                    }
                    if (_cardDataOverlayO[ids[ic]]) {
                        _cardDataOverlayO[ids[ic]].destroy(this);
                        _cardDataOverlayO[ids[ic]] = null;
                    }
                    if (!_cardDataOverlayO[ids[ic]]) {
                        var infoPanels = [];

                        var RarityText = '';
                        switch (raw.Rarity) {
                            case 0:
                                RarityText = me.getLngString('Common');
                                break;
                            case 1:
                                RarityText = me.getLngString('UnCommon');
                                break;
                            case 2:
                                RarityText = me.getLngString('Rare');
                                break;
                            case 3:
                                RarityText = me.getLngString('Ultra rare');
                                break;
                        }
                        var AffinityText = '';
                        switch (raw.Affinity) {
                            case -1:
                                AffinityText = me.getLngString('None');
                                break;
                            case 0:
                                AffinityText = me.getLngString('Frost');
                                break;
                            case 1:
                                AffinityText = me.getLngString('Fire');
                                break;
                            case 2:
                                AffinityText = me.getLngString('Nature');
                                break;
                            case 3:
                                AffinityText = me.getLngString('Shadow');
                                break;
                        }
                        var TypeText = '';
                        switch (raw.Type) {
                            case 0:
                                TypeText = me.getLngString('Spell');
                                break;
                            case 2:
                                TypeText = me.getLngString('Creature');
                                break;
                            case 3:
                                TypeText = me.getLngString('Building');
                                break;
                        }
                        var lcode = 'en';
                        if (window.localStorage.getItem('BaFoLNG') == null) {
                            lcode = 'en';
                        } else {
                            lcode = window.localStorage.getItem('BaFoLNG');
                        }


                        infoPanels.push(
                                {
                                    layout: 'hbox',
                                    style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                    margin: 3,
                                    padding: 2,
                                    bodyStyle: 'background-color:#303030;',
                                    items: [
                                        {style: 'background-color:#303030;',
                                            bodyStyle: 'background-color:#303030;',
                                            html: '<img style="background-color:#303030;width:100%;background-size:cover;background-image:url(\' img?units|' + raw.Image.ObjectID + '|png|90|350|500\');" src="img/units/e.png" />',
                                            width: '33%',
                                            height: 345
                                        },
                                        {
                                            style: 'background-color:#303030;',
                                            bodyStyle: 'background-color:#303030;',
                                            items: [
                                                {
                                                    width: '100%',
                                                    style: 'padding-right:10px;background-color:#303030;',
                                                    bodyStyle: 'background-color:#303030;',
                                                    items: [
                                                        {
                                                            layout: 'hbox',
                                                            style: "margin-right:10px;background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                            margin: 3,
                                                            padding: 2,
                                                            items: [
                                                                {padding: 2,
                                                                    html: me.getLngString('Category'),
                                                                    width: '33%'
                                                                },
                                                                {padding: 2,
                                                                    itemId: "cardinfoCategory",
                                                                    style: "text-align:right;",
                                                                    html: (raw.Category && raw.Category[lcode] != '' ? raw.Category[lcode] : me.getLngString('Data missing')),
                                                                    width: '66%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                            margin: 3,
                                                            padding: 2,
                                                            items: [
                                                                {padding: 2,
                                                                    html: me.getLngString('Cost'),
                                                                    width: '33%'
                                                                },
                                                                {padding: 2,
                                                                    itemId: "cardinfoCost",
                                                                    style: "text-align:right; ",
                                                                    html: (raw.Cost != '' ? raw.Cost : me.getLngString('Data missing')),
                                                                    width: '66%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                            margin: 3,
                                                            padding: 2,
                                                            items: [
                                                                {padding: 2,
                                                                    html: me.getLngString('Affinity'),
                                                                    width: '33%'
                                                                },
                                                                {padding: 2,
                                                                    itemId: "cardinfoAffinity",
                                                                    style: "text-align:right; ",
                                                                    html: AffinityText,
                                                                    width: '66%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                            margin: 3,
                                                            padding: 2,
                                                            items: [
                                                                {padding: 2,
                                                                    html: me.getLngString('Offense'),
                                                                    width: '33%'
                                                                },
                                                                {padding: 2,
                                                                    itemId: "cardinfoOffense" + raw.cardId,
                                                                    style: "text-align:right; ",
                                                                    html: (raw.Offense['None'] != '' ? raw.Offense['None'] : me.getLngString('None')),
                                                                    width: '66%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                            margin: 3,
                                                            padding: 2,
                                                            items: [
                                                                {padding: 2,
                                                                    html: me.getLngString('Defense'),
                                                                    width: '33%'
                                                                },
                                                                {padding: 2,
                                                                    itemId: "cardinfoDefense" + raw.cardId,
                                                                    style: "text-align:right; ",
                                                                    html: (raw.Defense['None'] != '' ? raw.Defense['None'] : me.getLngString('None')),
                                                                    width: '66%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                            margin: 3,
                                                            padding: 2,
                                                            items: [
                                                                {padding: 2,
                                                                    html: me.getLngString('Rarity'),
                                                                    width: '33%'
                                                                },
                                                                {padding: 2,
                                                                    itemId: "cardinfoRarity",
                                                                    style: "text-align:right; ",
                                                                    html: RarityText,
                                                                    width: '66%'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            layout: 'hbox',
                                                            style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                            margin: 3,
                                                            padding: 2,
                                                            items: [
                                                                {
                                                                    padding: 2,
                                                                    html: me.getLngString('Type'),
                                                                    width: '33%'
                                                                },
                                                                {
                                                                    padding: 2,
                                                                    itemId: "cardinfoType",
                                                                    style: "text-align:right; ",
                                                                    html: TypeText,
                                                                    width: '66%'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            width: '66%'
                                        }
                                    ]
                                }
                        );


                        var abilityPanels0 = [];
                        var abilityPanels1 = [];
                        var abilityPanels2 = [];
                        var abilityPanels3 = [];

                        var Abilities0 = raw.Abilities[lcode]['None'];
                        var Abilities1 = raw.Abilities[lcode]['One'];
                        var Abilities2 = raw.Abilities[lcode]['Two'];
                        var Abilities3 = raw.Abilities[lcode]['Three'];



                        if (Abilities0.length > 0) {
                            var ai0 = 0;

                            for (ai0; ai0 < Abilities0.length; ai0++) {
                                var Ability = Abilities0[ai0];

                                var myPanel = Ext.create('Ext.Container', {
                                    items: [
                                        {xtype: "panel",
                                            title: Ability.Name,
                                            titleAlign: 'left',
                                            style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                        },
                                        {
                                            html: Ability.Description,
                                            style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                        }
                                    ]

                                });
                                abilityPanels0.push(myPanel);
                            }
                        }
                        if (Abilities1.length > 0) {
                            var ai1 = 0;

                            for (ai1; ai1 < Abilities1.length; ai1++) {
                                var Ability = Abilities1[ai1];

                                var myPanel = Ext.create('Ext.Container', {
                                    items: [
                                        {xtype: "panel",
                                            title: Ability.Name,
                                            titleAlign: 'left',
                                            style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                        },
                                        {
                                            html: Ability.Description,
                                            style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                        }
                                    ]

                                });
                                abilityPanels1.push(myPanel);
                            }
                        }
                        if (Abilities2.length > 0) {
                            var ai2 = 0;

                            for (ai2; ai2 < Abilities2.length; ai2++) {
                                var Ability = Abilities2[ai2];

                                var myPanel = Ext.create('Ext.Container', {
                                    items: [
                                        {xtype: "panel",
                                            title: Ability.Name,
                                            titleAlign: 'left',
                                            style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                        },
                                        {
                                            html: Ability.Description,
                                            style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                        }
                                    ]

                                });
                                abilityPanels2.push(myPanel);
                            }
                        }
                        if (Abilities3.length > 0) {
                            var ai3 = 0;

                            for (ai3; ai3 < Abilities3.length; ai3++) {
                                var Ability = Abilities3[ai3];

                                var myPanel = Ext.create('Ext.Container', {
                                    items: [
                                        {xtype: "panel",
                                            title: Ability.Name,
                                            titleAlign: 'left',
                                            style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                        },
                                        {
                                            html: Ability.Description,
                                            style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                        }
                                    ]

                                });
                                abilityPanels3.push(myPanel);
                            }
                        }




                        var Upgradesm = raw.Upgrades[lcode];
                        var UpgradesReturnBase = [];
                        var UpgradesReturnOne = [];
                        var UpgradesReturnTwo = [];
                        var ium = 0;
                        if (Upgradesm.length > 0) {

                            for (ium; ium < Upgradesm.length; ium++) {
                                var Upgradem = Upgradesm[ium];

                                if (Upgradem.Show.Base === 1) {
                                    UpgradesReturnBase.push(Upgradem);
                                }
                                if (Upgradem.Show.One === 1) {
                                    UpgradesReturnOne.push(Upgradem);
                                }
                                if (Upgradem.Show.Two === 1) {
                                    UpgradesReturnTwo.push(Upgradem);
                                }



                            }
                            var upgradePanelsBase = [];
                            var upgradePanelsOne = [];
                            var upgradePanelsTwo = [];


                            var testUpgradeBContent = 0;
                            var iumb = 0;
                            for (iumb; iumb < UpgradesReturnBase.length; iumb++) {
                                var Upgrade = UpgradesReturnBase[iumb];

                                if (Upgrade.Description != null && Upgrade.Description != '') {
                                    var myPanel = Ext.create('Ext.Container', {
                                        items: [
                                            {
                                                xtype: "panel",
                                                title: 'Lvl ' + Upgrade.Era,
                                                titleAlign: 'left',
                                                style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "


                                            },
                                            {
                                                html: Upgrade.Description,
                                                style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                            }
                                        ]

                                    });
                                    upgradePanelsBase[(Upgrade.Era - 1)] = myPanel;
                                    testUpgradeBContent++;
                                }
                            }
                            if (testUpgradeBContent > 0) {

                                abilityPanels0.push({
                                    xtype: "panel",
                                    title: "Upgrades",
                                    ui: 'blue'

                                });
                                abilityPanels0.push({
                                    itemId: "cardinfoUpgrades",
                                    items: upgradePanelsBase
                                });
                            }

                            var testUpgradeOContent = 0;
                            var iumo = 0;
                            for (iumo; iumo < UpgradesReturnOne.length; iumo++) {
                                var Upgrade = UpgradesReturnOne[iumo];

                                if (Upgrade.Description != null && Upgrade.Description != '') {
                                    var myPanel = Ext.create('Ext.Container', {
                                        items: [
                                            {
                                                xtype: "panel",
                                                title: 'Lvl ' + Upgrade.Era,
                                                titleAlign: 'left',
                                                style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "


                                            },
                                            {
                                                html: Upgrade.Description,
                                                style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                            }
                                        ]

                                    });
                                    upgradePanelsOne[(Upgrade.Era - 1)] = myPanel;
                                    testUpgradeOContent++;
                                }
                            }
                            if (testUpgradeOContent > 0) {

                                abilityPanels1.push({
                                    xtype: "panel",
                                    title: "Upgrades",
                                    ui: 'blue'

                                });
                                abilityPanels1.push({
                                    itemId: "cardinfoUpgrades",
                                    items: upgradePanelsOne
                                });
                            }

                            var testUpgradeTContent = 0;
                            var iumt = 0;
                            for (iumt; iumt < UpgradesReturnTwo.length; iumt++) {
                                var Upgrade = UpgradesReturnTwo[iumt];

                                if (Upgrade.Description != null && Upgrade.Description != '') {
                                    var myPanel = Ext.create('Ext.Container', {
                                        items: [
                                            {
                                                xtype: "panel",
                                                title: 'Lvl ' + Upgrade.Era,
                                                titleAlign: 'left',
                                                style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "


                                            },
                                            {
                                                html: Upgrade.Description,
                                                style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                            }
                                        ]

                                    });
                                    upgradePanelsTwo[(Upgrade.Era - 1)] = myPanel;
                                    testUpgradeTContent++;
                                }
                            }
                            if (testUpgradeTContent > 0) {

                                abilityPanels2.push({
                                    xtype: "panel",
                                    title: "Upgrades",
                                    ui: 'blue'

                                });
                                abilityPanels2.push({
                                    itemId: "cardinfoUpgrades",
                                    items: upgradePanelsTwo
                                });
                            }

                        }

                        infoPanels.push({
                            xtype: "panel",
                            title: "Abilities",
                            ui: 'blue'
                        });
                        infoPanels.push({
                            xtype: 'tabpanel',
                            listeners: {
                                beforetabchange: function (tabs, newTab, oldTab) {
                                    var off = Ext.first("#cardinfoOffense" + newTab.cardId);
                                    var def = Ext.first("#cardinfoDefense" + newTab.cardId);
                                    var raw = newTab.raw;
                                    if (newTab.title == 'Base Card') {
                                        def.setHtml((raw.Defense['None'] != '' ? raw.Defense['None'] : me.getLngString('None')));
                                        off.setHtml((raw.Offense['None'] != '' ? raw.Offense['None'] : me.getLngString('None')));
                                    }
                                    if (newTab.title == 'Card Lvl I') {
                                        off.setHtml((raw.Offense['One'] != '' ? raw.Offense['One'] : me.getLngString('None')));
                                        def.setHtml((raw.Defense['One'] != '' ? raw.Defense['One'] : me.getLngString('None')));
                                    }
                                    if (newTab.title == 'Card Lvl II') {
                                        off.setHtml((raw.Offense['Two'] != '' ? raw.Offense['Two'] : me.getLngString('None')));
                                        def.setHtml((raw.Defense['Two'] != '' ? raw.Defense['Two'] : me.getLngString('None')));
                                    }
                                    if (newTab.title == 'Card Lvl III') {
                                        off.setHtml((raw.Offense['Three'] != '' ? raw.Offense['Three'] : me.getLngString('None')));
                                        def.setHtml((raw.Defense['Three'] != '' ? raw.Defense['Three'] : me.getLngString('None')));
                                    }

                                    return true;
                                }
                            },
                            items: [
                                {
                                    title: 'Base Card',
                                    cardId: raw.cardId,
                                    raw: raw,
                                    items: abilityPanels0
                                }, {
                                    title: 'Card Lvl I',
                                    cardId: raw.cardId,
                                    raw: raw,
                                    items: abilityPanels1
                                }, {
                                    title: 'Card Lvl II',
                                    cardId: raw.cardId,
                                    raw: raw,
                                    items: abilityPanels2
                                }, {
                                    title: 'Card Lvl III',
                                    cardId: raw.cardId,
                                    raw: raw,
                                    items: abilityPanels3
                                }
                            ]
                        });




                        _cardDataOverlayO[ids[ic]] = Ext.create('slrcards.view.Window', {
                            title: raw.Name,
                            height: (h - 130),
                            x: (100 * (ic + 1)),
                            width: 760,
                            scrollable: 'y',
                            items: infoPanels

                        });
                    }
                    _cardDataOverlayO[ids[ic]].show();




                }

            }
        } else {

            var card = store.getById(id);
            if (card) {
                var raw = card.getData();


                if ((typeof window.innerWidth) === "undefined" || window.innerWidth === null) {
                    w = screen.width;
                    h = screen.iheight;
                } else {
                    if (screen.width > window.innerWidth) {
                        w = window.innerWidth;
                        h = window.innerHeight;
                    } else {
                        w = screen.width;
                        h = screen.iheight;
                    }
                }
                if (_cardDataOverlay) {
                    _cardDataOverlay.destroy(this);
                    _cardDataOverlay = null;
                }
                if (!_cardDataOverlay) {
                    var infoPanels = [];

                    var RarityText = '';
                    switch (raw.Rarity) {
                        case 0:
                            RarityText = me.getLngString('Common');
                            break;
                        case 1:
                            RarityText = me.getLngString('UnCommon');
                            break;
                        case 2:
                            RarityText = me.getLngString('Rare');
                            break;
                        case 3:
                            RarityText = me.getLngString('Ultra rare');
                            break;
                    }
                    var AffinityText = '';
                    switch (raw.Affinity) {
                        case -1:
                            AffinityText = me.getLngString('None');
                            break;
                        case 0:
                            AffinityText = me.getLngString('Frost');
                            break;
                        case 1:
                            AffinityText = me.getLngString('Fire');
                            break;
                        case 2:
                            AffinityText = me.getLngString('Nature');
                            break;
                        case 3:
                            AffinityText = me.getLngString('Shadow');
                            break;
                    }
                    var TypeText = '';
                    switch (raw.Type) {
                        case 0:
                            TypeText = me.getLngString('Spell');
                            break;
                        case 2:
                            TypeText = me.getLngString('Creature');
                            break;
                        case 3:
                            TypeText = me.getLngString('Building');
                            break;
                    }

                    var lcode = 'en';
                    if (window.localStorage.getItem('BaFoLNG') == null) {
                        lcode = 'en';
                    } else {
                        lcode = window.localStorage.getItem('BaFoLNG');
                    }



                    infoPanels.push(
                            {
                                layout: 'hbox',
                                style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                margin: 3,
                                padding: 2,
                                bodyStyle: 'background-color:#303030;',
                                items: [
                                    {style: 'background-color:#303030;',
                                        bodyStyle: 'background-color:#303030;',
                                        html: '<img style="background-color:#303030;width:100%;background-size:cover;background-image:url(\' img?units|' + raw.Image.ObjectID + '|png|90|350|500\');" src="img/units/e.png" />',
                                        width: '33%',
                                        height: 345
                                    },
                                    {
                                        style: 'background-color:#303030;',
                                        bodyStyle: 'background-color:#303030;',
                                        items: [
                                            {
                                                width: '100%',
                                                style: 'padding-right:10px;background-color:#303030;',
                                                bodyStyle: 'background-color:#303030;',
                                                items: [
                                                    {
                                                        layout: 'hbox',
                                                        style: "margin-right:10px;background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {padding: 2,
                                                                html: me.getLngString('Category'),
                                                                width: '33%'
                                                            },
                                                            {padding: 2,
                                                                itemId: "cardinfoCategory",
                                                                style: "text-align:right;",
                                                                html: (raw.Category && raw.Category[lcode] != '' ? raw.Category[lcode] : me.getLngString('Data missing')),
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {padding: 2,
                                                                html: me.getLngString('Cost'),
                                                                width: '33%'
                                                            },
                                                            {padding: 2,
                                                                itemId: "cardinfoCost",
                                                                style: "text-align:right; ",
                                                                html: (raw.Cost != '' ? raw.Cost : me.getLngString('Data missing')),
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {padding: 2,
                                                                html: me.getLngString('Affinity'),
                                                                width: '33%'
                                                            },
                                                            {padding: 2,
                                                                itemId: "cardinfoAffinity",
                                                                style: "text-align:right; ",
                                                                html: AffinityText,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {padding: 2,
                                                                html: me.getLngString('Offense'),
                                                                width: '33%'
                                                            },
                                                            {padding: 2,
                                                                itemId: "cardinfoOffense" + raw.cardId,
                                                                style: "text-align:right; ",
                                                                html: (raw.Offense['None'] != '' ? raw.Offense['None'] : me.getLngString('None')),
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {padding: 2,
                                                                html: me.getLngString('Defense'),
                                                                width: '33%'
                                                            },
                                                            {padding: 2,
                                                                itemId: "cardinfoDefense" + raw.cardId,
                                                                style: "text-align:right; ",
                                                                html: (raw.Defense['None'] != '' ? raw.Defense['None'] : me.getLngString('None')),
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {padding: 2,
                                                                html: me.getLngString('Rarity'),
                                                                width: '33%'
                                                            },
                                                            {padding: 2,
                                                                itemId: "cardinfoRarity",
                                                                style: "text-align:right; ",
                                                                html: RarityText,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#303030;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                padding: 2,
                                                                html: me.getLngString('Type'),
                                                                width: '33%'
                                                            },
                                                            {
                                                                padding: 2,
                                                                itemId: "cardinfoType",
                                                                style: "text-align:right; ",
                                                                html: TypeText,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        width: '66%'
                                    }
                                ]
                            }
                    );


                    var abilityPanels0 = [];
                    var abilityPanels1 = [];
                    var abilityPanels2 = [];
                    var abilityPanels3 = [];

                    var Abilities0 = raw.Abilities[lcode]['None'];
                    var Abilities1 = raw.Abilities[lcode]['One'];
                    var Abilities2 = raw.Abilities[lcode]['Two'];
                    var Abilities3 = raw.Abilities[lcode]['Three'];



                    if (Abilities0.length > 0) {
                        var ai0 = 0;

                        for (ai0; ai0 < Abilities0.length; ai0++) {
                            var Ability = Abilities0[ai0];

                            var myPanel = Ext.create('Ext.Container', {
                                items: [
                                    {xtype: "panel",
                                        title: Ability.Name,
                                        titleAlign: 'left',
                                        style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                    },
                                    {
                                        html: Ability.Description,
                                        style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                    }
                                ]

                            });
                            abilityPanels0.push(myPanel);
                        }
                    }
                    if (Abilities1.length > 0) {
                        var ai1 = 0;

                        for (ai1; ai1 < Abilities1.length; ai1++) {
                            var Ability = Abilities1[ai1];

                            var myPanel = Ext.create('Ext.Container', {
                                items: [
                                    {xtype: "panel",
                                        title: Ability.Name,
                                        titleAlign: 'left',
                                        style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                    },
                                    {
                                        html: Ability.Description,
                                        style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                    }
                                ]

                            });
                            abilityPanels1.push(myPanel);
                        }
                    }
                    if (Abilities2.length > 0) {
                        var ai2 = 0;

                        for (ai2; ai2 < Abilities2.length; ai2++) {
                            var Ability = Abilities2[ai2];

                            var myPanel = Ext.create('Ext.Container', {
                                items: [
                                    {xtype: "panel",
                                        title: Ability.Name,
                                        titleAlign: 'left',
                                        style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                    },
                                    {
                                        html: Ability.Description,
                                        style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                    }
                                ]

                            });
                            abilityPanels2.push(myPanel);
                        }
                    }
                    if (Abilities3.length > 0) {
                        var ai3 = 0;

                        for (ai3; ai3 < Abilities3.length; ai3++) {
                            var Ability = Abilities3[ai3];

                            var myPanel = Ext.create('Ext.Container', {
                                items: [
                                    {xtype: "panel",
                                        title: Ability.Name,
                                        titleAlign: 'left',
                                        style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "

                                    },
                                    {
                                        html: Ability.Description,
                                        style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                    }
                                ]

                            });
                            abilityPanels3.push(myPanel);
                        }
                    }




                    var Upgradesm = raw.Upgrades[lcode];
                    var UpgradesReturnBase = [];
                    var UpgradesReturnOne = [];
                    var UpgradesReturnTwo = [];
                    var ium = 0;
                    if (Upgradesm.length > 0) {

                        for (ium; ium < Upgradesm.length; ium++) {
                            var Upgradem = Upgradesm[ium];

                            if (Upgradem.Show.Base === 1) {
                                UpgradesReturnBase.push(Upgradem);
                            }
                            if (Upgradem.Show.One === 1) {
                                UpgradesReturnOne.push(Upgradem);
                            }
                            if (Upgradem.Show.Two === 1) {
                                UpgradesReturnTwo.push(Upgradem);
                            }



                        }
                        var upgradePanelsBase = [];
                        var upgradePanelsOne = [];
                        var upgradePanelsTwo = [];


                        var testUpgradeBContent = 0;
                        var iumb = 0;
                        for (iumb; iumb < UpgradesReturnBase.length; iumb++) {
                            var Upgrade = UpgradesReturnBase[iumb];

                            if (Upgrade.Description != null && Upgrade.Description != '') {
                                var myPanel = Ext.create('Ext.Container', {
                                    items: [
                                        {
                                            xtype: "panel",
                                            title: 'Lvl ' + Upgrade.Era,
                                            titleAlign: 'left',
                                            style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "


                                        },
                                        {
                                            html: Upgrade.Description,
                                            style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                        }
                                    ]

                                });
                                upgradePanelsBase[(Upgrade.Era - 1)] = myPanel;
                                testUpgradeBContent++;
                            }
                        }
                        if (testUpgradeBContent > 0) {

                            abilityPanels0.push({
                                xtype: "panel",
                                title: "Upgrades",
                                ui: 'blue'

                            });
                            abilityPanels0.push({
                                itemId: "cardinfoUpgrades",
                                items: upgradePanelsBase
                            });
                        }

                        var testUpgradeOContent = 0;
                        var iumo = 0;
                        for (iumo; iumo < UpgradesReturnOne.length; iumo++) {
                            var Upgrade = UpgradesReturnOne[iumo];

                            if (Upgrade.Description != null && Upgrade.Description != '') {
                                var myPanel = Ext.create('Ext.Container', {
                                    items: [
                                        {
                                            xtype: "panel",
                                            title: 'Lvl ' + Upgrade.Era,
                                            titleAlign: 'left',
                                            style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "


                                        },
                                        {
                                            html: Upgrade.Description,
                                            style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                        }
                                    ]

                                });
                                upgradePanelsOne[(Upgrade.Era - 1)] = myPanel;
                                testUpgradeOContent++;
                            }
                        }
                        if (testUpgradeOContent > 0) {

                            abilityPanels1.push({
                                xtype: "panel",
                                title: "Upgrades",
                                ui: 'blue'

                            });
                            abilityPanels1.push({
                                itemId: "cardinfoUpgrades",
                                items: upgradePanelsOne
                            });
                        }

                        var testUpgradeTContent = 0;
                        var iumt = 0;
                        for (iumt; iumt < UpgradesReturnTwo.length; iumt++) {
                            var Upgrade = UpgradesReturnTwo[iumt];

                            if (Upgrade.Description != null && Upgrade.Description != '') {
                                var myPanel = Ext.create('Ext.Container', {
                                    items: [
                                        {
                                            xtype: "panel",
                                            title: 'Lvl ' + Upgrade.Era,
                                            titleAlign: 'left',
                                            style: "background:#ffffff;border:0px;border-bottom:1px solid #f2f2f2; "


                                        },
                                        {
                                            html: Upgrade.Description,
                                            style: "padding:5px;border-bottom:1px solid #f2f2f2; margin-right:10px;"
                                        }
                                    ]

                                });
                                upgradePanelsTwo[(Upgrade.Era - 1)] = myPanel;
                                testUpgradeTContent++;
                            }
                        }
                        if (testUpgradeTContent > 0) {

                            abilityPanels2.push({
                                xtype: "panel",
                                title: "Upgrades",
                                ui: 'blue'

                            });
                            abilityPanels2.push({
                                itemId: "cardinfoUpgrades",
                                items: upgradePanelsTwo
                            });
                        }

                    }

                    infoPanels.push({
                        xtype: "panel",
                        title: "Abilities",
                        ui: 'blue'
                    });
                    infoPanels.push({
                        xtype: 'tabpanel',
                        listeners: {
                            beforetabchange: function (tabs, newTab, oldTab) {
                                var off = Ext.first("#cardinfoOffense" + raw.cardId);
                                var def = Ext.first("#cardinfoDefense" + raw.cardId);
                                if (newTab.title == 'Base Card') {
                                    def.setHtml((raw.Defense['None'] != '' ? raw.Defense['None'] : me.getLngString('None')));
                                    off.setHtml((raw.Offense['None'] != '' ? raw.Offense['None'] : me.getLngString('None')));
                                }
                                if (newTab.title == 'Card Lvl I') {
                                    off.setHtml((raw.Offense['One'] != '' ? raw.Offense['One'] : me.getLngString('None')));
                                    def.setHtml((raw.Defense['One'] != '' ? raw.Defense['One'] : me.getLngString('None')));
                                }
                                if (newTab.title == 'Card Lvl II') {
                                    off.setHtml((raw.Offense['Two'] != '' ? raw.Offense['Two'] : me.getLngString('None')));
                                    def.setHtml((raw.Defense['Two'] != '' ? raw.Defense['Two'] : me.getLngString('None')));
                                }
                                if (newTab.title == 'Card Lvl III') {
                                    off.setHtml((raw.Offense['Three'] != '' ? raw.Offense['Three'] : me.getLngString('None')));
                                    def.setHtml((raw.Defense['Three'] != '' ? raw.Defense['Three'] : me.getLngString('None')));
                                }

                                return true;
                            }
                        },
                        items: [
                            {
                                title: 'Base Card',
                                items: abilityPanels0
                            }, {
                                title: 'Card Lvl I',
                                items: abilityPanels1
                            }, {
                                title: 'Card Lvl II',
                                items: abilityPanels2
                            }, {
                                title: 'Card Lvl III',
                                items: abilityPanels3
                            }
                        ]
                    });




                    _cardDataOverlay = Ext.create('Ext.window.Window', {
                        title: raw.Name,
                        height: (h - 130),
                        modal: true,
                        width: 760,
                        scrollable: 'y',
                        items: infoPanels
                    });
                }
                _cardDataOverlay.show();




            }

        }
    },
    doCardView: function () {
        var me = this;
        me.doCardSearch(null, null);
    },
    getSortValues: function (num) {
        switch (num) {
            case 1:
                return{
                    property: 'Orbs',
                    direction: 'ASC'
                };
                break;
            case 2:
                return {
                    property: 'Color',
                    direction: 'ASC'
                };
                break;
            case 3:
                return {
                    property: 'Type',
                    direction: 'ASC'
                };
                break;
            case 4:
                return {
                    property: 'Cost',
                    direction: 'ASC'
                };
                break;
            case 5:
                var code = 'en';
                if (window.localStorage.getItem('BaFoLNG') == null) {
                    code = 'en';
                } else {
                    code = window.localStorage.getItem('BaFoLNG');
                }
                return {
                    property: 'SortName' + code,
                    direction: 'ASC'
                };
                break;
            case 6:
                return {
                    property: 'Rarity',
                    direction: 'ASC'
                };
                break;
            case 7:
                return {
                    property: 'Edition',
                    direction: 'ASC'
                };
                break;
            case 8:
                var code = '0';
                if (window.localStorage.getItem('BaFoLVL') == null) {
                    code = '0';
                } else {
                    code = window.localStorage.getItem('BaFoLVL');
                }
                return {
                    property: 'SortOffense' + code,
                    direction: 'ASC'
                };
                break;
            case 9:
                var code = '0';
                if (window.localStorage.getItem('BaFoLVL') == null) {
                    code = '0';
                } else {
                    code = window.localStorage.getItem('BaFoLVL');
                }
                return {
                    property: 'SortDefense' + code,
                    direction: 'ASC'
                };

                break;
            case 10:
                var code = 'en';
                if (window.localStorage.getItem('BaFoLNG') == null) {
                    code = 'en';
                } else {
                    code = window.localStorage.getItem('BaFoLNG');
                }
                return {
                    property: 'SortCategory' + code,
                    direction: 'ASC'
                };

                break;
            case 11:
                return{
                    property: 'Orbs',
                    direction: 'DESC'
                };
                break;
            case 12:
                return {
                    property: 'Color',
                    direction: 'DESC'
                };
                break;
            case 13:
                return {
                    property: 'Type',
                    direction: 'DESC'
                };
                break;
            case 14:
                return {
                    property: 'Cost',
                    direction: 'DESC'
                };
                break;
            case 15:
                var code = 'en';
                if (window.localStorage.getItem('BaFoLNG') == null) {
                    code = 'en';
                } else {
                    code = window.localStorage.getItem('BaFoLNG');
                }
                return  {
                    property: 'SortName' + code,
                    direction: 'DESC'
                };
                break;
            case 16:
                return {
                    property: 'Rarity',
                    direction: 'DESC'
                };
                break;
            case 17:
                return  {
                    property: 'Edition',
                    direction: 'DESC'
                };
                break;
            case 18:
                var code = '0';
                if (window.localStorage.getItem('BaFoLVL') == null) {
                    code = '0';
                } else {
                    code = window.localStorage.getItem('BaFoLVL');
                }
                return  {
                    property: 'SortOffense' + code,
                    direction: 'DESC'
                };
                break;
            case 19:
                var code = '0';
                if (window.localStorage.getItem('BaFoLVL') == null) {
                    code = '0';
                } else {
                    code = window.localStorage.getItem('BaFoLVL');
                }
                return {
                    property: 'SortDefense' + code,
                    direction: 'DESC'
                };

                break;
            case 20:
                var code = 'en';
                if (window.localStorage.getItem('BaFoLNG') == null) {
                    code = 'en';
                } else {
                    code = window.localStorage.getItem('BaFoLNG');
                }
                return  {
                    property: 'SortCategory' + code,
                    direction: 'DESC'
                };

                break;

        }
    },
    sortCardsStore: function (newValue) {
        newValue = JSON.parse(Ext.decode(newValue));
        var wstore = Ext.data.StoreManager.lookup("ApiCards");
        var me = this;
        var i = 0;
        var sortpart = [];
        for (i; i < newValue.length; i++) {
            sortpart.push(me.getSortValues(newValue[i]));
        }
        wstore.sort(sortpart);
    },
    cardsArrays: function () {
        var _appArray = {};
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

        var searchTypeNames = [
            'Rarity',
            'Rarity',
            'Rarity',
            'Rarity',
            'Affinity',
            'Affinity',
            'Affinity',
            'Affinity',
            'Affinity',
            'Type',
            'Type',
            'Type',
            'Color',
            'Color',
            'Color',
            'Color',
            'Color',
            'Color',
            'Color',
            'Color',
            'Color',
            'IsRanged',
            'IsRanged',
            'OffenseType',
            'OffenseType',
            'OffenseType',
            'OffenseType',
            'OffenseType',
            'DefenseType',
            'DefenseType',
            'DefenseType',
            'DefenseType',
            'Orbs',
            'Orbs',
            'Orbs',
            'Orbs',
            'Edition',
            'Edition',
            'Edition',
            'Edition'
        ];
        var searchTypeValues = [
            '0', '1', '2', '3',
            '-1', '0', '1', '2', '3',
            '0', '2', '3',
            '0', '1', '2', '3', '4', '8', '7', '5', '6',
            false, true,
            '0', '1', '2', '3', '4',
            '0', '1', '2', '3',
            '1', '2', '3', '4',
            '8', '4', '2', '1'
        ];

        _appArray.searchTypes = searchTypes;
        _appArray.searchTypeNames = searchTypeNames;
        _appArray.searchTypeValues = searchTypeValues;
        return _appArray;
    },
    searchTermsBuildUp: function (_appCardsSearchArray) {
        var me = this;
        var _appArray = me.cardsArrays();

        var searchTypes = _appArray.searchTypes;
        var searchTypeNames = _appArray.searchTypeNames;
        var searchTypeValues = _appArray.searchTypeValues;

        var _searchArray = {};
        var searchTerms1 = [];
        var searchTerms2 = [];
        var searchTerms3 = [];
        var searchTerms4 = [];
        var searchTerms5 = [];
        var searchTerms6 = [];
        var searchTerms7 = [];
        var searchTerms8 = [];
        var searchTerms9 = [];

        var i = 0;

        for (i; i < searchTypes.length; i++) {

            if (parseInt(_appCardsSearchArray[searchTypes[i]]) === 1) {
                if (searchTypeNames[i] == 'Rarity') {
                    searchTerms1.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'Type') {
                    searchTerms2.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'Affinity') {
                    searchTerms3.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'Color') {
                    searchTerms4.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'IsRanged') {
                    searchTerms5.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'OffenseType') {
                    searchTerms6.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'DefenseType') {
                    searchTerms7.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'Orbs') {
                    searchTerms8.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                } else if (searchTypeNames[i] == 'Edition') {
                    searchTerms9.push({field: searchTypeNames[i], value: searchTypeValues[i]});
                }
            }
        }

        _searchArray.searchTerms1 = searchTerms1;
        _searchArray.searchTerms2 = searchTerms2;
        _searchArray.searchTerms3 = searchTerms3;
        _searchArray.searchTerms4 = searchTerms4;
        _searchArray.searchTerms5 = searchTerms5;
        _searchArray.searchTerms6 = searchTerms6;
        _searchArray.searchTerms7 = searchTerms7;
        _searchArray.searchTerms8 = searchTerms8;
        _searchArray.searchTerms9 = searchTerms9;

        return _searchArray;

    },
    clearSearchAnddoCardSearchAuto: function (type, newValue) {
        var me = this;


        var _appArray = me.cardsArrays();
        var searchTypes = _appArray.searchTypes;

        var _appCardsSearchArray = {};

        var i = 0;
        for (i; i < searchTypes.length; i++) {
            _appCardsSearchArray[searchTypes[i]] = window.localStorage.getItem("_appCardsSearch" + searchTypes[i]);
            if (!me.testExists(_appCardsSearchArray[searchTypes[i]])) {

                var field = Ext.first("#searchfield" + searchTypes[i]);
                if (field) {
                    field.checked=false;
                }

                _appCardsSearchArray[searchTypes[i]] = 0;
            } else {
                window.localStorage.setItem("_appCardsSearch" + searchTypes[i], '');
                var field = Ext.first("#searchfield" + searchTypes[i]);
                if (field) {
                    field.checked=false;
                }
                _appCardsSearchArray[searchTypes[i]] = 0;
            }

        }
        var appCardsSearchQ = window.localStorage.getItem("_appCardsSearchQuery");
        if (!me.testExists(appCardsSearchQ)) {
            appCardsSearchQ = '';
            var field = Ext.first("#searchfieldquery");
            if (field) {
                field.setValue('');
            }

        } else {
            window.localStorage.setItem("_appCardsSearchQuery", '');
            appCardsSearchQ = '';
            var field = Ext.first("#searchfieldquery");
            if (field) {
                field.setValue('');
            }
        }
        var store = Ext.data.StoreManager.lookup("ApiCardsMain");
        var wstore = Ext.data.StoreManager.lookup("ApiCards");
        var range = wstore.getCount();
        var i = 0;
        var recordsToRemove = [];
        for (i; i < range; i++) {
            recordsToRemove.push(wstore.getAt(i));
        }
        wstore.remove(recordsToRemove);
        var dataview = Ext.first("#cardsdataview");

        var d = me.searchTermsBuildUp(_appCardsSearchArray);

        var searchTerms1 = d.searchTerms1;
        var searchTerms2 = d.searchTerms2;
        var searchTerms3 = d.searchTerms3;
        var searchTerms4 = d.searchTerms4;
        var searchTerms5 = d.searchTerms5;
        var searchTerms6 = d.searchTerms6;
        var searchTerms7 = d.searchTerms7;
        var searchTerms8 = d.searchTerms8;
        var searchTerms9 = d.searchTerms9;



        var records = store.queryRecordsBy(function (record, scope) {
            var data = record.getData();
            searchMeRec = data;

            if (appCardsSearchQ !== '') {

                if (me.findMatchingWordsByObj(data.Name, appCardsSearchQ) && me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9)) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9);

            }

        }, this);
        var cardsSearchCounter = Ext.first("#cardsSearchCounter");
        if (cardsSearchCounter) {
            if (records.length) {
                cardsSearchCounter.setText('' + parseInt(records.length) + '');
            } else {
                cardsSearchCounter.setText('' + parseInt(0) + '');
            }
        }

        wstore.add(records);
        me.doCardStoreSorting2();
        dataview.refresh();

        if (type == null && newValue == null) {
            me.isSharedCards();
        }

    },
    doCardSearch: function (type, newValue) {
        var me = this;
        if (type == null && newValue == null) {

        } else {
            window.localStorage.setItem("_appCardsSearch" + type, newValue);
        }

        var _appArray = me.cardsArrays();
        var searchTypes = _appArray.searchTypes;

        var _appCardsSearchArray = {};

        var i = 0;
        for (i; i < searchTypes.length; i++) {
            _appCardsSearchArray[searchTypes[i]] = window.localStorage.getItem("_appCardsSearch" + searchTypes[i]);
            if (!me.testExists(_appCardsSearchArray[searchTypes[i]])) {
                _appCardsSearchArray[searchTypes[i]] = 0;
            }
        }
        var appCardsSearchQ = window.localStorage.getItem("_appCardsSearchQuery");
        if (!me.testExists(appCardsSearchQ)) {
            appCardsSearchQ = '';
        }
        var store = Ext.data.StoreManager.lookup("ApiCardsMain");
        var wstore = Ext.data.StoreManager.lookup("ApiCards");
        var range = wstore.getCount();
        var i = 0;
        var recordsToRemove = [];
        for (i; i < range; i++) {
            recordsToRemove.push(wstore.getAt(i));
        }
        wstore.remove(recordsToRemove);
        var dataview = Ext.first("#cardsdataview");

        var d = me.searchTermsBuildUp(_appCardsSearchArray);

        var searchTerms1 = d.searchTerms1;
        var searchTerms2 = d.searchTerms2;
        var searchTerms3 = d.searchTerms3;
        var searchTerms4 = d.searchTerms4;
        var searchTerms5 = d.searchTerms5;
        var searchTerms6 = d.searchTerms6;
        var searchTerms7 = d.searchTerms7;
        var searchTerms8 = d.searchTerms8;
        var searchTerms9 = d.searchTerms9;



        var records = store.queryRecordsBy(function (record, scope) {
            var data = record.getData();
            searchMeRec = data;

            if (appCardsSearchQ !== '') {

                if (me.findMatchingWordsByObj(data.Name, appCardsSearchQ) && me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9)) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9);

            }

        }, this);
        var cardsSearchCounter = Ext.first("#cardsSearchCounter");
        if (cardsSearchCounter) {
            if (records.length) {
                cardsSearchCounter.setText('' + parseInt(records.length) + '');
            } else {
                cardsSearchCounter.setText('' + parseInt(0) + '');
            }
        }

        wstore.add(records);
        me.doCardStoreSorting2();
        dataview.refresh();

        if (type == null && newValue == null) {
            me.isSharedCards();
        }

    },
    doCardSearchAuto: function () {
        var me = this;


        var _appArray = me.cardsArrays();
        var searchTypes = _appArray.searchTypes;

        var _appCardsSearchArray = {};

        var i = 0;
        for (i; i < searchTypes.length; i++) {
            _appCardsSearchArray[searchTypes[i]] = window.localStorage.getItem("_appCardsSearch" + searchTypes[i]);
            if (!me.testExists(_appCardsSearchArray[searchTypes[i]])) {
                _appCardsSearchArray[searchTypes[i]] = 0;
            }
        }
        var appCardsSearchQ = window.localStorage.getItem("_appCardsSearchQuery");
        if (!me.testExists(appCardsSearchQ)) {
            appCardsSearchQ = '';
        }
        var store = Ext.data.StoreManager.lookup("ApiCardsMain");
        var wstore = Ext.data.StoreManager.lookup("ApiCards");
        var range = wstore.getCount();
        var i = 0;
        var recordsToRemove = [];
        for (i; i < range; i++) {
            recordsToRemove.push(wstore.getAt(i));
        }
        wstore.remove(recordsToRemove);
        var dataview = Ext.first("#cardsdataview");

        var d = me.searchTermsBuildUp(_appCardsSearchArray);

        var searchTerms1 = d.searchTerms1;
        var searchTerms2 = d.searchTerms2;
        var searchTerms3 = d.searchTerms3;
        var searchTerms4 = d.searchTerms4;
        var searchTerms5 = d.searchTerms5;
        var searchTerms6 = d.searchTerms6;
        var searchTerms7 = d.searchTerms7;
        var searchTerms8 = d.searchTerms8;
        var searchTerms9 = d.searchTerms9;



        var records = store.queryRecordsBy(function (record, scope) {
            var data = record.getData();
            searchMeRec = data;

            if (appCardsSearchQ !== '') {

                if (me.findMatchingWordsByObj(data.Name, appCardsSearchQ) && me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9)) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9);

            }

        }, this);
        var cardsSearchCounter = Ext.first("#cardsSearchCounter");
        if (cardsSearchCounter) {
            if (records.length) {
                cardsSearchCounter.setText('' + parseInt(records.length) + '');
            } else {
                cardsSearchCounter.setText('' + parseInt(0) + '');
            }
        }

        wstore.add(records);
        me.doCardStoreSorting2();
        dataview.refresh();

        var dataview2 = Ext.first("#cardstodeck");
        dataview2.refresh();

    },
    doCardStoreSorting: function (newValue) {
        window.localStorage.setItem("_appCardsSorting", newValue);
        var _appCardsSorting = window.localStorage.getItem("_appCardsSorting");
        if (!this.testExists(_appCardsSorting)) {
            _appCardsSorting = newValue;
        }
        this.sortCardsStore(newValue);

    },
    doCardStoreSorting2: function () {

        var _appCardsSorting = window.localStorage.getItem("_appCardsSorting");
        if (!this.testExists(_appCardsSorting)) {
            _appCardsSorting = JSON.stringify(Ext.encode([5]));
        }
        this.sortCardsStore(_appCardsSorting);

    },
    setVisibleCount: function () {
        var me = this;
        var _appArray = me.cardsArrays();
        var searchTypes = _appArray.searchTypes;
        var _appCardsSearchArray = {};

        var i = 0;
        for (i; i < searchTypes.length; i++) {
            _appCardsSearchArray[searchTypes[i]] = window.localStorage.getItem("_appCardsSearch" + searchTypes[i]);
            if (!_app.testExists(_appCardsSearchArray[searchTypes[i]])) {
                _appCardsSearchArray[searchTypes[i]] = 0;
            }
        }
        var appCardsSearchQ = window.localStorage.getItem("_appCardsSearchQuery");
        if (!_app.testExists(appCardsSearchQ)) {
            appCardsSearchQ = '';
        }
        var store = Ext.data.StoreManager.lookup("ApiCardsMain");

        var d = me.searchTermsBuildUp(_appCardsSearchArray);

        var searchTerms1 = d.searchTerms1;
        var searchTerms2 = d.searchTerms2;
        var searchTerms3 = d.searchTerms3;
        var searchTerms4 = d.searchTerms4;
        var searchTerms5 = d.searchTerms5;
        var searchTerms6 = d.searchTerms6;
        var searchTerms7 = d.searchTerms7;
        var searchTerms8 = d.searchTerms8;
        var searchTerms9 = d.searchTerms9;

        var records = store.queryRecordsBy(function (record, scope) {
            var data = record.getData();
            searchMeRec = data;

            if (appCardsSearchQ !== '') {

                if (_app.findMatchingWordsByObj(data.Name, appCardsSearchQ) && me.buildFiltering(searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9)) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return me.buildFiltering(searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9);

            }

        }, this);


        return '' + parseInt(records.length) + '';

    },
    buildFiltering: function (data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9) {
        var me = this;

        if ((searchTerms1 && searchTerms1.length) === 0 &&
                (searchTerms2 && searchTerms2.length) === 0 &&
                (searchTerms3 && searchTerms3.length) === 0 &&
                (searchTerms4 && searchTerms4.length) === 0 &&
                (searchTerms5 && searchTerms5.length) === 0 &&
                (searchTerms6 && searchTerms6.length) === 0 &&
                (searchTerms7 && searchTerms7.length) === 0 &&
                (searchTerms9 && searchTerms9.length) === 0 &&
                (searchTerms8 && searchTerms8.length) === 0) {
            return true;
        } else {
            if (((searchTerms1 && searchTerms1.length) > 0 ? searchTerms1.some(me.testValues, data) : true) &&
                    ((searchTerms2 && searchTerms2.length) > 0 ? searchTerms2.some(me.testValues, data) : true) &&
                    ((searchTerms3 && searchTerms3.length) > 0 ? searchTerms3.some(me.testValues, data) : true) &&
                    ((searchTerms4 && searchTerms4.length) > 0 ? searchTerms4.some(me.testValues, data) : true) &&
                    ((searchTerms5 && searchTerms5.length) > 0 ? searchTerms5.some(me.testValues, data) : true) &&
                    ((searchTerms6 && searchTerms6.length) > 0 ? searchTerms6.some(me.testValues, data) : true) &&
                    ((searchTerms7 && searchTerms7.length) > 0 ? searchTerms7.some(me.testValues, data) : true) &&
                    ((searchTerms9 && searchTerms9.length) > 0 ? searchTerms9.some(me.testValues, data) : true) &&
                    ((searchTerms8 && searchTerms8.length) > 0 ? searchTerms8.some(me.testValues, data) : true)) {
                return true;
            } else {
                return false;
            }
        }

    },
    testValues: function (a, b, c) {
        var code = '0';
        if (window.localStorage.getItem('BaFoLVL') == null) {
            code = '0';
        } else {
            code = window.localStorage.getItem('BaFoLVL');
        }

        var codeword = 'None';
        if (code == '0') {
            codeword = 'None';
        } else if (code == '1') {
            codeword = 'One';
        } else if (code == '2') {
            codeword = 'Two';
        } else if (code == '3') {
            codeword = 'Three';
        }

        if (a.field) {
            if (a.field == 'Rarity') {

                if (searchMeRec.Rarity == a.value) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'Type') {
                if (searchMeRec.Type == a.value) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'Affinity') {
                if (searchMeRec.Affinity == a.value) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'Color') {
                if (parseInt(searchMeRec.Color) === parseInt(a.value)) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'DefenseType') {

                if (searchMeRec.DefenseType[codeword] == a.value && searchMeRec.Defense[codeword] > 0) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'OffenseType') {
                if (searchMeRec.OffenseType[codeword] == a.value && searchMeRec.Offense[codeword] > 0) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'IsRanged') {
                if (searchMeRec.IsRanged === a.value && searchMeRec.Offense[codeword] > 0 && (a.value ? searchMeRec.Type == 2 : searchMeRec.Type == 2)) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'Edition') {
                if (searchMeRec.Edition == a.value) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'Orbs') {

                if (searchMeRec.OrbInfo) {

                    if (parseInt(searchMeRec.Orbs) === parseInt(a.value)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

        } else {
            return true;
        }
    },
    loadDataStoreAndInsertData: function (storeid, storename, data) {
        try {

            var store = Ext.data.StoreManager.lookup(storeid);
            if ((typeof store) === "undefined" || store === null) {
                store = Ext.create(storename, {});
            }


            store.setData(data);
            return store;
        } catch (err) {
            _app.alertUser(err.message, 'System error');

        }
    },
    testOldEditor: function () {
        var isIt = (window.localStorage.getItem('ApiDeckToEditId') != '' ? true : false);
        if (isIt) {

            if (window.localStorage.getItem('ApiDecks') == null) {
                window.localStorage.setItem('ApiDecks', JSON.stringify(Ext.encode([])));
            }
            var ApiDecks = Ext.decode(JSON.parse(window.localStorage.getItem('ApiDecks')));



            i = 0, cards = [];
            for (i; i < ApiDecks.length; i++) {
                if (ApiDecks[i].name == window.localStorage.getItem('ApiDeckToEditId')) {

                    var data = ApiDecks[i];
                    var recordsToRemove = [];
                    var recordsToAdd = [];

                    var cards = data.cards;
                    var wstore = Ext.data.StoreManager.lookup("ApiCardsToDeck");

                    var recordsToRemove = [];
                    var range = wstore.getRange();
                    var i = 0;
                    for (i; i < range.length; i++) {
                        recordsToRemove.push(wstore.getAt(i));

                    }
                    wstore.remove(recordsToRemove);

                    for (i; i < cards.length; i++) {
                        var card = cards[i];
                        card.sequence = i;
                        recordsToAdd.push(card);
                    }
                    wstore.add(recordsToAdd);
                    var decktobuildname = Ext.first('#decktobuildname');
                    decktobuildname.setReadOnly(false),
                            decktobuildname.setValue('');
                }
            }



            var dataview = Ext.first("#cardstodeck");
            dataview.refresh();

            var dataview2 = Ext.first("#cardsdataview");
            dataview2.refresh();


        }
    },
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
                function (choice) {
                    if (choice === 'yes') {
                        window.location.reload();
                    }
                }
        );
    },
    /*editor functions*/
    sortCardsStoreEditor: function (newValue) {

        var wstore = Ext.data.StoreManager.lookup("ApiCardsEditorMain");

        newValue = JSON.parse(Ext.decode(newValue));

        var me = this;
        var i = 0;
        var sortpart = [];
        for (i; i < newValue.length; i++) {
            sortpart.push(me.getSortValues(newValue[i]));
        }
        wstore.sort(sortpart);
    },
    doCardSearchEditor: function (type, newValue) {
        var me = this;
        if (type == null && newValue == null) {

        } else {
            window.localStorage.setItem("_appCardsSearchEditor" + type, newValue);
        }

        var _appArray = me.cardsArrays();
        var searchTypes = _appArray.searchTypes;

        var _appCardsSearchArray = {};

        var i = 0;
        for (i; i < searchTypes.length; i++) {
            _appCardsSearchArray[searchTypes[i]] = window.localStorage.getItem("_appCardsSearchEditor" + searchTypes[i]);
            if (!me.testExists(_appCardsSearchArray[searchTypes[i]])) {
                _appCardsSearchArray[searchTypes[i]] = 0;
            }
        }
        var appCardsSearchQ = window.localStorage.getItem("_appCardsSearchEditorQuery");
        if (!me.testExists(appCardsSearchQ)) {
            appCardsSearchQ = '';
        }
        var store = Ext.data.StoreManager.lookup("ApiCardsMain");
        var wstore = Ext.data.StoreManager.lookup("ApiCardsEditorMain");
        var range = wstore.getCount();
        var i = 0;
        var recordsToRemove = [];
        for (i; i < range; i++) {
            recordsToRemove.push(wstore.getAt(i));
        }
        wstore.remove(recordsToRemove);


        var d = me.searchTermsBuildUp(_appCardsSearchArray);

        var searchTerms1 = d.searchTerms1;
        var searchTerms2 = d.searchTerms2;
        var searchTerms3 = d.searchTerms3;
        var searchTerms4 = d.searchTerms4;
        var searchTerms5 = d.searchTerms5;
        var searchTerms6 = d.searchTerms6;
        var searchTerms7 = d.searchTerms7;
        var searchTerms8 = d.searchTerms8;



        var records = store.queryRecordsBy(function (record, scope) {
            var data = record.getData();
            searchMeRec = data;

            if (appCardsSearchQ !== '') {

                if (me.findMatchingWords(data.Name, appCardsSearchQ) && me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8)) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return me.buildFiltering(data, searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8);

            }

        }, this);
        var cardsSearchCounter = Ext.first("#cardsSearchCounterEditor");
        if (cardsSearchCounter) {
            if (records.length) {
                cardsSearchCounter.setText('' + parseInt(records.length) + '');
            } else {
                cardsSearchCounter.setText('' + parseInt(0) + '');
            }
        }

        wstore.add(records);
        me.doCardStoreSorting2Editor();

    },
    doCardStoreSorting2Editor: function () {
        var _appCardsSorting = window.localStorage.getItem("_appCardsSortingEditor");
        if (!this.testExists(_appCardsSorting)) {
            _appCardsSorting = JSON.stringify(Ext.encode([5]));
        }

        this.sortCardsStoreEditor(_appCardsSorting);

    },
    /*editor functions end*/
    /*language functions*/
    getLngCode: function () {
        var code = 'en';
        if (window.localStorage.getItem('BaFoLNG') == null) {
            code = 'en';
        } else {
            code = window.localStorage.getItem('BaFoLNG');
        }
        return code;


    },
    getLngString: function (str) {
        var code = 'en';
        var strcode = str;
        if (window.localStorage.getItem('BaFoLNG') == null) {
            code = 'en';
        } else {
            code = window.localStorage.getItem('BaFoLNG');
        }
        strcode = strcode.replace(/\s+/g, '');

        if (this.testExists(apptranslations[code.toLowerCase()])) {
            if (this.testExists(apptranslations[code.toLowerCase()][strcode.toLowerCase()])) {
                return apptranslations[code.toLowerCase()][strcode.toLowerCase()];
            } else {
                console.info('fallback to en', strcode, str);
                if (this.testExists(apptranslations['en'][strcode.toLowerCase()])) {
                    return apptranslations['en'][strcode.toLowerCase()];
                } else {
                    console.info('fallback to original string', str);
                    return str;
                }
            }
        }


    }
    /*language functions end*/
});
  