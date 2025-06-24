
export function renderBowlLines(builderData: any) {
  console.log('renderBowlLines called with builderData:', builderData);
  
  if (!builderData) {
    console.log('No builderData provided, returning empty array');
    return [];
  }

  // Helper to format duplicates as "x2"
  const formatWithCounts = (arr: string[]) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return '';
    
    const counts = arr.reduce((map, item) => {
      if (item && typeof item === 'string') {
        map[item] = (map[item] || 0) + 1;
      }
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
    const baseText = formatWithCounts(builderData.base);
    if (baseText) {
      lines.push(`Base : ${baseText}`);
    }
  }

  console.log('Processing sauce:', builderData.sauce);
  if (builderData.sauce && Array.isArray(builderData.sauce) && builderData.sauce.length > 0) {
    const sauceText = formatWithCounts(builderData.sauce);
    if (sauceText) {
      lines.push(`Sauce : ${sauceText}`);
    }
  }

  console.log('Processing garnitures:', builderData.garnitures);
  if (builderData.garnitures && Array.isArray(builderData.garnitures) && builderData.garnitures.length > 0) {
    const garnituresText = formatWithCounts(builderData.garnitures);
    if (garnituresText) {
      lines.push(`Garnitures : ${garnituresText}`);
    }
  }

  console.log('Processing protein:', builderData.protein);
  if (builderData.protein && builderData.protein !== null && builderData.protein !== '' && typeof builderData.protein === 'string') {
    lines.push(`Protéine : ${builderData.protein}`);
  }

  console.log('Processing toppings:', builderData.toppings);
  if (builderData.toppings && Array.isArray(builderData.toppings) && builderData.toppings.length > 0) {
    const toppingsText = formatWithCounts(builderData.toppings);
    if (toppingsText) {
      lines.push(`Toppings : ${toppingsText}`);
    }
  }

  // Add extra items separately
  console.log('Processing extraSauce:', builderData.extraSauce);
  if (builderData.extraSauce && Array.isArray(builderData.extraSauce) && builderData.extraSauce.length > 0) {
    const extraSauceText = formatWithCounts(builderData.extraSauce);
    if (extraSauceText) {
      lines.push(`Extras sauce : ${extraSauceText}`);
    }
  }

  console.log('Processing extraGarniture:', builderData.extraGarniture);
  if (builderData.extraGarniture && Array.isArray(builderData.extraGarniture) && builderData.extraGarniture.length > 0) {
    const extraGarnitureText = formatWithCounts(builderData.extraGarniture);
    if (extraGarnitureText) {
      lines.push(`Extras garniture : ${extraGarnitureText}`);
    }
  }

  console.log('Processing extraProtein:', builderData.extraProtein);
  if (builderData.extraProtein && Array.isArray(builderData.extraProtein) && builderData.extraProtein.length > 0) {
    const extraProteinText = formatWithCounts(builderData.extraProtein);
    if (extraProteinText) {
      lines.push(`Extras protéine : ${extraProteinText}`);
    }
  }

  console.log('Final lines array:', lines);
  
  // Enhanced fallback - only show if we have builderData but no meaningful content was extracted
  if (lines.length === 0 && builderData && Object.keys(builderData).length > 1) {
    // Check if we have any meaningful data at all
    const hasAnyData = 
      (builderData.base && Array.isArray(builderData.base) && builderData.base.length > 0) ||
      (builderData.sauce && Array.isArray(builderData.sauce) && builderData.sauce.length > 0) ||
      (builderData.garnitures && Array.isArray(builderData.garnitures) && builderData.garnitures.length > 0) ||
      (builderData.protein && builderData.protein !== null && builderData.protein !== '') ||
      (builderData.toppings && Array.isArray(builderData.toppings) && builderData.toppings.length > 0) ||
      (builderData.extraSauce && Array.isArray(builderData.extraSauce) && builderData.extraSauce.length > 0) ||
      (builderData.extraGarniture && Array.isArray(builderData.extraGarniture) && builderData.extraGarniture.length > 0) ||
      (builderData.extraProtein && Array.isArray(builderData.extraProtein) && builderData.extraProtein.length > 0);
    
    if (!hasAnyData && builderData.size) {
      lines.push('Configuration personnalisée');
    }
  }

  return lines;
}
