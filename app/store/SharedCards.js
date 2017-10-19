Ext.define("slrcards.store.SharedCards", {
    extend: "Ext.data.Store",
     
    alias: 'store.ApiSharedCards',
    model: "slrcards.model.Card",
    storeId: "ApiSharedCards",
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

