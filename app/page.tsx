'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import HabitForm from '@/components/HabitForm';
import HabitList from '@/components/HabitList';
import StatsPanel from '@/components/StatsPanel';
import { getWeekDays, toDateKey } from '@/lib/dates';
import { loadHabits, saveHabits } from '@/lib/storage';
import type { Habit, HabitColor } from '@/lib/types';
import { createId } from '@/lib/uuid';

export default function HomePage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загружаем сохранённые привычки после монтирования (localStorage недоступен на сервере)
  useEffect(() => {
    setHabits(loadHabits());
    setIsLoaded(true);
  }, []);

  // Сохраняем только после первой загрузки, чтобы не затереть данные пустым массивом
  useEffect(() => {
    if (isLoaded) {
      saveHabits(habits);
    }
  }, [habits, isLoaded]);

  const weekDays = useMemo(() => getWeekDays(), []);
  const todayKey = useMemo(() => toDateKey(new Date()), []);

  const handleAdd = useCallback((title: string, emoji: string, color: HabitColor) => {
    const newHabit: Habit = {
      id: createId(),
      title,
      emoji,
      color,
      createdAt: new Date().toISOString(),
      completions: [],
    };
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  }, []);

  const handleToggleDay = useCallback((habitId: string, dateKey: string) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }

        const isDone = habit.completions.includes(dateKey);
        return {
          ...habit,
          completions: isDone
            ? habit.completions.filter((day) => day !== dateKey)
            : [...habit.completions, dateKey],
        };
      })
    );
  }, []);

  const handleRemove = useCallback((habitId: string) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== habitId));
  }, []);

  return (
    <div className="page__inner">
      <StatsPanel habits={habits} />
      <HabitForm onAdd={handleAdd} />
      <HabitList
        habits={habits}
        weekDays={weekDays}
        todayKey={todayKey}
        isLoading={!isLoaded}
        onToggleDay={handleToggleDay}
        onRemove={handleRemove}
      />
    </div>
  );
}
