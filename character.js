let Character = class Character {
    constructor(str, dex, con, int, wis, cha) {
        this.str = str;
        this.dex = dex;
        this.con = con;
        this.int = int;
        this.wis = wis;
        this.cha = cha;
        this.strBon = this.str / 2 - 5;
        this.dexBon = this.dex / 2 - 5;
        this.conBon = this.con / 2 - 5;
        this.intBon = this.int / 2 - 5;
        this.wisBon = this.wis / 2 - 5;
        this.chaBon = this.cha / 2 - 5;
    }
}
