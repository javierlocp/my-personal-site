export const isVideo = (src) => /\.(mp4|webm|ogg|mov|m4v)$/i.test(src);

/** @typedef {{
 *   title: string;
 *   images: string[];
 *   poster?: string;
 *   visit?: { href: string; label?: string };
 *   wip?: boolean;
 * }} Exploration
 */

/** @type {Exploration[]} */
export const explorations = [
  {
    title: 'Doremi Finance — Building',
    images: [
      '/showcase/doremi/doremi-landing-vid.mp4',
      '/showcase/doremi/doremi-hero.png',
      '/showcase/doremi/doremi-feature.png',
      '/showcase/doremi/doremi-compare-fees.png',
      '/showcase/doremi/logo-animation.mp4',
    ],
    wip: true, // WIP tag
    visit: { href: 'https://doremi-landing-ui.vercel.app/', label: 'Visit' }, // With Visit Link
  },
  {
    title: 'Custom Icons',
    images: ['/showcase/design-exp/tr-assets.png'],
  },
  {
    title: 'Micro-animations',
    images: ['/showcase/ai/making-manus-fast.mp4'],
    poster: '/showcase/ai/motion.png',
  },
];
