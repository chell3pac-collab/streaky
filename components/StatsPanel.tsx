'use client';

import { useMemo } from 'react';
import type { Habit } from '@/lib/types';
import { computeStreak, getWeekDays, toDateKey } from '@/lib/dates';

type Props = {
  habits: Habit[];
};

export default function StatsPanel({ habits }: Props) {
  const weekKeys = useMemo(() => getWeekDays().map(toDateKey), []);

  const stats = useMemo(() => {
    let weekDone = 0;
    let bestStreak = 0;

    for (const habit of habits) {
      const doneDays = new Set(habit.completions);

      for (const dateKey of weekKeys) {
        if (doneDays.has(dateKey)) {
          weekDone += 1;
        }
      }

      bestStreak = Math.max(bestStreak, computeStreak(habit.completions));
    }

    const weekTarget = habits.length * 7;
    const percent = weekTarget === 0 ? 0 : Math.round((weekDone / weekTarget) * 100);

    return { weekDone, weekTarget, percent, bestStreak };
  }, [habits, weekKeys]);

  return (
    <section className="stats-panel" aria-labelledby="stats-heading">
      <h2 className="stats-panel__title" id="stats-heading">
        Прогресс недели
      </h2>

      <ul className="stats-panel__list">
        <li className="stats-panel__item">
          <span className="stats-panel__value">{habits.length}</span>
          <span className="stats-panel__label">привычек</span>
        </li>
        <li className="stats-panel__item">
          <span className="stats-panel__value">
            {stats.weekDone}/{stats.weekTarget}
          </span>
          <span className="stats-panel__label">отметок за неделю</span>
        </li>
        <li className="stats-panel__item">
          <span className="stats-panel__value">{stats.bestStreak} дн.</span>
          <span className="stats-panel__label">лучший стрик</span>
        </li>
      </ul>

      <label className="stats-panel__progress-label" htmlFor="week-progress">
        Заполнено {stats.percent}% недели
      </label>
      <progress className="stats-panel__progress" id="week-progress" value={stats.percent} max={100} />
    </section>
  );
}
