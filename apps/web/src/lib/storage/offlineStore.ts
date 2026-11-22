import {
  PendingSyncAction,
  QuestionAttempt,
  StudentProgress,
} from '@signbridge/types';

export const PROGRESS_STORAGE_KEY = 'signbridge_edu_progress_v1';
export const PENDING_QUEUE_KEY = 'signbridge_edu_pending_queue_v1';
export const CURRENT_STUDENT_PROFILE_KEY = 'signbridge_edu_student_profile_v1';

export interface StudentProfile {
  id: string;
  nameKn: string;
  nameEn: string;
  schoolKn: string;
  schoolEn: string;
  grade: number;
  districtKn: string;
  districtEn: string;
}

export const SAMPLE_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'student-kavya',
    nameKn: 'ಕಾವ್ಯ',
    nameEn: 'Kavya',
    schoolKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ಮಂಡ್ಯ',
    schoolEn: 'Government High School, Mandya',
    grade: 8,
    districtKn: 'ಮಂಡ್ಯ',
    districtEn: 'Mandya',
  },
  {
    id: 'student-basavaraj',
    nameKn: 'ಬಸವರಾಜ್',
    nameEn: 'Basavaraj',
    schoolKn: 'ಸರ್ಕಾರಿ ಪ್ರೌಢಶಾಲೆ, ರಾಯಚೂರು',
    schoolEn: 'Government High School, Raichur',
    grade: 8,
    districtKn: 'ರಾಯಚೂರು',
    districtEn: 'Raichur',
  },
  {
    id: 'student-ananya',
    nameKn: 'ಅನನ್ಯ',
    nameEn: 'Ananya',
    schoolKn: 'ಸರ್ಕಾರಿ ಮಾದರಿ ಪ್ರಾಥಮಿಕ ಶಾಲೆ, ಹಾಸನ',
    schoolEn: 'Government Model School, Hassan',
    grade: 8,
    districtKn: 'ಹಾಸನ',
    districtEn: 'Hassan',
  },
];

export const INITIAL_STUDENT_PROGRESS: StudentProgress = {
  completedTopics: ['karn-c8-crop'],
  completedQuizzes: {
    'karn-c8-crop': {
      score: 2,
      total: 3,
      timestamp: Date.now() - 86400000,
      difficulty: 'easy',
    },
  },
  weakTopics: [],
  masteryPercentage: 35,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  questionHistory: [
    {
      questionId: 'q-crop-1',
      topicId: 'karn-c8-crop',
      selectedOption: 0,
      isCorrect: true,
      timestamp: Date.now() - 86400000,
      difficulty: 'easy',
    },
    {
      questionId: 'q-crop-2',
      topicId: 'karn-c8-crop',
      selectedOption: 1,
      isCorrect: true,
      timestamp: Date.now() - 86300000,
      difficulty: 'medium',
    },
    {
      questionId: 'q-crop-3',
      topicId: 'karn-c8-crop',
      selectedOption: 0, // selected wrong option (0 instead of 1)
      isCorrect: false,
      timestamp: Date.now() - 86200000,
      difficulty: 'hard',
    },
  ],
  totalTimeSpentMinutes: 45,
};

