import { motion } from 'framer-motion';
import IconFactory from './IconFactory';

const Svg = () => (
  <motion.svg
    viewBox="0 0 1024 1024"
    p-id="7522"
    width="2em"
    height="2em"
    fill="currentColor"
  >
    <motion.path
      d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 784H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 472H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
      p-id="7523"
    />
  </motion.svg>
);

const Hamburger = IconFactory(Svg, 'Hamburger');
export default Hamburger;
