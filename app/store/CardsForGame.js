Ext.define("slrcards.store.CardsForGame", {
    extend: "Ext.data.Store",
    alias: 'store.ApiCardsForGame',
    model: "slrcards.model.GameCard",
    storeId: "ApiCardsForGame",
    autoLoad: false,
    data: [],
    pageSize: 999,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }


});

