export interface PrayerInfo {
  title: string;
  origin: string;
  meaning: string;
  context: string[];
  spiritualBenefits: string[];
  historicalBackground?: string;
}

export const NOVENA_INFO: PrayerInfo = {
  title: "54-Day Novena to Our Lady of the Rosary",
  origin: "This powerful devotion was revealed by Our Lady herself to Fortuna Agrelli in Naples, Italy, in 1884.",
  meaning: "The 54-Day Novena consists of saying the Rosary for 54 consecutive days: 27 days in petition (asking for a favor) followed by 27 days in thanksgiving (whether the petition is granted or not).",
  context: [
    "Our Lady promised: 'Whoever desires to obtain favors from me should make three novenas of the prayers of the Rosary in petition, and three novenas in thanksgiving.'",
    "The number 54 represents perfect spiritual completeness - 27 days of petition followed by 27 days of thanksgiving.",
    "This devotion emphasizes both asking with faith and giving thanks with trust in God's will."
  ],
  spiritualBenefits: [
    "Develops complete trust in Our Lady's intercession",
    "Teaches the importance of thanksgiving in prayer",
    "Creates a sustained period of deep spiritual communion",
    "Strengthens perseverance in prayer and devotion",
    "Often results in remarkable spiritual and temporal graces"
  ],
  historicalBackground: "The devotion gained papal approval and has been practiced by countless Catholics worldwide, with numerous documented miracles and spiritual conversions attributed to its faithful practice."
};

export const ROSARY_INFO: PrayerInfo = {
  title: "The Holy Rosary",
  origin: "The Rosary developed gradually through Church history, with its current form taking shape in the 15th century through the work of Blessed Alan de la Roche and Dominican preaching.",
  meaning: "The Rosary is a biblical prayer that combines vocal prayer with meditation on the mysteries of Christ's life, death, and resurrection, prayed with the intercession of the Blessed Virgin Mary.",
  context: [
    "The word 'Rosary' comes from Latin 'rosarium,' meaning 'crown of roses' - each Hail Mary being a spiritual rose offered to Our Lady.",
    "The Rosary consists of four sets of mysteries: Joyful, Sorrowful, Glorious, and Luminous (added by Pope John Paul II in 2002).",
    "Each mystery invites us to contemplate events in the lives of Jesus and Mary, making it a profoundly Christocentric prayer."
  ],
  spiritualBenefits: [
    "Deepens meditation on the life of Christ",
    "Strengthens devotion to the Blessed Virgin Mary",
    "Provides peace and spiritual consolation",
    "Develops the habit of contemplative prayer",
    "Offers protection against spiritual dangers",
    "Brings countless graces and blessings"
  ],
  historicalBackground: "Pope Leo XIII called the Rosary 'the most excellent form of prayer and the most efficacious means of attaining eternal life.' It has been prayed by saints, popes, and millions of faithful throughout history."
};

export const CHAPLET_INFO: PrayerInfo = {
  title: "Traditional Catholic Chaplets",
  origin: "Chaplets are shorter devotional prayers that developed throughout Church history, each focusing on specific aspects of Catholic spirituality and devotion to particular saints or mysteries.",
  meaning: "A chaplet (from the French 'chapelet,' meaning 'little crown') is a form of Christian prayer using prayer beads, typically shorter than the full Rosary, with prayers directed to Jesus, Mary, or the saints.",
  context: [
    "Chaplets often use rosary beads but with different prayers and meditations than the traditional Rosary.",
    "Each chaplet has its own specific spiritual purpose and devotional focus.",
    "They provide focused prayer experiences that can fit into busy schedules while maintaining spiritual depth.",
    "Many chaplets have received ecclesiastical approval and carry special indulgences."
  ],
  spiritualBenefits: [
    "Offers variety in Catholic devotional prayer",
    "Provides focused meditation on specific spiritual themes",
    "Develops particular devotions to Jesus, Mary, and the saints",
    "Accommodates different prayer time constraints",
    "Enriches personal spiritual life with diverse prayer forms"
  ],
  historicalBackground: "The four chaplets in this app - Divine Mercy, St. Michael, Sacred Heart, and Seven Sorrows - each have rich spiritual traditions and have been prayed by countless faithful seeking specific graces and spiritual growth."
};