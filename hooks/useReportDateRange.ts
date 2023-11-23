import { useMemo } from "react";

import dayjs from "dayjs";

export default function useReportDateRange() {
  const startDate = useMemo(
    () => dayjs().startOf("year").format("YYYY-MM-DD"),
    [],
  );
  const endDate = useMemo(
    () => dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    [],
  );

  return { startDate, endDate };
}
