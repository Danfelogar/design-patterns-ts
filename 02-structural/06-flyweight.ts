import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
interface Location {
  display(coordinates: { x: number; y: number }): void;
}

//Flyweight
class LocationIcon implements Location {
  private type: string; // hospital, restaurant, park,etc(the same icon).
  private iconImage: string;

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `
      Coordinates: ${this.type} in (${coordinates.x}, ${coordinates.y}) with icon: %c[${this.iconImage}]
    `,
      COLORS.orange
    );
  }
}

//FLyweight Factory
class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreating a new instance of ${type} icon`, COLORS.red);
      const iconImage = `image_of_${type.toLowerCase()}.jpg`;
      this.icons[type] = new LocationIcon(type, iconImage);
    }
    return this.icons[type];
  }
}

class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;

  constructor(x: number, y: number, icon: LocationIcon) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display(): void {
    this.icon.display(this.coordinates);
  }
}

function main() {
  const factory = new LocationFactory();

  const location = [
    new MapLocation(10, 20, factory.getLocationIcon("Hospital")),
    new MapLocation(30, 40, factory.getLocationIcon("Restaurant")),
    new MapLocation(50, 60, factory.getLocationIcon("Hospital")),
    new MapLocation(70, 80, factory.getLocationIcon("Park")),
    new MapLocation(50, 60, factory.getLocationIcon("Hospital")),
  ];

  location.forEach((loc) => loc.display());
}

main();
