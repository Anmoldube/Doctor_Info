import Link from 'next/link';
import Image from 'next/image';
import type { Doctor } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/doctors/${doctor.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative">
            <Image
              src={doctor.photoUrl}
              alt={`Photo of ${doctor.name}`}
              data-ai-hint={doctor.photoHint}
              width={400}
              height={400}
              className="rounded-t-lg object-cover aspect-square"
            />
            <Badge
              className={cn(
                'absolute top-3 right-3 border-none',
                doctor.status === 'Online' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              {doctor.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline mb-1">{doctor.name}</CardTitle>
          <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full text-sm font-medium text-primary flex justify-end items-center">
            View Profile
            <ArrowRight className="h-4 w-4 ml-2 transform transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
