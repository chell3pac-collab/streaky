'use client';

import type { Habit } from '@/lib/types';
import { computeStreak, formatDayLabel, getShortWeekday, toDateKey } from '@/lib/dates';

type Props = {
  habit: Habit;
  weekDays: Date[];
  todayKey: string;
  onToggleDay: (habitId: string, dateKey: string) => void;
  onRemove: (habitId: string) => void;
};

export default function HabitCard({ habit, weekDays, todayKey, onToggleDay, onRemove }: Props) {
  const doneDays = new Set(habit.completions);
  const streak = computeStreak(habit.completions);

  return (
    <article className={`habit-card habit-card--${habit.color}`}>
      <header className="habit-card__head">
        <span className="habit-card__emoji" aria-hidden="true">
          {habit.emoji}
        </span>
        <h3 className="habit-card__title">{habit.title}</h3>
        <span className="habit-card__streak">🔥 {streak}</span>
        <button
          type="button"
          className="habit-card__remove"
          onClick={() => onRemove(habit.id)}
          aria-label={`Удалить привычку «${habit.title}»`}
        >
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <ul className="week-grid">
        {weekDays.map((day) => {
          const dateKey = toDateKey(day);
          const isDone = doneDays.has(dateKey);
          const isFuture = dateKey > todayKey;

          return (
            <li key={dateKey}>
              <button
                type="button"
                className={`week-grid__day${isDone ? ' week-grid__day--done' : ''}`}
                disabled={isFuture}
                aria-pressed={isDone}
                aria-label={`${isDone ? 'Убрать отметку' : 'Отметить'}: ${formatDayLabel(day)}`}
                onClick={() => onToggleDay(habit.id, dateKey)}
              >
                <span className="week-grid__weekday" aria-hidden="true">
                  {getShortWeekday(day)}
                </span>
                <span className="week-grid__date" aria-hidden="true">
                  {day.getDate()}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
