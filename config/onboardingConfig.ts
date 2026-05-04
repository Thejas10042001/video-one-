import { OnboardingStep } from '../types/onboarding';

export const USER_JOURNEY_STEPS: OnboardingStep[] = [
  {
    id: 'journey-1',
    target: '#auth-card',
    text: 'Welcome to SPIKED AI. Your journey begins here. Sign up or Sign in using your Google account or the provided credentials to enter the Neural Intelligence Protocol.',
    action: 'none',
    hero: { expression: 'happy', gesture: 'hand-wave', position: 'right' }
  },
  {
    id: 'journey-2',
    target: '#tour-tab-library',
    text: 'Once inside, navigate to the Cognitive Library Hub. This is where you ingest the documentary intelligence that will power your simulations.',
    action: 'click',
    hero: { expression: 'serious', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-3',
    target: '#documentary-memory-store',
    text: 'In the Documentary Memory Store, you can upload key deal documents. Drag and drop your files directly here to sync them with our cloud memory.',
    action: 'none',
    hero: { expression: 'neutral', gesture: 'hand-wave', position: 'bottom' }
  },
  {
    id: 'journey-4',
    target: '#tour-add-folder-btn',
    text: 'Need organization? Click the + icon to create new main or sub-folders. This helps segment your intelligence for different deal stages.',
    action: 'none',
    hero: { expression: 'happy', gesture: 'point', position: 'left' }
  },
  {
    id: 'journey-5',
    target: '#tour-folder-item-0',
    text: 'Manage your files with ease. Click a folder to view its contents, or drag and drop documents between folders to relocate them.',
    action: 'none',
    hero: { expression: 'neutral', gesture: 'hand-wave', position: 'right' }
  },
  {
    id: 'journey-6',
    target: '#tour-doc-view-btn',
    text: 'Use the magnifier icon to preview any document. You can verify the extracted content and ensure accuracy before proceeding.',
    action: 'none',
    hero: { expression: 'thinking', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-7',
    target: '#tour-doc-edit-btn',
    text: 'If the data needs refinement, click Edit. You can manually adjust the content to calibrate the LLM\'s understanding.',
    action: 'none',
    hero: { expression: 'serious', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-8',
    target: '#tour-tab-core',
    text: 'Next, move to the Mind Core. Here you select your KYC (Know Your Customer) document to automatically populate deal metadata.',
    action: 'click',
    hero: { expression: 'happy', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-9',
    target: '#tour-tab-persona',
    text: 'Calibrate the Target Buyer Persona. Select the psychological profile of your primary decision-maker to adjust the simulation\'s resistance levels.',
    action: 'click',
    hero: { expression: 'thinking', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-10',
    target: '#tour-tab-vocal',
    text: 'The Neural Vocal Sync allows you to clone an AI vocal signature or even mirror specific behavioral mimicry protocols for realistic dialogue.',
    action: 'click',
    hero: { expression: 'happy', gesture: 'hand-wave', position: 'top' }
  },
  {
    id: 'journey-10-synthesis',
    target: '#tour-synthesize-btn',
    text: 'All parameters are aligned. Click "Synthesize Strategy Core" to initiate the Neural Sales Intelligence Protocol and generate your high-fidelity strategic roadmap.',
    action: 'click',
    hero: { expression: 'happy', gesture: 'point', position: 'bottom' }
  },
  {
    id: 'journey-11',
    target: '#tour-tab-strategy',
    text: 'Enter the Strategy Lab. This is where we synthesize an actionable roadmap, identify information gaps, and develop your competitive wedge.',
    action: 'click',
    hero: { expression: 'serious', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-12',
    target: '#tour-tab-qa',
    text: 'The Assignment node tests your knowledge. Ensure you are fully prepared for the simulation by answering high-stakes strategy questions.',
    action: 'click',
    hero: { expression: 'thinking', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-13',
    target: '#tour-tab-roleplay',
    text: 'Competitive Edge validation. We identify your information gaps and readiness levels before you enter the live simulation.',
    action: 'click',
    hero: { expression: 'serious', gesture: 'hand-wave', position: 'bottom' }
  },
  {
    id: 'journey-14',
    target: '#tour-tab-avatar-staged',
    text: 'The Stage Simulation takes you through the entire sales cycle—from discovery to closing—with realistic roleplay scenarios.',
    action: 'click',
    hero: { expression: 'happy', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-15',
    target: '#tour-tab-avatar',
    text: 'Avatar 1.0: Engage in real-time dialogue with a specific persona, like a CIO, grounded in your documentary intelligence.',
    action: 'click',
    hero: { expression: 'neutral', gesture: 'hand-wave', position: 'right' }
  },
  {
    id: 'journey-16',
    target: '#tour-tab-avatar2',
    text: 'Avatar 2.0: Level up by switching between multiple personas—CIO, CFO, IT Director—within the same simulation.',
    action: 'click',
    hero: { expression: 'happy', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-17',
    target: '#tour-tab-gpt',
    text: 'Spiked GPT is your grounded answering engine. Ask any strategy question and get responses directly cited from your records.',
    action: 'click',
    hero: { expression: 'thinking', gesture: 'hand-wave', position: 'bottom' }
  },
  {
    id: 'journey-18',
    target: '#tour-tab-practice',
    text: 'Finally, the Grooming Lab. Practice your delivery and receive an elite audit on tone, grammar, and pacing to ensure your verbal architecture is as strong as your strategy.',
    action: 'click',
    hero: { expression: 'happy', gesture: 'point', position: 'right' }
  },
  {
    id: 'journey-finish',
    target: '#tour-tab-practice',
    text: 'You are now ready. Execute the protocol and dominate the deal cycle. Good luck, Architect.',
    action: 'none',
    hero: { expression: 'happy', gesture: 'hand-wave', position: 'top' }
  }
];

export const GLOBAL_TOUR_STEPS: OnboardingStep[] = [
  {
    id: 'step-1',
    target: '#tour-tab-context',
    text: 'Welcome! This is the Settings node where you configure your deal context.',
    action: 'hover',
    position: 'right',
    highlightPadding: 8,
    tooltipOffset: { x: 10, y: 0 },
    onStepStart: () => console.log('Welcome step started'),
    scroll: true,
    scrollBehavior: 'smooth',
    hero: {
      expression: 'happy',
      gesture: 'wave',
      position: 'auto'
    }
  },
  {
    id: 'step-2',
    target: '#tour-tab-strategy',
    text: 'The Strategy Lab synthesizes high-fidelity sales strategies for your deal.',
    action: 'hover',
    position: 'right',
    hero: {
      expression: 'thinking',
      gesture: 'none',
      position: 'auto'
    }
  },
  {
    id: 'step-3',
    target: '#tour-tab-gpt',
    text: 'Spiked GPT: This is your real-time strategic advisor. Query it during your deal preparation to extract winning soundbites, competitive counters, and grounded data points from your library.',
    action: 'hover',
    position: 'right',
    hero: {
      expression: 'explaining',
      gesture: 'point',
      position: 'auto'
    }
  },
  {
    id: 'step-4',
    target: '#tour-tab-roleplay',
    text: 'Roleplay Simulation: The ultimate testing ground. Initiate high-fidelity, voice-enabled simulations with AI personas that mirror your real stakeholder\'s behavior and resistance levels.',
    action: 'hover',
    position: 'right',
    hero: {
      expression: 'celebrating',
      gesture: 'none',
      position: 'auto'
    }
  }
];

export const CONTEXT_FEATURE_STEPS: OnboardingStep[] = [
  {
    id: 'context-1',
    target: '#tour-tab-library',
    text: 'Cognitive Library Hub: This is your high-fidelity knowledge base. Start by managing your documents here.',
    action: 'click',
    position: 'bottom'
  },
  {
    id: 'context-folder-1',
    target: '#tour-add-folder-btn',
    text: 'Click the "+" button to initiate folder creation. You can create Main Folders (parent nodes) or Sub-folders.',
    action: 'click',
    position: 'right'
  },
  {
    id: 'context-folder-2',
    target: '#tour-new-folder-input',
    text: 'Enter a folder name here. Enterprise-grade naming conventions are recommended for structured intelligence.',
    action: 'type',
    value: 'Strategic Deals 2024',
    position: 'right'
  },
  {
    id: 'context-folder-3',
    target: '#tour-create-folder-submit',
    text: 'Persistence: Click "Create" to synchronize this folder with your cloud-based intelligence architecture.',
    action: 'none',
    position: 'right'
  },
  {
    id: 'context-2',
    target: '#documentary-memory-store',
    text: 'Intelligence Ingestion: Drag and drop your deal-specific documents here. Our OCR engine will instantly extract and index the content into your selected folder.',
    action: 'scroll',
    position: 'top'
  },
  {
    id: 'context-view-doc',
    target: '#tour-doc-view-btn',
    text: 'Intelligence Review: Click the magnifying glass to open the Neural Scan Review. Here you can verify extracted content and perform manual overrides in the full editor if necessary.',
    action: 'hover',
    position: 'top'
  },
  {
    id: 'context-copy-doc',
    target: '#tour-doc-copy-btn',
    text: 'Cognitive Duplication: Use the copy icon to instantly create a twin of an intelligence node. This is ideal for branching different deal strategies from a single documentary base.',
    action: 'hover',
    position: 'top'
  },
  {
    id: 'context-delete-doc',
    target: '#tour-doc-delete-btn',
    text: 'Cognitive Pruning: Use the trash icon to permanently remove intelligence nodes that are no longer relevant to your strategic deal synthesis.',
    action: 'hover',
    position: 'top'
  },
  {
    id: 'context-move-folder',
    target: '#tour-folder-item-0',
    text: 'Structural Organization: You can reorganize your intelligence by dragging nodes directly into these folders. Click the folder icon to expand sub-structures or select a specific context.',
    action: 'scroll',
    position: 'right'
  },
  {
    id: 'context-add-folder',
    target: '#tour-add-folder-btn',
    text: 'Knowledge Architecture: Create new main folders or sub-structures here to categorize your infinite deal library.',
    action: 'hover',
    position: 'right'
  },
  {
    id: 'context-synthesis',
    target: '#tour-unified-synthesis',
    text: 'Unified Synthesis: After selecting multiple documents, click here to perform a cross-document analysis. This aggregates intelligence from all sources into a single deal context.',
    action: 'hover',
    position: 'top'
  },
  {
    id: 'context-tab-2',
    target: '#tour-tab-core',
    text: 'Mind Core & Strategy: This is the operational anchor of your simulation. Here you define the specific "Simulation Mindset" and high-level strategy focus. Is this a hard negotiation or a consultative discovery?',
    action: 'click',
    position: 'bottom'
  },
  {
    id: 'context-kyc-select',
    target: '#tour-kyc-select',
    text: 'Cognitive Grounding: Select your uploaded KYC document here. This is the crucial step where the engine reads the document to understand your specific deal parameters.',
    action: 'click',
    position: 'bottom'
  },
  {
    id: 'context-auto-populate',
    target: '#tour-seller-company',
    text: 'Neural Extraction: Notice how the Seller Company and other details are instantaneously populated! The AI has parsed your KYC document to extract the core identifying data automatically.',
    action: 'hover',
    position: 'top'
  },
  {
    id: 'context-meeting-focus',
    target: '#tour-meeting-focus',
    text: 'Strategic Focus: The primary objective of the meeting is also synthesized from your documents. You can manually refine this to sharpen the AI\'s focus for the specific roleplay scenario.',
    action: 'scroll',
    position: 'bottom'
  },
  {
    id: 'context-tab-3',
    target: '#tour-tab-persona',
    text: 'Buyer Persona Intelligence: Deep-dive into the mindset of your target stakeholder. Define their psychological triggers and decision-making criteria. This ensures the simulator mirrors the exact behavior of your stakeholder.',
    action: 'click',
    position: 'bottom'
  },
  {
    id: 'persona-traits',
    target: '#tour-persona-btn-0',
    text: 'Neural Persona Mapping: Use these 4 profiles to calibrate the resistance and logical framework of your simulation. Balanced for general users, Technical for engineers, Financial for CFOs, or Executives for high-level strategy.',
    action: 'hover',
    position: 'top'
  },
  {
    id: 'context-tab-4',
    target: '#tour-tab-vocal',
    text: 'Vocal Sync & Verification: Verify that all intelligence parameters (Library, Core, and Persona) are perfectly synchronized. Once this dashboard confirms alignment, you are ready to initiate the simulation.',
    action: 'click',
    position: 'bottom'
  },
  {
    id: 'vocal-mode-ai',
    target: '#tour-vocal-mode-persona',
    text: 'Neural Voice AI: Select from our library of professional AI personas. These voices are calibrated for steady, authoritative, or high-energy business interactions.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'vocal-mode-personality',
    target: '#tour-vocal-mode-personality',
    text: 'Public Personalities: Mirror the vocal signatures behind tech giants like visionaries or industry disruptors for high-fidelity mirroring in your practice rounds.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'vocal-mode-upload',
    target: '#tour-vocal-mode-upload',
    text: 'Manual Calibration: Fine-tune the Pace, Stability, and Pitch. You can even input a specific behavioral directive to custom-calibrate the simulation logic.',
    action: 'hover',
    position: 'bottom'
  }
];

export const STRATEGY_STEPS: OnboardingStep[] = [
  {
    id: 'strategy-1',
    target: '#strategy-lab-header',
    text: 'Strategy Laboratory: This is where you formulate your tactical approach. You can generate cognitive projections and strategic scripts based on your ingested intelligence.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'strategy-2',
    target: '#tour-strategy-generate',
    text: 'Strategic Generation: Click this to generate unique deal angles, rebuttal scripts, and psychological triggers tailored to your specific meeting context.',
    action: 'hover',
    position: 'top'
  }
];

export const ASSIGNMENT_STEPS: OnboardingStep[] = [
  {
    id: 'assignment-1',
    target: '#persona-lab-header',
    text: 'Assessment Lab (Assignment Node): This is your cognitive testing ground. Here you can pressure-test your knowledge of the deal documents before entering a live simulation.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'assignment-2',
    target: '#tour-initiate-btn',
    text: 'Initiate Assignment: Generate a custom neural assignment based on your documentary intelligence. You can choose different difficulty levels and perspectives.',
    action: 'hover',
    position: 'top'
  }
];

export const GPT_STEPS: OnboardingStep[] = [
  {
    id: 'gpt-1',
    target: '#gpt-header-core',
    text: 'Spiked GPT: Your real-time strategic advisor. Use this to pull direct answers from your documentary library using grounded AI logic.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'gpt-2',
    target: '#tour-gpt-query',
    text: 'Neural Query: Type your questions here to extract specific competitive counters or data points from your intelligence nodes.',
    action: 'hover',
    position: 'top'
  }
];

export const ROLEPLAY_STEPS: OnboardingStep[] = [
  {
    id: 'roleplay-1',
    target: '#roleplay-header-core',
    text: 'Roleplay Simulation: The execution phase. Test your strategies in a high-fidelity vocal simulation with the AI stakeholder.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'roleplay-2',
    target: '#tour-roleplay-start',
    text: 'Initiate Session: Start the high-pressure simulation here. The AI will use all previously defined parameters (Library, Persona, Strategy) to mirror real-world behavior.',
    action: 'hover',
    position: 'top'
  }
];

export const SEARCH_STEPS: OnboardingStep[] = [
  {
    id: 'search-1',
    target: '#cognitive-search-header',
    text: 'Cognitive Answering Hub: Extract verified intelligence from your documentary core. This node is optimized for finding specific facts and figures.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'search-2',
    target: '#tour-search-analyze',
    text: 'Analyze Query: Type your question here. The engine will perform a high-fidelity scan across all active documents to find the definitive answer.',
    action: 'hover',
    position: 'top'
  }
];

export const AVATAR1_STEPS: OnboardingStep[] = [
  {
    id: 'avatar1-1',
    target: '#avatar1-header',
    text: 'Avatar Simulation 1.0: Our baseline high-fidelity vocal environment. Practice real-time interactions with cognitive grounding from your deal documents.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'avatar1-2',
    target: '#avatar1-start-btn',
    text: 'Initiate Simulation: Click here to start the session. Our AI will analyze your voice, sentiment, and biometric markers in real-time as you interact.',
    action: 'hover',
    position: 'top'
  }
];

export const AVATAR2_STEPS: OnboardingStep[] = [
  {
    id: 'avatar2-1',
    target: '#avatar2-header',
    text: 'Avatar Simulation 2.0: The next-generation neural environment. This version features advanced persona mapping and micro-expression calibration for ultra-realistic deal practice.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'avatar2-2',
    target: '#avatar2-persona-CIO',
    text: 'Persona Selection: Choose your target stakeholder. Each persona (CIO, CFO, IT Director) responds with unique logical frameworks and resistance levels based on their role.',
    action: 'hover',
    position: 'top'
  }
];

export const STAGED_STEPS: OnboardingStep[] = [
  {
    id: 'staged-1',
    target: '#staged-header',
    text: 'Staged Simulation: This hub allows you to master specific sales stages independently. You can navigate through the 6 tactical stages to refine your situational reflexes.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'staged-2',
    target: '#staged-persona-btn-0',
    text: 'Initiate Stage: Select a stage node to commence the targeted simulation. This is the ideal way to focus on specific deal hurdles like pricing or legal.',
    action: 'hover',
    position: 'top'
  }
];

export const PRACTICE_STEPS: OnboardingStep[] = [
  {
    id: 'practice-1',
    target: '#practice-header',
    text: 'Grooming Lab: This is your verbal architecture node. Use this to practice your delivery and receive an elite audit on tone, grammar, and pacing.',
    action: 'hover',
    position: 'bottom'
  },
  {
    id: 'practice-2',
    target: '#tour-commence-btn',
    text: 'Initiate Grooming: Start your verbal interaction here. Our AI auditor will analyze your delivery in real-time and provide actionable logic for mastery.',
    action: 'hover',
    position: 'top'
  }
];
