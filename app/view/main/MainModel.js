/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('slrcards.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.mainm',

    data: {
        name: 'slrcards',

        loremIpsum: 'sdsddsd'
    },
    formulas: {
        // We'll explain formulas in more detail soon.
        name: function (get) {
            var fn = get('firstName'), ln = get('lastName');
            return (fn && ln) ? (fn + ' ' + ln) : (fn || ln || '');
        }
    }
});
