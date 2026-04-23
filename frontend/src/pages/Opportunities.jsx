import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";

const Opportunities = () => {
  return (
    <PageLayout
      title="Growth Opportunities"
      subtitle="Strategic areas to maximize revenue and performance"
    >

      {/* TOP OPPORTUNITY CARDS */}
      <div className="opportunity-highlight-grid">

        <motion.div className="opportunity-card green" whileHover={{ scale: 1.03 }}>
          <h4>High ROI Area</h4>
          <p className="big-text">Technology</p>
          <span className="tag positive">↑ Expansion Ready</span>
        </motion.div>

        <motion.div className="opportunity-card teal" whileHover={{ scale: 1.03 }}>
          <h4>Growth Potential</h4>
          <p className="big-text">+25%</p>
          <span className="tag positive">Untapped Demand</span>
        </motion.div>

        <motion.div className="opportunity-card blue" whileHover={{ scale: 1.03 }}>
          <h4>Optimization Scope</h4>
          <p className="big-text">Products</p>
          <span className="tag neutral">Improve Strategy</span>
        </motion.div>

      </div>

      {/* DETAILED OPPORTUNITIES */}
      <div className="opportunity-section">

        <motion.div className="opportunity-detail-card" whileHover={{ y: -3 }}>
          <h4>🚀 Expand High-Performing Categories</h4>
          <p>
            Increase investment in technology and top-performing categories
            to maximize returns and scale growth faster.
          </p>
          <span className="impact-tag high">High Impact</span>
        </motion.div>

        <motion.div className="opportunity-detail-card" whileHover={{ y: -3 }}>
          <h4>🚀 Optimize Low-Performing Products</h4>
          <p>
            Improve pricing, marketing, or positioning of underperforming
            products to convert them into revenue contributors.
          </p>
          <span className="impact-tag medium">Medium Impact</span>
        </motion.div>

        <motion.div className="opportunity-detail-card" whileHover={{ y: -3 }}>
          <h4>🚀 Leverage Seasonal Demand</h4>
          <p>
            Focus campaigns and inventory planning around peak months to
            maximize sales during high-demand periods.
          </p>
          <span className="impact-tag high">High Impact</span>
        </motion.div>

      </div>

    </PageLayout>
  );
};

export default Opportunities;