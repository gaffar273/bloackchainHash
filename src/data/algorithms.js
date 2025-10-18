import { Shield, Lock, Zap, Key, Cpu } from 'lucide-react';

export const algorithms = [
  {
    id: 'sha256',
    name: 'SHA-256',
    icon: Shield,
    description: 'Secure Hash Algorithm 256-bit. Used in Bitcoin mining and blockchain. Fast and deterministic.',
    color: 'from-blue-500 to-cyan-500',
    outputLength: 64
  },
  {
    id: 'sha512',
    name: 'SHA-512',
    icon: Lock,
    description: 'SHA-512 provides stronger security with 512-bit output. More secure but slower than SHA-256.',
    color: 'from-purple-500 to-pink-500',
    outputLength: 128
  },
  {
    id: 'md5',
    name: 'MD5',
    icon: Zap,
    description: 'Message Digest 5. Fast but cryptographically broken. Used for checksums, not security.',
    color: 'from-orange-500 to-red-500',
    outputLength: 32
  },
  {
    id: 'sha1',
    name: 'SHA-1',
    icon: Key,
    description: 'Secure Hash Algorithm 1. Deprecated for security but still used in Git. 160-bit output.',
    color: 'from-green-500 to-emerald-500',
    outputLength: 40
  },
  {
    id: 'ripemd160',
    name: 'RIPEMD-160',
    icon: Cpu,
    description: 'Used in Bitcoin address generation. 160-bit hash, designed as alternative to SHA-1.',
    color: 'from-indigo-500 to-blue-500',
    outputLength: 40
  }
];