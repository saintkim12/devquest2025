# 메모 + 알림 앱

하루마다 정해진 시간에 사용자가 저장한 메모 내용을 알림으로 확인하는 Flutter 앱입니다.

## 주요 기능

### ✅ 구현된 기능
- **메모 작성**: 제목과 내용을 포함한 메모 작성
- **알림 설정**: 특정 시간에 메모 리마인더 알림 설정
- **상태 관리**: 완료/안함/불필요 상태 체크 기능
- **로컬 저장**: SQLite를 사용한 로컬 데이터베이스 저장
- **날짜별 관리**: 오늘 날짜 기준으로 메모 관리

### 🔄 향후 구현 예정
- [ ] 메모 편집 기능
- [ ] 일일 알림 설정 (랜덤 시간 또는 특정 시간대)
- [ ] 알림 응답 기능 (예/아니오/아직)
- [ ] 설정 화면
- [ ] 통계 및 히스토리 보기

## 기술 스택

- **Flutter**: 크로스 플랫폼 앱 개발
- **Provider**: 상태 관리
- **SQLite**: 로컬 데이터베이스
- **flutter_local_notifications**: 로컬 알림
- **permission_handler**: 권한 관리

## 설치 및 실행

### 1. Flutter 환경 설정
```bash
flutter doctor
```

### 2. 의존성 설치
```bash
flutter pub get
```

### 3. 앱 실행
```bash
flutter run
```

## 프로젝트 구조

```
lib/
├── models/
│   └── memo.dart              # 메모 데이터 모델
├── providers/
│   └── memo_provider.dart     # 상태 관리
├── screens/
│   └── home_screen.dart       # 메인 화면
├── services/
│   ├── database_helper.dart   # 데이터베이스 서비스
│   └── notification_service.dart # 알림 서비스
├── widgets/
│   ├── memo_card.dart         # 메모 카드 위젯
│   └── add_memo_dialog.dart   # 메모 추가 다이얼로그
└── main.dart                  # 앱 진입점
```

## 사용법

1. **메모 추가**: 우하단 + 버튼을 눌러 새 메모 작성
2. **알림 설정**: 메모 작성 시 알림 시간 설정 가능
3. **상태 변경**: 메모 카드의 상태 버튼으로 완료/안함/불필요 표시
4. **메모 삭제**: 메모 카드의 삭제 버튼으로 메모 삭제

## 권한 요청

앱은 다음 권한을 요청합니다:
- 알림 권한: 메모 리마인더 알림을 위해 필요
- 정확한 알람 권한: 정확한 시간에 알림을 위해 필요

## 개발 환경

- Flutter: 3.8.1+
- Dart: 3.8.1+
- Android: API 21+
- iOS: 11.0+

## 라이선스

MIT License
