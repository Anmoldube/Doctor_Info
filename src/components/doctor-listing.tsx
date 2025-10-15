'use client';

import { useState, useMemo } from 'react';
import type { Doctor } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DoctorCard from './doctor-card';
import { Search } from 'lucide-react';

interface DoctorListingProps {
  doctors: Doctor[];
}

export default function DoctorListing({ doctors }: DoctorListingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All');

  const specializations = useMemo(() => {
    return ['All', ...Array.from(new Set(doctors.map(d => d.specialization)))];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = specialization === 'All' || doctor.specialization === specialization;
      return matchesSearch && matchesSpecialization;
    });
  }, [doctors, searchTerm, specialization]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Find Your Doctor</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Search for a specialist and start a conversation today.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or specialization..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={specialization} onValueChange={setSpecialization}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Filter by specialization" />
          </SelectTrigger>
          <SelectContent>
            {specializations.map(spec => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
