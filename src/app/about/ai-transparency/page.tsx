import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "How Our AI Works | Faith Marie Foundation",
  description: "Full transparency into the autonomous AI research system that powers our mission to make mental health research accessible.",
};

export default function AITransparencyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">
              How Our AI Works
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Full transparency into the autonomous research system that powers our mission
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe donors deserve to know exactly how their contributions are used. This page provides
              complete visibility into our AI agent organization, daily operations, quality standards, and costs.
            </p>
          </div>
        </section>

        {/* Agent Organization Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">The Agent Organization</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Our AI system mirrors a traditional research organization, with clear reporting lines
              and human oversight at every critical decision point.
            </p>

            {/* Human Oversight Layer - Highlighted */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <h3 className="text-xl font-medium text-gray-800">Human Oversight Layer</h3>
                <span className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Ultimate Authority</span>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-md p-4 border border-teal-100">
                  <p className="font-medium text-gray-800">Levi Moses</p>
                  <p className="text-sm text-gray-600">Founder</p>
                </div>
                <div className="bg-white rounded-md p-4 border border-teal-100">
                  <p className="font-medium text-gray-800">Bob Teel</p>
                  <p className="text-sm text-gray-600">Financial Director</p>
                </div>
                <div className="bg-white rounded-md p-4 border border-teal-100">
                  <p className="font-medium text-gray-800">Medical Advisor</p>
                  <p className="text-sm text-gray-600">TBD</p>
                </div>
              </div>
              <p className="text-sm text-teal-700 mt-4">
                The Board of Directors retains ultimate authority over all agent decisions and strategic direction.
              </p>
            </div>

            {/* Executive Layer */}
            <div className="mb-6">
              <div className="rounded-lg border border-gray-100 shadow-sm p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Executive Layer</h3>
                </div>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="font-medium text-gray-800">CEO Orchestrator</p>
                  <p className="text-sm text-gray-600">Coordinates the entire research pipeline, sets daily priorities, and delivers comprehensive reports to the board.</p>
                </div>
              </div>
            </div>

            {/* Research Layer */}
            <div className="mb-6">
              <div className="rounded-lg border border-gray-100 shadow-sm p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Research Layer</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Research Director</p>
                    <p className="text-sm text-gray-600">Sets methodology standards and manages quality gates</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Topic Lead: Depression</p>
                    <p className="text-sm text-gray-600">Specializes in depression research</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Topic Lead: Anxiety</p>
                    <p className="text-sm text-gray-600">Specializes in anxiety research</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Topic Lead: PTSD</p>
                    <p className="text-sm text-gray-600">Specializes in trauma research</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Topic Lead: Grief</p>
                    <p className="text-sm text-gray-600">Specializes in grief and loss research</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Research Analysts (8-12)</p>
                    <p className="text-sm text-gray-600">Database scanning and paper extraction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Layer */}
            <div className="mb-6">
              <div className="rounded-lg border border-gray-100 shadow-sm p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Quality Assurance Layer</h3>
                </div>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="font-medium text-gray-800">QA Agent</p>
                  <p className="text-sm text-gray-600">Last line of defense before publication. Performs hallucination detection, fact verification, and ensures all content meets quality standards.</p>
                </div>
              </div>
            </div>

            {/* Communications Layer */}
            <div className="mb-6">
              <div className="rounded-lg border border-gray-100 shadow-sm p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Communications Layer</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Communications Director</p>
                    <p className="text-sm text-gray-600">Oversees all public-facing content</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Content Writer</p>
                    <p className="text-sm text-gray-600">Transforms research into accessible articles</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Social Media Agent</p>
                    <p className="text-sm text-gray-600">Manages platform presence and engagement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations Layer */}
            <div className="mb-6">
              <div className="rounded-lg border border-gray-100 shadow-sm p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-800">Operations Layer</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Data Librarian</p>
                    <p className="text-sm text-gray-600">Organizes and maintains the research archive</p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="font-medium text-gray-800">Analytics Agent</p>
                    <p className="text-sm text-gray-600">Tracks research trends and impact metrics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Pipeline Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">The Daily Pipeline</h2>
            <p className="text-center text-gray-600 mb-12">
              Our research workflow runs daily from 6:00 AM to 6:00 PM Central Time
            </p>

            <div className="relative">
              {/* Timeline */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-teal-200 transform -translate-x-1/2"></div>

              <div className="space-y-8">
                {[
                  { time: "6:00 AM", title: "Database Scanning", description: "Research analysts scan PubMed, bioRxiv, and other databases for new papers on depression, anxiety, PTSD, and grief." },
                  { time: "8:00 AM", title: "Triage & Extraction", description: "Topic leads review flagged papers, extract key findings, and assess methodology quality." },
                  { time: "10:00 AM", title: "Synthesis", description: "Research Director synthesizes findings across topics, identifying patterns and breakthrough insights." },
                  { time: "12:00 PM", title: "Quality Assurance", description: "QA Agent verifies all claims against source papers, checks for hallucinations, and validates citations." },
                  { time: "2:00 PM", title: "Content Production", description: "Content Writer transforms verified research into accessible daily digests and topic summaries." },
                  { time: "4:00 PM", title: "Publication & Reporting", description: "Content published to website. CEO Orchestrator compiles daily report for board review." },
                ].map((step, index) => (
                  <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                        <span className="text-sm font-medium text-teal-600">{step.time}</span>
                        <h3 className="text-lg font-medium text-gray-800 mt-1">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow z-10"></div>
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Human Oversight Points */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">Human Oversight Points</h2>
            <p className="text-center text-gray-600 mb-12">
              Critical safeguards ensure human judgment guides every major decision
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-teal-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Board Authority</h3>
                <p className="text-gray-600">The Board of Directors retains ultimate authority over all strategic decisions, publication policies, and research priorities.</p>
              </div>

              <div className="bg-teal-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Critical Escalation</h3>
                <p className="text-gray-600">Findings that could affect patient safety or require urgent attention are escalated immediately to human reviewers.</p>
              </div>

              <div className="bg-teal-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">QA Gates</h3>
                <p className="text-gray-600">No content reaches publication without passing through quality assurance verification and fact-checking.</p>
              </div>

              <div className="bg-teal-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Emergency Protocols</h3>
                <p className="text-gray-600">Defined procedures for system pauses, content rollbacks, and crisis communication are in place and regularly tested.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">Quality Standards</h2>
            <p className="text-center text-gray-600 mb-12">
              Every piece of research is evaluated against rigorous criteria
            </p>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 mb-8">
              <h3 className="text-xl font-medium text-gray-800 mb-6">Methodology Rubric (5 Dimensions)</h3>
              <div className="space-y-4">
                {[
                  { name: "Study Design", description: "RCTs, meta-analyses, and systematic reviews score highest" },
                  { name: "Sample Size", description: "Statistical power and generalizability of findings" },
                  { name: "Methodology Rigor", description: "Proper controls, blinding, and bias mitigation" },
                  { name: "Replication Status", description: "Whether findings have been independently verified" },
                  { name: "Clinical Relevance", description: "Practical applicability to real-world mental health care" },
                ].map((dimension, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-700 font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{dimension.name}</p>
                      <p className="text-sm text-gray-600">{dimension.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Confidence Levels</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span><strong>High:</strong> Multiple RCTs, consistent results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span><strong>Moderate:</strong> Limited studies, promising results</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    <span><strong>Preliminary:</strong> Early research, needs validation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Publication Criteria</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Published:</strong> Meets quality threshold, verified claims, practical value</p>
                  <p><strong>Archived:</strong> Interesting but insufficient evidence, or superseded by newer research</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ethical Principles */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">Ethical Principles</h2>
            <p className="text-center text-gray-600 mb-12">
              The values that guide every decision our AI agents make
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Accuracy Over Speed",
                  description: "We never sacrifice correctness for faster publication. Every claim must be verified."
                },
                {
                  title: "Compassion in Communication",
                  description: "Mental health content is written with sensitivity to those who may be struggling."
                },
                {
                  title: "Transparency",
                  description: "All AI-generated content is clearly disclosed. We never pretend to be human."
                },
                {
                  title: "Humility",
                  description: "We include appropriate caveats about limitations and encourage professional consultation."
                },
                {
                  title: "Human Authority",
                  description: "AI provides research support. Humans make final decisions on all critical matters."
                },
                {
                  title: "No Harm",
                  description: "Content that could cause harm is flagged, reviewed, and handled with extreme care."
                },
              ].map((principle, index) => (
                <div key={index} className="rounded-lg border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Breakdown */}
        <section className="py-16 bg-teal-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">Where Your Donation Goes</h2>
            <p className="text-center text-gray-600 mb-12">
              Complete transparency into our operational costs
            </p>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-8">
              <div className="space-y-4">
                {[
                  { name: "Anthropic API (AI Processing)", range: "$400 - $900/month", description: "Powers all agent analysis and content generation" },
                  { name: "Cloud Infrastructure", range: "$150 - $300/month", description: "Compute resources for running the research pipeline" },
                  { name: "Database Services", range: "$50 - $100/month", description: "Storage for research archive and knowledge base" },
                  { name: "Website Hosting", range: "$20 - $50/month", description: "Serving the website and daily digests" },
                  { name: "Monitoring & Tools", range: "$50 - $100/month", description: "System health, error tracking, and analytics" },
                ].map((cost, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium text-gray-800">{cost.name}</p>
                      <p className="text-sm text-gray-600">{cost.description}</p>
                    </div>
                    <p className="text-teal-700 font-medium whitespace-nowrap ml-4">{cost.range}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-medium text-gray-800">Total Monthly Cost</p>
                    <p className="text-sm text-gray-600">At full deployment</p>
                  </div>
                  <p className="text-2xl font-medium text-teal-700">$670 - $1,450</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-700 mt-8 text-lg">
              Your donation directly funds the infrastructure that scans thousands of papers monthly.
            </p>
          </div>
        </section>

        {/* Why This Approach */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-light text-center text-gray-800 mb-4">Why This Approach</h2>
            <p className="text-center text-gray-600 mb-12">
              How AI enables us to maximize impact while minimizing costs
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">10-50x Cost Reduction</h3>
                    <p className="text-gray-600">Traditional research foundation staffing would cost $50,000-$150,000/month. Our AI approach achieves comparable output for under $1,500.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">24/7 Coverage</h3>
                    <p className="text-gray-600">AI enables continuous monitoring of the research landscape. New papers are identified and processed daily without staffing constraints.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Focus on Impact</h3>
                    <p className="text-gray-600">With operational costs minimized, more donations can fund tools, outreach, and direct support for those who need it most.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Personal Mission</h3>
                    <p className="text-gray-600">Maintained by a small team with deep personal connection to the mission. Every decision is guided by Faith Marie&apos;s legacy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-light text-gray-800 mb-8">Support Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Your contribution directly powers the infrastructure that makes mental health research accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="bg-teal-600 text-white px-8 py-4 rounded-md text-lg hover:bg-teal-700 transition-colors"
              >
                Get Involved
              </Link>
              <Link
                href="/research/daily-digests"
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-md text-lg hover:bg-gray-200 transition-colors"
              >
                See Our Research
              </Link>
              <Link
                href="/our-story"
                className="bg-white text-gray-700 px-8 py-4 rounded-md text-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
