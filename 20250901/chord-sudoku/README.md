# 🎹 코드 스도쿠 (Chord Sudoku)

피아노 코드 학습을 위한 교육용 스도쿠 게임입니다. 스도쿠의 규칙을 도입하여 12키 중 특정 키를 랜덤 배치한 보드를 생성하고, 사용자가 해당 코드를 다양한 진행 방식으로 연습할 수 있게 합니다.

## ✨ 주요 기능

### 🎯 핵심 기능
- **스도쿠 규칙 적용**: 행/열/블록 내 키 중복 불가
- **3x3 / 9x9 보드**: 난이도에 따른 보드 크기 선택
- **순차/랜덤 진행**: 사용자 선호에 따른 진행 방식
- **진행률 추적**: 실시간 완료 상태 및 진행률 표시

### 🎵 학습 지원
- **코드 구성음 표시**: 초보자 모드에서 코드 구성음 표시
- **시각적 피드백**: 완료된 코드와 현재 위치 시각적 구분
- **직관적 UI**: 모던하고 사용하기 쉬운 인터페이스

### 🎮 게임 요소
- **클릭 네비게이션**: 보드 셀 클릭으로 직접 이동
- **완료 표시**: 연습 완료한 코드 시각적 마킹
- **새 게임**: 언제든 새로운 보드로 재시작

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Deployment**: Vercel (권장)

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

## 🎯 사용법

1. **게임 시작**: 앱 실행 시 자동으로 3x3 보드가 생성됩니다
2. **코드 선택**: 보드의 셀을 클릭하거나 제어판 버튼을 사용하여 이동
3. **연습 진행**: 현재 코드를 연습하고 "완료 표시" 버튼으로 마킹
4. **진행률 확인**: 하단의 진행률 바로 전체 완료 상태 확인
5. **새 게임**: "새 게임" 버튼으로 언제든 새로운 보드 생성

## 🏗️ 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # 메인 페이지
│   └── layout.tsx      # 레이아웃
├── components/         # React 컴포넌트
│   ├── ChordBoard.tsx  # 메인 보드 컴포넌트
│   ├── BoardCell.tsx   # 개별 셀 컴포넌트
│   ├── ChordDisplay.tsx # 현재 코드 표시
│   ├── ControlPanel.tsx # 제어 버튼들
│   └── ProgressBar.tsx # 진행률 표시
├── data/              # 데이터 정의
│   └── chords.ts      # 코드 데이터 및 유틸리티
├── store/             # 상태 관리
│   └── gameStore.ts   # Zustand 스토어
├── types/             # TypeScript 타입 정의
│   └── index.ts       # 모든 타입 정의
└── utils/             # 유틸리티 함수
    └── boardGenerator.ts # 스도쿠 보드 생성 로직
```

## 🎨 확장 계획

### 1차 확장 (MVP 완료 후)
- [ ] 9x9 보드 지원
- [ ] 메트로놈 기능 (시각적 박자)
- [ ] 건반 가이드 표시
- [ ] 설정 화면 구현

### 2차 확장
- [ ] 청각 메트로놈 추가
- [ ] 연습 히스토리 저장
- [ ] 난이도별 코드 타입 선택
- [ ] 성취도 통계

### 장기 확장
- [ ] Firebase 연동 (계정/저장)
- [ ] MIDI 입력/출력 지원
- [ ] AI 추천 경로
- [ ] 멀티플레이어 모드

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- [Next.js](https://nextjs.org/) - React 프레임워크
- [TailwindCSS](https://tailwindcss.com/) - CSS 프레임워크
- [Zustand](https://github.com/pmndrs/zustand) - 상태 관리
- [Lucide](https://lucide.dev/) - 아이콘 라이브러리
