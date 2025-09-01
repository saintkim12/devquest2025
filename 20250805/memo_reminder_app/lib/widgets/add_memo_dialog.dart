import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/memo_provider.dart';

class AddMemoDialog extends StatefulWidget {
  const AddMemoDialog({super.key});

  @override
  State<AddMemoDialog> createState() => _AddMemoDialogState();
}

class _AddMemoDialogState extends State<AddMemoDialog> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();
  DateTime? _selectedReminderTime;
  bool _hasReminder = false;

  @override
  void dispose() {
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('새 메모 추가'),
      content: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextFormField(
              controller: _titleController,
              decoration: const InputDecoration(
                labelText: '제목',
                border: OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return '제목을 입력해주세요';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _contentController,
              decoration: const InputDecoration(
                labelText: '내용',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return '내용을 입력해주세요';
                }
                return null;
              },
            ),
            const SizedBox(height: 16),
            // 알림 설정
            Row(
              children: [
                Checkbox(
                  value: _hasReminder,
                  onChanged: (value) {
                    setState(() {
                      _hasReminder = value ?? false;
                      if (!_hasReminder) {
                        _selectedReminderTime = null;
                      }
                    });
                  },
                ),
                const Text('알림 설정'),
              ],
            ),
            if (_hasReminder) ...[
              const SizedBox(height: 8),
              ElevatedButton.icon(
                onPressed: _selectReminderTime,
                icon: const Icon(Icons.alarm),
                label: Text(
                  _selectedReminderTime != null
                      ? '${_selectedReminderTime!.hour.toString().padLeft(2, '0')}:${_selectedReminderTime!.minute.toString().padLeft(2, '0')}'
                      : '알림 시간 선택',
                ),
              ),
            ],
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('취소'),
        ),
        ElevatedButton(
          onPressed: _saveMemo,
          child: const Text('저장'),
        ),
      ],
    );
  }

  Future<void> _selectReminderTime() async {
    final TimeOfDay? time = await showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    );

    if (time != null) {
      setState(() {
        _selectedReminderTime = DateTime(
          DateTime.now().year,
          DateTime.now().month,
          DateTime.now().day,
          time.hour,
          time.minute,
        );
      });
    }
  }

  void _saveMemo() {
    if (_formKey.currentState!.validate()) {
      final memoProvider = context.read<MemoProvider>();
      memoProvider.addMemo(
        _titleController.text.trim(),
        _contentController.text.trim(),
        _hasReminder ? _selectedReminderTime : null,
      );
      Navigator.of(context).pop();
    }
  }
} 