export default function OrderTracker({ status }) {
  const steps = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

  const normalizedStatus = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : "";

  const currentStep = steps.indexOf(normalizedStatus);

  if (normalizedStatus === "Cancelled") {
    return (
      <div className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-red-600 font-semibold text-center">
        This order has been cancelled
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative flex items-start justify-between gap-2">
        <div className="absolute top-5 left-0 right-0 h-1 bg-secondary/15 rounded-full"></div>

        <div
          className="absolute top-5 left-0 h-1 bg-accent rounded-full transition-all duration-500"
          style={{
            width:
              currentStep <= 0
                ? "0%"
                : `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step}
              className="relative z-10 flex flex-1 flex-col items-center text-center"
            >
              <div
                className={[
                  "w-11 h-11 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300",
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30"
                    : isCurrent
                    ? "bg-accent border-accent text-white shadow-lg shadow-accent/30 scale-110"
                    : "bg-white border-secondary/20 text-secondary/50",
                ].join(" ")}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              <p
                className={[
                  "mt-2 text-xs sm:text-sm font-semibold transition-colors duration-300",
                  isCompleted
                    ? "text-green-600"
                    : isCurrent
                    ? "text-accent"
                    : "text-secondary/50",
                ].join(" ")}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}