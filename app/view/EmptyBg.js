
Ext.define('slrcards.view.EmptyBg', {
    extend: 'Ext.panel.Panel',
    xtype: 'emptybg',
    alias: 'widget.emptybg',
    itemId: 'emptybg',
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
                        '->',
                        {
                            xtype: 'button',
                            text: meview.getLngString('Back to card search'),
                            ui: 'default',
                            handler: function () {
                                var panel = Ext.first('#main');
                                panel.getLayout().setActiveItem(1);
                                document.title = meview.getLngString('Battleforge cards');

                            }

                        }
                    ]
                } ,
            items: [
                {
                    region: 'center',
                    layout: 'fit',
                    bodyPadding: 0,
                    border: false,
                    scrollable: 'y',
                    bodyClass: 'pattern-bg',
                    bodyStyle: "background-color:#303030;background-image:url('img/pattern.png')",
                    items: []
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
