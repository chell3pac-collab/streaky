'use client';

import { useState, type FormEvent } from 'react';
import type { HabitColor } from '@/lib/types';

const EMOJI_OPTIONS = ['💧', '🏃', '📖', '🧘', '💪', '🌙'] as const;
const COLOR_OPTIONS: HabitColor[] = ['blue', 'green', 'orange', 'violet'];

const COLOR_LABELS: Record<HabitColor, string> = {
  blue: 'Синий',
  green: 'Зелёный',
  orange: 'Оранжевый',
  violet: 'Фиолетовый',
};

type Props = {
  onAdd: (title: string, emoji: string, color: HabitColor) => void;
};

export default function HabitForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState<string>(EMOJI_OPTIONS[0]);
  const [color, setColor] = useState<HabitColor>('blue');

  const trimmedTitle = title.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmedTitle) {
      return;
    }

    onAdd(trimmedTitle, emoji, color);
    setTitle('');
  }

  return (
    <section className="habit-form" aria-labelledby="habit-form-heading">
      <h2 className="habit-form__title" id="habit-form-heading">
        Новая привычка
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="habit-form__fields">
          <label className="habit-form__field">
            <span className="habit-form__label">Название</span>
            <input
              className="habit-form__input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Например, «10 000 шагов»"
              maxLength={40}
            />
          </label>

          <fieldset className="habit-form__field">
            <legend className="habit-form__label">Иконка</legend>
            <div className="habit-form__options">
              {EMOJI_OPTIONS.map((option) => (
                <label key={option} className="habit-form__option">
                  <input
                    type="radio"
                    name="habit-emoji"
                    className="habit-form__option-input visually-hidden"
                    value={option}
                    checked={emoji === option}
                    onChange={() => setEmoji(option)}
                  />
                  <span className="habit-form__option-face" aria-hidden="true">
                    {option}
                  </span>
                  <span className="visually-hidden">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="habit-form__field">
            <legend className="habit-form__label">Цвет</legend>
            <div className="habit-form__options">
              {COLOR_OPTIONS.map((option) => (
                <label key={option} className="habit-form__option">
                  <input
                    type="radio"
                    name="habit-color"
                    className="habit-form__option-input visually-hidden"
                    value={option}
                    checked={color === option}
                    onChange={() => setColor(option)}
                  />
                  <span
                    className={`habit-form__option-face habit-form__option-face--${option}`}
                    title={COLOR_LABELS[option]}
                  >
                    <span className="visually-hidden">{COLOR_LABELS[option]}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <button type="submit" className="habit-form__submit" disabled={!trimmedTitle}>
          Добавить
        </button>
      </form>
    </section>
  );
}
