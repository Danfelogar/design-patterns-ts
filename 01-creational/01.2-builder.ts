/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from "../helpers/colors.ts";

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 *
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private table: string;
  private fields: string[] = [];
  private conditions: string[] = [];
  private orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): QueryBuilder {
    if (fields?.length === 0 || typeof fields === "undefined") {
      this.fields.push("*");
    } else if (fields.length === 1) {
      this.fields.push(fields[0]);
    } else {
      fields.map((item, idx) => {
        if (fields.length - 1 === idx) return this.fields.push(item);
        else return this.fields.push(`${item}, `);
      });
    }
    return this;
  }

  where(condition?: string): QueryBuilder {
    if (!condition) return this;

    if (this.conditions.length > 0) this.conditions.push(` and ${condition}`);
    else this.conditions = [condition];
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): QueryBuilder {
    if (!field) return this;
    if (this.orderFields.length > 0)
      this.orderFields.push(`, ${field} ${direction}`);
    else this.orderFields.push(`${field} ${direction}`);

    return this;
  }

  limit(count?: number): QueryBuilder {
    this.limitCount = count;
    return this;
  }

  execute(): string {
    // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
    return `Select ${this.fields.join("")} from ${
      this.table
    } where ${this.conditions.join("")} order by ${this.orderFields.join("")} ${
      this.limitCount ? `limit ${this.limitCount}` : ""
    }`;
  }
}

function main() {
  const usersQuery: string = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log("%cConsulta:\n", COLORS.red);
  console.log(usersQuery);
}

main();
