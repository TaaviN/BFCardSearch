Ext.define("slrcards.store.Cards", {
    extend: "Ext.data.Store",
     
    alias: 'store.ApiCards',
    model: "slrcards.model.Card",
    storeId: "ApiCards",
    autoLoad: false,
    data: [],
    pageSize: 99999,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }


});

