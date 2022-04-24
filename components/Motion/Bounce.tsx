import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Bounce = ({ children, ...props }: Props): JSX.Element => (
  <motion.div
    className="inline-flex"
    layout
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.2, y: -5 }}
    whileTap={{ scale: 1.0, y: 0 }}
    transition={{
      type: 'spring',
      stiffness: 100,
      duration: 0.2,
    }}
    viewport={{ once: true }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Bounce;
