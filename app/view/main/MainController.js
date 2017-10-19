/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('slrcards.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainc',
    config: {
        routes: {
            'card:id': {
                action: 'showCardData',
                before: 'beforeShowCardData',
                conditions: {
                    ':id': '(?:(?::){1}([%a-zA-Z0-9\-\_\s,]+))?'
                }
            }
        }
    },
    beforeShowCardData: function (id, action) {

        return true;
    },
    showCardData: function (id, action) {
        return true;
    },
    setSharedCardWindow: function (id, action) {
        setTimeout(function () {
            var store = Ext.data.StoreManager.lookup("ApiCardsMain");
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
                            RarityText = ('Common');
                            break;
                        case 1:
                            RarityText = ('UnCommon');
                            break;
                        case 2:
                            RarityText = ('Rare');
                            break;
                        case 3:
                            RarityText = ('Ultra rare');
                            break;
                    }
                    var AffinityText = '';
                    switch (raw.Affinity) {
                        case -1:
                            AffinityText = ('None');
                            break;
                        case 0:
                            AffinityText = ('Frost');
                            break;
                        case 1:
                            AffinityText = ('Fire');
                            break;
                        case 2:
                            AffinityText = ('Nature');
                            break;
                        case 3:
                            AffinityText = ('Shadow');
                            break;
                    }
                    var TypeText = '';
                    switch (raw.Type) {
                        case 0:
                            TypeText = ('Spell');
                            break;
                        case 2:
                            TypeText = ('Creature');
                            break;
                        case 3:
                            TypeText = ('Building');
                            break;
                    }


//                    infoPanels.push({
//                        style: 'padding-right:10px;background-color:#5fa2dd;',
//                        html: '<img style="background-color:#5fa2dd;width:100%;background-size:cover;background-image:url(\' img?units|' + raw.Image.ObjectID + '|png|90|350|500\');" src="img/units/e.png" />'
//                    });
                    infoPanels.push(
                            {
                                layout: 'hbox',
                                style: "background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                margin: 3,
                                padding: 2,
                                items: [
                                    {
                                        html: '<img style="background-color:#5fa2dd;width:100%;background-size:cover;background-image:url(\' img?units|' + raw.Image.ObjectID + '|png|90|350|500\');" src="img/units/e.png" />',
                                        width: '33%',
                                        height: 345
                                    },
                                    {
                                        items: [
                                            {
                                                width: '100%',
                                                style: 'padding-right:10px;background-color:#5fa2dd;',
                                                items: [
                                                    {
                                                        layout: 'hbox',
                                                        style: "margin-right:10px;background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                html: 'Category',
                                                                width: '33%'
                                                            },
                                                            {
                                                                itemId: "cardinfoCategory",
                                                                style: "text-align:right;",
                                                                html: raw.Category,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                html: 'Cost',
                                                                width: '33%'
                                                            },
                                                            {
                                                                itemId: "cardinfoCost",
                                                                style: "text-align:right;",
                                                                html: raw.Cost,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                html: 'Affinity',
                                                                width: '33%'
                                                            },
                                                            {
                                                                itemId: "cardinfoAffinity",
                                                                style: "text-align:right;",
                                                                html: AffinityText,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                html: 'Offense',
                                                                width: '33%'
                                                            },
                                                            {
                                                                itemId: "cardinfoOffense",
                                                                style: "text-align:right;",
                                                                html: raw.Offense,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                html: 'Defense',
                                                                width: '33%'
                                                            },
                                                            {
                                                                itemId: "cardinfoDefense",
                                                                style: "text-align:right;",
                                                                html: raw.Defense,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                html: 'Rarity',
                                                                width: '33%'
                                                            },
                                                            {
                                                                itemId: "cardinfoRarity",
                                                                style: "text-align:right;",
                                                                html: RarityText,
                                                                width: '66%'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        layout: 'hbox',
                                                        style: "background-color:#fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;",
                                                        margin: 3,
                                                        padding: 2,
                                                        items: [
                                                            {
                                                                html: 'Type',
                                                                width: '33%'
                                                            },
                                                            {
                                                                itemId: "cardinfoType",
                                                                style: "text-align:right;",
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


                    var abilityPanels = [];

                    var Abilities = raw.Abilities;
                    if (Abilities.length > 0) {
                        var i = 0;

                        for (i; i < Abilities.length; i++) {
                            var Ability = Abilities[i];

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
                            abilityPanels.push(myPanel);
                        }

                        infoPanels.push({
                            xtype: "panel",
                            title: "Abilities",
                            ui: 'blue'
                        });
                        infoPanels.push({
                            itemId: "cardinfoAbilities",
                            items: abilityPanels
                        });

                    }
                    var upgradePanels = [];
                    var Upgrades = raw.Upgrades;
                    var i = 0;



                    if (Upgrades.length > 0) {
                        var testUpgradeContent = 0;
                        for (i; i < Upgrades.length; i++) {
                            var Upgrade = Upgrades[i];

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
                                upgradePanels[(Upgrade.Era - 1)] = myPanel;
                                testUpgradeContent++;
                            }
                        }
                        if (testUpgradeContent > 0) {

                            infoPanels.push({
                                xtype: "panel",
                                title: "Upgrades",
                                ui: 'blue'

                            });
                            infoPanels.push({
                                itemId: "cardinfoUpgrades",
                                items: upgradePanels
                            });
                        }
                    }
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
        }, 1000);
    },
    loadPreviousMapInfo: function (mrecord, mindex) {
        var mapData = mrecord.getData();
        var wstore = Ext.data.StoreManager.lookup("ApiMapsMain");

        var range = wstore.getRange();
        var i = 0;

        for (i; i < range.length; i++) {
            var srec = wstore.getAt(i).getData();
            if (srec.mapId === mapData.mapId) {
                var srecp = wstore.getAt(i - 1);
                if (srecp) {
                    var dataview = Ext.first("#mapdata");
                    dataview.mrecord = srecp;
                    document.title = 'Battleforge map ' + srecp.getData().Name;
                    this.loadMapInfo(null, srecp, null, null, null, null);
                } else {

                    var srecp2 = wstore.getAt(range.length - 1);
                    if (srecp2) {
                        var dataview = Ext.first("#mapdata");
                        dataview.mrecord = srecp2;
                        document.title = 'Battleforge map ' + srecp2.getData().Name;
                        this.loadMapInfo(null, srecp2, null, null, null, null);
                    }
                }
                break;
            }
        }

    },
    loadNextMapInfo: function (mrecord, mindex) {
        var mapData = mrecord.getData();
        var wstore = Ext.data.StoreManager.lookup("ApiMapsMain");

        var range = wstore.getRange();
        var i = 0;

        for (i; i < range.length; i++) {
            var srec = wstore.getAt(i).getData();
            if (srec.mapId === mapData.mapId) {
                var srecn = wstore.getAt(i + 1);
                if (srecn) {
                    var dataview = Ext.first("#mapdata");
                    dataview.mrecord = srecn;
                    document.title = 'Battleforge map ' + srecn.getData().Name;
                    this.loadMapInfo(null, srecn, null, null, null, null);
                } else {
                    var srecn2 = wstore.getAt(0);
                    if (srecn2) {
                        var dataview = Ext.first("#mapdata");
                        dataview.mrecord = srecn2;
                        document.title = 'Battleforge map ' + srecn2.getData().Name;
                        this.loadMapInfo(null, srecn2, null, null, null, null);
                    }
                }
                break;
            }
        }

//        console.info(mrecord, mindex);
    },
    loadMapInfo: function (el, record, target, index, e, eOpts) {

        var mapData = record.getData();
        var mapinfoContainer = Ext.first("#mapinfoContainer");
        var htmlBuildUp = [];

        htmlBuildUp.push('<div class="map-main-main-container">');


        htmlBuildUp.push('<div class="map-main-info"><h2>Map ' + mapData.Name + '</h2><h3>Campaign ' + mapData.Campaign + '</h3><p>' + mapData.Description + '</p></div>');



        var Prerequisites = mapData.Prerequisite;
        var x;
        var ispr = 0;
        htmlBuildUp.push('<div class="map-main-prerequisites"><h2>Prerequisites</h2>');
        for (x in  Prerequisites) {
            htmlBuildUp.push('<p>' + Prerequisites[x] + '</p>');
            ispr++;
        }
        if (ispr === 0) {
            htmlBuildUp.push('<p>None</p>');
        }
        htmlBuildUp.push('</div>');


        var Goals = mapData.Goals;
        var gx;
        htmlBuildUp.push('<div class="map-main-goals"><h2>Goals</h2>');
        for (gx in  Goals) {
            htmlBuildUp.push('<p>' + Goals[gx] + '</p>');
        }
        htmlBuildUp.push('</div>');


        var Unlocks = mapData.Unlocks;
        var ux;
        var isu = 0;
        htmlBuildUp.push('<div class="map-main-unlocks"><h2>Unlocks</h2>');
        for (ux in  Unlocks) {
            htmlBuildUp.push('<p>' + Unlocks[ux] + '</p>');
            isu++;
        }
        if (isu === 0) {
            htmlBuildUp.push('<p>Nothing</p>');
        }
        htmlBuildUp.push('</div>');


        var Difficulties = mapData.Difficulties;
        var dx;
        htmlBuildUp.push('<div class="map-main-difficulties"><h2>Difficulties</h2>');
        for (dx in  Difficulties) {
            htmlBuildUp.push('<p>' + Difficulties[dx] + '</p>');
        }
        htmlBuildUp.push('</div>');
        htmlBuildUp.push('<div style="clear:both"></div>');


        var dx2;
        var difnr = 0;
        for (dx2 in  Difficulties) {
            difnr++;
            htmlBuildUp.push('<div class="map-main-loot"><h2>Loot ' + Difficulties[dx2] + '</h2>');
            var loot = mapData[Difficulties[dx2]];
            var i = 0;
            for (i; i < loot.length; i++) {
                var Loot = loot[i];
                htmlBuildUp.push('<p>' + Loot.CardName + '</p>');



            }



            htmlBuildUp.push('</div>');

            if (difnr < 3) {
                htmlBuildUp.push('<div class="loot-spacer"><br><br></div>');
            }

        }

        htmlBuildUp.push('</div>');

        htmlBuildUp.push('<div class="map-main-info-image"><img style="width:100%" src="img/?map|' + mapData.Map.ObjectID + '|jpeg|90|500|5000" /></div>');


        mapinfoContainer.setHtml(htmlBuildUp.join(''));
    },
    startEditingDeck: function (obj) {

        var el = obj.el;
        var record = obj.record;
        var target = obj.target;
        var index = obj.index;
        var e = obj.e;
        var eOpts = obj.eOpts;

        var data = record.getData();

        window.localStorage.setItem('ApiDeckToEditId', data.name);
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
        var dataview = Ext.first("#cardstodeck");
        dataview.refresh();

        var dataview2 = Ext.first("#cardsdataview");
        dataview2.refresh();
        if (_overlay) {
            _overlay.destroy(this);
            _overlay = null;
        }
        if (_actionsheet) {
            _actionsheet.destroy(this);
            _actionsheet = null;
        }
        var decktobuildname = Ext.first('#decktobuildname');
        decktobuildname.setReadOnly(window.localStorage.getItem('ApiDeckToEditId') != '' ? true : false),
                decktobuildname.setValue(window.localStorage.getItem('ApiDeckToEditId') != '' ? window.localStorage.getItem('ApiDeckToEditId') : '');

    },
    deleteDeck: function (obj) {
        var el = obj.el;
        var record = obj.record;
        var target = obj.target;
        var index = obj.index;
        var e = obj.e;
        var eOpts = obj.eOpts;
        var ApiDecks = Ext.decode(JSON.parse(window.localStorage.getItem('ApiDecks')));
        var decks = [], deckD = record.getData(), i = 0, cards = [];
        for (i; i < ApiDecks.length; i++) {
            if (ApiDecks[i].name == deckD.name) {

            } else {
                decks.push(ApiDecks[i]);
            }
            window.localStorage.setItem('ApiDecks', JSON.stringify(Ext.encode(decks)));
        }
        if (_overlay) {
            _overlay.destroy(this);
            _overlay = null;
        }
        this.loadMyDecks();
    },
    loadMyDecks: function () {
        var wstore = Ext.data.StoreManager.lookup("ApiDecks");
        if (window.localStorage.getItem('ApiDecks') == null) {
            window.localStorage.setItem('ApiDecks', JSON.stringify(Ext.encode([])));
        }
        var ApiDecks = Ext.decode(JSON.parse(window.localStorage.getItem('ApiDecks')));

        var decks = [];
        var i = 0;
        for (i; i < ApiDecks.length; i++) {
            decks.push(ApiDecks[i]);
        }
        var dataview = Ext.first("#decksdata");

        var range = wstore.getRange();
        var i = 0;
        var recordsToRemove = [];
        for (i; i < range.length; i++) {
            recordsToRemove.push(wstore.getAt(i));

        }
        wstore.remove(recordsToRemove);


        wstore.add(decks);



        dataview.refresh();
    },
    saveDeckData: function (btn) {
        var decks = [];
        var deck = {};
        var wstore = Ext.data.StoreManager.lookup("ApiCardsToDeck");
        if (window.localStorage.getItem('ApiDecks') == null) {
            window.localStorage.setItem('ApiDecks', JSON.stringify(Ext.encode([])));
        }
        var ApiDecks = Ext.decode(JSON.parse(window.localStorage.getItem('ApiDecks')));
        if (ApiDecks.length > 100) {

            Ext.toast(
                    {
                        html: 'You can only create 100 decks.',
                        title: 'Deck limit reached',
                        width: 600,
                        align: 't'
                    }
            );
        } else {
            var i = 0;
            var testOld = (window.localStorage.getItem('ApiDeckToEditId') != '' ? true : false);
            var oldDeckId = 0, oldDeckData = null;
            for (i; i < ApiDecks.length; i++) {
                if (testOld && ApiDecks[i].name == window.localStorage.getItem('ApiDeckToEditId')) {
                    oldDeckId = ApiDecks[i].deckId;
                    oldDeckData = ApiDecks[i];

                }
            }

            if (oldDeckId < 1)
            {

                var i = 0;
                for (i; i < ApiDecks.length; i++) {
                    decks.push(ApiDecks[i]);
                }
                var decktobuildname = Ext.first('#decktobuildname');
                var decktitle = decktobuildname.getValue();

                if (decktitle) {
                    deck.name = decktobuildname.getValue();
                    deck.deckId = (ApiDecks.length + 1);
                    deck.cards = [];
                    wstore.sort([
                        {
                            property: 'sequence',
                            direction: 'ASC'
                        }
                    ]);
                    var range = wstore.getRange();

                    if (range.length > 0) {

                        var i = 0;
                        for (i; i < range.length; i++) {
                            var record = wstore.getAt(i);
                            var data = record.getData();
                            deck.cards.push(data);

                        }

                        decks.push(deck);

                        window.localStorage.setItem('ApiDecks', JSON.stringify(Ext.encode(decks)));


                        var recordsToRemove = [];
                        var range = wstore.getRange();
                        var i = 0;
                        for (i; i < range.length; i++) {
                            recordsToRemove.push(wstore.getAt(i));

                        }
                        wstore.remove(recordsToRemove);

                        var dataview = Ext.first("#cardstodeck");
                        dataview.refresh();

                        var dataview2 = Ext.first("#cardsdataview");
                        dataview2.refresh();

                        window.localStorage.setItem('ApiDeckToEditId', '');
                        Ext.toast(
                                {
                                    html: 'Deck data saved',
                                    title: 'Saved',
                                    width: 600,
                                    align: 't'
                                }
                        );

                    } else {

                        Ext.toast(
                                {
                                    html: 'Decks needs to have cards in.',
                                    title: 'Cards missing',
                                    width: 600,
                                    align: 't'
                                }
                        );





                    }
                } else {
                    Ext.toast(
                            {
                                html: 'Deck needs to have name.',
                                title: 'Missing name',
                                width: 600,
                                align: 't'
                            }
                    );



                }

            } else {

                var decktitle = oldDeckData.name;

                if (decktitle)
                {

                    oldDeckData.cards = [];
                    var range = wstore.getRange();
                    if (range.length > 0) {
                        var i = 0;
                        for (i; i < range.length; i++) {
                            var record = wstore.getAt(i);
                            var data = record.getData();

                            oldDeckData.cards.push(data);

                        }
                        var i = 0;
                        for (i; i < ApiDecks.length; i++) {
                            if (testOld && ApiDecks[i].name != window.localStorage.getItem('ApiDeckToEditId')) {
                                decks.push(ApiDecks[i]);
                            } else if (!testOld) {
                                decks.push(ApiDecks[i]);
                            } else if (testOld && ApiDecks[i].name == window.localStorage.getItem('ApiDeckToEditId')) {
                                decks.push(oldDeckData);
                            }
                        }





                        window.localStorage.setItem('ApiDecks', JSON.stringify(Ext.encode(decks)));


                        var recordsToRemove = [];
                        var range = wstore.getRange();
                        var i = 0;
                        for (i; i < range.length; i++) {
                            recordsToRemove.push(wstore.getAt(i));

                        }
                        wstore.remove(recordsToRemove);
                        window.localStorage.setItem('ApiDeckToEditId', '');
                        var decktobuildname = Ext.first('#decktobuildname');
                        decktobuildname.setReadOnly(false),
                                decktobuildname.setValue('');
                    } else {

                        Ext.toast(
                                {
                                    html: 'Decks needs to have cards in.',
                                    title: 'Cards missing',
                                    width: 600,
                                    align: 't'
                                }
                        );
                    }
                } else {
                    Ext.toast(
                            {
                                html: 'Deck needs to have name.',
                                title: 'Missing name',
                                width: 600,
                                align: 't'
                            }
                    );
                }

            }


        }
    },
    testExists: function (item) {
        if ((typeof item) === "undefined" || item === null) {
            return false;
        } else {
            return true;
        }
    },
    testStringQ: function () {
        var val = window.localStorage.getItem("_appCardsSearchQuery");
        if (!this.testExists(val)) {
            val = '';
        } else {
            return val;
        }

    },
    testSort: function () {
        var _appCardsSorting = window.localStorage.getItem("_appCardsSorting");
        if (!this.testExists(_appCardsSorting)) {
            _appCardsSorting = JSON.stringify(Ext.encode([5]));
        }
        return _appCardsSorting;
    },
    testCheck: function (type) {

        var val = window.localStorage.getItem("_appCardsSearch" + type);
        if (!this.testExists(val)) {
            val = 0;
        } else {
            val = parseInt(val);
        }
        if (val === 1) {
            return true;
        } else {
            return false;
        }
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
    doCardStoreSorting: function (newValue) {
        window.localStorage.setItem("_appCardsSorting", newValue);
        var _appCardsSorting = window.localStorage.getItem("_appCardsSorting");
        if (!this.testExists(_appCardsSorting)) {
            _appCardsSorting = newValue;
        }
        _app.sortCardsStore(newValue);

    },
    setVisibleCount: function () {
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

                if (_app.findMatchingWords(data.Name, appCardsSearchQ) && me.buildFiltering(searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8, searchTerms9)) {
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
                if (searchMeRec.IsRanged === a.value && searchMeRec.Offense[codeword] > 0) {
                    return true;
                } else {
                    return false;
                }
            } else if (a.field == 'Edition') {
                if (searchMeRec.Edition === a.value) {
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
    testStringQEditor: function () {
        var val = window.localStorage.getItem("_appCardsSearchEditorQuery");
        if (!this.testExists(val)) {
            val = '';
        } else {
            return val;
        }

    },
    testSortEditor: function () {
        var _appCardsSorting = window.localStorage.getItem("_appCardsSortingEditor");
         if (!this.testExists(_appCardsSorting)) {
            _appCardsSorting = JSON.stringify(Ext.encode([5]));
        }
        return _appCardsSorting;
    },
    testCheckEditor: function (type) {

        var val = window.localStorage.getItem("_appCardsSearchEditor" + type);
        if (!this.testExists(val)) {
            val = 0;
        } else {
            val = parseInt(val);
        }
        if (val === 1) {
            return true;
        } else {
            return false;
        }
    },
    doCardStoreSortingEditor: function (newValue) {
        window.localStorage.setItem("_appCardsSortingEditor", newValue);
        var _appCardsSorting = window.localStorage.getItem("_appCardsSortingEditor");
        if (!this.testExists(_appCardsSorting)) {
            _appCardsSorting = newValue;
        }
        _app.sortCardsStoreEditor(newValue);

    },
    setVisibleCountEditor: function () {
        var me = this;
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

                if (_app.findMatchingWords(data.Name, appCardsSearchQ) && me.buildFiltering(searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8)) {
                    return true;
                } else {
                    return false;
                }

            } else {
                return me.buildFiltering(searchTerms1, searchTerms2, searchTerms3, searchTerms4, searchTerms5, searchTerms6, searchTerms7, searchTerms8);

            }

        }, this);


        return '' + parseInt(records.length) + '';

    }
});
