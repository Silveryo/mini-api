CREATE MIGRATION m14lvyxagjuk5gvtj36cbypxgjsxfeplpicce2o5uirbgivgdfc5sq
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE TYPE default::Being {
      CREATE REQUIRED PROPERTY dexterity: std::int16;
      CREATE REQUIRED PROPERTY intelligence: std::int16;
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY strength: std::int16;
  };
  CREATE SCALAR TYPE default::Weapon EXTENDING enum<Sword, Spear, Bow>;
  CREATE TYPE default::Item {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY type: default::Weapon;
  };
};
