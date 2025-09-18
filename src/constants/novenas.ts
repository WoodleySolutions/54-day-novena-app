import { NovenaType, NovenaInfo, NovenaDay } from '../types';

export const NOVENA_INFO: Record<NovenaType, NovenaInfo> = {
  'divine-mercy': {
    name: 'Divine Mercy Novena',
    description: 'Nine days of prayer to Jesus\' Divine Mercy',
    color: '#dc2626', // red-600 - good contrast
    icon: '✝️',
    patron: 'Jesus Christ',
    feastDay: 'Divine Mercy Sunday',
    estimatedDuration: 15
  },
  'sacred-heart': {
    name: 'Sacred Heart Novena',
    description: 'Nine days of devotion to the Sacred Heart of Jesus',
    color: '#d97706', // amber-600 - better than gold
    icon: '❤️',
    patron: 'Jesus Christ',
    feastDay: 'Sacred Heart Friday',
    estimatedDuration: 18
  },
  'st-joseph': {
    name: 'St. Joseph Novena',
    description: 'Nine days of prayer to the patron of workers and families',
    color: '#92400e', // amber-800 - dark brown for contrast
    icon: '🔨',
    patron: 'St. Joseph',
    feastDay: 'March 19',
    estimatedDuration: 12
  },
  'immaculate-heart': {
    name: 'Immaculate Heart Novena',
    description: 'Nine days of prayer to Mary\'s Immaculate Heart',
    color: '#2563eb', // blue-600 - good contrast
    icon: '💝',
    patron: 'Blessed Virgin Mary',
    feastDay: 'August 22',
    estimatedDuration: 20
  },
  'st-therese': {
    name: 'St. Thérèse Novena',
    description: 'Nine days of prayer to the Little Flower',
    color: '#db2777', // pink-600 - better than light pink
    icon: '🌹',
    patron: 'St. Thérèse of Lisieux',
    feastDay: 'October 1',
    estimatedDuration: 15
  },
  'st-jude': {
    name: 'St. Jude Novena',
    description: 'Nine days of prayer to the patron of hopeless causes',
    color: '#16a34a', // green-600 - good contrast
    icon: '🕯️',
    patron: 'St. Jude Thaddeus',
    feastDay: 'October 28',
    estimatedDuration: 14
  },
  'st-anthony': {
    name: 'St. Anthony Novena',
    description: 'Nine days of prayer to the finder of lost things',
    color: '#a16207', // yellow-700 - different from st-joseph
    icon: '📿',
    patron: 'St. Anthony of Padua',
    feastDay: 'June 13',
    estimatedDuration: 16
  },
  'blessed-mother': {
    name: 'Blessed Mother Novena',
    description: 'Nine days of prayer to Our Lady',
    color: '#1d4ed8', // blue-700 - darker than immaculate-heart
    icon: '👑',
    patron: 'Blessed Virgin Mary',
    feastDay: 'Various',
    estimatedDuration: 18
  },
  'holy-spirit': {
    name: 'Holy Spirit Novena',
    description: 'Nine days of prayer for the gifts of the Holy Spirit',
    color: '#b91c1c', // red-700 - darker than divine-mercy
    icon: '🕊️',
    patron: 'Holy Spirit',
    feastDay: 'Pentecost',
    estimatedDuration: 20
  }
};

