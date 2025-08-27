import { MysteryType, NovenaPhase } from '../types';
import { MYSTERY_DESCRIPTIONS, DECADE_PRAYERS } from '../constants/novena';

export const getOpeningPrayer = (mystery: MysteryType, phase: NovenaPhase): string => {
  const isPetition = phase === 'petition';
  const baseStart = isPetition 
    ? "Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I humbly kneel to offer thee a Crown of Roses"
    : "Hail, Queen of the Most Holy Rosary, my Mother Mary, hail! At thy feet I gratefully kneel to offer thee a Crown of Roses";

  const baseEnd = isPetition
    ? ", each rose recalling to thee a holy mystery, each 10 bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my petition; from thy bounty thou wilt give me the favor I so earnestly and trustingly seek. I despair of nothing that I ask of thee. Show thyself my Mother!"
    : ", each rose recalling to thee a holy mystery; each ten bound together with my petition for a particular grace. O Holy Queen, dispenser of God's graces, and Mother of all who invoke thee! Thou canst not look upon my gift and fail to see its binding. As thou receivest my gift, so wilt thou receive my thanksgiving; from thy bounty thou hast given me the favor I so earnestly and trustingly sought. I despaired not of what I asked of thee, and thou hast truly shown thyself my Mother.";

  return `${baseStart}, ${MYSTERY_DESCRIPTIONS[mystery]}${baseEnd}`;
};

export const getClosingPrayer = (phase: NovenaPhase): string => {
  return phase === 'petition'
    ? "Sweet Mother Mary, I offer thee this spiritual communion to bind my bouquets in a wreath to place upon thy brow. O my Mother! Look with favor upon my gift, and in thy love obtain for me my request."
    : "Sweet Mother Mary, I offer thee this Spiritual Communion to bind my bouquets in a wreath to place upon thy brow in thanksgiving for my request which thou in thy love hast obtained for me.";
};

export const getDecadePrayers = (mystery: MysteryType): readonly string[] => {
  return DECADE_PRAYERS[mystery];
};