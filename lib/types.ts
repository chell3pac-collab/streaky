export type HabitColor = 'blue' | 'green' | 'orange' | 'violet';

export type Habit = {
  id: string;
  title: string;
  emoji: string;
  color: HabitColor;
  createdAt: string;
  /** ISO-ключи дней вида 'YYYY-MM-DD', которые пользователь отметил */
  completions: string[];
};
