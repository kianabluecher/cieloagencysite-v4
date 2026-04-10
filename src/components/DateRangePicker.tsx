import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  lightTheme?: boolean;
}

export function DateRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  lightTheme = false,
}: DateRangePickerProps) {
  return (
    <div className="relative flex-shrink-0">
      <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
        lightTheme 
          ? "bg-white border-zinc-200 text-zinc-900" 
          : "bg-zinc-950 border-zinc-800 text-white"
      }`}>
        <Calendar className={`w-4 h-4 ${lightTheme ? "text-zinc-600" : "text-zinc-400"}`} />
        <div className="flex items-center gap-2 font-['DM_Mono'] text-[9px] tracking-wider uppercase">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`bg-transparent border-none outline-none w-[110px] ${
              lightTheme ? "text-zinc-900" : "text-white"
            } [color-scheme:${lightTheme ? 'light' : 'dark'}]`}
            placeholder="MM/DD/YYYY"
          />
          <span className={lightTheme ? "text-zinc-400" : "text-zinc-600"}>—</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`bg-transparent border-none outline-none w-[110px] ${
              lightTheme ? "text-zinc-900" : "text-white"
            } [color-scheme:${lightTheme ? 'light' : 'dark'}]`}
            placeholder="MM/DD/YYYY"
          />
        </div>
      </div>
    </div>
  );
}