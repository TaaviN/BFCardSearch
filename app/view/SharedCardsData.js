Ext.define("slrcards.view.SharedCardsData", {
    extend: "Ext.view.View",
    alias: "widget.sharedcardsdataview",
    xtype: "sharedcardsdataview",
    itemId: "sharedcardsdataview",
    requires: [
    ],
    controller: 'mainc',
    viewModel: 'mainm',
    initComponent: function () {

        var wstore = Ext.data.StoreManager.lookup("ApiSharedCards");
        Ext.apply(this, {
            viewConfig: {
                preserveScrollOnRefresh: true,
                'boxready': function (thisGrid) {
                    thisGrid.view.focus = Ext.emptyFn;
                }

            },
            focusable: false,
            itemSelector: 'div.sharedcarditem',
            multiSelect: true,
            style: "padding-left:10px;padding-top:10px;background-color:transparent !important;",
            loadingText: "Please wait loading data",
            store: wstore,
            itemTpl: new Ext.XTemplate('<div class="sharedcarditem card{cardId} " id="sharedcarditem{cardId}"   style="float:left;width:{[this.width()]}">\n\
                <img class="sharedcarditem" style="width:100%;background-size:cover;background-image:url(\' {[this.image(values)]}\');background-position: no-repeat center center;" src="img/units/e.png" /> \n\
            </div> ',
                    {
                        image: function (data) {

                            return 'img/?units|' + data.Image.ObjectID + '|png|90|200|350';
                        },
                        width: function () {
                            return '12.3%';
                        }
                    }),
            listeners: {
                itemclick: function (el, record, target, index, e, eOpts) {

                    var raw = record.getData();
                    if (_cardDataOverlayId > 0 && _cardDataOverlayId == raw.cardId) {
                        if (_cardDataOverlay) {
                            _cardDataOverlay.destroy(this);
                            _cardDataOverlay = null;
                            _cardDataOverlayId = 0;
                        }
                    } else {
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
                            _cardDataOverlayId = 0;
                        }
                        if (!_cardDataOverlay) {
                            _cardDataOverlayId = raw.cardId;


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

                            var abilityPanels = [];

                            var Abilities = raw.Abilities;
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
                            var upgradePanels = [];
                            var Upgrades = raw.Upgrades;
                            var i = 0;
                            for (i; i < Upgrades.length; i++) {
                                var Upgrade = Upgrades[i];

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
                            }

                            _cardDataOverlay = Ext.create('Ext.window.Window', {
                                title: raw.Name,
                                height: (h - 130),
                                width: 360,
                                fixed: true,
                                defaultAlign: "tr-tr",
                                floating: true,
                                scrollable: 'y',
                                top: 30,
                                right: 0,
                                items: [
                                    {
                                        style: 'padding-right:10px;background-color:#5fa2dd;',
                                        html: '<img style="background-color:#5fa2dd;width:100%;background-size:cover;background-image:url(\' img?units|' + raw.Image.ObjectID + '|png|90|350|500\');" src="img/units/e.png" />'
                                    },
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
                                    },
                                    {
                                        xtype: "panel",
                                        title: "Abilities",
                                        ui: 'blue'
                                    },
                                    {
                                        itemId: "cardinfoAbilities",
                                        items: abilityPanels
                                    },
                                    {
                                        xtype: "panel",
                                        title: "Upgrades",
                                        ui: 'blue'

                                    },
                                    {
                                        itemId: "cardinfoUpgrades",
                                        items: upgradePanels
                                    }

                                ]
                            });
                        }
                        _cardDataOverlay.show();


                    }

                }
            }
        });
        this.callParent(arguments);
    }


});
