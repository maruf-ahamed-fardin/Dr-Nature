export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] pointer-events-none">
      <div className="h-[2.5px] w-full bg-[#EEF2ED] overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#126336] via-[#B39868] to-[#126336] animate-[pulse_1s_ease-in-out_infinite] w-2/3" />
      </div>
    </div>
  );
}
