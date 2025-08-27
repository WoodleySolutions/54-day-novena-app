import { MysteryType } from '../types';

export const TOTAL_DAYS = 54;
export const DAYS_PER_PHASE = 27;
export const DAYS_PER_CYCLE = 3;
export const CYCLES_PER_PHASE = 9;

export const MYSTERY_ROTATION: MysteryType[] = ['Joyful', 'Sorrowful', 'Glorious'];

export const MYSTERY_DESCRIPTIONS = {
  'Joyful': "snow white buds to remind thee of thy joys",
  'Sorrowful': "blood red roses to remind thee of the passion of thy divine Son, with Whom thou didst so fully partake of its bitterness",
  'Glorious': "full-blown white roses, tinged with the red of the passion, to remind thee of thy glories, fruits of the sufferings of thy Son and thee"
} as const;

export const DECADE_PRAYERS = {
  'Joyful': [
    "I bind these snow-white buds with a petition for the virtue of humility and humbly lay this bouquet at thy feet.",
    "I bind these snow-white buds with a petition for the virtue of charity and humbly lay this bouquet at thy feet.",
    "I bind these snow-white buds with a petition for the virtue of detachment from the world and humbly lay this bouquet at thy feet.",
    "I bind these snow-white buds with a petition for the virtue of purity and humbly lay this bouquet at thy feet.",
    "I bind these snow-white buds with a petition for the virtue of obedience to the will of God and humbly lay this bouquet at thy feet."
  ],
  'Sorrowful': [
    "I bind these blood red roses with a petition for the virtue of resignation to the will of God and humbly lay this bouquet at thy feet.",
    "I bind these blood red roses with a petition for the virtue of mortification and humbly lay this bouquet at thy feet.",
    "I bind these blood red roses with a petition for the virtue of humility and humbly lay this bouquet at thy feet.",
    "I bind these blood red roses with a petition for the virtue of patience in adversity and humbly lay this bouquet at thy feet.",
    "I bind these blood red roses with a petition for the virtue of love of our enemies and humbly lay this bouquet at thy feet."
  ],
  'Glorious': [
    "I bind these full-blown roses with a petition for the virtue of faith and humbly lay this bouquet at thy feet.",
    "I bind these full-blown roses with a petition for the virtue of hope and humbly lay this bouquet at thy feet.",
    "I bind these full-blown roses with a petition for the virtue of charity and humbly lay this bouquet at thy feet.",
    "I bind these full-blown roses with a petition for the virtue of union with Christ and humbly lay this bouquet at thy feet.",
    "I bind these full-blown roses with a petition for the virtue of union with thee and humbly lay this bouquet at thy feet."
  ]
} as const;