import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";

const Warnings = () => {
  return (
    <PageLayout
      title="Risk & Performance Warnings"
      subtitle="Critical areas that require attention and optimization"
    >

      {/* TOP WARNING SUMMARY */}
      <div className="warning-highlight-grid">

        <motion.div className="warning-card red" whileHover={{ scale: 1.03 }}>
          <h4>Critical Risk</h4>
          <p className="big-text">High</p>
          <span className="tag warning">Immediate Action</span>
        </motion.div>

        <motion.div className="warning-card orange" whileHover={{ scale: 1.03 }}>
          <h4>Low Performers</h4>
          <p className="big-text">10 Products</p>
          <span className="tag warning">Needs Optimization</span>
        </motion.div>

        <motion.div className="warning-card yellow" whileHover={{ scale: 1.03 }}>
          <h4>Revenue Risk</h4>
          <p className="big-text">Concentrated</p>
          <span className="tag neutral">Dependency</span>
        </motion.div>

      </div>

      {/* DETAILED WARNINGS */}
      <div className="warning-section">

        <motion.div className="warning-detail-card" whileHover={{ y: -3 }}>
          <h4>⚠️ Low Performing Products</h4>
          <p>
            Several products consistently generate low revenue, indicating poor
            demand or ineffective positioning in the market.
          </p>
        </motion.div>

        <motion.div className="warning-detail-card" whileHover={{ y: -3 }}>
          <h4>⚠️ Revenue Concentration</h4>
          <p>
            A large portion of revenue depends on a small number of products,
            increasing business risk if demand fluctuates.
          </p>
        </motion.div>

        <motion.div className="warning-detail-card" whileHover={{ y: -3 }}>
          <h4>⚠️ Seasonal Dependency</h4>
          <p>
            Sales peak during specific months, making revenue flow uneven across
            the year.
          </p>
        </motion.div>

      </div>

    </PageLayout>
  );
};

export default Warnings;