export interface Doctor {
  id: string;
  name: string;
  photoUrl: string;
  photoHint: string;
  specialization: string;
  status: 'Online' | 'Offline';
  bio: string;
  experience: number;
  languages: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: number;
}
