class Character {
    constructor(characterId, fighter) {
        this.character = characterId;
        this.fighter = fighter;
        this.health = 100;

        //list of movements
        this.movement = {
            IDLE: { y: 0, x: [0, 1, 2, 3] },
            FORWARD: { y: 1, x: [0, 1, 2, 3, 4] },
            BACKWARD: { y: 1, x: [4, 3, 2, 1, 0] },
            JUMP: { y: 2, x: [0, 1, 2, 3] },
            DROP: { y: 2, x: [3, 4, 5, 6] },
            CROUCH: { y: 3, x: [1, 1] },
            BLOCK: { y: 4, x: [0] },
            CROUCHBLOCK: { y: 4, x: [1] },
            LIGHTPUNCH: { y: 5, x: [0, 1, 2] },
            HEAVYPUNCH: { y: 6, x: [0, 1, 2, 3, 4] },
            LIGHTKICK: { y: 7, x: [0, 1, 2] },
            HEAVYKICK: { y: 8, x: [0, 1, 2, 3, 4] },
            CROUCHLIGHTPUNCH: { y: 9, x: [0, 1, 2] },
            CROUCHHEAVYPUNCH: { y: 10, x: [0, 1, 2, 3, 4] },
            CROUCHLIGHTKICK: { y: 11, x: [0, 1, 2] },
            CROUCHHEAVYKICK: { y: 12, x: [0, 1, 2, 3, 4] },
            JUMPPUNCH: { y: 13, x: [0, 1, 2] },
            JUMPKICK: { y: 14, x: [0, 1] },
            HIT: { y: 15, x: [1, 2] },
            KO: { y: 16, x: [0, 1, 2, 3, 4, 4, 4, 4, 4, 4] },
            VICTORY: { y: 17, x: [0, 1, 2, 2, 2, 2] },
        };
        //starting image based on the animation
        this.frame = 0;

        //character position in the field
        this.fighter == "ryu" ? (this.x = 0) : (this.x = 0);
        this.y = 150;

        //default action
        this.action = "IDLE";
    }

    updateCharacter() {
        this.updatePosition();
        this.drawCharacter(this.movement[this.action].y, this.movement[this.action].x[this.frame++]);
    }

    //updates new postion of the character
    updatePosition() {
        //checking if animation is complete, revert back to default action except when blocking
        if (this.frame == this.movement[this.action].x.length && this.action != "BLOCK" && this.action != "CROUCHBLOCK") {
            if (this.action == "JUMP") {
                this.action = "DROP";
            } else {
                this.action = "IDLE";
            }
            this.frame = 0;
        }

        if (this.action == "FORWARD" && this.x <= 385) {
            this.x += 15;
        } else if (this.action == "BACKWARD" && this.x >= -330) {
            this.x -= 15;
        } else if (this.action == "JUMP") {
            this.y -= 30;
        } else if (this.action == "DROP") {
            this.y += 30;
        } else if (this.action == "KO") {
            this.x -= 20;
        }
    }

    //updates character position based on new position and image based on action and frame
    drawCharacter(y, x) {
        $("#" + this.character)
            .css("background", `url("images/characters/${this.fighter}/${this.fighter}_moveset.png") ` + x * -70 + "px " + -115 * y + "px")
            .css("left", this.x + "px")
            .css("top", this.y + "px");
    }

    //updates new action
    updateAction(action) {
        if (this.action == "JUMP" || this.action == "DROP") {
            if (action == "LIGHTPUNCH") {
                this.action = "JUMPPUNCH";
            }
            if (action == "LIGHTKICK") {
                this.action = "JUMPKICK";
            }
        } else {
            this.action = action;
        }
        this.frame = 0;
    }
}
