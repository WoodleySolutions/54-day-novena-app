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
  },

  'precious-blood': {
    title: "Chaplet of the Precious Blood",
    origin: "This devotion honors the saving Blood of Jesus Christ shed for our redemption. It developed from various revelations and has been promoted by many saints throughout Church history.",
    meaning: "The chaplet adores the Precious Blood of Jesus in four mysteries corresponding to the main times His Blood was shed: Circumcision, Agony in the Garden, Scourging, and Crowning with Thorns.",
    context: [
      "The four mysteries represent the complete offering of Jesus' Blood for humanity's salvation.",
      "Each mystery is accompanied by seven adorations and one Our Father.",
      "The devotion emphasizes the infinite value of Christ's Blood in washing away sin.",
      "Praying this chaplet unites us with Jesus' redemptive sacrifice on Calvary."
    ],
    spiritualBenefits: [
      "Deepens appreciation for Christ's sacrifice",
      "Obtains graces through the power of Jesus' Blood",
      "Provides spiritual cleansing and purification",
      "Strengthens faith in redemption through Christ",
      "Brings healing and protection through the Precious Blood",
      "Increases devotion to Jesus' passion and death"
    ],
    historicalBackground: "The devotion to the Precious Blood has ancient roots in the Church, with St. Gaspar del Bufalo being a notable promoter in the 19th century. The chaplet provides a structured way to honor the Blood of Christ that cleanses us from all sin."
  },

  'holy-face': {
    title: "Chaplet of the Holy Face of Jesus",
    origin: "This devotion was revealed to Sister Marie of St. Peter, a Carmelite nun, in the 19th century as a means of making reparation for blasphemies against God's holy Name.",
    meaning: "The chaplet makes reparation to the Holy Face of Jesus, disfigured by sin and blasphemy, by praising God's holy Name 33 times and invoking the Precious Blood.",
    context: [
      "The devotion specifically addresses reparation for blasphemies against God's Name.",
      "The 33 repetitions correspond to the 33 years of Our Lord's earthly life.",
      "Each prayer praises God's Name in all three realms: Heaven, earth, and under the earth.",
      "The devotion includes kissing a crucifix and invoking the Precious Blood after each prayer."
    ],
    spiritualBenefits: [
      "Makes reparation for sins against God's holy Name",
      "Obtains graces through devotion to Jesus' Holy Face",
      "Provides spiritual protection from blasphemy and irreverence",
      "Deepens reverence for God's sacred Name",
      "Brings comfort to the disfigured Face of Jesus",
      "Strengthens faith in times of spiritual darkness"
    ],
    historicalBackground: "Pope Leo XIII approved this devotion and granted indulgences to its practice. The Holy Face devotion spread widely, especially in France, and has been promoted by various saints and mystics throughout Church history."
  },

  'immaculate-heart': {
    title: "Chaplet of the Immaculate Heart of Mary",
    origin: "This devotion developed from the apparitions at Fatima in 1917, where Mary requested devotion to her Immaculate Heart alongside the Sacred Heart of Jesus.",
    meaning: "The chaplet unites our hearts with Mary's pure and sinless Heart, seeking her maternal intercession and striving to imitate her virtues through meditation on five key mysteries of her life.",
    context: [
      "The five decades correspond to five key moments in Mary's life showing her Immaculate Heart.",
      "Each mystery reveals an aspect of Mary's perfect response to God's will.",
      "The devotion seeks to make reparation to Mary's Heart for sins against her purity.",
      "Mary's Heart is seen as the perfect model for Christian living and devotion."
    ],
    spiritualBenefits: [
      "Grows in devotion to the Blessed Virgin Mary",
      "Obtains Mary's maternal intercession and protection",
      "Develops purity of heart and intention",
      "Learns to say 'yes' to God's will like Mary",
      "Receives graces for spiritual growth and holiness",
      "Strengthens the bond between the Sacred and Immaculate Hearts"
    ],
    historicalBackground: "The devotion to Mary's Immaculate Heart gained special prominence after Fatima, where Mary promised that her Immaculate Heart would triumph. Pope Pius XII consecrated the world to Mary's Immaculate Heart in 1942."
  },

  'st-joseph': {
    title: "Chaplet of St. Joseph",
    origin: "This devotion honors St. Joseph as the foster father of Jesus and spouse of Mary, seeking his powerful intercession for workers, families, and the universal Church.",
    meaning: "The chaplet invokes St. Joseph under various titles, recognizing his unique role in salvation history and his continued patronage over the Church and Christian families.",
    context: [
      "The chaplet honors St. Joseph's threefold role: spouse of Mary, foster father of Jesus, and patron of the Church.",
      "Each group of prayers focuses on a different aspect of St. Joseph's holiness and intercession.",
      "The devotion seeks St. Joseph's help for both spiritual and temporal needs.",
      "St. Joseph is invoked as a 'worker of miracles' and 'model of workers.'"
    ],
    spiritualBenefits: [
      "Obtains St. Joseph's powerful intercession",
      "Receives protection for families and workers",
      "Develops devotion to the Holy Family",
      "Learns humility and obedience from St. Joseph's example",
      "Obtains graces for spiritual and temporal needs",
      "Strengthens trust in divine providence"
    ],
    historicalBackground: "Pope Pius IX declared St. Joseph patron of the universal Church in 1870. The devotion to St. Joseph has grown significantly, with many saints promoting devotion to this powerful intercessor and protector of the faithful."
  },

  'five-wounds': {
    title: "Chaplet of the Five Wounds",
    origin: "This ancient devotion meditates on the five sacred wounds of Our Lord: the piercing of His hands, feet, and side during the crucifixion.",
    meaning: "The chaplet honors each of Christ's five wounds individually, recognizing them as fountains of grace and mercy for the salvation of souls.",
    context: [
      "Each wound is honored with a specific prayer of adoration and thanksgiving.",
      "The devotion emphasizes the wounds as sources of supernatural grace and healing.",
      "The chaplet includes meditation on how each wound was inflicted out of love for humanity.",
      "The Sacred Side is given special honor as the source of the sacraments (blood and water)."
    ],
    spiritualBenefits: [
      "Deepens devotion to Christ's passion and death",
      "Obtains graces through the merits of Jesus' wounds",
      "Provides spiritual healing and comfort",
      "Strengthens faith in Christ's redemptive sacrifice",
      "Develops gratitude for the price of salvation",
      "Brings peace and consolation in times of suffering"
    ],
    historicalBackground: "Devotion to the Five Wounds has been practiced since the early centuries of Christianity. Many saints, including St. Francis of Assisi (who received the stigmata), have had special devotion to Christ's sacred wounds."
  },

  'st-bridget': {
    title: "Chaplet of St. Bridget of Sweden",
    origin: "This devotion consists of prayers revealed to St. Bridget of Sweden (1303-1373), honoring the Seven Last Words of Jesus and the sorrows and joys of Mary.",
    meaning: "The chaplet combines meditation on Christ's final words from the cross with prayers for Mary's intercession, seeking the grace of true contrition for sin.",
    context: [
      "Seven Our Fathers honor the Seven Last Words of Jesus on the cross.",
      "Seven Hail Marys remember the Seven Sorrows and Seven Joys of Mary.",
      "The devotion concludes with prayers for the Pope and the Church.",
      "St. Bridget received promises of great graces for those who pray these prayers faithfully."
    ],
    spiritualBenefits: [
      "Obtains true sorrow and contrition for sins",
      "Receives the intercession of St. Bridget",
      "Deepens meditation on Christ's passion",
      "Grows in devotion to Mary's sorrows and joys",
      "Obtains graces for a holy death",
      "Strengthens union with the suffering Christ"
    ],
    historicalBackground: "St. Bridget of Sweden was a mystic and foundress who received numerous revelations from Our Lord and Our Lady. She founded the Bridgettine Order and was canonized in 1391. Her prayers have been approved by the Church with attached indulgences."
  }
};