import { ChapletType, ChapletInfo, ChapletStep } from '../types';

export const CHAPLET_INFO: Record<ChapletType, ChapletInfo> = {
  'seven-sorrows': {
    name: 'Seven Sorrows of Mary',
    description: 'Meditate on the seven sorrows that pierced the Immaculate Heart of Mary',
    color: 'purple',
    icon: '💙',
    beadCount: 52,
    estimatedDuration: 20
  },
  'divine-mercy': {
    name: 'Divine Mercy Chaplet',
    description: 'Trust in Jesus\' infinite mercy for yourself and the whole world',
    color: 'red',
    icon: '✝️',
    beadCount: 59,
    estimatedDuration: 15
  },
  'st-michael': {
    name: 'Chaplet of St. Michael',
    description: 'Honor the nine choirs of angels with St. Michael\'s protection',
    color: 'blue',
    icon: '⚔️',
    beadCount: 39,
    estimatedDuration: 25
  },
  'sacred-heart': {
    name: 'Chaplet of the Sacred Heart',
    description: 'Make acts of love and reparation to the Sacred Heart of Jesus',
    color: 'gold',
    icon: '❤️',
    beadCount: 33,
    estimatedDuration: 18
  },
  'precious-blood': {
    name: 'Chaplet of the Precious Blood',
    description: 'Honor the saving Blood of Jesus shed for our redemption',
    color: 'red',
    icon: '🩸',
    beadCount: 33,
    estimatedDuration: 20
  },
  'holy-face': {
    name: 'Chaplet of the Holy Face',
    description: 'Make reparation to the Holy Face of Jesus for blasphemies',
    color: 'white',
    icon: '😇',
    beadCount: 33,
    estimatedDuration: 15
  },
  'immaculate-heart': {
    name: 'Immaculate Heart of Mary',
    description: 'Unite your heart with Mary\'s pure and loving Heart',
    color: 'blue',
    icon: '💝',
    beadCount: 54,
    estimatedDuration: 25
  },
  'st-joseph': {
    name: 'Chaplet of St. Joseph',
    description: 'Seek the intercession of the foster father of Jesus',
    color: 'brown',
    icon: '🔨',
    beadCount: 30,
    estimatedDuration: 15
  },
  'five-wounds': {
    name: 'Chaplet of the Five Wounds',
    description: 'Meditate on the sacred wounds of our crucified Lord',
    color: 'purple',
    icon: '✋',
    beadCount: 33,
    estimatedDuration: 22
  },
  'st-bridget': {
    name: 'Chaplet of St. Bridget',
    description: 'Honor the 15 prayers revealed to St. Bridget of Sweden',
    color: 'gold',
    icon: '👑',
    beadCount: 63,
    estimatedDuration: 30
  }
};

