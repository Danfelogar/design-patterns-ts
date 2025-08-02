import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */
interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log("%cAttack with a sword brave!", COLORS.blue);
  }
}

class MagicSpell implements Ability {
  use(): void {
    console.log("%cCast a magic spell!", COLORS.purple);
  }
}

class BowAttack implements Ability {
  use(): void {
    console.log("%cShoot an arrow with a bow!", COLORS.green);
  }
}

abstract class Character {
  protected ability: Ability;

  constructor(ability: Ability) {
    this.ability = ability;
  }

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

class Warrior extends Character {
  override performAbility(): void {
    console.log("The warrior is ready to fight!");
    this.ability.use();
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log("The mage is ready to cast spells!");
    this.ability.use();
  }
}

class Archer extends Character {
  override performAbility(): void {
    console.log("The archer is ready to shoot!");
    this.ability.use();
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack());
  warrior.performAbility();

  const mage = new Mage(new MagicSpell());
  mage.performAbility();

  const archer = new Archer(new BowAttack());
  archer.performAbility();

  // Cambiando la habilidad del guerrero a un ataque con arco
  warrior.setAbility(new BowAttack());
  warrior.performAbility();
}

main();
