Ext.define("slrcards.store.CardsEditorMain", {
    extend: "Ext.data.Store",
     
     
        model: "slrcards.model.Card",
        storeId: "ApiCardsEditorMain",
        alias: 'store.ApiCardsEditorMain',
        autoLoad: false,
        autoSync: true,
        data: [],
        pageSize : 99999,
        proxy: {
        batchActions:true,
        type: "rest",
        url:"jsondata/index.php", 
        reader: {
            type: "json",
            rootProperty: "data",
            successProperty: 'success', 
            messageProperty: 'msg',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            successProperty: 'success',
            messageProperty: 'msg',
            writeAllFields:true
        } 
    }  
//        proxy: {
//        type: 'memory',
//        reader: {
//            type: 'json',
//            rootProperty: 'data'
//        }
//    }
       
     
});

