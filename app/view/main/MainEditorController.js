/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('slrcards.view.main.MainEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.maineditorc',
    testOrbSum: function (key, Orb1, Orb2, Orb3, Orb4) {
        var sum = 0;
        if (Orb1 == key) {
            sum++;
        }
        if (Orb2 == key) {
            sum++;
        }
        if (Orb3 == key) {
            sum++;
        }
        if (Orb4 == key) {
            sum++;
        }
        return sum;
    },
    runAbilityTest: function (obj) {
        var abarr = [];

        if (obj.Ability_Name && obj.Ability_Name.length > 0) {

            var TestAName = obj.Ability_Name[0];
            if (TestAName.length === 1) {
                var Name = obj.Ability_Name;
                var Description = obj.Ability_Description;
                var Type = obj.Ability_Type;
                var Power = obj.Ability_Power;
                var Order = obj.Ability_Order;
                var Era = obj.Ability_Era;

                abarr.push({
                    "Name": Name,
                    "Type": Type,
                    "Power": Power,
                    "Order": Order,
                    "Description": Description,
                    "Era": Era
                });

            } else {

                var i = 0;
                for (i; i < obj.Ability_Name.length; i++) {
                    var Name = obj.Ability_Name[i];
                    var Description = obj.Ability_Description[i];
                    var Type = obj.Ability_Type[i];
                    var Power = obj.Ability_Power[i];
                    var Order = obj.Ability_Order[i];
                    var Era = obj.Ability_Era[i];

                    abarr.push({
                        "Name": Name,
                        "Type": Type,
                        "Power": Power,
                        "Order": Order,
                        "Description": Description,
                        "Era": Era
                    });
                }
            }
        }
        return abarr;
    },
    runUpgradeTest: function (obj) {
        var uparr = [];
        if (obj.Upgrade_Description && obj.Upgrade_Description.length > 0) {

            var TestUDescription = obj.Upgrade_Description[0];
            if (TestUDescription.length === 1) {

                var Description = obj.Upgrade_Description;
                var Era = obj.Upgrade_Era;
                var MapName = obj.Upgrade_Map_Name;
                var Difficulty = obj.Upgrade_Map_Difficulty;

                var Upgrade_Map_ShowOnBase = obj.Upgrade_Map_ShowOnBase;
                var Upgrade_Map_ShowOnLvlOne = obj.Upgrade_Map_ShowOnLvlOne;
                var Upgrade_Map_ShowOnLvlTwo = obj.Upgrade_Map_ShowOnLvlTwo;

                uparr.push({
                    "Description": Description,
                    "Era": Era,
                    "Map": {
                        "Name": MapName,
                        "Difficulty": Difficulty
                    },
                    "Show": {
                        "Base": Upgrade_Map_ShowOnBase,
                        "One": Upgrade_Map_ShowOnLvlOne,
                        "Two": Upgrade_Map_ShowOnLvlTwo
                    }
                });
            } else {
                var i2 = 0;
                for (i2; i2 < obj.Upgrade_Description.length; i2++) {
                    var Description = obj.Upgrade_Description[i2];
                    var Era = obj.Upgrade_Era[i2];
                    var MapName = obj.Upgrade_Map_Name[i2];
                    var Difficulty = obj.Upgrade_Map_Difficulty[i2];

                    var Upgrade_Map_ShowOnBase = obj.Upgrade_Map_ShowOnBase[i2];
                    var Upgrade_Map_ShowOnLvlOne = obj.Upgrade_Map_ShowOnLvlOne[i2];
                    var Upgrade_Map_ShowOnLvlTwo = obj.Upgrade_Map_ShowOnLvlTwo[i2];

                    uparr.push({
                        "Description": Description,
                        "Era": Era,
                        "Map": {
                            "Name": MapName,
                            "Difficulty": Difficulty
                        },
                        "Show": {
                            "Base": Upgrade_Map_ShowOnBase,
                            "One": Upgrade_Map_ShowOnLvlOne,
                            "Two": Upgrade_Map_ShowOnLvlTwo
                        }
                    });
                }
            }
        }
        return uparr;
    },
    saveCardData: function (rec) {
        /*Global card information*/
        var cardEditorDataForm = Ext.first('#cardEditorDataForm').getValues();
        /*Base card upgrade data*/
        var cardEditorDataFormBase = Ext.first('#cardEditorDataFormBase').getValues();
        /*english*/
        var cardEditorDataFormEN = Ext.first('#cardEditorDataFormEN').getValues();
        var cardEditorAbilitiesFormEN0 = Ext.first('#cardEditorAbilitiesFormEN0').getValues();
        var cardEditorAbilitiesFormEN1 = Ext.first('#cardEditorAbilitiesFormEN1').getValues();
        var cardEditorAbilitiesFormEN2 = Ext.first('#cardEditorAbilitiesFormEN2').getValues();
        var cardEditorAbilitiesFormEN3 = Ext.first('#cardEditorAbilitiesFormEN3').getValues();
        var cardEditorUpgradesFormEN0 = Ext.first('#cardEditorUpgradesFormEN0').getValues();
        /*deutchland*/
        var cardEditorDataFormDE = Ext.first('#cardEditorDataFormDE').getValues();
        var cardEditorAbilitiesFormDE0 = Ext.first('#cardEditorAbilitiesFormDE0').getValues();
        var cardEditorAbilitiesFormDE1 = Ext.first('#cardEditorAbilitiesFormDE1').getValues();
        var cardEditorAbilitiesFormDE2 = Ext.first('#cardEditorAbilitiesFormDE2').getValues();
        var cardEditorAbilitiesFormDE3 = Ext.first('#cardEditorAbilitiesFormDE3').getValues();
        var cardEditorUpgradesFormDE0 = Ext.first('#cardEditorUpgradesFormDE0').getValues();
        /*Russian*/
        var cardEditorDataFormRU = Ext.first('#cardEditorDataFormRU').getValues();
        var cardEditorAbilitiesFormRU0 = Ext.first('#cardEditorAbilitiesFormRU0').getValues();
        var cardEditorAbilitiesFormRU1 = Ext.first('#cardEditorAbilitiesFormRU1').getValues();
        var cardEditorAbilitiesFormRU2 = Ext.first('#cardEditorAbilitiesFormRU2').getValues();
        var cardEditorAbilitiesFormRU3 = Ext.first('#cardEditorAbilitiesFormRU3').getValues();
        var cardEditorUpgradesFormRU0 = Ext.first('#cardEditorUpgradesFormRU0').getValues();
//        console.log('cardEditorDataForm', cardEditorDataForm);
//        console.log('cardEditorDataFormBase', cardEditorDataFormBase);
//        console.log('en', cardEditorAbilitiesFormEN0, cardEditorAbilitiesFormEN1, cardEditorAbilitiesFormEN2, cardEditorAbilitiesFormEN3, cardEditorUpgradesFormEN0);
//        console.log('de', cardEditorAbilitiesFormDE0, cardEditorAbilitiesFormDE1, cardEditorAbilitiesFormDE2, cardEditorAbilitiesFormDE3, cardEditorUpgradesFormDE0);
//        console.log('ru', cardEditorAbilitiesFormRU0, cardEditorAbilitiesFormRU1, cardEditorAbilitiesFormRU2, cardEditorAbilitiesFormRU3, cardEditorUpgradesFormRU0);
//        return true;
        //cardId: "388", Cost: "220", IsRanged: false, Rarity: 2, Affinity: 3, Type

        var Name = {
            "en": cardEditorDataFormEN.Name,
            "de": cardEditorDataFormDE.Name,
            "ru": cardEditorDataFormRU.Name
        };
        var Category = {
            "en": cardEditorDataFormEN.Category,
            "de": cardEditorDataFormDE.Category,
            "ru": cardEditorDataFormRU.Category
        };
        var Extra = {
            "en": cardEditorDataFormEN.Extra,
            "de": cardEditorDataFormDE.Extra,
            "ru": cardEditorDataFormRU.Extra
        };
        /*card orb info*/
        var Orb1 = cardEditorDataForm.Orb1;
        var Orb2 = cardEditorDataForm.Orb2;
        var Orb3 = cardEditorDataForm.Orb3;
        var Orb4 = cardEditorDataForm.Orb4;
        var OrbInfo = {
            "OrbCode": '' + Orb1 + '' + Orb2 + '' + Orb3 + '' + Orb4 + '',
            "Neutral": this.testOrbSum("1", Orb1, Orb2, Orb3, Orb4),
            "Frost": this.testOrbSum("B", Orb1, Orb2, Orb3, Orb4),
            "Fire": this.testOrbSum("R", Orb1, Orb2, Orb3, Orb4),
            "Nature": this.testOrbSum("N", Orb1, Orb2, Orb3, Orb4),
            "Shadow": this.testOrbSum("S", Orb1, Orb2, Orb3, Orb4)
        };
        /*lets build up offence defence information yay*/
        var Defense = {
            "None": cardEditorDataFormBase.BaseDefense,
            "One": cardEditorDataFormBase.DefenseLevelI,
            "Two": cardEditorDataFormBase.DefenseLevelII,
            "Three": cardEditorDataFormBase.DefenseLevelIII
        };
        var Offense = {
            "None": cardEditorDataFormBase.BaseOffense,
            "One": cardEditorDataFormBase.OffenseLevelI,
            "Two": cardEditorDataFormBase.OffenseLevelII,
            "Three": cardEditorDataFormBase.OffenseLevelIII
        };
        var DefenseType = {
            "None": cardEditorDataFormBase.BaseDefenseType,
            "One": cardEditorDataFormBase.DefenseTypeLevelI,
            "Two": cardEditorDataFormBase.DefenseTypeLevelII,
            "Three": cardEditorDataFormBase.DefenseTypeLevelIII
        };
        var OffenseType = {
            "None": cardEditorDataFormBase.BaseOffenseType,
            "One": cardEditorDataFormBase.OffenseTypeLevelI,
            "Two": cardEditorDataFormBase.OffenseTypeLevelII,
            "Three": cardEditorDataFormBase.OffenseTypeLevelIII
        };
        var ChargeCount = {
            "None": cardEditorDataFormBase.BaseChargeCount,
            "One": cardEditorDataFormBase.ChargeCountLevelI,
            "Two": cardEditorDataFormBase.ChargeCountLevelII,
            "Three": cardEditorDataFormBase.ChargeCountLevelIII
        };
        var UnitCount = {
            "None": cardEditorDataFormBase.BaseUnitCount,
            "One": cardEditorDataFormBase.UnitCountLevelI,
            "Two": cardEditorDataFormBase.UnitCountLevelII,
            "Three": cardEditorDataFormBase.UnitCountLevelIII
        };

        var AbilitiesEN = {
            'None': this.runAbilityTest(cardEditorAbilitiesFormEN0),
            'One': this.runAbilityTest(cardEditorAbilitiesFormEN1),
            'Two': this.runAbilityTest(cardEditorAbilitiesFormEN2),
            'Three': this.runAbilityTest(cardEditorAbilitiesFormEN3)
        };
        var AbilitiesDE = {
            'None': this.runAbilityTest(cardEditorAbilitiesFormDE0),
            'One': this.runAbilityTest(cardEditorAbilitiesFormDE1),
            'Two': this.runAbilityTest(cardEditorAbilitiesFormDE2),
            'Three': this.runAbilityTest(cardEditorAbilitiesFormDE3)
        };
        var AbilitiesRU = {
            'None': this.runAbilityTest(cardEditorAbilitiesFormRU0),
            'One': this.runAbilityTest(cardEditorAbilitiesFormRU1),
            'Two': this.runAbilityTest(cardEditorAbilitiesFormRU2),
            'Three': this.runAbilityTest(cardEditorAbilitiesFormRU3)
        };
        var Abilities = {'en': AbilitiesEN, 'de': AbilitiesDE, 'ru': AbilitiesRU};

        var UpgradesEN = this.runUpgradeTest(cardEditorUpgradesFormEN0);
        var UpgradesDE =  this.runUpgradeTest(cardEditorUpgradesFormDE0); 
        var UpgradesRU =  this.runUpgradeTest(cardEditorUpgradesFormRU0); 
        var Upgrades = {'en': UpgradesEN, 'de': UpgradesDE, 'ru': UpgradesRU};

        var recdata = rec.getData();
         
            recdata.Name= Name;
            recdata.Category= Category;
            
            recdata.Offense= Offense;
            recdata.OffenseType= OffenseType;
            recdata.Defense= Defense;
            recdata.DefenseType= DefenseType;
            recdata.UnitCount=  UnitCount;
            recdata.ChargeCount=  ChargeCount;
            
            recdata.OrbInfo=OrbInfo;
            recdata.Abilities= Abilities;
            recdata.Upgrades=Upgrades;
            recdata.Cost= cardEditorDataForm.Cost; 
            recdata.IsRanged= cardEditorDataForm.IsRanged;
            recdata.Rarity= cardEditorDataForm.Rarity;
            recdata.Affinity= cardEditorDataForm.Affinity;
            recdata.Type=cardEditorDataForm.Type;
       
        
        Ext.Ajax.request({
            url: 'newformatjsondata/',
            jsonData: recdata ,
            method:"POST",
            success: function (response, opts) {
//                console.log(response, opts);
            },
            failure: function (response, opts) {
//                console.log(response, opts);
            }
        });
        

/*
     newformatjsondata

        Ext.Ajax.request({
            url: 'editors/',
            params: {
                code: iAmAEditorCode,
                name: iAmAEditorName,
                cardname: datavals.Name,
                cardId: rec.getData().cardId,
                json: 1
            },
            success: function (response, opts) {},
            failure: function (response, opts) {}
        });*/


    }




});
