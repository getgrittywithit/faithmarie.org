'use client';

/**
 * Mental Health Resources — Learn Page
 * Comprehensive educational resource about mental health conditions,
 * treatments, and paths to healing.
 */

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Navigation structure
type NavItem = {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
};

const NAV: NavItem[] = [
  { id: 'overview', label: 'Start Here' },
  {
    id: 'conditions',
    label: 'Understanding Conditions',
    children: [
      { id: 'grief', label: 'Grief & Loss' },
      { id: 'depression', label: 'Depression' },
      { id: 'anxiety', label: 'Anxiety Disorders' },
      { id: 'ptsd', label: 'PTSD' },
      { id: 'bipolar', label: 'Bipolar Disorder' },
      { id: 'ocd', label: 'OCD' },
      { id: 'adhd', label: 'ADHD' },
    ],
  },
  {
    id: 'medications',
    label: 'Medications Explained',
    children: [
      { id: 'grief-treatment', label: 'After Loss: What Helps?' },
      { id: 'ssris', label: 'SSRIs' },
      { id: 'snris', label: 'SNRIs' },
      { id: 'atypical-antidep', label: 'Atypical Antidepressants' },
      { id: 'tricyclics', label: 'Tricyclics & MAOIs' },
      { id: 'mood-stabilizers', label: 'Mood Stabilizers' },
      { id: 'antipsychotics', label: 'Antipsychotics' },
      { id: 'benzos', label: 'Benzodiazepines' },
      { id: 'stimulants', label: 'Stimulants (ADHD)' },
      { id: 'med-safety', label: 'How to Read Safety Info' },
    ],
  },
  {
    id: 'natural',
    label: 'Natural Approaches',
    children: [
      { id: 'exercise', label: 'Exercise & Movement' },
      { id: 'sleep', label: 'Sleep' },
      { id: 'nutrition', label: 'Nutrition' },
      { id: 'sunlight', label: 'Sunlight & Nature' },
      { id: 'digital-detox', label: 'Phones & Screen Breaks' },
      { id: 'connection', label: 'Connection & Community' },
      { id: 'faith', label: 'Prayer & Contemplation' },
      { id: 'therapy-types', label: 'Types of Therapy' },
    ],
  },
  { id: 'family', label: 'For Family & Friends' },
  { id: 'careers', label: 'Careers in Mental Health' },
  { id: 'crisis', label: 'Crisis & Immediate Help' },
];

