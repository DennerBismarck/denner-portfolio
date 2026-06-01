type L = { pt: string; en: string }
export const interests: { icon: string; title: L; items: { pt: string[]; en: string[] } }[] = [
  {
    icon: 'Music',
    title: { pt: 'Música', en: 'Music' },
    items: {
      pt: ['Trompetista', 'Rock no sangue', 'Ghost & Disturbed'],
      en: ['Trumpet player', 'Rock at heart', 'Ghost & Disturbed'],
    },
  },
  {
    icon: 'Gamepad2',
    title: { pt: 'Games', en: 'Games' },
    items: {
      pt: ['Zelda: Breath of the Wild', 'Mundos abertos', 'Exploração'],
      en: ['Zelda: Breath of the Wild', 'Open worlds', 'Exploration'],
    },
  },
  {
    icon: 'Bot',
    title: { pt: 'Geek & Mechs', en: 'Geek & Mechs' },
    items: {
      pt: ['Homem-Aranha', 'Dragon Ball', 'Gundam: Iron-Blooded Orphans', 'Robôs gigantes'],
      en: ['Spider-Man', 'Dragon Ball', 'Gundam: Iron-Blooded Orphans', 'Giant robots'],
    },
  },
]
