Ext.define("slrcards.model.Deck", {
    extend: "slrcards.model.Base",
    alias: 'model.Deck',
    idProperty: 'deckId',
    identifier: 'uuid',
    fields: [
        {name: "deckId", type: "int", defaultValue: null},
        {name: 'name', type: 'auto'},
        {name: 'cards', type: 'auto'},
        {
            name: 'cardscount', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                return data.cards.length;
            }
        },
        {
            name: 'firstimage', type: 'auto',
            convert: function (v, record) {
                var data = record.getData();
                if (data.cards[0]) {

                    return data.cards[0].Image.ObjectID;
                } else {
                    return 0;
                }
            }
        }

    ]

});
