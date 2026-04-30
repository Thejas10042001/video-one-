export type OnboardingAction = 'click' | 'hover' | 'type' | 'scroll' | 'none';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface TooltipOffset {
  x: number;
  y: number;
}

export interface OnboardingStep {
  /** Uniquely identifies the step */
  id: string;
  
  /** CSS selector for the target element */
  target: string;
  
  /** Tooltip message content */
  text: string;
  
  /** Action to simulate when this step is reached */
  action: OnboardingAction;
  
  /** Value to insert if action is 'type' */
  value?: string;
  
  /** Whether to scroll the target into view */
  scroll?: boolean;
  
  /** Scrolling behavior (defaults to 'smooth') */
  scrollBehavior?: 'smooth' | 'auto';
  
  /** Positioning of the tooltip relative to target */
  position?: TooltipPosition;
  
  /** Fine-tuning the tooltip coordinates */
  tooltipOffset?: TooltipOffset;
  
  /** Padding around the highlighted element hole */
  highlightPadding?: number;

  /** Optional callback to execute when step starts */
  onStepStart?: () => void;
  
  /** Optional callback to execute when step completes */
  onStepEnd?: () => void;
}

export type OnboardingMode = 'global' | 'contextual' | 'strategy' | 'persona' | 'gpt' | 'roleplay' | 'search' | 'avatar1' | 'avatar2' | 'staged' | 'practice' | null;