// Component that handles search params (needs Suspense)
function LearnPageContent() {
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState<string>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle URL section parameter for deep linking
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && isValidSection(section)) {
      setActiveId(section);
    }
  }, [searchParams]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('content-top');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Top crisis banner */}
        <div className="bg-red-700 text-red-50 text-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 flex-wrap text-center">
            <span className="font-semibold">In crisis or thinking about suicide?</span>
            <a href="tel:988" className="underline underline-offset-2 hover:text-white">
              Call or text 988
            </a>
            <span className="opacity-75">|</span>
            <a href="sms:741741&body=HOME" className="underline underline-offset-2 hover:text-white">
              Text HOME to 741741
            </a>
          </div>
        </div>

        {/* Page header */}
        <header className="bg-gradient-to-b from-teal-50 to-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
            <p className="uppercase tracking-widest text-xs text-teal-700 font-semibold mb-3">
              Educational Resource
            </p>
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
              Mental Health, Explained with Care
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl">
              A place to learn about mental health conditions, treatments, and the many paths toward
              healing — whether you&apos;re walking this road yourself or walking beside someone you love.
              You are not alone, and there is hope.
            </p>
          </div>
        </header>

        {/* Mobile nav toggle */}
        <div className="md:hidden sticky top-16 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <span className="font-medium text-gray-700 text-sm">
            {findLabel(activeId) ?? 'Menu'}
          </span>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="text-sm font-medium text-teal-700 underline"
          >
            {mobileOpen ? 'Close menu' : 'Browse topics'}
          </button>
        </div>

        {/* Layout */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 grid md:grid-cols-[260px_1fr] gap-6 md:gap-10">
          {/* Sidebar */}
          <aside
            className={`${
              mobileOpen ? 'block' : 'hidden'
            } md:block md:sticky md:top-24 md:self-start`}
          >
            <nav className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
              <ul className="space-y-0.5">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <NavButton
                      active={activeId === item.id}
                      onClick={() => handleSelect(item.id)}
                      label={item.label}
                      bold
                    />
                    {item.children && (
                      <ul className="ml-3 border-l border-gray-200 mt-1 mb-2">
                        {item.children.map((c) => (
                          <li key={c.id}>
                            <NavButton
                              active={activeId === c.id}
                              onClick={() => handleSelect(c.id)}
                              label={c.label}
                              nested
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-4 bg-teal-50 border border-teal-200 rounded-lg p-4 text-sm text-teal-900">
              <p className="font-semibold">A gentle reminder</p>
              <p className="mt-1 leading-relaxed">
                This page is for learning. It does not replace a conversation with a doctor,
                counselor, or pastor who knows you.
              </p>
            </div>
          </aside>

          {/* Main content */}
          <div id="content-top" className="min-w-0">
            <article className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-10 prose prose-gray max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-a:text-teal-700">
              {renderSection(activeId)}
            </article>

            {/* Footer disclaimer */}
            <div className="mt-6 text-xs text-gray-500 leading-relaxed">
              <p>
                <strong>Disclaimer:</strong> The content on this page is for general educational
                purposes only and is not medical advice. Always consult a qualified healthcare
                professional before starting, stopping, or changing any treatment. If you or someone
                you love is in immediate danger, call 911 or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Wrapper component with Suspense for useSearchParams
export default function LearnPage() {
  return (
    <Suspense fallback={<LearnPageLoading />}>
      <LearnPageContent />
    </Suspense>
  );
}

function LearnPageLoading() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Helper functions
function isValidSection(id: string): boolean {
  const validIds = [
    'overview', 'conditions', 'grief', 'depression', 'anxiety', 'ptsd', 'bipolar', 'ocd', 'adhd',
    'medications', 'grief-treatment', 'ssris', 'snris', 'atypical-antidep', 'tricyclics',
    'mood-stabilizers', 'antipsychotics', 'benzos', 'stimulants', 'med-safety',
    'natural', 'exercise', 'sleep', 'nutrition', 'sunlight', 'digital-detox',
    'connection', 'faith', 'therapy-types', 'family', 'careers', 'crisis'
  ];
  return validIds.includes(id);
}

function findLabel(id: string): string | undefined {
  for (const item of NAV) {
    if (item.id === id) return item.label;
    const child = item.children?.find((c) => c.id === id);
    if (child) return child.label;
  }
  return undefined;
}

function NavButton({
  active,
  onClick,
  label,
  nested,
  bold,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  nested?: boolean;
  bold?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'w-full text-left rounded-md px-3 py-2 text-sm transition',
        nested ? 'pl-4' : '',
        bold ? 'font-semibold' : 'font-normal',
        active
          ? 'bg-teal-100 text-teal-900'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

// Section renderer
function renderSection(id: string) {
  switch (id) {
    case 'overview': return <Overview />;
    case 'conditions': return <ConditionsIntro />;
    case 'grief': return <Grief />;
    case 'depression': return <Depression />;
    case 'anxiety': return <Anxiety />;
    case 'ptsd': return <PTSD />;
    case 'bipolar': return <Bipolar />;
    case 'ocd': return <OCD />;
    case 'adhd': return <ADHD />;
    case 'medications': return <MedicationsIntro />;
    case 'grief-treatment': return <GriefTreatment />;
    case 'ssris': return <SSRIs />;
    case 'snris': return <SNRIs />;
    case 'atypical-antidep': return <AtypicalAntidep />;
    case 'tricyclics': return <TricyclicsMAOIs />;
    case 'mood-stabilizers': return <MoodStabilizers />;
    case 'antipsychotics': return <Antipsychotics />;
    case 'benzos': return <Benzos />;
    case 'stimulants': return <Stimulants />;
    case 'med-safety': return <MedSafety />;
    case 'natural': return <NaturalIntro />;
    case 'exercise': return <Exercise />;
    case 'sleep': return <Sleep />;
    case 'nutrition': return <Nutrition />;
    case 'sunlight': return <Sunlight />;
    case 'digital-detox': return <DigitalDetox />;
    case 'connection': return <Connection />;
    case 'faith': return <Faith />;
    case 'therapy-types': return <TherapyTypes />;
    case 'family': return <Family />;
    case 'careers': return <Careers />;
    case 'crisis': return <Crisis />;
    default: return <Overview />;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT SECTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

function Overview() {
  return (
    <>
      <h2>Welcome</h2>
      <p>
        Mental health is health. The brain, like any other organ, can get sick, get tired, get
        injured — and, with the right care, can heal. Maybe you&apos;re here because something
        feels off in your own life. Maybe you&apos;re worried about a spouse, a child, a parent, a
        friend. Either way, you&apos;re in the right place.
      </p>
      <p>
        This page is a starting point, not a replacement for a real conversation with a real
        professional. What we&apos;ve tried to do is give you plain-language explanations of the
        most common conditions, a clear-eyed look at the medicines used to treat them, and honest
        information about the lifestyle changes — exercise, sleep, sunlight, stepping away from
        the phone — that make a real difference.
      </p>
      <h3>How to use this page</h3>
      <ul>
        <li><strong>Use the sidebar.</strong> Jump to whatever you need — you don&apos;t have to read in order.</li>
        <li><strong>Start with the condition</strong> that best fits what you or your loved one is experiencing.</li>
        <li><strong>Then explore treatments</strong> — both medical and natural. They work best together.</li>
        <li><strong>If things feel urgent,</strong> jump straight to <em>Crisis &amp; Immediate Help</em>.</li>
      </ul>
      <h3>A word of hope</h3>
      <p>
        Mental illness lies. It will tell you that this is forever, that no one understands, that
        you are alone, that it&apos;s your fault. None of that is true. People get better every
        day — with the right help, with patience, and with community. Healing is rarely a straight
        line, but it is a real road, and you don&apos;t have to walk it by yourself.
      </p>
      <blockquote>
        &ldquo;The Lord is close to the brokenhearted and saves those who are crushed in spirit.&rdquo;
        — <em>Psalm 34:18</em>
      </blockquote>
    </>
  );
}

function ConditionsIntro() {
  return (
    <>
      <h2>Understanding Conditions</h2>
      <p>
        The word &ldquo;mental illness&rdquo; covers a wide range of conditions, from short-term
        reactions to overwhelming life events to lifelong neurological differences. They are real,
        they are common, and they are treatable.
      </p>
      <p>
        We&apos;ve written up the six most commonly diagnosed conditions below. Use the sidebar to
        jump to any of them. For each, you&apos;ll find what it feels like from the inside, common
        symptoms, how it&apos;s typically treated, and a note of encouragement.
      </p>
      <div className="not-prose grid gap-3 sm:grid-cols-2 mt-6">
        {[
          ['grief', 'Grief & Loss', 'The natural response to losing someone you love. Not the same as depression.'],
          ['depression', 'Depression', 'Persistent low mood, loss of interest, exhaustion.'],
          ['anxiety', 'Anxiety Disorders', 'Ongoing worry, panic, tension that doesn\'t let up.'],
          ['ptsd', 'PTSD', 'A nervous system stuck in the aftermath of trauma.'],
          ['bipolar', 'Bipolar Disorder', 'Cycles between energized highs and depressive lows.'],
          ['ocd', 'OCD', 'Unwanted thoughts and rituals done to ease anxiety.'],
          ['adhd', 'ADHD', 'Attention and executive-function differences, lifelong.'],
        ].map(([id, title, desc]) => (
          <div key={id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Depression() {
  return (
    <>
      <h2>Depression</h2>
      <p>
        Depression is more than sadness. It&apos;s a persistent flattening of mood and energy that
        colors everything — food loses its taste, things you used to love feel pointless, mornings
        feel heavier than they should. It can be mild and quiet, or severe enough to make getting
        out of bed nearly impossible.
      </p>
      <h3>Common symptoms</h3>
      <ul>
        <li>Persistent sadness, emptiness, or numbness most of the day</li>
        <li>Loss of interest or pleasure in activities that used to matter</li>
        <li>Changes in sleep — sleeping too much or not enough</li>
        <li>Changes in appetite or weight</li>
        <li>Fatigue, slowed thinking, or a sense of moving through mud</li>
        <li>Feelings of worthlessness, excessive guilt, or self-blame</li>
        <li>Difficulty concentrating, making decisions, or remembering things</li>
        <li>Thoughts of death or suicide</li>
      </ul>
      <p>
        A diagnosis usually requires several of these, most of the day, nearly every day, for at
        least two weeks.
      </p>
      <h3>What causes it</h3>
      <p>
        Depression rarely has a single cause. It&apos;s usually a mix of genetics, brain chemistry,
        chronic stress, grief, trauma, medical conditions (like thyroid disease), hormonal shifts,
        and sometimes side effects of other medications. It is <em>not</em> a character flaw or
        lack of faith.
      </p>
      <h3>How it&apos;s typically treated</h3>
      <ul>
        <li>
          <strong>Therapy</strong> — especially Cognitive Behavioral Therapy (CBT) and Behavioral
          Activation — works well for mild to moderate depression, often on par with medication.
        </li>
        <li>
          <strong>Medication</strong> — usually an SSRI or SNRI as a first step. See{' '}
          <em>Medications Explained</em>.
        </li>
        <li>
          <strong>Lifestyle</strong> — regular exercise, sleep, sunlight, and connection with
          others have measurable antidepressant effects.
        </li>
        <li>
          <strong>For severe or treatment-resistant depression</strong> — options include TMS
          (transcranial magnetic stimulation), ketamine/esketamine, or ECT. These are well-studied
          and can be life-changing.
        </li>
      </ul>
      <div className="not-prose text-sm bg-red-50 border-l-4 border-red-400 p-4 rounded my-6">
        <strong>If you&apos;re having thoughts of suicide or self-harm</strong> — please reach out
        right now. Call or text 988 in the U.S. You are not a burden, and help is available.
      </div>
    </>
  );
}

function Anxiety() {
  return (
    <>
      <h2>Anxiety Disorders</h2>
      <p>
        Anxiety is the body&apos;s alarm system. In healthy amounts, it keeps you alert and alive.
        In an anxiety disorder, the alarm is stuck on — firing at the wrong times, at the wrong
        threat level, for too long. The body stays in fight-or-flight even when there&apos;s nothing
        to fight or flee.
      </p>
      <h3>Common forms</h3>
      <ul>
        <li><strong>Generalized Anxiety Disorder (GAD)</strong> — constant background worry about many things.</li>
        <li><strong>Panic Disorder</strong> — sudden, overwhelming surges of fear with physical symptoms (racing heart, tingling, chest pressure, feeling of doom).</li>
        <li><strong>Social Anxiety</strong> — intense fear of being judged or embarrassed in social or performance settings.</li>
        <li><strong>Specific Phobias</strong> — intense fear of a particular object or situation (heights, flying, needles).</li>
        <li><strong>Agoraphobia</strong> — fear of situations where escape would be difficult; often tied to panic.</li>
      </ul>
      <h3>Common symptoms</h3>
      <ul>
        <li>Racing thoughts, inability to &ldquo;turn the brain off&rdquo;</li>
        <li>Muscle tension, jaw clenching, headaches</li>
        <li>Restlessness or feeling on edge</li>
        <li>Sleep trouble — either falling asleep or staying asleep</li>
        <li>Nausea, stomach upset, IBS-like symptoms</li>
        <li>Avoiding situations because they feel too threatening</li>
      </ul>
      <h3>How it&apos;s typically treated</h3>
      <ul>
        <li>
          <strong>CBT and exposure therapy</strong> — the gold standard for most anxiety disorders.
          The research here is extremely strong.
        </li>
        <li>
          <strong>SSRIs/SNRIs</strong> — first-line medications. They build up over 4–6 weeks.
        </li>
        <li>
          <strong>Buspirone</strong> — a non-addictive option for GAD.
        </li>
        <li>
          <strong>Benzodiazepines</strong> — fast-acting but habit-forming; usually short-term only.
        </li>
        <li>
          <strong>Lifestyle</strong> — caffeine reduction, cardio exercise, breathwork, and sleep
          are all legitimately effective, not just &ldquo;extras.&rdquo;
        </li>
      </ul>
    </>
  );
}

function PTSD() {
  return (
    <>
      <h2>Post-Traumatic Stress Disorder (PTSD)</h2>
      <p>
        PTSD is what happens when the nervous system doesn&apos;t get the signal that the danger is
        over. After a traumatic event — combat, assault, abuse, a serious accident, the sudden loss
        of a loved one — the brain can stay locked in a state of high alert, as if the threat is
        still happening.
      </p>
      <p>
        Importantly, PTSD is not weakness. It&apos;s the price the body pays for surviving
        something it was never built to absorb.
      </p>
      <h3>Four symptom clusters</h3>
      <ol>
        <li>
          <strong>Re-experiencing</strong> — flashbacks, nightmares, intrusive memories that feel
          like the event is happening now.
        </li>
        <li>
          <strong>Avoidance</strong> — steering around people, places, or topics that trigger
          memories of the event.
        </li>
        <li>
          <strong>Negative changes in mood and thinking</strong> — persistent fear, shame, guilt,
          numbness, detachment from others, loss of interest.
        </li>
        <li>
          <strong>Hyperarousal</strong> — exaggerated startle response, irritability, difficulty
          sleeping, always scanning for danger.
        </li>
      </ol>
      <h3>How it&apos;s typically treated</h3>
      <ul>
        <li>
          <strong>Trauma-focused therapy</strong> is the front-line treatment. Methods with strong
          evidence include <em>Cognitive Processing Therapy (CPT)</em>,{' '}
          <em>Prolonged Exposure (PE)</em>, and <em>EMDR</em> (Eye Movement Desensitization and
          Reprocessing).
        </li>
        <li>
          <strong>SSRIs</strong> (especially sertraline and paroxetine) are FDA-approved for PTSD.
        </li>
        <li>
          <strong>Prazosin</strong> can reduce trauma-related nightmares.
        </li>
        <li>
          <strong>Emerging treatments</strong> — MDMA-assisted therapy and ketamine-assisted
          therapy are being actively studied; availability varies.
        </li>
      </ul>
      <p>
        For veterans, the VA offers specialized PTSD programs free of charge. The Veterans Crisis
        Line (988, press 1) is available 24/7.
      </p>
    </>
  );
}

function Bipolar() {
  return (
    <>
      <h2>Bipolar Disorder</h2>
      <p>
        Bipolar disorder involves cycles between two very different states: periods of elevated
        mood and energy (mania or hypomania) and periods of depression. The in-between can feel
        relatively stable, or it can feel mixed — depressed mood with restless energy, which is
        often the most dangerous state.
      </p>
      <h3>Two main types</h3>
      <ul>
        <li>
          <strong>Bipolar I</strong> — at least one full manic episode, usually lasting a week or
          more, severe enough to require hospitalization or cause serious impairment.
        </li>
        <li>
          <strong>Bipolar II</strong> — episodes of hypomania (less severe than mania) alternating
          with depressive episodes. The depressions tend to be longer and more frequent.
        </li>
      </ul>
      <h3>Signs of mania or hypomania</h3>
      <ul>
        <li>Dramatically less need for sleep — feeling rested after 2–3 hours</li>
        <li>Racing thoughts, rapid speech, jumping between ideas</li>
        <li>Impulsive decisions — big spending, risky sex, sudden trips</li>
        <li>Grandiosity, a sense of limitless capability</li>
        <li>In severe mania: psychosis, paranoia, or delusions</li>
      </ul>
      <h3>Signs of bipolar depression</h3>
      <p>
        Similar to unipolar depression, but with an important caveat: antidepressants used alone
        can trigger a switch into mania. This is why accurate diagnosis matters.
      </p>
      <h3>How it&apos;s typically treated</h3>
      <ul>
        <li>
          <strong>Mood stabilizers</strong> — lithium remains a gold standard, especially for
          reducing suicide risk. Valproate and lamotrigine are also widely used.
        </li>
        <li>
          <strong>Atypical antipsychotics</strong> — quetiapine, lurasidone, olanzapine, and others
          are often used for acute episodes and maintenance.
        </li>
        <li>
          <strong>Therapy</strong> — especially routine-based approaches (IPSRT) that stabilize
          sleep and daily rhythm.
        </li>
        <li>
          <strong>Sleep</strong> is medicine for bipolar. Sleep loss is a major trigger for mania.
        </li>
      </ul>
      <p>
        Bipolar is a lifelong condition, but with consistent treatment, most people live rich,
        stable lives. Compliance with medication is the biggest predictor of good outcomes.
      </p>
    </>
  );
}

function OCD() {
  return (
    <>
      <h2>Obsessive-Compulsive Disorder (OCD)</h2>
      <p>
        OCD is often reduced in popular language to &ldquo;being neat&rdquo; or &ldquo;being
        organized,&rdquo; but that isn&apos;t what OCD is. OCD is the experience of intrusive,
        unwanted thoughts (obsessions) that cause real distress, and the rituals (compulsions) a
        person performs to try to make the distress stop.
      </p>
      <h3>Obsessions can include</h3>
      <ul>
        <li>Fear of contamination, germs, or illness</li>
        <li>Fear of harming loved ones, even when the person would never do so</li>
        <li>Unwanted taboo thoughts — sexual, violent, or religious (&ldquo;scrupulosity&rdquo;)</li>
        <li>Need for symmetry, order, or things feeling &ldquo;just right&rdquo;</li>
        <li>Fear of having done something wrong</li>
      </ul>
      <h3>Compulsions can include</h3>
      <ul>
        <li>Washing, cleaning, or checking repeatedly</li>
        <li>Mental rituals — praying, counting, repeating phrases silently</li>
        <li>Seeking reassurance from others</li>
        <li>Avoiding triggers altogether</li>
      </ul>
      <p>
        The key feature of OCD is that the person <em>knows</em> the thoughts are irrational or
        excessive, but the anxiety they produce is real, and the compulsions bring only temporary
        relief before the cycle starts again.
      </p>
      <h3>How it&apos;s typically treated</h3>
      <ul>
        <li>
          <strong>Exposure and Response Prevention (ERP)</strong> is the most effective therapy for
          OCD — more effective than medication alone. It involves gradually facing the feared
          thought or situation without performing the compulsion.
        </li>
        <li>
          <strong>SSRIs</strong> at higher doses than typically used for depression. Common choices
          include fluoxetine, sertraline, and fluvoxamine.
        </li>
        <li>
          <strong>Clomipramine</strong> — a tricyclic that is particularly effective for OCD.
        </li>
        <li>
          For severe, treatment-resistant OCD, <strong>deep brain stimulation</strong> is an
          option at specialized centers.
        </li>
      </ul>
    </>
  );
}

function ADHD() {
  return (
    <>
      <h2>ADHD (Attention-Deficit / Hyperactivity Disorder)</h2>
      <p>
        ADHD is a lifelong neurodevelopmental condition, not a character problem or a lack of
        discipline. The ADHD brain has differences in dopamine and norepinephrine signaling that
        affect attention, motivation, and impulse control. Many adults are only diagnosed later in
        life — sometimes after their own child is diagnosed.
      </p>
      <h3>Three presentations</h3>
      <ul>
        <li>
          <strong>Predominantly Inattentive</strong> — difficulty sustaining attention, losing
          things, zoning out, struggling to start or finish tasks. Often missed, especially in
          girls and women.
        </li>
        <li>
          <strong>Predominantly Hyperactive-Impulsive</strong> — fidgeting, interrupting, acting
          before thinking, restlessness.
        </li>
        <li>
          <strong>Combined</strong> — features of both.
        </li>
      </ul>
      <h3>What it actually looks like in adults</h3>
      <ul>
        <li>Time blindness — chronically underestimating how long things take</li>
        <li>Rejection sensitivity — emotional reactions to perceived criticism</li>
        <li>Difficulty with initiation (the &ldquo;wall of awful&rdquo;)</li>
        <li>Hyperfocus — the ability to lock in on something interesting for hours while neglecting everything else</li>
        <li>Working memory issues — forgetting what you walked into a room for, losing track of conversations</li>
      </ul>
      <h3>How it&apos;s typically treated</h3>
      <ul>
        <li>
          <strong>Stimulant medication</strong> (methylphenidate- or amphetamine-based) is the most
          effective treatment — roughly 70–80% of people respond well.
        </li>
        <li>
          <strong>Non-stimulants</strong> — atomoxetine, guanfacine, or viloxazine — are options
          when stimulants aren&apos;t tolerated or appropriate.
        </li>
        <li>
          <strong>ADHD coaching and CBT</strong> — build skills for organization, planning, and
          emotional regulation.
        </li>
        <li>
          <strong>Structure</strong> — external systems (calendars, timers, body doubling, written
          routines) do the work that the ADHD brain struggles to do internally.
        </li>
      </ul>
    </>
  );
}

function Grief() {
  return (
    <>
      <h2>Grief &amp; Loss</h2>
      <p>
        Grief is the natural, necessary response to losing someone you love. It is not a disorder.
        It is not something to be fixed or medicated away. It is the price we pay for having loved
        deeply, and while it hurts in ways that can feel unbearable, grief itself is not a mental
        illness.
      </p>
      <p>
        <strong>This matters because grief is often misdiagnosed as depression.</strong> The symptoms
        can look similar on the surface — sadness, tears, trouble sleeping, loss of appetite, difficulty
        concentrating. But the underlying experience is different, and the treatments that help
        depression don&apos;t reliably help grief.
      </p>

      <h3>Grief vs. Depression: Key Differences</h3>
      <MedTable
        headers={['Grief', 'Depression']}
        rows={[
          ['Sadness comes in waves, often triggered by reminders of the person lost', 'Persistent low mood, most of the day, nearly every day'],
          ['Can still experience joy when something good happens — then feel guilty about it', 'Loss of ability to feel pleasure (anhedonia) that doesn\'t lift'],
          ['Self-esteem usually intact; guilt is about the relationship ("I wish I\'d said...")', 'Global sense of worthlessness; guilt about being a burden to everyone'],
          ['Thoughts are focused on the deceased; yearning for them', 'Thoughts focused on self; pervasive hopelessness'],
          ['Intensity tends to lessen over time, though it never fully disappears', 'Without treatment, symptoms stay constant or worsen'],
          ['Suicidal thoughts, if present, are usually about joining the deceased', 'Suicidal thoughts arise from hopelessness and self-loathing'],
        ]}
      />

      <h3>When Grief Becomes Complicated</h3>
      <p>
        Most people — even through devastating losses — will find their way forward without
        professional treatment. Grief will always be with them, but it will stop dominating
        every moment. This process takes longer than our culture acknowledges. One year is
        often a <em>beginning</em>, not an end.
      </p>
      <p>
        However, for roughly 7–10% of bereaved people, grief gets stuck. This is now recognized
        as <strong>Prolonged Grief Disorder</strong> (added to the DSM-5-TR in 2022). It&apos;s marked by:
      </p>
      <ul>
        <li>Intense yearning or longing for the deceased, daily, for more than a year</li>
        <li>Feeling like part of yourself died along with them</li>
        <li>Difficulty accepting that they&apos;re really gone</li>
        <li>Avoiding reminders — or seeking them compulsively</li>
        <li>Feeling that life has no meaning or purpose without them</li>
        <li>Difficulty moving forward — planning, trusting, engaging with life</li>
        <li>Significant impairment in daily functioning</li>
      </ul>
      <p>
        Prolonged grief is more common after sudden or traumatic deaths, after the death of a
        child, when the relationship was particularly close or conflicted, and when social
        support is lacking.
      </p>

      <h3>Who Is Most at Risk</h3>
      <p>
        Certain losses carry higher risk of prolonged or complicated grief:
      </p>
      <ul>
        <li><strong>Parents who lose a child</strong> — the research consistently shows this is the hardest loss to bear</li>
        <li><strong>Sudden, violent, or traumatic deaths</strong> — accident, suicide, homicide, overdose</li>
        <li><strong>Deaths involving stigma</strong> — where the bereaved feel unable to grieve openly</li>
        <li><strong>Multiple losses in a short period</strong></li>
        <li><strong>Loss of a primary relationship</strong> — spouse, only child, closest friend</li>
        <li><strong>Limited social support</strong></li>
      </ul>

      <h3>What Actually Helps</h3>
      <p>
        The most important message: <strong>you don&apos;t have to &ldquo;fix&rdquo; your grief.</strong>
        You need to live with it, integrate it, and let it change over time. That said, there are
        things that genuinely help:
      </p>
      <ul>
        <li>
          <strong>Social support</strong> — people who let you talk about the person you lost without
          trying to fix you or rush you
        </li>
        <li>
          <strong>Grief-specific support groups</strong> — being with others who understand,
          especially those who&apos;ve had similar losses (e.g., bereaved parents, suicide loss survivors)
        </li>
        <li>
          <strong>Grief rituals</strong> — memorials, anniversaries, visiting places that mattered,
          keeping meaningful objects
        </li>
        <li>
          <strong>Time</strong> — not &ldquo;time heals all wounds,&rdquo; but time does allow
          integration. The acute phase lessens over months to years.
        </li>
        <li>
          <strong>Physical care</strong> — sleep, movement, nutrition. Grief is exhausting; the
          body needs extra care.
        </li>
        <li>
          <strong>Complicated Grief Treatment (CGT)</strong> — if grief is stuck, this is a specific
          therapy developed for prolonged grief, with strong research evidence. It&apos;s different
          from standard depression therapy.
        </li>
      </ul>

      <div className="not-prose bg-amber-50 border-l-4 border-amber-400 p-4 rounded my-6">
        <strong>For bereaved parents:</strong> The loss of a child is unlike any other loss. The
        grief is often more intense, more prolonged, and less understood by those around you.
        <strong> The Compassionate Friends</strong> is an organization specifically for parents
        (and siblings and grandparents) who have lost a child. You are not alone in this.
      </div>

      <h3>What About Medication?</h3>
      <p>
        Here&apos;s what the research shows, and what many bereaved people learn the hard way:
        <strong> antidepressants don&apos;t reliably help grief.</strong> This isn&apos;t because
        grief is &ldquo;less real&rdquo; — it&apos;s because grief operates differently in the brain
        than depression does.
      </p>
      <p>
        If a doctor prescribes an SSRI shortly after a loss, ask why. Is there true major depression
        <em> in addition to</em> grief? Is there a history of depression that makes the current
        episode more concerning? Or is this reflexive — prescribing because there&apos;s distress
        and the doctor wants to do <em>something</em>?
      </p>
      <p>
        See <a href="#grief-treatment">After Loss: What Helps?</a> in our medications section for
        more on this.
      </p>

      <h3>Finding Help</h3>
      <ul>
        <li><strong>The Compassionate Friends</strong> — for bereaved parents, siblings, grandparents</li>
        <li><strong>GriefShare</strong> — faith-based grief support groups meeting in churches nationwide</li>
        <li><strong>What&apos;s Your Grief</strong> — online grief education and courses</li>
        <li><strong>The Dinner Party</strong> — community for grieving 20-40 somethings</li>
        <li><strong>Therapists trained in Complicated Grief Treatment (CGT)</strong> — ask specifically about this credential</li>
      </ul>

      <blockquote>
        &ldquo;Grief is not a problem to be solved. It is an experience to be carried.&rdquo;
      </blockquote>
    </>
  );
}

/* ── Medications ──────────────────────────────────────────────────────────── */

function MedicationsIntro() {
  return (
    <>
      <h2>Medications Explained</h2>
      <p>
        Psychiatric medication is one of the most misunderstood topics in healthcare. The goal of
        this section is to give you the real, non-scary picture: what each class of medicine does,
        common examples, what it&apos;s used for, and the side effects people actually report.
      </p>
      <div className="not-prose bg-teal-50 border-l-4 border-teal-500 p-4 rounded my-6">
        <strong>A note on &ldquo;safety scores.&rdquo;</strong> You won&apos;t find us ranking
        medicines with a number. Safety depends on <em>you</em> — your other conditions, your other
        medications, your age, pregnancy status, family history, and what you&apos;re trying to
        treat. Instead, we give you honest information about what each class does well, what to
        watch for, and what to discuss with your doctor.
      </div>
      <h3>Big principles to hold on to</h3>
      <ul>
        <li>
          <strong>Most antidepressants take 4–6 weeks</strong> to show full effect. Feeling nothing
          after a week is not failure.
        </li>
        <li>
          <strong>Starting and stopping matters.</strong> Many psychiatric meds should be tapered,
          not stopped cold turkey. Always work with a prescriber.
        </li>
        <li>
          <strong>Finding the right medication can take tries.</strong> The first one doesn&apos;t
          work for about 1 in 3 people. This is normal, not a sign you&apos;re &ldquo;broken.&rdquo;
        </li>
        <li>
          <strong>Medicine works best alongside therapy and lifestyle changes</strong>, not instead
          of them.
        </li>
        <li>
          <strong>Never combine psychiatric meds with alcohol, street drugs, or St. John&apos;s
          Wort</strong> without telling your prescriber.
        </li>
      </ul>
    </>
  );
}

function GriefTreatment() {
  return (
    <>
      <h2>After Loss: What Helps?</h2>
      <p>
        This section exists because of a pattern we see repeatedly: someone loses a loved one,
        visits their doctor, and leaves with a prescription for an antidepressant. The doctor
        means well. The patient is suffering. Medication feels like doing <em>something</em>.
      </p>
      <p>
        But here&apos;s what the research shows: <strong>antidepressants do not reliably help
        grief.</strong> Not because grief isn&apos;t painful — it is, unbearably so — but because
        grief is a different process than depression, and it responds to different things.
      </p>

      <div className="not-prose bg-amber-50 border-l-4 border-amber-400 p-4 rounded my-6">
        <strong>Important:</strong> This section is about grief — the natural response to loss.
        Some people experience true major depression <em>in addition to</em> grief, and that
        depression may warrant medication. The question is: are you being treated for depression
        that exists, or for grief that&apos;s been mislabeled as depression?
      </div>

      <h3>What Doctors Commonly Prescribe After a Loss</h3>
      <p>
        Here&apos;s a list of what bereaved people are often given, what the evidence actually says,
        and what to consider:
      </p>

      <MedTable
        headers={['Medication', 'What doctors hope it does', 'What the evidence says']}
        rows={[
          ['SSRIs (Zoloft, Lexapro, etc.)', 'Lift mood, reduce distress', 'May help if true major depression is present. Does NOT speed grief recovery or reduce yearning. May blunt emotions in ways that interfere with grief processing.'],
          ['Benzodiazepines (Xanax, Ativan)', 'Reduce acute anxiety, help with sleep', 'Can provide short-term relief but carry dependence risk. May delay grief processing by numbing emotions. Generally not recommended beyond a few weeks.'],
          ['Sleep aids (Ambien, trazodone)', 'Help with insomnia', 'Sleep is genuinely disrupted in grief. Short-term use may be reasonable. Long-term use has downsides.'],
          ['Antipsychotics (Seroquel low-dose)', 'Help with sleep, reduce agitation', 'Sometimes prescribed off-label. Significant side effect burden for a problem (grief) that doesn\'t require them.'],
        ]}
      />

      <h3>The Problem with Medicating Grief</h3>
      <ol>
        <li>
          <strong>Grief is not a chemical imbalance.</strong> Depression involves dysregulation
          of neurotransmitter systems. Grief is a psychological response to loss — the brain is
          functioning as designed, processing a catastrophic event. Medications that target
          neurotransmitter levels don&apos;t address the actual problem.
        </li>
        <li>
          <strong>Numbing emotions can delay healing.</strong> The painful emotions of grief —
          yearning, anger, guilt, sadness — are part of the processing. Blunting them doesn&apos;t
          make the grief go away; it may just postpone it.
        </li>
        <li>
          <strong>There&apos;s no shortcut.</strong> Research on antidepressants in bereavement
          shows they may reduce some symptoms of depression if present, but they don&apos;t
          speed up grief recovery or reduce the core experience of loss.
        </li>
        <li>
          <strong>Side effects add burden.</strong> SSRIs have real side effects — sexual
          dysfunction, emotional blunting, weight changes, discontinuation syndrome. Adding
          these to someone already struggling with loss can make things harder, not easier.
        </li>
      </ol>

      <h3>When Medication Might Actually Help</h3>
      <p>
        There are legitimate reasons to consider medication after a loss:
      </p>
      <ul>
        <li>
          <strong>Pre-existing depression or anxiety</strong> that has worsened or relapsed
          after the loss
        </li>
        <li>
          <strong>True major depressive episode</strong> that has developed in addition to
          grief — persistent hopelessness, suicidal ideation, complete inability to function
        </li>
        <li>
          <strong>Severe insomnia</strong> after weeks of poor sleep that&apos;s impairing
          functioning (short-term sleep aids may be reasonable)
        </li>
        <li>
          <strong>PTSD symptoms</strong> if the death was traumatic (different treatment
          approach)
        </li>
        <li>
          <strong>Panic disorder</strong> that has emerged or worsened (may respond to SSRIs)
        </li>
      </ul>

      <h3>What Actually Helps Grief</h3>
      <p>
        The research is clearer on what <em>does</em> help:
      </p>
      <ul>
        <li>
          <strong>Time.</strong> Grief naturally integrates over months to years. The acute
          intensity does lessen, though the loss never disappears.
        </li>
        <li>
          <strong>Social support.</strong> Being with people who can tolerate your pain, who
          don&apos;t try to fix you or rush you, who let you talk about the person you lost.
        </li>
        <li>
          <strong>Grief-specific support groups.</strong> Especially groups for similar losses
          (bereaved parents, suicide loss survivors, etc.). The research on these is positive.
        </li>
        <li>
          <strong>Complicated Grief Treatment (CGT)</strong> — if grief is stuck after 6–12
          months, this specific therapy protocol has strong research evidence. It&apos;s
          <em>different</em> from standard CBT or antidepressant treatment.
        </li>
        <li>
          <strong>Physical care.</strong> Sleep, movement, eating. Grief is exhausting; the
          body needs extra support.
        </li>
        <li>
          <strong>Ritual and meaning-making.</strong> Funerals, memorials, anniversaries,
          visiting graves, keeping objects, telling stories about the deceased.
        </li>
      </ul>

      <h3>Questions to Ask Your Doctor</h3>
      <p>
        If a doctor prescribes medication after a loss, consider asking:
      </p>
      <ul>
        <li>
          &ldquo;Are you treating depression specifically, or grief in general? What&apos;s the
          difference in how you see them?&rdquo;
        </li>
        <li>
          &ldquo;What&apos;s the evidence that this medication helps with grief?&rdquo;
        </li>
        <li>
          &ldquo;What&apos;s the plan for how long I&apos;d be on this?&rdquo;
        </li>
        <li>
          &ldquo;What non-medication options might help? Are there grief-specific therapies or
          support groups you&apos;d recommend?&rdquo;
        </li>
        <li>
          &ldquo;If I do have depression in addition to grief, would therapy be effective, or
          do I specifically need medication?&rdquo;
        </li>
      </ul>

      <h3>Grief After Losing a Child</h3>
      <p>
        The loss of a child is widely recognized as the most devastating loss a person can
        experience. Research shows bereaved parents have higher rates of:
      </p>
      <ul>
        <li>Prolonged grief disorder</li>
        <li>Major depression</li>
        <li>PTSD (especially after sudden or traumatic deaths)</li>
        <li>Physical health problems</li>
        <li>Relationship strain</li>
      </ul>
      <p>
        Even so, medication is not automatically the answer. What bereaved parents consistently
        report as most helpful:
      </p>
      <ul>
        <li>
          <strong>Connection with other bereaved parents.</strong> The Compassionate Friends,
          online communities, local support groups.
        </li>
        <li>
          <strong>Having the child&apos;s life acknowledged.</strong> People saying their name,
          asking about them, remembering anniversaries.
        </li>
        <li>
          <strong>Time — often measured in years.</strong> The first two years are often the
          hardest. Integration is slow.
        </li>
        <li>
          <strong>Finding meaning</strong> — through memorial work, advocacy, helping others —
          when and if it feels right.
        </li>
      </ul>

      <div className="not-prose bg-teal-50 border-l-4 border-teal-500 p-4 rounded my-6">
        <strong>The Faith Marie Foundation exists because of this.</strong> Our founder&apos;s
        daughter Faith Marie was lost to SIDS. In the aftermath, like many bereaved parents, she
        was given medications that didn&apos;t help — because she wasn&apos;t depressed. She was
        grieving. The distinction matters.
      </div>

      <h3>Further Reading</h3>
      <ul>
        <li><a href="#grief">Grief &amp; Loss</a> — understanding grief as distinct from depression</li>
        <li><a href="#ssris">SSRIs</a> — what they actually do and don&apos;t do</li>
        <li><a href="#therapy-types">Types of Therapy</a> — including grief-specific approaches</li>
      </ul>
    </>
  );
}

function SSRIs() {
  return (
    <>
      <h2>SSRIs — Selective Serotonin Reuptake Inhibitors</h2>
      <p>
        SSRIs are the most commonly prescribed class of antidepressants worldwide. They work by
        keeping more serotonin — a neurotransmitter involved in mood, sleep, and anxiety — available
        in the spaces between brain cells. They don&apos;t create emotions out of nothing; they
        help the emotional regulation system work more smoothly.
      </p>
      <h3>What they&apos;re used for</h3>
      <ul>
        <li>Depression</li>
        <li>Generalized anxiety, social anxiety, panic disorder</li>
        <li>OCD (often at higher doses)</li>
        <li>PTSD</li>
        <li>Premenstrual dysphoric disorder (PMDD)</li>
      </ul>
      <h3>Common SSRIs</h3>
      <MedTable
        rows={[
          ['Fluoxetine', 'Prozac', 'Long half-life, gentler to stop. Often used in teens.'],
          ['Sertraline', 'Zoloft', 'Well-studied in pregnancy; first-line for PTSD.'],
          ['Escitalopram', 'Lexapro', 'Among the best-tolerated; minimal drug interactions.'],
          ['Citalopram', 'Celexa', 'Similar to escitalopram; has a dose ceiling for heart rhythm reasons.'],
          ['Paroxetine', 'Paxil', 'Effective but more weight gain and harder to taper.'],
          ['Fluvoxamine', 'Luvox', 'More often used for OCD than depression.'],
        ]}
      />
      <h3>What to expect</h3>
      <ul>
        <li><strong>Onset:</strong> Anxiety can lift in 2–4 weeks; depression often takes 4–6.</li>
        <li><strong>First 1–2 weeks</strong> can feel worse — more jittery, more anxious. This usually passes.</li>
        <li><strong>Common side effects:</strong> nausea, headache, sleep changes, sexual side effects (reduced libido, delayed orgasm), mild weight changes.</li>
        <li><strong>Less common but important:</strong> increased suicidal thoughts in under-25s (monitor closely), GI bleeding risk when combined with NSAIDs, low sodium in older adults.</li>
        <li><strong>Stopping:</strong> Tapering matters. Abrupt stops can cause &ldquo;discontinuation syndrome&rdquo; — dizziness, electric-zap sensations, flu-like symptoms. Not dangerous, but miserable.</li>
      </ul>
      <h3>Talk to your doctor if…</h3>
      <ul>
        <li>You&apos;re pregnant or thinking about it</li>
        <li>You take blood thinners, NSAIDs daily, or tramadol</li>
        <li>You&apos;ve had bipolar disorder or mania in the past</li>
        <li>Any new thoughts of self-harm show up after starting</li>
      </ul>
    </>
  );
}

function SNRIs() {
  return (
    <>
      <h2>SNRIs — Serotonin-Norepinephrine Reuptake Inhibitors</h2>
      <p>
        SNRIs act on both serotonin and norepinephrine. The norepinephrine piece adds a boost to
        energy and focus, and also makes SNRIs particularly useful for chronic pain conditions.
      </p>
      <h3>What they&apos;re used for</h3>
      <ul>
        <li>Depression</li>
        <li>Generalized anxiety</li>
        <li>Nerve pain (diabetic neuropathy, fibromyalgia)</li>
        <li>Chronic musculoskeletal pain</li>
      </ul>
      <h3>Common SNRIs</h3>
      <MedTable
        rows={[
          ['Venlafaxine', 'Effexor XR', 'Works at higher doses for norepinephrine effect. Discontinuation is notoriously difficult — taper slowly.'],
          ['Duloxetine', 'Cymbalta', 'Often chosen for depression plus chronic pain.'],
          ['Desvenlafaxine', 'Pristiq', 'An active metabolite of venlafaxine; fewer drug interactions.'],
          ['Levomilnacipran', 'Fetzima', 'Newer; stronger norepinephrine effect than most.'],
        ]}
      />
      <h3>What to expect</h3>
      <ul>
        <li><strong>Common side effects:</strong> nausea (especially first week), dry mouth, sweating, mild blood pressure elevation, sexual side effects.</li>
        <li><strong>Important:</strong> blood pressure should be monitored, especially with venlafaxine.</li>
        <li><strong>Stopping:</strong> Venlafaxine in particular needs careful tapering. Many people describe discontinuation as worse than SSRIs.</li>
      </ul>
    </>
  );
}

function AtypicalAntidep() {
  return (
    <>
      <h2>Atypical Antidepressants</h2>
      <p>
        These don&apos;t fit neatly into SSRI or SNRI categories. Each has its own mechanism, and
        that&apos;s often why they&apos;re chosen — for specific side-effect profiles or to target
        particular symptoms.
      </p>
      <MedTable
        rows={[
          ['Bupropion', 'Wellbutrin', 'Works on dopamine and norepinephrine. No sexual side effects. Can boost energy and help with smoking cessation. Not great for anxiety — can feel activating.'],
          ['Mirtazapine', 'Remeron', 'Helps with sleep and appetite. Often chosen for older adults or people who have lost weight and can\'t sleep.'],
          ['Trazodone', 'Desyrel', 'Rarely used for depression anymore — usually prescribed in low doses as a non-addictive sleep aid.'],
          ['Vilazodone', 'Viibryd', 'SSRI-like but with partial serotonin receptor activity. Fewer sexual side effects.'],
          ['Vortioxetine', 'Trintellix', 'Thought to help with cognitive symptoms of depression (focus, memory).'],
          ['Esketamine', 'Spravato', 'A nasal spray for treatment-resistant depression. Given under medical supervision.'],
        ]}
      />
      <h3>Why a doctor might choose an atypical</h3>
      <ul>
        <li>SSRI/SNRI didn&apos;t work or wasn&apos;t tolerated</li>
        <li>Sexual side effects are a dealbreaker → bupropion</li>
        <li>Sleep and appetite are major problems → mirtazapine</li>
        <li>Need something fast-acting → esketamine (in specialist care)</li>
      </ul>
    </>
  );
}

function TricyclicsMAOIs() {
  return (
    <>
      <h2>Tricyclics &amp; MAOIs — The Older Classes</h2>
      <p>
        These are the original antidepressants, developed in the 1950s and 60s. They still work —
        often very well — but have more side effects and more dietary or drug restrictions, so
        they&apos;re usually used when newer options haven&apos;t helped.
      </p>
      <h3>Tricyclic antidepressants (TCAs)</h3>
      <MedTable
        rows={[
          ['Amitriptyline', 'Elavil', 'Effective for depression, chronic pain, migraine prevention, insomnia.'],
          ['Nortriptyline', 'Pamelor', 'Often better tolerated than amitriptyline.'],
          ['Clomipramine', 'Anafranil', 'Specifically effective for OCD.'],
          ['Imipramine', 'Tofranil', 'Also used for panic disorder and childhood bedwetting.'],
        ]}
      />
      <p>
        <strong>What to know:</strong> TCAs can cause dry mouth, constipation, weight gain,
        dizziness on standing, and heart-rhythm effects. They are dangerous in overdose, so they&apos;re
        used cautiously in people at risk of suicide.
      </p>
      <h3>MAOIs — Monoamine Oxidase Inhibitors</h3>
      <MedTable
        rows={[
          ['Phenelzine', 'Nardil', 'Effective for atypical depression and social anxiety.'],
          ['Tranylcypromine', 'Parnate', 'Similar to phenelzine; more activating.'],
          ['Selegiline patch', 'Emsam', 'Lower doses avoid the dietary restrictions of oral MAOIs.'],
        ]}
      />
      <p>
        <strong>Important:</strong> Oral MAOIs require a low-tyramine diet (no aged cheeses,
        cured meats, fermented foods, some wines) to avoid dangerous blood pressure spikes. They
        can also interact severely with many other medications, including common cold remedies.
        That&apos;s the main reason they&apos;re used less often — but for the right person, they can
        be remarkably effective.
      </p>
    </>
  );
}

function MoodStabilizers() {
  return (
    <>
      <h2>Mood Stabilizers</h2>
      <p>
        Mood stabilizers are the backbone of bipolar disorder treatment and are also used for
        other mood-instability conditions. Their job is to flatten the peaks and fill in the
        valleys — preventing both manic highs and depressive lows.
      </p>
      <MedTable
        rows={[
          ['Lithium', 'Lithobid', 'The original and still one of the best. Reduces suicide risk more than any other psychiatric medicine. Needs regular blood tests to monitor kidney and thyroid function.'],
          ['Valproate / Divalproex', 'Depakote', 'Effective for mania, often chosen for rapid cycling. Not safe in pregnancy — causes birth defects.'],
          ['Lamotrigine', 'Lamictal', 'Particularly good at preventing bipolar depression. Slow start-up required to avoid a rare but serious rash.'],
          ['Carbamazepine', 'Tegretol', 'Older option; still useful, especially for mixed episodes.'],
        ]}
      />
      <h3>What to know</h3>
      <ul>
        <li>
          <strong>Lithium</strong> has a narrow therapeutic window — too little doesn&apos;t work,
          too much is toxic. Blood levels are checked regularly. Dehydration raises the level, so
          stay hydrated.
        </li>
        <li>
          <strong>Lamotrigine</strong> requires very slow titration. A fast increase can trigger
          Stevens-Johnson syndrome — a rare, serious skin reaction. Any new rash after starting
          lamotrigine is a call-your-doctor-today situation.
        </li>
        <li>
          <strong>Valproate and carbamazepine</strong> are teratogenic (cause birth defects). If
          there&apos;s any chance of pregnancy, discuss alternatives.
        </li>
      </ul>
    </>
  );
}

function Antipsychotics() {
  return (
    <>
      <h2>Antipsychotics</h2>
      <p>
        Despite the name, antipsychotics are used for far more than psychosis. In modern
        psychiatry, the newer (&ldquo;atypical&rdquo;) antipsychotics are workhorses for bipolar
        disorder, treatment-resistant depression, severe anxiety, and, of course, schizophrenia
        and other psychotic disorders.
      </p>
      <h3>Atypical (second-generation) antipsychotics</h3>
      <MedTable
        rows={[
          ['Aripiprazole', 'Abilify', 'Often used as an add-on for depression. Generally fewer metabolic side effects. Can cause restlessness (akathisia).'],
          ['Quetiapine', 'Seroquel', 'Used for bipolar, depression, sleep. Sedating, especially at low doses.'],
          ['Olanzapine', 'Zyprexa', 'Very effective but high risk of weight gain and metabolic changes.'],
          ['Risperidone', 'Risperdal', 'Widely used across conditions; can raise prolactin.'],
          ['Lurasidone', 'Latuda', 'Often chosen for bipolar depression. Must be taken with food.'],
          ['Ziprasidone', 'Geodon', 'Less weight gain. Must be taken with food. Monitor heart rhythm.'],
          ['Cariprazine', 'Vraylar', 'Used for bipolar and as antidepressant add-on.'],
        ]}
      />
      <h3>What to watch for</h3>
      <ul>
        <li>
          <strong>Metabolic effects</strong> — weight gain, elevated blood sugar, raised
          cholesterol. Some (olanzapine, quetiapine) more than others. Your prescriber should
          monitor these.
        </li>
        <li>
          <strong>Movement effects</strong> — restlessness (akathisia), tremor, stiffness. Report
          these early; they&apos;re treatable.
        </li>
        <li>
          <strong>Tardive dyskinesia</strong> — involuntary movements that can be long-lasting.
          Risk is lower with atypicals than the older first-generation antipsychotics, but not
          zero.
        </li>
        <li>
          <strong>Sedation</strong> — especially with quetiapine, olanzapine.
        </li>
      </ul>
      <p>
        Older (first-generation) antipsychotics — haloperidol, chlorpromazine, fluphenazine —
        still have a place, especially in acute psychosis or as long-acting injections. They carry
        a higher risk of movement side effects than the newer agents.
      </p>
    </>
  );
}

function Benzos() {
  return (
    <>
      <h2>Benzodiazepines</h2>
      <p>
        Benzodiazepines (&ldquo;benzos&rdquo;) are fast-acting anxiety and panic medications. They
        work within minutes to hours — which is both their strength and their problem. They&apos;re
        highly effective for acute anxiety, panic attacks, alcohol withdrawal, and seizures, but
        they are habit-forming and can be dangerous when combined with opioids or alcohol.
      </p>
      <MedTable
        rows={[
          ['Alprazolam', 'Xanax', 'Fast onset, short duration. The one with the highest abuse potential.'],
          ['Lorazepam', 'Ativan', 'Moderate onset and duration. Often used in hospitals.'],
          ['Clonazepam', 'Klonopin', 'Longer-acting; sometimes used for ongoing anxiety or seizure disorders.'],
          ['Diazepam', 'Valium', 'Long-acting. Used for muscle spasms, alcohol withdrawal.'],
          ['Temazepam', 'Restoril', 'Primarily for insomnia.'],
        ]}
      />
      <h3>The honest picture</h3>
      <ul>
        <li>
          <strong>They work.</strong> For true panic attacks, a benzo can stop the attack in its
          tracks.
        </li>
        <li>
          <strong>They are addictive.</strong> Physical dependence can develop in a few weeks of
          daily use. Stopping abruptly after chronic use can cause seizures — tapering must be
          medically supervised.
        </li>
        <li>
          <strong>Combining with opioids or alcohol can be lethal</strong> — both suppress
          breathing.
        </li>
        <li>
          <strong>In older adults</strong>, they increase fall risk and can cause confusion.
        </li>
        <li>
          <strong>Most responsible use</strong> is short-term or as-needed — for example, during a
          crisis, for flying phobia, or the first few weeks on an SSRI while it kicks in.
        </li>
      </ul>
      <p>
        If you&apos;ve been on a benzo for a while and want to stop, please work with your doctor on
        a slow taper. This is not a medication to white-knuckle off of.
      </p>
    </>
  );
}

function Stimulants() {
  return (
    <>
      <h2>Stimulants (for ADHD)</h2>
      <p>
        Stimulants are the most effective class of medications in all of psychiatry — about 70–80%
        of people with ADHD respond well to them. For most patients, they don&apos;t feel like a
        &ldquo;high.&rdquo; They feel like a quiet brain, a working filter, and the ability to start
        things without dread.
      </p>
      <h3>Two families</h3>
      <MedTable
        rows={[
          ['Methylphenidate', 'Ritalin, Concerta, Focalin', 'First developed in the 1950s. Typically the first try in children.'],
          ['Amphetamine-based', 'Adderall, Vyvanse, Dexedrine', 'Slightly stronger dopamine effect. Vyvanse is a pro-drug — smoother on/off curve, less abuse potential.'],
        ]}
      />
      <p>
        Both families come in short-acting (3–4 hours) and long-acting (8–14 hours) forms. Many
        people do best with a long-acting in the morning and a short-acting &ldquo;booster&rdquo; in
        the afternoon.
      </p>
      <h3>What to expect</h3>
      <ul>
        <li><strong>Common side effects:</strong> decreased appetite, dry mouth, trouble falling asleep if dosed late, slight increase in heart rate and blood pressure, feeling emotionally &ldquo;flat&rdquo; at too-high doses.</li>
        <li><strong>Cardiac screening</strong> is standard before starting, especially with any family history of heart problems.</li>
        <li><strong>Abuse potential</strong> exists but is much lower when taken as prescribed, especially with long-acting forms.</li>
        <li><strong>They are controlled substances</strong> — prescriptions typically can&apos;t be refilled by phone and may have monthly limits.</li>
      </ul>
      <h3>Non-stimulant options</h3>
      <ul>
        <li><strong>Atomoxetine (Strattera)</strong> — a non-addictive option; takes 4–6 weeks to work.</li>
        <li><strong>Guanfacine (Intuniv) / Clonidine</strong> — helpful for hyperactivity and sleep, often added to stimulants.</li>
        <li><strong>Viloxazine (Qelbree)</strong> — newer non-stimulant.</li>
      </ul>
    </>
  );
}

function MedSafety() {
  return (
    <>
      <h2>How to Read Safety Information</h2>
      <p>
        Instead of a one-number safety score, here&apos;s what to actually look at when you&apos;re
        considering a medication with your doctor. These are the things that matter.
      </p>
      <h3>1. The indication</h3>
      <p>
        Is this medication FDA-approved for what you have? Off-label prescribing is legitimate and
        common, but know which bucket you&apos;re in.
      </p>
      <h3>2. Common side effects</h3>
      <p>
        The ones affecting more than ~10% of users. These are the ones you&apos;re most likely to
        experience. Most are mild and fade after the first few weeks.
      </p>
      <h3>3. Serious but rare side effects</h3>
      <p>
        The ones you need to recognize immediately. For example: any new rash on lamotrigine; severe
        abdominal pain on valproate; unexplained fever on antipsychotics.
      </p>
      <h3>4. Drug interactions</h3>
      <p>
        Bring a complete list of <em>everything</em> you take — prescription, over-the-counter,
        supplements, and recreational substances — to your prescriber. Especially important: SSRIs
        with tramadol, triptans (migraine meds), or St. John&apos;s Wort → serotonin syndrome risk.
      </p>
      <h3>5. Pregnancy and breastfeeding</h3>
      <p>
        Many psychiatric medications are compatible with pregnancy and breastfeeding, some aren&apos;t.
        This is a real conversation with an OB/GYN and psychiatrist — untreated mental illness also
        has effects on pregnancy.
      </p>
      <h3>6. Black box warnings</h3>
      <p>
        The FDA&apos;s most serious warning. Knowing these exist isn&apos;t a reason to avoid the
        medicine — it&apos;s a reason to have an informed conversation. Examples: increased
        suicidal thoughts in under-25s on antidepressants; metabolic risks with antipsychotics;
        dependence with benzos.
      </p>
      <h3>7. How to stop</h3>
      <p>
        Ask this on day one. Some medicines require slow tapers; others can be stopped cold. Knowing
        the exit plan before you start is a sign of a good prescriber.
      </p>
      <div className="not-prose bg-teal-50 border-l-4 border-teal-500 p-4 rounded my-6">
        <strong>A good question to ask your prescriber:</strong> &ldquo;What would tell us this
        isn&apos;t working, and when would we decide to switch?&rdquo;
      </div>
    </>
  );
}

/* ── Natural approaches ───────────────────────────────────────────────────── */

function NaturalIntro() {
  return (
    <>
      <h2>Natural Approaches</h2>
      <p>
        The word &ldquo;natural&rdquo; has been so overused in wellness marketing that it&apos;s
        lost meaning. What we mean here is: non-pharmaceutical approaches with real evidence behind
        them. These aren&apos;t alternatives to treatment — they&apos;re core parts of it. Even in
        the best studies, people who combine medication with lifestyle change do better than people
        who use either alone.
      </p>
      <p>
        Use the sidebar to explore each one in depth.
      </p>
      <div className="not-prose grid gap-3 sm:grid-cols-2 mt-6">
        {[
          ['exercise', 'Exercise', 'The single most studied non-drug intervention.'],
          ['sleep', 'Sleep', 'Non-negotiable. No drug works well without it.'],
          ['nutrition', 'Nutrition', 'What you eat shapes inflammation, mood, and energy.'],
          ['sunlight', 'Sunlight & nature', 'Daylight resets your circadian rhythm.'],
          ['digital-detox', 'Screen breaks', 'Attention is a finite resource. Phones are engineered to drain it.'],
          ['connection', 'Connection', 'Loneliness is measurable, and measurably harmful.'],
          ['faith', 'Prayer & contemplation', 'Practices of stillness, gratitude, and surrender.'],
          ['therapy-types', 'Types of therapy', 'Knowing which therapy matches your condition.'],
        ].map(([id, title, desc]) => (
          <div key={id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Exercise() {
  return (
    <>
      <h2>Exercise &amp; Movement</h2>
      <p>
        Exercise is the most studied non-pharmaceutical treatment for depression and anxiety, and
        the results are consistent: moderate aerobic exercise, done regularly, reduces symptoms
        meaningfully — sometimes as much as an SSRI for mild to moderate depression.
      </p>
      <h3>Why it works</h3>
      <ul>
        <li>Increases BDNF, a protein that helps brain cells grow and repair</li>
        <li>Raises endorphins, serotonin, norepinephrine, and dopamine</li>
        <li>Reduces stress hormones (cortisol)</li>
        <li>Lowers inflammation, which is increasingly linked to depression</li>
        <li>Improves sleep, which improves everything</li>
        <li>Gives you evidence, every day, that you can do hard things</li>
      </ul>
      <h3>The research-backed minimum</h3>
      <ul>
        <li><strong>150 minutes per week</strong> of moderate aerobic activity (brisk walking, biking, swimming)</li>
        <li><strong>OR 75 minutes per week</strong> of vigorous activity</li>
        <li><strong>Plus 2 sessions</strong> of strength training</li>
      </ul>
      <h3>How to actually start</h3>
      <ul>
        <li><strong>Ten minutes counts.</strong> A ten-minute walk is infinitely more than no walk.</li>
        <li><strong>Outside beats inside</strong> when possible — you get sunlight and nature too.</li>
        <li><strong>Same time every day</strong> turns it into a habit faster than &ldquo;when I feel like it.&rdquo;</li>
        <li><strong>Start absurdly small.</strong> Depression shrinks your capacity. Plan for 20% of what you think you should do.</li>
        <li><strong>Don&apos;t let perfect be the enemy of done.</strong> A missed day is information, not failure.</li>
      </ul>
    </>
  );
}

function Sleep() {
  return (
    <>
      <h2>Sleep</h2>
      <p>
        Sleep isn&apos;t a luxury and it isn&apos;t earned. It is the single most underrated
        mental health intervention. Poor sleep worsens every mental health condition — and in
        bipolar disorder, lost sleep can directly trigger mania. Almost no medication works well
        without it.
      </p>
      <h3>What good sleep hygiene actually looks like</h3>
      <ul>
        <li><strong>Same wake time every day</strong> — yes, including weekends. This is more important than bedtime.</li>
        <li><strong>Morning sunlight in the eyes</strong> within the first hour. Ten minutes outside (without sunglasses, not staring at the sun) sets your circadian clock.</li>
        <li><strong>Caffeine cutoff by early afternoon.</strong> Caffeine has a 5–7 hour half-life.</li>
        <li><strong>No screens in the last 60 minutes.</strong> Light + content keep the brain wound up.</li>
        <li><strong>Cool, dark, quiet.</strong> 65–68°F is optimal for most people.</li>
        <li><strong>Alcohol is not a sleep aid.</strong> It helps you fall asleep, then wrecks the second half of the night.</li>
        <li><strong>If you can&apos;t sleep after 20 minutes,</strong> get up. Read something boring in dim light. Return when sleepy.</li>
      </ul>
      <h3>When to get help</h3>
      <p>
        Chronic insomnia isn&apos;t a personal failing. If sleep hygiene alone isn&apos;t working,
        ask about <strong>CBT-I (Cognitive Behavioral Therapy for Insomnia)</strong> — it&apos;s
        more effective than sleep medication, long-term. Also screen for sleep apnea, especially
        if you snore or wake gasping.
      </p>
    </>
  );
}

function Nutrition() {
  return (
    <>
      <h2>Nutrition</h2>
      <p>
        The gut-brain connection is real. Most of your serotonin is made in the gut, and chronic
        inflammation from a processed diet correlates with higher rates of depression and anxiety.
        Nutrition isn&apos;t a cure, but it&apos;s a foundation.
      </p>
      <h3>What the evidence actually supports</h3>
      <ul>
        <li>
          <strong>A Mediterranean-style diet</strong> — vegetables, fruit, whole grains, legumes,
          fish, olive oil — is associated with lower rates of depression. This isn&apos;t trendy,
          it&apos;s the most consistently replicated nutritional finding in mental health.
        </li>
        <li>
          <strong>Omega-3 fatty acids</strong> (fatty fish 2x/week, or a 1–2g EPA/DHA supplement)
          have modest but real effects on depression.
        </li>
        <li>
          <strong>Stable blood sugar</strong> — regular meals, adequate protein — prevents the
          mood crashes that come with sugar highs and lows.
        </li>
        <li>
          <strong>Vitamin D</strong> deficiency is linked to depression, and it&apos;s common,
          especially in northern climates. Get your levels checked.
        </li>
        <li>
          <strong>Iron and B12</strong> deficiencies can look like depression. A simple blood panel
          can rule them out.
        </li>
      </ul>
      <h3>Hydration &amp; alcohol</h3>
      <p>
        Mild dehydration worsens mood and focus. Alcohol is a depressant — it gives short-term
        relief at the cost of longer-term mood and sleep disruption. Many people find that even
        cutting back a little makes a noticeable difference.
      </p>
    </>
  );
}

function Sunlight() {
  return (
    <>
      <h2>Sunlight &amp; Nature</h2>
      <p>
        The human brain was shaped by millions of years outside. Bringing some of that back —
        morning sunlight, time among trees, dirt under your feet — has measurable effects on mood,
        stress, and sleep.
      </p>
      <h3>Why it matters</h3>
      <ul>
        <li>
          <strong>Morning bright light</strong> in the eyes within the first hour of waking sets
          circadian rhythm, boosts cortisol in a healthy way, and improves that evening&apos;s sleep.
        </li>
        <li>
          <strong>10,000 lux light therapy boxes</strong> (30 minutes in the morning) are a
          well-validated treatment for seasonal affective disorder.
        </li>
        <li>
          <strong>Forest bathing</strong> — simply being in a forested area — lowers heart rate,
          blood pressure, and cortisol. Japanese research has been studying this for decades.
        </li>
        <li>
          <strong>Grounding / barefoot time</strong> has more limited evidence, but outdoor time of
          any kind is consistently helpful.
        </li>
      </ul>
      <h3>If you&apos;re housebound or in a dark season</h3>
      <p>
        A 10,000 lux light therapy lamp, used for 20–30 minutes each morning, can substitute for
        outdoor light. Get vitamin D levels checked. A walk to the mailbox still counts.
      </p>
    </>
  );
}

function DigitalDetox() {
  return (
    <>
      <h2>Phones &amp; Screen Breaks</h2>
      <p>
        This one deserves a direct tone, because the data are clear and most of us are in denial.
        Smartphones and social media, used the way most of us use them, are measurably bad for
        mental health — especially for teens, and especially for teen girls. They fragment
        attention, hijack the reward system, and replace real connection with a hollow imitation
        of it.
      </p>
      <h3>What the research finds</h3>
      <ul>
        <li>Heavy social media use correlates with higher rates of depression and anxiety, especially in adolescents.</li>
        <li>The <em>checking behavior</em> — compulsive checking for messages, likes, news — is a strong driver of anxiety.</li>
        <li>Sleep is wrecked by phones in the bedroom. Even one night of disrupted sleep raises anxiety the next day.</li>
        <li>The comparison loop — curated photos of other people&apos;s lives — reliably worsens self-esteem.</li>
      </ul>
      <h3>Practical steps that actually help</h3>
      <ul>
        <li>
          <strong>Phone out of the bedroom.</strong> Buy a cheap alarm clock. This is the single
          biggest change most people can make.
        </li>
        <li>
          <strong>No phone in the first 30 minutes</strong> after waking and the last 60 minutes
          before bed.
        </li>
        <li>
          <strong>Turn off all non-human notifications.</strong> Apps should not interrupt you —
          only people should.
        </li>
        <li>
          <strong>Grayscale mode.</strong> Remove color. You&apos;ll be shocked how much less
          interesting your phone becomes.
        </li>
        <li>
          <strong>Delete social media apps</strong> from the phone. Use them on a computer if at
          all. The friction is the point.
        </li>
        <li>
          <strong>One screen-free day a week.</strong> A &ldquo;digital Sabbath&rdquo; — an old
          practice that maps well onto a real need.
        </li>
        <li>
          <strong>For kids:</strong> delay smartphones and social media as long as possible. The
          longer, the better.
        </li>
      </ul>
      <p>
        You won&apos;t regret the time you didn&apos;t spend on your phone.
      </p>
    </>
  );
}

function Connection() {
  return (
    <>
      <h2>Connection &amp; Community</h2>
      <p>
        Loneliness is a real medical risk factor — comparable to smoking 15 cigarettes a day in
        some studies. Humans are built for relationship, and mental illness will try to isolate
        you. Fighting that isolation, even in small ways, is part of treatment.
      </p>
      <h3>What helps</h3>
      <ul>
        <li>
          <strong>One person, one conversation a day.</strong> Doesn&apos;t have to be deep. A
          cashier. A neighbor. A text to a friend.
        </li>
        <li>
          <strong>Regular, recurring commitments.</strong> A weekly dinner, a church small group, a
          running club, a volunteer shift. Consistency beats intensity.
        </li>
        <li>
          <strong>Groups where you show up with your hands, not just your words.</strong> Serving
          others is one of the most reliable mood lifters in the research.
        </li>
        <li>
          <strong>Peer support groups</strong> — NAMI, AA/NA, Celebrate Recovery, DBSA — connect
          you with people walking the same road.
        </li>
        <li>
          <strong>Pets, when you can care for them.</strong> Dogs especially pull you outside, on
          schedule, into the world.
        </li>
      </ul>
      <p>
        If reaching out feels impossible, start with the lowest-stakes option available. A wave to
        a neighbor counts. A short text counts.
      </p>
    </>
  );
}

function Faith() {
  return (
    <>
      <h2>Prayer &amp; Contemplation</h2>
      <p>
        For people of faith, the practices of prayer, scripture, worship, and sabbath have real,
        measurable mental health benefits. Researchers studying contemplative practices (prayer,
        meditation, mindfulness) find lowered stress hormones, improved emotional regulation, and
        better resilience in adversity.
      </p>
      <p>
        None of this replaces treatment when treatment is needed. Depression is not a spiritual
        failure, and taking medication is not a lack of faith. Many of us have been hurt by
        teaching that suggested otherwise. The truth is simpler: the mind and the spirit are
        connected, and caring for both is wisdom.
      </p>
      <h3>Practices people find grounding</h3>
      <ul>
        <li>
          <strong>Morning silence.</strong> Five minutes of stillness before looking at a phone or
          screen. Coffee, a window, breath, maybe a Psalm.
        </li>
        <li>
          <strong>Gratitude.</strong> Naming three specific things before sleep. Specificity matters
          more than quantity.
        </li>
        <li>
          <strong>Scripture meditation.</strong> Slow reading. One verse, many minutes. Lectio
          divina, if you want a structured form.
        </li>
        <li>
          <strong>Honest prayer.</strong> The Psalms give permission for the full range — grief,
          anger, confusion, joy. You don&apos;t have to tidy your feelings first.
        </li>
        <li>
          <strong>Sabbath.</strong> One day a week of rest. No striving, no screens, no
          to-do-list. An ancient practice that meets a modern need.
        </li>
        <li>
          <strong>Community worship.</strong> Showing up weekly, even when you don&apos;t feel like
          it. Especially when you don&apos;t feel like it.
        </li>
      </ul>
      <blockquote>
        &ldquo;Come to me, all you who are weary and burdened, and I will give you rest.&rdquo; —{' '}
        <em>Matthew 11:28</em>
      </blockquote>
    </>
  );
}

function TherapyTypes() {
  return (
    <>
      <h2>Types of Therapy</h2>
      <p>
        &ldquo;Therapy&rdquo; is a huge category. Different modalities suit different conditions,
        and the match matters. Here are the main approaches, what they&apos;re good for, and what
        to expect.
      </p>
      <MedTable
        headers={['Therapy', 'Best for', 'What it looks like']}
        rows={[
          ['Cognitive Behavioral Therapy (CBT)', 'Depression, anxiety, insomnia, OCD', 'Identifies unhelpful thought patterns and builds new responses. Structured, often homework-based. Usually 12–20 sessions.'],
          ['Exposure & Response Prevention (ERP)', 'OCD, phobias', 'A specific form of CBT. Gradually faces the feared trigger without the compulsive response.'],
          ['Dialectical Behavior Therapy (DBT)', 'Borderline personality, self-harm, emotion dysregulation', 'Skills-based: mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness.'],
          ['EMDR', 'PTSD, trauma', 'Uses guided eye movements while processing traumatic memories. Evidence is strong.'],
          ['Cognitive Processing Therapy (CPT)', 'PTSD', 'Written trauma narrative and thought-restructuring. Often 12 sessions.'],
          ['Prolonged Exposure (PE)', 'PTSD', 'Gradual exposure to trauma memories and avoided situations. Intensive but highly effective.'],
          ['Interpersonal Therapy (IPT)', 'Depression, grief', 'Focuses on relationships and role transitions. Time-limited, 12–16 sessions.'],
          ['Psychodynamic therapy', 'Long-standing patterns, personality issues', 'Explores unconscious patterns, childhood origins. Longer-term.'],
          ['Acceptance & Commitment Therapy (ACT)', 'Depression, anxiety, chronic pain', 'Accept difficult thoughts without being controlled by them; commit to values-based action.'],
          ['Family therapy', 'Family conflict, eating disorders, adolescent issues', 'Works with the family system, not just the individual.'],
          ['Pastoral/Christian counseling', 'Faith-integrated care', 'Licensed therapy that also draws on faith. Quality varies — look for proper licensure plus training.'],
        ]}
      />
      <h3>Finding a therapist</h3>
      <ul>
        <li>Psychology Today directory, Open Path Collective (sliding scale), or your insurance&apos;s provider list</li>
        <li>Ask about training in the specific modality for your condition</li>
        <li>It&apos;s okay — and normal — to change therapists if it isn&apos;t working after 4–6 sessions</li>
        <li>Telehealth is a legitimate option and is as effective as in-person for most conditions</li>
      </ul>
    </>
  );
}

/* ── Family & Careers & Crisis ────────────────────────────────────────────── */

function Family() {
  return (
    <>
      <h2>For Family &amp; Friends</h2>
      <p>
        Loving someone with a mental illness is its own kind of weight. You&apos;re carrying
        worry, frustration, grief, and often exhaustion — sometimes on top of your own struggles.
        This section is for you.
      </p>
      <h3>Things that help</h3>
      <ul>
        <li>
          <strong>Listen more than you fix.</strong> &ldquo;That sounds really hard&rdquo; is often
          worth more than any advice.
        </li>
        <li>
          <strong>Don&apos;t take it personally.</strong> When they withdraw, snap, or cancel
          plans, it&apos;s often the illness, not the relationship.
        </li>
        <li>
          <strong>Offer specific help.</strong> &ldquo;I&apos;m bringing dinner Thursday&rdquo; is
          easier to accept than &ldquo;Let me know if you need anything.&rdquo;
        </li>
        <li>
          <strong>Take treatment seriously without being the enforcer.</strong> Encourage appointments
          and medication, but don&apos;t try to become their therapist.
        </li>
        <li>
          <strong>Learn the warning signs</strong> of crisis — withdrawal, giving away possessions,
          sudden calm after depression, talking about being a burden.
        </li>
      </ul>
      <h3>Things to be careful of</h3>
      <ul>
        <li>Telling them to &ldquo;snap out of it,&rdquo; &ldquo;just pray harder,&rdquo; or &ldquo;focus on the positive.&rdquo;</li>
        <li>Treating medication as weakness.</li>
        <li>Comparing their experience to someone else&apos;s.</li>
        <li>Burning yourself out trying to be everything for them.</li>
      </ul>
      <h3>Caring for yourself</h3>
      <p>
        You can&apos;t pour from an empty cup. Your own therapy, your own community, your own rest
        — these aren&apos;t selfish. They&apos;re what allow you to be there for the long haul.
        <strong> NAMI Family Support Groups</strong> (free, peer-led) are an excellent resource.
      </p>
    </>
  );
}

function Careers() {
  return (
    <>
      <h2>Careers in Mental Health</h2>
      <p>
        One of the most common things we hear from people who&apos;ve come through a mental health
        crisis: &ldquo;I want to help others who&apos;ve been where I was.&rdquo; That instinct is a
        gift — and there are many ways to channel it professionally. Here&apos;s an overview of
        the main career paths.
      </p>
      <MedTable
        headers={['Role', 'Training path', 'What they do']}
        rows={[
          ['Psychiatrist', 'Medical school (MD/DO) + 4-year psychiatry residency. Can sub-specialize (child, addiction, geriatric, forensic).', 'Diagnose and prescribe. Often lead complex medication care. Some also do therapy.'],
          ['Psychiatric Nurse Practitioner (PMHNP)', 'Nursing degree (BSN) → psychiatric NP program (master\'s or doctorate).', 'Can diagnose and prescribe in most states. Fast-growing path.'],
          ['Psychologist', 'PhD or PsyD in clinical psychology — 5–7 years of graduate training.', 'Diagnose and provide therapy. Can do psychological testing. Cannot prescribe in most states.'],
          ['Licensed Clinical Social Worker (LCSW)', 'Master\'s in social work (MSW) + clinical supervision hours.', 'Therapy, case management, advocacy. Often work in hospitals, schools, community agencies.'],
          ['Licensed Professional Counselor (LPC / LMHC)', 'Master\'s in counseling + supervised hours.', 'Therapy for individuals, couples, and groups.'],
          ['Licensed Marriage & Family Therapist (LMFT)', 'Master\'s in MFT + supervised hours.', 'Specialize in relationships and family systems.'],
          ['Psychiatric RN', 'Nursing degree (BSN), often with psychiatric certification.', 'Work in inpatient units, crisis teams, outpatient clinics.'],
          ['Behavioral Health Technician', 'High school diploma + training. Some employers require an associate\'s.', 'Entry-level role in inpatient and residential settings.'],
          ['Peer Support Specialist', 'Short certification (40–80 hours). Lived experience with mental illness required.', 'Walks alongside people in recovery. A growing, valued role.'],
          ['Certified Recovery Coach', 'Varied certifications, typically short.', 'Focused on addiction recovery support.'],
          ['School Counselor', 'Master\'s in school counseling.', 'Front-line support for children and adolescents in schools.'],
          ['Chaplain / Pastoral Counselor', 'Seminary (M.Div) + clinical pastoral education; licensure varies.', 'Faith-integrated care in hospitals, hospices, military, and congregations.'],
          ['Art / Music / Dance Therapist', 'Master\'s in expressive arts therapy + credentials.', 'Use creative modalities for healing, especially effective with trauma and children.'],
          ['Psychiatric Physician Assistant', 'PA school + psychiatric training or fellowship.', 'Can prescribe under physician supervision. Growing path.'],
        ]}
      />
      <h3>If you&apos;re curious but not sure</h3>
      <ul>
        <li>
          <strong>Volunteer first.</strong> Crisis text line volunteer, NAMI helpline, hospital or
          hospice visitor. You&apos;ll learn a lot about fit.
        </li>
        <li>
          <strong>Shadow a professional.</strong> Most will say yes to a respectful request.
        </li>
        <li>
          <strong>Peer support is a legitimate starting point.</strong> Many people discover their
          calling through it, then pursue further training.
        </li>
        <li>
          <strong>There is huge, sustained demand.</strong> Mental health workforce shortages are
          severe and growing. This is a field that needs you.
        </li>
      </ul>
    </>
  );
}

function Crisis() {
  return (
    <>
      <h2>Crisis &amp; Immediate Help</h2>
      <p>
        If you or someone you love is in immediate danger of hurting themselves or someone else,
        call 911 or go to the nearest emergency room. If the crisis is emotional but not immediate
        physical danger, the resources below are trained, free, and available 24/7.
      </p>
      <div className="not-prose space-y-4 my-6">
        <div className="border-2 border-red-300 bg-red-50 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-red-900 m-0">988 Suicide &amp; Crisis Lifeline</h3>
          <p className="mt-2 text-red-900">
            Call or text <a className="font-bold underline" href="tel:988">988</a> for any mental
            health crisis — suicidal thoughts, overwhelming anxiety, psychosis, or simply needing
            someone to talk to. Free, 24/7, confidential.
          </p>
          <p className="mt-1 text-red-800 text-sm">
            For veterans: dial 988 and press 1. For LGBTQ+ youth: dial 988 and press 3.
          </p>
        </div>
        <div className="border border-gray-200 bg-white rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 m-0">Crisis Text Line</h3>
          <p className="mt-1 text-gray-700">
            Text <strong>HOME to 741741</strong>. A trained crisis counselor will respond. Free and
            confidential.
          </p>
        </div>
        <div className="border border-gray-200 bg-white rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 m-0">SAMHSA National Helpline</h3>
          <p className="mt-1 text-gray-700">
            <a className="underline" href="tel:18006624357">1-800-662-HELP (4357)</a> — treatment
            referrals for mental health and substance use. Free, 24/7, confidential.
          </p>
        </div>
        <div className="border border-gray-200 bg-white rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 m-0">NAMI Helpline</h3>
          <p className="mt-1 text-gray-700">
            <a className="underline" href="tel:18009506264">1-800-950-NAMI (6264)</a> or text
            &ldquo;HelpLine&rdquo; to 62640. Support and information for individuals and families.
            M–F, 10am–10pm ET.
          </p>
        </div>
        <div className="border border-gray-200 bg-white rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 m-0">Veterans Crisis Line</h3>
          <p className="mt-1 text-gray-700">
            Dial <a className="underline" href="tel:988">988</a> and press 1. Or text 838255.
          </p>
        </div>
        <div className="border border-gray-200 bg-white rounded-lg p-5">
          <h3 className="text-base font-semibold text-gray-900 m-0">The Trevor Project</h3>
          <p className="mt-1 text-gray-700">
            For LGBTQ+ young people under 25:{' '}
            <a className="underline" href="tel:18664887386">1-866-488-7386</a> or text START to
            678678.
          </p>
        </div>
      </div>

      <h3>Going to the emergency room</h3>
      <p>
        If you&apos;re in acute crisis and can&apos;t keep yourself safe, an ER is an appropriate
        place to go. You can ask for a psychiatric evaluation. Bring a list of current medications
        if possible. A trusted person can drive you or meet you there.
      </p>

      <h3>Making a safety plan</h3>
      <p>
        A written safety plan — ideally made with a therapist or trusted person, <em>before</em> a
        crisis — is one of the most evidence-backed suicide prevention tools. It typically
        includes:
      </p>
      <ol>
        <li>Warning signs that a crisis is building</li>
        <li>Coping strategies you can do on your own</li>
        <li>People and places that provide distraction</li>
        <li>People you can reach out to for help</li>
        <li>Professional contacts (therapist, psychiatrist, crisis line)</li>
        <li>Steps to make your environment safer (securing medications, firearms)</li>
      </ol>
      <p>
        The free <a href="https://suicidesafetyplan.com/">Stanley-Brown Safety Plan</a> template is
        widely used.
      </p>

      <div className="not-prose bg-teal-50 border-l-4 border-teal-500 p-4 rounded my-6">
        <strong>You are not alone, and this is not forever.</strong> Crisis is, by definition,
        temporary. Help is real, and it works. Please reach out.
      </div>
    </>
  );
}

// Table component for medication listings
function MedTable({
  headers = ['Generic', 'Brand', 'Notes'],
  rows,
}: {
  headers?: string[];
  rows: string[][];
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-semibold text-gray-800 px-3 py-2 border-b border-gray-300"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="align-top px-3 py-2 border-b border-gray-200 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
