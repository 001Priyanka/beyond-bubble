import type { PerspectiveDetail } from '../../../shared/types.js';

export const INITIAL_PERSPECTIVE_DETAILS: readonly PerspectiveDetail[] = [
  // =========================================================================
  // TOPIC 1: AI & JOBS (ai-jobs)
  // =========================================================================
  {
    id: 'ai-optimistic',
    topicId: 'ai-jobs',
    name: 'AI Optimistic',
    inquiryPrompt: 'How might someone focused on technological innovation and economic growth approach this question?',
    shortDescription: 'Emphasizes productivity gains, new job creation, and human-AI collaboration.',
    whyItMatters: 'Helps understand the rationale behind technological investments and the potential for new industries to emerge.',
    overviewParagraphs: [
      'The AI Optimistic perspective views artificial intelligence as an augmenting technology that enhances human capabilities rather than simply replacing workers. Proponents emphasize historical patterns of automation, where initial disruptions ultimately led to higher aggregate productivity, wage growth, and the creation of entirely new occupational categories.',
      'From this viewpoint, routine and repetitive cognitive tasks are offloaded to machine systems, freeing human professionals to concentrate on high-order synthesis, strategic judgment, creative direction, and interpersonal collaboration. Proponents argue that market competitiveness requires rapid adoption to sustain economic vitality.',
      'Proponents also highlight the emergence of new career tracks—such as prompt engineering, context curation, model auditing, and AI operations—that expand technical career pathways for non-traditional backgrounds.'
    ],
    keyThemes: [
      'Productivity and efficiency gains',
      'Cognitive augmentation over substitution',
      'Emergence of new occupational roles',
      'Global market competitiveness'
    ],
    assumptions: [
      'Technological productivity gains will eventually translate into broader economic opportunities and new job categories.',
      'Workers can successfully transition into higher-value tasks with appropriate tools and organizational support.',
      'Market competition and innovation pressure necessitate proactive technology integration.'
    ],
    criticalQuestions: [
      'What evidence exists regarding how productivity gains are distributed between capital owners and employees?',
      'How long does the transition period typically take between job displacement and the creation of equivalent replacement jobs?',
      'Which categories of workers face the highest friction when attempting to reskill into augmented roles?'
    ],
    comparison: {
      mainFocus: 'Maximizing productivity, business innovation, and new role creation',
      keyConcern: 'Falling behind competitors or underutilizing technological capabilities',
      evidenceEmphasized: 'Enterprise efficiency benchmarks, patent filings, and emerging tech salaries',
      questionsRaised: 'How quickly can organizations and workforces integrate AI tools to stay competitive?'
    },
    colorVar: 'var(--perspective-industry)',
    bgVar: 'var(--perspective-industry-bg)'
  },
  {
    id: 'worker-perspective',
    topicId: 'ai-jobs',
    name: 'Worker Perspective',
    inquiryPrompt: 'How might someone in the workforce or labor representation approach this question?',
    shortDescription: 'Focuses on employment security, deskilling risks, wage stability, and workplace transition.',
    whyItMatters: 'Highlights the direct lived impact on individuals whose roles, livelihoods, and career trajectories are affected.',
    overviewParagraphs: [
      'The Worker Perspective centers the experiences, economic security, and agency of frontline employees navigating technological change. Rather than viewing technology purely as an abstract macroeconomic force, this perspective examines how changes manifest on the ground in job availability, entry-level hiring, and day-to-day workplace conditions.',
      'A primary focus is the compression of traditional career apprenticeships. When junior tasks such as drafting, basic analysis, and translation are automated, early-career workers may lose the foundational practice required to develop senior-level expertise. Concerns also include algorithmic workplace surveillance and metric pacing.',
      'Advocates emphasize the need for worker representation in technology deployment decisions, fair severance, transparent notification of automated downsizing, and employer-funded retraining programs that preserve compensation levels.'
    ],
    keyThemes: [
      'Apprenticeship and entry-level career ladders',
      'Deskilling and specialized professional identity',
      'Workplace surveillance and algorithmic pacing',
      'Fair transition safety nets and collective voice'
    ],
    assumptions: [
      'Technological adoption does not automatically benefit workers without proactive protections and shared governance.',
      'The speed of current cognitive automation may outpace historical retraining cycles, creating acute transitional hardship.',
      'Frontline employees possess vital domain insight that is often overlooked in top-down automation strategies.'
    ],
    criticalQuestions: [
      'What specific data demonstrates the rate of junior hiring contraction versus expanded senior productivity?',
      'How are severance and retraining funds being funded across different industries and company sizes?',
      'What institutional mechanisms allow workers to have input on the deployment of workplace AI systems?'
    ],
    comparison: {
      mainFocus: 'Protecting worker dignity, compensation stability, and career continuity',
      keyConcern: 'Displacement without transition support, deskilling, and loss of entry pathways',
      evidenceEmphasized: 'Junior hiring metrics, union surveys, worker testimonies, and retraining outcomes',
      questionsRaised: 'How can technological gains be shared equitably with the people who do the work?'
    },
    colorVar: 'var(--perspective-workforce)',
    bgVar: 'var(--perspective-workforce-bg)'
  },
  {
    id: 'regulation',
    topicId: 'ai-jobs',
    name: 'Regulation',
    inquiryPrompt: 'How might policymakers, legal experts, and public interest advocates approach this question?',
    shortDescription: 'Focuses on governance frameworks, antitrust enforcement, public safety nets, and corporate accountability.',
    whyItMatters: 'Examines the legal, institutional, and policy instruments required to protect public interests.',
    overviewParagraphs: [
      'The Regulatory and Governance perspective evaluates how legal systems, regulatory agencies, and public institutions can structure market incentives to protect public welfare while enabling beneficial innovation.',
      'Key considerations include antitrust concerns regarding the concentration of compute power and proprietary foundational models among a small number of infrastructure providers, potential algorithmic discrimination in hiring algorithms, and consumer protection.',
      'Policy proposals in this domain often involve mandatory displacement notification periods, public transition funds supported by automation levies, algorithmic auditing standards, and clear transparency rules regarding AI-generated interactions.'
    ],
    keyThemes: [
      'Statutory transition mandates and severance standards',
      'Antitrust and compute market power concentration',
      'Algorithmic auditing and anti-discrimination standards',
      'Public funding for regional workforce endowments'
    ],
    assumptions: [
      'Private markets alone may not internalize the social costs of workforce disruption without statutory boundaries.',
      'Concentrated market power in critical technological infrastructure can suppress competition and labor bargaining power.',
      'Predictable regulatory frameworks provide long-term stability for both businesses and citizens.'
    ],
    criticalQuestions: [
      'What are the trade-offs between proactive regulation and the speed of domestic technological innovation?',
      'How enforceable are algorithmic transparency mandates across proprietary deep learning models?',
      'What international models of workforce transition policy have proven most cost-effective?'
    ],
    comparison: {
      mainFocus: 'Establishing clear legal boundaries, market fairness, and public safety nets',
      keyConcern: 'Market concentration, unaccountable automated decisions, and inadequate public safety nets',
      evidenceEmphasized: 'Legislative statutes, antitrust economic analyses, and compliance audit frameworks',
      questionsRaised: 'What policy mechanisms best balance innovation incentives with public accountability?'
    },
    colorVar: 'var(--perspective-civic)',
    bgVar: 'var(--perspective-civic-bg)'
  },
  {
    id: 'academic-research',
    topicId: 'ai-jobs',
    name: 'Academic / Research',
    inquiryPrompt: 'How might economic historians, sociologists, and empirical researchers approach this question?',
    shortDescription: 'Provides historical context, econometric modeling, longitudinal data, and structural analysis.',
    whyItMatters: 'Offers empirical groundings and historical analogies that cut through short-term enthusiasm or alarm.',
    overviewParagraphs: [
      'The Academic and Research perspective examines technological change through rigorous econometric modeling, historical comparative analysis, and longitudinal labor studies. Researchers seek to distinguish temporary transitional frictions from structural long-term realignments.',
      'Scholars frequently compare cognitive automation with past waves of mechanization (such as steam power, electrification, and computerized spreadsheets), analyzing how task compositions shifted from routine calculation to complex problem-solving over multi-decade spans.',
      'Empirical studies focus on measuring the capital-labor share of national income, elasticity of substitution across specific tasks, regional wage differentials, and demographic variations in workforce absorption.'
    ],
    keyThemes: [
      'Longitudinal macroeconomic task shifting',
      'Historical precedents of technological mechanization',
      'Capital-labor income distribution dynamics',
      'Empirical econometric modeling and peer-reviewed metrics'
    ],
    assumptions: [
      'Long-term historical patterns provide valuable, though not identical, frameworks for understanding current transformations.',
      'Aggregated economic data and controlled trials offer clearer signals than anecdotal corporate announcements.',
      'Technological impact is contingent on broader institutional, educational, and macroeconomic variables.'
    ],
    criticalQuestions: [
      'To what degree are the speed and universality of cognitive AI distinct from prior mechanical innovations?',
      'How reliable are current econometric forecasts given the rapid pace of model capabilities?',
      'What does peer-reviewed research reveal about the effectiveness of different adult reskilling models?'
    ],
    comparison: {
      mainFocus: 'Rigorous empirical analysis, historical comparison, and structural economic trends',
      keyConcern: 'Overgeneralization from short-term headlines or unverified anecdotal claims',
      evidenceEmphasized: 'Peer-reviewed journals, longitudinal census data, and econometric task-level models',
      questionsRaised: 'What do long-term historical data and empirical evidence show about similar transitions?'
    },
    colorVar: 'var(--perspective-academic)',
    bgVar: 'var(--perspective-academic-bg)'
  },

  // =========================================================================
  // TOPIC 2: CLIMATE CHANGE (climate-change)
  // =========================================================================
  {
    id: 'clean-energy-market-innovation',
    topicId: 'climate-change',
    name: 'Clean Energy & Market Innovation',
    inquiryPrompt: 'How might clean-tech entrepreneurs, engineers, and market investors approach this question?',
    shortDescription: 'Emphasizes technological breakthroughs, capital deployment, and scalable market solutions.',
    whyItMatters: 'Focuses on the engineering and financial mechanisms that make clean technologies economically competitive.',
    overviewParagraphs: [
      'The Clean Energy and Market Innovation perspective frames climate action primarily as an engineering, scaling, and capital allocation challenge. Proponents argue that the most rapid and durable decarbonization occurs when clean technologies become strictly cheaper and superior to fossil alternatives.',
      'Key focus areas include learning-curve cost declines in grid-scale battery storage, advanced geothermal, direct air capture, hydrogen electrolyzers, and next-generation nuclear. Proponents point to private venture investments and industrial deployment as primary drivers.',
      'This viewpoint highlights the potential for economic expansion through green industrial manufacturing, export opportunities, and technological leadership in global energy markets.'
    ],
    keyThemes: [
      'Technology cost curve deflation',
      'Private capital deployment and green finance',
      'Industrial-scale cleantech manufacturing',
      'Market-driven energy transitions'
    ],
    assumptions: [
      'Market forces and price parity are the most potent mechanisms for global decarbonization at scale.',
      'Continuous engineering innovation can overcome resource and intermittency bottlenecks.',
      'Clean energy deployment creates significant net economic growth and job opportunities.'
    ],
    criticalQuestions: [
      'How quickly can critical mineral supply chains scale to meet projected demand without ecological harm?',
      'What happens in sectors that are difficult to decarbonize through electrification alone?',
      'How are transition costs distributed across different consumer income brackets?'
    ],
    comparison: {
      mainFocus: 'Accelerating clean technology cost parity and private capital deployment',
      keyConcern: 'Slow technology adoption, supply chain bottlenecks, and capital misallocation',
      evidenceEmphasized: 'LCOE cost curves, battery manufacturing volumes, and investment capital flows',
      questionsRaised: 'How can clean technology be scaled to outcompete carbon-intensive options on cost and performance?'
    },
    colorVar: 'var(--perspective-industry)',
    bgVar: 'var(--perspective-industry-bg)'
  },
  {
    id: 'climate-justice-grassroots-action',
    topicId: 'climate-change',
    name: 'Climate Justice & Grassroots Action',
    inquiryPrompt: 'How might frontline communities, grassroots organizers, and environmental advocates approach this question?',
    shortDescription: 'Focuses on equity, localized community impacts, indigenous sovereignty, and direct adaptation support.',
    whyItMatters: 'Ensures the voices of those most vulnerable to environmental disruptions and transition costs are heard.',
    overviewParagraphs: [
      'The Climate Justice and Grassroots Action perspective prioritizes the human, social, and equity dimensions of climate change. It emphasizes that the impacts of environmental disruption—such as urban heat islands, storm surges, and toxic industrial runoff—are disproportionately borne by low-income and marginalized communities.',
      'Advocates call for direct funding for local community adaptation, indigenous land stewardship rights, democratic community-owned energy microgrids, and protections against environmental racism in infrastructure siting.',
      'This perspective cautions that a purely market-driven transition may replicate existing economic inequities if local communities lack decision-making power and direct ownership of new infrastructure.'
    ],
    keyThemes: [
      'Environmental equity and front-line community protection',
      'Direct adaptation grant access without bureaucratic dilution',
      'Community-owned decentralized renewable infrastructure',
      'Indigenous sovereignty and localized ecological stewardship'
    ],
    assumptions: [
      'Climate solutions must address social and economic inequality to be genuinely sustainable and just.',
      'Frontline communities have essential localized knowledge that centralized planners often overlook.',
      'Decentralized community ownership builds greater resilience than purely corporate energy monopolies.'
    ],
    criticalQuestions: [
      'How can climate adaptation funds be disbursed directly to affected communities with minimal administrative overhead?',
      'What safeguards ensure clean energy infrastructure does not displace vulnerable populations?',
      'How do community microgrids perform during severe climate emergencies compared to centralized grids?'
    ],
    comparison: {
      mainFocus: 'Protecting vulnerable communities, rectifying historical inequities, and local empowerment',
      keyConcern: 'Climate impacts disproportionately burdening marginalized populations without democratic input',
      evidenceEmphasized: 'Urban heat mapping, community health surveys, and local adaptation case studies',
      questionsRaised: 'How do we ensure the transition is fair, inclusive, and directly beneficial to frontline populations?'
    },
    colorVar: 'var(--perspective-community)',
    bgVar: 'var(--perspective-community-bg)'
  },
  {
    id: 'regulatory-carbon-policy',
    topicId: 'climate-change',
    name: 'Regulatory & Carbon Policy',
    inquiryPrompt: 'How might international negotiators, carbon economists, and policy architects approach this question?',
    shortDescription: 'Focuses on carbon pricing, emission standards, international accords, and statutory compliance.',
    whyItMatters: 'Examines the policy architectures and regulatory rules that establish global climate baselines.',
    overviewParagraphs: [
      'The Regulatory and Carbon Policy perspective approaches climate action through structural legal frameworks, carbon border adjustment mechanisms, emissions caps, and international treaty obligations.',
      'Proponents argue that market prices currently fail to internalize the true social cost of carbon emissions, requiring clear statutory rules, mandatory disclosures, and pollution limits to correct this market failure.',
      'Policy instruments include carbon trading systems, clean fuel mandates, appliance efficiency standards, and multilateral climate agreements that align nation-state incentives.'
    ],
    keyThemes: [
      'Internalizing carbon externalities through policy and pricing',
      'Cross-border adjustment mechanisms and trade standards',
      'Mandatory corporate emissions disclosures and audits',
      'Binding multilateral treaties and emission reduction targets'
    ],
    assumptions: [
      'Clear, predictable statutory targets and pricing signals guide private sector investments most effectively.',
      'International coordination and trade standards prevent carbon leakage and regulatory evasion.',
      'Mandatory transparency creates accountability for large industrial emitters.'
    ],
    criticalQuestions: [
      'How can carbon border taxes be designed without unfairly penalizing developing economies?',
      'What policy designs prevent carbon pricing from becoming a regressive burden on low-income households?',
      'How do regulatory mandates interact with volatile commodity cycles?'
    ],
    comparison: {
      mainFocus: 'Establishing enforceable emission standards, carbon pricing, and international treaty baselines',
      keyConcern: 'Unpriced externalities, regulatory loopholes, and lack of binding accountability',
      evidenceEmphasized: 'Emissions trading market data, compliance registries, and policy cost-benefit studies',
      questionsRaised: 'What institutional rules and economic signals most effectively reduce emissions across entire economies?'
    },
    colorVar: 'var(--perspective-civic)',
    bgVar: 'var(--perspective-civic-bg)'
  },
  {
    id: 'economic-transition-energy-reliability',
    topicId: 'climate-change',
    name: 'Economic Transition & Energy Reliability',
    inquiryPrompt: 'How might grid reliability operators, consumer advocates, and energy economists approach this question?',
    shortDescription: 'Focuses on electrical grid stability, baseload capacity, ratepayer affordability, and manageable transition pacing.',
    whyItMatters: 'Addresses real-world constraints around energy security, winter peak demand, and household utility bills.',
    overviewParagraphs: [
      'The Economic Transition and Energy Reliability perspective centers on the engineering reality of maintaining a 24/7 dependable power grid while managing the pace and costs of infrastructure replacement.',
      'Grid engineers and consumer economists highlight the necessity of firm, dispatchable capacity to prevent blackouts during prolonged weather anomalies when wind and solar output drops. They also emphasize the staggering capital costs of upgrading distribution transmission lines.',
      'This viewpoint argues for balanced, pragmatically paced transitions that protect low- and fixed-income households from sudden rate spikes while ensuring national energy security.'
    ],
    keyThemes: [
      '24/7 electrical grid reliability and firm dispatchable capacity',
      'Ratepayer protection and household utility affordability',
      'Transmission infrastructure upgrade capital costs',
      'Pragmatic pacing of asset retirement and replacement'
    ],
    assumptions: [
      'Grid reliability and energy affordability are essential prerequisites for public support of long-term decarbonization.',
      'Premature retirement of dispatchable baseload without proven storage alternatives risks grid failure.',
      'Infrastructure modernization costs must be carefully managed to prevent regressive consumer bill shocks.'
    ],
    criticalQuestions: [
      'What is the optimal mix of dispatchable baseload and battery storage for multi-day weather disruptions?',
      'How can low-income ratepayers be insulated from high transmission modernization expenses?',
      'What are the measurable economic impacts of industrial electricity price volatility?'
    ],
    comparison: {
      mainFocus: 'Ensuring grid stability, firm baseload capacity, and affordable consumer utility rates',
      keyConcern: 'Grid instability, blackout risks during extreme weather, and sharp consumer rate hikes',
      evidenceEmphasized: 'Grid dispatch logs, reserve margin calculations, and ratepayer survey data',
      questionsRaised: 'How do we maintain reliable, affordable power around the clock as the energy system transforms?'
    },
    colorVar: 'var(--perspective-academic)',
    bgVar: 'var(--perspective-academic-bg)'
  },

  // =========================================================================
  // TOPIC 3: SOCIAL MEDIA & MENTAL HEALTH (social-media-mental-health)
  // =========================================================================
  {
    id: 'youth-vulnerability-screen-risk',
    topicId: 'social-media-mental-health',
    name: 'Youth Vulnerability & Screen Risk',
    inquiryPrompt: 'How might developmental psychologists, pediatricians, and concerned educators approach this question?',
    shortDescription: 'Focuses on circadian disruption, upward social comparison, addictive feedback loops, and teen mental health.',
    whyItMatters: 'Explores the developmental vulnerabilities of adolescents whose neurobiology is still forming.',
    overviewParagraphs: [
      'The Youth Vulnerability and Screen Risk perspective examines the developmental, psychological, and physiological consequences of pervasive social platform usage on children and adolescents.',
      'Clinical researchers focus on the intersection of variable dopamine reward loops, night-time blue light exposure disrupting critical REM sleep, and constant exposure to curated highlight reels that amplify upward social comparison and body dissatisfaction.',
      'Advocates and pediatricians in this sphere recommend age-appropriate device onboarding, phone-free school environments, and structural limits on late-night algorithmic push notifications.'
    ],
    keyThemes: [
      'Circadian sleep rhythm and REM disruption',
      'Upward social comparison and body image pressures',
      'Variable dopamine reinforcement loops',
      'Phone-free school environments and pediatric guidelines'
    ],
    assumptions: [
      'Adolescent brains undergo unique neurodevelopmental vulnerability to peer validation and intermittent rewards.',
      'Sleep deprivation caused by late-night notifications is a primary mediator of anxiety and depressive symptoms.',
      'Institutional boundaries (e.g. school phone bans) create beneficial breathing room for healthy socialization.'
    ],
    criticalQuestions: [
      'To what extent is screen time itself the causal variable versus specific algorithmic feed behaviors or sleep displacement?',
      'What longitudinal data separates temporary adolescent angst from clinical depressive disorders related to social media?',
      'Which school device policies produce the most measurable improvements in focus and wellbeing?'
    ],
    comparison: {
      mainFocus: 'Protecting adolescent neurodevelopment, sleep quality, and emotional wellbeing',
      keyConcern: 'Escalating anxiety, depression, sleep deprivation, and compulsive usage loops among youth',
      evidenceEmphasized: 'Neuro-imaging sleep studies, clinical psychological surveys, and pediatric guidelines',
      questionsRaised: 'How does continuous algorithmic exposure affect forming brains, and what boundaries are needed?'
    },
    colorVar: 'var(--perspective-academic)',
    bgVar: 'var(--perspective-academic-bg)'
  },
  {
    id: 'community-connection-empowerment',
    topicId: 'social-media-mental-health',
    name: 'Community Connection & Empowerment',
    inquiryPrompt: 'How might community organizers, affinity group members, and digital creators approach this question?',
    shortDescription: 'Emphasizes peer support networks, civic mobilization, creative collaboration, and combating isolation.',
    whyItMatters: 'Highlights the vital positive role online communities play for marginalized or geographically isolated individuals.',
    overviewParagraphs: [
      'The Community Connection and Empowerment perspective emphasizes the transformative social utility of digital networks for fostering belonging, collective action, and peer support.',
      'For individuals with rare medical conditions, geographically isolated youth, or members of niche creative communities, online spaces provide peer validation, mutual aid, and shared wisdom that may not exist in their physical vicinity.',
      'This viewpoint also highlights how digital networks enable grassroots civic organizing, collaborative learning, and creative entrepreneurship outside traditional institutional gatekeepers.'
    ],
    keyThemes: [
      'Peer support for rare conditions and marginalized groups',
      'Civic mobilization and decentralized community organizing',
      'Niche affinity spaces and creative collaboration',
      'Reducing geographical and social isolation'
    ],
    assumptions: [
      'Social connection is a fundamental human need, and digital tools provide access to communities otherwise out of reach.',
      'The positive or negative impact of social media depends largely on the nature of the community and active engagement versus passive scrolling.',
      'Blanket restrictions risk severing vital support lifelines for vulnerable populations.'
    ],
    criticalQuestions: [
      'How do active community participation and mutual support differ in mental health outcomes compared to passive feed browsing?',
      'What design features help online communities maintain constructive, safe norms without corporate overreach?',
      'What evidence exists regarding loneliness reduction through targeted digital affinity groups?'
    ],
    comparison: {
      mainFocus: 'Fostering peer support, reducing isolation, and enabling grassroots collaboration',
      keyConcern: 'Disproportionate bans cutting off vital community support networks and creative expression',
      evidenceEmphasized: 'Support group survey data, civic organizing case studies, and qualitative user testimonies',
      questionsRaised: 'How can platforms be leveraged to create genuine connection, mutual support, and empowerment?'
    },
    colorVar: 'var(--perspective-community)',
    bgVar: 'var(--perspective-community-bg)'
  },
  {
    id: 'algorithmic-transparency-platform-reform',
    topicId: 'social-media-mental-health',
    name: 'Algorithmic Transparency & Platform Reform',
    inquiryPrompt: 'How might HCI researchers, privacy advocates, and platform governance experts approach this question?',
    shortDescription: 'Focuses on algorithmic choice, dark UX patterns, engagement maximization incentives, and platform accountability.',
    whyItMatters: 'Addresses the systemic business models and algorithmic architectures that shape user behavior.',
    overviewParagraphs: [
      'The Algorithmic Transparency and Platform Reform perspective focuses on the structural incentives and technical architectures of ad-funded social platforms. Rather than viewing mental health as solely an individual user responsibility, it examines the business model of maximizing engagement.',
      'Experts in this field audit dark design patterns—such as infinite scroll, intrusive push alerts, and friction-filled account deletion flows—designed to prolong screen time. They advocate for structural changes such as open algorithmic choice and chronological feeds.',
      'Proposals include mandatory third-party research access to platform data, algorithmic impact assessments, and liability frameworks for design choices known to harm minors.'
    ],
    keyThemes: [
      'Algorithmic choice and chronological feed alternatives',
      'Auditing dark UX patterns and friction loops',
      'Aligning platform business models with user wellbeing',
      'Independent researcher access and algorithmic transparency'
    ],
    assumptions: [
      'Ad-driven business models naturally optimize for sensationalism and outrage without external structural guardrails.',
      'Users should have sovereign control over how content is recommended to them.',
      'Design architectures, not user willpower alone, are the root determinant of digital wellbeing.'
    ],
    criticalQuestions: [
      'What happens to user retention and well-being when platforms introduce chronological feed options?',
      'How can independent researchers audit recommendation algorithms without compromising user privacy?',
      'What statutory definitions of "dark design patterns" are legally enforceable?'
    ],
    comparison: {
      mainFocus: 'Reforming platform architectures, auditing dark patterns, and enabling algorithmic choice',
      keyConcern: 'Engagement-maximizing algorithms that prioritize attention capture over human wellbeing',
      evidenceEmphasized: 'UX design audits, platform source code analyses, and behavioral economics research',
      questionsRaised: 'What structural rules and architectural reforms are needed to align platforms with user health?'
    },
    colorVar: 'var(--perspective-civic)',
    bgVar: 'var(--perspective-civic-bg)'
  },
  {
    id: 'digital-literacy-individual-agency',
    topicId: 'social-media-mental-health',
    name: 'Digital Literacy & Individual Agency',
    inquiryPrompt: 'How might family media educators, behavioral psychologists, and mindfulness practitioners approach this question?',
    shortDescription: 'Emphasizes practical habits, intentional media diets, collaborative family agreements, and personal agency.',
    whyItMatters: 'Equips individuals and families with actionable strategies and habits to maintain autonomy in digital environments.',
    overviewParagraphs: [
      'The Digital Literacy and Individual Agency perspective emphasizes human self-determination, mindful media consumption, and practical habit formation. While acknowledging platform design pressures, this approach asserts that individuals, parents, and educators have meaningful agency to shape their relationship with technology.',
      'Key recommendations focus on practical digital hygiene: establishing physical boundaries (such as phone-free bedrooms), using display tools like grayscale mode to dampen sensory stimulation, and co-creating family tech agreements based on mutual trust rather than covert surveillance.',
      'Media literacy education teaches users to recognize cognitive biases, emotional triggers, and algorithmic curation, transforming passive consumers into active, critical curators of their own digital environments.'
    ],
    keyThemes: [
      'Actionable digital hygiene boundaries and physical habits',
      'Collaborative household agreements over punitive bans',
      'Critical media literacy and bias recognition skills',
      'Cultivating intentional attention and digital mindfulness'
    ],
    assumptions: [
      'Individuals and families can build healthy digital boundaries when provided with practical frameworks and metacognitive skills.',
      'Collaborative household agreements build long-term self-regulation more effectively than punitive technical bans.',
      'Digital literacy is a lifelong civic and psychological capability.'
    ],
    criticalQuestions: [
      'Which specific digital hygiene interventions show the highest adherence and measurable wellbeing improvements over 6+ months?',
      'How does critical media literacy training in school curricula impact student scrolling habits?',
      'What role does parental modeling play in adolescent device self-regulation?'
    ],
    comparison: {
      mainFocus: 'Empowering individuals and families with practical habits, intentionality, and media literacy',
      keyConcern: 'Helplessness or fatalism that treats technology as uncontrollable, undermining personal agency',
      evidenceEmphasized: 'Behavioral habit studies, family intervention trials, and media literacy curriculum evaluations',
      questionsRaised: 'What practical habits, mental models, and agreements help people navigate digital media with autonomy?'
    },
    colorVar: 'var(--perspective-workforce)',
    bgVar: 'var(--perspective-workforce-bg)'
  }
] as const;
