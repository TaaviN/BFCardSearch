Ext.define("slrcards.store.MapsMain", {
    extend: "Ext.data.Store",
    
     
        model: "slrcards.model.Map",
        storeId: "ApiMapsMain",
        alias: 'store.ApiMapsMain',
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

