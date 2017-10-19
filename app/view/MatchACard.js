
Ext.define("slrcards.view.MatchACard", {
    extend: "Ext.view.View",
    alias: "widget.matchacard",
    xtype: "matchacard",
    itemId: "matchacard",
    requires: [],
    controller: 'gamec',
    viewModel: 'mainm',
    initComponent: function () {
        var meview = this;
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
            loadingText: meview.getLngString("Please wait loading data"),
            store: {'type': "ApiCardsForGame"},
            itemTpl: new Ext.XTemplate('<div class="" id="gamecard{cardId}" style="float:left;padding:3px;width:{[this.width()]}">\n\
                <img class="" id="gamecardimg{cardId}" style="width:100%;height:129px" src="img/?units|0|png|90|200|350" /> \n\
            </div> ',
                    {
                        image: function (data) {


                            return 'img/?units|0|png|90|200|350';
                        },
                        width: function () {
                            return '12.33%';
                        }

                    }),
            listeners: {
                itemclick: function (el, record, target, index, e, eOpts) {
                    this.getController().cardClick(el, record, target, index, e, eOpts);
                }  
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




