import page from '../../styles/page.module.css';

export function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className={page.steps} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`${page.step} ${i < current ? page.stepDone : ''}`}
        />
      ))}
    </div>
  );
}
