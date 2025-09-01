import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import '../models/memo.dart';
import '../services/database_helper.dart';
import '../services/notification_service.dart';

class MemoProvider with ChangeNotifier {
  final DatabaseHelper _databaseHelper = DatabaseHelper();
  final NotificationService _notificationService = NotificationService();
  
  List<Memo> _memos = [];
  DateTime _selectedDate = DateTime.now();

  List<Memo> get memos => _memos;
  DateTime get selectedDate => _selectedDate;

  // 선택된 날짜의 메모들만 반환
  List<Memo> get memosForSelectedDate {
    return _memos.where((memo) {
      final memoDate = DateTime(
        memo.createdAt.year,
        memo.createdAt.month,
        memo.createdAt.day,
      );
      final selectedDateOnly = DateTime(
        _selectedDate.year,
        _selectedDate.month,
        _selectedDate.day,
      );
      return memoDate.isAtSameMomentAs(selectedDateOnly);
    }).toList();
  }

  // 대기 중인 메모들 반환
  List<Memo> get pendingMemos {
    return _memos.where((memo) => 
      !memo.isCompleted && !memo.isSkipped && !memo.isNotNeeded
    ).toList();
  }

  Future<void> loadMemos() async {
    _memos = await _databaseHelper.getAllMemos();
    notifyListeners();
  }

  Future<void> loadMemosForDate(DateTime date) async {
    _selectedDate = date;
    _memos = await _databaseHelper.getMemosByDate(date);
    notifyListeners();
  }

  Future<void> addMemo(String title, String content, DateTime? reminderTime) async {
    final memo = Memo(
      title: title,
      content: content,
      createdAt: DateTime.now(),
      reminderTime: reminderTime,
    );

    final id = await _databaseHelper.insertMemo(memo);
    final newMemo = memo.copyWith(id: id);
    
    _memos.add(newMemo);
    notifyListeners();

    // 알림 설정
    if (reminderTime != null) {
      await _notificationService.scheduleMemoReminder(newMemo);
    }
  }

  Future<void> updateMemoStatus(int id, {
    bool? isCompleted,
    bool? isSkipped,
    bool? isNotNeeded,
  }) async {
    final index = _memos.indexWhere((memo) => memo.id == id);
    if (index == -1) return;

    final memo = _memos[index];
    final updatedMemo = memo.copyWith(
      isCompleted: isCompleted ?? memo.isCompleted,
      isSkipped: isSkipped ?? memo.isSkipped,
      isNotNeeded: isNotNeeded ?? memo.isNotNeeded,
    );

    await _databaseHelper.updateMemo(updatedMemo);
    _memos[index] = updatedMemo;
    notifyListeners();

    // 완료되면 알림 취소
    if (updatedMemo.isCompleted || updatedMemo.isSkipped || updatedMemo.isNotNeeded) {
      await _notificationService.cancelMemoReminder(id);
    }
  }

  Future<void> updateMemo(int id, String title, String content, DateTime? reminderTime) async {
    final index = _memos.indexWhere((memo) => memo.id == id);
    if (index == -1) return;

    final memo = _memos[index];
    final updatedMemo = memo.copyWith(
      title: title,
      content: content,
      reminderTime: reminderTime,
    );

    await _databaseHelper.updateMemo(updatedMemo);
    _memos[index] = updatedMemo;
    notifyListeners();

    // 기존 알림 취소 후 새 알림 설정
    await _notificationService.cancelMemoReminder(id);
    if (reminderTime != null) {
      await _notificationService.scheduleMemoReminder(updatedMemo);
    }
  }

  Future<void> deleteMemo(int id) async {
    await _databaseHelper.deleteMemo(id);
    await _notificationService.cancelMemoReminder(id);
    _memos.removeWhere((memo) => memo.id == id);
    notifyListeners();
  }

  Future<void> scheduleDailyReminder(TimeOfDay time) async {
    await _notificationService.scheduleDailyReminder(time);
  }
} 