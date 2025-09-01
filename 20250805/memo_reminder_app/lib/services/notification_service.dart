import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:timezone/timezone.dart' as tz;
import '../models/memo.dart';

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _notifications = FlutterLocalNotificationsPlugin();

  Future<void> initialize() async {
    // Android 설정
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    // iOS 설정
    const DarwinInitializationSettings initializationSettingsIOS =
        DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );

    const InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );

    await _notifications.initialize(
      initializationSettings,
      onDidReceiveNotificationResponse: _onNotificationTapped,
    );

    // 권한 요청
    await _requestPermissions();
  }

  Future<void> _requestPermissions() async {
    await Permission.notification.request();
  }

  void _onNotificationTapped(NotificationResponse response) {
    // 알림 탭 시 처리 (나중에 구현)
    print('알림이 탭되었습니다: ${response.payload}');
  }

  Future<void> scheduleMemoReminder(Memo memo) async {
    if (memo.reminderTime == null) return;

    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'memo_reminders',
      '메모 알림',
      channelDescription: '메모 리마인더 알림',
      importance: Importance.high,
      priority: Priority.high,
      showWhen: true,
    );

    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    final scheduledDate = tz.TZDateTime.from(memo.reminderTime!, tz.local);

    await _notifications.zonedSchedule(
      memo.id ?? 0,
      '메모 리마인더',
      '${memo.title} - ${memo.content}',
      scheduledDate,
      details,
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
      uiLocalNotificationDateInterpretation:
          UILocalNotificationDateInterpretation.absoluteTime,
      payload: memo.id.toString(),
    );
  }

  Future<void> cancelMemoReminder(int memoId) async {
    await _notifications.cancel(memoId);
  }

  Future<void> scheduleDailyReminder(TimeOfDay time) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'daily_reminders',
      '일일 알림',
      channelDescription: '일일 메모 체크 알림',
      importance: Importance.high,
      priority: Priority.high,
    );

    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails(
      presentAlert: true,
      presentBadge: true,
      presentSound: true,
    );

    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    await _notifications.periodicallyShow(
      999, // 고정 ID
      '일일 메모 체크',
      '오늘의 메모를 확인해보세요!',
      RepeatInterval.daily,
      details,
    );
  }

  Future<void> cancelAllNotifications() async {
    await _notifications.cancelAll();
  }
} 