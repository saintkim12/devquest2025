class Memo {
  final int? id;
  final String title;
  final String content;
  final DateTime createdAt;
  final DateTime? reminderTime;
  final bool isCompleted;
  final bool isSkipped;
  final bool isNotNeeded;

  Memo({
    this.id,
    required this.title,
    required this.content,
    required this.createdAt,
    this.reminderTime,
    this.isCompleted = false,
    this.isSkipped = false,
    this.isNotNeeded = false,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'createdAt': createdAt.millisecondsSinceEpoch,
      'reminderTime': reminderTime?.millisecondsSinceEpoch,
      'isCompleted': isCompleted ? 1 : 0,
      'isSkipped': isSkipped ? 1 : 0,
      'isNotNeeded': isNotNeeded ? 1 : 0,
    };
  }

  factory Memo.fromMap(Map<String, dynamic> map) {
    return Memo(
      id: map['id'],
      title: map['title'],
      content: map['content'],
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt']),
      reminderTime: map['reminderTime'] != null 
          ? DateTime.fromMillisecondsSinceEpoch(map['reminderTime'])
          : null,
      isCompleted: map['isCompleted'] == 1,
      isSkipped: map['isSkipped'] == 1,
      isNotNeeded: map['isNotNeeded'] == 1,
    );
  }

  Memo copyWith({
    int? id,
    String? title,
    String? content,
    DateTime? createdAt,
    DateTime? reminderTime,
    bool? isCompleted,
    bool? isSkipped,
    bool? isNotNeeded,
  }) {
    return Memo(
      id: id ?? this.id,
      title: title ?? this.title,
      content: content ?? this.content,
      createdAt: createdAt ?? this.createdAt,
      reminderTime: reminderTime ?? this.reminderTime,
      isCompleted: isCompleted ?? this.isCompleted,
      isSkipped: isSkipped ?? this.isSkipped,
      isNotNeeded: isNotNeeded ?? this.isNotNeeded,
    );
  }
} 