import type { Habit } from './types';
import { createId } from './uuid';

const STORAGE_KEY = 'streaky.habits.v1';

/** Две стартовые привычки — чтобы первый экран не был пустым */
export function createSeedHabits(): Habit[] {
  return [
    {
      id: createId(),
      title: 'Пить 2 литра воды',
      emoji: '💧',
      color: 'blue',
      createdAt: new Date().toISOString(),
      completions: [],
    },
    {
      id: createId(),
      title: 'Читать 20 минут',
      emoji: '📖',
      color: 'orange',
      createdAt: new Date().toISOString(),
      completions: [],
    },
  ];
}

export function loadHabits(): Habit[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createSeedHabits();
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return createSeedHabits();
    }

    // Минимальная санитизация: пропускаем только похожие на привычку объекты
    return parsed.filter(
      (item): item is Habit =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Habit).id === 'string' &&
        typeof (item as Habit).title === 'string' &&
        Array.isArray((item as Habit).completions)
    );
  } catch {
    return createSeedHabits();
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch {
    // Переполнение или приватный режим — приложение продолжает работать без сохранения
  }
}
