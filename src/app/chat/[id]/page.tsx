import { getDoctorById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ChatInterface from '@/components/chat-interface';

const mockPatient = {
  name: 'Alex Ray',
};

export default async function ChatPage({ params }: { params: { id:string } }) {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    notFound();
  }
  
  const patient = mockPatient;

  return <ChatInterface doctor={doctor} patient={patient} />;
}