export const NOVENA_PRAYERS: Record<NovenaType, NovenaDay[]> = {
  'divine-mercy': [
    {
      day: 1,
      title: 'Day 1 - All Mankind',
      content: [
        'Opening Prayer:',
        'You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty Yourself out upon us.',
        '',
        'Today bring to Me all mankind, especially all sinners, and immerse them in the ocean of My mercy. In this way you will console Me in the bitter grief into which the loss of souls plunges Me.',
        '',
        'Most Merciful Jesus, whose very nature it is to have compassion on us and to forgive, do not look upon our sins but upon our trust which we place in Your infinite goodness. Receive us all into the abode of Your Most Compassionate Heart, and never let us escape from It. We beg this of You by Your love which unites You to the Father and the Holy Spirit.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I show greater mercy and compassion to all people I encounter today?',
      scripture: 'But God, who is rich in mercy, out of the great love with which he loved us, even when we were dead through our trespasses, made us alive together with Christ. (Ephesians 2:4-5)'
    },
    {
      day: 2,
      title: 'Day 2 - Souls of Priests and Religious',
      content: [
        'Today bring to Me the souls of priests and religious, and immerse them in My unfathomable mercy. It was they who gave Me strength to endure My bitter Passion. Through them flows My mercy unto mankind.',
        '',
        'Most Merciful Jesus, from whom comes all that is good, increase Your grace in men and women consecrated to Your service, that they may perform worthy works of mercy; and that all who see them may glorify the Father of Mercy who is in heaven.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I better support and pray for those who have dedicated their lives to serving God?',
      scripture: 'And he said to them, "The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers into his harvest." (Luke 10:2)'
    },
    // Days 3-9 would follow the same pattern
    {
      day: 3,
      title: 'Day 3 - All Devout and Faithful Souls',
      content: [
        'Today bring to Me all devout and faithful souls, and immerse them in the ocean of My mercy. These souls brought Me consolation on the Way of the Cross. They were a drop of consolation in the midst of an ocean of bitterness.',
        '',
        'Most Merciful Jesus, from the treasury of Your mercy, You impart Your graces; and we, with broken hearts, with deep humility, fly to Your mercy. Take under Your special protection all devout and faithful souls, and keep them from falling away from love and the desire for perfection. Bless their endeavors and grant that they may persevere in mercy and continue to be living examples of goodness for others.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I deepen my own devotion and faithfulness to God today?',
      scripture: 'Be faithful unto death, and I will give you the crown of life. (Revelation 2:10)'
    },
    {
      day: 4,
      title: 'Day 4 - Those Who Do Not Know Jesus',
      content: [
        'Today bring to Me those who do not know Me, and those who do not yet believe. I was thinking also of them during My bitter Passion, and their future zeal comforted My Heart. Immerse them in the ocean of My mercy.',
        '',
        'Most compassionate Jesus, You are the Light of the whole world. Receive into the abode of Your Most Compassionate Heart the souls of those who do not yet know You. Let the rays of Your grace enlighten them that they, too, together with us, may extol Your wonderful mercy; and do not let them escape from the abode of Your Most Compassionate Heart.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I be a witness to God\'s love for those who have not yet encountered Him?',
      scripture: 'And I have other sheep, that are not of this fold; I must bring them also, and they will heed my voice. So there shall be one flock, one shepherd. (John 10:16)'
    },
    {
      day: 5,
      title: 'Day 5 - The Souls of Separated Brethren',
      content: [
        'Today bring to Me the souls of those who have separated themselves from My Church, and immerse them in the ocean of My mercy. During My bitter Passion they tore at My Body and Heart, that is, My Church. As they return to unity with the Church, My wounds heal and in this way they alleviate My Passion.',
        '',
        'Most Merciful Jesus, Goodness Itself, You do not refuse light to those who seek it of You. Receive into the abode of Your Most Compassionate Heart the souls of those who have separated themselves from Your Church. Draw them by Your light into the unity of the Church, and do not let them escape from the abode of Your Most Compassionate Heart; but bring it about that they, too, come to glorify the generosity of Your mercy.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I pray for and work toward greater unity among all Christians?',
      scripture: 'That they may all be one; even as you, Father, are in me, and I in you, that they also may be in us, so that the world may believe that you have sent me. (John 17:21)'
    },
    {
      day: 6,
      title: 'Day 6 - The Meek and Humble Souls',
      content: [
        'Today bring to Me the meek and humble souls and the souls of children, and immerse them in My mercy. These souls most closely resemble My Heart. They strengthened Me during My bitter agony. I saw them as earthly angels, who will keep vigil at My altars. I pour out upon them whole torrents of grace. Only the humble soul is capable of receiving My grace.',
        '',
        'Most Merciful Jesus, You yourself have said, "Learn from Me for I am meek and humble of heart." Receive into the abode of Your Most Compassionate Heart all meek and humble souls and the souls of children. These souls send all heaven into ecstasy and they are the heavenly Father\'s favorites. They are a sweet-smelling bouquet before the throne of God; God Himself takes delight in their fragrance. These souls have a permanent place in Your Most Compassionate Heart, O Jesus, and they unceasingly sing out a hymn of love and mercy.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I cultivate greater humility and meekness in my daily life?',
      scripture: 'Truly, I say to you, unless you turn and become like children, you will never enter the kingdom of heaven. (Matthew 18:3)'
    },
    {
      day: 7,
      title: 'Day 7 - The Souls Who Especially Venerate My Mercy',
      content: [
        'Today bring to Me the souls who especially revere and glorify My mercy, and immerse them in My mercy. These souls sorrowed most over My Passion and entered most deeply into My spirit. They are living images of My Compassionate Heart. These souls will shine with a special brightness in the next life. Not one of them will go into the fire of hell. I shall particularly defend each one of them at the hour of death.',
        '',
        'Most Merciful Jesus, whose Heart is Love Itself, receive into the abode of Your Most Compassionate Heart the souls of those who particularly extol and venerate the greatness of Your mercy. These souls are mighty with the very power of God Himself. In the midst of all afflictions and adversities they go forward, confident of Your mercy; and united to You, O Jesus, they carry all mankind on their shoulders. These souls will not be judged severely, but Your mercy will embrace them as they depart from this life.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I grow in my devotion to God\'s mercy and share it with others?',
      scripture: 'Blessed are the merciful, for they shall obtain mercy. (Matthew 5:7)'
    },
    {
      day: 8,
      title: 'Day 8 - The Souls Who Are Detained in Purgatory',
      content: [
        'Today bring to Me the souls who are detained in Purgatory, and immerse them in the abyss of My mercy. Let the torrents of My Blood cool down their scorching flames. All these souls are greatly loved by Me. They are making retribution to My justice. It is in your power to bring them relief. Draw all the indulgences from the treasury of My Church and offer them on their behalf. Oh, if you only knew the torments they suffer, you would continually offer for them the alms of the spirit and pay off their debt to My justice.',
        '',
        'Most Merciful Jesus, You Yourself have said that You desire mercy; so I bring into the abode of Your Most Compassionate Heart the souls in Purgatory, souls who are very dear to You, and yet, who must make retribution to Your justice. May the streams of Blood and Water which gushed forth from Your Heart put out the flames of Purgatory, that there, too, the power of Your mercy may be celebrated.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I remember to pray for the souls of the departed and offer sacrifices for them?',
      scripture: 'It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from their sins. (2 Maccabees 12:46)'
    },
    {
      day: 9,
      title: 'Day 9 - The Souls Who Have Become Lukewarm',
      content: [
        'Today bring to Me the souls who have become lukewarm, and immerse them in the abyss of My mercy. These souls wound My Heart most painfully. My soul suffered the most dreadful loathing in the Garden of Olives because of lukewarm souls. They were the reason I cried out: "Father, take this cup away from Me, if it be Your will." For them, the last hope of salvation is to run to My mercy.',
        '',
        'Most compassionate Jesus, You are Compassion Itself. I bring lukewarm souls into the abode of Your Most Compassionate Heart. In this fire of Your pure love, let these tepid souls who, like corpses, filled You with such deep loathing, be once again set aflame. O Most Compassionate Jesus, exercise the omnipotence of Your mercy and draw them into the very ardor of Your love, and bestow upon them the gift of holy love, for nothing is beyond Your power.'
      ],
      prayer: 'Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      reflection: 'How can I reignite my passion for God and avoid spiritual lukewarmness in my own life?',
      scripture: 'I know your works: you are neither cold nor hot. Would that you were cold or hot! So, because you are lukewarm, and neither cold nor hot, I will spew you out of my mouth. (Revelation 3:15-16)'
    }
  ],
  'sacred-heart': [
    {
      day: 1,
      title: 'Day 1 - Love of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, burning with infinite love for us poor sinners, and especially for those who love You, we place all our trust in You. We consecrate ourselves entirely to You. Be You our guide, our strength, and our refuge, especially at the hour of death.',
        '',
        'Never permit us to offend You again. Give us grace to love You more and more, and to make You loved by others. Grant that we may live and die in Your holy love.'
      ],
      prayer: 'Sacred Heart of Jesus, I believe in Your love for me. Amen.',
      reflection: 'How can I open my heart more fully to receive and share the infinite love of Jesus?',
      scripture: 'And he took bread, and when he had given thanks, he broke it and gave it to them, saying, "This is my body, which is given for you. Do this in remembrance of me." (Luke 22:19)'
    },
    {
      day: 2,
      title: 'Day 2 - Mercy of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, fountain of infinite mercy, from which flow all graces and blessings, I worship and adore You. I am sorry for my sins, which have wounded Your loving Heart. Give me the grace to repent sincerely and to amend my life.',
        '',
        'Pour forth Your mercy upon all sinners, especially those who are in most need of Your compassion. Convert the hearts of all who have wandered from You, and bring them back to Your Sacred Heart.'
      ],
      prayer: 'Sacred Heart of Jesus, have mercy on us. Amen.',
      reflection: 'How can I be more merciful to others, as Jesus is merciful to me?',
      scripture: 'But God, being rich in mercy, because of the great love with which he loved us, even when we were dead in our trespasses, made us alive together with Christ. (Ephesians 2:4-5)'
    },
    {
      day: 3,
      title: 'Day 3 - Patience of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, model of patience in all trials and sufferings, teach me to be patient in all the crosses and difficulties of life. Help me to accept with resignation whatever You permit to happen to me.',
        '',
        'Grant me the grace to endure patiently all the sufferings of this life, in union with Your own Sacred Passion. Let me never complain or grow bitter, but always trust in Your divine Providence.'
      ],
      prayer: 'Sacred Heart of Jesus, grant me patience in all my trials. Amen.',
      reflection: 'How can I grow in patience, especially when facing difficult situations or difficult people?',
      scripture: 'But if we hope for what we do not see, we wait for it with patience. (Romans 8:25)'
    },
    {
      day: 4,
      title: 'Day 4 - Humility of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, perfect model of humility, who emptied Yourself to become like us in all things except sin, teach me true humility. Help me to recognize my nothingness before God and my total dependence on Your grace.',
        '',
        'Grant that I may never seek my own glory, but in all things seek only to glorify You. Let me be content to be unknown and overlooked by the world, as long as I am known and loved by You.'
      ],
      prayer: 'Sacred Heart of Jesus, make my heart humble like Yours. Amen.',
      reflection: 'Where do I struggle with pride? How can I grow in true humility before God and others?',
      scripture: 'Take my yoke upon you, and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. (Matthew 11:29)'
    },
    {
      day: 5,
      title: 'Day 5 - Obedience of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, perfect example of obedience to the Father\'s will, who became obedient even unto death on the Cross, teach me to be obedient to God\'s will in all things. Help me to say "yes" to whatever God asks of me, as You always did.',
        '',
        'Grant me the grace to obey not only in great things, but also in the small duties of everyday life. Let me find joy in doing God\'s will, knowing that this is the path to true happiness and holiness.'
      ],
      prayer: 'Sacred Heart of Jesus, help me to be obedient to God\'s will. Amen.',
      reflection: 'How can I better discern and follow God\'s will in my daily decisions and choices?',
      scripture: 'And being found in human form, he humbled himself by becoming obedient to the point of death, even death on a cross. (Philippians 2:8)'
    },
    {
      day: 6,
      title: 'Day 6 - Meekness of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, meek and gentle in all Your ways, teach me to be meek and gentle like You. Help me to respond to anger with kindness, to insults with blessings, and to hatred with love.',
        '',
        'Grant me the grace to control my temper and to speak always with gentleness and charity. Let Your meekness shine through me, so that others may see Your love in my words and actions.'
      ],
      prayer: 'Sacred Heart of Jesus, make my heart meek and gentle like Yours. Amen.',
      reflection: 'How can I respond to difficult people and situations with the meekness and gentleness of Jesus?',
      scripture: 'Blessed are the meek, for they shall inherit the earth. (Matthew 5:5)'
    },
    {
      day: 7,
      title: 'Day 7 - Zeal of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, burning with zeal for the glory of God and the salvation of souls, inflame my heart with that same holy zeal. Help me to work tirelessly for the Kingdom of God and to bring others to know and love You.',
        '',
        'Grant me the courage to speak of You to others, and to live my faith boldly and without compromise. Let my life be a witness to Your love and truth, drawing others closer to Your Sacred Heart.'
      ],
      prayer: 'Sacred Heart of Jesus, inflame my heart with zeal for Your glory. Amen.',
      reflection: 'How can I share my faith more boldly and work for the salvation of souls?',
      scripture: 'Zeal for your house will consume me. (John 2:17)'
    },
    {
      day: 8,
      title: 'Day 8 - Compassion of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, moved with compassion for all who suffer, open my heart to feel genuine compassion for others. Help me to see the suffering around me and to respond with kindness and practical help.',
        '',
        'Grant me the grace to comfort those who mourn, to help those in need, and to be Your hands and feet in a world that desperately needs Your love. Let Your compassion flow through me to touch the lives of others.'
      ],
      prayer: 'Sacred Heart of Jesus, fill my heart with compassion for others. Amen.',
      reflection: 'How can I be more aware of the suffering around me and respond with Christ-like compassion?',
      scripture: 'When he saw the crowds, he had compassion for them, because they were harassed and helpless, like sheep without a shepherd. (Matthew 9:36)'
    },
    {
      day: 9,
      title: 'Day 9 - Generosity of the Sacred Heart',
      content: [
        'O Sacred Heart of Jesus, who gave everything for our salvation, even Your very life, teach me to be generous in my love and service. Help me to give freely of my time, talents, and resources for the good of others and the glory of God.',
        '',
        'Grant that I may never be selfish or stingy, but always ready to share what I have with those in need. Let my life be a reflection of Your own generous love, poured out without measure for all humanity.'
      ],
      prayer: 'Sacred Heart of Jesus, make my heart generous like Yours. Amen.',
      reflection: 'How can I be more generous in my daily life, sharing God\'s blessings with others?',
      scripture: 'Give, and it will be given to you; good measure, pressed down, shaken together, running over, will be put into your lap. (Luke 6:38)'
    }
  ],
  'st-joseph': [
    {
      day: 1,
      title: 'Day 1 - St. Joseph, Model of Faith',
      content: [
        'O glorious St. Joseph, faithful follower of Jesus Christ, to you do we raise our hearts and hands to implore your powerful intercession in obtaining from the benign Heart of Jesus all the helps and graces necessary for our spiritual and temporal welfare.',
        '',
        'You who were chosen by the Eternal Father to be the foster father of Jesus and the most chaste spouse of Mary, obtain for us a pure heart, a love of the interior life, and a faithful observance of our duties.'
      ],
      prayer: 'St. Joseph, model of faith, pray for us.',
      reflection: 'How can I grow in faith and trust in God\'s plan for my life, like St. Joseph did?',
      scripture: 'But as he considered these things, behold, an angel of the Lord appeared to him in a dream, saying, "Joseph, son of David, do not fear to take Mary as your wife." (Matthew 1:20)'
    },
    {
      day: 2,
      title: 'Day 2 - St. Joseph, Protector of the Holy Family',
      content: [
        'O most loving father St. Joseph, guardian of the Holy Family, protect our families as you protected Jesus and Mary. Watch over our homes and make them sanctuaries of peace, love, and virtue.',
        '',
        'Help us to follow your example of quiet devotion, faithful service, and complete trust in Divine Providence.'
      ],
      prayer: 'St. Joseph, protector of families, pray for us.',
      reflection: 'How can I better protect and nurture my family relationships, following St. Joseph\'s example?',
      scripture: 'And he rose and took the child and his mother by night and departed to Egypt. (Matthew 2:14)'
    },
    {
      day: 3,
      title: 'Day 3 - St. Joseph, Patron of Workers',
      content: [
        'O faithful St. Joseph, through your work as a carpenter you provided for the Holy Family and showed us the dignity of honest labor. Help us to see our work as a participation in God\'s creative activity.',
        '',
        'Grant that we may work with integrity, find meaning in our labor, and use our talents to serve God and neighbor.'
      ],
      prayer: 'St. Joseph, patron of workers, pray for us.',
      reflection: 'How can I offer my work as prayer and service to God and others?',
      scripture: 'Is not this the carpenter\'s son? Is not his mother called Mary? (Matthew 13:55)'
    },
    {
      day: 4,
      title: 'Day 4 - St. Joseph, Model of Obedience',
      content: [
        'O humble St. Joseph, you obeyed the voice of God\'s angel without question or delay. Teach us to listen for God\'s voice in our lives and to respond with prompt and generous obedience.',
        '',
        'Help us to surrender our own will to God\'s will, trusting that His plans are always for our good and His glory.'
      ],
      prayer: 'St. Joseph, model of obedience, pray for us.',
      reflection: 'How can I be more attentive to God\'s will and more ready to obey His guidance?',
      scripture: 'When Joseph woke from sleep, he did as the angel of the Lord commanded him. (Matthew 1:24)'
    },
    {
      day: 5,
      title: 'Day 5 - St. Joseph, Model of Humility',
      content: [
        'O humble St. Joseph, though you were chosen for the highest honor on earth, you remained hidden and sought no recognition. Teach us the beauty of humility and the joy of serving God in hiddenness.',
        '',
        'Help us to be content with doing our duty faithfully, whether others notice or not, seeking only to please God.'
      ],
      prayer: 'St. Joseph, model of humility, pray for us.',
      reflection: 'How can I serve God more humbly, without seeking recognition or praise?',
      scripture: 'But Mary kept all these things, pondering them in her heart. (Luke 2:19)'
    },
    {
      day: 6,
      title: 'Day 6 - St. Joseph, Model of Justice',
      content: [
        'O just St. Joseph, the Gospel calls you a "just man" because you lived according to God\'s law with perfect integrity. Help us to live justly in all our relationships and dealings.',
        '',
        'Grant us the wisdom to know what is right and the courage to do it, even when it is difficult or costly.'
      ],
      prayer: 'St. Joseph, model of justice, pray for us.',
      reflection: 'How can I live more justly and treat others with fairness and integrity?',
      scripture: 'And her husband Joseph, being a just man and unwilling to put her to shame, resolved to divorce her quietly. (Matthew 1:19)'
    },
    {
      day: 7,
      title: 'Day 7 - St. Joseph, Model of Purity',
      content: [
        'O most chaste St. Joseph, guardian of the Virgin of virgins, you lived in perfect purity of heart and body. Help us to live chastely according to our state in life.',
        '',
        'Purify our hearts and minds, and help us to see others as children of God, treating them with respect and dignity.'
      ],
      prayer: 'St. Joseph, model of purity, pray for us.',
      reflection: 'How can I guard my heart and live with greater purity in thought, word, and deed?',
      scripture: 'But he knew her not until she had given birth to a son. (Matthew 1:25)'
    },
    {
      day: 8,
      title: 'Day 8 - St. Joseph, Comfort of the Afflicted',
      content: [
        'O compassionate St. Joseph, you experienced the anxiety of not finding room at the inn, the fear of Herod\'s persecution, and the sorrow of losing the child Jesus. Comfort all who are afflicted and troubled.',
        '',
        'Help us to trust in God\'s providence during times of difficulty and to find peace in His love.'
      ],
      prayer: 'St. Joseph, comfort of the afflicted, pray for us.',
      reflection: 'How can I find comfort in God during times of trial and help comfort others who are suffering?',
      scripture: 'And his father and his mother marveled at what was said about him. (Luke 2:33)'
    },
    {
      day: 9,
      title: 'Day 9 - St. Joseph, Patron of a Happy Death',
      content: [
        'O blessed St. Joseph, who died peacefully in the arms of Jesus and Mary, be our guide and protector at the hour of our death. Help us to live each day in preparation for eternity.',
        '',
        'Grant us final perseverance and the grace to die in the friendship of God, surrounded by those we love.'
      ],
      prayer: 'St. Joseph, patron of a happy death, pray for us.',
      reflection: 'How can I live each day in readiness for eternity, following St. Joseph\'s example of faithful service?',
      scripture: 'And Jesus increased in wisdom and in stature and in favor with God and man. (Luke 2:52)'
    }
  ],
  'immaculate-heart': [
    {
      day: 1,
      title: 'Day 1 - The Immaculate Heart, Model of Love',
      content: [
        'O Immaculate Heart of Mary, overflowing with love for God and for all people, teach us to love as you loved. Your heart was always turned toward God, always ready to do His will with joy and generosity.',
        '',
        'Help us to love God above all things and to love our neighbor as ourselves. Purify our hearts so that our love may be genuine and selfless, like yours.'
      ],
      prayer: 'Immaculate Heart of Mary, teach us to love. Amen.',
      reflection: 'How can I grow in love for God and neighbor, following Mary\'s perfect example?',
      scripture: 'And Mary said, "My soul magnifies the Lord, and my spirit rejoices in God my Savior." (Luke 1:46-47)'
    },
    {
      day: 2,
      title: 'Day 2 - The Immaculate Heart, Model of Faith',
      content: [
        'O Immaculate Heart of Mary, perfect in faith, you believed the angel\'s word and trusted completely in God\'s plan, even when you could not understand. Your faith never wavered, even at the foot of the Cross.',
        '',
        'Strengthen our faith in times of doubt and difficulty. Help us to trust in God\'s goodness and wisdom, even when His ways are mysterious to us.'
      ],
      prayer: 'Immaculate Heart of Mary, increase our faith. Amen.',
      reflection: 'Where do I struggle with faith? How can I trust more deeply in God\'s plan for my life?',
      scripture: 'And Mary said, "Behold, I am the handmaid of the Lord; let it be to me according to your word." (Luke 1:38)'
    },
    {
      day: 3,
      title: 'Day 3 - The Immaculate Heart, Model of Hope',
      content: [
        'O Immaculate Heart of Mary, filled with hope even in the darkest hours, you never despaired but always trusted in God\'s promises. At the Cross, you hoped in the Resurrection; in the tomb, you hoped in eternal life.',
        '',
        'When we are tempted to despair, remind us that God is faithful to His promises. Fill our hearts with the hope that comes from knowing that nothing is impossible with God.'
      ],
      prayer: 'Immaculate Heart of Mary, fill us with hope. Amen.',
      reflection: 'How can I maintain hope during difficult times, trusting in God\'s faithfulness?',
      scripture: 'Blessed is she who believed that there would be a fulfillment of what was spoken to her from the Lord. (Luke 1:45)'
    },
    {
      day: 4,
      title: 'Day 4 - The Immaculate Heart, Model of Purity',
      content: [
        'O Immaculate Heart of Mary, pure and spotless from the first moment of your conception, you show us the beauty of a heart completely given to God. Your purity of heart allowed you to see God clearly.',
        '',
        'Purify our hearts from all sin and selfishness. Help us to seek what is pure, noble, and holy in all our thoughts, words, and actions.'
      ],
      prayer: 'Immaculate Heart of Mary, purify our hearts. Amen.',
      reflection: 'How can I cultivate greater purity of heart in my thoughts, desires, and actions?',
      scripture: 'Blessed are the pure in heart, for they shall see God. (Matthew 5:8)'
    },
    {
      day: 5,
      title: 'Day 5 - The Immaculate Heart, Model of Humility',
      content: [
        'O Immaculate Heart of Mary, humble handmaid of the Lord, though you were chosen for the highest honor, you considered yourself the lowliest of servants. Your humility made you worthy to be the Mother of God.',
        '',
        'Teach us true humility, which recognizes that all good comes from God. Help us to serve others without seeking recognition, following your example of hidden service.'
      ],
      prayer: 'Immaculate Heart of Mary, make us humble. Amen.',
      reflection: 'How can I grow in humility and serve others without seeking praise or recognition?',
      scripture: 'He has looked on the humble estate of his servant. For behold, from now on all generations will call me blessed. (Luke 1:48)'
    },
    {
      day: 6,
      title: 'Day 6 - The Immaculate Heart, Model of Obedience',
      content: [
        'O Immaculate Heart of Mary, perfectly obedient to God\'s will, you taught us that true freedom comes from saying "yes" to God. Your obedience brought salvation to the world.',
        '',
        'Help us to surrender our will to God\'s will, trusting that His plans are always for our good. Give us the grace to obey not just in great things, but in the small duties of daily life.'
      ],
      prayer: 'Immaculate Heart of Mary, teach us obedience. Amen.',
      reflection: 'How can I be more obedient to God\'s will in my daily choices and decisions?',
      scripture: 'And his mother said to the servants, "Do whatever he tells you." (John 2:5)'
    },
    {
      day: 7,
      title: 'Day 7 - The Immaculate Heart, Mother of Mercy',
      content: [
        'O Immaculate Heart of Mary, Mother of Mercy, you are our refuge in times of trouble and our comfort in sorrow. You intercede for us with maternal love, bringing our needs to your Son.',
        '',
        'Help us to show mercy to others as you show mercy to us. Teach us to forgive as we have been forgiven, and to be compassionate to all who suffer.'
      ],
      prayer: 'Immaculate Heart of Mary, be our Mother of Mercy. Amen.',
      reflection: 'How can I be more merciful and compassionate to others, especially those who have hurt me?',
      scripture: 'From now on all generations will call me blessed, for he who is mighty has done great things for me. (Luke 1:48-49)'
    },
    {
      day: 8,
      title: 'Day 8 - The Immaculate Heart, Queen of Peace',
      content: [
        'O Immaculate Heart of Mary, Queen of Peace, you bring the peace of Christ to our troubled world. Your heart, united to the Sacred Heart of Jesus, is a source of true peace for all who seek it.',
        '',
        'Help us to be peacemakers in our families, communities, and world. Grant us the peace that comes from knowing we are loved by God and called to love others.'
      ],
      prayer: 'Immaculate Heart of Mary, Queen of Peace, pray for us. Amen.',
      reflection: 'How can I be a better peacemaker in my relationships and community?',
      scripture: 'And suddenly there was with the angel a multitude of the heavenly host praising God and saying, "Glory to God in the highest, and on earth peace among those with whom he is pleased!" (Luke 2:13-14)'
    },
    {
      day: 9,
      title: 'Day 9 - The Immaculate Heart, Our Advocate',
      content: [
        'O Immaculate Heart of Mary, our loving advocate, you intercede for us before the throne of God. You present our prayers to Jesus with a mother\'s tenderness and care.',
        '',
        'Be our advocate now and at the hour of our death. Help us to persevere in grace and to reach our heavenly home where we will praise the Trinity forever with you.'
      ],
      prayer: 'Immaculate Heart of Mary, be our advocate. Amen.',
      reflection: 'How can I entrust my life more completely to Mary\'s maternal care and intercession?',
      scripture: 'But when the fullness of time had come, God sent forth his Son, born of woman. (Galatians 4:4)'
    }
  ],
  'st-therese': [
    {
      day: 1,
      title: 'Day 1 - Trust in God\'s Mercy',
      content: [
        'O Little Thérèse of the Child Jesus, please pick for me a rose from the heavenly gardens and send it to me as a message of love.',
        '',
        'You who spent your life seeking the "little way" of spiritual childhood, help me to trust in God\'s mercy as a child trusts in their father. Teach me to approach our Lord with confidence and simplicity.',
        '',
        'Intercede for me that I may have the grace to abandon myself completely to Divine Providence, knowing that God\'s love will provide for all my needs.'
      ],
      prayer: 'St. Thérèse, the Little Flower, pray for us that we may trust in God like little children.',
      reflection: 'How can I trust in God\'s mercy more completely today, approaching Him with childlike confidence?',
      scripture: 'Truly, I say to you, unless you turn and become like children, you will never enter the kingdom of heaven. (Matthew 18:3)'
    },
    {
      day: 2,
      title: 'Day 2 - Simplicity and Humility',
      content: [
        'Dear St. Thérèse, you discovered that the "little way" to holiness is through simplicity and humility. You wrote: "I will seek out a means of getting to Heaven by a little way - very short and very straight, a little way that is wholly new."',
        '',
        'Help me to embrace the simple and ordinary moments of life as opportunities for holiness. Teach me that I don\'t need to do great things to please God, but rather small things with great love.',
        '',
        'Intercede for me that I may find joy in the hidden life, serving God faithfully in the ordinary duties of each day.'
      ],
      prayer: 'St. Thérèse, teach us the little way of spiritual childhood.',
      reflection: 'How can I find holiness in the simple, ordinary moments of my daily life?',
      scripture: 'And whoever receives one such child in my name receives me. (Matthew 18:5)'
    },
    {
      day: 3,
      title: 'Day 3 - Love and Sacrifice',
      content: [
        'Sweet St. Thérèse, you understood that love is proven by sacrifice. You wrote: "Love proves itself by deeds, so how am I to show my love? Great deeds are forbidden me. The only way I can prove my love is by scattering flowers and these flowers are every little sacrifice, every glance and word, and the doing of the least actions for love."',
        '',
        'Help me to offer small sacrifices throughout the day as flowers of love for Jesus. Teach me to see every act of service, every moment of patience, every kind word as an opportunity to show my love for God.',
        '',
        'Intercede for me that I may transform even the smallest actions into acts of love through pure intention.'
      ],
      prayer: 'St. Thérèse, help us to scatter flowers of love through small sacrifices.',
      reflection: 'What small sacrifices can I offer today as flowers of love for Jesus?',
      scripture: 'And if I have prophetic powers, and understand all mysteries and all knowledge, and if I have all faith, so as to remove mountains, but have not love, I am nothing. (1 Corinthians 13:2)'
    },
    {
      day: 4,
      title: 'Day 4 - Confidence in Prayer',
      content: [
        'Beloved St. Thérèse, you had such confidence in prayer that you promised to spend your heaven doing good on earth, letting fall a shower of roses. You said: "I will spend my heaven in doing good on earth."',
        '',
        'Increase my confidence in prayer, knowing that God desires to answer our petitions for what is truly good for us. Help me to pray with the persistence and trust of a child asking their loving parent.',
        '',
        'Intercede for me that my prayers may be filled with trust and abandonment to God\'s will, whether He grants my requests or leads me in a different direction.'
      ],
      prayer: 'St. Thérèse, intercede for us with your shower of roses from heaven.',
      reflection: 'How can I pray with greater confidence and trust in God\'s loving response?',
      scripture: 'Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you. (Matthew 7:7)'
    },
    {
      day: 5,
      title: 'Day 5 - Suffering with Joy',
      content: [
        'Dear St. Thérèse, though you were young, you understood the value of suffering united to Christ\'s passion. You wrote: "I will suffer with joy, if I can, all that Jesus wills to send me."',
        '',
        'Help me to accept the crosses and difficulties of life with patience and even joy, knowing that they can be redemptive when united to Christ\'s suffering. Teach me to see suffering as an opportunity to show love for Jesus.',
        '',
        'Intercede for me that I may have the grace to say "yes" to whatever God permits in my life, trusting that He can bring good from all things.'
      ],
      prayer: 'St. Thérèse, help us to embrace our crosses with joy and love.',
      reflection: 'How can I unite my sufferings to Christ\'s passion and offer them for the salvation of souls?',
      scripture: 'Now I rejoice in my sufferings for your sake, and in my flesh I complete what is lacking in Christ\'s afflictions. (Colossians 1:24)'
    },
    {
      day: 6,
      title: 'Day 6 - Missionary Spirit',
      content: [
        'Zealous St. Thérèse, though you lived in a cloistered convent, your heart burned with missionary zeal. You adopted spiritual brothers who were priests and missionaries, supporting them with your prayers and sacrifices.',
        '',
        'Inspire in me a missionary heart that desires the salvation of all souls. Help me to understand that every prayer, every sacrifice, every act of love can contribute to the Church\'s mission of evangelization.',
        '',
        'Intercede for me that I may have a heart as wide as the world, praying and working for the conversion of sinners and the sanctification of priests.'
      ],
      prayer: 'St. Thérèse, patroness of missions, ignite our missionary zeal.',
      reflection: 'How can I participate in the Church\'s mission through prayer, sacrifice, and witness?',
      scripture: 'And he said to them, "Go into all the world and preach the gospel to the whole creation." (Mark 16:15)'
    },
    {
      day: 7,
      title: 'Day 7 - Devotion to the Holy Face',
      content: [
        'Loving St. Thérèse, you had a special devotion to the Holy Face of Jesus, taking the name "of the Holy Face" in religion. You saw in Christ\'s face, especially as it was during His passion, the mystery of God\'s love for humanity.',
        '',
        'Help me to contemplate the face of Jesus with love and compassion, seeing there the depths of God\'s mercy and love. Teach me to make reparation for the sins that continue to wound the Heart of Jesus.',
        '',
        'Intercede for me that I may see the face of Christ in every person I meet, especially in those who are suffering or marginalized.'
      ],
      prayer: 'St. Thérèse of the Holy Face, help us to contemplate Jesus with love.',
      reflection: 'How can I see the face of Christ in others, especially those who are difficult to love?',
      scripture: 'And we all, with unveiled face, beholding the glory of the Lord, are being changed into his likeness from one degree of glory to another. (2 Corinthians 3:18)'
    },
    {
      day: 8,
      title: 'Day 8 - Abandonment to Divine Mercy',
      content: [
        'Trusting St. Thérèse, you wrote: "What I understand by the flight of the eagle is the upward soaring of the soul towards God. My soul feels this longing for God." Your great secret was complete abandonment to God\'s merciful love.',
        '',
        'Teach me the art of spiritual abandonment, surrendering all my fears, anxieties, and desires into God\'s loving hands. Help me to believe deeply in His mercy and to trust that He will take care of everything.',
        '',
        'Intercede for me that I may abandon myself to Divine Mercy with the same confidence you showed, knowing that God\'s love will never disappoint those who trust in Him.'
      ],
      prayer: 'St. Thérèse, teach us perfect abandonment to Divine Mercy.',
      reflection: 'What fears or worries do I need to surrender more completely to God\'s mercy?',
      scripture: 'Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble. (Matthew 6:34)'
    },
    {
      day: 9,
      title: 'Day 9 - The Shower of Roses',
      content: [
        'Dear St. Thérèse, you promised: "After my death, I will let fall a shower of roses. I will spend my heaven doing good on earth." You continue to intercede for us from your place in heaven.',
        '',
        'As we conclude this novena, we ask for your powerful intercession for all our needs, especially [mention your intentions here]. Send us your promised shower of roses as signs of your prayer and God\'s love.',
        '',
        'Help us to continue living the "little way" you taught us, growing in trust, simplicity, and love until we join you in heaven to praise God forever.'
      ],
      prayer: 'St. Thérèse, let fall upon us your promised shower of roses.',
      reflection: 'How will I continue to live the "little way" of spiritual childhood in my daily life?',
      scripture: 'Come to me, all who labor and are heavy laden, and I will give you rest. Take my yoke upon you, and learn from me; for I am gentle and lowly in heart, and you will find rest for your souls. (Matthew 11:28-29)'
    }
  ],
  'st-jude': [
    {
      day: 1,
      title: 'Day 1 - Hope in Desperate Situations',
      content: [
        'O most holy apostle, St. Jude, faithful servant and friend of Jesus, the Church honors and invokes you universally as the patron of hopeless cases, of things almost despaired of.',
        '',
        'Pray for me, I am so helpless and alone. Intercede with God for me that He bring visible and speedy help where help is almost despaired of. Come to my assistance in this great need that I may receive the consolation and help of heaven in all my necessities, tribulations, and sufferings.',
        '',
        'Help me to remember that no situation is truly hopeless when we turn to God with faith and trust in His providence.'
      ],
      prayer: 'St. Jude, patron of hopeless cases, pray for us who have recourse to you.',
      reflection: 'What situation in my life seems hopeless? How can I surrender it to God with greater trust?',
      scripture: 'Is anything too hard for the Lord? (Genesis 18:14)'
    },
    {
      day: 2,
      title: 'Day 2 - Faith in God\'s Providence',
      content: [
        'Glorious St. Jude, you who were chosen by Jesus to be one of His twelve apostles, increase my faith in God\'s providence. Help me to trust that God has a plan for my life, even when I cannot see the way forward.',
        '',
        'Intercede for me that I may have unwavering faith in God\'s goodness, even in times of trial and uncertainty. Teach me to see every difficulty as an opportunity to grow in trust and dependence on the Lord.',
        '',
        'Help me to remember that God\'s ways are not our ways, and His thoughts are higher than our thoughts.'
      ],
      prayer: 'St. Jude, apostle of faith, strengthen our trust in God\'s providence.',
      reflection: 'How can I grow in faith and trust, especially when God\'s plan is unclear to me?',
      scripture: 'For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord. (Isaiah 55:8)'
    },
    {
      day: 3,
      title: 'Day 3 - Perseverance in Prayer',
      content: [
        'Faithful St. Jude, you who remained loyal to Christ even unto death, teach me perseverance in prayer. Help me to continue praying even when my prayers seem unanswered or when I am tempted to give up.',
        '',
        'Intercede for me that I may have the grace to pray with persistence and patience, knowing that God hears every prayer and answers in His own perfect time and way.',
        '',
        'Strengthen my resolve to keep praying for those intentions that seem impossible, trusting in the power of persistent prayer.'
      ],
      prayer: 'St. Jude, help us to persevere in prayer with unwavering hope.',
      reflection: 'For what intentions do I need to pray with greater persistence and patience?',
      scripture: 'And he told them a parable to the effect that they ought always to pray and not lose heart. (Luke 18:1)'
    },
    {
      day: 4,
      title: 'Day 4 - Strength in Suffering',
      content: [
        'Courageous St. Jude, you who witnessed Christ\'s passion and understood the redemptive power of suffering, help me to find strength in my own trials and sufferings.',
        '',
        'Intercede for me that I may unite my sufferings to those of Christ, offering them for the salvation of souls and my own purification. Help me to see that suffering, when accepted with faith, can be a source of grace.',
        '',
        'Grant me the courage to face my difficulties with patience and the wisdom to learn from every trial.'
      ],
      prayer: 'St. Jude, give us strength to bear our crosses with faith and hope.',
      reflection: 'How can I unite my sufferings to Christ\'s passion and find meaning in my trials?',
      scripture: 'Now I rejoice in my sufferings for your sake, and in my flesh I complete what is lacking in Christ\'s afflictions. (Colossians 1:24)'
    },
    {
      day: 5,
      title: 'Day 5 - Help for the Desperate',
      content: [
        'Compassionate St. Jude, you who are known as the saint of desperate cases and lost causes, look with mercy upon all who are in desperate need. Your intercession has brought hope to countless souls in their darkest hours.',
        '',
        'I place my desperate situation before you, trusting in your powerful intercession. Help me to find solutions where none seem possible, and to discover hope where despair threatens to overwhelm me.',
        '',
        'Intercede especially for all those who have no one else to turn to, that they may find in you a faithful advocate and friend.'
      ],
      prayer: 'St. Jude, helper of the desperate, intercede for all who have lost hope.',
      reflection: 'How can I be a source of hope for others who are struggling with desperate situations?',
      scripture: 'The Lord is near to the brokenhearted and saves the crushed in spirit. (Psalm 34:18)'
    },
    {
      day: 6,
      title: 'Day 6 - Courage to Witness',
      content: [
        'Brave St. Jude, you who preached the Gospel fearlessly despite persecution and opposition, give me courage to witness to my faith. Help me to speak the truth with love, even when it is difficult or unpopular.',
        '',
        'Intercede for me that I may have the courage to live my faith authentically, serving as a light in the darkness for those around me. Help me to be bold in proclaiming God\'s love and mercy.',
        '',
        'Grant me the wisdom to know when to speak and when to remain silent, always acting out of love for God and neighbor.'
      ],
      prayer: 'St. Jude, give us courage to witness to our faith with boldness and love.',
      reflection: 'How can I be a better witness to my faith in my daily life and relationships?',
      scripture: 'But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses. (Acts 1:8)'
    },
    {
      day: 7,
      title: 'Day 7 - Devotion to Jesus Christ',
      content: [
        'Devoted St. Jude, you who loved Jesus with all your heart and followed Him faithfully to the end, deepen my love for our Lord. Help me to know Jesus more intimately and to love Him more ardently.',
        '',
        'Intercede for me that I may grow in devotion to the Sacred Heart of Jesus, finding in His love the strength and consolation I need for my journey. Help me to make Jesus the center of my life.',
        '',
        'Grant me the grace to imitate your loyalty and dedication, never turning away from Christ no matter what difficulties I may face.'
      ],
      prayer: 'St. Jude, increase our love and devotion to Jesus Christ.',
      reflection: 'How can I deepen my relationship with Jesus and make Him more central to my life?',
      scripture: 'As the Father has loved me, so have I loved you. Abide in my love. (John 15:9)'
    },
    {
      day: 8,
      title: 'Day 8 - Intercession for Others',
      content: [
        'Charitable St. Jude, you who continue to intercede from heaven for all who call upon you, teach me to pray for others with the same compassion you show. Help me to be generous in my prayers for those in need.',
        '',
        'Intercede for me that I may have a heart like yours, always ready to help those who are suffering or in distress. Help me to see prayer as a powerful way to serve my neighbor.',
        '',
        'Grant me the grace to remember in prayer all those who have no one to pray for them, especially the forgotten and abandoned.'
      ],
      prayer: 'St. Jude, teach us to intercede for others with compassionate hearts.',
      reflection: 'Who in my life needs my prayers most urgently? How can I be more faithful in praying for others?',
      scripture: 'I urge that supplications, prayers, intercessions, and thanksgivings be made for all people. (1 Timothy 2:1)'
    },
    {
      day: 9,
      title: 'Day 9 - Gratitude and Trust',
      content: [
        'Glorious St. Jude, as we conclude this novena, we thank you for your powerful intercession and your example of faithfulness. Help us to live with grateful hearts, recognizing God\'s blessings even in difficult times.',
        '',
        'We entrust to your care all our intentions, especially those that seem impossible or hopeless. Continue to intercede for us that we may grow in faith, hope, and love.',
        '',
        'Grant us the grace to trust completely in God\'s providence, knowing that He will provide for all our needs according to His perfect will. May we never cease to hope in His mercy and love.'
      ],
      prayer: 'St. Jude, we thank you for your intercession and trust in your continued prayers for us.',
      reflection: 'How can I live with greater gratitude and continue to grow in hope and trust?',
      scripture: 'May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope. (Romans 15:13)'
    }
  ],
  'st-anthony': [
    {
      day: 1,
      title: 'Day 1 - Finding What is Lost',
      content: [
        'O wonderful St. Anthony, glorious on account of the fame of your miracles, and through the condescension of Jesus in coming in the form of a little child to rest in your arms, obtain for me of His bounty the grace I yearn for so ardently.',
        '',
        'You who were so successful in finding lost and stolen things, help me to find what I have lost - not just material possessions, but perhaps my way in life, my peace of mind, or my fervor in faith.',
        '',
        'Intercede for me that I may recover what is truly important and that I may always trust in God\'s providence, knowing that He knows what I need before I ask.'
      ],
      prayer: 'St. Anthony, finder of lost things, help us to seek and find what is truly important.',
      reflection: 'What have I lost in my spiritual life that I need St. Anthony\'s help to recover?',
      scripture: 'What woman, having ten silver coins, if she loses one coin, does not light a lamp and sweep the house and seek diligently until she finds it? (Luke 15:8)'
    },
    {
      day: 2,
      title: 'Day 2 - Devotion to the Child Jesus',
      content: [
        'Blessed St. Anthony, you who experienced the wonderful privilege of holding the Child Jesus in your arms, help me to grow in love and devotion to our Lord. Your vision of the Christ Child reminds us of the humility and simplicity of God\'s love.',
        '',
        'Teach me to approach Jesus with childlike trust and wonder. Help me to see Him not as distant and unreachable, but as close and accessible, desiring to dwell in my heart as He did in your arms.',
        '',
        'Intercede for me that I may cultivate a tender devotion to Jesus, especially as He is present in the Blessed Sacrament.'
      ],
      prayer: 'St. Anthony, help us to embrace the Child Jesus with love and devotion.',
      reflection: 'How can I approach Jesus with greater childlike trust and simplicity?',
      scripture: 'And he took a child and put him in the midst of them, and taking him in his arms, he said to them, "Whoever receives one such child in my name receives me." (Mark 9:36-37)'
    },
    {
      day: 3,
      title: 'Day 3 - Wisdom and Preaching',
      content: [
        'Eloquent St. Anthony, Doctor of the Church, you who preached with such wisdom and power that even the fish came to listen when people would not, grant me wisdom in my words and actions.',
        '',
        'Help me to speak truth with love and to share the Gospel through my life as well as my words. Give me the courage to proclaim God\'s message when needed and the wisdom to know when silence is more appropriate.',
        '',
        'Intercede for me that my life may be a sermon of love, drawing others closer to God through the example of Christian living.'
      ],
      prayer: 'St. Anthony, Doctor of the Church, grant us wisdom in word and deed.',
      reflection: 'How can I better proclaim the Gospel through my words and actions?',
      scripture: 'And they were astonished at his teaching, for his word possessed authority. (Luke 4:32)'
    },
    {
      day: 4,
      title: 'Day 4 - Poverty and Simplicity',
      content: [
        'Poor St. Anthony, you who embraced the Franciscan life of poverty and simplicity, teach me to value spiritual riches over material possessions. Help me to find contentment in what I have and to share generously with those in need.',
        '',
        'Free me from excessive attachment to worldly things that can distract me from seeking first the kingdom of God. Help me to see that true wealth consists in loving and being loved by God.',
        '',
        'Intercede for me that I may live simply and humbly, finding joy in the essential things of life and in service to others.'
      ],
      prayer: 'St. Anthony, teach us the joy of simplicity and spiritual poverty.',
      reflection: 'What material attachments do I need to let go of to grow in spiritual freedom?',
      scripture: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven. (Matthew 5:3)'
    },
    {
      day: 5,
      title: 'Day 5 - Humility and Obedience',
      content: [
        'Humble St. Anthony, you who submitted yourself obediently to God\'s will and to your superiors, teach me true humility. Help me to recognize that all good comes from God and that I am called to serve, not to be served.',
        '',
        'Grant me the grace to accept correction with humility and to obey God\'s commandments with a willing heart. Help me to see obedience not as restriction but as freedom to do God\'s will.',
        '',
        'Intercede for me that I may follow your example of humble service, seeking to please God rather than seeking human praise.'
      ],
      prayer: 'St. Anthony, model of humility, teach us to serve God with humble hearts.',
      reflection: 'How can I grow in humility and obedience to God\'s will in my daily life?',
      scripture: 'Take my yoke upon you, and learn from me, for I am gentle and humble in heart. (Matthew 11:29)'
    },
    {
      day: 6,
      title: 'Day 6 - Miraculous Power',
      content: [
        'Miraculous St. Anthony, through your intercession God has worked countless wonders for those who call upon you with faith. Your miracles continue to bring hope to the afflicted and strengthen the faith of believers.',
        '',
        'I place before you my needs and the needs of those I love, trusting in your powerful intercession. Help me to have faith that God can work miracles in my life when it is according to His will.',
        '',
        'Intercede for me that I may be open to God\'s miraculous grace working in ordinary ways, and that I may recognize His blessings even when they come in unexpected forms.'
      ],
      prayer: 'St. Anthony, worker of miracles, intercede for us in our needs.',
      reflection: 'What miracle do I need in my life, and how can I trust more deeply in God\'s power?',
      scripture: 'And Jesus answered them, "Truly, I say to you, if you have faith and do not doubt... nothing will be impossible for you." (Matthew 21:21)'
    },
    {
      day: 7,
      title: 'Day 7 - Love for the Poor',
      content: [
        'Charitable St. Anthony, you who had great love for the poor and marginalized, open my heart to see Christ in those who are suffering. Help me to respond to the needs of others with generous compassion.',
        '',
        'Teach me to give not just from my abundance but from my substance, sharing what I have with those who have less. Help me to see that in serving the poor, I am serving Christ Himself.',
        '',
        'Intercede for me that I may have eyes to see the needy around me and a heart that moves me to action on their behalf.'
      ],
      prayer: 'St. Anthony, friend of the poor, inspire us to serve those in need.',
      reflection: 'How can I better serve the poor and marginalized in my community?',
      scripture: 'Truly, I say to you, as you did it to one of the least of these my brothers, you did it to me. (Matthew 25:40)'
    },
    {
      day: 8,
      title: 'Day 8 - Zeal for Souls',
      content: [
        'Zealous St. Anthony, you who labored tirelessly for the salvation of souls, inspire in me a similar passion for bringing others to know and love God. Help me to see every person as precious in God\'s sight.',
        '',
        'Grant me the wisdom to know how to share my faith appropriately and the courage to live in such a way that others are drawn to Christ through my example.',
        '',
        'Intercede for me that I may be an instrument of God\'s grace in the lives of others, helping to lead them to eternal salvation through prayer, witness, and loving service.'
      ],
      prayer: 'St. Anthony, zealous apostle, inspire us to work for the salvation of souls.',
      reflection: 'How can I be more effective in sharing God\'s love and drawing others to faith?',
      scripture: 'And he said to them, "Go into all the world and proclaim the gospel to the whole creation." (Mark 16:15)'
    },
    {
      day: 9,
      title: 'Day 9 - Eternal Glory',
      content: [
        'Glorious St. Anthony, you who now enjoy the beatific vision and the eternal joy of heaven, help us to keep our eyes fixed on our eternal destination. Remind us that this life is a pilgrimage toward our true home with God.',
        '',
        'As we conclude this novena, we entrust to your intercession all our petitions, especially those we hold most dear in our hearts. Help us to trust in God\'s perfect will, knowing that He desires our ultimate happiness.',
        '',
        'Intercede for us that we may persevere in faith until the end of our lives and join you in the eternal praise of the Trinity. May your example inspire us to live lives worthy of our calling as children of God.'
      ],
      prayer: 'St. Anthony, guide us on our journey to eternal life with God.',
      reflection: 'How can I live each day with eternity in mind, preparing for my eternal home?',
      scripture: 'For here we have no lasting city, but we seek the city that is to come. (Hebrews 13:14)'
    }
  ],
  'blessed-mother': [
    {
      day: 1,
      title: 'Day 1 - Mary, Mother of God',
      content: [
        'Hail Mary, Mother of God, Queen of Heaven and Earth! We honor you as the Mother of our Lord Jesus Christ and our spiritual mother. You who were chosen from all eternity to be the Mother of the Savior, pray for us your children.',
        '',
        'Help us to understand the great dignity that God has given to you and through you to all humanity. Teach us to honor you as our mother while always glorifying your Son, Jesus.',
        '',
        'Intercede for us that we may grow in appreciation for the mystery of the Incarnation and the role you played in our salvation.'
      ],
      prayer: 'Hail Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
      reflection: 'How can I honor Mary as my spiritual mother while keeping Jesus at the center of my devotion?',
      scripture: 'And the angel said to her, "Do not be afraid, Mary, for you have found favor with God. And behold, you will conceive in your womb and bear a son, and you shall call his name Jesus." (Luke 1:30-31)'
    },
    {
      day: 2,
      title: 'Day 2 - Mary\'s Faith and Trust',
      content: [
        'Blessed Mary, woman of faith, you believed the angel\'s word even when it seemed impossible. Your "yes" to God changed the course of human history and opened the way for our salvation.',
        '',
        'Teach us to have faith like yours - unwavering trust in God\'s promises even when we cannot understand His plan. Help us to say "yes" to God\'s will in our own lives with the same generous heart.',
        '',
        'Intercede for us that our faith may be strong in times of trial and that we may always trust in God\'s loving providence.'
      ],
      prayer: 'Mary, woman of faith, increase our trust in God\'s promises.',
      reflection: 'What is God asking of me that requires greater faith and trust? How can I say "yes" like Mary?',
      scripture: 'And Mary said, "Behold, I am the handmaid of the Lord; let it be to me according to your word." (Luke 1:38)'
    },
    {
      day: 3,
      title: 'Day 3 - Mary\'s Joy and Praise',
      content: [
        'Joyful Mary, you who proclaimed the Magnificat with a heart full of praise for God\'s goodness, teach us to recognize God\'s blessings in our lives and to respond with grateful hearts.',
        '',
        'Help us to find joy even in difficult circumstances, knowing that God is working all things for our good. Teach us to praise God not just when things go well, but in all seasons of life.',
        '',
        'Intercede for us that we may have hearts like yours, always ready to magnify the Lord and rejoice in God our Savior.'
      ],
      prayer: 'Mary, cause of our joy, teach us to praise God with grateful hearts.',
      reflection: 'How can I cultivate a spirit of joy and gratitude like Mary\'s, especially during challenging times?',
      scripture: 'And Mary said, "My soul magnifies the Lord, and my spirit rejoices in God my Savior." (Luke 1:46-47)'
    },
    {
      day: 4,
      title: 'Day 4 - Mary at the Nativity',
      content: [
        'Tender Mary, you who gave birth to our Savior in the humble stable of Bethlehem, help us to find God in the simple and ordinary moments of life. You welcomed the shepherds and treasured the angel\'s message in your heart.',
        '',
        'Teach us to be like you - pondering God\'s works in our hearts and finding wonder in His presence among us. Help us to welcome Christ into our lives with the same love and care you showed.',
        '',
        'Intercede for us that we may recognize Christ\'s presence in our daily lives and respond with open and loving hearts.'
      ],
      prayer: 'Mary, Mother of the Word made flesh, help us to welcome Jesus into our hearts.',
      reflection: 'How can I better recognize and welcome Christ\'s presence in the ordinary moments of my life?',
      scripture: 'But Mary treasured up all these things, pondering them in her heart. (Luke 2:19)'
    },
    {
      day: 5,
      title: 'Day 5 - Mary at the Cross',
      content: [
        'Sorrowful Mary, you who stood beneath the cross watching your Son suffer and die for our sins, teach us how to unite our sufferings to His. Your heart was pierced with sorrow, yet you remained faithful to the end.',
        '',
        'Help us to see that suffering, when accepted with faith, can be redemptive. Teach us to stand by our loved ones in their trials just as you stood by Jesus in His passion.',
        '',
        'Intercede for us that we may have courage in times of suffering and that our pain may be united to Christ\'s for the salvation of souls.'
      ],
      prayer: 'Mary, Mother of Sorrows, help us to unite our sufferings to those of Jesus.',
      reflection: 'How can I unite my sufferings to Christ\'s passion and support others who are suffering?',
      scripture: 'When Jesus saw his mother and the disciple whom he loved standing nearby, he said to his mother, "Woman, behold, your son!" (John 19:26)'
    },
    {
      day: 6,
      title: 'Day 6 - Mary, Mother of the Church',
      content: [
        'Loving Mary, after Jesus entrusted you to John and John to you, you became the mother of all believers. You were present with the apostles at Pentecost, supporting the infant Church with your prayers.',
        '',
        'Be our mother too, guiding us in our journey of faith. Help us to be faithful members of the Church, supporting one another in love and growing together in holiness.',
        '',
        'Intercede for us that the Church may be strong and united, and that all Christians may work together for the spread of the Gospel.'
      ],
      prayer: 'Mary, Mother of the Church, guide us in our life of faith.',
      reflection: 'How can I be a better member of the Church community and support my fellow believers?',
      scripture: 'All these with one accord were devoting themselves to prayer, together with the women and Mary the mother of Jesus, and his brothers. (Acts 1:14)'
    },
    {
      day: 7,
      title: 'Day 7 - Mary, Our Intercessor',
      content: [
        'Compassionate Mary, you who noticed the wine had run out at the wedding in Cana and brought the need to Jesus, continue to intercede for us in all our necessities. You know what we need before we ask.',
        '',
        'Bring our prayers to your Son and ask Him to provide for our spiritual and temporal needs. Help us to trust that you will always lead us to Jesus and that He will listen to your motherly intercession.',
        '',
        'Intercede for us in all our needs, especially those we carry most deeply in our hearts.'
      ],
      prayer: 'Mary, our Mother and Intercessor, bring our needs to Jesus.',
      reflection: 'What needs do I want to entrust to Mary\'s intercession? How can she help me draw closer to Jesus?',
      scripture: 'His mother said to the servants, "Do whatever he tells you." (John 2:5)'
    },
    {
      day: 8,
      title: 'Day 8 - Mary, Queen of Peace',
      content: [
        'Peaceful Mary, Queen of Peace, you who bring the peace of Christ to troubled hearts and to our troubled world, help us to be peacemakers in our families and communities.',
        '',
        'Teach us to forgive those who have hurt us and to seek reconciliation where there is division. Help us to approach conflicts with your gentleness and wisdom.',
        '',
        'Intercede for peace in our world, that nations may live in harmony and that the Prince of Peace may reign in every heart.'
      ],
      prayer: 'Mary, Queen of Peace, bring Christ\'s peace to our hearts and our world.',
      reflection: 'How can I be a better peacemaker in my relationships and community? Where do I need to forgive?',
      scripture: 'Blessed are the peacemakers, for they shall be called sons of God. (Matthew 5:9)'
    },
    {
      day: 9,
      title: 'Day 9 - Mary, Our Hope of Heaven',
      content: [
        'Glorious Mary, you who were assumed body and soul into heaven, you are our hope and our model of what awaits all the faithful. You show us that death is not the end but the beginning of eternal life with God.',
        '',
        'Help us to live each day with heaven as our goal, making choices that draw us closer to eternal life. Intercede for us at the hour of our death that we may die in friendship with God.',
        '',
        'As we conclude this novena, we entrust all our intentions to your maternal care. Continue to watch over us and guide us until we join you in the eternal kingdom of your Son.'
      ],
      prayer: 'Mary, assumed into heaven, guide us on our journey to eternal life.',
      reflection: 'How can I live each day with eternity in mind? What do I need to change to grow in holiness?',
      scripture: 'And a great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars. (Revelation 12:1)'
    }
  ],
  'holy-spirit': [
    {
      day: 1,
      title: 'Day 1 - Come, Holy Spirit',
      content: [
        'Come, Holy Spirit, fill the hearts of Your faithful and kindle in them the fire of Your love. Send forth Your Spirit and they shall be created, and You shall renew the face of the earth.',
        '',
        'Divine Spirit, Third Person of the Blessed Trinity, we invoke Your presence in our lives. You who proceeded from the Father and the Son, come to dwell within us and transform us by Your grace.',
        '',
        'We ask for the grace to be open to Your inspirations and to follow Your guidance in all things. Help us to recognize Your presence in our daily lives and to respond with faith and obedience.'
      ],
      prayer: 'Come, Holy Spirit, Creator blest, and in our hearts take up Your rest.',
      reflection: 'How can I be more open to the Holy Spirit\'s presence and guidance in my daily life?',
      scripture: 'And I will ask the Father, and he will give you another Helper, to be with you forever. (John 14:16)'
    },
    {
      day: 2,
      title: 'Day 2 - The Gift of Wisdom',
      content: [
        'Holy Spirit, source of all wisdom, grant us the gift of wisdom that we may see all things in the light of eternity. Help us to understand the deeper meaning of life and to make decisions that lead us closer to God.',
        '',
        'This gift enables us to judge all things according to divine truth and to see creation as God sees it. Give us wisdom to discern between good and evil, truth and falsehood.',
        '',
        'Help us to seek first the kingdom of God, knowing that all other things will be added unto us according to our need.'
      ],
      prayer: 'Holy Spirit, grant us the gift of wisdom to see all things in Your light.',
      reflection: 'How can I seek God\'s wisdom in the decisions I need to make? What situations need divine insight?',
      scripture: 'If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him. (James 1:5)'
    },
    {
      day: 3,
      title: 'Day 3 - The Gift of Understanding',
      content: [
        'Holy Spirit, giver of understanding, illuminate our minds that we may comprehend the truths of faith more deeply. Help us to understand not just with our intellect but with our hearts the mysteries of God.',
        '',
        'Grant us the ability to see beyond the surface of things to their spiritual significance. Help us to understand the Scriptures, the teachings of the Church, and the workings of divine grace in our lives.',
        '',
        'Give us understanding hearts that can empathize with others and see Christ in every person we encounter.'
      ],
      prayer: 'Holy Spirit, grant us understanding to comprehend Your truth and love.',
      reflection: 'What aspects of my faith do I need greater understanding of? How can I grow in empathy for others?',
      scripture: 'Then he opened their minds to understand the Scriptures. (Luke 24:45)'
    },
    {
      day: 4,
      title: 'Day 4 - The Gift of Counsel',
      content: [
        'Holy Spirit, divine counselor, guide us in our choices and decisions. When we face difficult situations or moral dilemmas, be our guide and show us the right path to take.',
        '',
        'Help us to seek good advice from wise and holy people, but ultimately to rely on Your guidance. Give us the ability to counsel others with wisdom and compassion when they turn to us for help.',
        '',
        'Grant us the grace to pause and pray before making important decisions, always seeking to do what pleases God.'
      ],
      prayer: 'Holy Spirit, our Counselor, guide us in all our decisions and choices.',
      reflection: 'What decisions do I need divine guidance for? How can I be a better counselor to others who seek my advice?',
      scripture: 'But the Helper, the Holy Spirit, whom the Father will send in my name, he will teach you all things. (John 14:26)'
    },
    {
      day: 5,
      title: 'Day 5 - The Gift of Fortitude',
      content: [
        'Holy Spirit, source of strength, grant us the gift of fortitude to persevere in doing good even when it is difficult. Give us courage to stand up for what is right and to remain faithful to our convictions.',
        '',
        'Strengthen us in times of trial, suffering, and persecution. Help us to bear our crosses with patience and to support others who are struggling with their burdens.',
        '',
        'Grant us the spiritual strength to resist temptation and to choose the narrow path that leads to eternal life, even when the wide road seems more appealing.'
      ],
      prayer: 'Holy Spirit, grant us fortitude to persevere in doing good despite all difficulties.',
      reflection: 'Where do I need greater courage and strength in my spiritual life? How can I support others who are struggling?',
      scripture: 'But you will receive power when the Holy Spirit has come upon you. (Acts 1:8)'
    },
    {
      day: 6,
      title: 'Day 6 - The Gift of Knowledge',
      content: [
        'Holy Spirit, teacher of truth, grant us the gift of knowledge that we may know ourselves as God knows us and see creation as it truly is in relation to God.',
        '',
        'Help us to distinguish between what is eternal and what is temporary, what is essential and what is superficial. Give us knowledge of our own strengths and weaknesses so that we may grow in humility and self-understanding.',
        '',
        'Grant us the knowledge to recognize God\'s hand in all the events of our lives, both joyful and sorrowful, and to learn from every experience.'
      ],
      prayer: 'Holy Spirit, grant us true knowledge of ourselves and of Your ways.',
      reflection: 'What do I need to know better about myself and my relationship with God? How can I see His hand in my life?',
      scripture: 'And this is eternal life, that they know you, the only true God, and Jesus Christ whom you have sent. (John 17:3)'
    },
    {
      day: 7,
      title: 'Day 7 - The Gift of Piety',
      content: [
        'Holy Spirit, source of all devotion, grant us the gift of piety that we may worship God with reverence and love. Help us to approach prayer, Mass, and the sacraments with hearts full of faith and devotion.',
        '',
        'Increase our love for God and our desire to spend time in His presence. Help us to find joy in prayer, in reading Scripture, and in all the spiritual practices that draw us closer to You.',
        '',
        'Grant us piety that extends to our relationships with others, treating all people with the respect due to children of God.'
      ],
      prayer: 'Holy Spirit, fill us with piety and devotion in our worship and service.',
      reflection: 'How can I approach prayer and worship with greater reverence and love? How can I show greater respect for others?',
      scripture: 'But the hour is coming, and is now here, when the true worshipers will worship the Father in spirit and truth. (John 4:23)'
    },
    {
      day: 8,
      title: 'Day 8 - The Gift of Fear of the Lord',
      content: [
        'Holy Spirit, source of holy fear, grant us the gift of fear of the Lord - not a servile fear, but a reverent awe and wonder at God\'s majesty and holiness. Help us to understand our place as creatures before our Creator.',
        '',
        'This gift helps us to avoid sin not just because of punishment, but because sin offends our loving God. Give us a deep appreciation for God\'s holiness and our call to be holy as He is holy.',
        '',
        'Help us to live with reverence and gratitude, always mindful that we are in the presence of the all-holy God who loves us beyond measure.'
      ],
      prayer: 'Holy Spirit, grant us holy fear and reverent awe before God\'s majesty.',
      reflection: 'How can I cultivate greater reverence for God\'s holiness? What helps me avoid sin out of love rather than fear?',
      scripture: 'The fear of the Lord is the beginning of wisdom, and the knowledge of the Holy One is insight. (Proverbs 9:10)'
    },
    {
      day: 9,
      title: 'Day 9 - The Fruits of the Spirit',
      content: [
        'Holy Spirit, as we conclude this novena, we ask that You produce in us the fruits of Your presence: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.',
        '',
        'Transform our lives so that others may see Christ in us through these fruits. Help us to be instruments of Your peace and love in our families, communities, and world.',
        '',
        'We entrust all our intentions to Your care, asking that You continue to guide, protect, and sanctify us. Come, Holy Spirit, and renew the face of the earth, beginning with our own hearts.'
      ],
      prayer: 'Come, Holy Spirit, fill us with Your gifts and produce in us the fruits of holiness.',
      reflection: 'Which fruits of the Spirit do I need to cultivate more in my life? How can I be a better witness to others?',
      scripture: 'But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control. (Galatians 5:22-23)'
    }
  ]
};