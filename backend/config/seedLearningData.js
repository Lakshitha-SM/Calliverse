const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Exercise = require('../models/Exercise');

const seedLearningData = async () => {
  try {
    const courseCount = await Course.countDocuments();
    if (courseCount > 0) {
      return; // Already seeded
    }

    console.log('Seeding CalliVerse Calligraphy Curricula & Lessons...');

    // ─────────────────────────────────────────────────────────────
    // 1. BEGINNER COURSE
    // ─────────────────────────────────────────────────────────────
    const beginnerCourse = await Course.create({
      title: 'Calligraphy Foundations: Strokes & Letter Formation',
      slug: 'foundations-strokes-letter-formation',
      subtitle: 'Master basic strokes, pen pressure control, lower/uppercase alphabets, and numbers.',
      description: 'The definitive starting point for every calligrapher. Learn the anatomy of strokes, hairline upstrokes, shaded downstrokes, oval curves, loops, and consistent letter spacing.',
      category: 'beginner',
      level: 'Beginner',
      style: 'Brush & Modern Pointed Pen',
      thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600',
      estimatedHours: 4,
      instructorName: 'Master Sophia Chen',
      tags: ['Basic Strokes', 'Pressure Control', 'Alphabets', 'Beginner', 'Letter Formation'],
      learningOutcomes: [
        'Understand pen slant and 45-degree angle grip',
        'Produce smooth hairline upstrokes and consistent downstrokes',
        'Form all 26 lowercase and uppercase letters with guidelines',
        'Write complete words with rhythm and consistent baseline alignment'
      ],
      order: 1
    });

    // Beginner Lessons
    const bLessonsData = [
      {
        title: 'Basic Strokes & Pressure Control',
        slug: 'basic-strokes-and-pressure-control',
        category: 'beginner',
        moduleName: 'Stroke Foundations',
        difficulty: 'easy',
        estimatedMinutes: 15,
        order: 1,
        learningObjectives: [
          'Differentiate between hairline light upstrokes and shaded downstrokes',
          'Maintain a steady 55-degree slant guide alignment',
          'Control pressure transitions without hand wobble'
        ],
        explanation: 'Calligraphy is built entirely on the principle of contrasting stroke weight. When the pen or brush moves upwards or sideways, light feather pressure is applied, creating a delicate hairline. When moving downwards, steady downward pressure flexes the nib or brush tip to create a rich, shaded stroke.',
        demonstration: {
          steps: [
            'Hold the brush at a 45-degree angle relative to the paper.',
            'Lightly glide upwards for 2cm with feather-light touch.',
            'Pause at the peak, then draw downwards applying gentle, even pressure.',
            'Release pressure just before reaching the baseline.'
          ],
          proTip: 'Breathe out slowly as you execute downward strokes to prevent micro-tremors in your wrist.',
          penAngle: '45-55 degrees'
        },
        practiceTask: {
          taskPrompt: 'Practice 10 downward vertical strokes and 10 upward hairlines matching the 55° guide.',
          referenceLetterOrWord: '| /',
          targetScore: 80,
          focusMetric: 'Stroke width contrast and slant consistency'
        }
      },
      {
        title: 'Curves, Loops & Ovals',
        slug: 'curves-loops-and-ovals',
        category: 'beginner',
        moduleName: 'Stroke Foundations',
        difficulty: 'easy',
        estimatedMinutes: 20,
        order: 2,
        learningObjectives: [
          'Master smooth transition from thin entry to thick curve and thin exit',
          'Keep oval symmetry aligned to the slant guideline',
          'Connect ascending and descending loops smoothly'
        ],
        explanation: 'Curves and ovals form the foundation of letters like o, c, d, g, and e. The key challenge is timing the pressure release: increase pressure as the stroke rounds down the left side, and taper off as you sweep back up the right side.',
        demonstration: {
          steps: [
            'Begin at 2 o\'clock position with a light hairline.',
            'Curve up to 12 o\'clock, then press down firmly around the left curve.',
            'Gradually lift pressure at 6 o\'clock and sweep up to close the oval.'
          ],
          proTip: 'Imagine creating an egg tilted at 55 degrees rather than a perfect circle.',
          penAngle: '45-50 degrees'
        },
        practiceTask: {
          taskPrompt: 'Draw 8 balanced ovals and 8 ascending loops inside the guideline box.',
          referenceLetterOrWord: 'O L',
          targetScore: 82,
          focusMetric: 'Oval symmetry and pressure taper'
        }
      },
      {
        title: 'Lowercase Letter Formation (a-z)',
        slug: 'lowercase-letter-formation',
        category: 'beginner',
        moduleName: 'Alphabet Mastery',
        difficulty: 'medium',
        estimatedMinutes: 25,
        order: 3,
        learningObjectives: [
          'Group letters by family (underturn: u, i; overturn: n, m; oval: o, a, d)',
          'Maintain consistent x-height across all lowercase characters',
          'Ensure parallel downward stems'
        ],
        explanation: 'Lowercase letters are grouped into families sharing identical stroke components. Once you master the underturn and compound curve, letters like i, u, n, m, and v become second nature.',
        demonstration: {
          steps: [
            'Practice the underturn stroke (entry hairline into downstroke curve).',
            'Connect underturns to form "u" and "w".',
            'Combine oval with vertical downstroke to form "a", "d", and "g".'
          ],
          proTip: 'Keep spacing between letters equal to the interior counter-space of the letter "n".',
          penAngle: '50-55 degrees'
        },
        practiceTask: {
          taskPrompt: 'Write lowercase letters "a", "e", "n", "m", and "o" on the practice canvas.',
          referenceLetterOrWord: 'a e n o',
          targetScore: 85,
          focusMetric: 'x-height consistency and parallel stems'
        }
      },
      {
        title: 'Uppercase Lettering & Basic Words',
        slug: 'uppercase-lettering-and-words',
        category: 'beginner',
        moduleName: 'Alphabet Mastery',
        difficulty: 'medium',
        estimatedMinutes: 30,
        order: 4,
        learningObjectives: [
          'Draw elegant capital stem strokes with gentle entrance swashes',
          'Balance majestic capital proportions with delicate lowercase letters',
          'Connect letters into cohesive words with rhythmic spacing'
        ],
        explanation: 'Majuscules (capital letters) provide dramatic personality to a piece. Learn to construct capitals A through Z using controlled lead-in swashes, stately stem downstrokes, and balanced crossbars.',
        demonstration: {
          steps: [
            'Begin with a decorative entrance loop.',
            'Execute the main capital stem with confident, steady pressure.',
            'Ensure capital height is approximately 1.5x to 2x the lowercase x-height.'
          ],
          proTip: 'Do not rush capital flourishes; let your entire forearm guide the movement rather than just fingers.',
          penAngle: '45-55 degrees'
        },
        practiceTask: {
          taskPrompt: 'Write the word "Calligraphy" and "Inspire" maintaining consistent rhythm and slant.',
          referenceLetterOrWord: 'Inspire',
          targetScore: 85,
          focusMetric: 'Capital proportion and inter-letter spacing'
        }
      }
    ];

    const beginnerLessonIds = [];
    for (const lData of bLessonsData) {
      const lesson = await Lesson.create({
        ...lData,
        course: beginnerCourse._id
      });
      beginnerLessonIds.push(lesson._id);

      // Create linked exercise
      await Exercise.create({
        lesson: lesson._id,
        title: `${lesson.title} — Guided Drill`,
        targetCharacter: lesson.practiceTask.referenceLetterOrWord,
        category: 'beginner',
        difficulty: lesson.difficulty,
        focusArea: lesson.practiceTask.focusMetric,
        strokeSteps: lesson.demonstration.steps,
        referenceGuide: {
          fontStyle: 'Cormorant Garamond',
          sampleText: lesson.practiceTask.referenceLetterOrWord,
          instruction: lesson.practiceTask.taskPrompt
        },
        guidelineConfig: {
          hasBaseline: true,
          hasXHeight: true,
          hasAscender: true,
          hasDescender: true,
          slantAngle: 55
        },
        estimatedMinutes: lesson.estimatedMinutes,
        targetScore: lesson.practiceTask.targetScore
      });
    }

    beginnerCourse.lessons = beginnerLessonIds;
    await beginnerCourse.save();

    // ─────────────────────────────────────────────────────────────
    // 2. INTERMEDIATE COURSE
    // ─────────────────────────────────────────────────────────────
    const intermediateCourse = await Course.create({
      title: 'Intermediate Script: Spacing, Flourishing & Quotes',
      slug: 'intermediate-spacing-flourishing-quotes',
      subtitle: 'Advance into brush lettering, letter connections, graceful flourishes, and quotes.',
      description: 'Take your foundational skills to a refined aesthetic standard. Explore entrance and exit swashes, word connections, kerning rhythm, dramatic flourishing, and multi-line quote composition.',
      category: 'intermediate',
      level: 'Intermediate',
      style: 'Modern Brush & Chancery Script',
      thumbnailUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=600',
      estimatedHours: 6,
      instructorName: 'Master Sophia Chen',
      tags: ['Flourishing', 'Brush Lettering', 'Connections', 'Composition', 'Quotes'],
      learningOutcomes: [
        'Form seamless letter-to-letter transitions without awkward pauses',
        'Apply graceful ascender and descender flourishes that don\'t collide',
        'Compose multi-line quote posters with balanced visual hierarchy'
      ],
      order: 2
    });

    const iLessonsData = [
      {
        title: 'Brush Lettering & Bounce Script Dynamics',
        slug: 'brush-lettering-and-bounce-script',
        category: 'intermediate',
        moduleName: 'Dynamic Lettering',
        difficulty: 'medium',
        estimatedMinutes: 25,
        order: 1,
        learningObjectives: [
          'Create playful baseline variation ("bounce effect") while retaining readability',
          'Vary downstroke thickness dynamically across words',
          'Handle large flexible brush pen nibs with confidence'
        ],
        explanation: 'Bounce lettering breaks away from rigid straight baselines. By dropping letters like y, g, and p deeper, or raising mid-letters like s and u slightly, your calligraphy achieves joyful, modern energy.',
        demonstration: {
          steps: [
            'Establish a standard baseline and a lower bounce baseline.',
            'Let underturns drop 2-3mm below the main baseline.',
            'Snap the exit stroke upwards with high contrast thinness.'
          ],
          proTip: 'Bounce letters selectively; bouncing every single letter creates chaotic text.',
          penAngle: '45 degrees'
        },
        practiceTask: {
          taskPrompt: 'Practice writing "Breathe", "Grace", and "Harmony" with bounce lettering dynamics.',
          referenceLetterOrWord: 'Breathe',
          targetScore: 84,
          focusMetric: 'Rhythmic baseline bounce and stroke contrast'
        }
      },
      {
        title: 'Letter Connections & Rhythm Spacing',
        slug: 'letter-connections-and-spacing',
        category: 'intermediate',
        moduleName: 'Spacing & Flow',
        difficulty: 'medium',
        estimatedMinutes: 25,
        order: 2,
        learningObjectives: [
          'Master tricky connections (e.g. b to r, v to e, o to r)',
          'Ensure consistent inter-character optical volume',
          'Eliminate abrupt line breaks during word execution'
        ],
        explanation: 'A beautifully written word flows without visual friction. Connections between letters must match the 55-degree slant angle, maintaining even optical space between letter stems.',
        demonstration: {
          steps: [
            'Keep connecting strokes at a consistent 45-degree angle.',
            'Adjust exit strokes from high-connecting letters like "o", "v", and "w".',
            'Check optical spacing: space between round shapes should be slightly tighter than vertical stems.'
          ],
          proTip: 'Squint at your written word to check optical density. White spaces should feel harmonious.',
          penAngle: '50 degrees'
        },
        practiceTask: {
          taskPrompt: 'Write the connected pairs "or", "ve", "br", and "minimum" with perfect rhythm.',
          referenceLetterOrWord: 'minimum',
          targetScore: 86,
          focusMetric: 'Even optical spacing and smooth joining loops'
        }
      },
      {
        title: 'Ascender & Descender Flourishing Rules',
        slug: 'ascender-and-descender-flourishing',
        category: 'intermediate',
        moduleName: 'Flourishing Mastery',
        difficulty: 'hard',
        estimatedMinutes: 30,
        order: 3,
        learningObjectives: [
          'Understand the golden rules of flourishing: cross at 90 degrees, avoid double thick strokes',
          'Create elegant loops on letters d, h, l, t, f, and y',
          'Balance weight across the top and bottom of words'
        ],
        explanation: 'Flourishing turns letters into pure poetry. Follow the cardinal rule: never cross thick strokes with thick strokes. Flourish lines should cross at wide angles, maintaining smooth elliptical curves.',
        demonstration: {
          steps: [
            'Extend the ascender loop of "l" or "h" in a wide graceful arc.',
            'Curve back above the word and loop cleanly across.',
            'Cross hairline over hairline at approximately 90 degrees.'
          ],
          proTip: 'Move your entire arm from the shoulder. Stiff wrist movements will produce cramped, jagged flourishes.',
          penAngle: '45-55 degrees'
        },
        practiceTask: {
          taskPrompt: 'Flourish the letters "f", "g", and the phrase "Light & Shadow".',
          referenceLetterOrWord: 'Light & Shadow',
          targetScore: 85,
          focusMetric: 'Elliptical curve smoothness and 90-degree loop crossings'
        }
      },
      {
        title: 'Quote Composition & Layout Design',
        slug: 'quote-composition-and-layout',
        category: 'intermediate',
        moduleName: 'Artistic Projects',
        difficulty: 'hard',
        estimatedMinutes: 35,
        order: 4,
        learningObjectives: [
          'Identify key focal words in a quote to highlight with scale or flourishing',
          'Center and justify multi-line calligraphy layouts',
          'Combine delicate script with simple serif or sans-serif accents'
        ],
        explanation: 'A great quote layout is like architecture. Establish visual hierarchy by rendering headline keywords larger and more expressive, while keeping auxiliary words (like "the", "and", "of") smaller and understated.',
        demonstration: {
          steps: [
            'Write out the quote draft on paper and circle the 2-3 most important words.',
            'Sketch thumbnail layout boxes: centered, diamond, or asymmetrical.',
            'Render auxiliary words in clean minimal letters and hero words in dramatic script.'
          ],
          proTip: 'Leave generous margins around your composition; empty space gives your calligraphy room to breathe.',
          penAngle: '45-55 degrees'
        },
        practiceTask: {
          taskPrompt: 'Design a 3-line quote poster: "Art is the trace of a soul" with centered alignment.',
          referenceLetterOrWord: 'Art is the trace of a soul',
          targetScore: 88,
          focusMetric: 'Visual hierarchy, margins, and center balance'
        }
      }
    ];

    const intermediateLessonIds = [];
    for (const lData of iLessonsData) {
      const lesson = await Lesson.create({
        ...lData,
        course: intermediateCourse._id
      });
      intermediateLessonIds.push(lesson._id);

      await Exercise.create({
        lesson: lesson._id,
        title: `${lesson.title} — Technique Drill`,
        targetCharacter: lesson.practiceTask.referenceLetterOrWord,
        category: 'intermediate',
        difficulty: lesson.difficulty,
        focusArea: lesson.practiceTask.focusMetric,
        strokeSteps: lesson.demonstration.steps,
        referenceGuide: {
          fontStyle: 'Dancing Script',
          sampleText: lesson.practiceTask.referenceLetterOrWord,
          instruction: lesson.practiceTask.taskPrompt
        },
        guidelineConfig: {
          hasBaseline: true,
          hasXHeight: true,
          hasAscender: true,
          hasDescender: true,
          slantAngle: 55
        },
        estimatedMinutes: lesson.estimatedMinutes,
        targetScore: lesson.practiceTask.targetScore
      });
    }

    intermediateCourse.lessons = intermediateLessonIds;
    await intermediateCourse.save();

    // ─────────────────────────────────────────────────────────────
    // 3. ADVANCED COURSE
    // ─────────────────────────────────────────────────────────────
    const advancedCourse = await Course.create({
      title: 'Advanced Masterclass: Typography, Gothic & Brand Lettering',
      slug: 'advanced-typography-gothic-brand-lettering',
      subtitle: 'Professional calligraphy: Gothic blackletter, complex flourishing, monogram logos, and custom lettering.',
      description: 'Designed for experienced calligraphers striving for commercial-grade excellence. Master heavy Gothic Textura quadrata, bespoke luxury monograms, packaging typography, and portfolio pieces.',
      category: 'advanced',
      level: 'Advanced',
      style: 'Gothic Blackletter & Custom Monograms',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600',
      estimatedHours: 8,
      instructorName: 'Master Sophia Chen',
      tags: ['Gothic', 'Blackletter', 'Brand Lettering', 'Monograms', 'Advanced Typography'],
      learningOutcomes: [
        'Execute sharp, precision Gothic diamond terminals and vertical minim strokes',
        'Design custom intertwined monograms for luxury brands and wedding stationery',
        'Create high-contrast custom lettering ready for vectorization and commercial licensing'
      ],
      order: 3
    });

    const aLessonsData = [
      {
        title: 'Blackletter & Gothic Textura Quadrata',
        slug: 'blackletter-and-gothic-quadrata',
        category: 'advanced',
        moduleName: 'Historical Manuscripts',
        difficulty: 'hard',
        estimatedMinutes: 30,
        order: 1,
        learningObjectives: [
          'Maintain rigid 40-degree flat pen nib orientation throughout strokes',
          'Produce diamond-shaped head and foot serifs (quadrata terminals)',
          'Create dense vertical texture resembling woven medieval fabric ("textura")'
        ],
        explanation: 'Gothic blackletter is renowned for its architectural, cathedral-like rhythm. The width of white space between vertical minim strokes must match the exact width of the stroke itself.',
        demonstration: {
          steps: [
            'Set pen nib flatly at 40 degrees.',
            'Press down with the nib corner to make a top diamond terminal.',
            'Pull straight down vertically with full nib contact.',
            'Finish with a sharp bottom diamond flick to the right.'
          ],
          proTip: 'Blackletter relies on geometric discipline. Keep spacing mathematically identical between every stroke.',
          penAngle: '40 degrees fixed'
        },
        practiceTask: {
          taskPrompt: 'Write Gothic characters "A", "M", "S", and the medieval word "Sanctuary".',
          referenceLetterOrWord: 'Sanctuary',
          targetScore: 88,
          focusMetric: 'Terminal diamond symmetry and 1:1 stroke-to-space ratio'
        }
      },
      {
        title: 'Complex Monogram & Intertwined Crest Design',
        slug: 'complex-monogram-and-crest-design',
        category: 'advanced',
        moduleName: 'Commercial Lettering',
        difficulty: 'hard',
        estimatedMinutes: 35,
        order: 2,
        learningObjectives: [
          'Interlock two or three capital initials with over-and-under weaving',
          'Enclose lettering in balanced circular or shield ornament frames',
          'Design vector-ready initials for luxury logos and wedding seals'
        ],
        explanation: 'Monograms combine multiple letterforms into a single unified artistic emblem. Master the technique of "interweaving", where strokes alternate passing above and below each other to create three-dimensional depth.',
        demonstration: {
          steps: [
            'Sketch two capital letters intersecting at key structural junctures.',
            'Determine which stroke weaves over and which weaves under.',
            'Add a subtle 1mm white gap at overlap points to give distinct visual depth.'
          ],
          proTip: 'Ensure both letters retain their individual legibility even while harmoniously intertwined.',
          penAngle: '45 degrees'
        },
        practiceTask: {
          taskPrompt: 'Design a bespoke interlocked monogram with initials "C" and "V" (CalliVerse).',
          referenceLetterOrWord: 'CV Monogram',
          targetScore: 90,
          focusMetric: 'Interweaving depth and architectural balance'
        }
      },
      {
        title: 'Commercial Invitation & Portfolio Exhibition Piece',
        slug: 'commercial-invitation-and-portfolio-piece',
        category: 'advanced',
        moduleName: 'Professional Mastery',
        difficulty: 'hard',
        estimatedMinutes: 45,
        order: 3,
        learningObjectives: [
          'Create a museum-quality exhibition calligraphy piece from start to finish',
          'Incorporate gold dust highlights, hairline borders, and balanced flourishes',
          'Prepare artwork for high-resolution digital scanning and client delivery'
        ],
        explanation: 'The culmination of your calligraphy mastery: bringing together stroke consistency, flawless rhythm, customized flourishes, and immaculate presentation into a commercial showcase piece.',
        demonstration: {
          steps: [
            'Select luxury paper texture and set margin guidelines.',
            'Write formal names and headers with majestic Roman or Copperplate styling.',
            'Add subtle flourishing accents around the periphery.',
            'Critique against AI stroke metrics to polish every individual curve.'
          ],
          proTip: 'Inspect your work under direct natural light to catch any uneven ink pooling before final sealing.',
          penAngle: '45-55 degrees'
        },
        practiceTask: {
          taskPrompt: 'Create a full wedding invitation title: "The Honor of Your Presence".',
          referenceLetterOrWord: 'The Honor of Your Presence',
          targetScore: 92,
          focusMetric: 'Commercial finish, baseline perfection, and flourishing elegance'
        }
      }
    ];

    const advancedLessonIds = [];
    for (const lData of aLessonsData) {
      const lesson = await Lesson.create({
        ...lData,
        course: advancedCourse._id
      });
      advancedLessonIds.push(lesson._id);

      await Exercise.create({
        lesson: lesson._id,
        title: `${lesson.title} — Master Drill`,
        targetCharacter: lesson.practiceTask.referenceLetterOrWord,
        category: 'advanced',
        difficulty: lesson.difficulty,
        focusArea: lesson.practiceTask.focusMetric,
        strokeSteps: lesson.demonstration.steps,
        referenceGuide: {
          fontStyle: 'IM Fell English',
          sampleText: lesson.practiceTask.referenceLetterOrWord,
          instruction: lesson.practiceTask.taskPrompt
        },
        guidelineConfig: {
          hasBaseline: true,
          hasXHeight: true,
          hasAscender: true,
          hasDescender: true,
          slantAngle: 40
        },
        estimatedMinutes: lesson.estimatedMinutes,
        targetScore: lesson.practiceTask.targetScore
      });
    }

    advancedCourse.lessons = advancedLessonIds;
    await advancedCourse.save();

    console.log('✓ Successfully seeded 3 structured courses with comprehensive lessons & exercises!');
  } catch (error) {
    console.error('Error seeding learning data:', error.message);
  }
};

module.exports = seedLearningData;
