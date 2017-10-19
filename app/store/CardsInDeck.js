Ext.define("slrcards.store.CardsInDeck", {
    extend: "Ext.data.Store",
    
   alias: 'store.ApiCardsInDeck',
        model: "slrcards.model.Card",
        storeId: "ApiCardsInDeck",
        autoLoad: false,
        data: [],
        sorters: 'sequence',
        pageSize : 99999,
        proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
      
   
});

