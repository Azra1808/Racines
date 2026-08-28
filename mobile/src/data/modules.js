// Contenu officiel — 10 unités pédagogiques extraites du Guide du programme
// de parentalité positive (UNICEF Cameroun), validées Sprint 0 (T-009/T-010).
// Traçabilité : chaque unité référence son module et ses pages d'origine.
//
// Structure pédagogique : chaque module (MODULES) se compose de 4 sous-modules
// (sousModules) de 5 questions chacun. Une fois les 4 sous-modules terminés,
// un bilan récapitulatif de 20 questions (les 4 x 5 réunies, champ "quiz")
// permet de valider l'ensemble du module.
//
// Les icônes associées aux pictogrammes sont rendues par le composant
// <PictoIcon name="..." /> (src/components/icons/PictoIcon.js) — il n'y a
// plus d'émojis dans le contenu pédagogique.

export const SOUSMODULE_LABELS = [
  "Découvrir",
  "Comprendre",
  "Approfondir",
  "Retenir"
];

export const MODULES = [
  {
    "id": "u01-voir-enfant-autrement",
    "moduleOrigine": "Module 1 — La perception de l'enfance (p.16-24)",
    "titre": "Voir son enfant autrement",
    "thematique": "Perception et droits de l'enfant",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Chaque enfant, même en situation de handicap, mérite amour et respect sans discrimination. La loi camerounaise protège tous les enfants de moins de 18 ans.",
    "scriptAudioIvr": "Nos souvenirs d'enfance influencent la façon dont nous voyons nos propres enfants. Selon la loi, un enfant est toute personne de moins de 18 ans, sans exception. Un enfant vivant avec un handicap a les mêmes droits et le même potentiel que les autres. Ne le cachez pas, ne le surprotégez pas : écoutez-le, valorisez-le, et laissez-le s'épanouir comme les autres enfants de la famille.",
    "corpsApp": "Nos propres valeurs et souvenirs d'enfance influencent la manière dont nous regardons nos enfants aujourd'hui. Selon la Convention relative aux droits de l'enfant, un enfant est toute personne âgée de moins de 18 ans — sans distinction de sexe, d'origine ou de capacités.\n\nLes enfants vivant avec un handicap font souvent l'objet de discrimination, alors qu'ils ont les mêmes droits à l'épanouissement que les autres. Ce qu'il faut éviter : les garder enfermés, les surprotéger, ou les rejeter. Ce qu'il faut faire : les laisser sortir et s'ouvrir aux autres, recueillir leur avis, privilégier une éducation inclusive, encourager leur autonomie.\n\nAimer tous ses enfants sans discrimination, quelles que soient leurs capacités, est la base d'une parentalité positive.",
    "pictogrammes": [
      "cœur",
      "balance",
      "famille",
      "main tendue"
    ],
    "quiz": [
      {
        "question": "Selon la Convention relative aux droits de l'enfant, un enfant est toute personne âgée de :",
        "options": [
          "moins de 15 ans",
          "moins de 18 ans",
          "moins de 21 ans"
        ],
        "correctIndex": 1
      },
      {
        "question": "La définition de l'enfant s'applique-t-elle sans distinction de sexe, d'origine ou de capacités ?",
        "options": [
          "Oui",
          "Non, seulement pour les filles",
          "Non, seulement pour les enfants sans handicap"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que subissent souvent les enfants vivant avec un handicap ?",
        "options": [
          "Une attention particulière justifiée",
          "De la discrimination",
          "Aucun traitement différent"
        ],
        "correctIndex": 1
      },
      {
        "question": "Un enfant en situation de handicap a-t-il les mêmes droits à l'épanouissement que les autres ?",
        "options": [
          "Oui",
          "Non",
          "Seulement à partir de 10 ans"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que faut-il éviter avec un enfant en situation de handicap ?",
        "options": [
          "Le garder enfermé et le surprotéger",
          "L'inscrire à l'école",
          "Recueillir son avis"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que recommande le module de faire avec un enfant en situation de handicap ?",
        "options": [
          "Le rejeter poliment",
          "Le laisser sortir et s'ouvrir aux autres",
          "Le tenir à l'écart des autres enfants"
        ],
        "correctIndex": 1
      },
      {
        "question": "Quel type d'éducation le module encourage-t-il pour un enfant en situation de handicap ?",
        "options": [
          "Une éducation à part",
          "Une éducation inclusive",
          "Pas d'éducation formelle"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module encourage-t-il l'autonomie de l'enfant en situation de handicap ?",
        "options": [
          "Oui",
          "Non",
          "Seulement à l'adolescence"
        ],
        "correctIndex": 0
      },
      {
        "question": "D'où viennent, selon le module, nos façons de regarder nos enfants aujourd'hui ?",
        "options": [
          "De nos propres valeurs et souvenirs d'enfance",
          "Uniquement de la loi",
          "Des réseaux sociaux"
        ],
        "correctIndex": 0
      },
      {
        "question": "Recueillir l'avis d'un enfant en situation de handicap fait-il partie des bonnes pratiques citées ?",
        "options": [
          "Oui",
          "Non",
          "Seulement si l'enfant sait lire"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quelle est la base d'une parentalité positive selon ce module ?",
        "options": [
          "Traiter différemment selon les capacités",
          "Aimer tous ses enfants sans discrimination",
          "Favoriser l'enfant le plus performant"
        ],
        "correctIndex": 1
      },
      {
        "question": "Un bébé de moins de 9 mois est-il concerné par la discrimination liée au handicap dans ce module ?",
        "options": [
          "Ce module ne parle pas spécifiquement d'âge",
          "Oui, uniquement lui",
          "Non, jamais"
        ],
        "correctIndex": 0
      },
      {
        "question": "Peut-on justifier une discrimination envers un enfant par sa capacité physique ?",
        "options": [
          "Oui, parfois",
          "Non, jamais",
          "Seulement en cas de handicap sévère"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module s'appuie sur quel texte de référence pour définir l'enfant ?",
        "options": [
          "La Convention relative aux droits de l'enfant",
          "Le code du travail",
          "Un règlement scolaire"
        ],
        "correctIndex": 0
      },
      {
        "question": "Surprotéger un enfant en situation de handicap est-il présenté comme une bonne pratique ?",
        "options": [
          "Oui",
          "Non",
          "Seulement avant 5 ans"
        ],
        "correctIndex": 1
      },
      {
        "question": "Quel comportement parental est valorisé envers tous les enfants selon ce module ?",
        "options": [
          "L'indifférence",
          "Le respect sans discrimination",
          "La comparaison entre frères et sœurs"
        ],
        "correctIndex": 1
      },
      {
        "question": "L'exclusion sociale d'un enfant handicapé est-elle jugée acceptable par le module ?",
        "options": [
          "Oui, pour le protéger",
          "Non",
          "Seulement en zone rurale"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le potentiel d'épanouissement d'un enfant handicapé est-il présenté comme :",
        "options": [
          "Inférieur aux autres",
          "Égal à celui des autres enfants",
          "Impossible à évaluer"
        ],
        "correctIndex": 1
      },
      {
        "question": "Que signifie concrètement \"ne pas discriminer selon les capacités\" ?",
        "options": [
          "Traiter tous les enfants avec les mêmes droits et le même respect",
          "Donner plus d'attention à l'enfant le plus fort",
          "Ignorer les besoins spécifiques"
        ],
        "correctIndex": 0
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "La nutrition infantile",
          "La perception de l'enfance et les droits de l'enfant",
          "La discipline positive"
        ],
        "correctIndex": 1
      }
    ],
    "sousModules": [
      {
        "id": "u01-voir-enfant-autrement-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "cœur",
        "questions": [
          {
            "question": "Selon la Convention relative aux droits de l'enfant, un enfant est toute personne âgée de :",
            "options": [
              "moins de 15 ans",
              "moins de 18 ans",
              "moins de 21 ans"
            ],
            "correctIndex": 1
          },
          {
            "question": "La définition de l'enfant s'applique-t-elle sans distinction de sexe, d'origine ou de capacités ?",
            "options": [
              "Oui",
              "Non, seulement pour les filles",
              "Non, seulement pour les enfants sans handicap"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que subissent souvent les enfants vivant avec un handicap ?",
            "options": [
              "Une attention particulière justifiée",
              "De la discrimination",
              "Aucun traitement différent"
            ],
            "correctIndex": 1
          },
          {
            "question": "Un enfant en situation de handicap a-t-il les mêmes droits à l'épanouissement que les autres ?",
            "options": [
              "Oui",
              "Non",
              "Seulement à partir de 10 ans"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que faut-il éviter avec un enfant en situation de handicap ?",
            "options": [
              "Le garder enfermé et le surprotéger",
              "L'inscrire à l'école",
              "Recueillir son avis"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u01-voir-enfant-autrement-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "balance",
        "questions": [
          {
            "question": "Que recommande le module de faire avec un enfant en situation de handicap ?",
            "options": [
              "Le rejeter poliment",
              "Le laisser sortir et s'ouvrir aux autres",
              "Le tenir à l'écart des autres enfants"
            ],
            "correctIndex": 1
          },
          {
            "question": "Quel type d'éducation le module encourage-t-il pour un enfant en situation de handicap ?",
            "options": [
              "Une éducation à part",
              "Une éducation inclusive",
              "Pas d'éducation formelle"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le module encourage-t-il l'autonomie de l'enfant en situation de handicap ?",
            "options": [
              "Oui",
              "Non",
              "Seulement à l'adolescence"
            ],
            "correctIndex": 0
          },
          {
            "question": "D'où viennent, selon le module, nos façons de regarder nos enfants aujourd'hui ?",
            "options": [
              "De nos propres valeurs et souvenirs d'enfance",
              "Uniquement de la loi",
              "Des réseaux sociaux"
            ],
            "correctIndex": 0
          },
          {
            "question": "Recueillir l'avis d'un enfant en situation de handicap fait-il partie des bonnes pratiques citées ?",
            "options": [
              "Oui",
              "Non",
              "Seulement si l'enfant sait lire"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u01-voir-enfant-autrement-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "famille",
        "questions": [
          {
            "question": "Quelle est la base d'une parentalité positive selon ce module ?",
            "options": [
              "Traiter différemment selon les capacités",
              "Aimer tous ses enfants sans discrimination",
              "Favoriser l'enfant le plus performant"
            ],
            "correctIndex": 1
          },
          {
            "question": "Un bébé de moins de 9 mois est-il concerné par la discrimination liée au handicap dans ce module ?",
            "options": [
              "Ce module ne parle pas spécifiquement d'âge",
              "Oui, uniquement lui",
              "Non, jamais"
            ],
            "correctIndex": 0
          },
          {
            "question": "Peut-on justifier une discrimination envers un enfant par sa capacité physique ?",
            "options": [
              "Oui, parfois",
              "Non, jamais",
              "Seulement en cas de handicap sévère"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le module s'appuie sur quel texte de référence pour définir l'enfant ?",
            "options": [
              "La Convention relative aux droits de l'enfant",
              "Le code du travail",
              "Un règlement scolaire"
            ],
            "correctIndex": 0
          },
          {
            "question": "Surprotéger un enfant en situation de handicap est-il présenté comme une bonne pratique ?",
            "options": [
              "Oui",
              "Non",
              "Seulement avant 5 ans"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u01-voir-enfant-autrement-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "main tendue",
        "questions": [
          {
            "question": "Quel comportement parental est valorisé envers tous les enfants selon ce module ?",
            "options": [
              "L'indifférence",
              "Le respect sans discrimination",
              "La comparaison entre frères et sœurs"
            ],
            "correctIndex": 1
          },
          {
            "question": "L'exclusion sociale d'un enfant handicapé est-elle jugée acceptable par le module ?",
            "options": [
              "Oui, pour le protéger",
              "Non",
              "Seulement en zone rurale"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le potentiel d'épanouissement d'un enfant handicapé est-il présenté comme :",
            "options": [
              "Inférieur aux autres",
              "Égal à celui des autres enfants",
              "Impossible à évaluer"
            ],
            "correctIndex": 1
          },
          {
            "question": "Que signifie concrètement \"ne pas discriminer selon les capacités\" ?",
            "options": [
              "Traiter tous les enfants avec les mêmes droits et le même respect",
              "Donner plus d'attention à l'enfant le plus fort",
              "Ignorer les besoins spécifiques"
            ],
            "correctIndex": 0
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "La nutrition infantile",
              "La perception de l'enfance et les droits de l'enfant",
              "La discipline positive"
            ],
            "correctIndex": 1
          }
        ]
      }
    ]
  },
  {
    "id": "u02-proteger-affaire-de-tous",
    "moduleOrigine": "Module 2 — Rôle des familles et communautés (p.25-30)",
    "titre": "Protéger un enfant, l'affaire de tous",
    "thematique": "Famille et communauté",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "La protection de l'enfant est d'abord la responsabilité des parents, mais aussi de la famille et de la communauté. Ensemble, on protège mieux.",
    "scriptAudioIvr": "Il faut tout un village pour élever un enfant. La protection de l'enfant est d'abord la responsabilité des parents, mais la famille élargie et la communauté ont aussi un rôle à jouer. Impliquer la communauté permet de mieux protéger davantage d'enfants, avec les ressources de chacun. Engagez-vous : je m'engage pour le bien-être et la protection de l'enfant.",
    "corpsApp": "« Il faut un village entier pour élever un enfant », dit le proverbe africain. Les familles et les communautés sont les premières responsables de la protection des enfants, aux côtés des parents.\n\nLa famille et la communauté jouent un rôle important pour identifier les problèmes que rencontrent les enfants et pour agir ensemble. Plus une communauté s'implique, plus les interventions touchent d'enfants, car les ressources sont mieux utilisées.\n\nParfois, les habitudes de la famille élargie ou de la communauté peuvent aller à l'encontre de ce que le parent juge bon pour son enfant. Dans ce cas, le parent doit toujours se demander : qu'est-ce qui est réellement dans l'intérêt supérieur de mon enfant ?\n\nEngagement à retenir : « En tant que parent, je m'engage à respecter les droits de l'enfant. »",
    "pictogrammes": [
      "village/maison",
      "groupe de personnes",
      "bouclier",
      "cœur"
    ],
    "quiz": [
      {
        "question": "D'après le module, qui est responsable de la protection de l'enfant ?",
        "options": [
          "Uniquement les parents",
          "Uniquement l'État",
          "Les parents, la famille élargie et la communauté"
        ],
        "correctIndex": 2
      },
      {
        "question": "Quel proverbe africain est cité dans ce module ?",
        "options": [
          "\"Qui sème le vent récolte la tempête\"",
          "\"Il faut un village entier pour élever un enfant\"",
          "\"L'union fait la force\""
        ],
        "correctIndex": 1
      },
      {
        "question": "Qui est le premier responsable de la protection de l'enfant, selon le module ?",
        "options": [
          "La communauté",
          "Les parents",
          "L'école"
        ],
        "correctIndex": 1
      },
      {
        "question": "La famille élargie a-t-elle un rôle à jouer dans la protection de l'enfant ?",
        "options": [
          "Oui",
          "Non, c'est réservé aux parents",
          "Seulement en cas d'urgence"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que permet l'implication de la communauté ?",
        "options": [
          "De réduire les ressources disponibles",
          "De mieux protéger davantage d'enfants",
          "De remplacer les parents"
        ],
        "correctIndex": 1
      },
      {
        "question": "Plus une communauté s'implique, plus :",
        "options": [
          "Les ressources sont mieux utilisées et plus d'enfants sont touchés",
          "Les parents sont déresponsabilisés",
          "Les conflits augmentent"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que doit se demander un parent quand les habitudes de la communauté vont à l'encontre de son jugement ?",
        "options": [
          "Ce que pense le voisin",
          "Ce qui est réellement dans l'intérêt supérieur de son enfant",
          "Rien, il faut toujours suivre la tradition"
        ],
        "correctIndex": 1
      },
      {
        "question": "La communauté et la famille jouent un rôle important pour :",
        "options": [
          "Identifier les problèmes des enfants et agir ensemble",
          "Décider à la place des parents",
          "Remplacer l'école"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quel engagement est mis en avant à la fin du module ?",
        "options": [
          "\"Je m'engage pour le bien-être et la protection de l'enfant\"",
          "\"Je laisse la communauté décider\"",
          "\"Je ne me mêle jamais des affaires des enfants des autres\""
        ],
        "correctIndex": 0
      },
      {
        "question": "Les ressources de la communauté sont-elles utiles pour la protection de l'enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement les ressources financières"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module considère-t-il la protection de l'enfant comme une affaire strictement privée ?",
        "options": [
          "Oui",
          "Non, c'est une responsabilité partagée",
          "Seulement dans les grandes villes"
        ],
        "correctIndex": 1
      },
      {
        "question": "Que peut-il arriver si les habitudes familiales entrent en conflit avec le bien-être de l'enfant ?",
        "options": [
          "Le parent doit prioriser l'intérêt supérieur de l'enfant",
          "Le parent doit toujours suivre la famille",
          "Rien, ce cas n'existe pas"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module encourage-t-il les parents à s'impliquer activement dans la communauté ?",
        "options": [
          "Oui",
          "Non",
          "Seulement les mères"
        ],
        "correctIndex": 0
      },
      {
        "question": "Ce module traite principalement de :",
        "options": [
          "Le rôle des familles et communautés dans la protection de l'enfant",
          "La nutrition des nourrissons",
          "La gestion du sommeil"
        ],
        "correctIndex": 0
      },
      {
        "question": "Une meilleure implication communautaire a-t-elle un effet sur le nombre d'enfants protégés ?",
        "options": [
          "Oui, elle l'augmente",
          "Non, aucun effet",
          "Elle le réduit"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le respect des droits de l'enfant est-il présenté comme un engagement uniquement individuel ?",
        "options": [
          "Oui, individuel seulement",
          "Non, c'est aussi un engagement collectif",
          "Seulement légal"
        ],
        "correctIndex": 1
      },
      {
        "question": "Selon le module, la protection de l'enfant nécessite-t-elle une coordination entre plusieurs acteurs ?",
        "options": [
          "Oui",
          "Non",
          "Seulement entre les parents"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module invite les parents à se poser une question clé : laquelle ?",
        "options": [
          "Que ferait mon voisin ?",
          "Qu'est-ce qui est dans l'intérêt supérieur de mon enfant ?",
          "Combien cela coûte-t-il ?"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module suggère-t-il que les ressources communautaires bien utilisées touchent plus d'enfants ?",
        "options": [
          "Oui",
          "Non",
          "Cela dépend uniquement du gouvernement"
        ],
        "correctIndex": 0
      },
      {
        "question": "Qui, selon le module, doit s'engager à respecter les droits de l'enfant ?",
        "options": [
          "Uniquement l'État",
          "Chaque parent",
          "Uniquement les enseignants"
        ],
        "correctIndex": 1
      }
    ],
    "sousModules": [
      {
        "id": "u02-proteger-affaire-de-tous-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "village/maison",
        "questions": [
          {
            "question": "D'après le module, qui est responsable de la protection de l'enfant ?",
            "options": [
              "Uniquement les parents",
              "Uniquement l'État",
              "Les parents, la famille élargie et la communauté"
            ],
            "correctIndex": 2
          },
          {
            "question": "Quel proverbe africain est cité dans ce module ?",
            "options": [
              "\"Qui sème le vent récolte la tempête\"",
              "\"Il faut un village entier pour élever un enfant\"",
              "\"L'union fait la force\""
            ],
            "correctIndex": 1
          },
          {
            "question": "Qui est le premier responsable de la protection de l'enfant, selon le module ?",
            "options": [
              "La communauté",
              "Les parents",
              "L'école"
            ],
            "correctIndex": 1
          },
          {
            "question": "La famille élargie a-t-elle un rôle à jouer dans la protection de l'enfant ?",
            "options": [
              "Oui",
              "Non, c'est réservé aux parents",
              "Seulement en cas d'urgence"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que permet l'implication de la communauté ?",
            "options": [
              "De réduire les ressources disponibles",
              "De mieux protéger davantage d'enfants",
              "De remplacer les parents"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u02-proteger-affaire-de-tous-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "groupe de personnes",
        "questions": [
          {
            "question": "Plus une communauté s'implique, plus :",
            "options": [
              "Les ressources sont mieux utilisées et plus d'enfants sont touchés",
              "Les parents sont déresponsabilisés",
              "Les conflits augmentent"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que doit se demander un parent quand les habitudes de la communauté vont à l'encontre de son jugement ?",
            "options": [
              "Ce que pense le voisin",
              "Ce qui est réellement dans l'intérêt supérieur de son enfant",
              "Rien, il faut toujours suivre la tradition"
            ],
            "correctIndex": 1
          },
          {
            "question": "La communauté et la famille jouent un rôle important pour :",
            "options": [
              "Identifier les problèmes des enfants et agir ensemble",
              "Décider à la place des parents",
              "Remplacer l'école"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quel engagement est mis en avant à la fin du module ?",
            "options": [
              "\"Je m'engage pour le bien-être et la protection de l'enfant\"",
              "\"Je laisse la communauté décider\"",
              "\"Je ne me mêle jamais des affaires des enfants des autres\""
            ],
            "correctIndex": 0
          },
          {
            "question": "Les ressources de la communauté sont-elles utiles pour la protection de l'enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement les ressources financières"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u02-proteger-affaire-de-tous-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "bouclier",
        "questions": [
          {
            "question": "Le module considère-t-il la protection de l'enfant comme une affaire strictement privée ?",
            "options": [
              "Oui",
              "Non, c'est une responsabilité partagée",
              "Seulement dans les grandes villes"
            ],
            "correctIndex": 1
          },
          {
            "question": "Que peut-il arriver si les habitudes familiales entrent en conflit avec le bien-être de l'enfant ?",
            "options": [
              "Le parent doit prioriser l'intérêt supérieur de l'enfant",
              "Le parent doit toujours suivre la famille",
              "Rien, ce cas n'existe pas"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module encourage-t-il les parents à s'impliquer activement dans la communauté ?",
            "options": [
              "Oui",
              "Non",
              "Seulement les mères"
            ],
            "correctIndex": 0
          },
          {
            "question": "Ce module traite principalement de :",
            "options": [
              "Le rôle des familles et communautés dans la protection de l'enfant",
              "La nutrition des nourrissons",
              "La gestion du sommeil"
            ],
            "correctIndex": 0
          },
          {
            "question": "Une meilleure implication communautaire a-t-elle un effet sur le nombre d'enfants protégés ?",
            "options": [
              "Oui, elle l'augmente",
              "Non, aucun effet",
              "Elle le réduit"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u02-proteger-affaire-de-tous-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "cœur",
        "questions": [
          {
            "question": "Le respect des droits de l'enfant est-il présenté comme un engagement uniquement individuel ?",
            "options": [
              "Oui, individuel seulement",
              "Non, c'est aussi un engagement collectif",
              "Seulement légal"
            ],
            "correctIndex": 1
          },
          {
            "question": "Selon le module, la protection de l'enfant nécessite-t-elle une coordination entre plusieurs acteurs ?",
            "options": [
              "Oui",
              "Non",
              "Seulement entre les parents"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module invite les parents à se poser une question clé : laquelle ?",
            "options": [
              "Que ferait mon voisin ?",
              "Qu'est-ce qui est dans l'intérêt supérieur de mon enfant ?",
              "Combien cela coûte-t-il ?"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le module suggère-t-il que les ressources communautaires bien utilisées touchent plus d'enfants ?",
            "options": [
              "Oui",
              "Non",
              "Cela dépend uniquement du gouvernement"
            ],
            "correctIndex": 0
          },
          {
            "question": "Qui, selon le module, doit s'engager à respecter les droits de l'enfant ?",
            "options": [
              "Uniquement l'État",
              "Chaque parent",
              "Uniquement les enseignants"
            ],
            "correctIndex": 1
          }
        ]
      }
    ]
  },
  {
    "id": "u03-cerveau-grandit-amour",
    "moduleOrigine": "Module 3 — Développement de l'enfant (p.31-39)",
    "titre": "Un cerveau qui grandit avec l'amour",
    "thematique": "Développement de l'enfant",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Un enfant aimé développe un cerveau sain. Cris, violence et négligence freinent son développement. Investir sur un enfant, c'est investir pour la vie.",
    "scriptAudioIvr": "Les parents font la différence. Un enfant entouré d'amour et d'attention développe un cerveau sain, qui apprend mieux et grandit plus heureux. À l'inverse, les cris, la violence et la négligence répétés freinent le développement du cerveau de l'enfant. Passez du temps avec votre enfant, parlez-lui, montrez-lui de l'affection : investir sur un enfant, c'est investir pour toute sa vie.",
    "corpsApp": "Les parents font la différence : ils peuvent aider leur enfant à atteindre son plein potentiel — plus intelligent, plus heureux, meilleur à l'école. Les enfants ont besoin d'être aimés. Les parents doivent passer du temps avec eux, leur parler, leur montrer de l'amour et de l'attention.\n\nCette nécessité n'est pas qu'une opinion : un enfant dans un environnement protecteur a un cerveau plus actif et plus sain qu'un enfant maltraité. La violence, les cris et la discipline corporelle répétés sont toxiques pour le développement du cerveau, en particulier pour les zones où l'enfant apprend à réfléchir et à résoudre des problèmes.\n\nÀ retenir : investir sur un enfant, c'est investir pour toute la vie.",
    "pictogrammes": [
      "cerveau",
      "cœur",
      "parent et enfant",
      "étoile"
    ],
    "quiz": [
      {
        "question": "Qu'est-ce qui freine le développement du cerveau de l'enfant, selon ce module ?",
        "options": [
          "Les cris, la violence et la négligence répétés",
          "Le fait de trop jouer avec lui",
          "Le fait de lui parler souvent"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que retenir de ce module ?",
        "options": [
          "Investir sur un enfant, c'est investir pour toute sa vie",
          "Le développement du cerveau ne dépend pas des parents",
          "Seule l'école influence le cerveau de l'enfant"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les parents peuvent-ils aider leur enfant à atteindre son plein potentiel ?",
        "options": [
          "Oui",
          "Non",
          "Seulement financièrement"
        ],
        "correctIndex": 0
      },
      {
        "question": "Qu'est-ce qui est cité comme un besoin essentiel des enfants ?",
        "options": [
          "Être aimés",
          "Avoir beaucoup de jouets",
          "Rester seuls souvent"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que doivent faire les parents pour aider leur enfant ?",
        "options": [
          "Passer du temps avec lui, lui parler, lui montrer de l'amour",
          "Le laisser seul pour qu'il apprenne l'autonomie",
          "Limiter les contacts physiques"
        ],
        "correctIndex": 0
      },
      {
        "question": "Un enfant dans un environnement protecteur a-t-il un cerveau plus actif qu'un enfant maltraité ?",
        "options": [
          "Oui",
          "Non",
          "Cela ne fait aucune différence"
        ],
        "correctIndex": 0
      },
      {
        "question": "La violence et les cris répétés sont-ils décrits comme toxiques pour le cerveau ?",
        "options": [
          "Oui",
          "Non",
          "Seulement après l'adolescence"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quelles zones du cerveau sont particulièrement affectées par la violence répétée ?",
        "options": [
          "Celles liées à la réflexion et à la résolution de problèmes",
          "Celles liées à la vision uniquement",
          "Aucune zone spécifique"
        ],
        "correctIndex": 0
      },
      {
        "question": "La discipline corporelle répétée a-t-elle un effet neutre sur le développement de l'enfant ?",
        "options": [
          "Oui, neutre",
          "Non, elle est toxique",
          "Elle a un effet positif"
        ],
        "correctIndex": 1
      },
      {
        "question": "Un enfant aimé et entouré d'attention a-t-il tendance à mieux apprendre ?",
        "options": [
          "Oui",
          "Non",
          "Cela dépend uniquement de l'école"
        ],
        "correctIndex": 0
      },
      {
        "question": "Selon le module, qui \"fait la différence\" dans le développement de l'enfant ?",
        "options": [
          "Les parents",
          "Les voisins",
          "Le hasard"
        ],
        "correctIndex": 0
      },
      {
        "question": "Est-il vrai qu'un enfant aimé grandit \"plus heureux\" selon ce module ?",
        "options": [
          "Oui",
          "Non",
          "Ce n'est pas mentionné"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que dit le module sur les résultats scolaires d'un enfant bien entouré ?",
        "options": [
          "Il peut être meilleur à l'école",
          "Cela n'a aucun lien",
          "Il sera moins performant"
        ],
        "correctIndex": 0
      },
      {
        "question": "La nécessité d'aimer et d'entourer son enfant est-elle présentée comme une simple opinion ?",
        "options": [
          "Oui, juste une opinion",
          "Non, un fait appuyé par le développement cérébral",
          "Une tradition sans fondement"
        ],
        "correctIndex": 1
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "Le développement de l'enfant et les pratiques parentales",
          "La pression de fracturation",
          "Le mariage des enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "Investir sur un enfant, selon la conclusion du module, c'est :",
        "options": [
          "Investir pour toute sa vie",
          "Une dépense sans retour",
          "Utile seulement les premières années"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module recommande-t-il de montrer de l'affection à son enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement en public"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les cris répétés ont-ils un impact \"toxique\" ou \"neutre\" sur le cerveau selon le texte ?",
        "options": [
          "Toxique",
          "Neutre",
          "Positif"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module lie-t-il explicitement amour parental et santé du cerveau de l'enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour les nourrissons"
        ],
        "correctIndex": 0
      },
      {
        "question": "Qu'est-ce qui, selon ce module, aide un enfant à devenir \"plus intelligent, plus heureux\" ?",
        "options": [
          "L'implication et l'amour des parents",
          "La richesse matérielle",
          "Le nombre de frères et sœurs"
        ],
        "correctIndex": 0
      }
    ],
    "sousModules": [
      {
        "id": "u03-cerveau-grandit-amour-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "cerveau",
        "questions": [
          {
            "question": "Qu'est-ce qui freine le développement du cerveau de l'enfant, selon ce module ?",
            "options": [
              "Les cris, la violence et la négligence répétés",
              "Le fait de trop jouer avec lui",
              "Le fait de lui parler souvent"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que retenir de ce module ?",
            "options": [
              "Investir sur un enfant, c'est investir pour toute sa vie",
              "Le développement du cerveau ne dépend pas des parents",
              "Seule l'école influence le cerveau de l'enfant"
            ],
            "correctIndex": 0
          },
          {
            "question": "Les parents peuvent-ils aider leur enfant à atteindre son plein potentiel ?",
            "options": [
              "Oui",
              "Non",
              "Seulement financièrement"
            ],
            "correctIndex": 0
          },
          {
            "question": "Qu'est-ce qui est cité comme un besoin essentiel des enfants ?",
            "options": [
              "Être aimés",
              "Avoir beaucoup de jouets",
              "Rester seuls souvent"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que doivent faire les parents pour aider leur enfant ?",
            "options": [
              "Passer du temps avec lui, lui parler, lui montrer de l'amour",
              "Le laisser seul pour qu'il apprenne l'autonomie",
              "Limiter les contacts physiques"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u03-cerveau-grandit-amour-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "cœur",
        "questions": [
          {
            "question": "Un enfant dans un environnement protecteur a-t-il un cerveau plus actif qu'un enfant maltraité ?",
            "options": [
              "Oui",
              "Non",
              "Cela ne fait aucune différence"
            ],
            "correctIndex": 0
          },
          {
            "question": "La violence et les cris répétés sont-ils décrits comme toxiques pour le cerveau ?",
            "options": [
              "Oui",
              "Non",
              "Seulement après l'adolescence"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quelles zones du cerveau sont particulièrement affectées par la violence répétée ?",
            "options": [
              "Celles liées à la réflexion et à la résolution de problèmes",
              "Celles liées à la vision uniquement",
              "Aucune zone spécifique"
            ],
            "correctIndex": 0
          },
          {
            "question": "La discipline corporelle répétée a-t-elle un effet neutre sur le développement de l'enfant ?",
            "options": [
              "Oui, neutre",
              "Non, elle est toxique",
              "Elle a un effet positif"
            ],
            "correctIndex": 1
          },
          {
            "question": "Un enfant aimé et entouré d'attention a-t-il tendance à mieux apprendre ?",
            "options": [
              "Oui",
              "Non",
              "Cela dépend uniquement de l'école"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u03-cerveau-grandit-amour-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "parent et enfant",
        "questions": [
          {
            "question": "Selon le module, qui \"fait la différence\" dans le développement de l'enfant ?",
            "options": [
              "Les parents",
              "Les voisins",
              "Le hasard"
            ],
            "correctIndex": 0
          },
          {
            "question": "Est-il vrai qu'un enfant aimé grandit \"plus heureux\" selon ce module ?",
            "options": [
              "Oui",
              "Non",
              "Ce n'est pas mentionné"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que dit le module sur les résultats scolaires d'un enfant bien entouré ?",
            "options": [
              "Il peut être meilleur à l'école",
              "Cela n'a aucun lien",
              "Il sera moins performant"
            ],
            "correctIndex": 0
          },
          {
            "question": "La nécessité d'aimer et d'entourer son enfant est-elle présentée comme une simple opinion ?",
            "options": [
              "Oui, juste une opinion",
              "Non, un fait appuyé par le développement cérébral",
              "Une tradition sans fondement"
            ],
            "correctIndex": 1
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "Le développement de l'enfant et les pratiques parentales",
              "La pression de fracturation",
              "Le mariage des enfants"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u03-cerveau-grandit-amour-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "étoile",
        "questions": [
          {
            "question": "Investir sur un enfant, selon la conclusion du module, c'est :",
            "options": [
              "Investir pour toute sa vie",
              "Une dépense sans retour",
              "Utile seulement les premières années"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module recommande-t-il de montrer de l'affection à son enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement en public"
            ],
            "correctIndex": 0
          },
          {
            "question": "Les cris répétés ont-ils un impact \"toxique\" ou \"neutre\" sur le cerveau selon le texte ?",
            "options": [
              "Toxique",
              "Neutre",
              "Positif"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module lie-t-il explicitement amour parental et santé du cerveau de l'enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour les nourrissons"
            ],
            "correctIndex": 0
          },
          {
            "question": "Qu'est-ce qui, selon ce module, aide un enfant à devenir \"plus intelligent, plus heureux\" ?",
            "options": [
              "L'implication et l'amour des parents",
              "La richesse matérielle",
              "Le nombre de frères et sœurs"
            ],
            "correctIndex": 0
          }
        ]
      }
    ]
  },
  {
    "id": "u04-1000-premiers-jours",
    "moduleOrigine": "Module 4 — Investir dans les 1000 premiers jours (p.40-56)",
    "titre": "Les 1000 premiers jours comptent",
    "thematique": "Santé et développement précoce",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Allaitement dès la naissance, lait maternel exclusif 6 mois, vaccination et hygiène : les 1000 premiers jours posent les bases de toute la vie de l'enfant.",
    "scriptAudioIvr": "Les 1000 premiers jours de vie sont décisifs. Mettez votre bébé au sein immédiatement après la naissance : le premier lait, le colostrum, est son premier vaccin naturel. Pendant les 6 premiers mois, seul le lait maternel suffit. À partir du 6ème mois, ajoutez d'autres aliments. Faites vacciner votre enfant et respectez les règles d'hygiène : c'est ainsi que vous protégez sa santé pour toute la vie.",
    "corpsApp": "Les 1000 premiers jours, de la grossesse aux 2 ans de l'enfant, posent les fondations de toute sa vie future.\n\nAllaitement : mettez votre bébé au sein immédiatement après la naissance pour stimuler la production de lait et lui donner le colostrum, considéré comme son premier vaccin. Pendant les 6 premiers mois, le lait maternel suffit entièrement, même en zone chaude. À partir du 6ème mois, complétez avec d'autres aliments adaptés.\n\nSanté et hygiène : la vaccination protège l'enfant et la femme enceinte contre plusieurs maladies. Le respect des règles d'hygiène et le sommeil sous moustiquaire imprégnée préservent la santé de toute la famille.\n\nL'enregistrement de la naissance à l'état civil est aussi essentiel : sans acte de naissance, l'enfant est privé de plusieurs droits.\n\nÀ retenir : investir sur un enfant dès le début de sa vie, c'est investir pour toute sa vie.",
    "pictogrammes": [
      "bébé",
      "biberon/sein",
      "seringue",
      "moustiquaire"
    ],
    "quiz": [
      {
        "question": "Pendant combien de temps le lait maternel suffit-il, seul, à l'enfant ?",
        "options": [
          "3 mois",
          "6 mois",
          "12 mois"
        ],
        "correctIndex": 1
      },
      {
        "question": "Pourquoi l'acte de naissance est-il essentiel ?",
        "options": [
          "Sans lui, l'enfant est privé de plusieurs droits",
          "Il n'a aucune importance avant l'âge scolaire",
          "Il ne concerne que les zones urbaines"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que couvrent les \"1000 premiers jours\" ?",
        "options": [
          "De la grossesse aux 2 ans de l'enfant",
          "De la naissance à 6 mois seulement",
          "De 2 ans à 5 ans"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quand faut-il mettre le bébé au sein pour la première fois ?",
        "options": [
          "Immédiatement après la naissance",
          "Après 24 heures",
          "Après le premier mois"
        ],
        "correctIndex": 0
      },
      {
        "question": "Comment est appelé le premier lait maternel ?",
        "options": [
          "Le colostrum",
          "Le lait de transition",
          "Le lait maternisé"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le colostrum est considéré comme :",
        "options": [
          "Le premier vaccin de l'enfant",
          "Un aliment sans importance",
          "Dangereux pour le nouveau-né"
        ],
        "correctIndex": 0
      },
      {
        "question": "À partir de quel mois peut-on ajouter d'autres aliments à l'alimentation du bébé ?",
        "options": [
          "Le 3ème mois",
          "Le 6ème mois",
          "Le 12ème mois"
        ],
        "correctIndex": 1
      },
      {
        "question": "La vaccination protège :",
        "options": [
          "L'enfant et la femme enceinte contre plusieurs maladies",
          "Uniquement les adultes",
          "Seulement contre le paludisme"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que recommande le module pour protéger le sommeil de la famille ?",
        "options": [
          "La moustiquaire imprégnée",
          "Un ventilateur puissant",
          "Des bougies parfumées"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le respect des règles d'hygiène a-t-il un effet sur la santé familiale ?",
        "options": [
          "Oui",
          "Non",
          "Seulement en ville"
        ],
        "correctIndex": 0
      },
      {
        "question": "Sans acte de naissance, un enfant est :",
        "options": [
          "Privé de plusieurs droits",
          "Sans conséquence particulière",
          "Automatiquement inscrit à l'école"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le lait maternel suffit-il même en zone chaude, selon le module ?",
        "options": [
          "Oui",
          "Non, il faut ajouter de l'eau",
          "Seulement en zone tempérée"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que stimule le fait de mettre le bébé au sein rapidement après la naissance ?",
        "options": [
          "La production de lait",
          "La croissance osseuse",
          "Le sommeil du bébé"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module recommande-t-il l'enregistrement de la naissance à l'état civil ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour le premier enfant"
        ],
        "correctIndex": 0
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "L'investissement dans les 1000 premiers jours de vie",
          "La discipline positive",
          "L'adolescence"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que retenir de la conclusion de ce module ?",
        "options": [
          "Investir sur un enfant dès le début, c'est investir pour toute sa vie",
          "Les 1000 premiers jours n'ont pas d'importance",
          "Seule l'alimentation compte"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quels sont les deux grands axes abordés dans ce module ?",
        "options": [
          "Allaitement, et santé/hygiène",
          "Discipline et communication",
          "École et loisirs"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le lait maternel exclusif est recommandé pendant :",
        "options": [
          "Les 6 premiers mois",
          "Les 2 premières semaines",
          "Toute la première année sans exception"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quel est l'un des bénéfices de la vaccination mentionnés dans le module ?",
        "options": [
          "Protéger contre plusieurs maladies",
          "Améliorer l'appétit",
          "Accélérer la croissance"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module associe-t-il la santé du nourrisson à l'hygiène familiale globale ?",
        "options": [
          "Oui",
          "Non",
          "Seulement à l'hygiène de la mère"
        ],
        "correctIndex": 0
      }
    ],
    "sousModules": [
      {
        "id": "u04-1000-premiers-jours-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "bébé",
        "questions": [
          {
            "question": "Pendant combien de temps le lait maternel suffit-il, seul, à l'enfant ?",
            "options": [
              "3 mois",
              "6 mois",
              "12 mois"
            ],
            "correctIndex": 1
          },
          {
            "question": "Pourquoi l'acte de naissance est-il essentiel ?",
            "options": [
              "Sans lui, l'enfant est privé de plusieurs droits",
              "Il n'a aucune importance avant l'âge scolaire",
              "Il ne concerne que les zones urbaines"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que couvrent les \"1000 premiers jours\" ?",
            "options": [
              "De la grossesse aux 2 ans de l'enfant",
              "De la naissance à 6 mois seulement",
              "De 2 ans à 5 ans"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quand faut-il mettre le bébé au sein pour la première fois ?",
            "options": [
              "Immédiatement après la naissance",
              "Après 24 heures",
              "Après le premier mois"
            ],
            "correctIndex": 0
          },
          {
            "question": "Comment est appelé le premier lait maternel ?",
            "options": [
              "Le colostrum",
              "Le lait de transition",
              "Le lait maternisé"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u04-1000-premiers-jours-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "biberon/sein",
        "questions": [
          {
            "question": "Le colostrum est considéré comme :",
            "options": [
              "Le premier vaccin de l'enfant",
              "Un aliment sans importance",
              "Dangereux pour le nouveau-né"
            ],
            "correctIndex": 0
          },
          {
            "question": "À partir de quel mois peut-on ajouter d'autres aliments à l'alimentation du bébé ?",
            "options": [
              "Le 3ème mois",
              "Le 6ème mois",
              "Le 12ème mois"
            ],
            "correctIndex": 1
          },
          {
            "question": "La vaccination protège :",
            "options": [
              "L'enfant et la femme enceinte contre plusieurs maladies",
              "Uniquement les adultes",
              "Seulement contre le paludisme"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que recommande le module pour protéger le sommeil de la famille ?",
            "options": [
              "La moustiquaire imprégnée",
              "Un ventilateur puissant",
              "Des bougies parfumées"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le respect des règles d'hygiène a-t-il un effet sur la santé familiale ?",
            "options": [
              "Oui",
              "Non",
              "Seulement en ville"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u04-1000-premiers-jours-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "seringue",
        "questions": [
          {
            "question": "Sans acte de naissance, un enfant est :",
            "options": [
              "Privé de plusieurs droits",
              "Sans conséquence particulière",
              "Automatiquement inscrit à l'école"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le lait maternel suffit-il même en zone chaude, selon le module ?",
            "options": [
              "Oui",
              "Non, il faut ajouter de l'eau",
              "Seulement en zone tempérée"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que stimule le fait de mettre le bébé au sein rapidement après la naissance ?",
            "options": [
              "La production de lait",
              "La croissance osseuse",
              "Le sommeil du bébé"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module recommande-t-il l'enregistrement de la naissance à l'état civil ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour le premier enfant"
            ],
            "correctIndex": 0
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "L'investissement dans les 1000 premiers jours de vie",
              "La discipline positive",
              "L'adolescence"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u04-1000-premiers-jours-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "moustiquaire",
        "questions": [
          {
            "question": "Que retenir de la conclusion de ce module ?",
            "options": [
              "Investir sur un enfant dès le début, c'est investir pour toute sa vie",
              "Les 1000 premiers jours n'ont pas d'importance",
              "Seule l'alimentation compte"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quels sont les deux grands axes abordés dans ce module ?",
            "options": [
              "Allaitement, et santé/hygiène",
              "Discipline et communication",
              "École et loisirs"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le lait maternel exclusif est recommandé pendant :",
            "options": [
              "Les 6 premiers mois",
              "Les 2 premières semaines",
              "Toute la première année sans exception"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quel est l'un des bénéfices de la vaccination mentionnés dans le module ?",
            "options": [
              "Protéger contre plusieurs maladies",
              "Améliorer l'appétit",
              "Accélérer la croissance"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module associe-t-il la santé du nourrisson à l'hygiène familiale globale ?",
            "options": [
              "Oui",
              "Non",
              "Seulement à l'hygiène de la mère"
            ],
            "correctIndex": 0
          }
        ]
      }
    ]
  },
  {
    "id": "u09-planifier-budget-enfant",
    "moduleOrigine": "Module 5 — Planification des ressources et priorisation des besoins de l'enfant (p.57-63)",
    "titre": "Prévoir un budget pour son enfant",
    "thematique": "Planification des ressources",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Un budget familial doit prévoir les dépenses des enfants et les imprévus. Priorisez leurs besoins avec vos vrais revenus, en famille, pas seul.",
    "scriptAudioIvr": "Le bien-être de l'enfant passe par une bonne organisation du budget familial. Trois règles simples : basez votre budget sur vos dépenses et prix réels, prévoyez toujours les imprévus et les urgences, et construisez ce budget en famille, en tenant compte des besoins de vos enfants. Identifier et prioriser ces besoins aide votre enfant à bien grandir, physiquement et émotionnellement.",
    "corpsApp": "Le bien-être et l'épanouissement de la famille passent par une bonne organisation de la gestion des revenus. Identifier et prioriser les besoins de l'enfant contribue directement à son bon développement physique, psychique et émotionnel.\n\nTrois principes fondamentaux pour élaborer un budget familial : premièrement, un budget doit être basé sur les dépenses et les prix réels, pas des estimations approximatives. Deuxièmement, il doit inclure toutes les prévisions nécessaires — dépenses hebdomadaires, mais aussi imprévus et urgences. Troisièmement, il doit être élaboré de façon participative, en tenant compte des besoins des enfants, idéalement en impliquant toute la famille.\n\nUne astuce concrète : demandez-vous quelles sont les grandes dépenses pour un enfant, et à quelles périodes de l'année elles augmentent (rentrée scolaire, santé). Vous pouvez même impliquer les enfants dans la réflexion budgétaire — cela les responsabilise et peut les aider à comprendre la valeur de l'argent.\n\nRespecter le budget une fois établi reste le plus difficile : gardez toujours une petite réserve pour les dépenses urgentes non prévues.",
    "pictogrammes": [
      "pièces de monnaie",
      "famille",
      "calendrier",
      "balance budgétaire"
    ],
    "quiz": [
      {
        "question": "Sur quoi doit être basé un budget familial, selon ce module ?",
        "options": [
          "Des estimations approximatives",
          "Les dépenses et les prix réels",
          "Le budget du voisin"
        ],
        "correctIndex": 1
      },
      {
        "question": "Comment un budget familial doit-il être élaboré ?",
        "options": [
          "Seul, sans consulter personne",
          "De façon participative, en tenant compte des besoins des enfants",
          "Une fois par an, sans jamais le revoir"
        ],
        "correctIndex": 1
      },
      {
        "question": "Que doit toujours inclure un budget familial, en plus des dépenses courantes ?",
        "options": [
          "Les imprévus et les urgences",
          "Uniquement les loisirs",
          "Rien d'autre"
        ],
        "correctIndex": 0
      },
      {
        "question": "Identifier et prioriser les besoins de l'enfant contribue à :",
        "options": [
          "Son bon développement physique, psychique et émotionnel",
          "Rien de particulier",
          "Uniquement sa réussite scolaire"
        ],
        "correctIndex": 0
      },
      {
        "question": "Combien de principes fondamentaux le module propose-t-il pour élaborer un budget familial ?",
        "options": [
          "Deux",
          "Trois",
          "Cinq"
        ],
        "correctIndex": 1
      },
      {
        "question": "Un budget doit-il être basé sur des estimations approximatives ?",
        "options": [
          "Oui",
          "Non, sur les dépenses et prix réels",
          "Seulement au début"
        ],
        "correctIndex": 1
      },
      {
        "question": "Que suggère le module de faire concernant les grandes dépenses de l'enfant ?",
        "options": [
          "Identifier à quelles périodes de l'année elles augmentent",
          "Les ignorer jusqu'au dernier moment",
          "Les répartir également chaque mois sans réflexion"
        ],
        "correctIndex": 0
      },
      {
        "question": "Impliquer les enfants dans la réflexion budgétaire peut avoir quel effet ?",
        "options": [
          "Les responsabiliser et les aider à comprendre la valeur de l'argent",
          "Les inquiéter inutilement",
          "Aucun effet mentionné"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que recommande le module de garder en réserve dans un budget ?",
        "options": [
          "Une petite réserve pour les dépenses urgentes non prévues",
          "Aucune réserve n'est nécessaire",
          "La totalité du salaire"
        ],
        "correctIndex": 0
      },
      {
        "question": "Qu'est-ce qui est présenté comme le plus difficile une fois le budget établi ?",
        "options": [
          "Le respecter dans la durée",
          "Le rédiger",
          "Le montrer aux enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le budget familial doit-il être élaboré uniquement par un parent seul ?",
        "options": [
          "Oui",
          "Non, idéalement en impliquant toute la famille",
          "Seulement par le père"
        ],
        "correctIndex": 1
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "La planification des ressources et la priorisation des besoins de l'enfant",
          "La discipline positive",
          "L'adolescence"
        ],
        "correctIndex": 0
      },
      {
        "question": "La rentrée scolaire est-elle citée comme une période où les dépenses augmentent ?",
        "options": [
          "Oui",
          "Non",
          "Ce n'est pas mentionné"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le bien-être de la famille est-il lié, selon ce module, à la gestion des revenus ?",
        "options": [
          "Oui",
          "Non, aucun lien",
          "Seulement pour les familles nombreuses"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module encourage-t-il à baser le budget sur des prix réels plutôt que des approximations ?",
        "options": [
          "Oui",
          "Non",
          "Cela dépend du revenu"
        ],
        "correctIndex": 0
      },
      {
        "question": "Un budget participatif tient-il compte des besoins des enfants ?",
        "options": [
          "Oui",
          "Non",
          "Seulement à partir de l'adolescence"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que recommande le module concernant les imprévus dans le budget ?",
        "options": [
          "Les prévoir systématiquement",
          "Les ignorer, ils sont rares",
          "Ne pas en parler aux enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "La santé fait-elle partie des dépenses évoquées comme pouvant augmenter à certaines périodes ?",
        "options": [
          "Oui",
          "Non",
          "Uniquement en cas de maladie grave"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module lie-t-il directement gestion budgétaire et épanouissement de l'enfant ?",
        "options": [
          "Oui",
          "Non, ce sont deux sujets séparés",
          "Seulement indirectement"
        ],
        "correctIndex": 0
      },
      {
        "question": "Comprendre la valeur de l'argent est présenté comme un bénéfice pour :",
        "options": [
          "L'enfant impliqué dans la réflexion budgétaire",
          "Uniquement les parents",
          "Le facilitateur communautaire"
        ],
        "correctIndex": 0
      }
    ],
    "sousModules": [
      {
        "id": "u09-planifier-budget-enfant-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "pièces de monnaie",
        "questions": [
          {
            "question": "Sur quoi doit être basé un budget familial, selon ce module ?",
            "options": [
              "Des estimations approximatives",
              "Les dépenses et les prix réels",
              "Le budget du voisin"
            ],
            "correctIndex": 1
          },
          {
            "question": "Comment un budget familial doit-il être élaboré ?",
            "options": [
              "Seul, sans consulter personne",
              "De façon participative, en tenant compte des besoins des enfants",
              "Une fois par an, sans jamais le revoir"
            ],
            "correctIndex": 1
          },
          {
            "question": "Que doit toujours inclure un budget familial, en plus des dépenses courantes ?",
            "options": [
              "Les imprévus et les urgences",
              "Uniquement les loisirs",
              "Rien d'autre"
            ],
            "correctIndex": 0
          },
          {
            "question": "Identifier et prioriser les besoins de l'enfant contribue à :",
            "options": [
              "Son bon développement physique, psychique et émotionnel",
              "Rien de particulier",
              "Uniquement sa réussite scolaire"
            ],
            "correctIndex": 0
          },
          {
            "question": "Combien de principes fondamentaux le module propose-t-il pour élaborer un budget familial ?",
            "options": [
              "Deux",
              "Trois",
              "Cinq"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u09-planifier-budget-enfant-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "famille",
        "questions": [
          {
            "question": "Un budget doit-il être basé sur des estimations approximatives ?",
            "options": [
              "Oui",
              "Non, sur les dépenses et prix réels",
              "Seulement au début"
            ],
            "correctIndex": 1
          },
          {
            "question": "Que suggère le module de faire concernant les grandes dépenses de l'enfant ?",
            "options": [
              "Identifier à quelles périodes de l'année elles augmentent",
              "Les ignorer jusqu'au dernier moment",
              "Les répartir également chaque mois sans réflexion"
            ],
            "correctIndex": 0
          },
          {
            "question": "Impliquer les enfants dans la réflexion budgétaire peut avoir quel effet ?",
            "options": [
              "Les responsabiliser et les aider à comprendre la valeur de l'argent",
              "Les inquiéter inutilement",
              "Aucun effet mentionné"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que recommande le module de garder en réserve dans un budget ?",
            "options": [
              "Une petite réserve pour les dépenses urgentes non prévues",
              "Aucune réserve n'est nécessaire",
              "La totalité du salaire"
            ],
            "correctIndex": 0
          },
          {
            "question": "Qu'est-ce qui est présenté comme le plus difficile une fois le budget établi ?",
            "options": [
              "Le respecter dans la durée",
              "Le rédiger",
              "Le montrer aux enfants"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u09-planifier-budget-enfant-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "calendrier",
        "questions": [
          {
            "question": "Le budget familial doit-il être élaboré uniquement par un parent seul ?",
            "options": [
              "Oui",
              "Non, idéalement en impliquant toute la famille",
              "Seulement par le père"
            ],
            "correctIndex": 1
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "La planification des ressources et la priorisation des besoins de l'enfant",
              "La discipline positive",
              "L'adolescence"
            ],
            "correctIndex": 0
          },
          {
            "question": "La rentrée scolaire est-elle citée comme une période où les dépenses augmentent ?",
            "options": [
              "Oui",
              "Non",
              "Ce n'est pas mentionné"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le bien-être de la famille est-il lié, selon ce module, à la gestion des revenus ?",
            "options": [
              "Oui",
              "Non, aucun lien",
              "Seulement pour les familles nombreuses"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module encourage-t-il à baser le budget sur des prix réels plutôt que des approximations ?",
            "options": [
              "Oui",
              "Non",
              "Cela dépend du revenu"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u09-planifier-budget-enfant-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "balance budgétaire",
        "questions": [
          {
            "question": "Un budget participatif tient-il compte des besoins des enfants ?",
            "options": [
              "Oui",
              "Non",
              "Seulement à partir de l'adolescence"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que recommande le module concernant les imprévus dans le budget ?",
            "options": [
              "Les prévoir systématiquement",
              "Les ignorer, ils sont rares",
              "Ne pas en parler aux enfants"
            ],
            "correctIndex": 0
          },
          {
            "question": "La santé fait-elle partie des dépenses évoquées comme pouvant augmenter à certaines périodes ?",
            "options": [
              "Oui",
              "Non",
              "Uniquement en cas de maladie grave"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module lie-t-il directement gestion budgétaire et épanouissement de l'enfant ?",
            "options": [
              "Oui",
              "Non, ce sont deux sujets séparés",
              "Seulement indirectement"
            ],
            "correctIndex": 0
          },
          {
            "question": "Comprendre la valeur de l'argent est présenté comme un bénéfice pour :",
            "options": [
              "L'enfant impliqué dans la réflexion budgétaire",
              "Uniquement les parents",
              "Le facilitateur communautaire"
            ],
            "correctIndex": 0
          }
        ]
      }
    ]
  },
  {
    "id": "u10-prendre-soin-de-soi",
    "moduleOrigine": "Module 6 — Prendre soin de soi pour prendre soin des autres (p.64-73)",
    "titre": "Se ressourcer pour mieux accompagner",
    "thematique": "Bien-être parental",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Le stress des parents influence la vie des enfants. Respirez, reposez-vous, parlez à un proche : prendre soin de soi, c'est aussi prendre soin de son enfant.",
    "scriptAudioIvr": "Le stress des parents a une influence directe sur la vie des enfants. Un stress répété et non géré devient nocif pour vous et pour votre entourage. Quelques astuces simples : bien manger, dormir et bouger ; prendre chaque jour un moment de plaisir ; parler à un ami de confiance ; limiter l'alcool et la caféine. Prendre soin de vous n'est pas égoïste : c'est une condition pour bien prendre soin de votre enfant.",
    "corpsApp": "Le stress des parents a une influence sur la vie des enfants. Il existe un stress sain, qui nous aide à faire face aux défis du quotidien, et un stress toxique, répété ou intense, qui devient nocif pour nous et pour ceux qui nous entourent — y compris nos enfants.\n\nQuelques techniques simples pour retrouver un état plus calme : éloignez-vous un instant de la situation stressante ; pratiquez une respiration ou une relaxation courte ; bien manger, dormir et faire de l'exercice physique ; accordez-vous chaque jour un moment de plaisir, même bref ; parlez à un ami ou une personne de confiance ; limitez l'alcool, la caféine et les excitants ; essayez une nouvelle activité apaisante (jardinage, couture, danse, musique).\n\nÀ la fin de chaque journée, essayez de noter un point sur lequel vous avez aidé quelqu'un, ou une chose pour laquelle vous êtes reconnaissant — un petit geste qui aide à relativiser une journée difficile.\n\nÀ retenir : un parent qui prend soin de lui-même est mieux armé pour prendre soin de son enfant. Ce n'est pas un luxe, c'est une nécessité pour toute la famille.",
    "pictogrammes": [
      "cœur apaisé",
      "respiration/vague",
      "soleil",
      "parent souriant"
    ],
    "quiz": [
      {
        "question": "Prendre soin de soi en tant que parent, est-ce égoïste ?",
        "options": [
          "Oui, il faut toujours se sacrifier",
          "Non, c'est une condition pour bien prendre soin de son enfant",
          "Seulement pendant les vacances"
        ],
        "correctIndex": 1
      },
      {
        "question": "Que peut-on faire pour retrouver un état plus calme, selon ce module ?",
        "options": [
          "Ignorer le stress et continuer comme si de rien n'était",
          "Respirer, se reposer, parler à un proche",
          "Éviter tout contact avec les autres"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le stress des parents a-t-il une influence sur la vie des enfants ?",
        "options": [
          "Oui",
          "Non, aucune influence",
          "Seulement après l'adolescence de l'enfant"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module distingue-t-il un stress \"sain\" et un stress \"toxique\" ?",
        "options": [
          "Oui",
          "Non, tout stress est identique",
          "Il ne parle que du stress positif"
        ],
        "correctIndex": 0
      },
      {
        "question": "Un stress répété ou intense est-il présenté comme nocif ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour les enfants, pas pour les parents"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que recommande le module pour retrouver son calme face à une situation stressante ?",
        "options": [
          "S'éloigner un instant de la situation",
          "Rester dedans et forcer",
          "Ignorer ses émotions"
        ],
        "correctIndex": 0
      },
      {
        "question": "La respiration ou la relaxation courte sont-elles citées comme des techniques utiles ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour les enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "Bien manger, dormir et faire de l'exercice sont-ils mentionnés comme utiles contre le stress ?",
        "options": [
          "Oui",
          "Non",
          "Seulement le sommeil"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module recommande-t-il de s'accorder un moment de plaisir chaque jour ?",
        "options": [
          "Oui",
          "Non",
          "Seulement le week-end"
        ],
        "correctIndex": 0
      },
      {
        "question": "Parler à un ami ou une personne de confiance est-il présenté comme utile ?",
        "options": [
          "Oui",
          "Non",
          "Seulement en cas de crise grave"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que recommande le module concernant l'alcool et la caféine ?",
        "options": [
          "Les limiter",
          "En consommer davantage pour se détendre",
          "Ce n'est pas mentionné"
        ],
        "correctIndex": 0
      },
      {
        "question": "Essayer une nouvelle activité apaisante (jardinage, danse, musique) est-il suggéré ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour les enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "Prendre soin de soi pour prendre soin des autres",
          "La nutrition infantile",
          "Le mariage des enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "Que suggère le module de noter à la fin de chaque journée ?",
        "options": [
          "Un point d'aide apportée ou de gratitude",
          "La liste des erreurs commises",
          "Rien en particulier"
        ],
        "correctIndex": 0
      },
      {
        "question": "Un parent qui prend soin de lui-même est-il mieux armé pour s'occuper de son enfant ?",
        "options": [
          "Oui",
          "Non",
          "Cela n'a aucun rapport"
        ],
        "correctIndex": 0
      },
      {
        "question": "Prendre soin de soi est-il présenté comme un luxe ou une nécessité ?",
        "options": [
          "Un luxe",
          "Une nécessité pour toute la famille",
          "Ni l'un ni l'autre"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le stress toxique affecte-t-il uniquement le parent, selon ce module ?",
        "options": [
          "Oui, uniquement le parent",
          "Non, aussi son entourage, y compris les enfants",
          "Il n'affecte jamais l'entourage"
        ],
        "correctIndex": 1
      },
      {
        "question": "S'éloigner un instant d'une situation stressante est-il une stratégie recommandée ?",
        "options": [
          "Oui",
          "Non",
          "Seulement au travail"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module encourage-t-il à limiter les excitants comme la caféine ?",
        "options": [
          "Oui",
          "Non",
          "Seulement le soir"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quel est le message final de ce module ?",
        "options": [
          "Prendre soin de soi aide à mieux prendre soin de son enfant",
          "Les parents doivent ignorer leur propre bien-être",
          "Le stress n'a aucun impact sur la famille"
        ],
        "correctIndex": 0
      }
    ],
    "sousModules": [
      {
        "id": "u10-prendre-soin-de-soi-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "cœur apaisé",
        "questions": [
          {
            "question": "Prendre soin de soi en tant que parent, est-ce égoïste ?",
            "options": [
              "Oui, il faut toujours se sacrifier",
              "Non, c'est une condition pour bien prendre soin de son enfant",
              "Seulement pendant les vacances"
            ],
            "correctIndex": 1
          },
          {
            "question": "Que peut-on faire pour retrouver un état plus calme, selon ce module ?",
            "options": [
              "Ignorer le stress et continuer comme si de rien n'était",
              "Respirer, se reposer, parler à un proche",
              "Éviter tout contact avec les autres"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le stress des parents a-t-il une influence sur la vie des enfants ?",
            "options": [
              "Oui",
              "Non, aucune influence",
              "Seulement après l'adolescence de l'enfant"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module distingue-t-il un stress \"sain\" et un stress \"toxique\" ?",
            "options": [
              "Oui",
              "Non, tout stress est identique",
              "Il ne parle que du stress positif"
            ],
            "correctIndex": 0
          },
          {
            "question": "Un stress répété ou intense est-il présenté comme nocif ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour les enfants, pas pour les parents"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u10-prendre-soin-de-soi-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "respiration/vague",
        "questions": [
          {
            "question": "Que recommande le module pour retrouver son calme face à une situation stressante ?",
            "options": [
              "S'éloigner un instant de la situation",
              "Rester dedans et forcer",
              "Ignorer ses émotions"
            ],
            "correctIndex": 0
          },
          {
            "question": "La respiration ou la relaxation courte sont-elles citées comme des techniques utiles ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour les enfants"
            ],
            "correctIndex": 0
          },
          {
            "question": "Bien manger, dormir et faire de l'exercice sont-ils mentionnés comme utiles contre le stress ?",
            "options": [
              "Oui",
              "Non",
              "Seulement le sommeil"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module recommande-t-il de s'accorder un moment de plaisir chaque jour ?",
            "options": [
              "Oui",
              "Non",
              "Seulement le week-end"
            ],
            "correctIndex": 0
          },
          {
            "question": "Parler à un ami ou une personne de confiance est-il présenté comme utile ?",
            "options": [
              "Oui",
              "Non",
              "Seulement en cas de crise grave"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u10-prendre-soin-de-soi-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "soleil",
        "questions": [
          {
            "question": "Que recommande le module concernant l'alcool et la caféine ?",
            "options": [
              "Les limiter",
              "En consommer davantage pour se détendre",
              "Ce n'est pas mentionné"
            ],
            "correctIndex": 0
          },
          {
            "question": "Essayer une nouvelle activité apaisante (jardinage, danse, musique) est-il suggéré ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour les enfants"
            ],
            "correctIndex": 0
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "Prendre soin de soi pour prendre soin des autres",
              "La nutrition infantile",
              "Le mariage des enfants"
            ],
            "correctIndex": 0
          },
          {
            "question": "Que suggère le module de noter à la fin de chaque journée ?",
            "options": [
              "Un point d'aide apportée ou de gratitude",
              "La liste des erreurs commises",
              "Rien en particulier"
            ],
            "correctIndex": 0
          },
          {
            "question": "Un parent qui prend soin de lui-même est-il mieux armé pour s'occuper de son enfant ?",
            "options": [
              "Oui",
              "Non",
              "Cela n'a aucun rapport"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u10-prendre-soin-de-soi-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "parent souriant",
        "questions": [
          {
            "question": "Prendre soin de soi est-il présenté comme un luxe ou une nécessité ?",
            "options": [
              "Un luxe",
              "Une nécessité pour toute la famille",
              "Ni l'un ni l'autre"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le stress toxique affecte-t-il uniquement le parent, selon ce module ?",
            "options": [
              "Oui, uniquement le parent",
              "Non, aussi son entourage, y compris les enfants",
              "Il n'affecte jamais l'entourage"
            ],
            "correctIndex": 1
          },
          {
            "question": "S'éloigner un instant d'une situation stressante est-il une stratégie recommandée ?",
            "options": [
              "Oui",
              "Non",
              "Seulement au travail"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module encourage-t-il à limiter les excitants comme la caféine ?",
            "options": [
              "Oui",
              "Non",
              "Seulement le soir"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quel est le message final de ce module ?",
            "options": [
              "Prendre soin de soi aide à mieux prendre soin de son enfant",
              "Les parents doivent ignorer leur propre bien-être",
              "Le stress n'a aucun impact sur la famille"
            ],
            "correctIndex": 0
          }
        ]
      }
    ]
  },
  {
    "id": "u05-parler-a-son-enfant",
    "moduleOrigine": "Module 7 — Communiquer selon l'âge (p.74-85)",
    "titre": "Parler à son enfant, à chaque âge",
    "thematique": "Communication parent-enfant",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Chaque enfant est unique. Adaptez votre communication à son âge, écoutez ses sentiments, et essayez l'empathie en 4 étapes pour mieux le comprendre.",
    "scriptAudioIvr": "Chaque enfant est unique, comme chaque adulte. Adaptez ce que vous attendez de lui à son âge : un bébé de moins de 9 mois ne peut pas répondre à son nom. Pour mieux communiquer, essayez l'empathie en 4 étapes : identifiez le sentiment de votre enfant, comprenez sa raison, accueillez ce sentiment sans le juger, puis aidez-le à l'exprimer avec des mots.",
    "corpsApp": "Chaque enfant est unique — franc, timide, introverti ou dynamique — et nous communiquons tous à partir de nos expériences. Les enfants ont moins d'expérience que les adultes, mais leurs sentiments ne doivent jamais être sous-estimés.\n\nAyez des attentes adaptées à l'âge de votre enfant : on ne peut pas attendre d'un bébé de moins de 9 mois qu'il réponde à son nom, ni d'un jeune enfant qu'il ne pleure jamais.\n\nL'empathie est l'un des outils parentaux les plus puissants. Elle se pratique en 4 étapes : identifier le sentiment de l'enfant, en comprendre la raison, l'accueillir sans le minimiser, puis aider l'enfant à mettre des mots sur ce qu'il ressent — surtout dans les moments de tristesse ou de grande joie.\n\nJouer avec son enfant et lui parler régulièrement, y compris de sujets sensibles selon son âge, renforce durablement la relation.",
    "pictogrammes": [
      "bulle de dialogue",
      "oreille",
      "cœur",
      "enfant qui parle"
    ],
    "quiz": [
      {
        "question": "Combien d'étapes compte la méthode d'empathie proposée ?",
        "options": [
          "2",
          "4",
          "6"
        ],
        "correctIndex": 1
      },
      {
        "question": "Peut-on attendre d'un bébé de moins de 9 mois qu'il réponde à son nom ?",
        "options": [
          "Oui, systématiquement",
          "Non, ce n'est pas réaliste à cet âge",
          "Seulement le matin"
        ],
        "correctIndex": 1
      },
      {
        "question": "Chaque enfant est-il unique selon ce module ?",
        "options": [
          "Oui",
          "Non, tous les enfants réagissent pareil",
          "Seulement les aînés"
        ],
        "correctIndex": 0
      },
      {
        "question": "D'où viennent, selon le module, nos façons de communiquer ?",
        "options": [
          "De nos propres expériences",
          "Uniquement des livres",
          "Du hasard"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les sentiments des enfants doivent-ils être sous-estimés parce qu'ils ont moins d'expérience ?",
        "options": [
          "Oui",
          "Non, jamais",
          "Seulement avant 3 ans"
        ],
        "correctIndex": 1
      },
      {
        "question": "Quelle est la première étape de la méthode d'empathie ?",
        "options": [
          "Identifier le sentiment de l'enfant",
          "Le punir",
          "L'ignorer"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quelle est la dernière étape de la méthode d'empathie ?",
        "options": [
          "Aider l'enfant à exprimer son sentiment avec des mots",
          "Le gronder",
          "Changer de sujet"
        ],
        "correctIndex": 0
      },
      {
        "question": "Faut-il accueillir le sentiment de l'enfant sans le minimiser ?",
        "options": [
          "Oui",
          "Non",
          "Seulement si le sentiment semble justifié"
        ],
        "correctIndex": 0
      },
      {
        "question": "L'empathie est-elle présentée comme un outil parental puissant ?",
        "options": [
          "Oui",
          "Non",
          "C'est jugé inutile"
        ],
        "correctIndex": 0
      },
      {
        "question": "Peut-on attendre d'un jeune enfant qu'il ne pleure jamais ?",
        "options": [
          "Oui",
          "Non, ce n'est pas réaliste",
          "Seulement après 5 ans"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module recommande-t-il de jouer régulièrement avec son enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement le week-end"
        ],
        "correctIndex": 0
      },
      {
        "question": "Parler de sujets sensibles avec son enfant selon son âge est-il recommandé ?",
        "options": [
          "Oui",
          "Non, il faut éviter tout sujet difficile",
          "Seulement à l'adolescence"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quel effet a le fait de parler régulièrement à son enfant, selon le module ?",
        "options": [
          "Cela renforce durablement la relation",
          "Cela n'a aucun effet",
          "Cela rend l'enfant plus timide"
        ],
        "correctIndex": 0
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "La communication parent-enfant selon l'âge",
          "La nutrition infantile",
          "La pression de fracturation"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les attentes envers un enfant doivent-elles être adaptées à son âge ?",
        "options": [
          "Oui",
          "Non, elles doivent être identiques pour tous les âges",
          "Seulement pour les garçons"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quelle est la deuxième étape de la méthode d'empathie ?",
        "options": [
          "Comprendre la raison du sentiment de l'enfant",
          "Ignorer la cause",
          "Demander à un tiers"
        ],
        "correctIndex": 0
      },
      {
        "question": "Dans quels moments l'empathie est-elle particulièrement utile, selon le module ?",
        "options": [
          "Tristesse ou grande joie",
          "Uniquement pendant les repas",
          "Jamais, seulement en cas de danger"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module compare-t-il les enfants entre eux comme identiques ?",
        "options": [
          "Non, chacun est unique",
          "Oui, tous pareils",
          "Seulement les jumeaux"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le manque d'expérience d'un enfant justifie-t-il de minimiser ses émotions ?",
        "options": [
          "Oui",
          "Non",
          "Seulement avant 2 ans"
        ],
        "correctIndex": 1
      },
      {
        "question": "Quel est l'objectif final de la méthode d'empathie en 4 étapes ?",
        "options": [
          "Aider l'enfant à mettre des mots sur ce qu'il ressent",
          "Faire taire l'enfant rapidement",
          "Éviter toute discussion"
        ],
        "correctIndex": 0
      }
    ],
    "sousModules": [
      {
        "id": "u05-parler-a-son-enfant-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "bulle de dialogue",
        "questions": [
          {
            "question": "Combien d'étapes compte la méthode d'empathie proposée ?",
            "options": [
              "2",
              "4",
              "6"
            ],
            "correctIndex": 1
          },
          {
            "question": "Peut-on attendre d'un bébé de moins de 9 mois qu'il réponde à son nom ?",
            "options": [
              "Oui, systématiquement",
              "Non, ce n'est pas réaliste à cet âge",
              "Seulement le matin"
            ],
            "correctIndex": 1
          },
          {
            "question": "Chaque enfant est-il unique selon ce module ?",
            "options": [
              "Oui",
              "Non, tous les enfants réagissent pareil",
              "Seulement les aînés"
            ],
            "correctIndex": 0
          },
          {
            "question": "D'où viennent, selon le module, nos façons de communiquer ?",
            "options": [
              "De nos propres expériences",
              "Uniquement des livres",
              "Du hasard"
            ],
            "correctIndex": 0
          },
          {
            "question": "Les sentiments des enfants doivent-ils être sous-estimés parce qu'ils ont moins d'expérience ?",
            "options": [
              "Oui",
              "Non, jamais",
              "Seulement avant 3 ans"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u05-parler-a-son-enfant-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "oreille",
        "questions": [
          {
            "question": "Quelle est la première étape de la méthode d'empathie ?",
            "options": [
              "Identifier le sentiment de l'enfant",
              "Le punir",
              "L'ignorer"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quelle est la dernière étape de la méthode d'empathie ?",
            "options": [
              "Aider l'enfant à exprimer son sentiment avec des mots",
              "Le gronder",
              "Changer de sujet"
            ],
            "correctIndex": 0
          },
          {
            "question": "Faut-il accueillir le sentiment de l'enfant sans le minimiser ?",
            "options": [
              "Oui",
              "Non",
              "Seulement si le sentiment semble justifié"
            ],
            "correctIndex": 0
          },
          {
            "question": "L'empathie est-elle présentée comme un outil parental puissant ?",
            "options": [
              "Oui",
              "Non",
              "C'est jugé inutile"
            ],
            "correctIndex": 0
          },
          {
            "question": "Peut-on attendre d'un jeune enfant qu'il ne pleure jamais ?",
            "options": [
              "Oui",
              "Non, ce n'est pas réaliste",
              "Seulement après 5 ans"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u05-parler-a-son-enfant-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "cœur",
        "questions": [
          {
            "question": "Le module recommande-t-il de jouer régulièrement avec son enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement le week-end"
            ],
            "correctIndex": 0
          },
          {
            "question": "Parler de sujets sensibles avec son enfant selon son âge est-il recommandé ?",
            "options": [
              "Oui",
              "Non, il faut éviter tout sujet difficile",
              "Seulement à l'adolescence"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quel effet a le fait de parler régulièrement à son enfant, selon le module ?",
            "options": [
              "Cela renforce durablement la relation",
              "Cela n'a aucun effet",
              "Cela rend l'enfant plus timide"
            ],
            "correctIndex": 0
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "La communication parent-enfant selon l'âge",
              "La nutrition infantile",
              "La pression de fracturation"
            ],
            "correctIndex": 0
          },
          {
            "question": "Les attentes envers un enfant doivent-elles être adaptées à son âge ?",
            "options": [
              "Oui",
              "Non, elles doivent être identiques pour tous les âges",
              "Seulement pour les garçons"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u05-parler-a-son-enfant-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "enfant qui parle",
        "questions": [
          {
            "question": "Quelle est la deuxième étape de la méthode d'empathie ?",
            "options": [
              "Comprendre la raison du sentiment de l'enfant",
              "Ignorer la cause",
              "Demander à un tiers"
            ],
            "correctIndex": 0
          },
          {
            "question": "Dans quels moments l'empathie est-elle particulièrement utile, selon le module ?",
            "options": [
              "Tristesse ou grande joie",
              "Uniquement pendant les repas",
              "Jamais, seulement en cas de danger"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module compare-t-il les enfants entre eux comme identiques ?",
            "options": [
              "Non, chacun est unique",
              "Oui, tous pareils",
              "Seulement les jumeaux"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le manque d'expérience d'un enfant justifie-t-il de minimiser ses émotions ?",
            "options": [
              "Oui",
              "Non",
              "Seulement avant 2 ans"
            ],
            "correctIndex": 1
          },
          {
            "question": "Quel est l'objectif final de la méthode d'empathie en 4 étapes ?",
            "options": [
              "Aider l'enfant à mettre des mots sur ce qu'il ressent",
              "Faire taire l'enfant rapidement",
              "Éviter toute discussion"
            ],
            "correctIndex": 0
          }
        ]
      }
    ]
  },
  {
    "id": "u06-discipliner-sans-punir",
    "moduleOrigine": "Module 8 — Discipline positive (p.86-92)",
    "titre": "Discipliner sans punir",
    "thematique": "Discipline positive",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "La discipline positive s'adapte à l'âge de l'enfant. Les punitions physiques nuisent à son développement. Communication et conseils valent mieux que sanctions.",
    "scriptAudioIvr": "La discipline positive n'est pas la punition. Adaptez la discipline à l'âge de votre enfant. Les sanctions physiques nuisent à son développement physique, psychique et émotionnel. Privilégiez la communication et le conseil plutôt que la sanction. Et rappelez-vous : priver un enfant de ses droits n'est jamais une forme acceptable de discipline positive.",
    "corpsApp": "La discipline positive ne signifie pas l'absence de règles, mais un mode d'encadrement qui protège le développement de l'enfant.\n\nQuatre messages essentiels à retenir : premièrement, le type de discipline doit être adapté à l'âge de l'enfant — ce qui convient à un adolescent ne convient pas à un enfant de 3 ans. Deuxièmement, les sanctions punitives et corporelles ont un impact négatif prouvé sur le développement physique, psychique et émotionnel de l'enfant. Troisièmement, la communication et les conseils sont des outils de discipline bien plus efficaces que la sanction. Enfin, priver un enfant de ses droits fondamentaux — nourriture, affection, école — n'est jamais une forme acceptable de discipline positive, quelle que soit la faute commise.\n\nDéfinissez avec votre enfant des règles claires à la maison, et des conséquences appropriées et non violentes en cas de non-respect.",
    "pictogrammes": [
      "main levée barrée",
      "bulle de dialogue",
      "règle/livre",
      "cœur"
    ],
    "quiz": [
      {
        "question": "Quel outil de discipline est présenté comme plus efficace que la sanction ?",
        "options": [
          "La communication et les conseils",
          "La punition physique",
          "L'ignorance de l'enfant"
        ],
        "correctIndex": 0
      },
      {
        "question": "Priver un enfant de nourriture ou d'école en punition est-il acceptable ?",
        "options": [
          "Oui, si la faute est grave",
          "Non, jamais",
          "Seulement après 10 ans"
        ],
        "correctIndex": 1
      },
      {
        "question": "La discipline positive signifie-t-elle l'absence de règles ?",
        "options": [
          "Oui",
          "Non, c'est un encadrement qui protège le développement",
          "Seulement pour les adolescents"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le type de discipline doit-il être adapté à l'âge de l'enfant ?",
        "options": [
          "Oui",
          "Non, elle doit être identique à tout âge",
          "Seulement après 6 ans"
        ],
        "correctIndex": 0
      },
      {
        "question": "Ce qui convient à un adolescent convient-il à un enfant de 3 ans, selon le module ?",
        "options": [
          "Oui, toujours",
          "Non",
          "Cela dépend du sexe de l'enfant"
        ],
        "correctIndex": 1
      },
      {
        "question": "Les sanctions punitives et corporelles ont-elles un impact prouvé sur le développement de l'enfant ?",
        "options": [
          "Oui, négatif",
          "Non, aucun impact",
          "Oui, positif"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quels aspects du développement sont affectés par les sanctions corporelles selon ce module ?",
        "options": [
          "Physique, psychique et émotionnel",
          "Seulement physique",
          "Aucun"
        ],
        "correctIndex": 0
      },
      {
        "question": "Combien de messages essentiels le module retient-il sur la discipline positive ?",
        "options": [
          "2",
          "4",
          "6"
        ],
        "correctIndex": 1
      },
      {
        "question": "Peut-on priver un enfant d'affection en guise de punition ?",
        "options": [
          "Oui",
          "Non, jamais",
          "Seulement en cas de récidive"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module recommande-t-il de définir des règles claires à la maison ?",
        "options": [
          "Oui, avec l'enfant",
          "Non",
          "Seulement pour les plus de 10 ans"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les conséquences en cas de non-respect des règles doivent être :",
        "options": [
          "Appropriées et non violentes",
          "Sévères et corporelles",
          "Absentes"
        ],
        "correctIndex": 0
      },
      {
        "question": "La faute commise par un enfant justifie-t-elle de le priver de ses droits fondamentaux ?",
        "options": [
          "Oui, si la faute est grave",
          "Non, jamais",
          "Seulement au-delà de 3 fautes"
        ],
        "correctIndex": 1
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "La discipline positive",
          "La nutrition infantile",
          "Le mariage des enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "La communication est-elle jugée efficace comme outil de discipline ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour les filles"
        ],
        "correctIndex": 0
      },
      {
        "question": "Un cadre de discipline positive protège-t-il le développement de l'enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement à l'école"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quel est le 4ème message essentiel du module sur la discipline ?",
        "options": [
          "Priver un enfant de ses droits n'est jamais acceptable",
          "Il faut toujours punir physiquement",
          "La discipline n'a pas besoin d'être adaptée à l'âge"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les conseils sont-ils présentés comme un outil de discipline utile ?",
        "options": [
          "Oui",
          "Non",
          "Seulement en groupe"
        ],
        "correctIndex": 0
      },
      {
        "question": "Adapter la discipline à l'âge de l'enfant est-il présenté comme important ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour les garçons"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module associe-t-il la discipline positive à la protection du développement de l'enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement en théorie"
        ],
        "correctIndex": 0
      },
      {
        "question": "La sanction est-elle présentée comme le meilleur outil de discipline ?",
        "options": [
          "Oui",
          "Non, la communication est plus efficace",
          "Seulement pour les plus de 15 ans"
        ],
        "correctIndex": 1
      }
    ],
    "sousModules": [
      {
        "id": "u06-discipliner-sans-punir-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "main levée barrée",
        "questions": [
          {
            "question": "Quel outil de discipline est présenté comme plus efficace que la sanction ?",
            "options": [
              "La communication et les conseils",
              "La punition physique",
              "L'ignorance de l'enfant"
            ],
            "correctIndex": 0
          },
          {
            "question": "Priver un enfant de nourriture ou d'école en punition est-il acceptable ?",
            "options": [
              "Oui, si la faute est grave",
              "Non, jamais",
              "Seulement après 10 ans"
            ],
            "correctIndex": 1
          },
          {
            "question": "La discipline positive signifie-t-elle l'absence de règles ?",
            "options": [
              "Oui",
              "Non, c'est un encadrement qui protège le développement",
              "Seulement pour les adolescents"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le type de discipline doit-il être adapté à l'âge de l'enfant ?",
            "options": [
              "Oui",
              "Non, elle doit être identique à tout âge",
              "Seulement après 6 ans"
            ],
            "correctIndex": 0
          },
          {
            "question": "Ce qui convient à un adolescent convient-il à un enfant de 3 ans, selon le module ?",
            "options": [
              "Oui, toujours",
              "Non",
              "Cela dépend du sexe de l'enfant"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u06-discipliner-sans-punir-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "bulle de dialogue",
        "questions": [
          {
            "question": "Les sanctions punitives et corporelles ont-elles un impact prouvé sur le développement de l'enfant ?",
            "options": [
              "Oui, négatif",
              "Non, aucun impact",
              "Oui, positif"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quels aspects du développement sont affectés par les sanctions corporelles selon ce module ?",
            "options": [
              "Physique, psychique et émotionnel",
              "Seulement physique",
              "Aucun"
            ],
            "correctIndex": 0
          },
          {
            "question": "Combien de messages essentiels le module retient-il sur la discipline positive ?",
            "options": [
              "2",
              "4",
              "6"
            ],
            "correctIndex": 1
          },
          {
            "question": "Peut-on priver un enfant d'affection en guise de punition ?",
            "options": [
              "Oui",
              "Non, jamais",
              "Seulement en cas de récidive"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le module recommande-t-il de définir des règles claires à la maison ?",
            "options": [
              "Oui, avec l'enfant",
              "Non",
              "Seulement pour les plus de 10 ans"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u06-discipliner-sans-punir-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "règle/livre",
        "questions": [
          {
            "question": "Les conséquences en cas de non-respect des règles doivent être :",
            "options": [
              "Appropriées et non violentes",
              "Sévères et corporelles",
              "Absentes"
            ],
            "correctIndex": 0
          },
          {
            "question": "La faute commise par un enfant justifie-t-elle de le priver de ses droits fondamentaux ?",
            "options": [
              "Oui, si la faute est grave",
              "Non, jamais",
              "Seulement au-delà de 3 fautes"
            ],
            "correctIndex": 1
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "La discipline positive",
              "La nutrition infantile",
              "Le mariage des enfants"
            ],
            "correctIndex": 0
          },
          {
            "question": "La communication est-elle jugée efficace comme outil de discipline ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour les filles"
            ],
            "correctIndex": 0
          },
          {
            "question": "Un cadre de discipline positive protège-t-il le développement de l'enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement à l'école"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u06-discipliner-sans-punir-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "cœur",
        "questions": [
          {
            "question": "Quel est le 4ème message essentiel du module sur la discipline ?",
            "options": [
              "Priver un enfant de ses droits n'est jamais acceptable",
              "Il faut toujours punir physiquement",
              "La discipline n'a pas besoin d'être adaptée à l'âge"
            ],
            "correctIndex": 0
          },
          {
            "question": "Les conseils sont-ils présentés comme un outil de discipline utile ?",
            "options": [
              "Oui",
              "Non",
              "Seulement en groupe"
            ],
            "correctIndex": 0
          },
          {
            "question": "Adapter la discipline à l'âge de l'enfant est-il présenté comme important ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour les garçons"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module associe-t-il la discipline positive à la protection du développement de l'enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement en théorie"
            ],
            "correctIndex": 0
          },
          {
            "question": "La sanction est-elle présentée comme le meilleur outil de discipline ?",
            "options": [
              "Oui",
              "Non, la communication est plus efficace",
              "Seulement pour les plus de 15 ans"
            ],
            "correctIndex": 1
          }
        ]
      }
    ]
  },
  {
    "id": "u07-pratiques-nefastes",
    "moduleOrigine": "Module 9 — Pratiques néfastes contre les enfants (p.93-99)",
    "titre": "Reconnaître les pratiques néfastes",
    "thematique": "Protection contre les pratiques néfastes",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Le mariage d'enfants (avant 18 ans) touche 29,8% des enfants au Cameroun, surtout les filles. C'est une pratique néfaste, jamais un choix positif pour l'enfant.",
    "scriptAudioIvr": "Certaines pratiques traditionnelles, bien qu'acceptées culturellement, nuisent gravement aux enfants. Le mariage d'enfants concerne tout mariage entre une personne de moins de 18 ans et un adulte ou un autre enfant. Au Cameroun, près de 3 enfants sur 10 sont mariés avant l'âge adulte, surtout des filles, notamment dans le Nord, l'Adamaoua, l'Extrême-Nord et l'Est. Si vous connaissez une situation à risque, parlez-en à votre facilitateur communautaire ou contactez un centre d'aide.",
    "corpsApp": "Certaines pratiques traditionnelles sont acceptées culturellement mais ont un effet négatif prouvé sur le développement physique, psychologique et affectif des enfants et des adolescents.\n\nLe mariage d'enfants en est un exemple central : il désigne tout mariage officiel ou union non officialisée entre un enfant de moins de 18 ans et un adulte ou un autre enfant. Au Cameroun, le taux de prévalence du mariage d'enfants est de 29,8% (Enquête Démographique et de Santé, 2018), avec des taux plus élevés dans les régions du Nord, de l'Adamaoua, de l'Extrême-Nord et de l'Est. Cette pratique touche majoritairement les filles.\n\nAucun avantage culturel ou économique ne compense les conséquences du mariage d'enfants sur la santé physique, l'équilibre psychologique et l'avenir social de l'enfant.\n\nSi vous êtes témoin ou informé d'une situation de mariage d'enfant, de violence ou d'exploitation, parlez-en immédiatement à votre facilitateur communautaire ou au centre de santé le plus proche.",
    "pictogrammes": [
      "main stop",
      "balance",
      "carte du Cameroun",
      "téléphone d'aide"
    ],
    "quiz": [
      {
        "question": "Quel est le taux de prévalence du mariage d'enfants au Cameroun (EDS 2018) ?",
        "options": [
          "9,8%",
          "19,8%",
          "29,8%"
        ],
        "correctIndex": 2
      },
      {
        "question": "Que faire si vous êtes informé d'un cas de mariage d'enfant ?",
        "options": [
          "Ne rien dire, c'est une affaire privée",
          "En parler au facilitateur communautaire ou au centre de santé",
          "Attendre que l'enfant devienne majeur"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le mariage d'enfants concerne toute union entre :",
        "options": [
          "Deux adultes",
          "Un enfant de moins de 18 ans et un adulte ou un autre enfant",
          "Deux enfants du même âge uniquement"
        ],
        "correctIndex": 1
      },
      {
        "question": "Certaines pratiques traditionnelles nuisibles sont-elles culturellement acceptées ?",
        "options": [
          "Oui, bien qu'ayant un effet négatif prouvé",
          "Non, jamais acceptées",
          "Elles n'existent pas"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le mariage d'enfants touche majoritairement :",
        "options": [
          "Les garçons",
          "Les filles",
          "Également les deux sexes"
        ],
        "correctIndex": 1
      },
      {
        "question": "Quelles régions du Cameroun présentent des taux plus élevés de mariage d'enfants ?",
        "options": [
          "Nord, Adamaoua, Extrême-Nord, Est",
          "Littoral et Ouest uniquement",
          "Toutes les régions de façon égale"
        ],
        "correctIndex": 0
      },
      {
        "question": "Un avantage économique peut-il compenser les conséquences du mariage d'enfants ?",
        "options": [
          "Oui",
          "Non, aucun avantage ne compense",
          "Seulement si la famille est pauvre"
        ],
        "correctIndex": 1
      },
      {
        "question": "Sur quelles données s'appuie le taux de 29,8% cité dans le module ?",
        "options": [
          "L'Enquête Démographique et de Santé (2018)",
          "Une estimation personnelle",
          "Un sondage international"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le mariage d'enfants a-t-il un impact sur la santé physique de l'enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement psychologique"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le mariage d'enfants a-t-il un impact sur l'équilibre psychologique ?",
        "options": [
          "Oui",
          "Non",
          "Aucun effet démontré"
        ],
        "correctIndex": 0
      },
      {
        "question": "À qui parler en cas de situation de violence ou d'exploitation constatée ?",
        "options": [
          "À un facilitateur communautaire ou centre de santé",
          "À personne, ce n'est pas notre rôle",
          "Uniquement à la police"
        ],
        "correctIndex": 0
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "Les pratiques néfastes contre les enfants",
          "La communication parent-enfant",
          "La discipline positive"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le mariage d'enfants affecte-t-il l'avenir social de l'enfant ?",
        "options": [
          "Oui",
          "Non",
          "Seulement l'avenir professionnel"
        ],
        "correctIndex": 0
      },
      {
        "question": "Doit-on agir immédiatement en cas de connaissance d'un mariage d'enfant ?",
        "options": [
          "Oui",
          "Non, il faut attendre",
          "Seulement si on est de la famille"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module considère-t-il ces pratiques comme sans conséquence si elles sont traditionnelles ?",
        "options": [
          "Oui",
          "Non, l'effet négatif est prouvé malgré la tradition",
          "Cela dépend de la région"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le mariage d'enfants est-il défini comme uniquement un mariage \"officiel\" ?",
        "options": [
          "Oui, uniquement officiel",
          "Non, aussi une union non officialisée",
          "Seulement religieux"
        ],
        "correctIndex": 1
      },
      {
        "question": "Quel est l'objectif principal de ce module ?",
        "options": [
          "Aider à reconnaître les pratiques néfastes envers les enfants",
          "Expliquer la nutrition du nourrisson",
          "Présenter le système scolaire"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module encourage-t-il le silence face à une situation à risque ?",
        "options": [
          "Oui",
          "Non, il encourage à en parler",
          "Seulement en cas de doute"
        ],
        "correctIndex": 1
      },
      {
        "question": "Les conséquences du mariage d'enfants concernent-elles uniquement la santé physique ?",
        "options": [
          "Oui",
          "Non, aussi psychologique et social",
          "Uniquement l'aspect financier"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module s'appuie-t-il sur des données chiffrées officielles ?",
        "options": [
          "Oui",
          "Non, seulement des impressions",
          "Uniquement des témoignages"
        ],
        "correctIndex": 0
      }
    ],
    "sousModules": [
      {
        "id": "u07-pratiques-nefastes-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "main stop",
        "questions": [
          {
            "question": "Quel est le taux de prévalence du mariage d'enfants au Cameroun (EDS 2018) ?",
            "options": [
              "9,8%",
              "19,8%",
              "29,8%"
            ],
            "correctIndex": 2
          },
          {
            "question": "Que faire si vous êtes informé d'un cas de mariage d'enfant ?",
            "options": [
              "Ne rien dire, c'est une affaire privée",
              "En parler au facilitateur communautaire ou au centre de santé",
              "Attendre que l'enfant devienne majeur"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le mariage d'enfants concerne toute union entre :",
            "options": [
              "Deux adultes",
              "Un enfant de moins de 18 ans et un adulte ou un autre enfant",
              "Deux enfants du même âge uniquement"
            ],
            "correctIndex": 1
          },
          {
            "question": "Certaines pratiques traditionnelles nuisibles sont-elles culturellement acceptées ?",
            "options": [
              "Oui, bien qu'ayant un effet négatif prouvé",
              "Non, jamais acceptées",
              "Elles n'existent pas"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le mariage d'enfants touche majoritairement :",
            "options": [
              "Les garçons",
              "Les filles",
              "Également les deux sexes"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u07-pratiques-nefastes-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "balance",
        "questions": [
          {
            "question": "Quelles régions du Cameroun présentent des taux plus élevés de mariage d'enfants ?",
            "options": [
              "Nord, Adamaoua, Extrême-Nord, Est",
              "Littoral et Ouest uniquement",
              "Toutes les régions de façon égale"
            ],
            "correctIndex": 0
          },
          {
            "question": "Un avantage économique peut-il compenser les conséquences du mariage d'enfants ?",
            "options": [
              "Oui",
              "Non, aucun avantage ne compense",
              "Seulement si la famille est pauvre"
            ],
            "correctIndex": 1
          },
          {
            "question": "Sur quelles données s'appuie le taux de 29,8% cité dans le module ?",
            "options": [
              "L'Enquête Démographique et de Santé (2018)",
              "Une estimation personnelle",
              "Un sondage international"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le mariage d'enfants a-t-il un impact sur la santé physique de l'enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement psychologique"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le mariage d'enfants a-t-il un impact sur l'équilibre psychologique ?",
            "options": [
              "Oui",
              "Non",
              "Aucun effet démontré"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u07-pratiques-nefastes-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "carte du Cameroun",
        "questions": [
          {
            "question": "À qui parler en cas de situation de violence ou d'exploitation constatée ?",
            "options": [
              "À un facilitateur communautaire ou centre de santé",
              "À personne, ce n'est pas notre rôle",
              "Uniquement à la police"
            ],
            "correctIndex": 0
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "Les pratiques néfastes contre les enfants",
              "La communication parent-enfant",
              "La discipline positive"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le mariage d'enfants affecte-t-il l'avenir social de l'enfant ?",
            "options": [
              "Oui",
              "Non",
              "Seulement l'avenir professionnel"
            ],
            "correctIndex": 0
          },
          {
            "question": "Doit-on agir immédiatement en cas de connaissance d'un mariage d'enfant ?",
            "options": [
              "Oui",
              "Non, il faut attendre",
              "Seulement si on est de la famille"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module considère-t-il ces pratiques comme sans conséquence si elles sont traditionnelles ?",
            "options": [
              "Oui",
              "Non, l'effet négatif est prouvé malgré la tradition",
              "Cela dépend de la région"
            ],
            "correctIndex": 1
          }
        ]
      },
      {
        "id": "u07-pratiques-nefastes-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "téléphone d'aide",
        "questions": [
          {
            "question": "Le mariage d'enfants est-il défini comme uniquement un mariage \"officiel\" ?",
            "options": [
              "Oui, uniquement officiel",
              "Non, aussi une union non officialisée",
              "Seulement religieux"
            ],
            "correctIndex": 1
          },
          {
            "question": "Quel est l'objectif principal de ce module ?",
            "options": [
              "Aider à reconnaître les pratiques néfastes envers les enfants",
              "Expliquer la nutrition du nourrisson",
              "Présenter le système scolaire"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le module encourage-t-il le silence face à une situation à risque ?",
            "options": [
              "Oui",
              "Non, il encourage à en parler",
              "Seulement en cas de doute"
            ],
            "correctIndex": 1
          },
          {
            "question": "Les conséquences du mariage d'enfants concernent-elles uniquement la santé physique ?",
            "options": [
              "Oui",
              "Non, aussi psychologique et social",
              "Uniquement l'aspect financier"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le module s'appuie-t-il sur des données chiffrées officielles ?",
            "options": [
              "Oui",
              "Non, seulement des impressions",
              "Uniquement des témoignages"
            ],
            "correctIndex": 0
          }
        ]
      }
    ]
  },
  {
    "id": "u08-accompagner-adolescent",
    "moduleOrigine": "Module 10 — Accompagner son enfant à l'adolescence (p.100-107)",
    "titre": "Accompagner son adolescent",
    "thematique": "Adolescence",
    "statutValidation": "Validé",
    "version": "v1",
    "resumeSms": "Comprendre les changements de l'adolescence aide à mieux accompagner son enfant. Écouter ses attentes renforce la confiance et l'estime de soi mutuelles.",
    "scriptAudioIvr": "Les parents ont un rôle essentiel pour accompagner leurs enfants à travers les défis de l'adolescence. Bien connaître les changements physiques et émotionnels de cette période permet de mieux comprendre ce que vit votre adolescent, et de lui offrir l'encadrement dont il a besoin. Prendre en compte ses attentes, tout en gardant le dialogue ouvert, renforce la confiance mutuelle et l'estime de soi.",
    "corpsApp": "L'adolescence est une période de changements physiques, émotionnels et sociaux importants. Les parents ont un rôle important à jouer pour accompagner leurs enfants à mieux faire face à ces défis.\n\nUne bonne connaissance, par les parents, des changements liés à l'adolescence permet de comprendre les attentes de leur enfant et de lui fournir l'encadrement adéquat nécessaire à son épanouissement.\n\nPrendre en compte à la fois les attentes des parents et celles des adolescents renforce la confiance mutuelle et l'estime de soi de part et d'autre — plutôt qu'un rapport de force, l'adolescence se traverse mieux en dialogue.",
    "pictogrammes": [
      "adolescent",
      "bulle de dialogue double",
      "cœur",
      "chemin/étapes"
    ],
    "quiz": [
      {
        "question": "Comment l'adolescence se traverse-t-elle le mieux, selon ce module ?",
        "options": [
          "Par un rapport de force",
          "Par le dialogue",
          "En évitant le sujet"
        ],
        "correctIndex": 1
      },
      {
        "question": "Que renforce la prise en compte des attentes de l'adolescent ?",
        "options": [
          "La confiance mutuelle et l'estime de soi",
          "La distance entre parent et enfant",
          "Rien de particulier"
        ],
        "correctIndex": 0
      },
      {
        "question": "L'adolescence est-elle décrite comme une période de changements importants ?",
        "options": [
          "Oui",
          "Non",
          "Seulement pour les filles"
        ],
        "correctIndex": 0
      },
      {
        "question": "Quels types de changements caractérisent l'adolescence selon le module ?",
        "options": [
          "Physiques, émotionnels et sociaux",
          "Uniquement physiques",
          "Aucun changement notable"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les parents ont-ils un rôle à jouer pendant l'adolescence de leur enfant ?",
        "options": [
          "Oui, un rôle important",
          "Non, aucun rôle",
          "Seulement en cas de problème"
        ],
        "correctIndex": 0
      },
      {
        "question": "Une bonne connaissance des changements de l'adolescence permet de :",
        "options": [
          "Comprendre les attentes de l'enfant et l'encadrer adéquatement",
          "Ignorer les besoins de l'enfant",
          "Le laisser totalement livré à lui-même"
        ],
        "correctIndex": 0
      },
      {
        "question": "Prendre en compte les attentes des deux côtés (parent et adolescent) a quel effet ?",
        "options": [
          "Cela renforce la confiance mutuelle",
          "Cela crée plus de conflits",
          "Aucun effet"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le rapport de force est-il présenté comme la meilleure approche à l'adolescence ?",
        "options": [
          "Oui",
          "Non, le dialogue est préférable",
          "Seulement pour les garçons"
        ],
        "correctIndex": 1
      },
      {
        "question": "Ce module porte principalement sur :",
        "options": [
          "Accompagner son enfant à l'adolescence",
          "La pression de fracturation",
          "Le mariage des enfants"
        ],
        "correctIndex": 0
      },
      {
        "question": "L'estime de soi de l'adolescent peut-elle être renforcée par le dialogue avec ses parents ?",
        "options": [
          "Oui",
          "Non",
          "Seulement à l'école"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les parents doivent-ils ignorer les attentes de leur adolescent ?",
        "options": [
          "Oui",
          "Non, il faut en tenir compte",
          "Seulement après 16 ans"
        ],
        "correctIndex": 1
      },
      {
        "question": "L'adolescence est-elle présentée comme une période à éviter de discuter ?",
        "options": [
          "Oui",
          "Non, le dialogue est encouragé",
          "Seulement pour les sujets sensibles"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module lie-t-il connaissance des changements de l'adolescence et encadrement adéquat ?",
        "options": [
          "Oui",
          "Non",
          "Aucun lien mentionné"
        ],
        "correctIndex": 0
      },
      {
        "question": "Selon le module, à quoi sert le dialogue pendant l'adolescence ?",
        "options": [
          "À renforcer la confiance mutuelle",
          "À imposer des règles strictes uniquement",
          "À éviter tout sujet difficile"
        ],
        "correctIndex": 0
      },
      {
        "question": "L'épanouissement de l'adolescent dépend-il en partie de l'encadrement parental adéquat ?",
        "options": [
          "Oui",
          "Non",
          "Seulement de l'école"
        ],
        "correctIndex": 0
      },
      {
        "question": "Le module oppose-t-il \"rapport de force\" et \"dialogue\" comme deux approches possibles ?",
        "options": [
          "Oui",
          "Non",
          "Ces notions ne sont pas mentionnées"
        ],
        "correctIndex": 0
      },
      {
        "question": "Les attentes des parents seules suffisent-elles selon ce module ?",
        "options": [
          "Oui",
          "Non, celles de l'adolescent comptent aussi",
          "Seulement les attentes du père"
        ],
        "correctIndex": 1
      },
      {
        "question": "Le module considère-t-il l'adolescence comme une période à \"gérer\" en silence ?",
        "options": [
          "Oui",
          "Non, il encourage la communication",
          "Seulement en cas de crise"
        ],
        "correctIndex": 1
      },
      {
        "question": "Quel est le principal message du module sur la relation parent-adolescent ?",
        "options": [
          "Favoriser le dialogue plutôt que le rapport de force",
          "Imposer strictement les règles",
          "Laisser l'adolescent totalement autonome"
        ],
        "correctIndex": 0
      },
      {
        "question": "La confiance mutuelle est-elle présentée comme un objectif atteignable pendant l'adolescence ?",
        "options": [
          "Oui",
          "Non",
          "Seulement en théorie"
        ],
        "correctIndex": 0
      }
    ],
    "sousModules": [
      {
        "id": "u08-accompagner-adolescent-p1",
        "titre": "Découvrir",
        "description": "Une première approche du sujet, en douceur.",
        "icone": "adolescent",
        "questions": [
          {
            "question": "Comment l'adolescence se traverse-t-elle le mieux, selon ce module ?",
            "options": [
              "Par un rapport de force",
              "Par le dialogue",
              "En évitant le sujet"
            ],
            "correctIndex": 1
          },
          {
            "question": "Que renforce la prise en compte des attentes de l'adolescent ?",
            "options": [
              "La confiance mutuelle et l'estime de soi",
              "La distance entre parent et enfant",
              "Rien de particulier"
            ],
            "correctIndex": 0
          },
          {
            "question": "L'adolescence est-elle décrite comme une période de changements importants ?",
            "options": [
              "Oui",
              "Non",
              "Seulement pour les filles"
            ],
            "correctIndex": 0
          },
          {
            "question": "Quels types de changements caractérisent l'adolescence selon le module ?",
            "options": [
              "Physiques, émotionnels et sociaux",
              "Uniquement physiques",
              "Aucun changement notable"
            ],
            "correctIndex": 0
          },
          {
            "question": "Les parents ont-ils un rôle à jouer pendant l'adolescence de leur enfant ?",
            "options": [
              "Oui, un rôle important",
              "Non, aucun rôle",
              "Seulement en cas de problème"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u08-accompagner-adolescent-p2",
        "titre": "Comprendre",
        "description": "On explique le \"pourquoi\" derrière les conseils du guide.",
        "icone": "bulle de dialogue double",
        "questions": [
          {
            "question": "Une bonne connaissance des changements de l'adolescence permet de :",
            "options": [
              "Comprendre les attentes de l'enfant et l'encadrer adéquatement",
              "Ignorer les besoins de l'enfant",
              "Le laisser totalement livré à lui-même"
            ],
            "correctIndex": 0
          },
          {
            "question": "Prendre en compte les attentes des deux côtés (parent et adolescent) a quel effet ?",
            "options": [
              "Cela renforce la confiance mutuelle",
              "Cela crée plus de conflits",
              "Aucun effet"
            ],
            "correctIndex": 0
          },
          {
            "question": "Le rapport de force est-il présenté comme la meilleure approche à l'adolescence ?",
            "options": [
              "Oui",
              "Non, le dialogue est préférable",
              "Seulement pour les garçons"
            ],
            "correctIndex": 1
          },
          {
            "question": "Ce module porte principalement sur :",
            "options": [
              "Accompagner son enfant à l'adolescence",
              "La pression de fracturation",
              "Le mariage des enfants"
            ],
            "correctIndex": 0
          },
          {
            "question": "L'estime de soi de l'adolescent peut-elle être renforcée par le dialogue avec ses parents ?",
            "options": [
              "Oui",
              "Non",
              "Seulement à l'école"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u08-accompagner-adolescent-p3",
        "titre": "Approfondir",
        "description": "Des situations concrètes pour aller plus loin.",
        "icone": "cœur",
        "questions": [
          {
            "question": "Les parents doivent-ils ignorer les attentes de leur adolescent ?",
            "options": [
              "Oui",
              "Non, il faut en tenir compte",
              "Seulement après 16 ans"
            ],
            "correctIndex": 1
          },
          {
            "question": "L'adolescence est-elle présentée comme une période à éviter de discuter ?",
            "options": [
              "Oui",
              "Non, le dialogue est encouragé",
              "Seulement pour les sujets sensibles"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le module lie-t-il connaissance des changements de l'adolescence et encadrement adéquat ?",
            "options": [
              "Oui",
              "Non",
              "Aucun lien mentionné"
            ],
            "correctIndex": 0
          },
          {
            "question": "Selon le module, à quoi sert le dialogue pendant l'adolescence ?",
            "options": [
              "À renforcer la confiance mutuelle",
              "À imposer des règles strictes uniquement",
              "À éviter tout sujet difficile"
            ],
            "correctIndex": 0
          },
          {
            "question": "L'épanouissement de l'adolescent dépend-il en partie de l'encadrement parental adéquat ?",
            "options": [
              "Oui",
              "Non",
              "Seulement de l'école"
            ],
            "correctIndex": 0
          }
        ]
      },
      {
        "id": "u08-accompagner-adolescent-p4",
        "titre": "Retenir",
        "description": "On consolide ce qui compte vraiment à retenir.",
        "icone": "chemin/étapes",
        "questions": [
          {
            "question": "Le module oppose-t-il \"rapport de force\" et \"dialogue\" comme deux approches possibles ?",
            "options": [
              "Oui",
              "Non",
              "Ces notions ne sont pas mentionnées"
            ],
            "correctIndex": 0
          },
          {
            "question": "Les attentes des parents seules suffisent-elles selon ce module ?",
            "options": [
              "Oui",
              "Non, celles de l'adolescent comptent aussi",
              "Seulement les attentes du père"
            ],
            "correctIndex": 1
          },
          {
            "question": "Le module considère-t-il l'adolescence comme une période à \"gérer\" en silence ?",
            "options": [
              "Oui",
              "Non, il encourage la communication",
              "Seulement en cas de crise"
            ],
            "correctIndex": 1
          },
          {
            "question": "Quel est le principal message du module sur la relation parent-adolescent ?",
            "options": [
              "Favoriser le dialogue plutôt que le rapport de force",
              "Imposer strictement les règles",
              "Laisser l'adolescent totalement autonome"
            ],
            "correctIndex": 0
          },
          {
            "question": "La confiance mutuelle est-elle présentée comme un objectif atteignable pendant l'adolescence ?",
            "options": [
              "Oui",
              "Non",
              "Seulement en théorie"
            ],
            "correctIndex": 0
          }
        ]
      }
    ]
  }
];
