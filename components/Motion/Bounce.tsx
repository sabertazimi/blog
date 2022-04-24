import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Bounce = ({ children, ...props }: Props): JSX.Element => (
  <motion.div
    className="inline-flex"
    initial={{ opacity: 0, translateX: 20 }}
    whileInView={{ opacity: 1, translateX: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.2, translateY: -5 }}
    whileTap={{ scale: 1.0, translateY: 0 }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Bounce;
