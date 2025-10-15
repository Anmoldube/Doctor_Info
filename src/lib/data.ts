import type { Doctor } from './types';
import { PlaceHolderImages } from './placeholder-images';

const doctorsData: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Evelyn Reed',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc1')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc1')?.imageHint || '',
    specialization: 'Cardiology',
    status: 'Online',
    bio: 'Dr. Evelyn Reed is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She is a fellow of the American College of Cardiology and has published numerous papers on heart failure and preventive cardiology.',
    experience: 15,
    languages: ['English', 'Spanish'],
  },
  {
    id: 'doc-2',
    name: 'Dr. Samuel Chen',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc2')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc2')?.imageHint || '',
    specialization: 'Dermatology',
    status: 'Offline',
    bio: 'Dr. Samuel Chen specializes in both medical and cosmetic dermatology. He is renowned for his expertise in treating skin cancer and his innovative approaches to anti-aging treatments. He believes in a holistic approach to skin health.',
    experience: 12,
    languages: ['English', 'Mandarin'],
  },
  {
    id: 'doc-3',
    name: 'Dr. Isabella Rossi',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc3')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc3')?.imageHint || '',
    specialization: 'Pediatrics',
    status: 'Online',
    bio: 'With a warm and compassionate demeanor, Dr. Isabella Rossi has been caring for children for over a decade. She has a special interest in developmental pediatrics and adolescent medicine, providing comprehensive care from birth through college.',
    experience: 10,
    languages: ['English', 'Italian', 'French'],
  },
  {
    id: 'doc-4',
    name: 'Dr. Marcus Thorne',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc4')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc4')?.imageHint || '',
    specialization: 'Orthopedics',
    status: 'Online',
    bio: 'Dr. Marcus Thorne is a leading orthopedic surgeon specializing in sports medicine and joint replacement. He has worked with professional athletes and is committed to helping patients of all ages regain mobility and return to their active lifestyles.',
    experience: 20,
    languages: ['English'],
  },
  {
    id: 'doc-5',
    name: 'Dr. Anya Sharma',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc5')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc5')?.imageHint || '',
    specialization: 'Neurology',
    status: 'Offline',
    bio: 'Dr. Anya Sharma focuses on the diagnosis and treatment of neurological disorders, including epilepsy, stroke, and multiple sclerosis. Her research in neurodegenerative diseases has earned her international recognition.',
    experience: 14,
    languages: ['English', 'Hindi'],
  },
  {
    id: 'doc-6',
    name: 'Dr. Liam O\'Connell',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc6')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc6')?.imageHint || '',
    specialization: 'Gastroenterology',
    status: 'Online',
    bio: 'Dr. Liam O\'Connell is an expert in digestive health, with a focus on inflammatory bowel disease (IBD) and liver conditions. He is known for his patient-centered approach and dedication to finding effective, personalized treatment plans.',
    experience: 11,
    languages: ['English', 'Gaelic'],
  },
  {
    id: 'doc-7',
    name: 'Dr. Chloe Dubois',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc7')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc7')?.imageHint || '',
    specialization: 'Endocrinology',
    status: 'Offline',
    bio: 'Dr. Chloe Dubois specializes in hormonal disorders, including diabetes and thyroid conditions. She is passionate about educating her patients and empowering them to manage their health through lifestyle changes and advanced therapies.',
    experience: 9,
    languages: ['English', 'French'],
  },
  {
    id: 'doc-8',
    name: 'Dr. Kenji Tanaka',
    photoUrl: PlaceHolderImages.find(p => p.id === 'doc8')?.imageUrl || '',
    photoHint: PlaceHolderImages.find(p => p.id === 'doc8')?.imageHint || '',
    specialization: 'Psychiatry',
    status: 'Online',
    bio: 'Dr. Kenji Tanaka provides mental health care with a focus on anxiety, depression, and PTSD. He combines psychotherapy and medication management to create a comprehensive treatment approach tailored to each individual\'s needs.',
    experience: 18,
    languages: ['English', 'Japanese'],
  },
];

export async function getDoctors(): Promise<Doctor[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return doctorsData;
}

export async function getDoctorById(id: string): Promise<Doctor | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return doctorsData.find(doc => doc.id === id);
}
