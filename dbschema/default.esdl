using extension auth;

module default {
    type Being {
        required name: str { constraint exclusive };
        required strength: int16;
        required dexterity: int16;
        required intelligence: int16;
    }

    scalar type Weapon extending enum<Sword, Spear, Bow>;

    type Item {
        required name: str { constraint exclusive };
        required type: Weapon;
    }
}