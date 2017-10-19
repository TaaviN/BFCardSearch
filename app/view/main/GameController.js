/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
var cards = [], started = false, matches_found = 0, card1 = false, card2 = false, movesmade = 0;
Ext.define('slrcards.view.main.GameController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gamec',
    movesmade: 0,
    shuffle: function (a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    },
    testIdInArray: function (cardId) {
        var isfound = false;

        var i2 = 0;
        for (i2; i2 < cards.length; i2++) {
            if (cards[i2].matchnum === cardId) {
                isfound = true;
            }
        }
        if (isfound) {
            return this.testIdInArray(Math.floor((Math.random() * 538) + 1));
        } else {
            return cardId;
        }
    },
    startGame: function () {
        var me = this;
        var stage = Ext.first('#matchacard');
        var wstore = Ext.data.StoreManager.lookup("ApiCardsForGame");
        var wrange = wstore.getRange();
        if (wrange.length < 1) {
            started = false;
            this.movesmade = 0;
        }
        if (started) {
            Ext.toast(
                    {
                        html: me.getLngString('Your game already running pls finish it'),
                        title: me.getLngString('Game running'),
                        width: 600,
                        align: 't'
                    }
            );
            stage.refresh();
        } else {
            cards = [];
            var store = Ext.data.StoreManager.lookup("ApiCardsMain");


            for (var i = 0; i < 16; i++) {

                var cardId = this.testIdInArray(Math.floor((Math.random() * 538) + 1));
                var card1 = store.getById(cardId).getData();
                var card2 = store.getById(cardId).getData();
                card1.cardId = cardId + '1111';
                card1.id = null;
                card1.matchnum = cardId;
                cards.push(card1);
                card2.cardId = cardId + '2222';
                card2.id = null;
                card2.matchnum = cardId;

                cards.push(card2);
            }
            this.shuffle(cards);

            var recordsToRemove = [];
            var range = wstore.getRange();

            var i2 = 0;
            for (i2; i2 < range.length; i2++) {
                recordsToRemove.push(wstore.getAt(i2));
            }
            wstore.remove(recordsToRemove);
            wstore.add(cards);
            var cardsGameMatchesCounter = Ext.first('#cardsGameMatchesCounter');
            var cardsGameMoveCounter = Ext.first('#cardsGameMoveCounter');
            cardsGameMatchesCounter.setText(me.getLngString('Matches found') + ' 0');
            cardsGameMoveCounter.setText(me.getLngString('Moves made') + ' 0');
            cardsGameMatchesCounter.show();
            cardsGameMoveCounter.show();

            stage.refresh();
            started = true;
        }



    },
    hideCard: function (id)
    {
        var gamecardimg = document.getElementById('gamecardimg' + id);
        gamecardimg.src = "img/?units|0|png|90|200|350";
        gamecardimg.height = "129";
        var domel = Ext.fly(Ext.getDom(gamecardimg));
        domel.animate({
            duration: 500,
            from: {
                opacity: 1
            },
            to: {
                opacity: 1
            }
        });


    },
    moveToPack: function (index)
    {

        cards[index].matched = true;

    },
    cardClick: function (el, record, target, index, e, eOpts)
    {
        this.showCard(el, record, target, index, e, eOpts);
    },
    showCard: function (el, record, target, index, e, eOpts)
    {
        var data = record.getData();
        var me = this;
        var sstore = Ext.first('#matchacard').getStore();
        if (index === card1)
            return;
        if (cards[index].matched)
            return;

        var gamecardimg = document.getElementById('gamecardimg' + data.cardId);
        gamecardimg.src = "img/?units|" + data.Image.ObjectID + "|png|90|200|350";
        gamecardimg.height = "129";
        var domel = Ext.fly(Ext.getDom(gamecardimg));
        domel.animate({
            duration: 500,
            from: {
                opacity: 1
            },
            to: {
                opacity: 1
            }
        });

        if (card1 !== false) {
            card2 = index;
            var card1d = sstore.getAt(card1).getData();
            var card2d = sstore.getAt(card2).getData();
            var card1i = card1;
            var card2i = card2;


            if (parseInt(card1d.matchnum) == parseInt(card2d.matchnum)) {
                var taskm = new Ext.util.DelayedTask(function () {
                    me.moveToPack(card1i);
                    me.moveToPack(card2i);
                });
                taskm.delay(1000);
                if (++matches_found === 16) {

                    Ext.toast(
                            {
                                html: me.getLngString('You made ') + me.movesmade + ' ' + me.getLngString('moves to find') + ' ' + matches_found + ' ' + me.getLngString('matches'),
                                title: me.getLngString('Game finished'),
                                width: 600,
                                align: 't'
                            }
                    );
                    matches_found = 0;
                    me.movesmade = 0;
                    started = false;

                    var cardsGameMatchesCounter = Ext.first('#cardsGameMatchesCounter');
                    var cardsGameMoveCounter = Ext.first('#cardsGameMoveCounter');
                    cardsGameMatchesCounter.hide();
                    cardsGameMoveCounter.hide();


                }
            } else {
                var task = new Ext.util.DelayedTask(function () {
                    me.hideCard(card1d.cardId);
                    me.hideCard(card2d.cardId);
                });
                task.delay(1000);

            }
            card1 = card2 = false;
            me.movesmade++;


            var cardsGameMatchesCounter = Ext.first('#cardsGameMatchesCounter');
            var cardsGameMoveCounter = Ext.first('#cardsGameMoveCounter');
            cardsGameMatchesCounter.setText(me.getLngString('Matches found') + ' ' + matches_found);
            cardsGameMoveCounter.setText(me.getLngString('Moves made') + ' ' + me.movesmade);

        } else {
            card1 = index;
        }
    },
    getLngCode: function () {
        var code = 'en';
        if (window.localStorage.getItem('BaFoLNG') == null) {
            code = 'en';
        } else {
            code = window.localStorage.getItem('BaFoLNG');
        }
        return code;


    },
    getLngString: function (str) {
        var code = 'en';
        var strcode = str;
        if (window.localStorage.getItem('BaFoLNG') == null) {
            code = 'en';
        } else {
            code = window.localStorage.getItem('BaFoLNG');
        }
        strcode = strcode.replace(/\s+/g, '');

        if (this.testExists(apptranslations[code.toLowerCase()])) {
            if (this.testExists(apptranslations[code.toLowerCase()][strcode.toLowerCase()])) {
                return apptranslations[code.toLowerCase()][strcode.toLowerCase()];
            } else {
                console.info('fallback to en', strcode, str);
                if (this.testExists(apptranslations['en'][strcode.toLowerCase()])) {
                    return apptranslations['en'][strcode.toLowerCase()];
                } else {
                    console.info('fallback to original string', str);
                    return str;
                }
            }
        }


    },
    testExists: function (item) {

        if ((typeof item) === "undefined" || item === null) {
            return false;
        } else {
            return true;
        }
    }
});
 