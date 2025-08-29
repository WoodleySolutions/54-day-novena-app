// Common Catholic prayers with full text

export const COMMON_PRAYERS = {
  'Apostles\' Creed': `I believe in God, the Father almighty,
Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
he descended into hell;
on the third day he rose again from the dead;
he ascended into heaven,
and is seated at the right hand of God the Father almighty;
from there he will come to judge the living and the dead.

I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting. Amen.`,

  'Our Father': `Our Father, who art in heaven,
hallowed be thy name;
thy kingdom come;
thy will be done on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil. Amen.`,

  'Hail Mary': `Hail Mary, full of grace,
the Lord is with thee;
blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death. Amen.`,

  'Glory Be': `Glory be to the Father,
and to the Son,
and to the Holy Spirit;
as it was in the beginning,
is now, and ever shall be,
world without end. Amen.`,

  'Fatima Prayer': `O my Jesus, forgive us our sins,
save us from the fires of hell,
lead all souls to Heaven,
especially those most in need of Thy mercy.`,

  'Hail Holy Queen': `Hail, Holy Queen, Mother of Mercy,
our life, our sweetness and our hope.
To thee do we cry, poor banished children of Eve.
To thee do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious advocate,
thine eyes of mercy toward us,
and after this our exile,
show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary.
Pray for us, O holy Mother of God,
that we may be made worthy of the promises of Christ.`,

  'Rosary Prayer': `O God, whose only-begotten Son,
by His life, death and resurrection,
has purchased for us the rewards of eternal life:
grant we beseech Thee,
that meditating upon these mysteries
of the Most Holy Rosary of the Blessed Virgin Mary,
we may imitate what they contain,
and obtain what they promise,
through the same Christ our Lord. Amen.`
};

// Helper function to get prayer text by name
export const getPrayerText = (prayerName: string): string => {
  // Handle variations in prayer names
  const normalizedName = prayerName
    .replace(/^\d+\s*/, '') // Remove leading numbers
    .replace(/\s*\([^)]*\)/, '') // Remove parenthetical content
    .trim();
  
  // Direct match first
  if (COMMON_PRAYERS[normalizedName as keyof typeof COMMON_PRAYERS]) {
    return COMMON_PRAYERS[normalizedName as keyof typeof COMMON_PRAYERS];
  }
  
  // Fuzzy matching for common variations
  if (normalizedName.toLowerCase().includes('hail mary')) {
    return COMMON_PRAYERS['Hail Mary'];
  }
  if (normalizedName.toLowerCase().includes('our father')) {
    return COMMON_PRAYERS['Our Father'];
  }
  if (normalizedName.toLowerCase().includes('glory')) {
    return COMMON_PRAYERS['Glory Be'];
  }
  if (normalizedName.toLowerCase().includes('fatima')) {
    return COMMON_PRAYERS['Fatima Prayer'];
  }
  if (normalizedName.toLowerCase().includes('apostles') || normalizedName.toLowerCase().includes('creed')) {
    return COMMON_PRAYERS['Apostles\' Creed'];
  }
  if (normalizedName.toLowerCase().includes('hail holy queen')) {
    return COMMON_PRAYERS['Hail Holy Queen'];
  }
  if (normalizedName.toLowerCase().includes('rosary prayer')) {
    return COMMON_PRAYERS['Rosary Prayer'];
  }
  
  return ''; // Return empty if prayer not found
};