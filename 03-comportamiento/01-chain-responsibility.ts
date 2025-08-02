import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

//Basic Support
class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "basic") {
      console.log(`%c Basic Support: Resolving request`, COLORS.green);
      return;
    }
    console.log(
      `%cBasic Support: Passing request to next handler --> ${request}`,
      COLORS.yellow
    );
    super.handle(request);
  }
}

//Advanced Support
class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "advanced") {
      console.log(`%c Advanced Support: Resolving request`, COLORS.green);
      return;
    }
    console.log(
      `%cAdvanced Support: Passing request to next handler --> ${request}`,
      COLORS.yellow
    );
    super.handle(request);
  }
}

//Expert Support
class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "expert") {
      console.log(`%c Expert Support: Resolving request`, COLORS.green);
      return;
    }
    console.log(
      `%cExpert Support: there isn't anything to do with this request :( --> ${request}`,
      COLORS.yellow
    );
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advancedSupport).setNext(expertSupport);

  console.log(`%c Requesting basic support`, COLORS.blue);
  basicSupport.handle("basic");

  console.log(`%c Requesting advanced support`, COLORS.blue);
  basicSupport.handle("advanced");

  console.log(`%c Requesting expert support`, COLORS.blue);
  basicSupport.handle("expert");

  console.log(`%c Requesting unknown support`, COLORS.blue);
  basicSupport.handle("unknown");
}

main();
