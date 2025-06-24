
export function renderBowlLines(builderData: any) {
  console.log('renderBowlLines called with builderData:', builderData);
  
  if (!builderData) {
    console.log('No builderData provided, returning empty array');
    return [];
  }

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

  // Log each field before processing
  console.log('Processing base:', builderData.base);
  if (builderData.base && Array.isArray(builderData.base) && builderData.base.length > 0) {
    lines.push(`Base : ${formatWithCounts(builderData.base)}`);
  }

  console.log('Processing sauce:', builderData.sauce);
  if (builderData.sauce && Array.isArray(builderData.sauce) && builderData.sauce.length > 0) {
    lines.push(`Sauce : ${formatWithCounts(builderData.sauce)}`);
  }

  console.log('Processing garnitures:', builderData.garnitures);
  if (builderData.garnitures && Array.isArray(builderData.garnitures) && builderData.garnitures.length > 0) {
    lines.push(`Garnitures : ${formatWithCounts(builderData.garnitures)}`);
  }

  console.log('Processing protein:', builderData.protein);
  if (builderData.protein && builderData.protein !== null && builderData.protein !== '') {
    lines.push(`Protéine : ${builderData.protein}`);
  }

  console.log('Processing toppings:', builderData.toppings);
  if (builderData.toppings && Array.isArray(builderData.toppings) && builderData.toppings.length > 0) {
    lines.push(`Toppings : ${formatWithCounts(builderData.toppings)}`);
  }

  // Add extra items separately
  console.log('Processing extraSauce:', builderData.extraSauce);
  if (builderData.extraSauce && Array.isArray(builderData.extraSauce) && builderData.extraSauce.length > 0) {
    lines.push(`Extras sauce : ${formatWithCounts(builderData.extraSauce)}`);
  }

  console.log('Processing extraGarniture:', builderData.extraGarniture);
  if (builderData.extraGarniture && Array.isArray(builderData.extraGarniture) && builderData.extraGarniture.length > 0) {
    lines.push(`Extras garniture : ${formatWithCounts(builderData.extraGarniture)}`);
  }

  console.log('Processing extraProtein:', builderData.extraProtein);
  if (builderData.extraProtein && Array.isArray(builderData.extraProtein) && builderData.extraProtein.length > 0) {
    lines.push(`Extras protéine : ${formatWithCounts(builderData.extraProtein)}`);
  }

  console.log('Final lines array:', lines);
  
  // If no lines were generated but we have builderData, add a fallback
  if (lines.length === 0 && builderData.size) {
    lines.push('Configuration personnalisée');
  }

  return lines;
}
