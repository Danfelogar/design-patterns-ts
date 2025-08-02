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
import { COLORS } from "../helpers/colors.ts";
interface NotificationChannel {
  send(message: string): void;
}

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  protected typeDevice: string;
  constructor(typeDevice: string) {
    this.typeDevice = typeDevice;
  }
  send(message: string): void {
    console.log(`Enviando Push by ${this.typeDevice}: ${message}`);
  }
}

abstract class Notification {
  protected channels: NotificationChannel[];
  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }
  abstract notify(message: string): void;
  abstract addChannel(channel: NotificationChannel): void;
}

class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log("\n%cNotification Alert:", COLORS.red);
    this.channels.forEach((channel) => channel.send(message));
  }

  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }
}

function main() {
  const channels = [
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel("mobile"),
    new PushNotificationChannel("tablet"),
    new PushNotificationChannel("desktop"),
  ];

  const alert = new AlertNotification(channels);
  alert.notify("Security alert: Someone are in front of your house!");

  console.log("\n");
}

main();
