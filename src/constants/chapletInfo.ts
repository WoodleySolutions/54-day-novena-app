import { ChapletType } from '../types';
import { PrayerInfo } from './prayerInfo';

export const INDIVIDUAL_CHAPLET_INFO: Record<ChapletType, PrayerInfo> = {
  'divine-mercy': {
    title: "Divine Mercy Chaplet",
    origin: "Jesus dictated this chaplet to St. Faustina Kowalska in 1935, promising: 'Whoever will recite it will receive great mercy at the hour of death.'",
    meaning: "This chaplet focuses on God's infinite mercy and love, asking for mercy upon us and the whole world. It uses the same beads as the Rosary but with different prayers.",
    context: [
      "Jesus promised great graces to those who pray this chaplet, especially at 3:00 PM (the Hour of Mercy).",
      "The chaplet is prayed on regular rosary beads, making it accessible to all Catholics.",
      "Each decade represents the eternal offering of Jesus to the Father for the salvation of souls.",
      "The closing prayer 'Holy God, Holy Mighty One, Holy Immortal One' is repeated three times."
    ],
    spiritualBenefits: [
      "Receives great mercy at the hour of death",
      "Obtains mercy for oneself and others",
      "Deepens trust in God's infinite mercy",
      "Provides spiritual comfort in times of suffering",
      "Strengthens faith in Jesus' passion and death",
      "Brings peace to troubled hearts"
    ],
    historicalBackground: "St. Faustina received this prayer through mystical experiences with Jesus, who emphasized the importance of trusting in His mercy. The devotion was approved by the Church and has spread worldwide, especially after Pope John Paul II's strong devotion to Divine Mercy."
  },

  'st-michael': {
    title: "Chaplet of St. Michael the Archangel",
    origin: "This chaplet was revealed by St. Michael to the Portuguese Carmelite Antónia d'Astónaco in 1751, honoring the nine choirs of angels.",
    meaning: "Each section honors one of the nine choirs of angels, asking for their intercession and St. Michael's protection against evil. It consists of nine salutations followed by the St. Michael prayer.",
    context: [
      "The chaplet honors the nine angelic choirs: Seraphim, Cherubim, Thrones, Dominions, Powers, Virtues, Principalities, Archangels, and Angels.",
      "Each salutation asks for specific graces related to that choir's spiritual mission.",
      "St. Michael promised special protection to those who honor him through this devotion.",
      "The prayer combines angelic intercession with protection against spiritual warfare."
    ],
    spiritualBenefits: [
      "Protection against evil and temptation",
      "Intercession of the nine choirs of angels",
      "Spiritual strength in times of trial",
      "Defense against the attacks of the devil",
      "Growth in the virtues associated with each angelic choir",
      "Preparation for a holy death with angelic assistance"
    ],
    historicalBackground: "The devotion received ecclesiastical approval and has been prayed by Catholics seeking St. Michael's powerful protection. Pope Leo XIII added the St. Michael prayer to the end of Mass, emphasizing the Archangel's role as defender of the Church."
  },

  'sacred-heart': {
    title: "Chaplet of the Sacred Heart of Jesus",
    origin: "This devotion developed from the revelations of the Sacred Heart to St. Margaret Mary Alacoque in the 17th century, focusing on Jesus' burning love for humanity.",
    meaning: "The chaplet expresses acts of love and reparation to the Sacred Heart of Jesus, acknowledging His infinite love and making reparation for sins that wound His heart.",
    context: [
      "The Sacred Heart devotion emphasizes Jesus' human and divine love for all people.",
      "Each prayer is an act of love responding to Jesus' love for us.",
      "The chaplet can be prayed for specific intentions, trusting in the Sacred Heart's mercy.",
      "The devotion includes promises of grace for those who honor the Sacred Heart."
    ],
    spiritualBenefits: [
      "Grows in love and devotion to Jesus",
      "Makes reparation for sins against the Sacred Heart",
      "Obtains graces for personal intentions",
      "Deepens understanding of God's love",
      "Strengthens the heart against selfishness",
      "Brings peace and consolation to troubled souls"
    ],
    historicalBackground: "The Sacred Heart devotion became one of the most popular Catholic devotions, especially after St. Margaret Mary's visions. The chaplet provides a structured way to honor Jesus' heart and respond to His love with our own acts of love and reparation."
  },

  'seven-sorrows': {
    title: "Chaplet of the Seven Sorrows of Mary",
    origin: "This ancient devotion dates back to the Middle Ages, focusing on the seven principal sorrows that pierced the Immaculate Heart of Mary during her earthly life.",
    meaning: "The chaplet meditates on Mary's seven sorrows, offering comfort to Our Lady and asking for her intercession. Each sorrow represents a moment of deep pain in Mary's journey with Jesus.",
    context: [
      "The seven sorrows are: Simeon's prophecy, the flight into Egypt, losing Jesus in the temple, meeting Jesus on the way to Calvary, the crucifixion, taking Jesus down from the cross, and the burial of Jesus.",
      "Mary promised special graces to those who meditate on her sorrows with compassion.",
      "The devotion helps us understand Mary's role in salvation and her maternal care for all souls.",
      "Each sorrow teaches us about suffering united with Christ's passion."
    ],
    spiritualBenefits: [
      "Grows in compassion for Mary's sufferings",
      "Learns to unite personal sufferings with Christ's passion",
      "Receives Mary's maternal intercession and protection",
      "Develops the virtues Mary showed during her sorrows",
      "Obtains the grace of a happy death",
      "Strengthens devotion to the Blessed Virgin Mary"
    ],
    historicalBackground: "The Servite Order particularly promoted this devotion, and many saints had great devotion to Mary's sorrows. The Church has approved this chaplet and attached indulgences to its devout recitation, recognizing its spiritual value for the faithful."
  }
};