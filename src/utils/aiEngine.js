// AI Engine Logic & Datasets

export const branches = [
  'Computer Science', 'Mechanical', 'Electrical', 'Civil',
  'Biotechnology', 'Electronics', 'Chemical', 'Aerospace', 'Physics', 'Data Science', 'Design'
];

export const budgets = [
  '₹20k–30k', '₹30k–40k', '₹40k–50k', '₹50k–60k', '₹60k–70k',
  '₹70k–80k', '₹80k–90k', '₹90k–1.1L', '₹1.1L–1.3L'
];

export const workloads = [
  'Coding', 'Machine Learning', 'CAD', 'Simulation', 'Rendering', 'Balanced'
];

export const deviceTypes = ['Desktop', 'Laptop'];

const parseBudget = (budgetStr) => {
  if (budgetStr === '₹20k–30k') return 30000;
  if (budgetStr === '₹30k–40k') return 40000;
  if (budgetStr === '₹40k–50k') return 50000;
  if (budgetStr === '₹50k–60k') return 60000;
  if (budgetStr === '₹60k–70k') return 70000;
  if (budgetStr === '₹70k–80k') return 80000;
  if (budgetStr === '₹80k–90k') return 90000;
  if (budgetStr === '₹90k–1.1L') return 110000;
  if (budgetStr === '₹1.1L–1.3L') return 130000;
  return 60000; // default
};

// --- DATASETS (DESKTOP) ---

const cpus = [
  { name: 'Intel Core i3-12100F', price: 7800, score: 55, brand: 'Intel' },
  { name: 'AMD Ryzen 5 4500', price: 6500, score: 50, brand: 'AMD' },
  { name: 'Intel Core i5-12400F', price: 12500, score: 70, brand: 'Intel' },
  { name: 'AMD Ryzen 5 5600', price: 11500, score: 72, brand: 'AMD' },
  { name: 'Intel Core i5-13400F', price: 18500, score: 82, brand: 'Intel' },
  { name: 'AMD Ryzen 7 5800X', price: 19500, score: 85, brand: 'AMD' },
  { name: 'Intel Core i7-12700K', price: 24500, score: 92, brand: 'Intel' },
  { name: 'AMD Ryzen 9 7900X', price: 42000, score: 96, brand: 'AMD' },
];

const gpus = [
  { name: 'Integrated Graphics', price: 0, score: 30, tier: 0 },
  { name: 'NVIDIA GTX 1650 4GB', price: 10500, score: 50, tier: 1 },
  { name: 'NVIDIA GTX 1660 Super', price: 11500, score: 55, tier: 1 },
  { name: 'AMD Radeon RX 6600', price: 19500, score: 68, tier: 2 },
  { name: 'NVIDIA RTX 3060 12GB', price: 21500, score: 75, tier: 3 },
  { name: 'NVIDIA RTX 4060 8GB', price: 26500, score: 80, tier: 3 },
  { name: 'NVIDIA RTX 3070 Ti', price: 34000, score: 88, tier: 3 },
  { name: 'NVIDIA RTX 4070 Super', price: 58000, score: 95, tier: 4 },
  { name: 'AMD Radeon RX 7800 XT', price: 52000, score: 90, tier: 4 },
];

const rams = [
  { name: '8GB DDR4 3200MHz', price: 1900, score: 50, size: 8 },
  { name: '16GB DDR4 3200MHz', price: 3600, score: 75, size: 16 },
  { name: '32GB DDR4 3600MHz', price: 6800, score: 85, size: 32 },
  { name: '32GB DDR5 5200MHz', price: 9500, score: 92, size: 32 },
  { name: '64GB DDR5 6000MHz', price: 18500, score: 98, size: 64 },
];

const storages = [
  { name: '500GB NVMe Gen3', price: 3200, score: 65, size: 512 },
  { name: '1TB NVMe Gen3', price: 5200, score: 75, size: 1024 },
  { name: '1TB NVMe Gen4', price: 7500, score: 85, size: 1024 },
  { name: '2TB NVMe Gen4', price: 12500, score: 95, size: 2048 },
];

// Random Helpers
const pickRandom = (arr, seed) => {
  if (arr.length === 0) return null;
  // A simple pseudo-random hash based on string seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  const index = Math.abs(hash) % arr.length;
  return arr[index];
};

const pickTrulyRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Ensure cost fits budget constraints
const validateBuild = (cpu, gpu, ram, storage, otherCost) => {
  return cpu.price + gpu.price + ram.price + storage.price + otherCost;
};

const getDesktopConfig = (branch, budgetStr, workload) => {
  const maxBudget = parseBudget(budgetStr);
  const otherCost = 12000; // Case, PSU (Bronze/Gold), Mobo (B450/B660)

  // Base Weights: CPU ~30%, GPU ~40%, RAM ~15%, Storage ~15%
  let cpuB = (maxBudget - otherCost) * 0.30;
  let gpuB = (maxBudget - otherCost) * 0.40;
  let ramB = (maxBudget - otherCost) * 0.15;
  let stoB = (maxBudget - otherCost) * 0.15;

  // Hard constraints
  let maxGpuTier = 4;
  let minGpuTier = 0;
  let maxRamSize = 64;
  let maxStorageSize = 2048;

  if (maxBudget < 40000) {
    maxGpuTier = 0; // Integrated only
  } else if (maxBudget <= 60000) {
    maxGpuTier = 1; // GTX 1650 class
    maxRamSize = 16;
  } else if (maxBudget <= 80000) {
    maxGpuTier = 3; // RTX 3060 class
    maxStorageSize = 1024;
  } else {
    minGpuTier = 3; // RTX 3060+
  }

  // Filter components by constraints
  const availableGPUs = gpus.filter(g => g.tier >= minGpuTier && g.tier <= maxGpuTier);
  const availableRAMs = rams.filter(r => r.size <= maxRamSize);
  const availableStorages = storages.filter(s => s.size <= maxStorageSize);

  // Force Alternating CPUs
  const budgetIndex = budgets.indexOf(budgetStr);
  const forcedBrand = budgetIndex % 2 === 0 ? 'Intel' : 'AMD';
  const availableCPUs = cpus.filter(c => c.brand === forcedBrand);

  // Initial selection
  const filterByBudget = (arr, b) => arr.filter(x => x.price <= b).sort((a,b) => b.score - a.score);
  
  let cpuOpts = filterByBudget(availableCPUs, cpuB);
  let gpuOpts = filterByBudget(availableGPUs, gpuB);
  let ramOpts = filterByBudget(availableRAMs, ramB);
  let stoOpts = filterByBudget(availableStorages, stoB);

  // Fallbacks if budget is too tight
  if (cpuOpts.length === 0) cpuOpts = [availableCPUs[0]];
  if (gpuOpts.length === 0) gpuOpts = [availableGPUs[0]];
  if (ramOpts.length === 0) ramOpts = [availableRAMs[0]];
  if (stoOpts.length === 0) stoOpts = [availableStorages[0]];

  // Pick deterministic random top candidates
  const seed = budgetStr + workload + branch;
  let cpu = pickRandom(cpuOpts.slice(0, 2), seed + 'c');
  let gpu = pickRandom(gpuOpts.slice(0, 2), seed + 'g');
  let ram = pickRandom(ramOpts.slice(0, 2), seed + 'r');
  let storage = pickRandom(stoOpts.slice(0, 2), seed + 's');

  // Validation & Auto-Adjustment Loop
  let totalCost = validateBuild(cpu, gpu, ram, storage, otherCost);
  
  while (totalCost > maxBudget) {
    const cheaperGPUs = filterByBudget(availableGPUs, gpu.price - 1000);
    if (cheaperGPUs.length > 0 && gpu.tier > 0) {
      gpu = cheaperGPUs[0];
    } else {
      const cheaperCPUs = filterByBudget(availableCPUs, cpu.price - 1000);
      if (cheaperCPUs.length > 0) cpu = cheaperCPUs[0];
      else break;
    }
    totalCost = validateBuild(cpu, gpu, ram, storage, otherCost);
  }

  const overallScore = Math.round((cpu.score*0.3) + (gpu.score*0.4) + (ram.score*0.15) + (storage.score*0.15));
  let grade = overallScore >= 90 ? 'A+' : overallScore >= 80 ? 'A' : overallScore >= 70 ? 'B+' : 'B';

  let reason = `At an estimated component cost of ₹${totalCost.toLocaleString()}, this ${cpu.brand} build offers strong value. `;
  if (gpu.tier === 0) reason += `We prioritized the CPU (${cpu.name}) and fast storage to stay within the strict budget constraints.`;
  else reason += `The ${gpu.name} paired with ${ram.size}GB RAM handles complex ${workload || branch} tasks well.`;

  return {
    deviceType: 'Desktop',
    specs: [
      { icon: 'Cpu', label: 'Processor', value: cpu.name },
      { icon: 'Zap', label: 'Graphics', value: gpu.name },
      { icon: 'HardDrive', label: 'Memory', value: ram.name },
      { icon: 'Binary', label: 'Storage', value: storage.name },
    ],
    componentPrices: {
      cpu: cpu.price,
      gpu: gpu.price,
      ram: ram.price,
      storage: storage.price,
      others: otherCost,
    },
    estimatedCost: `₹${totalCost.toLocaleString()}`,
    score: overallScore,
    grade,
    reason,
    upgradePath: [
      `Year 2: Upgrade RAM to ${ram.size * 2}GB.`,
      gpu.tier === 0 ? `Year 3: Add dedicated GPU (RTX 3050).` : `Year 3: Upgrade to Next-Gen GPU.`,
      `Year 4: Trade-in for CampusLoop Credit.`
    ]
  };
};

