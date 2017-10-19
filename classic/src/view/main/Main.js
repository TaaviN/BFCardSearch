Ext.define("slrcards.view.main.Main", {
    extend: "Ext.Container",
    alias: "widget.main",
    xtype: "main",
    itemId: "main",
    layout: 'card',
    requires: [
      
    ],
    controller: 'mainc',
    viewModel: 'mainm',
    initComponent: function () {
        Ext.apply(this, {
            items: [
                
                {
                    xtype:'emptybg'
                },
                {
                    xtype: 'cardsborder'
                },
                {
                    xtype: 'mapsborder'
                },
                {
                    xtype: 'mapdata'
                },
                {
                    xtype:'cardseditorborder'
                } 
            ]
        });
        this.callParent(arguments);
    }
});
