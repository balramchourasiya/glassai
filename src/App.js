
import React, { useState, useEffect, useRef } from 'react';

// --- Icon Components (Self-contained SVG) ---
const SearchIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

const StarIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const BellIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
  </svg>
);

const SlidersIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="4" y1="21" y2="14"></line>
    <line x1="4" x2="4" y1="10" y2="3"></line>
    <line x1="12" x2="12" y1="21" y2="12"></line>
    <line x1="12" x2="12" y1="8" y2="3"></line>
    <line x1="20" x2="20" y1="21" y2="16"></line>
    <line x1="20" x2="20" y1="12" y2="3"></line>
    <line x1="1" y1="14" x2="7" y2="14"></line>
    <line x1="9" y1="8" x2="15" y2="8"></line>
    <line x1="17" y1="16" x2="23" y2="16"></line>
  </svg>
);

const BarChart3Icon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

const EditIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
    <path d="m15 5 4 4"></path>
  </svg>
);

const ScaleIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m16 16.5-1.5-1.5 5.5-5.5"></path>
    <path d="m13 13-1.5 1.5-5.5-5.5"></path>
    <path d="M2 13 8 7l6 6"></path>
    <path d="M18 19c-.83-.64-2-1.2-3.8-1.2h-2.4C9.2 17.8 8.03 18.36 7.2 19"></path>
    <path d="M18 19 8 7"></path>
    <path d="m7 16-1.5-1.5 5.5-5.5"></path>
  </svg>
);

const GaugeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 14 4-4"></path>
    <path d="M3.34 19.16a7 7 0 0 1 17.32 0"></path>
    <path d="M12 12a4 4 0 0 0 0 8"></path>
    <path d="M12 2v6"></path>
  </svg>
);

const MapPinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 16.65a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
    <path d="M21 10c0 7-9 11-9 11s-9-4-9-11a9 9 0 0 1 18 0Z"></path>
  </svg>
);

const SparklesIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.82 2.22c.27-.66 1.4-.66 1.67 0l2.22 5.37c.18.44.59.73 1.05.73l5.65.45c.67.05.94.83.47 1.25l-4.32 3.78c-.35.31-.51.76-.42 1.21l1.24 5.35c.14.63-.53 1.14-1.09.85l-4.88-2.88c-.42-.25-.92-.25-1.34 0l-4.88 2.88c-.56.29-1.23-.22-1.09-.85l1.24-5.35c.09-.45-.07-.9-.42-1.21L2.22 10.1c-.47-.42-.2-1.2.47-1.25l5.65-.45c.46 0 .87-.29 1.05-.73Z"></path>
  </svg>
);

const FolderIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5V21a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5"></path>
    <path d="M21 15H3"></path>
    <path d="M15 6 9 12h8l-6 6"></path>
  </svg>
);

const CheckIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const LayoutDashboardIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const ZapIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const ImportIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 21V3h12l4 4v14H2Z"></path>
    <path d="M16 12h-4"></path>
    <path d="M14 10v4"></path>
  </svg>
);

const ChevronDownIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

const PencilIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
    <path d="m15 5 4 4"></path>
  </svg>
);

const TabletIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
    <line x1="12" y1="18" y2="20"></line>
  </svg>
);

const MultipleChoiceIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path>
  </svg>
);

const OpenEndedIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"></path>
    <path d="M12 21a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4Z"></path>
    <line x1="8" y1="15" x2="16" y2="15"></line>
    <line x1="8" y1="11" x2="16" y2="11"></line>
  </svg>
);

const RankingIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="10" y1="13" x2="21" y2="3"></line>
    <line x1="12" y1="18" x2="18" y2="12"></line>
    <line x1="15" y1="21" x2="21" y2="15"></line>
    <path d="M12 12 6 6"></path>
    <path d="M6 18H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2"></path>
    <path d="M12 6h.01"></path>
    <path d="M6 12h.01"></path>
  </svg>
);

const GuessTheNumberIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
    <path d="M10 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    <path d="M18 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    <path d="M12 18s-2-2-4-2-4 2-4 2" />
  </svg>
);

const Grid2x2Icon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="12" y1="3" x2="12" y2="21"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
  </svg>
);

const PinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a8 8 0 0 1 8 8c0 7.3-8 12-8 12s-8-4.7-8-12a8 8 0 0 1 8-8Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const SelectAnswerIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12h20"></path>
    <path d="M12 2v20"></path>
    <circle cx="12" cy="12" r="8"></circle>
  </svg>
);

const TypeAnswerIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
    <path d="M12 16v-4a2 2 0 0 0-2-2h-2"></path>
    <path d="M12 10v-4a2 2 0 0 1 2-2h2"></path>
    <line x1="12" y1="16" x2="12" y2="20"></line>
    <line x1="12" y1="10" x2="12" y2="4"></line>
  </svg>
);

const TextIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"></path>
    <line x1="7" y1="11" x2="17" y2="11"></line>
    <line x1="7" y1="15" x2="15" y2="15"></line>
    <line x1="7" y1="7" x2="17" y2="7"></line>
  </svg>
);

const ImageContentIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
    <path d="M12 16v-4a2 2 0 0 0-2-2h-2"></path>
    <path d="M12 10v-4a2 2 0 0 1 2-2h2"></path>
    <line x1="12" y1="16" x2="12" y2="20"></line>
    <line x1="12" y1="10" x2="12" y2="4"></line>
  </svg>
);

const VideoIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h18Z"></path>
    <path d="m10 8 6 4-6 4V8Z"></path>
  </svg>
);

const InstructionsIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const LeftArrowIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6"></path>
  </svg>
);

const PlusIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path>
    <path d="M12 5v14"></path>
  </svg>
);

const ShareIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" x2="12" y1="2" y2="15"></line>
  </svg>
);

const PresentationIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3h18v14H3z"></path>
    <path d="M7 21h10"></path>
    <path d="M12 17v4"></path>
  </svg>
);

const QuizIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
    <path d="m15 5 4 4"></path>
    <path d="M12 18v-6a2 2 0 0 0-2-2H4"></path>
  </svg>
);

const SurveyIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
    <line x1="8" y1="7" x2="16" y2="7"></line>
    <line x1="8" y1="11" x2="16" y2="11"></line>
  </svg>
);

const HundredPointsIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
    <path d="M12 16v-4a2 2 0 0 0-2-2h-2"></path>
    <path d="M12 10v-4a2 2 0 0 1 2-2h2"></path>
    <line x1="12" y1="16" x2="12" y2="20"></line>
    <line x1="12" y1="10" x2="12" y2="4"></line>
  </svg>
);

const QnaIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
    <path d="M12 16v-4a2 2 0 0 0-2-2h-2"></path>
    <path d="M12 10v-4a2 2 0 0 1 2-2h2"></path>
    <line x1="12" y1="16" x2="12" y2="20"></line>
    <line x1="12" y1="10" x2="12" y2="4"></line>
  </svg>
);

const QuickFormIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="8" y1="13" x2="16" y2="13"></line>
    <line x1="8" y1="17" x2="16" y2="17"></line>
  </svg>
);

const PinOnImageIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a8 8 0 0 1 8 8c0 7.3-8 12-8 12s-8-4.7-8-12a8 8 0 0 1 8-8Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const GoogleSlidesIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path>
    <path d="M9 10h6"></path>
    <path d="M9 14h6"></path>
    <path d="M9 18h6"></path>
    <path d="M12 6h.01"></path>
  </svg>
);

const PowerpointIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="8" y1="13" x2="16" y2="13"></line>
    <line x1="8" y1="17" x2="16" y2="17"></line>
  </svg>
);

const MiroIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"></path>
    <path d="M12 7v10"></path>
    <path d="M17 12H7"></path>
  </svg>
);

const CloseIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const DownloadIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);


