import { motion } from 'framer-motion';

interface VoiceWaveAnimationProps {
  isActive: boolean;
  volumeLevel?: number;
  isSpeaking?: boolean;
}

export const VoiceWaveAnimation = ({ 
  isActive, 
  volumeLevel = 0,
  isSpeaking = false 
}: VoiceWaveAnimationProps) => {
  const bars = 5;
  const baseHeight = 4;
  const maxHeight = 32;
  
  // Calculate dynamic height based on volume level
  const getBarHeight = (index: number) => {
    if (!isActive) return baseHeight;
    
    // Create wave pattern with volume influence
    const volumeMultiplier = 0.3 + volumeLevel * 0.7;
    const centerDistance = Math.abs(index - Math.floor(bars / 2));
    const baseMultiplier = 1 - centerDistance * 0.15;
    
    return baseHeight + (maxHeight - baseHeight) * baseMultiplier * volumeMultiplier;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${
            isSpeaking 
              ? 'bg-gradient-to-t from-primary to-primary/60' 
              : 'bg-gradient-to-t from-green-500 to-green-400'
          }`}
          initial={{ height: baseHeight }}
          animate={{
            height: isActive ? getBarHeight(i) : baseHeight,
            opacity: isActive ? 1 : 0.5,
          }}
          transition={{
            height: {
              duration: 0.1,
              ease: 'easeOut',
            },
            opacity: { duration: 0.2 },
          }}
        />
      ))}
    </div>
  );
};

// Pulsing orb animation for Siri-style effect
export const VoicePulseOrb = ({ 
  isActive, 
  volumeLevel = 0,
  isConnecting = false 
}: VoiceWaveAnimationProps & { isConnecting?: boolean }) => {
  const scale = isActive ? 1 + volumeLevel * 0.3 : 1;
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      {isActive && (
        <>
          <motion.div
            className="absolute h-16 w-16 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute h-16 w-16 rounded-full bg-primary/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
        </>
      )}
      
      {/* Main orb */}
      <motion.div
        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full ${
          isConnecting 
            ? 'bg-yellow-500/80' 
            : isActive 
              ? 'bg-gradient-to-br from-primary to-primary/80' 
              : 'bg-muted'
        }`}
        animate={{
          scale: isConnecting ? [1, 1.1, 1] : scale,
          boxShadow: isActive 
            ? [
                '0 0 20px rgba(139, 92, 246, 0.4)',
                '0 0 40px rgba(139, 92, 246, 0.6)',
                '0 0 20px rgba(139, 92, 246, 0.4)',
              ]
            : '0 0 0px rgba(139, 92, 246, 0)',
        }}
        transition={{
          scale: { duration: 0.1, ease: 'easeOut' },
          boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {isConnecting ? (
          <motion.div
            className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <VoiceWaveAnimation isActive={isActive} volumeLevel={volumeLevel} />
        )}
      </motion.div>
    </div>
  );
};
