const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://acarlso1:FSSZfskcR6EPoMzq@sw-dnd.s9vcx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connection = MongoClient.connect(connectionString, { useNewUrlParser: true });

//This is the Character class. It holds all the information about a given character given user input and database access
class Character {
    constructor(charName, level, raceName, className, str, dex, con, int, wis, cha) {
      this.charName = charName;
      this.level = level;
      this.str = str;
      this.dex = dex;
      this.con = con;
      this.int = int;
      this.wis = wis;
      this.cha = cha;

      //this connects us to the client
      connection.then(client => {
        //Reads in the Races Database and assigns the values to the character class
        const racesCollection = client.db('DnDRules').collection('Races');
        racesCollection.findOne({race: raceName}, (err, result) => {
          if (err) throw err;
          this.raceName = result.race;
          const stats = ["str", "dex", "con", "int", "wis", "cha"];
          stats.forEach((stat, i) => {
            this[stat] = Number(this[stat]) + Number(result.asi[i]);
            this[stat + "Bon"] = Math.floor(this[stat] / 2) - 5;
          });
          this.raceFeatures = result.racial_features;
  
          //Reads in the Classes Database and sets its values to the Character class
          //note: these are nested so that the values can build on eachother without developing race conditions
          //It's a bit ugly, I know, but yeah
          const classCollection = client.db('DnDRules').collection('Classes')
          classCollection.findOne({name: className}, (err, result) => {
              if (err) throw err;
              this.className = result.name;
              this.hitDie = result.hit_dice;
              this.savingThrows = result.saving_throws;
              this.armorProfs = result.armor_proficiencies;
              this.weaponProfs = result.weapon_proficiencies;
              this.toolProfs = result.toolProficiencies;
              this.skillProfOpts = result.skill_proficiency_options;
              this.skillProfChoices = result.skill_proficiency_choices;
              this.classFeatures = result.class_features;
  
              //Here the imported information is used to calculate other information, like HP, AC, Proficiency Bonus, etc.
              this.ac = 10 + this.dexBon;
              this.hp = this.level * (Math.ceil(this.hitDie / 2 + 1) + this.conBon);
              this.profBon = Math.floor((this.level - 1) / 4) + 2;
          })
        })
      })
    }
  }
  module.exports = Character;