'use client';

import type { Habit } from '@/lib/types';
import HabitCard from './HabitCard';

type Props = {
  habits: Habit[];
  weekDays: Date[];
  todayKey: string;
  isLoading: boolean;
  onToggleDay: (habitId: string, dateKey: string) => void;
  onRemove: (habitId: string) => void;
};

export default function HabitList({
  habits,
  weekDays,
  todayKey,
  isLoading,
  onToggleDay,
  onRemove,
}: Props) {
  return (
    <section className="habits" aria-labelledby="habits-heading">
      <h2 className="section-title" id="habits-heading">
        Мои привычки
      </h2>

      {isLoading && (
        <ul className="habit-list" aria-hidden="true">
          <li className="habit-card habit-card--skeleton" />
          <li className="habit-card habit-card--skeleton" />
        </ul>
      )}

      {!isLoading && habits.length === 0 && (
        <div className="habit-list__empty">
          <span className="habit-list__empty-emoji" aria-hidden="true">
            🌱
          </span>
          <p>Пока пусто. Добавь первую привычку — и стрики посчитаются сами.</p>
        </div>
      )}

      {!isLoading && habits.length > 0 && (
        <ul className="habit-list">
          {habits.map((habit) => (
            <li key={habit.id}>
              <HabitCard
                habit={habit}
                weekDays={weekDays}
                todayKey={todayKey}
                onToggleDay={onToggleDay}
                onRemove={onRemove}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
