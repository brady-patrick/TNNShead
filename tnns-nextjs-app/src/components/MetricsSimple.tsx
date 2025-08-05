import React from "react";

interface MetricsSimpleProps {
  title: string;
  subtitle: string;
  trend?: "positive" | "negative" | "neutral";
  type?: "modern" | "classic";
  footer?: React.ReactNode;
  change?: string;
}

export const MetricsSimple: React.FC<MetricsSimpleProps> = ({
  title,
  subtitle,
  trend = "neutral",
  type = "modern",
  footer = null,
  change,
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "positive":
        return "↗";
      case "negative":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{subtitle}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{title}</p>
        </div>
        {change && (
          <div className={`flex items-center text-sm font-medium ${getTrendColor()}`}>
            <span className="mr-1">{getTrendIcon()}</span>
            {change}
          </div>
        )}
      </div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}; 