import { getDoctorById, getDoctors } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Languages, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type DoctorProfilePageProps = {
  params: { id: string };
};

export default async function DoctorProfilePage({ params }: DoctorProfilePageProps) {
  const doctor = await getDoctorById(params.id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={doctor.photoUrl}
              alt={`Photo of ${doctor.name}`}
              data-ai-hint={doctor.photoHint}
              width={300}
              height={300}
              className="h-full w-full object-cover md:w-64"
            />
          </div>
          <div className="p-8 flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">{doctor.specialization}</p>
                <h1 className="mt-1 text-3xl font-bold leading-tight font-headline">{doctor.name}</h1>
              </div>
              <Badge
                className={cn('border-none', doctor.status === 'Online' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground')}
              >
                <span className={cn('mr-2 h-2 w-2 rounded-full', doctor.status === 'Online' ? 'bg-green-500' : 'bg-gray-400')}></span>
                {doctor.status}
              </Badge>
            </div>
            
            <div className="mt-6 flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>{doctor.experience} years of experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Languages className="h-5 w-5" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-lg font-semibold font-headline">About Dr. {doctor.name.split(' ').pop()}</h2>
              <p className="mt-2 text-muted-foreground">{doctor.bio}</p>
            </div>
            
            <div className="mt-8">
              <Link href={`/chat/${doctor.id}`}>
                <Button size="lg" className="w-full md:w-auto" disabled={doctor.status === 'Offline'}>
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Chat
                </Button>
              </Link>
              {doctor.status === 'Offline' && (
                <p className="mt-2 text-sm text-muted-foreground">Dr. {doctor.name.split(' ').pop()} is currently offline and cannot be reached.</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  const allDoctors = await getDoctors();
  return allDoctors.map((doctor) => ({
    id: doctor.id,
  }));
}
