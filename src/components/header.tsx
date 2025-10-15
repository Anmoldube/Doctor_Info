import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl inline-block font-headline">MediLink</span>
        </Link>
      </div>
    </header>
  );
}
