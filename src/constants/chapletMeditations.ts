import { ChapletType } from '../types';

// Seven Sorrows Meditations
export const SEVEN_SORROWS_MEDITATIONS = [
  {
    title: "The Prophecy of Simeon",
    reflection: "At Jesus' presentation in the temple, the holy prophet Simeon tells Mary: 'Your own soul a sword shall pierce.' Mary accepts this prophecy with faith, knowing that her heart will be united with her Son's passion for the salvation of souls."
  },
  {
    title: "The Flight into Egypt", 
    reflection: "Warned by an angel, the Holy Family must flee to Egypt to escape Herod's murderous plan. Mary endures the hardships of exile, trusting completely in God's providence while protecting the Christ Child from those who would harm Him."
  },
  {
    title: "The Loss of the Child Jesus",
    reflection: "After three days of searching, Mary and Joseph find Jesus in the temple. Mary's maternal heart experiences the agony of separation from her beloved Son, yet she treasures His words about being in His Father's house."
  },
  {
    title: "Mary Meets Jesus on the Way to Calvary",
    reflection: "On the sorrowful way to Calvary, Mary encounters her Son carrying the cross. Their eyes meet in a moment of profound love and shared suffering, as she witnesses His sacred humanity bearing the weight of all sin."
  },
  {
    title: "Jesus Dies on the Cross",
    reflection: "Standing beneath the cross with unshakeable faith, Mary watches her Son give His life for the redemption of the world. Her heart is pierced as prophesied, yet she remains the perfect model of surrender to God's will."
  },
  {
    title: "Jesus is Taken Down from the Cross", 
    reflection: "Mary receives the lifeless body of her Son into her arms. Like a new Pietà, she cradles the One who gave His life for love, her maternal heart breaking yet filled with the hope of resurrection."
  },
  {
    title: "The Burial of Jesus",
    reflection: "As Jesus is laid in the tomb, Mary experiences the depths of sorrow yet maintains perfect faith in God's promises. She becomes the Mother of the Church, caring for all souls as she cared for Jesus."
  }
];

// Divine Mercy Decade Meditations
export const DIVINE_MERCY_MEDITATIONS = [
  {
    decade: 1,
    meditation: "Meditate on the Agony in the Garden - Jesus' humanity shrinks from suffering, yet He submits to the Father's will for our salvation."
  },
  {
    decade: 2, 
    meditation: "Meditate on the Scourging at the Pillar - Jesus endures brutal punishment for our sins, His precious Blood flowing for our redemption."
  },
  {
    decade: 3,
    meditation: "Meditate on the Crowning with Thorns - The King of Kings accepts mockery and pain, teaching us humility and patience in suffering."
  },
  {
    decade: 4,
    meditation: "Meditate on the Carrying of the Cross - Jesus embraces the Cross, showing us how to unite our sufferings with His for souls."
  },
  {
    decade: 5,
    meditation: "Meditate on the Crucifixion and Death - From the Cross flows infinite mercy, as Jesus gives His life so that we might live forever."
  }
];

// St. Michael Chaplet Angelic Choir Meditations
export const ST_MICHAEL_MEDITATIONS = [
  {
    choir: "Seraphim",
    meditation: "These highest angels burn with perfect love of God. Ask St. Michael and the Seraphim to kindle in your heart the fire of divine charity."
  },
  {
    choir: "Cherubim", 
    meditation: "The Cherubim excel in knowledge and wisdom. Through St. Michael's intercession, pray to be freed from sin and grow in Christian perfection."
  },
  {
    choir: "Thrones",
    meditation: "The Thrones reflect God's justice and humility. Ask St. Michael and these angels to help you develop true and sincere humility."
  },
  {
    choir: "Dominions",
    meditation: "The Dominions govern the lower choirs with divine authority. Pray for grace to govern your senses and overcome unruly passions."
  },
  {
    choir: "Powers",
    meditation: "The Powers defend against evil and maintain order. Seek St. Michael's protection of your soul against the snares of the devil."
  },
  {
    choir: "Virtues", 
    meditation: "The Virtues work miracles and bestow grace. Ask to be preserved from evil and delivered from temptation through their intercession."
  },
  {
    choir: "Principalities",
    meditation: "The Principalities guide earthly rulers and nations. Pray that God may fill your soul with a true spirit of obedience to His will."
  },
  {
    choir: "Archangels",
    meditation: "The Archangels are God's special messengers. Ask for perseverance in faith and good works to attain the glory of Heaven."
  },
  {
    choir: "Angels",
    meditation: "Our guardian angels protect and guide us daily. Pray to be protected in this life and conducted safely to eternal life."
  }
];

// Sacred Heart Meditation Themes  
export const SACRED_HEART_MEDITATIONS = [
  {
    theme: "Jesus' Burning Love",
    meditation: "Contemplate the infinite love of Jesus' Sacred Heart, burning with desire for your salvation and sanctification."
  },
  {
    theme: "His Mercy and Compassion", 
    meditation: "Meditate on how Jesus' Heart overflows with mercy for sinners, always ready to forgive and heal wounded souls."
  },
  {
    theme: "His Patience with Our Weakness",
    meditation: "Reflect on the patient love of Jesus, who bears with our failings and continually calls us back to His Heart."
  }
];

// Chaplet meditation mappings
export const CHAPLET_MEDITATIONS: Record<ChapletType, any> = {
  'seven-sorrows': SEVEN_SORROWS_MEDITATIONS,
  'divine-mercy': DIVINE_MERCY_MEDITATIONS, 
  'st-michael': ST_MICHAEL_MEDITATIONS,
  'sacred-heart': SACRED_HEART_MEDITATIONS
};