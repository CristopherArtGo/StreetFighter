class FightingGround {
    constructor(characterId1, fighter1, characterId2, fighter2) {
        this.character1 = new Character(characterId1, fighter1);
        this.character2 = new Character(characterId2, fighter2);
    }

    mainLoop() {
        this.character1.updateCharacter();
        this.character2.updateCharacter();
    }
}
