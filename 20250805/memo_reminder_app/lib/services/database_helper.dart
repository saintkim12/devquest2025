import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/memo.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  static Database? _database;

  factory DatabaseHelper() => _instance;

  DatabaseHelper._internal();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'memo_reminder.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE memos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt INTEGER NOT NULL,
        reminderTime INTEGER,
        isCompleted INTEGER NOT NULL DEFAULT 0,
        isSkipped INTEGER NOT NULL DEFAULT 0,
        isNotNeeded INTEGER NOT NULL DEFAULT 0
      )
    ''');
  }

  Future<int> insertMemo(Memo memo) async {
    final db = await database;
    return await db.insert('memos', memo.toMap());
  }

  Future<List<Memo>> getAllMemos() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'memos',
      orderBy: 'createdAt DESC',
    );
    return List.generate(maps.length, (i) => Memo.fromMap(maps[i]));
  }

  Future<List<Memo>> getMemosByDate(DateTime date) async {
    final db = await database;
    final startOfDay = DateTime(date.year, date.month, date.day);
    final endOfDay = startOfDay.add(const Duration(days: 1));
    
    final List<Map<String, dynamic>> maps = await db.query(
      'memos',
      where: 'createdAt >= ? AND createdAt < ?',
      whereArgs: [startOfDay.millisecondsSinceEpoch, endOfDay.millisecondsSinceEpoch],
      orderBy: 'createdAt DESC',
    );
    return List.generate(maps.length, (i) => Memo.fromMap(maps[i]));
  }

  Future<List<Memo>> getPendingMemos() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'memos',
      where: 'isCompleted = 0 AND isSkipped = 0 AND isNotNeeded = 0',
      orderBy: 'createdAt DESC',
    );
    return List.generate(maps.length, (i) => Memo.fromMap(maps[i]));
  }

  Future<int> updateMemo(Memo memo) async {
    final db = await database;
    return await db.update(
      'memos',
      memo.toMap(),
      where: 'id = ?',
      whereArgs: [memo.id],
    );
  }

  Future<int> deleteMemo(int id) async {
    final db = await database;
    return await db.delete(
      'memos',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
} 