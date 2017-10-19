
Ext.define('slrcards.view.MapData', {
    extend: 'Ext.panel.Panel',
    xtype: 'mapdata',
    alias: 'widget.mapdata',
    itemId: 'mapdata',
    requires: [],
    controller: 'mainc',
    viewModel: 'mainm',
    layout: 'border',
    mrecord: null,
    mindex: null,
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
                            xtype: 'container',
                            html: '',
                            style: "margin-right:10px;"
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Back to maps',
                            iconCls: 'x-fa fa-map',
                            ui: 'default',
                            handler: function () {
                                var panel = Ext.first('#main');
                                panel.getLayout().setActiveItem(2);
                                document.title = 'Battleforge maps';

                            }

                        }
                    ]
                },
                {
                    xtype: 'panel',
                    dock: 'bottom',
                    ui: 'blue',
                    bodyStyle: "background-image:url('img/pattern.png')  !important;",
                    cls: 'pattern-bg boxshadow-top',
                    html: '<div style="padding-left:5px;padding-bottom:3px;padding-top:2px;">Legal: Images and card text are copyright of Electronic Arts Inc.</div>'

                }
            ],
            items: [
                {
                    region: 'center',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    bodyPadding: 0,
                    border: false,
                    width: '100%',
                    scrollable: 'y',
                    bodyClass: 'pattern-bg',
                    bodyStyle: "background-color:#303030;background-image:url('img/pattern.png')",
                    items: [
                        {
                            xtype: 'container',
                            style: "background-color:#5fa2dd;background-image:url('img/pattern.png')",
                            width: 35,
                            items: [
                                {
                                    xtype: 'button',
                                    text: '',
                                    iconCls: 'x-fa fa-mail-reply',
                                    ui: 'default',
                                    controller: 'mainc',
                                    viewModel: 'mainm',
                                    handler: function () {
                                         
                                        this.getController().loadPreviousMapInfo(meview.mrecord, meview.mindex);

                                    }

                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            padding: 5,
                            itemId: "mapinfoContainer", scrollable: 'y',
                            flex: 1
                        },
                        {
                            xtype: 'container',
                            style: "background-color:#5fa2dd;background-image:url('img/pattern.png')",
                            width: 35,
                            items: [
                                {
                                    xtype: 'button',
                                    text: '',
                                    iconCls: 'x-fa fa-mail-forward',
                                    ui: 'default',
                                    controller: 'mainc',
                                    viewModel: 'mainm',
                                    handler: function () {
                                         
                                        this.getController().loadNextMapInfo(meview.mrecord, meview.mindex);

                                    }

                                }
                            ]
                        }

                    ]
                },
                {
                    region: 'south',
                    layout: 'hbox',
                    bodyPadding: 0,
                    border: false,
                    height: 0,
                    cls: 'boxshadow-top pattern-bg',
                    items: [
                    ]
                }
            ]
        });

        this.callParent(arguments);
    }
});
