import { MetricsStrip } from '../MetricsStrip'
import { ProjectCard } from '../ProjectCard'
import { SectionHeader } from '../SectionHeader'
import { SkillChips } from '../SkillChips'
import { Reveal } from '../Reveal'

export function DataScientistTab() {
  return (
    <div className="space-y-16 py-8">
      <Reveal>
        <section>
          <p className="max-w-3xl text-text-muted leading-relaxed">
            I build data-driven ML systems end-to-end —{' '}
            <strong className="text-text">ETL → feature engineering → XGBoost / scikit-learn → LLM-powered insights</strong>.
            Comfortable owning the path from raw CSV to a trained model to a human-readable
            report, with Python on the data side and TypeScript on the integration side.
          </p>
        </section>
      </Reveal>
      <Reveal>
        <section>
          <SectionHeader eyebrow="Stack" title="Tools of the trade" />
          <SkillChips
            groups={[
              { label: 'Languages', items: ['Python', 'SQL', 'TypeScript'] },
              {
                label: 'Data tooling',
                items: ['pandas', 'NumPy', 'matplotlib', 'seaborn', 'scikit-learn', 'XGBoost'],
              },
              {
                label: 'ETL & DB',
                items: ['PostgreSQL (Neon)', 'MariaDB', 'Prisma', 'CSV / Excel pipelines', 'DuckDB'],
              },
              {
                label: 'ML / AI',
                items: ['Classification', 'Feature engineering', 'ROC-AUC / F1', 'Prompt engineering', 'RAG basics'],
              },
              { label: 'LLM platforms', items: ['Claude API (Anthropic)', 'OpenAI API', 'Groq'] },
            ]}
          />
        </section>
      </Reveal>
        

      <Reveal>
        <section>
        <SectionHeader eyebrow="Outcomes" title="Recent metrics" />
        <MetricsStrip
          items={[
            { value: '0.84', label: 'ROC-AUC · churn classifier' },
            { value: '100k+', label: 'orders analyzed · Olist EDA' },
            { value: '5', label: 'cities · daily ETL pipeline' },
          ]}
        />
      </section>
      </Reveal>
      

      <Reveal>
        <section>
          <SectionHeader eyebrow="Build" title="Featured projects" />
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard
              highlight
              title="HR Insight AI — ML pipeline"
            blurb="ETL (Extract → Clean → Transform → Validate) in pandas, XGBoost classifier on engineered features (tenure, engagement, overtime, promotion gap, training, absenteeism), risk bucketing (LOW / MEDIUM / HIGH), Claude-generated executive reports."
            stack={[
              'Python', 'pandas', 'scikit-learn', 'XGBoost',
              'FastAPI', 'PostgreSQL', 'Claude API',
            ]}
            links={{ github: 'https://github.com/SyrineLarbi' }}
          />
          <ProjectCard
            title="Olist EDA — Brazilian e-commerce"
            blurb="EDA on 100k+ Olist orders (2016–2018). 5 questions → 5 charts: 5.4× revenue growth in 11 months, top-5 states drive 75% of orders, Spearman −0.31 between delivery days and review score, 96.9% one-and-done customers."
            stack={['Python', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'scipy', 'JupyterLab']}
            links={{
              github: 'https://github.com/SyrineLarbi/ecommerce-eda',
              nbviewer: 'https://nbviewer.org/github/SyrineLarbi/ecommerce-eda/blob/main/notebooks/01-olist-eda.ipynb',
            }}
          />
          <ProjectCard
            title="Customer churn classifier"
            blurb="XGBoost on the public IBM Telco churn dataset — scikit-learn Pipeline + ColumnTransformer, ROC-AUC 0.842, confusion matrix, SHAP feature importances, a model card, and a live Streamlit demo."
            stack={['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Streamlit']}
            links={{
              github: 'https://github.com/SyrineLarbi/churn-classifier',
              demo: 'https://churn-classifier-nk8qxgpsbeh8akhk3luqwu.streamlit.app/',
            }}
          />
          <ProjectCard
            title="ETL mini-pipeline"
            blurb="Medallion pipeline (raw → bronze → silver → gold) pulling daily Open-Meteo weather for 5 cities. Pydantic validation at the bronze boundary, DuckDB warehouse, Typer CLI, Streamlit dashboard. Proves end-to-end ownership beyond notebooks."
            stack={['Python', 'DuckDB', 'Pydantic', 'pandas', 'Streamlit']}
            links={{ github: 'https://github.com/SyrineLarbi/etl-mini-pipeline' }}
          />
        </div>
      </section>
      </Reveal>
    </div>
  )
}