
Ext.define('slrcards.view.CardsEditorBorder', {
    extend: 'Ext.panel.Panel',
    xtype: 'cardseditorborder',
    alias: 'widget.cardseditorborder',
    itemId: 'cardseditorborder',
    requires: [],
    controller: 'mainc',
    viewModel: 'mainm',
    layout: 'border',
    initComponent: function () {
        var me = this;
        var meview = this;
        Ext.apply(this, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    ui: 'blue',
                    cls: 'boxshadow battern-bg',
                    items: [
                        {
                            xtype: 'container',
                            width: 32,
                            html: '<img src="img/logo32.png" width="32" height="32">',
                            style: "margin-right:10px;"
                        },
                        {
                            xtype: 'button',
                            width: 32,
                            height: 32,
                            ui: 'plain',
                            html: (window.localStorage.getItem('BaFoLNG2') == 'en' ? '<img src="img/english32tick.png" width="32" height="32">' : '<img src="img/english32.png" width="32" height="32">'),
                            style: "margin-right:5px;",
                            itemId: 'BaFoLNGEN2',
                            disabled: (window.localStorage.getItem('BaFoLNG2') == 'en' ? true : false),
                            handler: function (btn) {
                                var en = Ext.first('#BaFoLNGEN2');
                                var de = Ext.first('#BaFoLNGDE2');
                                var ru = Ext.first('#BaFoLNGRU2');
                                en.setDisabled(true);
                                de.setDisabled(false);
                                ru.setDisabled(false);
                                en.setHtml('<img src="img/english32tick.png" width="32" height="32">');
                                de.setHtml('<img src="img/deutschland32.png" width="32" height="32">');
                                ru.setHtml('<img src="img/russia32.png" width="32" height="32">');
                                window.localStorage.setItem('BaFoLNG2', 'en');

                                var cardseditorborder = Ext.first('#cardseditorborder');
                                Ext.resumeLayouts(true);
//                                cardseditorborder.up('container').updateLayout({defer: true, isRoot: true});

                            }
                        },
                        {
                            xtype: 'button',
                            width: 32,
                            height: 32,
                            ui: 'plain',
                            html: (window.localStorage.getItem('BaFoLNG2') == 'de' ? '<img src="img/deutschland32tick.png" width="32" height="32">' : '<img src="img/deutschland32.png" width="32" height="32">'),
                            style: "margin-right:5px;",
                            itemId: 'BaFoLNGDE2',
                            disabled: (window.localStorage.getItem('BaFoLNG2') == 'de' ? true : false),
                            handler: function (btn) {
                                var en = Ext.first('#BaFoLNGEN2');
                                var de = Ext.first('#BaFoLNGDE2');
                                var ru = Ext.first('#BaFoLNGRU2');
                                en.setDisabled(false);
                                de.setDisabled(true);
                                ru.setDisabled(false);
                                en.setHtml('<img src="img/english32.png" width="32" height="32">');
                                de.setHtml('<img src="img/deutschland32tick.png" width="32" height="32">');
                                ru.setHtml('<img src="img/russia32.png" width="32" height="32">');
                                window.localStorage.setItem('BaFoLNG2', 'de');

                            }
                        },
                        {
                            xtype: 'button',
                            width: 32,
                            height: 32,
                            ui: 'plain',
                            html: (window.localStorage.getItem('BaFoLNG2') == 'ru' ? '<img src="img/russia32tick.png" width="32" height="32">' : '<img src="img/russia32.png" width="32" height="32">'),
                            style: "margin-right:15px;",
                            itemId: 'BaFoLNGRU2',
                            disabled: (window.localStorage.getItem('BaFoLNG2') == 'ru' ? true : false),
                            handler: function (btn) {
                                var en = Ext.first('#BaFoLNGEN2');
                                var de = Ext.first('#BaFoLNGDE2');
                                var ru = Ext.first('#BaFoLNGRU2');
                                en.setDisabled(false);
                                de.setDisabled(false);
                                ru.setDisabled(true);

                                en.setHtml('<img src="img/english32.png" width="32" height="32">');
                                de.setHtml('<img src="img/deutschland32.png" width="32" height="32">');
                                ru.setHtml('<img src="img/russia32tick.png" width="32" height="32">');



                                window.localStorage.setItem('BaFoLNG2', 'ru');

                            }
                        },
                        {
                            xtype: 'button',
                            text: me.setVisibleCount(),
                            iconCls: 'fa fa-search',
                            ui: 'default',
                            tooltip: me.getLngString('Found cards counter'),
                            style: "margin-right:10px;-moz-border-radius: 4px;-webkit-border-radius: 4px;-khtml-border-radius: 4px;border-radius: 4px;",
                            itemId: "cardsSearchCounterEditor"
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: '-',
                            iconCls: 'x-fa fa-user',
                            ui: 'default',
                            itemId: "cardsEditorName",
                            disabled: true
                        },
                        {
                            xtype: 'button',
                            text: me.getLngString('Back to search'),
                            itemId: "editorbackbutton",
                            iconCls: 'x-fa fa-search',
                            ui: 'default',
                            handler: function () {
                                var panel = Ext.first('#main');
                                panel.getLayout().setActiveItem(1);
                                _app.loadAppData();
                                document.title = me.getLngString('Battleforge cards');
                            }

                        }
                        ,
                        {
                            xtype: 'button',
                            text: me.getLngString('Logout'),
                            itemId: "editorlogoutbutton",
                            iconCls: 'x-fa fa-lock',
                            ui: 'default',
                            handler: function () {
                                var panel = Ext.first('#main');
                                panel.getLayout().setActiveItem(1);
                                _app.loadAppData();
                                document.title = me.getLngString('Battleforge cards');
                                iAmAEditorCode = null;
                                iAmAEditor = false;
                            }

                        }

                    ]
                }

            ],
            items: [
                {
                    region: 'west',
                    width: 220,
                    title: meview.getLngString('Search'),
                    iconCls: 'fa fa-search',
                    collapsed: false,
                    itemId: 'westsidesearchtitle2',
                    layout: 'fit',
                    border: false,
                    cls: 'boxshadow-right pattern-bg',
                    ui: 'blue',
                    items: [
                        {
                            xtype: 'panel',
                            scrollable: 'y',
                            width: "99%",
                            height: "99%",
                            ui: 'blue',
                            cls: 'pattern-bg',
                            items: [
                                {
                                    xtype: 'tagfield',
                                    labelAlign: 'top',
                                    fieldLabel: '',
                                    width: "98%",
                                    itemId: 'searchfieldsortme2',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['abbr', 'name'],
                                        data: [
                                            {"abbr": 1, "name": meview.getLngString('Orb') + " ASC"},
                                            {"abbr": 2, "name": meview.getLngString('Color') + " ASC"},
                                            {"abbr": 3, "name": meview.getLngString('Class') + " ASC"},
                                            {"abbr": 4, "name": meview.getLngString('Power') + " ASC"},
                                            {"abbr": 5, "name": meview.getLngString('Alphabetical') + " ASC"},
                                            {"abbr": 6, "name": meview.getLngString('Rarity') + " ASC"},
                                            {"abbr": 7, "name": meview.getLngString('Edition') + " ASC"},
                                            {"abbr": 8, "name": meview.getLngString('Offense') + " ASC"},
                                            {"abbr": 9, "name": meview.getLngString('Life Points') + " ASC"},
                                            {"abbr": 10, "name": meview.getLngString('Category') + " ASC"},
                                            {"abbr": 11, "name": meview.getLngString('Orb') + " Desc"},
                                            {"abbr": 12, "name": meview.getLngString('Color') + " Desc"},
                                            {"abbr": 13, "name": meview.getLngString('Class') + " Desc"},
                                            {"abbr": 14, "name": meview.getLngString('Power') + " Desc"},
                                            {"abbr": 15, "name": meview.getLngString('Alphabetical') + " Desc"},
                                            {"abbr": 16, "name": meview.getLngString('Rarity') + " Desc"},
                                            {"abbr": 17, "name": meview.getLngString('Edition') + " Desc"},
                                            {"abbr": 18, "name": meview.getLngString('Offense') + " Desc"},
                                            {"abbr": 19, "name": meview.getLngString('Life Points') + " Desc"},
                                            {"abbr": 20, "name": meview.getLngString('Category') + " Desc"}
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'abbr',
                                    filterPickList: true,
                                    queryMode: 'local',
                                    value: me.testSort(),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            me.doCardStoreSorting(newValue);
                                        }
                                    }
                                },
                                {
                                    width: "98%",
                                    xtype: 'textfield',
                                    labelAlign: 'top',
                                    fieldLabel: '',
                                    emptyText: meview.getLngString('Search'),
                                    itemId: 'searchfieldquery2',
                                    value: me.testStringQ(),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            me.doCardSearch('Query', el.getValue());
                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Rarity'),
                                    titleAlign: 'left',
                                    itemId: 'searchfieldraritytitle2',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'c',
                                    boxLabel: meview.getLngString('Common'),
                                    itemId: 'searchfieldc2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('c'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'uc',
                                    boxLabel: meview.getLngString('UnCommon'),
                                    itemId: 'searchfielduc2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('uc'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'r',
                                    boxLabel: meview.getLngString('Rare'),
                                    itemId: 'searchfieldr2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('r'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                }, {
                                    xtype: 'checkbox',
                                    name: 'ur',
                                    boxLabel: meview.getLngString('Ultra rare'),
                                    inputValue: '1',
                                    itemId: 'searchfieldur2',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('ur'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Edition'),
                                    itemId: 'searchfieldeditiontitle2',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'edt',
                                    boxLabel: meview.getLngString('Twilight'),
                                    itemId: 'searchfieldedt2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('edt'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'edr',
                                    boxLabel: meview.getLngString('Renegade'),
                                    itemId: 'searchfieldedr2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('edr'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'edls',
                                    boxLabel: meview.getLngString('Lost Souls'),
                                    itemId: 'searchfieldedls2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('edls'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'eda',
                                    boxLabel: meview.getLngString('Amii'),
                                    inputValue: '1',
                                    itemId: 'searchfieldeda2',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('eda'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Tier'),
                                    itemId: 'searchfieldtiertitle2',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'tiero',
                                    boxLabel: meview.getLngString('One orb'),
                                    itemId: 'searchfieldtiero2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('tiero'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'tiertw',
                                    boxLabel: meview.getLngString('Two orbs'),
                                    itemId: 'searchfieldtiertw2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('tiertw'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'tiert',
                                    boxLabel: meview.getLngString('Three orbs'),
                                    itemId: 'searchfieldtiert2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('tiert'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'tierf',
                                    boxLabel: meview.getLngString('Four orbs'),
                                    itemId: 'searchfieldtierf2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('tierf'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Color'),
                                    titleAlign: 'left',
                                    itemId: 'searchfieldcolortitle2',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'colfr',
                                    boxLabel: meview.getLngString('Frost'),
                                    itemId: 'searchfieldcolfr2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('colfr'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'colfi',
                                    boxLabel: meview.getLngString('Fire'),
                                    itemId: 'searchfieldcolfi2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('colfi'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'coln',
                                    boxLabel: meview.getLngString('Nature'),
                                    itemId: 'searchfieldcoln2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('coln'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'cols',
                                    boxLabel: meview.getLngString('Shadow'),
                                    itemId: 'searchfieldcols2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('cols'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'coltl',
                                    boxLabel: meview.getLngString('Twilight'),
                                    itemId: 'searchfieldcoltl2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('coltl'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'colb',
                                    boxLabel: meview.getLngString('Bandit'),
                                    itemId: 'searchfieldcolb2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('colb'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'colsk',
                                    boxLabel: meview.getLngString('Stonekin'),
                                    itemId: 'searchfieldcolsk2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('colsk'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'colls',
                                    boxLabel: meview.getLngString('Lost souls'),
                                    itemId: 'searchfieldcolls2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('colls'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'collg',
                                    boxLabel: meview.getLngString('Legendary'),
                                    itemId: 'searchfieldcollg2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('collg'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Affinity'),
                                    titleAlign: 'left',
                                    itemId: 'searchfieldaffinitytitle2',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'afn',
                                    boxLabel: meview.getLngString('None'),
                                    itemId: 'searchfieldafn2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('afn'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'afr',
                                    itemId: 'searchfieldafr2',
                                    boxLabel: meview.getLngString('Frost'),
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('afr'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'afi',
                                    boxLabel: meview.getLngString('Fire'),
                                    itemId: 'searchfieldafi2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('afi'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'an',
                                    boxLabel: meview.getLngString('Nature'),
                                    itemId: 'searchfieldan2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('an'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'as',
                                    boxLabel: meview.getLngString('Shadow'),
                                    itemId: 'searchfieldas2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('as'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Card Type'),
                                    itemId: 'searchfieldcardtypetitle2',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'ts',
                                    boxLabel: meview.getLngString('Spell'),
                                    itemId: 'searchfieldts2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('ts'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'tc',
                                    boxLabel: meview.getLngString('Creature'),
                                    itemId: 'searchfieldtc2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('tc'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'tb',
                                    boxLabel: meview.getLngString('Building'),
                                    itemId: 'searchfieldtb2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    checked: me.testCheck('tb'),
                                    boxLabelWidth: '70%',
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'munits',
                                    boxLabel: meview.getLngString('Melee Units'),
                                    itemId: 'searchfieldmunits2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('munits'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'runits',
                                    boxLabel: meview.getLngString('Ranged Units'),
                                    itemId: 'searchfieldrunits2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('runits'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Offense'),
                                    titleAlign: 'left',
                                    itemId: 'searchfieldoffensetitle2',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'otms',
                                    boxLabel: meview.getLngString('Small'),
                                    itemId: 'searchfieldotms2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('otms'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'otmm',
                                    itemId: 'searchfieldotmm2',
                                    boxLabel: meview.getLngString('Medium'),
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('otmm'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'otml',
                                    boxLabel: meview.getLngString('Large'),
                                    itemId: 'searchfieldotml2',
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    checked: me.testCheck('otml'),
                                    boxLabelWidth: '70%',
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'otmxl',
                                    boxLabel: meview.getLngString('Extra Large'),
                                    inputValue: '1',
                                    itemId: 'searchfieldotmxl2',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    checked: me.testCheck('otmxl'),
                                    boxLabelWidth: '70%',
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'ots',
                                    itemId: 'searchfieldots2',
                                    boxLabel: meview.getLngString('Special'),
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    checked: me.testCheck('ots'),
                                    boxLabelWidth: '70%',
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    title: meview.getLngString('Defense'),
                                    itemId: 'searchfielddefencetitle2',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'dts',
                                    boxLabel: meview.getLngString('Small'),
                                    inputValue: '1',
                                    itemId: 'searchfielddts2',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('dts'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'dtm',
                                    boxLabel: meview.getLngString('Medium'),
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    itemId: 'searchfielddtm2',
                                    boxLabelWidth: '70%',
                                    checked: me.testCheck('dtm'),
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'dtl',
                                    boxLabel: meview.getLngString('Large'),
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    itemId: 'searchfielddtl2',
                                    checked: me.testCheck('dtl'),
                                    boxLabelWidth: '70%',
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'dtxl',
                                    boxLabel: meview.getLngString('Extra large'),
                                    inputValue: '1',
                                    ui: 'ICE',
                                    cls: 'no-bottom-margin',
                                    style: "margin-left:15px",
                                    checked: me.testCheck('dtxl'),
                                    itemId: 'searchfielddtxl2',
                                    boxLabelWidth: '70%',
                                    listeners: {
                                        change: function (el, newValue, oldValue, eOpts) {
                                            if (newValue) {
                                                me.doCardSearch(el.getName(), 1);
                                            } else {
                                                me.doCardSearch(el.getName(), 0);
                                            }

                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    height: 300,
                                    ui: 'blue',
                                    cls: 'pattern-bg'
                                }
                            ]

                        }
                    ]

                }, ,
                        {
                            region: 'center',
                            layout: 'fit',
                            bodyPadding: 0,
                            border: false,
                            scrollable: 'y',
                            bodyClass: 'pattern-bg',
                            bodyStyle: "background-color:#303030;background-image:url('img/pattern.png')",
                            items: [
                                {
                                    style: "background-color:transparent !important;",
                                    xtype: "cardseditordataview"
                                }
                            ]
                        }
            ]
        });

        this.callParent(arguments);
    },
    doLanguageChange: function () {
        var view = this;

        Ext.first('#editorlogoutbutton').setText(this.getLngString('Logout'));
        Ext.first('#editorbackbutton').setText(this.getLngString('Back to search'));
        Ext.first('#cardsSearchCounter').setTooltip(this.getLngString('Found cards counter'));
        Ext.first('#searchfieldsortme2').getStore().setData([
            {"abbr": 1, "name": view.getLngString('Orb') + " ASC"},
            {"abbr": 2, "name": view.getLngString('Color') + " ASC"},
            {"abbr": 3, "name": view.getLngString('Class') + " ASC"},
            {"abbr": 4, "name": view.getLngString('Power') + " ASC"},
            {"abbr": 5, "name": view.getLngString('Alphabetical') + " ASC"},
            {"abbr": 6, "name": view.getLngString('Rarity') + " ASC"},
            {"abbr": 7, "name": view.getLngString('Edition') + " ASC"},
            {"abbr": 8, "name": view.getLngString('Offense') + " ASC"},
            {"abbr": 9, "name": view.getLngString('Life Points') + " ASC"},
            {"abbr": 10, "name": view.getLngString('Category') + " ASC"},
            {"abbr": 11, "name": view.getLngString('Orb') + " Desc"},
            {"abbr": 12, "name": view.getLngString('Color') + " Desc"},
            {"abbr": 13, "name": view.getLngString('Class') + " Desc"},
            {"abbr": 14, "name": view.getLngString('Power') + " Desc"},
            {"abbr": 15, "name": view.getLngString('Alphabetical') + " Desc"},
            {"abbr": 16, "name": view.getLngString('Rarity') + " Desc"},
            {"abbr": 17, "name": view.getLngString('Edition') + " Desc"},
            {"abbr": 18, "name": view.getLngString('Offense') + " Desc"},
            {"abbr": 19, "name": view.getLngString('Life Points') + " Desc"},
            {"abbr": 20, "name": view.getLngString('Category') + " Desc"}
        ]);
        Ext.first('#searchfieldraritytitle2').setTitle(this.getLngString('Rarity'));// title: 'Rarity',
        Ext.first('#searchfieldc2').setBoxLabel(this.getLngString('Common'));//  boxLabel: 'Common',
        Ext.first('#searchfielduc2').setBoxLabel(this.getLngString('UnCommon'));// boxLabel: 'UnCommon',
        Ext.first('#searchfieldr2').setBoxLabel(this.getLngString('Rare'));// boxLabel: 'Rare',
        Ext.first('#searchfieldur2').setBoxLabel(this.getLngString('Ultra rare'));// boxLabel: 'Ultra rare',
        Ext.first('#searchfieldeditiontitle2').setTitle(this.getLngString('Edition'));// title: 'Edition',
        Ext.first('#searchfieldedt2').setBoxLabel(this.getLngString('Twilight'));//  boxLabel: 'Twilight',
        Ext.first('#searchfieldedr2').setBoxLabel(this.getLngString('Renegade'));//  boxLabel: 'Renegade',
        Ext.first('#searchfieldedls2').setBoxLabel(this.getLngString('Lost Souls'));//  boxLabel: 'Lost Souls',
        Ext.first('#searchfieldeda2').setBoxLabel(this.getLngString('Amii'));// boxLabel: 'Amii',
        Ext.first('#searchfieldtiertitle2').setTitle(this.getLngString('Tier'));// title: 'Tier',
        Ext.first('#searchfieldtiero2').setBoxLabel(this.getLngString('One orb'));// boxLabel: 'One orb',
        Ext.first('#searchfieldtiertw2').setBoxLabel(this.getLngString('Two orbs'));// boxLabel: 'Two orbs',
        Ext.first('#searchfieldtiert2').setBoxLabel(this.getLngString('Three orbs'));// boxLabel: 'Three orbs',
        Ext.first('#searchfieldtierf2').setBoxLabel(this.getLngString('Four orbs'));// boxLabel: 'Four orbs',
        Ext.first('#searchfieldcolfr2').setBoxLabel(this.getLngString('Frost'));// boxLabel: 'Frost',
        Ext.first('#searchfieldcolfi2').setBoxLabel(this.getLngString('Fire'));// boxLabel: 'Fire',
        Ext.first('#searchfieldcoln2').setBoxLabel(this.getLngString('Nature'));//  boxLabel: 'Nature',
        Ext.first('#searchfieldcols2').setBoxLabel(this.getLngString('Shadow'));// boxLabel: 'Shadow',
        Ext.first('#searchfieldcoltl2').setBoxLabel(this.getLngString('Twilight'));// boxLabel: 'Twilight',
        Ext.first('#searchfieldcolb2').setBoxLabel(this.getLngString('Bandit'));// boxLabel: 'Bandit',
        Ext.first('#searchfieldcolsk2').setBoxLabel(this.getLngString('Stonekin'));// boxLabel: 'Stonekin',
        Ext.first('#searchfieldcolls2').setBoxLabel(this.getLngString('Lost souls'));// boxLabel: 'Lost souls',
        Ext.first('#searchfieldcollg2').setBoxLabel(this.getLngString('Legendary'));//  boxLabel: 'Legendary',
        Ext.first('#searchfieldcolortitle2').setTitle(this.getLngString('Color'));// title: 'Color',
        Ext.first('#searchfieldas2').setBoxLabel(this.getLngString('Shadow'));// boxLabel: 'Shadow',
        Ext.first('#searchfieldan2').setBoxLabel(this.getLngString('Nature'));//  boxLabel: 'Nature',
        Ext.first('#searchfieldafi2').setBoxLabel(this.getLngString('Fire'));// boxLabel: 'Fire',
        Ext.first('#searchfieldafr2').setBoxLabel(this.getLngString('Frost'));//  boxLabel: 'Frost',
        Ext.first('#searchfieldafn2').setBoxLabel(this.getLngString('None'));// boxLabel: 'None',
        Ext.first('#searchfieldaffinitytitle2').setTitle(this.getLngString('Affinity'));// title: 'Affinity',
        Ext.first('#searchfieldts2').setBoxLabel(this.getLngString('Spell'));// boxLabel: 'Spell',
        Ext.first('#searchfieldtc2').setBoxLabel(this.getLngString('Creature'));// boxLabel: 'Creature',
        Ext.first('#searchfieldtb2').setBoxLabel(this.getLngString('Building'));// boxLabel: 'Building',
        Ext.first('#searchfieldmunits2').setBoxLabel(this.getLngString('Melee Units'));//  boxLabel: 'Melee Units',
        Ext.first('#searchfieldrunits2').setBoxLabel(this.getLngString('Ranged Units'));// boxLabel: 'Ranged Units',
        Ext.first('#searchfieldcardtypetitle2').setTitle(this.getLngString('Card Type'));// title: 'Card Type',
        Ext.first('#searchfieldotms2').setBoxLabel(this.getLngString('Small'));// boxLabel: 'Small',
        Ext.first('#searchfieldotmm2').setBoxLabel(this.getLngString('Medium'));// boxLabel: 'Medium',
        Ext.first('#searchfieldotml2').setBoxLabel(this.getLngString('Large'));// boxLabel: 'Large',
        Ext.first('#searchfieldotmxl2').setBoxLabel(this.getLngString('Extra Large'));// boxLabel: 'Extra Large',
        Ext.first('#searchfieldots2').setBoxLabel(this.getLngString('Special'));// boxLabel: 'Special',
        Ext.first('#searchfieldoffensetitle2').setTitle(this.getLngString('Offense'));// title: 'Offense', 
        Ext.first('#decktobuildname2').setEmptyText(this.getLngString('Deck name'));// emptyText: 'Deck name',
        Ext.first('#decksavebutton2').setText(this.getLngString('Save'));//  text: 'Save',
        Ext.first('#decksavebutton2').setTooltip(this.getLngString('Save your current selection as deck')); //tooltip: 'Save your current selection as deck.',
        Ext.first('#decksharebutton2').setTooltip(this.getLngString('Share your current selection of cards')); // tooltip: 'Share your current selection of cards',
        Ext.first('#westsidesearchtitle2').setTitle(this.getLngString('Search'));//  title: 'Search',
        Ext.first('#searchfielddtxl2').setBoxLabel(this.getLngString('Extra large'));// boxLabel: 'Extra large',
        Ext.first('#searchfielddtl2').setBoxLabel(this.getLngString('Large'));// boxLabel: 'Large',
        Ext.first('#searchfielddtm2').setBoxLabel(this.getLngString('Medium'));
        Ext.first('#searchfielddts2').setBoxLabel(this.getLngString('Small'));
        Ext.first('#searchfielddefencetitle2').setTitle(this.getLngString('Defense'));
        var dataview1 = Ext.first("#cardseditordataview");
        dataview1.refresh();

    },
    getLngCode: function () {
        var code = 'en';
        if (window.localStorage.getItem('BaFoLNG2') == null) {
            code = 'en';
        } else {
            code = window.localStorage.getItem('BaFoLNG2');
        }
        return code;


    },
    getLngString: function (str) {
        var code = 'en';
        var strcode = str;
        if (window.localStorage.getItem('BaFoLNG2') == null) {
            code = 'en';
        } else {
            code = window.localStorage.getItem('BaFoLNG2');
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
    doCardStoreSorting: function (newValue) {
        newValue = JSON.stringify(Ext.encode(newValue));
        return this.getController().doCardStoreSortingEditor(newValue);
    },
    setVisibleCount: function () {
        return this.getController().setVisibleCountEditor();
    },
    doCardSearch: function (type, newValue) {
        _app.doCardSearchEditor(type, newValue);
    },
    testStringQ: function () {
        return this.getController().testStringQEditor();
    },
    testSort: function () {
        return this.getController().testSortEditor();
    },
     testExists: function (item) {

        if ((typeof item) === "undefined" || item === null) {
            return false;
        } else {
            return true;
        }
    },
    testCheck: function (type) {
        var val = this.getController().testCheckEditor(type);

        return val;
    }
});
