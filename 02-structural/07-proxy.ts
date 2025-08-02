/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
  name: string;
  level: number;

  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}
interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%cWelcome to Secret room, ${player.name}`, COLORS.blue);
    console.log(`a Great enemy awaits you, ${player.name}`);
  }
}

//class Proxy - Mogic Portal
class MagicPortal implements Room {
  private secretRoom: SecretRoom;
  private minLvl: number = 10;

  constructor(room: SecretRoom) {
    this.secretRoom = room;
  }

  enter(player: Player): void {
    if (player.level >= this.minLvl) {
      this.secretRoom.enter(player);
      return;
    }
    console.log(
      `%cYou are not allowed to enter, ${player.name}, your level are ${player.level} and is too low, the level required is ${this.minLvl}`,
      COLORS.red
    );
  }
}

function main() {
  const player1 = new Player("Gandalf", 20);
  const player2 = new Player("Frodo", 5);

  const secretRoom = new SecretRoom();
  const magicPortal = new MagicPortal(secretRoom);

  magicPortal.enter(player1); // Allowed
  magicPortal.enter(player2); // Not allowed
}

main();
