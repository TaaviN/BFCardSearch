Ext.define("slrcards.model.DeckCard", {
    extend: "slrcards.model.Base",
    alias: 'model.DeckCard',
    idProperty: 'cardId',
    identifier: 'uuid',
    fields: [
        {name: "cardId", type: "int", defaultValue: null},
        {name: "sequence", type: "int", defaultValue: 0},
        {name: "ctype", type: "int", defaultValue: 0},
        {name: 'Name', type: 'auto'},
        {name: 'Rarity', type: 'auto'},
        {name: 'Cost', type: 'auto'},
        {name: 'Edition', type: 'auto'},
        {name: 'Type', type: 'auto'},
        {name: 'Color', type: 'auto'},
        {name: 'Affinity', type: 'auto'},
        {name: 'IsRanged', type: 'boolean'},
        {name: 'Defense', type: 'auto'},
        {name: 'Offense', type: 'auto'},
        {name: 'DefenseType', type: 'auto'},
        {name: 'OffenseType', type: 'auto'},
        {name: 'UnitCount', type: 'auto'},
        {name: 'ChargeCount', type: 'auto'},
        {name: 'Category', type: 'auto'},
        {name: 'Abilities', type: 'auto'},
        {name: 'Upgrades', type: 'auto'},
        {name: 'OrbInfo', type: 'auto'},
        {name: 'Extra', type: 'auto'},
        {name: 'Image', type: 'auto'},
        {
            name: 'Orbs', type: 'int'
        },
        {
            name: 'ImageCollection', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Image.Collection;
            }
        },
        {
            name: 'ObjectID', type: 'int',
            convert: function (v, record) {
                var data = record.getData();

                return data.Image.ObjectID;
            }
        },
        {
            name: 'SortNameen', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Name['en'];
            }
        },
        {
            name: 'SortNamede', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();

                return data.Name['de'];
            }
        },
        {
            name: 'SortNameru', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();

                return data.Name['ru'];
            }
        },
        {
            name: 'SortCategoryen', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();

                return data.Category['en'];
            }
        },
        {
            name: 'SortCategoryde', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();

                return data.Category['de'];
            }
        },
        {
            name: 'SortCategoryru', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();

                return data.Category['ru'];
            }
        },
        {
            name: 'SortDefense0', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Defense['None'];


            }
        },
        {
            name: 'SortDefense1', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Defense['One'];


            }
        },
        {
            name: 'SortDefense2', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Defense['Two'];


            }
        },
        {
            name: 'SortDefense3', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Defense['Three'];


            }
        },
        {
            name: 'SortOffense0', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Offense['None'];


            }
        },
        {
            name: 'SortOffense1', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Offense['One'];


            }
        },
        {
            name: 'SortOffense2', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.Offense['Two'];


            }
        },
        {
            name: 'SortOffense3', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                var code = '0';
                return data.Offense['Three'];
            }
        }
    ]

});
