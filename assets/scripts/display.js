const character = JSON.parse(localVal.replaceAll("&#34;", '"'));
console.log(character);
class Skill {
    //Holds data for displaying skills
    constructor(name, atr, prof) {
        this.name = name;
        this.atr = atr;
        this.prof = prof;
    }
    getAtr() {
        return this.atr.substr(0, 1).toUpperCase() + this.atr.substr(1).toLowerCase();
    }
    getTotal() {
        //Finds the total value for a skill
        let total = character[this.atr + "Bon"];
        if(this.prof)
            total += character.profBon;
        return total;
    }
    updateDisplay() {
        const modTile = document.getElementById(this.name + " td");
        modTile.innerHTML = this.getTotal();
    }
    toggleProf() {
        this.prof = !this.prof;
        this.updateDisplay();
    }
}
class Attribute {
    constructor(abbrev, fullName, value, prof) {
        this.abbrev = abbrev;
        this.fullName = fullName;
        this.value = value;
        this.prof = prof;
    }
    getSavingThrow() {
        let total = this.value;
        if(this.prof) total += character.profBon;
        return total;
    }
}

function getSkills() {
    return [
        new Skill("Acrobatics", "dex", false),
        new Skill("Animal Handling", "wis", false),
        new Skill("Arcana", "int", false),
        new Skill("Athletics", "str", false),
        new Skill("Deception", "cha", false),
        new Skill("History", "int", false),
        new Skill("Insight", "wis", false),
        new Skill("Intimidation", "cha", false),
        new Skill("Investigation", "int", false),
        new Skill("Medicine", "wis", false),
        new Skill("Nature", "int", false),
        new Skill("Perception", "wis", false),
        new Skill("Performance", "cha", false),
        new Skill("Persuasion", "cha", false),
        new Skill("Religion", "int", false),
        new Skill("Sleight of Hand", "dex", false),
        new Skill("Stealth", "dex", false),
        new Skill("Survival", "wis", false)
    ];
}
function getAttrs() {
    return [
        new Attribute("str", "Strength", character.strBon, character.savingThrows[0]),
        new Attribute("dex", "Dexterity", character.dexBon, character.savingThrows[1]),
        new Attribute("con", "Constitution", character.conBon, character.savingThrows[2]),
        new Attribute("int", "Intelligence", character.intBon, character.savingThrows[3]),
        new Attribute("wis", "Wisdom", character.wisBon, character.savingThrows[4]),
        new Attribute("cha", "Intelligence", character.chaBon, character.savingThrows[5]),
    ]
}
function loadSkillTable(skills) {
    const skillTable = document.getElementById("skillTable");
    skills.forEach(skill => {
        const rowElem = document.createElement("tr");
        skillTable.appendChild(rowElem);

        const checkTile = document.createElement("td");
        rowElem.appendChild(checkTile);

        const checkBox = document.createElement("input");
        checkBox.type="checkbox";
        checkBox.onclick = () => skill.toggleProf();

        checkTile.appendChild(checkBox);
        const text = document.createElement("span");
        let classProfMark = "";
        if(character.skillProfOpts.map(s => s.toLowerCase()).includes(skill.name.toLowerCase()))
            classProfMark = "*"
        text.innerHTML = skill.name + " (" + skill.getAtr() + ")" + classProfMark;
        checkTile.appendChild(text);

        const modTile = document.createElement("td");
        modTile.innerHTML = skill.getTotal();
        modTile.id = skill.name + " td";
        rowElem.appendChild(modTile);
    });
}
function loadAttrNames(attrs) {
    attrs.forEach(attr => {
        const tile = document.getElementById(attr.abbrev + "Name");
        let classProfMark = "";
        if(attr.prof)
            classProfMark = "*";
        tile.innerHTML = attr.fullName + classProfMark;
    })
}
function loadSaves(attrs) {
    attrs.forEach(attr => {
        const tile = document.getElementById(attr.abbrev + "SaveVal");
        tile.innerHTML = attr.getSavingThrow();
    });
}
window.onload = () => {
    const skills = getSkills();
    const attrs = getAttrs();
    loadSkillTable(skills);
    loadAttrNames(attrs);
    loadSaves(attrs);
}