'use client';

import { useState, useEffect, useRef } from 'react';
import type { Doctor, ChatMessage } from '@/lib/types';
import { simulateDoctorResponse } from '@/ai/flows/simulate-doctor-responses';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface ChatInterfaceProps {
  doctor: Doctor;
  patient: { name: string };
}

export default function ChatInterface({ doctor, patient }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const storageKey = `chatHistory_${doctor.id}`;

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(storageKey);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        const welcomeMessage: ChatMessage = {
          id: `doc-welcome-${Date.now()}`,
          text: `Hello ${patient.name}, I'm ${doctor.name}. How can I help you today?`,
          sender: 'doctor',
          timestamp: Date.now(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
    }
  }, [storageKey, doctor.name, patient.name]);

  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      }
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, storageKey]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    
    setTimeout(() => setIsTyping(true), 100);

    try {
      const doctorResponse = await simulateDoctorResponse({
        message: currentInput,
        doctorName: doctor.name,
        patientName: patient.name,
        specialization: doctor.specialization,
      });

      const doctorMessage: ChatMessage = {
        id: `doc-${Date.now()}`,
        text: doctorResponse.response,
        sender: 'doctor',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, doctorMessage]);
    } catch (error) {
      console.error('Error simulating doctor response:', error);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'doctor',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-[calc(100dvh-57px)] flex-col items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl h-full flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center gap-4 border-b p-4">
            <Link href={`/doctors/${doctor.id}`} aria-label="Back to doctor profile">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </Link>
            <Avatar>
                <AvatarImage src={doctor.photoUrl} alt={doctor.name} data-ai-hint={doctor.photoHint}/>
                <AvatarFallback>{doctor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="font-semibold text-base sm:text-lg">{doctor.name}</p>
                <div className="flex items-center gap-2">
                    <span className={cn('h-2 w-2 rounded-full', doctor.status === 'Online' ? 'bg-green-500' : 'bg-gray-400')}></span>
                    <p className="text-xs sm:text-sm text-muted-foreground">{doctor.status}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 space-y-6">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-end gap-2',
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.sender === 'doctor' && (
                    <Avatar className="h-8 w-8 self-end">
                      <AvatarImage src={doctor.photoUrl} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-2.5',
                      msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                    )}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2 justify-start">
                  <Avatar className="h-8 w-8 self-end">
                    <AvatarImage src={doctor.photoUrl} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.slice(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2">
                    <div className="flex items-center space-x-1.5">
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
               <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        {doctor.status === 'Online' ? (
          <CardFooter className="p-2 sm:p-4 border-t">
            <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                autoComplete="off"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        ) : (
          <CardFooter className="p-4 border-t bg-muted">
            <p className="text-center text-sm text-muted-foreground w-full">This doctor is offline and cannot receive messages.</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
