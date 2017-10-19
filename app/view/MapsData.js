
Ext.define("slrcards.view.MapsData", {
    extend: "Ext.view.View",
    alias: "widget.mapsdataview",
    xtype: "mapsdataview",
    itemId: "mapsdataview",
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
            itemSelector: 'div.map-data-plate',
            multiSelect: true,
            style: "background-color:transparent !important;",
            loadingText: "Please wait loading data",
            store: {
                'type': "ApiMapsMain"
            },
            itemTpl: new Ext.XTemplate('<div class="map-data-plate" style="background:#fff;margin-top:5px; {[this.width()]} ">\n\
                    <div style="width:100%;height:180px;padding:0px;background-size:cover;background-image:url(\'{[this.image(values)]}\');background-position: no-repeat center center;">\n\
                     <div style=" width:90%;margin-top:20px;margin-left:20px;background:  rgba(0,0,0,0.8);color:#ffffff;padding:7px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;float:left"><h3>{Name}</h3>{SubTitle}</div>\n\
                    <div style="margin-top:10px;margin-left:20px;background:  rgba(0,0,0,0.8);color:#ffffff;padding:7px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;float:left">Players: {Players}</div>\n\
                    </div>\n\
                     {[this.clear()]}',
                    {
                        image: function (data) {

                            return 'img/?map|' + data.Image.ObjectID + '|png|90|500|550';
                        },
                        width: function () {

                            return 'width:32%;float:left;margin-left:5px;';
                        },
                        clear: function () {
                            return '';
                        }
                    }),
            listeners: {
                itemclick: function (el, record, target, index, e, eOpts) {

                    var panel = Ext.first('#main');
                    var mappanel = Ext.first('#mapdata');

                    panel.getLayout().setActiveItem(3);
                    mappanel.mrecord = record;
                    mappanel.mindex = index;
                    document.title = 'Battleforge map ' + record.getData().Name;
                    el.getController().loadMapInfo(el, record, target, index, e, eOpts);
                     
                }
            }
        });
        this.callParent(arguments);
    }


});
