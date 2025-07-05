// utils/parseReport.js

function isAbnormal(value: number, range: string) {
    const match = range.match(/([\d.]+)\s*-\s*([\d.]+)/);
    if (!match) return false;
  
    const [, minStr, maxStr] = match;
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);
  
    return value < min || value > max;
  }
  
  export function parseHealthReport(text: string) {
    console.log('parseHealthReport received text:', text);
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const healthData = [];
  
    const pattern = /^([A-Za-z\s]+)\s+([\d.]+)\s*([a-zA-Z/%µuL\d.-]*)\s+([\d.-]+\s*-\s*[\d.-]+)/;
  
    for (const line of lines) {
      const match = line.match(pattern);
      if (match) {
        const [, parameter, valueStr, unit, range] = match;
        const value = parseFloat(valueStr);
        const abnormal = isAbnormal(value, range);
  
        healthData.push({
          parameter: parameter.trim(),
          value,
          unit: unit.trim(),
          range: range.trim(),
          status: abnormal ? 'Needs Attention' : 'Normal',
        });
      }
    }
  
    return healthData;
  }
  