export class OfflineStorageManager {
  private progress: StudentProgress = INITIAL_STUDENT_PROGRESS;
  private pendingQueue: PendingSyncAction[] = [];
  private syncListeners: Array<(pendingCount: number, isOnline: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
      window.addEventListener('online', () => this.handleNetworkChange(true));
      window.addEventListener('offline', () => this.handleNetworkChange(false));
    }
  }

  public getProgress(): StudentProgress {
    return { ...this.progress };
  }

  public getPendingQueueCount(): number {
    return this.pendingQueue.length;
  }

  public isOnline(): boolean {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  }

  public onSyncChange(listener: (pendingCount: number, isOnline: boolean) => void): () => void {
    this.syncListeners.push(listener);
    listener(this.pendingQueue.length, this.isOnline());
    return () => {
      this.syncListeners = this.syncListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    const online = this.isOnline();
    const count = this.pendingQueue.length;
    for (const listener of this.syncListeners) {
      listener(count, online);
    }
  }

  private loadFromStorage() {
    try {
      const storedProgress = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (storedProgress) {
        this.progress = JSON.parse(storedProgress);
      } else {
        this.saveProgress(INITIAL_STUDENT_PROGRESS);
      }

      const storedQueue = window.localStorage.getItem(PENDING_QUEUE_KEY);
      if (storedQueue) {
        this.pendingQueue = JSON.parse(storedQueue);
      }
    } catch (err) {
      console.warn('[OfflineStorage] Error reading localStorage:', err);
    }
  }

  public saveProgress(progress: StudentProgress) {
    this.progress = progress;
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
      }
    } catch (err) {
      console.error('[OfflineStorage] Failed to save progress:', err);
    }
    this.notify();
  }

  public recordAttempt(attempt: QuestionAttempt) {
    const current = this.getProgress();
    const updatedHistory = [...current.questionHistory, attempt];

    // Update streak if today
    const today = new Date().toISOString().split('T')[0];
    let streak = current.streakDays;
    if (current.lastActiveDate !== today) {
      streak += 1;
    }

    const updated: StudentProgress = {
      ...current,
      questionHistory: updatedHistory,
      streakDays: streak,
      lastActiveDate: today,
      totalTimeSpentMinutes: current.totalTimeSpentMinutes + 2,
    };

    this.saveProgress(updated);

    // Queue for sync
    this.enqueueAction({
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      type: 'quiz_attempt',
      payload: attempt,
      createdAt: Date.now(),
      retries: 0,
    });
  }

  public markTopicCompleted(topicId: string) {
    const current = this.getProgress();
    if (!current.completedTopics.includes(topicId)) {
      const updated: StudentProgress = {
        ...current,
        completedTopics: [...current.completedTopics, topicId],
      };
      this.saveProgress(updated);

      this.enqueueAction({
        id: 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        type: 'topic_complete',
        payload: { topicId },
        createdAt: Date.now(),
        retries: 0,
      });
    }
  }

  public enqueueAction(action: PendingSyncAction) {
    this.pendingQueue.push(action);
    this.persistQueue();
    this.notify();

    if (this.isOnline()) {
      this.triggerSync();
    }
  }

  private persistQueue() {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(this.pendingQueue));
      }
    } catch (err) {
      console.error('[OfflineStorage] Failed to persist sync queue:', err);
    }
  }

  private async handleNetworkChange(isOnline: boolean) {
    console.log(`[OfflineStorage] Network changed: ${isOnline ? 'ONLINE' : 'OFFLINE'}`);
    this.notify();
    if (isOnline) {
      await this.triggerSync();
    }
  }

  public async triggerSync(): Promise<{ synced: number; remaining: number }> {
    if (!this.isOnline() || this.pendingQueue.length === 0) {
      return { synced: 0, remaining: this.pendingQueue.length };
    }

    console.log(`[OfflineStorage] Starting sync of ${this.pendingQueue.length} pending actions...`);
    const actionsToSync = [...this.pendingQueue];
    let syncedCount = 0;

    try {
      const gatewayUrl = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';
      const response = await fetch(`${gatewayUrl}/api/sync/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actions: actionsToSync,
          progress: this.progress,
        }),
      });

      if (response.ok) {
        // Remove synced actions
        const actionIds = new Set(actionsToSync.map((a) => a.id));
        this.pendingQueue = this.pendingQueue.filter((a) => !actionIds.has(a.id));
        this.persistQueue();
        syncedCount = actionsToSync.length;
        console.log(`[OfflineStorage] Successfully synced ${syncedCount} actions.`);
      }
    } catch (err) {
      console.warn('[OfflineStorage] Background sync error (server unreachable?):', err);
    }

    this.notify();
    return { synced: syncedCount, remaining: this.pendingQueue.length };
  }

  public getActiveStudentProfile(): StudentProfile {
    try {
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(CURRENT_STUDENT_PROFILE_KEY);
        if (stored) return JSON.parse(stored);
      }
    } catch {}
    return SAMPLE_STUDENT_PROFILES[0];
  }

  public setActiveStudentProfile(profile: StudentProfile) {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CURRENT_STUDENT_PROFILE_KEY, JSON.stringify(profile));
      }
    } catch {}
  }
}

export const offlineStorage = new OfflineStorageManager();
