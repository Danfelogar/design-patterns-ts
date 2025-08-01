/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

class DragonBalls {
  private static instance: DragonBalls;
  private ballsCollected: number;

  //en este caso el private en el constructor ayuda a que no se pueda crear una instancia de la misma clase sin importar cuantas veces se llame new DragonBalls()
  private constructor() {
    this.ballsCollected = 0;
  }

  //Al ser estático, se puede acceder a este método sin necesidad de crear una instancia de la clase es decir sin poner "new DragonBalls()"
  public static getInstance(): DragonBalls {
    if (!DragonBalls.instance) {
      DragonBalls.instance = new DragonBalls();
      console.log("%cdragon balls created successfully", COLORS.green);
    }
    return DragonBalls.instance;
  }

  collectBall(): void {
    if (this.ballsCollected < 7) {
      this.ballsCollected++;
      console.log(
        "%cBall collected! Total balls: " + this.ballsCollected,
        COLORS.yellow
      );
      return;
    }

    console.log(
      "%cAll dragon balls have been collected!, summoner Shenrong",
      COLORS.red
    );
  }

  summonShenrong(): void {
    if (this.ballsCollected === 7) {
      console.log(
        "%cShenrong has been summoned! You can make a wish.",
        COLORS.blue
      );
      this.ballsCollected = 0; // Reset after summoning
      return;
    }
    console.log(
      `%c There are still ${
        7 - this.ballsCollected
      } dragon balls missing to summon Shenrong`,
      COLORS.red
    );
  }
}

function main() {
  const gokuDragonBalls = DragonBalls.getInstance();

  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();
  gokuDragonBalls.collectBall();

  gokuDragonBalls.summonShenrong();

  const vegetaDragonBalls = DragonBalls.getInstance();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  vegetaDragonBalls.collectBall();
  gokuDragonBalls.summonShenrong();

  vegetaDragonBalls.summonShenrong();
}

main();
