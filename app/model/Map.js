Ext.define("slrcards.model.Map", {
    extend: "slrcards.model.Base",
    alias: 'model.Map',
    idProperty: 'mapId',
    identifier: 'uuid',
    fields: [
        {name: "mapId", type: "int", defaultValue: null},
        {name: 'Name', type: 'auto'},
        {name: 'SubTitle', type: 'auto'},
        {name: 'Campaign', type: 'auto'},
        {name: 'Players', type: 'auto'},
        {name: 'Edition', type: 'auto'},
        {name: 'Description', type: 'auto'},
        {name: 'Goals', type: 'auto'},
        {name: 'Unlocks', type: 'auto'},
        {name: 'Prerequisite', type: 'auto'},
        {name: 'Image', type: 'auto'},
        {name: 'Map', type: 'auto'},
        {name: 'Difficulties', type: 'auto'},
        {name: 'WalkThrough', type: 'auto'},
        {name: 'Standard', type: 'auto'},
        {name: 'Advanced', type: 'auto'},
        {name: 'Expert', type: 'auto'}


    ]

});