export const CHAPLET_PRAYERS: Record<ChapletType, ChapletStep[]> = {
  'seven-sorrows': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Act of Contrition:',
        'O my Jesus, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, Who are all-good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen.'
      ],
      type: 'prayer'
    },
    {
      id: 'first-sorrow',
      title: 'First Sorrow - The Prophecy of Simeon',
      content: [
        'Meditate: At Jesus\' presentation in the temple, the holy prophet Simeon tells Mary: "Your own soul a sword shall pierce." Mary accepts this prophecy with faith, knowing that her heart will be united with her Son\'s passion for the salvation of souls.',
        '',
        'I grieve for you, O Mary most sorrowful, in the affliction of your tender heart at the prophecy of the holy Simeon.',
        'Dear Mother, by your heart so afflicted, obtain for me the virtue of humility and the gift of the holy fear of God.',
        '',
        'Pray seven Hail Marys while meditating on this sorrow.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'second-sorrow',
      title: 'Second Sorrow - The Flight into Egypt',
      content: [
        'Meditate: Warned by an angel, the Holy Family must flee to Egypt to escape Herod\'s murderous plan. Mary endures the hardships of exile, trusting completely in God\'s providence while protecting the Christ Child from those who would harm Him.',
        '',
        'I grieve for you, O Mary most sorrowful, in the anguish of your most affectionate heart during the flight into Egypt and your exile there.',
        'Dear Mother, by your heart so troubled, obtain for me the virtue of generosity, especially toward the poor, and the gift of piety.',
        '',
        'Pray seven Hail Marys while meditating on this sorrow.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'third-sorrow',
      title: 'Third Sorrow - The Loss of the Child Jesus',
      content: [
        'Meditate: After three days of searching, Mary and Joseph find Jesus in the temple. Mary\'s maternal heart experiences the agony of separation from her beloved Son, yet she treasures His words about being in His Father\'s house.',
        '',
        'I grieve for you, O Mary most sorrowful, in those anxieties which tried your troubled heart at the loss of your dear Jesus.',
        'Dear Mother, by your heart so full of anguish, obtain for me the virtue of chastity and the gift of knowledge.',
        '',
        'Pray seven Hail Marys while meditating on this sorrow.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'fourth-sorrow',
      title: 'Fourth Sorrow - Mary Meets Jesus on the Way to Calvary',
      content: [
        'Meditate: On the sorrowful way to Calvary, Mary encounters her Son carrying the cross. Their eyes meet in a moment of profound love and shared suffering, as she witnesses His sacred humanity bearing the weight of all sin.',
        '',
        'I grieve for you, O Mary most sorrowful, in the meeting on the way of the Cross, when you met your dear Son, bearing the Cross.',
        'Dear Mother, by your heart so troubled, obtain for me the virtue of patience and the gift of fortitude.',
        '',
        'Pray seven Hail Marys while meditating on this sorrow.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'fifth-sorrow',
      title: 'Fifth Sorrow - Jesus Dies on the Cross',
      content: [
        'Meditate: Standing beneath the cross with unshakeable faith, Mary watches her Son give His life for the redemption of the world. Her heart is pierced as prophesied, yet she remains the perfect model of surrender to God\'s will.',
        '',
        'I grieve for you, O Mary most sorrowful, in the martyrdom which your heart endured in dying with your dying Son.',
        'Dear Mother, by your afflicted heart, obtain for me the virtue of temperance and the gift of counsel.',
        '',
        'Pray seven Hail Marys while meditating on this sorrow.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'sixth-sorrow',
      title: 'Sixth Sorrow - Jesus is Taken Down from the Cross',
      content: [
        'Meditate: Mary receives the lifeless body of her Son into her arms. Like a new Pietà, she cradles the One who gave His life for love, her maternal heart breaking yet filled with the hope of resurrection.',
        '',
        'I grieve for you, O Mary most sorrowful, in the wounding of your compassionate heart, when the side of your Son was struck by the lance.',
        'Dear Mother, by your heart thus transfixed, obtain for me the virtue of fraternal charity and the gift of understanding.',
        '',
        'Pray seven Hail Marys while meditating on this sorrow.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'seventh-sorrow',
      title: 'Seventh Sorrow - The Burial of Jesus',
      content: [
        'Meditate: As Jesus is laid in the tomb, Mary experiences the depths of sorrow yet maintains perfect faith in God\'s promises. She becomes the Mother of the Church, caring for all souls as she cared for Jesus.',
        '',
        'I grieve for you, O Mary most sorrowful, for the pangs that wrenched your most loving heart at the burial of your Son.',
        'Dear Mother, by your heart sunk in the bitterness of desolation, obtain for me the virtue of diligence and the gift of wisdom.',
        '',
        'Pray seven Hail Marys while meditating on this sorrow.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'closing-prayer',
      title: 'Closing Prayer',
      content: [
        'Let us pray: Let intercession be made for us, we beseech Thee, O Lord Jesus Christ, now and at the hour of our death, before the throne of Thy mercy, by the Virgin Mary Thy Mother, whose most holy soul was pierced by a sword of sorrow in the hour of Thy bitter Passion. Through Thee, Jesus Christ, Savior of the world, Who with the Father and the Holy Spirit lives and reigns world without end. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'divine-mercy': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Optional Opening Prayer:',
        'You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty Yourself out upon us.'
      ],
      type: 'prayer'
    },
    {
      id: 'our-father-hail-mary-creed',
      title: 'Opening Prayers',
      content: [
        'On the large bead before the first decade, pray:',
        'Our Father, Hail Mary, and the Apostles\' Creed'
      ],
      type: 'instruction'
    },
    {
      id: 'first-decade',
      title: 'First Decade - The Agony in the Garden',
      content: [
        'Meditate: Jesus\' humanity shrinks from suffering, yet He submits to the Father\'s will for our salvation.',
        '',
        'On the large bead, pray:',
        '"Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world."',
        '',
        'On the 10 small beads, pray:',
        '"For the sake of His sorrowful Passion, have mercy on us and on the whole world."'
      ],
      type: 'instruction',
      beadCount: 11
    },
    {
      id: 'second-decade',
      title: 'Second Decade - The Scourging at the Pillar',
      content: [
        'Meditate: Jesus endures brutal punishment for our sins, His precious Blood flowing for our redemption.',
        '',
        'On the large bead, pray:',
        '"Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world."',
        '',
        'On the 10 small beads, pray:',
        '"For the sake of His sorrowful Passion, have mercy on us and on the whole world."'
      ],
      type: 'instruction',
      beadCount: 11
    },
    {
      id: 'third-decade',
      title: 'Third Decade - The Crowning with Thorns',
      content: [
        'Meditate: The King of Kings accepts mockery and pain, teaching us humility and patience in suffering.',
        '',
        'On the large bead, pray:',
        '"Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world."',
        '',
        'On the 10 small beads, pray:',
        '"For the sake of His sorrowful Passion, have mercy on us and on the whole world."'
      ],
      type: 'instruction',
      beadCount: 11
    },
    {
      id: 'fourth-decade',
      title: 'Fourth Decade - The Carrying of the Cross',
      content: [
        'Meditate: Jesus embraces the Cross, showing us how to unite our sufferings with His for souls.',
        '',
        'On the large bead, pray:',
        '"Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world."',
        '',
        'On the 10 small beads, pray:',
        '"For the sake of His sorrowful Passion, have mercy on us and on the whole world."'
      ],
      type: 'instruction',
      beadCount: 11
    },
    {
      id: 'fifth-decade',
      title: 'Fifth Decade - The Crucifixion and Death',
      content: [
        'Meditate: From the Cross flows infinite mercy, as Jesus gives His life so that we might live forever.',
        '',
        'On the large bead, pray:',
        '"Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world."',
        '',
        'On the 10 small beads, pray:',
        '"For the sake of His sorrowful Passion, have mercy on us and on the whole world."'
      ],
      type: 'instruction',
      beadCount: 11
    },
    {
      id: 'closing-prayer',
      title: 'Closing Prayer',
      content: [
        'Conclude by praying three times:',
        '"Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world."'
      ],
      type: 'prayer'
    }
  ],

  'st-michael': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'O God, come to my assistance. O Lord, make haste to help me. Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.'
      ],
      type: 'prayer'
    },
    {
      id: 'first-salutation',
      title: 'First Salutation - Seraphim',
      content: [
        'Meditate: These highest angels burn with perfect love of God. Ask St. Michael and the Seraphim to kindle in your heart the fire of divine charity.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Seraphim, may the Lord make us worthy to burn with the fire of perfect charity. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'second-salutation',
      title: 'Second Salutation - Cherubim',
      content: [
        'Meditate: The Cherubim excel in knowledge and wisdom. Through St. Michael\'s intercession, pray to be freed from sin and grow in Christian perfection.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Cherubim, may the Lord grant us the grace to leave the ways of sin and run in the paths of Christian perfection. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'third-salutation',
      title: 'Third Salutation - Thrones',
      content: [
        'Meditate: The Thrones reflect God\'s justice and humility. Ask St. Michael and these angels to help you develop true and sincere humility.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Thrones, may the Lord infuse into our hearts a true and sincere spirit of humility. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'fourth-salutation',
      title: 'Fourth Salutation - Dominions',
      content: [
        'Meditate: The Dominions govern the lower choirs with divine authority. Pray for grace to govern your senses and overcome unruly passions.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Dominions, may the Lord give us grace to govern our senses and overcome any unruly passions. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'fifth-salutation',
      title: 'Fifth Salutation - Powers',
      content: [
        'Meditate: The Powers defend against evil and maintain order. Seek St. Michael\'s protection of your soul against the snares of the devil.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Powers, may the Lord protect our souls against the snares and temptations of the devil. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'sixth-salutation',
      title: 'Sixth Salutation - Virtues',
      content: [
        'Meditate: The Virtues work miracles and bestow grace. Ask to be preserved from evil and delivered from temptation through their intercession.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Virtues, may the Lord preserve us from evil and falling into temptation. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'seventh-salutation',
      title: 'Seventh Salutation - Principalities',
      content: [
        'Meditate: The Principalities guide earthly rulers and nations. Pray that God may fill your soul with a true spirit of obedience to His will.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Principalities, may God fill our souls with a true spirit of obedience. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'eighth-salutation',
      title: 'Eighth Salutation - Archangels',
      content: [
        'Meditate: The Archangels are God\'s special messengers. Ask for perseverance in faith and good works to attain the glory of Heaven.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Archangels, may the Lord give us perseverance in faith and in all good works in order that we may attain the glory of Heaven. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'ninth-salutation',
      title: 'Ninth Salutation - Angels',
      content: [
        'Meditate: Our guardian angels protect and guide us daily. Pray to be protected in this life and conducted safely to eternal life.',
        '',
        'By the intercession of St. Michael and the celestial Choir of Angels, may the Lord grant us to be protected by them in this mortal life and conducted in the life to come to Heaven. Amen.',
        '',
        'Pray one Our Father and three Hail Marys.'
      ],
      type: 'instruction',
      beadCount: 4
    },
    {
      id: 'closing-prayer',
      title: 'Prayer to St. Michael',
      content: [
        'St. Michael the Archangel, defend us in battle, be our protection against the wickedness and snares of the devil. May God rebuke him we humbly pray; and do thou, O Prince of the Heavenly Host, by the power of God, cast into hell Satan and all evil spirits who prowl about the world seeking the ruin of souls. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'sacred-heart': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'O Sacred Heart of Jesus, fountain of eternal life, Your Heart is a glowing furnace of Love. You are my refuge and my sanctuary. O my adorable and loving Savior, consume my heart with the burning fire with which Yours is aflame. Pour down on my soul those graces which flow from Your love. Let my heart be united with Yours.'
      ],
      type: 'prayer'
    },
    {
      id: 'first-group',
      title: 'First Group - Jesus\' Burning Love',
      content: [
        'Meditate: Contemplate the infinite love of Jesus\' Sacred Heart, burning with desire for your salvation and sanctification.',
        '',
        'Say on the first large bead:',
        '"Sacred Heart of Jesus, I place all my trust in You."',
        '',
        'Say on each of the following 11 small beads:',
        '"Sacred Heart of Jesus, I believe in Your love for me."'
      ],
      type: 'instruction',
      beadCount: 12
    },
    {
      id: 'second-group',
      title: 'Second Group - His Mercy and Compassion',
      content: [
        'Meditate: Meditate on how Jesus\' Heart overflows with mercy for sinners, always ready to forgive and heal wounded souls.',
        '',
        'Say on the large bead:',
        '"Sacred Heart of Jesus, I place all my trust in You."',
        '',
        'Say on each of the following 11 small beads:',
        '"Sacred Heart of Jesus, I believe in Your love for me."'
      ],
      type: 'instruction',
      beadCount: 12
    },
    {
      id: 'third-group',
      title: 'Third Group - His Patience with Our Weakness',
      content: [
        'Meditate: Reflect on the patient love of Jesus, who bears with our failings and continually calls us back to His Heart.',
        '',
        'Say on the large bead:',
        '"Sacred Heart of Jesus, I place all my trust in You."',
        '',
        'Say on each of the following 11 small beads:',
        '"Sacred Heart of Jesus, I believe in Your love for me."'
      ],
      type: 'instruction',
      beadCount: 12
    },
    {
      id: 'closing-prayer',
      title: 'Closing Prayer',
      content: [
        'Sweet Heart of Jesus, be my love. Sweet Heart of Jesus, be my salvation. Sweet Heart of Mary, be my refuge. Heart of Mary, pray for us. St. Joseph, pray for us.',
        '',
        'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'precious-blood': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'Almighty and Eternal God, You have appointed Your only-begotten Son the Redeemer of the world and willed to be appeased by His Blood. Grant, we beg of You, that we may worthily adore this price of our salvation and through its power be safeguarded from the evils of the present life. Through the same Christ our Lord. Amen.'
      ],
      type: 'prayer'
    },
    {
      id: 'first-mystery',
      title: 'First Mystery - The Circumcision',
      content: [
        'Meditate: The first drops of Jesus\' precious Blood are shed when He receives His holy Name.',
        '',
        'Pray seven times:',
        '"We adore You, O Christ, and we praise You, because by Your holy Blood You have redeemed the world."',
        '',
        'Then pray one Our Father.'
      ],
      type: 'instruction',
      beadCount: 8
    },
    {
      id: 'second-mystery',
      title: 'Second Mystery - The Agony in the Garden',
      content: [
        'Meditate: In His agony, Jesus sweats Blood, showing His perfect humanity united to perfect divinity.',
        '',
        'Pray seven times:',
        '"We adore You, O Christ, and we praise You, because by Your holy Blood You have redeemed the world."',
        '',
        'Then pray one Our Father.'
      ],
      type: 'instruction',
      beadCount: 8
    },
    {
      id: 'third-mystery',
      title: 'Third Mystery - The Scourging',
      content: [
        'Meditate: Every stripe draws precious Blood from the sacred Body of our Savior for our healing.',
        '',
        'Pray seven times:',
        '"We adore You, O Christ, and we praise You, because by Your holy Blood You have redeemed the world."',
        '',
        'Then pray one Our Father.'
      ],
      type: 'instruction',
      beadCount: 8
    },
    {
      id: 'fourth-mystery',
      title: 'Fourth Mystery - The Crowning with Thorns',
      content: [
        'Meditate: The thorns pierce the sacred Head, and precious Blood flows to wash away our pride.',
        '',
        'Pray seven times:',
        '"We adore You, O Christ, and we praise You, because by Your holy Blood You have redeemed the world."',
        '',
        'Then pray one Our Father.'
      ],
      type: 'instruction',
      beadCount: 8
    },
    {
      id: 'closing-prayer',
      title: 'Closing Prayer',
      content: [
        'Eternal Father, I offer You the most Precious Blood of Your Divine Son, Jesus, in union with the Masses said throughout the world today, for all the holy souls in purgatory, for sinners everywhere, for sinners in the universal church, those in my own home and within my family. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'holy-face': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'Most Holy Trinity, I adore You! My God, my God, I love You in the Most Blessed Sacrament!'
      ],
      type: 'prayer'
    },
    {
      id: 'act-of-reparation',
      title: 'Act of Reparation',
      content: [
        'My beloved Jesus, may You be known, loved, and adored, and may reparation be made to You by all men! Sweet Jesus, may Your kingdom come!'
      ],
      type: 'prayer'
    },
    {
      id: 'prayer-repetition',
      title: 'Main Prayer',
      content: [
        'Pray 33 times (once for each year of our Lord\'s life):',
        '"May the most holy, most sacred, most adorable, most incomprehensible and unutterable Name of God be always praised, blessed, loved, adored and glorified in Heaven, on earth, and under the earth, by all the creatures of God, and by the Sacred Heart of Our Lord Jesus Christ, in the Most Holy Sacrament of the Altar. Amen."',
        '',
        'After every prayer, kiss a crucifix and say:',
        '"Precious Blood of Jesus Christ, save us and the whole world!"'
      ],
      type: 'instruction',
      beadCount: 33
    },
    {
      id: 'closing-prayer',
      title: 'Closing Prayer',
      content: [
        'Eternal Father, turn away Your angry gaze from our guilty world, whose face has become unsightly in Your eyes. Look instead upon the Face of Your beloved Son in whom You are well pleased. The wounds that sin has made on human souls are healed in the wounds of Jesus. The crimson stains of our transgressions disappear in His Precious Blood. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'immaculate-heart': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'Most Sacred Heart of Jesus, truly present in the Holy Eucharist, I consecrate my body and soul to be entirely one with Your Heart, being sacrificed at every instant on all the altars of the world and giving praise to the Father, pleading for the coming of His kingdom.'
      ],
      type: 'prayer'
    },
    {
      id: 'five-decades',
      title: 'Five Decades',
      content: [
        'Pray five decades of the rosary (50 Hail Marys) while meditating on the mysteries of the Immaculate Heart of Mary:',
        '',
        '• The Annunciation - Mary\'s "Yes" to God',
        '• The Visitation - Mary\'s service to others',
        '• The Nativity - Mary\'s gift to the world',
        '• The Presentation - Mary\'s offering to God',
        '• The Finding in the Temple - Mary\'s pondering heart',
        '',
        'Begin each decade with an Our Father, pray ten Hail Marys, and conclude with a Glory Be.'
      ],
      type: 'instruction',
      beadCount: 55
    },
    {
      id: 'closing-prayer',
      title: 'Closing Prayer',
      content: [
        'O most holy Heart of Mary, Heart of the best of mothers, Heart inflamed with love for us, we consecrate ourselves unreservedly to you. Make our hearts like unto the Heart of Jesus. Help us to carry our crosses as you carried yours, with courage, with love, with hope. Be our guide to Jesus and to eternal happiness. Immaculate Heart of Mary, pray for us now and at the hour of our death. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'st-joseph': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'O Glorious St. Joseph, faithful guardian of Jesus Christ, to you do we raise our hearts and hands to implore your powerful intercession in obtaining from the benign Heart of Jesus all the helps and graces necessary for our spiritual and temporal welfare.'
      ],
      type: 'prayer'
    },
    {
      id: 'first-group',
      title: 'First Group - Honor and Glory',
      content: [
        'Meditate on St. Joseph as the chosen spouse of Mary and foster father of Jesus.',
        '',
        'Pray on the large bead:',
        '"St. Joseph, worker of miracles, pray for us."',
        '',
        'Pray on each of the 4 small beads:',
        '"St. Joseph, model of workers, pray for us."'
      ],
      type: 'instruction',
      beadCount: 5
    },
    {
      id: 'second-group',
      title: 'Second Group - Patron of Families',
      content: [
        'Meditate on St. Joseph\'s loving care for the Holy Family.',
        '',
        'Pray on the large bead:',
        '"St. Joseph, worker of miracles, pray for us."',
        '',
        'Pray on each of the 4 small beads:',
        '"St. Joseph, model of workers, pray for us."'
      ],
      type: 'instruction',
      beadCount: 5
    },
    {
      id: 'third-group',
      title: 'Third Group - Guardian of the Church',
      content: [
        'Meditate on St. Joseph as protector and guardian of Christ\'s mystical body.',
        '',
        'Pray on the large bead:',
        '"St. Joseph, worker of miracles, pray for us."',
        '',
        'Pray on each of the 4 small beads:',
        '"St. Joseph, model of workers, pray for us."'
      ],
      type: 'instruction',
      beadCount: 5
    },
    {
      id: 'closing-prayer',
      title: 'Prayer to St. Joseph',
      content: [
        'Remember, O most pure spouse of Mary, ever Virgin, my loving protector, St. Joseph, that no one ever had recourse to your protection or asked for your aid without being consoled. In this confidence I come before you and fervently commend myself to you. Despise not my petitions, foster-father of the Redeemer, but graciously receive them. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'five-wounds': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'Jesus, my Lord and my God, behold me prostrate before Your sacred wounds. I believe that You suffered and died for love of me. Give me a lively faith, firm hope, and burning love, so I may serve You faithfully and save my soul.'
      ],
      type: 'prayer'
    },
    {
      id: 'first-wound',
      title: 'First Wound - Left Hand',
      content: [
        'Meditate: The nail pierces His left hand, the hand that blessed and healed so many.',
        '',
        'Adorable Wound of the Left Hand of my crucified Jesus, I honor, love, and adore You. I praise and thank You for all the love You have shown me, and I ask pardon for my sins which caused You such suffering. Since You have loved me unto this extremity, grant me the grace to love You with all my heart; and since Your holy wounds are fountains of grace, may my soul draw from them all the supernatural help I need. Amen.',
        '',
        'Our Father, Hail Mary, Glory Be.'
      ],
      type: 'instruction',
      beadCount: 3
    },
    {
      id: 'second-wound',
      title: 'Second Wound - Right Hand',
      content: [
        'Meditate: The nail pierces His right hand, showing us the price of our redemption.',
        '',
        'Adorable Wound of the Right Hand of my crucified Jesus, I honor, love, and adore You. I praise and thank You for all the love You have shown me, and I ask pardon for my sins which caused You such suffering. Since You have loved me unto this extremity, grant me the grace to love You with all my heart; and since Your holy wounds are fountains of grace, may my soul draw from them all the supernatural help I need. Amen.',
        '',
        'Our Father, Hail Mary, Glory Be.'
      ],
      type: 'instruction',
      beadCount: 3
    },
    {
      id: 'third-wound',
      title: 'Third Wound - Left Foot',
      content: [
        'Meditate: His feet, which walked to bring the Good News, are pierced for our salvation.',
        '',
        'Adorable Wound of the Left Foot of my crucified Jesus, I honor, love, and adore You. I praise and thank You for all the love You have shown me, and I ask pardon for my sins which caused You such suffering. Since You have loved me unto this extremity, grant me the grace to love You with all my heart; and since Your holy wounds are fountains of grace, may my soul draw from them all the supernatural help I need. Amen.',
        '',
        'Our Father, Hail Mary, Glory Be.'
      ],
      type: 'instruction',
      beadCount: 3
    },
    {
      id: 'fourth-wound',
      title: 'Fourth Wound - Right Foot',
      content: [
        'Meditate: Both feet are nailed together, completing the sacrifice of love.',
        '',
        'Adorable Wound of the Right Foot of my crucified Jesus, I honor, love, and adore You. I praise and thank You for all the love You have shown me, and I ask pardon for my sins which caused You such suffering. Since You have loved me unto this extremity, grant me the grace to love You with all my heart; and since Your holy wounds are fountains of grace, may my soul draw from them all the supernatural help I need. Amen.',
        '',
        'Our Father, Hail Mary, Glory Be.'
      ],
      type: 'instruction',
      beadCount: 3
    },
    {
      id: 'fifth-wound',
      title: 'Fifth Wound - Sacred Side',
      content: [
        'Meditate: The lance opens His side, and from it flows blood and water - the sacraments of the Church.',
        '',
        'Adorable Wound of the Sacred Side of my crucified Jesus, I honor, love, and adore You. I praise and thank You for all the love You have shown me, and I ask pardon for my sins which caused You such suffering. Since You have loved me unto this extremity, grant me the grace to love You with all my heart; and since Your holy wounds are fountains of grace, may my soul draw from them all the supernatural help I need. Amen.',
        '',
        'Our Father, Hail Mary, Glory Be.'
      ],
      type: 'instruction',
      beadCount: 3
    },
    {
      id: 'closing-prayer',
      title: 'Closing Prayer',
      content: [
        'Soul of Christ, sanctify me. Body of Christ, save me. Blood of Christ, inebriate me. Water from the side of Christ, wash me. Passion of Christ, strengthen me. O good Jesus, hear me. Within Your wounds, hide me. Never let me be separated from You. From the malicious enemy, defend me. In the hour of my death, call me, and bid me come unto You, that I may praise You with Your Saints and Angels forever and ever. Amen.'
      ],
      type: 'prayer'
    }
  ],

  'st-bridget': [
    {
      id: 'sign-of-cross',
      title: 'Begin in Prayer',
      content: [
        'In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.',
        '',
        'Opening Prayer:',
        'O Jesus! now I wish to pray the Lord\'s Prayer seven times in unity with the love with which You sanctified this prayer in Your Heart. Take it from my lips into Your Divine Heart. Improve and complete it so much, that it brings as much honor and joy to the Trinity as You granted it on earth.'
      ],
      type: 'prayer'
    },
    {
      id: 'seven-our-fathers',
      title: 'Seven Our Fathers',
      content: [
        'Pray seven Our Fathers in honor of the Seven Last Words of Jesus.',
        'Before each Our Father, meditate on one of His final statements:',
        '',
        '1. "Father, forgive them, for they know not what they do."',
        '2. "Amen I say to you, this day you shall be with Me in paradise."',
        '3. "Woman, behold your son. Son, behold your Mother."',
        '4. "My God, My God, why have You forsaken Me?"',
        '5. "I thirst."',
        '6. "It is finished."',
        '7. "Father, into Your hands I commend My spirit."'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'seven-hail-marys',
      title: 'Seven Hail Marys',
      content: [
        'Pray seven Hail Marys in memory of the Seven Sorrows and Seven Joys of Mary.',
        'With each prayer, ask Mary to obtain the grace of true sorrow for your sins.'
      ],
      type: 'instruction',
      beadCount: 7
    },
    {
      id: 'closing-prayers',
      title: 'Closing Prayers',
      content: [
        'Then pray:',
        '• One Our Father in honor of St. Bridget',
        '• One Hail Mary for the Pope',
        '• One Glory Be to the Most Holy Trinity',
        '',
        'Final Prayer:',
        'O Jesus, now I wish to pray three times the "Our Father" and the "Hail Mary" in unity with the love with which You honored Your Mother so highly that You appointed Her above all choirs of Angels as Queen of Heaven and Earth.'
      ],
      type: 'instruction',
      beadCount: 9
    }
  ]
};