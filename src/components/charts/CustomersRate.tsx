import { Star } from "lucide-react";
import { CardContent } from "../ui/card";

const data = {
  rate: 4.8,
  progress: 85,
};

const CustomersRate = () => {
  return (
    <>
      <div className="gap-y-0">
        <div className="mb-4">
          <p className="font-semibold px-6">تقييم العملاء :</p>
        </div>
        <CardContent>
          <div className="flex justify-center gap-1.5">
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <span
                  key={i}
                  style={{
                    fill:
                      i < Math.floor(data.rate)
                        ? "var(--color-yellow-color)"
                        : "transparent",
                    stroke: "var(--color-yellow-color)",
                  }}
                >
                  <Star className="size-6 stroke-yellow-color fill-inherit" />
                </span>
              ))}
          </div>
        </CardContent>
        <div className="mt-2">
          <p className="w-full text-center font-semibold text-xl text-primary-color">
            {data.rate}/5
          </p>
        </div>
      </div>

      <div>
        <div className="mb-2">
          <p className="font-semibold px-6">نسبة التقدم :</p>
        </div>
        <CardContent>
          <ProgressIndicator percentage={data.progress} />
        </CardContent>
      </div>
    </>
  );
};

export default CustomersRate;

const ProgressIndicator = ({ percentage = 85 }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Percentage bubble */}
      <div className="relative mb-2">
        <div className="bg-primary-color text-white text-xs px-2 py-2 rounded-md flex items-center justify-center min-w-10">
          {percentage}%
        </div>
        {/* Triangle pointer */}
        <div
          className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent absolute left-1/2 -bottom-2 -translate-x-1/2"
          style={{ borderTopColor: "#3498db" }}
        />
      </div>

      {/* Progress bar with gradient */}
      <div className="w-full h-2 rounded-full bg-[#D0FFE1]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, #FF0A09 0%, #06FD3C 100%)",
          }}
        />
      </div>
    </div>
  );
};
