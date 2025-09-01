import { Chord, Key, ChordType } from '@/types';

// 코드 구성음 데이터
const chordNotes: Record<ChordType, number[]> = {
  'maj7': [0, 4, 7, 11], // 1, 3, 5, 7
  'm7': [0, 3, 7, 10],   // 1, b3, 5, b7
  '7': [0, 4, 7, 10],    // 1, 3, 5, b7
  'dim7': [0, 3, 6, 9],  // 1, b3, b5, bb7
  'aug7': [0, 4, 8, 10], // 1, 3, #5, b7
};

// 키 순서 (C부터 B까지)
const keyOrder: Key[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// 키를 인덱스로 변환
const keyToIndex = (key: Key): number => keyOrder.indexOf(key);

// 인덱스를 키로 변환
const indexToKey = (index: number): Key => keyOrder[index % 12];

// 코드 구성음 생성
const generateChordNotes = (key: Key, type: ChordType): string[] => {
  const keyIndex = keyToIndex(key);
  return chordNotes[type].map(interval => indexToKey(keyIndex + interval));
};

// 코드 생성 함수
export const createChord = (key: Key, type: ChordType): Chord => {
  const notes = generateChordNotes(key, type);
  return {
    key,
    type,
    notes,
    displayName: `${key}${type}`,
  };
};

// 기본 코드 타입들 (초보자용)
export const basicChordTypes: ChordType[] = ['maj7', 'm7', '7'];

// 모든 코드 타입들
export const allChordTypes: ChordType[] = ['maj7', 'm7', '7', 'dim7', 'aug7'];

// 3x3 보드용 키들 (C, F, G 제외)
export const keysFor3x3: Key[] = ['C#', 'D', 'D#', 'E', 'F#', 'G#', 'A', 'A#', 'B'];

// 9x9 보드용 키들 (모든 키)
export const keysFor9x9: Key[] = keyOrder;

// 랜덤 코드 생성
export const generateRandomChord = (availableKeys: Key[], chordTypes: ChordType[]): Chord => {
  const randomKey = availableKeys[Math.floor(Math.random() * availableKeys.length)];
  const randomType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
  return createChord(randomKey, randomType);
};
