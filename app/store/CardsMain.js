Ext.define("slrcards.store.CardsMain", {
    extend: "Ext.data.Store",
     
     
        model: "slrcards.model.Card",
        storeId: "ApiCardsMain",
        alias: 'store.ApiCardsMain',
        autoLoad: false,
        data: [],
        pageSize : 99999,
        proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
       
     
});

