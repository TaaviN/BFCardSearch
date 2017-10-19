
Ext.define("slrcards.view.DecksData", {
    extend: "Ext.view.View",
    alias: "widget.decksdata",
    xtype: "decksdata",
    itemId: "decksdata",
    requires: [
    ],
    controller: 'mainc',
    viewModel: 'mainm',
    initComponent: function () {

        Ext.apply(this, {
            viewConfig: {
                preserveScrollOnRefresh: true,
                'boxready': function (thisGrid) {
                    thisGrid.view.focus = Ext.emptyFn;
                }
            },
            focusable: false,
            multiSelect: true,
            style: "background-color:#000;",
            loadingText: "Please wait loading data",
            store: {
                'type': "ApiDecks"
            },
            itemTpl: new Ext.XTemplate('<div class="deckitem pattern-bg deck-plate" style=" margin-top:5px; {[this.width()]} ">\n\
                    <div style="width:30%;padding:5px;float:left">\n\
                    <img style="width:100%;background-size:cover;background-image:url(\' {[this.image(values.cards)]}\');background-position: no-repeat center center;" src="img/units/e.png" /> \n\
                    </div>\n\
                    <div style="width:65%;float:right;padding:5px;">\n\
                    <div style="width:70%;float:left;font-size:18px"><b>{name}</b><br><br></div>\n\
                    <div style="width:30%;float:right;font-size:18px"><b>Cards {[this.count(values.cards)]}</b><br><br></div>\n\
                    <div style="clear:both"></div>{[this.doimages(values.cards)]}\n\
                    </div>\n\
                    <div style="clear:both"></div>\n\
                    </div>\n\
                     {[this.clear()]}',
                    {
                        image: function (cards) {
                            if (cards[0]) {
                                return 'img/?units|' + cards[0].Image.ObjectID + '|png|90|180|350';
                            } else {
                                return 'img/?units|0|png|90|180|350';
                            }
                        },
                        doimages: function (cards) {
                            var i = 0;
                            var arr = [];
                            for (i; i < cards.length; i++) {
                                arr.push('<div style="width:10%;padding:1px;float:left">\n\
                                <img class="deck-plate-small-img-no-zoom" style="width:100%;background-size:cover;background-image:url(\'img?units|' + cards[i].Image.ObjectID + '|png|90|130|350\');background-position: no-repeat center center;" src="img/units/e.png" /> \n\
                                </div>');
                            }
                            return arr.join('');
                        },
                        width: function () {


                            return 'width:49%;float:left;margin-left:3px;';
                        },
                        clear: function () {

                            return '';
                        },
                        count: function (cards) {
                            if (cards[0]) {

                                return cards.length;
                            } else {
                                return 0;
                            }
                        }
                    }),
            listeners: {
                itemclick: function (el, record, target, index, e, eOpts) {
                   
                    var obj = {el:el, record:record, target:target, index:index, e:e, eOpts:eOpts};
                    if (_overlay) {
                        _overlay.destroy(this);
                        _overlay = null;
                    }
                    if (!_overlay) {
                        _overlay = Ext.create('Ext.window.Window', {
                            title: 'Choose activity',
//                            height: 300,
modal:true,
                            width: 300,
                            controller: 'mainc',
                            viewModel: 'mainm',
                            scrollable: 'y',
                            resizable:false,
                            tools: [],
                            bodyStyle: "background-color:#000000;background:#000 url('img/back.jpg') no-repeat center center;background-size:cover;background-attachment: fixed;",
                            items: [
                                 
                                {
                                    xtype: 'button',
                                    width: '100%',
                                    iconCls: 'x-fa fa-plus',
                                    ui: 'default',
                                    text: 'Edit deck',
                                    tooltip: '',
                                    controller: 'mainc',
                                    viewModel: 'mainm',
                                    handler: function (btn) {
                                        this.getController().startEditingDeck(obj);
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: '100%',
                                    iconCls: 'x-fa fa-share',
                                    ui: 'default',
                                    text: 'Share deck',
                                    tooltip: '',
                                    controller: 'mainc',
                                    viewModel: 'mainm',
                                    handler: function (btn) {
                                        var sharedata = obj.record.getData();
                                        var i = 0;
                            
                             var ids = [];

                            for (i; i < sharedata.cards.length; i++) {
                               ids.push(sharedata.cards[i].cardId);
                            }
                                        
                                        
                                                 

                                                     
                                                    var maxheight = (sharedata.cards.length / 5);
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
                                                                            title: 'Share your selection',
                                                                            height: 500,
                                                                            width: 700,
                                                                            scrollable: 'y',
                                                                            items: [
                                                                                {
                                                                                    xtype: "panel",
                                                                                    title: "Image",
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
                                                                                    title: "Web address",
                                                                                    ui: 'blue'
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    width: '100%',
                                                                                    value: '<a href="' + serverurl + '?shared' + data.code + '" target="_blank">My shared deck on website ' + serverurl + '</a>',
                                                                                    listeners: {
                                                                                        focus: function (el, event, eOpts) {
                                                                                            el.selectText(0);

                                                                                        }

                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: "panel",
                                                                                    title: "Javascript",
                                                                                    ui: 'blue'
                                                                                },
                                                                                {
                                                                                    xtype: 'textarea',
                                                                                    width: '100%',
                                                                                    height: 250,
                                                                                    value: '<link rel="stylesheet" type="text/css" href="' + serverurl + 'sharedcardstooltip.css?v=1.0.0">\n\<script id="sharedcardsloader" type="text/javascript" src="' + serverurl + 'sharedcardsloader.js"></script>\n\<script type="text/javascript">\n\ var sharedCards = new sharedCardsLoader() || {};\n\sharedCards.config({cardsHolderElementId:"cardsdisplay",code:"' + data.code + '",uri:"' + serverurl + '",div: {}, img: {}, box: {}});\n\sharedCards.show();\n\</script>\n\<div id="cardsdisplay" style="width:600px;height:' + (Math.round(maxheight) * 168) + 'px;"></div>',
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
                                                                        title: 'server-side failure with status code ',
                                                                        width: 600,
                                                                        align: 't'
                                                                    }
                                                            );


                                                        }
                                                    });


                                                 
                                        
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: '100%',
                                    iconCls: 'x-fa fa-remove',
                                    ui: 'default',
                                    text: 'Delete deck',
                                    tooltip: '',
                                    controller: 'mainc',
                                    viewModel: 'mainm',
                                    handler: function (btn) {
                                        this.getController().deleteDeck(obj);
                                    }
                                }
                            ]
                        });
                    }
                    _overlay.show();

                },
                render: function (v) {
                    this.getController().loadMyDecks();
                }



            }
        });

        this.callParent(arguments);



    }
});
/*
 var srtMyCards = false;
 Ext.define("slrcards.view.DecksData", {
 extend: "Ext.Panel",
 alias: "widget.decksdata",
 xtype: "decksdata",
 itemId: "decksdata",
 requires: [
 
 ],
 controller: 'mainc',
 viewModel: 'mainm',
 layout: "fit",
 items: [
 
 {
 docked: "top",
 xtype: "titlebar",
 style: "background:#5fa2dd;border-bottom:1px solid #5fa2dd;-webkit-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);-moz-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);",
 ui: '',
 title: "",
 items: [
 {
 iconCls: "fa fa-refresh",
 controller: 'decks',
 viewModel: 'decks',
 align: "right",
 ui: 'action',
 style: "margin-right: 5px;",
 handler: function (btn) {
 
 this.getController().loadMyDecks();
 
 }
 },
 {
 align: 'right',
 iconCls: "fa fa-info",
 ui: 'action',
 handler: function () {
 
 if (_actionsheet) {
 _actionsheet.destroy(this);
 _actionsheet = null;
 }
 if (!_actionsheet) {
 _actionsheet = Ext.create('Ext.ActionSheet', {
 items: [
 {
 docked: "top",
 xtype: "toolbar",
 style: "background:#5fa2dd;border-bottom:1px solid #5fa2dd;-webkit-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);-moz-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);",
 title: "Information",
 cls: 'white-text-title',
 items: [
 {
 iconCls: "fa fa-remove",
 title: "Close",
 ui: 'action',
 align: "right",
 handler: function (btn) {
 
 if (_actionsheet) {
 _actionsheet.destroy(this);
 _actionsheet = null;
 }
 
 }
 }
 ]
 },
 {
 xtype: 'panel',
 padding: 7,
 items: [
 {
 xtype: "titlebar",
 title: "Deck actvities",
 style: "background:#5fa2dd;border:1px solid #ffffff;padding: 0rem 0rem; ",
 cls: 'white-text-title'
 },
 {
 style: "border-bottom:1px solid #f2f2f2;",
 html: 'Double tap.<br>\n\
 Double tapping on deck shows cards in that deck.<br><br>\n\
 Long tap.<br>\n\
 Long tap on deck deletes deck. Before deleting it app asks confirmation'
 }
 ],
 scrollable: true,
 width: Ext.os.deviceType == "Phone" ? "100%" : "100%",
 height: Ext.os.deviceType == "Phone" ? "100%" : window.innerHeight + "px"
 }
 ],
 cls: 'actionsheet-notifier',
 hideOnMaskTap: false,
 docked: 'top',
 bottom: null,
 stretchY: true,
 stretchX: true,
 enter: 'top',
 exit: 'top'
 });
 Ext.Viewport.add(_actionsheet);
 _actionsheet.show();
 
 }
 }
 
 }
 
 
 
 ]
 },
 {
 xtype: 'dataview',
 scrollable: true,
 itemId: "decksdataview",
 style: "background:#fff url('img/back.jpg') no-repeat center center;background-size:cover;",
 id: "decksdataview",
 loadingText: "Please wait loading data",
 width: "100%",
 height: "100%",
 controller: 'decks',
 viewModel: 'decks',
 store: {
 'type': "ApiDecks"
 },
 itemTpl: new Ext.XTemplate('<div style="background:#fff;margin-top:5px; {[this.width()]} ">\n\
 <div style="width:30%;padding:5px;float:left">\n\
 <img style="width:100%" src="img/units/{[this.image(values.cards)]}.png" />\n\
 </div>\n\
 <div style="width:65%;float:right;padding:5px;">\n\
 <h3>Deck name: {name}</h3><br>Cards Count: <b>{[this.count(values.cards)]}</b></div>\n\
 <div style="clear:both"></div>\n\
 </div>\n\
 {[this.clear()]}',
 {
 width: function () {
 
 
 if (w < 400) {
 return 'width:100%';
 } else if (w > 400 && w < 550) {
 return 'width:100%';
 } else if (w > 549 && w < 850) {
 return 'width:49%;float:left;margin-left:3px;';
 } else if (w > 849) {
 return 'width:33%;float:left;margin-left:3px;';
 }
 },
 clear: function () {
 
 
 if (w < 400) {
 return '<div style="clear:both"></div>';
 } else if (w > 400 && w < 550) {
 return '<div style="clear:both"></div>';
 } else if (w > 549 && w < 850) {
 return '';
 } else if (w > 849) {
 return '';
 }
 },
 image: function (cards) {
 if (cards[0]) {
 
 return cards[0].Image.ObjectID;
 } else {
 return 0;
 }
 },
 count: function (cards) {
 if (cards[0]) {
 
 return cards.length;
 } else {
 return 0;
 }
 }
 }),
 listeners: {
 itemtaphold: function (el, index, target, record, e, eOpts) {
 
 var v = this;
 Ext.Msg.confirm('Delete Deck', 'Are you sure you want to delete this deck.', function (buttonId) {
 if (buttonId == 'ok' || buttonId == 'yes') {
 v.getController().RemoveDeck(el, index, target, record, e, eOpts);
 }
 
 });
 
 },
 itemdoubletap: function (el, index, target, record, e, eOpts) {
 var deckData = record;
 var v = this;
 var firstCard = null, secondCard = null;
 if (_actionsheets) {
 _actionsheets.destroy(this);
 _actionsheets = null;
 }
 if (!_actionsheets) {
 _actionsheets = Ext.create('Ext.ActionSheet', {
 items: [
 {
 docked: "top",
 xtype: "titlebar",
 cls: 'white-text-title',
 title: "Cards in deck",
 style: "background:#5fa2dd;border-bottom:1px solid #5fa2dd;-webkit-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);-moz-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);",
 ui: '',
 items: [
 {
 iconCls: "fa fa-remove",
 title: "Close",
 align: "left",
 ui: 'action',
 style: "margin-right: 5px;",
 handler: function (btn) {
 
 if (_actionsheets) {
 _actionsheets.destroy(this);
 _actionsheets = null;
 }
 
 }
 },
 {
 iconCls: "fa fa-edit",
 title: "Edit deck",
 align: "left",
 ui: 'action',
 controller: 'decks',
 viewModel: 'decks',
 handler: function (btn) {
 
 this.getController().editDeck(el, index, target, record, e, eOpts,deckData); 
 if (_actionsheets) {
 _actionsheets.destroy(this);
 _actionsheets = null;
 }
 }
 },
 {
 align: "right",
 iconCls: "fa fa-reorder",
 title: "Start sorting deck",
 ui: 'action',
 style: "margin-right: 5px;",
 handler: function (btn) {
 if (!srtMyCards) {
 this.setUi('confirm');
 srtMyCards = true;
 } else {
 this.setUi('action');
 srtMyCards = false;
 }
 
 }
 
 },
 {
 align: 'right',
 iconCls: "fa fa-info",
 ui: 'action',
 handler: function () {
 
 if (_actionsheet) {
 _actionsheet.destroy(this);
 _actionsheet = null;
 }
 if (!_actionsheet) {
 _actionsheet = Ext.create('Ext.ActionSheet', {
 items: [
 {
 docked: "top",
 xtype: "toolbar",
 style: "background:#5fa2dd;border-bottom:1px solid #5fa2dd;-webkit-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);-moz-box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);box-shadow: 0px 6px 5px -4px rgba(95,162,220,1);",
 title: "Information",
 cls: 'white-text-title',
 items: [
 {
 iconCls: "fa fa-remove",
 title: "Close",
 ui: 'action',
 align: "right",
 handler: function (btn) {
 
 if (_actionsheet) {
 _actionsheet.destroy(this);
 _actionsheet = null;
 }
 
 }
 }
 ]
 },
 {
 xtype: 'panel',
 padding: 7,
 items: [
 {
 xtype: "titlebar",
 title: "Deck cards actvities",
 style: "background:#5fa2dd;border:1px solid #ffffff;padding: 0rem 0rem; ",
 cls: 'white-text-title'
 },
 {
 style: "border-bottom:1px solid #f2f2f2;",
 html: 'Reordering.<br>\n\
 To sort cards you need to activate sorting by tapping button next to info button if sorting is activated button changes color to green.<br>\n\
 If sorting is activated then to sort cards there is two cards system<br>first card you click will be moved to position where second clicked card locates and second card moves to first card positon.<br>On selecting first card it turns semi transparent.'
 }
 ],
 scrollable: true,
 width: Ext.os.deviceType == "Phone" ? "100%" : "100%",
 height: Ext.os.deviceType == "Phone" ? "100%" : window.innerHeight + "px"
 }
 ],
 cls: 'actionsheet-notifier',
 hideOnMaskTap: false,
 docked: 'top',
 bottom: null,
 stretchY: true,
 stretchX: true,
 enter: 'top',
 exit: 'top'
 });
 Ext.Viewport.add(_actionsheet);
 _actionsheet.show();
 
 }
 }
 
 }
 
 ]
 },
 {
 xtype: 'dataview',
 hidden: false,
 scrollable: true,
 itemId: "deckcardsdataview",
 id: "deckcardsdataview",
 loadingText: "Please wait loading data",
 width: Ext.os.deviceType == "Phone" ? "100%" : "100%",
 height: Ext.os.deviceType == "Phone" ? "100%" : window.innerHeight + "px",
 store: "ApiCardsInDeck",
 controller: 'decks',
 viewModel: 'decks',
 style: "background:#fff url('img/back.jpg') no-repeat center center;background-size:cover;",
 itemTpl: new Ext.XTemplate(
 '<div   style="float:left;width:{[this.width()]};{[this.type(values)]}">\n\
 {[this.img(values)]}\n\
 </div>',
 {
 img: function (a) {
 
 if (a.ctype && a.ctype == 1) {
 return '';
 } else {
 return '<img style="width:100%" src="img/units/' + a.Image.ObjectID + '.png" />';
 }
 
 
 },
 type: function (a) {
 if (a.ctype && a.ctype == 1) {
 return 'display:none';
 } else {
 return '';
 }
 },
 width: function () {
 
 
 if (w < 400) {
 return '20%';
 } else if (w > 400 && w < 550) {
 return '20%';
 } else if (w > 549 && w < 850) {
 return '20%';
 } else if (w > 849) {
 return '10%';
 }
 }
 }),
 listeners: {
 itemtap: function (el, index, target, record, e, eOpts) {
 
 if (srtMyCards) {
 
 if (firstCard === null) {
 firstCard = {el: el, index: index, target: target, record: record, e: e, eOpts: eOpts};
 
 var el1 = Ext.get(firstCard.target.getId());
 el1.setOpacity('.5');
 secondCard = null;
 } else if (firstCard !== null && secondCard === null) {
 secondCard = {el: el, index: index, target: target, record: record, e: e, eOpts: eOpts};
 //                                                  
 var el2 = Ext.get(secondCard.target.getId());
 el2.setOpacity('.7');
 
 el.getController().sortDeckCards(firstCard, secondCard, deckData);
 setTimeout(function () {
 firstCard = null;
 secondCard = null;
 }, 1000);
 
 }
 
 
 }
 
 
 }
 }
 }
 ],
 cls: 'actionsheet-notifier',
 hideOnMaskTap: false,
 docked: 'top',
 bottom: null,
 stretchY: true,
 stretchX: true,
 enter: 'top',
 exit: 'top'
 });
 Ext.Viewport.add(_actionsheets);
 _actionsheets.show();
 this.getController().loadDeckCards(el, index, target, record, e, eOpts);
 }
 
 },
 activate: function (newActiveItem, view, oldActiveItem, eOpts) {
 
 if (newActiveItem._itemId == 'decksdataview') {
 this.getController().loadMyDecks();
 }
 
 },
 painted: function (view) {
 
 this.getController().loadMyDecks();
 
 
 }
 }
 }
 ]
 
 }); 
 */