const getLaptopConfig = (branch, budgetStr, workload) => {
  const maxBudget = parseBudget(budgetStr);
  
  let cpu, ram, gpu, storage;
  let score, grade;

  if (maxBudget <= 35000) {
    cpu = pickTrulyRandom(['Intel Core i5 10th Gen', 'AMD Ryzen 5 3500U', 'Intel Core i5 8th Gen']);
    ram = '8GB DDR4';
    gpu = 'Intel UHD Graphics';
    storage = '256GB SSD';
    score = 65; grade = 'B';
  } else if (maxBudget <= 55000) {
    cpu = pickTrulyRandom(['Intel Core i5 11th Gen', 'AMD Ryzen 5 5500U', 'Intel Core i7 10th Gen']);
    ram = '16GB DDR4';
    gpu = pickTrulyRandom(['NVIDIA GTX 1650 (Mobile)', 'Intel Iris Xe Graphics']);
    storage = '512GB NVMe SSD';
    score = 78; grade = 'B+';
  } else {
    cpu = pickTrulyRandom(['Intel Core i7 12th Gen', 'AMD Ryzen 7 5800H', 'Apple M1 (8-Core)']);
    ram = pickTrulyRandom(['16GB DDR5', '16GB Unified']);
    gpu = pickTrulyRandom(['RTX 3050 (Mobile)', 'RTX 3060 (Mobile)']);
    storage = '1TB NVMe SSD';
    score = 92; grade = 'A';
  }

  const battery = pickTrulyRandom(['85% Capacity', '92% Capacity', '98% Capacity', 'New Battery Installed']);
  const condition = pickTrulyRandom(['Grade A (Like New)', 'Grade A- (Clean)', 'Grade B+ (Good)']);
  const display = pickTrulyRandom(['14" FHD IPS', '15.6" 144Hz FHD', '13.3" OLED/Retina']);

  const estimatedCost = Math.round(maxBudget * (0.88 + Math.random() * 0.08)); 

  const reason = `This CampusLoop Certified Refurbished laptop offers an incredible value at roughly ₹${estimatedCost.toLocaleString()}. With ${battery} and ${condition} exterior, it provides premium performance for ${workload || branch} workloads at a fraction of the retail price.`;

  return {
    deviceType: 'Laptop',
    cpu,
    ram,
    storage: `${storage}`,
    batteryHealth: battery,
    condition,
    performanceScore: score.toString(),
    recommendedFor: workload || branch,
    reason,
    estimatedCost: `₹${estimatedCost.toLocaleString()}`,
    grade,
    upgradePath: [
      `Year 1: Claim included 1-Year Warranty if any issues arise.`,
      `Year 2: Utilize free interior cleaning service.`,
      `Year 3: Battery replacement if capacity drops below 70%.`,
      `Year 4: Trade-in for upgraded model.`
    ]
  };
};

export const generateConfig = (deviceType, branch, budgetStr, workload) => {
  if (deviceType === 'Laptop') {
    return getLaptopConfig(branch, budgetStr, workload);
  }
  return getDesktopConfig(branch, budgetStr, workload);
};
