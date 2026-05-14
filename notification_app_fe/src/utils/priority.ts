export function getTopNotifications(notifications: any[]) {

  const priorityMap: Record<string, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const sorted = [...notifications].sort((a, b) => {

    const priorityDifference =
      priorityMap[b.Type] - priorityMap[a.Type];

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return (
      new Date(b.Timestamp).getTime() -
      new Date(a.Timestamp).getTime()
    );
  });

  return sorted.slice(0, 10);
}