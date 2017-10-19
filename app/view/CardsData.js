var w = 0;
var h = 0;
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
 
var infoPanelsTip = {};
var srtMyCardsM = false, delMyCardsM = false;
Ext.define("slrcards.view.CardsData", {
    extend: "Ext.view.View",
    alias: "widget.cardsdataview",
    xtype: "cardsdataview",
    itemId: "cardsdataview",
    requires: [
    ],
    controller: 'mainc',
    viewModel: 'mainm',
    initComponent: function () {

        var meview = this;
        Ext.apply(this, {
            viewConfig: {
                preserveScrollOnRefresh: true,
                'boxready': function (thisGrid) {
                    thisGrid.view.focus = Ext.emptyFn;
                }

            },
            focusable: false,
            itemSelector: 'div.carditem',
            multiSelect: true,
            style: "background-color:transparent !important;",
            loadingText: meview.getLngString("Please wait loading data"),
            store: {'type': "ApiCards"},
            itemTpl: new Ext.XTemplate('<div class="carditem card{cardId} cardtip{cardId} {[this.findInSelection(values)]}" id="carditem{cardId}"   style="float:left;width:{[this.width()]}">\n\
                <img class="carditem" style="width:100%;background-size:cover;background-image:url(\' {[this.image(values)]}\');background-position: no-repeat center center;" src="img/units/e.png" /> \n\
            </div>',
                    {
                        image: function (data) {

                            return 'img/?units|' + data.Image.ObjectID + '|png|90|200|350';
                        },
                        width: function () {

                            var numinline = 8;
                            if (w > 1800) {
                                numinline = 8;
                            } else if (w > 1400 && w < 1801) {
                                numinline = 7;
                            } else if (w > 1200 && w < 1401) {
                                numinline = 6;
                            } else {
                                numinline = 5;
                            }
                            var calc = 100 / numinline;
                            return (calc - 0.15) + '%';
                        },
                        findInSelection: function (data) {
                            var wstore = Ext.data.StoreManager.lookup("ApiCardsToDeck");
                            var card = wstore.getById(data.cardId);

                            if (card) {
                                return 'main-card-transparent';
                            } else {
                                return'';
                            }
                        }
                    }),
            listeners: {
                itemmouseenter: function (el, record, item, index, e, eOpts) {

                    var raw = record.getData();

                    var infoPanels = [];

                    var RarityText = '';
                    switch (raw.Rarity) {
                        case 0:
                            RarityText = meview.getLngString('Common');
                            break;
                        case 1:
                            RarityText = meview.getLngString('UnCommon');
                            break;
                        case 2:
                            RarityText = meview.getLngString('Rare');
                            break;
                        case 3:
                            RarityText = meview.getLngString('Ultra rare');
                            break;
                    }
                    var AffinityText = '';
                    switch (raw.Affinity) {
                        case -1:
                            AffinityText = meview.getLngString('None');
                            break;
                        case 0:
                            AffinityText = meview.getLngString('Frost');
                            break;
                        case 1:
                            AffinityText = meview.getLngString('Fire');
                            break;
                        case 2:
                            AffinityText = meview.getLngString('Nature');
                            break;
                        case 3:
                            AffinityText = meview.getLngString('Shadow');
                            break;
                    }
                    var TypeText = '';
                    switch (raw.Type) {
                        case 0:
                            TypeText = meview.getLngString('Spell');
                            break;
                        case 2:
                            TypeText = meview.getLngString('Creature');
                            break;
                        case 3:
                            TypeText = meview.getLngString('Building');
                            break;
                    }

                    var lcode = 'en';
                    if (window.localStorage.getItem('BaFoLNG') == null) {
                        lcode = 'en';
                    } else {
                        lcode = window.localStorage.getItem('BaFoLNG');
                    }
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

                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Share Url') + '</div><div style="text-align:right;width: 66%;float:right">' + serverurl + '#card:' + meview.getLngCode() + ':' + raw.cardId + '</div></div>'
                            );

                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Category') + '</div><div style="text-align:right;width: 66%;float:right">' + (raw.Category && raw.Category[lcode] != '' ? raw.Category[lcode] : meview.getLngString('Data missing')) + '</div></div>'
                            );

                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Cost') + '</div><div style="text-align:right;width: 66%;float:right">' + (raw.Cost != '' ? raw.Cost : meview.getLngString('Data missing')) + '</div></div>'
                            );
                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Affinity') + '</div>\n\
                            <div style="text-align:right;width: 66%;float:right">' + AffinityText + '</div></div>'
                            );
                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Offense') + '</div>\n\
                            <div style="text-align:right;width: 66%;float:right">' + (raw.Offense[codeword] != '' ? raw.Offense[codeword] : meview.getLngString('None')) + '</div></div>'
                            );
                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Defense') + '</div>\n\
                            <div style="text-align:right;width: 66%;float:right">' + (raw.Defense[codeword] != '' ? raw.Defense[codeword] : meview.getLngString('None')) + '</div></div>'
                            );
                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Rarity') + '</div>\n\
                            <div style="text-align:right;width: 66%;float:right">' + RarityText + '</div></div>'
                            );
                    infoPanels.push(
                            '<div><div style=" width:33%;float:left">' + meview.getLngString('Type') + '</div>\n\
                            <div style="text-align:right;width: 66%;float:right">' + TypeText + '</div></div>'
                            );



                    var abilityPanels = [];
                    var Abilities = [];
                    switch (lcode) {
                        case 'en':
                            switch (code) {
                                case '0':
                                    Abilities = raw.Abilities['en']['None'];
                                    break;
                                case '1':
                                    Abilities = raw.Abilities['en']['One'];
                                    break;
                                case '2':
                                    Abilities = raw.Abilities['en']['Two'];
                                    break;
                                case '3':
                                    Abilities = raw.Abilities['en']['Three'];
                                    break;

                            }

                            break;
                        case 'de':
                            switch (code) {
                                case '0':
                                    Abilities = raw.Abilities['de']['None'];
                                    break;
                                case '1':
                                    Abilities = raw.Abilities['de']['One'];
                                    break;
                                case '2':
                                    Abilities = raw.Abilities['de']['Two'];
                                    break;
                                case '3':
                                    Abilities = raw.Abilities['de']['Three'];
                                    break;

                            }
                            break;
                        case 'ru':
                            switch (code) {
                                case '0':
                                    Abilities = raw.Abilities['ru']['None'];
                                    break;
                                case '1':
                                    Abilities = raw.Abilities['ru']['One'];
                                    break;
                                case '2':
                                    Abilities = raw.Abilities['ru']['Two'];
                                    break;
                                case '3':
                                    Abilities = raw.Abilities['ru']['Three'];
                                    break;

                            }
                            break;

                    }

                    if (Abilities.length > 0) {
                        var i = 0;

                        for (i; i < Abilities.length; i++) {
                            var Ability = Abilities[i];
                            abilityPanels.push(
                                    '<div><div style="padding-top:10px;font-size:14px;font-weight:600">' + Ability.Name + '</div>\n\
                            <div style="">' + Ability.Description + '</div></div>'
                                    );

                        }
                        infoPanels.push(
                                '<div><div style="padding-top:10px;font-size:16px;font-weight:700">' + meview.getLngString('Abilities') + '</div> </div>'
                                );
                        infoPanels.push(abilityPanels.join(''));

                    }

                    var UpgradesReturn = [];
                    if (code === '0' || code === '1' || code === '2') {
                        var Upgradesm = [];
                        switch (lcode) {
                            case 'en':
                                Upgradesm = raw.Upgrades.en;
                                break;
                            case 'de':
                                Upgradesm = raw.Upgrades.de;
                                break;
                            case 'ru':
                                Upgradesm = raw.Upgrades.ru;
                                break;
                        }
                        var i = 0;

                        if (Upgradesm.length > 0) {

                            for (i; i < Upgradesm.length; i++) {
                                var Upgradem = Upgradesm[i];

                                if (code === '0' && Upgradem.Show.Base === 1) {
                                    UpgradesReturn.push(Upgradem);
                                } else if (code === '1' && Upgradem.Show.One === 1) {
                                    UpgradesReturn.push(Upgradem);
                                } else if (code === '2' && Upgradem.Show.Two === 1) {
                                    UpgradesReturn.push(Upgradem);
                                }



                            }
                        }
                    }
                    var upgradePanels = [];
                    var Upgrades = UpgradesReturn;
                    var i = 0;
                    if (Upgrades.length > 0) {
                        var testUpgradeContent = 0;
                        for (i; i < Upgrades.length; i++) {
                            var Upgrade = Upgrades[i];

                            if (Upgrade.Description != null && Upgrade.Description != '') {
                                upgradePanels[(Upgrade.Era - 1)] = (
                                        '<div><div style="padding-top:10px;font-size:14px;font-weight:600">' + meview.getLngString('Lvl') + ' ' + Upgrade.Era + '</div>\n\
                            <div style="">' + Upgrade.Description + '</div></div>'
                                        );


                                testUpgradeContent++;
                            }
                        }
                        if (testUpgradeContent > 0) {
                            infoPanels.push(
                                    '<div><div style="padding-top:10px;font-size:16px;font-weight:700">' + meview.getLngString('Upgrades') + '</div> </div>'
                                    );
                            infoPanels.push(upgradePanels.join(''));


                        }
                    }

                    infoPanelsTip[raw.cardId] = Ext.create('Ext.tip.ToolTip', {
                        target: Ext.fly(item).el,
                        delegate: el.itemSelector,
                        trackMouse: true,
                        shadow: 'frame',
                        renderTo: Ext.getBody(),
                        html: infoPanels.join(''),
                        title: (raw.Name && raw.Name[lcode] != '' ? raw.Name[lcode] : meview.getLngString('Data missing')),
                        dismissDelay: 0,
                        minWidth: 350,
                        style: "min-width:350px;border-color:#000;background-color:#1F1F1F;font-weight:500;background-image:url('img/pattern.png')  !important; -moz-border-radius: 4px;-webkit-border-radius: 4px;-khtml-border-radius: 4px;border-radius: 4px;"
                    });

                },
                itemmouseleave: function (el, record, item, index, e, eOpts) {
                    var raw = record.getData();
                    if (infoPanelsTip[raw.cardId]) {
                        infoPanelsTip[raw.cardId].destroy(this);
                    }


                },
                itemclick: function (el, record, target, index, e, eOpts) {

                    var raw = record.getData();

                    if (infoPanelsTip[raw.cardId]) {
                        infoPanelsTip[raw.cardId].destroy(this);

                    }

                    var wstore = Ext.data.StoreManager.lookup("ApiCardsToDeck");
                    var range = wstore.getRange();
                    if (range.length < 20) {
                        var data = record.getData();

                        var card = wstore.getById(data.cardId);
                        if (card) {

                            wstore.remove(record);

                        } else {

                            data.sequence = (range.length);
                            wstore.add(data);
                            wstore.sort([
                                {
                                    property: 'sequence',
                                    direction: 'ASC'
                                }

                            ]);

                        }
                        var dataview = Ext.first("#cardsdataview");
                        dataview.refresh();
                        var dataview = Ext.first("#cardstodeck");
                        dataview.refresh();
                    } else {
                        Ext.toast(
                                {
                                    html: meview.getLngString('Cards count for deck has been reached. Please create deck or remove some'),
                                    title: meview.getLngString('Deck full'),
                                    width: 600,
                                    align: 't'
                                }
                        );

                    }

                }
            }
        });
        this.callParent(arguments);
    },
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


    },
    testExists: function (item) {

        if ((typeof item) === "undefined" || item === null) {
            return false;
        } else {
            return true;
        }
    }
});