// --- Main App Component ---
const App = () => {
  const [activeFeature, setActiveFeature] = useState('dashboard');
  const [newMentiDropdownOpen, setNewMentiDropdownOpen] = useState(false);
  const [wordCloudWords, setWordCloudWords] = useState({});
  const [newWord, setNewWord] = useState('');
  const wordCloudRef = useRef(null);
  const colors = ["#EF4444", "#3B82F6", "#22C55E", "#F97316", "#A855F7", "#EC4899", "#14B8A6"];
  const newMentiDropdownRef = useRef(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const maxCount = Object.values(wordCloudWords).reduce((max, { count }) => Math.max(max, count), 1);
  const getFontSize = (count) => 16 + (count / maxCount) * 48;

  useEffect(() => {
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    return () => {
      document.head.removeChild(tailwindScript);
    };
  }, []);

  useEffect(() => {
    if (activeFeature === 'word-cloud' && wordCloudRef.current) {
      const parentWidth = wordCloudRef.current.offsetWidth;
      const parentHeight = wordCloudRef.current.offsetHeight;
      const wordElements = wordCloudRef.current.querySelectorAll('.word-cloud-word');

      wordElements.forEach(wordEl => {
        const x = Math.random() * (parentWidth - wordEl.offsetWidth);
        const y = Math.random() * (parentHeight - wordEl.offsetHeight);
        wordEl.style.left = `${x}px`;
        wordEl.style.top = `${y}px`;
      });
    }
  }, [wordCloudWords, activeFeature]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newMentiDropdownRef.current && !newMentiDropdownRef.current.contains(event.target)) {
        setNewMentiDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNewMentiClick = () => {
    setNewMentiDropdownOpen(!newMentiDropdownOpen);
  };
  
  const handleNewQuizClick = () => {
    setNewMentiDropdownOpen(false);
    setActiveFeature('new-presentation-options');
  };
  
  const handleNewSurveyClick = () => {
    setNewMentiDropdownOpen(false);
    setActiveFeature('new-presentation-options');
  };

  const handleWordSubmit = (e) => {
    e.preventDefault();
    if (newWord.trim() !== '') {
      const newWords = newWord.split(' ').filter(w => w.trim() !== '');
      setWordCloudWords(prevWords => {
        const updatedWords = { ...prevWords };
        newWords.forEach(word => {
          const lowerCaseWord = word.toLowerCase();
          if (updatedWords[lowerCaseWord]) {
            updatedWords[lowerCaseWord].count += 1;
          } else {
            updatedWords[lowerCaseWord] = {
              count: 1,
              color: updatedWords[lowerCaseWord]?.color || colors[Math.floor(Math.random() * colors.length)],
            };
          }
        });
        return updatedWords;
      });
      setNewWord('');
    }
  };

  const generatePresentation = async () => {
    setLoading(true);
    const systemPrompt = "You are a helpful assistant for creating presentations. Generate a structured JSON response for a presentation based on a user's topic. The JSON should include a presentation title, an introductory slide, a word cloud question, and an open-ended question. The intro should be a title and a speaker note. The word cloud should have a question and a list of keywords. The open-ended question should have a title. Do not include any other text or markdown outside the JSON object.";
    const userQuery = `Create a presentation on the topic: ${aiPrompt}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "presentationTitle": { "type": "STRING" },
            "introSlide": {
              "type": "OBJECT",
              "properties": {
                "title": { "type": "STRING" },
                "speakerNote": { "type": "STRING" }
              }
            },
            "wordCloudSlide": {
              "type": "OBJECT",
              "properties": {
                "question": { "type": "STRING" },
                "keywords": {
                  "type": "ARRAY",
                  "items": { "type": "STRING" }
                }
              }
            },
            "openEndedSlide": {
              "type": "OBJECT",
              "properties": {
                "question": { "type": "STRING" }
              }
            }
          }
        }
      }
    };

    try {
      let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      let result = await response.json();
      const presentationData = JSON.parse(result.candidates[0].content.parts[0].text);

      const generatedSlides = [
        { type: 'title', content: { title: presentationData.presentationTitle } },
        { type: 'intro', content: presentationData.introSlide },
        { type: 'word-cloud', content: presentationData.wordCloudSlide },
        { type: 'open-ended', content: presentationData.openEndedSlide }
      ];
      setSlides(generatedSlides);
      setCurrentSlideIndex(0);
      setActiveFeature('generated-presentation');
    } catch (error) {
      console.error('Error generating presentation:', error);
      alert('Failed to generate presentation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Header = () => (
    <header className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon size={20} className="text-gray-400" />
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Search presentations, folders, and pages"
              />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="p-2 text-gray-600 hover:text-gray-800 rounded-full cursor-pointer">
            <BellIcon size={24} />
          </div>
          <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
            J
          </div>
        </div>
      </div>
    </header>
  );

  const WelcomeSection = () => (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome!</h1>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative" ref={newMentiDropdownRef}>
          <button onClick={handleNewMentiClick} className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-semibold shadow-sm hover:bg-gray-800 transition-colors duration-200">
            <LayoutDashboardIcon size={20} className="mr-2" />
            New Menti
            <ChevronDownIcon size={20} className={`ml-2 transform transition-transform ${newMentiDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          {newMentiDropdownOpen && (
            <div className="absolute top-full mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
              <div className="py-1">
                <button onClick={handleNewQuizClick} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <PencilIcon size={20} className="mr-3" />
                  New quiz
                </button>
                <button onClick={handleNewSurveyClick} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <TabletIcon size={20} className="mr-3" />
                  New survey
                </button>
              </div>
            </div>
          )}
        </div>
        <button onClick={() => setActiveFeature('ai-presentation')} className="flex items-center px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-200">
          <SparklesIcon size={20} className="mr-2" />
          Start with AI
          <span className="ml-2 px-2 py-0.5 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">Beta</span>
        </button>
        <button className="flex items-center px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-200">
          <ImportIcon size={20} className="mr-2" />
          Import presentation
        </button>
      </div>
    </div>
  );

  const popularFeatures = [
    { icon: <ZapIcon size={48} className="text-pink-500" />, title: "Word cloud" },
    { icon: <BarChart3Icon size={48} className="text-blue-500" />, title: "Poll" },
    { icon: <EditIcon size={48} className="text-red-400" />, title: "Open ended" },
    { icon: <ScaleIcon size={48} className="text-purple-500" />, title: "Scales" },
    { icon: <GaugeIcon size={48} className="text-green-500" />, title: "Ranking" },
    { icon: <MapPinIcon size={48} className="text-indigo-500" />, title: "Pin on Image" },
  ];

  const knowledgeItems = [
    { icon: <LayoutDashboardIcon size={24} />, title: "What is a Menti?", description: "1 min read" },
    { icon: <SlidersIcon size={24} />, title: "How to present", description: "1 min read" },
    { icon: <FolderIcon size={24} />, title: "How participants join", description: "2 min read" },
    { icon: <SearchIcon size={24} />, title: "Using Mentimeter with other tools", description: "4 min watch" },
    { icon: <CheckIcon size={24} />, title: "Creating your first Menti", description: "4 min watch", highlight: true },
  ];

  const templateItems = [
    { image: "https://placehold.co/400x250/E9D5FF/000000?text=Template+1", title: "Desert island survival" },
    { image: "https://placehold.co/400x250/C6F6D5/000000?text=Template+2", title: "Make team decisions" },
    { image: "https://placehold.co/400x250/FEE2E2/000000?text=Template+3", title: "Monthly KPI follow-up" },
    { image: "https://placehold.co/400x250/BEE3F8/000000?text=Template+4", title: "Pre-training survey" },
    { image: "https://placehold.co/400x250/FFEDD5/000000?text=Template+5", title: "Brainstorming session" },
    { image: "https://placehold.co/400x250/D1D5DB/000000?text=Template+6", title: "Weekly project update" },
  ];

  const FeatureCard = ({ icon, title }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 duration-300 cursor-pointer">
      <div className="mb-4">{icon}</div>
      <p className="font-semibold text-lg text-gray-800">{title}</p>
    </div>
  );

  const KnowledgeCard = ({ icon, title, description, highlight }) => (
    <div className={`p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 duration-300 cursor-pointer ${highlight ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
      <div className="mb-4 text-gray-500">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );

  const TemplateCard = ({ image, title }) => (
    <div className="min-w-[280px] w-[280px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white cursor-pointer transition-transform transform hover:scale-105 duration-300">
      <img src={image} alt={title} className="w-full h-auto object-cover rounded-t-2xl" />
      <div className="p-4">
        <p className="font-semibold text-sm text-gray-800 truncate">{title}</p>
      </div>
    </div>
  );

  const QuizTemplateSelection = ({ setActiveFeature }) => (
    <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex justify-end mb-4">
            <button onClick={() => setActiveFeature('new-presentation-options')} className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
                <CloseIcon />
            </button>
        </div>
        <h1 className="text-4xl font-bold mb-2">Templates</h1>
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Quizzes</h2>
        <p className="text-gray-500 max-w-2xl mb-8">Run an after work quiz or quiz your peers on company policies, sales practices, or company strategy.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Blank Template */}
            <div onClick={() => setActiveFeature('word-cloud')} className="bg-gray-100 h-64 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                <PlusIcon size={48} className="text-gray-400" />
            </div>
            {/* Template Card 1 */}
            <div className="bg-white h-64 rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer">
                <img src="https://placehold.co/400x250/3b82f6/ffffff?text=Team+building+quiz" alt="Team building quiz" className="w-full h-4/5 object-cover" />
                <div className="p-2">
                    <p className="font-semibold text-sm">Team building quiz</p>
                    <p className="text-xs text-gray-500">10 slides</p>
                </div>
            </div>
            {/* Template Card 2 */}
            <div className="bg-white h-64 rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer">
                <img src="https://placehold.co/400x250/EC4899/ffffff?text=Training+knowledge-check+quiz" alt="Training knowledge-check quiz" className="w-full h-4/5 object-cover" />
                <div className="p-2">
                    <p className="font-semibold text-sm">Training knowledge-check quiz</p>
                    <p className="text-xs text-gray-500">10 slides</p>
                </div>
            </div>
             {/* Template Card 3 */}
            <div className="bg-white h-64 rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer">
                <img src="https://placehold.co/400x250/a855f7/ffffff?text=General+knowledge+quiz" alt="General knowledge quiz" className="w-full h-4/5 object-cover" />
                <div className="p-2">
                    <p className="font-semibold text-sm">General knowledge quiz</p>
                    <p className="text-xs text-gray-500">9 slides</p>
                </div>
            </div>
        </div>
    </div>
  );

  const NewPresentationOptions = ({ setActiveFeature }) => (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="max-w-4xl w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <div onClick={() => setActiveFeature('word-cloud')} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 cursor-pointer flex-1">
                <PencilIcon size={48} className="text-blue-500 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Start from scratch</h3>
                <p className="text-sm text-gray-500">Gain insights with word clouds, polls, quizzes, and more.</p>
            </div>
            <div onClick={() => setActiveFeature('template-selection')} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 cursor-pointer flex-1">
                <LayoutDashboardIcon size={48} className="text-red-500 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">Use a template</h3>
                <p className="text-sm text-gray-500">Browse our templates and find the perfect one for you.</p>
            </div>
        </div>
    </div>
  );

  const NewMentiSelection = ({ setActiveFeature }) => (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="max-w-4xl w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <div onClick={() => setActiveFeature('new-presentation-options')} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 cursor-pointer flex-1">
                <PencilIcon size={48} className="text-blue-500 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">New quiz</h3>
                <p className="text-sm text-gray-500">Run a quiz to engage your audience and test their knowledge.</p>
            </div>
            <div onClick={() => setActiveFeature('new-presentation-options')} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 cursor-pointer flex-1">
                <SurveyIcon size={48} className="text-purple-500 mb-4"/>
                <h3 className="text-xl font-semibold mb-2">New survey</h3>
                <p className="text-sm text-gray-500">Gather feedback and insights with a survey.</p>
            </div>
        </div>
    </div>
  );

  const StartWithAIPresentation = ({ setActiveFeature }) => (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Generate with AI ✨</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Enter a topic and we'll generate a custom presentation for you.</p>
        <form onSubmit={(e) => { e.preventDefault(); generatePresentation(); }}>
          <textarea
            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="e.g., 'A brainstorming session on remote work best practices'"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className={`w-full mt-4 px-6 py-3 rounded-md text-white font-semibold transition-colors duration-200 ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'}`}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Presentation'}
          </button>
        </form>
        <button onClick={() => setActiveFeature('dashboard')} className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      </div>
    </div>
  );

  const GeneratedPresentation = ({ setActiveFeature, slides, currentSlideIndex }) => {
    const currentSlide = slides[currentSlideIndex];

    const handleNextSlide = () => {
      if (currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    };

    const handlePrevSlide = () => {
      if (currentSlideIndex > 0) {
        setCurrentSlideIndex(currentSlideIndex - 1);
      }
    };

    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="flex flex-grow items-center justify-center p-8">
          {currentSlide && currentSlide.type === 'title' && (
            <div className="text-center">
              <h1 className="text-5xl font-bold">{currentSlide.content.title}</h1>
              <p className="mt-4 text-lg text-gray-500">Generated with AI</p>
              <button onClick={handleNextSlide} className="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold">
                Start
              </button>
            </div>
          )}

          {currentSlide && currentSlide.type === 'intro' && (
            <div className="text-center max-w-3xl">
              <h2 className="text-4xl font-bold">{currentSlide.content.title}</h2>
              <p className="mt-6 text-lg text-gray-700">{currentSlide.content.speakerNote}</p>
              <div className="flex justify-center space-x-4 mt-8">
                <button onClick={handlePrevSlide} className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-800 hover:bg-gray-100">
                  Previous
                </button>
                <button onClick={handleNextSlide} className="px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold">
                  Next
                </button>
              </div>
            </div>
          )}

          {currentSlide && currentSlide.type === 'word-cloud' && (
            <div className="w-full h-full">
              <WordCloud
                setActiveFeature={setActiveFeature}
                title="AI Generated Presentation"
                question={currentSlide.content.question}
                initialKeywords={currentSlide.content.keywords}
              />
              <div className="absolute bottom-16 right-1/2 translate-x-1/2 flex space-x-4">
                <button onClick={handlePrevSlide} className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-800 hover:bg-gray-100">
                  Previous
                </button>
                <button onClick={handleNextSlide} className="px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold">
                  Next
                </button>
              </div>
            </div>
          )}

          {currentSlide && currentSlide.type === 'open-ended' && (
            <div className="text-center max-w-3xl">
              <h2 className="text-4xl font-bold">{currentSlide.content.question}</h2>
              <p className="mt-6 text-lg text-gray-700">Audience responses will appear here.</p>
              <div className="flex justify-center space-x-4 mt-8">
                <button onClick={handlePrevSlide} className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-800 hover:bg-gray-100">
                  Previous
                </button>
                <button onClick={() => setActiveFeature('dashboard')} className="px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold">
                  Finish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const WordCloud = ({ setActiveFeature, title = '', question = '', initialKeywords = [] }) => {
    const [words, setWords] = useState(() => {
      const obj = {};
      (initialKeywords || []).forEach(k => {
        const key = k.toLowerCase();
        obj[key] = { count: (obj[key]?.count || 0) + 1, color: colors[Math.floor(Math.random() * colors.length)] };
      });
      return obj;
    });
    const [input, setInput] = useState('');
    const containerRefLocal = useRef(null);

    useEffect(() => {
      if (containerRefLocal.current) {
        const parentWidth = containerRefLocal.current.offsetWidth;
        const parentHeight = containerRefLocal.current.offsetHeight;
        const wordElements = containerRefLocal.current.querySelectorAll('.word-cloud-word');
        wordElements.forEach(wordEl => {
          const x = Math.random() * (parentWidth - wordEl.offsetWidth);
          const y = Math.random() * (parentHeight - wordEl.offsetHeight);
          wordEl.style.left = `${x}px`;
          wordEl.style.top = `${y}px`;
        });
      }
    }, [words]);

    const handleSubmit = (e) => {
      e && e.preventDefault();
      const newWords = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
      if (newWords.length === 0) return setInput('');
      setWords(prev => {
        const updated = { ...prev };
        newWords.forEach(w => {
          updated[w] = { count: (updated[w]?.count || 0) + 1, color: updated[w]?.color || colors[Math.floor(Math.random() * colors.length)] };
        });
        return updated;
      });
      setInput('');
    };

    const max = Object.values(words).reduce((m, { count }) => Math.max(m, count), 1);
    const fontSize = (count) => 16 + (count / max) * 48;

    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-8">
        <h2 className="text-3xl font-bold mb-4">{title || 'Word cloud'}</h2>
        {question && <p className="text-gray-600 mb-4">{question}</p>}
        <div ref={containerRefLocal} className="relative w-full h-80 border border-gray-300 rounded-xl overflow-hidden mb-6">
          {Object.entries(words).map(([w, data], i) => (
            <span key={i} className="word-cloud-word absolute whitespace-nowrap" style={{ fontSize: `${fontSize(data.count)}px`, color: data.color, fontWeight: 600 }}>
              {w}
            </span>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a word and press Enter" className="flex-1 px-4 py-2 border rounded-l-full focus:outline-none" />
          <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-r-full">Add</button>
        </form>
        <div className="mt-4">
          <button onClick={() => setActiveFeature && setActiveFeature('dashboard')} className="text-sm text-gray-600 hover:text-gray-800">Back to dashboard</button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        .horizontal-scroll {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        `}
      </style>
      {activeFeature !== 'generated-presentation' && <Header />}
      <main className="container mx-auto px-4 py-8">
        {activeFeature === 'dashboard' && (
          <>
            <WelcomeSection />
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Popular features</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {popularFeatures.map((feature, index) => (
                  <FeatureCard key={index} icon={feature.icon} title={feature.title} />
                ))}
              </div>
            </section>
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Get to know Mentimeter</h2>
                <div className="h-1 w-24 bg-indigo-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {knowledgeItems.map((item, index) => (
                  <KnowledgeCard key={index} {...item} />
                ))}
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Popular templates in Business</h2>
                <button className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  See all templates &gt;
                </button>
              </div>
              <div className="horizontal-scroll flex gap-4 overflow-x-auto pb-4">
                {templateItems.map((template, index) => (
                  <TemplateCard key={index} image={template.image} title={template.title} />
                ))}
              </div>
            </section>
          </>
        )}
        {activeFeature === 'new-menti-selection' && <NewMentiSelection setActiveFeature={setActiveFeature} />}
        {activeFeature === 'template-selection' && <QuizTemplateSelection setActiveFeature={setActiveFeature} />}
        {activeFeature === 'word-cloud' && <WordCloud setActiveFeature={setActiveFeature} />}
        {activeFeature === 'new-presentation-options' && <NewPresentationOptions setActiveFeature={setActiveFeature} />}
        {activeFeature === 'ai-presentation' && <StartWithAIPresentation setActiveFeature={setActiveFeature} />}
        {activeFeature === 'generated-presentation' && <GeneratedPresentation setActiveFeature={setActiveFeature} slides={slides} currentSlideIndex={currentSlideIndex} />}
      </main>
    </div>
  );
};

export default App;
