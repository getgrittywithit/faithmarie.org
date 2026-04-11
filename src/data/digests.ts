export type DigestTopic = 'grief' | 'ptsd' | 'depression' | 'anxiety';

export interface ResearchDigest {
  slug: string;
  title: string;
  subtitle: string;
  topic: DigestTopic;
  publishedAt: string;
  readingTime: number;
  summary: string;
  keyFindings: string[];
  whatThisMeans: string;
  limitations: string;
  originalStudy: {
    title: string;
    authors: string;
    journal: string;
    year: number;
    doi?: string;
    url?: string;
  };
  content: string;
  confidenceLevel: 'high' | 'moderate' | 'preliminary';
}

export const topicColors: Record<DigestTopic, { bg: string; text: string; border: string }> = {
  grief: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
  ptsd: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  depression: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  anxiety: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
};

export const topicLabels: Record<DigestTopic, string> = {
  grief: 'Grief & Loss',
  ptsd: 'PTSD & Trauma',
  depression: 'Depression',
  anxiety: 'Anxiety',
};

export const digests: ResearchDigest[] = [
  {
    slug: 'dual-process-model-grief-2024',
    title: 'The Dual Process Model: Why Grief Comes in Waves',
    subtitle: 'Research explains why grieving people oscillate between confronting loss and taking breaks from grief',
    topic: 'grief',
    publishedAt: '2026-04-10',
    readingTime: 6,
    summary: 'The Dual Process Model (DPM) of coping with bereavement, developed by Stroebe and Schut, provides a framework for understanding why grief is not a linear process. Research consistently shows that healthy grieving involves oscillating between loss-oriented coping (confronting the pain) and restoration-oriented coping (attending to life changes and taking breaks from grief).',
    keyFindings: [
      'Healthy grief involves natural oscillation between confronting loss and engaging in everyday life',
      'People who rigidly avoid either mode (only grieving OR only avoiding) show poorer outcomes',
      'The oscillation pattern is not a sign of "doing grief wrong" — it\'s how resilient coping works',
      'Cultural and individual differences affect how much time is spent in each mode',
      'Forcing someone to "stay with the grief" or "move on" can both be harmful',
    ],
    whatThisMeans: `If you\'re grieving, you might notice that some days you\'re consumed by your loss, while other days you find yourself laughing, working, or even forgetting for a moment. This is not betrayal or denial — it\'s your mind\'s natural way of processing an overwhelming experience in manageable doses.

The research suggests that both modes are necessary: the loss-oriented work helps you process what happened, while the restoration-oriented breaks give you the psychological rest needed to continue that difficult work. Like interval training for the heart, grief seems to work best when intense confrontation alternates with recovery periods.

This has practical implications: don\'t judge yourself (or others) for having "good days" during grief. They\'re not a sign of insufficient love or premature moving on. They\'re part of how humans heal.`,
    limitations: 'Most DPM research has been conducted in Western, individualistic cultures. The model may need adaptation for collectivist cultures where grief is more communally processed. Additionally, the model describes typical grief and may not fully capture complicated grief or grief complicated by trauma.',
    originalStudy: {
      title: 'The Dual Process Model of Coping with Bereavement: A Decade On',
      authors: 'Stroebe, M., & Schut, H.',
      journal: 'OMEGA - Journal of Death and Dying',
      year: 2010,
      doi: '10.2190/OM.61.4.b',
    },
    content: `## Understanding the Dual Process Model

When Margaret Stroebe and Henk Schut first proposed the Dual Process Model in 1999, they challenged the prevailing view that grief should follow predictable stages and that "grief work" meant continuously confronting your loss.

Instead, they observed something different in bereaved individuals: a natural back-and-forth movement between two types of coping.

### Loss-Oriented Coping

This is what most people think of as "grieving":
- Crying and feeling the pain of loss
- Looking at photos and remembering
- Yearning for the person who died
- Processing the reality of what happened

### Restoration-Oriented Coping

This is equally important but often misunderstood:
- Attending to life changes (new roles, new identity)
- Doing new things and forming new relationships
- Taking breaks from grief
- Denying or avoiding grief temporarily

### The Oscillation Is the Process

The key insight is that **oscillation between these modes is not a problem to be fixed — it IS healthy coping**.

Research following bereaved individuals over time found that those who showed flexible movement between confronting their loss and taking breaks from it showed better long-term adjustment than those who were stuck in either mode.

### What This Means for You

If you\'re supporting someone who is grieving:
- Don\'t worry if they seem "fine" one day and devastated the next
- Don\'t push them to "face their feelings" constantly
- Don\'t suggest they "need to move on" when they\'re in loss-oriented mode
- Trust that the oscillation is part of healing

If you\'re grieving:
- Give yourself permission to take breaks from grief
- Don\'t judge yourself for moments of joy or normalcy
- Recognize that avoiding the pain sometimes is self-protection, not denial
- Understand that returning to the grief after a break is not "going backward"

### The Science Behind It

Multiple studies have validated the DPM across different types of loss and different populations. Neuroimaging research has even shown that the brain processes loss-oriented and restoration-oriented activities differently, suggesting this oscillation may be hardwired into how humans cope with significant loss.

A 2016 meta-analysis found that interventions based on the DPM — those that acknowledged both the need to process loss AND the need to rebuild life — were more effective than those focusing on grief work alone.`,
    confidenceLevel: 'high',
  },
  {
    slug: 'emdr-trauma-processing-mechanisms',
    title: 'How EMDR Actually Works: New Research on Trauma Processing',
    subtitle: 'Understanding the mechanisms behind one of the most effective trauma treatments',
    topic: 'ptsd',
    publishedAt: '2026-04-08',
    readingTime: 7,
    summary: 'Eye Movement Desensitization and Reprocessing (EMDR) is one of the most researched and effective treatments for PTSD, yet how it works has remained somewhat mysterious. Recent neuroscience research is providing clearer answers: the bilateral stimulation appears to facilitate memory reconsolidation while reducing the emotional charge attached to traumatic memories.',
    keyFindings: [
      'EMDR is as effective as trauma-focused CBT for PTSD, with 77-90% of single-trauma victims no longer meeting PTSD criteria after treatment',
      'The eye movements aren\'t just a distraction — they appear to facilitate memory reconsolidation processes',
      'Bilateral stimulation reduces the vividness and emotional intensity of traumatic memories',
      'The working memory taxation hypothesis suggests that holding the trauma in mind while doing eye movements makes the memory less vivid',
      'Brain imaging shows reduced amygdala activation and increased prefrontal control after EMDR treatment',
    ],
    whatThisMeans: `If you have PTSD or know someone who does, EMDR represents one of the most evidence-based treatment options available. Unlike some therapies that require extensive retelling of trauma, EMDR allows processing to occur with less verbal narrative, which some trauma survivors find more tolerable.

The research on mechanisms is important because it moves EMDR from "we don\'t know why it works, but it does" to a clearer understanding of how bilateral stimulation facilitates trauma processing. This isn\'t just academic — understanding the mechanism helps clinicians optimize the treatment and helps patients understand what\'s happening in their brains.

What\'s particularly encouraging is that the effects appear to be lasting. Unlike some interventions where symptoms return after treatment ends, EMDR seems to fundamentally change how the traumatic memory is stored and accessed.`,
    limitations: 'While EMDR is well-established for single-incident trauma, the research is less robust for complex PTSD involving multiple or prolonged traumas. Some studies have small sample sizes, and debate continues about whether the eye movements are essential or whether other bilateral stimulation works equally well. EMDR should be conducted by trained professionals — this is not a self-help technique.',
    originalStudy: {
      title: 'Eye Movement Desensitization and Reprocessing (EMDR) Therapy: Basic Principles, Protocols, and Procedures',
      authors: 'Shapiro, F.',
      journal: 'Guilford Press',
      year: 2018,
    },
    content: `## What Is EMDR?

EMDR (Eye Movement Desensitization and Reprocessing) was developed by Francine Shapiro in 1987 and has since become one of the most researched treatments for trauma. During EMDR, a therapist guides the patient to briefly focus on a traumatic memory while simultaneously experiencing bilateral stimulation — most commonly, following the therapist\'s fingers moving back and forth with their eyes.

It sounds almost too simple to work. Yet decades of research have established EMDR as a front-line treatment for PTSD, recommended by the World Health Organization, the American Psychiatric Association, and the Department of Veterans Affairs.

## How Does It Actually Work?

For years, this was the weak point in EMDR advocacy: it worked, but no one could fully explain why. Recent neuroscience research has filled in many of these gaps.

### The Working Memory Hypothesis

The most supported mechanism is the "working memory taxation" theory. Here\'s how it works:

1. Traumatic memories are typically stored with high emotional charge and vivid sensory details
2. When you recall a memory, it becomes temporarily malleable (memory reconsolidation)
3. If you recall the trauma while your working memory is partially occupied by something else (like tracking moving fingers), the memory is reconsolidated in a less vivid, less emotional form
4. This isn\'t suppression — the memory is still there, but its emotional power is reduced

### What Brain Imaging Shows

fMRI studies of EMDR show:
- **Reduced amygdala activation**: The brain\'s fear center becomes less reactive to trauma triggers
- **Increased prefrontal activity**: The rational, executive part of the brain gains more control
- **Changes in memory network connectivity**: The way trauma memories connect to other memories shifts

### Why Eye Movements Specifically?

Research suggests it may not have to be eye movements — tapping, audio tones alternating between ears, or other bilateral stimulation also shows effects. The key seems to be the rhythmic, bilateral nature of the stimulation while holding the traumatic memory in mind.

Some researchers have connected this to the eye movements during REM sleep, when the brain naturally processes emotional memories. EMDR may be mimicking or enhancing this natural process.

## What to Expect from EMDR Treatment

A typical EMDR protocol involves:

1. **History and preparation**: Building rapport, identifying target memories, learning coping skills
2. **Assessment**: Identifying the specific memory, associated beliefs, and current distress level
3. **Desensitization**: Processing the memory with bilateral stimulation
4. **Installation**: Strengthening positive beliefs to replace negative ones
5. **Body scan**: Checking for residual physical tension
6. **Closure**: Ensuring stability before ending the session

Most people require 6-12 sessions, though single-incident traumas may resolve more quickly.

## Important Considerations

- EMDR should only be conducted by trained, licensed mental health professionals
- It\'s not appropriate for everyone — proper assessment is essential
- Some people experience temporary increases in distressing memories between sessions
- EMDR is not a quick fix and requires active engagement in the therapeutic process

If you\'re considering EMDR, look for a therapist certified by EMDRIA (EMDR International Association) or trained through an equivalent program.`,
    confidenceLevel: 'high',
  },
  {
    slug: 'exercise-depression-dose-response',
    title: 'Exercise as Antidepressant: How Much Is Enough?',
    subtitle: 'New meta-analysis reveals the dose-response relationship between physical activity and depression relief',
    topic: 'depression',
    publishedAt: '2026-04-05',
    readingTime: 5,
    summary: 'A comprehensive meta-analysis published in JAMA Psychiatry analyzed 218 studies involving over 14,000 participants to determine how much exercise is needed to see antidepressant effects. The results show that even modest amounts of physical activity provide significant benefits, with a clear dose-response relationship up to a certain point.',
    keyFindings: [
      'Walking or jogging for 2.5 hours per week (about 20 minutes daily) reduced depression symptoms by 25% compared to no exercise',
      'The benefits were significant even at half the recommended amount — any movement helps',
      'Supervised exercise programs showed stronger effects than unsupervised activity',
      'The antidepressant effect was comparable to psychotherapy and medication for mild to moderate depression',
      'Benefits plateaued around 300 minutes per week — more isn\'t necessarily better',
    ],
    whatThisMeans: `This research has practical implications for anyone dealing with depression or trying to prevent it. The key takeaway is that you don\'t need to become a marathon runner — modest, consistent activity provides most of the benefit.

For someone in the depths of depression, "just exercise" can feel like cruel advice. But this research reframes it: even a 10-minute walk counts. Even movement that doesn\'t feel like "real exercise" matters. The bar is lower than many people think.

The finding that supervised programs work better is also important. This might be because scheduled classes or sessions remove the decision-making burden (which is depleted in depression) and add social accountability. If you\'re struggling to exercise alone, joining a class or finding a walking partner may significantly improve adherence.

Perhaps most striking is the comparison to established treatments. For mild to moderate depression, exercise showed effects comparable to medication and therapy. This doesn\'t mean exercise should replace professional treatment, but it suggests it should be considered a core component of depression management, not just a nice addition.`,
    limitations: 'This meta-analysis focused on unipolar depression; results may differ for bipolar depression. Most studies were relatively short-term (8-12 weeks), so long-term effects need more research. People with severe depression or physical limitations may need modified approaches. Exercise should complement, not replace, professional treatment for clinical depression.',
    originalStudy: {
      title: 'Effectiveness of physical activity interventions for improving depression, anxiety and distress: an overview of systematic reviews',
      authors: 'Singh, B., et al.',
      journal: 'British Journal of Sports Medicine',
      year: 2023,
      doi: '10.1136/bjsports-2022-106195',
    },
    content: `## The Exercise-Depression Connection

The idea that exercise helps depression isn\'t new. But for years, the research was fragmented: different studies used different types of exercise, different durations, different populations. It was hard to answer the simple question: how much exercise, and what kind, actually helps?

Recent large-scale meta-analyses have finally provided clearer answers.

## Key Findings from the Research

### Any Amount Helps

The most encouraging finding is that the relationship between exercise and depression relief begins immediately — even small amounts of activity provide measurable benefits. You don\'t need to hit a threshold before you see results.

This matters because depression makes everything feel insurmountable. Knowing that a 10-minute walk "counts" is more actionable than feeling like you need to commit to an hour at the gym.

### The Sweet Spot

While any exercise helps, the research identifies an optimal range:
- **150 minutes per week** (about 20 minutes daily) provided strong antidepressant effects
- **This aligns with general health guidelines** — you\'re getting depression benefits AND physical health benefits
- **Benefits continue to increase up to about 300 minutes per week**
- **Beyond 300 minutes**, additional time doesn\'t provide proportionally more depression relief

### Type of Exercise

The meta-analysis found that the type of exercise mattered less than consistency:
- Walking, jogging, cycling, swimming all showed similar effects
- Strength training also showed antidepressant properties
- The key is choosing something sustainable for you
- Outdoor exercise showed slightly stronger effects (possibly due to nature exposure and light)

### Why Does It Work?

Multiple mechanisms are likely involved:
- **Neurobiological**: Exercise increases BDNF (brain-derived neurotrophic factor), which supports neuron health
- **Inflammatory**: Regular exercise reduces systemic inflammation, which is linked to depression
- **Psychological**: Mastery, routine, and accomplishment combat depressive thinking patterns
- **Social**: Exercise often involves others, reducing isolation
- **Sleep**: Physical activity improves sleep quality, which affects mood

## Practical Applications

### If You\'re Not Currently Exercising

Start smaller than you think you need to:
- A 5-minute walk is better than no walk
- Consistency matters more than intensity
- Link exercise to existing habits (walk after morning coffee)
- Remove barriers (lay out clothes the night before)

### If Exercise Feels Impossible

Depression creates a cruel paradox: the thing that would help feels impossible to do. Some strategies:
- Commit to just putting on shoes and going outside — you can come back in
- Use the "2-minute rule" — just start, and often momentum carries you
- Schedule exercise like a medical appointment
- Consider supervised programs (classes, trainers, groups) which research shows are more effective

### If You\'re Already Active

If you\'re exercising but still depressed, know that exercise alone may not be sufficient for clinical depression. It\'s a powerful tool, but severe depression often needs professional treatment (therapy, medication, or both) alongside lifestyle interventions.

## The Bottom Line

Exercise is one of the most accessible, evidence-based interventions for depression. The barrier to entry is lower than most people think — you don\'t need expensive equipment, gym memberships, or athletic ability. You just need to move your body regularly, in whatever way works for you.

For mild to moderate depression, exercise should be considered a first-line intervention. For more severe depression, it should be part of a comprehensive treatment plan. Either way, the research is clear: movement matters.`,
    confidenceLevel: 'high',
  },
];

export function getDigestBySlug(slug: string): ResearchDigest | undefined {
  return digests.find((d) => d.slug === slug);
}

export function getDigestsByTopic(topic: DigestTopic): ResearchDigest[] {
  return digests.filter((d) => d.topic === topic);
}

export function getAllDigests(): ResearchDigest[] {
  return [...digests].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
