/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'slrcards',
    extend: 'slrcards.Application',
    requires: [
        'slrcards.model.Base',
        'Ext.ux.Spotlight',
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.toolbar.*',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'Ext.Ajax',
        'Ext.layout.*',
        'Ext.XTemplate',
        'Ext.view.*',
        'Ext.window.*',
        'Ext.tab.*',
        'Ext.panel.*',
        'Ext.LoadMask',
        'slrcards.view.Window',
        'slrcards.view.main.MainController',
        'slrcards.view.main.MainEditorController',
        'slrcards.view.main.GameController',
        'slrcards.view.main.MainModel',
        'slrcards.view.main.Main',
        'slrcards.view.DecksData',
        'slrcards.view.CardsData',
        'slrcards.view.CardsBorder',
        "slrcards.view.CardsToDeck",
        'slrcards.view.SharedCardsData',
        'slrcards.view.MapsBorder',
        'slrcards.view.MapsData',
        'slrcards.view.MapData',
        'slrcards.view.CardsEditorBorder',
        'slrcards.view.CardsEditorData' ,
        'slrcards.view.MatchACard',
        'slrcards.view.EmptyBg'
    ],
    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'slrcards.view.main.Main'

            //-------------------------------------------------------------------------
            // Most customizations should be made to slrcards.Application. If you need to
            // customize this file, doing so below this section reduces the likelihood
            // of merge conflicts when upgrading to new versions of Sencha Cmd.
            //-------------------------------------------------------------------------
});
