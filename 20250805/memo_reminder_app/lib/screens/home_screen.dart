import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../providers/memo_provider.dart';
import '../widgets/memo_card.dart';
import '../widgets/add_memo_dialog.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<MemoProvider>().loadMemos();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('메모 + 알림'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              // 설정 화면으로 이동 (나중에 구현)
            },
          ),
        ],
      ),
      body: Consumer<MemoProvider>(
        builder: (context, memoProvider, child) {
          final todayMemos = memoProvider.memosForSelectedDate;
          final pendingMemos = memoProvider.pendingMemos;

          return Column(
            children: [
              // 오늘 날짜 표시
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                child: Column(
                  children: [
                    Text(
                      DateFormat('yyyy년 MM월 dd일 (E)', 'ko_KR').format(DateTime.now()),
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${pendingMemos.length}개의 대기 중인 메모',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              
              // 메모 목록
              Expanded(
                child: todayMemos.isEmpty
                    ? const Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.note_add,
                              size: 64,
                              color: Colors.grey,
                            ),
                            SizedBox(height: 16),
                            Text(
                              '오늘의 첫 메모를 추가해보세요!',
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.grey,
                              ),
                            ),
                          ],
                        ),
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: todayMemos.length,
                        itemBuilder: (context, index) {
                          final memo = todayMemos[index];
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: MemoCard(memo: memo),
                          );
                        },
                      ),
              ),
            ],
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) => const AddMemoDialog(),
          );
        },
        child: const Icon(Icons.add),
      ),
    );
  }
} 