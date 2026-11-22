import { EducationTopic } from '@signbridge/types';

export const KARNATAKA_CLASS_8_SCIENCE_CURRICULUM: EducationTopic[] = [
  {
    id: 'karn-c8-crop',
    chapterNumber: 1,
    chapterTitleKn: 'ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ನಿರ್ವಹಣೆ',
    chapterTitleEn: 'Crop Production and Management',
    subject: 'science',
    grade: 8,
    board: 'Karnataka State Board',
    descriptionKn: 'ಕೃಷಿ ಪದ್ಧತಿಗಳು, ಮಣ್ಣಿನ ಸಿದ್ಧತೆ, ಬಿತ್ತನೆ, ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳು, ನೀರಾವರಿ ವಿಧಾನಗಳು ಹಾಗೂ ಕಳೆ ನಿರ್ವಹಣೆ.',
    descriptionEn: 'Agricultural practices, soil preparation, sowing, manures and fertilizers, irrigation methods, and weed management.',
    keyConcepts: [
      {
        termKn: 'ಖಾರಿಫ್ ಬೆಳೆಗಳು',
        termEn: 'Kharif Crops',
        definitionKn: 'ಮಳೆಗಾಲದಲ್ಲಿ (ಜೂನ್‌ನಿಂದ ಸೆಪ್ಟೆಂಬರ್‌ವರೆಗೆ) ಬೆಳೆಯುವ ಬೆಳೆಗಳು (ಉದಾ: ಭತ್ತ, ಮುಸುಕಿನ ಜೋಳ, ಹತ್ತಿ).',
        definitionEn: 'Crops sown in the rainy season from June to September (e.g., paddy, maize, cotton).',
        ruralAnalogyKn: 'ಕರ್ನಾಟಕದ ಮುಂಗಾರು ಮಳೆಯ ಆರಂಭದಲ್ಲಿ ನಮ್ಮ ಹಳ್ಳಿಗಳಲ್ಲಿ ಬಿತ್ತುವ ಭತ್ತ ಮತ್ತು ಜೋಳದ ಬೆಳೆಗಳಂತೆ.',
        everydayExample: 'ಮಂಡ್ಯ ಅಥವಾ ರಾಯಚೂರಿನ ಮುಂಗಾರು ಬೆಳೆಗಳು.'
      },
      {
        termKn: 'ರಬಿ ಬೆಳೆಗಳು',
        termEn: 'Rabi Crops',
        definitionKn: 'ಚಳಿಗಾಲದಲ್ಲಿ (ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್‌ವರೆಗೆ) ಬೆಳೆಯುವ ಬೆಳೆಗಳು (ಉದಾ: ಗೋಧಿ, ಕಡಲೆ, ಸಾಸಿವೆ).',
        definitionEn: 'Crops grown in the winter season from October to March (e.g., wheat, gram, mustard).',
        ruralAnalogyKn: 'ದೀಪಾವಳಿಯ ನಂತರ ಮಳೆ ನಿಂತಾಗ ಚಳಿಗಾಲದ ತಂಪಾದ ಹವೆಯಲ್ಲಿ ಬೆಳೆಯುವ ಹಿಂಗಾರು ಬೆಳೆಗಳು.',
        everydayExample: 'ಹಿಂಗಾರು ಹಂಗಾಮಿನ ಕಡಲೆ ಮತ್ತು ಗೋಧಿ ಬೆಳೆಗಳು.'
      },
      {
        termKn: 'ಹನಿ ನೀರಾವರಿ',
        termEn: 'Drip Irrigation',
        definitionKn: 'ನೀರನ್ನು ನೇರವಾಗಿ ಸಸ್ಯಗಳ ಬೇರುಗಳ ಹತ್ತಿರ ಹನಿ ಹನಿಯಾಗಿ ಬೀಳಿಸುವ ಆಧುನಿಕ ನೀರಾವರಿ ಪದ್ಧತಿ.',
        definitionEn: 'Modern irrigation method where water falls drop by drop directly near roots, preventing water wastage.',
        ruralAnalogyKn: 'ನೀರಿನ ಕೊರತೆಯಿರುವ ಕೋಲಾರ ಅಥವಾ ವಿಜಯಪುರ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಕೃಷಿ ಮಾಡುವಾಗ ಪ್ರತಿ ಹನಿ ನೀರನ್ನೂ ಉಳಿಸುವ ತಂತ್ರಜ್ಞಾನ.',
        everydayExample: 'ತೆಂಗಿನ ತೋಟ ಅಥವಾ ತರಕಾರಿ ಬೆಳೆಗಳಿಗೆ ಪೈಪ್ ಮೂಲಕ ನೇರ ಬೇರಿಗೆ ನೀರು ಕೊಡುವುದು.'
      }
    ],
    lessons: [
      {
        id: 'c8-crop-l1',
        titleKn: 'ಮಣ್ಣಿನ ಸಿದ್ಧತೆ ಮತ್ತು ಬಿತ್ತನೆ',
        titleEn: 'Preparation of Soil and Sowing',
        summaryKn: 'ಉಳುಮೆಯ ಮೂಲಕ ಮಣ್ಣನ್ನು ಸಡಿಲಗೊಳಿಸುವುದು ಮತ್ತು ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಬೀಜಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡುವುದು.',
        summaryEn: 'Loosening the soil through ploughing and selecting high-yield, disease-free seeds.',
        explanationKn: 'ಮಣ್ಣನ್ನು ಸಡಿಲಗೊಳಿಸುವುದರಿಂದ ಬೇರುಗಳು ಆಳಕ್ಕೆ ಇಳಿಯಲು ಮತ್ತು ಸುಲಭವಾಗಿ ಉಸಿರಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ. ಎರೆಹುಳುಗಳು ಮತ್ತು ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳು ಬೆಳೆಯಲು ಇದು ಸಹಾಯಕ.',
        explanationEn: 'Loosening soil allows roots to penetrate deep and breathe easily, encouraging helpful earthworms and microbes.',
        keyPointsKn: [
          'ನೇಗಿಲು ಮತ್ತು ಕುಂಟೆ ಮಣ್ಣನ್ನು ಸಡಿಲಗೊಳಿಸಲು ಬಳಕೆಯಾಗುತ್ತದೆ.',
          'ಉತ್ತಮ ಬೀಜಗಳು ನೀರಿನಲ್ಲಿ ಮುಳುಗುತ್ತವೆ, ಟೊಳ್ಳಾದ ಹಾನಿಗೊಳಗಾದ ಬೀಜಗಳು ಮೇಲೆ ತೇಲುತ್ತವೆ.',
          'ಬೀಜ ಕವಚ ಅಥವಾ ಸೀಡ್ ಡ್ರಿಲ್ ಮೂಲಕ ಸಮಾನ ಅಂತರದಲ್ಲಿ ಬಿತ್ತನೆ ಮಾಡಬೇಕು.'
        ],
        keyPointsEn: [
          'Plough and cultivator loosen and aerate the soil.',
          'Healthy seeds sink in water while damaged hollow seeds float.',
          'Seed drill ensures uniform distance and proper depth.'
        ],
        practicalActivityKn: 'ಒಂದು ಲೋಟ ನೀರಿನಲ್ಲಿ ಹಿಡಿ ಗೋಧಿ ಅಥವಾ ಕಡಲೆ ಕಾಳುಗಳನ್ನು ಹಾಕಿ; ತೇಲುವ ಹಾಳಾದ ಬೀಜಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.'
      },
      {
        id: 'c8-crop-l2',
        titleKn: 'ಗೊಬ್ಬರ ಮತ್ತು ನೀರಾವರಿ ಪದ್ಧತಿಗಳು',
        titleEn: 'Manure, Fertilizers and Irrigation',
        summaryKn: 'ಸಾವಯವ ಗೊಬ್ಬರ ಮತ್ತು ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸ ಹಾಗೂ ನೀರಿನ ಉಳಿತಾಯದ ನೀರಾವರಿ ವಿಧಾನಗಳು.',
        summaryEn: 'Comparison of organic manure vs chemical fertilizers, and modern water-efficient irrigation methods.',
        explanationKn: 'ಸಗಣಿ ಮತ್ತು ಎಲೆಗಳಿಂದ ಮಾಡಿದ ಕಾಂಪೋಸ್ಟ್ ಸಾವಯವ ಗೊಬ್ಬರ. ಯೂರಿಯಾ, ಡಿಎಪಿ ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳು. ಹನಿ ನೀರಾವರಿ ಮತ್ತು ತುಂತುರು ನೀರಾವರಿ ನೀರಿನ ಕೊರತೆಯಿರುವ ಪ್ರದೇಶಗಳಿಗೆ ಅತ್ಯುತ್ತಮ.',
        explanationEn: 'Organic manure improves soil texture and humus. Drip and sprinkler systems save water in drought-prone regions.',
        keyPointsKn: [
          'ಸಾವಯವ ಗೊಬ್ಬರ ಮಣ್ಣಿನ ರಚನೆಯನ್ನು ಸುಧಾರಿಸುತ್ತದೆ ಮತ್ತು ಜಲಧಾರಣ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.',
          'ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿಯು ನೀರಿನ ವ್ಯರ್ಥತೆಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತಡೆಯುತ್ತದೆ.',
          'ಲೆಗ್ಯೂಮ್ ಸಸ್ಯಗಳ ಬೇರುಗಳಲ್ಲಿರುವ ರೈಸೋಬಿಯಂ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸಾರಜನಕವನ್ನು ಸ್ಥಿರೀಕರಿಸುತ್ತದೆ.'
        ],
        keyPointsEn: [
          'Manure enriches soil humus without chemical residue.',
          'Drip irrigation minimizes evaporation and runoff.',
          'Rhizobium in leguminous plant roots enriches nitrogen.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-crop-1',
        topicId: 'karn-c8-crop',
        questionKn: 'ಖಾರಿಫ್ ಬೆಳೆಗಳನ್ನು ಯಾವ ತಿಂಗಳುಗಳಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ?',
        questionEn: 'In which months are Kharif crops cultivated?',
        optionsKn: ['ಜೂನ್‌ನಿಂದ ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್', 'ಮಾರ್ಚ್‌ನಿಂದ ಜೂನ್', 'ಡಿಸೆಂಬರ್‌ನಿಂದ ಫೆಬ್ರವರಿ'],
        optionsEn: ['June to September', 'October to March', 'March to June', 'December to February'],
        correctOptionIndex: 0,
        explanationKn: 'ಖಾರಿಫ್ ಬೆಳೆಗಳು ಮುಂಗಾರು ಮಳೆಯ ಆರಂಭದಲ್ಲಿ (ಜೂನ್) ಬಿತ್ತನೆಯಾಗಿ ಸೆಪ್ಟೆಂಬರ್‌ನಲ್ಲಿ ಕೊಯ್ಲಾಗುತ್ತದೆ (ಉದಾ: ಭತ್ತ, ರಾಗಿ, ಮೆಕ್ಕೆಜೋಳ).',
        explanationEn: 'Kharif crops depend on southwest monsoon rains, planted in June and harvested by September.',
        difficulty: 'easy',
        conceptTag: 'ಖಾರಿಫ್ ಬೆಳೆಗಳು'
      },
      {
        id: 'q-crop-2',
        topicId: 'karn-c8-crop',
        questionKn: 'ನೀರಿನ ತೀವ್ರ ಅಭಾವವಿರುವ ಪ್ರದೇಶಗಳಲ್ಲಿ ಯಾವ ನೀರಾವರಿ ವಿಧಾನವು ಅತ್ಯಂತ ಸೂಕ್ತವಾಗಿದೆ?',
        questionEn: 'Which irrigation method is best suited for water-deficient dry regions?',
        optionsKn: ['ಕಾಲುವೆ ನೀರಾವರಿ', 'ಹನಿ ನೀರಾವರಿ (Drip)', 'ಹರಿವು ನೀರಾವರಿ', 'ಬಾವಿ ನೀರಾವರಿ'],
        optionsEn: ['Canal irrigation', 'Drip irrigation', 'Flood irrigation', 'Well irrigation'],
        correctOptionIndex: 1,
        explanationKn: 'ಹನಿ ನೀರಾವರಿಯು ನೀರನ್ನು ನೇರವಾಗಿ ಗಿಡದ ಬುಡಕ್ಕೆ ತೊಟ್ಟಿಕ್ಕಿಸುವುದರಿಂದ ನೀರಿನ ಆವಿಯಾಗುವಿಕೆ ಅಥವಾ ಪೋಲಾಗುವಿಕೆ ತಡೆಯಲ್ಪಡುತ್ತದೆ.',
        explanationEn: 'Drip irrigation delivers water drop by drop directly to the root zone, maximizing efficiency.',
        difficulty: 'medium',
        conceptTag: 'ಹನಿ ನೀರಾವರಿ'
      },
      {
        id: 'q-crop-3',
        topicId: 'karn-c8-crop',
        questionKn: 'ಲೆಗ್ಯೂಮಿನಸ್ (ದ್ವಿದಳ ಧಾನ್ಯ) ಸಸ್ಯಗಳ ಬೇರು ಗಂಟುಗಳಲ್ಲಿರುವ ಯಾವ ಬ್ಯಾಕ್ಟೀರಿಯಾ ವಾತಾವರಣದ ಸಾರಜನಕವನ್ನು ಸ್ಥಿರೀಕರಿಸುತ್ತದೆ?',
        questionEn: 'Which bacteria present in the root nodules of leguminous plants fixes atmospheric nitrogen?',
        optionsKn: ['ಲ್ಯಾಕ್ಟೋಬ್ಯಾಸಿಲಸ್', 'ರೈಸೋಬಿಯಂ (Rhizobium)', 'ಯೀಸ್ಟ್', 'ಪೆನಿಸಿಲಿಯಂ'],
        optionsEn: ['Lactobacillus', 'Rhizobium', 'Yeast', 'Penicillium'],
        correctOptionIndex: 1,
        explanationKn: 'ರೈಸೋಬಿಯಂ ಬ್ಯಾಕ್ಟೀರಿಯಾಗಳು ದ್ವಿದಳ ಧಾನ್ಯ ಸಸ್ಯಗಳ ಬೇರುಗಳಲ್ಲಿ ಸಹಜೀವನ ನಡೆಸಿ ವಾತಾವರಣದ ಸಾರಜನಕವನ್ನು ಸಸ್ಯಗಳು ಬಳಸಬಹುದಾದ ನೈಟ್ರೇಟ್‌ಗಳಾಗಿ ಪರಿವರ್ತಿಸುತ್ತವೆ.',
        explanationEn: 'Rhizobium bacteria establish a symbiotic relationship in legume roots to fix nitrogen gas into nitrates.',
        difficulty: 'hard',
        conceptTag: 'ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ'
      }
    ]
  },
  {
    id: 'karn-c8-micro',
    chapterNumber: 2,
    chapterTitleKn: 'ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳು: ಮಿತ್ರ ಮತ್ತು ಶತ್ರು',
    chapterTitleEn: 'Microorganisms: Friend and Foe',
    subject: 'science',
    grade: 8,
    board: 'Karnataka State Board',
    descriptionKn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ, ಶಿಲೀಂಧ್ರ, ಪ್ರೋಟೋಜೋವಾ, ವೈರಸ್, ಹುದುಗುವಿಕೆ, ಪ್ರತಿಜೀವಕಗಳು, ಲಸಿಕೆ ಹಾಗೂ ಆಹಾರ ಸಂರಕ್ಷಣೆ.',
    descriptionEn: 'Bacteria, fungi, protozoa, viruses, fermentation, antibiotics, vaccines, and food preservation.',
    keyConcepts: [
      {
        termKn: 'ಲ್ಯಾಕ್ಟೋಬ್ಯಾಸಿಲಸ್',
        termEn: 'Lactobacillus',
        definitionKn: 'ಹಾಲನ್ನು ಮೊಸರನ್ನಾಗಿ ಪರಿವರ್ತಿಸುವ ಉಪಯುಕ್ತ ಬ್ಯಾಕ್ಟೀರಿಯಾ.',
        definitionEn: 'Beneficial bacterium that promotes the formation of curd from milk.',
        ruralAnalogyKn: 'ರಾತ್ರಿ ಉಗುರುಬೆಚ್ಚಗಿನ ಹಾಲಿಗೆ ಸ್ವಲ್ಪ ಹೆಪ್ಪು ಹಾಕಿದರೆ ಬೆಳಗ್ಗೆ ಗಟ್ಟಿ ಮೊಸರಾಗುವುದಕ್ಕೆ ಈ ಜೀವಿಯೇ ಕಾರಣ.',
        everydayExample: 'ಮನೆಯಲ್ಲಿ ಮಾಡುವ ಮಜ್ಜಿಗೆ ಮತ್ತು ಮೊಸರು.'
      },
      {
        termKn: 'ಹುದುಗುವಿಕೆ (ಫರ್ಮೆಂಟೇಶನ್)',
        termEn: 'Fermentation',
        definitionKn: 'ಯೀಸ್ಟ್‌ನಿಂದ ಸಕ್ಕರೆಯು ಆಲ್ಕೋಹಾಲ್ ಮತ್ತು ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ ಆಗಿ ಪರಿವರ್ತನೆಗೊಳ್ಳುವ ಪ್ರಕ್ರಿಯೆ (ಲೂಯಿ ಪಾಶ್ಚರ್ ಕಂಡುಹಿಡಿದರು).',
        definitionEn: 'Process of conversion of sugar into alcohol and carbon dioxide by yeast, discovered by Louis Pasteur.',
        ruralAnalogyKn: 'ಇಡ್ಲಿ ಮತ್ತು ದೋಸೆ ಹಿಟ್ಟನ್ನು ರಾತ್ರಿ ಕಲಸಿಟ್ಟರೆ ಬೆಳಗ್ಗೆ ಉಬ್ಬಿ ಮೃದುವಾಗುವ ಕ್ರಿಯೆ.',
        everydayExample: 'ಬೇಕರಿ ಬ್ರೆಡ್ ಮತ್ತು ಇಡ್ಲಿ ಹಿಟ್ಟು ಉಬ್ಬುವುದು.'
      },
      {
        termKn: 'ಪಾಶ್ಚರೀಕರಣ',
        termEn: 'Pasteurisation',
        definitionKn: 'ಹಾಲನ್ನು ಸುಮಾರು 70°C ಗೆ 15-30 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಕಾಯಿಸಿ ತಕ್ಷಣವೇ ತಂಪಾಗಿಸಿ ಸಂರಕ್ಷಿಸುವ ವಿಧಾನ.',
        definitionEn: 'Heating milk to about 70°C for 15-30 seconds and suddenly chilling it to prevent microbial growth.',
        ruralAnalogyKn: 'ನಂದಿನಿ ಹಾಲಿನ ಪ್ಯಾಕೆಟ್‌ಗಳ ಮೇಲೆ "ಪಾಶ್ಚರೀಕರಿಸಿದ ಹಾಲು" ಎಂದು ಬರೆದಿರುವುದನ್ನು ಗಮನಿಸಿ.',
        everydayExample: 'ಕರ್ನಾಟಕ ಕೆಎಂಎಫ್ ನಂದಿನಿ ಹಾಲಿನ ಸಂಸ್ಕರಣೆ.'
      }
    ],
    lessons: [
      {
        id: 'c8-micro-l1',
        titleKn: 'ಉಪಯುಕ್ತ ಸೂಕ್ಷ್ಮಜೀವಿಗಳು ಮತ್ತು ಲಸಿಕೆಗಳು',
        titleEn: 'Beneficial Microbes and Vaccines',
        summaryKn: 'ಆಹಾರ ತಯಾರಿಕೆ, ಔಷಧೀಯ ಬಳಕೆ, ಪರಿಸರ ಶುದ್ಧೀಕರಣ ಮತ್ತು ರೋಗನಿರೋಧಕ ಲಸಿಕೆಗಳ ಪಾತ್ರ.',
        summaryEn: 'Role of microbes in food making, medicine, environmental cleanup, and immunity through vaccines.',
        explanationKn: 'ಸೂಕ್ಷ್ಮಾಣುಜೀವಿಗಳು ಬ್ರೆಡ್, ಮೊಸರು, ಆಲ್ಕೋಹಾಲ್ ಮತ್ತು ಆಂಟಿಬಯೋಟಿಕ್ಸ್ ತಯಾರಿಕೆಗೆ ಅಗತ್ಯ. ಲಸಿಕೆಯು ಮೃತ ಅಥವಾ ದುರ್ಬಲ ಸೂಕ್ಷ್ಮಜೀವಿಗಳನ್ನು ದೇಹಕ್ಕೆ ನೀಡಿ ಆಂಟಿಬಾಡಿಗಳನ್ನು ಉತ್ಪಾದಿಸುವಂತೆ ಪ್ರೇರೇಪಿಸುತ್ತದೆ.',
        explanationEn: 'Microbes produce antibiotics like penicillin. Vaccines stimulate our immune system to produce antibodies.',
        keyPointsKn: [
          'ಅಲೆಕ್ಸಾಂಡರ್ ಫ್ಲೆಮಿಂಗ್ 1929 ರಲ್ಲಿ ಪೆನ್ಸಿಲಿನ್ ಪ್ರತಿಜೀವಕವನ್ನು ಆವಿಷ್ಕರಿಸಿದರು.',
          'ಎಡ್ವರ್ಡ್ ಜೆನ್ನರ್ ಸಿಡುಬು ರೋಗಕ್ಕೆ ಲಸಿಕೆ ಕಂಡುಹಿಡಿದರು.',
          'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಕೊಳೆಯುವ ತ್ಯಾಜ್ಯವನ್ನು ವಿಘಟಿಸಿ ಭೂಮಿಯನ್ನು ಫಲವತ್ತಾಗಿಸುತ್ತದೆ.'
        ],
        keyPointsEn: [
          'Alexander Fleming discovered penicillin in 1929.',
          'Edward Jenner discovered the vaccine for smallpox.',
          'Decomposers clean up biodegradable agricultural waste.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-micro-1',
        topicId: 'karn-c8-micro',
        questionKn: 'ಹಾಲನ್ನು ಮೊಸರನ್ನಾಗಿ ಪರಿವರ್ತಿಸಲು ನೆರವಾಗುವ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಯಾವುದು?',
        questionEn: 'Which bacterium helps in converting milk into curd?',
        optionsKn: ['ಲ್ಯಾಕ್ಟೋಬ್ಯಾಸಿಲಸ್', 'ಅಮೀಬಾ', 'ಯೀಸ್ಟ್', 'ರೈಸೋಬಿಯಂ'],
        optionsEn: ['Lactobacillus', 'Amoeba', 'Yeast', 'Rhizobium'],
        correctOptionIndex: 0,
        explanationKn: 'ಲ್ಯಾಕ್ಟೋಬ್ಯಾಸಿಲಸ್ ಹಾಲಿನಲ್ಲಿರುವ ಲ್ಯಾಕ್ಟೋಸ್ ಸಕ್ಕರೆಯನ್ನು ಲ್ಯಾಕ್ಟಿಕ್ ಆಮ್ಲವಾಗಿ ಪರಿವರ್ತಿಸಿ ಮೊಸರಾಗಿಸುತ್ತದೆ.',
        explanationEn: 'Lactobacillus multiplies in warm milk and curdles the milk protein.',
        difficulty: 'easy',
        conceptTag: 'ಲ್ಯಾಕ್ಟೋಬ್ಯಾಸಿಲಸ್'
      },
      {
        id: 'q-micro-2',
        topicId: 'karn-c8-micro',
        questionKn: 'ಇಡ್ಲಿ ಮತ್ತು ಬ್ರೆಡ್ ಹಿಟ್ಟು ಉಬ್ಬಲು ಕಾರಣವೇನು?',
        questionEn: 'What causes the rise of bread and idli dough?',
        optionsKn: ['ಶಾಖ', 'ಹಿಟ್ಟು ರುಬ್ಬುವುದು', 'ಯೀಸ್ಟ್ ಕೋಶಗಳ ಬೆಳವಣಿಗೆ ಮತ್ತು CO2 ಬಿಡುಗಡೆ', 'ನೀರಿನ ಸಾಂದ್ರತೆ'],
        optionsEn: ['Heat', 'Grinding', 'Growth of yeast cells releasing CO2 gas', 'Water density'],
        correctOptionIndex: 2,
        explanationKn: 'ಯೀಸ್ಟ್ ಉಸಿರಾಟದ ವೇಳೆ ಬಿಡುಗಡೆ ಮಾಡುವ ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ (CO2) ಅನಿಲದ ಗುಳ್ಳೆಗಳು ಹಿಟ್ಟನ್ನು ಉಬ್ಬಿಸುತ್ತವೆ.',
        explanationEn: 'Rapidly reproducing yeast produces carbon dioxide bubbles during respiration, expanding the dough.',
        difficulty: 'medium',
        conceptTag: 'ಹುದುಗುವಿಕೆ'
      }
    ]
  },
  {
    id: 'karn-c8-force',
    chapterNumber: 6,
    chapterTitleKn: 'ಬಲ ಮತ್ತು ಒತ್ತಡ',
    chapterTitleEn: 'Force and Pressure',
    subject: 'science',
    grade: 8,
    board: 'Karnataka State Board',
    descriptionKn: 'ಬಲದ ಪರಿಕಲ್ಪನೆ, ಸಂಪರ್ಕ ಮತ್ತು ಸಂಪರ್ಕರಹಿತ ಬಲಗಳು, ಒತ್ತಡ ಮತ್ತು ವಾತಾವರಣದ ಒತ್ತಡ.',
    descriptionEn: 'Concept of force (push/pull), contact and non-contact forces, pressure equation and atmospheric pressure.',
    keyConcepts: [
      {
        termKn: 'ಬಲ (Force)',
        termEn: 'Force',
        definitionKn: 'ವಸ್ತುವಿನ ಮೇಲೆ ಉಂಟಾಗುವ ತಳ್ಳುವಿಕೆ ಅಥವಾ ಎಳೆಯುವಿಕೆಯನ್ನು ಬಲ ಎನ್ನುವರು (ಅಂತರರಾಷ್ಟ್ರೀಯ ಮಾನಕ: ನ್ಯೂಟನ್ N).',
        definitionEn: 'A push or pull upon an object resulting from its interaction with another object (SI unit: Newton, N).',
        ruralAnalogyKn: 'ಬಾವಿಯಿಂದ ನೀರು ಸೇದುವಾಗ ಹಗ್ಗವನ್ನು ಎಳೆಯುವುದು ಅಥವಾ ಎತ್ತಿನ ಗಾಡಿಯನ್ನು ಎತ್ತುಗಳು ಎಳೆಯುವ ಕ್ರಿಯೆ.',
        everydayExample: 'ಬಾಗಿಲು ತಳ್ಳುವುದು ಅಥವಾ ಸೈಕಲ್ ಪೆಡಲ್ ತುಳಿಯುವುದು.'
      },
      {
        termKn: 'ಒತ್ತಡ (Pressure)',
        termEn: 'Pressure',
        definitionKn: 'ಪ್ರಮಾಣ ವಿಸ್ತೀರ್ಣದ ಮೇಲೆ ಲಂಬವಾಗಿ ವರ್ತಿಸುವ ಬಲವನ್ನು ಒತ್ತಡ ಎನ್ನುವರು (ಒತ್ತಡ = ಬಲ / ವಿಸ್ತೀರ್ಣ).',
        definitionEn: 'Force acting per unit area of a surface (Pressure = Force / Area, unit: Pascal or N/m²).',
        ruralAnalogyKn: 'ಚೂಪಾದ ಮೊಳೆ ಸುಲಭವಾಗಿ ಮರಕ್ಕೆ ಇಳಿಯುತ್ತದೆ, ಆದರೆ ಮೊಂಡಾದ ಮೊಳೆ ಇಳಿಯುವುದಿಲ್ಲ ಏಕೆಂದರೆ ಚೂಪಾದ ತುದಿಯ ವಿಸ್ತೀರ್ಣ ಕಡಿಮೆ ಇದ್ದಾಗ ಒತ್ತಡ ಹೆಚ್ಚಿರುತ್ತದೆ.',
        everydayExample: 'ಹರಿತವಾದ ಚಾಕುವಿನಿಂದ ತರಕಾರಿ ಕತ್ತರಿಸುವುದು ಸುಲಭ.'
      },
      {
        termKn: 'ವಾತಾವರಣದ ಒತ್ತಡ',
        termEn: 'Atmospheric Pressure',
        definitionKn: 'ನಮ್ಮ ಸುತ್ತಲಿರುವ ವಾಯುಮಂಡಲದ ಗಾಳಿಯು ಭೂಮಿಯ ಮೇಲ್ಮೈ ಮೇಲೆ ಉಂಟುಮಾಡುವ ತೂಕ ಮತ್ತು ಒತ್ತಡ.',
        definitionEn: 'The pressure exerted by the weight of the blanket of air surrounding the earth.',
        ruralAnalogyKn: 'ರಬ್ಬರ್ ಹೀರುಗೊಂಬೆಯನ್ನು (ಸಕ್ಕರ್) ನಯವಾದ ಗೋಡೆಗೆ ಅದುಮಿದಾಗ ಗಾಳಿ ಹೊರಹೋಗಿ ವಾತಾವರಣದ ಒತ್ತಡದಿಂದ ಗಟ್ಟಿಯಾಗಿ ಅಂಟಿಕೊಳ್ಳುತ್ತದೆ.',
        everydayExample: 'ಜ್ಯೂಸ್ ಸ್ಟ್ರಾ ಮೂಲಕ ಎಳೆದಾಗ ದ್ರವ ಮೇಲೆ ಬರುವುದು.'
      }
    ],
    lessons: [
      {
        id: 'c8-force-l1',
        titleKn: 'ಸಂಪರ್ಕ ಮತ್ತು ಸಂಪರ್ಕರಹಿತ ಬಲಗಳು',
        titleEn: 'Contact and Non-Contact Forces',
        summaryKn: 'ಸ್ನಾಯು ಬಲ, ಘರ್ಷಣೆ, ಕಾಂತೀಯ ಬಲ, ಸ್ಥಾಯೀವಿದ್ಯುತ್ ಮತ್ತು ಗುರುತ್ವಾಕರ್ಷಣ ಬಲ.',
        summaryEn: 'Muscular force, friction, magnetic force, electrostatic force, and gravitational force.',
        explanationKn: 'ವಸ್ತುಗಳ ಭೌತಿಕ ಸಂಪರ್ಕದಿಂದ ಉಂಟಾಗುವ ಬಲ ಸಂಪರ್ಕ ಬಲ (ಉದಾ: ಕೈಯಿಂದ ಭಾರ ಎತ್ತುವುದು, ನೆಲದ ಮೇಲಿನ ಚೆಂಡು ನಿಲ್ಲುವುದು). ದೂರದಿಂದಲೇ ವರ್ತಿಸುವ ಬಲಗಳು ಸಂಪರ್ಕರಹಿತ (ಕಾಂತ, ಭೂಮಿಯ ಗುರುತ್ವ).',
        explanationEn: 'Contact forces require physical touch (muscular, friction). Non-contact forces act across a distance (gravity, magnetism).',
        keyPointsKn: [
          'ಸ್ನಾಯು ಬಲ: ನಮ್ಮ ಶರೀರದ ಸ್ನಾಯುಗಳು ಉಂಟುಮಾಡುವ ಬಲ.',
          'ಗುರುತ್ವಾಕರ್ಷಣ ಬಲ: ಭೂಮಿಯು ಎಲ್ಲಾ ವಸ್ತುಗಳನ್ನು ತನ್ನ ಕೇಂದ್ರದ ಕಡೆಗೆ ಸೆಳೆಯುವ ಬಲ.',
          'ಸ್ಥಾಯೀವಿದ್ಯುತ್ ಬಲ: ಆವೇಶಭರಿತ ವಸ್ತುವು ಮತ್ತೊಂದು ವಸ್ತುವಿನ ಮೇಲೆ ಪ್ರಯೋಗಿಸುವ ಬಲ.'
        ],
        keyPointsEn: [
          'Muscular force drives our bodily physical work.',
          'Gravity is an attractive force pulling masses toward earth center.',
          'Electrostatic force acts between electrically charged particles.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-force-1',
        topicId: 'karn-c8-force',
        questionKn: 'ಒತ್ತಡವನ್ನು ಕಂಡುಹಿಡಿಯುವ ಸರಿಯಾದ ಸೂತ್ರ ಯಾವುದು?',
        questionEn: 'What is the correct mathematical formula for Pressure?',
        optionsKn: ['ಒತ್ತಡ = ಬಲ / ವಿಸ್ತೀರ್ಣ', 'ಒತ್ತಡ = ಬಲ × ವಿಸ್ತೀರ್ಣ', 'ಒತ್ತಡ = ವಿಸ್ತೀರ್ಣ / ಬಲ', 'ಒತ್ತಡ = ಬಲ + ವಿಸ್ತೀರ್ಣ'],
        optionsEn: ['Pressure = Force / Area', 'Pressure = Force × Area', 'Pressure = Area / Force', 'Pressure = Force + Area'],
        correctOptionIndex: 0,
        explanationKn: 'ಒತ್ತಡವು ಬಲಕ್ಕೆ ನೇರ ಅನುಪಾತದಲ್ಲಿ ಮತ್ತು ವಿಸ್ತೀರ್ಣಕ್ಕೆ ವಿಲೋಮ ಅನುಪಾತದಲ್ಲಿರುತ್ತದೆ (P = F / A). ವಿಸ್ತೀರ್ಣ ಕಡಿಮೆಯಾದಷ್ಟೂ ಒತ್ತಡ ಹೆಚ್ಚುತ್ತದೆ.',
        explanationEn: 'Pressure equals Force applied perpendicular divided by the area of surface (P = F/A).',
        difficulty: 'easy',
        conceptTag: 'ಒತ್ತಡ'
      },
      {
        id: 'q-force-2',
        topicId: 'karn-c8-force',
        questionKn: 'ಒಣ ಕೂದಲಿಗೆ ಪ್ಲಾಸ್ಟಿಕ್ ಬಾಚಣಿಗೆಯನ್ನು ಉಜ್ಜಿ ಕಾಗದದ ಚೂರುಗಳ ಹತ್ತಿರ ತಂದಾಗ ಅವು ಅಂಟಿಕೊಳ್ಳುವುದು ಯಾವ ಬಲಕ್ಕೆ ಉದಾಹರಣೆ?',
        questionEn: 'Rubbing a plastic comb on dry hair attracts tiny paper bits due to which force?',
        optionsKn: ['ಗುರುತ್ವಾಕರ್ಷಣ ಬಲ', 'ಸ್ಥಾಯೀವಿದ್ಯುತ್ ಬಲ (Electrostatic force)', 'ಕಾಂತೀಯ ಬಲ', 'ಘರ್ಷಣಾ ಬಲ'],
        optionsEn: ['Gravitational force', 'Electrostatic force', 'Magnetic force', 'Frictional force'],
        correctOptionIndex: 1,
        explanationKn: 'ಉಜ್ಜಿದಾಗ ಬಾಚಣಿಗೆಯು ವಿದ್ಯುತ್ ಆವೇಶವನ್ನು ಪಡೆಯುತ್ತದೆ. ಆವೇಶಭರಿತ ವಸ್ತುವು ತಟಸ್ಥ ಕಾಗದದ ಚೂರುಗಳನ್ನು ಆಕರ್ಷಿಸುವುದು ಸ್ಥಾಯೀವಿದ್ಯುತ್ ಬಲ.',
        explanationEn: 'The charged comb exerts an electrostatic attraction on small uncharged bits of paper without touching.',
        difficulty: 'medium',
        conceptTag: 'ಸಂಪರ್ಕರಹಿತ ಬಲ'
      }
    ]
  },
  {
    id: 'karn-c8-sound',
    chapterNumber: 8,
    chapterTitleKn: 'ಶಬ್ದ (ಧ್ವನಿ)',
    chapterTitleEn: 'Sound',
    subject: 'science',
    grade: 8,
    board: 'Karnataka State Board',
    descriptionKn: 'ಕಂಪನಗಳಿಂದ ಶಬ್ದ ಉತ್ಪತ್ತಿ, ಪ್ರಸಾರ ಮಾಧ್ಯಮ, ಮಾನವನ ಧ್ವನಿಪೆಟ್ಟಿಗೆ ಮತ್ತು ಕಿವಿ, ಶ್ರವ್ಯ ಮಿತಿ ಹಾಗೂ ಶಬ್ದ ಮಾಲಿನ್ಯ.',
    descriptionEn: 'Vibrations producing sound, propagation medium, human voice box (larynx) and ear, audible range, and noise pollution.',
    keyConcepts: [
      {
        termKn: 'ಕಂಪನ (Vibration)',
        termEn: 'Vibration',
        definitionKn: 'ವಸ್ತುವಿನ ಹಿಂದಕ್ಕೂ ಮುಂದಕ್ಕೂ ಅಥವಾ ಮೇಲಕ್ಕೂ ಕೆಳಕ್ಕೂ ಆಗುವ ವೇಗದ ಚಲನೆ.',
        definitionEn: 'Rapid back-and-forth or to-and-fro motion of an object.',
        ruralAnalogyKn: 'ದೇವಸ್ಥಾನದ ಕಂಚಿನ ಗಂಟೆಯನ್ನು ಬಾರಿಸಿದ ನಂತರ ಮುಟ್ಟಿ ನೋಡಿದರೆ ಕೈ ಜುಮ್ಮೆನ್ನುವ ಕಂಪನ ಅನುಭವವಾಗುತ್ತದೆ.',
        everydayExample: 'ರಬ್ಬರ್ ಬ್ಯಾಂಡನ್ನು ಎಳೆದು ಬಿಟ್ಟಾಗ ಶಬ್ದ ಉಂಟಾಗುವುದು.'
      },
      {
        termKn: 'ಆವರ್ತನ ಮತ್ತು ಹರ್ಟ್ಜ್ (Hz)',
        termEn: 'Frequency and Hertz',
        definitionKn: 'ಒಂದು ಸೆಕೆಂಡಿನಲ್ಲಿ ಆಗುವ ಕಂಪನಗಳ ಸಂಖ್ಯೆಯನ್ನು ಆವರ್ತನ ಎನ್ನುವರು. ಮಾನಕ: ಹರ್ಟ್ಜ್ (Hz). ಇದು ಶಬ್ದದ ತಾರಸ್ಥಾಯಿಯನ್ನು (Pitch) ನಿರ್ಧರಿಸುತ್ತದೆ.',
        definitionEn: 'Number of oscillations per second, measured in Hertz (Hz). Higher frequency gives higher pitch.',
        ruralAnalogyKn: 'ಹೆಣ್ಣುಮಕ್ಕಳ ಮತ್ತು ಮಕ್ಕಳ ಧ್ವನಿ ತೀಕ್ಷ್ಣವಾಗಿರಲು (ಹೆಚ್ಚು ತಾರಸ್ಥಾಯಿ) ಅಧಿಕ ಆವರ್ತನವೇ ಕಾರಣ.',
        everydayExample: 'ಶಿಳ್ಳೆ ಅಥವಾ ಕೊಳಲಿನ ಕೀರಲು ಧ್ವನಿ.'
      },
      {
        termKn: 'ಶ್ರವ್ಯ ಶಬ್ದಗಳ ಮಿತಿ',
        termEn: 'Audible Sound Range',
        definitionKn: 'ಸಾಮಾನ್ಯ ಮಾನವನ ಕಿವಿಗೆ ಕೇಳಿಸಬಲ್ಲ ಶಬ್ದದ ಆವರ್ತನ ವ್ಯಾಪ್ತಿಯು ಸರಿಸುಮಾರು 20 Hz ನಿಂದ 20,000 Hz ವರೆಗೆ ಇರುತ್ತದೆ.',
        definitionEn: 'Audible frequency range for normal human ear is approximately 20 Hz to 20,000 Hz.',
        ruralAnalogyKn: '20 Hz ಗಿಂತ ಕಡಿಮೆ (ಅವಶ್ರವ್ಯ) ಅಥವಾ 20,000 Hz ಗಿಂತ ಹೆಚ್ಚು (ಶ್ರವ್ಯಾತೀತ) ಶಬ್ದಗಳನ್ನು ನಾವು ಕೇಳಲಾರೆವು (ಆದರೆ ನಾಯಿಗಳು ಮತ್ತು ಬಾವಲಿಗಳು ಗ್ರಹಿಸಬಲ್ಲವು).',
        everydayExample: 'ಮಾನವ ಸಂಭಾಷಣೆ ಮತ್ತು ಹಾಡುಗಳ ಧ್ವನಿ ವ್ಯಾಪ್ತಿ.'
      }
    ],
    lessons: [
      {
        id: 'c8-sound-l1',
        titleKn: 'ಶಬ್ದದ ಪ್ರಸರಣಕ್ಕೆ ಮಾಧ್ಯಮದ ಅಗತ್ಯ',
        titleEn: 'Sound Needs a Medium to Travel',
        summaryKn: 'ಶಬ್ದವು ಘನ, ದ್ರವ ಮತ್ತು ಅನಿಲಗಳ ಮೂಲಕ ಹರಿಯುತ್ತದೆ; ನಿರ್ವಾತದಲ್ಲಿ (ಗಾಳಿಯಿಲ್ಲದ ಸ್ಥಳ) ಶಬ್ದ ಚಲಿಸುವುದಿಲ್ಲ.',
        summaryEn: 'Sound requires material medium (solids, liquids, gases) and cannot travel in a vacuum.',
        explanationKn: 'ಶಬ್ದದ ಅಲೆಗಳು ಮಾಧ್ಯಮದ ಕಣಗಳ ಮೂಲಕ ಕಂಪನ ವರ್ಗಾಯಿಸುತ್ತವೆ. ಬಾಹ್ಯಾಕಾಶದಲ್ಲಿ ಅಥವಾ ನಿರ್ವಾತ ಪಾತ್ರೆಯಲ್ಲಿ ಶಬ್ದ ಕೇಳಿಸುವುದಿಲ್ಲ. ಘನವಸ್ತುಗಳಲ್ಲಿ ಶಬ್ದದ ವೇಗ ಅತಿ ಹೆಚ್ಚು (ಉದಾ: ರೈಲ್ವೆ ಹಳಿಗೆ ಕಿವಿ ಇಟ್ಟರೆ ದೂರದ ರೈಲಿನ ಶಬ್ದ ಮುಂಚಿತವಾಗಿಯೇ ಕೇಳಿಸುತ್ತದೆ).',
        explanationEn: 'Sound propagates via colliding particles. In a vacuum with no molecules, sound wave cannot travel.',
        keyPointsKn: [
          'ಶಬ್ದವು ಅನಿಲಗಳಿಗಿಂತ ದ್ರವಗಳಲ್ಲಿ ಮತ್ತು ದ್ರವಗಳಿಗಿಂತ ಘನಗಳಲ್ಲಿ ವೇಗವಾಗಿ ಚಲಿಸುತ್ತದೆ.',
          'ನಿರ್ವಾತ ಪ್ರದೇಶದಲ್ಲಿ (Vacuum) ಶಬ್ದ ಕೇಳಿಸುವುದಿಲ್ಲ.',
          'ಮಾನವನ ಧ್ವನಿಪೆಟ್ಟಿಗೆಯಲ್ಲಿರುವ (Larynx) ಧ್ವನಿತಂತುಗಳ ಕಂಪನದಿಂದ ಮಾತು ಹೊರಬರುತ್ತದೆ.'
        ],
        keyPointsEn: [
          'Sound travels fastest in solids, then liquids, slowest in air.',
          'Sound cannot propagate through vacuum.',
          'Vocal cords inside larynx vibrate to generate speech.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-sound-1',
        topicId: 'karn-c8-sound',
        questionKn: 'ಸಾಮಾನ್ಯ ಮಾನವನ ಕಿವಿಗೆ ಕೇಳಿಸಬಹುದಾದ ಶ್ರವ್ಯ ಶಬ್ದದ ಆವರ್ತನ ಮಿತಿ ಎಷ್ಟು?',
        questionEn: 'What is the audible frequency range of hearing for human beings?',
        optionsKn: ['20 Hz ನಿಂದ 20,000 Hz', '2 Hz ನಿಂದ 200 Hz', '200 Hz ನಿಂದ 2,000 Hz', '20,000 Hz ನಿಂದ 50,000 Hz'],
        optionsEn: ['20 Hz to 20,000 Hz', '2 Hz to 200 Hz', '200 Hz to 2,000 Hz', '20,000 Hz to 50,000 Hz'],
        correctOptionIndex: 0,
        explanationKn: 'ಮಾನವನ ಕಿವಿ 20 ಹರ್ಟ್ಜ್‌ಗಿಂತ ಕಡಿಮೆ (Infrasound) ಅಥವಾ 20,000 ಹರ್ಟ್ಜ್‌ಗಿಂತ ಹೆಚ್ಚಿನ (Ultrasound) ಧ್ವನಿಯನ್ನು ಆಲಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.',
        explanationEn: 'Human ear sensitivity spans exactly between 20 Hz (lowest rumble) to 20,000 Hz (highest pitch).',
        difficulty: 'easy',
        conceptTag: 'ಶ್ರವ್ಯ ಶಬ್ದಗಳ ಮಿತಿ'
      },
      {
        id: 'q-sound-2',
        topicId: 'karn-c8-sound',
        questionKn: 'ಗಾಳಿಯಿಲ್ಲದ ಸಂಪೂರ್ಣ ನಿರ್ವಾತ (Vacuum) ಪ್ರದೇಶದಲ್ಲಿ ಶಬ್ದವು ಏಕೆ ಪ್ರಸಾರವಾಗುವುದಿಲ್ಲ?',
        questionEn: 'Why can sound NOT propagate in a complete vacuum?',
        optionsKn: ['ಅಲ್ಲಿ ಬೆಳಕು ಇರುವುದಿಲ್ಲ', 'ಕಂಪನಗಳನ್ನು ವರ್ಗಾಯಿಸಲು ಯಾವುದೇ ಕಣಗಳು ಅಥವಾ ಮಾಧ್ಯಮವಿಲ್ಲ', 'ನಿರ್ವಾತದಲ್ಲಿ ಗುರುತ್ವಾಕರ್ಷಣೆ ಶೂನ್ಯ', 'ಶಬ್ದದ ತರಂಗಾಂತರ ಕಡಿಮೆಯಾಗುತ್ತದೆ'],
        optionsEn: ['No light exists', 'No material particles/medium exist to transfer vibrations', 'Gravity is zero', 'Wavelength reduces'],
        correctOptionIndex: 1,
        explanationKn: 'ಶಬ್ದವು ಯಾಂತ್ರಿಕ ಅಲೆಯಾಗಿದ್ದು, ಕಂಪನಗಳನ್ನು ಮುಂದೆ ಸಾಗಿಸಲು ದ್ರವ್ಯ ಕಣಗಳ ಅಗತ್ಯವಿರುತ್ತದೆ. ನಿರ್ವಾತದಲ್ಲಿ ಕಣಗಳೇ ಇಲ್ಲದಿರುವುದರಿಂದ ಶಬ್ದ ಪ್ರಸಾರವಾಗುವುದಿಲ್ಲ.',
        explanationEn: 'Sound is a mechanical wave requiring molecular collisions; in a vacuum without matter, sound waves cannot propagate.',
        difficulty: 'medium',
        conceptTag: 'ಪ್ರಸರಣ ಮಾಧ್ಯಮ'
      }
    ]
  },
  {
    id: 'karn-c8-light',
    chapterNumber: 13,
    chapterTitleKn: 'ಬೆಳಕು',
    chapterTitleEn: 'Light',
    subject: 'science',
    grade: 8,
    board: 'Karnataka State Board',
    descriptionKn: 'ಬೆಳಕಿನ ಪ್ರತಿಫಲನದ ನಿಯಮಗಳು, ನಿಯಮಿತ ಮತ್ತು ಚದುರಿದ ಪ್ರತಿಫಲನ, ಮಾನವನ ಕಣ್ಣಿನ ರಚನೆ ಹಾಗೂ ಆರೈಕೆ.',
    descriptionEn: 'Laws of reflection, regular vs diffused reflection, human eye anatomy, vision defects, and eye care.',
    keyConcepts: [
      {
        termKn: 'ಪ್ರತಿಫಲನದ ನಿಯಮಗಳು',
        termEn: 'Laws of Reflection',
        definitionKn: '1. ಪತನ ಕೋನವು ಪ್ರತಿಫಲನ ಕೋನಕ್ಕೆ ಸಮನಾಗಿರುತ್ತದೆ (∠i = ∠r). 2. ಪತನ ಕಿರಣ, ಪ್ರತಿಫಲಿತ ಕಿರಣ ಮತ್ತು ಲಂಬ ಎಲ್ಲವೂ ಒಂದೇ ಸಮತಲದಲ್ಲಿರುತ್ತವೆ.',
        definitionEn: '1. Angle of incidence equals angle of reflection (∠i = ∠r). 2. Incident ray, reflected ray and normal all lie in the same plane.',
        ruralAnalogyKn: 'ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಕನ್ನಡಿ ಹಿಡಿದು ಗೋಡೆಯ ಮೇಲೆ ಬಿಂಬಿಸುವಾಗ ಕನ್ನಡಿ ತಿರುಗಿಸಿದಷ್ಟೇ ಕೋನದಲ್ಲಿ ಬೆಳಕು ತಿರುಗುವ ಆಟದಂತೆ.',
        everydayExample: 'ಮುಖ ನೋಡುವ ನಯವಾದ ಸಮತಲ ಕನ್ನಡಿ.'
      },
      {
        termKn: 'ಮಾನವನ ಕಣ್ಣಿನ ರೆಟಿನಾ (ದೃಷ್ಟಿಪಟಲ)',
        termEn: 'Retina of Human Eye',
        definitionKn: 'ಕಣ್ಣಿನ ಹಿಂಭಾಗದಲ್ಲಿರುವ ಬೆಳಕು-ಸಂವೇದಿ ಪರದೆ. ಇದರಲ್ಲಿ ಕಡ್ಡಿ ಕೋಶಗಳು (ಮಂದ ಬೆಳಕು) ಮತ್ತು ಶಂಕು ಕೋಶಗಳು (ಬಣ್ಣ ಮತ್ತು ಪ್ರಖರ ಬೆಳಕು) ಇರುತ್ತವೆ.',
        definitionEn: 'Light-sensitive screen at the back of eye with rods (dim vision) and cones (bright/color vision).',
        ruralAnalogyKn: 'ಕ್ಯಾಮೆರಾದ ಫಿಲ್ಮ್ ಅಥವಾ ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾ ಸೆನ್ಸರ್‌ನಂತೆ ಚಿತ್ರ ಮೂಡುವ ಜಾಗ.',
        everydayExample: 'ನಾವು ನೋಡುವ ಪ್ರತಿಯೊಂದು ಸುಂದರ ದೃಶ್ಯ ರೆಟಿನಾದ ಮೇಲೆ ಬಿಂಬವಾಗಿ ಮೂಡುತ್ತದೆ.'
      },
      {
        termKn: 'ಬ್ರೈಲ್ ಲಿಪಿ',
        termEn: 'Braille System',
        definitionKn: 'ದೃಷ್ಟಿದೋಷವುಳ್ಳ (ಅಂಧ) ವ್ಯಕ್ತಿಗಳಿಗೆ ಓದಲು ಮತ್ತು ಬರೆಯಲು ನೆರವಾಗುವ 63 ಚುಕ್ಕೆಗಳ ಸ್ಪರ್ಶ-ಆಧಾರಿತ ಸಂಕೇತ ಪದ್ಧತಿ (ಲೂಯಿ ಬ್ರೈಲ್ ಅಭಿವೃದ್ಧಿಪಡಿಸಿದರು).',
        definitionEn: 'Tactile reading and writing system with embossed raised dots for visually impaired individuals, developed by Louis Braille.',
        ruralAnalogyKn: 'ಕಣ್ಣು ಕಾಣದ ಮಕ್ಕಳಿಗೂ ಸಮಾನ ಶಿಕ್ಷಣ ಒದಗಿಸುವ ಅದ್ಭುತ ಸ್ಪರ್ಶಜ್ಞಾನ ಲಿಪಿ.',
        everydayExample: 'ಲಿಫ್ಟ್ ಬಟನ್‌ಗಳು ಅಥವಾ ಔಷಧ ಪ್ಯಾಕೆಟ್‌ಗಳ ಮೇಲಿನ ಉಬ್ಬು ಚುಕ್ಕೆಗಳು.'
      }
    ],
    lessons: [
      {
        id: 'c8-light-l1',
        titleKn: 'ಕಣ್ಣಿನ ಭಾಗಗಳು ಮತ್ತು ದೃಷ್ಟಿ ದೋಷಗಳು',
        titleEn: 'Structure of Human Eye and Care',
        summaryKn: 'ಕಾರ್ನಿಯಾ, ಐರಿಸ್, ಕಣ್ಣಿನ ಪಾಪೆ (ಪ್ಯೂಪಿಲ್), ಮಸೂರ, ರೆಟಿನಾ ಮತ್ತು ಅಂಧಬಿಂದು.',
        summaryEn: 'Cornea, iris, pupil, crystalline lens, retina and blind spot.',
        explanationKn: 'ಐರಿಸ್ ಕಣ್ಣಿನ ಪಾಪೆಯ ಗಾತ್ರವನ್ನು ನಿಯಂತ್ರಿಸಿ ಕಣ್ಣಿಗೆ ಪ್ರವೇಶಿಸುವ ಬೆಳಕಿನ ಪ್ರಮಾಣವನ್ನು ಸರಿಹೊಂದಿಸುತ್ತದೆ (ಕತ್ತಲಲ್ಲಿ ಪಾಪೆ ದೊಡ್ಡದಾಗುತ್ತದೆ, ಬಿಸಿಲಿನಲ್ಲಿ ಚಿಕ್ಕದಾಗುತ್ತದೆ). ರೆಟಿನಾದ ಮೇಲೆ ತಲೆಕೆಳಗಾದ ನೈಜ ಬಿಂಬ ಮೂಡುತ್ತದೆ.',
        explanationEn: 'Iris controls pupil size to regulate light entry. Brain inverts the upside-down image formed on retina.',
        keyPointsKn: [
          'ಕಣ್ಣಿಗೆ ಸ್ಪಷ್ಟವಾಗಿ ಓದಲು ಕನಿಷ್ಠ ದೂರ ಸರಿಸುಮಾರು 25 ಸೆಂ.ಮೀ.',
          'ವಿಟಮಿನ್-ಎ ಕೊರತೆಯಿಂದ ರಾತ್ರಿ ಕುರುಡುತನ (ಇರುಳುಗಣ್ಣು Night blindness) ಉಂಟಾಗುತ್ತದೆ.',
          'ಕ್ಯಾರೆಟ್, ಪಾಲಕ್ ಸೊಪ್ಪು, ಹಸಿರು ತರಕಾರಿಗಳಲ್ಲಿ ವಿಟಮಿನ್-ಎ ಹೇರಳವಾಗಿರುತ್ತದೆ.'
        ],
        keyPointsEn: [
          'Least distance of distinct vision for normal eye is 25 cm.',
          'Deficiency of Vitamin A leads to night blindness.',
          'Carrots, green leafy vegetables and milk protect eye health.'
        ]
      }
    ],
    questions: [
      {
        id: 'q-light-1',
        topicId: 'karn-c8-light',
        questionKn: 'ಸಮತಲ ಕನ್ನಡಿಯ ಮೇಲೆ ಬೆಳಕಿನ ಕಿರಣವು 35 ಡಿಗ್ರಿ ಪತನ ಕೋನದಲ್ಲಿ ಬಿದ್ದರೆ, ಪ್ರತಿಫಲನ ಕೋನ ಎಷ್ಟು ಇರುತ್ತದೆ?',
        questionEn: 'If a ray of light strikes a plane mirror at an angle of incidence of 35 degrees, what is the angle of reflection?',
        optionsKn: ['35 ಡಿಗ್ರಿ', '70 ಡಿಗ್ರಿ', '55 ಡಿಗ್ರಿ', '90 ಡಿಗ್ರಿ'],
        optionsEn: ['35 degrees', '70 degrees', '55 degrees', '90 degrees'],
        correctOptionIndex: 0,
        explanationKn: 'ಬೆಳಕಿನ ಮೊದಲ ಪ್ರತಿಫಲನ ನಿಯಮದ ಪ್ರಕಾರ, ಪತನ ಕೋನವು ಯಾವಾಗಲೂ ಪ್ರತಿಫಲನ ಕೋನಕ್ಕೆ ಸಮನಾಗಿರುತ್ತದೆ (∠i = ∠r = 35°).',
        explanationEn: 'According to the first law of reflection, angle of reflection is always equal to angle of incidence (∠i = ∠r).',
        difficulty: 'easy',
        conceptTag: 'ಪ್ರತಿಫಲನದ ನಿಯಮಗಳು'
      },
      {
        id: 'q-light-2',
        topicId: 'karn-c8-light',
        questionKn: 'ಕಣ್ಣಿನ ಯಾವ ಭಾಗವು ಕಣ್ಣಿನೊಳಗೆ ಪ್ರವೇಶಿಸುವ ಬೆಳಕಿನ ಪ್ರಮಾಣವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ?',
        questionEn: 'Which part of the human eye controls the amount of light entering the eye?',
        optionsKn: ['ಕಾರ್ನಿಯಾ', 'ರೆಟಿನಾ', 'ಐರಿಸ್ ಮತ್ತು ಕಣ್ಣಿನ ಪಾಪೆ (Pupil)', 'ದೃಷ್ಟಿ ನರ'],
        optionsEn: ['Cornea', 'Retina', 'Iris and Pupil', 'Optic nerve'],
        correctOptionIndex: 2,
        explanationKn: 'ಐರಿಸ್ ಕಣ್ಣಿನ ಬಣ್ಣದ ಭಾಗವಾಗಿದ್ದು, ಅದು ಬೆಳಕಿನ ತೀವ್ರತೆಗೆ ತಕ್ಕಂತೆ ಪಾಪೆಯ (Pupil) ರಂಧ್ರದ ಗಾತ್ರವನ್ನು ಹಿಗ್ಗಿಸುತ್ತದೆ ಅಥವಾ ಕುಗ್ಗಿಸುತ್ತದೆ.',
        explanationEn: 'The iris adjusts the pupil aperture dynamically depending on ambient lighting conditions.',
        difficulty: 'medium',
        conceptTag: 'ಮಾನವನ ಕಣ್ಣಿನ ರಚನೆ'
      }
    ]
  }
];

export function getCurriculumTopic(id: string): EducationTopic | undefined {
  return KARNATAKA_CLASS_8_SCIENCE_CURRICULUM.find(t => t.id === id);
}

export function getAllCurriculumTopics(): EducationTopic[] {
  return KARNATAKA_CLASS_8_SCIENCE_CURRICULUM;
}

export function searchCurriculum(query: string): Array<{ topic: EducationTopic; matchReason: string }> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: Array<{ topic: EducationTopic; matchReason: string }> = [];

  for (const topic of KARNATAKA_CLASS_8_SCIENCE_CURRICULUM) {
    if (topic.chapterTitleKn.toLowerCase().includes(q) || topic.chapterTitleEn.toLowerCase().includes(q)) {
      results.push({ topic, matchReason: 'Chapter title match' });
      continue;
    }
    const matchingConcept = topic.keyConcepts.find(
      c => c.termKn.toLowerCase().includes(q) || c.termEn.toLowerCase().includes(q) || c.definitionKn.toLowerCase().includes(q)
    );
    if (matchingConcept) {
      results.push({ topic, matchReason: `Concept match: ${matchingConcept.termKn} (${matchingConcept.termEn})` });
      continue;
    }
    const matchingLesson = topic.lessons.find(
      l => l.titleKn.toLowerCase().includes(q) || l.titleEn.toLowerCase().includes(q) || l.explanationKn.toLowerCase().includes(q)
    );
    if (matchingLesson) {
      results.push({ topic, matchReason: `Lesson match: ${matchingLesson.titleKn}` });
    }
  }

  return results;
}
