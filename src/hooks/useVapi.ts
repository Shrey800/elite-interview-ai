import { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

const VAPI_ASSISTANT_ID = 'f0f80388-7905-4d99-82e9-a46517814c82';

interface VapiHookOptions {
  questionTitle: string;
  questionPrompt: string;
}

interface VapiHookReturn {
  isCallActive: boolean;
  isSpeaking: boolean;
  isConnecting: boolean;
  volumeLevel: number;
  startCall: () => void;
  endCall: () => void;
  transcript: string;
}

export const useVapi = ({ questionTitle, questionPrompt }: VapiHookOptions): VapiHookReturn => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    // Initialize Vapi instance
    vapiRef.current = new Vapi('f90f8a06-0426-4c28-8888-ce1da9debb94');

    const vapi = vapiRef.current;

    // Event listeners
    vapi.on('call-start', () => {
      console.log('Vapi call started');
      setIsCallActive(true);
      setIsConnecting(false);
    });

    vapi.on('call-end', () => {
      console.log('Vapi call ended');
      setIsCallActive(false);
      setIsSpeaking(false);
      setVolumeLevel(0);
    });

    vapi.on('speech-start', () => {
      console.log('Speech started');
      setIsSpeaking(true);
    });

    vapi.on('speech-end', () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    });

    vapi.on('volume-level', (level: number) => {
      setVolumeLevel(level);
    });

    vapi.on('message', (message: any) => {
      console.log('Vapi message:', message);
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript(prev => prev + ' ' + message.transcript);
      }
    });

    vapi.on('error', (error: any) => {
      console.error('Vapi error:', error);
      setIsConnecting(false);
      setIsCallActive(false);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const startCall = useCallback(() => {
    if (!vapiRef.current) return;

    setIsConnecting(true);
    setTranscript('');

    vapiRef.current.start(VAPI_ASSISTANT_ID, {
      variableValues: {
        question_title: questionTitle,
        question_prompt: questionPrompt,
      },
    });
  }, [questionTitle, questionPrompt]);

  const endCall = useCallback(() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  }, []);

  return {
    isCallActive,
    isSpeaking,
    isConnecting,
    volumeLevel,
    startCall,
    endCall,
    transcript,
  };
};
