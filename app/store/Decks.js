Ext.define("slrcards.store.Decks", {
    extend: "Ext.data.Store",
     
    alias: 'store.ApiDecks',
    model: "slrcards.model.Deck",
    storeId: "ApiDecks",
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
// proxy: {
//        type: 'localstorage',
//        id  : 'ApiDecksDb'
//    }

});

