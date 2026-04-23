import { motion } from "framer-motion";

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div className="dashboard-wrapper">

      {/* LEFT */}
      <div className="dashboard-main">
        <div className="dashboard">

          <div className="page-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}

        </div>
      </div>

      {/* RIGHT PANEL */}
     <motion.div 
  className="insight-panel"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>

  {/* INSIGHTS */}
  <div className="panel-section">
    <h3>💡 Key Insights</h3>

    <div className="panel-card insight">
      <div className="panel-title">Technology Dominance</div>
      <div className="panel-desc">
        Technology category contributes the highest revenue share.
      </div>
      <span className="panel-tag positive">High Impact</span>
    </div>

    <div className="panel-card insight">
      <div className="panel-title">Upward Trend</div>
      <div className="panel-desc">
        Sales show strong growth in later months.
      </div>
      <span className="panel-tag positive">Growth</span>
    </div>
  </div>

  {/* WARNINGS */}
  <div className="panel-section">
    <h3>⚠️ Warnings</h3>

    <div className="panel-card warning">
      <div className="panel-title">Low Performers</div>
      <div className="panel-desc">
        Several products consistently generate low revenue.
      </div>
      <span className="panel-tag warning">Needs Attention</span>
    </div>

    <div className="panel-card warning">
      <div className="panel-title">Revenue Concentration</div>
      <div className="panel-desc">
        Majority revenue depends on few products.
      </div>
      <span className="panel-tag warning">Risk</span>
    </div>
  </div>

  {/* OPPORTUNITIES */}
  <div className="panel-section">
    <h3>🚀 Opportunities</h3>

    <div className="panel-card opportunity">
      <div className="panel-title">Expand Winners</div>
      <div className="panel-desc">
        Invest more in high-performing categories.
      </div>
      <span className="panel-tag opportunity">High ROI</span>
    </div>

    <div className="panel-card opportunity">
      <div className="panel-title">Optimize Products</div>
      <div className="panel-desc">
        Improve or reposition low-performing items.
      </div>
      <span className="panel-tag opportunity">Actionable</span>
    </div>
  </div>

</motion.div>

    </div>
  );
};

export default PageLayout;