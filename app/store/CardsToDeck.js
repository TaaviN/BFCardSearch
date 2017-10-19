Ext.define("slrcards.store.CardsToDeck", {
    extend: "Ext.data.Store",
    alias: 'store.ApiCardsToDeck',
    model: "slrcards.model.Card",
    storeId: "ApiCardsToDeck",
    autoLoad: false,
    data: [],
    pageSize: 99999,
    sorters: 'sequence',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }


});

