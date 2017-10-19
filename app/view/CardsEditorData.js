
Ext.define("slrcards.view.CardsEditorData", {
    extend: "Ext.grid.Panel",
    alias: "widget.cardseditordataview",
    xtype: "cardseditordataview",
    itemId: "cardseditordataview",
    requires: [
    ],
    controller: 'mainc',
    viewModel: 'mainm',
    initComponent: function () {
        var meView = this;

        Ext.apply(this, {
            viewConfig: {
                preserveScrollOnRefresh: true,
                'boxready': function (thisGrid) {
                    thisGrid.view.focus = Ext.emptyFn;
                }

            },
            focusable: false,
            style: "background-color:transparent !important;",
            loadingText: meView.getLngString("Please wait loading data") ,
            store: {'type': "ApiCardsEditorMain"},
            columns: [
                {
                    text: meView.getLngString('Image'),
                    dataIndex: 'Image',
                    width: 120,
                    renderer: function (value, metaData, record) {
                        var data = record.getData();
                        return '<img style="width:100%;" src="img/?units|' + data.Image.ObjectID + '|png|90|200|350" />';
                    }
                },
                {
                    text: meView.getLngString('NCE'),
                    tooltip: meView.getLngString('Name/Category/Edition'),
                    dataIndex: 'Name',
                    flex: 1.5,
                    renderer: function (value, metaData, record) {
                        var data = record.getData();
                        var edition = '';
                        if (data.Edition == 8) {
                            edition = meView.getLngString('Amii');
                        } else if (data.Edition == 4) {
                            edition = meView.getLngString('Lost Souls');
                        } else if (data.Edition == 2) {
                            edition = meView.getLngString('Renegade');
                        } else if (data.Edition == 1) {
                            edition = meView.getLngString('Twilight');
                        }
                        return ' <div>' + data.Name[meView.getLngCode()] + '</div><div>' + data.Category[meView.getLngCode()] + '</div><div>' + edition + '</div>';
                    }
                },
                {
                    text: meView.getLngString('Orb Info'),
                    dataIndex: 'OrbInfo' ,
                    flex: 1.5,
                    renderer: function (value, metaData, record) {
                        var data = record.getData();
                        var orbtxt = [];
                        if (data.OrbInfo) {
                            if (data.OrbInfo.OrbCode) {
                                orbtxt.push(' <div>'+meView.getLngString('Orb Code')+' ' + data.OrbInfo.OrbCode + '</div>');
                            }
                            if (data.OrbInfo.Neutral) {
                                orbtxt.push(' <div>'+meView.getLngString('Neutral')+' ' + data.OrbInfo.Neutral + '</div>');
                            }
                            if (data.OrbInfo.Frost) {
                                orbtxt.push(' <div>'+meView.getLngString('Frost')+' ' + data.OrbInfo.Frost + '</div>');
                            }
                            if (data.OrbInfo.Fire) {
                                orbtxt.push(' <div>'+meView.getLngString('Fire')+' ' + data.OrbInfo.Fire + '</div>');
                            }
                            if (data.OrbInfo.Nature) {
                                orbtxt.push(' <div>'+meView.getLngString('Nature')+' ' + data.OrbInfo.Nature + '</div>');
                            }
                            if (data.OrbInfo.Shadow) {
                                orbtxt.push(' <div>'+meView.getLngString('Shadow')+' ' + data.OrbInfo.Shadow + '</div>');
                            }


                        }
                        return orbtxt.join('');
                    }
                },
                {
                    text: meView.getLngString('CTCAR'),
                    tooltip: meView.getLngString('Cost/Type/Color/Affinity/Rarity'),
                    dataIndex: 'Rarity',
                    flex: 1.5,
                    renderer: function (value, metaData, record) {
                        var data = record.getData();

                        var ColorText = '';
                        switch (data.Color) {
                            case 0:
                                ColorText = meView.getLngString('Frost');
                                break;
                            case 1:
                                ColorText = meView.getLngString('Fire');
                                break;
                            case 2:
                                ColorText = meView.getLngString('Nature');
                                break;
                            case 3:
                                ColorText = meView.getLngString('Shadow');
                                break;
                            case 4:
                                ColorText = meView.getLngString('Twilight');
                                break;
                            case 8:
                                ColorText = meView.getLngString('Bandit');
                                break;
                            case 7:
                                ColorText = meView.getLngString('Stonekin');
                                break;
                            case 5:
                                ColorText = meView.getLngString('Lost Souls');
                                break;
                            case 6:
                                ColorText = meView.getLngString('Legendary');
                                break;
                        }
                        var RarityText = '';
                        switch (data.Rarity) {
                            case 0:
                                RarityText = meView.getLngString('Common');
                                break;
                            case 1:
                                RarityText = meView.getLngString('UnCommon');
                                break;
                            case 2:
                                RarityText = meView.getLngString('Rare');
                                break;
                            case 3:
                                RarityText = meView.getLngString('Ultra rare');
                                break;
                        }
                        var AffinityText = '';
                        switch (data.Affinity) {
                            case -1:
                                AffinityText = meView.getLngString('None');
                                break;
                            case 0:
                                AffinityText = meView.getLngString('Frost');
                                break;
                            case 1:
                                AffinityText = meView.getLngString('Fire');
                                break;
                            case 2:
                                AffinityText = meView.getLngString('Nature');
                                break;
                            case 3:
                                AffinityText = meView.getLngString('Shadow');
                                break;
                        }
                        var TypeText = '';
                        switch (data.Type) {
                            case 0:
                                TypeText = meView.getLngString('Spell');
                                break;
                            case 2:
                                TypeText = meView.getLngString('Creature');
                                break;
                            case 3:
                                TypeText = meView.getLngString('Building');
                                break;
                        }

                        return '<div>Cost ' + data.Cost + '</div><div>' + TypeText + '</div><div>' + ColorText + '</div><div>' + AffinityText + '</div><div>' + RarityText + '</div>';
                    }
                },
                {
                    text: meView.getLngString('IRDODTOT') ,
                    tooltip: meView.getLngString('IsRanged/Defense/Offense/DefenseType/OffenseType'),
                    dataIndex: 'IsRanged',
                    flex: 1.5,
                    renderer: function (value, metaData, record) {
                        var data = record.getData();
                        var OffenseType = '';
                        switch (data.OffenseType['None']) {
                            case -1:
                                OffenseType = meView.getLngString('None');
                                break;
                            case 0:
                                OffenseType = meView.getLngString('Small');
                                break;
                            case 1:
                                OffenseType = meView.getLngString('Medium');
                                break;
                            case 2:
                                OffenseType = meView.getLngString('Large');
                                break;
                            case 3:
                                OffenseType = meView.getLngString('Extra Large');
                                break;
                            case 4:
                                OffenseType = meView.getLngString('Special');
                                break;
                        }

                        var DefenseType = '';
                        switch (data.DefenseType['None']) {
                            case -1:
                                DefenseType = meView.getLngString('None');
                                break;
                            case 0:
                                DefenseType = meView.getLngString('Small');
                                break;
                            case 1:
                                DefenseType = meView.getLngString('Medium');
                                break;
                            case 2:
                                DefenseType = meView.getLngString('Large');
                                break;
                            case 3:
                                DefenseType = meView.getLngString('Extra Large');
                                break;
                            case 4:
                                DefenseType = meView.getLngString('Special');
                                break;
                        }


                        return ' <div>'+meView.getLngString('Is Ranged')+'Is Ranged ' + (data.IsRanged ? meView.getLngString('Yes'):meView.getLngString('No')) + '</div>\n\
<div>'+meView.getLngString('Defense')+' ' + data.Defense['None'] + '</div>\n\
<div>'+meView.getLngString('Offense')+' ' + data.Offense['None'] + '</div>\n\
<div>'+meView.getLngString('Defense Type')+' ' + DefenseType + '</div>\n\
<div>'+meView.getLngString('Offense Type')+' ' + OffenseType + '</div>';
                    }
                },
                {
                    text: meView.getLngString('UCCC'),
                    tooltip: meView.getLngString('UnitCount/ChargeCount'),
                    dataIndex: 'UnitCount',
                    flex: 1.5,
                    renderer: function (value, metaData, record) {
                        var data = record.getData();
                        return ' <div>'+meView.getLngString('Unit Count')+' ' + data.UnitCount['None'] + '</div>\n\
<div>'+meView.getLngString('Charge Count')+' ' + data.ChargeCount['None'] + '</div>';
                    }
                }
            ],
            listeners: {
                itemclick: function (el, rec, target, index, e, eOpts) {
                    var data = rec.getData();
                    if (_cardEditorOverlay) {
                        _cardEditorOverlay.destroy(this);
                        _cardEditorOverlay = null;
                    }
                    if (!_cardEditorOverlay) {


                        _cardEditorOverlay = Ext.create('Ext.window.Window', {
                            title: meView.getLngString('Edit card data'),
                            width: 900,
                            controller: 'maineditorc',
                            viewModel: 'mainm',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    layout: 'fit',
                                    cls: 'kill-margins',
                                    items: [
                                        {
                                            title: '<img src="img/all32.png" width="50" height="32">',
                                            tabCls: 'kill-margins',
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    layout: 'fit',
                                                    cls: 'nokill-margins',
                                                    items: [
                                                        {
                                                            title: meView.getLngString('Global card information'),
                                                            layout: 'fit',
                                                            iconCls: 'x-fa fa-newspaper-o',
                                                            items: [
                                                                {
                                                                    layout: 'border',
                                                                    height: 600,
                                                                    items: [
                                                                        {
                                                                            region: "center",
                                                                            flex: 1,
                                                                            layout: 'fit',
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorDataForm',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            fieldLabel: '',
                                                                                            xtype: 'hiddenfield',
                                                                                            name: 'cardId',
                                                                                            value: data.cardId

                                                                                        },
                                                                                        {
                                                                                            fieldLabel: 'Cost',
                                                                                            xtype: 'numberfield',
                                                                                            name: meView.getLngString('Cost'),
                                                                                            labelWidth: 160,
                                                                                            anchor: '50%',
                                                                                            value: data.Cost
                                                                                        },
                                                                                        {
                                                                                            xtype: 'combo',
                                                                                            fieldLabel: meView.getLngString('Is Ranged'),
                                                                                            labelWidth: 160,
                                                                                            anchor: '50%',
                                                                                            store: Ext.create('Ext.data.Store', {
                                                                                                fields: ['val', 'name'],
                                                                                                data: [
                                                                                                    {"val": false, "name": meView.getLngString("No")},
                                                                                                    {"val": true, "name": meView.getLngString("Yes")}
                                                                                                ]
                                                                                            }),
                                                                                            displayField: 'name',
                                                                                            valueField: 'val',
                                                                                            name: 'IsRanged',
                                                                                            value: data.IsRanged,
                                                                                            editable: false
                                                                                        },
                                                                                        {
                                                                                            xtype: 'combo',
                                                                                            fieldLabel: meView.getLngString('Rarity'),
                                                                                            name: 'Rarity',
                                                                                            labelWidth: 160,
                                                                                            anchor: '50%',
                                                                                            store: Ext.create('Ext.data.Store', {
                                                                                                fields: ['val', 'name'],
                                                                                                data: [
                                                                                                    {"val": 0, "name": meView.getLngString("Common")},
                                                                                                    {"val": 1, "name": meView.getLngString("UnCommon")},
                                                                                                    {"val": 2, "name": meView.getLngString("Rare")},
                                                                                                    {"val": 3, "name": meView.getLngString("Ultra Rare")}
                                                                                                ]
                                                                                            }),
                                                                                            displayField: 'name',
                                                                                            valueField: 'val',
                                                                                            value: data.Rarity,
                                                                                            editable: false
                                                                                        },
                                                                                        {
                                                                                            xtype: 'combo',
                                                                                            fieldLabel: meView.getLngString('Affinity'),
                                                                                            name: 'Affinity',
                                                                                            labelWidth: 160,
                                                                                            anchor: '50%',
                                                                                            store: Ext.create('Ext.data.Store', {
                                                                                                fields: ['val', 'name'],
                                                                                                data: [
                                                                                                    {"val": -1, "name": meView.getLngString("None")},
                                                                                                    {"val": 0, "name": meView.getLngString("Frost")},
                                                                                                    {"val": 1, "name": meView.getLngString("Fire")},
                                                                                                    {"val": 2, "name": meView.getLngString("Nature")},
                                                                                                    {"val": 3, "name": meView.getLngString("Shadow")}
                                                                                                ]
                                                                                            }),
                                                                                            displayField: 'name',
                                                                                            valueField: 'val',
                                                                                            value: data.Affinity,
                                                                                            editable: false
                                                                                        },
                                                                                        {
                                                                                            xtype: 'combo',
                                                                                            fieldLabel: meView.getLngString('Type'),
                                                                                            name: 'Type',
                                                                                            labelWidth: 160,
                                                                                            anchor: '50%',
                                                                                            store: Ext.create('Ext.data.Store', {
                                                                                                fields: ['val', 'name'],
                                                                                                data: [
                                                                                                    {"val": 0, "name": meView.getLngString("Spell")},
                                                                                                    {"val": 2, "name": meView.getLngString("Creature")},
                                                                                                    {"val": 3, "name": meView.getLngString("Building")}
                                                                                                ]
                                                                                            }),
                                                                                            displayField: 'name',
                                                                                            valueField: 'val',
                                                                                            value: data.Type,
                                                                                            editable: false
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('Orbs required'),
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '40%',
                                                                                                    name: 'Orb1',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": '', "name": "-"},
                                                                                                            {"val": '1', "name": meView.getLngString("Neutral")},
                                                                                                            {"val": 'B', "name": meView.getLngString("Frost")},
                                                                                                            {"val": 'R', "name": meView.getLngString("Fire")},
                                                                                                            {"val": 'N', "name": meView.getLngString("Nature")},
                                                                                                            {"val": 'S', "name": meView.getLngString("Shadow")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: ((data.OrbInfo && data.OrbInfo.OrbCode) ? (data.OrbInfo.OrbCode.split('')[0]) : ''),
                                                                                                    editable: false
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: '',
                                                                                                    labelWidth: 0,
                                                                                                    anchor: '20%',
                                                                                                    name: 'Orb2',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": '', "name": "-"},
                                                                                                            {"val": '1', "name": meView.getLngString("Neutral")},
                                                                                                            {"val": 'B', "name": meView.getLngString("Frost")},
                                                                                                            {"val": 'R', "name": meView.getLngString("Fire")},
                                                                                                            {"val": 'N', "name": meView.getLngString("Nature")},
                                                                                                            {"val": 'S', "name": meView.getLngString("Shadow")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: ((data.OrbInfo && data.OrbInfo.OrbCode) ? (data.OrbInfo.OrbCode.split('')[1]) : ''),
                                                                                                    editable: false
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: '',
                                                                                                    labelWidth: 0,
                                                                                                    anchor: '20%',
                                                                                                    name: 'Orb3',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": '', "name": "-"},
                                                                                                            {"val": '1', "name": meView.getLngString("Neutral")},
                                                                                                            {"val": 'B', "name": meView.getLngString("Frost")},
                                                                                                            {"val": 'R', "name": meView.getLngString("Fire")},
                                                                                                            {"val": 'N', "name": meView.getLngString("Nature")},
                                                                                                            {"val": 'S', "name": meView.getLngString("Shadow")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: ((data.OrbInfo && data.OrbInfo.OrbCode) ? (data.OrbInfo.OrbCode.split('')[2]) : ''),
                                                                                                    editable: false
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: '',
                                                                                                    labelWidth: 0,
                                                                                                    anchor: '20%',
                                                                                                    name: 'Orb4',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": '', "name": "-"},
                                                                                                            {"val": '1', "name": meView.getLngString("Neutral")},
                                                                                                            {"val": 'B', "name": meView.getLngString("Frost")},
                                                                                                            {"val": 'R', "name": meView.getLngString("Fire")},
                                                                                                            {"val": 'N', "name": meView.getLngString("Nature")},
                                                                                                            {"val": 'S', "name": meView.getLngString("Shadow")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: ((data.OrbInfo && data.OrbInfo.OrbCode) ? (data.OrbInfo.OrbCode.split('')[3]) : ''),
                                                                                                    editable: false
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }

                                                                    ]
                                                                }




                                                            ]
                                                        },
                                                        {
                                                            title: meView.getLngString('Base card upgrade data'),
                                                            layout: 'fit',
                                                            iconCls: 'x-fa fa-newspaper-o',
                                                            items: [
                                                                {
                                                                    layout: 'border',
                                                                    height: 600,
                                                                    items: [
                                                                        {
                                                                            region: "center",
                                                                            flex: 1,
                                                                            layout: 'fit',
                                                                            xtype: 'form',
                                                                            scrollable: 'y',
                                                                            itemId: 'cardEditorDataFormBase',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            title: meView.getLngString('Base Information'),
                                                                                            style: {
                                                                                                'margin-bottom': '9px'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel: meView.getLngString('Offense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'BaseOffense',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Offense.None ? data.Offense.None : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('Offense Type'),
                                                                                                    name: 'BaseOffenseType',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                            {"val": 0, "name": meView.getLngString("Small")},
                                                                                                            {"val": 1, "name": meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name": meView.getLngString("Large")},
                                                                                                            {"val": 3, "name": meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name": meView.getLngString("Special")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: data.OffenseType,
                                                                                                    editable: false
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel: meView.getLngString('Defense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'BaseDefense',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Defense.None ? data.Defense.None : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('Defense Type'),
                                                                                                    name: 'BaseDefenseType',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                            {"val": 0, "name": meView.getLngString("Small")},
                                                                                                            {"val": 1, "name": meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name": meView.getLngString("Large")},
                                                                                                            {"val": 3, "name": meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name": meView.getLngString("Regular")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: (data.DefenseType.None ? data.DefenseType.None : -1),
                                                                                                    editable: false
                                                                                                }

                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('Unit Count'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'BaseUnitCount',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.UnitCount.None ? data.UnitCount.None : 0)
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('Charge Count'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'BaseChargeCount',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.ChargeCount.None ? data.ChargeCount.None : 0)
                                                                                        },
                                                                                        {
                                                                                            title: meView.getLngString('Level')+' I',
                                                                                            style: {
                                                                                                'margin-bottom': '9px'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel: meView.getLngString('Offense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'OffenseLevelI',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Offense.One ? data.Offense.One : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('OffenseType'),
                                                                                                    name: 'OffenseTypeLevelI',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                            {"val": 0, "name": meView.getLngString("Small")},
                                                                                                            {"val": 1, "name": meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name": meView.getLngString("Large")},
                                                                                                            {"val": 3, "name": meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name": meView.getLngString("Special")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: (data.OffenseType.One ? data.OffenseType.One : -1),
                                                                                                    editable: false
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel: meView.getLngString('Defense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'DefenseLevelI',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Defense.One ? data.Defense.One : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('DefenseType'),
                                                                                                    name: 'DefenseTypeLevelI',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                            {"val": 0, "name": meView.getLngString("Small")},
                                                                                                            {"val": 1, "name": meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name": meView.getLngString("Large")},
                                                                                                            {"val": 3, "name": meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name": meView.getLngString("Regular")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: (data.DefenseType.One ? data.DefenseType.One : -1),
                                                                                                    editable: false
                                                                                                }

                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('UnitCount'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'UnitCountLevelI',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.UnitCount.One ? data.UnitCount.One : 0)
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('ChargeCount'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'ChargeCountLevelI',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.ChargeCount.One ? data.ChargeCount.One : 0)
                                                                                        },
                                                                                        {
                                                                                            title: meView.getLngString('Level')+' II',
                                                                                            style: {
                                                                                                'margin-bottom': '9px'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel: meView.getLngString('Offense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'OffenseLevelII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Offense.Two ? data.Offense.Two : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('OffenseType'),
                                                                                                    name: 'OffenseTypeLevelII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                            {"val": 0, "name": meView.getLngString("Small")},
                                                                                                            {"val": 1, "name": meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name": meView.getLngString("Large")},
                                                                                                            {"val": 3, "name": meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name": meView.getLngString("Special")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: (data.OffenseType.Two ? data.OffenseType.Two : -1),
                                                                                                    editable: false
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel: meView.getLngString('Defense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'DefenseLevelII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Defense.Two ? data.Defense.Two : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('DefenseType'),
                                                                                                    name: 'DefenseTypeLevelII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                            {"val": 0, "name": meView.getLngString("Small")},
                                                                                                            {"val": 1, "name": meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name": meView.getLngString("Large")},
                                                                                                            {"val": 3, "name": meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name": meView.getLngString("Regular")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: (data.DefenseType.Two ? data.DefenseType.Two : -1),
                                                                                                    editable: false
                                                                                                }

                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('UnitCount'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'UnitCountLevelII',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.UnitCount.Two ? data.UnitCount.Two : 0)
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('ChargeCount'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'ChargeCountLevelII',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.ChargeCount.Two ? data.ChargeCount.Two : 0)
                                                                                        },
                                                                                        {
                                                                                            title: meView.getLngString('Level')+' III',
                                                                                            style: {
                                                                                                'margin-bottom': '9px'
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel:  meView.getLngString('Offense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'OffenseLevelIII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Offense.Three ? data.Offense.Three : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel:  meView.getLngString('OffenseType'),
                                                                                                    name: 'OffenseTypeLevelIII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name":  meView.getLngString("None")},
                                                                                                            {"val": 0, "name":  meView.getLngString("Small")},
                                                                                                            {"val": 1, "name":  meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name":  meView.getLngString("Large")},
                                                                                                            {"val": 3, "name":  meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name":  meView.getLngString("Special")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: (data.OffenseType.Three ? data.OffenseType.Three : -1),
                                                                                                    editable: false
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            xtype: 'container',
                                                                                            layout: 'hbox',
                                                                                            margin: '0 5 10 0',
                                                                                            anchor: '100%',
                                                                                            items: [
                                                                                                {
                                                                                                    fieldLabel: meView.getLngString('Defense'),
                                                                                                    xtype: 'numberfield',
                                                                                                    name: 'DefenseLevelIII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    value: (data.Defense.Three ? data.Defense.Three : 0),
                                                                                                    style: {
                                                                                                        'margin-right': '9px'
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    xtype: 'combo',
                                                                                                    fieldLabel: meView.getLngString('DefenseType'),
                                                                                                    name: 'DefenseTypeLevelIII',
                                                                                                    labelWidth: 160,
                                                                                                    anchor: '50%',
                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                        fields: ['val', 'name'],
                                                                                                        data: [
                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                            {"val": 0, "name": meView.getLngString("Small")},
                                                                                                            {"val": 1, "name": meView.getLngString("Medium")},
                                                                                                            {"val": 2, "name": meView.getLngString("Large")},
                                                                                                            {"val": 3, "name": meView.getLngString("Extra Large")},
                                                                                                            {"val": 4, "name": meView.getLngString("Regular")}
                                                                                                        ]
                                                                                                    }),
                                                                                                    displayField: 'name',
                                                                                                    valueField: 'val',
                                                                                                    value: (data.DefenseType.Three ? data.DefenseType.Three : -1),
                                                                                                    editable: false
                                                                                                }

                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('UnitCount'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'UnitCountLevelIII',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.UnitCount.Three ? data.UnitCount.Three : 0)
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('ChargeCount'),
                                                                                            xtype: 'numberfield',
                                                                                            name: 'ChargeCountLevelIII',
                                                                                            labelWidth: 160,
                                                                                            anchor: '30%',
                                                                                            value: (data.ChargeCount.Three ? data.ChargeCount.Three : 0)
                                                                                        }
                                                                                    ]
                                                                                }


                                                                            ]
                                                                        }

                                                                    ]
                                                                }




                                                            ]
                                                        }
                                                    ]

                                                }
                                            ]
                                        },
                                        {
                                            title: '<img src="img/english32.png" width="32" height="32">',
                                            tabCls: 'kill-margins',
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    layout: 'fit',
                                                    cls: 'nokill-margins',
                                                    items: [
                                                        {
                                                            title: meView.getLngString('Card data'),
                                                            layout: 'fit',
                                                            iconCls: 'x-fa fa-newspaper-o',
                                                            items: [
                                                                {
                                                                    layout: 'border',
                                                                    height: 600,
                                                                    items: [
                                                                        {
                                                                            region: "center",
                                                                            flex: 1,
                                                                            layout: 'fit',
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorDataFormEN',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('Name'),
                                                                                            xtype: 'textfield',
                                                                                            name: 'Name',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: (data.Name.en ? data.Name.en : '')
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('Category'),
                                                                                            xtype: 'textfield',
                                                                                            name: 'Category',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: (data.Category.en ? data.Category.en : '')
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: meView.getLngString('Extra'),
                                                                                            xtype: 'textarea',
                                                                                            name: 'Extra',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: (data.Extra.en ? data.Extra.en : '')
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            title: meView.getLngString('Abilities'),
                                                            iconCls: 'x-fa fa-sort',
                                                            layout: 'border',
                                                            height: 600,
                                                            items: [
                                                                {
                                                                    xtype: 'tabpanel',
                                                                    layout: 'fit',
                                                                    region: "center",
                                                                    cls: 'nokill-margins',
                                                                    items: [
                                                                        {
                                                                            title: meView.getLngString('Base Card Abilities'),
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormEN0',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: meView.getLngString('Add ability'),
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN0');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelEN0' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: meView.getLngString('Ability Name'),
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: meView.getLngString('Remove ability'),
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN0');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelEN0' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Power'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Order'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Type'),
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Era'),
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Description'),
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsEN0',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('en', 'None', 0, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: meView.getLngString('Lvl I Abilities info'),
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormEN1',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: meView.getLngString('Add ability'),
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN1');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelEN1' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: meView.getLngString('Ability Name'),
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: meView.getLngString('Remove ability'),
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN1');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelEN1' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Power'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Order'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Type'),
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Era'),
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Description'),
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsEN1',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('en', 'One', 1, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: meView.getLngString('Lvl II Abilities info'),
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormEN2',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: meView.getLngString('Add ability'),
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN2');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelEN2' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: meView.getLngString('Ability Name'),
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: meView.getLngString('Remove ability'),
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN2');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelEN2' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Power'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Order'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Type'),
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Era'),
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Description'),
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsEN2',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('en', 'Two', 2, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: meView.getLngString('Lvl III Abilities info'),
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormEN3',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: meView.getLngString('Add ability'),
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN3');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelEN3' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: meView.getLngString('Ability Name'),
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: meView.getLngString('Remove ability'),
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsEN3');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelEN3' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Power'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Order'),
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Type'),
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Ability Era'),
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Ability Description'),
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsEN3',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('en', 'Three', 3, data)
                                                                                }
                                                                            ]

                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: meView.getLngString('Upgrades'),
                                                            iconCls: 'x-fa fa-sort',
                                                            layout: 'border',
                                                            height: 600,
                                                            items: [
                                                                {
                                                                    region: "center",
                                                                    layout: "fit",
                                                                    scrollable: 'y',
                                                                    xtype: 'form',
                                                                    itemId: 'cardEditorUpgradesFormEN0',
                                                                    flex: 1,
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            ui: 'blue',
                                                                            cls: 'boxshadow',
                                                                            items: [
                                                                                '->',
                                                                                {
                                                                                    xtype: 'button',
                                                                                    iconCls: 'x-fa fa-plus',
                                                                                    ui: 'default',
                                                                                    text: meView.getLngString('Add upgrade'),
                                                                                    tooltip: '',
                                                                                    handler: function (btn) {
                                                                                        var time = new Date().getTime();
                                                                                        var cardEditorUpgradesFormPanels = Ext.first('#cardEditorUpgradesFormPanelsEN0');
                                                                                        cardEditorUpgradesFormPanels.add(
                                                                                                {
                                                                                                    xtype: 'fieldcontainer',
                                                                                                    itemId: 'cardEditorUpgradesFormPanelEN0' + time + '',
                                                                                                    layout: 'anchor',
                                                                                                    style: {
                                                                                                        'border-bottom': '1px solid #ccc'
                                                                                                    },
                                                                                                    items: [
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Upgrade Era'),
                                                                                                                    name: 'Upgrade_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'button',
                                                                                                                    iconCls: 'x-fa fa-minus',
                                                                                                                    ui: 'default',
                                                                                                                    text: '',
                                                                                                                    tooltip: meView.getLngString('Remove upgrade'),
                                                                                                                    handler: function () {
                                                                                                                        var cardEditorUpgradesFormPanels = Ext.first('#cardEditorUpgradesFormPanelsEN0');
                                                                                                                        var num = Ext.first('#cardEditorUpgradesFormPanelEN0' + time);
                                                                                                                        cardEditorUpgradesFormPanels.remove(num);
                                                                                                                    }
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            fieldLabel: meView.getLngString('Upgrade Description'),
                                                                                                            xtype: 'textareafield',
                                                                                                            name: 'Upgrade_Description',
                                                                                                            labelAlign: 'top',
                                                                                                            anchor: '90%',
                                                                                                            value: ''
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'displayfield',
                                                                                                                    fieldLabel: meView.getLngString('Upgrade visible'),
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '24%'
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnBase',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": meView.getLngString("Hide on Base card")},
                                                                                                                            {"val": 1, "name": meView.getLngString("Show on Base card")}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnLvlOne',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": meView.getLngString("Hide on Lvl 1 Card")},
                                                                                                                            {"val": 1, "name": meView.getLngString("Show on Lvl 1 Card")}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnLvlTwo',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": meView.getLngString("Hide on Lvl 2 Card")},
                                                                                                                            {"val": 1, "name": meView.getLngString("Show on Lvl 2 Card")}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    fieldLabel: meView.getLngString('Map'),
                                                                                                                    xtype: 'textfield',
                                                                                                                    name: 'Upgrade_Map_Name',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: '',
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: meView.getLngString('Difficulty'),
                                                                                                                    name: 'Upgrade_Map_Difficulty',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": -1, "name": meView.getLngString("None")},
                                                                                                                            {"val": 0, "name": meView.getLngString("Standard")},
                                                                                                                            {"val": 1, "name": meView.getLngString("Advaned")},
                                                                                                                            {"val": 2, "name": meView.getLngString("Expert")}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: -1,
                                                                                                                    editable: false
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }

                                                                                        );
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    items: [
                                                                        {
                                                                            xtype: 'fieldcontainer',
                                                                            itemId: 'cardEditorUpgradesFormPanelsEN0',
                                                                            layout: 'anchor',
                                                                            style: {
                                                                                'padding': '9px'
                                                                            },
                                                                            items: meView.doUpgrades('en', 0, data)
                                                                        }
                                                                    ]

                                                                }
                                                            ]



                                                        }
                                                    ]

                                                }
                                            ]
                                        },
                                        {
                                            title: '<img src="img/deutschland32.png" width="32" height="32">',
                                            tabCls: 'kill-margins',
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    layout: 'fit',
                                                    cls: 'nokill-margins',
                                                    items: [
                                                        {
                                                            title: 'Card data',
                                                            layout: 'fit',
                                                            iconCls: 'x-fa fa-newspaper-o',
                                                            items: [
                                                                {
                                                                    layout: 'border',
                                                                    height: 600,
                                                                    items: [
                                                                        {
                                                                            region: "center",
                                                                            flex: 1,
                                                                            layout: 'fit',
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorDataFormDE',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            fieldLabel: 'Name',
                                                                                            xtype: 'textfield',
                                                                                            name: 'Name',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: data.Name.de
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: 'Category',
                                                                                            xtype: 'textfield',
                                                                                            name: 'Category',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: data.Category.de
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: 'Extra',
                                                                                            xtype: 'textarea',
                                                                                            name: 'Extra',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: data.Extra.de
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            title: 'Abilities',
                                                            iconCls: 'x-fa fa-sort',
                                                            layout: 'border',
                                                            height: 600,
                                                            items: [
                                                                {
                                                                    xtype: 'tabpanel',
                                                                    layout: 'fit',
                                                                    region: "center",
                                                                    cls: 'nokill-margins',
                                                                    items: [
                                                                        {
                                                                            title: 'Base Card Abilities',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormDE0',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE0');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelDE0' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE0');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelDE0' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsDE0',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('de', 'None', 0, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: 'Lvl I Abilities info',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormDE1',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE1');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelDE1' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE1');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelDE1' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsDE1',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('de', 'One', 1, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: 'Lvl II Abilities info',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormDE2',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE2');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelDE2' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE2');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelDE2' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsDE2',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('de', 'Two', 2, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: 'Lvl III Abilities info',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormDE3',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE3');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelDE3' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsDE3');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelDE3' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsDE3',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('de', 'Three', 3, data)
                                                                                }
                                                                            ]

                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'Upgrades',
                                                            iconCls: 'x-fa fa-sort',
                                                            layout: 'border',
                                                            height: 600,
                                                            items: [
                                                                {
                                                                    region: "center",
                                                                    layout: "fit",
                                                                    scrollable: 'y',
                                                                    xtype: 'form',
                                                                    itemId: 'cardEditorUpgradesFormDE0',
                                                                    flex: 1,
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            ui: 'blue',
                                                                            cls: 'boxshadow',
                                                                            items: [
                                                                                '->',
                                                                                {
                                                                                    xtype: 'button',
                                                                                    iconCls: 'x-fa fa-plus',
                                                                                    ui: 'default',
                                                                                    text: 'Add upgrade',
                                                                                    tooltip: '',
                                                                                    handler: function (btn) {
                                                                                        var time = new Date().getTime();
                                                                                        var cardEditorUpgradesFormPanels = Ext.first('#cardEditorUpgradesFormPanelsDE0');
                                                                                        cardEditorUpgradesFormPanels.add(
                                                                                                {
                                                                                                    xtype: 'fieldcontainer',
                                                                                                    itemId: 'cardEditorUpgradesFormPanelDE0' + time + '',
                                                                                                    layout: 'anchor',
                                                                                                    style: {
                                                                                                        'border-bottom': '1px solid #ccc'
                                                                                                    },
                                                                                                    items: [
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Upgrade Era',
                                                                                                                    name: 'Upgrade_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'button',
                                                                                                                    iconCls: 'x-fa fa-minus',
                                                                                                                    ui: 'default',
                                                                                                                    text: '',
                                                                                                                    tooltip: 'Remove upgrade',
                                                                                                                    handler: function () {
                                                                                                                        var cardEditorUpgradesFormPanels = Ext.first('#cardEditorUpgradesFormPanelsDE0');
                                                                                                                        var num = Ext.first('#cardEditorUpgradesFormPanelDE0' + time);
                                                                                                                        cardEditorUpgradesFormPanels.remove(num);
                                                                                                                    }
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            fieldLabel: 'Upgrade Description',
                                                                                                            xtype: 'textareafield',
                                                                                                            name: 'Upgrade_Description',
                                                                                                            labelAlign: 'top',
                                                                                                            anchor: '90%',
                                                                                                            value: ''
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'displayfield',
                                                                                                                    fieldLabel: 'Upgrade visible',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '24%'
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnBase',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "Hide on Base card"},
                                                                                                                            {"val": 1, "name": "Show on Base card"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnLvlOne',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "Hide on Lvl 1 Card"},
                                                                                                                            {"val": 1, "name": "Show on Lvl 1 Card"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnLvlTwo',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "Hide on Lvl 2 Card"},
                                                                                                                            {"val": 1, "name": "Show on Lvl 2 Card"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    fieldLabel: 'Map',
                                                                                                                    xtype: 'textfield',
                                                                                                                    name: 'Upgrade_Map_Name',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: '',
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Difficulty',
                                                                                                                    name: 'Upgrade_Map_Difficulty',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": -1, "name": "None"},
                                                                                                                            {"val": 0, "name": "Standard"},
                                                                                                                            {"val": 1, "name": "Advaned"},
                                                                                                                            {"val": 2, "name": "Expert"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: -1,
                                                                                                                    editable: false
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }

                                                                                        );
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    items: [
                                                                        {
                                                                            xtype: 'fieldcontainer',
                                                                            itemId: 'cardEditorUpgradesFormPanelsDE0',
                                                                            layout: 'anchor',
                                                                            style: {
                                                                                'padding': '9px'
                                                                            },
                                                                            items: meView.doUpgrades('de', 0, data)
                                                                        }
                                                                    ]

                                                                }
                                                            ]



                                                        }
                                                    ]

                                                }
                                            ]

                                        },
                                        {
                                            title: '<img src="img/russia32.png" width="32" height="32">',
                                            tabCls: 'kill-margins',
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    layout: 'fit',
                                                    cls: 'nokill-margins',
                                                    items: [
                                                        {
                                                            title: 'Card data',
                                                            layout: 'fit',
                                                            iconCls: 'x-fa fa-newspaper-o',
                                                            items: [
                                                                {
                                                                    layout: 'border',
                                                                    height: 600,
                                                                    items: [
                                                                        {
                                                                            region: "center",
                                                                            flex: 1,
                                                                            layout: 'fit',
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorDataFormRU',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: [
                                                                                        {
                                                                                            fieldLabel: 'Name',
                                                                                            xtype: 'textfield',
                                                                                            name: 'Name',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: data.Name.ru
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: 'Category',
                                                                                            xtype: 'textfield',
                                                                                            name: 'Category',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: data.Category.ru
                                                                                        },
                                                                                        {
                                                                                            fieldLabel: 'Extra',
                                                                                            xtype: 'textarea',
                                                                                            name: 'Extra',
                                                                                            labelWidth: 160,
                                                                                            anchor: '90%',
                                                                                            value: data.Extra.ru
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        },
                                                        {
                                                            title: 'Abilities',
                                                            iconCls: 'x-fa fa-sort',
                                                            layout: 'border',
                                                            height: 600,
                                                            items: [
                                                                {
                                                                    xtype: 'tabpanel',
                                                                    layout: 'fit',
                                                                    region: "center",
                                                                    cls: 'nokill-margins',
                                                                    items: [
                                                                        {
                                                                            title: 'Base Card Abilities',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormRU0',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU0');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelRU0' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU0');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelRU0' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsRU0',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('ru', 'None', 0, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: 'Lvl I Abilities info',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormRU1',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU1');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelRU1' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU1');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelRU1' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsRU1',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('ru', 'One', 1, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: 'Lvl II Abilities info',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormRU2',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU2');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelRU2' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU2');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelRU2' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsRU2',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('ru', 'Two', 2, data)
                                                                                }
                                                                            ]

                                                                        },
                                                                        {
                                                                            title: 'Lvl III Abilities info',
                                                                            layout: "fit",
                                                                            scrollable: 'y',
                                                                            flex: 1,
                                                                            xtype: 'form',
                                                                            itemId: 'cardEditorAbilitiesFormRU3',
                                                                            dockedItems: [
                                                                                {
                                                                                    xtype: 'toolbar',
                                                                                    dock: 'top',
                                                                                    ui: 'blue',
                                                                                    cls: 'boxshadow',
                                                                                    items: [
                                                                                        '->',
                                                                                        {
                                                                                            xtype: 'button',
                                                                                            iconCls: 'x-fa fa-plus',
                                                                                            ui: 'default',
                                                                                            text: 'Add ability',
                                                                                            tooltip: '',
                                                                                            handler: function (btn) {
                                                                                                var time = new Date().getTime();
                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU3');
                                                                                                cardEditorAbilitiesFormPanels.add(
                                                                                                        {
                                                                                                            xtype: 'fieldcontainer',
                                                                                                            itemId: 'cardEditorAbilitiesFormPanelRU3' + time + '',
                                                                                                            layout: 'anchor',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'container',
                                                                                                                    layout: 'hbox',
                                                                                                                    margin: '0 5 10 0',
                                                                                                                    anchor: '100%',
                                                                                                                    items: [
                                                                                                                        {
                                                                                                                            fieldLabel: 'Ability Name',
                                                                                                                            xtype: 'textfield',
                                                                                                                            name: 'Ability_Name',
                                                                                                                            labelWidth: 160,
                                                                                                                            anchor: '90%',
                                                                                                                            value: ''
                                                                                                                        },
                                                                                                                        {
                                                                                                                            xtype: 'button',
                                                                                                                            iconCls: 'x-fa fa-minus',
                                                                                                                            ui: 'default',
                                                                                                                            text: '',
                                                                                                                            tooltip: 'Remove ability',
                                                                                                                            handler: function () {
                                                                                                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanelsRU3');
                                                                                                                                var num = Ext.first('#cardEditorAbilitiesFormPanelRU3' + time);
                                                                                                                                cardEditorAbilitiesFormPanels.remove(num);
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Power',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Power',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Order',
                                                                                                                    xtype: 'numberfield',
                                                                                                                    name: 'Ability_Order',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: 0
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Type',
                                                                                                                    name: 'Ability_Type',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Ability Era',
                                                                                                                    name: 'Ability_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    fieldLabel: 'Ability Description',
                                                                                                                    xtype: 'textareafield',
                                                                                                                    name: 'Ability_Description',
                                                                                                                    labelAlign: 'top',
                                                                                                                    anchor: '90%',
                                                                                                                    value: ''
                                                                                                                }
                                                                                                            ]
                                                                                                        }

                                                                                                );
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }

                                                                            ],
                                                                            items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    itemId: 'cardEditorAbilitiesFormPanelsRU3',
                                                                                    layout: 'anchor',
                                                                                    style: {
                                                                                        'padding': '9px'
                                                                                    },
                                                                                    items: meView.doAbilities('ru', 'Three', 3, data)
                                                                                }
                                                                            ]

                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            title: 'Upgrades',
                                                            iconCls: 'x-fa fa-sort',
                                                            layout: 'border',
                                                            height: 600,
                                                            items: [
                                                                {
                                                                    region: "center",
                                                                    layout: "fit",
                                                                    scrollable: 'y',
                                                                    xtype: 'form',
                                                                    itemId: 'cardEditorUpgradesFormRU0',
                                                                    flex: 1,
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            ui: 'blue',
                                                                            cls: 'boxshadow',
                                                                            items: [
                                                                                '->',
                                                                                {
                                                                                    xtype: 'button',
                                                                                    iconCls: 'x-fa fa-plus',
                                                                                    ui: 'default',
                                                                                    text: 'Add upgrade',
                                                                                    tooltip: '',
                                                                                    handler: function (btn) {
                                                                                        var time = new Date().getTime();
                                                                                        var cardEditorUpgradesFormPanels = Ext.first('#cardEditorUpgradesFormPanelsRU0');
                                                                                        cardEditorUpgradesFormPanels.add(
                                                                                                {
                                                                                                    xtype: 'fieldcontainer',
                                                                                                    itemId: 'cardEditorUpgradesFormPanelRU0' + time + '',
                                                                                                    layout: 'anchor',
                                                                                                    style: {
                                                                                                        'border-bottom': '1px solid #ccc'
                                                                                                    },
                                                                                                    items: [
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Upgrade Era',
                                                                                                                    name: 'Upgrade_Era',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "0"},
                                                                                                                            {"val": 1, "name": "1"},
                                                                                                                            {"val": 2, "name": "2"},
                                                                                                                            {"val": 3, "name": "3"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 0,
                                                                                                                    editable: false
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'button',
                                                                                                                    iconCls: 'x-fa fa-minus',
                                                                                                                    ui: 'default',
                                                                                                                    text: '',
                                                                                                                    tooltip: 'Remove upgrade',
                                                                                                                    handler: function () {
                                                                                                                        var cardEditorUpgradesFormPanels = Ext.first('#cardEditorUpgradesFormPanelsRU0');
                                                                                                                        var num = Ext.first('#cardEditorUpgradesFormPanelRU0' + time);
                                                                                                                        cardEditorUpgradesFormPanels.remove(num);
                                                                                                                    }
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            fieldLabel: 'Upgrade Description',
                                                                                                            xtype: 'textareafield',
                                                                                                            name: 'Upgrade_Description',
                                                                                                            labelAlign: 'top',
                                                                                                            anchor: '90%',
                                                                                                            value: ''
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    xtype: 'displayfield',
                                                                                                                    fieldLabel: 'Upgrade visible',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '24%'
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnBase',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "Hide on Base card"},
                                                                                                                            {"val": 1, "name": "Show on Base card"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnLvlOne',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "Hide on Lvl 1 Card"},
                                                                                                                            {"val": 1, "name": "Show on Lvl 1 Card"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: '',
                                                                                                                    name: 'Upgrade_Map_ShowOnLvlTwo',
                                                                                                                    labelWidth: 0,
                                                                                                                    anchor: '25%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": 0, "name": "Hide on Lvl 2 Card"},
                                                                                                                            {"val": 1, "name": "Show on Lvl 2 Card"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: 1,
                                                                                                                    editable: false,
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                }
                                                                                                            ]
                                                                                                        },
                                                                                                        {
                                                                                                            xtype: 'container',
                                                                                                            layout: 'hbox',
                                                                                                            margin: '0 5 10 0',
                                                                                                            anchor: '100%',
                                                                                                            items: [
                                                                                                                {
                                                                                                                    fieldLabel: 'Map',
                                                                                                                    xtype: 'textfield',
                                                                                                                    name: 'Upgrade_Map_Name',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    value: '',
                                                                                                                    style: {
                                                                                                                        'margin-right': '9px'
                                                                                                                    }
                                                                                                                },
                                                                                                                {
                                                                                                                    xtype: 'combo',
                                                                                                                    fieldLabel: 'Difficulty',
                                                                                                                    name: 'Upgrade_Map_Difficulty',
                                                                                                                    labelWidth: 160,
                                                                                                                    anchor: '50%',
                                                                                                                    store: Ext.create('Ext.data.Store', {
                                                                                                                        fields: ['val', 'name'],
                                                                                                                        data: [
                                                                                                                            {"val": -1, "name": "None"},
                                                                                                                            {"val": 0, "name": "Standard"},
                                                                                                                            {"val": 1, "name": "Advaned"},
                                                                                                                            {"val": 2, "name": "Expert"}
                                                                                                                        ]
                                                                                                                    }),
                                                                                                                    displayField: 'name',
                                                                                                                    valueField: 'val',
                                                                                                                    value: -1,
                                                                                                                    editable: false
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                }

                                                                                        );
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ],
                                                                    items: [
                                                                        {
                                                                            xtype: 'fieldcontainer',
                                                                            itemId: 'cardEditorUpgradesFormPanelsRU0',
                                                                            layout: 'anchor',
                                                                            style: {
                                                                                'padding': '9px'
                                                                            },
                                                                            items: meView.doUpgrades('ru', 0, data)
                                                                        }
                                                                    ]

                                                                }
                                                            ]



                                                        }
                                                    ]

                                                }
                                            ]
                                        }

                                    ]

                                }
                            ],
                            buttons: [
                                {
                                    text: meView.getLngString('Save card data'),
                                    controller: 'maineditorc',
                                    viewModel: 'mainm',
                                    handler: function (a, b, c) {
                                        a.getController().saveCardData(rec);
                                    }
                                }
                            ]
                        });
                    }
                    _cardEditorOverlay.show();
                }
            }
        });




        this.callParent(arguments);
    },
    doAbilities: function (lang, lvl, lvlnum, data) {
        var meView=this;
        var abilityPanels = [];

        var Abilities = data.Abilities[lang][lvl];

        if (Abilities.length > 0) {
            var i = 0;
            for (i; i < Abilities.length; i++) {
                var Ability = Abilities[i];
                abilityPanels.push(
                        {
                            xtype: 'fieldcontainer',
                            itemId: 'cardEditorAbilitiesFormPanel' + lang.toUpperCase() + '' + lvlnum + '' + i,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 5 10 0',
                                    anchor: '100%',
                                    items: [
                                        {
                                            fieldLabel: meView.getLngString('Ability Name'),
                                            xtype: 'textfield',
                                            name: 'Ability_Name',
                                            labelWidth: 160,
                                            anchor: '90%',
                                            value: Ability.Name
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-minus',
                                            ui: 'default',
                                            text: '',
                                            tooltip: meView.getLngString('Remove ability'),
                                            handler: function (btn) {
                                                var cardEditorAbilitiesFormPanels = Ext.first('#cardEditorAbilitiesFormPanels' + lang.toUpperCase() + '' + lvlnum + '');
                                                var num = btn.up('container').up('fieldcontainer');
                                                cardEditorAbilitiesFormPanels.remove(num);
                                            }
                                        }
                                    ]
                                },
                                {
                                    fieldLabel: meView.getLngString('Ability Power'),
                                    xtype: 'numberfield',
                                    name: 'Ability_Power',
                                    labelWidth: 160,
                                    anchor: '50%',
                                    value: Ability.Power
                                },
                                {
                                    fieldLabel: meView.getLngString('Ability Order'),
                                    xtype: 'numberfield',
                                    name: 'Ability_Order',
                                    labelWidth: 160,
                                    anchor: '50%',
                                    value: Ability.Order
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: meView.getLngString('Ability Type'),
                                    name: 'Ability_Type',
                                    labelWidth: 160,
                                    anchor: '50%',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['val', 'name'],
                                        data: [
                                            {"val": 0, "name": "0"},
                                            {"val": 1, "name": "1"},
                                            {"val": 2, "name": "2"},
                                            {"val": 3, "name": "3"}
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'val',
                                    value: Ability.Type,
                                    editable: false
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: meView.getLngString('Ability Era'),
                                    name: 'Ability_Era',
                                    labelWidth: 160,
                                    anchor: '50%',
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['val', 'name'],
                                        data: [
                                            {"val": 0, "name": "0"},
                                            {"val": 1, "name": "1"},
                                            {"val": 2, "name": "2"},
                                            {"val": 3, "name": "3"}
                                        ]
                                    }),
                                    displayField: 'name',
                                    valueField: 'val',
                                    value: Ability.Era,
                                    editable: false
                                },
                                {
                                    fieldLabel: meView.getLngString('Ability Description'),
                                    xtype: 'textareafield',
                                    name: 'Ability_Description',
                                    labelAlign: 'top',
                                    anchor: '90%',
                                    value: Ability.Description
                                }
                            ]
                        }
                );
            }

        }
        return abilityPanels;
    },
    doUpgrades: function (lang, lvlnum, data) {
var meView=this;
        var upgradePanels = [];

        var Upgrades = data.Upgrades[lang];

        var iu = 0;


        if (Upgrades.length > 0) {
            for (iu; iu < Upgrades.length; iu++) {

                var Upgrade = Upgrades[iu];
                upgradePanels.push(
                        {
                            xtype: 'fieldcontainer',
                            itemId: 'cardEditorUpgradesFormPanel' + lang.toUpperCase() + '' + lvlnum + '' + iu,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 5 10 0',
                                    anchor: '100%',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: meView.getLngString('Upgrade Era'),
                                            name: 'Upgrade_Era',
                                            labelWidth: 160,
                                            anchor: '50%',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['val', 'name'],
                                                data: [
                                                    {"val": 0, "name": "0"},
                                                    {"val": 1, "name": "1"},
                                                    {"val": 2, "name": "2"},
                                                    {"val": 3, "name": "3"}
                                                ]
                                            }),
                                            displayField: 'name',
                                            valueField: 'val',
                                            value: Upgrade.Era,
                                            editable: false
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-minus',
                                            ui: 'default',
                                            text: '',
                                            tooltip: meView.getLngString('Remove upgrade'),
                                            handler: function (btn) {

                                                var cardEditorUpgradesFormPanels = Ext.first('#cardEditorUpgradesFormPanels');
                                                var num = btn.up('container').up('fieldcontainer');
                                                cardEditorUpgradesFormPanels.remove(num);
                                            }
                                        }
                                    ]
                                },
                                {
                                    fieldLabel: meView.getLngString('Upgrade Description'),
                                    xtype: 'textareafield',
                                    name: 'Upgrade_Description',
                                    labelAlign: 'top',
                                    anchor: '90%',
                                    value: Upgrade.Description
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 5 10 0',
                                    anchor: '100%',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: meView.getLngString('Upgrade visible'),
                                            labelWidth: 160,
                                            anchor: '24%'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: '',
                                            name: 'Upgrade_Map_ShowOnBase',
                                            labelWidth: 0,
                                            anchor: '25%',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['val', 'name'],
                                                data: [
                                                    {"val": 0, "name": meView.getLngString("Hide on Base card")},
                                                    {"val": 1, "name": meView.getLngString("Show on Base card")}
                                                ]
                                            }),
                                            displayField: 'name',
                                            valueField: 'val',
                                            value: Upgrade.Show.Base,
                                            editable: false,
                                            style: {
                                                'margin-right': '9px'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: '',
                                            name: 'Upgrade_Map_ShowOnLvlOne',
                                            labelWidth: 0,
                                            anchor: '25%',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['val', 'name'],
                                                data: [
                                                    {"val": 0, "name": meView.getLngString("Hide on Lvl 1 Card")},
                                                    {"val": 1, "name": meView.getLngString("Show on Lvl 1 Card")}
                                                ]
                                            }),
                                            displayField: 'name',
                                            valueField: 'val',
                                            value: Upgrade.Show.One,
                                            editable: false,
                                            style: {
                                                'margin-right': '9px'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: '',
                                            name: 'Upgrade_Map_ShowOnLvlTwo',
                                            labelWidth: 0,
                                            anchor: '25%',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['val', 'name'],
                                                data: [
                                                    {"val": 0, "name": meView.getLngString("Hide on Lvl 2 Card")},
                                                    {"val": 1, "name": meView.getLngString("Show on Lvl 2 Card")}
                                                ]
                                            }),
                                            displayField: 'name',
                                            valueField: 'val',
                                            value: Upgrade.Show.Two,
                                            editable: false,
                                            style: {
                                                'margin-right': '9px'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 5 10 0',
                                    anchor: '100%',
                                    items: [
                                        {
                                            fieldLabel: meView.getLngString('Map'),
                                            xtype: 'textfield',
                                            name: 'Upgrade_Map_Name',
                                            labelWidth: 160,
                                            anchor: '50%',
                                            value: ((Upgrade.Map && Upgrade.Map.Name) ? Upgrade.Map.Name : ''),
                                            style: {
                                                'margin-right': '9px'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: meView.getLngString('Difficulty'),
                                            name: 'Upgrade_Map_Difficulty',
                                            labelWidth: 160,
                                            anchor: '50%',
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['val', 'name'],
                                                data: [
                                                    {"val": -1, "name": meView.getLngString("None")},
                                                    {"val": 0, "name": meView.getLngString("Standard")},
                                                    {"val": 1, "name": meView.getLngString("Advaned")},
                                                    {"val": 2, "name": meView.getLngString("Expert")}
                                                ]
                                            }),
                                            displayField: 'name',
                                            valueField: 'val',
                                            value: ((Upgrade.Map && Upgrade.Map.Difficulty) ? Upgrade.Map.Difficulty : -1),
                                            editable: false
                                        }
                                    ]
                                }
                            ]
                        }


                );
            }

        }
        return upgradePanels;
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
     testExists: function (item) {

        if ((typeof item) === "undefined" || item === null) {
            return false;
        } else {
            return true;
        }
    }
});
