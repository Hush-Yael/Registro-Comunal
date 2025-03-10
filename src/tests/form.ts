import { fakerES as faker } from "@faker-js/faker";
import { EDOS_CIVIL, NIVELES_ESTUDIOS, TIPOS_NEGOCIOS } from "../constants";

const R = <T>(length: number, map: () => T) => Array.from({ length }, map),
  MAX_CEDULA = 40_000_000;

const inArray = faker.helpers.arrayElement,
  RSex = () => inArray(["M", "F"]),
  orEmpty = <T>(item: T) => inArray(["", item]);

const born = () => orEmpty(faker.date.birthdate().toISOString().split("T")[0]),
  death = () =>
    orEmpty(faker.date.recent({ days: 720 }).toISOString().split("T")[0]),
  FakePath = () => faker.number.int({ min: 1, max: 10 }).toString(),
  FakeDir = () => inArray([FakePath(), `${FakePath()}-${FakePath()}`]),
  casaNum = () => faker.number.int({ min: 1, max: 100 }).toString();

export const RandomJefe = () => ({
  cedula: faker.number.int(MAX_CEDULA),
  nombres: faker.person.firstName(),
  apellidos: faker.person.lastName(),
  fechaNacimiento: born(),
  venezolano: faker.number.int({ min: 0, max: 1 }),
  fallecido: faker.number.int({ min: 0, max: 1 }),
  fechaDeceso: death(),
  sexo: RSex(),
  tel: orEmpty(faker.phone.number()),
  email: orEmpty(faker.internet.email()),
  edoCivil: orEmpty(inArray(EDOS_CIVIL)),
  nivelEstudios: orEmpty(inArray(NIVELES_ESTUDIOS)),
});

export const RandomFamily = (l: number) =>
  R(l, () => ({
    cedula: faker.number.int(MAX_CEDULA),
    nombres: faker.person.firstName(),
    apellidos: faker.person.lastName(),
    sexo: RSex(),
    fechaNacimiento: born(),
    venezolano: faker.number.int({ min: 0, max: 1 }),
    fallecido: faker.number.int({ min: 0, max: 1 }),
    fechaDeceso: death(),
  }));

export const RandomHomes = (l: number) =>
  R(l, () => ({
    avenida: orEmpty(FakeDir()),
    calle: orEmpty(FakeDir()),
    numCasa: orEmpty(inArray([casaNum(), `${casaNum()}-${casaNum()}`])),
    referencia: orEmpty(inArray(["", faker.lorem.sentence()])),
    id: crypto.randomUUID(),
  }));

export const RandomBusinesses = (l: number) =>
  R(l, () => ({
    RIF: orEmpty(faker.number.int(MAX_CEDULA)),
    avenida: orEmpty(FakeDir()),
    calle: orEmpty(FakeDir()),
    nombre: faker.company.name(),
    tipo: orEmpty(inArray(TIPOS_NEGOCIOS)),
  }));
