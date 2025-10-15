import { getDoctors } from '@/lib/data';
import DoctorListing from '@/components/doctor-listing';

export default async function Home() {
  const doctors = await getDoctors();

  return (
    <div className="container mx-auto px-4 py-8">
      <DoctorListing doctors={doctors} />
    </div>
  );
}
