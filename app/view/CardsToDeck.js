
function initializeDragZone(v) {
    v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {
        getDragData: function (e) {
            var sourceEl = e.getTarget(v.itemSelector, 10), d;
            if (sourceEl) {
                d = sourceEl.cloneNode(true);
                d.id = Ext.id();

                return (v.dragData = {
                    sourceEl: sourceEl,
                    repairXY: Ext.fly(sourceEl).getXY(),
                    ddel: d,
                    e: e,
                    Data: v.getRecord(sourceEl).data
                });
            }
        },
        getRepairXY: function () {
            return this.dragData.repairXY;
        }
    });
}

function initializeDropZone(v) {

    v.dropZone = Ext.create('Ext.dd.DropZone', v.el, {
        getTargetFromEvent: function (e) {
            return e.getTarget('.carddeckitem');
        },
        onNodeEnter: function (target, dd, e, data) {
            Ext.fly(target).addCls('x-dataview-item-hover');
        },
        onNodeOut: function (target, dd, e, data) {
            Ext.fly(target).removeCls('x-dataview-item-hover');
        },
        onNodeOver: function (target, dd, e, data) {
            var proto = Ext.dd.DropZone.prototype;

            return  proto.dropAllowed;
        },
        onNodeDrop: function (target, dd, e, data) {

            var dragRec = data.Data;
            var dropRec = v.getRecord(target).data;
            var wstore = Ext.data.StoreManager.lookup("ApiCardsToDeck");
            var dragCard = wstore.getById(dragRec.cardId);
            var dragCardData = dragCard.getData();


            var olddragrecsequence = dragCardData.sequence;

            var range = wstore.getRange();

            if (range.length > 0) {


                var i = 0;
                var sequence = 1;
                var records = [];
                for (i; i < range.length; i++) {
                    var record = wstore.getAt(i);
                    var data = record.getData();

                    if (data.cardId == dropRec.cardId) {

                        if (olddragrecsequence > sequence) {
                            dragCardData.sequence = sequence;
                            records.push(dragCardData);
                            sequence++;
                            data.sequence = sequence;
                            records.push(data);
                            sequence++;
                        } else {
                            data.sequence = sequence;
                            records.push(data);
                            sequence++;
                            dragCardData.sequence = sequence;
                            records.push(dragCardData);
                            sequence++;


                        }


                    } else {
                        if (data.cardId !== dragCardData.cardId) {
                            data.sequence = sequence;
                            records.push(data);
                            sequence++;
                        }
                    }

                }
                wstore.setData(records);

                wstore.sort([
                    {
                        property: 'sequence',
                        direction: 'ASC'
                    }
                ]);

            }


            return true;

        }
    });
}

Ext.define("slrcards.view.CardsToDeck", {
    extend: "Ext.view.View",
    alias: "widget.cardstodeck",
    xtype: "cardstodeck",
    itemId: "cardstodeck",
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
            itemSelector: 'div.carddeckitem',
            focusable: false,
            multiSelect: true,
             
            style: "background-color:#1F1F1F;background-image:url('img/pattern.png')  !important;",
            cls:'pattern-bg',
            loadingText: "Please wait loading data",
            store: {'type': "ApiCardsToDeck"},
            itemTpl: new Ext.XTemplate('<div class="carddeckitem card{cardId}" id="carditem{cardId}"   style="z-index:9999;float:left;width:{[this.width()]}">\n\
                <img class="carddeckitemimg" style="width:100%;background-size:cover;background-image:url(\' {[this.image(values)]}\');background-position: no-repeat center center;" src="img/units/e.png" /> \n\
            </div> ',
                    {
                        image: function (data) {
                           
                            return 'img/?units|' + data.Image.ObjectID + '|png|90|130|350';
                        },
                        width: function () {
                            return '5%';
                        }
                    }
            ),
            listeners: {
                itemclick: function (el, record, target, index, e, eOpts) {
                    var wstore = Ext.data.StoreManager.lookup("ApiCardsToDeck");
                    wstore.remove(record);
                    var dataview = Ext.first("#cardstodeck");
                    dataview.refresh();

                    var dataview2 = Ext.first("#cardsdataview");
                    dataview2.refresh();
                },
                render: function (v) {
                    initializeDragZone(v);
                    initializeDropZone(v);
                }



            }
        });

        this.callParent(arguments);



    }
});
