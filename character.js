const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://acarlso1:FSSZfskcR6EPoMzq@sw-dnd.s9vcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connection = MongoClient.connect(connectionString, { useNewUrlParser: true });

//This is the Character class. It holds all the information about a given character given user input and database access
Character = class {
    constructor(charName, level, raceName, className, str, dex, con, int, wis, cha){
      this.charName = charName
      this.level = level
      
      //this is used because the definition of "this" changes when loading into a database
      var self = this
  
      //this connects us to the client
      connection.then(client => {
  
        //Reads in the Races Database and assigns the values to the character class
        const racesCollection = client.db('DnDRules').collection('Races')
        // console.log("looking for race: ", raceName)
        racesCollection.findOne({race: raceName}, function(err, result) {
          if (err) throw err;
          // console.log("race found: ", result.race)
          self.raceName = result.race
          self.str = str + result.asi[0]
          self.dex = dex + result.asi[1]
          self.con = con + result.asi[2]
          self.int = int + result.asi[3]
          self.wis = wis + result.asi[4]
          self.cha = cha + result.asi[5]
          self.strBon = Math.floor(self.str / 2) - 5
          self.dexBon = Math.floor(self.dex / 2) - 5
          self.conBon = Math.floor(self.con / 2) - 5
          self.intBon = Math.floor(self.int / 2) - 5
          self.wisBon = Math.floor(self.wis / 2) - 5
          self.chaBon = Math.floor(self.cha / 2) - 5
          self.raceFeatures = result.racial_features
  
          //Reads in the Classes Database and sets its values to the Character class
          //note: these are nested so that the values can build on eachother without developing race conditions
          //It's a bit ugly, I know, but yeah
          const classCollection = client.db('DnDRules').collection('Classes')
          // console.log("looking for class: ", className)
          classCollection.findOne({name: className}, function(err, result) {
              if (err) throw err;
              // console.log("class found: ", result.name)
              self.className = result.name
              self.hitDie = result.hit_dice
              self.savingThrows = result.saving_throws
              self.armorProfs = result.armor_proficiencies
              self.weaponProfs = result.weapon_proficiencies
              self.toolProfs = result.toolProficiencies
              self.skillProfOpts = result.skill_proficiency_options
              self.skillProfChoices = result.skill_proficiency_choices
              self.classFeatures = result.class_features
  
              //Here the imported information is used to calculate other information, like HP, AC, Proficiency Bonus, etc.
              self.ac = 10 + self.dexBon
              self.hp = self.level * (Math.floor(self.hitDie / 2) + self.conBon)
              self.profBon = Math.floor((self.level - 1) / 4) + 2
          })
        })
      })
    }
  }
  module.exports = Character