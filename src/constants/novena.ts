import { MysteryType } from '../types';

export const TOTAL_DAYS = 54;
export const DAYS_PER_PHASE = 27;
export const DAYS_PER_CYCLE = 3;
export const CYCLES_PER_PHASE = 9;

export const MYSTERY_ROTATION: MysteryType[] = ['Joyful', 'Sorrowful', 'Glorious'];

export const ROSARY_MYSTERIES: Record<MysteryType, readonly string[]> = {
  'Joyful': [
    'The Annunciation',
    'The Visitation', 
    'The Nativity',
    'The Presentation',
    'The Finding in the Temple'
  ],
  'Sorrowful': [
    'The Agony in the Garden',
    'The Scourging at the Pillar',
    'The Crowning with Thorns', 
    'The Carrying of the Cross',
    'The Crucifixion'
  ],
  'Glorious': [
    'The Resurrection',
    'The Ascension',
    'The Descent of the Holy Spirit',
    'The Assumption',
    'The Coronation of Mary'
  ],
  'Luminous': [
    'The Baptism in the Jordan',
    'The Wedding at Cana',
    'The Proclamation of the Kingdom',
    'The Transfiguration',
    'The Institution of the Eucharist'
  ]
};

export const MYSTERY_DESCRIPTIONS: Record<MysteryType, string> = {
  'Joyful': "snow white buds to remind thee of thy joys",
  'Sorrowful': "blood red roses to remind thee of the passion of thy divine Son, with Whom thou didst so fully partake of its bitterness",
  'Glorious': "full-blown white roses, tinged with the red of the passion, to remind thee of thy glories, fruits of the sufferings of thy Son and thee",
  'Luminous': "radiant roses of light to remind thee of the mysteries of Christ's public ministry"
};

export const MYSTERY_REFLECTIONS: Record<MysteryType, readonly string[]> = {
  'Joyful': [
    "The Angel Gabriel announces to Mary that she will be the Mother of God, and Mary responds with perfect faith and obedience.",
    "Mary visits her cousin Elizabeth, who is filled with the Holy Spirit and proclaims Mary blessed among women.",
    "Jesus is born in Bethlehem, the Word made flesh, bringing light and salvation to the world.",
    "Mary and Joseph present the infant Jesus in the Temple, where Simeon prophesies His destiny as the light of the nations.",
    "After three days of searching, Mary and Joseph find twelve-year-old Jesus teaching in the Temple, about His Father's business."
  ],
  'Sorrowful': [
    "Jesus prays in agony in the Garden of Gethsemane, accepting the Father's will to suffer and die for our salvation.",
    "Jesus is brutally scourged at the pillar, His precious blood shed for the forgiveness of our sins.",
    "Jesus is crowned with thorns and mocked as King, accepting humiliation to repair our pride and vanity.",
    "Jesus carries His heavy cross to Calvary, showing us the path of sacrifice and love for others.",
    "Jesus dies on the cross, offering His life as the perfect sacrifice for the redemption of mankind."
  ],
  'Glorious': [
    "Jesus rises from the dead in glory, conquering sin and death, and offering us eternal life.",
    "Jesus ascends into heaven, taking His place at the right hand of the Father as our eternal High Priest.",
    "The Holy Spirit descends upon the Apostles, filling them with courage and wisdom to spread the Gospel.",
    "Mary is assumed body and soul into heaven, crowned as Queen of Heaven and Earth.",
    "Mary is crowned Queen of Heaven and Earth, our loving Mother and powerful intercessor before God."
  ],
  'Luminous': [
    "Jesus is baptized in the Jordan River, and the Father declares Him His beloved Son in whom He is well pleased.",
    "Jesus performs His first miracle at the wedding feast, turning water into wine at Mary's intercession.",
    "Jesus proclaims the Kingdom of God, calling all to repentance and faith in the Gospel.",
    "Jesus is transfigured on Mount Tabor, revealing His divine glory to Peter, James, and John.",
    "Jesus institutes the Holy Eucharist at the Last Supper, giving us His Body and Blood as our spiritual food."
  ]
};

export const DECADE_PRAYERS: Record<MysteryType, readonly string[]> = {
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
  ],
  'Luminous': [
    "I bind these radiant roses with a petition for the virtue of spiritual renewal and humbly lay this bouquet at thy feet.",
    "I bind these radiant roses with a petition for the virtue of trust in divine providence and humbly lay this bouquet at thy feet.",
    "I bind these radiant roses with a petition for the virtue of evangelical zeal and humbly lay this bouquet at thy feet.",
    "I bind these radiant roses with a petition for the virtue of spiritual transformation and humbly lay this bouquet at thy feet.",
    "I bind these radiant roses with a petition for the virtue of eucharistic devotion and humbly lay this bouquet at thy feet."
  ]
};