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


var addMyCardsM = false, delMyCardsM = false;
Ext.define('slrcards.view.CardsBorder', {
    extend: 'Ext.panel.Panel',
    xtype: 'cardsborder',
    alias: 'widget.cardsborder',
    itemId: 'cardsborder',
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
                            xtype: 'button',
                            width: 32,
                            height: 32,
                            ui: 'plain',
                            html: (window.localStorage.getItem('BaFoLNG') == 'en' ? '<img src="img/english32tick.png" width="32" height="32">' : '<img src="img/english32.png" width="32" height="32">'),
                            style: "margin-right:5px;",
                            itemId: 'BaFoLNGEN',
                            disabled: (window.localStorage.getItem('BaFoLNG') == 'en' ? true : false),
                            handler: function (btn) {
                                var en = Ext.first('#BaFoLNGEN');
                                var de = Ext.first('#BaFoLNGDE');
                                var ru = Ext.first('#BaFoLNGRU');
                                en.setDisabled(true);
                                de.setDisabled(false);
                                ru.setDisabled(false);
                                en.setHtml('<img src="img/english32tick.png" width="32" height="32">');
                                de.setHtml('<img src="img/deutschland32.png" width="32" height="32">');
                                ru.setHtml('<img src="img/russia32.png" width="32" height="32">');
                                window.localStorage.setItem('BaFoLNG', 'en');
                                meview.doLanguageChange();

                            }
                        },
                        {
                            xtype: 'button',
                            width: 32,
                            height: 32,
                            ui: 'plain',
                            html: (window.localStorage.getItem('BaFoLNG') == 'de' ? '<img src="img/deutschland32tick.png" width="32" height="32">' : '<img src="img/deutschland32.png" width="32" height="32">'),
                            style: "margin-right:5px;",
                            itemId: 'BaFoLNGDE',
                            disabled: (window.localStorage.getItem('BaFoLNG') == 'de' ? true : false),
                            handler: function (btn) {
                                var en = Ext.first('#BaFoLNGEN');
                                var de = Ext.first('#BaFoLNGDE');
                                var ru = Ext.first('#BaFoLNGRU');
                                en.setDisabled(false);
                                de.setDisabled(true);
                                ru.setDisabled(false);
                                en.setHtml('<img src="img/english32.png" width="32" height="32">');
                                de.setHtml('<img src="img/deutschland32tick.png" width="32" height="32">');
                                ru.setHtml('<img src="img/russia32.png" width="32" height="32">');
                                window.localStorage.setItem('BaFoLNG', 'de');
                                meview.doLanguageChange();

                            }
                        },
                        {
                            xtype: 'button',
                            width: 32,
                            height: 32,
                            ui: 'plain',
                            html: (window.localStorage.getItem('BaFoLNG') == 'ru' ? '<img src="img/russia32tick.png" width="32" height="32">' : '<img src="img/russia32.png" width="32" height="32">'),
                            style: "margin-right:15px;",
                            itemId: 'BaFoLNGRU',
                            disabled: (window.localStorage.getItem('BaFoLNG') == 'ru' ? true : false),
                            handler: function (btn) {
                                var en = Ext.first('#BaFoLNGEN');
                                var de = Ext.first('#BaFoLNGDE');
                                var ru = Ext.first('#BaFoLNGRU');
                                en.setDisabled(false);
                                de.setDisabled(false);
                                ru.setDisabled(true);

                                en.setHtml('<img src="img/english32.png" width="32" height="32">');
                                de.setHtml('<img src="img/deutschland32.png" width="32" height="32">');
                                ru.setHtml('<img src="img/russia32tick.png" width="32" height="32">');

                                window.localStorage.setItem('BaFoLNG', 'ru');
                                meview.doLanguageChange();

                            }
                        },
                        {
                            xtype: 'button',
                            text: me.setVisibleCount(),
                            iconCls: 'fa fa-search',
                            ui: 'default',
                            tooltip: meview.getLngString('Found cards counter'),
                            style: "margin-right:40px;-moz-border-radius: 4px;-webkit-border-radius: 4px;-khtml-border-radius: 4px;border-radius: 4px;",
                            itemId: "cardsSearchCounter"
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: meview.getLngString('My decks'),
                            itemId: 'topbarmydecksbutton',
                            iconCls: 'x-fa fa-folder',
                            ui: 'default',
                            handler: function () {
                                if (_actionsheet) {
                                    _actionsheet.destroy(this);
                                    _actionsheet = null;
                                }
                                if (!_actionsheet) {

                                    _actionsheet = Ext.create('Ext.window.Window', {
                                        title: meview.getLngString('Created decks'),
                                        height: 600,
                                        width: 900,
                                        controller: 'mainc',
                                        viewModel: 'mainm',
                                        scrollable: 'y',
                                        tools: [
                                        ],
                                        bodyStyle: "background-color:#000000;background:#000 url('img/back.jpg') no-repeat center center;background-size:cover;background-attachment: fixed;",
                                        items: [
                                            {
                                                xtype: "decksdata"
                                            }
                                        ]
                                    });
                                }
                                _actionsheet.show();
                            }

                        },
                        {
                            xtype: 'button',
                            text: meview.getLngString('Maps'),
                            iconCls: 'x-fa fa-map',
                            ui: 'default',
                            itemId: 'topbarmapsbutton',
                            handler: function () {
                                var panel = Ext.first('#main');
                                panel.getLayout().setActiveItem(2);
                                document.title = meview.getLngString('Battleforge maps');


                            }

                        },
                        {xtype: 'tbspacer'},
                        {xtype: 'tbseparator'},
                        {xtype: 'tbspacer'},
                        {
                            xtype: 'button',
                            text: meview.getLngString('Mini games'),
                            iconCls: 'x-fa fa-file',
                            ui: 'default',
                            itemId: 'topbarminigamesbutton',
                            menu: [
                                {
                                    text: meview.getLngString('Match a card'),
                                    iconCls: 'x-fa fa-file',
                                    ui: 'default',
                                    handler: function () {
                                        if (_actionsheet) {
                                            _actionsheet.destroy(this);
                                            _actionsheet = null;
                                        }
                                        if (!_actionsheet) {
                                            _actionsheet = Ext.create('Ext.window.Window', {
                                                title: meview.getLngString('Match a card'),
                                                controller: 'mainc',
                                                viewModel: 'mainm',
                                                scrollable: 'y',
                                                height: 700,
                                                width: 800,
                                                dockedItems: [
                                                    {
                                                        xtype: 'toolbar',
                                                        dock: 'top',
                                                        ui: 'blue',
                                                        cls: 'boxshadow battern-bg',
                                                        items: [
                                                            {
                                                                xtype: 'button',
                                                                text: meview.getLngString('Matches found') + ' 0',
                                                                itemId: "cardsGameMatchesCounter",
                                                                ui: 'default',
                                                                hidden: true,
                                                                disabled: true

                                                            },
                                                            {
                                                                xtype: 'button',
                                                                text: meview.getLngString('Moves made') + ' 0',
                                                                itemId: "cardsGameMoveCounter",
                                                                ui: 'default',
                                                                hidden: true,
                                                                disabled: true


                                                            },
                                                            '->',
                                                            {
                                                                xtype: 'button',
                                                                text: meview.getLngString('Start'),
                                                                iconCls: 'x-fa fa-play',
                                                                ui: 'default',
                                                                controller: 'gamec',
                                                                viewModel: 'mainm',
                                                                handler: function () {
                                                                    this.getController().startGame();
                                                                }

                                                            }


                                                        ]
                                                    }

                                                ],
                                                bodyStyle: "background-color:#000000;background:#000 url('img/back.jpg') no-repeat center center;background-size:cover;background-attachment: fixed;",
                                                items: [
                                                    {
                                                        xtype: "matchacard"
                                                    }
                                                ]
                                            });
                                        }
                                        _actionsheet.show();
                                    }

                                }
                            ]

                        },
                        {
                            xtype: 'button',
                            text: meview.getLngString('GitHub'),
                            iconCls: 'x-fa fa-code-fork',
                            tooltip: meview.getLngString('GitHub Repo'),
                            ui: 'default',
                            href: 'https://github.com/TaaviN/BFCardSearch',
                            itemId: 'topbargitbutton',
                            hrefTarget: '_blank'

                        },
                       {
                            xtype: 'button',
                            text: meview.getLngString('SLR Forum'),
                            iconCls: 'x-fa fa-folder-open-o',
                            tooltip: meview.getLngString('Skylords Reborn forum'),
                            ui: 'default',
                            href: 'https://forum.skylords.eu/',
                            itemId: 'topbarforumbutton',
                            hrefTarget: '_blank'

                        },
                        {
                            xtype: 'button',
                            text: meview.getLngString('Menu'),
                            iconCls: 'x-fa fa-navicon',
                            tooltip: meview.getLngString('Menu'),
                            ui: 'default',
                            itemId: 'topbarmenubutton',
                            menu: [
                                {
                                    text: meview.getLngString('Contributors'),
                                    iconCls: 'x-fa fa-user',
                                    handler: function () {


                                        if (_eloverlay) {
                                            _eloverlay.destroy(this);
                                            _eloverlay = null;
                                        }
                                        if (!_eloverlay) {
                                            _eloverlay = Ext.create('Ext.window.Window', {
                                                title: meview.getLngString('Contributors'),
                                                modal: true,
                                                width: 700,
                                                height: 700,
                                                controller: 'mainc',
                                                viewModel: 'mainm',
                                                scrollable: 'y',
                                                resizable: false,
                                                tools: [],
                                                bodyStyle: "background-color:#000000;  ",
                                                items: [
                                                    {
                                                        xtype: 'grid',
                                                        layout: 'fit',
                                                        title: meview.getLngString('People who is keeping cards data updated'),
                                                        store: {
                                                            fields: ['name', 'email', 'forumid'],
                                                            data: [
                                                                {name: 'ICE', email: 'info@bafocards.eu', forumid: '13016-ice'}
                                                            ]
                                                        },
                                                        columns: [
                                                            {text: meview.getLngString('Name'), dataIndex: 'name'},
                                                            {text: meview.getLngString('Email'), dataIndex: 'email', flex: 1},
                                                            {
                                                                text: '',
                                                                xtype: 'widgetcolumn',
                                                                width: 40,
                                                                widget: {
                                                                    xtype: 'button',
                                                                    ui: 'plain',
                                                                    text: '',
                                                                    iconCls: 'fa fa-user',
                                                                    tooltip: meview.getLngString('Go to SLR forum profile'),
                                                                    handler: function (a, b) {
                                                                        var rec = a.getWidgetRecord();
                                                                        var win = window.open('https://forum.skylords.eu/index.php?/profile/' + rec.getData().forumid + '/', '_blank');
                                                                        win.focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            });
                                        }
                                        _eloverlay.show();


                                    }

                                },
                                {
                                    text: meview.getLngString('Latest updates'),
                                    iconCls: 'x-fa fa-calendar-o',
                                    handler: function () {


                                        if (_eloverlay) {
                                            _eloverlay.destroy(this);
                                            _eloverlay = null;
                                        }
                                        if (!_eloverlay) {
                                            _eloverlay = Ext.create('Ext.window.Window', {
                                                title: meview.getLngString('Latest updates'),
                                                modal: true,
                                                width: 700,
                                                height: 600,
                                                controller: 'mainc',
                                                viewModel: 'mainm',
                                                scrollable: 'y',
                                                resizable: false,
                                                tools: [],
                                                bodyStyle: "background-color:#000000;  ",
                                                items: [
                                                    {
                                                        xtype: 'grid',
                                                        layout: 'fit',
                                                        
                                                        store: {
                                                            fields: ['title', 'desc', 'by', 'forumid'],
                                                            data: [
                                                                {title: 'Different languages support (en,de,ru)', desc: 'Languages  en,de,ru  for now but havent got  translations done to de and ru so all still in english', by: 'ICE', forumid: '13016-ice'},
                                                                {title: 'Info about card  changed', desc: 'It is possible now to look  info  about each card lvl.<br>Still got  tons of information to update so right now there is only one test card <br><a href="http://www.bafocards.eu/#card:en:388">  Abomination Shadow</a>', by: 'ICE', forumid: '13016-ice'},
                                                                {title: 'Search got sharing possibility', desc: 'Sharing link is accessible on top  next to card lvl changers.', by: 'ICE', forumid: '13016-ice'},
                                                                {title: 'Search bar is closeable', desc: 'So  cards can fill up whole screen :)', by: 'ICE', forumid: '13016-ice'},
                                                                {title: 'Cards per row changes depending on screen size', desc: 'Depending on screen size cards per row  changes so that  every screen size could see desent sized card images', by: 'ICE', forumid: '13016-ice'},
                                                                {title: 'Contributors info added ', desc: 'People who keeps db data updated is now visible :)', by: 'ICE', forumid: '13016-ice'}

                                                            ]
                                                        },
                                                        features: [{
                                                                ftype: 'rowbody',
                                                                getAdditionalData: function (data, idx, record, orig) {

                                                                    return {
                                                                        rowBody: '<div style="padding: 1em">' + record.get("desc") + '</div>',
                                                                        rowBodyCls: ""
                                                                    };
                                                                }
                                                            }],
                                                        columns: [
                                                            {text: meview.getLngString('Title'), dataIndex: 'title', flex: 1},
                                                            {
                                                                text: '',
                                                                xtype: 'widgetcolumn',
                                                                width: 40,
                                                                widget: {
                                                                    xtype: 'button',
                                                                    ui: 'plain',
                                                                    text: '',
                                                                    iconCls: 'fa fa-user',
                                                                    tooltip: meview.getLngString('Go to updater SLR forum profile'),
                                                                    handler: function (a, b) {
                                                                        var rec = a.getWidgetRecord();
                                                                        var win = window.open('https://forum.skylords.eu/index.php?/profile/' + rec.getData().forumid + '/', '_blank');
                                                                        win.focus();
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            });
                                        }
                                        _eloverlay.show();


                                    }

                                },
                                {
                                    text: meview.getLngString('Editor'),
                                    iconCls: 'x-fa fa-lock',
                                    handler: function () {

                                        if (iAmAEditor && iAmAEditorCode)
                                        {

                                            Ext.Ajax.request({
                                                url: 'editors/check/',
                                                params: {
                                                    code: iAmAEditorCode,
                                                    json: 1
                                                },
                                                success: function (response, opts) {
                                                    var data = Ext.decode(response.responseText);

                                                    if (data.success && data.allowed) {
                                                        iAmAEditorName = data.name;

                                                        var panel = Ext.first('#main');
                                                        panel.getLayout().setActiveItem(4);
                                                        document.title = meview.getLngString('Card Editor');
                                                        var cardsEditorName = Ext.first('#cardsEditorName');

                                                        cardsEditorName.setText(meview.getLngString('Welcome') + ' ' + data.name);

                                                        _app.doCardSearchEditor(null, null);
                                                    } else {
                                                        Ext.toast(
                                                                {
                                                                    html: meview.getLngString('To access this area'),
                                                                    title: meview.getLngString('Missing rights'),
                                                                    width: 600,
                                                                    align: 't'
                                                                }
                                                        );
                                                    }

                                                },
                                                failure: function (response, opts) {

                                                    Ext.toast(
                                                            {
                                                                html: response.status,
                                                                title: meview.getLngString('server side failure with status code'),
                                                                width: 600,
                                                                align: 't'
                                                            }
                                                    );


                                                }
                                            });


                                        } else {

                                            if (_eloverlay) {
                                                _eloverlay.destroy(this);
                                                _eloverlay = null;
                                            }
                                            if (!_eloverlay) {
                                                _eloverlay = Ext.create('Ext.window.Window', {
                                                    title: meview.getLngString('Restricted area'),
                                                    modal: true,
                                                    width: 300,
                                                    controller: 'mainc',
                                                    viewModel: 'mainm',
                                                    scrollable: 'y',
                                                    resizable: false,
                                                    tools: [],
                                                    bodyStyle: "background-color:#000000;  ",
                                                    items: [
                                                        {
                                                            width: "100%",
                                                            xtype: 'textfield',
                                                            labelAlign: 'top',
                                                            fieldLabel: '',
                                                            emptyText: meview.getLngString('Editor access code'),
                                                            itemId: 'eacinput',
                                                            value: ''
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: '100%',
                                                            iconCls: 'x-fa fa-unlock',
                                                            ui: 'default',
                                                            text: meview.getLngString('Login'),
                                                            tooltip: '',
                                                            controller: 'mainc',
                                                            viewModel: 'mainm',
                                                            handler: function (btn) {

                                                                var code = Ext.first("#eacinput").getValue();
                                                                iAmAEditorCode = code;

                                                                Ext.Ajax.request({
                                                                    url: 'editors/check/',
                                                                    params: {
                                                                        code: iAmAEditorCode,
                                                                        json: 1
                                                                    },
                                                                    success: function (response, opts) {
                                                                        var data = Ext.decode(response.responseText);

                                                                        if (data.success && data.allowed) {
                                                                            iAmAEditorName = data.name;

                                                                            var panel = Ext.first('#main');
                                                                            panel.getLayout().setActiveItem(4);
                                                                            document.title = meview.getLngString('Card Editor');
                                                                            var cardsEditorName = Ext.first('#cardsEditorName');

                                                                            cardsEditorName.setText(meview.getLngString('Welcome') + ' ' + data.name);
                                                                            iAmAEditor = true;
                                                                            if (_eloverlay) {
                                                                                _eloverlay.destroy(this);
                                                                                _eloverlay = null;
                                                                            }
                                                                            _app.doCardSearchEditor(null, null);
                                                                        } else {
                                                                            Ext.toast(
                                                                                    {
                                                                                        html: meview.getLngString('To access this area'),
                                                                                        title: meview.getLngString('Missing rights'),
                                                                                        width: 600,
                                                                                        align: 't'
                                                                                    }
                                                                            );
                                                                        }

                                                                    },
                                                                    failure: function (response, opts) {

                                                                        Ext.toast(
                                                                                {
                                                                                    html: response.status,
                                                                                    title: meview.getLngString('server side failure with status code'),
                                                                                    width: 600,
                                                                                    align: 't'
                                                                                }
                                                                        );


                                                                    }
                                                                });
                                                            }
                                                        }
                                                    ]
                                                });
                                            }
                                            _eloverlay.show();
                                        }

                                    }

                                }
                            ]

                        }

                    ]
                } ,
            items: [
                {
                    region: 'west',
                    width: 255,
                    title: meview.getLngString('Search'),
                    iconCls: 'fa fa-search',
                    collapsed: false,
                    collapsible: true,
                    itemId: 'westsidesearchtitle',
                    reference: 'searchContainer',
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
                                    xtype: 'panel',
                                    width: "100%",
                                    ui: 'blue',
                                    cls: 'pattern-bg',
                                    layout: 'hbox',
                                    style: 'padding:5px',
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 32,
                                            height: 32,
                                            ui: 'plain',
                                            html: (window.localStorage.getItem('BaFoLVL') == '0' ? '<img src="img/none32tick.png" width="32" height="32">' : '<img src="img/none32.png" width="32" height="32">'),
                                            style: "margin-right:5px;",
                                            tooltip: meview.getLngString('Non upgraded cards'),
                                            itemId: 'BaFoLVL0',
                                            disabled: (window.localStorage.getItem('BaFoLVL') == '0' ? true : false),
                                            handler: function (btn) {
                                                var lvl0 = Ext.first('#BaFoLVL0');
                                                var lvl1 = Ext.first('#BaFoLVL1');
                                                var lvl2 = Ext.first('#BaFoLVL2');
                                                var lvl3 = Ext.first('#BaFoLVL3');

                                                lvl0.setDisabled(true);
                                                lvl1.setDisabled(false);
                                                lvl2.setDisabled(false);
                                                lvl3.setDisabled(false);
                                                lvl0.setHtml('<img src="img/none32tick.png" width="32" height="32">');
                                                lvl1.setHtml('<img src="img/one32.png" width="32" height="32">');
                                                lvl2.setHtml('<img src="img/two32.png" width="32" height="32">');
                                                lvl3.setHtml('<img src="img/three32.png" width="32" height="32">');
                                                window.localStorage.setItem('BaFoLVL', '0');
                                                _app.doCardSearchAuto();


                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 32,
                                            height: 32,
                                            ui: 'plain',
                                            html: (window.localStorage.getItem('BaFoLVL') == '1' ? '<img src="img/one32tick.png" width="32" height="32">' : '<img src="img/one32.png" width="32" height="32">'),
                                            style: "margin-right:5px;",
                                            tooltip: meview.getLngString('Lvl 1 upgrade cards'),
                                            itemId: 'BaFoLVL1',
                                            disabled: (window.localStorage.getItem('BaFoLVL') == '1' ? true : false),
                                            handler: function (btn) {
                                                var lvl0 = Ext.first('#BaFoLVL0');
                                                var lvl1 = Ext.first('#BaFoLVL1');
                                                var lvl2 = Ext.first('#BaFoLVL2');
                                                var lvl3 = Ext.first('#BaFoLVL3');

                                                lvl0.setDisabled(false);
                                                lvl1.setDisabled(true);
                                                lvl2.setDisabled(false);
                                                lvl3.setDisabled(false);
                                                lvl0.setHtml('<img src="img/none32.png" width="32" height="32">');
                                                lvl1.setHtml('<img src="img/one32tick.png" width="32" height="32">');
                                                lvl2.setHtml('<img src="img/two32.png" width="32" height="32">');
                                                lvl3.setHtml('<img src="img/three32.png" width="32" height="32">');
                                                window.localStorage.setItem('BaFoLVL', '1');
                                                _app.doCardSearchAuto();


                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 32,
                                            height: 32,
                                            ui: 'plain',
                                            html: (window.localStorage.getItem('BaFoLVL') == '2' ? '<img src="img/two32tick.png" width="32" height="32">' : '<img src="img/two32.png" width="32" height="32">'),
                                            style: "margin-right:5px;",
                                            tooltip: meview.getLngString('Lvl 2 upgrade cards'),
                                            itemId: 'BaFoLVL2',
                                            disabled: (window.localStorage.getItem('BaFoLVL') == '2' ? true : false),
                                            handler: function (btn) {
                                                var lvl0 = Ext.first('#BaFoLVL0');
                                                var lvl1 = Ext.first('#BaFoLVL1');
                                                var lvl2 = Ext.first('#BaFoLVL2');
                                                var lvl3 = Ext.first('#BaFoLVL3');

                                                lvl0.setDisabled(false);
                                                lvl1.setDisabled(false);
                                                lvl2.setDisabled(true);
                                                lvl3.setDisabled(false);
                                                lvl0.setHtml('<img src="img/none32.png" width="32" height="32">');
                                                lvl1.setHtml('<img src="img/one32.png" width="32" height="32">');
                                                lvl2.setHtml('<img src="img/two32tick.png" width="32" height="32">');
                                                lvl3.setHtml('<img src="img/three32.png" width="32" height="32">');
                                                window.localStorage.setItem('BaFoLVL', '2');
                                                _app.doCardSearchAuto();


                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            width: 32,
                                            height: 32,
                                            ui: 'plain',
                                            html: (window.localStorage.getItem('BaFoLVL') == '3' ? '<img src="img/three32tick.png" width="32" height="32">' : '<img src="img/three32.png" width="32" height="32">'),
                                            style: "margin-right:5px;",
                                            tooltip: meview.getLngString('Lvl 3 upgrade cards'),
                                            itemId: 'BaFoLVL3',
                                            disabled: (window.localStorage.getItem('BaFoLVL') == '3' ? true : false),
                                            handler: function (btn) {
                                                var lvl0 = Ext.first('#BaFoLVL0');
                                                var lvl1 = Ext.first('#BaFoLVL1');
                                                var lvl2 = Ext.first('#BaFoLVL2');
                                                var lvl3 = Ext.first('#BaFoLVL3');

                                                lvl0.setDisabled(false);
                                                lvl1.setDisabled(false);
                                                lvl2.setDisabled(false);
                                                lvl3.setDisabled(true);

                                                lvl0.setHtml('<img src="img/none32.png" width="32" height="32">');
                                                lvl1.setHtml('<img src="img/one32.png" width="32" height="32">');
                                                lvl2.setHtml('<img src="img/two32.png" width="32" height="32">');
                                                lvl3.setHtml('<img src="img/three32tick.png" width="32" height="32">');


                                                window.localStorage.setItem('BaFoLVL', '3');
                                                _app.doCardSearchAuto();


                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-share',
                                            align: 'right',
                                            ui: 'default',
                                            style: "margin-left:15px;",
                                            itemId: 'searchsharebutton',
                                            tooltip: meview.getLngString('Share your current search'),
                                            handler: function () {
                                                var code = meview.buildSearchShareUrl();
                                          
                                                if (code == '') {
                                                    Ext.toast(
                                                            {
                                                                html: meview.getLngString('You havent choosen any search filters'),
                                                                title: meview.getLngString('Search empty'),
                                                                width: 600,
                                                                align: 't'
                                                            }
                                                    );
                                                } else {
                                                    if (_cardShareOverlay) {
                                                        _cardShareOverlay.destroy(this);
                                                        _cardShareOverlay = null;
                                                    }
                                                    if (!_cardShareOverlay) {

                                                        _cardShareOverlay = Ext.create('Ext.window.Window', {
                                                            title: meview.getLngString('Share your search'),
                                                            width: 900,
                                                            scrollable: 'y',
                                                            items: [
                                                                {
                                                                    xtype: "panel",
                                                                    title: meview.getLngString("Plain"),
                                                                    ui: 'blue'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    width: '100%',
                                                                    value: '' + serverurl + '?search:' + meview.getLngCode() + ':' + code + '',
                                                                    listeners: {
                                                                        focus: function (el, event, eOpts) {
                                                                            el.selectText(0);

                                                                        }

                                                                    }
                                                                },
                                                                {
                                                                    xtype: "panel",
                                                                    title: meview.getLngString("Web link"),
                                                                    ui: 'blue'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    width: '100%',
                                                                    value: '<a href="' + serverurl + '?search:' + meview.getLngCode() + ':' + code + '" target="_blank">' + meview.getLngString("My search on website") + ' ' + serverurl + '</a>',
                                                                    listeners: {
                                                                        focus: function (el, event, eOpts) {
                                                                            el.selectText(0);

                                                                        }

                                                                    }
                                                                }
                                                            ]
                                                        });
                                                    }
                                                    _cardShareOverlay.show();
                                                }
                                            }
                                        },
                                        {
                                             
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-undo',
                                            tooltip: meview.getLngString('Reset search'),
                                            align: 'right',
                                            ui: 'default',
                                            style: "margin-left:5px;",
                                            handler: function (btn) {
                                                 _app.clearSearchAnddoCardSearchAuto(); 
                                                 


                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'tagfield',
                                    labelAlign: 'top',
                                    fieldLabel: '',
                                    width: "98%",
                                    itemId: 'searchfieldsortme',
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
                                    itemId: 'searchfieldquery',
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
                                    itemId: 'searchfieldraritytitle',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'c',
                                    boxLabel: meview.getLngString('Common'),
                                    itemId: 'searchfieldc',
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
                                    itemId: 'searchfielduc',
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
                                    itemId: 'searchfieldr',
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
                                    itemId: 'searchfieldur',
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
                                    itemId: 'searchfieldeditiontitle',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'edt',
                                    boxLabel: meview.getLngString('Twilight'),
                                    itemId: 'searchfieldedt',
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
                                    itemId: 'searchfieldedr',
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
                                    itemId: 'searchfieldedls',
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
                                    itemId: 'searchfieldeda',
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
                                    itemId: 'searchfieldtiertitle',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'tiero',
                                    boxLabel: meview.getLngString('One orb'),
                                    itemId: 'searchfieldtiero',
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
                                    itemId: 'searchfieldtiertw',
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
                                    itemId: 'searchfieldtiert',
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
                                    itemId: 'searchfieldtierf',
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
                                    itemId: 'searchfieldcolortitle',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'colfr',
                                    boxLabel: meview.getLngString('Frost'),
                                    itemId: 'searchfieldcolfr',
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
                                    itemId: 'searchfieldcolfi',
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
                                    itemId: 'searchfieldcoln',
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
                                    itemId: 'searchfieldcols',
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
                                    itemId: 'searchfieldcoltl',
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
                                    itemId: 'searchfieldcolb',
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
                                    itemId: 'searchfieldcolsk',
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
                                    itemId: 'searchfieldcolls',
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
                                    itemId: 'searchfieldcollg',
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
                                    itemId: 'searchfieldaffinitytitle',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'afn',
                                    boxLabel: meview.getLngString('None'),
                                    itemId: 'searchfieldafn',
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
                                    itemId: 'searchfieldafr',
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
                                    itemId: 'searchfieldafi',
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
                                    itemId: 'searchfieldan',
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
                                    itemId: 'searchfieldas',
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
                                    itemId: 'searchfieldcardtypetitle',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'ts',
                                    boxLabel: meview.getLngString('Spell'),
                                    itemId: 'searchfieldts',
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
                                    itemId: 'searchfieldtc',
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
                                    itemId: 'searchfieldtb',
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
                                    itemId: 'searchfieldmunits',
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
                                    itemId: 'searchfieldrunits',
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
                                    itemId: 'searchfieldoffensetitle',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'otms',
                                    boxLabel: meview.getLngString('Small'),
                                    itemId: 'searchfieldotms',
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
                                    itemId: 'searchfieldotmm',
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
                                    itemId: 'searchfieldotml',
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
                                    itemId: 'searchfieldotmxl',
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
                                    itemId: 'searchfieldots',
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
                                    itemId: 'searchfielddefencetitle',
                                    titleAlign: 'left',
                                    cls: 'no-bottom-top-margin'
                                },
                                {
                                    xtype: 'checkbox',
                                    name: 'dts',
                                    boxLabel: meview.getLngString('Small'),
                                    inputValue: '1',
                                    itemId: 'searchfielddts',
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
                                    itemId: 'searchfielddtm',
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
                                    itemId: 'searchfielddtl',
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
                                    itemId: 'searchfielddtxl',
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

                },
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
                            xtype: "cardsdataview"
                        }
                    ]
                },
                {
                    region: 'south',
                    layout: 'hbox',
                    bodyPadding: 0,
                    border: false,
                    height: 80,
                    cls: 'boxshadow-top pattern-bg',
                    items: [
                        {
                            xtype: "cardstodeck",
                            cls: ' pattern-bg',
                            height: 80,
                            flex: 8
                        },
                        {
                            xtype: 'panel',
                            height: 80,
                            width: 40,
                            ui: 'darkice',
                            bodyStyle: "background-color:#1F1F1F;background-image:url('img/pattern.png')  !important;",
                            bodyCls: "boxshadow-left",
                            cls: ' pattern-bg boxshadow-left',
                            flex: 1,
                            items: [
                                {
                                    width: "90%",
                                    margin: 3,
                                    xtype: 'textfield',
                                    labelAlign: 'top',
                                    fieldLabel: '',
                                    itemId: 'decktobuildname',
                                    emptyText: meview.getLngString('Deck name'),
                                    value: (window.localStorage.getItem('ApiDeckToEditId') != '' ? window.localStorage.getItem('ApiDeckToEditId') : ''),
                                    listeners: {
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: "background-color:transparent !important;",
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: meview.getLngString('Save'),
                                            iconCls: 'fa fa-plus',
                                            ui: 'default',
                                            tooltip: meview.getLngString('Save your current selection as deck'),
                                            margin: 3,
                                            itemId: 'decksavebutton',
                                            controller: 'mainc',
                                            viewModel: 'mainm',
                                            handler: function (btn) {
                                                meview.saveDeckData(btn);
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-share',
                                            ui: 'default',
                                            itemId: 'decksharebutton',
                                            tooltip: meview.getLngString('Share your current selection of cards'),
                                            handler: function () {

                                                var wstore = Ext.data.StoreManager.lookup("ApiCardsToDeck");
                                                wstore.sort([
                                                    {
                                                        property: 'sequence',
                                                        direction: 'ASC'
                                                    }
                                                ]);
                                                var range = wstore.getRange();
                                                var i = 0;
                                                var ids = [];

                                                if (range.length > 0)
                                                {

                                                    for (i; i < range.length; i++) {
                                                        var cardId = range[i].getData().cardId;
                                                        ids.push(cardId);
                                                    }

                                                    var maxheight = (range.length / 5);
                                                    Ext.Ajax.request({
                                                        url: 'shareme/',
                                                        params: {
                                                            cards: Ext.JSON.encode(ids)
                                                        },
                                                        success: function (response, opts) {
                                                            var data = Ext.decode(response.responseText);
                                                            if (_app.testExists(data.code)) {
                                                                if (data.code != '') {


                                                                    if (_cardShareOverlay) {
                                                                        _cardShareOverlay.destroy(this);
                                                                        _cardShareOverlay = null;
                                                                    }
                                                                    if (!_cardShareOverlay) {

                                                                        _cardShareOverlay = Ext.create('Ext.window.Window', {
                                                                            title: meview.getLngString('Share your selection'),
                                                                            height: 500,
                                                                            width: 700,
                                                                            scrollable: 'y',
                                                                            items: [
                                                                                {
                                                                                    xtype: "panel",
                                                                                    title: meview.getLngString("Image"),
                                                                                    ui: 'blue'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    width: '100%',
                                                                                    value: '<img src="' + shareserverurl + '?' + data.code + '" width="600" height="' + (Math.round(maxheight) * 168) + '"/>',
                                                                                    listeners: {
                                                                                        focus: function (el, event, eOpts) {
                                                                                            el.selectText(0);

                                                                                        }

                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: "panel",
                                                                                    title: meview.getLngString("Web address") + ' #1',
                                                                                    ui: 'blue'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    width: '100%',
                                                                                    value: '<a href="' + serverurl + '?shared:' + meview.getLngCode() + ':' + data.code + '" target="_blank">' + meview.getLngString("My shared deck on website") + ' ' + serverurl + '</a>',
                                                                                    listeners: {
                                                                                        focus: function (el, event, eOpts) {
                                                                                            el.selectText(0);

                                                                                        }

                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: "panel",
                                                                                    title: meview.getLngString("Web address") + ' #2',
                                                                                    ui: 'blue'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    width: '100%',
                                                                                    value: '<a href="' + serverurl + '#card:' + meview.getLngCode() + ':' + ids.join(',') + '" target="_blank">' + meview.getLngString("My shared deck on website") + ' ' + serverurl + '</a>',
                                                                                    listeners: {
                                                                                        focus: function (el, event, eOpts) {
                                                                                            el.selectText(0);

                                                                                        }

                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: "panel",
                                                                                    title: meview.getLngString("Javascript"),
                                                                                    ui: 'blue'
                                                                                },
                                                                                {
                                                                                    xtype: 'textarea',
                                                                                    width: '100%',
                                                                                    height: 250,
                                                                                    value: '<link rel="stylesheet" type="text/css" href="' + serverurl + 'sharedcardstooltip.css?v=1.0.0">\n\<script id="sharedcardsloader" type="text/javascript" src="' + serverurl + 'sharedcardsloader.js"></script>\n\<script type="text/javascript">\n\ var sharedCards = new sharedCardsLoader() || {};\n\sharedCards.config({cardsHolderElementId:"cardsdisplay",lng:"' + meview.getLngCode() + '", code:"' + data.code + '",uri:"' + serverurl + '",div: {}, img: {}, box: {}});\n\sharedCards.show();\n\</script>\n\<div id="cardsdisplay" style="width:600px;height:' + (Math.round(maxheight) * 168) + 'px;"></div>',
                                                                                    listeners: {
                                                                                        focus: function (el, event, eOpts) {
                                                                                            el.selectText(0);

                                                                                        }

                                                                                    }
                                                                                }
                                                                            ]
                                                                        });
                                                                    }
                                                                    _cardShareOverlay.show();

                                                                }
                                                            }
                                                        },
                                                        failure: function (response, opts) {

                                                            Ext.toast(
                                                                    {
                                                                        html: response.status,
                                                                        title: meview.getLngString('server side failure with status code'),
                                                                        width: 600,
                                                                        align: 't'
                                                                    }
                                                            );


                                                        }
                                                    });


                                                } else {
                                                    Ext.toast(
                                                            {
                                                                html: meview.getLngString('You havent selected any cards to share'),
                                                                title: meview.getLngString('Nothing to share'),
                                                                width: 600,
                                                                align: 't'
                                                            }
                                                    );
                                                }

                                            },
                                            margin: 3
                                        }
                                    ]
                                }
                            ]
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
    doLanguageChange: function () {
        var view = this;

        Ext.first('#topbarmydecksbutton').setText(this.getLngString('My decks'));
        Ext.first('#topbarmapsbutton').setText(this.getLngString('Maps'));
        Ext.first('#topbarminigamesbutton').setText(this.getLngString('Mini games'));
        Ext.first('#topbarmenubutton').setText(this.getLngString('Menu'));// 
        Ext.first('#topbarmenubutton').setTooltip(this.getLngString('Menu'));// 
        Ext.first('#topbarforumbutton').setText(this.getLngString('SLR Forum'));
        Ext.first('#topbarforumbutton').setTooltip(this.getLngString('Skylords Reborn forum'));
        Ext.first('#BaFoLVL0').setTooltip(this.getLngString('Non upgraded cards'));
        Ext.first('#BaFoLVL1').setTooltip(this.getLngString('Lvl 1 upgrade cards'));
        Ext.first('#BaFoLVL2').setTooltip(this.getLngString('Lvl 2 upgrade cards'));
        Ext.first('#BaFoLVL3').setTooltip(this.getLngString('Lvl 3 upgrade cards'));
        Ext.first('#cardsSearchCounter').setTooltip(this.getLngString('Found cards counter'));
        Ext.first('#searchfieldsortme').getStore().setData([
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
        Ext.first('#searchfieldraritytitle').setTitle(this.getLngString('Rarity'));// title: 'Rarity',
        Ext.first('#searchfieldc').setBoxLabel(this.getLngString('Common'));//  boxLabel: 'Common',
        Ext.first('#searchfielduc').setBoxLabel(this.getLngString('UnCommon'));// boxLabel: 'UnCommon',
        Ext.first('#searchfieldr').setBoxLabel(this.getLngString('Rare'));// boxLabel: 'Rare',
        Ext.first('#searchfieldur').setBoxLabel(this.getLngString('Ultra rare'));// boxLabel: 'Ultra rare',
        Ext.first('#searchfieldeditiontitle').setTitle(this.getLngString('Edition'));// title: 'Edition',
        Ext.first('#searchfieldedt').setBoxLabel(this.getLngString('Twilight'));//  boxLabel: 'Twilight',
        Ext.first('#searchfieldedr').setBoxLabel(this.getLngString('Renegade'));//  boxLabel: 'Renegade',
        Ext.first('#searchfieldedls').setBoxLabel(this.getLngString('Lost Souls'));//  boxLabel: 'Lost Souls',
        Ext.first('#searchfieldeda').setBoxLabel(this.getLngString('Amii'));// boxLabel: 'Amii',
        Ext.first('#searchfieldtiertitle').setTitle(this.getLngString('Tier'));// title: 'Tier',
        Ext.first('#searchfieldtiero').setBoxLabel(this.getLngString('One orb'));// boxLabel: 'One orb',
        Ext.first('#searchfieldtiertw').setBoxLabel(this.getLngString('Two orbs'));// boxLabel: 'Two orbs',
        Ext.first('#searchfieldtiert').setBoxLabel(this.getLngString('Three orbs'));// boxLabel: 'Three orbs',
        Ext.first('#searchfieldtierf').setBoxLabel(this.getLngString('Four orbs'));// boxLabel: 'Four orbs',
        Ext.first('#searchfieldcolfr').setBoxLabel(this.getLngString('Frost'));// boxLabel: 'Frost',
        Ext.first('#searchfieldcolfi').setBoxLabel(this.getLngString('Fire'));// boxLabel: 'Fire',
        Ext.first('#searchfieldcoln').setBoxLabel(this.getLngString('Nature'));//  boxLabel: 'Nature',
        Ext.first('#searchfieldcols').setBoxLabel(this.getLngString('Shadow'));// boxLabel: 'Shadow',
        Ext.first('#searchfieldcoltl').setBoxLabel(this.getLngString('Twilight'));// boxLabel: 'Twilight',
        Ext.first('#searchfieldcolb').setBoxLabel(this.getLngString('Bandit'));// boxLabel: 'Bandit',
        Ext.first('#searchfieldcolsk').setBoxLabel(this.getLngString('Stonekin'));// boxLabel: 'Stonekin',
        Ext.first('#searchfieldcolls').setBoxLabel(this.getLngString('Lost souls'));// boxLabel: 'Lost souls',
        Ext.first('#searchfieldcollg').setBoxLabel(this.getLngString('Legendary'));//  boxLabel: 'Legendary',
        Ext.first('#searchfieldcolortitle').setTitle(this.getLngString('Color'));// title: 'Color',
        Ext.first('#searchfieldas').setBoxLabel(this.getLngString('Shadow'));// boxLabel: 'Shadow',
        Ext.first('#searchfieldan').setBoxLabel(this.getLngString('Nature'));//  boxLabel: 'Nature',
        Ext.first('#searchfieldafi').setBoxLabel(this.getLngString('Fire'));// boxLabel: 'Fire',
        Ext.first('#searchfieldafr').setBoxLabel(this.getLngString('Frost'));//  boxLabel: 'Frost',
        Ext.first('#searchfieldafn').setBoxLabel(this.getLngString('None'));// boxLabel: 'None',
        Ext.first('#searchfieldaffinitytitle').setTitle(this.getLngString('Affinity'));// title: 'Affinity',
        Ext.first('#searchfieldts').setBoxLabel(this.getLngString('Spell'));// boxLabel: 'Spell',
        Ext.first('#searchfieldtc').setBoxLabel(this.getLngString('Creature'));// boxLabel: 'Creature',
        Ext.first('#searchfieldtb').setBoxLabel(this.getLngString('Building'));// boxLabel: 'Building',
        Ext.first('#searchfieldmunits').setBoxLabel(this.getLngString('Melee Units'));//  boxLabel: 'Melee Units',
        Ext.first('#searchfieldrunits').setBoxLabel(this.getLngString('Ranged Units'));// boxLabel: 'Ranged Units',
        Ext.first('#searchfieldcardtypetitle').setTitle(this.getLngString('Card Type'));// title: 'Card Type',
        Ext.first('#searchfieldotms').setBoxLabel(this.getLngString('Small'));// boxLabel: 'Small',
        Ext.first('#searchfieldotmm').setBoxLabel(this.getLngString('Medium'));// boxLabel: 'Medium',
        Ext.first('#searchfieldotml').setBoxLabel(this.getLngString('Large'));// boxLabel: 'Large',
        Ext.first('#searchfieldotmxl').setBoxLabel(this.getLngString('Extra Large'));// boxLabel: 'Extra Large',
        Ext.first('#searchfieldots').setBoxLabel(this.getLngString('Special'));// boxLabel: 'Special',
        Ext.first('#searchfieldoffensetitle').setTitle(this.getLngString('Offense'));// title: 'Offense', 
        Ext.first('#decktobuildname').setEmptyText(this.getLngString('Deck name'));// emptyText: 'Deck name',
        Ext.first('#decksavebutton').setText(this.getLngString('Save'));//  text: 'Save',
        Ext.first('#decksavebutton').setTooltip(this.getLngString('Save your current selection as deck')); //tooltip: 'Save your current selection as deck.',
        Ext.first('#decksharebutton').setTooltip(this.getLngString('Share your current selection of cards')); // tooltip: 'Share your current selection of cards',
        Ext.first('#westsidesearchtitle').setTitle(this.getLngString('Search'));//  title: 'Search',
        Ext.first('#searchfielddtxl').setBoxLabel(this.getLngString('Extra large'));// boxLabel: 'Extra large',
        Ext.first('#searchfielddtl').setBoxLabel(this.getLngString('Large'));// boxLabel: 'Large',
        Ext.first('#searchfielddtm').setBoxLabel(this.getLngString('Medium'));
        Ext.first('#searchfielddts').setBoxLabel(this.getLngString('Small'));
        Ext.first('#searchfielddefencetitle').setTitle(this.getLngString('Defense'));
        var dataview1 = Ext.first("#cardsdataview");
        dataview1.refresh();
        var dataview2 = Ext.first("#cardstodeck");
        dataview2.refresh();
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
    },
    saveDeckData: function (btn) {
        this.getController().saveDeckData(btn);
    },
    doCardStoreSorting: function (newValue) {
        newValue = JSON.stringify(Ext.encode(newValue));

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

        return  JSON.parse(Ext.decode(this.getController().testSort()));


    },
    testCheck: function (type) {
        var val = this.getController().testCheck(type);

        return val;
    },
    buildSearchShareUrl: function () {
        var me = this;
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


        var searchTerms = [];
        var i = 0;
        for (i; i < searchTypes.length; i++) {

            if (parseInt(_appCardsSearchArray[searchTypes[i]]) === 1) {

                searchTerms.push([searchTypes[i], 1]);


            }
        }
        var lookupstring = [];
        if (searchTerms.length > 0) {
            var ist = 0;
            for (ist; ist < searchTerms.length; ist++) {
                lookupstring.push(searchTerms[ist][0] + '=' + searchTerms[ist][1]);
            }
        }

        if (appCardsSearchQ != '') {
            lookupstring.push('Query' + '=' + appCardsSearchQ);
        }

        return  lookupstring.join('&');
    }


});
