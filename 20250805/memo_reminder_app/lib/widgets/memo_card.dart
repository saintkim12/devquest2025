import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../models/memo.dart';
import '../providers/memo_provider.dart';

class MemoCard extends StatelessWidget {
  final Memo memo;

  const MemoCard({
    super.key,
    required this.memo,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // 제목과 상태 버튼들
            Row(
              children: [
                Expanded(
                  child: Text(
                    memo.title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      decoration: memo.isCompleted 
                          ? TextDecoration.lineThrough 
                          : null,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                // 상태 버튼들
                _buildStatusButton(
                  context,
                  '완료',
                  Icons.check_circle,
                  Colors.green,
                  memo.isCompleted,
                  () => _updateStatus(context, isCompleted: true),
                ),
                const SizedBox(width: 4),
                _buildStatusButton(
                  context,
                  '안함',
                  Icons.cancel,
                  Colors.red,
                  memo.isSkipped,
                  () => _updateStatus(context, isSkipped: true),
                ),
                const SizedBox(width: 4),
                _buildStatusButton(
                  context,
                  '불필요',
                  Icons.remove_circle,
                  Colors.orange,
                  memo.isNotNeeded,
                  () => _updateStatus(context, isNotNeeded: true),
                ),
              ],
            ),
            
            const SizedBox(height: 8),
            
            // 내용
            Text(
              memo.content,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                decoration: memo.isCompleted 
                    ? TextDecoration.lineThrough 
                    : null,
              ),
            ),
            
            const SizedBox(height: 12),
            
            // 메타 정보
            Row(
              children: [
                Icon(
                  Icons.access_time,
                  size: 16,
                  color: Colors.grey[600],
                ),
                const SizedBox(width: 4),
                Text(
                  DateFormat('HH:mm').format(memo.createdAt),
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                  ),
                ),
                if (memo.reminderTime != null) ...[
                  const SizedBox(width: 16),
                  Icon(
                    Icons.alarm,
                    size: 16,
                    color: Colors.blue[600],
                  ),
                  const SizedBox(width: 4),
                  Text(
                    DateFormat('HH:mm').format(memo.reminderTime!),
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.blue[600],
                    ),
                  ),
                ],
                const Spacer(),
                // 편집/삭제 버튼
                IconButton(
                  icon: const Icon(Icons.edit, size: 20),
                  onPressed: () => _editMemo(context),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
                IconButton(
                  icon: const Icon(Icons.delete, size: 20),
                  onPressed: () => _deleteMemo(context),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusButton(
    BuildContext context,
    String tooltip,
    IconData icon,
    Color color,
    bool isActive,
    VoidCallback onPressed,
  ) {
    return Tooltip(
      message: tooltip,
      child: InkWell(
        onTap: onPressed,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.all(4),
          decoration: BoxDecoration(
            color: isActive ? color.withValues(alpha: 0.2) : Colors.transparent,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Icon(
            icon,
            size: 20,
            color: isActive ? color : Colors.grey[400],
          ),
        ),
      ),
    );
  }

  void _updateStatus(
    BuildContext context, {
    bool? isCompleted,
    bool? isSkipped,
    bool? isNotNeeded,
  }) {
    context.read<MemoProvider>().updateMemoStatus(
      memo.id!,
      isCompleted: isCompleted,
      isSkipped: isSkipped,
      isNotNeeded: isNotNeeded,
    );
  }

  void _editMemo(BuildContext context) {
    // 편집 다이얼로그 표시 (나중에 구현)
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('편집 기능은 곧 추가됩니다!')),
    );
  }

  void _deleteMemo(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('메모 삭제'),
        content: const Text('이 메모를 삭제하시겠습니까?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('취소'),
          ),
          TextButton(
            onPressed: () {
              context.read<MemoProvider>().deleteMemo(memo.id!);
              Navigator.of(context).pop();
            },
            child: const Text('삭제'),
          ),
        ],
      ),
    );
  }
} 