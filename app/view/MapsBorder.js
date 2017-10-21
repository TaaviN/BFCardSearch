
Ext.define('slrcards.view.MapsBorder', {
    extend: 'Ext.panel.Panel',
    xtype: 'mapsborder',
    alias: 'widget.mapsborder',
    itemId: 'mapsborder',
    requires: [],
    controller: 'mainc',
    viewModel: 'mainm',
    layout: 'border',
    initComponent: function () {
        var me = this;
        var meview = this;
        Ext.apply(this, {
            tbar: 
                {
                    xtype: 'toolbar', 
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
                            xtype: 'container',
                            
                            title: 'Battleforge maps',
                            style: "margin-right:10px;"
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Back to cards',
                            iconCls: 'x-fa fa-map',
                            ui: 'default',
                            handler: function () {
                                var panel = Ext.first('#main');
                                panel.getLayout().setActiveItem(1);
                                document.title = 'Battleforge cards';

                            }

                        }
                    ]
                } 
            ,
            items: [
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
                            style: "background-color:transparent !important;padding-top:7px;padding-left:7px;",
                            xtype: "mapsdataview"
                        }
                    ]
                } 
            ],
            bbar:{
                    xtype: 'panel', 
                    ui: 'blue',
                    bodyStyle: "background-image:url('img/pattern.png')  !important;",
                    cls: 'pattern-bg boxshadow-top',
                    html: '<div style="padding-left:5px;padding-bottom:3px;padding-top:2px;">Legal: Images and card text are copyright of Electronic Arts Inc. <div style="float:right;padding-right:10px">Made by <a style="color:#fff;text-decoration:none" href="https://forum.skylords.eu/index.php?/profile/13016-ice/">ICE</a> Copyright 2017</div></div>'

                }
        });

        this.callParent(arguments);
    },
    saveDeckData: function (btn) {
        this.getController().saveDeckData(btn);
    },
    doCardStoreSorting: function (newValue) {
        return this.getController().doCardStoreSorting(newValue);
    },
    setVisibleCount: function () {
        return this.getController().setVisibleCount();
    },
    doCardSearch: function (type, newValue) {
        _app.doCardSearch(type, newValue);
    },
    testStringQ: function () {
        return this.getController().testStringQ();
    },
    testSort: function () {
        return this.getController().testSort();
    },
    testCheck: function (type) {
        var val = this.getController().testCheck(type);

        return val;
    }
});
