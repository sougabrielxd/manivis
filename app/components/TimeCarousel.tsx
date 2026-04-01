export default function TimeCarousel({ children }: { children: React.ReactNode }) {
  return (
    <div className="time-grid">
      <div className="time-track">
        {children}
        {children}
      </div>
    </div>
  );
}
