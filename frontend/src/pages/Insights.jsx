import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";

const Insights = () => {
  return (
    <PageLayout
      title="Business Insights"
      subtitle="AI-driven patterns and key intelligence from your data"
    >

      {/* TOP HIGHLIGHTS */}
      <div className="insight-highlight-grid">

        <motion.div className="highlight-card blue" whileHover={{ scale: 1.03 }}>
          <h4>Top Category</h4>
          <p className="big-text">Technology</p>
          <span className="tag positive">↑ High Revenue</span>
        </motion.div>

        <motion.div className="highlight-card green" whileHover={{ scale: 1.03 }}>
          <h4>Growth Trend</h4>
          <p className="big-text">+18%</p>
          <span className="tag positive">↑ Increasing</span>
        </motion.div>

        <motion.div className="highlight-card purple" whileHover={{ scale: 1.03 }}>
          <h4>Peak Month</h4>
          <p className="big-text">November</p>
          <span className="tag neutral">Seasonal spike</span>
        </motion.div>

      </div>

      {/* DETAILED INSIGHTS */}
      <div className="insight-section">

        <motion.div className="insight-detail-card" whileHover={{ y: -3 }}>
          <h4>📊 Revenue Insight</h4>
          <p>
            Technology category contributes the largest share of total revenue,
            indicating strong market demand and product dominance.
          </p>
        </motion.div>

        <motion.div className="insight-detail-card" whileHover={{ y: -3 }}>
          <h4>📈 Trend Insight</h4>
          <p>
            Sales show consistent upward growth, especially in the second half
            of the year, highlighting seasonal buying behavior.
          </p>
        </motion.div>

        <motion.div className="insight-detail-card" whileHover={{ y: -3 }}>
          <h4>🧠 Behavioral Insight</h4>
          <p>
            A small set of products drives a majority of revenue, suggesting
            dependency on key performers.
          </p>
        </motion.div>

      </div>

    </PageLayout>
  );
};

export default Insights;