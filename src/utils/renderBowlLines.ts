
export function renderBowlLines(builderData: any) {
  if (!builderData) return [];

  // Helper to format duplicates as "x2"
  const formatWithCounts = (arr: string[]) => {
    if (!arr || arr.length === 0) return '';
    
    const counts = arr.reduce((map, item) => {
      map[item] = (map[item] || 0) + 1;
      return map;
    }, {} as Record<string, number>);
    
    return Object.entries(counts)
      .map(([name, count]) => count > 1 ? `${name} x${count}` : name)
      .join(', ');
  };

  const lines: string[] = [];

  if (builderData.base?.length > 0) {
    lines.push(`Base : ${formatWithCounts(builderData.base)}`);
  }

  if (builderData.sauce?.length > 0) {
    lines.push(`Sauce : ${formatWithCounts(builderData.sauce)}`);
  }

  if (builderData.garnitures?.length > 0) {
    lines.push(`Garnitures : ${formatWithCounts(builderData.garnitures)}`);
  }

  if (builderData.protein) {
    lines.push(`Protéine : ${builderData.protein}`);
  }

  if (builderData.toppings?.length > 0) {
    lines.push(`Toppings : ${formatWithCounts(builderData.toppings)}`);
  }

  // Add extra items separately
  if (builderData.extraSauce?.length > 0) {
    lines.push(`Extras sauce : ${formatWithCounts(builderData.extraSauce)}`);
  }

  if (builderData.extraGarniture?.length > 0) {
    lines.push(`Extras garniture : ${formatWithCounts(builderData.extraGarniture)}`);
  }

  if (builderData.extraProtein?.length > 0) {
    lines.push(`Extras protéine : ${formatWithCounts(builderData.extraProtein)}`);
  }

  return lines;
}
