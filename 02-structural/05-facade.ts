import { COLORS } from "../helpers/colors.ts";
/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */
class Projector {
  turnOn() {
    console.log(`Projector has been turned on.`);
  }
  turnOff() {
    console.log(`Projector has been turned off.`);
  }
}

class SoundSystem {
  on() {
    console.log(`Sound system has been turned on.`);
  }
  off() {
    console.log(`Sound system has been turned off.`);
  }
}

class VideoPlayer {
  on() {
    console.log("object VideoPlayer has been turned on.");
  }

  play(movie: string) {
    console.log(`playing movie: %c${movie}`, COLORS.blue);
  }

  stop() {
    console.log("Stopping video player.");
  }

  off() {
    console.log("Video player has been turned off.");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Popcorn is popping!");
  }
  turnOffPoppingPopcorn() {
    console.log("Popcorn maker has been turned off.");
  }
}

interface HomeTheaterFacadeOptions {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string): void {
    console.log("%cPreparing to watch movie...", COLORS.green);
    this.projector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log("%cEnjoy your movie!", COLORS.green);
  }

  endWatchingMovie(): void {
    console.log("%cPreparing to end movie...", COLORS.red);
    this.projector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.turnOffPoppingPopcorn();
    this.videoPlayer.stop();
    this.videoPlayer.off();

    console.log("%cMovie ended. Thank you for watching!", COLORS.red);
  }
}

function main() {
  const projector = new Projector();
  const soundSystem = new SoundSystem();
  const videoPlayer = new VideoPlayer();
  const popcornMaker = new PopcornMaker();

  const homeTheater = new HomeTheaterFacade({
    projector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  });

  homeTheater.watchMovie("Inception");
  homeTheater.endWatchingMovie();
}

main();
