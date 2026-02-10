// src/data/resources.js
export const resources = [
  {
    id: 'tutoring',
    title: 'Peer Tutoring Centre',
    category: 'Academic',
    summary: 'Drop-in tutoring and study support.',
    location: 'Building W, Room W101',
    openNow: true,
    isVirtual: false, 
    isPopular: true,
  },
  {
    id: 'counselling',
    title: 'Counselling Services',
    category: 'Wellness',
    summary: 'Confidential mental health supports.',
    location: 'Virtual and in-person',
    openNow: true,
    isVirtual: true, // Set to true for the exercise
    isPopular: false,
  },
  {
    id: 'bursaries',
    title: 'Student Awards and Bursaries',
    category: 'Financial',
    summary: 'Funding options and application help.',
    location: 'Student Services, Main Floor CAT',
    openNow: false,
    isVirtual: false,
    isPopular: false,
  },
  {
    id: 'it',
    title: 'IT Service Desk',
    category: 'Tech',
    summary: 'Account access, Wi-Fi, BYOD support.',
    location: 'Library',
    openNow: true,
    isVirtual: false,
    isPopular: true, // Set to true for the exercise
  },
];