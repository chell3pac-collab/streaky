const WEEKDAY_LABELS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'] as const;

/** 'YYYY-MM-DD' в локальном времени — надёжный ключ дня */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** 7 дат текущей недели, начиная с понедельника */
export function getWeekDays(reference: Date = new Date()): Date[] {
  const weekdayIndex = (reference.getDay() + 6) % 7; // 0 — понедельник
  const monday = new Date(reference);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - weekdayIndex);

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);
    return day;
  });
}

/** Короткое имя дня недели: 'пн', 'вт'… */
export function getShortWeekday(date: Date): string {
  return WEEKDAY_LABELS[(date.getDay() + 6) % 7];
}

/** Человекочитаемая дата для aria-label: «понедельник, 13 октября» */
export function formatDayLabel(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

/**
 * Текущий стрик: сколько последних дней подряд отмечено.
 * Если сегодня ещё не отмечено — стрик не «сломан», считаем со вчера.
 */
export function computeStreak(completions: string[], today: Date = new Date()): number {
  const doneDays = new Set(completions);
  let streak = 0;

  const cursor = new Date(today);
  cursor.setHours(0, 0, 0, 0);
  if (!doneDays.has(toDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (doneDays.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
